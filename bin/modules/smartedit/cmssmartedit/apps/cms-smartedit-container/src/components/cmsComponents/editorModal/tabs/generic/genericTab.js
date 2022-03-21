/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('genericTabModule', [
        'genericEditorModule',
        'resourceLocationsModule',
        'componentEditorModule',
        'smarteditServicesModule'
    ])
    .controller('genericTabCtrl', function (TYPES_RESOURCE_URI, systemEventService) {
        const CMS_LINK_TO_RELOAD_STRUCTURE_EVENT_ID = 'cms-link-to-reload-structure'; // TODO: replace with import
        const STRUCTURE_API_BASE_URL =
            TYPES_RESOURCE_URI + '?code=:smarteditComponentType&mode=:structureApiMode';

        this.$onInit = function () {
            this.structureApi = this.getStructureApiByMode('DEFAULT');
            this.changeStructureEventListener = systemEventService.subscribe(
                CMS_LINK_TO_RELOAD_STRUCTURE_EVENT_ID,
                this.onChangeStructureEvent.bind(this)
            );
        };

        this.onChangeStructureEvent = function (eventId, payload) {
            if (payload.structureApiMode) {
                this.tabStructure = null;
                this.structureApi = this.getStructureApiByMode(payload.structureApiMode);
            } else if (payload.structure) {
                this.structureApi = null;
                this.tabStructure = payload.structure.attributes;
            }
            this.content = payload.content;
        };

        this.$onDestroy = function () {
            this.changeStructureEventListener();
        };

        this.getStructureApiByMode = function (structureApiMode) {
            return STRUCTURE_API_BASE_URL.replace(/:structureApiMode/gi, structureApiMode);
        };
    })
    .component('genericTab', {
        transclude: false,
        templateUrl: 'componentEditorWrapperTemplate.html',
        controller: 'genericTabCtrl',
        bindings: {
            saveTab: '=',
            resetTab: '=',
            cancelTab: '=',
            isDirtyTab: '=',
            componentId: '<',
            componentType: '<',
            tabId: '<',
            componentInfo: '<',
            content: '<'
        }
    });
