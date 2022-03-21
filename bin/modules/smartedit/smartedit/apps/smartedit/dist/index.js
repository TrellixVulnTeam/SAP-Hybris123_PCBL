'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@angular/core');
var http = require('@angular/common/http');
var platformBrowser = require('@angular/platform-browser');
var _static = require('@angular/upgrade/static');
var lodash = require('lodash');
var smarteditcommons = require('smarteditcommons');
var rxjs = require('rxjs');
var common = require('@angular/common');
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var angular = require('angular');
var operators = require('rxjs/operators');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('coretemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('coretemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "ContextualMenuItemComponent.html", 
        "<div *ngIf=\"mode === 'small'\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\" class=\"se-ctx-menu-element__btn {{itemConfig.displayIconClass}} {{itemConfig.displayClass}}\" [ngClass]=\"{'is-active': itemConfig.isOpen }\" [title]=\"itemConfig.i18nKey | translate\"></div><div *ngIf=\"mode === 'compact'\" class=\"se-ctx-menu-element__label {{itemConfig.displayClass}}\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\">{{itemConfig.i18nKey | translate}}</div>"
    );
     
    $templateCache.put(
        "ContextualMenuDecoratorComponent.html", 
        "<div class=\"se-ctx-menu-decorator-wrapper\" [ngClass]=\"{'se-ctx-menu-decorator__border--visible': showContextualMenuBorders()}\"><div class=\"se-ctx-menu__overlay\" *ngIf=\"showOverlay() || status.isopen\"><div class=\"se-ctx-menu__overlay__left-section\" *ngIf=\"getItems()\"><div *ngFor=\"let item of getItems().leftMenuItems; let $index = index\" id=\"{{ item.key }}\"><se-popup-overlay [popupOverlay]=\"itemTemplateOverlayWrapper\" [popupOverlayTrigger]=\"shouldShowTemplate(item)\" [popupOverlayData]=\"{ item: item }\" (popupOverlayOnShow)=\"onShowItemPopup(item)\" (popupOverlayOnHide)=\"onHideItemPopup(false)\"><se-contextual-menu-item [mode]=\"'small'\" [index]=\"$index\" [componentAttributes]=\"componentAttributes\" [slotAttributes]=\"slotAttributes\" [itemConfig]=\"item\" (click)=\"triggerMenuItemAction(item, $event)\" [attr.data-component-id]=\"smarteditComponentId\" [attr.data-component-uuid]=\"componentAttributes.smarteditComponentUuid\" [attr.data-component-type]=\"smarteditComponentType\" [attr.data-slot-id]=\"smarteditSlotId\" [attr.data-slot-uuid]=\"smarteditSlotUuid\" [attr.data-container-id]=\"smarteditContainerId\" [attr.data-container-type]=\"smarteditContainerType\"></se-contextual-menu-item></se-popup-overlay></div></div><se-popup-overlay [popupOverlay]=\"moreMenuPopupConfig\" [popupOverlayTrigger]=\"moreMenuIsOpen\" (popupOverlayOnShow)=\"onShowMoreMenuPopup()\" (popupOverlayOnHide)=\"onHideMoreMenuPopup()\"><div *ngIf=\"getItems() && getItems().moreMenuItems.length > 0\" class=\"se-ctx-menu-element__btn se-ctx-menu-element__btn--more\" [ngClass]=\"{'se-ctx-menu-element__btn--more--open': moreMenuIsOpen }\" (click)=\"toggleMoreMenu()\"><span [title]=\"moreButton.i18nKey | translate\" class=\"{{moreButton.displayClass}}\"></span></div></se-popup-overlay></div><div class=\"se-wrapper-data\"><div><ng-content></ng-content></div></div></div>"
    );
     
    $templateCache.put(
        "SlotContextualMenuDecoratorComponent.html", 
        "<div class=\"se-decorative-panel-wrapper\"><ng-container *ngIf=\"showOverlay() && !showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><div class=\"se-decoratorative-body-area\"><div class=\"se-decorative-body__padding--left\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-decorative-body__inner-border\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-wrapper-data\" [ngClass]=\"{ 'active': active }\"><ng-content></ng-content></div><div class=\"se-decorative-body__padding--right\" [ngClass]=\"{ 'active': active }\"></div></div><ng-container *ngIf=\"showOverlay() && showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><ng-template #decorativePanelArea><div class=\"se-decorative-panel-area\" [ngStyle]=\"showAtBottom && { 'margin-top': '0px' }\"><span class=\"se-decorative-panel__title\">{{smarteditComponentId}}</span><div class=\"se-decorative-panel__slot-contextual-menu\"><slot-contextual-menu-item [item]=\"item\" *ngFor=\"let item of items\"></slot-contextual-menu-item></div></div></ng-template></div>"
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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var /* @ngInject */ AnnouncementService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AnnouncementService, _super);
    function /* @ngInject */ AnnouncementService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ AnnouncementService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IAnnouncementService),
        smarteditcommons.GatewayProxied('showAnnouncement', 'closeAnnouncement')
    ], /* @ngInject */ AnnouncementService);
    return /* @ngInject */ AnnouncementService;
}(smarteditcommons.IAnnouncementService));

/** @internal */
var /* @ngInject */ CatalogService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ CatalogService, _super);
    function /* @ngInject */ CatalogService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ CatalogService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ICatalogService),
        smarteditcommons.GatewayProxied()
    ], /* @ngInject */ CatalogService);
    return /* @ngInject */ CatalogService;
}(smarteditcommons.ICatalogService));

/**
 * The ContextualMenuService is used to add contextual menu items for each component.
 *
 * To add items to the contextual menu, you must call the addItems method of the contextualMenuService and pass a map
 * of the component-type array of contextual menu items mapping. The component type names are the keys in the mapping.
 * The component name can be the full name of the component type, an ant-like wildcard (such as  *middle*Suffix), or a
 * valid regex that includes or excludes a set of component types.
 *
 */
var /* @ngInject */ ContextualMenuService = /** @class */ (function () {
    /* @internal */
    ContextualMenuService.$inject = ["priorityService", "systemEventService"];
    function /* @ngInject */ ContextualMenuService(priorityService, systemEventService) {
        this.priorityService = priorityService;
        this.systemEventService = systemEventService;
        this.onContextualMenuItemsAdded = new rxjs.BehaviorSubject(null);
        this._contextualMenus = {};
    }
    /**
     * The method called to add contextual menu items to component types in the SmartEdit application.
     * The contextual menu items are then retrieved by the contextual menu decorator to wire the set of menu items to the specified component.
     *
     * ### Example:
     *
     *
     *      contextualMenuService.addItems({
     *          '.*Component': [{
     *              key: 'itemKey',
     *              i18nKey: 'CONTEXTUAL_MENU',
     *              condition: function(componentType, componentId) {
     *                  return componentId === 'ComponentType';
     *              },
     *              callback: function(componentType, componentId) {
     *                  alert('callback for ' + componentType + "_" + componentId);
     *              },
     *              displayClass: 'democlass',
     *              iconIdle: '.../icons/icon.png',
     *              iconNonIdle: '.../icons/icon.png',
     *              }]
     *          });
     *
     *
     * @param  contextualMenuItemsMap A map of componentType regular expressions to list of IContextualMenuButton contextual menu items
     *
     * The object contains a list that maps component types to arrays of IContextualMenuButton contextual menu items. The mapping is a key-value pair.
     * The key is the name of the component type, for example, Simple Responsive Banner Component, and the value is an array of IContextualMenuButton contextual menu items, like add, edit, localize, etc.
     */
    /* @ngInject */ ContextualMenuService.prototype.addItems = function (contextualMenuItemsMap) {
        var _this = this;
        try {
            if (contextualMenuItemsMap !== undefined) {
                this._featuresList = this._getFeaturesList(this._contextualMenus);
                var componentTypes = Object.keys(contextualMenuItemsMap);
                componentTypes.forEach(function (type) {
                    return _this._initContextualMenuItems(contextualMenuItemsMap, type);
                });
            }
        }
        catch (e) {
            throw new Error('addItems() - Cannot add items. ' + e);
        }
    };
    ContextualMenuService.prototype.addItems.$inject = ["contextualMenuItemsMap"];
    /**
     * This method removes the menu items identified by the provided key.
     *
     * @param itemKey The key that identifies the menu items to remove.
     */
    /* @ngInject */ ContextualMenuService.prototype.removeItemByKey = function (itemKey) {
        var _this = this;
        Object.keys(this._contextualMenus).forEach(function (contextualMenuKey) {
            var contextualMenuItems = _this._contextualMenus[contextualMenuKey];
            _this._contextualMenus[contextualMenuKey] = contextualMenuItems.filter(function (item) { return item.key !== itemKey; });
            if (_this._contextualMenus[contextualMenuKey].length === 0) {
                // Remove if the contextual menu is empty.
                delete _this._contextualMenus[contextualMenuKey];
            }
        });
    };
    ContextualMenuService.prototype.removeItemByKey.$inject = ["itemKey"];
    /**
     * Verifies whether the itemKey has already been added to contextual menu list.
     *
     * @param itemKey The item key to verify.
     *
     * @returns Return true if itemKey exists in the contextual menu list, false otherwise.
     */
    /* @ngInject */ ContextualMenuService.prototype.containsItem = function (itemKey) {
        var _this = this;
        var contextualMenuExists = Object.keys(this._contextualMenus).map(function (contextualMenuKey) {
            var contextualMenuItems = _this._contextualMenus[contextualMenuKey];
            return (contextualMenuItems.findIndex(function (item) { return item.key === itemKey; }) > -1);
        });
        return contextualMenuExists.findIndex(function (menuExists) { return menuExists === true; }) > -1;
    };
    ContextualMenuService.prototype.containsItem.$inject = ["itemKey"];
    /**
     * Will return an array of contextual menu items for a specific component type.
     * For each key in the contextual menus' object, the method converts each component type into a valid regex using the regExpFactory of the function module and then compares it with the input componentType and, if matched, will add it to an array and returns the array.
     *
     * @param componentType The type code of the selected component
     *
     * @returns An array of contextual menu items assigned to the type.
     *
     */
    /* @ngInject */ ContextualMenuService.prototype.getContextualMenuByType = function (componentType) {
        var _this = this;
        var contextualMenuArray = [];
        if (this._contextualMenus) {
            Object.keys(this._contextualMenus).forEach(function (regexpKey) {
                if (smarteditcommons.stringUtils.regExpFactory(regexpKey).test(componentType)) {
                    contextualMenuArray = _this._getUniqueItemArray(contextualMenuArray, _this._contextualMenus[regexpKey]);
                }
            });
        }
        return contextualMenuArray;
    };
    ContextualMenuService.prototype.getContextualMenuByType.$inject = ["componentType"];
    /**
     * Returns an object that contains a list of contextual menu items that are displayed in the menu and menu items that are added to the More … options.
     *
     * The returned object contains two arrays. The first array contains the menu items that are displayed in the menu. The display limit size (iLeftBtns) specifies
     * the maximum number of items that can be displayed in the menu. The other array contains the menu items that are available under the More... options.
     * This method decides which items to send to each array based on their priority. Items with the lowest priority are displayed in the menu. The remaining
     * items are added to the More... menu. Items that do not have a priority are automatically assigned a default priority.
     *
     * @param configuration
     * @returns A promise that resolves to an array of contextual menu items assigned to the component type.
     *
     * The returned object contains the following properties
     * - leftMenuItems : An array of menu items that can be displayed on the component.
     * - moreMenuItems : An array of menu items that are available under the more menu items action.
     *
     */
    /* @ngInject */ ContextualMenuService.prototype.getContextualMenuItems = function (configuration) {
        var _this = this;
        var iLeftBtns = configuration.iLeftBtns;
        delete configuration.iLeftBtns;
        var menuItems = this.getContextualMenuByType(configuration.componentType);
        var promises = menuItems.map(function (item) {
            if (!item.condition) {
                return Promise.resolve(item);
            }
            var isItemEnabled = item.condition(configuration);
            return isItemEnabled instanceof Promise
                ? isItemEnabled.then(function (_isItemEnabled) { return (_isItemEnabled ? item : null); })
                : Promise.resolve(isItemEnabled ? item : null);
        });
        return Promise.all(promises).then(function (items) {
            var leftMenuItems = [];
            var moreMenuItems = [];
            _this.priorityService
                .sort(items.filter(function (menuItem) { return menuItem !== null; }))
                .forEach(function (menuItem) {
                var collection = leftMenuItems.length < iLeftBtns ? leftMenuItems : moreMenuItems;
                collection.push(menuItem);
            });
            return {
                leftMenuItems: leftMenuItems,
                moreMenuItems: moreMenuItems
            };
        });
    };
    ContextualMenuService.prototype.getContextualMenuItems.$inject = ["configuration"];
    /**
     * This method can be used to ask SmartEdit to retrieve again the list of items in the enabled contextual menus.
     */
    /* @ngInject */ ContextualMenuService.prototype.refreshMenuItems = function () {
        this.systemEventService.publishAsync(smarteditcommons.REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT);
    };
    // Helper Methods
    /* @ngInject */ ContextualMenuService.prototype._getFeaturesList = function (_contextualMenus) {
        // Would be better to use a set for this, but it's not currently supported by all browsers.
        var featuresList = Object.keys(_contextualMenus).reduce(function (acc, key) { return __spreadArrays(acc, _contextualMenus[key].map(function (entry) { return entry.key; })); }, []);
        return featuresList.reduce(function (acc, current) {
            return acc.indexOf(current) < 0 ? __spreadArrays(acc, [current]) : __spreadArrays(acc);
        }, []);
    };
    ContextualMenuService.prototype._getFeaturesList.$inject = ["_contextualMenus"];
    /* @ngInject */ ContextualMenuService.prototype._validateItem = function (item) {
        if (!item.action) {
            throw new Error('Contextual menu item must provide an action: ' + JSON.stringify(item));
        }
        // FIXME: missing case for callbacks
        if ((!!item.action.callback && !!item.action.template) ||
            (!!item.action.callback && !!item.action.templateUrl) ||
            (!!item.action.template && !!item.action.templateUrl)) {
            throw new Error('Contextual menu item must have exactly ONE of action callback|callbacks|template|templateUrl');
        }
    };
    ContextualMenuService.prototype._validateItem.$inject = ["item"];
    /* @ngInject */ ContextualMenuService.prototype._getUniqueItemArray = function (array1, array2) {
        var currItem;
        array2.forEach(function (item) {
            currItem = item;
            if (array1.every(function (it) { return currItem.key !== it.key; })) {
                array1.push(currItem);
            }
        });
        return array1;
    };
    ContextualMenuService.prototype._getUniqueItemArray.$inject = ["array1", "array2"];
    /* @ngInject */ ContextualMenuService.prototype._initContextualMenuItems = function (map, componentType) {
        var _this = this;
        var componentTypeContextualMenus = map[componentType].filter(function (item) {
            _this._validateItem(item);
            if (!item.key) {
                throw new Error("Item doesn't have key.");
            }
            if (_this._featuresList.indexOf(item.key) !== -1) {
                throw new Error("Item with that key (" + item.key + ") already exist.");
            }
            return true;
        });
        this._contextualMenus[componentType] = smarteditcommons.objectUtils.uniqueArray(this._contextualMenus[componentType] || [], componentTypeContextualMenus);
        this.onContextualMenuItemsAdded.next(componentType);
    };
    ContextualMenuService.prototype._initContextualMenuItems.$inject = ["map", "componentType"];
    /* @ngInject */ ContextualMenuService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IContextualMenuService),
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.PriorityService,
            smarteditcommons.SystemEventService])
    ], /* @ngInject */ ContextualMenuService);
    return /* @ngInject */ ContextualMenuService;
}());

/*
 * internal service to proxy calls from inner RESTService to the outer restServiceFactory and the 'real' IRestService
 */
/** @internal */
var /* @ngInject */ DelegateRestService = /** @class */ (function () {
    function /* @ngInject */ DelegateRestService() {
    }
    /* @ngInject */ DelegateRestService.prototype.delegateForSingleInstance = function (methodName, params, uri, identifier, metadataActivated, options) {
        'proxyFunction';
        return null;
    };
    DelegateRestService.prototype.delegateForSingleInstance.$inject = ["methodName", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForArray = function (methodName, params, uri, identifier, metadataActivated, options) {
        'proxyFunction';
        return null;
    };
    DelegateRestService.prototype.delegateForArray.$inject = ["methodName", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForPage = function (pageable, uri, identifier, metadataActivated, options) {
        'proxyFunction';
        return null;
    };
    DelegateRestService.prototype.delegateForPage.$inject = ["pageable", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForQueryByPost = function (payload, params, uri, identifier, metadataActivated, options) {
        'proxyFunction';
        return null;
    };
    DelegateRestService.prototype.delegateForQueryByPost.$inject = ["payload", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService = __decorate([
        smarteditcommons.GatewayProxied(),
        core.Injectable()
    ], /* @ngInject */ DelegateRestService);
    return /* @ngInject */ DelegateRestService;
}());

/** @internal */
var /* @ngInject */ ExperienceService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ExperienceService, _super);
    ExperienceService.$inject = ["routingService", "logService", "previewService"];
    function /* @ngInject */ ExperienceService(routingService, logService, previewService) {
        var _this = _super.call(this) || this;
        _this.routingService = routingService;
        _this.logService = logService;
        _this.previewService = previewService;
        return _this;
    }
    /* @ngInject */ ExperienceService.prototype.buildRefreshedPreviewUrl = function () {
        var _this = this;
        return this.getCurrentExperience().then(function (experience) {
            if (!experience) {
                throw new Error('ExperienceService.buildRefreshedPreviewUrl() - Invalid experience from ExperienceService.getCurrentExperience()');
            }
            var promise = _this.previewService.getResourcePathFromPreviewUrl(experience.siteDescriptor.previewUrl);
            return promise.then(function (resourcePath) {
                var previewData = _this._convertExperienceToPreviewData(experience, resourcePath);
                return _this.previewService.updateUrlWithNewPreviewTicketId(_this.routingService.absUrl(), previewData);
            }, function (err) {
                _this.logService.error('ExperienceService.buildRefreshedPreviewUrl() - failed to retrieve resource path');
                return Promise.reject(err);
            });
        }, function (err) {
            _this.logService.error('ExperienceService.buildRefreshedPreviewUrl() - failed to retrieve current experience');
            return Promise.reject(err);
        });
    };
    /* @ngInject */ ExperienceService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IExperienceService),
        smarteditcommons.GatewayProxied('loadExperience', 'updateExperiencePageContext', 'getCurrentExperience', 'setCurrentExperience', 'hasCatalogVersionChanged', 'buildRefreshedPreviewUrl', 'compareWithCurrentExperience'),
        __metadata("design:paramtypes", [smarteditcommons.SmarteditRoutingService,
            smarteditcommons.LogService,
            smarteditcommons.IPreviewService])
    ], /* @ngInject */ ExperienceService);
    return /* @ngInject */ ExperienceService;
}(smarteditcommons.IExperienceService));

/** @internal */
var /* @ngInject */ FeatureService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ FeatureService, _super);
    FeatureService.$inject = ["logService", "decoratorService", "cloneableUtils", "contextualMenuService"];
    function /* @ngInject */ FeatureService(logService, decoratorService, cloneableUtils, contextualMenuService) {
        var _this = _super.call(this, cloneableUtils) || this;
        _this.logService = logService;
        _this.decoratorService = decoratorService;
        _this.contextualMenuService = contextualMenuService;
        return _this;
    }
    /* @ngInject */ FeatureService.prototype.addDecorator = function (configuration) {
        var prevEnablingCallback = configuration.enablingCallback;
        var prevDisablingCallback = configuration.disablingCallback;
        var displayCondition = configuration.displayCondition;
        configuration.enablingCallback = function () {
            this.enable(configuration.key, displayCondition);
            if (prevEnablingCallback) {
                prevEnablingCallback();
            }
        }.bind(this.decoratorService);
        configuration.disablingCallback = function () {
            this.disable(configuration.key);
            if (prevDisablingCallback) {
                prevDisablingCallback();
            }
        }.bind(this.decoratorService);
        delete configuration.displayCondition;
        return this.register(configuration);
    };
    FeatureService.prototype.addDecorator.$inject = ["configuration"];
    /* @ngInject */ FeatureService.prototype.addContextualMenuButton = function (item) {
        var clone = __assign({}, item);
        delete item.nameI18nKey;
        delete item.descriptionI18nKey;
        delete item.regexpKeys;
        clone.enablingCallback = function () {
            var mapping = {};
            clone.regexpKeys.forEach(function (regexpKey) {
                mapping[regexpKey] = [item];
            });
            if (!this.containsItem(clone.key)) {
                this.addItems(mapping);
            }
        }.bind(this.contextualMenuService);
        clone.disablingCallback = function () {
            this.removeItemByKey(clone.key);
        }.bind(this.contextualMenuService);
        return this.register(clone);
    };
    FeatureService.prototype.addContextualMenuButton.$inject = ["item"];
    /* @ngInject */ FeatureService.prototype._remoteEnablingFromInner = function (key) {
        if (this._featuresToAlias && this._featuresToAlias[key]) {
            this._featuresToAlias[key].enablingCallback();
        }
        else {
            this.logService.warn('could not enable feature named ' + key + ', it was not found in the iframe');
        }
        return Promise.resolve();
    };
    FeatureService.prototype._remoteEnablingFromInner.$inject = ["key"];
    /* @ngInject */ FeatureService.prototype._remoteDisablingFromInner = function (key) {
        if (this._featuresToAlias && this._featuresToAlias[key]) {
            this._featuresToAlias[key].disablingCallback();
        }
        else {
            this.logService.warn('could not disable feature named ' + key + ', it was not found in the iframe');
        }
        return Promise.resolve();
    };
    FeatureService.prototype._remoteDisablingFromInner.$inject = ["key"];
    /* @ngInject */ FeatureService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IFeatureService),
        smarteditcommons.GatewayProxied('_registerAliases', 'addToolbarItem', 'register', 'enable', 'disable', '_remoteEnablingFromInner', '_remoteDisablingFromInner', 'addDecorator', 'getFeatureProperty', 'addContextualMenuButton'),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.IDecoratorService,
            smarteditcommons.CloneableUtils,
            smarteditcommons.IContextualMenuService])
    ], /* @ngInject */ FeatureService);
    return /* @ngInject */ FeatureService;
}(smarteditcommons.IFeatureService));

/**
 * The notification service is used to display visual cues to inform the user of the state of the application.
 */
/** @internal */
var /* @ngInject */ NotificationService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ NotificationService, _super);
    function /* @ngInject */ NotificationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ NotificationService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.INotificationService),
        smarteditcommons.GatewayProxied('pushNotification', 'removeNotification', 'removeAllNotifications')
    ], /* @ngInject */ NotificationService);
    return /* @ngInject */ NotificationService;
}(smarteditcommons.INotificationService));

/**
 * This service makes it possible to track the mouse position to detect when it leaves the notification panel.
 * It is solely meant to be used with the notificationService.
 */
/** @internal */
var /* @ngInject */ NotificationMouseLeaveDetectionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ NotificationMouseLeaveDetectionService, _super);
    NotificationMouseLeaveDetectionService.$inject = ["document"];
    function /* @ngInject */ NotificationMouseLeaveDetectionService(document) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.notificationPanelBounds = null;
        _this.mouseLeaveCallback = null;
        /*
         * We need to bind the function in order for it to execute within the service's
         * scope and store it to be able to un-register the listener.
         */
        _this._onMouseMove = _this._onMouseMove.bind(_this);
        return _this;
    }
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._remoteStartDetection = function (innerBounds) {
        this.notificationPanelBounds = innerBounds;
        this.document.addEventListener('mousemove', this._onMouseMove);
        return Promise.resolve();
    };
    NotificationMouseLeaveDetectionService.prototype._remoteStartDetection.$inject = ["innerBounds"];
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._remoteStopDetection = function () {
        this.document.removeEventListener('mousemove', this._onMouseMove);
        this.notificationPanelBounds = null;
        return Promise.resolve();
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._getBounds = function () {
        return Promise.resolve(this.notificationPanelBounds);
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._getCallback = function () {
        return Promise.resolve(this.mouseLeaveCallback);
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.INotificationMouseLeaveDetectionService),
        smarteditcommons.GatewayProxied('stopDetection', '_remoteStartDetection', '_remoteStopDetection', '_callCallback'),
        core.Injectable(),
        __param(0, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [Document])
    ], /* @ngInject */ NotificationMouseLeaveDetectionService);
    return /* @ngInject */ NotificationMouseLeaveDetectionService;
}(smarteditcommons.INotificationMouseLeaveDetectionService));

