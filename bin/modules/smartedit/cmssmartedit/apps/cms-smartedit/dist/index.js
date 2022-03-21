'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cmscommons = require('cmscommons');
var smarteditcommons = require('smarteditcommons');
var lodash = require('lodash');
var core = require('@angular/core');
var core$1 = require('@ngx-translate/core');
var smartedit = require('smartedit');
var platformBrowser = require('@angular/platform-browser');
var _static = require('@angular/upgrade/static');

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('externalComponentButtonModule', ['smarteditServicesModule'])
    .controller('externalComponentButtonController', ["l10nFilter", "catalogService", function (l10nFilter, catalogService) {
        this.$onInit = function () {
            this.isReady = false;

            return catalogService.getCatalogVersionByUuid(this.catalogVersionUuid).then(
                function (catalogVersion) {
                    this.catalogVersion =
                        l10nFilter(catalogVersion.catalogName) +
                        ' (' +
                        catalogVersion.version +
                        ')';
                    this.isReady = true;
                }.bind(this)
            );
        };
    }])
    .component('externalComponentButton', {
        templateUrl: 'externalComponentButtonTemplate.html',
        controller: 'externalComponentButtonController',
        controllerAs: 'ctrl',
        bindings: {
            catalogVersionUuid: '<'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('externalComponentDecoratorModule', [
        'functionsModule',
        'cmsSmarteditServicesModule',
        'yPopoverModule'
    ])
    .controller('externalComponentDecoratorController', ["$element", "$translate", "$log", "l10nFilter", "CONTENT_SLOT_TYPE", "componentHandlerService", "catalogService", "cMSModesService", function (
        $element,
        $translate,
        $log,
        l10nFilter,
        CONTENT_SLOT_TYPE,
        componentHandlerService,
        catalogService,
        cMSModesService
    ) {
        this.$onInit = function () {
            var parentSlotIdForComponent = componentHandlerService.getParentSlotForComponent(
                $element
            );
            this.isExtenalSlot = componentHandlerService.isExternalComponent(
                parentSlotIdForComponent,
                CONTENT_SLOT_TYPE
            );
            this.isReady = false;

            cMSModesService.isVersioningPerspectiveActive().then(
                function (isActive) {
                    this.isVersioningPerspective = isActive;
                    catalogService
                        .getCatalogVersionByUuid(
                            this.componentAttributes.smarteditCatalogVersionUuid
                        )
                        .then(
                            function (catalogVersion) {
                                this.catalogVersionText =
                                    l10nFilter(catalogVersion.catalogName) +
                                    ' (' +
                                    catalogVersion.version +
                                    ')';
                                this.isReady = true;
                            }.bind(this),
                            function () {
                                $log.error(
                                    'externalComponentDecorator - cannot find catalog version for uuid',
                                    this.componentAttributes.smarteditCatalogVersionUuid
                                );
                            }.bind(this)
                        );
                }.bind(this)
            );
        };

        this.getTooltipTemplate = function () {
            return (
                "<div class='external-component-decorator__tooltip'>" +
                $translate.instant('se.cms.from.external.catalog.version', {
                    catalogVersion: this.catalogVersionText
                }) +
                '</div>'
            );
        };
    }])
    .directive('externalComponentDecorator', function () {
        return {
            templateUrl: 'externalComponentDecoratorTemplate.html',
            restrict: 'C',
            transclude: true,
            replace: false,
            controller: 'externalComponentDecoratorController',
            controllerAs: 'ctrl',
            scope: {},
            bindToController: {
                active: '=',
                componentAttributes: '<'
            }
        };
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotSharedButtonModule', [
        'translationServiceModule',
        'smarteditServicesModule',
        'seConstantsModule',
        'hasOperationPermissionModule'
    ])
    .controller('slotSharedButtonController', ["slotSharedService", "componentHandlerService", "$q", "$window", "$translate", "crossFrameEventService", "catalogService", "EVENT_OUTER_FRAME_CLICKED", function (
        slotSharedService,
        componentHandlerService,
        $q,
        $window,
        $translate,
        crossFrameEventService,
        catalogService,
        EVENT_OUTER_FRAME_CLICKED
    ) {
        this.buttonName = 'slotSharedButton';
        this.isPopupOpened = false;
        this.isPopupOpenedPreviousValue = false;

        this.$onInit = function () {
            this.isExternalSlot = componentHandlerService.isExternalComponent(
                this.slotId,
                this.componentAttributes.smarteditComponentType
            );

            $q.all([
                slotSharedService.isSlotShared(this.slotId),
                catalogService.isCurrentCatalogMultiCountry(),
                slotSharedService.isGlobalSlot(
                    this.slotId,
                    this.componentAttributes.smarteditComponentType
                )
            ]).then(
                function (values) {
                    /*
                     * isSlotShared -> Is slot shared by current content catalog version ?
                     * checks only slots on the page (both page and template slots but not multicountry external slots)
                     */
                    this.isSlotShared = values[0] || false;

                    // isMultiCountry -> Has the current site with current catalog have any parent catalog ?
                    this.isMultiCountry = values[1] || false;

                    // isMultiCountry && (isExternalSlot || (isCurrentPageFromParentCatalog && !isExternalSlot))
                    this.isGlobalSlot = values[2];

                    this.isSharedSlot =
                        !this.isMultiCountry && !this.isExternalSlot && this.isSlotShared;
                }.bind(this)
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.$doCheck = function () {
            if (this.isPopupOpenedPreviousValue !== this.isPopupOpened) {
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
                this.isPopupOpenedPreviousValue = this.isPopupOpened;
            }
        };

        this.getLabel = function () {
            return this.isGlobalSlot
                ? 'se.globalslot.decorator.label'
                : 'se.sharedslot.decorator.label';
        };

        this.getDescription = function () {
            var label = this.isGlobalSlot
                ? 'se.cms.slot.shared.global.popover.message'
                : 'se.cms.slot.shared.popover.message';
            return $translate.instant(label, {
                catalogVersion: this.componentAttributes.smarteditCatalogVersionUuid
            });
        };

        this.replaceSlot = function () {
            var promise;
            if (this.isGlobalSlot) {
                // MultiCountry scenario
                promise = slotSharedService.replaceGlobalSlot(this.componentAttributes);
            } else {
                // Non-multicountry scenario
                promise = slotSharedService.replaceSharedSlot(this.componentAttributes);
            }

            promise.then(
                function () {
                    this.isPopupOpened = false;
                    $window.location.reload();
                }.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.unregFn();
        };
    }])
    .component('slotSharedButton', {
        templateUrl: 'slotSharedButtonTemplate.html',
        controller: 'slotSharedButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@',
            componentAttributes: '<'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('externalSlotDisabledDecoratorModule', ['slotDisabledDecoratorModule'])
    .directive('externalSlotDisabledDecorator', function () {
        return {
            templateUrl: 'externalSlotDisabledDecoratorTemplate.html',
            restrict: 'C',
            controllerAs: 'ctrl',
            controller() {},
            scope: {},
            bindToController: {
                active: '=',
                componentAttributes: '<'
            }
        };
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('sharedSlotDisabledDecoratorModule', ['slotDisabledDecoratorModule'])
    .directive('sharedSlotDisabledDecorator', function () {
        return {
            templateUrl: 'sharedSlotDisabledDecoratorTemplate.html',
            transclude: true,
            restrict: 'C',
            controllerAs: 'ctrl',
            controller() {},
            scope: {},
            bindToController: {
                active: '=',
                componentAttributes: '<'
            }
        };
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotDisabledDecoratorModule', ['yPopoverModule', 'cmsSmarteditServicesModule'])
    .controller('slotDisabledComponentController', ["$translate", "catalogService", "l10nFilter", "cMSModesService", "slotSharedService", function (
        $translate,
        catalogService,
        l10nFilter,
        cMSModesService,
        slotSharedService
    ) {
        var DEFAULT_DECORATOR_MSG = 'se.cms.sharedslot.decorator.label';
        var GLOBAL_SLOT_DECORATOR_MSG = 'se.cms.globalsharedslot.decorator.label';

        var DEFAULT_DECORATOR_MSG_VERSIONING_MODE = 'se.cms.versioning.shared.slot.from.label';
        var GLOBAL_SLOT_DECORATOR_MSG_VERSIONING_MODE =
            'se.cms.versioning.global.shared.slot.from.label';

        var ICONS_CLASSES = {
            GLOBE: 'hyicon-globe',
            LOCK: 'hyicon-lock',
            HOVERED: 'hyicon-linked'
        };

        this.$onInit = function () {
            this.isReady = false;
            this._getSourceCatalogName();
            this._isVersioningPerspectiveActive();

            slotSharedService
                .isGlobalSlot(
                    this.componentAttributes.smarteditComponentId,
                    this.componentAttributes.smarteditComponentType
                )
                .then(
                    function (value) {
                        this.isGlobalSlot = value;
                    }.bind(this)
                );
        };

        this._getSourceCatalogName = function () {
            var catalogVersionUUID = this.componentAttributes.smarteditCatalogVersionUuid;
            catalogService.getCatalogVersionByUuid(catalogVersionUUID).then(
                function (catalogVersion) {
                    this.catalogName = catalogVersion.catalogName;
                }.bind(this)
            );
        };

        this._isVersioningPerspectiveActive = function () {
            cMSModesService.isVersioningPerspectiveActive().then(
                function (isActive) {
                    this.isVersioningPerspective = isActive;
                    this.isReady = true;
                }.bind(this)
            );
        };

        this.getPopoverMessage = function () {
            var msgToLocalize;
            if (this.isVersioningPerspective) {
                msgToLocalize = this.isGlobalSlot
                    ? GLOBAL_SLOT_DECORATOR_MSG_VERSIONING_MODE
                    : DEFAULT_DECORATOR_MSG_VERSIONING_MODE;
            } else {
                msgToLocalize = this.isGlobalSlot
                    ? GLOBAL_SLOT_DECORATOR_MSG
                    : DEFAULT_DECORATOR_MSG;
            }

            var msgParams = {
                catalogName: l10nFilter(this.catalogName),
                slotId: this.componentAttributes.smarteditComponentId
            };
            return $translate.instant(msgToLocalize, msgParams);
        };

        this.getSlotIconClass = function () {
            var iconClass = '';
            if (this.active || this.isGlobalSlot !== undefined) {
                iconClass = this.isGlobalSlot ? ICONS_CLASSES.GLOBE : ICONS_CLASSES.HOVERED;
            }
            return iconClass;
        };

        this.getOuterSlotClass = function () {
            return this.getSlotIconClass() === ICONS_CLASSES.GLOBE
                ? 'disabled-shared-slot__icon--outer-globe'
                : '';
        }.bind(this);
    }])
    .component('slotDisabledComponent', {
        templateUrl: 'slotDisabledTemplate.html',
        controller: 'slotDisabledComponentController',
        controllerAs: 'ctrl',
        bindings: {
            active: '=',
            componentAttributes: '<'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotUnsharedButtonModule', [
        'translationServiceModule',
        'confirmationModalServiceModule',
        'smarteditServicesModule',
        'seConstantsModule',
        'hasOperationPermissionModule'
    ])
    .controller('slotUnsharedButtonController', ["$scope", "$q", "$window", "$translate", "EVENT_OUTER_FRAME_CLICKED", "slotUnsharedService", "confirmationModalService", "crossFrameEventService", "componentHandlerService", "catalogService", "sharedDataService", function (
        $scope,
        $q,
        $window,
        $translate,
        EVENT_OUTER_FRAME_CLICKED,
        slotUnsharedService,
        confirmationModalService,
        crossFrameEventService,
        componentHandlerService,
        catalogService,
        sharedDataService
    ) {
        this.revertBackSlot = function () {
            var message = {
                title: this.getRevertBackLinkLabel(),
                templateUrl: 'revertBackSlotConfirmationTemplate.html'
            };

            confirmationModalService.confirm(message).then(
                function () {
                    slotUnsharedService
                        .revertToSharedSlot(this.componentAttributes.smarteditComponentUuid)
                        .then(
                            function () {
                                this.isPopupOpened = false;
                                $window.location.reload();
                            }.bind(this)
                        );
                }.bind(this)
            );
        };

        this.$onInit = function () {
            this.buttonName = 'slotUnsharedButton';
            this.isPopupOpened = false;
            this.isPopupOpenedOldValue = this.isPopupOpened;

            this.isExternalSlot = componentHandlerService.isExternalComponent(
                this.slotId,
                this.componentAttributes.smarteditComponentType
            );

            $q.all([
                slotUnsharedService.isSlotShared(this.slotId),
                catalogService.isCurrentCatalogMultiCountry(),
                slotUnsharedService.isSlotUnshared(this.slotId),
                sharedDataService.get('experience')
            ]).then(
                function (values) {
                    /*
                     * isSlotShared -> Is slot shared by current content catalog version ?
                     * checks only slots on the page (both page and template slots but not multicountry external slots)
                     */
                    this.isSlotShared = values[0] || false;

                    // isMultiCountry -> Has the current site with current catalog have any parent catalog ?
                    this.isMultiCountry = values[1] || false;

                    // isSlotUnshared -> Is the slot status OVERRIDE ?
                    this.isSlotUnshared = values[2];

                    // isCurrentPageFromParent -> Is the current page from the parent catalog ?
                    var experience = values[3];
                    var pageContextCatalogVersionUuid =
                        experience &&
                        experience.pageContext &&
                        experience.pageContext.catalogVersionUuid
                            ? experience.pageContext.catalogVersionUuid
                            : '';
                    var catalogDescriptorCatalogVersionUuid =
                        experience &&
                        experience.catalogDescriptor &&
                        experience.catalogDescriptor.catalogVersionUuid
                            ? experience.catalogDescriptor.catalogVersionUuid
                            : '';
                    this.isCurrentPageFromParent =
                        catalogDescriptorCatalogVersionUuid !== pageContextCatalogVersionUuid;
                }.bind(this)
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.isLocalSlot = function () {
            return (
                this.isMultiCountry &&
                !this.isExternalSlot &&
                !this.isCurrentPageFromParent &&
                this.isSlotShared
            );
        };

        this.isCustomSlot = function () {
            return !this.isExternalSlot && !this.isSlotShared && this.isSlotUnshared;
        };

        this.getLabel = function () {
            return this.isLocalSlot()
                ? 'se.localslot.decorator.label'
                : 'se.customslot.decorator.label';
        };

        this.getRevertBackLinkLabel = function () {
            return $translate.instant('se.cms.slot.shared.revert.back.title', {
                slotType: this.isMultiCountry ? 'Global' : 'Shared'
            });
        };

        this.$doCheck = function () {
            if (this.isPopupOpenedOldValue !== this.isPopupOpened) {
                this.isPopupOpenedOldValue = this.isPopupOpened;
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
            }
        };

        this.$onDestroy = function () {
            this.unregFn();
        };
    }])
    .component('slotUnsharedButton', {
        templateUrl: 'slotUnsharedButtonTemplate.html',
        controller: 'slotUnsharedButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@',
            componentAttributes: '<'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name slotVisibilityButtonModule
 * @description
 *
 * The slot visibility button module provides a directive and controller to manage the button within the slot contextual menu
 * and the hidden component list, which is also part of the dropdown menu associated with the directive's template.
 */
angular
    .module('slotVisibilityButtonModule', [
        'cmssmarteditTemplates',
        'slotVisibilityComponentModule',
        'seConstantsModule'
    ])

    /**
     * @ngdoc controller
     * @name slotVisibilityButtonModule.controller:slotVisibilityButtonController
     *
     * @description
     * The slot visibility button controller is responsible for enabling and disabling the hidden components button,
     * as well as displaying the hidden components list. It also provides functions to open and close the hidden component list.
     *
     * @param {Object} slotVisibilityService slot visibility service instance
     * @param {Object} $scope current scope instance
     */
    .controller('slotVisibilityButtonController', ["slotVisibilityService", "$scope", "sharedDataService", "$translate", "crossFrameEventService", "EVENT_OUTER_FRAME_CLICKED", function (
        slotVisibilityService,
        $scope,
        sharedDataService,
        $translate,
        crossFrameEventService,
        EVENT_OUTER_FRAME_CLICKED
    ) {
        this.buttonName = 'slotVisibilityButton';
        this.eyeOnImageClass = 'sap-icon--show';
        this.eyeOffImageClass = 'sap-icon--hide';
        this.eyeImageClass = this.eyeOffImageClass;
        this.buttonVisible = false;
        this.hiddenComponents = [];
        this.isComponentListOpened = false;

        $scope.$watch(
            'ctrl.isComponentListOpened',
            function (newValue, oldValue) {
                this.eyeImageClass = newValue ? this.eyeOnImageClass : this.eyeOffImageClass;

                if (newValue !== oldValue) {
                    this.setRemainOpen({
                        button: this.buttonName,
                        remainOpen: this.isComponentListOpened
                    });
                }
            }.bind(this)
        );

        this.markExternalComponents = function (experience, hiddenComponents) {
            hiddenComponents.forEach(function (hiddenComponent) {
                hiddenComponent.isExternal =
                    hiddenComponent.catalogVersion !== experience.pageContext.catalogVersionUuid;
            });
        };

        this.getTemplateInfoForExternalComponent = function () {
            return (
                '<div>' + $translate.instant('se.cms.slotvisibility.external.component') + '</div>'
            );
        };

        this.onInsideClick = function ($event) {
            $event.stopPropagation();
        };

        this.$onInit = function () {
            slotVisibilityService.getHiddenComponents(this.slotId).then(
                function (hiddenComponents) {
                    sharedDataService.get('experience').then(
                        function (experience) {
                            this.hiddenComponents = hiddenComponents;
                            this.markExternalComponents(experience, this.hiddenComponents);
                            this.hiddenComponentCount = hiddenComponents.length;
                            if (this.hiddenComponentCount > 0) {
                                this.buttonVisible = true;
                            }
                        }.bind(this)
                    );
                }.bind(this)
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isComponentListOpened = false;
                }.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.unregFn();
        };
    }])
    /**
     * @ngdoc directive
     * @name slotVisibilityButtonModule.directive:slotVisibilityButton
     *
     * @description
     * The slot visibility button component is used inside the slot contextual menu and provides a button
     * image that displays the number of hidden components, as well as a dropdown menu of hidden component.
     *
     * The directive expects that the parent, the slot contextual menu, has a setRemainOpen function and a
     * slotId value on the parent's scope. setRemainOpen is used to send a command to the parent to leave
     * the slot contextual menu open.
     */
    .component('slotVisibilityButton', {
        templateUrl: 'slotVisibilityButtonTemplate.html',
        transclude: true,
        controller: 'slotVisibilityButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@',
            initButton: '@'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name slotVisibilityComponentModule
 *
 * @description
 * The slot visibility component module provides a directive and controller to display the hidden components of a specified content slot.
 *
 * @requires editorModalServiceModule
 */
angular
    .module('slotVisibilityComponentModule', [
        'cmsSmarteditServicesModule',
        'hiddenComponentMenuModule'
    ])

    .controller('slotVisibilityComponentController', ["$injector", "componentVisibilityAlertService", "editorModalService", "catalogService", "catalogVersionPermissionService", "componentSharedService", "domain", "$log", function (
        $injector,
        componentVisibilityAlertService,
        editorModalService,
        catalogService,
        catalogVersionPermissionService,
        componentSharedService,
        domain,
        $log
    ) {
        this.openEditorModal = function () {
            editorModalService
                .openAndRerenderSlot(this.component.typeCode, this.component.uuid, 'visible')
                .then(
                    function (item) {
                        componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                            itemId: item.uuid,
                            itemType: item.itemtype,
                            catalogVersion: item.catalogVersion,
                            restricted: item.restricted,
                            slotId: this.slotId,
                            visible: item.visible
                        });
                    }.bind(this)
                )
                .catch((error) => {
                    $log.warn('Something went wrong with openAndRerenderSlot method.', error);
                });
        };

        this.$onInit = function () {
            this.isReady = false;
            this.imageRoot = domain + '/cmssmartedit/images';
            componentSharedService.isComponentShared(this.component).then(
                function (isShared) {
                    this.isSharedComponent = isShared;
                }.bind(this)
            );

            catalogService.getCatalogVersionByUuid(this.component.catalogVersion).then(
                function (catalogVersionObj) {
                    catalogVersionPermissionService
                        .hasWritePermission(catalogVersionObj.catalogId, catalogVersionObj.version)
                        .then(
                            function (isWritable) {
                                this.readOnly = !isWritable || this.component.isExternal;
                                this.componentVisibilitySwitch = this.component.visible
                                    ? 'se.cms.component.visibility.status.on'
                                    : 'se.cms.component.visibility.status.off';
                                this.componentRestrictionsCount =
                                    '(' +
                                    (this.component.restrictions
                                        ? this.component.restrictions.length
                                        : 0) +
                                    ')';
                                this.isReady = true;
                            }.bind(this)
                        );
                }.bind(this)
            );
        };
    }])

    /**
     * @ngdoc directive
     * @name slotVisibilityComponentModule.directive:slotVisibilityComponent
     *
     * @description
     * The slot visibility component directive is used to display information about a specified hidden component.
     * It receives the component on its scope and it binds it to its own controller.
     */
    .component('slotVisibilityComponent', {
        templateUrl: 'slotVisibilityComponentTemplate.html',
        transclude: false,
        controller: 'slotVisibilityComponentController',
        controllerAs: 'ctrl',
        bindings: {
            component: '=',
            slotId: '@',
            componentId: '@'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name hiddenComponentMenuModule
 * @description
 *
 * This module contains the component used to display a menu for hidden components.
 */
angular
    .module('hiddenComponentMenuModule', ['yPopupOverlayModule', 'yLoDashModule'])
    /**
     * @ngdoc object
     * @name hiddenComponentMenuModule.HIDDEN_COMPONENT_OPENED_EVENT
     *
     * @description
     * The name of the event triggered whenever a menu is opened on a hidden component.
     */
    .constant('HIDDEN_COMPONENT_OPENED_EVENT', 'HIDDEN_COMPONENT_OPENED_EVENT')
    .controller('hiddenComponentMenuController', ["lodash", "hiddenComponentMenuService", "systemEventService", "componentHandlerService", "HIDDEN_COMPONENT_OPENED_EVENT", "CONTENT_SLOT_TYPE", function (
        lodash,
        hiddenComponentMenuService,
        systemEventService,
        componentHandlerService,
        HIDDEN_COMPONENT_OPENED_EVENT,
        CONTENT_SLOT_TYPE
    ) {
        // --------------------------------------------------------------------------------------
        // Lifecycle methods
        // --------------------------------------------------------------------------------------
        this.$onInit = function () {
            var slot = componentHandlerService.getOriginalComponent(this.slotId, CONTENT_SLOT_TYPE);
            this.slotUuid = componentHandlerService.getUuid(slot);

            hiddenComponentMenuService.getItemsForHiddenComponent(this.component, this.slotId).then(
                function (hiddenComponentMenu) {
                    this.configuration = lodash.cloneDeep(hiddenComponentMenu.configuration);
                    this.configuration.slotUuid = this.slotUuid;
                    this.menuItems = lodash.cloneDeep(hiddenComponentMenu.buttons);
                }.bind(this)
            );

            this.unRegRemoveComponentOpenedEvent = systemEventService.subscribe(
                HIDDEN_COMPONENT_OPENED_EVENT,
                this.onOtherMenuOpening
            );
        };

        this.$onDestroy = function () {
            this.unRegRemoveComponentOpenedEvent();
        };

        this.popupConfig = {
            templateUrl: 'hiddenComponentMenuItemsTemplate.html',
            halign: 'left',
            valign: 'bottom',
            legacyController: {
                alias: 'ctrl',
                value: function () {
                    return this;
                }.bind(this)
            }
        };

        // --------------------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------------------
        this.onButtonClick = function ($event) {
            $event.stopPropagation();

            this.isMenuOpen = !this.isMenuOpen;
            if (this.isMenuOpen) {
                systemEventService.publishAsync(HIDDEN_COMPONENT_OPENED_EVENT, {
                    componentId: this.component.uid,
                    slotId: this.slotId
                });
            }
        }.bind(this);

        this.onMenuHide = function () {
            this.isMenuOpen = false;
        }.bind(this);

        this.onOtherMenuOpening = function (eventId, eventData) {
            var isSameComponent = this.component.uid === eventData.componentId;
            var isSameSlot = this.slotId === eventData.slotId;

            if (!isSameComponent || !isSameSlot) {
                this.isMenuOpen = false;
            }
        }.bind(this);

        this.executeItemCallback = function (item, $event) {
            if (item.action) {
                item.action.callback(this.configuration, $event);
                this.isMenuOpen = false;
            }
        };
    }])
    /**
     * @ngdoc directive
     * @name hiddenComponentMenuModule.directive:hiddenComponentMenu
     *
     * @description
     * The hidden component menu is a component used by the slot contextual menu to display a menu on hidden components.
     */
    .component('hiddenComponentMenu', {
        templateUrl: 'hiddenComponentMenuTemplate.html',
        transclude: false,
        controller: 'hiddenComponentMenuController',
        controllerAs: 'ctrl',
        bindings: {
            component: '<',
            slotId: '<'
        }
    });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotSyncButtonModule', ['seConstantsModule', 'cmsComponentsModule'])
    .controller('slotSyncButtonController', ["$scope", "$translate", "SYNCHRONIZATION_POLLING", "SYNCHRONIZATION_STATUSES", "EVENT_OUTER_FRAME_CLICKED", "slotSynchronizationService", "pageInfoService", "crossFrameEventService", function (
        $scope,
        $translate,
        SYNCHRONIZATION_POLLING,
        SYNCHRONIZATION_STATUSES,
        EVENT_OUTER_FRAME_CLICKED,
        slotSynchronizationService,
        pageInfoService,
        crossFrameEventService
    ) {
        $scope.$watch(
            'ctrl.isPopupOpened',
            function () {
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
            }.bind(this)
        );

        this.statusIsInSync = function (syncStatus) {
            return syncStatus.status && syncStatus.status === SYNCHRONIZATION_STATUSES.IN_SYNC;
        };

        this.getSyncStatus = function () {
            pageInfoService.getPageUUID().then(
                function (pageUUID) {
                    slotSynchronizationService.getSyncStatus(pageUUID, this.slotId).then(
                        function (syncStatus) {
                            if (slotSynchronizationService.syncStatusExists(syncStatus)) {
                                this.isSlotInSync = this.statusIsInSync(syncStatus);
                                this.newSlotIsNotSynchronized = this._slotHasBeenSynchronizedAtLeastOnce(
                                    syncStatus
                                );
                                this.slotIsShared = syncStatus.fromSharedDependency;

                                this.ready = true;
                            } else {
                                this.ready = false;
                            }
                        }.bind(this)
                    );
                }.bind(this)
            );
        }.bind(this);

        /**
         * Verifies whether the sync status indicates that the slot was synchronized at least once.
         * @param syncStatus - the sync status to verify
         * @returns {boolean} - true if the slot has been synchronized at least once, false otherwise.
         * @private
         */
        this._slotHasBeenSynchronizedAtLeastOnce = function (syncStatus) {
            return !syncStatus.lastSyncStatus;
        };

        this.$onInit = function () {
            this.buttonName = 'slotSyncButton';
            this.isPopupOpened = false;
            this.newSlotIsNotSynchronized = false;
            this.slotIsShared = false;
            this.ready = false;
            this.isSlotInSync = true;

            this.getSyncStatus();

            this.newLocalSlotIsNotSynchronizedTemplate =
                "<div class='se-popover--inner-content'>" +
                $translate.instant('se.cms.slot.sync.from.catalog.level') +
                '</div>';

            this.newCustomSlotIsNotSynchronizedTemplate =
                "<div class='se-popover--inner-content'>" +
                $translate.instant('se.cms.slot.sync.from.page.level') +
                '</div>';

            this.unRegisterSyncPolling = crossFrameEventService.subscribe(
                SYNCHRONIZATION_POLLING.FAST_FETCH,
                this.getSyncStatus
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.unRegisterSyncPolling();
            this.unregFn();
        };
    }])
    .component('slotSyncButton', {
        templateUrl: 'slotSyncButtonTemplate.html',
        controller: 'slotSyncButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@'
        }
    });

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('cmssmarteditTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('cmssmarteditTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "externalComponentButtonTemplate.html", 
        "<div class=\"se-ctx-menu-btn__msg\" data-ng-if=\"ctrl.isReady\">{{ctrl.catalogVersion}}</div>"
    );
     
    $templateCache.put(
        "externalComponentDecoratorTemplate.html", 
        "<div data-ng-class=\"{    'cms-external-component-decorator': !ctrl.isExtenalSlot,     'disabled-shared-slot-hovered': ctrl.active && !ctrl.isExtenalSlot,     'cms-external-component-decorator--versioning': ctrl.isVersioningPerspective}\"><div class=\"se-ctx-menu__overlay\" data-ng-if=\"!ctrl.isExtenalSlot && ctrl.isReady\"><span data-ng-if=\"!ctrl.active || ctrl.isVersioningPerspective\" data-y-popover data-placement=\"'bottom'\" data-template=\"ctrl.getTooltipTemplate()\" data-trigger=\"'hover'\" class=\"sap-icon--globe se-ctx-menu-element__btn\" data-ng-class=\"{'sap-icon--globe--version': ctrl.isVersioningPerspective}\"></span></div><div class=\"se-wrapper-data\" data-ng-class=\"{'disabled-shared-slot-versioning-mode': ctrl.isVersioningPerspective && !ctrl.isExtenalSlot}\" data-ng-transclude></div></div>"
    );
     
    $templateCache.put(
        "sharedComponentButtonTemplate.html", 
        "<div class=\"se-ctx-menu-btn__msg\"><div class=\"se-ctx-menu-btn__msg-title\" data-translate=\"se.cms.contextmenu.shared.component.info.title\"></div><div data-ng-if=\"$ctrl.isReady\" class=\"se-ctx-menu-btn__msg-description\">{{ $ctrl.message | translate }}</div><div data-ng-if=\"!$ctrl.isReady\"><div class=\"spinner-sm spinner-light\"></div></div></div>"
    );
     
    $templateCache.put(
        "slotSharedButtonTemplate.html", 
        "<div class=\"se-shared-slot-button-template\" data-ng-if=\"ctrl.isGlobalSlot || ctrl.isSharedSlot\"><div class=\"se-slot-ctx-menu__dropdown-toggle-wrapper se-slot-ctx-menu__divider\" data-uib-dropdown data-dropdown-append-to=\"'#smarteditoverlay'\" data-auto-close=\"outsideClick\" data-is-open=\"ctrl.isPopupOpened\"><button type=\"button\" data-uib-dropdown-toggle class=\"se-slot-ctx-menu__dropdown-toggle se-slot-ctx-menu__dropdown-toggle-icon\" data-ng-class=\"{'se-slot-ctx-menu__dropdown-toggle--open': ctrl.isPopupOpened, 'sap-icon--chain-link': ctrl.isSharedSlot, 'sap-icon--globe': ctrl.isGlobalSlot}\" id=\"sharedSlotButton-{{::ctrl.slotId}}\"></button><div class=\"dropdown-menu dropdown-menu-right se-slot__dropdown-menu\" data-uib-dropdown-menu><div class=\"se-slot-contextual-menu__header\" data-translate=\"{{ctrl.getLabel()}}\"></div><div class=\"se-shared-slot__body\"><div class=\"se-shared-slot__description\">{{ctrl.getDescription()}}</div><div has-operation-permission=\"'se.shared.slot.override.options'\"><div class=\"se-shared-slot__option\"><a class=\"se-shared-slot__link replace-slot-link fd-link\" data-ng-click=\"ctrl.replaceSlot()\" data-translate=\"se.cms.slot.shared.popover.button.replaceslot\"></a></div></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "slotSharedTemplate.html", 
        "<slot-shared-button data-slot-id=\"{{::ctrl.smarteditComponentId}}\" data-component-attributes=\"ctrl.componentAttributes\" data-set-remain-open=\"ctrl.setRemainOpen(button, remainOpen)\"></slot-shared-button>"
    );
     
    $templateCache.put(
        "externalSlotDisabledDecoratorTemplate.html", 
        "<div class=\"se-decorator-wrap\"><slot-disabled-component data-active=\"ctrl.active\" data-component-attributes=\"ctrl.componentAttributes\"></slot-disabled-component></div>"
    );
     
    $templateCache.put(
        "sharedSlotDisabledDecoratorTemplate.html", 
        "<div class=\"se-decorator-wrap\"><slot-disabled-component data-active=\"ctrl.active\" data-component-attributes=\"ctrl.componentAttributes\"></slot-disabled-component><div ng-transclude></div></div>"
    );
     
    $templateCache.put(
        "slotDisabledTemplate.html", 
        "<div class=\"se-slot-popover\" data-ng-class=\"{     'disabled-shared-slot-hovered': ctrl.active,     'external-shared-slot': ctrl.isGlobalSlot,     'disabled-shared-slot-versioning-mode': ctrl.isVersioningPerspective,     'disabled-shared-slot': !ctrl.isVersioningPerspective}\" data-popover-content=\"{{ctrl.getPopoverMessage()}}\"><div class=\"se-slot-popover__arrow\"><div class=\"se-slot-popover__arrow--fill\"></div></div><div class=\"disabled-shared-slot__icon--outer disabled-shared-slot__icon--outer-linked\" data-ng-class=\"[ctrl.getOuterSlotClass(), { 'disabled-shared-slot__icon--outer-hovered': ctrl.active && !ctrl.isVersioningPerspective}]\"><span class=\"hyicon shared_slot_disabled_icon disabled-shared-slot__icon--inner\" data-ng-class=\"ctrl.getSlotIconClass()\"></span></div></div>"
    );
     
    $templateCache.put(
        "slotUnsharedButtonTemplate.html", 
        "<div class=\"slot-unshared-button-template\" data-ng-if=\"ctrl.isLocalSlot() || ctrl.isCustomSlot()\"><div class=\"se-slot-ctx-menu__dropdown-toggle-wrapper se-slot-ctx-menu__divider\" data-uib-dropdown data-dropdown-append-to=\"'#smarteditoverlay'\" data-auto-close=\"outsideClick\" data-is-open=\"ctrl.isPopupOpened\"><button type=\"button\" data-uib-dropdown-toggle class=\"se-slot-ctx-menu__dropdown-toggle se-slot-ctx-menu__dropdown-toggle-icon\" data-ng-class=\"{'se-slot-ctx-menu__dropdown-toggle--open': ctrl.isPopupOpened, 'sap-icon--chain-link': ctrl.isLocalSlot(), 'sap-icon--broken-link': ctrl.isCustomSlot()}\" id=\"slot-unshared-button-{{::ctrl.slotId}}\"></button><div class=\"dropdown-menu dropdown-menu-right se-toolbar-menu-content se-slot__dropdown-menu\" data-uib-dropdown-menu><div class=\"se-slot-contextual-menu__header\" data-translate=\"{{ctrl.getLabel()}}\"></div><div class=\"se-shared-slot__body\"><div data-has-operation-permission=\"'se.revert.to.global.or.shared.slot.link'\"><a class=\"se-shared-slot__link revert-slot-link fd-link\" data-ng-click=\"ctrl.revertBackSlot()\" data-translate=\"{{ctrl.getRevertBackLinkLabel()}}\"></a></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "slotUnsharedButtonWrapperTemplate.html", 
        "<slot-unshared-button data-slot-id=\"{{::ctrl.smarteditComponentId}}\" data-component-attributes=\"ctrl.componentAttributes\" data-set-remain-open=\"ctrl.setRemainOpen(button, remainOpen)\"></slot-unshared-button>"
    );
     
    $templateCache.put(
        "slotVisibilityButtonTemplate.html", 
        "<div class=\"se-slot-ctx-menu__dropdown-toggle-wrapper se-slot-ctx-menu__dropdown-toggle-wrapper--slot-visibility se-slot-ctx-menu__divider\" data-uib-dropdown data-dropdown-append-to=\"'#smarteditoverlay'\" data-ng-if=\"ctrl.buttonVisible\" data-is-open=\"ctrl.isComponentListOpened\"><button type=\"button\" data-uib-dropdown-toggle class=\"se-slot-ctx-menu__dropdown-toggle--slot-visibility se-slot-ctx-menu__dropdown-toggle\" data-ng-class=\"{'se-slot-ctx-menu__dropdown-toggle--open': ctrl.isComponentListOpened}\" id=\"slot-visibility-button-{{::ctrl.slotId}}\"><span class=\"se-slot-ctx-menu__dropdown-toggle-icon sap-icon--hide\"></span> <span class=\"se-slot-ctx-menu__dropdown-toggle-add-on\">{{ ::ctrl.hiddenComponentCount }}</span></button><div class=\"dropdown-menu dropdown-menu-right se-slot__dropdown-menu\" data-uib-dropdown-menu data-ng-click=\"ctrl.onInsideClick($event)\" role=\"menu\" id=\"slot-visibility-list-{{::ctrl.slotId}}\"><div class=\"se-slot-contextual-menu__header\" data-translate=\"se.cms.slotvisibility.list.title\"></div><ul class=\"se-slot-visility__component-list\"><li data-ng-repeat=\"component in ctrl.hiddenComponents track by $index\" class=\"se-slot-visility__component-list-item\"><span data-y-popover data-ng-if=\"component.isExternal\" data-trigger=\"'hover'\" data-template=\"ctrl.getTemplateInfoForExternalComponent()\"><slot-visibility-component data-component=\"component\" data-component-id=\"{{::component.uid}}\" data-slot-id=\"{{::ctrl.slotId}}\"></slot-visibility-component></span><slot-visibility-component data-component=\"component\" data-ng-if=\"!component.isExternal\" data-component-id=\"{{::component.uid}}\" data-slot-id=\"{{::ctrl.slotId}}\"></slot-visibility-component></li></ul></div></div>"
    );
     
    $templateCache.put(
        "slotVisibilityComponentTemplate.html", 
        "<div class=\"se-slot-visibility-wrapper\" data-ng-class=\"{'se-slot-visibility-wrapper__external': ctrl.readOnly}\"><div class=\"se-slot-visiblity-component__content\" data-ng-if=\"ctrl.isReady\"><div class=\"se-slot-visibility__icon-wrapper\"><div class=\"se-slot-visibility__icon sap-icon--home-share\"></div><div data-ng-if=\"ctrl.isSharedComponent\" class=\"se-slot-visibility__icon--shared sap-icon--chain-link\"></div></div><div class=\"se-slot-visiblity-component__description\"><div data-ng-if=\"ctrl.readOnly\" class=\"se-slot-visiblity-component__name\">{{ ::ctrl.component.name }}</div><div data-ng-if=\"!ctrl.readOnly\" class=\"se-slot-visiblity-component__name--link\" data-ng-click=\"ctrl.openEditorModal()\">{{ ::ctrl.component.name }}</div><div class=\"se-slot-visiblity-component__type\">{{ ::ctrl.component.typeCode }}</div><div class=\"se-slot-visiblity-component__visibility\">{{'se.genericeditor.tab.visibility.title' | translate}} {{ctrl.componentVisibilitySwitch | translate}} / {{ctrl.componentRestrictionsCount}} {{'se.cms.restrictions.editor.tab' | translate}}</div><div data-ng-if=\"ctrl.component.isExternal === true\" class=\"sap-icon--globe slot-visiblity-component--globe-icon\"></div></div></div><hidden-component-menu class=\"slot-visiblity-component--hidden-menu\" data-slot-id=\"ctrl.slotId\" data-component=\"ctrl.component\"></hidden-component-menu></div>"
    );
     
    $templateCache.put(
        "slotVisibilityWidgetTemplate.html", 
        "<slot-visibility-button data-slot-id=\"{{::ctrl.smarteditComponentId}}\" data-set-remain-open=\"ctrl.setRemainOpen(button, remainOpen)\"/>"
    );
     
    $templateCache.put(
        "hiddenComponentMenuItemsTemplate.html", 
        "<div class=\"se-hidden-component-menu fd-menu__list\"><div class=\"se-hidden-component-menu__item fd-menu__item\" data-ng-repeat=\"dropdownItem in ctrl.menuItems\" data-ng-click=\"ctrl.executeItemCallback(dropdownItem, $event)\"><span class=\"se-hidden-component-menu__item-icon\" data-ng-class=\"[dropdownItem.displayIconClass]\"></span> <span class=\"se-hidden-component-menu__item-link\">{{ dropdownItem.i18nKey | translate }}</span></div></div>"
    );
     
    $templateCache.put(
        "hiddenComponentMenuTemplate.html", 
        "<se-popup-overlay class=\"se-hidden-component-menu__popup-anchor\" [popup-overlay]=\"ctrl.popupConfig\" [popup-overlay-trigger]=\"ctrl.isMenuOpen\" (popup-overlay-on-hide)=\"ctrl.onMenuHide()\"><span data-ng-if=\"ctrl.menuItems.length > 0\" data-ng-click=\"ctrl.onButtonClick($event)\" class=\"sap-icon--overflow se-hidden-component-menu__toggle\"></span></se-popup-overlay>"
    );
     
    $templateCache.put(
        "SyncIndicatorDecoratorTemplate.html", 
        "<div class=\"sync-indicator-decorator\" [ngClass]=\"syncStatus.status\" [attr.sync-status]=\"syncStatus.status\"><ng-content class=\"se-wrapper-data\"></ng-content></div>"
    );
     
    $templateCache.put(
        "slotSyncButtonTemplate.html", 
        "<div class=\"se-slot-sync-button-template\" data-ng-if=\"ctrl.ready\"><div class=\"se-slot-ctx-menu__dropdown-toggle-wrapper se-slot-ctx-menu__divider\" data-uib-dropdown data-dropdown-append-to=\"'#smarteditoverlay'\" data-auto-close=\"outsideClick\" data-is-open=\"ctrl.isPopupOpened\"><span data-y-popover class=\"se-slot-ctx-menu__popover-ancor\" data-trigger=\"'hover'\" data-template=\"ctrl.newCustomSlotIsNotSynchronizedTemplate\" data-ng-if=\"ctrl.newSlotIsNotSynchronized && !ctrl.slotIsShared\" data-placement=\"'bottom'\"></span> <span data-y-popover class=\"se-slot-ctx-menu__popover-ancor\" data-trigger=\"'hover'\" data-template=\"ctrl.newLocalSlotIsNotSynchronizedTemplate\" data-ng-if=\"ctrl.newSlotIsNotSynchronized && ctrl.slotIsShared\" data-placement=\"'bottom'\"></span> <button type=\"button\" data-uib-dropdown-toggle class=\"se-slot-ctx-menu__dropdown-toggle\" data-ng-class=\"{'se-slot-ctx-menu__dropdown-toggle--open': ctrl.isPopupOpened,                 'se-slot-ctx-menu__dropdown-toggle--disabled': ctrl.newSlotIsNotSynchronized }\" id=\"slot-sync-button-{{::ctrl.slotId}}\"><span class=\"sap-icon--synchronize se-slot-ctx-menu__dropdown-toggle-icon\"></span> <span data-ng-if=\"!ctrl.isSlotInSync\" class=\"sap-icon--alert se-slot-sync__btn-status se-slot-ctx-menu__dropdown-toggle-add-on\"></span></button><div class=\"se-slot__dropdown-menu dropdown-menu-right\" data-uib-dropdown-menu role=\"menu\"><div class=\"se-toolbar-menu-content--wrapper\"><div class=\"se-slot-contextual-menu__header\" data-translate=\"se.cms.synchronization.slot.header\"></div><div class=\"se-slot-sync__body\"><slot-synchronization-panel data-ng-if=\"ctrl.isPopupOpened\" data-slot-id=\"ctrl.slotId\"></slot-synchronization-panel></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "slotSyncTemplate.html", 
        "<slot-sync-button data-slot-id=\"{{::ctrl.smarteditComponentId}}\" data-set-remain-open=\"ctrl.setRemainOpen(button, remainOpen)\"></slot-sync-button>"
    );
     
    $templateCache.put(
        "slotSynchronizationPanelTemplate.html", 
        "<div data-page-sensitive><se-synchronization-panel [item-id]=\"$ctrl.slotId\" [get-sync-status]=\"$ctrl.getSyncStatus\" [perform-sync]=\"$ctrl.performSync\" [select-all-label]=\"$ctrl.SYNCHRONIZATION_SLOTS_SELECT_ALL_COMPONENTS_LABEL\" (get-api)=\"$ctrl.getApi($event)\"></se-synchronization-panel></div>"
    );
    
      }]);
    })();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * This service allows retrieving information about the containers found in a given page.
 */
var /* @ngInject */ SlotContainerService = /** @class */ (function () {
    SlotContainerService.$inject = ["restServiceFactory", "experienceService"];
    function /* @ngInject */ SlotContainerService(restServiceFactory, experienceService) {
        this.experienceService = experienceService;
        var contentSlotContainerResourceURI = "/cmswebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + smarteditcommons.PAGE_CONTEXT_CATALOG + "/versions/" + smarteditcommons.PAGE_CONTEXT_CATALOG_VERSION + "/pagescontentslotscontainers?pageId=:pageId";
        this.containersRestService = restServiceFactory.get(contentSlotContainerResourceURI);
    }
    /**
     * This method is used to retrieve the information about the container holding the provided component.
     * If the component is not inside a container, the method returns null.
     *
     * @param slotId The SmartEdit id of the slot where the component in question is located.
     * @param componentUuid The UUID of the component as defined in the database.
     *
     * @returns A promise that resolves to the information of the container of the component provided.
     * Will be null if the component is not inside a container.
     */
    /* @ngInject */ SlotContainerService.prototype.getComponentContainer = function (slotId, componentUuid) {
        return __awaiter(this, void 0, void 0, function () {
            var containersInPage, containers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadContainersInPageInfo()];
                    case 1:
                        containersInPage = _a.sent();
                        containers = containersInPage.filter(function (container) {
                            return container.slotId === slotId && lodash.includes(container.components, componentUuid);
                        });
                        return [2 /*return*/, containers.length > 0 ? containers[0] : null];
                }
            });
        });
    };
    SlotContainerService.prototype.getComponentContainer.$inject = ["slotId", "componentUuid"];
    /* @ngInject */ SlotContainerService.prototype.loadContainersInPageInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var experience, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.containersInPage) {
                            return [2 /*return*/, this.containersInPage];
                        }
                        return [4 /*yield*/, this.experienceService.getCurrentExperience()];
                    case 1:
                        experience = _a.sent();
                        return [4 /*yield*/, this.containersRestService.get({ pageId: experience.pageId })];
                    case 2:
                        result = _a.sent();
                        this.containersInPage = result.pageContentSlotContainerList;
                        return [2 /*return*/, this.containersInPage];
                }
            });
        });
    };
    /* @ngInject */ SlotContainerService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.IExperienceService])
    ], /* @ngInject */ SlotContainerService);
    return /* @ngInject */ SlotContainerService;
}());

