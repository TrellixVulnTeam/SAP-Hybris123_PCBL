'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var smarteditcommons = require('smarteditcommons');
var lodash = require('lodash');
var core = require('@ngx-translate/core');
var core$1 = require('@angular/core');
var common = require('@angular/common');
var forms = require('@angular/forms');
var moment = require('moment');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var core$2 = require('@fundamental-ngx/core');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('cmscommonsTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('cmscommonsTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "SynchronizationPanelComponent.html", 
        "<div class=\"se-sync-panel\"><se-message *ngIf=\"message\" [type]=\"message.type\"><ng-container se-message-description>{{ message.description }}</ng-container></se-message><div class=\"se-sync-panel__sync-info\" [style.visibility]=\"showItemList ? 'visible': 'hidden'\"><se-spinner [isSpinning]=\"isLoading\"></se-spinner><se-synchronization-panel-item *ngFor=\"let item of getAllItems(); let i = index\" class=\"se-sync-panel__row\" [index]=\"i\" [item]=\"item\" [rootItem]=\"getRootItem()\" [selectAllLabel]=\"selectAllLabel\" [disableList]=\"disableList\" [disableItem]=\"api.disableItem\" (selectionChange)=\"selectionChange($event)\"></se-synchronization-panel-item></div><div class=\"se-sync-panel__footer\" *ngIf=\"showFooter\"><button class=\"se-sync-panel__sync-btn fd-button--emphasized\" [disabled]=\"isSyncButtonDisabled()\" (click)=\"syncItems()\" translate=\"se.cms.actionitem.page.sync\"></button></div></div>"
    );
     
    $templateCache.put(
        "SynchronizationPanelItemComponent.html", 
        "<div class=\"se-sync-panel-item-checkbox fd-form__item\"><input *ngIf=\"!item.isExternal\" type=\"checkbox\" [id]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__field fd-form__control\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"onSelectionChange()\" [attr.disabled]=\"isItemDisabled() ? true : null\"/> <label *ngIf=\"index === 0\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label se-sync-panel-item-checkbox__label--select-all fd-form__label\" [title]=\"getSelectAllLabel() | translate\" [translate]=\"getSelectAllLabel()\"></label> <label *ngIf=\"index !== 0 && !item.isExternal\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [title]=\"item.name | translate\" [translate]=\"item.name\"></label><se-tooltip *ngIf=\"index !== 0 && item.isExternal\" [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\"><label se-tooltip-trigger [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [translate]=\"item.name\"></label><div se-tooltip-body translate=\"se.cms.synchronization.slot.external.component\"></div></se-tooltip></div><span *ngIf=\"showPopoverOverSyncIcon()\"><se-tooltip [isChevronVisible]=\"true\" [appendTo]=\"'body'\" [placement]=\"'left'\" [triggers]=\"['mouseenter', 'mouseleave']\" [title]=\"getInfoTitle()\" class=\"pull-right se-sync-panel-item-info-icon\" [ngClass]=\"{ 'se-sync-panel--icon-globe': item.isExternal }\"><ng-container *ngIf=\"!item.isExternal\" se-tooltip-trigger><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></ng-container><span *ngIf=\"item.isExternal\" class=\"sap-icon--globe\" se-tooltip-trigger></span><div se-tooltip-body><ng-container *ngIf=\"!item.isExternal\"><div *ngFor=\"let dependentItem of item.dependentItemTypesOutOfSync\">{{ dependentItem.i18nKey | translate }}</div></ng-container><div *ngIf=\"item.isExternal\">{{ item.catalogVersionName | seL10n | async }}</div></div></se-tooltip></span><span *ngIf=\"!showPopoverOverSyncIcon()\" class=\"pull-right se-sync-panel-item-info-icon\"><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></span><ng-template #syncInfoIcon><span [attr.status]=\"item.status\" class=\"se-sync-panel-item-info-icon__icon\" [ngClass]=\"{                'sap-icon--accept': isInSync(),                'sap-icon--message-warning': !isInSync()            }\"></span></ng-template>"
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

/**
 * Determines the root of the production and test assets
 */
var /* @ngInject */ AssetsService = /** @class */ (function () {
    AssetsService.$inject = ["testModeService"];
    function /* @ngInject */ AssetsService(testModeService) {
        this.testModeService = testModeService;
        this.TEST_ASSETS_SRC = '/web/webroot';
        this.PROD_ASSETS_SRC = '/cmssmartedit';
    }
    /* @ngInject */ AssetsService.prototype.getAssetsRoot = function () {
        return this.testModeService.isE2EMode() ? this.TEST_ASSETS_SRC : this.PROD_ASSETS_SRC;
    };
    /* @ngInject */ AssetsService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.TestModeService])
    ], /* @ngInject */ AssetsService);
    return /* @ngInject */ AssetsService;
}());