/** @internal */
var /* @ngInject */ DragAndDropCrossOrigin = /** @class */ (function (_super) {
    __extends(/* @ngInject */ DragAndDropCrossOrigin, _super);
    DragAndDropCrossOrigin.$inject = ["document", "yjQuery", "crossFrameEventService", "inViewElementObserver", "dragAndDropScrollingService", "polyfillService"];
    function /* @ngInject */ DragAndDropCrossOrigin(document, yjQuery, crossFrameEventService, inViewElementObserver, dragAndDropScrollingService, polyfillService) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.yjQuery = yjQuery;
        _this.crossFrameEventService = crossFrameEventService;
        _this.inViewElementObserver = inViewElementObserver;
        _this.dragAndDropScrollingService = dragAndDropScrollingService;
        _this.polyfillService = polyfillService;
        _this.onDnDCrossOriginStart = function (eventId) {
            _this.dragAndDropScrollingService.toggleThrottling(_this.polyfillService.isEligibleForThrottledScrolling());
        };
        _this.onTrackMouseInner = function (eventId, eventData) {
            if (_this.isSearchingElement) {
                return;
            }
            _this.isSearchingElement = true;
            /**
             * Get the element from mouse position.
             * In IE11, document.elementFromPoint returns null because of the #ySmartEditFrameDragArea positioned over the iframe and has pointer-events (necessary to listen on 'dragover' to track the mouse position).
             * To polyfill document.elementFromPoint in IE11 in this scenario, we call isPointOverElement() on each elligible droppable element.
             *
             * Note: in IE11, a switch of pointer-events value to none for the #ySmartEditFrameDragArea will return a value when calling $document.elementFromPoint, BUT it is causing cursor flickering and too much latency. The 'isPointOverElement' approach give better results.
             */
            _this.currentElementHovered = _this.yjQuery(_this.inViewElementObserver.elementFromPoint(eventData));
            var mousePositionInPage = _this.getMousePositionInPage(eventData);
            if (_this.lastElementHovered && _this.lastElementHovered.length) {
                if ((_this.currentElementHovered.length &&
                    _this.lastElementHovered[0] !== _this.currentElementHovered[0]) ||
                    !_this.currentElementHovered.length) {
                    _this.dispatchDragEvent(_this.lastElementHovered[0], smarteditcommons.IDragEventType.DRAG_LEAVE, mousePositionInPage);
                    _this.lastElementHovered.data(smarteditcommons.SMARTEDIT_ELEMENT_HOVERED, false);
                }
            }
            if (_this.currentElementHovered.length) {
                if (!_this.currentElementHovered.data(smarteditcommons.SMARTEDIT_ELEMENT_HOVERED)) {
                    _this.dispatchDragEvent(_this.currentElementHovered[0], smarteditcommons.IDragEventType.DRAG_ENTER, mousePositionInPage);
                    _this.currentElementHovered.data(smarteditcommons.SMARTEDIT_ELEMENT_HOVERED, true);
                }
                _this.dispatchDragEvent(_this.currentElementHovered[0], smarteditcommons.IDragEventType.DRAG_OVER, mousePositionInPage);
            }
            _this.lastElementHovered = _this.currentElementHovered;
            _this.isSearchingElement = false;
        };
        _this.onDropElementInner = function (eventId, mousePosition) {
            if (_this.currentElementHovered.length) {
                _this.currentElementHovered.data(smarteditcommons.SMARTEDIT_ELEMENT_HOVERED, false);
                _this.dispatchDragEvent(_this.currentElementHovered[0], smarteditcommons.IDragEventType.DROP, mousePosition);
                _this.dispatchDragEvent(_this.currentElementHovered[0], smarteditcommons.IDragEventType.DRAG_LEAVE, mousePosition);
            }
        };
        return _this;
    }
    /* @ngInject */ DragAndDropCrossOrigin.prototype.initialize = function () {
        this.crossFrameEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.TRACK_MOUSE_POSITION, this.onTrackMouseInner.bind(this));
        this.crossFrameEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DROP_ELEMENT, this.onDropElementInner.bind(this));
        this.crossFrameEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_CROSS_ORIGIN_START, this.onDnDCrossOriginStart.bind(this));
    };
    /* @ngInject */ DragAndDropCrossOrigin.prototype.dispatchDragEvent = function (element, type, mousePosition) {
        var evt = this.document.createEvent('CustomEvent');
        evt.initCustomEvent(type, true, true, null);
        evt.dataTransfer = {
            data: {},
            // eslint-disable-next-line @typescript-eslint/ban-types
            setData: function (_type, val) {
                this.data[_type] = val;
            },
            getData: function (_type) {
                return this.data[_type];
            }
        };
        evt.pageX = mousePosition.x;
        evt.pageY = mousePosition.y;
        element.dispatchEvent(evt);
    };
    DragAndDropCrossOrigin.prototype.dispatchDragEvent.$inject = ["element", "type", "mousePosition"];
    /* @ngInject */ DragAndDropCrossOrigin.prototype.getMousePositionInPage = function (mousePosition) {
        var scrollingElement = this.yjQuery(this.document.scrollingElement || this.document.documentElement);
        return {
            x: mousePosition.x + scrollingElement.scrollLeft(),
            y: mousePosition.y + scrollingElement.scrollTop()
        };
    };
    DragAndDropCrossOrigin.prototype.getMousePositionInPage.$inject = ["mousePosition"];
    /* @ngInject */ DragAndDropCrossOrigin = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IDragAndDropCrossOrigin),
        __param(0, core.Inject(common.DOCUMENT)),
        __param(1, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Document, Function, smarteditcommons.CrossFrameEventService,
            smarteditcommons.InViewElementObserver,
            smarteditcommons.DragAndDropScrollingService,
            smarteditcommons.PolyfillService])
    ], /* @ngInject */ DragAndDropCrossOrigin);
    return /* @ngInject */ DragAndDropCrossOrigin;
}(smarteditcommons.IDragAndDropCrossOrigin));

/** @internal */
var /* @ngInject */ PageInfoService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PageInfoService, _super);
    /* @internal */
    PageInfoService.$inject = ["yjQuery", "logService"];
    function /* @ngInject */ PageInfoService(yjQuery, logService) {
        var _this = _super.call(this) || this;
        _this.yjQuery = yjQuery;
        _this.logService = logService;
        return _this;
    }
    /* @ngInject */ PageInfoService_1 = /* @ngInject */ PageInfoService;
    /**
     * When the time comes to deprecate these 3 functions from componentHandlerService in the inner app, we will need
     * to migrate their implementations to here.
     */
    /* @ngInject */ PageInfoService.prototype.getPageUID = function () {
        var _this = this;
        return this.try(function () {
            return _this.getBodyClassAttributeByRegEx(/* @ngInject */ PageInfoService_1.PATTERN_SMARTEDIT_PAGE_UID);
        });
    };
    /* @ngInject */ PageInfoService.prototype.getPageUUID = function () {
        var _this = this;
        return this.try(function () {
            return _this.getBodyClassAttributeByRegEx(/* @ngInject */ PageInfoService_1.PATTERN_SMARTEDIT_PAGE_UUID);
        });
    };
    /* @ngInject */ PageInfoService.prototype.getCatalogVersionUUIDFromPage = function () {
        var _this = this;
        return this.try(function () {
            return _this.getBodyClassAttributeByRegEx(/* @ngInject */ PageInfoService_1.PATTERN_SMARTEDIT_CATALOG_VERSION_UUID);
        });
    };
    /**
     * @param pattern Pattern of class names to search for
     *
     * @returns  Class attributes from the body element of the storefront
     */
    /* @ngInject */ PageInfoService.prototype.getBodyClassAttributeByRegEx = function (pattern) {
        try {
            var bodyClass = this.yjQuery('body').attr('class');
            return pattern.exec(bodyClass)[1];
        }
        catch (_a) {
            throw {
                name: 'InvalidStorefrontPageError',
                message: 'Error: the page is not a valid storefront page.'
            };
        }
    };
    PageInfoService.prototype.getBodyClassAttributeByRegEx.$inject = ["pattern"];
    /** @internal */
    /* @ngInject */ PageInfoService.prototype.try = function (func) {
        try {
            return Promise.resolve(func());
        }
        catch (e) {
            this.logService.warn('Missing SmartEdit attributes on body element of the storefront - SmartEdit will resume once the attributes are added');
            return Promise.reject(e);
        }
    };
    PageInfoService.prototype.try.$inject = ["func"];
    var /* @ngInject */ PageInfoService_1;
    /* @ngInject */ PageInfoService.PATTERN_SMARTEDIT_CATALOG_VERSION_UUID = /smartedit-catalog-version-uuid\-(\S+)/;
    /* @ngInject */ PageInfoService.PATTERN_SMARTEDIT_PAGE_UID = /smartedit-page-uid\-(\S+)/;
    /* @ngInject */ PageInfoService.PATTERN_SMARTEDIT_PAGE_UUID = /smartedit-page-uuid\-(\S+)/;
    /* @ngInject */ PageInfoService = /* @ngInject */ PageInfoService_1 = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPageInfoService),
        smarteditcommons.GatewayProxied('getPageUID', 'getPageUUID', 'getCatalogVersionUUIDFromPage'),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function, smarteditcommons.LogService])
    ], /* @ngInject */ PageInfoService);
    return /* @ngInject */ PageInfoService;
}(smarteditcommons.IPageInfoService));

/** @internal */
var /* @ngInject */ PerspectiveService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PerspectiveService, _super);
    function /* @ngInject */ PerspectiveService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ PerspectiveService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPerspectiveService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ PerspectiveService);
    return /* @ngInject */ PerspectiveService;
}(smarteditcommons.IPerspectiveService));

/** @internal */
var /* @ngInject */ PreviewService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PreviewService, _super);
    PreviewService.$inject = ["urlUtils"];
    function /* @ngInject */ PreviewService(urlUtils) {
        return _super.call(this, urlUtils) || this;
    }
    /* @ngInject */ PreviewService = __decorate([
        smarteditcommons.GatewayProxied(),
        smarteditcommons.SeDowngradeService(smarteditcommons.IPreviewService),
        __metadata("design:paramtypes", [smarteditcommons.UrlUtils])
    ], /* @ngInject */ PreviewService);
    return /* @ngInject */ PreviewService;
}(smarteditcommons.IPreviewService));

/** @internal */
var RestService = /** @class */ (function () {
    function RestService(delegateRestService, uri, identifier) {
        this.delegateRestService = delegateRestService;
        this.uri = uri;
        this.identifier = identifier;
        this.metadataActivated = false;
    }
    RestService.prototype.getById = function (id, options) {
        return this.delegateRestService.delegateForSingleInstance('getById', id, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.get = function (searchParams, options) {
        return this.delegateRestService.delegateForSingleInstance('get', searchParams, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.update = function (payload, options) {
        return this.delegateRestService.delegateForSingleInstance('update', payload, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.patch = function (payload, options) {
        return this.delegateRestService.delegateForSingleInstance('patch', payload, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.save = function (payload, options) {
        return this.delegateRestService.delegateForSingleInstance('save', payload, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.query = function (searchParams, options) {
        return this.delegateRestService.delegateForArray('query', searchParams, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.page = function (pageable, options) {
        return this.delegateRestService.delegateForPage(pageable, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.remove = function (payload, options) {
        return this.delegateRestService.delegateForSingleInstance('remove', payload, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.queryByPost = function (payload, searchParams, options) {
        return this.delegateRestService.delegateForQueryByPost(payload, searchParams, this.uri, this.identifier, this.metadataActivated, options);
    };
    RestService.prototype.activateMetadata = function () {
        // will activate response headers appending
        this.metadataActivated = true;
    };
    return RestService;
}());

/** @internal */
var /* @ngInject */ RestServiceFactory = /** @class */ (function () {
    RestServiceFactory.$inject = ["delegateRestService"];
    function /* @ngInject */ RestServiceFactory(delegateRestService) {
        this.delegateRestService = delegateRestService;
    }
    /* @ngInject */ RestServiceFactory.prototype.get = function (uri, identifier) {
        return new RestService(this.delegateRestService, uri, identifier);
    };
    RestServiceFactory.prototype.get.$inject = ["uri", "identifier"];
    /* @ngInject */ RestServiceFactory = __decorate([
        smarteditcommons.SeDowngradeService(),
        core.Injectable(),
        __metadata("design:paramtypes", [DelegateRestService])
    ], /* @ngInject */ RestServiceFactory);
    return /* @ngInject */ RestServiceFactory;
}());

/** @internal */
var /* @ngInject */ SessionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SessionService, _super);
    function /* @ngInject */ SessionService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ SessionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ISessionService),
        smarteditcommons.GatewayProxied(),
        core.Injectable(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ SessionService);
    return /* @ngInject */ SessionService;
}(smarteditcommons.ISessionService));

/** @internal */
var /* @ngInject */ SharedDataService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SharedDataService, _super);
    function /* @ngInject */ SharedDataService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ SharedDataService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ISharedDataService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ SharedDataService);
    return /* @ngInject */ SharedDataService;
}(smarteditcommons.ISharedDataService));

/** @internal */
var /* @ngInject */ StorageService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ StorageService, _super);
    function /* @ngInject */ StorageService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ StorageService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ StorageService);
    return /* @ngInject */ StorageService;
}(smarteditcommons.IStorageService));

/** @internal */
var /* @ngInject */ UrlService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ UrlService, _super);
    function /* @ngInject */ UrlService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ UrlService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IUrlService),
        smarteditcommons.GatewayProxied('openUrlInPopup', 'path'),
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ UrlService);
    return /* @ngInject */ UrlService;
}(smarteditcommons.IUrlService));

/** @internal */
var /* @ngInject */ WaitDialogService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ WaitDialogService, _super);
    function /* @ngInject */ WaitDialogService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ WaitDialogService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IWaitDialogService),
        smarteditcommons.GatewayProxied()
    ], /* @ngInject */ WaitDialogService);
    return /* @ngInject */ WaitDialogService;
}(smarteditcommons.IWaitDialogService));

/* @internal */
var /* @ngInject */ SeNamespaceService = /** @class */ (function () {
    SeNamespaceService.$inject = ["logService"];
    function /* @ngInject */ SeNamespaceService(logService) {
        this.logService = logService;
        this.reprocessPage = lodash.debounce(this._reprocessPage.bind(this), 50);
    }
    // explain slot for multiple instances of component scenario
    /* @ngInject */ SeNamespaceService.prototype.renderComponent = function (componentId, componentType, parentId) {
        return this.namespace && typeof this.namespace.renderComponent === 'function'
            ? this.namespace.renderComponent(componentId, componentType, parentId)
            : false;
    };
    SeNamespaceService.prototype.renderComponent.$inject = ["componentId", "componentType", "parentId"];
    /* @ngInject */ SeNamespaceService.prototype._reprocessPage = function () {
        if (this.namespace && typeof this.namespace.reprocessPage === 'function') {
            this.namespace.reprocessPage();
            return;
        }
        this.logService.warn('No reprocessPage function defined on smartediFt namespace');
    };
    Object.defineProperty(/* @ngInject */ SeNamespaceService.prototype, "namespace", {
        get: function () {
            window.smartedit = window.smartedit || {};
            return window.smartedit;
        },
        enumerable: false,
        configurable: true
    });
    /* @ngInject */ SeNamespaceService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.LogService])
    ], /* @ngInject */ SeNamespaceService);
    return /* @ngInject */ SeNamespaceService;
}());

var /* @ngInject */ PermissionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PermissionService, _super);
    PermissionService.$inject = ["logService"];
    function /* @ngInject */ PermissionService(logService) {
        var _this = _super.call(this) || this;
        _this.logService = logService;
        return _this;
    }
    /* @ngInject */ PermissionService.prototype._remoteCallRuleVerify = function (ruleKey, permissionNameObjs) {
        if (this.ruleVerifyFunctions && this.ruleVerifyFunctions[ruleKey]) {
            return this.ruleVerifyFunctions[ruleKey].verify(permissionNameObjs);
        }
        this.logService.warn('could not call rule verify function for rule key: ' +
            ruleKey +
            ', it was not found in the iframe');
        return null;
    };
    PermissionService.prototype._remoteCallRuleVerify.$inject = ["ruleKey", "permissionNameObjs"];
    /* @ngInject */ PermissionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPermissionService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [smarteditcommons.LogService])
    ], /* @ngInject */ PermissionService);
    return /* @ngInject */ PermissionService;
}(smarteditcommons.IPermissionService));

/** @internal */
var /* @ngInject */ AlertService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AlertService, _super);
    function /* @ngInject */ AlertService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ AlertService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IAlertService),
        smarteditcommons.GatewayProxied(),
        core.Injectable()
    ], /* @ngInject */ AlertService);
    return /* @ngInject */ AlertService;
}(smarteditcommons.IAlertService));

var /* @ngInject */ AuthenticationService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AuthenticationService, _super);
    function /* @ngInject */ AuthenticationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ AuthenticationService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IAuthenticationService),
        smarteditcommons.GatewayProxied()
    ], /* @ngInject */ AuthenticationService);
    return /* @ngInject */ AuthenticationService;
}(smarteditcommons.IAuthenticationService));

/**
 * This service enables and disables decorators. It also maps decorators to SmartEdit component types–regardless if they are enabled or disabled.
 *
 */
var /* @ngInject */ DecoratorService = /** @class */ (function () {
    DecoratorService.$inject = ["promiseUtils", "stringUtils", "legacyDecoratorToCustomElementConverter"];
    function /* @ngInject */ DecoratorService(promiseUtils, stringUtils, legacyDecoratorToCustomElementConverter) {
        this.promiseUtils = promiseUtils;
        this.stringUtils = stringUtils;
        this.legacyDecoratorToCustomElementConverter = legacyDecoratorToCustomElementConverter;
        this._activeDecorators = {};
        this.componentDecoratorsMap = {};
    }
    /**
     * This method enables a list of decorators for a group of component types.
     * The list to be [enable]{@link DecoratorService#enable} is identified by a matching pattern.
     * The list is enabled when a perspective or referenced perspective that it is bound to is activated/enabled.
     *
     *
     *
     *      decoratorService.addMappings({
     *          '*Suffix': ['decorator1', 'decorator2'],
     *          '.*Suffix': ['decorator2', 'decorator3'],
     *          'MyExactType': ['decorator3', 'decorator4'],
     *          '^((?!Middle).)*$': ['decorator4', 'decorator5']
     *      });
     *
     *
     * @param  map A key-map value; the key is the matching pattern and the value is an array of decorator keys. The key can be an exact type, an ant-like wild card, or a full regular expression:
     */
    /* @ngInject */ DecoratorService.prototype.addMappings = function (map) {
        for (var regexpKey in map) {
            if (map.hasOwnProperty(regexpKey)) {
                var decoratorsArray = map[regexpKey];
                this.legacyDecoratorToCustomElementConverter.convertIfNeeded(decoratorsArray);
                this.componentDecoratorsMap[regexpKey] = lodash.union(this.componentDecoratorsMap[regexpKey] || [], decoratorsArray);
            }
        }
    };
    DecoratorService.prototype.addMappings.$inject = ["map"];
    /**
     * Enables a decorator
     *
     * @param decoratorKey The key that uniquely identifies the decorator.
     * @param displayCondition Returns a promise that will resolve to a boolean that determines whether the decorator will be displayed.
     */
    /* @ngInject */ DecoratorService.prototype.enable = function (decoratorKey, displayCondition) {
        if (!(decoratorKey in this._activeDecorators)) {
            this._activeDecorators[decoratorKey] = {
                displayCondition: displayCondition
            };
        }
    };
    DecoratorService.prototype.enable.$inject = ["decoratorKey", "displayCondition"];
    /**
     * Disables a decorator
     *
     * @param decoratorKey the decorator key
     */
    /* @ngInject */ DecoratorService.prototype.disable = function (decoratorKey) {
        if (this._activeDecorators[decoratorKey]) {
            delete this._activeDecorators[decoratorKey];
        }
    };
    DecoratorService.prototype.disable.$inject = ["decoratorKey"];
    /**
     * This method retrieves a list of decorator keys that is eligible for the specified component type.
     * The list retrieved depends on which perspective is active.
     *
     * This method uses the list of decorators enabled by the [addMappings]{@link DecoratorService#addMappings} method.
     *
     * @param componentType The type of the component to be decorated.
     * @param componentId The id of the component to be decorated.
     * @returns A promise that resolves to a list of decorator keys.
     *
     */
    /* @ngInject */ DecoratorService.prototype.getDecoratorsForComponent = function (componentType, componentId) {
        var _this = this;
        var decoratorArray = [];
        if (this.componentDecoratorsMap) {
            for (var regexpKey in this.componentDecoratorsMap) {
                if (this.stringUtils.regExpFactory(regexpKey).test(componentType)) {
                    decoratorArray = lodash.union(decoratorArray, this.componentDecoratorsMap[regexpKey]);
                }
            }
        }
        var promisesToResolve = [];
        var displayedDecorators = [];
        decoratorArray.forEach(function (dec) {
            var activeDecorator = _this._activeDecorators[dec];
            if (activeDecorator && activeDecorator.displayCondition) {
                if (typeof activeDecorator.displayCondition !== 'function') {
                    throw new Error("The active decorator's displayCondition property must be a function and must return a boolean");
                }
                var deferred_1 = _this.promiseUtils.defer();
                activeDecorator
                    .displayCondition(componentType, componentId)
                    .then(function (display) {
                    if (display) {
                        deferred_1.resolve(dec);
                    }
                    else {
                        deferred_1.resolve(null);
                    }
                });
                promisesToResolve.push(deferred_1.promise);
            }
            else if (activeDecorator) {
                displayedDecorators.push(dec);
            }
        });
        return Promise.all(promisesToResolve).then(function (decoratorsEnabled) {
            return displayedDecorators.concat(decoratorsEnabled.filter(function (dec) { return dec; }));
        });
    };
    DecoratorService.prototype.getDecoratorsForComponent.$inject = ["componentType", "componentId"];
    /* @ngInject */ DecoratorService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IDecoratorService),
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.PromiseUtils,
            smarteditcommons.StringUtils,
            smarteditcommons.ILegacyDecoratorToCustomElementConverter])
    ], /* @ngInject */ DecoratorService);
    return /* @ngInject */ DecoratorService;
}());

/* @internal */
var /* @ngInject */ TranslationsFetchService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ TranslationsFetchService, _super);
    function /* @ngInject */ TranslationsFetchService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ TranslationsFetchService.prototype.get = function (lang) {
        'proxyFunction';
        return null;
    };
    TranslationsFetchService.prototype.get.$inject = ["lang"];
    /* @ngInject */ TranslationsFetchService.prototype.isReady = function () {
        'proxyFunction';
        return null;
    };
    /* @ngInject */ TranslationsFetchService.prototype.waitToBeReady = function () {
        'proxyFunction';
        return null;
    };
    /* @ngInject */ TranslationsFetchService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ITranslationsFetchService),
        smarteditcommons.GatewayProxied(),
        core.Injectable()
    ], /* @ngInject */ TranslationsFetchService);
    return /* @ngInject */ TranslationsFetchService;
}(smarteditcommons.ITranslationsFetchService));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var CONTENT_PLACEHOLDER = 'CONTENT_PLACEHOLDER';
var scopes = [];
function angularJSDecoratorCustomElementClassFactory(upgrade, nodeUtils, componentName) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        /**
         * Avoid changing anything (no DOM changes) to the custom element in the constructor (Safari throw NotSupportedError).
         */
        function class_1() {
            return _super.call(this, upgrade) || this;
            // this.attachShadow({mode: 'open'});
        }
        Object.defineProperty(class_1, "observedAttributes", {
            get: function () {
                return ['active'];
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.internalConnectedCallback = function () {
            var _this = this;
            this.markAsProcessed();
            var componentAttributes;
            try {
                componentAttributes = nodeUtils.collectSmarteditAttributesByElementUuid(this.getAttribute(smarteditcommons.ELEMENT_UUID_ATTRIBUTE));
            }
            catch (e) {
                // the original component may have disappeared in the meantime
                return;
            }
            /* compile should only happen in one layer,
             * other layers will iteratively be compiled by their own custom element
             * these layers are therefore to be removed before compilation
             */
            this.content =
                this.content ||
                    Array.from(this.childNodes).find(function (childNode) { return childNode.nodeType === Node.ELEMENT_NODE; });
            // const computedStyle = window.getComputedStyle(this.content);
            var placeholder = document.createElement(CONTENT_PLACEHOLDER);
            // placeholder.style.width = computedStyle.width + "px";
            // placeholder.style.height = computedStyle.height + "px";
            // placeholder.style.minHeight = "49px";
            // placeholder.style.minWidth = "51px";
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            this.appendChild(placeholder);
            var actualActiveState = this.getAttribute('active') === 'true';
            this.setAttribute('active', 'active');
            // compile should only happen in one layer
            this.scope = this.$rootScope.$new(false);
            scopes.push(this.scopeIdentifier);
            this.scope.active = actualActiveState;
            this.scope.componentAttributes = componentAttributes;
            var compiledClone = this.$compile(this)(this.scope)[0];
            // const style = document.createElement('style');
            // style.innerHTML = `
            // 		:host {
            // 			display: block;
            // 		}`;
            // this.shadowRoot.appendChild(style);
            // reappending content after potentially asynchronous compilation
            /*
             * When using templateUrl, rendering is asynchronous
             * we need wait until the place holder is transcluded before continuing
             */
            smarteditcommons.promiseUtils.waitOnCondition(function () { return !!compiledClone.querySelector(CONTENT_PLACEHOLDER); }, function () {
                compiledClone.querySelector(CONTENT_PLACEHOLDER).replaceWith(_this.content);
                // this.shadowRoot.append(compiledClone);
            }, "decorator " + componentName + " doesn't seem to contain contain an ng-transclude statement");
        };
        class_1.prototype.internalAttributeChangedCallback = function (name, oldValue, newValue) {
            /*
             * attributes don't change in the case of decorators:
             * - they come from the shallow clone itself
             * - only active flag changes but because of the full rewrapping it goes through constructor
             */
            this.scope.active = newValue === 'true';
        };
        class_1.prototype.internalDisconnectedCallback = function () {
            scopes.splice(scopes.indexOf(this.scopeIdentifier), 1);
        };
        Object.defineProperty(class_1.prototype, "scopeIdentifier", {
            get: function () {
                return this.getAttribute(smarteditcommons.ID_ATTRIBUTE) + "_" + this.tagName;
            },
            enumerable: false,
            configurable: true
        });
        return class_1;
    }(smarteditcommons.AbstractAngularJSBasedCustomElement));
}
var /* @ngInject */ LegacyDecoratorToCustomElementConverter = /** @class */ (function () {
    LegacyDecoratorToCustomElementConverter.$inject = ["upgrade", "nodeUtils"];
    function /* @ngInject */ LegacyDecoratorToCustomElementConverter(upgrade, nodeUtils) {
        this.upgrade = upgrade;
        this.nodeUtils = nodeUtils;
        this.convertedDecorators = [];
    }
    // for e2e purposes
    /* @ngInject */ LegacyDecoratorToCustomElementConverter.prototype.getScopes = function () {
        return scopes;
    };
    /*
     * Decorators are first class components:
     * even though they are built hierarchically, they are independant on one another and their scope should not be chained.
     * As a consequence, compiling them seperately is not an issue and thus enables converting them
     * to custom elements.
     */
    /* @ngInject */ LegacyDecoratorToCustomElementConverter.prototype.convert = function (_componentName) {
        var componentName = _componentName.replace('se.', '');
        var originalName = lodash.kebabCase(componentName);
        if (!customElements.get(originalName)) {
            // may already have been defined through DI
            var CustomComponentClass = angularJSDecoratorCustomElementClassFactory(this.upgrade, this.nodeUtils, componentName);
            customElements.define(originalName, CustomComponentClass);
        }
    };
    LegacyDecoratorToCustomElementConverter.prototype.convert.$inject = ["_componentName"];
    /* @ngInject */ LegacyDecoratorToCustomElementConverter.prototype.convertIfNeeded = function (componentNames) {
        var _this = this;
        componentNames.forEach(function (componentName) {
            if (_this.convertedDecorators.indexOf(componentName) === -1) {
                _this.convertedDecorators.push(componentName);
                _this.convert(componentName);
            }
        });
    };
    LegacyDecoratorToCustomElementConverter.prototype.convertIfNeeded.$inject = ["componentNames"];
    /* @ngInject */ LegacyDecoratorToCustomElementConverter = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ILegacyDecoratorToCustomElementConverter),
        core.Injectable(),
        __metadata("design:paramtypes", [_static.UpgradeModule, smarteditcommons.NodeUtils])
    ], /* @ngInject */ LegacyDecoratorToCustomElementConverter);
    return /* @ngInject */ LegacyDecoratorToCustomElementConverter;
}());

