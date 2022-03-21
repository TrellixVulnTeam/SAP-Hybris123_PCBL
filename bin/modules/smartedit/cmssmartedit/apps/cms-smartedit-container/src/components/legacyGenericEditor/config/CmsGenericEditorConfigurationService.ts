/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    BooleanComponent,
    EditorFieldMappingService,
    GenericEditorField,
    GenericEditorStructure,
    GenericEditorTabService,
    SeInjectable
} from 'smarteditcommons';
import { DisplayConditionsEditorComponent } from '../../../components/pages/displayConditions/displayConditionsEditor/DisplayConditionsEditorComponent';
import {
    ComponentRestrictionsEditorComponent,
    PageRestrictionsEditorComponent
} from '../../cmsComponents';

import {
    WorkflowCreateVersionFieldComponent,
    RestrictionsListComponent,
    MissingPrimaryContentPageComponent,
    DuplicatePrimaryNonContentPageComponent,
    DuplicatePrimaryContentPageLabelComponent,
    SlotSharedCloneActionFieldComponent,
    SlotSharedSlotTypeFieldComponent,
    MediaComponent,
    MediaContainerComponent,
    CmsLinkToSelectComponent
} from '../../genericEditor';
import { InfoPageNameComponent } from '../infoPageNameTemplate/InfoPageNameComponent';
import { LinkToggleComponent } from '../linkToggle/LinkToggleComponent';
import { NavigationNodeSelectorComponent } from '../navigationNode/components/navigationNodeSelector/NavigationNodeSelectorComponent';
import { PageTypeEditorComponent } from '../pageType/PageTypeEditorComponent';
import { SingleActiveCatalogAwareItemSelectorComponent } from '../singleActiveCatalogAwareSelector/SingleActiveCatalogAwareItemSelectorComponent';

@SeInjectable()
export class CmsGenericEditorConfigurationService {
    // --------------------------------------------------------------------------------------
    // Constants
    // --------------------------------------------------------------------------------------

    private readonly DEFAULT_PAGE_TAB_ID = 'information';
    private readonly CATEGORIES = {
        PAGE: 'PAGE',
        COMPONENT: 'COMPONENT'
    };
    constructor(
        private editorFieldMappingService: EditorFieldMappingService,
        private genericEditorTabService: GenericEditorTabService
    ) {}

    // --------------------------------------------------------------------------------------
    // Public Methods
    // --------------------------------------------------------------------------------------