/**
 * This service is used to retrieve menu items that are available to be used with hidden components.
 */
var /* @ngInject */ HiddenComponentMenuService = /** @class */ (function () {
    HiddenComponentMenuService.$inject = ["contextualMenuService", "slotContainerService"];
    function /* @ngInject */ HiddenComponentMenuService(contextualMenuService, slotContainerService) {
        this.contextualMenuService = contextualMenuService;
        this.slotContainerService = slotContainerService;
        this.MENU_ITEM_EXTERNAL = 'externalcomponentbutton';
        this.MENU_ITEM_CLONE = 'clonecomponentbutton';
        this.MENU_ITEM_REMOVE = 'se.cms.remove';
        this.allowedItems = {};
        this.setDefaultItemsAllowed();
    }
    /**
     * This method is used to set the list of items that can be used with hidden components.
     *
     * @param itemsToAllow The ID of the menu items that can be used with hidden components.
     *
     */
    /* @ngInject */ HiddenComponentMenuService.prototype.allowItemsInHiddenComponentMenu = function (itemsToAllow) {
        var _this = this;
        itemsToAllow.forEach(function (item) {
            _this.allowedItems[item] = true;
        });
    };
    HiddenComponentMenuService.prototype.allowItemsInHiddenComponentMenu.$inject = ["itemsToAllow"];
    /**
     * This method removes a provided set of allowed menu items if previously allowed.
     *
     * @param itemsToDisallow An array containing the ID's of the menu items that cannot be used any longer with hidden
     * components.
     *
     */
    /* @ngInject */ HiddenComponentMenuService.prototype.removeAllowedItemsInHiddenComponentMenu = function (itemsToDisallow) {
        var _this = this;
        itemsToDisallow.forEach(function (item) {
            delete _this.allowedItems[item];
        });
    };
    HiddenComponentMenuService.prototype.removeAllowedItemsInHiddenComponentMenu.$inject = ["itemsToDisallow"];
    /**
     * This method retrieves the list of IDs of the menu items that can be used with hidden components.
     *
     * @returns The list of IDs of the menu items that can be used with hidden components.
     *
     */
    /* @ngInject */ HiddenComponentMenuService.prototype.getAllowedItemsInHiddenComponentMenu = function () {
        return Object.keys(this.allowedItems);
    };
    /**
     * This method is used to retrieve the menu items available to be used in the provided component. To do so,
     * this method retrieves contextual menu items available for the provided component and filters out the ones that cannot
     * be used in hidden components. For example, assuming that a visible component has 'drag and drop' and 'remove'
     * contextual menu items, if the component is hidden it should only have the remove button available, since the
     * drag and drop operation is meaningless if the component is hidden. Hence, this service will retrieve only
     * the remove item.
     *
     * @param component The hidden component for which to retrieve its menu items.
     * @param slotId The SmartEdit id of the slot where the component is located.
     *
     * @returns Promise that resolves to an array of contextual menu items available for the component
     * provided.
     */
    /* @ngInject */ HiddenComponentMenuService.prototype.getItemsForHiddenComponent = function (component, slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var configuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateComponent(component);
                        return [4 /*yield*/, this.buildComponentInfo(slotId, component)];
                    case 1:
                        configuration = _a.sent();
                        return [2 /*return*/, this.getAllowedItemsForComponent(component, configuration)];
                }
            });
        });
    };
    HiddenComponentMenuService.prototype.getItemsForHiddenComponent.$inject = ["component", "slotId"];
    /* @ngInject */ HiddenComponentMenuService.prototype.validateComponent = function (component) {
        if (!component) {
            throw new Error('HiddenComponentMenuService - Component cannot be null.');
        }
        if (!component.uid) {
            throw new Error('HiddenComponentMenuService - Component needs a uid.');
        }
        if (!component.typeCode) {
            throw new Error('HiddenComponentMenuService - Component needs a type code.');
        }
        if (!component.uuid) {
            throw new Error('HiddenComponentMenuService - Component needs a uuid.');
        }
    };
    HiddenComponentMenuService.prototype.validateComponent.$inject = ["component"];
    /* @ngInject */ HiddenComponentMenuService.prototype.setDefaultItemsAllowed = function () {
        this.allowItemsInHiddenComponentMenu([
            this.MENU_ITEM_EXTERNAL,
            this.MENU_ITEM_CLONE,
            this.MENU_ITEM_REMOVE
        ]);
    };
    /* @ngInject */ HiddenComponentMenuService.prototype.buildComponentInfo = function (slotId, component) {
        return __awaiter(this, void 0, void 0, function () {
            var componentContainer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.slotContainerService.getComponentContainer(slotId, component.uuid)];
                    case 1:
                        componentContainer = _a.sent();
                        return [2 /*return*/, {
                                componentType: component.typeCode,
                                componentId: component.uid,
                                componentAttributes: {
                                    smarteditCatalogVersionUuid: component.catalogVersion,
                                    smarteditComponentId: component.uid,
                                    smarteditComponentType: component.componentType,
                                    smarteditComponentUuid: component.uuid,
                                    smarteditElementUuid: null
                                },
                                containerType: componentContainer ? componentContainer.containerType : null,
                                containerId: componentContainer ? componentContainer.containerId : null,
                                element: null,
                                isComponentHidden: true,
                                slotId: slotId,
                                iLeftBtns: 0
                            }];
                }
            });
        });
    };
    HiddenComponentMenuService.prototype.buildComponentInfo.$inject = ["slotId", "component"];
    /* @ngInject */ HiddenComponentMenuService.prototype.getAllowedItemsForComponent = function (component, configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems, allowedActionsPromises, allowedActions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        menuItems = this.contextualMenuService.getContextualMenuByType(component.typeCode);
                        allowedActionsPromises = menuItems
                            .filter(function (item) { return _this.allowedItems[item.key] && !!item.condition; })
                            .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var isEnabled, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, item.condition(configuration)];
                                    case 1:
                                        isEnabled = _b.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = _b.sent();
                                        isEnabled = false;
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/, { isEnabled: isEnabled, item: item }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(allowedActionsPromises)];
                    case 1:
                        allowedActions = (_a.sent())
                            .filter(function (_a) {
                            var isEnabled = _a.isEnabled;
                            return isEnabled;
                        })
                            .map(function (_a) {
                            var item = _a.item;
                            return item;
                        });
                        return [2 /*return*/, { buttons: allowedActions, configuration: configuration }];
                }
            });
        });
    };
    HiddenComponentMenuService.prototype.getAllowedItemsForComponent.$inject = ["component", "configuration"];
    /* @ngInject */ HiddenComponentMenuService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IContextualMenuService,
            SlotContainerService])
    ], /* @ngInject */ HiddenComponentMenuService);
    return /* @ngInject */ HiddenComponentMenuService;
}());

