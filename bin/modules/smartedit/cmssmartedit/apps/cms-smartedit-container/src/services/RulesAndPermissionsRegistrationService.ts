/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    AttributePermissionsRestService,
    CMSModesService,
    IPageService,
    TypePermissionsRestService
} from 'cmscommons';
import {
    ICatalogService,
    ICatalogVersionPermissionService,
    IExperience,
    IExperienceService,
    IPermissionService,
    ISharedDataService,
    PermissionContext,
    SeDowngradeService,
    TypedMap,
    windowUtils,
    EXPERIENCE_STORAGE_KEY
} from 'smarteditcommons';
import { Workflow } from '../components/workflow/dtos';
import { WorkflowService } from '../components/workflow/services';
import { CatalogVersionRestService } from '../dao';

@SeDowngradeService()
export class RulesAndPermissionsRegistrationService {
    constructor(
        private attributePermissionsRestService: AttributePermissionsRestService,
        private catalogService: ICatalogService,
        private catalogVersionPermissionService: ICatalogVersionPermissionService,
        private catalogVersionRestService: CatalogVersionRestService,
        private cMSModesService: CMSModesService,
        private experienceService: IExperienceService,
        private pageService: IPageService,
        private permissionService: IPermissionService,
        private sharedDataService: ISharedDataService,
        private typePermissionsRestService: TypePermissionsRestService,
        private workflowService: WorkflowService
    ) {}

    public register(): void {
        this.registerRules();
        this.registerRulesForTypeCodeFromContext();
        this.registerRulesForCurrentPage();
        this.registerRulesForTypeCode();
        this.registerRulesForTypeAndQualifier();
        this.registerPermissions();
    }

    private onSuccess(results: boolean[]): boolean {
        return results.every((isValid) => isValid);
    }

    private onError(): boolean {
        return false;
    }

    private async getCurrentPageActiveWorkflow(): Promise<Workflow | null> {
        if (!windowUtils.getGatewayTargetFrame()) {
            return null;
        }
        const { uuid } = await this.pageService.getCurrentPageInfo();
        return this.workflowService.getActiveWorkflowForPageUuid(uuid);
    }

