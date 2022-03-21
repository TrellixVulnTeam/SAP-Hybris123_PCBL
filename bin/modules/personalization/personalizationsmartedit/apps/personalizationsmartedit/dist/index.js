'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var smarteditcommons = require('smarteditcommons');
var personalizationcommons = require('personalizationcommons');
var smartedit = require('smartedit');
var angular = require('angular');
var cmssmartedit = require('cmssmartedit');
var platformBrowser = require('@angular/platform-browser');
var _static = require('@angular/upgrade/static');
var core = require('@angular/core');
var http = require('@angular/common/http');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationsmarteditTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationsmarteditTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "personalizationsmarteditCombinedViewComponentLightUpDecoratorTemplate.html", 
        "<div data-ng-class=\"classForElement\" class=\"pe-combined-view-component-letter\">{{letterForElement}}</div><div data-ng-transclude></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditComponentLightUpDecoratorTemplate.html", 
        "<div data-ng-transclude></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditExternalComponentDecoratorTemplate.html", 
        "<div data-ng-class=\"{    'cms-external-component-decorator': !ctrl.isExtenalSlot,    'disabled-shared-slot-hovered': ctrl.active && !ctrl.isExtenalSlot}\"><div class=\"se-ctx-menu__overlay\" data-ng-if=\"!ctrl.isExtenalSlot && ctrl.isReady\"><span data-ng-if=\"!ctrl.active\" data-y-popover data-placement=\"'bottom'\" data-template=\"ctrl.getTooltipTemplate()\" data-trigger=\"'hover'\" class=\"sap-icon--globe se-ctx-menu-element__btn\"></span></div><div class=\"se-wrapper-data\" data-ng-transclude></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditSharedSlotDecoratorTemplate.html", 
        "<div class=\"se-decorative-panel-wrapper\"><div class=\"cmsx-ctx-wrapper1 se-slot-contextual-menu-level1\"><div class=\"cmsx-ctx-wrapper2 se-slot-contextual-menu-level2\"><div class=\"se-decorative-panel-area\" data-ng-if=\"ctrl.active && ctrl.slotSharedFlag\"><div class=\"se-decorator-panel-padding-center\"></div><div class=\"se-decorative-panel-slot-contextual-menu\"><div class=\"se-shared-slot-button-template\" data-ng-if=\"ctrl.slotSharedFlag\"><div class=\"se-slot-ctx-menu__dropdown-toggle-wrapper se-slot-ctx-menu__divider\" data-uib-dropdown data-dropdown-append-to=\"'#smarteditoverlay'\" data-auto-close=\"outsideClick\" data-is-open=\"ctrl.isPopupOpened\"><button type=\"button\" data-uib-dropdown-toggle class=\"se-slot-ctx-menu__dropdown-toggle sap-icon--chain-link se-slot-ctx-menu__dropdown-toggle-icon\" data-ng-class=\"{'se-slot-ctx-menu__dropdown-toggle--open': ctrl.isPopupOpened}\" id=\"sharedSlotButton-{{::ctrl.smarteditComponentId}}\"></button><div class=\"dropdown-menu dropdown-menu-right se-slot__dropdown-menu se-shared-slot__dropdown\" data-uib-dropdown-menu><div class=\"se-shared-slot__body\"><div class=\"se-shared-slot__description\" data-translate=\"personalization.slot.shared.popover.message\"></div></div></div></div></div></div></div><div class=\"se-decoratorative-body-area\"><div class=\"se-decorative-body__padding--left\" data-ng-class=\"{active: ctrl.active}\"></div><div data-ng-class=\"ctrl.active && ctrl.slotSharedFlag ? 'se-decorative-body__inner-border active' : ''\"></div><div class=\"se-wrapper-data\" data-ng-transclude data-ng-class=\"{active: ctrl.active}\"></div><div class=\"se-decorative-body__padding--right\" data-ng-class=\"{active: ctrl.active}\"></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditShowActionListTemplate.html", 
        "<div class=\"pe-combinedview-ranking\"><div class=\"pe-combinedview-ranking__info-layout\"><div class=\"pe-combinedview-ranking__title\" data-translate=\"personalization.modal.showactionlist.title\"></div><div class=\"perso__page-level-help-message\" data-translate=\"personalization.modal.showactionlist.help.label\"></div></div><div class=\"pe-combinedview-ranking__list-item\" data-ng-repeat=\"item in $ctrl.selectedItems\" data-ng-init=\"$ctrl.initItem(item)\" data-ng-show=\"item.visible\"><div class=\"pe-combinedview-ranking__letter-layout\"><div data-ng-class=\"$ctrl.getClassForElement($index)\" data-ng-bind=\"$ctrl.getLetterForElement($index)\"></div></div><div class=\"pe-combinedview-ranking__names-layout\"><div class=\"perso-wrap-ellipsis\" data-ng-bind=\"item.customization.name\" title=\"{{item.customization.name}}\"></div><div class=\"perso-wrap-ellipsis perso-tree__primary-data\" data-ng-bind=\"item.variation.name\" title=\"{{item.variation.name}}\"></div></div><div class=\"pe-combinedview-ranking__icon\"><span data-ng-if=\"!$ctrl.isCustomizationFromCurrentCatalog(item.customization)\" class=\"perso__globe-icon sap-icon--globe\" data-uib-tooltip=\"{{item.variation.catalogVersionNameL10N}}\" data-tooltip-placement=\"top right\"></span></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditShowComponentInfoListTemplate.html", 
        "<div class=\"pe-component-info\"><div class=\"pe-component-info__info-layout\"><div data-ng-show=\"!$ctrl.isPageBlocked\"><div data-ng-show=\"!$ctrl.isPersonalizationAllowedInWorkflow\"><div class=\"pe-component-info__title\" data-translate=\"personalization.modal.showcomponentinfolist.help.noactionsinworkflow.title\"></div><div class=\"perso__page-level-help-message\" data-translate=\"personalization.modal.showcomponentinfolist.help.noactionsinworkflow\"></div></div><div data-ng-show=\"$ctrl.isContextualMenuInfoEnabled()\"><div class=\"pe-component-info__title\" data-translate=\"personalization.modal.showcomponentinfolist.title\"></div><div class=\"perso__page-level-help-message\" data-ng-show=\"!$ctrl.isPersonalizationAllowedInWorkflow\" data-translate=\"personalization.modal.showcomponentinfolist.help.noactionsinworkflow.componentinfo\"></div><div class=\"perso__page-level-help-message\" data-ng-show=\"$ctrl.pagination.totalCount > 0 && $ctrl.isPersonalizationAllowedInWorkflow\" data-translate=\"personalization.modal.showcomponentinfolist.help.label\"></div><div class=\"perso__page-level-help-message\" data-ng-show=\"$ctrl.pagination.totalCount === 0 && $ctrl.isPersonalizationAllowedInWorkflow\" data-translate=\"personalization.modal.showcomponentinfolist.help.nocustomizations\"></div></div></div><div data-ng-show=\"$ctrl.isPageBlocked\"><div class=\"pe-component-info__title\" data-translate=\"personalization.modal.showcomponentinfolist.blocked.title\"></div><div class=\"perso__page-level-help-message\" data-translate=\"personalization.modal.showcomponentinfolist.blocked.label\"></div></div></div><div class=\"perso__page-level-help-message pe-component-info__info-layout\" data-ng-show=\"$ctrl.pagination.totalCount > 0 && $ctrl.isContextualMenuInfoEnabled()\"><span data-translate=\"personalization.modal.showcomponentinfolist.help.numberofenabledcustomizations\"></span> <span data-ng-bind=\"$ctrl.pagination.totalCount\"></span></div><div data-ng-show=\"$ctrl.pagination.totalCount > 0 && $ctrl.isContextualMenuInfoEnabled()\"><personalization-infinite-scrolling [fetch-page]=\"$ctrl.getPage\" [context]=\"$ctrl\" [drop-down-container-class]=\"'pe-component-info__wrapper'\"><personalization-prevent-parent-scroll><div data-ng-class=\"$ctrl.customizationVisible() ? 'pe-component-info__list-item':''\" data-ng-repeat=\"item in $ctrl.actions\"><div class=\"pe-component-info__names-layout\"><div class=\"perso-wrap-ellipsis\" data-ng-bind=\"item.customizationName\" title=\"{{item.customizationName}}\"></div><div class=\"perso-wrap-ellipsis perso-tree__primary-data\" data-ng-bind=\"item.variationName\" title=\"{{item.variationName}}\"></div></div><div data-ng-class=\"$ctrl.customizationVisible() ? 'pe-component-info__icon':''\"><span data-ng-class=\"$ctrl.customizationVisible()?'perso__globe-icon sap-icon--globe':''\" data-ng-show=\"!$ctrl.isCustomizationFromCurrentCatalog(item.customization)\" data-tooltip-placement=\"top right\" data-uib-tooltip=\"{{item.customization.catalogVersionNameL10N}}\"></span></div></div><div class=\"pe-spinner--inner\" data-ng-show=\"$ctrl.moreCustomizationsRequestProcessing\"><div class=\"spinner-md spinner-light\"></div></div></personalization-prevent-parent-scroll></personalization-infinite-scrolling></div></div>"
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var COMPONENT_CONTAINER_TYPE_PROVIDER = {
    provide: 'COMPONENT_CONTAINER_TYPE',
    useValue: 'CxCmsComponentContainer'
};
var CONTAINER_SOURCE_ID_ATTR_PROVIDER = {
    provide: 'CONTAINER_SOURCE_ID_ATTR',
    useValue: 'data-smartedit-container-source-id'
};
var /* @ngInject */ PersonalizationsmarteditComponentHandlerService = /** @class */ (function () {
    PersonalizationsmarteditComponentHandlerService.$inject = ["componentHandlerService", "yjQuery", "CONTAINER_TYPE_ATTRIBUTE", "CONTAINER_ID_ATTRIBUTE", "TYPE_ATTRIBUTE", "CONTENT_SLOT_TYPE", "COMPONENT_CONTAINER_TYPE", "CONTAINER_SOURCE_ID_ATTR"];
    function /* @ngInject */ PersonalizationsmarteditComponentHandlerService(componentHandlerService, yjQuery, CONTAINER_TYPE_ATTRIBUTE, CONTAINER_ID_ATTRIBUTE, TYPE_ATTRIBUTE, CONTENT_SLOT_TYPE, COMPONENT_CONTAINER_TYPE, CONTAINER_SOURCE_ID_ATTR) {
        this.componentHandlerService = componentHandlerService;
        this.yjQuery = yjQuery;
        this.CONTAINER_TYPE_ATTRIBUTE = CONTAINER_TYPE_ATTRIBUTE;
        this.CONTAINER_ID_ATTRIBUTE = CONTAINER_ID_ATTRIBUTE;
        this.TYPE_ATTRIBUTE = TYPE_ATTRIBUTE;
        this.CONTENT_SLOT_TYPE = CONTENT_SLOT_TYPE;
        this.COMPONENT_CONTAINER_TYPE = COMPONENT_CONTAINER_TYPE;
        this.CONTAINER_SOURCE_ID_ATTR = CONTAINER_SOURCE_ID_ATTR;
    }
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerForComponent = function (component) {
        var parent = component.closest('[' + this.CONTAINER_TYPE_ATTRIBUTE + '=' + this.COMPONENT_CONTAINER_TYPE + ']');
        return parent;
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerForComponent.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerIdForComponent = function (component) {
        var parent = component.closest('[' + this.CONTAINER_TYPE_ATTRIBUTE + '=' + this.COMPONENT_CONTAINER_TYPE + ']');
        return parent.attr(this.CONTAINER_ID_ATTRIBUTE);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerIdForComponent.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerSourceIdForComponent = function (component) {
        var parent = component.closest('[' + this.CONTAINER_TYPE_ATTRIBUTE + '=' + this.COMPONENT_CONTAINER_TYPE + ']');
        return parent.attr(this.CONTAINER_SOURCE_ID_ATTR);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getParentContainerSourceIdForComponent.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getParentSlotForComponent = function (component) {
        var parent = component.closest('[' + this.TYPE_ATTRIBUTE + '=' + this.CONTENT_SLOT_TYPE + ']');
        return parent;
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getParentSlotForComponent.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getParentSlotIdForComponent = function (component) {
        return this.componentHandlerService.getParentSlotForComponent(component);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getParentSlotIdForComponent.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getOriginalComponent = function (componentId, componentType) {
        return this.componentHandlerService.getOriginalComponent(componentId, componentType);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getOriginalComponent.$inject = ["componentId", "componentType"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.isExternalComponent = function (componentId, componentType) {
        return this.componentHandlerService.isExternalComponent(componentId, componentType);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.isExternalComponent.$inject = ["componentId", "componentType"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getCatalogVersionUuid = function (component) {
        return this.componentHandlerService.getCatalogVersionUuid(component);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getCatalogVersionUuid.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getAllSlotsSelector = function () {
        return this.componentHandlerService.getAllSlotsSelector();
    };
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getFromSelector = function (selector) {
        return this.yjQuery(selector);
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getFromSelector.$inject = ["selector"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService.prototype.getContainerSourceIdForContainerId = function (containerId) {
        var containerSelector = this.getAllSlotsSelector();
        containerSelector += ' [' + this.CONTAINER_ID_ATTRIBUTE + '="' + containerId + '"]'; // space at beginning is important
        var container = this.getFromSelector(containerSelector);
        return container[0] ? container[0].getAttribute(this.CONTAINER_SOURCE_ID_ATTR) : "";
    };
    PersonalizationsmarteditComponentHandlerService.prototype.getContainerSourceIdForContainerId.$inject = ["containerId"];
    /* @ngInject */ PersonalizationsmarteditComponentHandlerService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smartedit.ComponentHandlerService, Object, String, String, String, String, String, String])
    ], /* @ngInject */ PersonalizationsmarteditComponentHandlerService);
    return /* @ngInject */ PersonalizationsmarteditComponentHandlerService;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper = /** @class */ (function () {
    PersonalizationsmarteditCustomizeViewHelper.$inject = ["personalizationsmarteditComponentHandlerService", "lodash"];
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper(personalizationsmarteditComponentHandlerService, lodash) {
        this.personalizationsmarteditComponentHandlerService = personalizationsmarteditComponentHandlerService;
        this.lodash = lodash;
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper.prototype.getSourceContainersInfo = function () {
        var _this = this;
        var slotsSelector = this.personalizationsmarteditComponentHandlerService.getAllSlotsSelector();
        slotsSelector += ' [data-smartedit-container-source-id]'; // space at beginning is important
        var slots = this.personalizationsmarteditComponentHandlerService.getFromSelector(slotsSelector);
        var slotIds = slots.map(function (key, val) {
            var component = _this.personalizationsmarteditComponentHandlerService.getFromSelector(val);
            var slot = {
                containerId: _this.personalizationsmarteditComponentHandlerService.getParentContainerIdForComponent(component),
                containerSourceId: _this.personalizationsmarteditComponentHandlerService.getParentContainerSourceIdForComponent(component)
            };
            return slot;
        });
        return this.lodash.countBy(slotIds, 'containerSourceId');
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditComponentHandlerService, Function])
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewHelper;
}());

var /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy() {
    }
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy.prototype.applySynchronization = function () {
        'proxyFunction';
        return undefined;
    };
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy.prototype.isCurrentPageActiveWorkflowRunning = function () {
        'proxyFunction';
        return undefined;
    };
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy = __decorate([
        smarteditcommons.GatewayProxied('applySynchronization', 'isCurrentPageActiveWorkflowRunning'),
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy);
    return /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy;
}());

var /* @ngInject */ PersonalizationsmarteditContextService = /** @class */ (function () {
    PersonalizationsmarteditContextService.$inject = ["yjQuery", "contextualMenuService", "personalizationsmarteditContextServiceReverseProxy", "personalizationsmarteditContextUtils"];
    function /* @ngInject */ PersonalizationsmarteditContextService(yjQuery, contextualMenuService, personalizationsmarteditContextServiceReverseProxy, personalizationsmarteditContextUtils) {
        this.yjQuery = yjQuery;
        this.contextualMenuService = contextualMenuService;
        this.personalizationsmarteditContextServiceReverseProxy = personalizationsmarteditContextServiceReverseProxy;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        var context = personalizationsmarteditContextUtils.getContextObject();
        this.setPersonalization(context.personalization);
        this.setCustomize(context.customize);
        this.setCombinedView(context.combinedView);
        this.setSeData(context.seData);
    }
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getPersonalization = function () {
        return this.personalization;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setPersonalization = function (personalization) {
        this.personalization = personalization;
        this.contextualMenuService.refreshMenuItems();
    };
    PersonalizationsmarteditContextService.prototype.setPersonalization.$inject = ["personalization"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getCustomize = function () {
        return this.customize;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setCustomize = function (customize) {
        this.customize = customize;
        this.contextualMenuService.refreshMenuItems();
    };
    PersonalizationsmarteditContextService.prototype.setCustomize.$inject = ["customize"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getCombinedView = function () {
        return this.combinedView;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setCombinedView = function (combinedView) {
        this.combinedView = combinedView;
        this.contextualMenuService.refreshMenuItems();
    };
    PersonalizationsmarteditContextService.prototype.setCombinedView.$inject = ["combinedView"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getSeData = function () {
        return this.seData;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setSeData = function (seData) {
        this.seData = seData;
    };
    PersonalizationsmarteditContextService.prototype.setSeData.$inject = ["seData"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.isCurrentPageActiveWorkflowRunning = function () {
        return this.personalizationsmarteditContextServiceReverseProxy.isCurrentPageActiveWorkflowRunning();
    };
    /* @ngInject */ PersonalizationsmarteditContextService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, Object, PersonalizationsmarteditContextServiceReverseProxy,
            personalizationcommons.PersonalizationsmarteditContextUtils])
    ], /* @ngInject */ PersonalizationsmarteditContextService);
    return /* @ngInject */ PersonalizationsmarteditContextService;
}());

var /* @ngInject */ PersonalizationsmarteditContextServiceProxy = /** @class */ (function () {
    PersonalizationsmarteditContextServiceProxy.$inject = ["personalizationsmarteditContextService", "crossFrameEventService"];
    function /* @ngInject */ PersonalizationsmarteditContextServiceProxy(personalizationsmarteditContextService, crossFrameEventService) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.crossFrameEventService = crossFrameEventService;
    }
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setPersonalization = function (newPersonalization) {
        this.personalizationsmarteditContextService.setPersonalization(newPersonalization);
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setPersonalization.$inject = ["newPersonalization"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setCustomize = function (newCustomize) {
        this.personalizationsmarteditContextService.setCustomize(newCustomize);
        this.crossFrameEventService.publish('PERSONALIZATION_CUSTOMIZE_CONTEXT_SYNCHRONIZED');
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setCustomize.$inject = ["newCustomize"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setCombinedView = function (newCombinedView) {
        this.personalizationsmarteditContextService.setCombinedView(newCombinedView);
        this.crossFrameEventService.publish('PERSONALIZATION_COMBINEDVIEW_CONTEXT_SYNCHRONIZED');
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setCombinedView.$inject = ["newCombinedView"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setSeData = function (newSeData) {
        this.personalizationsmarteditContextService.setSeData(newSeData);
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setSeData.$inject = ["newSeData"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('setPersonalization', 'setCustomize', 'setCombinedView', 'setSeData'),
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            smarteditcommons.CrossFrameEventService])
    ], /* @ngInject */ PersonalizationsmarteditContextServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditContextServiceProxy;
}());

var /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy() {
    }
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openDeleteAction = function (config) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openDeleteAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openAddAction = function (config) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openAddAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditAction = function (config) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditComponentAction = function (config) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditComponentAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('openDeleteAction', 'openAddAction', 'openEditAction', 'openEditComponentAction'),
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy;
}());

var /* @ngInject */ PersonalizationsmarteditContextualMenuService = /** @class */ (function () {
    PersonalizationsmarteditContextualMenuService.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditComponentHandlerService", "personalizationsmarteditUtils", "personalizationsmarteditContextMenuServiceProxy", "crossFrameEventService", "EVENTS", "lodash"];
    function /* @ngInject */ PersonalizationsmarteditContextualMenuService(personalizationsmarteditContextService, personalizationsmarteditComponentHandlerService, personalizationsmarteditUtils, personalizationsmarteditContextMenuServiceProxy, crossFrameEventService, EVENTS, lodash) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditComponentHandlerService = personalizationsmarteditComponentHandlerService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditContextMenuServiceProxy = personalizationsmarteditContextMenuServiceProxy;
        this.crossFrameEventService = crossFrameEventService;
        this.EVENTS = EVENTS;
        this.lodash = lodash;
        this.isWorkflowRunningBoolean = true;
        this.init();
    }
    /* @ngInject */ PersonalizationsmarteditContextualMenuService_1 = /* @ngInject */ PersonalizationsmarteditContextualMenuService;
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.init = function () {
        var _this = this;
        this.crossFrameEventService.subscribe(this.EVENTS.PAGE_CHANGE, function () {
            _this.updateWorkflowStatus();
        });
        this.crossFrameEventService.subscribe(this.EVENTS.PAGE_UPDATED, function () {
            _this.updateWorkflowStatus();
        });
        this.updateWorkflowStatus();
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.refreshContext = function () {
        this.contextPersonalization = this.personalizationsmarteditContextService.getPersonalization();
        this.contextCustomize = this.personalizationsmarteditContextService.getCustomize();
        this.contextCombinedView = this.personalizationsmarteditContextService.getCombinedView();
        this.contextSeData = this.personalizationsmarteditContextService.getSeData();
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.openDeleteAction = function (config) {
        var configProperties = this.lodash.isString(config.componentAttributes) ? JSON.parse(config.componentAttributes) : config.componentAttributes;
        var configurationToPass = {};
        configurationToPass.containerId = config.containerId;
        configurationToPass.containerSourceId = configProperties.smarteditContainerSourceId;
        configurationToPass.slotId = config.slotId;
        configurationToPass.actionId = configProperties.smarteditPersonalizationActionId || null;
        configurationToPass.selectedVariationCode = configProperties.smarteditPersonalizationVariationId || null;
        configurationToPass.selectedCustomizationCode = configProperties.smarteditPersonalizationCustomizationId || null;
        var componentCatalog = configProperties.smarteditCatalogVersionUuid.split('\/');
        configurationToPass.componentCatalog = componentCatalog[0];
        configurationToPass.componentCatalogVersion = componentCatalog[1];
        var contextCustomization = this.getSelectedCustomization(configurationToPass.selectedCustomizationCode);
        configurationToPass.catalog = contextCustomization.catalog;
        configurationToPass.catalogVersion = contextCustomization.catalogVersion;
        configurationToPass.slotsToRefresh = this.getSlotsToRefresh(configProperties.smarteditContainerSourceId);
        this.personalizationsmarteditContextMenuServiceProxy.openDeleteAction(configurationToPass);
    };
    PersonalizationsmarteditContextualMenuService.prototype.openDeleteAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.openAddAction = function (config) {
        var configProperties = this.lodash.isString(config.componentAttributes) ? JSON.parse(config.componentAttributes) : config.componentAttributes;
        var configurationToPass = {};
        configurationToPass.componentType = config.componentType;
        configurationToPass.componentId = config.componentId;
        configurationToPass.containerId = config.containerId;
        configurationToPass.containerSourceId = configProperties.smarteditContainerSourceId;
        configurationToPass.slotId = config.slotId;
        configurationToPass.actionId = configProperties.smarteditPersonalizationActionId || null;
        configurationToPass.selectedVariationCode = this.getSelectedVariationCode();
        var componentCatalog = configProperties.smarteditCatalogVersionUuid.split('\/');
        configurationToPass.componentCatalog = componentCatalog[0];
        var contextCustomization = this.getSelectedCustomization();
        configurationToPass.catalog = contextCustomization.catalog;
        configurationToPass.selectedCustomizationCode = contextCustomization.code;
        var slot = this.personalizationsmarteditComponentHandlerService.getParentSlotForComponent(config.element);
        var slotCatalog = this.personalizationsmarteditComponentHandlerService.getCatalogVersionUuid(slot).split('\/');
        configurationToPass.slotCatalog = slotCatalog[0];
        configurationToPass.slotsToRefresh = this.getSlotsToRefresh(configProperties.smarteditContainerSourceId);
        configurationToPass.slotsToRefresh.push(config.slotId);
        return this.personalizationsmarteditContextMenuServiceProxy.openAddAction(configurationToPass);
    };
    PersonalizationsmarteditContextualMenuService.prototype.openAddAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.openEditAction = function (config) {
        var configProperties = this.lodash.isString(config.componentAttributes) ? JSON.parse(config.componentAttributes) : config.componentAttributes;
        var configurationToPass = {};
        configurationToPass.componentType = config.componentType;
        configurationToPass.componentId = config.componentId;
        configurationToPass.containerId = config.containerId;
        configurationToPass.containerSourceId = configProperties.smarteditContainerSourceId;
        configurationToPass.slotId = config.slotId;
        configurationToPass.actionId = configProperties.smarteditPersonalizationActionId || null;
        configurationToPass.selectedVariationCode = configProperties.smarteditPersonalizationVariationId || null;
        configurationToPass.selectedCustomizationCode = configProperties.smarteditPersonalizationCustomizationId || null;
        configurationToPass.componentUuid = configProperties.smarteditComponentUuid || null;
        configurationToPass.slotsToRefresh = this.getSlotsToRefresh(configProperties.smarteditContainerSourceId);
        return this.personalizationsmarteditContextMenuServiceProxy.openEditAction(configurationToPass);
    };
    PersonalizationsmarteditContextualMenuService.prototype.openEditAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.openEditComponentAction = function (config) {
        var configProperties = this.lodash.isString(config.componentAttributes) ? JSON.parse(config.componentAttributes) : config.componentAttributes;
        var configurationToPass = {};
        configurationToPass.smarteditComponentType = configProperties.smarteditComponentType;
        configurationToPass.smarteditComponentUuid = configProperties.smarteditComponentUuid;
        configurationToPass.smarteditCatalogVersionUuid = configProperties.smarteditCatalogVersionUuid;
        return this.personalizationsmarteditContextMenuServiceProxy.openEditComponentAction(configurationToPass);
    };
    PersonalizationsmarteditContextualMenuService.prototype.openEditComponentAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isCustomizeObjectValid = function (customize) {
        return this.lodash.isObject(customize.selectedCustomization) && this.lodash.isObject(customize.selectedVariations) && !this.lodash.isArray(customize.selectedVariations);
    };
    PersonalizationsmarteditContextualMenuService.prototype.isCustomizeObjectValid.$inject = ["customize"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuEnabled = function () {
        return this.isCustomizeObjectValid(this.contextCustomize) || (this.contextCombinedView.enabled && this.isCustomizeObjectValid(this.contextCombinedView.customize));
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isElementHighlighted = function (config) {
        if (this.contextCombinedView.enabled) {
            return this.lodash.indexOf(this.contextCombinedView.customize.selectedComponents, config.componentAttributes.smarteditContainerSourceId) > -1;
        }
        else {
            return this.lodash.indexOf(this.contextCustomize.selectedComponents, config.componentAttributes.smarteditContainerSourceId) > -1;
        }
    };
    PersonalizationsmarteditContextualMenuService.prototype.isElementHighlighted.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isSlotInCurrentCatalog = function (config) {
        var slot = this.personalizationsmarteditComponentHandlerService.getParentSlotForComponent(config.element);
        var catalogUuid = this.personalizationsmarteditComponentHandlerService.getCatalogVersionUuid(slot);
        var experienceCV = this.contextSeData.seExperienceData.catalogDescriptor.catalogVersionUuid;
        return experienceCV === catalogUuid;
    };
    PersonalizationsmarteditContextualMenuService.prototype.isSlotInCurrentCatalog.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isComponentInCurrentCatalog = function (config) {
        var experienceCV = this.contextSeData.seExperienceData.catalogDescriptor.catalogVersionUuid;
        var componentCV = config.componentAttributes.smarteditCatalogVersionUuid;
        return experienceCV === componentCV;
    };
    PersonalizationsmarteditContextualMenuService.prototype.isComponentInCurrentCatalog.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isSelectedCustomizationFromCurrentCatalog = function () {
        var customization = this.contextCustomize.selectedCustomization || this.contextCombinedView.customize.selectedCustomization;
        if (customization) {
            return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(customization, this.personalizationsmarteditContextService.getSeData());
        }
        return false;
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isCustomizationFromCurrentCatalog = function (config) {
        var items = this.contextCombinedView.selectedItems || [];
        var foundItem = items.filter(function (item) {
            return item.customization.code === config.componentAttributes.smarteditPersonalizationCustomizationId && item.variation.code === config.componentAttributes.smarteditPersonalizationVariationId;
        });
        foundItem = foundItem.shift();
        if (foundItem) {
            return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(foundItem.customization, this.personalizationsmarteditContextService.getSeData());
        }
        return false;
    };
    PersonalizationsmarteditContextualMenuService.prototype.isCustomizationFromCurrentCatalog.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isEditPersonalizationInWorkflowAllowed = function (condition) {
        var seConfigurationData = this.personalizationsmarteditContextService.getSeData().seConfigurationData || [];
        var isEditPersonalizationInWorkflowPropertyEnabled = seConfigurationData[/* @ngInject */ PersonalizationsmarteditContextualMenuService_1.EDIT_PERSONALIZATION_IN_WORKFLOW] === true;
        if (isEditPersonalizationInWorkflowPropertyEnabled) {
            return condition;
        }
        else {
            return condition && !this.isWorkflowRunningBoolean;
        }
    };
    PersonalizationsmarteditContextualMenuService.prototype.isEditPersonalizationInWorkflowAllowed.$inject = ["condition"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isPersonalizationAllowedInWorkflow = function () {
        this.refreshContext();
        return this.isEditPersonalizationInWorkflowAllowed(this.contextPersonalization.enabled);
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuAddItemEnabled = function (config) {
        this.refreshContext();
        var isEnabled = this.isContextualMenuEnabled();
        isEnabled = isEnabled && (!this.isElementHighlighted(config));
        isEnabled = isEnabled && this.isSlotInCurrentCatalog(config);
        isEnabled = isEnabled && this.isSelectedCustomizationFromCurrentCatalog();
        return this.isEditPersonalizationInWorkflowAllowed(isEnabled);
    };
    PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuAddItemEnabled.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuEditItemEnabled = function (config) {
        this.refreshContext();
        var isEnabled = this.contextPersonalization.enabled;
        isEnabled = isEnabled && !this.lodash.isUndefined(config.componentAttributes.smarteditPersonalizationActionId);
        isEnabled = isEnabled && this.isSlotInCurrentCatalog(config);
        isEnabled = isEnabled && (this.isSelectedCustomizationFromCurrentCatalog() || this.isCustomizationFromCurrentCatalog(config));
        return this.isEditPersonalizationInWorkflowAllowed(isEnabled);
    };
    PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuEditItemEnabled.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuDeleteItemEnabled = function (config) {
        return this.isContextualMenuEditItemEnabled(config);
    };
    PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuDeleteItemEnabled.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuShowActionListEnabled = function (config) {
        this.refreshContext();
        var isEnabled = !this.lodash.isUndefined(config.componentAttributes.smarteditPersonalizationActionId);
        isEnabled = isEnabled && this.contextCombinedView.enabled;
        isEnabled = isEnabled && !this.contextCombinedView.customize.selectedCustomization;
        return isEnabled;
    };
    PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuShowActionListEnabled.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuInfoEnabled = function () {
        this.refreshContext();
        var isEnabled = this.contextPersonalization.enabled;
        isEnabled = isEnabled && !this.lodash.isObject(this.contextCustomize.selectedVariations);
        isEnabled = isEnabled || this.lodash.isArray(this.contextCustomize.selectedVariations);
        isEnabled = isEnabled && !this.contextCombinedView.enabled;
        return isEnabled;
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuInfoItemEnabled = function () {
        var isEnabled = this.isContextualMenuInfoEnabled();
        return isEnabled || !this.isEditPersonalizationInWorkflowAllowed(this.contextPersonalization.enabled);
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuEditComponentItemEnabled = function (config) {
        this.refreshContext();
        var isEnabled = this.contextPersonalization.enabled;
        isEnabled = isEnabled && !this.contextCombinedView.enabled && this.isComponentInCurrentCatalog(config);
        return isEnabled;
    };
    PersonalizationsmarteditContextualMenuService.prototype.isContextualMenuEditComponentItemEnabled.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.getSelectedVariationCode = function () {
        if (this.personalizationsmarteditContextService.getCombinedView().enabled) {
            return this.personalizationsmarteditContextService.getCombinedView().customize.selectedVariations.code;
        }
        return this.personalizationsmarteditContextService.getCustomize().selectedVariations.code;
    };
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.getSelectedCustomization = function (customizationCode) {
        if (this.personalizationsmarteditContextService.getCombinedView().enabled) {
            var customization = this.personalizationsmarteditContextService.getCombinedView().customize.selectedCustomization;
            if (!customization && customizationCode) {
                customization = this.personalizationsmarteditContextService.getCombinedView().selectedItems.filter(function (elem) {
                    return elem.customization.code === customizationCode;
                })[0].customization;
            }
            return customization;
        }
        return this.personalizationsmarteditContextService.getCustomize().selectedCustomization;
    };
    PersonalizationsmarteditContextualMenuService.prototype.getSelectedCustomization.$inject = ["customizationCode"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.getSlotsToRefresh = function (containerSourceId) {
        var _this = this;
        var slotsSelector = this.personalizationsmarteditComponentHandlerService.getAllSlotsSelector();
        slotsSelector += ' [data-smartedit-container-source-id="' + containerSourceId + '"]'; // space at beginning is important
        var slots = this.personalizationsmarteditComponentHandlerService.getFromSelector(slotsSelector);
        var slotIds = Array.prototype.slice.call(this.lodash.map(slots, function (el) {
            return _this.personalizationsmarteditComponentHandlerService.getParentSlotIdForComponent(_this.personalizationsmarteditComponentHandlerService.getFromSelector(el));
        }));
        return slotIds;
    };
    PersonalizationsmarteditContextualMenuService.prototype.getSlotsToRefresh.$inject = ["containerSourceId"];
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.prototype.updateWorkflowStatus = function () {
        var _this = this;
        this.personalizationsmarteditContextService.isCurrentPageActiveWorkflowRunning().then(function (result) {
            _this.isWorkflowRunningBoolean = result;
        });
    };
    var /* @ngInject */ PersonalizationsmarteditContextualMenuService_1;
    /* @ngInject */ PersonalizationsmarteditContextualMenuService.EDIT_PERSONALIZATION_IN_WORKFLOW = 'personalizationsmartedit.editPersonalizationInWorkflow.enabled';
    /* @ngInject */ PersonalizationsmarteditContextualMenuService = /* @ngInject */ PersonalizationsmarteditContextualMenuService_1 = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            PersonalizationsmarteditComponentHandlerService,
            personalizationcommons.PersonalizationsmarteditUtils,
            PersonalizationsmarteditContextMenuServiceProxy,
            smarteditcommons.CrossFrameEventService, Object, Function])
    ], /* @ngInject */ PersonalizationsmarteditContextualMenuService);
    return /* @ngInject */ PersonalizationsmarteditContextualMenuService;
}());

var ACTIONS_DETAILS_PROVIDER = {
    provide: 'ACTIONS_DETAILS',
    useValue: "/personalizationwebservices/v1/catalogs/:catalogId/catalogVersions/:catalogVersion/actions"
};
var /* @ngInject */ PersonalizationsmarteditRestService = /** @class */ (function () {
    PersonalizationsmarteditRestService.$inject = ["restServiceFactory", "personalizationsmarteditContextService", "ACTIONS_DETAILS"];
    function /* @ngInject */ PersonalizationsmarteditRestService(restServiceFactory, personalizationsmarteditContextService, ACTIONS_DETAILS) {
        this.restServiceFactory = restServiceFactory;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.ACTIONS_DETAILS = ACTIONS_DETAILS;
    }
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithCatalogAwarePathVariables = function (requestParam, catalogAware) {
        catalogAware = catalogAware || {};
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var catalogAwareParams = {
            catalogId: catalogAware.catalog || experienceData.catalogDescriptor.catalogId,
            catalogVersion: catalogAware.catalogVersion || experienceData.catalogDescriptor.catalogVersion
        };
        requestParam = angular.extend(requestParam, catalogAwareParams);
        return requestParam;
    };
    PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithCatalogAwarePathVariables.$inject = ["requestParam", "catalogAware"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getCxCmsAllActionsForContainer = function (containerId, filter) {
        var requestParams;
        filter = filter || {};
        var restService = this.restServiceFactory.get(this.ACTIONS_DETAILS);
        requestParams = {
            type: "CXCMSACTION",
            customizationStatus: "ENABLED",
            variationStatus: "ENABLED",
            catalogs: "ALL",
            needsTotal: true,
            containerId: containerId,
            pageSize: filter.currentSize || 25,
            currentPage: filter.currentPage || 0
        };
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams, undefined);
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getCxCmsAllActionsForContainer.$inject = ["containerId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, PersonalizationsmarteditContextService, String])
    ], /* @ngInject */ PersonalizationsmarteditRestService);
    return /* @ngInject */ PersonalizationsmarteditRestService;
}());

var /* @ngInject */ PersonalizationsmarteditServicesModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditServicesModule() {
    }
    /* @ngInject */ PersonalizationsmarteditServicesModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'smarteditServicesModule',
                'yLoDashModule',
                personalizationcommons.PersonalizationsmarteditCommonsModule
            ],
            providers: [
                PersonalizationsmarteditComponentHandlerService,
                PersonalizationsmarteditCustomizeViewHelper,
                PersonalizationsmarteditContextService,
                PersonalizationsmarteditContextServiceProxy,
                PersonalizationsmarteditContextServiceReverseProxy,
                PersonalizationsmarteditRestService,
                PersonalizationsmarteditContextualMenuService,
                PersonalizationsmarteditContextMenuServiceProxy,
                COMPONENT_CONTAINER_TYPE_PROVIDER,
                CONTAINER_SOURCE_ID_ATTR_PROVIDER,
                ACTIONS_DETAILS_PROVIDER
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditServicesModule);
    return /* @ngInject */ PersonalizationsmarteditServicesModule;
}());

var /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent = /** @class */ (function () {
    PersonalizationsmarteditShowComponentInfoListComponent.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditContextualMenuService", "personalizationsmarteditUtils", "personalizationsmarteditRestService", "personalizationsmarteditMessageHandler", "$translate", "personalizationsmarteditComponentHandlerService", "permissionService"];
    function /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent(personalizationsmarteditContextService, personalizationsmarteditContextualMenuService, personalizationsmarteditUtils, personalizationsmarteditRestService, personalizationsmarteditMessageHandler, $translate, personalizationsmarteditComponentHandlerService, permissionService) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditContextualMenuService = personalizationsmarteditContextualMenuService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.$translate = $translate;
        this.personalizationsmarteditComponentHandlerService = personalizationsmarteditComponentHandlerService;
        this.permissionService = permissionService;
    }
    // Methods
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.$onInit = function () {
        this.initPageSize = 25;
        this.moreCustomizationsRequestProcessing = false;
        this.isContainerIdEmpty = !this.containerId;
        this.containerSourceId = (this.isContainerIdEmpty) ? "" : this.personalizationsmarteditComponentHandlerService.getContainerSourceIdForContainerId(this.containerId);
        this.pagination = new personalizationcommons.PaginationHelper({});
        this.pagination.reset();
        this.isPageBlocked = false;
        this.isPersonalizationAllowedInWorkflow = false;
        this.isPersonalizationBlockedOnPage();
        this.isPersonalizationAllowedWithWorkflow();
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.isCustomizationFromCurrentCatalog = function (customization) {
        if (customization) {
            return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(customization, this.personalizationsmarteditContextService.getSeData());
        }
        return false;
    };
    PersonalizationsmarteditShowComponentInfoListComponent.prototype.isCustomizationFromCurrentCatalog.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.isPersonalizationAllowedWithWorkflow = function () {
        this.isPersonalizationAllowedInWorkflow = this.personalizationsmarteditContextualMenuService.isPersonalizationAllowedInWorkflow();
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.isContextualMenuInfoEnabled = function () {
        return this.personalizationsmarteditContextualMenuService.isContextualMenuInfoEnabled();
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.customizationVisible = function () {
        if (this.actions) {
            return !this.isContainerIdEmpty && this.actions.length > 0;
        }
        return false;
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.getCustomizationsFilterObject = function () {
        return {
            currentSize: this.initPageSize,
            currentPage: this.pagination.getPage() + 1
        };
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.isPersonalizationBlockedOnPage = function () {
        var _this = this;
        this.permissionService.isPermitted([{ names: ['se.personalization.page'] }]).then(function (response) { return _this.isPageBlocked = !response; });
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.getAllActionsAffectingContainerId = function (containerId, filter) {
        var _this = this;
        return this.personalizationsmarteditRestService.getCxCmsAllActionsForContainer(containerId, filter).then(function (response) {
            _this.actions = _this.actions || [];
            var results = response.actions || {};
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                result.customization = {};
                result.customization.catalog = result.actionCatalog;
                result.customization.catalogVersion = result.actionCatalogVersion;
                _this.personalizationsmarteditUtils.getAndSetCatalogVersionNameL10N(result.customization);
            }
            _this.personalizationsmarteditUtils.uniqueArray(_this.actions, results || [], 'variationCode');
            _this.pagination = new personalizationcommons.PaginationHelper(response.pagination);
            _this.moreCustomizationsRequestProcessing = false;
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingactions'));
            _this.moreCustomizationsRequestProcessing = false;
        });
    };
    PersonalizationsmarteditShowComponentInfoListComponent.prototype.getAllActionsAffectingContainerId.$inject = ["containerId", "filter"];
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.addMoreItems = function () {
        if ((this.pagination.getPage() < this.pagination.getTotalPages() - 1) && !this.moreCustomizationsRequestProcessing && !this.isContainerIdEmpty) {
            this.moreCustomizationsRequestProcessing = true;
            this.getAllActionsAffectingContainerId(this.containerSourceId, this.getCustomizationsFilterObject());
        }
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent.prototype.getPage = function () {
        this.context.addMoreItems();
    };
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditShowComponentInfoListTemplate.html',
            inputs: [
                'containerId'
            ]
        }),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            PersonalizationsmarteditContextualMenuService, Object, PersonalizationsmarteditRestService, Object, Function, PersonalizationsmarteditComponentHandlerService,
            smarteditcommons.IPermissionService])
    ], /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent);
    return /* @ngInject */ PersonalizationsmarteditShowComponentInfoListComponent;
}());

var /* @ngInject */ PersonalizationsmarteditShowComponentInfoListModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditShowComponentInfoListModule() {
    }
    /* @ngInject */ PersonalizationsmarteditShowComponentInfoListModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                personalizationcommons.PersonalizationsmarteditCommonsModule
            ],
            declarations: [PersonalizationsmarteditShowComponentInfoListComponent]
        })
    ], /* @ngInject */ PersonalizationsmarteditShowComponentInfoListModule);
    return /* @ngInject */ PersonalizationsmarteditShowComponentInfoListModule;
}());

var /* @ngInject */ PersonalizationsmarteditShowActionListComponent = /** @class */ (function () {
    PersonalizationsmarteditShowActionListComponent.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditUtils", "personalizationsmarteditComponentHandlerService"];
    function /* @ngInject */ PersonalizationsmarteditShowActionListComponent(personalizationsmarteditContextService, personalizationsmarteditUtils, personalizationsmarteditComponentHandlerService) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditComponentHandlerService = personalizationsmarteditComponentHandlerService;
    }
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent.prototype.$onInit = function () {
        this.selectedItems = this.personalizationsmarteditContextService.getCombinedView().selectedItems;
        this.containerSourceId = this.personalizationsmarteditComponentHandlerService.getContainerSourceIdForContainerId(this.containerId);
    };
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent.prototype.getLetterForElement = function (index) {
        return this.personalizationsmarteditUtils.getLetterForElement(index);
    };
    PersonalizationsmarteditShowActionListComponent.prototype.getLetterForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent.prototype.getClassForElement = function (index) {
        return this.personalizationsmarteditUtils.getClassForElement(index);
    };
    PersonalizationsmarteditShowActionListComponent.prototype.getClassForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent.prototype.initItem = function (item) {
        var _this = this;
        item.visible = false;
        (item.variation.actions || []).forEach(function (elem) {
            if (elem.containerId && elem.containerId === _this.containerSourceId) {
                item.visible = true;
            }
        });
        this.personalizationsmarteditUtils.getAndSetCatalogVersionNameL10N(item.variation);
    };
    PersonalizationsmarteditShowActionListComponent.prototype.initItem.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent.prototype.isCustomizationFromCurrentCatalog = function (customization) {
        return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(customization, this.personalizationsmarteditContextService.getSeData());
    };
    PersonalizationsmarteditShowActionListComponent.prototype.isCustomizationFromCurrentCatalog.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditShowActionListComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditShowActionListTemplate.html',
            inputs: [
                'containerId'
            ]
        }),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService, Object, PersonalizationsmarteditComponentHandlerService])
    ], /* @ngInject */ PersonalizationsmarteditShowActionListComponent);
    return /* @ngInject */ PersonalizationsmarteditShowActionListComponent;
}());

var /* @ngInject */ PersonalizationsmarteditShowActionListModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditShowActionListModule() {
    }
    /* @ngInject */ PersonalizationsmarteditShowActionListModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                personalizationcommons.PersonalizationsmarteditCommonsModule
            ],
            declarations: [PersonalizationsmarteditShowActionListComponent]
        })
    ], /* @ngInject */ PersonalizationsmarteditShowActionListModule);
    return /* @ngInject */ PersonalizationsmarteditShowActionListModule;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy = /** @class */ (function () {
    PersonalizationsmarteditCustomizeViewServiceProxy.$inject = ["personalizationsmarteditCustomizeViewHelper"];
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy(personalizationsmarteditCustomizeViewHelper) {
        this.personalizationsmarteditCustomizeViewHelper = personalizationsmarteditCustomizeViewHelper;
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy.prototype.getSourceContainersInfo = function () {
        return this.personalizationsmarteditCustomizeViewHelper.getSourceContainersInfo();
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('getSourceContainersInfo'),
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditCustomizeViewHelper])
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                PersonalizationsmarteditServicesModule
            ],
            providers: [
                PersonalizationsmarteditCustomizeViewServiceProxy
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewModule);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewModule;
}());