var IPageService = /** @class */ (function () {
    function IPageService() {
    }
    /**
     * Retrieves the page corresponding to the given page UID in the current contextual
     * site + catalog + catalog version.
     */
    IPageService.prototype.getPageById = function (pageUid) {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves the page information of the page identified by the given uuid.
     */
    IPageService.prototype.getPageByUuid = function (pageUuid) {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves the page information of the page that is currently loaded.
     *
     * @returns A promise that resolves to a CMS Item object containing
     * information related to the current page
     */
    IPageService.prototype.getCurrentPageInfo = function () {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves a version, as identified by the provided version id, of the page information that is currently loaded.
     *
     * @param versionId The ID of the page version to load.
     *
     * @returns A promise that resolves to a CMS Item object containing
     * information related to the version selected of the current page
     */
    IPageService.prototype.getCurrentPageInfoByVersion = function (versionId) {
        'proxyFunction';
        return null;
    };
    /**
     * Determines if a page belonging to the current contextual site+catalog+catalogversion is primary.
     */
    IPageService.prototype.isPagePrimary = function (pageUid) {
        'proxyFunction';
        return null;
    };
    /**
     * Determines if a page belonging to the provided contextual site+catalog+catalogversion is primary.
     *
     * @param uriContext The uriContext for the pageId
     */
    IPageService.prototype.isPagePrimaryWithContext = function (pageUid, uriContext) {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves the primary page of the given variation page in the current site+catalog+catalogversion.
     *
     * @param variationPageId The UID of the variation page for which to find its primary page.
     *
     * @returns A promise that resolves to the page object or undefined if no primary page was found.
     */
    IPageService.prototype.getPrimaryPage = function (variationPageUid) {
        'proxyFunction';
        return null;
    };
    /**
     * Returns true if primary page exists for a given page type
     */
    IPageService.prototype.primaryPageForPageTypeExists = function (pageTypeCode, uriParams) {
        'proxyFunction';
        return null;
    };
    /**
     * Fetches a pagination page for list of pages for a given site+catalog+catalogversion and page
     * @returns A promise that resolves to pagination with array of pages
     */
    IPageService.prototype.getPaginatedPrimaryPagesForPageType = function (pageTypeCode, uriParams, fetchPageParams) {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves the variation pages of the given primary page in the current site+catalog+catalogversion.
     *
     * @returns A promise that resolves an array of variation pages or an empty list if none are found.
     */
    IPageService.prototype.getVariationPages = function (primaryPageUid) {
        'proxyFunction';
        return null;
    };
    /**
     * Updates the page corresponding to the given page UID with the payload provided for the current site+catalog+catalogversion.
     *
     * @returns A promise that resolves to the JSON page object as it now exists in the backend
     */
    IPageService.prototype.updatePageById = function (pageUid, payload) {
        'proxyFunction';
        return null;
    };
    /**
     * This method will forcefully update the page approval status (as long as the current user has the right permissions) of the page loaded
     * in the current context to the given status.
     *
     * @returns If request is successful, it returns a promise that resolves with the updated CMS Item object. If the
     * request fails, it resolves with errors from the backend.
     */
    IPageService.prototype.forcePageApprovalStatus = function (newPageStatus) {
        'proxyFunction';
        return null;
    };
    /**
     * This method is used to determine whether the given page is approved (and can be synched).
     */
    IPageService.prototype.isPageApproved = function (pageParam) {
        'proxyFunction';
        return null;
    };
    /**
     * Returns the uriContext populated with the siteId, catalogId and catalogVersion taken from $routeParams and fallback to the currentExperience
     * Note: From the page list, $routeParams are defined. From the storefront, $routeParams are undefined.
     */
    IPageService.prototype.buildUriContextForCurrentPage = function (siteId, catalogId, catalogVersion) {
        'proxyFunction';
        return null;
    };
    return IPageService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var WORKFLOW_CREATED_EVENT = 'WORKFLOW_CREATED_EVENT';
var WORKFLOW_FINISHED_EVENT = 'WORKFLOW_FINISHED_EVENT';
var workflowCreatedEvictionTag = new smarteditcommons.EvictionTag({ event: WORKFLOW_CREATED_EVENT });
var workflowCompletedEvictionTag = new smarteditcommons.EvictionTag({ event: WORKFLOW_FINISHED_EVENT });
var workflowTasksMenuOpenedEvictionTag = new smarteditcommons.EvictionTag({
    event: 'WORKFLOW_TASKS_MENU_OPENED_EVENT'
});

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var slotEvictionTag = new smarteditcommons.EvictionTag({ event: 'SLOT_UPDATE_EVENT' });

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc service
 * @name cmsSmarteditServicesModule.service:contextAwareEditableItemService
 *
 * @description
 * Service to verify whether the item is editable in a particular context.
 */
var IContextAwareEditableItemService = /** @class */ (function () {
    function IContextAwareEditableItemService() {
    }
    /**
     * @ngdoc method
     * @name cmsSmarteditServicesModule.service:contextAwareEditableItemService#isItemEditable
     * @methodOf cmsSmarteditServicesModule.service:contextAwareEditableItemService
     *
     * @description
     * Verifies whether the item is editable in current context or not.
     *
     * @param {string} itemUid The item uid.
     *
     * @returns {Promise} A promise that resolves to a boolean. It will be true, if the item is editable, false otherwise.
     */
    IContextAwareEditableItemService.prototype.isItemEditable = function (itemUid) {
        'proxyFunction';
        return null;
    };
    return IContextAwareEditableItemService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var CONTEXT_CATALOG = 'CURRENT_CONTEXT_CATALOG';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:CONTEXT_CATALOG_VERSION
 *
 * @description
 * Constant containing the name of the catalog version placeholder in URLs
 */
var CONTEXT_CATALOG_VERSION = 'CURRENT_CONTEXT_CATALOG_VERSION';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:CONTEXT_SITE_ID
 *
 * @description
 * Constant containing the name of the site uid placeholder in URLs
 */
var CONTEXT_SITE_ID = 'CURRENT_CONTEXT_SITE_ID';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:PAGE_CONTEXT_CATALOG
 *
 * @description
 * Constant containing the name of the current page catalog uid placeholder in URLs
 */
var PAGE_CONTEXT_CATALOG = 'CURRENT_PAGE_CONTEXT_CATALOG';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:PAGE_CONTEXT_CATALOG_VERSION
 *
 * @description
 * Constant containing the name of the current page catalog version placeholder in URLs
 */
var PAGE_CONTEXT_CATALOG_VERSION = 'CURRENT_PAGE_CONTEXT_CATALOG_VERSION';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:TYPES_RESOURCE_URI
 *
 * @description
 * Resource URI of the component types REST service.
 */
var TYPES_RESOURCE_URI = '/cmswebservices/v1/types';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:ITEMS_RESOURCE_URI
 *
 * @description
 * Resource URI of the custom components REST service.
 */
var ITEMS_RESOURCE_URI = "/cmswebservices/v1/sites/" + CONTEXT_SITE_ID + "/catalogs/" + CONTEXT_CATALOG + "/versions/" + CONTEXT_CATALOG_VERSION + "/items";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:ITEMS_RESOURCE_URI
 *
 * @description
 * Resource URI of the custom components REST service.
 */
var PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI = "/cmswebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/pagescontentslotscomponents";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI
 *
 * @description
 * Resource URI of the content slot type restrictions REST service.
 */
var CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI = "/cmswebservices/v1/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/pages/:pageUid/contentslots/:slotUid/typerestrictions";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI
 *
 * @description
 * Resource URI of the content slot type restrictions REST service given the page uid.
 */
var CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI = "/cmswebservices/v1/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/pages/:pageUid/typerestrictions";
/**
 * @ngdoc object
 * @name resourceLocationsMod`ule.object:PAGES_LIST_RESOURCE_URI
 *
 * @description
 * Resource URI of the pages REST service.
 */
var PAGES_LIST_RESOURCE_URI = "/cmswebservices/v1/sites/" + CONTEXT_SITE_ID + "/catalogs/" + CONTEXT_CATALOG + "/versions/" + CONTEXT_CATALOG_VERSION + "/pages";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:PAGE_LIST_PATH
 *
 * @description
 * Path of the page list
 */
var PAGE_LIST_PATH = '/pages/:siteId/:catalogId/:catalogVersion';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:TRASHED_PAGE_LIST_PATH
 *
 * @description
 * Path of the page list
 */
var TRASHED_PAGE_LIST_PATH = '/trashedpages/:siteId/:catalogId/:catalogVersion';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:PAGES_CONTENT_SLOT_RESOURCE_URI
 *
 * @description
 * Resource URI of the page content slots REST service
 */
var PAGES_CONTENT_SLOT_RESOURCE_URI = "/cmswebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/pagescontentslots";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:PAGE_TEMPLATES_URI
 *
 * @description
 * Resource URI of the page templates REST service
 */
var PAGE_TEMPLATES_URI = "/cmswebservices/v1/sites/:" + CONTEXT_SITE_ID + "/catalogs/:" + CONTEXT_CATALOG + "/versions/:" + CONTEXT_CATALOG_VERSION + "/pagetemplates";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:NAVIGATION_MANAGEMENT_PAGE_PATH
 *
 * @description
 * Path to the Navigation Management
 */
var NAVIGATION_MANAGEMENT_PAGE_PATH = '/navigations/:siteId/:catalogId/:catalogVersion';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:NAVIGATION_MANAGEMENT_RESOURCE_URI
 *
 * @description
 * Resource URI of the navigations REST service.
 */
var NAVIGATION_MANAGEMENT_RESOURCE_URI = "/cmswebservices/v1/sites/:" + CONTEXT_SITE_ID + "/catalogs/:" + CONTEXT_CATALOG + "/versions/:" + CONTEXT_CATALOG_VERSION + "/navigations";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI
 *
 * @description
 * Resource URI of the navigations REST service.
 */
var NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI = "/cmswebservices/v1/sites/:" + CONTEXT_SITE_ID + "/catalogs/:" + CONTEXT_CATALOG + "/versions/:" + CONTEXT_CATALOG_VERSION + "/navigations/:navigationUid/entries";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI
 *
 * @description
 * Resource URI of the navigation entry types REST service.
 */
var NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI = '/cmswebservices/v1/navigationentrytypes';
/**
 * @ngdoc object
 * @name resourceLocationsModule.CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI
 *
 * @description
 * Resource URI of the pages restrictions REST service, with placeholders to be replaced by the currently selected catalog version.
 */
var CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI = "/cmswebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/pagesrestrictions";
/**
 * @ngdoc object
 * @name resourceLocationsModule.PAGES_RESTRICTIONS_RESOURCE_URI
 *
 * @description
 * Resource URI of the pages restrictions REST service, with placeholders to be replaced by the currently selected catalog version.
 */
var PAGES_RESTRICTIONS_RESOURCE_URI = '/cmswebservices/v1/sites/:siteUID/catalogs/:catalogId/versions/:catalogVersion/pagesrestrictions';
/**
 * @ngdoc object
 * @name resourceLocationsModule.RESTRICTION_TYPES_URI
 *
 * @description
 * Resource URI of the restriction types REST service.
 */
var RESTRICTION_TYPES_URI = '/cmswebservices/v1/restrictiontypes';
/**
 * @ngdoc object
 * @name resourceLocationsModule.RESTRICTION_TYPES_URI
 *
 * @description
 * Resource URI of the pageTypes-restrictionTypes relationship REST service.
 */
var PAGE_TYPES_RESTRICTION_TYPES_URI = '/cmswebservices/v1/pagetypesrestrictiontypes';
/**
 * @ngdoc object
 * @name resourceLocationsModule.PAGE_TYPES_URI
 *
 * @description
 * Resource URI of the page types REST service.
 */
var PAGE_TYPES_URI = '/cmswebservices/v1/pagetypes';
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:GET_PAGE_SYNCHRONIZATION_RESOURCE_URI
 *
 * @description
 * Resource URI to retrieve the full synchronization status of page related items
 */
var GET_PAGE_SYNCHRONIZATION_RESOURCE_URI = "/cmssmarteditwebservices/v1/sites/" + smarteditcommons.PAGE_CONTEXT_SITE_ID + "/catalogs/" + PAGE_CONTEXT_CATALOG + "/versions/" + PAGE_CONTEXT_CATALOG_VERSION + "/synchronizations/versions/:target/pages/:pageUid";
/**
 * @ngdoc object
 * @name resourceLocationsModule.object:POST_PAGE_SYNCHRONIZATION_RESOURCE_URI
 *
 * @description
 * Resource URI to perform synchronization of page related items
 */
var POST_PAGE_SYNCHRONIZATION_RESOURCE_URI = "/cmssmarteditwebservices/v1/sites/" + CONTEXT_SITE_ID + "/catalogs/" + CONTEXT_CATALOG + "/versions/" + CONTEXT_CATALOG_VERSION + "/synchronizations/versions/:target";

var /* @ngInject */ CmsResourceLocationsModule = /** @class */ (function () {
    function /* @ngInject */ CmsResourceLocationsModule() {
    }
    /* @ngInject */ CmsResourceLocationsModule = __decorate([
        smarteditcommons.SeModule({
            providers: [
                smarteditcommons.diNameUtils.makeValueProvider({ CONTEXT_SITE_ID: CONTEXT_SITE_ID }),
                smarteditcommons.diNameUtils.makeValueProvider({ CONTEXT_CATALOG: CONTEXT_CATALOG }),
                smarteditcommons.diNameUtils.makeValueProvider({ CONTEXT_CATALOG_VERSION: CONTEXT_CATALOG_VERSION }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_CONTEXT_SITE_ID: smarteditcommons.PAGE_CONTEXT_SITE_ID }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_CONTEXT_CATALOG: PAGE_CONTEXT_CATALOG }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_CONTEXT_CATALOG_VERSION: PAGE_CONTEXT_CATALOG_VERSION }),
                smarteditcommons.diNameUtils.makeValueProvider({ TYPES_RESOURCE_URI: TYPES_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ ITEMS_RESOURCE_URI: ITEMS_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI: PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI: CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI: CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGES_LIST_RESOURCE_URI: PAGES_LIST_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_LIST_PATH: PAGE_LIST_PATH }),
                smarteditcommons.diNameUtils.makeValueProvider({ TRASHED_PAGE_LIST_PATH: TRASHED_PAGE_LIST_PATH }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGES_CONTENT_SLOT_RESOURCE_URI: PAGES_CONTENT_SLOT_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_TEMPLATES_URI: PAGE_TEMPLATES_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ NAVIGATION_MANAGEMENT_PAGE_PATH: NAVIGATION_MANAGEMENT_PAGE_PATH }),
                smarteditcommons.diNameUtils.makeValueProvider({ NAVIGATION_MANAGEMENT_RESOURCE_URI: NAVIGATION_MANAGEMENT_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI: NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI: NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI: CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGES_RESTRICTIONS_RESOURCE_URI: PAGES_RESTRICTIONS_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ RESTRICTION_TYPES_URI: RESTRICTION_TYPES_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ PAGE_TYPES_RESTRICTION_TYPES_URI: PAGE_TYPES_RESTRICTION_TYPES_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ GET_PAGE_SYNCHRONIZATION_RESOURCE_URI: GET_PAGE_SYNCHRONIZATION_RESOURCE_URI }),
                smarteditcommons.diNameUtils.makeValueProvider({ POST_PAGE_SYNCHRONIZATION_RESOURCE_URI: POST_PAGE_SYNCHRONIZATION_RESOURCE_URI })
            ]
        })
    ], /* @ngInject */ CmsResourceLocationsModule);
    return /* @ngInject */ CmsResourceLocationsModule;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (DRAG_AND_DROP_EVENTS) {
    /**
     * Name of event executed when a drag and drop event starts.
     */
    DRAG_AND_DROP_EVENTS["DRAG_STARTED"] = "CMS_DRAG_STARTED";
    /**
     * Name of event executed when a drag and drop event stops.
     */
    DRAG_AND_DROP_EVENTS["DRAG_STOPPED"] = "CMS_DRAG_STOPPED";
    /**
     * Name of event executed when onDragOver is triggered.
     */
    DRAG_AND_DROP_EVENTS["DRAG_OVER"] = "CMS_DRAG_OVER";
    /**
     * Name of event executed when onDragLeave is triggered.
     */
    DRAG_AND_DROP_EVENTS["DRAG_LEAVE"] = "CMS_DRAG_LEAVE";
})(exports.DRAG_AND_DROP_EVENTS || (exports.DRAG_AND_DROP_EVENTS = {}));
var COMPONENT_CREATED_EVENT = 'COMPONENT_CREATED_EVENT';
var COMPONENT_REMOVED_EVENT = 'COMPONENT_REMOVED_EVENT';
var COMPONENT_UPDATED_EVENT = 'COMPONENT_UPDATED_EVENT';
var CMSITEMS_UPDATE_EVENT = 'CMSITEMS_UPDATE';
var ACTIONABLE_ALERT_CONSTANTS = {
    /**
     * Lodash template defining the HTML content inserted within the
     * actionableAlert.
     * Below are listed the placeholders you can use which will get substituted
     * at run-time:
     *  - description - Text related to the associated cmsItem
     *  - descriptionDetails - Map of parameters passed to the translated description
     *  - hyperlinkLabel - Label for the hyperlink rendered within the
     *  - hyperlinkDetails - Map of parameters passed to the translated hyperlink
     *  contextual alert
     **/
    ALERT_TEMPLATE: "<div><p>{{ $alertInjectedCtrl.description | translate: $alertInjectedCtrl.descriptionDetails }}</p><div><a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'>{{ $alertInjectedCtrl.hyperlinkLabel | translate: $alertInjectedCtrl.hyperlinkDetails }}</a></div></div>",
    /**
     * The timeout duration of the cms alert item, in milliseconds.
     */
    TIMEOUT_DURATION: 20000,
    /**
     * Injectable angular constant
     *
     * This object provides an enumeration with values for each of the possible types of alerts
     * that can be opened with the actionableAlertService. Currently the available options are:
     * INFO, ALERT, DANGER, WARNING and SUCCESS.
     */
    ALERT_TYPES: {
        INFO: 'INFO',
        ALERT: 'ALERT',
        DANGER: 'DANGER',
        WARNING: 'WARNING',
        SUCCESS: 'SUCCESS'
    }
};
var EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV = 'EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV';
var NAVIGATION_NODE_TYPECODE = 'CMSNavigationNode';
var NAVIGATION_NODE_ROOT_NODE_UID = 'root';
var IMAGES_URL = '/cmssmartedit/images';

var cmsitemsUri = "/cmswebservices/v1/sites/" + smarteditcommons.CONTEXT_SITE_ID + "/cmsitems";
var cmsitemsEvictionTag = new smarteditcommons.EvictionTag({ event: CMSITEMS_UPDATE_EVENT });
/**
 * @ngdoc service
 * @name cmsitemsRestService.cmsitemsRestService
 *
 * @description
 * Service to deal with CMS Items related CRUD operations.
 */
var /* @ngInject */ CmsitemsRestService = /** @class */ (function () {
    CmsitemsRestService.$inject = ["restServiceFactory", "catalogService"];
    function /* @ngInject */ CmsitemsRestService(restServiceFactory, catalogService) {
        this.restServiceFactory = restServiceFactory;
        this.catalogService = catalogService;
        this.cmsitemsUuidsUri = "/cmswebservices/v1/sites/" + smarteditcommons.CONTEXT_SITE_ID + "/cmsitems/uuids";
        this.resource = restServiceFactory.get(cmsitemsUri);
        this.versionedResource = restServiceFactory.get(cmsitemsUri + '/:itemUuid');
        this.uuidsResource = restServiceFactory.get(this.cmsitemsUuidsUri);
    }
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#getById
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Get the CMS Item that matches the given item uuid (Universally Unique Identifier).
     *
     * @param {Number} cmsitemUuid The CMS Item uuid
     *
     * @returns {Promise<CMSItem>} If request is successful, it returns a promise that resolves with the CMS Item object. If the
     * request fails, it resolves with errors from the backend.
     */
    /* @ngInject */ CmsitemsRestService.prototype.getById = function (cmsitemUuid) {
        return this.resource.getById(cmsitemUuid);
    };
    CmsitemsRestService.prototype.getById.$inject = ["cmsitemUuid"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#getByIdAndVersion
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Get the CMS Item that matches the given item uuid (Universally Unique Identifier) for a given version.
     *
     * @param {String} cmsitemUuid The CMS Item uuid
     * @param {String} versionId The uid of the version to be retrieved.
     *
     * @returns {Promise<CMSItem>} If request is successful, it returns a promise that resolves with the CMS Item object. If the
     * request fails, it resolves with errors from the backend.
     */
    /* @ngInject */ CmsitemsRestService.prototype.getByIdAndVersion = function (itemUuid, versionId) {
        return this.versionedResource.get({
            itemUuid: itemUuid,
            versionId: versionId
        });
    };
    CmsitemsRestService.prototype.getByIdAndVersion.$inject = ["itemUuid", "versionId"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#get
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Fetch CMS Items search result by making a REST call to the CMS Items API.
     * A search can be performed by a typeCode (optionnaly in combination of a mask parameter), or by providing a list of cms items uuid.
     *
     * @param {Object} queryParams The object representing the query params
     * @param {String} queryParams.pageSize number of items in the page
     * @param {String} queryParams.currentPage current page number
     * @param {String =} queryParams.typeCode for filtering on the cms item typeCode
     * @param {String =} queryParams.mask for filtering the search
     * @param {String =} queryParams.itemSearchParams search on additional fields using a comma separated list of field name and value
     * pairs which are separated by a colon. Exact matches only.
     * @param {String =} queryParams.catalogId the catalog to search items in. If empty, the current context catalog will be used.
     * @param {String =} queryParams.catalogVersion the catalog version to search items in. If empty, the current context catalog version will be used.
     *
     * @returns {Promise<CMSItem>} If request is successful, it returns a promise that resolves with the paged search result. If the
     * request fails, it resolves with errors from the backend.
     */
    /* @ngInject */ CmsitemsRestService.prototype.get = function (queryParams) {
        var _this = this;
        return this.catalogService.retrieveUriContext().then(function (uriContext) {
            var catalogDetailsParams = {
                catalogId: queryParams.catalogId || uriContext.CURRENT_CONTEXT_CATALOG,
                catalogVersion: queryParams.catalogVersion || uriContext.CURRENT_CONTEXT_CATALOG_VERSION
            };
            queryParams = lodash.merge(catalogDetailsParams, queryParams);
            return _this.restServiceFactory.get(cmsitemsUri).get(queryParams);
        });
    };
    CmsitemsRestService.prototype.get.$inject = ["queryParams"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#getByIds
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Fetch CMS Items by uuids, making a POST call to the CMS Items API.
     * A search can be performed by providing a list of cms items uuid.
     *
     * @param {string[] =} uuids list of cms item uuids
     *
     * @returns {Promise<CMSItem[]>} If request is successful, it returns a promise that resolves to the result. If the
     * request fails, it resolves with errors from the backend. Be mindful that the response payload size could
     * increase dramatically depending on the number of uuids that you send on the request.
     */
    /* @ngInject */ CmsitemsRestService.prototype.getByIds = function (uuids, fields) {
        return this.getByIdsNoCache(uuids, fields);
    };
    CmsitemsRestService.prototype.getByIds.$inject = ["uuids", "fields"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#update
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Update a CMS Item.
     *
     * @param {Object} cmsitem The object representing the CMS Item to update
     * @param {String} cmsitem.identifier The cms item identifier (uuid)
     *
     * @returns {Promise<CMSItem>} If request is successful, it returns a promise that resolves with the updated CMS Item object. If the
     * request fails, it resolves with errors from the backend.
     */
    /* @ngInject */ CmsitemsRestService.prototype.update = function (cmsitem, options) {
        return this.resource.update(cmsitem, options);
    };
    CmsitemsRestService.prototype.update.$inject = ["cmsitem", "options"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#delete
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Remove a CMS Item.
     *
     * @param {Number} cmsitemUuid The CMS Item uuid
     */
    /* @ngInject */ CmsitemsRestService.prototype.delete = function (identifier) {
        return this.resource.remove({
            identifier: identifier
        });
    };
    CmsitemsRestService.prototype.delete.$inject = ["identifier"];
    /**
     * @ngdoc method
     * @name cmsitemsRestService.service:cmsitemsRestService#create
     * @methodOf cmsitemsRestService.cmsitemsRestService
     *
     * @description
     * Create a new CMS Item.
     *
     * @param {Object} cmsitem The object representing the CMS Item to create
     *
     * @returns {Promise<CMSItem>} If request is successful, it returns a promise that resolves with the CMS Item object. If the
     * request fails, it resolves with errors from the backend.
     */
    /* @ngInject */ CmsitemsRestService.prototype.create = function (cmsitem) {
        var _this = this;
        return this.catalogService.getCatalogVersionUUid().then(function (catalogVersionUUid) {
            cmsitem.catalogVersion = cmsitem.catalogVersion || catalogVersionUUid;
            if (cmsitem.onlyOneRestrictionMustApply === undefined) {
                cmsitem.onlyOneRestrictionMustApply = false;
            }
            return _this.resource.save(cmsitem);
        });
    };
    CmsitemsRestService.prototype.create.$inject = ["cmsitem"];
    /**
     * The function is same as getByIds but it doesn't use caching, it will request data from backend every time.
     *
     * If request is successful, it returns a promise that resolves to the result. If the
     * request fails, it resolves with errors from the backend. Be mindful that the response payload size could
     * increase dramatically depending on the number of uuids that you send on the request.
     */
    /* @ngInject */ CmsitemsRestService.prototype.getByIdsNoCache = function (uuids, fields) {
        var _this = this;
        uuids = Array.from(new Set(uuids)); // removing duplicates
        return this.catalogService.getCatalogVersionUUid().then(function (catalogVersion) {
            var payload = {
                catalogVersion: catalogVersion,
                uuids: uuids,
                fields: fields
            };
            return _this.uuidsResource.save(payload);
        });
    };
    CmsitemsRestService.prototype.getByIdsNoCache.$inject = ["uuids", "fields"];
    var _a;
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag, cmsitemsEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "getById", null);
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag, cmsitemsEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "getByIdAndVersion", null);
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag, cmsitemsEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "get", null);
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag, cmsitemsEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "getByIds", null);
    __decorate([
        smarteditcommons.InvalidateCache(cmsitemsEvictionTag),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object, Object]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "update", null);
    __decorate([
        smarteditcommons.InvalidateCache(cmsitemsEvictionTag),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CmsitemsRestService.prototype, "delete", null);
    /* @ngInject */ CmsitemsRestService = __decorate([
        smarteditcommons.SeDowngradeService(),
        smarteditcommons.OperationContextRegistered(cmsitemsUri.replace(/CONTEXT_SITE_ID/, ':CONTEXT_SITE_ID'), 'CMS'),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.ICatalogService])
    ], /* @ngInject */ CmsitemsRestService);
    return /* @ngInject */ CmsitemsRestService;
}());

/**
 * Rest Service to retrieve page content slots for components.
 */
var IPageContentSlotsComponentsRestService = /** @class */ (function () {
    function IPageContentSlotsComponentsRestService() {
    }
    /**
     * Clears the slotId - components list map in the cache.
     */
    IPageContentSlotsComponentsRestService.prototype.clearCache = function () {
        'proxyFunction';
    };
    /**
     * Retrieves a list of pageContentSlotsComponents associated to a page and Converts the list of pageContentSlotsComponents to slotId - components list map.
     * If the map is already stored in the cache, it will return the cache info.
     *
     * @param pageUid The uid of the page to retrieve the content slots to components map.
     * @return A promise that resolves to slotId - components list map.
     */
    IPageContentSlotsComponentsRestService.prototype.getSlotsToComponentsMapForPageUid = function (pageUid) {
        'proxyFunction';
        return null;
    };
    /**
     * Retrieves a list of all components for a given slot which is part of the page being loaded.
     * It returns all the components irrespective of their visibility.
     *
     * @param slotUuid The uid of the slot to retrieve the list of components.
     * @return A promise that resolves to components list.
     */
    IPageContentSlotsComponentsRestService.prototype.getComponentsForSlot = function (slotUuid) {
        'proxyFunction';
        return null;
    };
    return IPageContentSlotsComponentsRestService;
}());

var /* @ngInject */ SynchronizationResourceService = /** @class */ (function () {
    SynchronizationResourceService.$inject = ["restServiceFactory"];
    function /* @ngInject */ SynchronizationResourceService(restServiceFactory) {
        this.restServiceFactory = restServiceFactory;
    }
    /* @ngInject */ SynchronizationResourceService.prototype.getPageSynchronizationGetRestService = function (uriContext) {
        var getURI = new smarteditcommons.URIBuilder(GET_PAGE_SYNCHRONIZATION_RESOURCE_URI)
            .replaceParams(uriContext)
            .build();
        return this.restServiceFactory.get(getURI);
    };
    SynchronizationResourceService.prototype.getPageSynchronizationGetRestService.$inject = ["uriContext"];
    /* @ngInject */ SynchronizationResourceService.prototype.getPageSynchronizationPostRestService = function (uriContext) {
        var postURI = new smarteditcommons.URIBuilder(POST_PAGE_SYNCHRONIZATION_RESOURCE_URI)
            .replaceParams(uriContext)
            .build();
        return this.restServiceFactory.get(postURI);
    };
    SynchronizationResourceService.prototype.getPageSynchronizationPostRestService.$inject = ["uriContext"];
    /* @ngInject */ SynchronizationResourceService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory])
    ], /* @ngInject */ SynchronizationResourceService);
    return /* @ngInject */ SynchronizationResourceService;
}());

/**
 * Service which manages component types and items.
 */
var /* @ngInject */ ComponentService = /** @class */ (function () {
    ComponentService.$inject = ["restServiceFactory", "cmsitemsRestService", "pageInfoService", "pageContentSlotsComponentsRestService"];
    function /* @ngInject */ ComponentService(restServiceFactory, cmsitemsRestService, pageInfoService, pageContentSlotsComponentsRestService) {
        this.restServiceFactory = restServiceFactory;
        this.cmsitemsRestService = cmsitemsRestService;
        this.pageInfoService = pageInfoService;
        this.pageContentSlotsComponentsRestService = pageContentSlotsComponentsRestService;
        this.pageComponentTypesRestServiceURI = '/cmssmarteditwebservices/v1/catalogs/:catalogId/versions/:catalogVersion/pages/:pageId/types';
        this.pageComponentTypesRestService = this.restServiceFactory.get(this.pageComponentTypesRestServiceURI);
        this.restServiceForAddExistingComponent = this.restServiceFactory.get(PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI);
    }
    /**
     * Fetches all component types that are applicable to the current page.
     *
     * @returns A promise resolving to a page of component types applicable to the current page.
     */
    /* @ngInject */ ComponentService.prototype.getSupportedComponentTypesForCurrentPage = function (payload) {
        return this.pageComponentTypesRestService.get(payload);
    };
    ComponentService.prototype.getSupportedComponentTypesForCurrentPage.$inject = ["payload"];
    /**
     * Given a component info and the component payload, a new componentItem is created and added to a slot
     */
    /* @ngInject */ ComponentService.prototype.createNewComponent = function (componentInfo, componentPayload) {
        var payload = {
            name: componentInfo.name,
            slotId: componentInfo.targetSlotId,
            pageId: componentInfo.pageId,
            position: componentInfo.position,
            typeCode: componentInfo.componentType,
            itemtype: componentInfo.componentType,
            catalogVersion: componentInfo.catalogVersionUuid,
            uid: '',
            uuid: ''
        };
        // TODO: consider refactor. Remove the if statement, rely on TypeScript.
        if (typeof componentPayload === 'object') {
            for (var property in componentPayload) {
                if (componentPayload.hasOwnProperty(property)) {
                    payload[property] = componentPayload[property];
                }
            }
        }
        else if (componentPayload) {
            throw new Error("ComponentService.createNewComponent() - Illegal componentPayload - [" + componentPayload + "]");
        }
        return this.cmsitemsRestService.create(payload);
    };
    ComponentService.prototype.createNewComponent.$inject = ["componentInfo", "componentPayload"];
    /**
     * Given a component payload related to an existing component, it will be updated with the new supplied values.
     */
    /* @ngInject */ ComponentService.prototype.updateComponent = function (componentPayload) {
        return this.cmsitemsRestService.update(componentPayload);
    };
    ComponentService.prototype.updateComponent.$inject = ["componentPayload"];
    /**
     * Add an existing component item to a slot.
     *
     * @param pageId used to identify the page containing the slot in the current template.
     * @param componentId used to identify the existing component which will be added to the slot.
     * @param slotId used to identify the slot in the current template.
     * @param position used to identify the position in the slot in the current template.
     */
    /* @ngInject */ ComponentService.prototype.addExistingComponent = function (pageId, componentId, slotId, position) {
        return this.restServiceForAddExistingComponent.save({
            pageId: pageId,
            slotId: slotId,
            componentId: componentId,
            position: position
        });
    };
    ComponentService.prototype.addExistingComponent.$inject = ["pageId", "componentId", "slotId", "position"];
    /**
     * Load a component identified by its id.
     */
    /* @ngInject */ ComponentService.prototype.loadComponentItem = function (id) {
        return this.cmsitemsRestService.getById(id);
    };
    ComponentService.prototype.loadComponentItem.$inject = ["id"];
    /**
     * All existing component items for the provided content catalog are retrieved in the form of pages
     * used for pagination especially when the result set is very large.
     *
     * E.g. Add Components -> Saved Components.
     *
     * @returns A promise resolving to a page of component items retrieved from the provided catalog version.
     */
    /* @ngInject */ ComponentService.prototype.loadPagedComponentItemsByCatalogVersion = function (payload) {
        var requestParams = {
            pageSize: payload.pageSize,
            currentPage: payload.page,
            mask: payload.mask,
            sort: 'name',
            typeCode: 'AbstractCMSComponent',
            catalogId: payload.catalogId,
            catalogVersion: payload.catalogVersion,
            itemSearchParams: ''
        };
        return this.cmsitemsRestService.get(requestParams);
    };
    ComponentService.prototype.loadPagedComponentItemsByCatalogVersion.$inject = ["payload"];
    /**
     * Returns slot IDs for the given componentUuid.
     *
     * E.g. Edit Component on Storefront and click Save button.
     */
    /* @ngInject */ ComponentService.prototype.getSlotsForComponent = function (componentUuid) {
        return __awaiter(this, void 0, void 0, function () {
            var allSlotsToComponents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContentSlotsForComponents()];
                    case 1:
                        allSlotsToComponents = _a.sent();
                        return [2 /*return*/, Object.entries(allSlotsToComponents)
                                .filter(function (_a) {
                                var components = _a[1];
                                return components.find(function (component) { return component.uuid === componentUuid; });
                            })
                                .map(function (_a) {
                                var slotId = _a[0];
                                return slotId;
                            })];
                }
            });
        });
    };
    ComponentService.prototype.getSlotsForComponent.$inject = ["componentUuid"];
    /* @ngInject */ ComponentService.prototype.getContentSlotsForComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pageInfoService.getPageUID()];
                    case 1:
                        pageId = _a.sent();
                        return [4 /*yield*/, this.pageContentSlotsComponentsRestService.getSlotsToComponentsMapForPageUid(pageId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.pageChangeEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ ComponentService.prototype, "getSupportedComponentTypesForCurrentPage", null);
    /* @ngInject */ ComponentService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            CmsitemsRestService,
            smarteditcommons.IPageInfoService,
            IPageContentSlotsComponentsRestService])
    ], /* @ngInject */ ComponentService);
    return /* @ngInject */ ComponentService;
}());