/**
 * Handles all get/set component related operations
 */
var /* @ngInject */ ComponentHandlerService = /** @class */ (function () {
    ComponentHandlerService.$inject = ["yjQuery"];
    function /* @ngInject */ ComponentHandlerService(yjQuery) {
        this.yjQuery = yjQuery;
    }
    /**
     * Retrieves a handler on the smartEdit overlay div
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @returns The #smarteditoverlay JQuery Element
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOverlay = function () {
        return this.yjQuery('#' + smarteditcommons.OVERLAY_ID);
    };
    /**
     * determines whether the overlay is visible
     * This method can only be invoked from the smartEdit application and not the smartEdit iframe.
     *
     * @returns  true if the overlay is visible
     */
    /* @ngInject */ ComponentHandlerService.prototype.isOverlayOn = function () {
        return this.getOverlay().length && this.getOverlay()[0].style.display !== 'none';
    };
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component identified by its smartEdit id, smartEdit type and an optional class
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     * @param smarteditSlotId the slot id of the slot containing the component as per the smartEdit contract with the storefront
     * @param cssClass the css Class to further restrict the search on. This parameter is optional.
     *
     * @returns  a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getComponentUnderSlot = function (smarteditComponentId, smarteditComponentType, smarteditSlotId, cssClass) {
        var slotQuery = this.buildComponentQuery(smarteditSlotId, smarteditcommons.CONTENT_SLOT_TYPE);
        var componentQuery = this.buildComponentQuery(smarteditComponentId, smarteditComponentType, cssClass);
        var selector = slotQuery + ' ' + componentQuery;
        return this.yjQuery(selector);
    };
    ComponentHandlerService.prototype.getComponentUnderSlot.$inject = ["smarteditComponentId", "smarteditComponentType", "smarteditSlotId", "cssClass"];
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component identified by its smartEdit id, smartEdit type and an optional class
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     * @param cssClass the css Class to further restrict the search on. This parameter is optional.
     *
     * @returns a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getComponent = function (smarteditComponentId, smarteditComponentType, cssClass) {
        return this.yjQuery(this.buildComponentQuery(smarteditComponentId, smarteditComponentType, cssClass));
    };
    ComponentHandlerService.prototype.getComponent.$inject = ["smarteditComponentId", "smarteditComponentType", "cssClass"];
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component of the original storefront layer identified by its smartEdit id, smartEdit type and slot ID
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     * @param slotId the ID of the slot within which the component resides
     *
     * @returns a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOriginalComponentWithinSlot = function (smarteditComponentId, smarteditComponentType, slotId) {
        return this.getComponentUnderSlot(smarteditComponentId, smarteditComponentType, slotId, smarteditcommons.COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.getOriginalComponentWithinSlot.$inject = ["smarteditComponentId", "smarteditComponentType", "slotId"];
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component of the original storefront layer identified by its smartEdit id, smartEdit type
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     *
     * @returns a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOriginalComponent = function (smarteditComponentId, smarteditComponentType) {
        return this.getComponent(smarteditComponentId, smarteditComponentType, smarteditcommons.COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.getOriginalComponent.$inject = ["smarteditComponentId", "smarteditComponentType"];
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component of the overlay layer identified by its smartEdit id, smartEdit type and slot ID
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     * @param slotId the ID of the slot within which the component resides
     *
     * @returns a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOverlayComponentWithinSlot = function (smarteditComponentId, smarteditComponentType, slotId) {
        return this.getComponentUnderSlot(smarteditComponentId, smarteditComponentType, slotId, smarteditcommons.OVERLAY_COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.getOverlayComponentWithinSlot.$inject = ["smarteditComponentId", "smarteditComponentType", "slotId"];
    /**
     * Retrieves the yjQuery wrapper around the smartEdit component of the overlay layer corresponding to the storefront layer component passed as argument
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param originalComponent the DOM element in the storefront layer
     *
     * @returns a yjQuery object wrapping the searched component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOverlayComponent = function (originalComponent) {
        var slotId = this.getParentSlotForComponent(originalComponent.parent());
        if (slotId) {
            return this.getComponentUnderSlot(originalComponent.attr(smarteditcommons.ID_ATTRIBUTE), originalComponent.attr(smarteditcommons.TYPE_ATTRIBUTE), slotId, smarteditcommons.OVERLAY_COMPONENT_CLASS);
        }
        else {
            return this.getComponent(originalComponent.attr(smarteditcommons.ID_ATTRIBUTE), originalComponent.attr(smarteditcommons.TYPE_ATTRIBUTE), smarteditcommons.OVERLAY_COMPONENT_CLASS);
        }
    };
    ComponentHandlerService.prototype.getOverlayComponent.$inject = ["originalComponent"];
    /**
     * Retrieves the yjQuery wrapper around a smartEdit component of the overlay div identified by its smartEdit id, smartEdit type
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     *
     * @returns a yjQuery object wrapping the searched component
     *
     */
    /* @ngInject */ ComponentHandlerService.prototype.getComponentInOverlay = function (smarteditComponentId, smarteditComponentType) {
        return this.getComponent(smarteditComponentId, smarteditComponentType, smarteditcommons.OVERLAY_COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.getComponentInOverlay.$inject = ["smarteditComponentId", "smarteditComponentType"];
    /**
     * Retrieves the the slot ID for a given element
     *
     * @param component the yjQuery component for which to search the parent
     *
     * @returns the slot ID for that particular component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getParentSlotForComponent = function (component) {
        var parent = this.yjQuery(component).closest('[' + smarteditcommons.TYPE_ATTRIBUTE + '=' + smarteditcommons.CONTENT_SLOT_TYPE + ']');
        return parent.attr(smarteditcommons.ID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getParentSlotForComponent.$inject = ["component"];
    /**
     * Retrieves the position of a component within a slot based on visible components in the given slotId.
     *
     * @param slotId the slot id as per the smartEdit contract with the storefront
     * @param componentId the component id as per the smartEdit contract with the storefront
     *
     * @returns the position of the component within a slot
     */
    /* @ngInject */ ComponentHandlerService.prototype.getComponentPositionInSlot = function (slotId, componentId) {
        var _this = this;
        var components = this.getOriginalComponentsWithinSlot(slotId);
        return lodash.findIndex(components, function (component) { return _this.getId(component) === componentId; });
    };
    ComponentHandlerService.prototype.getComponentPositionInSlot.$inject = ["slotId", "componentId"];
    /**
     * Retrieves the yjQuery wrapper around a list of smartEdit components contained in the slot identified by the given slotId.
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param slotId the ID of the slot within which the component resides
     *
     * @returns The list of searched components yjQuery objects
     */
    /* @ngInject */ ComponentHandlerService.prototype.getOriginalComponentsWithinSlot = function (slotId) {
        return this.yjQuery(this.buildComponentsInSlotQuery(slotId));
    };
    ComponentHandlerService.prototype.getOriginalComponentsWithinSlot.$inject = ["slotId"];
    /**
     * Gets the id that is relevant to be able to perform slot related operations for this components
     * It typically is CONTAINER_ID_ATTRIBUTE when applicable and defaults to ID_ATTRIBUTE
     *
     * @param component the yjQuery component for which to get the id
     *
     * @returns the slot operations related id
     */
    /* @ngInject */ ComponentHandlerService.prototype.getSlotOperationRelatedId = function (component) {
        component = this.yjQuery(component);
        var containerId = component.attr(smarteditcommons.CONTAINER_ID_ATTRIBUTE);
        return containerId && component.attr(smarteditcommons.CONTAINER_TYPE_ATTRIBUTE)
            ? containerId
            : component.attr(smarteditcommons.ID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getSlotOperationRelatedId.$inject = ["component"];
    /**
     * Gets the id that is relevant to be able to perform slot related operations for this components
     * It typically is {@link seConstantsModule.CONTAINER_ID_ATTRIBUTE} when applicable and defaults to {@link seConstantsModule.ID_ATTRIBUTE}
     *
     * @param component the yjQuery component for which to get the Uuid
     *
     * @returns the slot operations related Uuid
     */
    /* @ngInject */ ComponentHandlerService.prototype.getSlotOperationRelatedUuid = function (component) {
        var containerId = this.yjQuery(component).attr(smarteditcommons.CONTAINER_ID_ATTRIBUTE);
        return containerId && this.yjQuery(component).attr(smarteditcommons.CONTAINER_TYPE_ATTRIBUTE)
            ? containerId
            : this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getSlotOperationRelatedUuid.$inject = ["component"];
    /**
     * Retrieves the direct smartEdit component parent of a given component.
     * The parent is fetched in the same layer (original storefront or smartEdit overlay) as the child
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     *
     * @param component the yjQuery component for which to search a parent
     *
     * @returns a yjQuery object wrapping the smae-layer parent component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getParent = function (component) {
        component = this.yjQuery(component);
        var parentClassToLookFor = component.hasClass(smarteditcommons.COMPONENT_CLASS)
            ? smarteditcommons.COMPONENT_CLASS
            : component.hasClass(smarteditcommons.OVERLAY_COMPONENT_CLASS)
                ? smarteditcommons.OVERLAY_COMPONENT_CLASS
                : null;
        if (smarteditcommons.stringUtils.isBlank(parentClassToLookFor)) {
            throw new Error('componentHandlerService.getparent.error.component.from.unknown.layer');
        }
        return component.closest('.' +
            parentClassToLookFor +
            '[' +
            smarteditcommons.ID_ATTRIBUTE +
            ']' +
            '[' +
            smarteditcommons.ID_ATTRIBUTE +
            "!='" +
            component.attr(smarteditcommons.ID_ATTRIBUTE) +
            "']");
    };
    ComponentHandlerService.prototype.getParent.$inject = ["component"];
    /**
     * Returns the closest parent (or self) being a smartEdit component
     *
     * @param component the DOM/yjQuery element for which to search a parent
     *
     * @returns The closest closest parent (or self) being a smartEdit component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getClosestSmartEditComponent = function (component) {
        return this.yjQuery(component).closest('.' + smarteditcommons.COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.getClosestSmartEditComponent.$inject = ["component"];
    /**
     * Determines whether a DOM/yjQuery element is a smartEdit component
     *
     * @param component the DOM/yjQuery element for which to check if it's a SmartEdit component
     *
     * @returns true if DOM/yjQuery element is a smartEdit component
     */
    /* @ngInject */ ComponentHandlerService.prototype.isSmartEditComponent = function (component) {
        return this.yjQuery(component).hasClass(smarteditcommons.COMPONENT_CLASS);
    };
    ComponentHandlerService.prototype.isSmartEditComponent.$inject = ["component"];
    /**
     * Sets the smartEdit component id of a given component
     *
     * @param component the yjQuery component for which to set the id
     * @param id the id to be set
     *
     * @returns component the yjQuery component
     */
    /* @ngInject */ ComponentHandlerService.prototype.setId = function (component, id) {
        return this.yjQuery(component).attr(smarteditcommons.ID_ATTRIBUTE, id);
    };
    ComponentHandlerService.prototype.setId.$inject = ["component", "id"];
    /**
     * Gets the smartEdit component id of a given component
     *
     * @param component the yjQuery component for which to get the id
     *
     * @returns the component id
     */
    /* @ngInject */ ComponentHandlerService.prototype.getId = function (component) {
        return this.yjQuery(component).attr(smarteditcommons.ID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getId.$inject = ["component"];
    /**
     * Gets the smartEdit component id of a given component
     *
     * @param component the yjQuery component for which to get the id
     *
     * @returns the component id
     */
    /* @ngInject */ ComponentHandlerService.prototype.getUuid = function (component) {
        return this.yjQuery(component).attr(smarteditcommons.UUID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getUuid.$inject = ["component"];
    /**
     * Gets the smartEdit component id of a given component
     *
     * @param component the yjQuery component for which to get the id
     *
     * @returns the component id
     */
    /* @ngInject */ ComponentHandlerService.prototype.getCatalogVersionUuid = function (component) {
        return this.yjQuery(component).attr(smarteditcommons.CATALOG_VERSION_UUID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getCatalogVersionUuid.$inject = ["component"];
    /**
     * Sets the smartEdit component type of a given component
     *
     * @param component the yjQuery component for which to set the type
     * @param type the type to be set
     *
     * @returns component the yjQuery component
     */
    /* @ngInject */ ComponentHandlerService.prototype.setType = function (component, type) {
        return this.yjQuery(component).attr(smarteditcommons.TYPE_ATTRIBUTE, type);
    };
    ComponentHandlerService.prototype.setType.$inject = ["component", "type"];
    /**
     * Gets the smartEdit component type of a given component
     *
     * @param component the yjQuery component for which to get the type
     *
     * @returns the component type
     */
    /* @ngInject */ ComponentHandlerService.prototype.getType = function (component) {
        return this.yjQuery(component).attr(smarteditcommons.TYPE_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getType.$inject = ["component"];
    /**
     * Gets the type that is relevant to be able to perform slot related operations for this components
     * It typically is CONTAINER_TYPE_ATTRIBUTE when applicable and defaults to TYPE_ATTRIBUTE
     *
     * @param component the yjQuery component for which to get the type
     *
     * @returns the slot operations related type
     */
    /* @ngInject */ ComponentHandlerService.prototype.getSlotOperationRelatedType = function (component) {
        var containerType = this.yjQuery(component).attr(smarteditcommons.CONTAINER_TYPE_ATTRIBUTE);
        return containerType && this.yjQuery(component).attr(smarteditcommons.CONTAINER_ID_ATTRIBUTE)
            ? containerType
            : this.yjQuery(component).attr(smarteditcommons.TYPE_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getSlotOperationRelatedType.$inject = ["component"];
    /**
     * Retrieves the DOM selector matching all smartEdit components that are not of type ContentSlot
     *
     * @returns components selector
     */
    /* @ngInject */ ComponentHandlerService.prototype.getAllComponentsSelector = function () {
        return '.' + smarteditcommons.COMPONENT_CLASS + '[' + smarteditcommons.TYPE_ATTRIBUTE + "!='ContentSlot']";
    };
    /**
     * Retrieves the DOM selector matching all smartEdit components that are of type ContentSlot
     *
     * @returns the slots selector
     */
    /* @ngInject */ ComponentHandlerService.prototype.getAllSlotsSelector = function () {
        return '.' + smarteditcommons.COMPONENT_CLASS + '[' + smarteditcommons.TYPE_ATTRIBUTE + "='ContentSlot']";
    };
    /**
     * Retrieves the the slot Uuid for a given element
     *
     * @param the DOM element which represents the component
     *
     * @returns the slot Uuid for that particular component
     */
    /* @ngInject */ ComponentHandlerService.prototype.getParentSlotUuidForComponent = function (component) {
        return this.yjQuery(component)
            .closest('[' + smarteditcommons.TYPE_ATTRIBUTE + '=' + smarteditcommons.CONTENT_SLOT_TYPE + ']')
            .attr(smarteditcommons.UUID_ATTRIBUTE);
    };
    ComponentHandlerService.prototype.getParentSlotUuidForComponent.$inject = ["component"];
    /**
     * Determines whether the component identified by the provided smarteditComponentId and smarteditComponentType
     * resides in a different catalog version to the one of the current page.
     *
     * @param smarteditComponentId the component id as per the smartEdit contract with the storefront
     * @param smarteditComponentType the component type as per the smartEdit contract with the storefront
     *
     * @returns flag that evaluates to true if the component resides in a catalog version different to
     * the one of the current page.  False otherwise.
     */
    /* @ngInject */ ComponentHandlerService.prototype.isExternalComponent = function (smarteditComponentId, smarteditComponentType) {
        var component = this.getOriginalComponent(smarteditComponentId, smarteditComponentType);
        var componentCatalogVersionUuid = this.getCatalogVersionUuid(component);
        return (componentCatalogVersionUuid !==
            this.getBodyClassAttributeByRegEx(PageInfoService.PATTERN_SMARTEDIT_CATALOG_VERSION_UUID));
    };
    ComponentHandlerService.prototype.isExternalComponent.$inject = ["smarteditComponentId", "smarteditComponentType"];
    /**
     * @param pattern Pattern of class names to search for
     *
     * @returns Class attributes from the body element of the storefront
     */
    /* @ngInject */ ComponentHandlerService.prototype.getBodyClassAttributeByRegEx = function (pattern) {
        try {
            var bodyClass = this.yjQuery('body').attr('class');
            return pattern.exec(bodyClass)[1];
        }
        catch (_a) {
            throw {
                name: 'InvalidStorefrontPageError',
                message: 'Error: the page is not a valid storefront page.'
            };
        }
    };
    ComponentHandlerService.prototype.getBodyClassAttributeByRegEx.$inject = ["pattern"];
    /**
     * This method can only be invoked from the smartEdit application and not the smartEdit container.
     * Get first level smartEdit component children for a given node, regardless how deep they are found.
     * The returned children may have different depths relatively to the parent:
     *
     * ### Example
     *
     * 	    <body>
     * 		    <div>
     * 			    <component smartedit-component-id="1">
     * 				    <component smartedit-component-id="1_1"></component>
     * 			    </component>
     * 			    <component smartedit-component-id="2">
     * 			    	<component smartedit-component-id="2_1"></component>
     * 		    	</component>
     * 		    </div>
     * 		    <component smartedit-component-id="3">
     * 			    <component smartedit-component-id="3_1"></component>
     * 		    </component>
     * 		    <div>
     * 			    <div>
     * 				    <component smartedit-component-id="4">
     * 					    <component smartedit-component-id="4_1"></component>
     * 				    </component>
     * 			    </div>
     * 		    </div>
     * 	    </body>
     *
     *
     * @param node any HTML/yjQuery Element
     *
     * @returns The list of first level smartEdit component children for a given node, regardless how deep they are found.
     */
    /* @ngInject */ ComponentHandlerService.prototype.getFirstSmartEditComponentChildren = function (htmlElement) {
        var node = this.yjQuery(htmlElement);
        var root = node[0];
        if (!root) {
            return [];
        }
        var collection = Array.from(root.getElementsByClassName(smarteditcommons.COMPONENT_CLASS)).filter(function (element) {
            var current = element.parentElement;
            /**
             * The filter goes up the tree to see if any of the parents
             * have the component selector. If it does, it's not a first child.
             *
             * If the parent is the htmlElement, the search stops there.
             */
            while (current !== root) {
                if (current.classList.contains(smarteditcommons.COMPONENT_CLASS)) {
                    return false;
                }
                current = current.parentElement;
            }
            return true;
        });
        return this.yjQuery(collection);
    };
    ComponentHandlerService.prototype.getFirstSmartEditComponentChildren.$inject = ["htmlElement"];
    /**
     * Get component clone in overlay
     *
     * @param the DOM element which represents the component
     *
     * @returns The component clone in overlay
     */
    /* @ngInject */ ComponentHandlerService.prototype.getComponentCloneInOverlay = function (component) {
        var elementUuid = component.attr(smarteditcommons.ELEMENT_UUID_ATTRIBUTE);
        return this.yjQuery('.' + smarteditcommons.OVERLAY_COMPONENT_CLASS + '[' + smarteditcommons.ELEMENT_UUID_ATTRIBUTE + "='" + elementUuid + "']");
    };
    ComponentHandlerService.prototype.getComponentCloneInOverlay.$inject = ["component"];
    /**
     * Get all the slot uids from the DOM
     *
     * @returns An array of slot ids in the DOM
     */
    /* @ngInject */ ComponentHandlerService.prototype.getAllSlotUids = function () {
        var slots = this.yjQuery(this.getAllSlotsSelector());
        var that = this;
        var slotIds = Array.prototype.slice.call(slots.map(function () {
            return that.getId(this);
        }));
        return slotIds;
    };
    /* @ngInject */ ComponentHandlerService.prototype.buildComponentQuery = function (smarteditComponentId, smarteditComponentType, cssClass) {
        var query = '';
        query += cssClass ? '.' + cssClass : '';
        query += '[' + smarteditcommons.ID_ATTRIBUTE + "='" + smarteditComponentId + "']";
        query += '[' + smarteditcommons.TYPE_ATTRIBUTE + "='" + smarteditComponentType + "']";
        return query;
    };
    ComponentHandlerService.prototype.buildComponentQuery.$inject = ["smarteditComponentId", "smarteditComponentType", "cssClass"];
    /* @ngInject */ ComponentHandlerService.prototype.buildComponentsInSlotQuery = function (slotId) {
        var query = '';
        query += '.' + smarteditcommons.COMPONENT_CLASS;
        query += '[' + smarteditcommons.ID_ATTRIBUTE + "='" + slotId + "']";
        query += '[' + smarteditcommons.TYPE_ATTRIBUTE + "='" + smarteditcommons.CONTENT_SLOT_TYPE + "']";
        query += ' > ';
        query += '[' + smarteditcommons.ID_ATTRIBUTE + ']';
        return query;
    };
    ComponentHandlerService.prototype.buildComponentsInSlotQuery.$inject = ["slotId"];
    /* @ngInject */ ComponentHandlerService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function])
    ], /* @ngInject */ ComponentHandlerService);
    return /* @ngInject */ ComponentHandlerService;
}());

/** @internal */
var /* @ngInject */ RenderService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ RenderService, _super);
    RenderService.$inject = ["smarteditBootstrapGateway", "httpClient", "logService", "yjQuery", "alertService", "componentHandlerService", "crossFrameEventService", "jQueryUtilsService", "experienceService", "seNamespaceService", "systemEventService", "notificationService", "pageInfoService", "perspectiveService", "windowUtils", "modalService"];
    function /* @ngInject */ RenderService(smarteditBootstrapGateway, httpClient, logService, yjQuery, alertService, componentHandlerService, crossFrameEventService, jQueryUtilsService, experienceService, seNamespaceService, systemEventService, notificationService, pageInfoService, perspectiveService, windowUtils, modalService) {
        var _this = _super.call(this, yjQuery, systemEventService, notificationService, pageInfoService, perspectiveService, crossFrameEventService, windowUtils, modalService) || this;
        _this.smarteditBootstrapGateway = smarteditBootstrapGateway;
        _this.httpClient = httpClient;
        _this.logService = logService;
        _this.yjQuery = yjQuery;
        _this.alertService = alertService;
        _this.componentHandlerService = componentHandlerService;
        _this.crossFrameEventService = crossFrameEventService;
        _this.jQueryUtilsService = jQueryUtilsService;
        _this.experienceService = experienceService;
        _this.seNamespaceService = seNamespaceService;
        _this.systemEventService = systemEventService;
        _this.resizeSlots = lodash.debounce(_this._resizeSlots.bind(_this), 50);
        _this._slotOriginalHeights = {};
        _this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_CHANGED, function (eventId, isNonEmptyPerspective) {
            _this.renderPage(isNonEmptyPerspective);
        });
        _this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_REFRESHED, function (eventId, isNonEmptyPerspective) {
            _this.renderPage(isNonEmptyPerspective);
        });
        _this.systemEventService.subscribe(smarteditcommons.CONTRACT_CHANGE_LISTENER_PROCESS_EVENTS.PROCESS_COMPONENTS, function (eventId, componentsList) {
            var components = lodash.map(componentsList, function (component) {
                if (component.dataset[smarteditcommons.SMARTEDIT_COMPONENT_PROCESS_STATUS] !==
                    smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.KEEP_VISIBLE) {
                    component.dataset[smarteditcommons.SMARTEDIT_COMPONENT_PROCESS_STATUS] = _this.componentHandlerService.isOverlayOn()
                        ? smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.PROCESS
                        : smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.REMOVE;
                }
                return component;
            });
            return Promise.resolve(components);
        });
        return _this;
    }
    /* @ngInject */ RenderService.prototype.toggleOverlay = function (isVisible) {
        var overlay = this.componentHandlerService.getOverlay();
        overlay.css('visibility', isVisible ? 'visible' : 'hidden');
    };
    RenderService.prototype.toggleOverlay.$inject = ["isVisible"];
    /* @ngInject */ RenderService.prototype.refreshOverlayDimensions = function (element) {
        var _this = this;
        if (element === void 0) { element = null; }
        element = element || this.yjQuery('body');
        var children = this.componentHandlerService.getFirstSmartEditComponentChildren(element);
        children.each(function (index, childElement) {
            _this.updateComponentSizeAndPosition(childElement);
            _this.refreshOverlayDimensions(childElement);
        });
    };
    RenderService.prototype.refreshOverlayDimensions.$inject = ["element"];
    /**
     * Updates the dimensions of the overlay component element given the original component element and the overlay component itself.
     * If no overlay component is provided, it will be fetched through {@link componentHandlerService.getOverlayComponent}
     *
     * The overlay component is resized to be the same dimensions of the component for which it overlays, and positioned absolutely
     * on the page. Additionally, it is provided with a minimum height and width. The resizing takes into account both
     * the size of the component element, and the position based on iframe scrolling.
     *
     * @param {HTMLElement} element The original CMS component element from the storefront.
     * @param {HTMLElement =} componentOverlayElem The overlay component. If none is provided
     */
    /* @ngInject */ RenderService.prototype.updateComponentSizeAndPosition = function (element, componentOverlayElem) {
        var componentElem = this.yjQuery(element);
        componentOverlayElem =
            componentOverlayElem ||
                this.componentHandlerService.getComponentCloneInOverlay(componentElem).get(0);
        if (!componentOverlayElem) {
            return;
        }
        var parentPos = this._getParentInOverlay(componentElem).get(0).getBoundingClientRect();
        var innerWidth = componentElem.get(0).offsetWidth;
        var innerHeight = componentElem.get(0).offsetHeight;
        // Update the position based on the IFrame Scrolling
        var pos = componentElem.get(0).getBoundingClientRect();
        var elementTopPos = pos.top - parentPos.top;
        var elementLeftPos = pos.left - parentPos.left;
        // In SakExecutorService.ts, the 'position' and 'top' will decide the slot-contextual-menu show at top of slot or bottom of slot
        componentOverlayElem.style.position = 'absolute';
        componentOverlayElem.style.top = elementTopPos + 'px';
        componentOverlayElem.style.left = elementLeftPos + 'px';
        componentOverlayElem.style.width = innerWidth + 'px';
        componentOverlayElem.style.height = innerHeight + 'px';
        componentOverlayElem.style.minWidth = '51px';
        componentOverlayElem.style.minHeight = '48px';
        var cloneId = this._buildShallowCloneId(componentElem.attr(smarteditcommons.ID_ATTRIBUTE), componentElem.attr(smarteditcommons.TYPE_ATTRIBUTE), componentElem.attr(smarteditcommons.CONTAINER_ID_ATTRIBUTE));
        var shallowCopy = this.yjQuery(componentOverlayElem).find('[id="' + cloneId + '"]');
        shallowCopy.width(innerWidth);
        shallowCopy.height(innerHeight);
        shallowCopy.css('min-height', 49);
        shallowCopy.css('min-width', 51);
    };
    RenderService.prototype.updateComponentSizeAndPosition.$inject = ["element", "componentOverlayElem"];
    /* @ngInject */ RenderService.prototype.renderPage = function (isRerender) {
        var _this = this;
        this.resizeSlots();
        this.componentHandlerService.getOverlay().hide();
        this.isRenderingBlocked().then(function (isRenderingBlocked) {
            _this._markSmartEditAsReady();
            var overlay = _this._createOverlay();
            if (isRerender && !isRenderingBlocked) {
                overlay.show();
            }
            _this.systemEventService.publish(smarteditcommons.CONTRACT_CHANGE_LISTENER_PROCESS_EVENTS.RESTART_PROCESS);
            _this.crossFrameEventService.publish(smarteditcommons.OVERLAY_RERENDERED_EVENT);
        });
    };
    RenderService.prototype.renderPage.$inject = ["isRerender"];
    /* @ngInject */ RenderService.prototype.renderSlots = function (_slotIds) {
        if (_slotIds === void 0) { _slotIds = null; }
        return __awaiter(this, void 0, void 0, function () {
            var slotIds, slotsRemaining, storefrontUrl, response, e_1, e_2, root_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (smarteditcommons.stringUtils.isBlank(_slotIds) || (_slotIds instanceof Array && _slotIds.length === 0)) {
                            return [2 /*return*/, Promise.reject('renderService.renderSlots.slotIds.required')];
                        }
                        if (typeof _slotIds === 'string') {
                            _slotIds = [_slotIds];
                        }
                        slotIds = lodash.uniqBy(_slotIds, function (slotId) { return slotId; });
                        slotsRemaining = slotIds.filter(function (id) { return !_this.seNamespaceService.renderComponent(id, 'ContentSlot'); });
                        if (!(slotsRemaining.length <= 0)) return [3 /*break*/, 1];
                        // all were handled by storefront
                        return [2 /*return*/, true];
                    case 1:
                        storefrontUrl = void 0;
                        response = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.experienceService.buildRefreshedPreviewUrl()];
                    case 3:
                        storefrontUrl = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.logService.error('renderService.renderSlots() - error with buildRefreshedPreviewUrl');
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.httpClient
                                .get(storefrontUrl, {
                                headers: {
                                    Accept: 'text/html',
                                    Pragma: 'no-cache'
                                },
                                responseType: 'text'
                            })
                                .toPromise()];
                    case 6:
                        response = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        this.alertService.showDanger({
                            message: e_2
                        });
                        return [2 /*return*/, Promise.reject(e_2)];
                    case 8:
                        root_1 = this.jQueryUtilsService.unsafeParseHTML(response);
                        slotsRemaining.forEach(function (slotId) {
                            var slotSelector = '.' +
                                smarteditcommons.COMPONENT_CLASS +
                                '[' +
                                smarteditcommons.TYPE_ATTRIBUTE +
                                "='ContentSlot'][" +
                                smarteditcommons.ID_ATTRIBUTE +
                                "='" +
                                slotId +
                                "']";
                            var slotToBeRerendered = _this.jQueryUtilsService.extractFromElement(root_1, slotSelector);
                            var originalSlot = _this.yjQuery(slotSelector);
                            originalSlot.html(slotToBeRerendered.html());
                            if (originalSlot.data('smartedit-resized-slot')) {
                                // reset the slot height to auto because the originalSlot height could have been changed previously with a specific height.
                                originalSlot.css('height', 'auto');
                            }
                        });
                        this._reprocessPage();
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    RenderService.prototype.renderSlots.$inject = ["_slotIds"];
    /* @ngInject */ RenderService.prototype.renderComponent = function (componentId, componentType) {
        var component = this.componentHandlerService.getComponent(componentId, componentType);
        var slotId = this.componentHandlerService.getParent(component).attr(smarteditcommons.ID_ATTRIBUTE);
        if (this.seNamespaceService.renderComponent(componentId, componentType, slotId)) {
            return Promise.resolve(true);
        }
        else {
            return this.renderSlots(slotId);
        }
    };
    RenderService.prototype.renderComponent.$inject = ["componentId", "componentType"];
    /* @ngInject */ RenderService.prototype.renderRemoval = function (componentId, componentType, slotId) {
        var removedComponents = this.componentHandlerService
            .getComponentUnderSlot(componentId, componentType, slotId)
            .remove();
        this.refreshOverlayDimensions();
        return removedComponents;
    };
    RenderService.prototype.renderRemoval.$inject = ["componentId", "componentType", "slotId"];
    /**
     * Given a smartEdit component in the storefront layer, its clone in the smartEdit overlay is removed and the pertaining decorators destroyed.
     *
     * @param {Element} element The original CMS component element from the storefront.
     * @param {Element=} parent the closest smartEditComponent parent, expected to be null for the highest elements
     * @param {Object=} oldAttributes The map of former attributes of the element. necessary when the element has mutated since the last creation
     */
    /* @ngInject */ RenderService.prototype.destroyComponent = function (_component, _parent, oldAttributes) {
        var component = this.yjQuery(_component);
        var parent = this.yjQuery(_parent);
        var componentInOverlayId = oldAttributes && oldAttributes[smarteditcommons.ID_ATTRIBUTE]
            ? oldAttributes[smarteditcommons.ID_ATTRIBUTE]
            : component.attr(smarteditcommons.ID_ATTRIBUTE);
        var componentInOverlayType = oldAttributes && oldAttributes[smarteditcommons.TYPE_ATTRIBUTE]
            ? oldAttributes[smarteditcommons.TYPE_ATTRIBUTE]
            : component.attr(smarteditcommons.TYPE_ATTRIBUTE);
        // the node is no longer attached so can't find parent
        if (parent.attr(smarteditcommons.ID_ATTRIBUTE)) {
            this.componentHandlerService
                .getOverlayComponentWithinSlot(componentInOverlayId, componentInOverlayType, parent.attr(smarteditcommons.ID_ATTRIBUTE))
                .remove();
        }
        else {
            this.componentHandlerService
                .getComponentInOverlay(componentInOverlayId, componentInOverlayType)
                .remove();
        }
    };
    RenderService.prototype.destroyComponent.$inject = ["_component", "_parent", "oldAttributes"];
    /**
     * Given a smartEdit component in the storefront layer. An empty clone of it will be created, sized and positioned in the smartEdit overlay
     * then compiled with all eligible decorators for the given perspective (see {@link smarteditServicesModule.interface:IPerspectiveService perspectiveService})
     * @param {Element} element The original CMS component element from the storefront.
     */
    /* @ngInject */ RenderService.prototype.createComponent = function (element) {
        if (this.componentHandlerService.isOverlayOn() && this._isComponentVisible(element)) {
            this._cloneComponent(element);
        }
    };
    RenderService.prototype.createComponent.$inject = ["element"];
    /**
     * Resizes the height of all slots on the page based on the sizes of the components. The new height of the
     * slot is set to the minimum height encompassing its sub-components, calculated by comparing each of the
     * sub-components' top and bottom bounding rectangle values.
     *
     * Slots that do not have components inside still appear in the DOM. If the CMS manager is in a perspective in which
     * slot contextual menus are displayed, slots must have a height. Otherwise, overlays will overlap. Thus, empty slots
     * are given a minimum size so that overlays match.
     */
    /* @ngInject */ RenderService.prototype._resizeSlots = function () {
        var _this = this;
        Array.prototype.slice
            .call(this.componentHandlerService.getFirstSmartEditComponentChildren(document.body))
            .forEach(function (slotComponent) {
            var slotComponentID = _this.yjQuery(slotComponent).attr(smarteditcommons.ID_ATTRIBUTE);
            var slotComponentType = _this.yjQuery(slotComponent).attr(smarteditcommons.TYPE_ATTRIBUTE);
            var newSlotTop = -1;
            var newSlotBottom = -1;
            _this.yjQuery(slotComponent)
                .find('.' + smarteditcommons.COMPONENT_CLASS)
                .filter(function (idx, componentInSlotElement) {
                var componentInSlot = _this.yjQuery(componentInSlotElement);
                return (componentInSlot.attr(smarteditcommons.ID_ATTRIBUTE) !== slotComponentID &&
                    componentInSlot.attr(smarteditcommons.TYPE_ATTRIBUTE) !== slotComponentType &&
                    componentInSlot.is(':visible'));
            })
                .each(function (compIndex, component) {
                var componentDimensions = component.getBoundingClientRect();
                newSlotTop =
                    newSlotTop === -1
                        ? componentDimensions.top
                        : Math.min(newSlotTop, componentDimensions.top);
                newSlotBottom =
                    newSlotBottom === -1
                        ? componentDimensions.bottom
                        : Math.max(newSlotBottom, componentDimensions.bottom);
            });
            var newSlotHeight = newSlotBottom - newSlotTop;
            var currentSlotHeight = parseFloat(window.getComputedStyle(slotComponent).height) || 0;
            if (Math.abs(currentSlotHeight - newSlotHeight) > 0.001) {
                var currentSlotVerticalPadding = parseFloat(window.getComputedStyle(slotComponent).paddingTop) +
                    parseFloat(window.getComputedStyle(slotComponent).paddingBottom);
                var slotUniqueKey = slotComponentID + '_' + slotComponentType;
                var oldSlotHeight = _this._slotOriginalHeights[slotUniqueKey];
                if (!oldSlotHeight) {
                    oldSlotHeight = currentSlotHeight;
                    _this._slotOriginalHeights[slotUniqueKey] = oldSlotHeight;
                }
                if (newSlotHeight + currentSlotVerticalPadding > oldSlotHeight) {
                    slotComponent.style.height =
                        newSlotHeight + currentSlotVerticalPadding + 'px';
                }
                else {
                    slotComponent.style.height = oldSlotHeight + 'px';
                }
                _this.yjQuery(slotComponent).data('smartedit-resized-slot', true);
            }
        });
    };
    /* @ngInject */ RenderService.prototype._getParentInOverlay = function (element) {
        var parent = this.componentHandlerService.getParent(element);
        if (parent.length) {
            return this.componentHandlerService.getOverlayComponent(parent);
        }
        else {
            return this.componentHandlerService.getOverlay();
        }
    };
    RenderService.prototype._getParentInOverlay.$inject = ["element"];
    /* @ngInject */ RenderService.prototype._buildShallowCloneId = function (smarteditComponentId, smarteditComponentType, smarteditContainerId) {
        var containerSection = !smarteditcommons.stringUtils.isBlank(smarteditContainerId)
            ? '_' + smarteditContainerId
            : '';
        return smarteditComponentId + '_' + smarteditComponentType + containerSection + '_overlay';
    };
    RenderService.prototype._buildShallowCloneId.$inject = ["smarteditComponentId", "smarteditComponentType", "smarteditContainerId"];
    /* @ngInject */ RenderService.prototype._cloneComponent = function (el) {
        if (!this.yjQuery(el).is(':visible')) {
            return;
        }
        var element = this.yjQuery(el);
        var parentOverlay = this._getParentInOverlay(element);
        if (!parentOverlay.length) {
            this.logService.error('renderService: parentOverlay empty for component:', element.attr(smarteditcommons.ID_ATTRIBUTE));
            return;
        }
        if (!this._validateComponentAttributesContract(element)) {
            return;
        }
        // FIXME: CMSX-6139: use dataset instead of attr(): ELEMENT_UUID_ATTRIBUTE value should not be exposed.
        var elementUUID = smarteditcommons.stringUtils.generateIdentifier();
        if (!element.attr(smarteditcommons.ELEMENT_UUID_ATTRIBUTE)) {
            element.attr(smarteditcommons.ELEMENT_UUID_ATTRIBUTE, elementUUID);
        }
        var smarteditComponentId = element.attr(smarteditcommons.ID_ATTRIBUTE);
        var smarteditComponentType = element.attr(smarteditcommons.TYPE_ATTRIBUTE);
        var smarteditContainerId = element.attr(smarteditcommons.CONTAINER_ID_ATTRIBUTE);
        var shallowCopy = this._getDocument().createElement('div');
        shallowCopy.id = this._buildShallowCloneId(smarteditComponentId, smarteditComponentType, smarteditContainerId);
        var smartEditWrapper = this._getDocument().createElement('smartedit-element');
        var componentDecorator = this.yjQuery(smartEditWrapper);
        componentDecorator.append(shallowCopy);
        this.updateComponentSizeAndPosition(element.get(0), smartEditWrapper);
        if (smarteditComponentType === 'NavigationBarCollectionComponent') {
            // Make sure the Navigation Bar is on top of the navigation items
            smartEditWrapper.style.zIndex = '7';
        }
        componentDecorator.addClass(smarteditcommons.OVERLAY_COMPONENT_CLASS);
        Array.prototype.slice.apply(element.get(0).attributes).forEach(function (node) {
            if (node.nodeName.indexOf(smarteditcommons.SMARTEDIT_ATTRIBUTE_PREFIX) === 0) {
                componentDecorator.attr(node.nodeName, node.nodeValue);
            }
        });
        parentOverlay.append(smartEditWrapper);
    };
    RenderService.prototype._cloneComponent.$inject = ["el"];
    /* @ngInject */ RenderService.prototype._createOverlay = function () {
        var overlayWrapper = this.componentHandlerService.getOverlay();
        if (overlayWrapper.length) {
            return overlayWrapper;
        }
        var overlay = this._getDocument().createElement('div');
        overlay.id = smarteditcommons.OVERLAY_ID;
        overlay.style.position = 'absolute';
        overlay.style.top = '0px';
        overlay.style.left = '0px';
        overlay.style.bottom = '0px';
        overlay.style.right = '0px';
        overlay.style.display = 'none';
        document.body.appendChild(overlay);
        return this.yjQuery(overlay);
    };
    /* @ngInject */ RenderService.prototype._validateComponentAttributesContract = function (element) {
        var _this = this;
        var requiredAttributes = [
            smarteditcommons.ID_ATTRIBUTE,
            smarteditcommons.UUID_ATTRIBUTE,
            smarteditcommons.TYPE_ATTRIBUTE,
            smarteditcommons.CATALOG_VERSION_UUID_ATTRIBUTE
        ];
        var valid = true;
        requiredAttributes.forEach(function (reqAttribute) {
            if (!element || !element.attr(reqAttribute)) {
                valid = false;
                _this.logService.warn('RenderService - smarteditComponent element discovered with missing contract attribute: ' +
                    reqAttribute);
            }
        });
        return valid;
    };
    RenderService.prototype._validateComponentAttributesContract.$inject = ["element"];
    /* @ngInject */ RenderService.prototype._markSmartEditAsReady = function () {
        this.smarteditBootstrapGateway.getInstance().publish('smartEditReady', {});
    };
    /* @ngInject */ RenderService.prototype._isComponentVisible = function (component) {
        // NOTE: This might not work as expected for fixed positioned items. For those cases a more expensive
        // check must be performed (get the component style and check if it's visible or not).
        return component.offsetParent !== null;
    };
    RenderService.prototype._isComponentVisible.$inject = ["component"];
    /* @ngInject */ RenderService.prototype._reprocessPage = function () {
        this.seNamespaceService.reprocessPage();
    };
    /* @ngInject */ RenderService = __decorate([
        smarteditcommons.GatewayProxied('blockRendering', 'isRenderingBlocked', 'renderSlots', 'renderComponent', 'renderRemoval', 'toggleOverlay', 'refreshOverlayDimensions', 'renderPage'),
        smarteditcommons.SeDowngradeService(smarteditcommons.IRenderService),
        __param(3, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.SmarteditBootstrapGateway,
            http.HttpClient,
            smarteditcommons.LogService, Function, smarteditcommons.IAlertService,
            ComponentHandlerService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.JQueryUtilsService,
            smarteditcommons.IExperienceService,
            SeNamespaceService,
            smarteditcommons.SystemEventService,
            smarteditcommons.INotificationService,
            smarteditcommons.IPageInfoService,
            smarteditcommons.IPerspectiveService,
            smarteditcommons.WindowUtils,
            smarteditcommons.ModalService])
    ], /* @ngInject */ RenderService);
    return /* @ngInject */ RenderService;
}(smarteditcommons.IRenderService));

var /* @ngInject */ IframeClickDetectionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ IframeClickDetectionService, _super);
    IframeClickDetectionService.$inject = ["document"];
    function /* @ngInject */ IframeClickDetectionService(document) {
        var _this = _super.call(this) || this;
        document.addEventListener('mousedown', function () { return _this.onIframeClick(); });
        return _this;
    }
    /* @ngInject */ IframeClickDetectionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IIframeClickDetectionService),
        smarteditcommons.GatewayProxied('onIframeClick'),
        core.Injectable(),
        __param(0, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [Document])
    ], /* @ngInject */ IframeClickDetectionService);
    return /* @ngInject */ IframeClickDetectionService;
}(smarteditcommons.IIframeClickDetectionService));

var ToolbarService = /** @class */ (function (_super) {
    __extends(ToolbarService, _super);
    function ToolbarService(gatewayId, gatewayProxy, logService, $templateCache, permissionService) {
        var _this = _super.call(this, logService, $templateCache, permissionService) || this;
        _this.gatewayId = gatewayId;
        gatewayProxy.initForService(_this, [
            'addAliases',
            'removeItemByKey',
            'removeAliasByKey',
            '_removeItemOnInner',
            'triggerActionOnInner'
        ]);
        return _this;
    }
    ToolbarService.prototype._removeItemOnInner = function (itemKey) {
        if (itemKey in this.actions) {
            delete this.actions[itemKey];
        }
        this.logService.warn('removeItemByKey() - Failed to find action for key ' + itemKey);
    };
    ToolbarService.prototype.triggerActionOnInner = function (action) {
        if (!this.actions[action.key]) {
            this.logService.error('triggerActionByKey() - Failed to find action for key ' + action.key);
            return;
        }
        this.actions[action.key]();
    };
    return ToolbarService;
}(smarteditcommons.IToolbarService));

var /* @ngInject */ ToolbarServiceFactory = /** @class */ (function () {
    ToolbarServiceFactory.$inject = ["gatewayProxy", "logService", "lazy", "permissionService"];
    function /* @ngInject */ ToolbarServiceFactory(gatewayProxy, logService, lazy, permissionService) {
        this.gatewayProxy = gatewayProxy;
        this.logService = logService;
        this.lazy = lazy;
        this.permissionService = permissionService;
        this.toolbarServicesByGatewayId = {};
    }
    /* @ngInject */ ToolbarServiceFactory.prototype.getToolbarService = function (gatewayId) {
        if (!this.toolbarServicesByGatewayId[gatewayId]) {
            this.toolbarServicesByGatewayId[gatewayId] = new ToolbarService(gatewayId, this.gatewayProxy, this.logService, this.lazy.$templateCache(), this.permissionService);
        }
        return this.toolbarServicesByGatewayId[gatewayId];
    };
    ToolbarServiceFactory.prototype.getToolbarService.$inject = ["gatewayId"];
    /* @ngInject */ ToolbarServiceFactory = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IToolbarServiceFactory),
        __metadata("design:paramtypes", [smarteditcommons.GatewayProxy,
            smarteditcommons.LogService,
            smarteditcommons.AngularJSLazyDependenciesService,
            smarteditcommons.IPermissionService])
    ], /* @ngInject */ ToolbarServiceFactory);
    return /* @ngInject */ ToolbarServiceFactory;
}());

/**
 * Internal service
 *
 * Service that resizes slots and components in the Inner Frame when the overlay is enabled or disabled.
 */
var /* @ngInject */ ResizeComponentService = /** @class */ (function () {
    ResizeComponentService.$inject = ["componentHandlerService", "yjQuery"];
    function /* @ngInject */ ResizeComponentService(componentHandlerService, yjQuery) {
        this.componentHandlerService = componentHandlerService;
        this.yjQuery = yjQuery;
    }
    /**
     * This methods appends CSS classes to inner frame slots and components. Passing a boolean true to showResizing
     * enables the resizing, and false vice versa.
     */
    /* @ngInject */ ResizeComponentService.prototype.resizeComponents = function (showResizing) {
        var slots = this.yjQuery(this.componentHandlerService.getAllSlotsSelector());
        var components = this.yjQuery(this.componentHandlerService.getAllComponentsSelector());
        if (showResizing) {
            slots.addClass('ySEEmptySlot');
            components.addClass('se-storefront-component');
        }
        else {
            slots.removeClass('ySEEmptySlot');
            components.removeClass('se-storefront-component');
        }
    };
    ResizeComponentService.prototype.resizeComponents.$inject = ["showResizing"];
    /* @ngInject */ ResizeComponentService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(1, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [ComponentHandlerService, Function])
    ], /* @ngInject */ ResizeComponentService);
    return /* @ngInject */ ResizeComponentService;
}());

/**
 * Service aimed at determining the list of registered DOM elements that have been repositioned, regardless of how, since it was last queried
 */
var /* @ngInject */ PositionRegistry = /** @class */ (function () {
    PositionRegistry.$inject = ["yjQuery"];
    function /* @ngInject */ PositionRegistry(yjQuery) {
        this.yjQuery = yjQuery;
        this.positionRegistry = [];
    }
    /**
     * registers a given node in the repositioning registry
     */
    /* @ngInject */ PositionRegistry.prototype.register = function (element) {
        this.unregister(element);
        this.positionRegistry.push({
            element: element,
            position: this.calculatePositionHash(element)
        });
    };
    PositionRegistry.prototype.register.$inject = ["element"];
    /**
     * unregisters a given node from the repositioning registry
     */
    /* @ngInject */ PositionRegistry.prototype.unregister = function (element) {
        var entryToBeRemoved = this.positionRegistry.find(function (entry) { return entry.element === element; });
        var index = this.positionRegistry.indexOf(entryToBeRemoved);
        if (index > -1) {
            this.positionRegistry.splice(index, 1);
        }
    };
    PositionRegistry.prototype.unregister.$inject = ["element"];
    /**
     * Method returning the list of nodes having been repositioned since last query
     */
    /* @ngInject */ PositionRegistry.prototype.getRepositionedComponents = function () {
        var _this = this;
        return this.positionRegistry
            .filter(function (entry) {
            // to ignore elements that would keep showing here because of things like display table-inline
            return _this.yjQuery(entry.element).height() !== 0;
        })
            .filter(function (entry) {
            var element = entry.element;
            var newPosition = _this.calculatePositionHash(element);
            if (newPosition !== entry.position) {
                entry.position = newPosition;
                return true;
            }
            else {
                return false;
            }
        })
            .map(function (entry) { return entry.element; });
    };
    /**
     * unregisters all nodes and cleans up
     */
    /* @ngInject */ PositionRegistry.prototype.dispose = function () {
        this.positionRegistry = [];
    };
    /**
     * for e2e test purposes
     */
    /* @ngInject */ PositionRegistry.prototype._listenerCount = function () {
        return this.positionRegistry.length;
    };
    /* @ngInject */ PositionRegistry.prototype.floor = function (val) {
        return Math.floor(val * 100) / 100;
    };
    PositionRegistry.prototype.floor.$inject = ["val"];
    /* @ngInject */ PositionRegistry.prototype.calculatePositionHash = function (element) {
        var rootPosition = this.yjQuery('body')[0].getBoundingClientRect();
        var position = element.getBoundingClientRect();
        return (this.floor(position.top - rootPosition.top) +
            '_' +
            this.floor(position.left - rootPosition.left));
    };
    PositionRegistry.prototype.calculatePositionHash.$inject = ["element"];
    /* @ngInject */ PositionRegistry = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPositionRegistry),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function])
    ], /* @ngInject */ PositionRegistry);
    return /* @ngInject */ PositionRegistry;
}());