/**
 * @ngdoc overview
 * @name cmsSmarteditServicesModule
 *
 * @description
 * Module containing all the services shared within the CmsSmartEdit application.
 */
var /* @ngInject */ CmsSmarteditServicesModule = /** @class */ (function () {
    function /* @ngInject */ CmsSmarteditServicesModule() {
    }
    /* @ngInject */ CmsSmarteditServicesModule = __decorate([
        smarteditcommons.SeModule({
            imports: ['yLoDashModule', 'smarteditServicesModule'],
            providers: [smarteditcommons.diNameUtils.makeValueProvider({ cmsitemsUri: cmscommons.cmsitemsUri })]
        })
    ], /* @ngInject */ CmsSmarteditServicesModule);
    return /* @ngInject */ CmsSmarteditServicesModule;
}());

/**
 * This service is used to fetch and cache components information.
 * This service keeps track of components added, edited and removed. It also automatically fetches and caches components when they are visible in the viewport (and invalidates them).
 *
 * This service is intended to be used to improve the performance of the application by reducing the number of xhr calls to the cmsitems api.
 * Example:
 * - a component in the overlay that is doing a fetch to the cmsitems api should use this service instead of using cmsitemsRestService.
 *   When a lot of components are rendered in the overlay we want to avoid one xhr call per component, but instead use this service that is listening
 *   to the 'OVERLAY_RERENDERED_EVENT' and fetch components information in batch (POST to cmsitems endpoint with an Array of uuids).
 */
var /* @ngInject */ ComponentInfoService = /** @class */ (function () {
    ComponentInfoService.$inject = ["yjQuery", "logService", "crossFrameEventService", "cmsitemsRestService", "promiseUtils"];
    function /* @ngInject */ ComponentInfoService(yjQuery, logService, crossFrameEventService, cmsitemsRestService, promiseUtils) {
        var _this = this;
        this.yjQuery = yjQuery;
        this.logService = logService;
        this.crossFrameEventService = crossFrameEventService;
        this.cmsitemsRestService = cmsitemsRestService;
        this.promiseUtils = promiseUtils;
        this.cachedComponents = {};
        this.promisesQueue = {};
        this.crossFrameEventService.subscribe(smarteditcommons.OVERLAY_RERENDERED_EVENT, function (eventId, data) {
            _this.onOverlayReRendered(data);
        });
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_CREATED_EVENT, function (eventId, data) {
            _this.onComponentAdded(data);
        });
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_UPDATED_EVENT, function (eventId, data) {
            _this.onComponentAdded(data);
        });
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_REMOVED_EVENT, function (eventId, data) {
            _this.onComponentRemoved(data);
        });
        // clear cache
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function () { return _this.clearCache(); });
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.USER_HAS_CHANGED, function () { return _this.clearCache(); });
    }
    /**
     * @internal
     * Returns a Promise that will be resolved with the component identified by the given uuid.
     * When called this method works like this:
     * - If the component is in the cache, the promise resolves right away.
     * - If the component is not in the cache, and the forceRetrieval flag is not set, this method won't call the cmsItem backend API right away.
     *   Instead, it waits until the component is cached (e.g., it is added to the overlay).
     * - If the forceRetrieval flag is set, then the method will call the cmsItem backend API right away.
     *
     * @param uuid The uuid of the item to retrieve
     * @param forceRetrieval Boolean flag. It specifies whether to retrieve the cmsItem right away.
     * @returns Promise that will be resolved only if the component was added previously in the overlay and if not will resolve only when the component is added to the overlay.
     *
     */
    /* @ngInject */ ComponentInfoService.prototype.getById = function (uuid, forceRetrieval) {
        return __awaiter(this, void 0, void 0, function () {
            var uuidSelector, deferred;
            return __generator(this, function (_a) {
                uuidSelector = "[" + smarteditcommons.UUID_ATTRIBUTE + "='" + uuid + "']";
                if (!forceRetrieval &&
                    !this.cachedComponents[uuid] &&
                    !document.querySelectorAll(uuidSelector).length) {
                    // For hidden components that are not present in the DOM
                    forceRetrieval = true;
                }
                if (this.isComponentCached(uuid)) {
                    return [2 /*return*/, this.cachedComponents[uuid]];
                }
                else if (forceRetrieval) {
                    return [2 /*return*/, this.getComponentDataByUUID(uuid)];
                }
                else {
                    deferred = this.promisesQueue[uuid] || this.promiseUtils.defer();
                    if (!this.promisesQueue[uuid]) {
                        this.promisesQueue[uuid] = deferred;
                    }
                    return [2 /*return*/, deferred.promise];
                }
            });
        });
    };
    ComponentInfoService.prototype.getById.$inject = ["uuid", "forceRetrieval"];
    /* @ngInject */ ComponentInfoService.prototype.resolvePromises = function (data) {
        var _this = this;
        (data.response ? data.response : [data]).forEach(function (component) {
            _this.cachedComponents[component.uuid] = component;
            if (_this.promisesQueue[component.uuid]) {
                _this.promisesQueue[component.uuid].resolve(component);
                delete _this.promisesQueue[component.uuid];
            }
        });
    };
    ComponentInfoService.prototype.resolvePromises.$inject = ["data"];
    /* @ngInject */ ComponentInfoService.prototype.rejectPromises = function (uuids, error) {
        var _this = this;
        this.logService.error('componentInfoService:: getById error:', error.message);
        uuids.forEach(function (uuid) {
            if (_this.promisesQueue[uuid]) {
                _this.promisesQueue[uuid].reject(error);
                delete _this.promisesQueue[uuid];
            }
        });
    };
    ComponentInfoService.prototype.rejectPromises.$inject = ["uuids", "error"];
    /* @ngInject */ ComponentInfoService.prototype.getComponentDataByUUID = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cmsitemsRestService.getById(uuid)];
                    case 1:
                        response = _a.sent();
                        this.resolvePromises(response);
                        return [2 /*return*/, this.cachedComponents[uuid]];
                    case 2:
                        error_1 = _a.sent();
                        this.rejectPromises([uuid], error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComponentInfoService.prototype.getComponentDataByUUID.$inject = ["uuid"];
    /* @ngInject */ ComponentInfoService.prototype.getComponentsDataByUUIDs = function (uuids) {
        return __awaiter(this, void 0, void 0, function () {
            var components, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cmsitemsRestService.getByIds(uuids, 'DEFAULT')];
                    case 1:
                        components = _a.sent();
                        this.resolvePromises(components);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.rejectPromises(uuids, e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ComponentInfoService.prototype.getComponentsDataByUUIDs.$inject = ["uuids"];
    /* @ngInject */ ComponentInfoService.prototype.onComponentsAddedToOverlay = function (addedComponentsDomElements) {
        var _this = this;
        var uuids = addedComponentsDomElements
            .map(function (component) { return _this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE); })
            .filter(function (uuid) { return !Object.keys(_this.cachedComponents).includes(uuid); });
        if (uuids.length) {
            this.getComponentsDataByUUIDs(uuids);
        }
    };
    ComponentInfoService.prototype.onComponentsAddedToOverlay.$inject = ["addedComponentsDomElements"];
    // delete from the cache the components that were removed from the DOM
    // note: components that are still in the DOM were only removed from the overlay
    /* @ngInject */ ComponentInfoService.prototype.onComponentsRemovedFromOverlay = function (removedComponentsDomElements) {
        var _this = this;
        removedComponentsDomElements
            .filter(function (component) {
            var uuidSelector = "[" + smarteditcommons.UUID_ATTRIBUTE + "='" + _this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE) + "']";
            return !_this.yjQuery(uuidSelector).length;
        })
            .filter(function (component) {
            return Object.keys(_this.cachedComponents).includes(_this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE));
        })
            .map(function (component) { return _this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE); })
            .forEach(function (uuid) {
            delete _this.cachedComponents[uuid];
        });
    };
    ComponentInfoService.prototype.onComponentsRemovedFromOverlay.$inject = ["removedComponentsDomElements"];
    /* @ngInject */ ComponentInfoService.prototype.forceAddComponent = function (cmsComponentToAdd) {
        this.resolvePromises({
            response: [cmsComponentToAdd]
        });
    };
    ComponentInfoService.prototype.forceAddComponent.$inject = ["cmsComponentToAdd"];
    /* @ngInject */ ComponentInfoService.prototype.forceRemoveComponent = function (componentToRemove) {
        delete this.cachedComponents[componentToRemove.uuid];
    };
    ComponentInfoService.prototype.forceRemoveComponent.$inject = ["componentToRemove"];
    /* @ngInject */ ComponentInfoService.prototype.isComponentCached = function (componentUuid) {
        return !!this.cachedComponents[componentUuid];
    };
    ComponentInfoService.prototype.isComponentCached.$inject = ["componentUuid"];
    /* @ngInject */ ComponentInfoService.prototype.clearCache = function () {
        this.cachedComponents = {};
        this.promisesQueue = {};
    };
    /* @ngInject */ ComponentInfoService.prototype.onOverlayReRendered = function (data) {
        if (data) {
            if (data.addedComponents && data.addedComponents.length) {
                this.onComponentsAddedToOverlay(data.addedComponents);
            }
            if (data.removedComponents && data.removedComponents.length) {
                this.onComponentsRemovedFromOverlay(data.removedComponents);
            }
        }
    };
    ComponentInfoService.prototype.onOverlayReRendered.$inject = ["data"];
    // Components added & removed from storefront page.
    /* @ngInject */ ComponentInfoService.prototype.onComponentAdded = function (data) {
        this.forceAddComponent(data);
    };
    ComponentInfoService.prototype.onComponentAdded.$inject = ["data"];
    /* @ngInject */ ComponentInfoService.prototype.onComponentRemoved = function (data) {
        this.forceRemoveComponent(data);
    };
    ComponentInfoService.prototype.onComponentRemoved.$inject = ["data"];
    /* @ngInject */ ComponentInfoService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function, smarteditcommons.LogService,
            smarteditcommons.CrossFrameEventService,
            cmscommons.CmsitemsRestService,
            smarteditcommons.PromiseUtils])
    ], /* @ngInject */ ComponentInfoService);
    return /* @ngInject */ ComponentInfoService;
}());

var /* @ngInject */ ComponentSharedService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ComponentSharedService, _super);
    ComponentSharedService.$inject = ["componentInfoService"];
    function /* @ngInject */ ComponentSharedService(componentInfoService) {
        var _this = _super.call(this) || this;
        _this.componentInfoService = componentInfoService;
        return _this;
    }
    /* @ngInject */ ComponentSharedService.prototype.isComponentShared = function (componentParam) {
        return __awaiter(this, void 0, void 0, function () {
            var component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.determineComponent(componentParam)];
                    case 1:
                        component = _a.sent();
                        if (!component.slots) {
                            throw new Error('ComponentSharedService::isComponentShared - Component must have slots property.');
                        }
                        return [2 /*return*/, component.slots.length > 1];
                }
            });
        });
    };
    ComponentSharedService.prototype.isComponentShared.$inject = ["componentParam"];
    /* @ngInject */ ComponentSharedService.prototype.determineComponent = function (componentParam) {
        if (typeof componentParam === 'string') {
            return this.componentInfoService.getById(componentParam);
        }
        return Promise.resolve(componentParam);
    };
    ComponentSharedService.prototype.determineComponent.$inject = ["componentParam"];
    /* @ngInject */ ComponentSharedService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.IComponentSharedService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [ComponentInfoService])
    ], /* @ngInject */ ComponentSharedService);
    return /* @ngInject */ ComponentSharedService;
}(cmscommons.IComponentSharedService));

/**
 * PageContentSlotsServiceModule provides methods to load and act on the contentSlots for the page loaded in the storefront.
 */
var /* @ngInject */ PageContentSlotsService = /** @class */ (function () {
    PageContentSlotsService.$inject = ["restServiceFactory", "crossFrameEventService", "pageInfoService"];
    function /* @ngInject */ PageContentSlotsService(restServiceFactory, crossFrameEventService, pageInfoService) {
        var _this = this;
        this.crossFrameEventService = crossFrameEventService;
        this.pageInfoService = pageInfoService;
        this.resource = restServiceFactory.get(cmscommons.PAGES_CONTENT_SLOT_RESOURCE_URI);
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function () {
            return _this.reloadPageContentSlots();
        });
    }
    /**
     * This function fetches all the slots of the loaded page.
     *
     * @returns promise that resolves to a collection of content slots information for the loaded page.
     */
    /* @ngInject */ PageContentSlotsService.prototype.getPageContentSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.pageContentSlots) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reloadPageContentSlots()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.pageContentSlots];
                }
            });
        });
    };
    /**
     * Retrieves the slot status of the proved slotId. It can be one of TEMPLATE, PAGE and OVERRIDE.
     *
     * @param slotId of the slot
     *
     * @returns promise that resolves to the status of the slot.
     */
    /* @ngInject */ PageContentSlotsService.prototype.getSlotStatus = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var matchedSlotData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPageContentSlots()];
                    case 1:
                        _a.sent();
                        matchedSlotData = lodash.first(this.pageContentSlots.filter(function (pageContentSlot) { return pageContentSlot.slotId === slotId; }));
                        return [2 /*return*/, matchedSlotData ? matchedSlotData.slotStatus : null];
                }
            });
        });
    };
    PageContentSlotsService.prototype.getSlotStatus.$inject = ["slotId"];
    /**
     * Checks if the slot is shared and returns true in case slot is shared and returns false if it is not.
     * Based on this service method the slot shared button is shown or hidden for a particular slotId
     *
     * @param slotId of the slot
     *
     * @returns promise that resolves to true if the slot is shared; Otherwise false.
     */
    /* @ngInject */ PageContentSlotsService.prototype.isSlotShared = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var matchedSlotData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPageContentSlots()];
                    case 1:
                        _a.sent();
                        matchedSlotData = lodash.first(this.pageContentSlots.filter(function (pageContentSlot) { return pageContentSlot.slotId === slotId; }));
                        return [2 /*return*/, matchedSlotData && matchedSlotData.slotShared];
                }
            });
        });
    };
    PageContentSlotsService.prototype.isSlotShared.$inject = ["slotId"];
    /**
     * Fetches content slot list from API
     */
    /* @ngInject */ PageContentSlotsService.prototype.reloadPageContentSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, pageContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageId = _a.sent();
                        return [4 /*yield*/, this.resource.get({ pageId: pageId })];
                    case 2:
                        pageContent = _a.sent();
                        this.pageContentSlots = lodash.uniq(pageContent.pageContentSlotList || []);
                        return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ PageContentSlotsService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.IPageInfoService])
    ], /* @ngInject */ PageContentSlotsService);
    return /* @ngInject */ PageContentSlotsService;
}());

/**
 * Provides methods to interact with the backend for shared slot information.
 */