/** The unique identifier for the page type. */
(function (CMSPageTypes) {
    CMSPageTypes["ContentPage"] = "ContentPage";
    CMSPageTypes["CategoryPage"] = "CategoryPage";
    CMSPageTypes["ProductPage"] = "ProductPage";
    CMSPageTypes["EmailPage"] = "EmailPage";
})(exports.CMSPageTypes || (exports.CMSPageTypes = {}));
(function (CMSPageStatus) {
    CMSPageStatus["ACTIVE"] = "ACTIVE";
    CMSPageStatus["DELETED"] = "DELETED";
})(exports.CMSPageStatus || (exports.CMSPageStatus = {}));
(function (CmsApprovalStatus) {
    CmsApprovalStatus["APPROVED"] = "APPROVED";
    CmsApprovalStatus["CHECK"] = "CHECK";
    CmsApprovalStatus["UNAPPROVED"] = "UNAPPROVED";
})(exports.CmsApprovalStatus || (exports.CmsApprovalStatus = {}));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (SlotStatus) {
    SlotStatus["TEMPLATE"] = "TEMPLATE";
    SlotStatus["PAGE"] = "PAGE";
    SlotStatus["OVERRIDE"] = "OVERRIDE";
})(exports.SlotStatus || (exports.SlotStatus = {}));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (JOB_STATUS) {
    JOB_STATUS["RUNNING"] = "RUNNING";
    JOB_STATUS["ERROR"] = "ERROR";
    JOB_STATUS["FAILURE"] = "FAILURE";
    JOB_STATUS["FINISHED"] = "FINISHED";
    JOB_STATUS["UNKNOWN"] = "UNKNOWN";
    JOB_STATUS["ABORTED"] = "ABORTED";
    JOB_STATUS["PENDING"] = "PENDING";
})(exports.JOB_STATUS || (exports.JOB_STATUS = {}));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (StructureTypeCategory) {
    StructureTypeCategory["COMPONENT"] = "COMPONENT";
    StructureTypeCategory["PREVIEW"] = "PREVIEW";
    StructureTypeCategory["PAGE"] = "PAGE";
    StructureTypeCategory["RESTRICTION"] = "RESTRICTION";
})(exports.StructureTypeCategory || (exports.StructureTypeCategory = {}));

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Constant containing the different sync statuses.
 */
var DEFAULT_SYNCHRONIZATION_STATUSES = {
    UNAVAILABLE: 'UNAVAILABLE',
    IN_SYNC: 'IN_SYNC',
    NOT_SYNC: 'NOT_SYNC',
    IN_PROGRESS: 'IN_PROGRESS',
    SYNC_FAILED: 'SYNC_FAILED'
};
/**
 * Constant containing polling related values
 * * `SLOW_POLLING_TIME` : the slow polling time in milliseconds
 * * `FAST_POLLING_TIME` : the slow polling time in milliseconds
 * * `SPEED_UP` : event used to speed up polling (`syncPollingSpeedUp`)
 * * `SLOW_DOWN` : event used to slow down polling (`syncPollingSlowDown`)
 * * `FAST_FETCH` : event used to trigger a sync fetch (`syncFastFetch`)
 * * `FETCH_SYNC_STATUS_ONCE`: event used to trigger a one time sync (`fetchSyncStatusOnce`)
 *
 */
var DEFAULT_SYNCHRONIZATION_POLLING = {
    SLOW_POLLING_TIME: 20000,
    FAST_POLLING_TIME: 4000,
    SPEED_UP: 'syncPollingSpeedUp',
    SLOW_DOWN: 'syncPollingSlowDown',
    FAST_FETCH: 'syncFastFetch',
    FETCH_SYNC_STATUS_ONCE: 'fetchSyncStatusOnce'
};
/**
 * Constant containing synchronization events.
 */
var DEFAULT_SYNCHRONIZATION_EVENT = {
    CATALOG_SYNCHRONIZED: 'CATALOG_SYNCHRONIZED_EVENT'
};

(function (SynchronizationStatus) {
    SynchronizationStatus["Unavailable"] = "UNAVAILABLE";
    SynchronizationStatus["InSync"] = "IN_SYNC";
    SynchronizationStatus["NotSync"] = "NOT_SYNC";
    SynchronizationStatus["InProgress"] = "IN_PROGRESS";
    SynchronizationStatus["SyncFailed"] = "SYNC_FAILED";
})(exports.SynchronizationStatus || (exports.SynchronizationStatus = {}));

var SynchronizationUtils = /** @class */ (function () {
    function SynchronizationUtils() {
    }
    /**
     * Verifies whether the sync status item is synchronized.
     */
    SynchronizationUtils.prototype.isInSync = function (item) {
        return item.status === exports.SynchronizationStatus.InSync;
    };
    /**
     * Verifies whether the sync status item is not sync.
     */
    SynchronizationUtils.prototype.isInNotSync = function (item) {
        return item.status === exports.SynchronizationStatus.NotSync;
    };
    /**
     * Verifies whether the item has failed synchronization status.
     */
    SynchronizationUtils.prototype.isSyncInFailed = function (item) {
        return item.status === exports.SynchronizationStatus.SyncFailed;
    };
    SynchronizationUtils.prototype.isSyncInProgress = function (item) {
        return item.status === exports.SynchronizationStatus.InProgress;
    };
    /**
     * Verifies whether the item is external.
     */
    SynchronizationUtils.prototype.isExternalItem = function (syncStatusItem) {
        return !!syncStatusItem.isExternal;
    };
    return SynchronizationUtils;
}());
var synchronizationUtils = new SynchronizationUtils();

/**
 * Queue of items to be synchronized.
 */