var /* @ngInject */ ResizeListener = /** @class */ (function () {
    function /* @ngInject */ ResizeListener() {
        var _this = this;
        this.resizeListenersRegistry = new Map();
        this._resizeObserver = new ResizeObserver(function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var element = entry.target;
                var registryElement = _this.resizeListenersRegistry.get(element);
                registryElement.listener();
            }
        });
    }
    /**
     * registers a resize listener of a given node
     */
    /* @ngInject */ ResizeListener.prototype.register = function (element, listener) {
        if (!this.resizeListenersRegistry.has(element)) {
            this.resizeListenersRegistry.set(element, { listener: listener });
            this._resizeObserver.observe(element);
        }
    };
    ResizeListener.prototype.register.$inject = ["element", "listener"];
    /**
     * unregisters listeners on all nodes and cleans up
     */
    /* @ngInject */ ResizeListener.prototype.dispose = function () {
        var _this = this;
        this.resizeListenersRegistry.forEach(function (entry, element) {
            _this.unregister(element);
        });
    };
    /**
     * unregisters the resize listener of a given node
     */
    /* @ngInject */ ResizeListener.prototype.unregister = function (element) {
        if (this.resizeListenersRegistry.has(element)) {
            this._resizeObserver.unobserve(element);
            this.resizeListenersRegistry.delete(element);
        }
    };
    ResizeListener.prototype.unregister.$inject = ["element"];
    /*
     * for test purposes
     */
    /* @ngInject */ ResizeListener.prototype._listenerCount = function () {
        return this.resizeListenersRegistry.size;
    };
    /* @ngInject */ ResizeListener = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IResizeListener),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ ResizeListener);
    return /* @ngInject */ ResizeListener;
}());

var /* @ngInject */ CatalogVersionPermissionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ CatalogVersionPermissionService, _super);
    function /* @ngInject */ CatalogVersionPermissionService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ CatalogVersionPermissionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ICatalogVersionPermissionService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ CatalogVersionPermissionService);
    return /* @ngInject */ CatalogVersionPermissionService;
}(smarteditcommons.ICatalogVersionPermissionService));