var /* @ngInject */ SlotSharedService = /** @class */ (function () {
    SlotSharedService.$inject = ["pageContentSlotsService", "pageInfoService", "translateService", "editorModalService", "componentHandlerService", "catalogService", "sharedDataService"];
    function /* @ngInject */ SlotSharedService(pageContentSlotsService, pageInfoService, translateService, editorModalService, componentHandlerService, catalogService, sharedDataService) {
        this.pageContentSlotsService = pageContentSlotsService;
        this.pageInfoService = pageInfoService;
        this.translateService = translateService;
        this.editorModalService = editorModalService;
        this.componentHandlerService = componentHandlerService;
        this.catalogService = catalogService;
        this.sharedDataService = sharedDataService;
    }
    /**
     * Checks if the slot is shared and returns true in case slot is shared and returns false if it is not.
     * Based on this service method the slot shared button is shown or hidden for a particular slotId
     */
    /* @ngInject */ SlotSharedService.prototype.isSlotShared = function (slotId) {
        return this.pageContentSlotsService.isSlotShared(slotId);
    };
    SlotSharedService.prototype.isSlotShared.$inject = ["slotId"];
    /**
     * Checks whether the given slot is global icon slot or not
     * Returns true if either of the below conditions are true.
     * If the current catalog is multicountry related and if the slot is external slot.
     * If the current catalog is multicountry related and the slot is not external slot but the current page is from parent catalog.
     */
    /* @ngInject */ SlotSharedService.prototype.isGlobalSlot = function (slotId, slotType) {
        return __awaiter(this, void 0, void 0, function () {
            var isExternalSlot, _a, isCurrentCatalogMultiCountry, experience, isMultiCountry, isCurrentPageFromParent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isExternalSlot = this.componentHandlerService.isExternalComponent(slotId, slotType);
                        return [4 /*yield*/, Promise.all([
                                this.catalogService.isCurrentCatalogMultiCountry(),
                                this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)
                            ])];
                    case 1:
                        _a = _b.sent(), isCurrentCatalogMultiCountry = _a[0], experience = _a[1];
                        isMultiCountry = isCurrentCatalogMultiCountry || false;
                        isCurrentPageFromParent = this.isCurrentPageFromParentCatalog(experience);
                        return [2 /*return*/, isMultiCountry && (isExternalSlot || (isCurrentPageFromParent && !isExternalSlot))];
                }
            });
        });
    };
    SlotSharedService.prototype.isGlobalSlot.$inject = ["slotId", "slotType"];
    /**
     * Sets the status of the disableSharedSlot feature
     */
    /* @ngInject */ SlotSharedService.prototype.setSharedSlotEnablementStatus = function (status) {
        this.disableShareSlotStatus = status;
    };
    SlotSharedService.prototype.setSharedSlotEnablementStatus.$inject = ["status"];
    /**
     * Checks the status of the disableSharedSlot feature
     *
     */
    /* @ngInject */ SlotSharedService.prototype.areSharedSlotsDisabled = function () {
        return this.disableShareSlotStatus;
    };
    /**
     * Replaces the global slot (multicountry related) based on the options selected in the "Replace Slot" generic editor.
     *
     * @returns A promise that resolves when replace slot operation is completed.
     */
    /* @ngInject */ SlotSharedService.prototype.replaceGlobalSlot = function (componentAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var cmsItem, componentData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateComponentAttributes(componentAttributes);
                        return [4 /*yield*/, this.constructCmsItemParameter(componentAttributes)];
                    case 1:
                        cmsItem = _a.sent();
                        componentData = {
                            title: 'se.cms.slot.shared.replace.editor.title',
                            structure: {
                                attributes: [
                                    {
                                        cmsStructureType: 'SlotSharedSlotTypeField',
                                        qualifier: 'isSlotCustom',
                                        required: true
                                    },
                                    {
                                        cmsStructureType: 'SlotSharedCloneActionField',
                                        qualifier: 'cloneAction',
                                        required: true
                                    }
                                ]
                            },
                            contentApi: cmscommons.cmsitemsUri,
                            saveLabel: 'se.cms.slot.shared.replace.editor.save',
                            content: cmsItem,
                            initialDirty: true
                        };
                        return [2 /*return*/, this.editorModalService.openGenericEditor(componentData)];
                }
            });
        });
    };
    SlotSharedService.prototype.replaceGlobalSlot.$inject = ["componentAttributes"];
    /**
     * Replaces the shared slot (non-multicountry related) based on the options selected in the "Replace Slot" generic editor
     *
     * @returns A promise that resolves when replace slot operation is completed.
     */
    /* @ngInject */ SlotSharedService.prototype.replaceSharedSlot = function (componentAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var cmsItem, componentData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateComponentAttributes(componentAttributes);
                        return [4 /*yield*/, this.constructCmsItemParameter(componentAttributes)];
                    case 1:
                        cmsItem = _a.sent();
                        cmsItem.isSlotCustom = true;
                        componentData = {
                            title: 'se.cms.slot.shared.replace.editor.title',
                            structure: {
                                attributes: [
                                    {
                                        cmsStructureType: 'SlotSharedCloneActionField',
                                        qualifier: 'cloneAction',
                                        required: true
                                    }
                                ]
                            },
                            contentApi: cmscommons.cmsitemsUri,
                            saveLabel: 'se.cms.slot.shared.replace.editor.save',
                            content: cmsItem,
                            initialDirty: true
                        };
                        return [2 /*return*/, this.editorModalService.openGenericEditor(componentData)];
                }
            });
        });
    };
    SlotSharedService.prototype.replaceSharedSlot.$inject = ["componentAttributes"];
    /* @ngInject */ SlotSharedService.prototype.constructCmsItemParameter = function (componentAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var cloneText, pageUid, targetCatalogVersionUuid, componentName, cmsItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cloneText = this.translateService.instant('se.cms.slot.shared.clone');
                        return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageUid = _a.sent();
                        return [4 /*yield*/, this.pageInfoService.getCatalogVersionUUIDFromPage()];
                    case 2:
                        targetCatalogVersionUuid = _a.sent();
                        componentName = pageUid + "-" + componentAttributes.smarteditComponentId + "-" + cloneText;
                        cmsItem = {
                            name: componentName,
                            smarteditComponentId: componentAttributes.smarteditComponentId,
                            contentSlotUuid: componentAttributes.smarteditComponentUuid,
                            itemtype: componentAttributes.smarteditComponentType,
                            catalogVersion: targetCatalogVersionUuid,
                            pageUuid: pageUid,
                            onlyOneRestrictionMustApply: false
                        };
                        return [2 /*return*/, cmsItem];
                }
            });
        });
    };
    SlotSharedService.prototype.constructCmsItemParameter.$inject = ["componentAttributes"];
    /* @ngInject */ SlotSharedService.prototype.validateComponentAttributes = function (componentAttributes) {
        if (!componentAttributes) {
            throw new Error('Parameter: componentAttributes needs to be supplied!');
        }
        var validationAttributes = [
            'smarteditComponentId',
            'smarteditComponentUuid',
            'smarteditComponentType'
        ];
        var invalidAttr = validationAttributes.find(function (attr) { return !componentAttributes[attr]; });
        if (!!invalidAttr) {
            throw new Error("Parameter: componentAttributes." + invalidAttr + " needs to be supplied!");
        }
    };
    SlotSharedService.prototype.validateComponentAttributes.$inject = ["componentAttributes"];
    /* @ngInject */ SlotSharedService.prototype.isCurrentPageFromParentCatalog = function (experience) {
        var _a, _b;
        var pageContextCatalogVersionUuid = ((_a = experience === null || experience === void 0 ? void 0 : experience.pageContext) === null || _a === void 0 ? void 0 : _a.catalogVersionUuid) || '';
        var catalogDescriptorCatalogVersionUuid = ((_b = experience === null || experience === void 0 ? void 0 : experience.catalogDescriptor) === null || _b === void 0 ? void 0 : _b.catalogVersionUuid) || '';
        var isCurrentPageFromParent = catalogDescriptorCatalogVersionUuid !== pageContextCatalogVersionUuid;
        return isCurrentPageFromParent;
    };
    SlotSharedService.prototype.isCurrentPageFromParentCatalog.$inject = ["experience"];
    /* @ngInject */ SlotSharedService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [PageContentSlotsService,
            smarteditcommons.IPageInfoService,
            core$1.TranslateService,
            cmscommons.IEditorModalService,
            smartedit.ComponentHandlerService,
            smarteditcommons.ICatalogService,
            smarteditcommons.ISharedDataService])
    ], /* @ngInject */ SlotSharedService);
    return /* @ngInject */ SlotSharedService;
}());

var /* @ngInject */ ComponentVisibilityAlertService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ComponentVisibilityAlertService, _super);
    function /* @ngInject */ ComponentVisibilityAlertService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ ComponentVisibilityAlertService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.IComponentVisibilityAlertService),
        smarteditcommons.GatewayProxied('checkAndAlertOnComponentVisibility')
    ], /* @ngInject */ ComponentVisibilityAlertService);
    return /* @ngInject */ ComponentVisibilityAlertService;
}(cmscommons.IComponentVisibilityAlertService));

var /* @ngInject */ SlotRestrictionsService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SlotRestrictionsService, _super);
    SlotRestrictionsService.$inject = ["componentHandlerService", "logService", "pageContentSlotsComponentsRestService", "pageInfoService", "restServiceFactory", "slotSharedService", "typePermissionsRestService", "yjQuery", "crossFrameEventService"];
    function /* @ngInject */ SlotRestrictionsService(componentHandlerService, logService, pageContentSlotsComponentsRestService, pageInfoService, restServiceFactory, slotSharedService, typePermissionsRestService, yjQuery, crossFrameEventService) {
        var _this = _super.call(this) || this;
        _this.componentHandlerService = componentHandlerService;
        _this.logService = logService;
        _this.pageContentSlotsComponentsRestService = pageContentSlotsComponentsRestService;
        _this.pageInfoService = pageInfoService;
        _this.restServiceFactory = restServiceFactory;
        _this.slotSharedService = slotSharedService;
        _this.typePermissionsRestService = typePermissionsRestService;
        _this.yjQuery = yjQuery;
        _this.currentPageId = null;
        _this.slotRestrictions = {};
        _this.CONTENT_SLOTS_TYPE_RESTRICTION_FETCH_LIMIT = 100;
        crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function () {
            _this.emptyCache();
            _this.cacheSlotsRestrictions();
        });
        return _this;
    }
    /**
     * @deprecated since 2005
     */
    /* @ngInject */ SlotRestrictionsService.prototype.getAllComponentTypesSupportedOnPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var slots, slotIds, slotRestrictionPromises, arrayOfSlotRestrictions, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slots = this.yjQuery(this.componentHandlerService.getAllSlotsSelector());
                        slotIds = slots
                            .get()
                            .map(function (slot) { return _this.componentHandlerService.getId(slot); });
                        slotRestrictionPromises = slotIds.map(function (slotId) { return _this.getSlotRestrictions(slotId); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(slotRestrictionPromises)];
                    case 2:
                        arrayOfSlotRestrictions = _a.sent();
                        return [2 /*return*/, lodash.flatten(arrayOfSlotRestrictions)];
                    case 3:
                        error_1 = _a.sent();
                        this.logService.info(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ SlotRestrictionsService.prototype.getSlotRestrictions = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, restrictionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPageUID(this.currentPageId)];
                    case 1:
                        pageId = _a.sent();
                        this.currentPageId = pageId;
                        restrictionId = this.getEntryId(this.currentPageId, slotId);
                        if (this.slotRestrictions[restrictionId]) {
                            return [2 /*return*/, this.slotRestrictions[restrictionId]];
                        }
                        else if (this.isExternalSlot(slotId)) {
                            this.slotRestrictions[restrictionId] = [];
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SlotRestrictionsService.prototype.getSlotRestrictions.$inject = ["slotId"];
    /**
     * This methods determines whether a component of the provided type is allowed in the slot.
     *
     * @param slot The slot for which to verify if it allows a component of the provided type.
     * @returns Promise containing COMPONENT_IN_SLOT_STATUS (ALLOWED, DISALLOWED, MAYBEALLOWED) string that determines whether a component of the provided type is allowed in the slot.
     *
     * TODO: The name is misleading. To not introduce breaking change in 2105, consider changing the name in the next release (after 2105).
     * Candidates: "getComponentStatusInSlot", "determineComponentStatusInSlot"
     */
    /* @ngInject */ SlotRestrictionsService.prototype.isComponentAllowedInSlot = function (slot, dragInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSlotRestrictions, componentsForSlot, isComponentIdAllowed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSlotRestrictions(slot.id)];
                    case 1:
                        currentSlotRestrictions = _a.sent();
                        return [4 /*yield*/, this.pageContentSlotsComponentsRestService.getComponentsForSlot(slot.id)];
                    case 2:
                        componentsForSlot = _a.sent();
                        isComponentIdAllowed = slot.id === dragInfo.slotId ||
                            !componentsForSlot.some(function (component) { return component.uid === dragInfo.componentId; });
                        if (isComponentIdAllowed) {
                            if (currentSlotRestrictions) {
                                return [2 /*return*/, lodash.includes(currentSlotRestrictions, dragInfo.componentType)
                                        ? cmscommons.COMPONENT_IN_SLOT_STATUS.ALLOWED
                                        : cmscommons.COMPONENT_IN_SLOT_STATUS.DISALLOWED];
                            }
                            return [2 /*return*/, cmscommons.COMPONENT_IN_SLOT_STATUS.MAYBEALLOWED];
                        }
                        return [2 /*return*/, cmscommons.COMPONENT_IN_SLOT_STATUS.DISALLOWED];
                }
            });
        });
    };
    SlotRestrictionsService.prototype.isComponentAllowedInSlot.$inject = ["slot", "dragInfo"];
    /* @ngInject */ SlotRestrictionsService.prototype.isSlotEditable = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var slotPermissions, isShared, result, isExternalSlot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // This method can get called with slotId as "undefined", which means that the slot has not been rendered yet.
                        if (!slotId) {
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        return [4 /*yield*/, this.typePermissionsRestService.hasUpdatePermissionForTypes([
                                smarteditcommons.CONTENT_SLOT_TYPE
                            ])];
                    case 1:
                        slotPermissions = _a.sent();
                        return [4 /*yield*/, this.slotSharedService.isSlotShared(slotId)];
                    case 2:
                        isShared = _a.sent();
                        result = slotPermissions[smarteditcommons.CONTENT_SLOT_TYPE];
                        if (isShared) {
                            isExternalSlot = this.isExternalSlot(slotId);
                            result = result && !isExternalSlot && !this.slotSharedService.areSharedSlotsDisabled();
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SlotRestrictionsService.prototype.isSlotEditable.$inject = ["slotId"];
    /* @ngInject */ SlotRestrictionsService.prototype.emptyCache = function () {
        this.slotRestrictions = {};
        this.currentPageId = null;
    };
    /* @ngInject */ SlotRestrictionsService.prototype.cacheSlotsRestrictions = function () {
        var _this = this;
        var originalSlotIds = this.componentHandlerService.getAllSlotUids() || [];
        var nonExternalOriginalSlotIds = originalSlotIds.filter(function (slotId) { return !_this.isExternalSlot(slotId); });
        var uniqueSlotIds = lodash.uniq(nonExternalOriginalSlotIds);
        var chunks = lodash.chunk(uniqueSlotIds, this.CONTENT_SLOTS_TYPE_RESTRICTION_FETCH_LIMIT);
        return this.recursiveFetchSlotsRestrictions(chunks, 0);
    };
    // Recursively fetch slots restrictions by the number of chunks of slotIds split by fetch limit
    /* @ngInject */ SlotRestrictionsService.prototype.recursiveFetchSlotsRestrictions = function (slotIdsByChunks, chunkIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (chunkIndex === slotIdsByChunks.length) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fetchSlotsRestrictions(slotIdsByChunks[chunkIndex])];
                    case 1:
                        _a.sent();
                        this.recursiveFetchSlotsRestrictions(slotIdsByChunks, chunkIndex + 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    SlotRestrictionsService.prototype.recursiveFetchSlotsRestrictions.$inject = ["slotIdsByChunks", "chunkIndex"];
    // Fetch slot restriction and cache them in-memory
    /* @ngInject */ SlotRestrictionsService.prototype.fetchSlotsRestrictions = function (slotIds) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, contentSlotsResponse, contentSlots, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPageUID(this.currentPageId)];
                    case 1:
                        pageId = _a.sent();
                        this.currentPageId = pageId;
                        this.slotsRestrictionsRestService =
                            this.slotsRestrictionsRestService ||
                                this.restServiceFactory.get(cmscommons.CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI, this.currentPageId);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.slotsRestrictionsRestService.save({
                                slotIds: slotIds,
                                pageUid: this.currentPageId
                            })];
                    case 3:
                        contentSlotsResponse = _a.sent();
                        contentSlots = contentSlotsResponse || [];
                        contentSlots.forEach(function (slot) {
                            var restrictionId = _this.getEntryId(_this.currentPageId, slot.contentSlotUid);
                            _this.slotRestrictions[restrictionId] = slot.validComponentTypes;
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        this.logService.info(error_2);
                        throw new Error(error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SlotRestrictionsService.prototype.fetchSlotsRestrictions.$inject = ["slotIds"];
    /* @ngInject */ SlotRestrictionsService.prototype.getPageUID = function (pageUID) {
        return !smarteditcommons.stringUtils.isBlank(pageUID)
            ? Promise.resolve(pageUID)
            : this.pageInfoService.getPageUID();
    };
    SlotRestrictionsService.prototype.getPageUID.$inject = ["pageUID"];
    /* @ngInject */ SlotRestrictionsService.prototype.getEntryId = function (pageId, slotId) {
        return pageId + "_" + slotId;
    };
    SlotRestrictionsService.prototype.getEntryId.$inject = ["pageId", "slotId"];
    /* @ngInject */ SlotRestrictionsService.prototype.isExternalSlot = function (slotId) {
        return this.componentHandlerService.isExternalComponent(slotId, smarteditcommons.CONTENT_SLOT_TYPE);
    };
    SlotRestrictionsService.prototype.isExternalSlot.$inject = ["slotId"];
    /* @ngInject */ SlotRestrictionsService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.ISlotRestrictionsService),
        smarteditcommons.GatewayProxied('getAllComponentTypesSupportedOnPage', 'getSlotRestrictions'),
        __param(7, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [smartedit.ComponentHandlerService,
            smarteditcommons.LogService,
            cmscommons.IPageContentSlotsComponentsRestService,
            smarteditcommons.IPageInfoService,
            smarteditcommons.IRestServiceFactory,
            SlotSharedService,
            cmscommons.TypePermissionsRestService, Function, smarteditcommons.CrossFrameEventService])
    ], /* @ngInject */ SlotRestrictionsService);
    return /* @ngInject */ SlotRestrictionsService;
}(cmscommons.ISlotRestrictionsService));

/**
 * Allows enabling the Edit Component contextual menu item,
 * providing a SmartEdit CMS admin the ability to edit various properties of the given component.
 *
 * Convenience service to attach the open Editor Modal action to the contextual menu of a given component type, or
 * given regex corresponding to a selection of component types.
 *
 * Example: The Edit button is added to the contextual menu of the CMSParagraphComponent, and all types postfixed
 * with BannerComponent.
 */
var /* @ngInject */ EditorEnablerService = /** @class */ (function () {
    EditorEnablerService.$inject = ["componentHandlerService", "componentVisibilityAlertService", "editorModalService", "featureService", "slotRestrictionsService", "systemEventService"];
    function /* @ngInject */ EditorEnablerService(componentHandlerService, componentVisibilityAlertService, editorModalService, featureService, slotRestrictionsService, systemEventService) {
        var _this = this;
        this.componentHandlerService = componentHandlerService;
        this.componentVisibilityAlertService = componentVisibilityAlertService;
        this.editorModalService = editorModalService;
        this.featureService = featureService;
        this.slotRestrictionsService = slotRestrictionsService;
        this.systemEventService = systemEventService;
        this.contextualMenuButton = {
            key: 'se.cms.edit',
            nameI18nKey: 'se.cms.contextmenu.nameI18nKey.edit',
            i18nKey: 'se.cms.contextmenu.title.edit',
            descriptionI18nKey: 'se.cms.contextmenu.descriptionI18n.edit',
            displayClass: 'editbutton',
            displayIconClass: 'sap-icon--edit',
            displaySmallIconClass: 'sap-icon--edit',
            priority: 400,
            permissions: ['se.context.menu.edit.component'],
            action: {
                callback: function (config) {
                    return _this.onClickEditButton(config);
                }
            },
            condition: function (config) {
                return _this.isSlotEditableForNonExternalComponent(config);
            }
        };
    }
    /**
     * Enables the Edit contextual menu item for the given component types.
     *
     * @param componentTypes The list of component types, as defined in the platform, for which to enable the Edit contextual menu.
     */
    /* @ngInject */ EditorEnablerService.prototype.enableForComponents = function (componentTypes) {
        var contextualMenuConfig = __assign(__assign({}, this.contextualMenuButton), { regexpKeys: componentTypes });
        this.featureService.addContextualMenuButton(contextualMenuConfig);
    };
    EditorEnablerService.prototype.enableForComponents.$inject = ["componentTypes"];
    /* @ngInject */ EditorEnablerService.prototype.onClickEditButton = function (_a) {
        var slotUuid = _a.slotUuid, componentAttributes = _a.componentAttributes;
        return __awaiter(this, void 0, void 0, function () {
            var item, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isEditorModalOpen) {
                            return [2 /*return*/];
                        }
                        this.isEditorModalOpen = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.editorModalService.open(componentAttributes)];
                    case 2:
                        item = _c.sent();
                        this.isEditorModalOpen = false;
                        this.systemEventService.publish(cmscommons.COMPONENT_UPDATED_EVENT, item);
                        return [2 /*return*/, this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                                itemId: item.uuid,
                                itemType: item.itemtype,
                                catalogVersion: item.catalogVersion,
                                restricted: item.restricted,
                                slotId: slotUuid,
                                visible: item.visible
                            })];
                    case 3:
                        _b = _c.sent();
                        this.isEditorModalOpen = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditorEnablerService.prototype.onClickEditButton.$inject = ["_a"];
    /* @ngInject */ EditorEnablerService.prototype.isSlotEditableForNonExternalComponent = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var slotId, isEditable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slotId = this.componentHandlerService.getParentSlotForComponent(config.element);
                        return [4 /*yield*/, this.slotRestrictionsService.isSlotEditable(slotId)];
                    case 1:
                        isEditable = _a.sent();
                        return [2 /*return*/, (isEditable &&
                                !this.componentHandlerService.isExternalComponent(config.componentId, config.componentType))];
                }
            });
        });
    };
    EditorEnablerService.prototype.isSlotEditableForNonExternalComponent.$inject = ["config"];
    /* @ngInject */ EditorEnablerService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smartedit.ComponentHandlerService,
            cmscommons.IComponentVisibilityAlertService,
            cmscommons.IEditorModalService,
            smarteditcommons.IFeatureService,
            cmscommons.ISlotRestrictionsService,
            smarteditcommons.SystemEventService])
    ], /* @ngInject */ EditorEnablerService);
    return /* @ngInject */ EditorEnablerService;
}());

/**
 * The slot visibility service provides methods to manage all backend calls and loads an internal
 * structure that provides the necessary data to the slot visibility button and slot visibility component.
 */
