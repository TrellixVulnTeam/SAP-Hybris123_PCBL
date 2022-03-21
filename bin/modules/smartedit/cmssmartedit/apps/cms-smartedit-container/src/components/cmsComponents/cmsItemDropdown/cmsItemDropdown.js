/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('cmsItemDropdownModule', ['smarteditServicesModule', 'genericEditorModule'])
    .constant('ON_EDIT_NESTED_COMPONENT_EVENT', 'ON_EDIT_NESTED_COMPONENT')
    .controller('cmsItemDropdownController', function (
        CONTEXT_CATALOG,
        CONTEXT_CATALOG_VERSION,
        ON_EDIT_NESTED_COMPONENT_EVENT,
        systemEventService,
        genericEditorStackService,
        nestedComponentManagementService,
        selectComponentTypeModalService,
        $log
    ) {
        // -------------------------------------------------------------------------------------------------
        // Constants
        // -------------------------------------------------------------------------------------------------
        const CREATE_COMPONENT_BUTTON_PRESSED_EVENT_ID =
            'CREATE_NESTED_COMPONENT_BUTTON_PRESSED_EVENT';

        // -------------------------------------------------------------------------------------------------
        // Variables
        // -------------------------------------------------------------------------------------------------

        // -------------------------------------------------------------------------------------------------
        // Lifecyle Methods
        // -------------------------------------------------------------------------------------------------
        // TODO: check CmsDropdownItemComponent.scss for removing encapsulation
        this.$onInit = function () {
            this.itemTemplateUrl = 'cmsItemSearchTemplate.html';

            this.field.params = this.field.params || {};
            this.field.editorStackId = this.editorStackId;

            this.field.params.catalogId = CONTEXT_CATALOG;
            this.field.params.catalogVersion = CONTEXT_CATALOG_VERSION;

            this._recompileDom = function () {};

            // Register event handlers.
            this.componentButtonPressedEventId =
                CREATE_COMPONENT_BUTTON_PRESSED_EVENT_ID + '_' + this.qualifier;
            this.createComponentButtonUnRegFn = systemEventService.subscribe(
                this.componentButtonPressedEventId,
                this.onCreateComponentButtonPressed.bind(this)
            );
            this.editComponentClickedUnRegFn = systemEventService.subscribe(
                ON_EDIT_NESTED_COMPONENT_EVENT,
                this.onEditComponentClicked.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.createComponentButtonUnRegFn();
            this.editComponentClickedUnRegFn();
        };

        // -------------------------------------------------------------------------------------------------
        // Event Handlers
        // -------------------------------------------------------------------------------------------------
        this.onCreateComponentButtonPressed = function (eventId, textTyped) {
            this.textTyped = textTyped;
            if (genericEditorStackService.isTopEditorInStack(this.editorStackId, this.id)) {
                if (this.field.subTypes) {
                    const keys = Object.keys(this.field.subTypes);
                    if (keys.length > 1) {
                        selectComponentTypeModalService.open(this.field.subTypes).then(
                            function (subTypeId) {
                                if (!!subTypeId) {
                                    this.createNestedComponent(subTypeId);
                                }
                            }.bind(this)
                        );
                    } else {
                        this.createNestedComponent(keys[0]);
                    }
                }
            }
        };

        this.onEditComponentClicked = function (eventId, payload) {
            if (genericEditorStackService.isTopEditorInStack(this.editorStackId, this.id)) {
                if (this.qualifier === payload.qualifier) {
                    this.editComponent(payload.item);
                }
            }
        };

        // -------------------------------------------------------------------------------------------------
        // Helper Methods
        // -------------------------------------------------------------------------------------------------
        this.configureSeDropdown = function ($api) {
            // Template configuration
            if (Object.keys(this.field.subTypes).length) {
                const template =
                    "<y-actionable-search-item data-event-id='" +
                    this.componentButtonPressedEventId +
                    "'></y-actionable-search-item>";
                $api.setResultsHeaderTemplate(template);
            }
        }.bind(this);

        this.createNestedComponent = function (componentType) {
            const componentInfo = {
                componentId: null,
                componentUuid: null,
                componentType,
                content: {
                    name: this.textTyped,
                    catalogVersion: this.model.catalogVersion
                }
            };

            return nestedComponentManagementService
                .openNestedComponentEditor(componentInfo, this.editorStackId)
                .then(
                    function (item) {
                        if (this.field.collection) {
                            if (!this.model[this.qualifier]) {
                                this.model[this.qualifier] = [];
                            }

                            this.model[this.qualifier].push(item.uuid);
                        } else {
                            this.model[this.qualifier] = item.uuid;
                        }

                        this._recompileDom();
                        this.textTyped = '';
                    }.bind(this)
                )
                .catch((error) => {
                    $log.warn('Something went wrong with openNestedComponentEditor method.', error);
                });
        };

        this.editComponent = function (itemToEdit) {
            const componentInfo = {
                componentId: itemToEdit.uid,
                componentUuid: itemToEdit.uuid,
                componentType: itemToEdit.typeCode || itemToEdit.itemtype,
                content: itemToEdit
            };

            nestedComponentManagementService
                .openNestedComponentEditor(componentInfo, this.editorStackId)
                .then(
                    function () {
                        this._recompileDom();
                    }.bind(this)
                );
        };
    })
    /**
     * @name cmsItemDropdownModule.directive:cmsItemDropdown
     * @scope
     * @restrict E
     * @element cms-item-dropdown
     *
     * @description
     * Component wrapper for CMS Item's on top of seDropdown component that upon selection of an option, will print the CMSItem
     * in the provided format.
     *
     * @param {=Object} field The component field
     * @param {=String} id The component id
     * @param {=Object} model The component model
     * @param {=String} qualifier The qualifier within the structure attribute
     */
    .component('cmsItemDropdown', {
        templateUrl: 'cmsItemDropdownTemplate.html',
        controller: 'cmsItemDropdownController',
        controllerAs: 'cmsItemDropdownCtrl',
        bindings: {
            field: '=',
            qualifier: '=',
            editorStackId: '=',
            model: '=',
            id: '='
        }
    });