var SyncQueue = /** @class */ (function () {
    function SyncQueue() {
        this.items = [];
    }
    SyncQueue.prototype.getItems = function () {
        return this.items;
    };
    SyncQueue.prototype.addItems = function (items) {
        this.items = this.items.concat(items);
    };
    SyncQueue.prototype.removeItem = function (item) {
        this.items = this.items.filter(function (itemId) { return itemId !== item.itemId; });
    };
    SyncQueue.prototype.itemExists = function (item) {
        return this.getItems().includes(item.itemId);
    };
    SyncQueue.prototype.isEmpty = function () {
        return this.getItems().length === 0;
    };
    SyncQueue.prototype.hasAtLeastOneItem = function () {
        return this.getItems().length > 0;
    };
    return SyncQueue;
}());

window.__smartedit__.addDecoratorPayload("Component", "SynchronizationPanelComponent", {
    selector: 'se-synchronization-panel',
    template: "<div class=\"se-sync-panel\"><se-message *ngIf=\"message\" [type]=\"message.type\"><ng-container se-message-description>{{ message.description }}</ng-container></se-message><div class=\"se-sync-panel__sync-info\" [style.visibility]=\"showItemList ? 'visible': 'hidden'\"><se-spinner [isSpinning]=\"isLoading\"></se-spinner><se-synchronization-panel-item *ngFor=\"let item of getAllItems(); let i = index\" class=\"se-sync-panel__row\" [index]=\"i\" [item]=\"item\" [rootItem]=\"getRootItem()\" [selectAllLabel]=\"selectAllLabel\" [disableList]=\"disableList\" [disableItem]=\"api.disableItem\" (selectionChange)=\"selectionChange($event)\"></se-synchronization-panel-item></div><div class=\"se-sync-panel__footer\" *ngIf=\"showFooter\"><button class=\"se-sync-panel__sync-btn fd-button--emphasized\" [disabled]=\"isSyncButtonDisabled()\" (click)=\"syncItems()\" translate=\"se.cms.actionitem.page.sync\"></button></div></div>",
    styles: [".se-sync-panel__sync-info{max-height:300px;overflow-y:auto}.se-sync-panel__row{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:0 20px;height:40px;border-bottom:1px solid #d9d9d9}.se-sync-panel__row:first-child{height:50px}.se-sync-panel__row:last-child{border-bottom:none}.se-sync-panel__footer{padding:20px;border-top:1px solid #d9d9d9;display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.se-sync-panel__sync-btn{text-transform:capitalize;padding:0 20px;margin-left:8px}"]
});
var /* @ngInject */ SynchronizationPanelComponent = /** @class */ (function () {
    SynchronizationPanelComponent.$inject = ["waitDialogService", "logService", "crossFrameEventService", "systemEventService", "timerService", "alertService", "translateService", "sharedDataService", "catalogService"];
    function /* @ngInject */ SynchronizationPanelComponent(waitDialogService, logService, crossFrameEventService, systemEventService, timerService, alertService, translateService, sharedDataService, catalogService) {
        var _this = this;
        this.waitDialogService = waitDialogService;
        this.logService = logService;
        this.crossFrameEventService = crossFrameEventService;
        this.systemEventService = systemEventService;
        this.timerService = timerService;
        this.alertService = alertService;
        this.translateService = translateService;
        this.sharedDataService = sharedDataService;
        this.catalogService = catalogService;
        this.getApi = new core$1.EventEmitter();
        this.selectedItemsUpdate = new core$1.EventEmitter();
        this.syncStatusReady = new core$1.EventEmitter();
        this.showFooter = true;
        this.showItemList = true;
        this.message = null;
        this.disableList = false;
        this.isLoading = false;
        this.SYNC_POLLING_SPEED_PREFIX = 'syncPanel-';
        this.syncQueue = new SyncQueue();
        this.api = {
            selectAll: function () {
                if (!_this.isRootItemExist()) {
                    throw new Error("Synchronization status is not available. The 'selectAll' function should be used with 'onSyncStatusReady' event.");
                }
                _this.toogleRootItem(true);
            },
            displayItemList: function (visible) {
                _this.showItemList = visible;
            },
            disableItemList: function (disableList) {
                _this.disableList = disableList;
            },
            setMessage: function (msgConfig) {
                _this.message = msgConfig;
            },
            disableItem: null
        };
    }
    /* @ngInject */ SynchronizationPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getApi.emit(this.api);
        this.unsubscribeFastFetch = this.crossFrameEventService.subscribe(DEFAULT_SYNCHRONIZATION_POLLING.FAST_FETCH, function (id, data) { return _this.fetchSyncStatus(data); });
        this.fetchSyncStatus();
        this.resynchTimer = this.timerService.createTimer(function () { return _this.fetchSyncStatus(); }, DEFAULT_SYNCHRONIZATION_POLLING.SLOW_POLLING_TIME);
        this.resynchTimer.start();
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        var finalizeTimer = this.timerService.createTimer(function () {
            if (_this.syncQueue.isEmpty()) {
                _this.resynchTimer.teardown();
                _this.unsubscribeFastFetch();
                _this.systemEventService.publishAsync(DEFAULT_SYNCHRONIZATION_POLLING.SLOW_DOWN, _this.SYNC_POLLING_SPEED_PREFIX + _this.itemId);
                _this.toggleWaitModal(false);
                finalizeTimer.teardown();
            }
            else {
                _this.toggleWaitModal(true);
            }
        }, 200);
        finalizeTimer.start();
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.syncItems = function () {
        var _this = this;
        var selectedItemPayloads = this.getSelectedItemPayloads();
        var selectedItemPayloadIds = selectedItemPayloads.map(function (syncItemPayload) { return syncItemPayload.itemId; });
        this.syncQueue.addItems(selectedItemPayloadIds);
        if (this.atLeastOneSelectedItemExists()) {
            this.toggleWaitModal(true);
            return this.performSync(selectedItemPayloads).then(function () {
                _this.speedUpPolling();
            }, function () {
                _this.logService.warn('[synchronizationPanel] - Could not perform synchronization.');
                _this.toggleWaitModal(false);
            });
        }
        else {
            return Promise.resolve();
        }
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.selectionChange = function (index) {
        if (index === 0) {
            this.toggleAllDependentItems();
        }
        this.saveCurrentlySelectedItemsInStorage();
        this.selectedItemsUpdate.emit(this.getSelectedItems());
    };
    SynchronizationPanelComponent.prototype.selectionChange.$inject = ["index"];
    /* @ngInject */ SynchronizationPanelComponent.prototype.isSyncButtonDisabled = function () {
        return this.disableList || this.noSelectedItems() || this.syncQueue.hasAtLeastOneItem();
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.fetchSyncStatus = function (eventData) {
        return __awaiter(this, void 0, void 0, function () {
            var rootItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (eventData && eventData.itemId !== this.itemId) {
                            return [2 /*return*/];
                        }
                        this.isLoading = true;
                        return [4 /*yield*/, this.getSyncStatus(this.itemId)];
                    case 1:
                        rootItem = _a.sent();
                        this.setRootItem(rootItem);
                        this.restoreSelectionAfterFetchingUpdatedItems();
                        this.markExternalItems();
                        this.showSyncErrors();
                        this.updateSyncQueue();
                        this.setExternalItemsCatalogVersionName();
                        if (this.syncQueue.isEmpty()) {
                            this.slowDownPolling();
                            this.toggleWaitModal(false);
                        }
                        this.syncStatusReady.emit(this.getRootItem());
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    SynchronizationPanelComponent.prototype.fetchSyncStatus.$inject = ["eventData"];
    /* @ngInject */ SynchronizationPanelComponent.prototype.markExternalItems = function () {
        var rootItem = this.getRootItem();
        var rootItemCatalogVersion = rootItem.catalogVersionUuid;
        var dependentItems = this.getDependentItems();
        dependentItems.forEach(function (item) {
            item.isExternal = item.catalogVersionUuid !== rootItemCatalogVersion;
        });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getAllItems = function () {
        return this.isRootItemExist() ? __spreadArrays([this.getRootItem()], this.getDependentItems()) : [];
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.setExternalItemsCatalogVersionName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var experience, allItems, externalItems, catalogVersionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentExperience()];
                    case 1:
                        experience = _a.sent();
                        allItems = this.getAllItems();
                        externalItems = allItems.filter(function (item) { return synchronizationUtils.isExternalItem(item); });
                        catalogVersionPromises = externalItems.map(function (externalItem) {
                            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var catalogName;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.catalogService.getCatalogVersionByUuid(externalItem.catalogVersionUuid, experience.siteDescriptor.uid)];
                                        case 1:
                                            catalogName = (_a.sent()).catalogName;
                                            externalItem.catalogVersionName = catalogName;
                                            resolve(externalItem);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        return [4 /*yield*/, Promise.all(catalogVersionPromises)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.slowDownPolling = function () {
        this.resynchTimer.restart(DEFAULT_SYNCHRONIZATION_POLLING.SLOW_POLLING_TIME);
        this.systemEventService.publishAsync(DEFAULT_SYNCHRONIZATION_POLLING.SLOW_DOWN, this.SYNC_POLLING_SPEED_PREFIX + this.itemId);
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.speedUpPolling = function () {
        this.resynchTimer.restart(DEFAULT_SYNCHRONIZATION_POLLING.FAST_POLLING_TIME);
        this.systemEventService.publishAsync(DEFAULT_SYNCHRONIZATION_POLLING.SPEED_UP, this.SYNC_POLLING_SPEED_PREFIX + this.itemId);
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.setRootItem = function (rootItem) {
        this.rootItem = rootItem;
    };
    SynchronizationPanelComponent.prototype.setRootItem.$inject = ["rootItem"];
    /* @ngInject */ SynchronizationPanelComponent.prototype.getRootItem = function () {
        return this.rootItem;
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.isRootItemExist = function () {
        return this.getRootItem() != null;
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getDependentItems = function () {
        return this.isRootItemExist() ? this.getRootItem().selectedDependencies : [];
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getCurrentExperience = function () {
        return this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY);
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getSelectedItemPayloads = function () {
        return this.getSelectedItems().map(function (_a) {
            var itemId = _a.itemId, itemType = _a.itemType;
            return ({
                itemId: itemId,
                itemType: itemType
            });
        });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getSelectedItems = function () {
        return this.getAllItems().filter(function (item) { return item.selected; });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.toogleRootItem = function (selected) {
        if (this.isRootItemExist()) {
            var rootItem = this.getRootItem();
            rootItem.selected = selected;
            this.selectionChange(0);
        }
    };
    SynchronizationPanelComponent.prototype.toogleRootItem.$inject = ["selected"];
    /* @ngInject */ SynchronizationPanelComponent.prototype.toggleAllDependentItems = function () {
        var _this = this;
        this.getDependentItems()
            .filter(function (item) { return !synchronizationUtils.isInSync(item); })
            .filter(function (item) { return !synchronizationUtils.isExternalItem(item); })
            .forEach(function (item) {
            item.selected = _this.getRootItem().selected;
        });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.toggleWaitModal = function (show) {
        if (show) {
            this.waitDialogService.showWaitModal('se.sync.synchronizing');
        }
        else {
            this.waitDialogService.hideWaitModal();
        }
    };
    SynchronizationPanelComponent.prototype.toggleWaitModal.$inject = ["show"];
    /* @ngInject */ SynchronizationPanelComponent.prototype.saveCurrentlySelectedItemsInStorage = function () {
        this.selectedItemsStorage = this.getSelectedItems();
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.getSelectedItemsFromStorage = function () {
        return this.selectedItemsStorage || [];
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.restoreSelectionAfterFetchingUpdatedItems = function () {
        var selectedItemsFromStorage = this.getSelectedItemsFromStorage();
        var selectedItemsFromStorageIds = selectedItemsFromStorage.map(function (item) { return item.itemId; });
        this.getAllItems()
            .filter(function (item) { return !synchronizationUtils.isInSync(item); })
            .filter(function (item) { return selectedItemsFromStorageIds.indexOf(item.itemId) > -1; })
            .forEach(function (item) { return (item.selected = true); });
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.updateSyncQueue = function () {
        var _this = this;
        var syncQueueWasNotEmpty = this.syncQueue.hasAtLeastOneItem();
        var allItems = this.getAllItems();
        allItems
            .filter(function (item) { return _this.syncQueue.itemExists(item); })
            .filter(function (item) {
            return !(synchronizationUtils.isSyncInProgress(item) ||
                synchronizationUtils.isInNotSync(item));
        })
            .forEach(function (item) { return _this.syncQueue.removeItem(item); });
        allItems
            .filter(function (item) { return !_this.syncQueue.itemExists(item); })
            .filter(function (item) { return synchronizationUtils.isSyncInProgress(item); })
            .forEach(function (item) { return _this.syncQueue.addItems([item.itemId]); });
        var syncQueueIsNowEmpty = this.syncQueue.isEmpty();
        if (syncQueueWasNotEmpty && syncQueueIsNowEmpty) {
            this.systemEventService.publishAsync(smarteditcommons.EVENT_CONTENT_CATALOG_UPDATE);
        }
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.showSyncErrors = function () {
        var _this = this;
        var itemsInErrors = this.getAllItems()
            .filter(function (item) { return _this.syncQueue.itemExists(item); })
            .filter(function (item) { return synchronizationUtils.isSyncInFailed(item); })
            .map(function (item) { return item.itemId; });
        if (itemsInErrors.length > 0) {
            this.alertService.showDanger({
                message: this.translateService.instant('se.cms.synchronization.panel.failure.message', {
                    items: itemsInErrors.join(' ')
                })
            });
        }
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.atLeastOneSelectedItemExists = function () {
        return this.getSelectedItems().length > 0;
    };
    /* @ngInject */ SynchronizationPanelComponent.prototype.noSelectedItems = function () {
        return this.getSelectedItems().length === 0;
    };
    __decorate([
        core$1.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "itemId", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "selectAllLabel", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Function)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "getSyncStatus", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Function)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "performSync", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Boolean)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "showFooter", void 0);
    __decorate([
        core$1.Output(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "getApi", void 0);
    __decorate([
        core$1.Output(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "selectedItemsUpdate", void 0);
    __decorate([
        core$1.Output(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelComponent.prototype, "syncStatusReady", void 0);
    /* @ngInject */ SynchronizationPanelComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core$1.Component({
            selector: 'se-synchronization-panel',
            template: "<div class=\"se-sync-panel\"><se-message *ngIf=\"message\" [type]=\"message.type\"><ng-container se-message-description>{{ message.description }}</ng-container></se-message><div class=\"se-sync-panel__sync-info\" [style.visibility]=\"showItemList ? 'visible': 'hidden'\"><se-spinner [isSpinning]=\"isLoading\"></se-spinner><se-synchronization-panel-item *ngFor=\"let item of getAllItems(); let i = index\" class=\"se-sync-panel__row\" [index]=\"i\" [item]=\"item\" [rootItem]=\"getRootItem()\" [selectAllLabel]=\"selectAllLabel\" [disableList]=\"disableList\" [disableItem]=\"api.disableItem\" (selectionChange)=\"selectionChange($event)\"></se-synchronization-panel-item></div><div class=\"se-sync-panel__footer\" *ngIf=\"showFooter\"><button class=\"se-sync-panel__sync-btn fd-button--emphasized\" [disabled]=\"isSyncButtonDisabled()\" (click)=\"syncItems()\" translate=\"se.cms.actionitem.page.sync\"></button></div></div>",
            styles: [".se-sync-panel__sync-info{max-height:300px;overflow-y:auto}.se-sync-panel__row{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:0 20px;height:40px;border-bottom:1px solid #d9d9d9}.se-sync-panel__row:first-child{height:50px}.se-sync-panel__row:last-child{border-bottom:none}.se-sync-panel__footer{padding:20px;border-top:1px solid #d9d9d9;display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.se-sync-panel__sync-btn{text-transform:capitalize;padding:0 20px;margin-left:8px}"]
        }),
        __metadata("design:paramtypes", [smarteditcommons.IWaitDialogService,
            smarteditcommons.LogService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.SystemEventService,
            smarteditcommons.TimerService,
            smarteditcommons.IAlertService,
            core.TranslateService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.ICatalogService])
    ], /* @ngInject */ SynchronizationPanelComponent);
    return /* @ngInject */ SynchronizationPanelComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "SynchronizationPanelItemComponent", {
    selector: 'se-synchronization-panel-item',
    template: "<div class=\"se-sync-panel-item-checkbox fd-form__item\"><input *ngIf=\"!item.isExternal\" type=\"checkbox\" [id]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__field fd-form__control\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"onSelectionChange()\" [attr.disabled]=\"isItemDisabled() ? true : null\"/> <label *ngIf=\"index === 0\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label se-sync-panel-item-checkbox__label--select-all fd-form__label\" [title]=\"getSelectAllLabel() | translate\" [translate]=\"getSelectAllLabel()\"></label> <label *ngIf=\"index !== 0 && !item.isExternal\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [title]=\"item.name | translate\" [translate]=\"item.name\"></label><se-tooltip *ngIf=\"index !== 0 && item.isExternal\" [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\"><label se-tooltip-trigger [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [translate]=\"item.name\"></label><div se-tooltip-body translate=\"se.cms.synchronization.slot.external.component\"></div></se-tooltip></div><span *ngIf=\"showPopoverOverSyncIcon()\"><se-tooltip [isChevronVisible]=\"true\" [appendTo]=\"'body'\" [placement]=\"'left'\" [triggers]=\"['mouseenter', 'mouseleave']\" [title]=\"getInfoTitle()\" class=\"pull-right se-sync-panel-item-info-icon\" [ngClass]=\"{ 'se-sync-panel--icon-globe': item.isExternal }\"><ng-container *ngIf=\"!item.isExternal\" se-tooltip-trigger><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></ng-container><span *ngIf=\"item.isExternal\" class=\"sap-icon--globe\" se-tooltip-trigger></span><div se-tooltip-body><ng-container *ngIf=\"!item.isExternal\"><div *ngFor=\"let dependentItem of item.dependentItemTypesOutOfSync\">{{ dependentItem.i18nKey | translate }}</div></ng-container><div *ngIf=\"item.isExternal\">{{ item.catalogVersionName | seL10n | async }}</div></div></se-tooltip></span><span *ngIf=\"!showPopoverOverSyncIcon()\" class=\"pull-right se-sync-panel-item-info-icon\"><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></span><ng-template #syncInfoIcon><span [attr.status]=\"item.status\" class=\"se-sync-panel-item-info-icon__icon\" [ngClass]=\"{\n                'sap-icon--accept': isInSync(),\n                'sap-icon--message-warning': !isInSync()\n            }\"></span></ng-template>",
    styles: [".se-sync-panel-item-checkbox{display:flex;flex-direction:row;align-items:center;margin:0!important}.se-sync-panel-item-checkbox__field{margin:0}.se-sync-panel-item-checkbox__label{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;word-break:break-all;max-width:190px!important;margin:0!important;padding-left:8px;color:#32363a;text-transform:capitalize}.se-sync-panel-item-checkbox__label--select-all{font-weight:700!important}.se-sync-panel-item-info-icon{font-size:1.1428571429rem;line-height:1.25;font-weight:400}.se-sync-panel-item-info-icon__icon.sap-icon--accept{font-size:1.1428571429rem;line-height:1.25;font-weight:400;color:#0a7e3e}.se-sync-panel-item-info-icon__icon.sap-icon--message-warning{font-size:1.1428571429rem;line-height:1.25;font-weight:400;color:#e9730c}"]
});
var /* @ngInject */ SynchronizationPanelItemComponent = /** @class */ (function () {
    function /* @ngInject */ SynchronizationPanelItemComponent() {
        this.selectionChange = new core$1.EventEmitter();
    }
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.getSelectAllLabel = function () {
        return this.selectAllLabel || 'se.cms.synchronization.page.select.all.slots';
    };
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.isItemDisabled = function () {
        var _a;
        if (this.disableList || (this.disableItem && this.disableItem(this.item))) {
            return true;
        }
        return ((this.item !== this.rootItem && !!((_a = this.rootItem) === null || _a === void 0 ? void 0 : _a.selected)) ||
            synchronizationUtils.isInSync(this.item));
    };
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.showPopoverOverSyncIcon = function () {
        var _a;
        return (((_a = this.item.dependentItemTypesOutOfSync) === null || _a === void 0 ? void 0 : _a.length) > 0 ||
            synchronizationUtils.isExternalItem(this.item));
    };
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.getInfoTitle = function () {
        return !synchronizationUtils.isExternalItem(this.item)
            ? 'se.cms.synchronization.panel.update.title'
            : '';
    };
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.isInSync = function () {
        return synchronizationUtils.isInSync(this.item);
    };
    /* @ngInject */ SynchronizationPanelItemComponent.prototype.onSelectionChange = function () {
        this.selectionChange.emit(this.index);
    };
    __decorate([
        core$1.Input(),
        __metadata("design:type", Number)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "index", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "item", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "rootItem", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "selectAllLabel", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Boolean)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "disableList", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Function)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "disableItem", void 0);
    __decorate([
        core$1.Output(),
        __metadata("design:type", Object)
    ], /* @ngInject */ SynchronizationPanelItemComponent.prototype, "selectionChange", void 0);
    /* @ngInject */ SynchronizationPanelItemComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core$1.Component({
            selector: 'se-synchronization-panel-item',
            template: "<div class=\"se-sync-panel-item-checkbox fd-form__item\"><input *ngIf=\"!item.isExternal\" type=\"checkbox\" [id]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__field fd-form__control\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"onSelectionChange()\" [attr.disabled]=\"isItemDisabled() ? true : null\"/> <label *ngIf=\"index === 0\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label se-sync-panel-item-checkbox__label--select-all fd-form__label\" [title]=\"getSelectAllLabel() | translate\" [translate]=\"getSelectAllLabel()\"></label> <label *ngIf=\"index !== 0 && !item.isExternal\" [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [title]=\"item.name | translate\" [translate]=\"item.name\"></label><se-tooltip *ngIf=\"index !== 0 && item.isExternal\" [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\"><label se-tooltip-trigger [for]=\"'sync-info__checkbox_' + index\" class=\"se-sync-panel-item-checkbox__label fd-form__label\" [translate]=\"item.name\"></label><div se-tooltip-body translate=\"se.cms.synchronization.slot.external.component\"></div></se-tooltip></div><span *ngIf=\"showPopoverOverSyncIcon()\"><se-tooltip [isChevronVisible]=\"true\" [appendTo]=\"'body'\" [placement]=\"'left'\" [triggers]=\"['mouseenter', 'mouseleave']\" [title]=\"getInfoTitle()\" class=\"pull-right se-sync-panel-item-info-icon\" [ngClass]=\"{ 'se-sync-panel--icon-globe': item.isExternal }\"><ng-container *ngIf=\"!item.isExternal\" se-tooltip-trigger><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></ng-container><span *ngIf=\"item.isExternal\" class=\"sap-icon--globe\" se-tooltip-trigger></span><div se-tooltip-body><ng-container *ngIf=\"!item.isExternal\"><div *ngFor=\"let dependentItem of item.dependentItemTypesOutOfSync\">{{ dependentItem.i18nKey | translate }}</div></ng-container><div *ngIf=\"item.isExternal\">{{ item.catalogVersionName | seL10n | async }}</div></div></se-tooltip></span><span *ngIf=\"!showPopoverOverSyncIcon()\" class=\"pull-right se-sync-panel-item-info-icon\"><ng-container *ngTemplateOutlet=\"syncInfoIcon\"></ng-container></span><ng-template #syncInfoIcon><span [attr.status]=\"item.status\" class=\"se-sync-panel-item-info-icon__icon\" [ngClass]=\"{\n                'sap-icon--accept': isInSync(),\n                'sap-icon--message-warning': !isInSync()\n            }\"></span></ng-template>",
            styles: [".se-sync-panel-item-checkbox{display:flex;flex-direction:row;align-items:center;margin:0!important}.se-sync-panel-item-checkbox__field{margin:0}.se-sync-panel-item-checkbox__label{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;word-break:break-all;max-width:190px!important;margin:0!important;padding-left:8px;color:#32363a;text-transform:capitalize}.se-sync-panel-item-checkbox__label--select-all{font-weight:700!important}.se-sync-panel-item-info-icon{font-size:1.1428571429rem;line-height:1.25;font-weight:400}.se-sync-panel-item-info-icon__icon.sap-icon--accept{font-size:1.1428571429rem;line-height:1.25;font-weight:400;color:#0a7e3e}.se-sync-panel-item-info-icon__icon.sap-icon--message-warning{font-size:1.1428571429rem;line-height:1.25;font-weight:400;color:#e9730c}"]
        })
    ], /* @ngInject */ SynchronizationPanelItemComponent);
    return /* @ngInject */ SynchronizationPanelItemComponent;
}());

// TODO: Remove after all consumers (slotSyncButton, pageSyncMenuToolbarItem) has been migrated at least to TS. They should use imports instead.
var PROVIDE_DEFAULTS = [
    {
        provide: 'SYNCHRONIZATION_STATUSES',
        useValue: DEFAULT_SYNCHRONIZATION_STATUSES
    },
    {
        provide: 'SYNCHRONIZATION_POLLING',
        useValue: DEFAULT_SYNCHRONIZATION_POLLING
    },
    {
        provide: 'SYNCHRONIZATION_EVENT',
        useValue: DEFAULT_SYNCHRONIZATION_EVENT
    }
];
var SynchronizationPanelModule = /** @class */ (function () {
    function SynchronizationPanelModule() {
    }
    SynchronizationPanelModule = __decorate([
        core$1.NgModule({
            imports: [
                common.CommonModule,
                forms.FormsModule,
                smarteditcommons.TranslationModule.forChild(),
                smarteditcommons.TooltipModule,
                smarteditcommons.MessageModule,
                smarteditcommons.SpinnerModule,
                smarteditcommons.L10nPipeModule
            ],
            declarations: [SynchronizationPanelComponent, SynchronizationPanelItemComponent],
            entryComponents: [SynchronizationPanelComponent],
            providers: __spreadArrays(PROVIDE_DEFAULTS, [
                smarteditcommons.moduleUtils.initialize(function () {
                    smarteditcommons.diBridgeUtils.downgradeService('SYNCHRONIZATION_STATUSES', null, 'SYNCHRONIZATION_STATUSES');
                    smarteditcommons.diBridgeUtils.downgradeService('SYNCHRONIZATION_POLLING', null, 'SYNCHRONIZATION_POLLING');
                    smarteditcommons.diBridgeUtils.downgradeService('SYNCHRONIZATION_EVENT', null, 'SYNCHRONIZATION_EVENT');
                })
            ]),
            exports: [SynchronizationPanelComponent]
        })
    ], SynchronizationPanelModule);
    return SynchronizationPanelModule;
}());

var CATALOG_SYNC_INTERVAL_IN_MILLISECONDS = 5000;
var /* @ngInject */ SynchronizationService = /** @class */ (function () {
    SynchronizationService.$inject = ["restServiceFactory", "timerService", "translateService", "alertService", "authenticationService", "crossFrameEventService"];
    function /* @ngInject */ SynchronizationService(restServiceFactory, timerService, translateService, alertService, authenticationService, crossFrameEventService) {
        this.restServiceFactory = restServiceFactory;
        this.timerService = timerService;
        this.translateService = translateService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.crossFrameEventService = crossFrameEventService;
        // Constants
        this.BASE_URL = '/cmswebservices';
        this.SYNC_JOB_INFO_BY_TARGET_URI = '/cmswebservices/v1/catalogs/:catalog/synchronizations/targetversions/:target';
        this.SYNC_JOB_INFO_BY_SOURCE_AND_TARGET_URI = '/cmswebservices/v1/catalogs/:catalog/versions/:source/synchronizations/versions/:target';
        this.intervalHandle = {};
        this.syncRequested = [];
        this.syncJobInfoByTargetRestService = this.restServiceFactory.get(this.SYNC_JOB_INFO_BY_TARGET_URI);
        this.syncJobInfoBySourceAndTargetRestService = this.restServiceFactory.get(this.SYNC_JOB_INFO_BY_SOURCE_AND_TARGET_URI, 'catalog');
    }
    /**
     * This method is used to synchronize a catalog between two catalog versions.
     * It sends the SYNCHRONIZATION_EVENT.CATALOG_SYNCHRONIZED event if successful.
     */
    /* @ngInject */ SynchronizationService.prototype.updateCatalogSync = function (catalog) {
        return __awaiter(this, void 0, void 0, function () {
            var jobKey, response, reason_1, translationErrorMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jobKey = this._getJobKey(catalog.catalogId, catalog.sourceCatalogVersion, catalog.targetCatalogVersion);
                        this.addCatalogSyncRequest(jobKey);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.syncJobInfoBySourceAndTargetRestService.save({
                                catalog: catalog.catalogId,
                                source: catalog.sourceCatalogVersion,
                                target: catalog.targetCatalogVersion
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        reason_1 = _a.sent();
                        translationErrorMsg = this.translateService.instant('sync.running.error.msg', {
                            catalogName: catalog.name
                        });
                        if (reason_1.statusText === 'Conflict') {
                            this.alertService.showDanger({
                                message: translationErrorMsg
                            });
                        }
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SynchronizationService.prototype.updateCatalogSync.$inject = ["catalog"];
    /**
     * This method is used to get the status of the last synchronization job between two catalog versions.
     */
    /* @ngInject */ SynchronizationService.prototype.getCatalogSyncStatus = function (catalog) {
        if (catalog.sourceCatalogVersion) {
            return this.getSyncJobInfoBySourceAndTarget(catalog);
        }
        else {
            return this.getLastSyncJobInfoByTarget(catalog);
        }
    };
    SynchronizationService.prototype.getCatalogSyncStatus.$inject = ["catalog"];
    /**
     * This method is used to get the status of the last synchronization job between two catalog versions.
     */
    /* @ngInject */ SynchronizationService.prototype.getSyncJobInfoBySourceAndTarget = function (catalog) {
        return this.syncJobInfoBySourceAndTargetRestService.get({
            catalog: catalog.catalogId,
            source: catalog.sourceCatalogVersion,
            target: catalog.targetCatalogVersion
        });
    };
    SynchronizationService.prototype.getSyncJobInfoBySourceAndTarget.$inject = ["catalog"];
    /**
     * This method is used to get the status of the last synchronization job.
     */
    /* @ngInject */ SynchronizationService.prototype.getLastSyncJobInfoByTarget = function (catalog) {
        return this.syncJobInfoByTargetRestService.get({
            catalog: catalog.catalogId,
            target: catalog.targetCatalogVersion
        });
    };
    SynchronizationService.prototype.getLastSyncJobInfoByTarget.$inject = ["catalog"];
    /**
     * This method starts the auto synchronization status update in a catalog between two given catalog versions.
     */
    /* @ngInject */ SynchronizationService.prototype.startAutoGetSyncData = function (catalog, callback) {
        var _this = this;
        var catalogId = catalog.catalogId, sourceCatalogVersion = catalog.sourceCatalogVersion, targetCatalogVersion = catalog.targetCatalogVersion;
        var jobKey = this._getJobKey(catalogId, sourceCatalogVersion, targetCatalogVersion);
        var syncJobTimer = this.timerService.createTimer(function () { return _this._autoSyncCallback(catalog, callback, jobKey); }, CATALOG_SYNC_INTERVAL_IN_MILLISECONDS);
        syncJobTimer.start();
        this.intervalHandle[jobKey] = syncJobTimer;
    };
    SynchronizationService.prototype.startAutoGetSyncData.$inject = ["catalog", "callback"];
    /**
     * This method stops the auto synchronization status update in a catalog between two given catalog versions
     * or it marks the job with discardWhenNextSynced = true if there is a synchronization in progress. If the job is
     * marked with discardWhenNextSynced = true then it will be discarded when the synchronization process is finished or aborted.
     */
    /* @ngInject */ SynchronizationService.prototype.stopAutoGetSyncData = function (catalog) {
        var jobKey = this._getJobKey(catalog.catalogId, catalog.sourceCatalogVersion, catalog.targetCatalogVersion);
        if (this.intervalHandle[jobKey]) {
            if (this.syncRequested.indexOf(jobKey) > -1) {
                this.intervalHandle[jobKey].discardWhenNextSynced = true;
            }
            else {
                this.intervalHandle[jobKey].stop();
                this.intervalHandle[jobKey] = undefined;
            }
        }
    };
    SynchronizationService.prototype.stopAutoGetSyncData.$inject = ["catalog"];
    /* @ngInject */ SynchronizationService.prototype._autoSyncCallback = function (catalog, callback, jobKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, syncStatus, syncJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authenticationService.isAuthenticated(this.BASE_URL)];
                    case 1:
                        response = _a.sent();
                        if (!response) {
                            this.stopAutoGetSyncData(catalog);
                        }
                        return [4 /*yield*/, this.getCatalogSyncStatus(catalog)];
                    case 2:
                        syncStatus = _a.sent();
                        syncJob = this.syncRequestedCallback(catalog)(syncStatus);
                        callback(syncJob);
                        if (!this.intervalHandle[jobKey]) {
                            this.startAutoGetSyncData(catalog, callback);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SynchronizationService.prototype._autoSyncCallback.$inject = ["catalog", "callback", "jobKey"];
    /**
     * Method sends SYNCHRONIZATION_EVENT.CATALOG_SYNCHRONIZED event when synchronization process is finished.
     * It also stops polling if the job is not needed anymore (i.e. was marked with discardWhenNextSynced = true).
     */
    /* @ngInject */ SynchronizationService.prototype.syncRequestedCallback = function (catalog) {
        var _this = this;
        var jobKey = this._getJobKey(catalog.catalogId, catalog.sourceCatalogVersion, catalog.targetCatalogVersion);
        return function (response) {
            if (_this.catalogSyncInProgress(jobKey)) {
                if (_this.catalogSyncFinished(response)) {
                    _this.removeCatalogSyncRequest(jobKey);
                    _this.crossFrameEventService.publish(DEFAULT_SYNCHRONIZATION_EVENT.CATALOG_SYNCHRONIZED, catalog);
                }
                if ((_this.intervalHandle[jobKey].discardWhenNextSynced &&
                    _this.catalogSyncFinished(response)) ||
                    _this.catalogSyncAborted(response)) {
                    _this.intervalHandle[jobKey].stop();
                    _this.intervalHandle[jobKey] = undefined;
                    _this.removeCatalogSyncRequest(jobKey);
                }
            }
            return response;
        };
    };
    SynchronizationService.prototype.syncRequestedCallback.$inject = ["catalog"];
    /* @ngInject */ SynchronizationService.prototype.catalogSyncInProgress = function (jobKey) {
        return this.syncRequested.indexOf(jobKey) > -1;
    };
    SynchronizationService.prototype.catalogSyncInProgress.$inject = ["jobKey"];
    /* @ngInject */ SynchronizationService.prototype.catalogSyncFinished = function (response) {
        return response.syncStatus === exports.JOB_STATUS.FINISHED;
    };
    SynchronizationService.prototype.catalogSyncFinished.$inject = ["response"];
    /* @ngInject */ SynchronizationService.prototype.catalogSyncAborted = function (response) {
        return response.syncStatus === exports.JOB_STATUS.ABORTED;
    };
    SynchronizationService.prototype.catalogSyncAborted.$inject = ["response"];
    /* @ngInject */ SynchronizationService.prototype.removeCatalogSyncRequest = function (jobKey) {
        var index = this.syncRequested.indexOf(jobKey);
        if (index > -1) {
            this.syncRequested.splice(index, 1);
        }
    };
    SynchronizationService.prototype.removeCatalogSyncRequest.$inject = ["jobKey"];
    /* @ngInject */ SynchronizationService.prototype.addCatalogSyncRequest = function (jobKey) {
        if (this.syncRequested.indexOf(jobKey) === -1) {
            this.syncRequested.push(jobKey);
        }
    };
    SynchronizationService.prototype.addCatalogSyncRequest.$inject = ["jobKey"];
    /* @ngInject */ SynchronizationService.prototype._getJobKey = function (catalogId, sourceCatalogVersion, targetCatalogVersion) {
        return catalogId + '_' + sourceCatalogVersion + '_' + targetCatalogVersion;
    };
    SynchronizationService.prototype._getJobKey.$inject = ["catalogId", "sourceCatalogVersion", "targetCatalogVersion"];
    /* @ngInject */ SynchronizationService = __decorate([
        smarteditcommons.SeDowngradeService(),
        smarteditcommons.OperationContextRegistered('/cmswebservices/v1/catalogs/:catalog/synchronizations/targetversions/:target', smarteditcommons.OPERATION_CONTEXT.CMS),
        smarteditcommons.OperationContextRegistered('/cmswebservices/v1/catalogs/:catalog/versions/:source/synchronizations/versions/:target', smarteditcommons.OPERATION_CONTEXT.CMS),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.TimerService,
            core.TranslateService,
            smarteditcommons.IAlertService,
            smarteditcommons.IAuthenticationService,
            smarteditcommons.CrossFrameEventService])
    ], /* @ngInject */ SynchronizationService);
    return /* @ngInject */ SynchronizationService;
}());

/**
 * Convenience service to open an editor modal window for a given component type and component ID.
 *
 * Example:
 * We pass information about component to open method, and the component editor in form of modal appears.
 */
var IEditorModalService = /** @class */ (function () {
    function IEditorModalService() {
    }
    /**
     * Proxy function which delegates opening an editor modal for a given component type and component ID to the
     * SmartEdit container.
     *
     * @param componentAttributes The details of the component to be created/edited
     * @param componentAttributes.smarteditComponentUuid An optional universally unique UUID of the component if the component is being edited.
     * @param componentAttributes.smarteditComponentId An optional universally unique ID of the component if the component is being edited.
     * @param componentAttributes.smarteditComponentType The component type
     * @param componentAttributes.smarteditCatalogVersionUuid The smartedit catalog version UUID to add the component to.
     * @param componentAttributes.catalogVersionUuid The catalog version UUID to add the component to.
     * @param componentAttributes.initialDirty Is the component dirty.
     * @param componentAttributes.content An optional content for create operation. It's ignored if componentAttributes.smarteditComponentUuid is defined.
     * @param targetSlotId The ID of the slot in which the component is placed.
     * @param position The position in a given slot where the component should be placed.
     * @param targetedQualifier Causes the genericEditor to switch to the tab containing a qualifier of the given name.
     * @param saveCallback The optional function that is executed if the user clicks the Save button and the modal closes successfully. The function provides one parameter: item that has been saved.
     * @param editorStackId The string that identifies the stack of editors being edited together.
     *
     * @returns A promise that resolves to the data returned by the modal when it is closed.
     */
    IEditorModalService.prototype.open = function (componentAttributes, targetSlotId, position, targetedQualifier, saveCallback, editorStackId) {
        'proxyFunction';
        return null;
    };
    /**
     * Proxy function which delegates opening an editor modal for a given component type and component ID to the
     * SmartEdit container.
     *
     * @param componentType The type of component as defined in the platform.
     * @param componentUuid The UUID of the component as defined in the database.
     * @param targetedQualifier Causes the genericEditor to switch to the tab containing a qualifier of the given name.
     * @param saveCallback The optional function that is executed if the user clicks the Save button and the modal closes successfully. The function provides one parameter: item that has been saved.
     * @param editorStackId The string that identifies the stack of editors being edited together.
     *
     * @returns A promise that resolves to the data returned by the modal when it is closed.
     */
    IEditorModalService.prototype.openAndRerenderSlot = function (componentType, componentUuid, targetedQualifier, saveCallback, editorStackId) {
        'proxyFunction';
        return null;
    };
    /**
     * Proxy function which delegates opening an generic editor modal for a given IGenericEditorModalServiceComponent data object
     *
     * @param componentData Object that contains all parameters for generic editor.
     * @param saveCallback the save callback that is triggered after submit.
     * @param errorCallback the error callback that is triggered after submit.
     * @returns A promise that resolves to the data returned by the modal when it is closed.
     */
    IEditorModalService.prototype.openGenericEditor = function (data, saveCallback, errorCallback, config) {
        'proxyFunction';
        return null;
    };
    return IEditorModalService;
}());

var ISyncPollingService = /** @class */ (function () {
    function ISyncPollingService() {
    }
    ISyncPollingService.prototype.registerSyncPollingEvents = function () {
        'proxyFunction';
        return null;
    };
    ISyncPollingService.prototype.changePollingSpeed = function (eventId, itemId) {
        'proxyFunction';
        return null;
    };
    ISyncPollingService.prototype.fetchSyncStatus = function (_pageUUID, uriContext) {
        'proxyFunction';
        return null;
    };
    ISyncPollingService.prototype.performSync = function (array, uriContext) {
        'proxyFunction';
        return null;
    };
    ISyncPollingService.prototype.getSyncStatus = function (pageUUID, uriContext, forceGetSynchronization) {
        'proxyFunction';
        return null;
    };
    return ISyncPollingService;
}());

/**
 * Service for time management functionality.
 */
var /* @ngInject */ CMSTimeService = /** @class */ (function () {
    CMSTimeService.$inject = ["translate"];
    function /* @ngInject */ CMSTimeService(translate) {
        this.translate = translate;
    }
    /**
     * Give a time difference in milliseconds, this method returns a string that determines time in ago.
     *
     * Examples:
     * If the diff is less then 24 hours, the result is in hours eg: 17 hour(s) ago.
     * If the diff is more than a day, the result is in days, eg: 2 day(s) ago.
     *
     * @param timeDiff The time difference in milliseconds.
     */
    /* @ngInject */ CMSTimeService.prototype.getTimeAgo = function (timeDiff) {
        var timeAgoInDays = Math.floor(moment.duration(timeDiff).asDays());
        var timeAgoInHours = Math.floor(moment.duration(timeDiff).asHours());
        if (timeAgoInDays >= 1) {
            return (timeAgoInDays +
                ' ' +
                this.translate.instant('se.cms.actionitem.page.workflow.action.started.days.ago'));
        }
        else if (timeAgoInHours >= 1) {
            return (timeAgoInHours +
                ' ' +
                this.translate.instant('se.cms.actionitem.page.workflow.action.started.hours.ago'));
        }
        return ('<1 ' +
            this.translate.instant('se.cms.actionitem.page.workflow.action.started.hours.ago'));
    };
    CMSTimeService.prototype.getTimeAgo.$inject = ["timeDiff"];
    /* @ngInject */ CMSTimeService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [core.TranslateService])
    ], /* @ngInject */ CMSTimeService);
    return /* @ngInject */ CMSTimeService;
}());

var /* @ngInject */ CMSModesService = /** @class */ (function () {
    CMSModesService.$inject = ["perspectiveService"];
    function /* @ngInject */ CMSModesService(perspectiveService) {
        this.perspectiveService = perspectiveService;
    }
    /* @ngInject */ CMSModesService_1 = /* @ngInject */ CMSModesService;
    /**
     * Returns a promise that resolves to a boolean which is true if the current perspective loaded is versioning, false otherwise.
     */
    /* @ngInject */ CMSModesService.prototype.isVersioningPerspectiveActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activePerspectiveKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.perspectiveService.getActivePerspectiveKey()];
                    case 1:
                        activePerspectiveKey = _a.sent();
                        return [2 /*return*/, activePerspectiveKey === /* @ngInject */ CMSModesService_1.VERSIONING_PERSPECTIVE_KEY];
                }
            });
        });
    };
    var /* @ngInject */ CMSModesService_1;
    /* @ngInject */ CMSModesService.BASIC_PERSPECTIVE_KEY = 'se.cms.perspective.basic';
    /* @ngInject */ CMSModesService.ADVANCED_PERSPECTIVE_KEY = 'se.cms.perspective.advanced';
    /* @ngInject */ CMSModesService.VERSIONING_PERSPECTIVE_KEY = 'se.cms.perspective.versioning';
    /* @ngInject */ CMSModesService = /* @ngInject */ CMSModesService_1 = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IPerspectiveService])
    ], /* @ngInject */ CMSModesService);
    return /* @ngInject */ CMSModesService;
}());

var /* @ngInject */ VersionExperienceInterceptor = /** @class */ (function () {
    VersionExperienceInterceptor.$inject = ["sharedDataService"];
    function /* @ngInject */ VersionExperienceInterceptor(sharedDataService) {
        this.sharedDataService = sharedDataService;
    }
    /* @ngInject */ VersionExperienceInterceptor_1 = /* @ngInject */ VersionExperienceInterceptor;
    /* @ngInject */ VersionExperienceInterceptor.prototype.intercept = function (request, next) {
        if (this.isGET(request) && this.isPreviewDataTypeResourceEndpoint(request.url)) {
            return rxjs.from(this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)).pipe(operators.switchMap(function (experience) {
                if (experience.versionId) {
                    var newReq = request.clone({
                        url: request.url.replace(/* @ngInject */ VersionExperienceInterceptor_1.MODE_DEFAULT, /* @ngInject */ VersionExperienceInterceptor_1.MODE_PREVIEW_VERSION)
                    });
                    return next.handle(newReq);
                }
                else {
                    return next.handle(request);
                }
            }));
        }
        else {
            return next.handle(request);
        }
    };
    VersionExperienceInterceptor.prototype.intercept.$inject = ["request", "next"];
    /* @ngInject */ VersionExperienceInterceptor.prototype.isGET = function (request) {
        return request.method === 'GET';
    };
    VersionExperienceInterceptor.prototype.isGET.$inject = ["request"];
    /* @ngInject */ VersionExperienceInterceptor.prototype.isPreviewDataTypeResourceEndpoint = function (url) {
        return (url.indexOf(TYPES_RESOURCE_URI) > -1 &&
            url.indexOf(/* @ngInject */ VersionExperienceInterceptor_1.PREVIEW_DATA_TYPE) > -1);
    };
    VersionExperienceInterceptor.prototype.isPreviewDataTypeResourceEndpoint.$inject = ["url"];
    var /* @ngInject */ VersionExperienceInterceptor_1;
    /* @ngInject */ VersionExperienceInterceptor.MODE_DEFAULT = 'DEFAULT';
    /* @ngInject */ VersionExperienceInterceptor.MODE_PREVIEW_VERSION = 'PREVIEWVERSION';
    /* @ngInject */ VersionExperienceInterceptor.PREVIEW_DATA_TYPE = 'PreviewData';
    /* @ngInject */ VersionExperienceInterceptor = /* @ngInject */ VersionExperienceInterceptor_1 = __decorate([
        core$1.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.ISharedDataService])
    ], /* @ngInject */ VersionExperienceInterceptor);
    return /* @ngInject */ VersionExperienceInterceptor;
}());

/**
 * Service used to determine if a component is shared.
 */
var IComponentSharedService = /** @class */ (function () {
    function IComponentSharedService() {
    }
    /**
     * This method is used to determine if a component is shared.
     * A component is considered shared if it is used in two or more content slots.
     */
    IComponentSharedService.prototype.isComponentShared = function (component) {
        'proxyFunction';
        return null;
    };
    return IComponentSharedService;
}());

(function (TypePermissionNames) {
    TypePermissionNames["CREATE"] = "create";
    TypePermissionNames["READ"] = "read";
    TypePermissionNames["CHANGE"] = "change";
    TypePermissionNames["REMOVE"] = "remove";
})(exports.TypePermissionNames || (exports.TypePermissionNames = {}));
/**
 * Rest Service to retrieve the type permissions.
 */
var /* @ngInject */ TypePermissionsRestService = /** @class */ (function () {
    TypePermissionsRestService.$inject = ["logService", "sessionService", "restServiceFactory"];
    function /* @ngInject */ TypePermissionsRestService(logService, sessionService, restServiceFactory) {
        this.logService = logService;
        this.sessionService = sessionService;
        this.URI = '/permissionswebservices/v1/permissions/types/search';
        this.resource = restServiceFactory.get(this.URI);
    }
    /**
     * Determines if the current user has CREATE access to the given types.
     *
     * @param types The codes of all types.
     * @returns A promise that resolves to a TypedMap object with key (the code) and
     * value (true if the user has CREATE access to the type or false otherwise).
     */
    /* @ngInject */ TypePermissionsRestService.prototype.hasCreatePermissionForTypes = function (types) {
        return this.getPermissionsForTypesAndName(types, exports.TypePermissionNames.CREATE);
    };
    TypePermissionsRestService.prototype.hasCreatePermissionForTypes.$inject = ["types"];
    /**
     * Determines if the current user has READ access to the given types.
     *
     * @param types The codes of all types.
     * @returns A promise that resolves to a TypedMap object with key (the code) and
     * value (true if the user has READ access to the type or false otherwise).
     */
    /* @ngInject */ TypePermissionsRestService.prototype.hasReadPermissionForTypes = function (types) {
        return this.getPermissionsForTypesAndName(types, exports.TypePermissionNames.READ);
    };
    TypePermissionsRestService.prototype.hasReadPermissionForTypes.$inject = ["types"];
    /**
     * Determines if the current user has CHANGE access to the given types.
     *
     * @param types The codes of all types.
     * @returns A promise that resolves to a TypedMap object with key (the code) and
     * value (true if the user has CHANGE access to the type or false otherwise).
     */
    /* @ngInject */ TypePermissionsRestService.prototype.hasUpdatePermissionForTypes = function (types) {
        return this.getPermissionsForTypesAndName(types, exports.TypePermissionNames.CHANGE);
    };
    TypePermissionsRestService.prototype.hasUpdatePermissionForTypes.$inject = ["types"];
    /**
     * Determines if the current user has REMOVE access to the given types.
     *
     * @param types The codes of all types.
     * @returns A promise that resolves to a TypedMap object with key (the code) and
     * value (true if the user has REMOVE access to the type or false otherwise).
     */
    /* @ngInject */ TypePermissionsRestService.prototype.hasDeletePermissionForTypes = function (types) {
        return this.getPermissionsForTypesAndName(types, exports.TypePermissionNames.REMOVE);
    };
    TypePermissionsRestService.prototype.hasDeletePermissionForTypes.$inject = ["types"];
    /**
     * Determines if the current user has READ, CREATE, CHANGE, REMOVE access to the given types.
     *
     * @param types The codes of all types.
     * @returns A promise that resolves to a TypedMap of TypedMap object with key (the code) and
     * value (true if the user has corresponding access to the type or false otherwise).
     * {
     *  "typeA": {"read": true, "change": false, "create": true, "remove": true},
     *  "typeB": {"read": true, "change": false, "create": true, "remove": false}
     * }
     */
    /* @ngInject */ TypePermissionsRestService.prototype.hasAllPermissionsForTypes = function (types) {
        return __awaiter(this, void 0, void 0, function () {
            var initialMap, permissionsForTypes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialMap = {};
                        return [4 /*yield*/, this.getAllPermissionsForTypes(types)];
                    case 1:
                        permissionsForTypes = _a.sent();
                        return [2 /*return*/, permissionsForTypes.reduce(function (map, permissionsResult) {
                                if (permissionsResult.permissions) {
                                    map[permissionsResult.id] = {};
                                    map[permissionsResult.id][exports.TypePermissionNames.READ] = _this.getPermissionByNameAndResult(permissionsResult, exports.TypePermissionNames.READ);
                                    map[permissionsResult.id][exports.TypePermissionNames.CHANGE] = _this.getPermissionByNameAndResult(permissionsResult, exports.TypePermissionNames.CHANGE);
                                    map[permissionsResult.id][exports.TypePermissionNames.CREATE] = _this.getPermissionByNameAndResult(permissionsResult, exports.TypePermissionNames.CREATE);
                                    map[permissionsResult.id][exports.TypePermissionNames.REMOVE] = _this.getPermissionByNameAndResult(permissionsResult, exports.TypePermissionNames.REMOVE);
                                }
                                return map;
                            }, initialMap)];
                }
            });
        });
    };
    TypePermissionsRestService.prototype.hasAllPermissionsForTypes.$inject = ["types"];
    /* @ngInject */ TypePermissionsRestService.prototype.getAllPermissionsForTypes = function (types) {
        return __awaiter(this, void 0, void 0, function () {
            var user, permissionNames, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (types.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.sessionService.getCurrentUsername()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, []];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        permissionNames = [
                            exports.TypePermissionNames.CREATE,
                            exports.TypePermissionNames.CHANGE,
                            exports.TypePermissionNames.READ,
                            exports.TypePermissionNames.REMOVE
                        ].join(',');
                        return [4 /*yield*/, this.resource.queryByPost({ principalUid: user }, { types: types.join(','), permissionNames: permissionNames })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.permissionsList || []];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1) {
                            this.logService.error("TypePermissionsRestService - no composed types " + types + " exist");
                        }
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TypePermissionsRestService.prototype.getAllPermissionsForTypes.$inject = ["types"];
    /* @ngInject */ TypePermissionsRestService.prototype.getPermissionByNameAndResult = function (permissionsResult, permissionName) {
        var foundPermission = permissionsResult.permissions.find(function (permission) { return permission.key === permissionName; });
        return JSON.parse(foundPermission.value);
    };
    TypePermissionsRestService.prototype.getPermissionByNameAndResult.$inject = ["permissionsResult", "permissionName"];
    /* @ngInject */ TypePermissionsRestService.prototype.getPermissionsForTypesAndName = function (types, permissionName) {
        return __awaiter(this, void 0, void 0, function () {
            var permissionsForTypes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPermissionsForTypes(types)];
                    case 1:
                        permissionsForTypes = _a.sent();
                        return [2 /*return*/, permissionsForTypes.reduce(function (map, permissionsResult) {
                                if (permissionsResult.permissions) {
                                    map[permissionsResult.id] = _this.getPermissionByNameAndResult(permissionsResult, permissionName);
                                }
                                return map;
                            }, {})];
                }
            });
        });
    };
    TypePermissionsRestService.prototype.getPermissionsForTypesAndName.$inject = ["types", "permissionName"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.authorizationEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ TypePermissionsRestService.prototype, "getAllPermissionsForTypes", null);
    /* @ngInject */ TypePermissionsRestService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.ISessionService,
            smarteditcommons.IRestServiceFactory])
    ], /* @ngInject */ TypePermissionsRestService);
    return /* @ngInject */ TypePermissionsRestService;
}());