    private registerRules(): void {
        this.permissionService.registerRule({
            names: [
                'se.write.page',
                'se.write.slot',
                'se.write.component',
                'se.write.to.current.catalog.version'
            ],
            verify: (permissionNameObjs: PermissionContext[]) => {
                const promises = permissionNameObjs.map((permissionNameObject) => {
                    if (permissionNameObject.context) {
                        return this.catalogVersionPermissionService.hasWritePermission(
                            permissionNameObject.context.catalogId,
                            permissionNameObject.context.catalogVersion
                        );
                    } else {
                        return this.catalogVersionPermissionService.hasWritePermissionOnCurrent();
                    }
                });
                return Promise.all(promises).then(this.onSuccess, this.onError);
            }
        });

        /**
         * This rule returns true if the page is in a workflow and current user is participant of this workflow
         * or there is no workflow.
         * Otherwise, it returns false;
         */
        this.permissionService.registerRule({
            names: ['se.current.user.can.act.on.page.in.workflow'],
            verify: (permissionNameObjs) => {
                const isAvailableForCurrentPrincipal = (workflow: Workflow): boolean =>
                    workflow === null ? true : workflow.isAvailableForCurrentPrincipal;

                const promises = permissionNameObjs.map((permissionNameObject) => {
                    if (permissionNameObject.context) {
                        return this.workflowService
                            .getActiveWorkflowForPageUuid(
                                permissionNameObject.context.pageInfo.uuid
                            )
                            .then((workflow) => isAvailableForCurrentPrincipal(workflow));
                    } else {
                        return this.getCurrentPageActiveWorkflow().then(
                            (workflow) => isAvailableForCurrentPrincipal(workflow),
                            () => true
                        );
                    }
                });
                return Promise.all(promises).then(this.onSuccess, this.onError);
            }
        });

        /**
         * This rule returns true if the current user is a participant of currently active step of a workflow
         * or there is no workflow.
         * Otherwise, it returns false;
         */
        this.permissionService.registerRule({
            names: ['se.current.user.can.act.on.workflow.current.action'],
            verify: (permissionNameObjs: PermissionContext[]) => {
                const isUserParticipant = async (workflow: Workflow): Promise<boolean> =>
                    workflow === null
                        ? true
                        : this.workflowService.isUserParticipanInActiveAction(
                              workflow.workflowCode
                          );

                const promises = permissionNameObjs.map((permissionNameObject) => {
                    if (permissionNameObject.context) {
                        return this.workflowService
                            .getActiveWorkflowForPageUuid(
                                permissionNameObject.context.pageInfo.uuid
                            )
                            .then((workflow) => isUserParticipant(workflow));
                    } else {
                        return this.getCurrentPageActiveWorkflow().then(
                            (workflow) => isUserParticipant(workflow),
                            () => true
                        );
                    }
                });
                return Promise.all(promises).then(this.onSuccess, this.onError);
            }
        });

        this.permissionService.registerRule({
            names: ['se.sync.catalog'],
            verify: (permissionNameObjs: PermissionContext[]) => {
                const promises = permissionNameObjs.map((permissionNameObject) => {
                    if (permissionNameObject.context) {
                        return this.catalogVersionPermissionService.hasSyncPermission(
                            permissionNameObject.context.catalogId,
                            permissionNameObject.context.catalogVersion,
                            permissionNameObject.context.targetCatalogVersion
                        );
                    } else {
                        return this.catalogVersionPermissionService.hasSyncPermissionFromCurrentToActiveCatalogVersion();
                    }
                });
                return Promise.all(promises).then(this.onSuccess, this.onError);
            }
        });

        this.permissionService.registerRule({
            names: ['se.approval.status.page'],
            verify: async () => {
                const { approvalStatus } = await this.pageService.getCurrentPageInfo();
                return approvalStatus === 'APPROVED';
            }
        });

        this.permissionService.registerRule({
            names: [
                'se.read.page',
                'se.read.slot',
                'se.read.component',
                'se.read.current.catalog.version'
            ],
            verify: () => this.catalogVersionPermissionService.hasReadPermissionOnCurrent()
        });

        this.permissionService.registerRule({
            names: ['se.page.belongs.to.experience'],
            verify: async () => {
                const experience = (await this.sharedDataService.get(
                    EXPERIENCE_STORAGE_KEY
                )) as IExperience;
                return (
                    experience.pageContext &&
                    experience.pageContext.catalogVersionUuid ===
                        experience.catalogDescriptor.catalogVersionUuid
                );
            }
        });

        /**
         * Show the clone icon:
         * - If a page belonging to an active catalog version is a primary page, whose copyToCatalogsDisabled flag is set to false and has at-least one clonable target.
         * - If a page belonging to a non active catalog version has at-least one clonable target.
         *
         * !NOTE: Logic here is very similar to logic used in ManagePageService#isPageCloneable, so if any changes are done here it should be considered to add those changes in mentioned service as well
         */
        this.permissionService.registerRule({
            names: ['se.cloneable.page'],
            verify: async () => {
                const experience = (await this.sharedDataService.get(
                    EXPERIENCE_STORAGE_KEY
                )) as IExperience;
                if (!experience.pageContext) {
                    return false;
                }
                const pageUriContext = {
                    CURRENT_CONTEXT_SITE_ID: experience.pageContext.siteId,
                    CURRENT_CONTEXT_CATALOG: experience.pageContext.catalogId,
                    CURRENT_CONTEXT_CATALOG_VERSION: experience.pageContext.catalogVersion
                };

                const pageInfo = await this.pageService.getCurrentPageInfo();
                const targets = await this.catalogVersionRestService.getCloneableTargets(
                    pageUriContext
                );
                if (experience.pageContext.active) {
                    return (
                        targets.versions.length > 0 &&
                        pageInfo.defaultPage &&
                        !pageInfo.copyToCatalogsDisabled
                    );
                }

                return targets.versions.length > 0;
            }
        });

        this.permissionService.registerRule({
            names: ['se.content.catalog.non.active'],
            verify: () => this.catalogService.isContentCatalogVersionNonActive()
        });

        this.permissionService.registerRule({
            names: ['se.not.versioning.perspective'],
            verify: async () => {
                const isActive = await this.cMSModesService.isVersioningPerspectiveActive();
                return !isActive;
            }
        });

        this.permissionService.registerRule({
            names: ['se.version.page.selected'],
            verify: async () => {
                const experience = await this.experienceService.getCurrentExperience();
                return !!experience.versionId;
            }
        });

        this.permissionService.registerRule({
            names: ['se.version.page.not.selected'],
            verify: async () => {
                const experience = await this.experienceService.getCurrentExperience();
                return !experience.versionId;
            }
        });

        this.permissionService.registerRule({
            names: ['se.catalogversion.has.workflows.enabled'],
            verify: () => this.workflowService.areWorkflowsEnabledOnCurrentCatalogVersion()
        });

        this.permissionService.registerRule({
            names: ['se.current.page.has.active.workflow'],
            verify: async () => {
                const workflow = await this.getCurrentPageActiveWorkflow();
                return workflow !== null;
            }
        });

        this.permissionService.registerRule({
            names: ['se.current.page.has.no.active.workflow'],
            verify: async () => {
                const workflow = await this.getCurrentPageActiveWorkflow();
                return workflow === null;
            }
        });

        // Attribute Permissions
        this.permissionService.registerRule({
            names: ['se.has.change.permission.on.page.approval.status'],
            verify: async () => {
                const attributeName = 'approvalStatus';
                const pageInfo = await this.pageService.getCurrentPageInfo();

                const result =
                    await this.attributePermissionsRestService.hasChangePermissionOnAttributesInType(
                        pageInfo.typeCode,
                        [attributeName]
                    );
                return result[attributeName];
            }
        });
    }