var /* @ngInject */ PersonalizationsmarteditContextMenuModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContextMenuModule() {
    }
    /* @ngInject */ PersonalizationsmarteditContextMenuModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                PersonalizationsmarteditServicesModule,
            ],
            providers: [
                PersonalizationsmarteditContextMenuServiceProxy
            ],
        })
    ], /* @ngInject */ PersonalizationsmarteditContextMenuModule);
    return /* @ngInject */ PersonalizationsmarteditContextMenuModule;
}());

var /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController = /** @class */ (function () {
    PersonalizationsmarteditSharedSlotDecoratorController.$inject = ["slotSharedService", "$element"];
    function /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController(slotSharedService, $element) {
        this.slotSharedService = slotSharedService;
        this.$element = $element;
    }
    /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController.prototype.positionPanel = function () {
        // Function copied from slotContextualMenuDecoratorModule.ts
        var decorativePanelArea = this.$element.find('.se-decorative-panel-area');
        var decoratorPaddingContainer = this.$element.find('.se-decoratorative-body-area');
        var marginTop;
        var height = decorativePanelArea.height();
        if (this.$element.offset().top <= height) {
            var borderOffset = 6;
            marginTop = decoratorPaddingContainer.height() + borderOffset;
            decoratorPaddingContainer.css('margin-top', -(marginTop + height));
        }
        else {
            marginTop = -32;
        }
        decorativePanelArea.css('margin-top', marginTop);
    };
    /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController.prototype.$onChanges = function (changes) {
        if (changes.active && changes.active.currentValue) {
            this.positionPanel();
            this.isPopupOpened = false;
        }
    };
    PersonalizationsmarteditSharedSlotDecoratorController.prototype.$onChanges.$inject = ["changes"];
    /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController.prototype.$onInit = function () {
        var _this = this;
        this.slotSharedFlag = false;
        this.slotSharedService.isSlotShared(this.smarteditComponentId).then(function (result) {
            _this.slotSharedFlag = result;
        });
    };
    /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [cmssmartedit.SlotSharedService, Object])
    ], /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController);
    return /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorController;
}());
var /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorModule() {
    }
    /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorModule = __decorate([
        smarteditcommons.SeModule({
        // imports: [
        // 	'slotSharedServiceModule'
        // ]
        })
    ], /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorModule);
    return /* @ngInject */ PersonalizationsmarteditSharedSlotDecoratorModule;
}());
angular.module(PersonalizationsmarteditSharedSlotDecoratorModule.moduleName, [])
    .directive('personalizationsmarteditSharedSlot', function () {
    return {
        templateUrl: 'personalizationsmarteditSharedSlotDecoratorTemplate.html',
        restrict: 'C',
        transclude: true,
        replace: false,
        controller: PersonalizationsmarteditSharedSlotDecoratorController,
        controllerAs: 'ctrl',
        scope: {},
        bindToController: {
            smarteditComponentId: '@',
            active: '<'
        }
    };
});