/**
 * An enum type representing available attribute permission names for a given item
 */
var AttributePermissionNames;
(function (AttributePermissionNames) {
    AttributePermissionNames["READ"] = "read";
    AttributePermissionNames["CHANGE"] = "change";
})(AttributePermissionNames || (AttributePermissionNames = {}));
/**
 * Rest Service to retrieve attribute permissions.
 */
var /* @ngInject */ AttributePermissionsRestService = /** @class */ (function () {
    AttributePermissionsRestService.$inject = ["restServiceFactory", "sessionService", "logService"];
    function /* @ngInject */ AttributePermissionsRestService(restServiceFactory, sessionService, logService) {
        this.sessionService = sessionService;
        this.logService = logService;
        this.ATTRIBUTE_PERMISSIONS_URI = '/permissionswebservices/v1/permissions/attributes/search';
        this.permissionRestService = restServiceFactory.get(this.ATTRIBUTE_PERMISSIONS_URI);
    }
    /**
     * Determines if the current user has READ access to the given attributes in the given type.
     *
     * @param type The type enclosing the attributes for which to evaluate their read permissions.
     * @param attributeNames The names of the attributes for which to evaluate their read permissions.
     * @returns A promise that resolves to a TypedMap object with key (the attribute name) and
     * value (true if the user has READ access to the type or false otherwise).
     */
    /* @ngInject */ AttributePermissionsRestService.prototype.hasReadPermissionOnAttributesInType = function (type, attributeNames) {
        return this.getPermissionsForAttributesAndNameByType(type, attributeNames, AttributePermissionNames.READ);
    };
    AttributePermissionsRestService.prototype.hasReadPermissionOnAttributesInType.$inject = ["type", "attributeNames"];
    /**
     * Determines if the current user has CHANGE access to the given attributes in the given type.
     *
     * @param type The type enclosing the attributes for which to evaluate their change permissions.
     * @param attributeNames The names of the attributes for which to evaluate their change permissions.
     * @returns A promise that resolves to a TypedMap object with key (the attribute name) and
     * value (true if the user has READ access to the type or false otherwise).
     */
    /* @ngInject */ AttributePermissionsRestService.prototype.hasChangePermissionOnAttributesInType = function (type, attributeNames) {
        return this.getPermissionsForAttributesAndNameByType(type, attributeNames, AttributePermissionNames.CHANGE);
    };
    AttributePermissionsRestService.prototype.hasChangePermissionOnAttributesInType.$inject = ["type", "attributeNames"];
    /**
     * @internal
     *
     * This method retrieves ALL the permissions the current user has on the given attributes. Attributes are expected with the following format:
     * - type.attribute name
     * For example, for an attribute called approvalStatus within the type ContentPage, the given attribute must be:
     * - ContentPage.approvalStatus
     *
     * Note: This method is cached.
     *
     * @param attributes The list of attributes for which to retrieve permissions
     * @returns A promise that resolves to a list of IPermissionsRestServiceResult, each of which
     * represents the permissions of one of the given attributes.
     */
    /* @ngInject */ AttributePermissionsRestService.prototype.getAllPermissionsForAttributes = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (attributes.length <= 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.sessionService.getCurrentUsername()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, []];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.permissionRestService.queryByPost({ principalUid: user }, {
                                attributes: attributes.join(','),
                                permissionNames: AttributePermissionNames.CHANGE + ',' + AttributePermissionNames.READ
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.permissionsList || []];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1) {
                            this.logService.error("AttributePermissionsRestService - couldn't retrieve attribute permissions " + attributes);
                        }
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AttributePermissionsRestService.prototype.getAllPermissionsForAttributes.$inject = ["attributes"];
    /* @ngInject */ AttributePermissionsRestService.prototype.getPermissionsForAttributesAndNameByType = function (type, attributes, permissionName) {
        var convertedAttributeNames = attributes.map(function (attr) { return type + '.' + attr; });
        return this.getPermissionsForAttributesAndName(convertedAttributeNames, permissionName).then(function (attributePermissionsByTypeMap) {
            return attributePermissionsByTypeMap[type];
        });
    };
    AttributePermissionsRestService.prototype.getPermissionsForAttributesAndNameByType.$inject = ["type", "attributes", "permissionName"];
    /* @ngInject */ AttributePermissionsRestService.prototype.getPermissionsForAttributesAndName = function (attributes, permissionName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, allPermissions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPermissionsForAttributes(attributes)];
                    case 1:
                        result = _a.sent();
                        allPermissions = this.concatPermissionsNotFound(attributes, result);
                        return [2 /*return*/, allPermissions.reduce(function (attributePermissionsByTypeMap, permissionsResult) {
                                if (permissionsResult.permissions) {
                                    var typeAttributePair = _this.parsePermissionsResultId(permissionsResult.id);
                                    if (!attributePermissionsByTypeMap[typeAttributePair.type]) {
                                        attributePermissionsByTypeMap[typeAttributePair.type] = {};
                                    }
                                    attributePermissionsByTypeMap[typeAttributePair.type][typeAttributePair.attribute] = _this.getPermissionByNameFromResult(permissionsResult, permissionName);
                                }
                                return attributePermissionsByTypeMap;
                            }, {})];
                }
            });
        });
    };
    AttributePermissionsRestService.prototype.getPermissionsForAttributesAndName.$inject = ["attributes", "permissionName"];
    /* @ngInject */ AttributePermissionsRestService.prototype.parsePermissionsResultId = function (id) {
        var tokens = id.split('.');
        if (tokens.length !== 2) {
            throw new Error('AttributePermissionsRestService - Received invalid attribute permissions');
        }
        return {
            type: tokens[0],
            attribute: tokens[1]
        };
    };
    AttributePermissionsRestService.prototype.parsePermissionsResultId.$inject = ["id"];
    /* @ngInject */ AttributePermissionsRestService.prototype.getPermissionByNameFromResult = function (permissionsResult, permissionName) {
        var foundPermission = permissionsResult.permissions.find(function (permission) { return permission.key === permissionName; });
        return JSON.parse(foundPermission.value);
    };
    AttributePermissionsRestService.prototype.getPermissionByNameFromResult.$inject = ["permissionsResult", "permissionName"];
    /* @ngInject */ AttributePermissionsRestService.prototype.concatPermissionsNotFound = function (attributes, permissionsFound) {
        var permissionKeysFound = permissionsFound.map(function (permission) { return permission.id; });
        var permissionKeysNotFound = lodash.difference(attributes, permissionKeysFound);
        return permissionsFound.concat(permissionKeysNotFound.map(function (key) { return ({
            id: key,
            permissions: [
                {
                    key: AttributePermissionNames.READ,
                    value: 'false'
                },
                {
                    key: AttributePermissionNames.CHANGE,
                    value: 'false'
                }
            ]
        }); }));
    };
    AttributePermissionsRestService.prototype.concatPermissionsNotFound.$inject = ["attributes", "permissionsFound"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.authorizationEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ AttributePermissionsRestService.prototype, "getAllPermissionsForAttributes", null);
    /* @ngInject */ AttributePermissionsRestService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IRestServiceFactory,
            smarteditcommons.ISessionService,
            smarteditcommons.LogService])
    ], /* @ngInject */ AttributePermissionsRestService);
    return /* @ngInject */ AttributePermissionsRestService;
}());