var /* @ngInject */ SlotVisibilityService = /** @class */ (function () {
    SlotVisibilityService.$inject = ["crossFrameEventService", "componentHandlerService", "logService", "pageInfoService", "pageContentSlotsComponentsRestService"];
    function /* @ngInject */ SlotVisibilityService(crossFrameEventService, componentHandlerService, logService, pageInfoService, pageContentSlotsComponentsRestService) {
        var _this = this;
        this.crossFrameEventService = crossFrameEventService;
        this.componentHandlerService = componentHandlerService;
        this.logService = logService;
        this.pageInfoService = pageInfoService;
        this.pageContentSlotsComponentsRestService = pageContentSlotsComponentsRestService;
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_CREATED_EVENT, function () {
            return _this.clearComponentsCache();
        });
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_UPDATED_EVENT, function () {
            return _this.clearComponentsCache();
        });
        this.crossFrameEventService.subscribe(cmscommons.COMPONENT_REMOVED_EVENT, function () {
            return _this.clearComponentsCache();
        });
    }
    /**
     * Returns the list of hidden components for a given slotId
     *
     * @param slotId the slot id
     *
     * @returns A promise that resolves to a list of hidden components for the slotId
     */
    /* @ngInject */ SlotVisibilityService.prototype.getHiddenComponents = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var slots, filteredSlots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSlotToComponentsMap()];
                    case 1:
                        slots = _a.sent();
                        filteredSlots = this.filterVisibleComponents(slots);
                        return [2 /*return*/, filteredSlots[slotId] || []];
                }
            });
        });
    };
    SlotVisibilityService.prototype.getHiddenComponents.$inject = ["slotId"];
    /**
     * Reloads and cache's the pagesContentSlotsComponents for the current page in context.
     * this method can be called when ever a component is added or modified to the slot so that the pagesContentSlotsComponents is re-evaluated.
     *
     * @returns A promise that resolves to the contentSlot - Components [] map for the page in context.
     */
    /* @ngInject */ SlotVisibilityService.prototype.reloadSlotsInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageUid, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageUid = _a.sent();
                        this.pageContentSlotsComponentsRestService.clearCache();
                        return [2 /*return*/, this.pageContentSlotsComponentsRestService.getSlotsToComponentsMapForPageUid(pageUid)];
                    case 2:
                        exception_1 = _a.sent();
                        this.logService.error('SlotVisibilityService::reloadSlotsInfo - failed call to pageInfoService.getPageUID');
                        throw exception_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function that filters the given SlotsToComponentsMap to return only those components that are hidden in the storefront.
     * @param allSlotsToComponentsMap object containing slotId - components list.
     *
     * @return allSlotsToComponentsMap object containing slotId - components list.
     */
    /* @ngInject */ SlotVisibilityService.prototype.filterVisibleComponents = function (allSlotsToComponentsMap) {
        var _this = this;
        Object.keys(allSlotsToComponentsMap).forEach(function (slotId) {
            var jQueryComponents = _this.componentHandlerService.getOriginalComponentsWithinSlot(slotId);
            var componentsOnDOM = jQueryComponents
                .get()
                .map(function (component) { return _this.componentHandlerService.getId(component); });
            var hiddenComponents = allSlotsToComponentsMap[slotId].filter(function (component) { return !componentsOnDOM.includes(component.uid); });
            allSlotsToComponentsMap[slotId] = hiddenComponents;
        });
        return allSlotsToComponentsMap;
    };
    SlotVisibilityService.prototype.filterVisibleComponents.$inject = ["allSlotsToComponentsMap"];
    /**
     * Function to load slot to component map for the current page in context
     */
    /* @ngInject */ SlotVisibilityService.prototype.getSlotToComponentsMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageUid, exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageUid = _a.sent();
                        return [2 /*return*/, this.pageContentSlotsComponentsRestService.getSlotsToComponentsMapForPageUid(pageUid)];
                    case 2:
                        exception_2 = _a.sent();
                        this.logService.error('SlotVisibilityService::getSlotToComponentsMap - failed call to pageInfoService.getPageUID');
                        throw exception_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ SlotVisibilityService.prototype.clearComponentsCache = function () {
        this.pageContentSlotsComponentsRestService.clearCache();
    };
    /* @ngInject */ SlotVisibilityService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.CrossFrameEventService,
            smartedit.ComponentHandlerService,
            smarteditcommons.LogService,
            smarteditcommons.IPageInfoService,
            cmscommons.IPageContentSlotsComponentsRestService])
    ], /* @ngInject */ SlotVisibilityService);
    return /* @ngInject */ SlotVisibilityService;
}());

var contentSlotComponentsResourceLocation = cmscommons.PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI + "/pages/:pageId/contentslots/:currentSlotId/components/:componentId";
/**
 * This service provides methods that allow adding or removing components in the page.
 */
var /* @ngInject */ ComponentEditingFacade = /** @class */ (function () {
    ComponentEditingFacade.$inject = ["alertService", "componentService", "componentVisibilityAlertService", "crossFrameEventService", "editorModalService", "logService", "pageInfoService", "renderService", "restServiceFactory", "slotVisibilityService", "sharedDataService", "systemEventService", "translateService"];
    function /* @ngInject */ ComponentEditingFacade(alertService, componentService, componentVisibilityAlertService, crossFrameEventService, editorModalService, logService, pageInfoService, renderService, restServiceFactory, slotVisibilityService, sharedDataService, systemEventService, translateService) {
        this.alertService = alertService;
        this.componentService = componentService;
        this.componentVisibilityAlertService = componentVisibilityAlertService;
        this.crossFrameEventService = crossFrameEventService;
        this.editorModalService = editorModalService;
        this.logService = logService;
        this.pageInfoService = pageInfoService;
        this.renderService = renderService;
        this.restServiceFactory = restServiceFactory;
        this.slotVisibilityService = slotVisibilityService;
        this.sharedDataService = sharedDataService;
        this.systemEventService = systemEventService;
        this.translateService = translateService;
    }
    /**
     * Adds a new component to the slot and opens a component modal to edit its properties.
     *
     * @param slotInfo The target slot for the new component.
     * @param catalogVersionUuid The catalog version on which to create the new component
     * @param componentType The type of the new component to add.
     * @param position The position in the slot where to add the new component.
     *
     */
    /* @ngInject */ ComponentEditingFacade.prototype.addNewComponentToSlot = function (slotInfo, catalogVersionUuid, componentType, position) {
        return __awaiter(this, void 0, void 0, function () {
            var componentAttributes, editedComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        componentAttributes = {
                            smarteditComponentType: componentType,
                            catalogVersionUuid: catalogVersionUuid
                        };
                        return [4 /*yield*/, this.editorModalService.open(componentAttributes, slotInfo.targetSlotUUId, position)];
                    case 1:
                        editedComponent = _a.sent();
                        this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                            itemId: editedComponent.uuid,
                            itemType: editedComponent.itemtype,
                            catalogVersion: editedComponent.catalogVersion,
                            restricted: editedComponent.restricted,
                            slotId: slotInfo.targetSlotId,
                            visible: editedComponent.visible
                        });
                        this.crossFrameEventService.publish(cmscommons.COMPONENT_CREATED_EVENT, editedComponent);
                        return [2 /*return*/, this.renderSlots([slotInfo.targetSlotId], editedComponent.uid, slotInfo.targetSlotId, true)];
                }
            });
        });
    };
    ComponentEditingFacade.prototype.addNewComponentToSlot.$inject = ["slotInfo", "catalogVersionUuid", "componentType", "position"];
    /**
     * Adds an existing component to the slot and display an Alert whenever the component is either hidden or restricted.
     *
     * @param targetSlotId The ID of the slot where to drop the component.
     * @param dragInfo The dragInfo object containing the componentId, componentUuid and componentType.
     * @param position The position in the slot where to add the component.
     */
    /* @ngInject */ ComponentEditingFacade.prototype.addExistingComponentToSlot = function (targetSlotId, dragInfo, position) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, item, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.componentService.addExistingComponent(pageId, dragInfo.componentId, targetSlotId, position)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.componentService.loadComponentItem(dragInfo.componentUuid)];
                    case 4:
                        item = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.generateAndAlertErrorMessage(dragInfo.componentId, targetSlotId, error_1);
                        return [2 /*return*/, Promise.reject()];
                    case 6:
                        this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                            itemId: dragInfo.componentUuid,
                            itemType: dragInfo.componentType,
                            catalogVersion: item.catalogVersion,
                            restricted: item.restricted,
                            slotId: targetSlotId,
                            visible: item.visible
                        });
                        // 1. First update the cache.
                        this.systemEventService.publish(cmscommons.COMPONENT_UPDATED_EVENT, item);
                        // 2. Then replay decorators (via EVENT_SMARTEDIT_COMPONENT_UPDATED).
                        // This is important because there might be existing instances of the component in the page that need to
                        // be updated. For example, if the component was not shared, it would not show the SharedComponent contextual button.
                        // However, if a user adds another instance into the page then the component becomes shared. Both instances of the
                        // component must show that the component is shared now. Thus, the first instance needs to be updated too.
                        this.crossFrameEventService.publish(smarteditcommons.EVENT_SMARTEDIT_COMPONENT_UPDATED, {
                            componentId: dragInfo.componentId,
                            componentType: dragInfo.componentType,
                            componentUuid: dragInfo.componentUuid,
                            requiresReplayingDecorators: true
                        });
                        return [2 /*return*/, this.renderSlots(targetSlotId, dragInfo.componentId, targetSlotId, true)];
                }
            });
        });
    };
    ComponentEditingFacade.prototype.addExistingComponentToSlot.$inject = ["targetSlotId", "dragInfo", "position"];
    /**
     * This methods clones an existing component to the slot by opening a component modal to edit its properties.
     */
    /* @ngInject */ ComponentEditingFacade.prototype.cloneExistingComponentToSlot = function (componentInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var componentItem, experience, component, componentAttributes, updatedComponent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.componentService
                            .loadComponentItem(componentInfo.dragInfo.componentUuid)
                            .catch(function (error) {
                            _this.generateAndAlertErrorMessage(componentInfo.dragInfo.componentId, componentInfo.targetSlotId, error);
                            return Promise.reject();
                        })];
                    case 1:
                        componentItem = _a.sent();
                        return [4 /*yield*/, this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)];
                    case 2:
                        experience = (_a.sent());
                        component = smarteditcommons.objectUtils.copy(componentItem);
                        // While cloning an existing components, remove some parameters, reset catalogVersion to the version of the page.
                        // If cloning an existing component, prefix name and drop restrictions - doing this here will make generic editor dirty and enable save by default.
                        component.componentUuid = component.uuid;
                        component.cloneComponent = true;
                        component.catalogVersion = experience.pageContext.catalogVersionUuid;
                        component.name = this.translateService.instant('se.cms.component.name.clone.of.prefix') + " " + component.name;
                        delete component.uuid;
                        delete component.uid;
                        delete component.slots;
                        delete component.restrictions;
                        delete component.creationtime;
                        delete component.modifiedtime;
                        componentAttributes = {
                            smarteditComponentType: componentInfo.dragInfo.componentType,
                            catalogVersionUuid: experience.pageContext.catalogVersionUuid,
                            content: smarteditcommons.objectUtils.copy(component),
                            initialDirty: true
                        };
                        return [4 /*yield*/, this.editorModalService.open(componentAttributes, componentInfo.targetSlotId, componentInfo.position)];
                    case 3:
                        updatedComponent = _a.sent();
                        this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                            itemId: updatedComponent.uuid,
                            itemType: updatedComponent.itemtype,
                            catalogVersion: updatedComponent.catalogVersion,
                            restricted: updatedComponent.restricted,
                            slotId: componentInfo.targetSlotId,
                            visible: updatedComponent.visible
                        });
                        this.crossFrameEventService.publish(cmscommons.COMPONENT_CREATED_EVENT, updatedComponent);
                        return [2 /*return*/, this.renderSlots(componentInfo.targetSlotId, updatedComponent.uid, componentInfo.targetSlotId, true)];
                }
            });
        });
    };
    ComponentEditingFacade.prototype.cloneExistingComponentToSlot.$inject = ["componentInfo"];
    /**
     * This methods moves a component from two slots in a page.
     *
     * @param sourceSlotId The ID of the slot where the component is initially located.
     * @param targetSlotId The ID of the slot where to drop the component.
     * @param componentId The ID of the component to add into the slot.
     * @param position The position in the slot where to add the component.
     */
    /* @ngInject */ ComponentEditingFacade.prototype.moveComponent = function (sourceSlotId, targetSlotId, componentId, position) {
        return __awaiter(this, void 0, void 0, function () {
            var pageId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.contentSlotComponentsRestService =
                            this.contentSlotComponentsRestService ||
                                this.restServiceFactory.get(contentSlotComponentsResourceLocation, 'componentId');
                        return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.contentSlotComponentsRestService.update({
                                pageId: pageId,
                                currentSlotId: sourceSlotId,
                                componentId: componentId,
                                slotId: targetSlotId,
                                position: position
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        this.generateAndAlertErrorMessage(componentId, targetSlotId, error_2, {
                            message: 'se.cms.draganddrop.move.failed',
                            messagePlaceholders: {
                                slotID: targetSlotId,
                                componentID: componentId
                            }
                        });
                        return [2 /*return*/, Promise.reject()];
                    case 5: return [2 /*return*/, this.renderSlots([sourceSlotId, targetSlotId], componentId, targetSlotId)];
                }
            });
        });
    };
    ComponentEditingFacade.prototype.moveComponent.$inject = ["sourceSlotId", "targetSlotId", "componentId", "position"];
    /* @ngInject */ ComponentEditingFacade.prototype.generateAndAlertSuccessMessage = function (sourceComponentId, targetSlotId) {
        this.alertService.showSuccess({
            message: 'se.cms.draganddrop.success',
            messagePlaceholders: {
                sourceComponentId: sourceComponentId,
                targetSlotId: targetSlotId
            }
        });
    };
    ComponentEditingFacade.prototype.generateAndAlertSuccessMessage.$inject = ["sourceComponentId", "targetSlotId"];
    /* @ngInject */ ComponentEditingFacade.prototype.generateAndAlertErrorMessage = function (sourceComponentId, targetSlotId, requestResponse, alertConf) {
        if (this.hasErrorResponseErrors(requestResponse)) {
            this.alertService.showDanger({
                message: 'se.cms.draganddrop.error',
                messagePlaceholders: {
                    sourceComponentId: sourceComponentId,
                    targetSlotId: targetSlotId,
                    detailedError: requestResponse.error.errors[0].message
                }
            });
        }
        else if (alertConf) {
            this.alertService.showDanger(alertConf);
        }
    };
    ComponentEditingFacade.prototype.generateAndAlertErrorMessage.$inject = ["sourceComponentId", "targetSlotId", "requestResponse", "alertConf"];
    /* @ngInject */ ComponentEditingFacade.prototype.hasErrorResponseErrors = function (response) {
        var _a, _b;
        return !!(((_b = (_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.errors) === null || _b === void 0 ? void 0 : _b.length) > 0);
    };
    ComponentEditingFacade.prototype.hasErrorResponseErrors.$inject = ["response"];
    /* @ngInject */ ComponentEditingFacade.prototype.renderSlots = function (slots, sourceComponentId, targetSlotId, showSuccess) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.renderService.renderSlots(slots)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        this.logService.error(this.constructor.name + ".renderSlots::renderService.renderSlots - targetSlotId:", targetSlotId);
                        this.logService.error(error_3);
                        this.generateAndAlertErrorMessage(sourceComponentId, targetSlotId, error_3);
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.slotVisibilityService.reloadSlotsInfo()];
                    case 4:
                        _a.sent();
                        if (showSuccess) {
                            this.generateAndAlertSuccessMessage(sourceComponentId, targetSlotId);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        this.logService.error(this.constructor.name + ".renderSlots::slotVisibilityService.reloadSlotsInfo");
                        this.logService.error(error_4);
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ComponentEditingFacade.prototype.renderSlots.$inject = ["slots", "sourceComponentId", "targetSlotId", "showSuccess"];
    /* @ngInject */ ComponentEditingFacade = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IAlertService,
            cmscommons.ComponentService,
            cmscommons.IComponentVisibilityAlertService,
            smarteditcommons.CrossFrameEventService,
            cmscommons.IEditorModalService,
            smarteditcommons.LogService,
            smarteditcommons.IPageInfoService,
            smarteditcommons.IRenderService,
            smarteditcommons.IRestServiceFactory,
            SlotVisibilityService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.SystemEventService,
            core$1.TranslateService])
    ], /* @ngInject */ ComponentEditingFacade);
    return /* @ngInject */ ComponentEditingFacade;
}());

/**
 * This service provides a rich drag and drop experience tailored for CMS operations.
 */