var /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController = /** @class */ (function () {
    PersonalizationsmarteditComponentLightUpDecoratorController.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditComponentHandlerService", "crossFrameEventService", "CONTAINER_SOURCE_ID_ATTR", "OVERLAY_COMPONENT_CLASS", "CONTAINER_TYPE_ATTRIBUTE", "ID_ATTRIBUTE", "TYPE_ATTRIBUTE", "CATALOG_VERSION_UUID_ATTRIBUTE", "$element", "yjQuery"];
    function /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController(personalizationsmarteditContextService, personalizationsmarteditComponentHandlerService, crossFrameEventService, CONTAINER_SOURCE_ID_ATTR, OVERLAY_COMPONENT_CLASS, CONTAINER_TYPE_ATTRIBUTE, ID_ATTRIBUTE, TYPE_ATTRIBUTE, CATALOG_VERSION_UUID_ATTRIBUTE, $element, yjQuery) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditComponentHandlerService = personalizationsmarteditComponentHandlerService;
        this.crossFrameEventService = crossFrameEventService;
        this.CONTAINER_SOURCE_ID_ATTR = CONTAINER_SOURCE_ID_ATTR;
        this.OVERLAY_COMPONENT_CLASS = OVERLAY_COMPONENT_CLASS;
        this.CONTAINER_TYPE_ATTRIBUTE = CONTAINER_TYPE_ATTRIBUTE;
        this.ID_ATTRIBUTE = ID_ATTRIBUTE;
        this.TYPE_ATTRIBUTE = TYPE_ATTRIBUTE;
        this.CATALOG_VERSION_UUID_ATTRIBUTE = CATALOG_VERSION_UUID_ATTRIBUTE;
        this.$element = $element;
        this.yjQuery = yjQuery;
        this.CONTAINER_TYPE = 'CxCmsComponentContainer';
        this.ACTION_ID_ATTR = 'data-smartedit-personalization-action-id';
        this.PARENT_CONTAINER_SELECTOR = '[class~="' + this.OVERLAY_COMPONENT_CLASS + '"][' + this.CONTAINER_SOURCE_ID_ATTR + '][' + this.CONTAINER_TYPE_ATTRIBUTE + '="' + this.CONTAINER_TYPE + '"]';
        this.PARENT_CONTAINER_WITH_ACTION_SELECTOR = '[class~="' + this.OVERLAY_COMPONENT_CLASS + '"][' + this.CONTAINER_TYPE_ATTRIBUTE + '="' + this.CONTAINER_TYPE + '"][' + this.ACTION_ID_ATTR + ']';
        this.COMPONENT_SELECTOR = '[' + this.ID_ATTRIBUTE + '][' + this.CATALOG_VERSION_UUID_ATTRIBUTE + '][' + this.TYPE_ATTRIBUTE + ']';
    }
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController.prototype.isComponentSelected = function () {
        var elementSelected = false;
        if (angular.isArray(this.personalizationsmarteditContextService.getCustomize().selectedVariations)) {
            var containerId = this.personalizationsmarteditComponentHandlerService.getParentContainerIdForComponent(this.$element);
            elementSelected = this.yjQuery.inArray(containerId, this.personalizationsmarteditContextService.getCustomize().selectedComponents) > -1;
        }
        return elementSelected;
    };
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController.prototype.isVariationComponentSelected = function (component) {
        var elementSelected = false;
        var customize = this.personalizationsmarteditContextService.getCustomize();
        if (customize.selectedCustomization && customize.selectedVariations) {
            var container = component.closest(this.PARENT_CONTAINER_WITH_ACTION_SELECTOR);
            elementSelected = container.length > 0;
        }
        return elementSelected;
    };
    PersonalizationsmarteditComponentLightUpDecoratorController.prototype.isVariationComponentSelected.$inject = ["component"];
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController.prototype.calculate = function () {
        var component = this.$element.parent().closest(this.COMPONENT_SELECTOR);
        var container = component.closest(this.PARENT_CONTAINER_SELECTOR);
        container.toggleClass("perso__component-decorator", this.isVariationComponentSelected(component));
        container.toggleClass("hyicon hyicon-checkedlg perso__component-decorator-icon", this.isVariationComponentSelected(component));
        container.toggleClass("personalizationsmarteditComponentSelected", this.isComponentSelected());
    };
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController.prototype.$onInit = function () {
        var _this = this;
        this.unRegister = this.crossFrameEventService.subscribe('PERSONALIZATION_CUSTOMIZE_CONTEXT_SYNCHRONIZED', function () {
            _this.calculate();
        });
        this.calculate();
    };
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController.prototype.$onDestroy = function () {
        this.unRegister();
    };
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            PersonalizationsmarteditComponentHandlerService,
            smarteditcommons.CrossFrameEventService, String, String, String, String, String, String, Object, Function])
    ], /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController);
    return /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorController;
}());
var /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorModule() {
    }
    /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'yjqueryModule',
                'personalizationsmarteditTemplates',
                'personalizationsmarteditServicesModule',
                'smarteditServicesModule'
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorModule);
    return /* @ngInject */ PersonalizationsmarteditComponentLightUpDecoratorModule;
}());
angular.module(PersonalizationsmarteditComponentLightUpDecoratorModule.moduleName)
    .directive('personalizationsmarteditComponentLightUp', function () {
    return {
        templateUrl: 'personalizationsmarteditComponentLightUpDecoratorTemplate.html',
        restrict: 'C',
        transclude: true,
        replace: false,
        controller: PersonalizationsmarteditComponentLightUpDecoratorController,
        controllerAs: 'ctrl',
        scope: {}
    };
});