var COMPONENT_STATE;
(function (COMPONENT_STATE) {
    COMPONENT_STATE["ADDED"] = "added";
    COMPONENT_STATE["DESTROYED"] = "destroyed";
})(COMPONENT_STATE || (COMPONENT_STATE = {}));
/*
 * interval at which manual listening/checks are executed
 * So far it is only by repositionListener
 * (resizeListener delegates to a self-contained third-party library and DOM mutations observation is done in native MutationObserver)
 */
/* @internal */
var DEFAULT_REPROCESS_TIMEOUT = 100;
/* @internal */
var DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL = 250;
/* @internal */
var DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS = {
    // The root to use for intersection.
    // If not provided, use the top-level document’s viewport.
    root: null,
    // Same as margin, can be 1, 2, 3 or 4 components, possibly negative lengths.
    // If an explicit root element is specified, components may be percentages of the
    // root element size. If no explicit root element is specified, using a percentage
    // is an error.
    rootMargin: '1000px',
    // Threshold(s) at which to trigger callback, specified as a ratio, or list of
    // ratios, of (visible area / total area) of the observed element (hence all
    // entries must be in the range [0, 1]). Callback will be invoked when the visible
    // ratio of the observed element crosses a threshold in the list.
    threshold: 0
};
/* @internal */
var DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE = 500;
/* @internal */
var /* @ngInject */ SmartEditContractChangeListener = /** @class */ (function () {
    SmartEditContractChangeListener.$inject = ["yjQueryUtilsService", "componentHandlerService", "pageInfoService", "resizeListener", "positionRegistry", "logService", "yjQuery", "systemEventService", "polyfillService", "testModeService"];
    function /* @ngInject */ SmartEditContractChangeListener(yjQueryUtilsService, componentHandlerService, pageInfoService, resizeListener, positionRegistry, logService, yjQuery, systemEventService, polyfillService, testModeService) {
        var _this = this;
        this.yjQueryUtilsService = yjQueryUtilsService;
        this.componentHandlerService = componentHandlerService;
        this.pageInfoService = pageInfoService;
        this.resizeListener = resizeListener;
        this.positionRegistry = positionRegistry;
        this.logService = logService;
        this.yjQuery = yjQuery;
        this.systemEventService = systemEventService;
        this.polyfillService = polyfillService;
        this.testModeService = testModeService;
        /*
         * This is the configuration passed to the MutationObserver instance
         */
        this.MUTATION_OBSERVER_OPTIONS = {
            /*
             * enables observation of attribute mutations
             */
            attributes: true,
            /*
             * instruct the observer to keep in store the former values of the mutated attributes
             */
            attributeOldValue: true,
            /*
             * enables observation of addition and removal of nodes
             */
            childList: true,
            characterData: false,
            /*
             * enables recursive lookup without which only addition and removal of DIRECT children of the observed DOM root would be collected
             */
            subtree: true
        };
        /*
         * Component state values
         * 'added' when _componentsAddedCallback was called
         * 'destroyed' when _componentsRemovedCallback was called
         */
        this.enableExtendedView = false;
        /*
         * nullable callbacks provided to smartEditContractChangeListener for all the observed events
         */
        this._componentsAddedCallback = null;
        this._componentsRemovedCallback = null;
        this._componentResizedCallback = null;
        this._componentRepositionedCallback = null;
        this._onComponentChangedCallback = null;
        this._pageChangedCallback = null;
        this._throttledProcessQueue = lodash.throttle(function () { return _this._rawProcessQueue(); }, DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE);
        /*
         * Queue used to process components when intersecting the viewport
         * {Array.<{isIntersecting: Boolean, parent: DOMElement, processed: SmartEditContractChangeListener.COMPONENT_STATE}>}
         */
        this.componentsQueue = new Map();
        this.smartEditAttributeNames = [smarteditcommons.TYPE_ATTRIBUTE, smarteditcommons.ID_ATTRIBUTE, smarteditcommons.UUID_ATTRIBUTE];
    }
    /*
     * wrapping for test purposes
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype._newMutationObserver = function (callback) {
        return new MutationObserver(callback);
    };
    SmartEditContractChangeListener.prototype._newMutationObserver.$inject = ["callback"];
    /*
     * wrapping for test purposes
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype._newIntersectionObserver = function (callback) {
        return new IntersectionObserver(callback, DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS);
    };
    SmartEditContractChangeListener.prototype._newIntersectionObserver.$inject = ["callback"];
    /*
     * Add the given entry to the componentsQueue
     * The components in the queue are sorted according to their position in the DOM
     * so that the adding of components is done to have parents before children
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype._addToComponentQueue = function (entry) {
        var component = this.componentsQueue.get(entry.target);
        if (component) {
            component.isIntersecting = entry.isIntersecting;
        }
        else if (this.yjQueryUtilsService.isInDOM(entry.target)) {
            this.componentsQueue.set(entry.target, {
                component: entry.target,
                isIntersecting: entry.isIntersecting,
                processed: null,
                oldProcessedValue: null,
                parent: this.componentHandlerService.getParent(entry.target)[0]
            });
        }
    };
    SmartEditContractChangeListener.prototype._addToComponentQueue.$inject = ["entry"];
    /*
     * for e2e test purposes
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype._componentsQueueLength = function () {
        return this.componentsQueue.size;
    };
    /* @ngInject */ SmartEditContractChangeListener.prototype.isExtendedViewEnabled = function () {
        return this.enableExtendedView;
    };
    /**
     * Set the 'economyMode' to true for better performance.
     * In economyMode, resize/position listeners are not present, and the current economyMode value is passed to the add /remove callbacks.
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.setEconomyMode = function (_mode) {
        var _this = this;
        this.economyMode = _mode;
        if (!this.economyMode) {
            // reactivate
            Array.from(this.componentHandlerService.getFirstSmartEditComponentChildren(this.yjQuery('body'))).forEach(function (firstLevelComponent) {
                _this.applyToSelfAndAllChildren(firstLevelComponent, function (node) {
                    _this._registerSizeAndPositionListeners(node);
                });
            });
        }
    };
    SmartEditContractChangeListener.prototype.setEconomyMode.$inject = ["_mode"];
    /*
     * initializes and starts all Intersection/DOM listeners:
     * - Intersection of smartEditComponents with the viewport
     * - DOM mutations on smartEditComponents and page identifier (by Means of native MutationObserver)
     * - smartEditComponents repositioning (by means of querying, with an interval, the list of repositioned components from the positionRegistry)
     * - smartEditComponents resizing (by delegating to the injected resizeListener)
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.initListener = function () {
        var _this = this;
        this.enableExtendedView = this.polyfillService.isEligibleForExtendedView();
        try {
            this.pageInfoService.getPageUUID().then(function (pageUUID) {
                _this.currentPage = pageUUID;
                if (_this._pageChangedCallback) {
                    _this.executeCallback(_this._pageChangedCallback.bind(undefined, _this.currentPage));
                }
            });
        }
        catch (e) {
            // case when the page that has just loaded is an asynchronous one
        }
        this.systemEventService.subscribe(smarteditcommons.CONTRACT_CHANGE_LISTENER_PROCESS_EVENTS.RESTART_PROCESS, function () {
            _this._processQueue();
            return Promise.resolve();
        });
        // Intersection Observer not able to re-evaluate components that are not intersecting but going in and out of the extended viewport.
        if (this.enableExtendedView) {
            setInterval(function () {
                _this._processQueue();
            }, DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL);
        }
        this.mutationObserver = this._newMutationObserver(this.mutationObserverCallback.bind(this));
        this.mutationObserver.observe(document.body, this.MUTATION_OBSERVER_OPTIONS);
        // Intersection Observer is used to observe intersection of components with the viewport.
        // each time the 'isIntersecting' property of an entry (SmartEdit component) changes, the Intersection Callback is called.
        // we are using the componentsQueue to hold the components references and their isIntersecting value.
        this.intersectionObserver = this._newIntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                _this._addToComponentQueue(entry);
            });
            // A better approach would be to process each entry individually instead of processing the whole queue, but a bug Firefox v.55 prevent us to do so.
            _this._processQueue();
        });
        // Observing all SmartEdit components that are already in the page.
        // Note that when an element visible in the viewport is removed, the Intersection Callback is called so we don't need to use the Mutation Observe to observe the removal of Nodes.
        Array.from(this.componentHandlerService.getFirstSmartEditComponentChildren(this.yjQuery('body'))).forEach(function (firstLevelComponent) {
            _this.applyToSelfAndAllChildren(firstLevelComponent, _this.intersectionObserver.observe.bind(_this.intersectionObserver));
        });
        this._startExpendableListeners();
    };
    // Processing the queue with throttling in production to avoid scrolling lag when there is a lot of components in the page.
    // No throttling when e2e mode is active
    /* @ngInject */ SmartEditContractChangeListener.prototype._processQueue = function () {
        if (this.testModeService.isE2EMode() || smarteditcommons.functionsUtils.isUnitTestMode()) {
            this._rawProcessQueue();
        }
        else {
            this._throttledProcessQueue();
        }
    };
    /* @ngInject */ SmartEditContractChangeListener.prototype.isIntersecting = function (obj) {
        if (!this.yjQueryUtilsService.isInDOM(obj.component)) {
            return false;
        }
        return this.enableExtendedView
            ? this.yjQueryUtilsService.isInExtendedViewPort(obj.component)
            : obj.isIntersecting;
    };
    SmartEditContractChangeListener.prototype.isIntersecting.$inject = ["obj"];
    // for each component in the componentsQueue, we use the 'isIntersecting' and 'processed' values to add or remove it.
    // An intersecting component that was not already added is added, and a non intersecting component that was added is removed (happens when scrolling, resizing the page, zooming, opening dev-tools)
    // the 'PROCESS_COMPONENTS' promise is RESOLVED when the component can be added or removed, and it is REJECTED when the component can't be added but could be removed.
    /* @ngInject */ SmartEditContractChangeListener.prototype._rawProcessQueue = function () {
        var observedQueueArray = Array.from(this.componentsQueue.values());
        this.systemEventService
            .publish(smarteditcommons.CONTRACT_CHANGE_LISTENER_PROCESS_EVENTS.PROCESS_COMPONENTS, observedQueueArray.map(function (_a) {
            var component = _a.component;
            return component;
        }))
            .then(function (observedQueue, response) {
            var _this = this;
            var addedComponents = [];
            var removedComponents = [];
            var responseSet = new Set(response || []);
            observedQueue.forEach(function (obj) {
                if (!responseSet.has(obj.component)) {
                    return;
                }
                var processStatus = obj.component.dataset[smarteditcommons.SMARTEDIT_COMPONENT_PROCESS_STATUS];
                if (processStatus ===
                    smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.PROCESS) {
                    if (obj.processed !== COMPONENT_STATE.ADDED &&
                        _this.isIntersecting(obj)) {
                        addedComponents.push(obj);
                    }
                    else if (obj.processed === COMPONENT_STATE.ADDED &&
                        !_this.isIntersecting(obj)) {
                        removedComponents.push(obj);
                    }
                }
                else if (processStatus ===
                    smarteditcommons.CONTRACT_CHANGE_LISTENER_COMPONENT_PROCESS_STATUS.REMOVE) {
                    if (obj.processed === COMPONENT_STATE.ADDED) {
                        removedComponents.push(obj);
                    }
                }
                obj.oldProcessedValue = obj.processed;
            });
            addedComponents.forEach(function (queueObj) {
                queueObj.processed = COMPONENT_STATE.ADDED;
            });
            removedComponents.forEach(function (queueObj) {
                queueObj.processed = COMPONENT_STATE.DESTROYED;
            });
            // If the intersection observer returns multiple time the same components in the callback (happen when doing a drag and drop or sfBuilder.actions.rerenderComponent)
            // we will have these same components in BOTH addedComponents and removedComponents, hence we must first call _removeComponents and then _addComponents (in this order).
            if (removedComponents.length) {
                this._removeComponents(removedComponents);
            }
            if (addedComponents.length) {
                addedComponents.sort(smarteditcommons.nodeUtils.compareHTMLElementsPosition('component'));
                this._addComponents(addedComponents);
            }
            if (!this.economyMode) {
                lodash.chain(addedComponents.concat(removedComponents))
                    .filter(function (obj) {
                    return obj.oldProcessedValue === null ||
                        !_this.yjQueryUtilsService.isInDOM(obj.component);
                })
                    .map('parent')
                    .compact()
                    .uniq()
                    .value()
                    .forEach(function (parent) {
                    _this.repairParentResizeListener(parent);
                });
            }
        }.bind(this, observedQueueArray));
    };
    /* @ngInject */ SmartEditContractChangeListener.prototype._addComponents = function (componentsObj) {
        var _this = this;
        if (this._componentsAddedCallback) {
            this.executeCallback(this._componentsAddedCallback.bind(undefined, lodash.map(componentsObj, 'component'), this.economyMode));
        }
        if (!this.economyMode) {
            componentsObj
                .filter(function (queueObj) { return queueObj.oldProcessedValue === null; })
                .forEach(function (queueObj) {
                _this._registerSizeAndPositionListeners(queueObj.component);
            });
        }
    };
    SmartEditContractChangeListener.prototype._addComponents.$inject = ["componentsObj"];
    /* @ngInject */ SmartEditContractChangeListener.prototype._removeComponents = function (componentsObj, forceRemoval) {
        var _this = this;
        if (forceRemoval === void 0) { forceRemoval = false; }
        componentsObj
            .filter(function (queueObj) {
            return !_this.yjQueryUtilsService.isInDOM(queueObj.component) || forceRemoval;
        })
            .forEach(function (queueObj) {
            if (!_this.economyMode) {
                _this._unregisterSizeAndPositionListeners(queueObj.component);
            }
            _this.componentsQueue.delete(queueObj.component);
        });
        if (this._componentsRemovedCallback) {
            var removedComponents = componentsObj.map(function (obj) {
                return lodash.pick(obj, ['component', 'parent', 'oldAttributes']);
            });
            this.executeCallback(this._componentsRemovedCallback.bind(undefined, removedComponents, this.economyMode));
        }
    };
    SmartEditContractChangeListener.prototype._removeComponents.$inject = ["componentsObj", "forceRemoval"];
    /* @ngInject */ SmartEditContractChangeListener.prototype._registerSizeAndPositionListeners = function (component) {
        if (this._componentRepositionedCallback) {
            this.positionRegistry.register(component);
        }
        if (this._componentResizedCallback) {
            this.resizeListener.register(component, this._componentResizedCallback.bind(undefined, component));
        }
    };
    SmartEditContractChangeListener.prototype._registerSizeAndPositionListeners.$inject = ["component"];
    /* @ngInject */ SmartEditContractChangeListener.prototype._unregisterSizeAndPositionListeners = function (component) {
        if (this._componentRepositionedCallback) {
            this.positionRegistry.unregister(component);
        }
        if (this._componentResizedCallback) {
            this.resizeListener.unregister(component);
        }
    };
    SmartEditContractChangeListener.prototype._unregisterSizeAndPositionListeners.$inject = ["component"];
    /*
     * stops and clean up all listeners
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.stopListener = function () {
        // Stop listening for DOM mutations
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        this.intersectionObserver.disconnect();
        this.mutationObserver = null;
        this._stopExpendableListeners();
    };
    /* @ngInject */ SmartEditContractChangeListener.prototype._stopExpendableListeners = function () {
        // Stop listening for DOM resize
        this.resizeListener.dispose();
        // Stop listening for DOM repositioning
        if (this.repositionListener) {
            clearInterval(this.repositionListener);
            this.repositionListener = null;
        }
        this.positionRegistry.dispose();
    };
    /* @ngInject */ SmartEditContractChangeListener.prototype._startExpendableListeners = function () {
        var _this = this;
        if (this._componentRepositionedCallback) {
            this.repositionListener = setInterval(function () {
                _this.positionRegistry
                    .getRepositionedComponents()
                    .forEach(function (component) {
                    _this._componentRepositionedCallback(component);
                });
            }, DEFAULT_REPROCESS_TIMEOUT);
        }
    };
    /*
     * registers a unique callback to be executed every time a smarteditComponent node is added to the DOM
     * it is executed only once per subtree of smarteditComponent nodes being added
     * the callback is invoked with the root node of a subtree
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onComponentsAdded = function (callback) {
        this._componentsAddedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onComponentsAdded.$inject = ["callback"];
    /*
     * registers a unique callback to be executed every time a smarteditComponent node is removed from the DOM
     * it is executed only once per subtree of smarteditComponent nodes being removed
     * the callback is invoked with the root node of a subtree and its parent
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onComponentsRemoved = function (callback) {
        this._componentsRemovedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onComponentsRemoved.$inject = ["callback"];
    /*
     * registers a unique callback to be executed every time at least one of the smartEdit contract attributes of a smarteditComponent node is changed
     * the callback is invoked with the mutated node itself and the map of old attributes
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onComponentChanged = function (callback) {
        this._onComponentChangedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onComponentChanged.$inject = ["callback"];
    /*
     * registers a unique callback to be executed every time a smarteditComponent node is resized in the DOM
     * the callback is invoked with the resized node itself
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onComponentResized = function (callback) {
        this._componentResizedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onComponentResized.$inject = ["callback"];
    /*
     * registers a unique callback to be executed every time a smarteditComponent node is repositioned (as per Node.getBoundingClientRect()) in the DOM
     * the callback is invoked with the resized node itself
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onComponentRepositioned = function (callback) {
        this._componentRepositionedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onComponentRepositioned.$inject = ["callback"];
    /*
     * registers a unique callback to be executed:
     * - upon bootstrapping smartEdit IF the page identifier is available
     * - every time the page identifier is changed in the DOM (see pageInfoService.getPageUUID())
     * the callback is invoked with the new page identifier read from pageInfoService.getPageUUID()
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.onPageChanged = function (callback) {
        this._pageChangedCallback = callback;
    };
    SmartEditContractChangeListener.prototype.onPageChanged.$inject = ["callback"];
    /*
     * Method used in mutationObserverCallback that extracts from mutations the list of nodes added
     * The nodes are returned within a pair along with their nullable closest smartEditComponent parent
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.aggregateAddedOrRemovedNodesAndTheirParents = function (mutations, type) {
        var _this = this;
        var entries = mutations
            .filter(function (mutation) {
            // only keep mutations of type childList and [added/removed]Nodes
            return mutation.type === smarteditcommons.MUTATION_TYPES.CHILD_LIST.NAME &&
                mutation[type] &&
                mutation[type].length;
        })
            .map(function (mutation) {
            // the mutated child may not be smartEditComponent, in such case we return their first level smartEditComponent children
            var children = lodash.flatten(Array.from(mutation[type])
                .filter(function (node) { return node.nodeType === Node.ELEMENT_NODE; })
                .map(function (child) {
                return _this.componentHandlerService.isSmartEditComponent(child)
                    ? child
                    : Array.from(_this.componentHandlerService.getFirstSmartEditComponentChildren(child));
            }))
                .sort(smarteditcommons.nodeUtils.compareHTMLElementsPosition());
            // nodes are returned in pairs with their nullable parent
            var parent = _this.componentHandlerService.getClosestSmartEditComponent(mutation.target);
            return children.map(function (node) { return ({
                node: node,
                parent: parent.length ? parent[0] : null
            }); });
        });
        /*
         * Despite MutationObserver specifications it so happens that sometimes,
         * depending on the very way a parent node is added with its children,
         * parent AND children will appear in a same mutation. We then must only keep the parent
         * Since the parent will appear first, the filtering lodash.uniqWith will always return the parent as opposed to the child which is what we need
         */
        return lodash.uniqWith(lodash.flatten(entries), function (entry1, entry2) {
            return entry1.node.contains(entry2.node) || entry2.node.contains(entry1.node);
        });
    };
    SmartEditContractChangeListener.prototype.aggregateAddedOrRemovedNodesAndTheirParents.$inject = ["mutations", "type"];
    /*
     * Method used in mutationObserverCallback that extracts from mutations the list of nodes the attributes of which have changed
     * The nodes are returned within a pair along with their map of changed attributes
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.aggregateMutationsOnChangedAttributes = function (mutations) {
        var map = mutations.reduce(function (seed, mutation) {
            if (!(mutation.target &&
                mutation.target.nodeType === Node.ELEMENT_NODE &&
                mutation.type === smarteditcommons.MUTATION_TYPES.ATTRIBUTES.NAME)) {
                return seed;
            }
            var targetEntry = seed.get(mutation.target);
            if (!targetEntry) {
                targetEntry = {
                    node: mutation.target,
                    oldAttributes: {}
                };
                seed.set(mutation.target, targetEntry);
            }
            targetEntry.oldAttributes[mutation.attributeName] = mutation.oldValue;
            return seed;
        }, new Map());
        return Array.from(map.values());
    };
    SmartEditContractChangeListener.prototype.aggregateMutationsOnChangedAttributes.$inject = ["mutations"];
    /**
     * Verifies whether the entry is a smartedit complient element.
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.isSmarteditNode = function (entry) {
        return (this.componentHandlerService.isSmartEditComponent(entry.node) &&
            this.smartEditAttributeNames.some(function (attributeName) {
                return entry.node.hasAttribute(attributeName);
            }));
    };
    SmartEditContractChangeListener.prototype.isSmarteditNode.$inject = ["entry"];
    /**
     * Verifies whether at least one of the changed attributes is a smartedit attribute.
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.isSmarteditAttributeChanged = function (entry) {
        return this.smartEditAttributeNames.some(function (attributeName) {
            return entry.oldAttributes.hasOwnProperty(attributeName);
        });
    };
    SmartEditContractChangeListener.prototype.isSmarteditAttributeChanged.$inject = ["entry"];
    /**
     * Verifies whether the entry is not a smartedit element anymore.
     * It checks that all smartedit related attributes were removed and the
     * entry.node is still in the componentsQueue.
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.wasSmarteditNode = function (entry) {
        return (this.componentsQueue.has(entry.node) &&
            this.smartEditAttributeNames.every(function (attributeName) { return !entry.node.hasAttribute(attributeName); }));
    };
    SmartEditContractChangeListener.prototype.wasSmarteditNode.$inject = ["entry"];
    /*
     * Methods used in mutationObserverCallback that determines whether the smartEdit contract page identifier MAY have changed in the DOM
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.mutationsHasPageChange = function (mutations) {
        return mutations.find(function (mutation) {
            var element = mutation.target;
            return (mutation.type === smarteditcommons.MUTATION_TYPES.ATTRIBUTES.NAME &&
                element.tagName === 'BODY' &&
                mutation.attributeName === 'class');
        });
    };
    SmartEditContractChangeListener.prototype.mutationsHasPageChange.$inject = ["mutations"];
    /*
     * convenience method to invoke a callback on a node and recursively on all its smartEditComponent children
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.applyToSelfAndAllChildren = function (node, callback) {
        var _this = this;
        callback(node);
        Array.from(this.componentHandlerService.getFirstSmartEditComponentChildren(node)).forEach(function (component) {
            _this.applyToSelfAndAllChildren(component, callback);
        });
    };
    SmartEditContractChangeListener.prototype.applyToSelfAndAllChildren.$inject = ["node", "callback"];
    /* @ngInject */ SmartEditContractChangeListener.prototype.repairParentResizeListener = function (parent) {
        if (parent) {
            // the adding of a component is likely to destroy the DOM added by the resizeListener on the parent, it needs be restored
            /*
             * since the DOM hierarchy is processed in order, by the time we need repair the parent,
             * it has already been processed so we can rely on its process status to know whether it is eligible
             */
            var parentObj = this.componentsQueue.get(parent);
            if (parentObj &&
                parentObj.processed === COMPONENT_STATE.ADDED &&
                this.yjQueryUtilsService.isInDOM(parent)) {
                this._componentResizedCallback(parent);
            }
        }
    };
    SmartEditContractChangeListener.prototype.repairParentResizeListener.$inject = ["parent"];
    /*
     * when a callback is executed we make sure that angular is synchronized since it is occurring outside the life cycle
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.executeCallback = function (callback) {
        if (this.testModeService.isE2EMode() || smarteditcommons.functionsUtils.isUnitTestMode()) {
            callback();
        }
        else {
            setTimeout(function () { return callback(); }, 0);
        }
    };
    SmartEditContractChangeListener.prototype.executeCallback.$inject = ["callback"];
    /*
     * callback executed by the mutation observer every time mutations occur.
     * repositioning and resizing are not part of this except that every time a smartEditComponent is added,
     * it is registered within the positionRegistry and the resizeListener
     */
    /* @ngInject */ SmartEditContractChangeListener.prototype.mutationObserverCallback = function (mutations) {
        var _this = this;
        this.logService.debug(mutations);
        if (this._pageChangedCallback && this.mutationsHasPageChange(mutations)) {
            this.pageInfoService.getPageUUID().then(function (newPageUUID) {
                if (_this.currentPage !== newPageUUID) {
                    _this.executeCallback(_this._pageChangedCallback.bind(undefined, newPageUUID));
                }
                _this.currentPage = newPageUUID;
            });
        }
        if (this._componentsAddedCallback) {
            this.aggregateAddedOrRemovedNodesAndTheirParents(mutations, smarteditcommons.MUTATION_TYPES.CHILD_LIST.ADD_OPERATION).forEach(function (childAndParent) {
                _this.applyToSelfAndAllChildren(childAndParent.node, _this.intersectionObserver.observe.bind(_this.intersectionObserver));
            });
        }
        this.aggregateAddedOrRemovedNodesAndTheirParents(mutations, smarteditcommons.MUTATION_TYPES.CHILD_LIST.REMOVE_OPERATION).forEach(function (childAndParent) {
            _this.applyToSelfAndAllChildren(childAndParent.node, function (node) {
                var component = _this.componentsQueue.get(node);
                if (component) {
                    if (!_this.economyMode) {
                        _this.repairParentResizeListener(childAndParent.parent);
                    }
                    _this._removeComponents([
                        {
                            isIntersecting: false,
                            component: node,
                            parent: childAndParent.parent
                        }
                    ]);
                }
            });
        });
        if (this._onComponentChangedCallback) {
            // TODO: are we missing tests here?
            this.aggregateMutationsOnChangedAttributes(mutations).forEach(function (entry) {
                if (_this.isSmarteditAttributeChanged(entry)) {
                    if (_this.isSmarteditNode(entry)) {
                        var component = _this.componentsQueue.get(entry.node);
                        if (!component) {
                            // Newly created smartedit element should always be in the component queue. If the component was created from
                            // a simple div tag by adding smartedit attributes we need first to add the component to the queue even if the current
                            // operation is change. If the component is not added to the queue it won't be rendered cause during the change callback
                            // it sometimes won't be able to find a parent overlay (if it is outside of the viewport).
                            _this.applyToSelfAndAllChildren(entry.node, _this.intersectionObserver.observe.bind(_this.intersectionObserver));
                        }
                        else {
                            // the onComponentChanged is called with the mutated smartEditComponent subtree and the map of old attributes
                            _this.executeCallback(_this._onComponentChangedCallback.bind(undefined, entry.node, entry.oldAttributes));
                        }
                    }
                    else if (_this.wasSmarteditNode(entry)) {
                        _this.applyToSelfAndAllChildren(entry.node, _this.intersectionObserver.unobserve.bind(_this.intersectionObserver));
                        var parents = _this.componentHandlerService.getClosestSmartEditComponent(entry.node);
                        _this._removeComponents([
                            {
                                isIntersecting: false,
                                component: entry.node,
                                parent: parents.length ? parents[0] : null,
                                oldAttributes: entry.oldAttributes
                            }
                        ], true);
                    }
                }
            });
        }
    };
    SmartEditContractChangeListener.prototype.mutationObserverCallback.$inject = ["mutations"];
    /* @ngInject */ SmartEditContractChangeListener = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ISmartEditContractChangeListener),
        __param(6, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.JQueryUtilsService,
            ComponentHandlerService,
            smarteditcommons.IPageInfoService,
            smarteditcommons.IResizeListener,
            smarteditcommons.IPositionRegistry,
            smarteditcommons.LogService, Function, smarteditcommons.SystemEventService,
            smarteditcommons.PolyfillService,
            smarteditcommons.TestModeService])
    ], /* @ngInject */ SmartEditContractChangeListener);
    return /* @ngInject */ SmartEditContractChangeListener;
}());