var /* @ngInject */ CmsDragAndDropService = /** @class */ (function () {
    CmsDragAndDropService.$inject = ["alertService", "assetsService", "browserService", "componentEditingFacade", "componentHandlerService", "dragAndDropService", "gatewayFactory", "translateService", "pageContentSlotsComponentsRestService", "slotRestrictionsService", "systemEventService", "waitDialogService", "yjQuery", "domain"];
    function /* @ngInject */ CmsDragAndDropService(alertService, assetsService, browserService, componentEditingFacade, componentHandlerService, dragAndDropService, gatewayFactory, translateService, pageContentSlotsComponentsRestService, slotRestrictionsService, systemEventService, waitDialogService, yjQuery, domain) {
        this.alertService = alertService;
        this.assetsService = assetsService;
        this.browserService = browserService;
        this.componentEditingFacade = componentEditingFacade;
        this.componentHandlerService = componentHandlerService;
        this.dragAndDropService = dragAndDropService;
        this.gatewayFactory = gatewayFactory;
        this.translateService = translateService;
        this.pageContentSlotsComponentsRestService = pageContentSlotsComponentsRestService;
        this.slotRestrictionsService = slotRestrictionsService;
        this.systemEventService = systemEventService;
        this.waitDialogService = waitDialogService;
        this.yjQuery = yjQuery;
        this.domain = domain;
        this.cachedSlots = {};
        this.highlightedSlot = null;
        this.highlightedComponent = null;
        this.highlightedHint = null;
        this.dragInfo = null;
        this.overlayRenderedUnSubscribeFn = null;
        this.componentRemovedUnSubscribeFn = null;
        this._window = smarteditcommons.windowUtils.getWindow();
        this.gateway = this.gatewayFactory.createGateway('cmsDragAndDrop');
    }
    /* @ngInject */ CmsDragAndDropService_1 = /* @ngInject */ CmsDragAndDropService;
    /**
     * This method registers this drag and drop instance in SmartEdit.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.register = function () {
        var _this = this;
        this.dragAndDropService.register({
            id: /* @ngInject */ CmsDragAndDropService_1.CMS_DRAG_AND_DROP_ID,
            sourceSelector: [
                /* @ngInject */ CmsDragAndDropService_1.SOURCE_SELECTOR,
                /* @ngInject */ CmsDragAndDropService_1.MORE_MENU_SOURCE_SELECTOR
            ],
            targetSelector: /* @ngInject */ CmsDragAndDropService_1.TARGET_SELECTOR,
            startCallback: function (event) { return _this.onStart(event); },
            dragEnterCallback: function (event) { return _this.onDragEnter(event); },
            dragOverCallback: function (event) { return _this.onDragOver(event); },
            dropCallback: function (event) { return _this.onDrop(event); },
            outCallback: function (event) { return _this.onDragLeave(event); },
            stopCallback: function (event) { return _this.onStop(event); },
            enableScrolling: true,
            helper: function () { return _this.getDragImageSrc(); }
        });
    };
    /**
     * This method unregisters this drag and drop instance from SmartEdit.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.unregister = function () {
        this.dragAndDropService.unregister([/* @ngInject */ CmsDragAndDropService_1.CMS_DRAG_AND_DROP_ID]);
        if (this.overlayRenderedUnSubscribeFn) {
            this.overlayRenderedUnSubscribeFn();
        }
        if (this.componentRemovedUnSubscribeFn) {
            this.componentRemovedUnSubscribeFn();
        }
    };
    /**
     * This method applies this drag and drop instance in the current page. After this method is executed,
     * the user can start a drag and drop operation.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.apply = function () {
        var _this = this;
        this.dragAndDropService.apply(/* @ngInject */ CmsDragAndDropService_1.CMS_DRAG_AND_DROP_ID);
        this.addUIHelpers();
        // Register a listener for every time the overlay is updated.
        this.overlayRenderedUnSubscribeFn = this.systemEventService.subscribe(smarteditcommons.OVERLAY_RERENDERED_EVENT, function () { return _this.onOverlayUpdate(); });
        this.componentRemovedUnSubscribeFn = this.systemEventService.subscribe(cmscommons.COMPONENT_REMOVED_EVENT, function () { return _this.onOverlayUpdate(); });
        this.gateway.subscribe(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_STARTED, function (eventId, data) {
            _this.dragAndDropService.markDragStarted();
            _this.initializeDragOperation(data);
        });
        this.gateway.subscribe(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_STOPPED, function () {
            _this.dragAndDropService.markDragStopped();
            _this.cleanDragOperation();
        });
    };
    /**
     * This method updates this drag and drop instance in the current page. It is important to execute
     * this method every time a draggable or droppable element is added or removed from the page DOM.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.update = function () {
        this.dragAndDropService.update(/* @ngInject */ CmsDragAndDropService_1.CMS_DRAG_AND_DROP_ID);
        // Add UI helpers -> They identify the places where you can drop components.
        this.addUIHelpers();
        // Update cache elements AFTER adding UI Helpers
        this.cacheElements();
    };
    // Other Event Handlers
    /* @ngInject */ CmsDragAndDropService.prototype.onOverlayUpdate = function () {
        this.update();
        return Promise.resolve();
    };
    // Drag and Drop Event Handlers
    /* @ngInject */ CmsDragAndDropService.prototype.onStart = function (event) {
        // Find element
        var targetElm = this.getSelector(event.target);
        // when the DnD icon is in the more option dropdown, the targetElm is a span and has no data-component-id. Here we get the closest element (i.e. <contextual-menu-item>)
        if (!targetElm.attr('data-component-id')) {
            targetElm = this.yjQuery(targetElm).closest('[data-component-id]');
        }
        var component = targetElm.closest(/* @ngInject */ CmsDragAndDropService_1.COMPONENT_SELECTOR);
        var slot = component.closest(/* @ngInject */ CmsDragAndDropService_1.SLOT_SELECTOR);
        // Here if the component evaluated above exits that means the component has been located and we can fetch its attributes
        // else it is not located as the DnD option is hidden inside the more option of the contextual menu in which case
        // we find the component/slot info by accessing attributes of the DnD icon.
        var componentId = component.length > 0
            ? this.componentHandlerService.getId(component)
            : targetElm.attr('data-component-id');
        var componentUuid = component.length > 0
            ? this.componentHandlerService.getSlotOperationRelatedUuid(component)
            : targetElm.attr('data-component-uuid');
        var componentType = component.length > 0
            ? this.componentHandlerService.getType(component)
            : targetElm.attr('data-component-type');
        var slotOperationRelatedId = component.length > 0
            ? this.componentHandlerService.getSlotOperationRelatedId(component)
            : targetElm.attr('data-component-id');
        var slotOperationRelatedType = component.length > 0
            ? this.componentHandlerService.getSlotOperationRelatedType(component)
            : targetElm.attr('data-component-type');
        var slotId = component.length > 0
            ? this.componentHandlerService.getId(slot)
            : targetElm.attr('data-slot-id');
        var slotUuid = component.length > 0
            ? this.componentHandlerService.getId(slot)
            : targetElm.attr('data-slot-uuid');
        var dragInfo = {
            componentId: componentId,
            componentUuid: componentUuid,
            componentType: componentType,
            slotUuid: slotUuid,
            slotId: slotId,
            slotOperationRelatedId: slotOperationRelatedId,
            slotOperationRelatedType: slotOperationRelatedType
        };
        component.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.COMPONENT_DRAGGED);
        this.initializeDragOperation(dragInfo);
        this.toggleKeepVisibleComponentAndSlot(true);
    };
    CmsDragAndDropService.prototype.onStart.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.onDragEnter = function (event) {
        return this.highlightSlot(event);
    };
    CmsDragAndDropService.prototype.onDragEnter.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.onDragOver = function (event) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var slotId, cachedSlot, componentToHighlight, hintToHighlight;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.highlightSlot(event)];
                    case 1:
                        _b.sent();
                        if (!this.highlightedSlot || !this.highlightedSlot.isAllowed) {
                            return [2 /*return*/];
                        }
                        slotId = this.componentHandlerService.getId(this.highlightedSlot.original);
                        // Check which component is highlighted
                        if (this.highlightedHint && this.isMouseInRegion(event, this.highlightedHint)) {
                            // If right hint is already highlighted don't do anything.
                            return [2 /*return*/];
                        }
                        else if (this.highlightedHint) {
                            // Hint is not longer hovered.
                            this.clearHighlightedHint();
                        }
                        cachedSlot = this.cachedSlots[slotId];
                        if (cachedSlot.components.length > 0) {
                            // Find the hovered component.
                            if (!this.highlightedComponent ||
                                !this.isMouseInRegion(event, this.highlightedComponent)) {
                                this.clearHighlightedComponent();
                                componentToHighlight = this.selectMouseOverElement(event, cachedSlot.components);
                                if (componentToHighlight) {
                                    this.highlightedComponent = componentToHighlight;
                                }
                            }
                            // Find the hint, if any, to highlight.
                            if ((_a = this.highlightedComponent) === null || _a === void 0 ? void 0 : _a.hints) {
                                hintToHighlight = this.selectMouseOverElement(event, this.highlightedComponent.hints);
                                if (hintToHighlight) {
                                    this.highlightedHint = hintToHighlight;
                                }
                            }
                        }
                        if (this.highlightedComponent &&
                            this.highlightedComponent.id === this.dragInfo.slotOperationRelatedId) {
                            this.highlightedComponent.original.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.COMPONENT_DRAGGED_HOVERED);
                        }
                        else if (this.highlightedHint) {
                            if (this.highlightedSlot.isAllowed) {
                                this.highlightedHint.original.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_HOVERED);
                                if (this.highlightedSlot.mayBeAllowed) {
                                    this.highlightedHint.original.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_MAY_BE_ALLOWED);
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CmsDragAndDropService.prototype.onDragOver.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.selectMouseOverElement = function (event, elements) {
        var _this = this;
        return elements.find(function (element) { return _this.isMouseInRegion(event, element); });
    };
    CmsDragAndDropService.prototype.selectMouseOverElement.$inject = ["event", "elements"];
    /* @ngInject */ CmsDragAndDropService.prototype.onDrop = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceSlotId, targetSlotId, targetSlotUUId, sourceComponentId, sourceSlotOperationRelatedId, componentType, translation, position, performAction, slotInfo, catalogVersionUuid, dragInfo, componentProperties, currentComponentPos, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.highlightedSlot) return [3 /*break*/, 5];
                        sourceSlotId = this.dragInfo.slotId;
                        targetSlotId = this.componentHandlerService.getId(this.highlightedSlot.original);
                        targetSlotUUId = this.componentHandlerService.getUuid(this.highlightedSlot.original);
                        sourceComponentId = this.dragInfo.componentId;
                        sourceSlotOperationRelatedId = this.dragInfo.slotOperationRelatedId || this.dragInfo.componentId;
                        componentType = this.dragInfo.slotOperationRelatedType || this.dragInfo.componentType;
                        if (!this.highlightedSlot.isAllowed) {
                            translation = this.translateService.instant('se.drag.and.drop.not.valid.component.type', {
                                slotUID: targetSlotId,
                                componentUID: sourceSlotOperationRelatedId
                            });
                            this.alertService.showDanger({
                                message: translation
                            });
                            return [2 /*return*/];
                        }
                        if (!(this.highlightedHint || this.highlightedSlot.components.length === 0)) return [3 /*break*/, 5];
                        position = this.highlightedHint ? this.highlightedHint.position : 0;
                        performAction = void 0;
                        this.waitDialogService.showWaitModal();
                        if (!sourceSlotId) {
                            if (!sourceComponentId) {
                                slotInfo = {
                                    targetSlotId: targetSlotId,
                                    targetSlotUUId: targetSlotUUId
                                };
                                catalogVersionUuid = this.componentHandlerService.getCatalogVersionUuid(this.highlightedSlot.original);
                                performAction = this.componentEditingFacade.addNewComponentToSlot(slotInfo, catalogVersionUuid, componentType, position);
                            }
                            else {
                                dragInfo = {
                                    componentId: sourceComponentId,
                                    componentUuid: this.dragInfo.componentUuid,
                                    componentType: componentType
                                };
                                componentProperties = {
                                    targetSlotId: targetSlotId,
                                    dragInfo: dragInfo,
                                    position: position
                                };
                                performAction = this.dragInfo.cloneOnDrop
                                    ? this.componentEditingFacade.cloneExistingComponentToSlot(componentProperties)
                                    : this.componentEditingFacade.addExistingComponentToSlot(targetSlotId, dragInfo, position);
                            }
                        }
                        else {
                            if (sourceSlotId === targetSlotId) {
                                currentComponentPos = this.getComponentPositionFromCachedSlot(sourceSlotId, sourceComponentId);
                                if (currentComponentPos < position) {
                                    // The current component will be removed from its current position, thus the target
                                    // position needs to take this into account.
                                    position--;
                                }
                                else if (currentComponentPos === position) {
                                    // Do not perform update if position and slot has not changed.
                                    this.waitDialogService.hideWaitModal();
                                    return [2 /*return*/];
                                }
                            }
                            performAction = this.componentEditingFacade.moveComponent(sourceSlotId, targetSlotId, sourceSlotOperationRelatedId, position);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, performAction];
                    case 2:
                        _b.sent();
                        this.scrollToModifiedSlot(targetSlotId);
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        this.onStop(event);
                        return [3 /*break*/, 5];
                    case 4:
                        this.waitDialogService.hideWaitModal();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CmsDragAndDropService.prototype.onDrop.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.getComponentPositionFromCachedSlot = function (slotId, componentId) {
        var _this = this;
        var cachedSlot = this.cachedSlots[slotId];
        var componentsInCachedSlot = (cachedSlot === null || cachedSlot === void 0 ? void 0 : cachedSlot.components) ? cachedSlot.components : [];
        var cachedComponent = componentsInCachedSlot.find(function (component) { return _this.componentHandlerService.getId(component.original) === componentId; });
        var currentComponentPos = cachedComponent
            ? cachedComponent.position
            : this.componentHandlerService.getComponentPositionInSlot(slotId, componentId);
        return currentComponentPos;
    };
    CmsDragAndDropService.prototype.getComponentPositionFromCachedSlot.$inject = ["slotId", "componentId"];
    /* @ngInject */ CmsDragAndDropService.prototype.onDragLeave = function (event) {
        if (this.highlightedSlot) {
            var slotId = this.componentHandlerService.getId(this.highlightedSlot.original);
            var cachedSlot = this.cachedSlots[slotId];
            if (!this.isMouseInRegion(event, cachedSlot)) {
                this.clearHighlightedSlot();
            }
        }
    };
    CmsDragAndDropService.prototype.onDragLeave.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.onStop = function (event) {
        var component = this.getSelector(event.target).closest(/* @ngInject */ CmsDragAndDropService_1.COMPONENT_SELECTOR);
        this.toggleKeepVisibleComponentAndSlot(false);
        this.cleanDragOperation(component);
        this.systemEventService.publish(smarteditcommons.CONTRACT_CHANGE_LISTENER_PROCESS_EVENTS.RESTART_PROCESS);
    };
    CmsDragAndDropService.prototype.onStop.$inject = ["event"];
    /**
     * This function returns the source of the image used as drag image. Currently, the
     * image is only returned for Safari; all the other browsers display default images
     * properly.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.getDragImageSrc = function () {
        var imagePath = '';
        if (this.browserService.isSafari()) {
            imagePath = this.assetsService.getAssetsRoot() + /* @ngInject */ CmsDragAndDropService_1.DEFAULT_DRAG_IMG;
        }
        return this.domain + imagePath;
    };
    /* @ngInject */ CmsDragAndDropService.prototype.initializeDragOperation = function (dragInfo) {
        this.dragInfo = dragInfo;
        this.cacheElements();
        // Prepare UI
        var overlay = this.componentHandlerService.getOverlay();
        overlay.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.OVERLAY_IN_DRAG_DROP);
        // Send an event to signal that the drag operation is started. Other pieces of SE, like contextual menus
        // need to be aware.
        this.systemEventService.publishAsync(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_STARTED);
    };
    CmsDragAndDropService.prototype.initializeDragOperation.$inject = ["dragInfo"];
    /* @ngInject */ CmsDragAndDropService.prototype.cleanDragOperation = function (draggedComponent) {
        this.clearHighlightedSlot();
        if (draggedComponent) {
            draggedComponent.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.COMPONENT_DRAGGED);
        }
        var overlay = this.componentHandlerService.getOverlay();
        overlay.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.OVERLAY_IN_DRAG_DROP);
        this.systemEventService.publishAsync(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_STOPPED);
        this.dragInfo = null;
        this.cachedSlots = {};
        this.highlightedSlot = null;
    };
    CmsDragAndDropService.prototype.cleanDragOperation.$inject = ["draggedComponent"];
    /* @ngInject */ CmsDragAndDropService.prototype.highlightSlot = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var slot, slotId, oldSlotId, dragInfo, isComponentAllowed, isSlotEditable, isAllowed, mayBeAllowed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slot = this.yjQuery(event.target).closest(/* @ngInject */ CmsDragAndDropService_1.SLOT_SELECTOR);
                        slotId = this.componentHandlerService.getId(slot);
                        if (this.highlightedSlot) {
                            oldSlotId = this.componentHandlerService.getId(this.highlightedSlot.original);
                            if (oldSlotId !== slotId) {
                                this.clearHighlightedSlot();
                            }
                        }
                        if (!(!this.highlightedSlot || this.highlightedSlot.isAllowed === undefined)) return [3 /*break*/, 3];
                        this.highlightedSlot = this.cachedSlots[slotId];
                        dragInfo = __assign({}, this.dragInfo);
                        // if component is dragged from component-menu, there is no slotOperationRelated(Id/Type) available.
                        dragInfo.componentId =
                            this.dragInfo.slotOperationRelatedId || this.dragInfo.componentId;
                        dragInfo.componentType =
                            this.dragInfo.slotOperationRelatedType || this.dragInfo.componentType;
                        if (dragInfo.cloneOnDrop) {
                            delete dragInfo.componentId;
                        }
                        return [4 /*yield*/, this.slotRestrictionsService.isComponentAllowedInSlot(this.highlightedSlot, dragInfo)];
                    case 1:
                        isComponentAllowed = _a.sent();
                        return [4 /*yield*/, this.slotRestrictionsService.isSlotEditable(slotId)];
                    case 2:
                        isSlotEditable = _a.sent();
                        // The highlighted slot might have changed while waiting for the promise to be resolved.
                        if (this.highlightedSlot && this.highlightedSlot.id === slotId) {
                            isAllowed = isComponentAllowed === cmscommons.COMPONENT_IN_SLOT_STATUS.ALLOWED && isSlotEditable;
                            mayBeAllowed = isComponentAllowed === cmscommons.COMPONENT_IN_SLOT_STATUS.MAYBEALLOWED && isSlotEditable;
                            /* Basically the component could be allowed to drop in the slot if the isComponentAllowed status is either ALLOWED or MAYBEALLOWED.
                             * But in order to differentiate between ALLOWED and MAYBEALLOWED, we store it in highlightedSlot.isAllowed and highlightedSlot.mayBeAllowed respectively.
                             */
                            this.highlightedSlot.isAllowed = isAllowed || mayBeAllowed;
                            this.highlightedSlot.mayBeAllowed = mayBeAllowed;
                            if (this.highlightedSlot.isAllowed) {
                                slot.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_ALLOWED);
                                if (mayBeAllowed) {
                                    slot.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_MAY_BE_ALLOWED);
                                }
                            }
                            else {
                                slot.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_NOT_ALLOWED);
                            }
                            if (event.type === 'dragenter' && (!oldSlotId || oldSlotId !== slotId)) {
                                if (this.highlightedSlot && this.highlightedSlot.id === slotId) {
                                    this.systemEventService.publish(slotId + '_SHOW_SLOT_MENU');
                                    this.systemEventService.publish(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_OVER, slotId); // can be used to perform any actions on encountering a drag over event.
                                }
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CmsDragAndDropService.prototype.highlightSlot.$inject = ["event"];
    /* @ngInject */ CmsDragAndDropService.prototype.addUIHelpers = function () {
        var overlay = this.componentHandlerService.getOverlay();
        // First remove all dropzones.
        overlay.find('.' + /* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.UI_HELPER_OVERLAY).remove();
        var vm = this;
        overlay.find(/* @ngInject */ CmsDragAndDropService_1.SLOT_SELECTOR).each(function (i, overlayElement) {
            var slot = vm.yjQuery(overlayElement);
            var slotHeight = slot[0].offsetHeight;
            var slotWidth = slot[0].offsetWidth;
            var components = slot.find(/* @ngInject */ CmsDragAndDropService_1.COMPONENT_SELECTOR);
            if (components.length === 0) {
                var uiHelperOverlay = vm.yjQuery('<div></div>');
                uiHelperOverlay.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.UI_HELPER_OVERLAY);
                var uiHelper = vm.yjQuery('<div></div>');
                uiHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE);
                uiHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_FULL);
                uiHelperOverlay.height(slotHeight);
                uiHelperOverlay.width(slotWidth);
                uiHelperOverlay.append(uiHelper);
                slot.append(uiHelperOverlay);
            }
            else {
                components.each(function (j, componentElement) {
                    var component = vm.yjQuery(componentElement);
                    var componentHeight = component[0].offsetHeight;
                    var componentWidth = component[0].offsetWidth;
                    var uiHelperOverlay = vm.yjQuery('<div></div>');
                    uiHelperOverlay.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.UI_HELPER_OVERLAY);
                    uiHelperOverlay.height(componentHeight);
                    uiHelperOverlay.width(componentWidth);
                    var firstHelper = vm.yjQuery('<div></div>');
                    var secondHelper = vm.yjQuery('<div></div>');
                    firstHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE);
                    secondHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE);
                    if (componentWidth === slotWidth) {
                        firstHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_TOP);
                        secondHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_BOTTOM);
                    }
                    else {
                        firstHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_LEFT);
                        secondHelper.addClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_RIGHT);
                    }
                    uiHelperOverlay.append(firstHelper);
                    uiHelperOverlay.append(secondHelper);
                    component.append(uiHelperOverlay);
                });
            }
        });
    };
    /* @ngInject */ CmsDragAndDropService.prototype.cacheElements = function () {
        var _this = this;
        var overlay = this.componentHandlerService.getOverlay();
        if (!overlay) {
            return;
        }
        var scrollY = this.getWindowScrolling();
        overlay.find(/* @ngInject */ CmsDragAndDropService_1.SLOT_SELECTOR).each(function (si, slotElement) {
            var slot = _this.yjQuery(slotElement);
            var slotId = _this.componentHandlerService.getId(slot);
            var slotUuid = _this.componentHandlerService.getUuid(slot);
            // Fetch all components (visible or not) in each slot to get proper position values.
            // The componentHandlerService.getComponentPositionInSlot method is not used here, because it's only based on visible components in the DOM.
            _this.pageContentSlotsComponentsRestService
                .getComponentsForSlot(slotId)
                .then(function (componentsForSlot) {
                var cachedSlot = {
                    id: slotId,
                    uuid: slotUuid,
                    original: slot,
                    components: [],
                    rect: _this.getElementRects(slot, scrollY),
                    hint: null
                };
                var components = slot.children(/* @ngInject */ CmsDragAndDropService_1.COMPONENT_SELECTOR);
                if (components.length === 0) {
                    var hint = slot.find(/* @ngInject */ CmsDragAndDropService_1.HINT_SELECTOR);
                    cachedSlot.hint =
                        hint.length > 0
                            ? {
                                original: hint,
                                rect: _this.getElementRects(hint, scrollY)
                            }
                            : null;
                }
                else {
                    components.each(function (ci, componentElement) {
                        var component = _this.yjQuery(componentElement);
                        var positionInSlot = componentsForSlot.findIndex(function (componentInSlot) {
                            return componentInSlot.uuid ===
                                _this.componentHandlerService.getUuid(component);
                        });
                        if (positionInSlot === -1) {
                            positionInSlot = ci;
                        }
                        var cachedComponent = {
                            id: _this.componentHandlerService.getSlotOperationRelatedId(component),
                            type: _this.componentHandlerService.getSlotOperationRelatedType(component),
                            original: component,
                            position: positionInSlot,
                            hints: [],
                            rect: _this.getElementRects(component, scrollY)
                        };
                        var positionInComponent = positionInSlot++;
                        component
                            .find(/* @ngInject */ CmsDragAndDropService_1.HINT_SELECTOR)
                            .each(function (hi, hintElement) {
                            var hint = _this.yjQuery(hintElement);
                            var cachedHint = {
                                original: hint,
                                position: positionInComponent++,
                                rect: _this.getElementRects(hint, scrollY)
                            };
                            cachedComponent.hints.push(cachedHint);
                        });
                        cachedSlot.components.push(cachedComponent);
                    });
                }
                _this.cachedSlots[cachedSlot.id] = cachedSlot;
            });
        });
    };
    /* @ngInject */ CmsDragAndDropService.prototype.clearHighlightedHint = function () {
        if (this.highlightedHint) {
            this.highlightedHint.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_HOVERED);
            this.highlightedHint.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.DROPZONE_MAY_BE_ALLOWED);
            this.highlightedHint = null;
        }
    };
    /* @ngInject */ CmsDragAndDropService.prototype.clearHighlightedComponent = function () {
        this.clearHighlightedHint();
        if (this.highlightedComponent) {
            this.highlightedComponent.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.COMPONENT_DRAGGED_HOVERED);
            this.highlightedComponent = null;
        }
    };
    /* @ngInject */ CmsDragAndDropService.prototype.clearHighlightedSlot = function () {
        this.clearHighlightedComponent();
        if (this.highlightedSlot) {
            this.highlightedSlot.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_ALLOWED);
            this.highlightedSlot.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_NOT_ALLOWED);
            this.highlightedSlot.original.removeClass(/* @ngInject */ CmsDragAndDropService_1.CSS_CLASSES.SLOT_MAY_BE_ALLOWED);
            this.systemEventService.publish('HIDE_SLOT_MENU');
            this.systemEventService.publish(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_LEAVE); // can be used to perform any actions on encountering a drag leave event.
        }
        this.highlightedSlot = null;
    };
    /* @ngInject */ CmsDragAndDropService.prototype.isMouseInRegion = function (event, element) {
        var boundingRect = element.rect;
        return (event.pageX >= boundingRect.left &&
            event.pageX <= boundingRect.right &&
            event.pageY >= boundingRect.top &&
            event.pageY <= boundingRect.bottom);
    };
    CmsDragAndDropService.prototype.isMouseInRegion.$inject = ["event", "element"];
    /* @ngInject */ CmsDragAndDropService.prototype.getElementRects = function (element, scrollY) {
        var baseRect = element[0].getBoundingClientRect();
        return {
            left: baseRect.left,
            right: baseRect.right,
            bottom: baseRect.bottom + scrollY,
            top: baseRect.top + scrollY
        };
    };
    CmsDragAndDropService.prototype.getElementRects.$inject = ["element", "scrollY"];
    /* @ngInject */ CmsDragAndDropService.prototype.getWindowScrolling = function () {
        return this._window.pageYOffset;
    };
    /* @ngInject */ CmsDragAndDropService.prototype.scrollToModifiedSlot = function (componentId) {
        var component = this.componentHandlerService.getComponentInOverlay(componentId, smarteditcommons.CONTENT_SLOT_TYPE);
        if (component && component.length > 0) {
            component[0].scrollIntoView();
        }
    };
    CmsDragAndDropService.prototype.scrollToModifiedSlot.$inject = ["componentId"];
    /* @ngInject */ CmsDragAndDropService.prototype.getSelector = function (selector) {
        return this.yjQuery(selector);
    };
    CmsDragAndDropService.prototype.getSelector.$inject = ["selector"];
    /**
     * When a PROCESS_COMPONENTS is occuring, it could remove the currently dragged component if this one is not in the viewport.
     * To avoid having the dragged component and it's slot removed we mark then as "KEEP_VISIBLE" when the drag and drop start.
     * On drag end, an event is sent to call a RESTART_PROCESS to add or remove the components according to their viewport visibility and the component and slot are marked as "PROCESS".
     * Using yjQuery.each() here because of MiniCart component (among other slots/compoents) that have multiple occurences in DOM.
     */
    /* @ngInject */ CmsDragAndDropService.prototype.toggleKeepVisibleComponentAndSlot = function (keepVisible) {
        if (this.dragInfo) {
            var status_1 = keepVisible
                ? smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.KEEP_VISIBLE
                : smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.PROCESS;
            this.yjQuery.each(this.componentHandlerService.getComponentUnderSlot(this.dragInfo.componentId, this.dragInfo.componentType, this.dragInfo.slotId), function (i, element) {
                element.dataset[smarteditcommons.SMARTEDIT_COMPONENT_PROCESS_STATUS] = status_1;
            });
            this.yjQuery.each(this.componentHandlerService.getComponent(this.dragInfo.slotId, smarteditcommons.CONTENT_SLOT_TYPE), function (i, element) {
                element.dataset[smarteditcommons.SMARTEDIT_COMPONENT_PROCESS_STATUS] = status_1;
            });
        }
    };
    CmsDragAndDropService.prototype.toggleKeepVisibleComponentAndSlot.$inject = ["keepVisible"];
    var /* @ngInject */ CmsDragAndDropService_1;
    /* @ngInject */ CmsDragAndDropService.CMS_DRAG_AND_DROP_ID = 'se.cms.dragAndDrop';
    /* @ngInject */ CmsDragAndDropService.TARGET_SELECTOR = "#smarteditoverlay .smartEditComponentX[data-smartedit-component-type='ContentSlot']";
    /* @ngInject */ CmsDragAndDropService.SOURCE_SELECTOR = "#smarteditoverlay .smartEditComponentX[data-smartedit-component-type!='ContentSlot'] .movebutton";
    /* @ngInject */ CmsDragAndDropService.MORE_MENU_SOURCE_SELECTOR = '.movebutton';
    /* @ngInject */ CmsDragAndDropService.SLOT_SELECTOR = ".smartEditComponentX[data-smartedit-component-type='ContentSlot']";
    /* @ngInject */ CmsDragAndDropService.COMPONENT_SELECTOR = ".smartEditComponentX[data-smartedit-component-type!='ContentSlot']";
    /* @ngInject */ CmsDragAndDropService.HINT_SELECTOR = '.overlayDropzone';
    /* @ngInject */ CmsDragAndDropService.CSS_CLASSES = {
        UI_HELPER_OVERLAY: 'overlayDnd',
        DROPZONE: 'overlayDropzone',
        DROPZONE_FULL: 'overlayDropzone--full',
        DROPZONE_TOP: 'overlayDropzone--top',
        DROPZONE_BOTTOM: 'overlayDropzone--bottom',
        DROPZONE_LEFT: 'overlayDropzone--left',
        DROPZONE_RIGHT: 'overlayDropzone--right',
        DROPZONE_HOVERED: 'overlayDropzone--hovered',
        DROPZONE_MAY_BE_ALLOWED: 'overlayDropzone--mayBeAllowed',
        OVERLAY_IN_DRAG_DROP: 'smarteditoverlay_dndRendering',
        COMPONENT_DRAGGED: 'component_dragged',
        COMPONENT_DRAGGED_HOVERED: 'component_dragged_hovered',
        SLOTS_MARKED: 'slot-marked',
        SLOT_ALLOWED: 'over-slot-enabled',
        SLOT_NOT_ALLOWED: 'over-slot-disabled',
        SLOT_MAY_BE_ALLOWED: 'over-slot-maybeenabled'
    };
    /* @ngInject */ CmsDragAndDropService.DEFAULT_DRAG_IMG = '/images/contextualmenu_move_on.png';
    /* @ngInject */ CmsDragAndDropService = /* @ngInject */ CmsDragAndDropService_1 = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(12, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __param(13, core.Inject(smarteditcommons.DOMAIN_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.IAlertService,
            cmscommons.AssetsService,
            smarteditcommons.IBrowserService,
            ComponentEditingFacade,
            smartedit.ComponentHandlerService,
            smarteditcommons.DragAndDropService,
            smarteditcommons.GatewayFactory,
            core$1.TranslateService,
            cmscommons.IPageContentSlotsComponentsRestService,
            cmscommons.ISlotRestrictionsService,
            smarteditcommons.SystemEventService,
            smarteditcommons.IWaitDialogService, Function, String])
    ], /* @ngInject */ CmsDragAndDropService);
    return /* @ngInject */ CmsDragAndDropService;
}());