    setDefaultEditorFieldMappings(): void {
        this.editorFieldMappingService.addFieldMapping('Media', null, null, {
            component: MediaComponent
        });

        this.editorFieldMappingService.addFieldMapping('MediaContainer', null, null, {
            component: MediaContainerComponent
        });

        this.editorFieldMappingService.addFieldMapping('NavigationNodeSelector', null, null, {
            component: NavigationNodeSelectorComponent
        });

        this.editorFieldMappingService.addFieldMapping('MultiProductSelector', null, null, {
            template: 'multiProductSelectorTemplate.html'
        });

        this.editorFieldMappingService.addFieldMapping('MultiCategorySelector', null, null, {
            template: 'multiCategorySelectorTemplate.html'
        });

        this.editorFieldMappingService.addFieldMapping('CMSLinkToSelect', null, null, {
            component: CmsLinkToSelectComponent
        });

        this.editorFieldMappingService.addFieldMapping('SingleOnlineProductSelector', null, null, {
            component: SingleActiveCatalogAwareItemSelectorComponent
        });

        this.editorFieldMappingService.addFieldMapping('SingleOnlineCategorySelector', null, null, {
            component: SingleActiveCatalogAwareItemSelectorComponent
        });

        this.editorFieldMappingService.addFieldMapping('CMSItemDropdown', null, null, {
            template: 'cmsItemDropdownWrapperTemplate.html'
        });

        this.editorFieldMappingService.addFieldMapping(
            'CMSComponentRestrictionsEditor',
            null,
            null,
            {
                component: ComponentRestrictionsEditorComponent
            }
        );

        this.editorFieldMappingService.addFieldMapping(
            'PageRestrictionsEditor',
            null,
            'restrictions',
            {
                component: PageRestrictionsEditorComponent
            }
        );

        // for editing modal only, not used for create/clone
        this.editorFieldMappingService.addFieldMapping(
            'DisplayConditionEditor',
            null,
            'displayCondition',
            {
                component: DisplayConditionsEditorComponent,
                hidePrefixLabel: true
            }
        );

        this.editorFieldMappingService.addFieldMapping(
            'ShortString',
            this._isPagePredicate,
            'typeCode',
            {
                component: PageTypeEditorComponent,
                hidePrefixLabel: true
            }
        );

        this.editorFieldMappingService.addFieldMapping(
            'InfoPageName',
            this._isPagePredicate,
            null,
            {
                component: InfoPageNameComponent
            }
        );

        this.editorFieldMappingService.addFieldMapping(
            'PageInfoPageName',
            this._isPagePredicate,
            null,
            {
                template: 'pageInfoPageNameWrapperTemplate.html'
            }
        );

        this.editorFieldMappingService.addFieldMapping('Boolean', null, 'visible', {
            component: BooleanComponent,
            i18nKey: 'type.component.abstractcmscomponent.visible.name'
        });

        this.editorFieldMappingService.addFieldMapping('LinkToggle', null, null, {
            component: LinkToggleComponent
        });

        this.editorFieldMappingService.addFieldMapping('RestrictionsList', null, null, {
            component: RestrictionsListComponent,
            hidePrefixLabel: true
        });

        // Page restore widgets.
        this.editorFieldMappingService.addFieldMapping(
            'DuplicatePrimaryNonContentPageMessage',
            null,
            null,
            {
                component: DuplicatePrimaryNonContentPageComponent,
                hidePrefixLabel: true
            }
        );

        this.editorFieldMappingService.addFieldMapping('DuplicatePrimaryContentPage', null, null, {
            component: DuplicatePrimaryContentPageLabelComponent,
            hidePrefixLabel: false
        });

        this.editorFieldMappingService.addFieldMapping('MissingPrimaryContentPage', null, null, {
            component: MissingPrimaryContentPageComponent,
            hidePrefixLabel: false
        });

        this.editorFieldMappingService.addFieldMapping('WorkflowCreateVersionField', null, null, {
            component: WorkflowCreateVersionFieldComponent,
            hidePrefixLabel: false
        });

        this.editorFieldMappingService.addFieldMapping('SlotSharedCloneActionField', null, null, {
            component: SlotSharedCloneActionFieldComponent,
            hidePrefixLabel: false
        });

        this.editorFieldMappingService.addFieldMapping('SlotSharedSlotTypeField', null, null, {
            component: SlotSharedSlotTypeFieldComponent,
            hidePrefixLabel: false
        });
    }

    public setDefaultTabsConfiguration(): void {
        this.genericEditorTabService.configureTab('default', {
            priority: 5
        });
        this.genericEditorTabService.configureTab('information', {
            priority: 5
        });
        this.genericEditorTabService.configureTab('administration', {
            priority: 4
        });
    }

    setDefaultTabFieldMappings(): void {
        // Set default tab.
        this.genericEditorTabService.addComponentTypeDefaultTabPredicate(this._defaultTabPredicate);

        // Set tabs
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'visible',
            'visibility'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'restrictions',
            'visibility'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'onlyOneRestrictionMustApply',
            'visibility'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'uid',
            'basicinfo'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'id',
            'basicinfo'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isComponentPredicate,
            'modifiedtime',
            'basicinfo'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            'DateTime',
            this._isComponentPredicate,
            'creationtime',
            'basicinfo'
        );

        // Page Tabs
        this.editorFieldMappingService.addFieldTabMapping(
            'DisplayConditionEditor',
            this._isPagePredicate,
            'displayCondition',
            'displaycondition'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            this._isPagePredicate,
            'restrictions',
            'restrictions'
        );
    }

    // Predicates

    private _defaultTabPredicate = (componentTypeStructure: GenericEditorStructure): string =>
        componentTypeStructure.category === this.CATEGORIES.PAGE ? this.DEFAULT_PAGE_TAB_ID : null;

    private _isPagePredicate = (
        componentType: string,
        field: GenericEditorField,
        componentTypeStructure: GenericEditorStructure
    ): boolean => componentTypeStructure.category === this.CATEGORIES.PAGE;

    private _isComponentPredicate = (
        componentType: string,
        field: GenericEditorField,
        componentTypeStructure: GenericEditorStructure
    ): boolean => componentTypeStructure.category === this.CATEGORIES.COMPONENT;
}