/**
 * Module containing all the services shared within the smartedit application
 */
var /* @ngInject */ LegacySmarteditServicesModule = /** @class */ (function () {
    function /* @ngInject */ LegacySmarteditServicesModule() {
    }
    /* @ngInject */ LegacySmarteditServicesModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'coretemplates',
                'seConstantsModule',
                'functionsModule',
                'yLoDashModule',
                smarteditcommons.LegacySmarteditCommonsModule
            ],
            providers: [
                smarteditcommons.diNameUtils.makeValueProvider({ DEFAULT_REPROCESS_TIMEOUT: DEFAULT_REPROCESS_TIMEOUT }),
                smarteditcommons.diNameUtils.makeValueProvider({ DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL: DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL }),
                smarteditcommons.diNameUtils.makeValueProvider({
                    DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS: DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS
                }),
                smarteditcommons.diNameUtils.makeValueProvider({ DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE: DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE })
            ]
        })
    ], /* @ngInject */ LegacySmarteditServicesModule);
    return /* @ngInject */ LegacySmarteditServicesModule;
}());

var SmarteditServicesModule = /** @class */ (function () {
    function SmarteditServicesModule() {
    }
    SmarteditServicesModule = __decorate([
        core.NgModule({
            imports: [smarteditcommons.DragAndDropServiceModule, smarteditcommons.SmarteditCommonsModule],
            providers: [
                { provide: smarteditcommons.IPermissionService, useClass: PermissionService },
                DelegateRestService,
                RestServiceFactory,
                ResizeListener,
                SeNamespaceService,
                ContextualMenuService,
                ComponentHandlerService,
                ResizeComponentService,
                smarteditcommons.PriorityService,
                {
                    provide: smarteditcommons.IRestServiceFactory,
                    useClass: RestServiceFactory
                },
                {
                    provide: smarteditcommons.IRenderService,
                    useClass: RenderService
                },
                {
                    provide: smarteditcommons.ICatalogVersionPermissionService,
                    useClass: CatalogVersionPermissionService
                },
                {
                    provide: smarteditcommons.ISmartEditContractChangeListener,
                    useClass: SmartEditContractChangeListener
                },
                { provide: smarteditcommons.IPageInfoService, useClass: PageInfoService },
                {
                    provide: smarteditcommons.IResizeListener,
                    useClass: ResizeListener
                },
                {
                    provide: smarteditcommons.IPositionRegistry,
                    useClass: PositionRegistry
                },
                {
                    provide: smarteditcommons.IAnnouncementService,
                    useClass: AnnouncementService
                },
                {
                    provide: smarteditcommons.IPerspectiveService,
                    useClass: PerspectiveService
                },
                {
                    provide: smarteditcommons.IFeatureService,
                    useClass: FeatureService
                },
                {
                    provide: smarteditcommons.INotificationMouseLeaveDetectionService,
                    useClass: NotificationMouseLeaveDetectionService
                },
                {
                    provide: smarteditcommons.IWaitDialogService,
                    useClass: WaitDialogService
                },
                {
                    provide: smarteditcommons.IPreviewService,
                    useClass: PreviewService
                },
                {
                    provide: smarteditcommons.IDragAndDropCrossOrigin,
                    useClass: DragAndDropCrossOrigin
                },
                smarteditcommons.PolyfillService,
                {
                    provide: smarteditcommons.INotificationService,
                    useClass: NotificationService
                },
                smarteditcommons.moduleUtils.initialize(function (notificationMouseLeaveDetectionService) {
                    //
                }, [smarteditcommons.INotificationMouseLeaveDetectionService])
            ]
        })
    ], SmarteditServicesModule);
    return SmarteditServicesModule;
}());

var /* @ngInject */ ConfirmationModalService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ConfirmationModalService, _super);
    function /* @ngInject */ ConfirmationModalService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* @ngInject */ ConfirmationModalService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IConfirmationModalService),
        smarteditcommons.GatewayProxied()
    ], /* @ngInject */ ConfirmationModalService);
    return /* @ngInject */ ConfirmationModalService;
}(smarteditcommons.IConfirmationModalService));

var /* @ngInject */ SakExecutorService = /** @class */ (function () {
    SakExecutorService.$inject = ["decoratorService"];
    function /* @ngInject */ SakExecutorService(decoratorService) {
        this.decoratorService = decoratorService;
    }
    /* @ngInject */ SakExecutorService.prototype.wrapDecorators = function (projectedContent, element) {
        var _this = this;
        return this.decoratorService
            .getDecoratorsForComponent(element.getAttribute(smarteditcommons.TYPE_ATTRIBUTE), element.getAttribute(smarteditcommons.ID_ATTRIBUTE))
            .then(function (decorators) {
            var compiled = decorators.reduce(function (templateacc, decorator) {
                var decoratorSelector = lodash.kebabCase(decorator.replace('se.', ''));
                var decoratorClass = lodash.camelCase(decorator.replace('se.', ''));
                var decoratorElement = document.createElement(decoratorSelector);
                decoratorElement.className = decoratorClass + " se-decorator-wrap";
                // To display slot menu need 32px, if there is not enough space it should be display at the slot bottom
                if (decoratorSelector === 'slot-contextual-menu' &&
                    element.style.position === 'absolute' &&
                    parseInt(element.style.top, 10) < 32) {
                    decoratorElement.setAttribute('show-at-bottom', 'true');
                }
                decoratorElement.setAttribute('active', 'false');
                decoratorElement.setAttribute('component-attributes', 'componentAttributes');
                decoratorElement.appendChild(templateacc);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-element-uuid', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-component-id', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-component-uuid', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-component-type', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-catalog-version-uuid', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-container-id', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-container-uuid', element);
                _this.setAttributeOn(decoratorElement, 'data-smartedit-container-type', element);
                return decoratorElement;
            }, projectedContent);
            return compiled;
        });
    };
    SakExecutorService.prototype.wrapDecorators.$inject = ["projectedContent", "element"];
    /* @ngInject */ SakExecutorService.prototype.setAttributeOn = function (decorator, attributeName, element) {
        var value = element.getAttribute(attributeName);
        if (value) {
            decorator.setAttribute(attributeName, value);
        }
    };
    SakExecutorService.prototype.setAttributeOn.$inject = ["decorator", "attributeName", "element"];
    /* @ngInject */ SakExecutorService = __decorate([
        smarteditcommons.SeDowngradeService()
        /* @internal */
        ,
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.IDecoratorService])
    ], /* @ngInject */ SakExecutorService);
    return /* @ngInject */ SakExecutorService;
}());

var ContextualMenuItemMode;
(function (ContextualMenuItemMode) {
    ContextualMenuItemMode["Small"] = "small";
    ContextualMenuItemMode["Compact"] = "compact";
})(ContextualMenuItemMode || (ContextualMenuItemMode = {}));
window.__smartedit__.addDecoratorPayload("Component", "ContextualMenuItemComponent", {
    selector: 'se-contextual-menu-item',
    template: "<div *ngIf=\"mode === 'small'\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\" class=\"se-ctx-menu-element__btn {{itemConfig.displayIconClass}} {{itemConfig.displayClass}}\" [ngClass]=\"{'is-active': itemConfig.isOpen }\" [title]=\"itemConfig.i18nKey | translate\"></div><div *ngIf=\"mode === 'compact'\" class=\"se-ctx-menu-element__label {{itemConfig.displayClass}}\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\">{{itemConfig.i18nKey | translate}}</div>"
});
var /* @ngInject */ ContextualMenuItemComponent = /** @class */ (function () {
    ContextualMenuItemComponent.$inject = ["element"];
    function /* @ngInject */ ContextualMenuItemComponent(element) {
        this.element = element;
        this.modes = [
            ContextualMenuItemMode.Small,
            ContextualMenuItemMode.Compact
        ];
    }
    /* @ngInject */ ContextualMenuItemComponent.prototype.ngOnInit = function () {
        this.classes = "cmsx-ctx__icon-more--small " + this.itemConfig.displayClass;
        this.validateInput();
        if (this.itemConfig.action && this.itemConfig.action.callbacks) {
            this.setupListeners();
        }
    };
    /* @ngInject */ ContextualMenuItemComponent.prototype.ngOnDestroy = function () {
        this.removeListeners();
    };
    /* @ngInject */ ContextualMenuItemComponent.prototype.validateInput = function () {
        if (typeof this.mode !== 'string' || this.modes.indexOf(this.mode) === -1) {
            throw new Error('Error initializing contextualMenuItem - unknown mode');
        }
    };
    /* @ngInject */ ContextualMenuItemComponent.prototype.removeListeners = function () {
        var _this = this;
        Object.keys(this.listeners || {}).forEach(function (key) {
            _this.element.nativeElement.removeEventListener(key, _this.listeners[key]);
        });
    };
    /* @ngInject */ ContextualMenuItemComponent.prototype.setupListeners = function () {
        var _this = this;
        var _a = this.componentAttributes, smarteditComponentType = _a.smarteditComponentType, smarteditComponentId = _a.smarteditComponentId, smarteditComponentUuid = _a.smarteditComponentUuid, smarteditContainerType = _a.smarteditContainerType, smarteditContainerId = _a.smarteditContainerId;
        var _b = this.slotAttributes, smarteditSlotId = _b.smarteditSlotId, smarteditSlotUuid = _b.smarteditSlotUuid;
        var config = {
            componentType: smarteditComponentType,
            componentId: smarteditComponentId,
            componentUuid: smarteditComponentUuid,
            containerType: smarteditContainerType,
            containerId: smarteditContainerId,
            componentAttributes: this.componentAttributes,
            slotId: smarteditSlotId,
            slotUuid: smarteditSlotUuid
        };
        this.listeners = Object.keys(this.itemConfig.action.callbacks).reduce(function (acc, key) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[key] = function () { return _this.itemConfig.action.callbacks[key](config); }, _a)));
        }, {});
        Object.keys(this.listeners).forEach(function (key) {
            _this.element.nativeElement.addEventListener(key, function () { return _this.listeners[key](); });
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ ContextualMenuItemComponent.prototype, "mode", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], /* @ngInject */ ContextualMenuItemComponent.prototype, "index", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ContextualMenuItemComponent.prototype, "componentAttributes", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ContextualMenuItemComponent.prototype, "slotAttributes", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ContextualMenuItemComponent.prototype, "itemConfig", void 0);
    /* @ngInject */ ContextualMenuItemComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-contextual-menu-item',
            template: "<div *ngIf=\"mode === 'small'\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\" class=\"se-ctx-menu-element__btn {{itemConfig.displayIconClass}} {{itemConfig.displayClass}}\" [ngClass]=\"{'is-active': itemConfig.isOpen }\" [title]=\"itemConfig.i18nKey | translate\"></div><div *ngIf=\"mode === 'compact'\" class=\"se-ctx-menu-element__label {{itemConfig.displayClass}}\" id=\"{{itemConfig.i18nKey | translate}}-{{componentAttributes.smarteditComponentId}}-{{componentAttributes.smarteditComponentType}}-{{index}}\">{{itemConfig.i18nKey | translate}}</div>"
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], /* @ngInject */ ContextualMenuItemComponent);
    return /* @ngInject */ ContextualMenuItemComponent;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditServicesModule
 *
 * IMPORANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* forbiddenNameSpaces angular.module:false */
var deprecatedSince1811 = function () {
    angular.module('permissionServiceModule', ['legacySmarteditServicesModule']);
};
function deprecatedSince1905() {
    angular.module('alertServiceModule', ['legacySmarteditServicesModule']);
    angular.module('decoratorServiceModule', ['legacySmarteditServicesModule']);
    angular.module('renderServiceModule', ['legacySmarteditServicesModule']);
    angular.module('renderServiceInterfaceModule', ['legacySmarteditServicesModule']);
}
function deprecatedSince2005() {
    angular.module('confirmationModalServiceModule', ['legacySmarteditServicesModule']);
    angular.module('smarteditServicesModule', ['legacySmarteditServicesModule']);
    angular.module('pageSensitiveDirectiveModule', ['legacySmartedit']);
    angular.module('toolbarModule', ['legacySmarteditServicesModule']);
    angular.module('contextualMenuItemModule', ['legacySmartedit']);
    angular.module('contextualMenuDecoratorModule', ['legacySmartedit']);
    angular.module('positionRegistryModule', ['legacySmarteditServicesModule']);
    angular.module('slotContextualMenuDecoratorModule', ['legacySmartedit']);
    angular.module('resizeListenerModule', ['legacySmarteditServicesModule']);
    angular.module('sanitizeHtmlInputModule', ['legacySmartedit']);
    angular.module('catalogVersionPermissionModule', ['legacySmarteditServicesModule']);
}
var deprecate = function () {
    deprecatedSince1811();
    deprecatedSince1905();
    deprecatedSince2005();
};

var /* @ngInject */ HtmlDirective = /** @class */ (function () {
    HtmlDirective.$inject = ["$element"];
    function /* @ngInject */ HtmlDirective($element) {
        this.$element = $element;
    }
    /* @ngInject */ HtmlDirective.prototype.$postLink = function () {
        this.$element.addClass('smartedit-html-container');
    };
    /* @ngInject */ HtmlDirective = __decorate([
        smarteditcommons.SeDirective({
            selector: 'html'
        }),
        __metadata("design:paramtypes", [Object])
    ], /* @ngInject */ HtmlDirective);
    return /* @ngInject */ HtmlDirective;
}());

var /* @ngInject */ SystemModule = /** @class */ (function () {
    function /* @ngInject */ SystemModule() {
    }
    /* @ngInject */ SystemModule = __decorate([
        smarteditcommons.SeModule({
            imports: [LegacySmarteditServicesModule]
        })
    ], /* @ngInject */ SystemModule);
    return /* @ngInject */ SystemModule;
}());