var /* @ngInject */ PageService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PageService, _super);
    function /* @ngInject */ PageService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ PageService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.IPageService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ PageService);
    return /* @ngInject */ PageService;
}(cmscommons.IPageService));

var /* @ngInject */ SharedComponentButton = /** @class */ (function () {
    SharedComponentButton.$inject = ["contextAwareEditableItemService"];
    function /* @ngInject */ SharedComponentButton(contextAwareEditableItemService) {
        this.contextAwareEditableItemService = contextAwareEditableItemService;
        this.isReady = false;
    }
    /* @ngInject */ SharedComponentButton.prototype.$onInit = function () {
        var _this = this;
        this.contextAwareEditableItemService
            .isItemEditable(this.smarteditComponentId)
            .then(function (isEditable) {
            _this.isReady = true;
            _this.message = "se.cms.contextmenu.shared.component.info.msg" + (isEditable ? '.editable' : '');
        });
    };
    /* @ngInject */ SharedComponentButton = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'sharedComponentButtonTemplate.html',
            inputs: ['smarteditComponentId']
        }),
        __metadata("design:paramtypes", [cmscommons.IContextAwareEditableItemService])
    ], /* @ngInject */ SharedComponentButton);
    return /* @ngInject */ SharedComponentButton;
}());

var /* @ngInject */ SlotSynchronizationPanel = /** @class */ (function () {
    SlotSynchronizationPanel.$inject = ["pageService", "pageInfoService", "slotSynchronizationService", "pageContentSlotsService", "$translate", "$q"];
    function /* @ngInject */ SlotSynchronizationPanel(pageService, pageInfoService, slotSynchronizationService, pageContentSlotsService, $translate, $q) {
        var _this = this;
        this.pageService = pageService;
        this.pageInfoService = pageInfoService;
        this.slotSynchronizationService = slotSynchronizationService;
        this.pageContentSlotsService = pageContentSlotsService;
        this.$translate = $translate;
        this.$q = $q;
        this.SYNCHRONIZATION_SLOTS_SELECT_ALL_COMPONENTS_LABEL = 'se.cms.synchronization.slots.select.all.components';
        this.getSyncStatus = function () {
            var promise = _this.pageInfoService.getPageUID().then(function (pageId) {
                return _this.slotSynchronizationService
                    .getSyncStatus(pageId, _this.slotId)
                    .then(function (syncStatus) {
                    if (!_this.slotSynchronizationService.syncStatusExists(syncStatus)) {
                        throw new Error('The SlotSynchronizationPanel must only be called for the slot whose sync status is available.');
                    }
                    else {
                        return _this.isSyncDisallowed().then(function (isDisallowed) {
                            if (isDisallowed) {
                                _this.disableSync();
                            }
                            return syncStatus;
                        });
                    }
                });
            });
            return _this.$q.when(promise);
        };
        this.performSync = function (itemsToSync) {
            return _this.slotSynchronizationService.performSync(itemsToSync);
        };
    }
    /* @ngInject */ SlotSynchronizationPanel.prototype.getApi = function ($api) {
        this.synchronizationPanelApi = $api;
    };
    SlotSynchronizationPanel.prototype.getApi.$inject = ["$api"];
    /* @ngInject */ SlotSynchronizationPanel.prototype.isSyncDisallowed = function () {
        var _this = this;
        return this.isPageSlot().then(function (isPageSlot) {
            return _this.isPageApproved().then(function (isPageApproved) { return isPageSlot && !isPageApproved; });
        });
    };
    /* @ngInject */ SlotSynchronizationPanel.prototype.isPageSlot = function () {
        return this.pageContentSlotsService
            .getSlotStatus(this.slotId)
            .then(function (slotStatus) {
            return slotStatus === cmscommons.SlotStatus.PAGE || slotStatus === cmscommons.SlotStatus.OVERRIDE;
        });
    };
    /* @ngInject */ SlotSynchronizationPanel.prototype.isPageApproved = function () {
        var _this = this;
        var promise = this.pageInfoService
            .getPageUUID()
            .then(function (pageUuid) { return _this.pageService.isPageApproved(pageUuid); });
        return this.$q.when(promise);
    };
    /* @ngInject */ SlotSynchronizationPanel.prototype.disableSync = function () {
        this.synchronizationPanelApi.setMessage({
            type: smarteditcommons.IAlertServiceType.WARNING,
            description: this.$translate.instant('se.cms.synchronization.slot.disabled.msg')
        });
        this.synchronizationPanelApi.disableItemList(true);
    };
    /* @ngInject */ SlotSynchronizationPanel = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'slotSynchronizationPanelTemplate.html',
            inputs: ['slotId']
        }),
        __metadata("design:paramtypes", [cmscommons.IPageService,
            smarteditcommons.IPageInfoService, Object, Object, Function, Function])
    ], /* @ngInject */ SlotSynchronizationPanel);
    return /* @ngInject */ SlotSynchronizationPanel;
}());

var /* @ngInject */ CmsComponentsModule = /** @class */ (function () {
    function /* @ngInject */ CmsComponentsModule() {
    }
    /* @ngInject */ CmsComponentsModule = __decorate([
        smarteditcommons.SeModule({
            imports: [CmsSmarteditServicesModule],
            declarations: [SlotSynchronizationPanel, SharedComponentButton]
        })
    ], /* @ngInject */ CmsComponentsModule);
    return /* @ngInject */ CmsComponentsModule;
}());

var /* @ngInject */ Cmssmartedit = /** @class */ (function () {
    function /* @ngInject */ Cmssmartedit() {
    }
    /* @ngInject */ Cmssmartedit = __decorate([
        smarteditcommons.SeModule({
            imports: [
                CmsSmarteditServicesModule,
                CmsComponentsModule,
                cmscommons.CmsResourceLocationsModule,
                'resourceLocationsModule',
                'decoratorServiceModule',
                'alertServiceModule',
                'translationServiceModule',
                'slotVisibilityButtonModule',
                'cmssmarteditTemplates',
                'cmscommonsTemplates',
                'smarteditServicesModule',
                'slotSharedButtonModule',
                'slotSyncButtonModule',
                'confirmationModalServiceModule',
                'sharedSlotDisabledDecoratorModule',
                'externalSlotDisabledDecoratorModule',
                'externalComponentDecoratorModule',
                'externalComponentButtonModule',
                'slotUnsharedButtonModule'
            ],
            initialize: ["$rootScope", "$q", "$translate", "alertService", "cmsDragAndDropService", "componentHandlerService", "pageInfoService", "confirmationModalService", "contextualMenuService", "decoratorService", "editorEnablerService", "featureService", "removeComponentService", "slotRestrictionsService", "slotSharedService", "slotVisibilityService", "componentEditingFacade", "cmsitemsRestService", "componentInfoService", "componentSharedService", "crossFrameEventService", "EVENT_SMARTEDIT_COMPONENT_UPDATED", "typePermissionsRestService", function ($rootScope, $q, $translate, alertService, cmsDragAndDropService, componentHandlerService, pageInfoService, confirmationModalService, contextualMenuService, decoratorService, editorEnablerService, featureService, removeComponentService, slotRestrictionsService, slotSharedService, slotVisibilityService, componentEditingFacade, cmsitemsRestService, componentInfoService, componentSharedService, crossFrameEventService, EVENT_SMARTEDIT_COMPONENT_UPDATED, typePermissionsRestService) {
                'ngInject';
                editorEnablerService.enableForComponents(['^((?!Slot).)*$']);
                decoratorService.addMappings({
                    '^((?!Slot).)*$': ['se.contextualMenu', 'externalComponentDecorator'],
                    '^.*Slot$': [
                        'se.slotContextualMenu',
                        'se.basicSlotContextualMenu',
                        'syncIndicator',
                        'sharedSlotDisabledDecorator',
                        'externalSlotDisabledDecorator'
                    ]
                });
                featureService.addContextualMenuButton({
                    key: 'externalcomponentbutton',
                    priority: 100,
                    nameI18nKey: 'se.cms.contextmenu.title.externalcomponent',
                    i18nKey: 'se.cms.contextmenu.title.externalcomponentbutton',
                    regexpKeys: ['^((?!Slot).)*$'],
                    condition: function (configuration) {
                        var slotId = componentHandlerService.getParentSlotForComponent(configuration.element);
                        return slotRestrictionsService
                            .isSlotEditable(slotId)
                            .then(function (isSlotEditable) {
                            if (!isSlotEditable) {
                                return false;
                            }
                            var smarteditCatalogVersionUuid = configuration.componentAttributes &&
                                configuration.componentAttributes.smarteditCatalogVersionUuid;
                            if (smarteditCatalogVersionUuid) {
                                return pageInfoService
                                    .getCatalogVersionUUIDFromPage()
                                    .then(function (uuid) { return smarteditCatalogVersionUuid !== uuid; });
                            }
                            return componentHandlerService.isExternalComponent(configuration.componentId, configuration.componentType);
                        });
                    },
                    action: {
                        template: '<external-component-button data-catalog-version-uuid="ctrl.componentAttributes.smarteditCatalogVersionUuid"></external-component-button>'
                    },
                    displayClass: 'externalcomponentbutton',
                    displayIconClass: 'hyicon hyicon-globe',
                    displaySmallIconClass: 'hyicon hyicon-globe'
                });
                featureService.addContextualMenuButton({
                    key: 'se.cms.dragandropbutton',
                    priority: 200,
                    nameI18nKey: 'se.cms.contextmenu.title.dragndrop',
                    i18nKey: 'se.cms.contextmenu.title.dragndrop',
                    regexpKeys: ['^((?!Slot).)*$'],
                    condition: function (configuration) {
                        var slotId = componentHandlerService.getParentSlotForComponent(configuration.element);
                        return slotRestrictionsService
                            .isSlotEditable(slotId)
                            .then(function (slotEditable) {
                            if (slotEditable) {
                                return typePermissionsRestService
                                    .hasUpdatePermissionForTypes([configuration.componentType])
                                    .then(function (hasUpdatePermission) {
                                    return hasUpdatePermission[configuration.componentType];
                                });
                            }
                            return false;
                        });
                    },
                    action: {
                        callbacks: {
                            mousedown: function () {
                                cmsDragAndDropService.update();
                            }
                        }
                    },
                    displayClass: 'movebutton',
                    displayIconClass: 'sap-icon--move',
                    displaySmallIconClass: 'sap-icon--move',
                    permissions: ['se.context.menu.drag.and.drop.component']
                });
                featureService.register({
                    key: 'se.cms.html5DragAndDrop',
                    nameI18nKey: 'se.cms.dragAndDrop.name',
                    descriptionI18nKey: 'se.cms.dragAndDrop.description',
                    enablingCallback: function () {
                        cmsDragAndDropService.register();
                        cmsDragAndDropService.apply();
                    },
                    disablingCallback: function () {
                        cmsDragAndDropService.unregister();
                    }
                });
                featureService.addContextualMenuButton({
                    key: 'se.cms.sharedcomponentbutton',
                    priority: 300,
                    nameI18nKey: 'se.cms.contextmenu.title.shared.component',
                    i18nKey: 'se.cms.contextmenu.title.shared.component',
                    regexpKeys: ['^((?!Slot).)*$'],
                    condition: function (configuration) {
                        var slotId = componentHandlerService.getParentSlotForComponent(configuration.element);
                        return Promise.all([
                            componentHandlerService.isExternalComponent(configuration.componentId, configuration.componentType),
                            slotRestrictionsService.isSlotEditable(slotId)
                        ]).then(function (response) {
                            if (response[0] || !response[1]) {
                                return false;
                            }
                            return componentSharedService.isComponentShared(configuration.componentAttributes.smarteditComponentUuid);
                        });
                    },
                    action: {
                        template: "<shared-component-button data-smartedit-component-id=\"ctrl.componentAttributes.smarteditComponentId\"></shared-component-button>"
                    },
                    displayClass: 'shared-component-button',
                    displayIconClass: 'sap-icon--chain-link',
                    displaySmallIconClass: 'sap-icon--chain-link',
                    permissions: []
                });
                featureService.addContextualMenuButton({
                    key: 'se.cms.remove',
                    priority: 500,
                    customCss: 'se-contextual-more-menu__item--delete',
                    i18nKey: 'se.cms.contextmenu.title.remove',
                    nameI18nKey: 'se.cms.contextmenu.title.remove',
                    regexpKeys: ['^((?!Slot).)*$'],
                    condition: function (configuration) {
                        if (!configuration.isComponentHidden) {
                            var slotId = componentHandlerService.getParentSlotForComponent(configuration.element);
                            return slotRestrictionsService
                                .isSlotEditable(slotId)
                                .then(function (slotEditable) {
                                if (slotEditable) {
                                    return typePermissionsRestService
                                        .hasDeletePermissionForTypes([configuration.componentType])
                                        .then(function (hasDeletePermission) {
                                        return hasDeletePermission[configuration.componentType];
                                    });
                                }
                                return false;
                            });
                        }
                        return typePermissionsRestService
                            .hasDeletePermissionForTypes([configuration.componentType])
                            .then(function (hasDeletePermission) {
                            return hasDeletePermission[configuration.componentType];
                        });
                    },
                    action: {
                        callback: function (configuration, $event) {
                            var slotOperationRelatedId;
                            var slotOperationRelatedType;
                            if (configuration.element) {
                                slotOperationRelatedId = componentHandlerService.getSlotOperationRelatedId(configuration.element);
                                slotOperationRelatedType = componentHandlerService.getSlotOperationRelatedType(configuration.element);
                            }
                            else {
                                slotOperationRelatedId = configuration.containerId
                                    ? configuration.containerId
                                    : configuration.componentId;
                                slotOperationRelatedType =
                                    configuration.containerId && configuration.containerType
                                        ? configuration.containerType
                                        : configuration.componentType;
                            }
                            var message = {};
                            message.description = 'se.cms.contextmenu.removecomponent.confirmation.message';
                            message.title = 'se.cms.contextmenu.removecomponent.confirmation.title';
                            confirmationModalService.confirm(message).then(function () {
                                removeComponentService
                                    .removeComponent({
                                    slotId: configuration.slotId,
                                    slotUuid: configuration.slotUuid,
                                    componentId: configuration.componentId,
                                    componentType: configuration.componentType,
                                    componentUuid: configuration.componentAttributes.smarteditComponentUuid,
                                    slotOperationRelatedId: slotOperationRelatedId,
                                    slotOperationRelatedType: slotOperationRelatedType
                                })
                                    .then(function () {
                                    slotVisibilityService.reloadSlotsInfo();
                                    // This is necessary in case the component was used more than once in the page. If so, those instances need to be updated.
                                    crossFrameEventService.publish(EVENT_SMARTEDIT_COMPONENT_UPDATED, {
                                        componentId: configuration.componentId,
                                        componentType: configuration.componentType,
                                        requiresReplayingDecorators: true
                                    });
                                    $translate('se.cms.alert.component.removed.from.slot', {
                                        componentID: slotOperationRelatedId,
                                        slotID: configuration.slotId
                                    }).then(function (translation) {
                                        alertService.showSuccess({
                                            message: translation
                                        });
                                        $event.preventDefault();
                                        $event.stopPropagation();
                                    });
                                });
                            });
                        }
                    },
                    displayClass: 'removebutton',
                    displayIconClass: 'sap-icon--decline',
                    displaySmallIconClass: 'sap-icon--decline',
                    permissions: ['se.context.menu.remove.component']
                });
                featureService.addContextualMenuButton({
                    key: 'se.slotContextualMenuVisibility',
                    nameI18nKey: 'slotcontextmenu.title.visibility',
                    regexpKeys: ['^.*ContentSlot$'],
                    action: { templateUrl: 'slotVisibilityWidgetTemplate.html' },
                    permissions: ['se.slot.context.menu.visibility']
                });
                featureService.addContextualMenuButton({
                    key: 'se.slotSharedButton',
                    nameI18nKey: 'slotcontextmenu.title.shared.button',
                    regexpKeys: ['^.*Slot$'],
                    action: { templateUrl: 'slotSharedTemplate.html' },
                    permissions: ['se.slot.context.menu.shared.icon']
                });
                featureService.addContextualMenuButton({
                    key: 'slotUnsharedButton',
                    nameI18nKey: 'slotcontextmenu.title.unshared.button',
                    regexpKeys: ['^.*Slot$'],
                    action: { templateUrl: 'slotUnsharedButtonWrapperTemplate.html' },
                    permissions: ['se.slot.context.menu.unshared.icon']
                });
                featureService.addContextualMenuButton({
                    key: 'se.slotSyncButton',
                    nameI18nKey: 'slotcontextmenu.title.sync.button',
                    regexpKeys: ['^.*Slot$'],
                    action: { templateUrl: 'slotSyncTemplate.html' },
                    permissions: ['se.sync.slot.context.menu']
                });
                featureService.addDecorator({
                    key: 'syncIndicator',
                    nameI18nKey: 'syncIndicator',
                    permissions: ['se.sync.slot.indicator']
                });
                featureService.register({
                    key: 'disableSharedSlotEditing',
                    nameI18nKey: 'se.cms.disableSharedSlotEditing',
                    descriptionI18nKey: 'se.cms.disableSharedSlotEditing.description',
                    enablingCallback: function () {
                        slotSharedService.setSharedSlotEnablementStatus(true);
                    },
                    disablingCallback: function () {
                        slotSharedService.setSharedSlotEnablementStatus(false);
                    }
                });
                featureService.addDecorator({
                    key: 'sharedSlotDisabledDecorator',
                    nameI18nKey: 'se.cms.shared.slot.disabled.decorator',
                    // only show that the slot is shared if it is not already external
                    displayCondition: function (componentType, componentId) {
                        return Promise.all([
                            slotRestrictionsService.isSlotEditable(componentId),
                            componentHandlerService.isExternalComponent(componentId, componentType),
                            slotSharedService.isSlotShared(componentId)
                        ]).then(function (response) {
                            return !response[0] && !response[1] && response[2];
                        });
                    }
                });
                featureService.addDecorator({
                    key: 'externalSlotDisabledDecorator',
                    nameI18nKey: 'se.cms.external.slot.disabled.decorator',
                    displayCondition: function (componentType, componentId) {
                        return Promise.resolve(slotSharedService.isGlobalSlot(componentId, componentType));
                    }
                });
                featureService.addDecorator({
                    key: 'externalComponentDecorator',
                    nameI18nKey: 'se.cms.external.component.decorator',
                    displayCondition: function (componentType, componentId) {
                        return Promise.resolve(componentHandlerService.isExternalComponent(componentId, componentType));
                    }
                });
                featureService.addContextualMenuButton({
                    key: 'clonecomponentbutton',
                    priority: 600,
                    nameI18nKey: 'se.cms.contextmenu.title.clone.component',
                    i18nKey: 'se.cms.contextmenu.title.clone.component',
                    regexpKeys: ['^((?!Slot).)*$'],
                    condition: function (configuration) {
                        var componentUuid = configuration.componentAttributes.smarteditComponentUuid;
                        if (!configuration.isComponentHidden) {
                            var slotId = componentHandlerService.getParentSlotForComponent(configuration.element);
                            return slotRestrictionsService
                                .isSlotEditable(slotId)
                                .then(function (slotEditable) {
                                if (slotEditable) {
                                    return typePermissionsRestService
                                        .hasCreatePermissionForTypes([configuration.componentType])
                                        .then(function (hasCreatePermission) {
                                        if (hasCreatePermission[configuration.componentType]) {
                                            return componentInfoService
                                                .getById(componentUuid)
                                                .then(function (component) { return component.cloneable; });
                                        }
                                        else {
                                            return $q.when(false);
                                        }
                                    });
                                }
                                return false;
                            });
                        }
                        return cmsitemsRestService
                            .getById(componentUuid)
                            .then(function (component) { return component.cloneable; });
                    },
                    action: {
                        callback: function (configuration) {
                            var sourcePosition = componentHandlerService.getComponentPositionInSlot(configuration.slotId, configuration.componentAttributes.smarteditComponentId);
                            componentEditingFacade.cloneExistingComponentToSlot({
                                targetSlotId: configuration.slotId,
                                dragInfo: {
                                    componentId: configuration.componentAttributes.smarteditComponentId,
                                    componentType: configuration.componentType,
                                    componentUuid: configuration.componentAttributes.smarteditComponentUuid
                                },
                                position: sourcePosition + 1
                            });
                        }
                    },
                    displayClass: 'clonebutton',
                    displayIconClass: 'sap-icon--duplicate',
                    displaySmallIconClass: 'sap-icon--duplicate',
                    permissions: ['se.clone.component']
                });
            }]
        })
    ], /* @ngInject */ Cmssmartedit);
    return /* @ngInject */ Cmssmartedit;
}());