var /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController = /** @class */ (function () {
    PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController.$inject = ["$scope", "personalizationsmarteditContextService", "crossFrameEventService", "PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING", "$element"];
    function /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController($scope, personalizationsmarteditContextService, crossFrameEventService, PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING, $element) {
        var _this = this;
        this.$scope = $scope;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.crossFrameEventService = crossFrameEventService;
        this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING = PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING;
        this.$element = $element;
        var allBorderClassessArr = [];
        Object.keys(this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING).forEach(function (elem, index) {
            allBorderClassessArr.push(_this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING[index].borderClass);
        });
        this.allBorderClassess = allBorderClassessArr.join(' ');
        this.$scope.letterForElement = "";
        this.$scope.classForElement = "";
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController.prototype.calculate = function () {
        var _this = this;
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        if (combinedView.enabled) {
            var container_1 = this.$element.parent().closest('[class~="smartEditComponentX"][data-smartedit-container-source-id][data-smartedit-container-type="CxCmsComponentContainer"][data-smartedit-personalization-customization-id][data-smartedit-personalization-variation-id]');
            if (container_1.length > 0) {
                container_1.removeClass(this.allBorderClassess);
                (combinedView.selectedItems || []).forEach(function (element, index) {
                    var state = container_1.data().smarteditPersonalizationCustomizationId === element.customization.code;
                    state = state && container_1.data().smarteditPersonalizationVariationId === element.variation.code;
                    var wrappedIndex = index % Object.keys(_this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING).length;
                    if (state) {
                        container_1.addClass(_this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING[wrappedIndex].borderClass);
                        _this.$scope.letterForElement = String.fromCharCode('a'.charCodeAt(0) + wrappedIndex).toUpperCase();
                        _this.$scope.classForElement = _this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING[wrappedIndex].listClass;
                    }
                });
            }
        }
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController.prototype.$onInit = function () {
        var _this = this;
        this.unRegister = this.crossFrameEventService.subscribe('PERSONALIZATION_COMBINEDVIEW_CONTEXT_SYNCHRONIZED', function () {
            _this.calculate();
        });
        this.calculate();
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController.prototype.$onDestroy = function () {
        this.unRegister();
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, PersonalizationsmarteditContextService,
            smarteditcommons.CrossFrameEventService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController;
}());
var /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationsmarteditTemplates',
                'personalizationsmarteditServicesModule',
                'personalizationsmarteditCommonsModule',
                'smarteditServicesModule'
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule;
}());
angular.module(PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule.moduleName)
    .directive('personalizationsmarteditCombinedViewComponentLightUp', function () {
    return {
        templateUrl: 'personalizationsmarteditCombinedViewComponentLightUpDecoratorTemplate.html',
        restrict: 'C',
        transclude: true,
        replace: false,
        controller: PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController,
        controllerAs: 'ctrl',
        scope: {}
    };
});

var /* @ngInject */ PersonalizationsmarteditExternalComponentDecoratorModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditExternalComponentDecoratorModule() {
    }
    /* @ngInject */ PersonalizationsmarteditExternalComponentDecoratorModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationsmarteditTemplates'
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditExternalComponentDecoratorModule);
    return /* @ngInject */ PersonalizationsmarteditExternalComponentDecoratorModule;
}());
angular.module(PersonalizationsmarteditExternalComponentDecoratorModule.moduleName)
    .directive('personalizationsmarteditExternalComponentDecorator', function () {
    return {
        templateUrl: 'personalizationsmarteditExternalComponentDecoratorTemplate.html',
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

var /* @ngInject */ Personalizationsmartedit = /** @class */ (function () {
    function /* @ngInject */ Personalizationsmartedit() {
    }
    /* @ngInject */ Personalizationsmartedit = __decorate([
        smarteditcommons.SeModule({
            imports: [
                PersonalizationsmarteditShowActionListModule,
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule,
                PersonalizationsmarteditShowComponentInfoListModule,
                PersonalizationsmarteditCustomizeViewModule,
                PersonalizationsmarteditContextMenuModule,
                PersonalizationsmarteditSharedSlotDecoratorModule,
                PersonalizationsmarteditComponentLightUpDecoratorModule,
                PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule,
                PersonalizationsmarteditExternalComponentDecoratorModule,
                'personalizationsmarteditTemplates',
                'decoratorServiceModule',
                'smarteditServicesModule',
                'yjqueryModule',
                'externalComponentDecoratorModule',
                'externalComponentButtonModule'
            ],
            initialize: ["yjQuery", "domain", "$q", "personalizationsmarteditComponentHandlerService", "personalizationsmarteditContextualMenuService", "personalizationsmarteditContextServiceProxy", "personalizationsmarteditCustomizeViewServiceProxy", "personalizationsmarteditContextMenuServiceProxy", "decoratorService", "featureService", function (yjQuery, domain, $q, personalizationsmarteditComponentHandlerService, personalizationsmarteditContextualMenuService, personalizationsmarteditContextServiceProxy, // dont remove
            personalizationsmarteditCustomizeViewServiceProxy, // dont remove
            personalizationsmarteditContextMenuServiceProxy, decoratorService, featureService) {
                'ngInject';
                // const loadCSS = (href: string) => {
                // 	const cssLink = yjQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
                // 	yjQuery("head").append(cssLink);
                // };
                // loadCSS(domain + "/personalizationsmartedit/css/style.css");
                decoratorService.addMappings({
                    '^.*Slot$': ['personalizationsmarteditSharedSlot']
                });
                decoratorService.addMappings({
                    '^.*Component$': ['personalizationsmarteditComponentLightUp', 'personalizationsmarteditCombinedViewComponentLightUp']
                });
                decoratorService.addMappings({
                    '^((?!Slot).)*$': ['personalizationsmarteditExternalComponentDecorator']
                });
                featureService.addDecorator({
                    key: 'personalizationsmarteditExternalComponentDecorator',
                    nameI18nKey: 'personalizationsmarteditExternalComponentDecorator',
                    displayCondition: function (componentType, componentId) {
                        var component = personalizationsmarteditComponentHandlerService.getOriginalComponent(componentId, componentType);
                        var container = personalizationsmarteditComponentHandlerService.getParentContainerForComponent(component);
                        if (container.length > 0 && container[0].attributes["data-smartedit-personalization-action-id"]) {
                            return $q.when(false);
                        }
                        return $q.when(personalizationsmarteditComponentHandlerService.isExternalComponent(componentId, componentType));
                    }
                });
                featureService.addDecorator({
                    key: 'personalizationsmarteditComponentLightUp',
                    nameI18nKey: 'personalizationsmarteditComponentLightUp'
                });
                featureService.addDecorator({
                    key: 'personalizationsmarteditCombinedViewComponentLightUp',
                    nameI18nKey: 'personalizationsmarteditCombinedViewComponentLightUp'
                });
                featureService.addDecorator({
                    key: 'personalizationsmarteditSharedSlot',
                    nameI18nKey: 'personalizationsmarteditSharedSlot'
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.show.action.list",
                    i18nKey: 'personalization.context.action.list.show',
                    nameI18nKey: 'personalization.context.action.list.show',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuShowActionListEnabled(config);
                    },
                    action: {
                        template: '<personalizationsmartedit-show-action-list data-container-id="ctrl.componentAttributes.smarteditContainerId"></personalizationsmartedit-show-action-list>'
                    },
                    displayClass: "showactionlistbutton",
                    displayIconClass: "hyicon hyicon-combinedview cmsx-ctx__icon personalization-ctx__icon",
                    displaySmallIconClass: "hyicon hyicon-combinedview cmsx-ctx__icon--small",
                    permissions: ['se.read.page'],
                    priority: 500
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.info.action",
                    i18nKey: 'personalization.context.action.info',
                    nameI18nKey: 'personalization.context.action.info',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuInfoItemEnabled();
                    },
                    action: {
                        template: '<personalizationsmartedit-show-component-info-list data-container-id="ctrl.componentAttributes.smarteditContainerId"></personalizationsmartedit-show-component-info-list>'
                    },
                    displayClass: "infoactionbutton",
                    displayIconClass: "hyicon hyicon-msginfo cmsx-ctx__icon personalization-ctx__icon",
                    displaySmallIconClass: "hyicon hyicon-msginfo cmsx-ctx__icon--small",
                    permissions: ['se.edit.page'],
                    priority: 510
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.add.action",
                    i18nKey: 'personalization.context.action.add',
                    nameI18nKey: 'personalization.context.action.add',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuAddItemEnabled(config);
                    },
                    action: {
                        callback: function (config, $event) {
                            personalizationsmarteditContextualMenuService.openAddAction(config);
                        }
                    },
                    displayClass: "addactionbutton",
                    displayIconClass: "hyicon hyicon-addlg cmsx-ctx__icon personalization-ctx__icon",
                    displaySmallIconClass: "hyicon hyicon-addlg cmsx-ctx__icon--small",
                    permissions: ['se.edit.page'],
                    priority: 520
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.component.edit.action",
                    i18nKey: 'personalization.context.component.action.edit',
                    nameI18nKey: 'personalization.context.component.action.edit',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuEditComponentItemEnabled(config);
                    },
                    action: {
                        callback: function (config, $event) {
                            personalizationsmarteditContextualMenuService.openEditComponentAction(config);
                        }
                    },
                    displayClass: "editbutton",
                    displayIconClass: "sap-icon--edit cmsx-ctx__icon",
                    displaySmallIconClass: "sap-icon--edit cmsx-ctx__icon--small",
                    permissions: ['se.edit.page'],
                    priority: 530
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.edit.action",
                    i18nKey: 'personalization.context.action.edit',
                    nameI18nKey: 'personalization.context.action.edit',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuEditItemEnabled(config);
                    },
                    action: {
                        callback: function (config, $event) {
                            personalizationsmarteditContextualMenuService.openEditAction(config);
                        }
                    },
                    displayClass: "replaceactionbutton",
                    displayIconClass: "hyicon hyicon-change cmsx-ctx__icon personalization-ctx__icon",
                    displaySmallIconClass: "hyicon hyicon-change cmsx-ctx__icon--small",
                    permissions: ['se.edit.page'],
                    priority: 540
                });
                featureService.addContextualMenuButton({
                    key: "personalizationsmartedit.context.delete.action",
                    i18nKey: 'personalization.context.action.delete',
                    nameI18nKey: 'personalization.context.action.delete',
                    regexpKeys: ['^.*Component$'],
                    condition: function (config) {
                        return personalizationsmarteditContextualMenuService.isContextualMenuDeleteItemEnabled(config);
                    },
                    action: {
                        callback: function (config, $event) {
                            personalizationsmarteditContextualMenuService.openDeleteAction(config);
                        }
                    },
                    displayClass: "removeactionbutton",
                    displayIconClass: "hyicon hyicon-removelg cmsx-ctx__icon personalization-ctx__icon",
                    displaySmallIconClass: "hyicon hyicon-removelg cmsx-ctx__icon--small",
                    permissions: ['se.edit.page'],
                    priority: 550
                });
            }]
        })
    ], /* @ngInject */ Personalizationsmartedit);
    return /* @ngInject */ Personalizationsmartedit;
}());

var PersonalizationsmarteditModule = /** @class */ (function () {
    function PersonalizationsmarteditModule() {
    }
    PersonalizationsmarteditModule = __decorate([
        smarteditcommons.SeEntryModule('personalizationsmartedit'),
        core.NgModule({
            imports: [
                platformBrowser.BrowserModule,
                _static.UpgradeModule,
                personalizationcommons.PersonalizationsmarteditCommonsComponentsModule
            ],
            providers: [
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: personalizationcommons.BaseSiteHeaderInterceptor,
                    multi: true,
                    deps: [smarteditcommons.ISharedDataService]
                }
            ]
        })
    ], PersonalizationsmarteditModule);
    return PersonalizationsmarteditModule;
}());

exports.Personalizationsmartedit = Personalizationsmartedit;
exports.PersonalizationsmarteditModule = PersonalizationsmarteditModule;