var BaseContextualMenuComponent = /** @class */ (function () {
    function BaseContextualMenuComponent() {
        this.active = false;
        this.status = {
            isopen: false
        };
        this.remainOpenMap = {};
    }
    BaseContextualMenuComponent.prototype.isHybrisIcon = function (icon) {
        return icon && icon.indexOf('hyicon') >= 0;
    };
    /*
     setRemainOpen receives a key name and a boolean value
     the button name needs to be unique across all buttons so it won' t collide with other button actions.
     */
    BaseContextualMenuComponent.prototype.setRemainOpen = function (key, remainOpen) {
        this.remainOpenMap[key] = remainOpen;
    };
    BaseContextualMenuComponent.prototype.showOverlay = function () {
        var _this = this;
        if (this.active === true) {
            return true;
        }
        return Object.keys(this.remainOpenMap).reduce(function (isOpen, key) { return isOpen || _this.remainOpenMap[key]; }, false);
    };
    return BaseContextualMenuComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "MoreItemsComponent", {
    selector: 'se-more-items-component',
    template: "\n        <div class=\"se-contextual-more-menu fd-menu\">\n            <ul\n                id=\"{{ parent.smarteditComponentId }}-{{ parent.smarteditComponentType }}-more-menu\"\n                class=\"fd-menu__list se-contextual-more-menu__list\"\n            >\n                <li\n                    *ngFor=\"let item of parent.getItems().moreMenuItems; let $index = index\"\n                    [attr.data-smartedit-id]=\"parent.smarteditComponentId\"\n                    [attr.data-smartedit-type]=\"parent.smarteditComponentType\"\n                    class=\"se-contextual-more-menu__item\"\n                    [ngClass]=\"item.customCss\"\n                >\n                    <se-popup-overlay\n                        [popupOverlay]=\"parent.itemTemplateOverlayWrapper\"\n                        [popupOverlayTrigger]=\"parent.shouldShowTemplate(item)\"\n                        [popupOverlayData]=\"{ item: item }\"\n                        (popupOverlayOnShow)=\"parent.onShowItemPopup(item)\"\n                        (popupOverlayOnHide)=\"parent.onHideItemPopup(false)\"\n                    >\n                        <se-contextual-menu-item\n                            [mode]=\"'compact'\"\n                            [index]=\"$index\"\n                            [componentAttributes]=\"parent.componentAttributes\"\n                            [slotAttributes]=\"parent.slotAttributes\"\n                            [itemConfig]=\"item\"\n                            (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                            [attr.data-component-id]=\"parent.smarteditComponentId\"\n                            [attr.data-component-uuid]=\"\n                                parent.componentAttributes.smarteditComponentUuid\n                            \"\n                            [attr.data-component-type]=\"parent.smarteditComponentType\"\n                            [attr.data-slot-id]=\"parent.smarteditSlotId\"\n                            [attr.data-slot-uuid]=\"parent.smarteditSlotUuid\"\n                            [attr.data-container-id]=\"parent.smarteditContainerId\"\n                            [attr.data-container-type]=\"parent.smarteditContainerType\"\n                        >\n                        </se-contextual-menu-item>\n                    </se-popup-overlay>\n                </li>\n            </ul>\n        </div>\n    "
});
var MoreItemsComponent = /** @class */ (function () {
    function MoreItemsComponent(parent) {
        this.parent = parent;
    }
    MoreItemsComponent = __decorate([
        core.Component({
            selector: 'se-more-items-component',
            template: "\n        <div class=\"se-contextual-more-menu fd-menu\">\n            <ul\n                id=\"{{ parent.smarteditComponentId }}-{{ parent.smarteditComponentType }}-more-menu\"\n                class=\"fd-menu__list se-contextual-more-menu__list\"\n            >\n                <li\n                    *ngFor=\"let item of parent.getItems().moreMenuItems; let $index = index\"\n                    [attr.data-smartedit-id]=\"parent.smarteditComponentId\"\n                    [attr.data-smartedit-type]=\"parent.smarteditComponentType\"\n                    class=\"se-contextual-more-menu__item\"\n                    [ngClass]=\"item.customCss\"\n                >\n                    <se-popup-overlay\n                        [popupOverlay]=\"parent.itemTemplateOverlayWrapper\"\n                        [popupOverlayTrigger]=\"parent.shouldShowTemplate(item)\"\n                        [popupOverlayData]=\"{ item: item }\"\n                        (popupOverlayOnShow)=\"parent.onShowItemPopup(item)\"\n                        (popupOverlayOnHide)=\"parent.onHideItemPopup(false)\"\n                    >\n                        <se-contextual-menu-item\n                            [mode]=\"'compact'\"\n                            [index]=\"$index\"\n                            [componentAttributes]=\"parent.componentAttributes\"\n                            [slotAttributes]=\"parent.slotAttributes\"\n                            [itemConfig]=\"item\"\n                            (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                            [attr.data-component-id]=\"parent.smarteditComponentId\"\n                            [attr.data-component-uuid]=\"\n                                parent.componentAttributes.smarteditComponentUuid\n                            \"\n                            [attr.data-component-type]=\"parent.smarteditComponentType\"\n                            [attr.data-slot-id]=\"parent.smarteditSlotId\"\n                            [attr.data-slot-uuid]=\"parent.smarteditSlotUuid\"\n                            [attr.data-container-id]=\"parent.smarteditContainerId\"\n                            [attr.data-container-type]=\"parent.smarteditContainerType\"\n                        >\n                        </se-contextual-menu-item>\n                    </se-popup-overlay>\n                </li>\n            </ul>\n        </div>\n    "
        }),
        __param(0, core.Inject(core.forwardRef(function () { return ContextualMenuDecoratorComponent; }))),
        __metadata("design:paramtypes", [ContextualMenuDecoratorComponent])
    ], MoreItemsComponent);
    return MoreItemsComponent;
}());
window.__smartedit__.addDecoratorPayload("Component", "ContextualMenuItemOverlayComponent", {
    template: "\n        <div\n            *ngIf=\"item.action.template || item.action.templateUrl || item.action.component\"\n            class=\"se-contextual-extra-menu\"\n        >\n            <!-- AngularJS -->\n\n            <div *ngIf=\"item.action.template\">\n                <div\n                    [seCompileHtml]=\"item.action.template\"\n                    [compileHtmlNgController]=\"legacyController\"\n                ></div>\n            </div>\n            <div *ngIf=\"item.action.templateUrl\">\n                <div\n                    [ngInclude]=\"item.action.templateUrl\"\n                    [compileHtmlNgController]=\"legacyController\"\n                ></div>\n            </div>\n\n            <!-- Angular -->\n\n            <ng-container *ngIf=\"item.action.component\">\n                <ng-container *ngComponentOutlet=\"item.action.component\"></ng-container>\n            </ng-container>\n        </div>\n    ",
    selector: 'se-contextual-menu-item-overlay'
});
var ContextualMenuItemOverlayComponent = /** @class */ (function () {
    function ContextualMenuItemOverlayComponent(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    ContextualMenuItemOverlayComponent.prototype.ngOnInit = function () {
        this.createLegacyController();
    };
    Object.defineProperty(ContextualMenuItemOverlayComponent.prototype, "item", {
        get: function () {
            return this.data.item;
        },
        enumerable: false,
        configurable: true
    });
    ContextualMenuItemOverlayComponent.prototype.createLegacyController = function () {
        var _this = this;
        this.legacyController = {
            alias: 'ctrl',
            value: function () { return _this.parent; }
        };
    };
    ContextualMenuItemOverlayComponent = __decorate([
        core.Component({
            template: "\n        <div\n            *ngIf=\"item.action.template || item.action.templateUrl || item.action.component\"\n            class=\"se-contextual-extra-menu\"\n        >\n            <!-- AngularJS -->\n\n            <div *ngIf=\"item.action.template\">\n                <div\n                    [seCompileHtml]=\"item.action.template\"\n                    [compileHtmlNgController]=\"legacyController\"\n                ></div>\n            </div>\n            <div *ngIf=\"item.action.templateUrl\">\n                <div\n                    [ngInclude]=\"item.action.templateUrl\"\n                    [compileHtmlNgController]=\"legacyController\"\n                ></div>\n            </div>\n\n            <!-- Angular -->\n\n            <ng-container *ngIf=\"item.action.component\">\n                <ng-container *ngComponentOutlet=\"item.action.component\"></ng-container>\n            </ng-container>\n        </div>\n    ",
            selector: 'se-contextual-menu-item-overlay'
        }),
        __param(0, core.Inject(smarteditcommons.POPUP_OVERLAY_DATA)),
        __param(1, core.Inject(core.forwardRef(function () { return ContextualMenuDecoratorComponent; }))),
        __metadata("design:paramtypes", [Object, ContextualMenuDecoratorComponent])
    ], ContextualMenuItemOverlayComponent);
    return ContextualMenuItemOverlayComponent;
}());
window.__smartedit__.addDecoratorPayload("Component", "ContextualMenuDecoratorComponent", {
    selector: 'contextual-menu',
    template: "<div class=\"se-ctx-menu-decorator-wrapper\" [ngClass]=\"{'se-ctx-menu-decorator__border--visible': showContextualMenuBorders()}\"><div class=\"se-ctx-menu__overlay\" *ngIf=\"showOverlay() || status.isopen\"><div class=\"se-ctx-menu__overlay__left-section\" *ngIf=\"getItems()\"><div *ngFor=\"let item of getItems().leftMenuItems; let $index = index\" id=\"{{ item.key }}\"><se-popup-overlay [popupOverlay]=\"itemTemplateOverlayWrapper\" [popupOverlayTrigger]=\"shouldShowTemplate(item)\" [popupOverlayData]=\"{ item: item }\" (popupOverlayOnShow)=\"onShowItemPopup(item)\" (popupOverlayOnHide)=\"onHideItemPopup(false)\"><se-contextual-menu-item [mode]=\"'small'\" [index]=\"$index\" [componentAttributes]=\"componentAttributes\" [slotAttributes]=\"slotAttributes\" [itemConfig]=\"item\" (click)=\"triggerMenuItemAction(item, $event)\" [attr.data-component-id]=\"smarteditComponentId\" [attr.data-component-uuid]=\"componentAttributes.smarteditComponentUuid\" [attr.data-component-type]=\"smarteditComponentType\" [attr.data-slot-id]=\"smarteditSlotId\" [attr.data-slot-uuid]=\"smarteditSlotUuid\" [attr.data-container-id]=\"smarteditContainerId\" [attr.data-container-type]=\"smarteditContainerType\"></se-contextual-menu-item></se-popup-overlay></div></div><se-popup-overlay [popupOverlay]=\"moreMenuPopupConfig\" [popupOverlayTrigger]=\"moreMenuIsOpen\" (popupOverlayOnShow)=\"onShowMoreMenuPopup()\" (popupOverlayOnHide)=\"onHideMoreMenuPopup()\"><div *ngIf=\"getItems() && getItems().moreMenuItems.length > 0\" class=\"se-ctx-menu-element__btn se-ctx-menu-element__btn--more\" [ngClass]=\"{'se-ctx-menu-element__btn--more--open': moreMenuIsOpen }\" (click)=\"toggleMoreMenu()\"><span [title]=\"moreButton.i18nKey | translate\" class=\"{{moreButton.displayClass}}\"></span></div></se-popup-overlay></div><div class=\"se-wrapper-data\"><div><ng-content></ng-content></div></div></div>"
});
var ContextualMenuDecoratorComponent = /** @class */ (function (_super) {
    __extends(ContextualMenuDecoratorComponent, _super);
    function ContextualMenuDecoratorComponent(yjQuery, element, contextualMenuService, systemEventService, componentHandlerService, nodeUtils) {
        var _this = _super.call(this) || this;
        _this.yjQuery = yjQuery;
        _this.element = element;
        _this.contextualMenuService = contextualMenuService;
        _this.systemEventService = systemEventService;
        _this.componentHandlerService = componentHandlerService;
        _this.nodeUtils = nodeUtils;
        _this.openItem = null;
        _this.moreMenuIsOpen = false;
        _this.itemTemplateOverlayWrapper = {
            component: ContextualMenuItemOverlayComponent
        };
        _this.moreMenuPopupConfig = {
            component: MoreItemsComponent,
            halign: 'left'
        };
        _this.moreButton = {
            displayClass: 'sap-icon--overflow',
            i18nKey: 'se.cms.contextmenu.title.more'
        };
        _this.oldWidth = null;
        return _this;
    }
    Object.defineProperty(ContextualMenuDecoratorComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (_active) {
            if (typeof _active === 'string') {
                this._active = _active === 'true';
            }
            else {
                this._active = _active;
            }
        },
        enumerable: false,
        configurable: true
    });
    ContextualMenuDecoratorComponent.prototype.ngDoCheck = function () {
        if (this.element) {
            var width = this.element.nativeElement.offsetWidth;
            if (this.oldWidth !== width) {
                this.oldWidth = width;
                this.ngOnDestroy();
                this.onInit();
            }
        }
    };
    ContextualMenuDecoratorComponent.prototype.ngOnDestroy = function () {
        if (this.dndUnRegFn) {
            this.dndUnRegFn();
        }
        if (this.unregisterRefreshItems) {
            this.unregisterRefreshItems();
        }
    };
    ContextualMenuDecoratorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentAttributes = this.nodeUtils.collectSmarteditAttributesByElementUuid(this.smarteditElementUuid);
        this.slotAttributes = {
            smarteditSlotId: this.smarteditSlotId,
            smarteditSlotUuid: this.smarteditSlotUuid
        };
        this.onInit();
        this.contextualMenuService.onContextualMenuItemsAdded
            .pipe(operators.filter(function (type) { return type === _this.smarteditComponentType; }))
            .subscribe(function (type) { return _this.updateItems(); });
    };
    Object.defineProperty(ContextualMenuDecoratorComponent.prototype, "smarteditSlotId", {
        get: function () {
            return this.componentHandlerService.getParentSlotForComponent(this.element.nativeElement);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextualMenuDecoratorComponent.prototype, "smarteditSlotUuid", {
        get: function () {
            return this.componentHandlerService.getParentSlotUuidForComponent(this.element.nativeElement);
        },
        enumerable: false,
        configurable: true
    });
    ContextualMenuDecoratorComponent.prototype.onInit = function () {
        var _this = this;
        this.updateItems();
        this.dndUnRegFn = this.systemEventService.subscribe(smarteditcommons.CLOSE_CTX_MENU, function () {
            return _this.hideAllPopups();
        });
        this.unregisterRefreshItems = this.systemEventService.subscribe(smarteditcommons.REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT, function () { return _this.updateItems; });
    };
    ContextualMenuDecoratorComponent.prototype.toggleMoreMenu = function () {
        this.moreMenuIsOpen = !this.moreMenuIsOpen;
    };
    ContextualMenuDecoratorComponent.prototype.shouldShowTemplate = function (menuItem) {
        return this.displayedItem === menuItem;
    };
    ContextualMenuDecoratorComponent.prototype.onShowItemPopup = function (item) {
        this.setRemainOpen('someContextualPopupOverLay', true);
        this.openItem = item;
        this.openItem.isOpen = true;
    };
    ContextualMenuDecoratorComponent.prototype.onHideItemPopup = function (hideMoreMenu) {
        if (this.openItem) {
            this.openItem.isOpen = false;
            this.openItem = null;
        }
        this.displayedItem = null;
        this.setRemainOpen('someContextualPopupOverLay', false);
        if (hideMoreMenu) {
            this.onHideMoreMenuPopup();
        }
    };
    ContextualMenuDecoratorComponent.prototype.onShowMoreMenuPopup = function () {
        this.setRemainOpen('someContextualPopupOverLay', true);
    };
    ContextualMenuDecoratorComponent.prototype.onHideMoreMenuPopup = function () {
        this.moreMenuIsOpen = false;
        this.setRemainOpen('someContextualPopupOverLay', false);
    };
    ContextualMenuDecoratorComponent.prototype.hideAllPopups = function () {
        this.onHideMoreMenuPopup();
        this.onHideItemPopup();
    };
    ContextualMenuDecoratorComponent.prototype.getItems = function () {
        return this.items;
    };
    ContextualMenuDecoratorComponent.prototype.showContextualMenuBorders = function () {
        return this.active && this.items && this.items.leftMenuItems.length > 0;
    };
    ContextualMenuDecoratorComponent.prototype.triggerMenuItemAction = function (item, $event) {
        $event.stopPropagation();
        $event.preventDefault();
        if (item.action.template || item.action.templateUrl || item.action.component) {
            if (this.displayedItem === item) {
                this.displayedItem = null;
            }
            else {
                this.displayedItem = item;
            }
        }
        else if (item.action.callback) {
            this.hideAllPopups();
            item.action.callback({
                componentType: this.smarteditComponentType,
                componentId: this.smarteditComponentId,
                containerType: this.smarteditContainerType,
                containerId: this.smarteditContainerId,
                componentAttributes: this.componentAttributes,
                slotId: this.smarteditSlotId,
                slotUuid: this.smarteditSlotUuid,
                element: this.yjQuery(this.element.nativeElement)
            }, $event);
        }
    };
    ContextualMenuDecoratorComponent.prototype.maxContextualMenuItems = function () {
        var ctxSize = 50;
        var buttonMaxCapacity = Math.round(this.yjQuery(this.element.nativeElement).width() / ctxSize) - 1;
        var leftButtons = buttonMaxCapacity >= 4 ? 3 : buttonMaxCapacity - 1;
        leftButtons = leftButtons < 0 ? 0 : leftButtons;
        return leftButtons;
    };
    ContextualMenuDecoratorComponent.prototype.updateItems = function () {
        var _this = this;
        this.contextualMenuService
            .getContextualMenuItems({
            componentType: this.smarteditComponentType,
            componentId: this.smarteditComponentId,
            containerType: this.smarteditContainerType,
            containerId: this.smarteditContainerId,
            componentAttributes: this.componentAttributes,
            iLeftBtns: this.maxContextualMenuItems(),
            element: this.yjQuery(this.element.nativeElement)
        })
            .then(function (newItems) {
            _this.items = newItems;
        });
    };
    __decorate([
        core.Input('data-smartedit-component-type'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditComponentType", void 0);
    __decorate([
        core.Input('data-smartedit-component-id'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditComponentId", void 0);
    __decorate([
        core.Input('data-smartedit-container-type'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditContainerType", void 0);
    __decorate([
        core.Input('data-smartedit-container-id'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditContainerId", void 0);
    __decorate([
        core.Input('data-smartedit-catalog-version-uuid'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditCatalogVersionUuid", void 0);
    __decorate([
        core.Input('data-smartedit-element-uuid'),
        __metadata("design:type", String)
    ], ContextualMenuDecoratorComponent.prototype, "smarteditElementUuid", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], ContextualMenuDecoratorComponent.prototype, "componentAttributes", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ContextualMenuDecoratorComponent.prototype, "active", null);
    ContextualMenuDecoratorComponent = __decorate([
        smarteditcommons.SeCustomComponent(),
        core.Component({
            selector: 'contextual-menu',
            template: "<div class=\"se-ctx-menu-decorator-wrapper\" [ngClass]=\"{'se-ctx-menu-decorator__border--visible': showContextualMenuBorders()}\"><div class=\"se-ctx-menu__overlay\" *ngIf=\"showOverlay() || status.isopen\"><div class=\"se-ctx-menu__overlay__left-section\" *ngIf=\"getItems()\"><div *ngFor=\"let item of getItems().leftMenuItems; let $index = index\" id=\"{{ item.key }}\"><se-popup-overlay [popupOverlay]=\"itemTemplateOverlayWrapper\" [popupOverlayTrigger]=\"shouldShowTemplate(item)\" [popupOverlayData]=\"{ item: item }\" (popupOverlayOnShow)=\"onShowItemPopup(item)\" (popupOverlayOnHide)=\"onHideItemPopup(false)\"><se-contextual-menu-item [mode]=\"'small'\" [index]=\"$index\" [componentAttributes]=\"componentAttributes\" [slotAttributes]=\"slotAttributes\" [itemConfig]=\"item\" (click)=\"triggerMenuItemAction(item, $event)\" [attr.data-component-id]=\"smarteditComponentId\" [attr.data-component-uuid]=\"componentAttributes.smarteditComponentUuid\" [attr.data-component-type]=\"smarteditComponentType\" [attr.data-slot-id]=\"smarteditSlotId\" [attr.data-slot-uuid]=\"smarteditSlotUuid\" [attr.data-container-id]=\"smarteditContainerId\" [attr.data-container-type]=\"smarteditContainerType\"></se-contextual-menu-item></se-popup-overlay></div></div><se-popup-overlay [popupOverlay]=\"moreMenuPopupConfig\" [popupOverlayTrigger]=\"moreMenuIsOpen\" (popupOverlayOnShow)=\"onShowMoreMenuPopup()\" (popupOverlayOnHide)=\"onHideMoreMenuPopup()\"><div *ngIf=\"getItems() && getItems().moreMenuItems.length > 0\" class=\"se-ctx-menu-element__btn se-ctx-menu-element__btn--more\" [ngClass]=\"{'se-ctx-menu-element__btn--more--open': moreMenuIsOpen }\" (click)=\"toggleMoreMenu()\"><span [title]=\"moreButton.i18nKey | translate\" class=\"{{moreButton.displayClass}}\"></span></div></se-popup-overlay></div><div class=\"se-wrapper-data\"><div><ng-content></ng-content></div></div></div>"
        }),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function, core.ElementRef,
            smarteditcommons.IContextualMenuService,
            smarteditcommons.SystemEventService,
            ComponentHandlerService,
            smarteditcommons.NodeUtils])
    ], ContextualMenuDecoratorComponent);
    return ContextualMenuDecoratorComponent;
}(BaseContextualMenuComponent));

window.__smartedit__.addDecoratorPayload("Component", "SlotContextualMenuDecoratorComponent", {
    selector: 'slot-contextual-menu',
    template: "<div class=\"se-decorative-panel-wrapper\"><ng-container *ngIf=\"showOverlay() && !showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><div class=\"se-decoratorative-body-area\"><div class=\"se-decorative-body__padding--left\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-decorative-body__inner-border\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-wrapper-data\" [ngClass]=\"{ 'active': active }\"><ng-content></ng-content></div><div class=\"se-decorative-body__padding--right\" [ngClass]=\"{ 'active': active }\"></div></div><ng-container *ngIf=\"showOverlay() && showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><ng-template #decorativePanelArea><div class=\"se-decorative-panel-area\" [ngStyle]=\"showAtBottom && { 'margin-top': '0px' }\"><span class=\"se-decorative-panel__title\">{{smarteditComponentId}}</span><div class=\"se-decorative-panel__slot-contextual-menu\"><slot-contextual-menu-item [item]=\"item\" *ngFor=\"let item of items\"></slot-contextual-menu-item></div></div></ng-template></div>"
});
var SlotContextualMenuDecoratorComponent = /** @class */ (function (_super) {
    __extends(SlotContextualMenuDecoratorComponent, _super);
    function SlotContextualMenuDecoratorComponent(element, yjQuery, systemEventService, contextualMenuService, nodeUtils) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.yjQuery = yjQuery;
        _this.systemEventService = systemEventService;
        _this.contextualMenuService = contextualMenuService;
        _this.nodeUtils = nodeUtils;
        _this.oldRightMostOffsetFromPage = null;
        _this.maxContextualMenuItems = 3;
        _this.showAtBottom = _this.element.nativeElement.getAttribute('show-at-bottom') || false;
        var THROTTLE_DELAY = 200;
        _this.positionPanelHorizontally = lodash.throttle(function () { return _this.positionPanelHorizontally(); }, THROTTLE_DELAY);
        _this.positionPanelVertically = lodash.throttle(function () { return _this.positionPanelVertically(); }, THROTTLE_DELAY);
        _this.hidePadding = lodash.throttle(_this.hidePadding, THROTTLE_DELAY);
        return _this;
    }
    Object.defineProperty(SlotContextualMenuDecoratorComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (_active) {
            this._active = _active === 'true';
        },
        enumerable: false,
        configurable: true
    });
    SlotContextualMenuDecoratorComponent.prototype.ngOnChanges = function (changes) {
        if (changes.active) {
            this.hidePadding();
            if (this.active) {
                this.positionPanelVertically();
                this.positionPanelHorizontally();
            }
        }
    };
    SlotContextualMenuDecoratorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentAttributes = this.nodeUtils.collectSmarteditAttributesByElementUuid(this.smarteditElementUuid);
        this.updateItems();
        this.showSlotMenuUnregFn = this.systemEventService.subscribe(this.smarteditComponentId + smarteditcommons.SHOW_SLOT_MENU, function (eventId, slotId) {
            _this.remainOpenMap.slotMenuButton = true;
            _this.positionPanelVertically();
            _this.positionPanelHorizontally();
        });
        this.hideSlotMenuUnregFn = this.systemEventService.subscribe(smarteditcommons.HIDE_SLOT_MENU, function () {
            if (_this.remainOpenMap.slotMenuButton) {
                delete _this.remainOpenMap.slotMenuButton;
            }
            _this.hidePadding();
        });
        this.refreshContextualMenuUnregFn = this.systemEventService.subscribe(smarteditcommons.REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT, function () { return _this.updateItems(); });
        this.contextualMenuService.onContextualMenuItemsAdded
            .pipe(operators.filter(function (type) { return type === _this.smarteditComponentType; }))
            .subscribe(function () { return _this.updateItems(); });
    };
    SlotContextualMenuDecoratorComponent.prototype.ngDoCheck = function () {
        var rightMostOffsetFromPage = this.getRightMostOffsetFromPage();
        if (this.active &&
            !isNaN(rightMostOffsetFromPage) &&
            rightMostOffsetFromPage !== this.oldRightMostOffsetFromPage) {
            this.oldRightMostOffsetFromPage = rightMostOffsetFromPage;
            this.positionPanelHorizontally(rightMostOffsetFromPage);
        }
    };
    SlotContextualMenuDecoratorComponent.prototype.ngOnDestroy = function () {
        if (this.showSlotMenuUnregFn) {
            this.showSlotMenuUnregFn();
        }
        if (this.hideSlotMenuUnregFn) {
            this.hideSlotMenuUnregFn();
        }
        if (this.refreshContextualMenuUnregFn) {
            this.refreshContextualMenuUnregFn();
        }
        if (this.hideSlotUnSubscribeFn) {
            this.hideSlotUnSubscribeFn();
        }
        if (this.showSlotUnSubscribeFn) {
            this.showSlotUnSubscribeFn();
        }
    };
    SlotContextualMenuDecoratorComponent.prototype.updateItems = function () {
        var _this = this;
        this.contextualMenuService
            .getContextualMenuItems({
            componentType: this.smarteditComponentType,
            componentId: this.smarteditComponentId,
            containerType: this.smarteditContainerType,
            containerId: this.smarteditContainerId,
            componentAttributes: this.componentAttributes,
            iLeftBtns: this.maxContextualMenuItems,
            element: this.yjQuery(this.element.nativeElement)
        })
            .then(function (newItems) {
            _this.items = __spreadArrays(newItems.leftMenuItems, newItems.moreMenuItems);
        });
    };
    SlotContextualMenuDecoratorComponent.prototype.triggerMenuItemAction = function (item, $event) {
        item.action.callback({
            componentType: this.smarteditComponentType,
            componentId: this.smarteditComponentId,
            containerType: this.smarteditContainerType,
            containerId: this.smarteditContainerId,
            componentAttributes: this.componentAttributes,
            slotId: this.smarteditSlotId,
            slotUuid: this.smarteditSlotUuid,
            element: this.yjQuery(this.element.nativeElement)
        }, $event);
    };
    SlotContextualMenuDecoratorComponent.prototype.hidePadding = function () {
        this.yjQuery(this.element.nativeElement)
            .find('.se-decorative-body__padding--left')
            .css('display', 'none');
        this.yjQuery(this.element.nativeElement)
            .find('.se-decorative-body__padding--right')
            .css('display', 'none');
    };
    SlotContextualMenuDecoratorComponent.prototype.getRightMostOffsetFromPage = function () {
        var $decorativePanel = this.yjQuery(this.element.nativeElement).find('.se-decorative-panel-area');
        return this.yjQuery(this.element.nativeElement).offset().left + $decorativePanel.width();
    };
    SlotContextualMenuDecoratorComponent.prototype.positionPanelHorizontally = function (rightMostOffsetFromPage) {
        var $decorativePanel = this.yjQuery(this.element.nativeElement).find('.se-decorative-panel-area');
        rightMostOffsetFromPage =
            rightMostOffsetFromPage !== undefined
                ? rightMostOffsetFromPage
                : this.getRightMostOffsetFromPage();
        var isOnLeft = rightMostOffsetFromPage >= this.yjQuery('body').width();
        if (isOnLeft) {
            var offset = $decorativePanel.outerWidth() -
                this.yjQuery(this.element.nativeElement).find('.se-wrapper-data').width();
            $decorativePanel.css('margin-left', -offset);
            this.yjQuery(this.element.nativeElement)
                .find('.se-decorative-body__padding--left')
                .css('margin-left', -offset);
        }
        this.hidePadding();
        this.yjQuery(this.element.nativeElement)
            .find(isOnLeft
            ? '.se-decorative-body__padding--left'
            : '.se-decorative-body__padding--right')
            .css('display', 'flex');
    };
    SlotContextualMenuDecoratorComponent.prototype.positionPanelVertically = function () {
        var decorativePanelArea = this.yjQuery(this.element.nativeElement).find('.se-decorative-panel-area');
        var decoratorPaddingContainer = this.yjQuery(this.element.nativeElement).find('.se-decoratorative-body-area');
        var marginTop;
        var height = decorativePanelArea.height();
        if (this.yjQuery(this.element.nativeElement).offset().top <= height) {
            var borderOffset = 6;
            marginTop = decoratorPaddingContainer.height() + borderOffset;
            decoratorPaddingContainer.css('margin-top', -(marginTop + height));
        }
        else {
            marginTop = -32;
        }
        decorativePanelArea.css('margin-top', marginTop);
    };
    __decorate([
        core.Input('data-smartedit-component-type'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditComponentType", void 0);
    __decorate([
        core.Input('data-smartedit-component-id'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditComponentId", void 0);
    __decorate([
        core.Input('data-smartedit-container-type'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditContainerType", void 0);
    __decorate([
        core.Input('data-smartedit-container-id'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditContainerId", void 0);
    __decorate([
        core.Input('data-smartedit-slot-id'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditSlotId", void 0);
    __decorate([
        core.Input('data-smartedit-slot-uuid'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditSlotUuid", void 0);
    __decorate([
        core.Input('data-smartedit-catalog-version-uuid'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditCatalogVersionUuid", void 0);
    __decorate([
        core.Input('data-smartedit-element-uuid'),
        __metadata("design:type", String)
    ], SlotContextualMenuDecoratorComponent.prototype, "smarteditElementUuid", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SlotContextualMenuDecoratorComponent.prototype, "componentAttributes", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SlotContextualMenuDecoratorComponent.prototype, "active", null);
    SlotContextualMenuDecoratorComponent = __decorate([
        smarteditcommons.SeCustomComponent(),
        core.Component({
            selector: 'slot-contextual-menu',
            template: "<div class=\"se-decorative-panel-wrapper\"><ng-container *ngIf=\"showOverlay() && !showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><div class=\"se-decoratorative-body-area\"><div class=\"se-decorative-body__padding--left\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-decorative-body__inner-border\" [ngClass]=\"{ 'active': active }\"></div><div class=\"se-wrapper-data\" [ngClass]=\"{ 'active': active }\"><ng-content></ng-content></div><div class=\"se-decorative-body__padding--right\" [ngClass]=\"{ 'active': active }\"></div></div><ng-container *ngIf=\"showOverlay() && showAtBottom\"><ng-container *ngTemplateOutlet=\"decorativePanelArea\"></ng-container></ng-container><ng-template #decorativePanelArea><div class=\"se-decorative-panel-area\" [ngStyle]=\"showAtBottom && { 'margin-top': '0px' }\"><span class=\"se-decorative-panel__title\">{{smarteditComponentId}}</span><div class=\"se-decorative-panel__slot-contextual-menu\"><slot-contextual-menu-item [item]=\"item\" *ngFor=\"let item of items\"></slot-contextual-menu-item></div></div></ng-template></div>"
        }),
        __param(1, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [core.ElementRef, Function, smarteditcommons.SystemEventService,
            smarteditcommons.IContextualMenuService,
            smarteditcommons.NodeUtils])
    ], SlotContextualMenuDecoratorComponent);
    return SlotContextualMenuDecoratorComponent;
}(BaseContextualMenuComponent));

window.__smartedit__.addDecoratorPayload("Component", "SlotContextualMenuItemComponent", {
    selector: 'slot-contextual-menu-item',
    template: "\n        <div *ngIf=\"!item.action.templateUrl || !item.action.component\">\n            <span\n                *ngIf=\"item.iconIdle && parent.isHybrisIcon(item.displayClass)\"\n                id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                    parent.smarteditComponentType\n                }}-hyicon\"\n                (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                [ngClass]=\"{ clickable: true }\"\n            >\n                <img\n                    [src]=\"isHovered ? item.iconNonIdle : item.iconIdle\"\n                    id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                        parent.smarteditComponentType\n                    }}-hyicon-img\"\n                    title=\"{{ item.i18nKey | translate }}\"\n                />\n            </span>\n            <img\n                [title]=\"item.i18nKey | translate\"\n                *ngIf=\"item.iconIdle && !parent.isHybrisIcon(item.displayClass)\"\n                [ngClass]=\"{ clickable: true }\"\n                (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                [src]=\"isHovered ? item.iconNonIdle : item.iconIdle\"\n                [alt]=\"item.i18nKey\"\n                class=\"{{ item.displayClass }}\"\n                id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                    parent.smarteditComponentType\n                }}\"\n            />\n        </div>\n\n        <!-- AngularJS -->\n\n        <div *ngIf=\"item.action.templateUrl\">\n            <div\n                [ngInclude]=\"item.action.templateUrl\"\n                [compileHtmlNgController]=\"legacyController\"\n            ></div>\n        </div>\n\n        <!-- Angular -->\n\n        <div *ngIf=\"item.action.component\">\n            <ng-container *ngComponentOutlet=\"item.action.component\"></ng-container>\n        </div>\n    "
});
var SlotContextualMenuItemComponent = /** @class */ (function () {
    function SlotContextualMenuItemComponent(parent) {
        this.parent = parent;
    }
    SlotContextualMenuItemComponent.prototype.onMouseOver = function () {
        this.isHovered = true;
    };
    SlotContextualMenuItemComponent.prototype.onMouseOut = function () {
        this.isHovered = false;
    };
    SlotContextualMenuItemComponent.prototype.ngOnInit = function () {
        this.createLegacyController();
    };
    SlotContextualMenuItemComponent.prototype.ngOnChanges = function () {
        this.createLegacyController();
    };
    SlotContextualMenuItemComponent.prototype.createLegacyController = function () {
        var _this = this;
        this.legacyController = {
            alias: 'ctrl',
            value: function () { return _this.parent; }
        };
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SlotContextualMenuItemComponent.prototype, "item", void 0);
    __decorate([
        core.HostListener('mouseover'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SlotContextualMenuItemComponent.prototype, "onMouseOver", null);
    __decorate([
        core.HostListener('mouseout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SlotContextualMenuItemComponent.prototype, "onMouseOut", null);
    SlotContextualMenuItemComponent = __decorate([
        core.Component({
            selector: 'slot-contextual-menu-item',
            template: "\n        <div *ngIf=\"!item.action.templateUrl || !item.action.component\">\n            <span\n                *ngIf=\"item.iconIdle && parent.isHybrisIcon(item.displayClass)\"\n                id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                    parent.smarteditComponentType\n                }}-hyicon\"\n                (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                [ngClass]=\"{ clickable: true }\"\n            >\n                <img\n                    [src]=\"isHovered ? item.iconNonIdle : item.iconIdle\"\n                    id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                        parent.smarteditComponentType\n                    }}-hyicon-img\"\n                    title=\"{{ item.i18nKey | translate }}\"\n                />\n            </span>\n            <img\n                [title]=\"item.i18nKey | translate\"\n                *ngIf=\"item.iconIdle && !parent.isHybrisIcon(item.displayClass)\"\n                [ngClass]=\"{ clickable: true }\"\n                (click)=\"parent.triggerMenuItemAction(item, $event)\"\n                [src]=\"isHovered ? item.iconNonIdle : item.iconIdle\"\n                [alt]=\"item.i18nKey\"\n                class=\"{{ item.displayClass }}\"\n                id=\"{{ item.i18nKey | translate }}-{{ parent.smarteditComponentId }}-{{\n                    parent.smarteditComponentType\n                }}\"\n            />\n        </div>\n\n        <!-- AngularJS -->\n\n        <div *ngIf=\"item.action.templateUrl\">\n            <div\n                [ngInclude]=\"item.action.templateUrl\"\n                [compileHtmlNgController]=\"legacyController\"\n            ></div>\n        </div>\n\n        <!-- Angular -->\n\n        <div *ngIf=\"item.action.component\">\n            <ng-container *ngComponentOutlet=\"item.action.component\"></ng-container>\n        </div>\n    "
        }),
        __param(0, core.Inject(core.forwardRef(function () { return SlotContextualMenuDecoratorComponent; }))),
        __metadata("design:paramtypes", [SlotContextualMenuDecoratorComponent])
    ], SlotContextualMenuItemComponent);
    return SlotContextualMenuItemComponent;
}());

deprecate();
_static.setAngularJSGlobal(angular);
var /* @ngInject */ LegacySmartedit = /** @class */ (function () {
    function /* @ngInject */ LegacySmartedit() {
    }
    /* @ngInject */ LegacySmartedit = __decorate([
        smarteditcommons.SeModule({
            imports: [
                LegacySmarteditServicesModule,
                'templateCacheDecoratorModule',
                'ui.bootstrap',
                'ui.select',
                SystemModule
            ],
            declarations: [HtmlDirective, smarteditcommons.PageSensitiveDirective],
            config: ["$provide", "readObjectStructureFactory", "$logProvider", function ($provide, readObjectStructureFactory, $logProvider) {
                'ngInject';
                smarteditcommons.instrument($provide, readObjectStructureFactory(), 'smartedit');
                $logProvider.debugEnabled(false);
            }]
        })
    ], /* @ngInject */ LegacySmartedit);
    return /* @ngInject */ LegacySmartedit;
}());

window.__smartedit__.addDecoratorPayload("Component", "SmarteditComponent", {
    selector: smarteditcommons.SMARTEDIT_COMPONENT_NAME,
    template: ""
});
var SmarteditComponent = /** @class */ (function () {
    function SmarteditComponent(elementRef, upgrade, injector, angularJSBootstrapIndicatorService) {
        this.elementRef = elementRef;
        this.upgrade = upgrade;
        this.angularJSBootstrapIndicatorService = angularJSBootstrapIndicatorService;
        smarteditcommons.registerCustomComponents(injector);
    }
    SmarteditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!smarteditcommons.nodeUtils.hasLegacyAngularJSBootsrap()) {
            var e2ePlaceHolderTagName = 'e2e-placeholder';
            if (document.querySelector(e2ePlaceHolderTagName)) {
                document.querySelector(e2ePlaceHolderTagName).childNodes.forEach(function (childNode) {
                    if (childNode.nodeType === Node.ELEMENT_NODE) {
                        _this.elementRef.nativeElement.appendChild(childNode);
                    }
                });
            }
            this.upgrade.bootstrap(this.elementRef.nativeElement, [LegacySmartedit.moduleName], { strictDi: false });
            this.angularJSBootstrapIndicatorService.setSmarteditReady();
        }
    };
    SmarteditComponent = __decorate([
        core.Component({
            selector: smarteditcommons.SMARTEDIT_COMPONENT_NAME,
            template: ""
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            _static.UpgradeModule,
            core.Injector,
            smarteditcommons.AngularJSBootstrapIndicatorService])
    ], SmarteditComponent);
    return SmarteditComponent;
}());

var smarteditElementComponentSelector = 'smartedit-element';
window.__smartedit__.addDecoratorPayload("Component", "SmarteditElementComponent", {
    selector: smarteditElementComponentSelector,
    template: " <div id=\"projectedContent\"><ng-content></ng-content></div> "
});
var SmarteditElementComponent = /** @class */ (function () {
    function SmarteditElementComponent(elementRef, sakExecutorService, systemEventService, crossFrameEventService, polyfillService) {
        var _this = this;
        this.elementRef = elementRef;
        this.sakExecutorService = sakExecutorService;
        this.systemEventService = systemEventService;
        this.crossFrameEventService = crossFrameEventService;
        this.polyfillService = polyfillService;
        this.active = false;
        this.componentDecoratorEnabled = true;
        this.removeDecorators = function () {
            // removing previous content of placeHolder
            if (_this.bundle && _this.element.contains(_this.bundle)) {
                _this.element.removeChild(_this.bundle);
            }
            _this.bundle = _this.projectedContent;
            _this.element.appendChild(_this.bundle);
        };
        this.appendDecorators = function () {
            // removing previous content of placeHolder
            if (_this.bundle && _this.element.contains(_this.bundle)) {
                _this.element.removeChild(_this.bundle);
            }
            _this.sakExecutorService
                .wrapDecorators(_this.projectedContent, _this.element)
                .then(function (bundle) {
                _this.bundle = bundle;
                _this.element.appendChild(_this.bundle);
            });
        };
        this.propagateActiveStateToChildren = function () {
            _this.element.querySelectorAll('[active]').forEach(function (element) {
                if (_this.uuid === _this.getUuid(element)) {
                    element.setAttribute('active', _this.active + '');
                }
            });
        };
    }
    SmarteditElementComponent.prototype.ngOnInit = function () {
        var projectedContentWrapper = this.element.querySelector('#projectedContent');
        this.projectedContent = projectedContentWrapper.children[0];
        this.element.removeChild(projectedContentWrapper);
        this.appendDecorators();
    };
    SmarteditElementComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mousenterListener = function (event) {
            if (!_this.active) {
                _this.active = _this.componentDecoratorEnabled;
                _this.propagateActiveStateToChildren();
            }
        };
        this.mouseleaveListener = function (event) {
            if (_this.active) {
                _this.active = false;
                _this.propagateActiveStateToChildren();
            }
        };
        // Register Event Listeners
        this.element.addEventListener('mouseenter', this.mousenterListener);
        this.element.addEventListener('mouseleave', this.mouseleaveListener);
        this.unregisterPerspectiveChangeEvent = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_CHANGED, function (eventId, notPreview) {
            notPreview && _this.appendDecorators();
        });
        this.unregisterPerspectiveRefreshedEvent = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_REFRESHED, function (eventId, notPreview) {
            notPreview && _this.appendDecorators();
        });
        this.unregisterComponentUpdatedEvent = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_SMARTEDIT_COMPONENT_UPDATED, this.onComponentUpdated.bind(this));
        // we can't listen to these events in the controller because they could be sent before the component compilation.
        this.unregisterDnDStart = this.systemEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_START, function (eventId, smarteditComponentClosestToDraggedElement) {
            if (_this.polyfillService.isEligibleForEconomyMode() &&
                smarteditComponentClosestToDraggedElement &&
                _this.uuid ===
                    smarteditComponentClosestToDraggedElement.attr(smarteditcommons.ELEMENT_UUID_ATTRIBUTE)) {
                _this.componentDecoratorEnabled = false;
                _this.removeDecorators();
            }
        });
        this.unregisterDnDEnd = this.systemEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_END, function () {
            if (_this.polyfillService.isEligibleForEconomyMode()) {
                _this.componentDecoratorEnabled = true;
                _this.appendDecorators();
            }
        });
    };
    SmarteditElementComponent.prototype.ngOnDestroy = function () {
        this.removeDecorators();
        this.unregisterPerspectiveChangeEvent();
        this.unregisterPerspectiveRefreshedEvent();
        this.unregisterComponentUpdatedEvent();
        this.unregisterDnDEnd();
        this.unregisterDnDStart();
        this.element.removeEventListener('mouseenter', this.mousenterListener);
        this.element.removeEventListener('mouseleave', this.mouseleaveListener);
        delete this.bundle;
    };
    SmarteditElementComponent.prototype.onComponentUpdated = function (eventId, componentUpdatedData) {
        var requiresReplayingDecorators = componentUpdatedData && componentUpdatedData.requiresReplayingDecorators;
        var isCurrentComponent = componentUpdatedData &&
            componentUpdatedData.componentId === this.smarteditComponentId &&
            componentUpdatedData.componentType === this.smarteditComponentType;
        if (isCurrentComponent && requiresReplayingDecorators) {
            this.appendDecorators();
        }
    };
    SmarteditElementComponent.prototype.getUuid = function (element) {
        return element.getAttribute(smarteditcommons.ELEMENT_UUID_ATTRIBUTE);
    };
    Object.defineProperty(SmarteditElementComponent.prototype, "uuid", {
        get: function () {
            return this.element.getAttribute(smarteditcommons.ELEMENT_UUID_ATTRIBUTE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SmarteditElementComponent.prototype, "element", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core.Input('data-smartedit-component-id'),
        __metadata("design:type", String)
    ], SmarteditElementComponent.prototype, "smarteditComponentId", void 0);
    __decorate([
        core.Input('data-smartedit-component-uuid'),
        __metadata("design:type", String)
    ], SmarteditElementComponent.prototype, "smarteditComponentUuid", void 0);
    __decorate([
        core.Input('data-smartedit-component-type'),
        __metadata("design:type", String)
    ], SmarteditElementComponent.prototype, "smarteditComponentType", void 0);
    __decorate([
        core.Input('data-smartedit-container-id'),
        __metadata("design:type", String)
    ], SmarteditElementComponent.prototype, "smarteditContainerId", void 0);
    __decorate([
        core.Input('data-smartedit-container-type'),
        __metadata("design:type", String)
    ], SmarteditElementComponent.prototype, "smarteditContainerType", void 0);
    SmarteditElementComponent = __decorate([
        smarteditcommons.SeCustomComponent(),
        core.Component({
            selector: smarteditElementComponentSelector,
            template: " <div id=\"projectedContent\"><ng-content></ng-content></div> "
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            SakExecutorService,
            smarteditcommons.SystemEventService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.PolyfillService])
    ], SmarteditElementComponent);
    return SmarteditElementComponent;
}());

/** @internal */
var /* @ngInject */ StorageGateway = /** @class */ (function () {
    function /* @ngInject */ StorageGateway() {
    }
    /* @ngInject */ StorageGateway.prototype.handleStorageRequest = function (storageConfiguration, method, args) {
        'proxyFunction';
        return null;
    };
    StorageGateway.prototype.handleStorageRequest.$inject = ["storageConfiguration", "method", "args"];
    /* @ngInject */ StorageGateway = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageGateway),
        smarteditcommons.GatewayProxied('handleStorageRequest')
    ], /* @ngInject */ StorageGateway);
    return /* @ngInject */ StorageGateway;
}());

/** @internal */
var StorageProxy = /** @class */ (function () {
    function StorageProxy(configuration, storageGateway) {
        this.configuration = configuration;
        this.storageGateway = storageGateway;
    }
    StorageProxy.prototype.clear = function () {
        return this.storageGateway.handleStorageRequest(this.configuration, 'clear', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.dispose = function () {
        return this.storageGateway.handleStorageRequest(this.configuration, 'dispose', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.entries = function () {
        return this.storageGateway.handleStorageRequest(this.configuration, 'entries', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.find = function (queryObject) {
        return this.storageGateway.handleStorageRequest(this.configuration, 'find', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.get = function (queryObject) {
        return this.storageGateway.handleStorageRequest(this.configuration, 'get', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.getLength = function () {
        return this.storageGateway.handleStorageRequest(this.configuration, 'getLength', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.put = function (obj, queryObject) {
        return this.storageGateway.handleStorageRequest(this.configuration, 'put', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.remove = function (queryObject) {
        return this.storageGateway.handleStorageRequest(this.configuration, 'remove', this.arrayFromArguments(arguments));
    };
    StorageProxy.prototype.arrayFromArguments = function (args) {
        return Array.prototype.slice.call(args);
    };
    return StorageProxy;
}());

/** @internal */
var /* @ngInject */ StorageManagerGateway = /** @class */ (function () {
    StorageManagerGateway.$inject = ["$log", "storageGateway"];
    function /* @ngInject */ StorageManagerGateway($log, storageGateway) {
        this.$log = $log;
        this.storageGateway = storageGateway;
    }
    /**
     * Disabled for inner app, due not to being able to pass storage controller instances across the gateway
     * @param {IStorageController} controller
     */
    /* @ngInject */ StorageManagerGateway.prototype.registerStorageController = function (controller) {
        throw new Error("registerStorageController() is not supported from the smartedit (inner) application, please register controllers from smarteditContainer");
    };
    StorageManagerGateway.prototype.registerStorageController.$inject = ["controller"];
    /* @ngInject */ StorageManagerGateway.prototype.getStorage = function (storageConfiguration) {
        var _this = this;
        var errMsg = "Unable to get storage " + storageConfiguration.storageId;
        return new Promise(function (resolve, reject) {
            _this.getStorageSanitityCheck(storageConfiguration).then(function (createdSuccessfully) {
                if (createdSuccessfully) {
                    resolve(new StorageProxy(storageConfiguration, _this.storageGateway));
                }
                else {
                    _this.$log.error(errMsg);
                    reject(errMsg);
                }
            }, function (result) {
                _this.$log.error(errMsg);
                _this.$log.error(result);
                reject(errMsg);
            });
        });
    };
    StorageManagerGateway.prototype.getStorage.$inject = ["storageConfiguration"];
    // =============================================
    // ============= PROXIED METHODS ===============
    // =============================================
    /* @ngInject */ StorageManagerGateway.prototype.deleteExpiredStorages = function (force) {
        'proxyFunction';
        return undefined;
    };
    StorageManagerGateway.prototype.deleteExpiredStorages.$inject = ["force"];
    /* @ngInject */ StorageManagerGateway.prototype.deleteStorage = function (storageId, force) {
        'proxyFunction';
        return undefined;
    };
    StorageManagerGateway.prototype.deleteStorage.$inject = ["storageId", "force"];
    /* @ngInject */ StorageManagerGateway.prototype.getStorageSanitityCheck = function (storageConfiguration) {
        'proxyFunction';
        return undefined;
    };
    StorageManagerGateway.prototype.getStorageSanitityCheck.$inject = ["storageConfiguration"];
    /* @ngInject */ StorageManagerGateway.prototype.hasStorage = function (storageId) {
        'proxyFunction';
        return false;
    };
    StorageManagerGateway.prototype.hasStorage.$inject = ["storageId"];
    /* @ngInject */ StorageManagerGateway = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageManagerGateway),
        smarteditcommons.GatewayProxied('getStorageSanitityCheck', 'deleteExpiredStorages', 'deleteStorage', 'hasStorage'),
        __metadata("design:paramtypes", [smarteditcommons.LogService, smarteditcommons.IStorageGateway])
    ], /* @ngInject */ StorageManagerGateway);
    return /* @ngInject */ StorageManagerGateway;
}());

var StorageModule = /** @class */ (function () {
    function StorageModule() {
    }
    StorageModule = __decorate([
        core.NgModule({
            providers: [
                /**
                 * The StorageManagerFactory implements the IStorageManagerFactory interface, and produces
                 * StorageManager instances. Typically you would only create one StorageManager instance, and expose it through a
                 * service for the rest of your application. StorageManagers produced from this factory will take care of
                 * name-spacing storage ids, preventing clashes between extensions, or other storages with the same ID.
                 * All StorageManagers produced by the storageManagerFactory delegate to the same single root StorageManager.
                 *
                 */
                { provide: smarteditcommons.IStorageGateway, useValue: StorageGateway },
                { provide: smarteditcommons.IStorageManagerGateway, useValue: StorageManagerGateway },
                {
                    provide: smarteditcommons.IStorageManagerFactory,
                    deps: [smarteditcommons.IStorageManagerGateway],
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (storageManagerGateway) {
                        return new smarteditcommons.StorageManagerFactory(storageManagerGateway);
                    }
                },
                {
                    provide: smarteditcommons.IStorageManager,
                    deps: [smarteditcommons.IStorageManagerFactory],
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (storageManagerFactory) {
                        return storageManagerFactory.getStorageManager('se.nsp');
                    }
                },
                smarteditcommons.moduleUtils.initialize(function (storageManagerFactory, storageGateway) {
                    smarteditcommons.diBridgeUtils.downgradeService('storageManagerFactory', smarteditcommons.IStorageManagerFactory);
                    smarteditcommons.diBridgeUtils.downgradeService('seStorageManager', smarteditcommons.IStorageManager);
                }, [smarteditcommons.IStorageManagerFactory, smarteditcommons.IStorageGateway])
            ]
        })
    ], StorageModule);
    return StorageModule;
}());

var SmarteditFactory = function (payload) {
    var Smartedit = /** @class */ (function () {
        function Smartedit() {
        }
        Smartedit = __decorate([
            core.NgModule({
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                imports: __spreadArrays([
                    platformBrowser.BrowserModule,
                    _static.UpgradeModule,
                    http.HttpClientModule,
                    StorageModule,
                    SmarteditServicesModule,
                    smarteditcommons.PopupOverlayModule,
                    smarteditcommons.CompileHtmlModule,
                    smarteditcommons.AlertServiceProvidersModule.forRoot(smarteditcommons.IAlertService, AlertService),
                    smarteditcommons.HttpInterceptorModule.forRoot(smarteditcommons.RetryInterceptor),
                    smarteditcommons.SeTranslationModule.forRoot(TranslationsFetchService)
                ], payload.modules
                /* TODO: create a function and dynamic add of extensions NgModule(s) */
                ),
                declarations: [
                    SmarteditComponent,
                    SmarteditElementComponent,
                    ContextualMenuDecoratorComponent,
                    ContextualMenuItemComponent,
                    MoreItemsComponent,
                    ContextualMenuItemOverlayComponent,
                    SlotContextualMenuDecoratorComponent,
                    SlotContextualMenuItemComponent
                ],
                entryComponents: [
                    SmarteditComponent,
                    SmarteditElementComponent,
                    ContextualMenuDecoratorComponent,
                    ContextualMenuItemComponent,
                    MoreItemsComponent,
                    ContextualMenuItemOverlayComponent,
                    SlotContextualMenuDecoratorComponent,
                    SlotContextualMenuItemComponent
                ],
                providers: [
                    { provide: smarteditcommons.IAuthenticationManagerService, useClass: smarteditcommons.AuthenticationManager },
                    {
                        provide: smarteditcommons.IConfirmationModalService,
                        useClass: ConfirmationModalService
                    },
                    {
                        provide: smarteditcommons.IAuthenticationService,
                        useClass: AuthenticationService
                    },
                    {
                        provide: core.ErrorHandler,
                        useClass: smarteditcommons.SmarteditErrorHandler
                    },
                    {
                        provide: smarteditcommons.ILegacyDecoratorToCustomElementConverter,
                        useClass: LegacyDecoratorToCustomElementConverter
                    },
                    {
                        provide: smarteditcommons.IDecoratorService,
                        useClass: DecoratorService
                    },
                    { provide: smarteditcommons.IContextualMenuService, useClass: ContextualMenuService },
                    SakExecutorService,
                    {
                        provide: smarteditcommons.ISessionService,
                        useClass: SessionService
                    },
                    {
                        provide: smarteditcommons.IToolbarServiceFactory,
                        useClass: ToolbarServiceFactory
                    },
                    {
                        provide: smarteditcommons.ISharedDataService,
                        useClass: SharedDataService
                    },
                    {
                        provide: smarteditcommons.IStorageService,
                        useClass: StorageService
                    },
                    {
                        provide: smarteditcommons.IUrlService,
                        useClass: UrlService
                    },
                    {
                        provide: smarteditcommons.IIframeClickDetectionService,
                        useClass: IframeClickDetectionService
                    },
                    {
                        provide: smarteditcommons.ICatalogService,
                        useClass: CatalogService
                    },
                    {
                        provide: smarteditcommons.IExperienceService,
                        useClass: ExperienceService
                    },
                    smarteditcommons.SmarteditRoutingService,
                    smarteditcommons.moduleUtils.provideValues(payload.constants),
                    // temporary upgrades
                    smarteditcommons.diBridgeUtils.upgradeProvider('EVENT_PERSPECTIVE_CHANGED'),
                    smarteditcommons.diBridgeUtils.upgradeProvider('EVENT_PERSPECTIVE_REFRESHED'),
                    smarteditcommons.diBridgeUtils.upgradeProvider('EVENT_SMARTEDIT_COMPONENT_UPDATED'),
                    smarteditcommons.diBridgeUtils.upgradeProvider('SMARTEDIT_DRAG_AND_DROP_EVENTS'),
                    smarteditcommons.diBridgeUtils.upgradeProvider('$templateCache', smarteditcommons.ITemplateCacheService),
                    smarteditcommons.moduleUtils.bootstrap(function (gatewayFactory, smartEditContractChangeListener, seNamespaceService, resizeComponentService, renderService, systemEventService, pageInfoService, experienceService, polyfillService, crossFrameEventService, perspectiveService, languageService, featureService, angularJSBootstrapIndicatorService) {
                        angularJSBootstrapIndicatorService.onSmarteditReady().subscribe(function () {
                            gatewayFactory.initListener();
                            smartEditContractChangeListener.onComponentsAdded(function (components, isEconomyMode) {
                                if (!isEconomyMode) {
                                    seNamespaceService.reprocessPage();
                                    resizeComponentService.resizeComponents(true);
                                    renderService.resizeSlots();
                                }
                                components.forEach(function (component) {
                                    return renderService.createComponent(component);
                                });
                                systemEventService.publishAsync(smarteditcommons.OVERLAY_RERENDERED_EVENT, {
                                    addedComponents: components
                                });
                            });
                            smartEditContractChangeListener.onComponentsRemoved(function (components, isEconomyMode) {
                                if (!isEconomyMode) {
                                    seNamespaceService.reprocessPage();
                                    renderService.resizeSlots();
                                }
                                components.forEach(function (entry) {
                                    return renderService.destroyComponent(entry.component, entry.parent, entry.oldAttributes);
                                });
                                systemEventService.publishAsync(smarteditcommons.OVERLAY_RERENDERED_EVENT, {
                                    removedComponents: lodash.map(components, 'component')
                                });
                            });
                            smartEditContractChangeListener.onComponentResized(function (component) {
                                seNamespaceService.reprocessPage();
                                renderService.resizeSlots();
                                renderService.updateComponentSizeAndPosition(component);
                            });
                            smartEditContractChangeListener.onComponentRepositioned(function (component) {
                                renderService.updateComponentSizeAndPosition(component);
                            });
                            smartEditContractChangeListener.onComponentChanged(function (component, oldAttributes) {
                                seNamespaceService.reprocessPage();
                                renderService.resizeSlots();
                                renderService.destroyComponent(component, component.parent, oldAttributes);
                                renderService.createComponent(component);
                            });
                            smartEditContractChangeListener.onPageChanged(function (pageUUID) {
                                pageInfoService
                                    .getCatalogVersionUUIDFromPage()
                                    .then(function (catalogVersionUUID) {
                                    pageInfoService.getPageUID().then(function (pageUID) {
                                        experienceService.updateExperiencePageContext(catalogVersionUUID, pageUID);
                                    });
                                });
                            });
                            if (polyfillService.isEligibleForEconomyMode()) {
                                systemEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_START, function () {
                                    smartEditContractChangeListener.setEconomyMode(true);
                                });
                                systemEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_END, function () {
                                    seNamespaceService.reprocessPage();
                                    resizeComponentService.resizeComponents(true);
                                    renderService.resizeSlots();
                                    smartEditContractChangeListener.setEconomyMode(false);
                                });
                            }
                            crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function () {
                                perspectiveService.refreshPerspective();
                                languageService.registerSwitchLanguage();
                            });
                            smartEditContractChangeListener.initListener();
                            // Feature registration
                            featureService.register({
                                key: 'se.emptySlotFix',
                                nameI18nKey: 'se.emptyslotfix',
                                enablingCallback: function () {
                                    resizeComponentService.resizeComponents(true);
                                },
                                disablingCallback: function () {
                                    resizeComponentService.resizeComponents(false);
                                }
                            });
                            featureService.addDecorator({
                                key: 'se.contextualMenu',
                                nameI18nKey: 'contextualMenu'
                            });
                            featureService.addDecorator({
                                key: 'se.slotContextualMenu',
                                nameI18nKey: 'se.slot.contextual.menu'
                            });
                        });
                    }, [
                        smarteditcommons.GatewayFactory,
                        smarteditcommons.ISmartEditContractChangeListener,
                        SeNamespaceService,
                        ResizeComponentService,
                        smarteditcommons.IRenderService,
                        smarteditcommons.SystemEventService,
                        smarteditcommons.IPageInfoService,
                        smarteditcommons.IExperienceService,
                        smarteditcommons.PolyfillService,
                        smarteditcommons.CrossFrameEventService,
                        smarteditcommons.IPerspectiveService,
                        smarteditcommons.LanguageService,
                        smarteditcommons.IFeatureService,
                        smarteditcommons.AngularJSBootstrapIndicatorService
                    ]),
                    smarteditcommons.moduleUtils.initialize(function (httpClient, iframeClickDetectionService // initializes mousedown event listener for the iframe
                    ) {
                        smarteditcommons.diBridgeUtils.downgradeService('languageService', smarteditcommons.LanguageService);
                        smarteditcommons.diBridgeUtils.downgradeService('httpClient', http.HttpClient);
                    }, [http.HttpClient, smarteditcommons.IIframeClickDetectionService])
                ],
                bootstrap: [SmarteditComponent]
            })
        ], Smartedit);
        return Smartedit;
    }());
    return Smartedit;
};
/* forbiddenNameSpaces window._:false */
window.__smartedit__.SmarteditFactory = SmarteditFactory;

if (process.env.NODE_ENV === 'production') {
    core.enableProdMode();
}

exports.AlertService = AlertService;
exports.AnnouncementService = AnnouncementService;
exports.AuthenticationService = AuthenticationService;
exports.CatalogService = CatalogService;
exports.CatalogVersionPermissionService = CatalogVersionPermissionService;
exports.ComponentHandlerService = ComponentHandlerService;
exports.ConfirmationModalService = ConfirmationModalService;
exports.ContextualMenuService = ContextualMenuService;
exports.DecoratorService = DecoratorService;
exports.DelegateRestService = DelegateRestService;
exports.DragAndDropCrossOrigin = DragAndDropCrossOrigin;
exports.ExperienceService = ExperienceService;
exports.FeatureService = FeatureService;
exports.IframeClickDetectionService = IframeClickDetectionService;
exports.LegacyDecoratorToCustomElementConverter = LegacyDecoratorToCustomElementConverter;
exports.LegacySmarteditServicesModule = LegacySmarteditServicesModule;
exports.NotificationMouseLeaveDetectionService = NotificationMouseLeaveDetectionService;
exports.NotificationService = NotificationService;
exports.PageInfoService = PageInfoService;
exports.PermissionService = PermissionService;
exports.PerspectiveService = PerspectiveService;
exports.PositionRegistry = PositionRegistry;
exports.PreviewService = PreviewService;
exports.RenderService = RenderService;
exports.ResizeComponentService = ResizeComponentService;
exports.ResizeListener = ResizeListener;
exports.RestService = RestService;
exports.RestServiceFactory = RestServiceFactory;
exports.SeNamespaceService = SeNamespaceService;
exports.SessionService = SessionService;
exports.SharedDataService = SharedDataService;
exports.SmarteditFactory = SmarteditFactory;
exports.SmarteditServicesModule = SmarteditServicesModule;
exports.StorageService = StorageService;
exports.ToolbarServiceFactory = ToolbarServiceFactory;
exports.TranslationsFetchService = TranslationsFetchService;
exports.UrlService = UrlService;
exports.WaitDialogService = WaitDialogService;