    private registerRulesForTypeCodeFromContext(): void {
        const registerTypePermissionRuleForTypeCodeFromContext = (
            ruleName: string,
            verifyRule: (types: string[]) => Promise<TypedMap<boolean>>
        ): void => {
            this.permissionService.registerRule({
                names: [ruleName],
                verify: (permissionNameObjs) => {
                    const promises = permissionNameObjs.map((permissionNameObject) =>
                        verifyRule([permissionNameObject.context.typeCode]).then(
                            (updatePermission) =>
                                updatePermission[permissionNameObject.context.typeCode]
                        )
                    );
                    return Promise.all(promises).then(this.onSuccess, this.onError);
                }
            });
        };

        // check if the current user has change permission on the type provided part of the permission object
        registerTypePermissionRuleForTypeCodeFromContext(
            'se.has.change.permissions.on.type',
            (types: string[]) => this.typePermissionsRestService.hasUpdatePermissionForTypes(types)
        );

        // check if the current user has create permission on the type provided part of the permission object
        registerTypePermissionRuleForTypeCodeFromContext(
            'se.has.create.permissions.on.type',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );

        // check if the current user has remove permission on the type provided part of the permission object
        registerTypePermissionRuleForTypeCodeFromContext(
            'se.has.remove.permissions.on.type',
            (types: string[]) => this.typePermissionsRestService.hasDeletePermissionForTypes(types)
        );
    }

    private registerRulesForCurrentPage(): void {
        const registerTypePermissionRuleOnCurrentPage = (
            ruleName: string,
            verifyRule: (types: string[]) => Promise<TypedMap<boolean>>
        ): void => {
            this.permissionService.registerRule({
                names: [ruleName],
                verify: async () => {
                    const pageInfo = await this.pageService.getCurrentPageInfo();
                    const permissionObject = await verifyRule([pageInfo.typeCode]);
                    return permissionObject[pageInfo.typeCode];
                }
            });
        };

        // check if the current user has change permission on the page currently loaded
        registerTypePermissionRuleOnCurrentPage(
            'se.has.change.type.permissions.on.current.page',
            (types: string[]) => this.typePermissionsRestService.hasUpdatePermissionForTypes(types)
        );

        // check if the current user has create permission on the page currently loaded
        registerTypePermissionRuleOnCurrentPage(
            'se.has.create.type.permissions.on.current.page',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );

        // check if the current user has read permission on the page currently loaded
        registerTypePermissionRuleOnCurrentPage(
            'se.has.read.type.permissions.on.current.page',
            (types: string[]) => this.typePermissionsRestService.hasReadPermissionForTypes(types)
        );
    }