window.__smartedit__.addDecoratorPayload("Component", "SyncIndicatorDecorator", {
    selector: 'sync-indicator',
    template: "<div class=\"sync-indicator-decorator\" [ngClass]=\"syncStatus.status\" [attr.sync-status]=\"syncStatus.status\"><ng-content class=\"se-wrapper-data\"></ng-content></div>"
});
var /* @ngInject */ SyncIndicatorDecorator = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SyncIndicatorDecorator, _super);
    SyncIndicatorDecorator.$inject = ["$q", "catalogService", "slotSynchronizationService", "crossFrameEventService", "pageInfoService", "SYNCHRONIZATION_STATUSES", "SYNCHRONIZATION_POLLING"];
    function /* @ngInject */ SyncIndicatorDecorator($q, catalogService, slotSynchronizationService, crossFrameEventService, pageInfoService, SYNCHRONIZATION_STATUSES, SYNCHRONIZATION_POLLING) {
        var _this = _super.call(this) || this;
        _this.$q = $q;
        _this.catalogService = catalogService;
        _this.slotSynchronizationService = slotSynchronizationService;
        _this.crossFrameEventService = crossFrameEventService;
        _this.pageInfoService = pageInfoService;
        _this.SYNCHRONIZATION_STATUSES = SYNCHRONIZATION_STATUSES;
        _this.SYNCHRONIZATION_POLLING = SYNCHRONIZATION_POLLING;
        _this.isVersionNonActive = false;
        return _this;
    }
    /* @ngInject */ SyncIndicatorDecorator.prototype.ngOnInit = function () {
        var _this = this;
        this.syncStatus = {
            status: this.SYNCHRONIZATION_STATUSES.UNAVAILABLE
        };
        this.pageInfoService.getPageUUID().then(function (pageUUID) {
            _this.pageUUID = pageUUID;
            _this.unRegisterSyncPolling = _this.crossFrameEventService.subscribe(_this.SYNCHRONIZATION_POLLING.FAST_FETCH, _this.fetchSyncStatus.bind(_this));
            _this.catalogService.isContentCatalogVersionNonActive().then(function (isNonActive) {
                _this.isVersionNonActive = isNonActive;
                if (_this.isVersionNonActive) {
                    _this.fetchSyncStatus();
                }
            });
        });
    };
    /* @ngInject */ SyncIndicatorDecorator.prototype.ngOnDestroy = function () {
        if (this.unRegisterSyncPolling) {
            this.unRegisterSyncPolling();
        }
    };
    /* @ngInject */ SyncIndicatorDecorator.prototype.fetchSyncStatus = function () {
        var _this = this;
        return this.isVersionNonActive
            ? this.slotSynchronizationService
                .getSyncStatus(this.pageUUID, this.componentAttributes.smarteditComponentId)
                .then(function (syncStatus) {
                if (_this.slotSynchronizationService.syncStatusExists(syncStatus)) {
                    _this.syncStatus = syncStatus;
                }
            }, function () {
                _this.syncStatus.status = _this.SYNCHRONIZATION_STATUSES.UNAVAILABLE;
            })
            : this.$q.when();
    };
    /* @ngInject */ SyncIndicatorDecorator = __decorate([
        smarteditcommons.SeDecorator(),
        core.Component({
            selector: 'sync-indicator',
            template: "<div class=\"sync-indicator-decorator\" [ngClass]=\"syncStatus.status\" [attr.sync-status]=\"syncStatus.status\"><ng-content class=\"se-wrapper-data\"></ng-content></div>"
        }),
        __param(0, core.Inject('$q')),
        __param(2, core.Inject('slotSynchronizationService')),
        __param(4, core.Inject('pageInfoService')),
        __param(5, core.Inject('SYNCHRONIZATION_STATUSES')),
        __param(6, core.Inject('SYNCHRONIZATION_POLLING')),
        __metadata("design:paramtypes", [Function, smarteditcommons.ICatalogService, Object, smarteditcommons.CrossFrameEventService,
            smarteditcommons.IPageInfoService, Object, Object])
    ], /* @ngInject */ SyncIndicatorDecorator);
    return /* @ngInject */ SyncIndicatorDecorator;
}(smarteditcommons.AbstractDecorator));

var /* @ngInject */ PageContentSlotsComponentsRestService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PageContentSlotsComponentsRestService, _super);
    PageContentSlotsComponentsRestService.$inject = ["restServiceFactory", "pageInfoService", "cmsitemsRestService"];
    function /* @ngInject */ PageContentSlotsComponentsRestService(restServiceFactory, pageInfoService, cmsitemsRestService) {
        var _this = _super.call(this) || this;
        _this.pageInfoService = pageInfoService;
        _this.cmsitemsRestService = cmsitemsRestService;
        var contentSlotContainerResourceURI = "/cmswebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + cmscommons.PAGE_CONTEXT_CATALOG + "/versions/" + cmscommons.PAGE_CONTEXT_CATALOG_VERSION + "/pagescontentslotscomponents?pageId=:pageId";
        _this.pagesContentSlotsComponentsRestService = restServiceFactory.get(contentSlotContainerResourceURI);
        return _this;
    }
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.clearCache = function () {
        return;
    };
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.getComponentsForSlot = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var pageUID, slotsToComponentsMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageUID = _a.sent();
                        return [4 /*yield*/, this.getSlotsToComponentsMapForPageUid(pageUID)];
                    case 2:
                        slotsToComponentsMap = _a.sent();
                        return [2 /*return*/, slotsToComponentsMap[slotId] || []];
                }
            });
        });
    };
    PageContentSlotsComponentsRestService.prototype.getComponentsForSlot.$inject = ["slotId"];
    /**
     * Returns a list of Page Content Slots Components associated to a page.
     *
     * @param pageUid The uid of the page to retrieve the content slots to components map.
     */
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.getSlotsToComponentsMapForPageUid = function (pageUid) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCachedSlotsToComponentsMapForPageUid(pageUid)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, lodash.cloneDeep(response)];
                }
            });
        });
    };
    PageContentSlotsComponentsRestService.prototype.getSlotsToComponentsMapForPageUid.$inject = ["pageUid"];
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.getCachedSlotsToComponentsMapForPageUid = function (pageUid) {
        return __awaiter(this, void 0, void 0, function () {
            var pageContentSlotComponentList, componentUuids, components, uuidToComponentMap, allSlotsToComponentsMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pagesContentSlotsComponentsRestService.get({
                            pageId: pageUid
                        })];
                    case 1:
                        pageContentSlotComponentList = (_a.sent()).pageContentSlotComponentList;
                        componentUuids = this.mapPageContentSlotComponentListToComponentUuids(pageContentSlotComponentList);
                        return [4 /*yield*/, this.cmsitemsRestService.getByIds(componentUuids, 'DEFAULT')];
                    case 2:
                        components = (_a.sent()).response;
                        uuidToComponentMap = this.createUuidToComponentMap(components);
                        allSlotsToComponentsMap = this.createSlotUuidToComponentMap(pageContentSlotComponentList, uuidToComponentMap);
                        return [2 /*return*/, allSlotsToComponentsMap];
                }
            });
        });
    };
    PageContentSlotsComponentsRestService.prototype.getCachedSlotsToComponentsMapForPageUid.$inject = ["pageUid"];
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.createSlotUuidToComponentMap = function (componentList, uuidToComponentMap) {
        return componentList.reduce(function (map, component) {
            map[component.slotId] = map[component.slotId] || [];
            if (uuidToComponentMap[component.componentUuid]) {
                map[component.slotId].push(uuidToComponentMap[component.componentUuid]);
            }
            return map;
        }, {});
    };
    PageContentSlotsComponentsRestService.prototype.createSlotUuidToComponentMap.$inject = ["componentList", "uuidToComponentMap"];
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.mapPageContentSlotComponentListToComponentUuids = function (componentList) {
        var componentUuids = componentList.map(function (pageContentSlotComponent) {
            return pageContentSlotComponent.componentUuid;
        });
        componentUuids = Array.from(new Set(componentUuids)); // remove duplicates
        return componentUuids;
    };
    PageContentSlotsComponentsRestService.prototype.mapPageContentSlotComponentListToComponentUuids.$inject = ["componentList"];
    /* @ngInject */ PageContentSlotsComponentsRestService.prototype.createUuidToComponentMap = function (components) {
        return (components || []).reduce(function (map, component) {
            map[component.uuid] = component;
            return map;
        }, {});
    };
    PageContentSlotsComponentsRestService.prototype.createUuidToComponentMap.$inject = ["components"];
    __decorate([
        smarteditcommons.InvalidateCache(cmscommons.slotEvictionTag),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], /* @ngInject */ PageContentSlotsComponentsRestService.prototype, "clearCache", null);
    __decorate([
        smarteditcommons.Cached({
            actions: [smarteditcommons.rarelyChangingContent],
            tags: [cmscommons.cmsitemsEvictionTag, smarteditcommons.pageChangeEvictionTag, cmscommons.slotEvictionTag]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ PageContentSlotsComponentsRestService.prototype, "getCachedSlotsToComponentsMapForPageUid", null);
    /* @ngInject */ PageContentSlotsComponentsRestService = __decorate([
        smarteditcommons.GatewayProxied('clearCache', 'getSlotsToComponentsMapForPageUid'),
        smarteditcommons.SeDowngradeService(cmscommons.IPageContentSlotsComponentsRestService),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.IPageInfoService,
            cmscommons.CmsitemsRestService])
    ], /* @ngInject */ PageContentSlotsComponentsRestService);
    return /* @ngInject */ PageContentSlotsComponentsRestService;
}(cmscommons.IPageContentSlotsComponentsRestService));

var /* @ngInject */ ContextAwareEditableItemService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ContextAwareEditableItemService, _super);
    function /* @ngInject */ ContextAwareEditableItemService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ ContextAwareEditableItemService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.IContextAwareEditableItemService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ ContextAwareEditableItemService);
    return /* @ngInject */ ContextAwareEditableItemService;
}(cmscommons.IContextAwareEditableItemService));

/**
 * ContextualMenuDropdownService is an internal service that provides methods for interaction between
 * Drag and Drop Service and the Contextual Menu.
 *
 * Note: The contextualMenuDropdownService functions are as a glue between the Drag and Drop Service and the Contextual Menu.
 *  The service was created to solve the issue of closing any contextual menu that is open whenever a drag operation is started.
 *  It does so while keeping the DnD and Contextual Menu services decoupled.
 */
var /* @ngInject */ ContextualMenuDropdownService = /** @class */ (function () {
    ContextualMenuDropdownService.$inject = ["systemEventService"];
    function /* @ngInject */ ContextualMenuDropdownService(systemEventService) {
        this.systemEventService = systemEventService;
    }
    /* @ngInject */ ContextualMenuDropdownService.prototype.registerIsOpenEvent = function () {
        var _this = this;
        this.systemEventService.subscribe(smarteditcommons.CTX_MENU_DROPDOWN_IS_OPEN, function () {
            _this.registerDragStarted();
        });
    };
    /* @ngInject */ ContextualMenuDropdownService.prototype.registerDragStarted = function () {
        var _this = this;
        this.unsubscribeFn = this.systemEventService.subscribe(cmscommons.DRAG_AND_DROP_EVENTS.DRAG_STARTED, function () {
            _this.triggerCloseOperation();
        });
    };
    /* @ngInject */ ContextualMenuDropdownService.prototype.triggerCloseOperation = function () {
        this.systemEventService.publishAsync(smarteditcommons.CLOSE_CTX_MENU);
        if (this.unsubscribeFn) {
            this.unsubscribeFn();
        }
    };
    /* @ngInject */ ContextualMenuDropdownService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService])
    ], /* @ngInject */ ContextualMenuDropdownService);
    return /* @ngInject */ ContextualMenuDropdownService;
}());

var /* @ngInject */ EditorModalService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ EditorModalService, _super);
    function /* @ngInject */ EditorModalService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ EditorModalService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.IEditorModalService),
        smarteditcommons.GatewayProxied('open', 'openAndRerenderSlot', 'openGenericEditor')
    ], /* @ngInject */ EditorModalService);
    return /* @ngInject */ EditorModalService;
}(cmscommons.IEditorModalService));

var /* @ngInject */ RemoveComponentService = /** @class */ (function () {
    RemoveComponentService.$inject = ["restServiceFactory", "alertService", "componentInfoService", "renderService", "systemEventService"];
    function /* @ngInject */ RemoveComponentService(restServiceFactory, alertService, componentInfoService, renderService, systemEventService) {
        this.alertService = alertService;
        this.componentInfoService = componentInfoService;
        this.renderService = renderService;
        this.systemEventService = systemEventService;
        this.resource = restServiceFactory.get(cmscommons.PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI + "/contentslots/:slotId/components/:componentId", 'componentId');
    }
    /* @ngInject */ RemoveComponentService.prototype.removeComponent = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, component;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.resource.remove({
                                slotId: configuration.slotId,
                                componentId: configuration.slotOperationRelatedId
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        this.alertService.showDanger({
                            message: 'se.cms.remove.component.failed',
                            messagePlaceholders: {
                                slotID: configuration.slotId,
                                componentID: configuration.slotOperationRelatedId
                            }
                        });
                        return [2 /*return*/, Promise.reject()];
                    case 3: return [4 /*yield*/, this.componentInfoService.getById(configuration.componentUuid)];
                    case 4:
                        component = _b.sent();
                        this.systemEventService.publish(cmscommons.COMPONENT_REMOVED_EVENT, component);
                        this.renderService.renderSlots(configuration.slotId);
                        return [2 /*return*/, this.componentInfoService.getById(configuration.componentUuid, true)];
                }
            });
        });
    };
    RemoveComponentService.prototype.removeComponent.$inject = ["configuration"];
    /* @ngInject */ RemoveComponentService = __decorate([
        smarteditcommons.GatewayProxied('removeComponent'),
        smarteditcommons.SeDowngradeService(cmscommons.IRemoveComponentService),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.IAlertService,
            ComponentInfoService,
            smarteditcommons.IRenderService,
            smarteditcommons.SystemEventService])
    ], /* @ngInject */ RemoveComponentService);
    return /* @ngInject */ RemoveComponentService;
}());

var /* @ngInject */ SlotSynchronizationService = /** @class */ (function () {
    SlotSynchronizationService.$inject = ["syncPollingService"];
    function /* @ngInject */ SlotSynchronizationService(syncPollingService) {
        this.syncPollingService = syncPollingService;
    }
    /**
     * Returns the sync status for the slot.
     * @param pageUUID - the page where the slot is situated.
     * @param slotId - the slot id for which to retrieve the sync status.
     * @returns the sync status object, or null if not found.
     */
    /* @ngInject */ SlotSynchronizationService.prototype.getSyncStatus = function (pageUUID, slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var syncStatus, syncFromSelected, syncFromShared;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncPollingService.getSyncStatus(pageUUID)];
                    case 1:
                        syncStatus = _a.sent();
                        syncFromSelected = this.findSlotStatus(syncStatus.selectedDependencies || [], slotId);
                        if (syncFromSelected !== null) {
                            syncFromSelected.fromSharedDependency = false;
                            return [2 /*return*/, syncFromSelected];
                        }
                        else {
                            syncFromShared = this.findSlotStatus(syncStatus.sharedDependencies || [], slotId);
                            if (syncFromShared !== null) {
                                syncFromShared.fromSharedDependency = true;
                                return [2 /*return*/, syncFromShared];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SlotSynchronizationService.prototype.getSyncStatus.$inject = ["pageUUID", "slotId"];
    /* @ngInject */ SlotSynchronizationService.prototype.performSync = function (array, uriContext) {
        return this.syncPollingService.performSync(array, uriContext);
    };
    SlotSynchronizationService.prototype.performSync.$inject = ["array", "uriContext"];
    /**
     * Verifies whether the sync status exists. The sync status for the slot does not exists when
     * the slot comes from a parent catalog in multicountry environment.
     * @param syncStatus - the object to verify.
     * @returns true if the sync status exists, false otherwise.
     */
    /* @ngInject */ SlotSynchronizationService.prototype.syncStatusExists = function (syncStatus) {
        return !!syncStatus;
    };
    SlotSynchronizationService.prototype.syncStatusExists.$inject = ["syncStatus"];
    /**
     * Returns the slot sync status from the list of dependencies by slot id.
     * @param dependencies - the list of dependencies to verify
     * @param slotId - the slot for which to find a sync status
     * @returns the sync status or null if cannot be find.
     */
    /* @ngInject */ SlotSynchronizationService.prototype.findSlotStatus = function (dependencies, slotId) {
        return dependencies.find(function (slot) { return slot.name === slotId; }) || null;
    };
    SlotSynchronizationService.prototype.findSlotStatus.$inject = ["dependencies", "slotId"];
    /* @ngInject */ SlotSynchronizationService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [cmscommons.ISyncPollingService])
    ], /* @ngInject */ SlotSynchronizationService);
    return /* @ngInject */ SlotSynchronizationService;
}());

/**
 * SlotUnsharedService provides methods to interact with the backend for unshared slot information.
 */
var /* @ngInject */ SlotUnsharedService = /** @class */ (function () {
    SlotUnsharedService.$inject = ["cmsItemsRestService", "pageContentSlotsService"];
    function /* @ngInject */ SlotUnsharedService(cmsItemsRestService, pageContentSlotsService) {
        this.cmsItemsRestService = cmsItemsRestService;
        this.pageContentSlotsService = pageContentSlotsService;
        this.slotUnsharedStatus = 'OVERRIDE';
    }
    /**
     * Checks if the slot is unshared and returns true in case slot is unshared and returns false if it is not.
     * Based on this service method the slot unshared button is shown or hidden for a particular slotId.
     *
     * @param slotId The uid of the slot
     *
     * @returns promise that resolves to true if slot is unshared; Otherwise false.
     */
    /* @ngInject */ SlotUnsharedService.prototype.isSlotUnshared = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var slotStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageContentSlotsService.getSlotStatus(slotId)];
                    case 1:
                        slotStatus = _a.sent();
                        return [2 /*return*/, slotStatus === this.slotUnsharedStatus];
                }
            });
        });
    };
    SlotUnsharedService.prototype.isSlotUnshared.$inject = ["slotId"];
    /**
     * Checks if the slot is shared and returns true in case slot is shared and returns false if it is not.
     * Based on this service method the slot shared button is shown or hidden for a particular slotId
     *
     * @param slotId of the slot
     *
     * @returns promise that resolves to true if the slot is shared; Otherwise false.
     */
    /* @ngInject */ SlotUnsharedService.prototype.isSlotShared = function (slotId) {
        return this.pageContentSlotsService.isSlotShared(slotId);
    };
    SlotUnsharedService.prototype.isSlotShared.$inject = ["slotId"];
    /**
     * This method is used to revert an unshared slot to a shared slot.
     * This operation is immutable.
     *
     * @param slotUuid The uuid of the slot
     */
    /* @ngInject */ SlotUnsharedService.prototype.revertToSharedSlot = function (slotUuid) {
        return this.cmsItemsRestService.delete(slotUuid);
    };
    SlotUnsharedService.prototype.revertToSharedSlot.$inject = ["slotUuid"];
    /* @ngInject */ SlotUnsharedService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [cmscommons.CmsitemsRestService,
            PageContentSlotsService])
    ], /* @ngInject */ SlotUnsharedService);
    return /* @ngInject */ SlotUnsharedService;
}());

var /* @ngInject */ SyncPollingService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SyncPollingService, _super);
    SyncPollingService.$inject = ["systemEventService"];
    function /* @ngInject */ SyncPollingService(systemEventService) {
        var _this = _super.call(this) || this;
        _this.systemEventService = systemEventService;
        _this.registerSyncPollingEvents();
        return _this;
    }
    /* @ngInject */ SyncPollingService.prototype.registerSyncPollingEvents = function () {
        this.systemEventService.subscribe(cmscommons.DEFAULT_SYNCHRONIZATION_POLLING.SPEED_UP, this.changePollingSpeed.bind(this));
        this.systemEventService.subscribe(cmscommons.DEFAULT_SYNCHRONIZATION_POLLING.SLOW_DOWN, this.changePollingSpeed.bind(this));
    };
    /* @ngInject */ SyncPollingService = __decorate([
        smarteditcommons.SeDowngradeService(cmscommons.ISyncPollingService),
        smarteditcommons.GatewayProxied('getSyncStatus', 'fetchSyncStatus', 'changePollingSpeed', 'registerSyncPollingEvents', 'performSync'),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService])
    ], /* @ngInject */ SyncPollingService);
    return /* @ngInject */ SyncPollingService;
}(cmscommons.ISyncPollingService));

var CmssmarteditModule = /** @class */ (function () {
    function CmssmarteditModule() {
    }
    CmssmarteditModule = __decorate([
        smarteditcommons.SeEntryModule('cmssmartedit'),
        core.NgModule({
            imports: [cmscommons.CmsCommonsModule, platformBrowser.BrowserModule, _static.UpgradeModule, smarteditcommons.SeTranslationModule.forChild()],
            declarations: [SyncIndicatorDecorator],
            entryComponents: [SyncIndicatorDecorator],
            providers: [
                smarteditcommons.diBridgeUtils.upgradeProvider('$q'),
                smarteditcommons.diBridgeUtils.upgradeProvider('catalogService', smarteditcommons.ICatalogService),
                smarteditcommons.diBridgeUtils.upgradeProvider('slotSynchronizationService'),
                smarteditcommons.diBridgeUtils.upgradeProvider('pageInfoService'),
                {
                    provide: cmscommons.IPageContentSlotsComponentsRestService,
                    useClass: PageContentSlotsComponentsRestService
                },
                {
                    provide: cmscommons.ISyncPollingService,
                    useClass: SyncPollingService
                },
                ContextualMenuDropdownService,
                smarteditcommons.moduleUtils.initialize(function (contextualMenuDropdownService) {
                    contextualMenuDropdownService.registerIsOpenEvent();
                }, [ContextualMenuDropdownService]),
                PageContentSlotsService,
                SlotUnsharedService,
                SlotVisibilityService,
                SlotContainerService,
                HiddenComponentMenuService,
                ComponentInfoService,
                SlotSynchronizationService,
                SlotSharedService,
                EditorEnablerService,
                ComponentEditingFacade,
                CmsDragAndDropService,
                {
                    provide: cmscommons.IRemoveComponentService,
                    useClass: RemoveComponentService
                },
                {
                    provide: cmscommons.IPageService,
                    useClass: PageService
                },
                {
                    provide: cmscommons.IContextAwareEditableItemService,
                    useClass: ContextAwareEditableItemService
                },
                {
                    provide: cmscommons.IEditorModalService,
                    useClass: EditorModalService
                },
                {
                    provide: cmscommons.IComponentVisibilityAlertService,
                    useClass: ComponentVisibilityAlertService
                },
                {
                    provide: cmscommons.IComponentSharedService,
                    useClass: ComponentSharedService
                },
                {
                    provide: cmscommons.ISlotRestrictionsService,
                    useClass: SlotRestrictionsService
                }
            ]
        })
    ], CmssmarteditModule);
    return CmssmarteditModule;
}());

exports.CmsDragAndDropService = CmsDragAndDropService;
exports.CmsSmarteditServicesModule = CmsSmarteditServicesModule;
exports.Cmssmartedit = Cmssmartedit;
exports.CmssmarteditModule = CmssmarteditModule;
exports.ComponentEditingFacade = ComponentEditingFacade;
exports.ComponentSharedService = ComponentSharedService;
exports.ComponentVisibilityAlertService = ComponentVisibilityAlertService;
exports.EditorEnablerService = EditorEnablerService;
exports.HiddenComponentMenuService = HiddenComponentMenuService;
exports.PageContentSlotsService = PageContentSlotsService;
exports.PageService = PageService;
exports.SlotContainerService = SlotContainerService;
exports.SlotRestrictionsService = SlotRestrictionsService;
exports.SlotSharedService = SlotSharedService;