/**
 * Service interface specifying the contract used to remove a component from a slot.
 * This class serves as an interface and should be extended, not instantiated.
 */
var IRemoveComponentService = /** @class */ (function () {
    function IRemoveComponentService() {
    }
    /**
     * Removes the component specified by the given ID from the component specified by the given ID.
     *
     * @param slotId The ID of the slot from which to remove the component.
     * @param componentId The ID of the component to remove from the slot.
     */
    IRemoveComponentService.prototype.removeComponent = function (configuration) {
        'proxyFunction';
        return null;
    };
    return IRemoveComponentService;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function (COMPONENT_IN_SLOT_STATUS) {
    COMPONENT_IN_SLOT_STATUS["ALLOWED"] = "allowed";
    COMPONENT_IN_SLOT_STATUS["DISALLOWED"] = "disallowed";
    COMPONENT_IN_SLOT_STATUS["MAYBEALLOWED"] = "mayBeAllowed";
})(exports.COMPONENT_IN_SLOT_STATUS || (exports.COMPONENT_IN_SLOT_STATUS = {}));
/**
 * Provide methods that cache and return the restrictions of a slot in a page.
 * This restrictions determine whether a component of a certain type is allowed or forbidden in a particular slot.
 */
var ISlotRestrictionsService = /** @class */ (function () {
    function ISlotRestrictionsService() {
    }
    /**
     * This methods retrieves the list of component types droppable in at least one of the slots of the current page.
     *
     * @returns Promise containing an array with the component types droppable on the current page.
     *
     * **Deprecated since 2005**
     * @deprecated
     */
    ISlotRestrictionsService.prototype.getAllComponentTypesSupportedOnPage = function () {
        'proxyFunction';
        return null;
    };
    /**
     * This methods retrieves the list of restrictions applied to the slot identified by the provided ID.
     *
     * @returns Promise containing an array with the restrictions applied to the slot.
     */
    ISlotRestrictionsService.prototype.getSlotRestrictions = function (slotId) {
        'proxyFunction';
        return null;
    };
    ISlotRestrictionsService.prototype.isSlotEditable = function (slotId) {
        'proxyFunction';
        return null;
    };
    ISlotRestrictionsService.prototype.isComponentAllowedInSlot = function (slot, dragInfo) {
        'proxyFunction';
        return null;
    };
    return ISlotRestrictionsService;
}());

window.__smartedit__.addDecoratorPayload("Component", "ActionableAlertComponent", {
    selector: 'se-actionable-alert',
    changeDetection: core$1.ChangeDetectionStrategy.OnPush,
    template: "<div>\n        <p>{{ description | translate: descriptionDetails }}</p>\n        <div>\n            <a href (click)=\"onHyperLinkClick($event)\">{{\n                hyperlinkLabel | translate: hyperlinkDetails\n            }}</a>\n        </div>\n    </div> "
});
var ActionableAlertComponent = /** @class */ (function () {
    function ActionableAlertComponent() {
        this.hyperLinkClick = new core$1.EventEmitter();
    }
    ActionableAlertComponent.prototype.onHyperLinkClick = function (event) {
        event.preventDefault();
        this.hyperLinkClick.emit();
    };
    __decorate([
        core$1.Input(),
        __metadata("design:type", String)
    ], ActionableAlertComponent.prototype, "description", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Object)
    ], ActionableAlertComponent.prototype, "descriptionDetails", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", String)
    ], ActionableAlertComponent.prototype, "hyperlinkLabel", void 0);
    __decorate([
        core$1.Input(),
        __metadata("design:type", Object)
    ], ActionableAlertComponent.prototype, "hyperlinkDetails", void 0);
    __decorate([
        core$1.Output(),
        __metadata("design:type", core$1.EventEmitter)
    ], ActionableAlertComponent.prototype, "hyperLinkClick", void 0);
    ActionableAlertComponent = __decorate([
        core$1.Component({
            selector: 'se-actionable-alert',
            changeDetection: core$1.ChangeDetectionStrategy.OnPush,
            template: "<div>\n        <p>{{ description | translate: descriptionDetails }}</p>\n        <div>\n            <a href (click)=\"onHyperLinkClick($event)\">{{\n                hyperlinkLabel | translate: hyperlinkDetails\n            }}</a>\n        </div>\n    </div> "
        }),
        __metadata("design:paramtypes", [])
    ], ActionableAlertComponent);
    return ActionableAlertComponent;
}());