    private registerRulesForTypeCode(): void {
        const registerTypePermissionRuleForTypeCode = (
            ruleName: string,
            itemType: string,
            verifyRule: (types: string[]) => Promise<TypedMap<boolean>>
        ): void => {
            this.permissionService.registerRule({
                names: [ruleName],
                verify: async () => {
                    const UpdatePermission = await verifyRule([itemType]);
                    return UpdatePermission[itemType];
                }
            });
        };

        // check if the current user has read/create/remove/change permission on the CMSVersion type
        registerTypePermissionRuleForTypeCode(
            'se.has.read.permission.on.version.type',
            'CMSVersion',
            (types: string[]) => this.typePermissionsRestService.hasReadPermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.create.permission.on.version.type',
            'CMSVersion',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.remove.permission.on.version.type',
            'CMSVersion',
            (types: string[]) => this.typePermissionsRestService.hasDeletePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.change.permission.on.version.type',
            'CMSVersion',
            (types: string[]) => this.typePermissionsRestService.hasUpdatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.create.permission.on.abstractcomponent.type',
            'AbstractCMSComponent',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.change.permission.on.contentslotforpage.type',
            'ContentSlotForPage',
            (types: string[]) => this.typePermissionsRestService.hasUpdatePermissionForTypes(types)
        );

        // check if current user has create/change permission on the Workflow type
        registerTypePermissionRuleForTypeCode(
            'se.has.create.permission.on.workflow.type',
            'Workflow',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.change.permission.on.workflow.type',
            'Workflow',
            (types: string[]) => this.typePermissionsRestService.hasUpdatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.read.permission.on.workflow.type',
            'Workflow',
            (types: string[]) => this.typePermissionsRestService.hasReadPermissionForTypes(types)
        );

        registerTypePermissionRuleForTypeCode(
            'se.has.create.permission.on.contentslot.type',
            'ContentSlot',
            (types: string[]) => this.typePermissionsRestService.hasCreatePermissionForTypes(types)
        );
        registerTypePermissionRuleForTypeCode(
            'se.has.delete.permission.on.contentslot.type',
            'ContentSlot',
            (types: string[]) => this.typePermissionsRestService.hasDeletePermissionForTypes(types)
        );
    }

    private registerRulesForTypeAndQualifier(): void {
        const registerAttributePermissionRuleForTypeAndQualifier = (
            ruleName: string,
            itemType: string,
            qualifier: string,
            verifyRule: (type: string, attributeNames: string[]) => Promise<TypedMap<boolean>>
        ): void => {
            this.permissionService.registerRule({
                names: [ruleName],
                verify: async () => {
                    const data = await verifyRule(itemType, [qualifier]);
                    return data[qualifier];
                }
            });
        };

        registerAttributePermissionRuleForTypeAndQualifier(
            'se.has.change.permission.on.workflow.status',
            'Workflow',
            'status',
            (type: string, attributeNames: string[]) =>
                this.attributePermissionsRestService.hasChangePermissionOnAttributesInType(
                    type,
                    attributeNames
                )
        );
        registerAttributePermissionRuleForTypeAndQualifier(
            'se.has.change.permission.on.workflow.description',
            'Workflow',
            'description',
            (type: string, attributeNames: string[]) =>
                this.attributePermissionsRestService.hasChangePermissionOnAttributesInType(
                    type,
                    attributeNames
                )
        );
    }

