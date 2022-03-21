/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { camelCase } from 'lodash';

import { AngularJSLazyDependenciesService, LogService } from '../../../../services';
import { SystemEventService } from '../../../../services/SystemEventService';
import { apiUtils, VALIDATION_MESSAGE_TYPES } from '../../../../utils';
import { SEDropdownAPI } from '../../../legacyGenericEditor';
import { ActionableSearchItem, SelectApi } from '../../../select';
import { GenericEditorField, GenericEditorOption } from '../../types';
import {
    DropdownPopulatorFetchPageResponse,
    DropdownPopulatorInterface,
    IDropdownPopulator,
    OptionsDropdownPopulator,
    UriDropdownPopulator
} from './populators';
import {
    GenericEditorDropdownConfiguration,
    IGenericEditorDropdownSelectedOptionEventData,
    IGenericEditorDropdownService
} from './types';

/**
 * The SEDropdownService handles the initialization and the rendering of the {@link SeDropdownComponent}.
 *
 * Resolves Custom Dropdown Populators in two ways:
 * - Angular - `CustomDropdownPopulatorsToken` Injection Token
 * - AngularJS - `$injector`
 */
export const GenericEditorDropdownServiceFactory = (
    lazyDependenciesService: AngularJSLazyDependenciesService,
    logService: LogService,
    LINKED_DROPDOWN: string,
    CLICK_DROPDOWN: string,
    DROPDOWN_IMPLEMENTATION_SUFFIX: string,
    systemEventService: SystemEventService,
    optionsDropdownPopulator: OptionsDropdownPopulator,
    uriDropdownPopulator: UriDropdownPopulator,
    customDropdownPopulators?: DropdownPopulatorInterface[]
): any => {
    const $injector = lazyDependenciesService.$injector();

    return class implements IGenericEditorDropdownService {
        /**
         * **Deprecated since 2105.**
         */
        public getApi: ($api: { $api: SEDropdownAPI }) => void;

        /**
         * **Deprecated since 2105.**
         */
        public setYSelectAPI: (api: SelectApi) => void;
        public setSelectAPI: (api: SelectApi) => void;

        /**
         * **Deprecated since 2105.**
         */
        public $api: SEDropdownAPI;

        /**
         * **Deprecated since 2105.**
         */
        public resultsHeaderTemplateUrl: string;

        /**
         * **Deprecated since 2105.**
         */
        public resultsHeaderTemplate: string;

        public actionableSearchItem: ActionableSearchItem;
        public isMultiDropdown: boolean;
        public initialized: boolean;
        public qualifier: string;

        /**
         * Set when GenericEditorDropdownComponent initializes SelectComponent
         */
        public reset: () => void;

        public field: GenericEditorField;
        public model: any;
        public id: string;
        public onClickOtherDropdown: (key?: string, qualifier?: string) => void;
        public items: GenericEditorOption[];
        public ySelectAPI: SelectApi;
        public selectAPI: SelectApi;
        public selection: GenericEditorOption;
        public eventId: string;
        public clickEventKey: string;
        public populator: IDropdownPopulator;
        public isPaged: boolean;
        public fetchStrategy: any;
        public populatorName: {
            options: string;
            uri: string;
            propertyType: string;
            cmsStructureType: string;
            smarteditComponentType: {
                withQualifier: string;
                withQualifierForDowngradedService: string;
                withoutQualifier: string;
            };
        };

        constructor(conf: GenericEditorDropdownConfiguration) {
            this.field = conf.field;
            this.qualifier = conf.qualifier;
            this.model = conf.model;
            this.id = conf.id;
            this.onClickOtherDropdown = conf.onClickOtherDropdown;
            this.items = [];
            this.getApi = conf.getApi;
            /** Called when <se-dropdown> is initialized. */
            this.setYSelectAPI = ($api: SelectApi): void => {
                this.ySelectAPI = $api;
            };
            /** Called when <se-generic-editor-dropdown> is initialized. */
            this.setSelectAPI = (api: SelectApi): void => {
                this.selectAPI = api;
            };

            /**
             * **Deprecated since 2105.**
             *
             * The ySelector's API object exposing public functionality.
             *
             */
            this.$api = {
                /**
                 * A method that sets the URL of the template used to display results the dropdown.
                 *
                 * @param resultHeadersTemplateUrl The URL of the template used to display the dropdown result headers section.
                 */
                setResultsHeaderTemplateUrl: (resultsHeaderTemplateUrl: string): void => {
                    this.resultsHeaderTemplateUrl = resultsHeaderTemplateUrl;
                },
                /**
                 * A method that sets the template used to display results the dropdown.
                 *
                 * @param resultsHeaderTemplate The template used to display the dropdown result headers section.
                 */
                setResultsHeaderTemplate: (resultsHeaderTemplate: string): void => {
                    this.resultsHeaderTemplate = resultsHeaderTemplate;
                }
            };
        }

        /**
         * Initializes the GenericEditorDropdownComponent with a Dropdown Populator instance,
         * based on the "field" attribute given in constructor.
         */
        public init(): void {
            this.initializeAngularJSAPI();

            this._setPopulatorName();

            this.isMultiDropdown = this.field.collection ? this.field.collection : false;

            this.triggerAction = this.triggerAction.bind(this);

            this.eventId = (this.id || '') + LINKED_DROPDOWN;
            this.clickEventKey = (this.id || '') + CLICK_DROPDOWN;
            if (this.field.dependsOn) {
                systemEventService.subscribe(this.eventId, this._respondToChange.bind(this));
            }
            systemEventService.subscribe(this.clickEventKey, this._respondToOtherClicks.bind(this));

            const populator = this._resolvePopulator();
            if (!populator) {
                throw new Error('se.dropdown.no.populator.found');
            }
            ({ instance: this.populator, isPaged: this.isPaged } = populator);

            this.fetchStrategy = {
                fetchEntity: this.fetchEntity.bind(this)
            };

            if (this.isPaged) {
                this.fetchStrategy.fetchPage = this.fetchPage.bind(this);
            } else {
                this.fetchStrategy.fetchAll = this.fetchAll.bind(this);
            }

            this.initialized = true;
        }

        /**
         * **Deprecated since 2105.**
         *
         * @deprecated
         */
        public initializeAngularJSAPI(): void {
            if (typeof this.getApi === 'function') {
                this.getApi({
                    $api: this.$api
                });
            }
        }

        /**
         * Publishes an asynchronous event for the currently selected option.
         */
        public triggerAction(): void {
            const selectedObj = this.items.filter(
                (option: GenericEditorOption) => option.id === this.model[this.qualifier]
            )[0];
            const handle: IGenericEditorDropdownSelectedOptionEventData = {
                qualifier: this.qualifier,
                optionObject: selectedObj
            };

            this._setValidationState(this.getState(this.field));

            systemEventService.publishAsync(this.eventId, handle);
        }

        public onClick(): void {
            systemEventService.publishAsync(this.clickEventKey, this.field.qualifier);
        }

        /**
         * Uses the configured implementation of {@link DropdownPopulatorInterface}
         * to populate the GenericEditorDropdownComponent items using [fetchAll]{@link DropdownPopulatorInterface#fetchAll}
         *
         * @returns A promise that resolves to a list of options to be populated.
         */
        public fetchAll(search?: string): PromiseLike<GenericEditorOption[]> {
            return this.populator
                .fetchAll({
                    field: this.field,
                    model: this.model,
                    selection: this.selection,
                    search
                })
                .then((options: GenericEditorOption[]) => {
                    this.items = options;
                    return this.items;
                });
        }

        /**
         * Uses the configured implementation of {@link DropdownPopulatorInterface}
         * to populate a single item [getItem]{@link DropdownPopulatorInterface#getItem}
         *
         * @returns A promise that resolves to the option that was fetched
         */
        public fetchEntity(id: string): Promise<GenericEditorOption> {
            return this.populator.getItem({
                field: this.field,
                id,
                model: this.model
            });
        }

        /**
         * @param search The search to filter options by
         * @param pageSize The number of items to be returned
         * @param currentPage The page to be returned
         *
         * Uses the configured implementation of {@link DropdownPopulatorInterface}
         * to populate the seDropdown items using [fetchPage]{@link DropdownPopulatorInterface#fetchPage}
         *
         * @returns A promise that resolves to an object containing the array of items and paging information
         */
        public fetchPage(
            search: string,
            pageSize: number,
            currentPage: number
        ): Promise<DropdownPopulatorFetchPageResponse | void> {
            return this.populator
                .fetchPage({
                    field: this.field,
                    model: this.model,
                    selection: this.selection,
                    search,
                    pageSize,
                    currentPage
                })
                .then((page) => {
                    const holderProperty = apiUtils.getKeyHoldingDataFromResponse(page);
                    page.results = page[holderProperty];

                    delete page[holderProperty];
                    this.items = [...this.items, ...page.results];
                    return page;
                })
                .catch((error) => {
                    logService.error(`Failed to fetch items and paging information. ${error}`);
                });
        }

        public getState(field: GenericEditorField): string {
            return field.hasErrors
                ? VALIDATION_MESSAGE_TYPES.VALIDATION_ERROR
                : field.hasWarnings
                ? VALIDATION_MESSAGE_TYPES.WARNING
                : undefined;
        }

        public isPopulatorPaged(populator: IDropdownPopulator): boolean {
            return populator.isPaged && populator.isPaged();
        }

        public _setPopulatorName(): void {
            this.populatorName = {
                options: optionsDropdownPopulator.constructor.name,
                uri: uriDropdownPopulator.constructor.name,
                propertyType: this.field.propertyType + DROPDOWN_IMPLEMENTATION_SUFFIX,
                cmsStructureType: this.field.cmsStructureType + DROPDOWN_IMPLEMENTATION_SUFFIX,
                smarteditComponentType: {
                    withQualifier:
                        this.field.smarteditComponentType +
                        this.field.qualifier +
                        DROPDOWN_IMPLEMENTATION_SUFFIX,
                    withQualifierForDowngradedService: camelCase(
                        this.field.smarteditComponentType +
                            this.field.qualifier +
                            DROPDOWN_IMPLEMENTATION_SUFFIX
                    ),
                    withoutQualifier:
                        this.field.smarteditComponentType + DROPDOWN_IMPLEMENTATION_SUFFIX
                }
            };
        }

        /**
         * Sets Select Component validation state.
         */
        public _setValidationState(state: string): void {
            const api = this.ySelectAPI || this.selectAPI; // <y-select> or <se-select>
            if (api) {
                api.setValidationState(state);
            }
        }

        public _respondToChange(
            _key: string,
            handle: IGenericEditorDropdownSelectedOptionEventData
        ): void {
            if (
                this.field.dependsOn &&
                this.field.dependsOn.split(',').indexOf(handle.qualifier) > -1
            ) {
                this.selection = handle.optionObject;
                if (this.reset) {
                    this.reset();
                }
            }
        }

        /** Responds to other dropdowns clicks */
        public _respondToOtherClicks(key: string, qualifier: string): void {
            if (
                this.field.qualifier !== qualifier &&
                typeof this.onClickOtherDropdown === 'function'
            ) {
                this.onClickOtherDropdown(key, qualifier);
            }
        }

        public _resolvePopulator():
            | {
                  instance: IDropdownPopulator;
                  isPaged: boolean;
              }
            | undefined {
            if (this.field.options && this.field.uri) {
                throw new Error('se.dropdown.contains.both.uri.and.options');
            }
            // OptionsDropdownPopulator
            // e.g. EditableDropdown
            if (this.field.options) {
                return {
                    instance: this._resolvePopulatorByName(this.populatorName.options),
                    isPaged: false
                };
            }

            // UriDropdownPopulator
            if (this.field.uri) {
                return {
                    instance: this._resolvePopulatorByName(this.populatorName.uri),
                    isPaged: this._isFieldPaged(this.field)
                };
            }

            // e.g. productDropdownPopulator, categoryDropdownPopulator
            if (this.field.propertyType) {
                const populator = this._resolvePopulatorByName(this.populatorName.propertyType);
                return {
                    instance: populator,
                    isPaged: this.isPopulatorPaged(populator)
                };
            }

            // e.g. CMSItemDropdownDropdownPopulator
            const cmsStructureTypePopulator = this._resolvePopulatorByName(
                this.populatorName.cmsStructureType
            );
            if (cmsStructureTypePopulator) {
                return {
                    instance: cmsStructureTypePopulator,
                    isPaged: this._isFieldPaged(this.field)
                };
            }

            // For downstream teams
            // e.g. SmarteditComponentType + qualifier + DropdownPopulator
            const smarteditComponentTypeWithQualifierPopulator = this._resolvePopulatorByName(
                this.populatorName.smarteditComponentType.withQualifier
            );
            if (smarteditComponentTypeWithQualifierPopulator) {
                return {
                    instance: smarteditComponentTypeWithQualifierPopulator,
                    isPaged: this.isPopulatorPaged(smarteditComponentTypeWithQualifierPopulator)
                };
            }

            // For downstream teams
            // TODO: PreviewDatapreviewCatalogDropdownPopulator provide with the token
            // e.g. smarteditComponentType + qualifier + DropdownPopulator
            const smarteditComponentTypeWithQualifierForDowngradedServicePopulator = this._resolvePopulatorByName(
                this.populatorName.smarteditComponentType.withQualifierForDowngradedService
            );
            if (smarteditComponentTypeWithQualifierForDowngradedServicePopulator) {
                return {
                    instance: smarteditComponentTypeWithQualifierForDowngradedServicePopulator,
                    isPaged: this.isPopulatorPaged(
                        smarteditComponentTypeWithQualifierForDowngradedServicePopulator
                    )
                };
            }

            // For downstream teams
            // e.g. SmarteditComponentType + DropdownPopulator
            const smarteditComponentTypeWithoutQualifierPopulator = this._resolvePopulatorByName(
                this.populatorName.smarteditComponentType.withoutQualifier
            );
            if (smarteditComponentTypeWithoutQualifierPopulator) {
                return {
                    instance: smarteditComponentTypeWithoutQualifierPopulator,
                    isPaged: this.isPopulatorPaged(smarteditComponentTypeWithoutQualifierPopulator)
                };
            }

            return undefined;
        }

        /**
         * Lookup for Populator with given name and returns its instance.
         *
         * It first looks for the service in AngularJS $injector,
         * if not found then it will look for Angular service in `customDropdownPopulators`.
         */
        public _resolvePopulatorByName(name: string): IDropdownPopulator | undefined {
            if (name === optionsDropdownPopulator.constructor.name) {
                return optionsDropdownPopulator;
            }

            if (name === uriDropdownPopulator.constructor.name) {
                return uriDropdownPopulator;
            }

            if ($injector.has(name)) {
                return $injector.get(name);
            }

            if (customDropdownPopulators && customDropdownPopulators.length > 0) {
                return customDropdownPopulators.find(
                    (populator) => populator.constructor.name.toUpperCase() === name.toUpperCase()
                );
            }

            return undefined;
        }

        public _isFieldPaged(field: GenericEditorField): boolean {
            return this.field.paged ? this.field.paged : false;
        }
    };
};