/**
 * Displays an alert informing the user possibility to edit Component Settings when the component is hidden or restricted.
 * Provides an instant feedback for the user so he can still change some settings instead of searching the Storefront for
 * the slot to which the component belongs.
 *
 * When the user clicks on the link, the Alert will be closed and Component Settings will be reopened.
 * When no action is performed, the alert will disappear after a few seconds.
 */
var IComponentVisibilityAlertService = /** @class */ (function () {
    function IComponentVisibilityAlertService() {
    }
    /**
     * Method checks on a component visibility and triggers the display of a
     * contextual alert when the component is either hidden or restricted.
     */
    IComponentVisibilityAlertService.prototype.checkAndAlertOnComponentVisibility = function (component) {
        'proxyFunction';
        return null;
    };
    return IComponentVisibilityAlertService;
}());

window.__smartedit__.addDecoratorPayload("Component", "ComponentVisibilityAlertComponent", {
    selector: 'se-component-visibility-alert',
    template: "<div>\n        <p [translate]=\"message\"></p>\n        <div>\n            <a (click)=\"onClick()\" [translate]=\"hyperlinkLabel\"></a>\n        </div>\n    </div>",
    changeDetection: core$1.ChangeDetectionStrategy.OnPush
});
var /* @ngInject */ ComponentVisibilityAlertComponent = /** @class */ (function () {
    ComponentVisibilityAlertComponent.$inject = ["editorModalService", "componentVisibilityAlertService", "alertRef"];
    function /* @ngInject */ ComponentVisibilityAlertComponent(editorModalService, componentVisibilityAlertService, alertRef) {
        var _a;
        this.editorModalService = editorModalService;
        this.componentVisibilityAlertService = componentVisibilityAlertService;
        this.alertRef = alertRef;
        this.hyperlinkLabel = 'se.cms.component.visibility.alert.hyperlink';
        (_a = this.alertRef.data, this.component = _a.component, this.message = _a.message);
    }
    /* @ngInject */ ComponentVisibilityAlertComponent.prototype.onClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.alertRef.dismiss();
                        this.checkProvidedArguments(this.component);
                        return [4 /*yield*/, this.editorModalService.openAndRerenderSlot(this.component.itemType, this.component.itemId, 'visibilityTab')];
                    case 1:
                        item = _a.sent();
                        this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                            itemId: item.uuid,
                            itemType: item.itemtype,
                            catalogVersion: item.catalogVersion,
                            restricted: item.restricted,
                            slotId: this.component.slotId,
                            visible: item.visible
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO: since we can leverage TypeScript it could possibly be removed once we migrate each consumer.
    /* @ngInject */ ComponentVisibilityAlertComponent.prototype.checkProvidedArguments = function (component) {
        var checkedArguments = [component.itemId, component.itemType, component.slotId];
        var nonEmptyArguments = checkedArguments.filter(function (value) { return value && !smarteditcommons.stringUtils.isBlank(value); });
        if (nonEmptyArguments.length !== checkedArguments.length) {
            throw new Error('componentVisibilityAlertService.checkAndAlertOnComponentVisibility - missing properly typed parameters');
        }
    };
    ComponentVisibilityAlertComponent.prototype.checkProvidedArguments.$inject = ["component"];
    /* @ngInject */ ComponentVisibilityAlertComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core$1.Component({
            selector: 'se-component-visibility-alert',
            template: "<div>\n        <p [translate]=\"message\"></p>\n        <div>\n            <a (click)=\"onClick()\" [translate]=\"hyperlinkLabel\"></a>\n        </div>\n    </div>",
            changeDetection: core$1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [IEditorModalService,
            IComponentVisibilityAlertService,
            core$2.AlertRef])
    ], /* @ngInject */ ComponentVisibilityAlertComponent);
    return /* @ngInject */ ComponentVisibilityAlertComponent;
}());