    private registerPermissions(): void {
        this.permissionService.registerPermission({
            aliases: ['se.add.component'],
            rules: [
                'se.write.slot',
                'se.write.component',
                'se.page.belongs.to.experience',
                'se.has.change.type.permissions.on.current.page',
                'se.current.user.can.act.on.page.in.workflow',
                'se.current.user.can.act.on.workflow.current.action',
                'se.has.create.permission.on.abstractcomponent.type'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.read.page'],
            rules: ['se.read.page']
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.page'],
            rules: ['se.write.page', 'se.current.user.can.act.on.page.in.workflow']
        });

        this.permissionService.registerPermission({
            aliases: ['se.sync.catalog'],
            rules: ['se.sync.catalog']
        });

        this.permissionService.registerPermission({
            aliases: ['se.sync.slot.context.menu', 'se.sync.slot.indicator'],
            rules: [
                'se.sync.catalog',
                'se.page.belongs.to.experience',
                'se.current.user.can.act.on.page.in.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.sync.page'],
            rules: ['se.page.belongs.to.experience', 'se.current.user.can.act.on.page.in.workflow']
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.navigation'],
            rules: ['se.write.component']
        });

        this.permissionService.registerPermission({
            aliases: ['se.context.menu.remove.component'],
            rules: [
                'se.write.slot',
                'se.page.belongs.to.experience',
                'se.current.user.can.act.on.page.in.workflow',
                'se.current.user.can.act.on.workflow.current.action'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.slot.context.menu.shared.icon', 'se.slot.context.menu.unshared.icon'],
            rules: ['se.read.slot', 'se.current.user.can.act.on.page.in.workflow']
        });

        this.permissionService.registerPermission({
            aliases: ['se.slot.context.menu.visibility'],
            rules: ['se.page.belongs.to.experience']
        });

        this.permissionService.registerPermission({
            aliases: ['se.clone.page'],
            rules: ['se.cloneable.page', 'se.has.create.type.permissions.on.current.page']
        });

        this.permissionService.registerPermission({
            aliases: ['se.context.menu.edit.component'],
            rules: [
                'se.write.component',
                'se.page.belongs.to.experience',
                'se.current.user.can.act.on.page.in.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.context.menu.drag.and.drop.component'],
            rules: [
                'se.write.slot',
                'se.write.component',
                'se.page.belongs.to.experience',
                'se.current.user.can.act.on.page.in.workflow',
                'se.current.user.can.act.on.workflow.current.action',
                'se.has.change.permission.on.contentslotforpage.type'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.page.link', 'se.delete.page.menu'],
            rules: [
                'se.write.page',
                'se.page.belongs.to.experience',
                'se.not.versioning.perspective',
                'se.has.change.type.permissions.on.current.page',
                'se.current.user.can.act.on.page.in.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.shared.slot.override.options'],
            rules: [
                'se.write.page',
                'se.page.belongs.to.experience',
                'se.not.versioning.perspective',
                'se.current.user.can.act.on.page.in.workflow',
                'se.has.create.permission.on.contentslot.type'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.revert.to.global.or.shared.slot.link'],
            rules: [
                'se.write.page',
                'se.page.belongs.to.experience',
                'se.not.versioning.perspective',
                'se.current.user.can.act.on.page.in.workflow',
                'se.has.delete.permission.on.contentslot.type'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.clone.component'],
            rules: [
                'se.write.component',
                'se.page.belongs.to.experience',
                'se.current.user.can.act.on.page.in.workflow',
                'se.current.user.can.act.on.workflow.current.action'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.page.type', 'se.delete.page.type', 'se.restore.page.type'],
            rules: ['se.has.change.permissions.on.type']
        });

        this.permissionService.registerPermission({
            aliases: ['se.clone.page.type'],
            rules: ['se.has.create.permissions.on.type']
        });

        this.permissionService.registerPermission({
            aliases: ['se.permanently.delete.page.type'],
            rules: ['se.has.remove.permissions.on.type']
        });

        // Version
        this.permissionService.registerPermission({
            aliases: ['se.version.page'],
            rules: [
                'se.write.page',
                'se.page.belongs.to.experience',
                'se.content.catalog.non.active',
                'se.has.read.permission.on.version.type',
                'se.has.read.type.permissions.on.current.page'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.version.page'],
            rules: [
                'se.write.to.current.catalog.version',
                'se.has.change.permission.on.version.type',
                'se.current.user.can.act.on.page.in.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.create.version.page'],
            rules: [
                'se.version.page.not.selected',
                'se.page.belongs.to.experience',
                'se.has.create.permission.on.version.type',
                'se.has.read.type.permissions.on.current.page'
            ]
        });

        const rulesForVersionRollback = [
            'se.version.page.selected',
            'se.page.belongs.to.experience',
            'se.has.read.permission.on.version.type',
            'se.has.create.permission.on.version.type',
            'se.has.change.type.permissions.on.current.page'
        ];
        this.permissionService.registerPermission({
            aliases: ['se.rollback.version.page'],
            rules: rulesForVersionRollback
        });

        this.permissionService.registerPermission({
            // the page versions menu button should be visible even if a version is not selected
            aliases: ['se.rollback.version.page.versions.menu'],
            rules: rulesForVersionRollback.filter((rule) => rule !== 'se.version.page.selected')
        });

        this.permissionService.registerPermission({
            aliases: ['se.delete.version.page'],
            rules: ['se.has.remove.permission.on.version.type']
        });

        // Workflow
        this.permissionService.registerPermission({
            aliases: ['se.start.page.workflow'],
            rules: [
                'se.has.create.permission.on.workflow.type',
                'se.catalogversion.has.workflows.enabled',
                'se.current.page.has.no.active.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.view.page.workflowMenu'],
            rules: [
                'se.has.read.permission.on.workflow.type',
                'se.current.page.has.active.workflow'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.cancel.page.workflowMenu'],
            rules: [
                'se.has.change.permission.on.workflow.type',
                'se.current.page.has.active.workflow',
                'se.has.change.permission.on.workflow.status'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.edit.workflow.workflowMenu'],
            rules: [
                'se.has.change.permission.on.workflow.type',
                'se.current.page.has.active.workflow',
                'se.has.change.permission.on.workflow.description'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.force.page.approval'],
            rules: [
                'se.sync.catalog',
                'se.has.change.permission.on.page.approval.status',
                'se.page.belongs.to.experience'
            ]
        });

        this.permissionService.registerPermission({
            aliases: ['se.show.page.status'],
            rules: ['se.content.catalog.non.active', 'se.page.belongs.to.experience']
        });

        this.permissionService.registerPermission({
            aliases: ['se.act.on.page.in.workflow'],
            rules: ['se.current.user.can.act.on.page.in.workflow']
        });
    }
}