var ComponentVisibilityAlertModule = /** @class */ (function () {
    function ComponentVisibilityAlertModule() {
    }
    ComponentVisibilityAlertModule = __decorate([
        core$1.NgModule({
            imports: [smarteditcommons.TranslationModule.forChild()],
            declarations: [ComponentVisibilityAlertComponent],
            entryComponents: [ComponentVisibilityAlertComponent]
        })
    ], ComponentVisibilityAlertModule);
    return ComponentVisibilityAlertModule;
}());

var CmsCommonsModule = /** @class */ (function () {
    function CmsCommonsModule() {
    }
    CmsCommonsModule = __decorate([
        core$1.NgModule({
            imports: [
                core.TranslateModule.forChild(),
                SynchronizationPanelModule,
                ComponentVisibilityAlertModule
            ],
            providers: [
                AttributePermissionsRestService,
                CmsitemsRestService,
                CMSModesService,
                CMSTimeService,
                SynchronizationService,
                TypePermissionsRestService,
                ComponentService,
                SynchronizationResourceService,
                AssetsService
            ],
            declarations: [ActionableAlertComponent],
            exports: [ActionableAlertComponent, SynchronizationPanelModule, ComponentVisibilityAlertModule]
        })
    ], CmsCommonsModule);
    return CmsCommonsModule;
}());

exports.ACTIONABLE_ALERT_CONSTANTS = ACTIONABLE_ALERT_CONSTANTS;
exports.ActionableAlertComponent = ActionableAlertComponent;
exports.AssetsService = AssetsService;
exports.AttributePermissionsRestService = AttributePermissionsRestService;
exports.CATALOG_SYNC_INTERVAL_IN_MILLISECONDS = CATALOG_SYNC_INTERVAL_IN_MILLISECONDS;
exports.CMSITEMS_UPDATE_EVENT = CMSITEMS_UPDATE_EVENT;
exports.CMSModesService = CMSModesService;
exports.CMSTimeService = CMSTimeService;
exports.COMPONENT_CREATED_EVENT = COMPONENT_CREATED_EVENT;
exports.COMPONENT_REMOVED_EVENT = COMPONENT_REMOVED_EVENT;
exports.COMPONENT_UPDATED_EVENT = COMPONENT_UPDATED_EVENT;
exports.CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI = CONTENT_SLOTS_TYPE_RESTRICTION_RESOURCE_URI;
exports.CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI = CONTENT_SLOT_TYPE_RESTRICTION_RESOURCE_URI;
exports.CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI = CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI;
exports.CONTEXT_CATALOG = CONTEXT_CATALOG;
exports.CONTEXT_CATALOG_VERSION = CONTEXT_CATALOG_VERSION;
exports.CONTEXT_SITE_ID = CONTEXT_SITE_ID;
exports.CmsCommonsModule = CmsCommonsModule;
exports.CmsResourceLocationsModule = CmsResourceLocationsModule;
exports.CmsitemsRestService = CmsitemsRestService;
exports.ComponentService = ComponentService;
exports.ComponentVisibilityAlertComponent = ComponentVisibilityAlertComponent;
exports.ComponentVisibilityAlertModule = ComponentVisibilityAlertModule;
exports.DEFAULT_SYNCHRONIZATION_EVENT = DEFAULT_SYNCHRONIZATION_EVENT;
exports.DEFAULT_SYNCHRONIZATION_POLLING = DEFAULT_SYNCHRONIZATION_POLLING;
exports.DEFAULT_SYNCHRONIZATION_STATUSES = DEFAULT_SYNCHRONIZATION_STATUSES;
exports.EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV = EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV;
exports.GET_PAGE_SYNCHRONIZATION_RESOURCE_URI = GET_PAGE_SYNCHRONIZATION_RESOURCE_URI;
exports.IComponentSharedService = IComponentSharedService;
exports.IComponentVisibilityAlertService = IComponentVisibilityAlertService;
exports.IContextAwareEditableItemService = IContextAwareEditableItemService;
exports.IEditorModalService = IEditorModalService;
exports.IMAGES_URL = IMAGES_URL;
exports.IPageContentSlotsComponentsRestService = IPageContentSlotsComponentsRestService;
exports.IPageService = IPageService;
exports.IRemoveComponentService = IRemoveComponentService;
exports.ISlotRestrictionsService = ISlotRestrictionsService;
exports.ISyncPollingService = ISyncPollingService;
exports.ITEMS_RESOURCE_URI = ITEMS_RESOURCE_URI;
exports.NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI = NAVIGATION_MANAGEMENT_ENTRIES_RESOURCE_URI;
exports.NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI = NAVIGATION_MANAGEMENT_ENTRY_TYPES_RESOURCE_URI;
exports.NAVIGATION_MANAGEMENT_PAGE_PATH = NAVIGATION_MANAGEMENT_PAGE_PATH;
exports.NAVIGATION_MANAGEMENT_RESOURCE_URI = NAVIGATION_MANAGEMENT_RESOURCE_URI;
exports.NAVIGATION_NODE_ROOT_NODE_UID = NAVIGATION_NODE_ROOT_NODE_UID;
exports.NAVIGATION_NODE_TYPECODE = NAVIGATION_NODE_TYPECODE;
exports.PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI = PAGES_CONTENT_SLOT_COMPONENT_RESOURCE_URI;
exports.PAGES_CONTENT_SLOT_RESOURCE_URI = PAGES_CONTENT_SLOT_RESOURCE_URI;
exports.PAGES_LIST_RESOURCE_URI = PAGES_LIST_RESOURCE_URI;
exports.PAGES_RESTRICTIONS_RESOURCE_URI = PAGES_RESTRICTIONS_RESOURCE_URI;
exports.PAGE_CONTEXT_CATALOG = PAGE_CONTEXT_CATALOG;
exports.PAGE_CONTEXT_CATALOG_VERSION = PAGE_CONTEXT_CATALOG_VERSION;
exports.PAGE_LIST_PATH = PAGE_LIST_PATH;
exports.PAGE_TEMPLATES_URI = PAGE_TEMPLATES_URI;
exports.PAGE_TYPES_RESTRICTION_TYPES_URI = PAGE_TYPES_RESTRICTION_TYPES_URI;
exports.PAGE_TYPES_URI = PAGE_TYPES_URI;
exports.POST_PAGE_SYNCHRONIZATION_RESOURCE_URI = POST_PAGE_SYNCHRONIZATION_RESOURCE_URI;
exports.RESTRICTION_TYPES_URI = RESTRICTION_TYPES_URI;
exports.SynchronizationPanelComponent = SynchronizationPanelComponent;
exports.SynchronizationPanelItemComponent = SynchronizationPanelItemComponent;
exports.SynchronizationPanelModule = SynchronizationPanelModule;
exports.SynchronizationResourceService = SynchronizationResourceService;
exports.SynchronizationService = SynchronizationService;
exports.SynchronizationUtils = SynchronizationUtils;
exports.TRASHED_PAGE_LIST_PATH = TRASHED_PAGE_LIST_PATH;
exports.TYPES_RESOURCE_URI = TYPES_RESOURCE_URI;
exports.TypePermissionsRestService = TypePermissionsRestService;
exports.VersionExperienceInterceptor = VersionExperienceInterceptor;
exports.WORKFLOW_CREATED_EVENT = WORKFLOW_CREATED_EVENT;
exports.WORKFLOW_FINISHED_EVENT = WORKFLOW_FINISHED_EVENT;
exports.cmsitemsEvictionTag = cmsitemsEvictionTag;
exports.cmsitemsUri = cmsitemsUri;
exports.slotEvictionTag = slotEvictionTag;
exports.synchronizationUtils = synchronizationUtils;
exports.workflowCompletedEvictionTag = workflowCompletedEvictionTag;
exports.workflowCreatedEvictionTag = workflowCreatedEvictionTag;
exports.workflowTasksMenuOpenedEvictionTag = workflowTasksMenuOpenedEvictionTag;
