'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var smarteditcommons = require('smarteditcommons');
var angular = require('angular');
var moment_ = require('moment');
var core = require('@angular/core');
var common = require('@angular/common');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationsmarteditCommonTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationsmarteditCommonTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "PersonalizationPreventParentScrollComponent.html", 
        "<div persoPreventParentScroll><ng-content></ng-content></div>"
    );
     
    $templateCache.put(
        "PersonalizationsmarteditInfiniteScrollingComponent.html", 
        "<div [ngClass]=\"dropDownContainerClass\" persoInfiniteScroll (onScrollAction)=\"nextPage()\" [scrollPercent]=\"distance\" *ngIf=\"initiated\"><div [ngClass]=\"dropDownClass\"><ng-content></ng-content></div></div>"
    );
     
    $templateCache.put(
        "dateTimePickerRangeTemplate.html", 
        "<div class=\"pe-datetime-range\"><div class=\"col-md-6 pe-datetime-range__from\" data-ng-class=\"{'has-error': !$ctrl.isFromDateValid}\"><label for=\"customization-start-date\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.startdate\" class=\"fd-form__label perso__datetimepicker__label\"></label><y-help data-template=\"'<span data-translate=personalization.modal.customizationvariationmanagement.basicinformationtab.details.startdate.help></span>'\"></y-help><div class=\"input-group se-date-field pe-date-field\" id=\"date-picker-range-from\" data-ng-show=\"$ctrl.isEditable\"><input type=\"text\" name=\"date_from_key\" class=\"fd-form-control se-date-field--input pe-date-field__input\" placeholder=\"{{ $ctrl.placeholderText | translate}}\" data-ng-disabled=\"!$ctrl.isEditable\" name=\"{{$ctrl.name}}\" data-ng-model=\"$ctrl.dateFrom\" id=\"customization-start-date\"/> <span class=\"input-group-addon se-date-field--button pe-datetime-range__picker\" data-ng-show=\"$ctrl.isEditable\"><span class=\"sap-icon--calendar pe-datetime-range__picker__icon\"></span></span></div><div class=\"input-group se-date-field pe-date-field\" id=\"date-picker-range-from\" data-ng-show=\"!$ctrl.isEditable\"><input type=\"text\" name=\"date_from_key\" class=\"fd-form-control se-date-field--input pe-date-field__input\" data-ng-class=\"{'pe-input--is-disabled': !$ctrl.isEditable}\" data-ng-model=\"$ctrl.dateFrom\" data-date-formatter id=\"customization-start-date\" data-ng-disabled=\"true\" data-format-type=\"short\"></div><span data-ng-if=\"!$ctrl.isFromDateValid\" class=\"help-block pe-datetime__error-msg pe-datetime__msg\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.wrongdateformatfrom.description\"></span></div><div class=\"col-md-6 pe-datetime-range__to\" data-ng-class=\"{'has-error':!$ctrl.isToDateValid, 'has-warning':$ctrl.isEndDateInThePast}\"><label for=\"customization-end-date\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.enddate\" class=\"fd-form__label perso__datetimepicker__label\"></label><y-help data-template=\"'<span data-translate=personalization.modal.customizationvariationmanagement.basicinformationtab.details.enddate.help></span>'\"></y-help><div class=\"input-group se-date-field pe-date-field\" id=\"date-picker-range-to\"><input type=\"text\" name=\"date_to_key\" class=\"fd-form-control se-date-field--input pe-date-field__input\" placeholder=\"{{ $ctrl.placeholderText | translate}}\" data-ng-disabled=\"!$ctrl.isEditable\" name=\"{{$ctrl.name}}\" data-ng-model=\"$ctrl.dateTo\" id=\"customization-end-date\"/> <span class=\"input-group-addon se-date-field--button pe-datetime-range__picker\" data-ng-show=\"$ctrl.isEditable\"><span class=\"sap-icon--calendar pe-datetime-range__picker__icon\"></span></span></div><div class=\"input-group se-date-field pe-date-field\" id=\"date-picker-range-to\" data-ng-show=\"!$ctrl.isEditable\"><input type=\"text\" name=\"date_to_key\" class=\"fd-form-control se-date-field--input pe-date-field__input\" data-ng-class=\"{'pe-input--is-disabled': !$ctrl.isEditable}\" data-ng-model=\"$ctrl.dateTo\" data-date-formatter id=\"customization-end-date\" data-ng-disabled=\"true\" data-format-type=\"short\"></div><span class=\"help-block pe-datetime__error-msg pe-datetime__msg\" data-ng-if=\"!$ctrl.isToDateValid\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.wrongdateformat.description\"></span> <span data-ng-if=\"$ctrl.isEndDateInThePast\" class=\"help-block pe-datetime__warning-msg pe-datetime__msg\"><span data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.enddateinthepast.description\"></span></span></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditScrollZoneBottomTemplate.html", 
        "<div class=\"perso__scrollzone perso__scrollzone--bottom\" data-ng-class=\"$ctrl.isTransparent?'perso__scrollzone--transparent':'perso__scrollzone--normal'\" data-ng-show=\"$ctrl.scrollZoneVisible && $ctrl.scrollZoneBottom\" data-ng-mouseenter=\"$ctrl.start=true;$ctrl.scrollBottom()\" data-ng-mouseleave=\"$ctrl.stopScroll()\"></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditScrollZoneTopTemplate.html", 
        "<div class=\"perso__scrollzone perso__scrollzone--top\" data-ng-class=\"$ctrl.isTransparent?'perso__scrollzone--transparent':'perso__scrollzone--normal'\" data-ng-show=\"$ctrl.scrollZoneVisible && $ctrl.scrollZoneTop\" data-ng-mouseenter=\"$ctrl.start=true;$ctrl.scrollTop()\" data-ng-mouseleave=\"$ctrl.stopScroll()\"></div>"
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

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var Personalization = /** @class */ (function () {
    function Personalization() {
        this.enabled = false;
    }
    return Personalization;
}());

var Customize = /** @class */ (function () {
    function Customize() {
        this.enabled = false;
        this.selectedCustomization = null;
        this.selectedVariations = null;
        this.selectedComponents = null;
    }
    return Customize;
}());

var CombinedView = /** @class */ (function () {
    function CombinedView() {
        this.enabled = false;
        this.selectedItems = null;
        this.customize = new Customize();
    }
    return CombinedView;
}());

var SeData = /** @class */ (function () {
    function SeData() {
        this.pageId = null;
        this.seExperienceData = null;
        this.seConfigurationData = null;
    }
    return SeData;
}());

var /* @ngInject */ PersonalizationsmarteditContextUtils = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContextUtils() {
    }
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.getContextObject = function () {
        return {
            personalization: new Personalization(),
            customize: new Customize(),
            combinedView: new CombinedView(),
            seData: new SeData()
        };
    };
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.clearCustomizeContext = function (contextService) {
        var customize = contextService.getCustomize();
        customize.enabled = false;
        customize.selectedCustomization = null;
        customize.selectedVariations = null;
        customize.selectedComponents = null;
        contextService.setCustomize(customize);
    };
    PersonalizationsmarteditContextUtils.prototype.clearCustomizeContext.$inject = ["contextService"];
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.clearCustomizeContextAndReloadPreview = function (previewService, contexService) {
        var selectedVariations = angular.copy(contexService.getCustomize().selectedVariations);
        this.clearCustomizeContext(contexService);
        if (angular.isObject(selectedVariations) && !angular.isArray(selectedVariations)) {
            previewService.removePersonalizationDataFromPreview();
        }
    };
    PersonalizationsmarteditContextUtils.prototype.clearCustomizeContextAndReloadPreview.$inject = ["previewService", "contexService"];
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.clearCombinedViewCustomizeContext = function (contextService) {
        var combinedView = contextService.getCombinedView();
        combinedView.customize.enabled = false;
        combinedView.customize.selectedCustomization = null;
        combinedView.customize.selectedVariations = null;
        combinedView.customize.selectedComponents = null;
        (combinedView.selectedItems || []).forEach(function (item) {
            delete item.highlighted;
        });
        contextService.setCombinedView(combinedView);
    };
    PersonalizationsmarteditContextUtils.prototype.clearCombinedViewCustomizeContext.$inject = ["contextService"];
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.clearCombinedViewContext = function (contextService) {
        var combinedView = contextService.getCombinedView();
        combinedView.enabled = false;
        combinedView.selectedItems = null;
        contextService.setCombinedView(combinedView);
    };
    PersonalizationsmarteditContextUtils.prototype.clearCombinedViewContext.$inject = ["contextService"];
    /* @ngInject */ PersonalizationsmarteditContextUtils.prototype.clearCombinedViewContextAndReloadPreview = function (previewService, contextService) {
        var cvEnabled = angular.copy(contextService.getCombinedView().enabled);
        var cvSelectedItems = angular.copy(contextService.getCombinedView().selectedItems);
        this.clearCombinedViewContext(contextService);
        if (cvEnabled && cvSelectedItems) {
            previewService.removePersonalizationDataFromPreview();
        }
    };
    PersonalizationsmarteditContextUtils.prototype.clearCombinedViewContextAndReloadPreview.$inject = ["previewService", "contextService"];
    /* @ngInject */ PersonalizationsmarteditContextUtils = __decorate([
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditContextUtils);
    return /* @ngInject */ PersonalizationsmarteditContextUtils;
}());

var moment = moment_;
var PERSONALIZATION_DATE_FORMATS_PROVIDER = {
    provide: "PERSONALIZATION_DATE_FORMATS",
    useValue: {
        SHORT_DATE_FORMAT: 'M/D/YY',
        MODEL_DATE_FORMAT: 'YYYY-MM-DDTHH:mm:SSZ'
    }
};
var /* @ngInject */ PersonalizationsmarteditDateUtils = /** @class */ (function () {
    PersonalizationsmarteditDateUtils.$inject = ["$translate", "DATE_CONSTANTS", "PERSONALIZATION_DATE_FORMATS", "isBlank"];
    function /* @ngInject */ PersonalizationsmarteditDateUtils($translate, DATE_CONSTANTS, PERSONALIZATION_DATE_FORMATS, isBlank) {
        this.$translate = $translate;
        this.DATE_CONSTANTS = DATE_CONSTANTS;
        this.PERSONALIZATION_DATE_FORMATS = PERSONALIZATION_DATE_FORMATS;
        this.isBlank = isBlank;
    }
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.formatDate = function (dateStr, format) {
        format = format || this.DATE_CONSTANTS.MOMENT_FORMAT;
        if (dateStr) {
            if (dateStr.match && dateStr.match(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\+|\-)(\d{4})$/)) {
                dateStr = dateStr.slice(0, -2) + ":" + dateStr.slice(-2);
            }
            return moment(new Date(dateStr)).format(format);
        }
        else {
            return "";
        }
    };
    PersonalizationsmarteditDateUtils.prototype.formatDate.$inject = ["dateStr", "format"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.formatDateWithMessage = function (dateStr, format) {
        format = format || this.PERSONALIZATION_DATE_FORMATS.SHORT_DATE_FORMAT;
        if (dateStr) {
            return this.formatDate(dateStr, format);
        }
        else {
            return this.$translate.instant('personalization.toolbar.pagecustomizations.nodatespecified');
        }
    };
    PersonalizationsmarteditDateUtils.prototype.formatDateWithMessage.$inject = ["dateStr", "format"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.isDateInThePast = function (modelValue) {
        if (this.isBlank(modelValue)) {
            return false;
        }
        else {
            return moment(modelValue, this.DATE_CONSTANTS.MOMENT_FORMAT).isBefore();
        }
    };
    PersonalizationsmarteditDateUtils.prototype.isDateInThePast.$inject = ["modelValue"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.isDateValidOrEmpty = function (modelValue) {
        return this.isBlank(modelValue) || this.isDateValid(modelValue);
    };
    PersonalizationsmarteditDateUtils.prototype.isDateValidOrEmpty.$inject = ["modelValue"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.isDateValid = function (modelValue) {
        return moment(modelValue, this.DATE_CONSTANTS.MOMENT_FORMAT).isValid();
    };
    PersonalizationsmarteditDateUtils.prototype.isDateValid.$inject = ["modelValue"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.isDateRangeValid = function (startDate, endDate) {
        if (this.isBlank(startDate) || this.isBlank(endDate)) {
            return true;
        }
        else {
            return moment(new Date(startDate)).isSameOrBefore(moment(new Date(endDate)));
        }
    };
    PersonalizationsmarteditDateUtils.prototype.isDateRangeValid.$inject = ["startDate", "endDate"];
    /* @ngInject */ PersonalizationsmarteditDateUtils.prototype.isDateStrFormatValid = function (dateStr, format) {
        format = format || this.DATE_CONSTANTS.MOMENT_FORMAT;
        if (this.isBlank(dateStr)) {
            return false;
        }
        else {
            return moment(dateStr, format, true).isValid();
        }
    };
    PersonalizationsmarteditDateUtils.prototype.isDateStrFormatValid.$inject = ["dateStr", "format"];
    /* @ngInject */ PersonalizationsmarteditDateUtils = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Function, Object, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditDateUtils);
    return /* @ngInject */ PersonalizationsmarteditDateUtils;
}());

var moment$1 = moment_;
var PERSONALIZATION_MODEL_STATUS_CODES_PROVIDER = {
    provide: "PERSONALIZATION_MODEL_STATUS_CODES",
    useValue: {
        ENABLED: 'ENABLED',
        DISABLED: 'DISABLED'
    }
};
var PERSONALIZATION_VIEW_STATUS_MAPPING_CODES_PROVIDER = {
    provide: "PERSONALIZATION_VIEW_STATUS_MAPPING_CODES",
    useValue: {
        ALL: 'ALL',
        ENABLED: 'ENABLED',
        DISABLED: 'DISABLED'
    }
};
var PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING_PROVIDER = {
    provide: "PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING",
    useValue: {
        0: {
            borderClass: 'personalizationsmarteditComponentSelected0',
            listClass: 'personalizationsmarteditComponentSelectedList0'
        },
        1: {
            borderClass: 'personalizationsmarteditComponentSelected1',
            listClass: 'personalizationsmarteditComponentSelectedList1'
        },
        2: {
            borderClass: 'personalizationsmarteditComponentSelected2',
            listClass: 'personalizationsmarteditComponentSelectedList2'
        },
        3: {
            borderClass: 'personalizationsmarteditComponentSelected3',
            listClass: 'personalizationsmarteditComponentSelectedList3'
        },
        4: {
            borderClass: 'personalizationsmarteditComponentSelected4',
            listClass: 'personalizationsmarteditComponentSelectedList4'
        },
        5: {
            borderClass: 'personalizationsmarteditComponentSelected5',
            listClass: 'personalizationsmarteditComponentSelectedList5'
        },
        6: {
            borderClass: 'personalizationsmarteditComponentSelected6',
            listClass: 'personalizationsmarteditComponentSelectedList6'
        },
        7: {
            borderClass: 'personalizationsmarteditComponentSelected7',
            listClass: 'personalizationsmarteditComponentSelectedList7'
        },
        8: {
            borderClass: 'personalizationsmarteditComponentSelected8',
            listClass: 'personalizationsmarteditComponentSelectedList8'
        },
        9: {
            borderClass: 'personalizationsmarteditComponentSelected9',
            listClass: 'personalizationsmarteditComponentSelectedList9'
        },
        10: {
            borderClass: 'personalizationsmarteditComponentSelected10',
            listClass: 'personalizationsmarteditComponentSelectedList10'
        },
        11: {
            borderClass: 'personalizationsmarteditComponentSelected11',
            listClass: 'personalizationsmarteditComponentSelectedList11'
        },
        12: {
            borderClass: 'personalizationsmarteditComponentSelected12',
            listClass: 'personalizationsmarteditComponentSelectedList12'
        },
        13: {
            borderClass: 'personalizationsmarteditComponentSelected13',
            listClass: 'personalizationsmarteditComponentSelectedList13'
        },
        14: {
            borderClass: 'personalizationsmarteditComponentSelected14',
            listClass: 'personalizationsmarteditComponentSelectedList14'
        }
    }
};
var COMBINED_VIEW_TOOLBAR_ITEM_KEY_PROVIDER = {
    provide: 'COMBINED_VIEW_TOOLBAR_ITEM_KEY',
    useValue: 'personalizationsmartedit.container.combinedview.toolbar'
};
var CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY_PROVIDER = {
    provide: 'CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY',
    useValue: 'personalizationsmartedit.container.pagecustomizations.toolbar'
};
var /* @ngInject */ PersonalizationsmarteditUtils = /** @class */ (function () {
    PersonalizationsmarteditUtils.$inject = ["$translate", "l10nFilter", "PERSONALIZATION_MODEL_STATUS_CODES", "PERSONALIZATION_VIEW_STATUS_MAPPING_CODES", "PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING", "catalogService"];
    function /* @ngInject */ PersonalizationsmarteditUtils($translate, l10nFilter, PERSONALIZATION_MODEL_STATUS_CODES, PERSONALIZATION_VIEW_STATUS_MAPPING_CODES, PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING, catalogService) {
        this.$translate = $translate;
        this.l10nFilter = l10nFilter;
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES = PERSONALIZATION_VIEW_STATUS_MAPPING_CODES;
        this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING = PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING;
        this.catalogService = catalogService;
    }
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.pushToArrayIfValueExists = function (array, sKey, sValue) {
        if (sValue) {
            array.push({
                key: sKey,
                value: sValue
            });
        }
    };
    PersonalizationsmarteditUtils.prototype.pushToArrayIfValueExists.$inject = ["array", "sKey", "sValue"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getVariationCodes = function (variations) {
        if ((typeof variations === undefined) || (variations === null)) {
            return [];
        }
        var allVariationsCodes = variations.map(function (elem) {
            return elem.code;
        }).filter(function (elem) {
            return typeof elem !== 'undefined';
        });
        return allVariationsCodes;
    };
    PersonalizationsmarteditUtils.prototype.getVariationCodes.$inject = ["variations"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getVariationKey = function (customizationId, variations) {
        if (customizationId === undefined || variations === undefined) {
            return [];
        }
        var allVariationsKeys = variations.map(function (variation) {
            return {
                variationCode: variation.code,
                customizationCode: customizationId,
                catalog: variation.catalog,
                catalogVersion: variation.catalogVersion
            };
        });
        return allVariationsKeys;
    };
    PersonalizationsmarteditUtils.prototype.getVariationKey.$inject = ["customizationId", "variations"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getSegmentTriggerForVariation = function (variation) {
        var triggers = variation.triggers || [];
        var segmentTriggerArr = triggers.filter(function (trigger) {
            return trigger.type === "segmentTriggerData";
        });
        if (segmentTriggerArr.length === 0) {
            return {};
        }
        return segmentTriggerArr[0];
    };
    PersonalizationsmarteditUtils.prototype.getSegmentTriggerForVariation.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.isPersonalizationItemEnabled = function (item) {
        return item.status === this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED;
    };
    PersonalizationsmarteditUtils.prototype.isPersonalizationItemEnabled.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getEnablementTextForCustomization = function (customization, keyPrefix) {
        keyPrefix = keyPrefix || "personalization";
        if (this.isPersonalizationItemEnabled(customization)) {
            return this.$translate.instant(keyPrefix + '.customization.enabled');
        }
        else {
            return this.$translate.instant(keyPrefix + '.customization.disabled');
        }
    };
    PersonalizationsmarteditUtils.prototype.getEnablementTextForCustomization.$inject = ["customization", "keyPrefix"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getEnablementTextForVariation = function (variation, keyPrefix) {
        keyPrefix = keyPrefix || "personalization";
        if (this.isPersonalizationItemEnabled(variation)) {
            return this.$translate.instant(keyPrefix + '.variation.enabled');
        }
        else {
            return this.$translate.instant(keyPrefix + '.variation.disabled');
        }
    };
    PersonalizationsmarteditUtils.prototype.getEnablementTextForVariation.$inject = ["variation", "keyPrefix"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getEnablementActionTextForVariation = function (variation, keyPrefix) {
        keyPrefix = keyPrefix || "personalization";
        if (this.isPersonalizationItemEnabled(variation)) {
            return this.$translate.instant(keyPrefix + '.variation.options.disable');
        }
        else {
            return this.$translate.instant(keyPrefix + '.variation.options.enable');
        }
    };
    PersonalizationsmarteditUtils.prototype.getEnablementActionTextForVariation.$inject = ["variation", "keyPrefix"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getActivityStateForCustomization = function (customization) {
        if (customization.status === this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED) {
            var startDate = new Date(customization.enabledStartDate);
            var endDate = new Date(customization.enabledEndDate);
            var startDateIsValid = moment$1(startDate).isValid();
            var endDateIsValid = moment$1(endDate).isValid();
            if ((!startDateIsValid && !endDateIsValid) ||
                (startDateIsValid && !endDateIsValid && moment$1().isAfter(startDate, 'minute')) ||
                (!startDateIsValid && endDateIsValid && moment$1().isBefore(endDate, 'minute')) ||
                (moment$1().isBetween(startDate, endDate, 'minute', '[]'))) {
                return "perso__status--enabled";
            }
            else {
                return "perso__status--ignore";
            }
        }
        else {
            return "perso__status--disabled";
        }
    };
    PersonalizationsmarteditUtils.prototype.getActivityStateForCustomization.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getActivityStateForVariation = function (customization, variation) {
        if (variation.enabled) {
            return this.getActivityStateForCustomization(customization);
        }
        else {
            return "perso__status--disabled";
        }
    };
    PersonalizationsmarteditUtils.prototype.getActivityStateForVariation.$inject = ["customization", "variation"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.isItemVisible = function (item) {
        return item.status !== 'DELETED';
    };
    PersonalizationsmarteditUtils.prototype.isItemVisible.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getVisibleItems = function (items) {
        var _this = this;
        return items.filter(function (item) {
            return _this.isItemVisible(item);
        });
    };
    PersonalizationsmarteditUtils.prototype.getVisibleItems.$inject = ["items"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getValidRank = function (items, item, increaseValue) {
        var from = items.indexOf(item);
        var delta = increaseValue < 0 ? -1 : 1;
        var increase = from + increaseValue;
        while (increase >= 0 && increase < items.length && !this.isItemVisible(items[increase])) {
            increase += delta;
        }
        increase = increase >= items.length ? items.length - 1 : increase;
        increase = increase < 0 ? 0 : increase;
        return items[increase].rank;
    };
    PersonalizationsmarteditUtils.prototype.getValidRank.$inject = ["items", "item", "increaseValue"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getStatusesMapping = function () {
        var statusesMapping = [];
        statusesMapping.push({
            code: this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES.ALL,
            text: 'personalization.context.status.all',
            modelStatuses: [this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED, this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED]
        });
        statusesMapping.push({
            code: this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES.ENABLED,
            text: 'personalization.context.status.enabled',
            modelStatuses: [this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED]
        });
        statusesMapping.push({
            code: this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES.DISABLED,
            text: 'personalization.context.status.disabled',
            modelStatuses: [this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED]
        });
        return statusesMapping;
    };
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getClassForElement = function (index) {
        var wrappedIndex = index % Object.keys(this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING).length;
        return this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING[wrappedIndex].listClass;
    };
    PersonalizationsmarteditUtils.prototype.getClassForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getLetterForElement = function (index) {
        var wrappedIndex = index % Object.keys(this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING).length;
        return String.fromCharCode('a'.charCodeAt(0) + wrappedIndex).toUpperCase();
    };
    PersonalizationsmarteditUtils.prototype.getLetterForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getCommerceCustomizationTooltip = function (variation, prefix, suffix) {
        var _this = this;
        prefix = prefix || "";
        suffix = suffix || "\n";
        var result = "";
        angular.forEach(variation.commerceCustomizations, function (propertyValue, propertyKey) {
            result += prefix + _this.$translate.instant('personalization.modal.manager.commercecustomization.' + propertyKey) + ": " + propertyValue + suffix;
        });
        return result;
    };
    PersonalizationsmarteditUtils.prototype.getCommerceCustomizationTooltip.$inject = ["variation", "prefix", "suffix"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getCommerceCustomizationTooltipHTML = function (variation) {
        return this.getCommerceCustomizationTooltip(variation, "<div>", "</div>");
    };
    PersonalizationsmarteditUtils.prototype.getCommerceCustomizationTooltipHTML.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.isItemFromCurrentCatalog = function (item, seData) {
        var cd = seData.seExperienceData.catalogDescriptor;
        return item.catalog === cd.catalogId && item.catalogVersion === cd.catalogVersion;
    };
    PersonalizationsmarteditUtils.prototype.isItemFromCurrentCatalog.$inject = ["item", "seData"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.hasCommerceActions = function (variation) {
        return variation.numberOfCommerceActions > 0;
    };
    PersonalizationsmarteditUtils.prototype.hasCommerceActions.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getCatalogVersionNameByUuid = function (catalogVersionUuid) {
        var _this = this;
        return this.catalogService.getCatalogVersionByUuid(catalogVersionUuid).then(function (catalogVersion) {
            return _this.l10nFilter(catalogVersion.catalogName) + ' (' + catalogVersion.version + ')';
        });
    };
    PersonalizationsmarteditUtils.prototype.getCatalogVersionNameByUuid.$inject = ["catalogVersionUuid"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.getAndSetCatalogVersionNameL10N = function (customization) {
        this.getCatalogVersionNameByUuid(customization.catalog + '\/' + customization.catalogVersion).then(function (response) {
            customization.catalogVersionNameL10N = response;
        });
    };
    PersonalizationsmarteditUtils.prototype.getAndSetCatalogVersionNameL10N.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditUtils.prototype.uniqueArray = function (array1, array2, fieldName) {
        fieldName = fieldName || 'code';
        array2.forEach(function (instance) {
            if (!(array1.some(function (el) { return el[fieldName] === instance[fieldName]; }))) {
                array1.push(instance);
            }
        });
        return array1;
    };
    PersonalizationsmarteditUtils.prototype.uniqueArray.$inject = ["array1", "array2", "fieldName"];
    /* @ngInject */ PersonalizationsmarteditUtils = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Function, Object, Object, Object, Object, smarteditcommons.ICatalogService])
    ], /* @ngInject */ PersonalizationsmarteditUtils);
    return /* @ngInject */ PersonalizationsmarteditUtils;
}());

var moment$2 = moment_;
var /* @ngInject */ DateTimePickerRangeComponent = /** @class */ (function () {
    DateTimePickerRangeComponent.$inject = ["DATE_CONSTANTS", "personalizationsmarteditDateUtils", "$element", "$scope", "languageService"];
    function /* @ngInject */ DateTimePickerRangeComponent(DATE_CONSTANTS, personalizationsmarteditDateUtils, $element, $scope, languageService) {
        this.DATE_CONSTANTS = DATE_CONSTANTS;
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
        this.$element = $element;
        this.$scope = $scope;
        this.languageService = languageService;
        this.placeholderText = 'personalization.commons.datetimepicker.placeholder';
        this.isFromDateValid = false;
        this.isToDateValid = false;
        this.isEndDateInThePast = false;
    }
    /* @ngInject */ DateTimePickerRangeComponent.prototype.$onInit = function () {
        this.actionsIfisEditable();
    };
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getDateOrDefault = function (date) {
        try {
            return moment$2(new Date(date));
        }
        catch (err) {
            return false;
        }
    };
    DateTimePickerRangeComponent.prototype.getDateOrDefault.$inject = ["date"];
    /* @ngInject */ DateTimePickerRangeComponent.prototype.actionsIfisEditable = function () {
        var _this = this;
        if (this.isEditable) {
            this.getFromPickerNode()
                .datetimepicker({
                format: this.DATE_CONSTANTS.MOMENT_FORMAT,
                showClear: true,
                showClose: true,
                useCurrent: false,
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
                locale: this.languageService.getBrowserLocale().split('-')[0]
            }).on('dp.update dp.hide dp.change', function (e) {
                var dateFrom = this.personalizationsmarteditDateUtils.formatDate(e.date, undefined);
                if (this.personalizationsmarteditDateUtils.isDateValidOrEmpty(dateFrom) &&
                    this.personalizationsmarteditDateUtils.isDateValidOrEmpty(this.dateTo) &&
                    !this.personalizationsmarteditDateUtils.isDateRangeValid(dateFrom, this.dateTo)) {
                    dateFrom = angular.copy(this.dateTo);
                }
                this.dateFrom = dateFrom;
            }.bind(this));
            this.getToPickerNode()
                .datetimepicker({
                format: this.DATE_CONSTANTS.MOMENT_FORMAT,
                showClear: true,
                showClose: true,
                useCurrent: false,
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
                locale: this.languageService.getBrowserLocale().split('-')[0]
            }).on('dp.change dp.hide dp.change', function (e) {
                var dateTo = this.personalizationsmarteditDateUtils.formatDate(e.date, undefined);
                if (this.personalizationsmarteditDateUtils.isDateValidOrEmpty(dateTo) &&
                    this.personalizationsmarteditDateUtils.isDateValidOrEmpty(this.dateFrom) &&
                    !this.personalizationsmarteditDateUtils.isDateRangeValid(this.dateFrom, dateTo)) {
                    dateTo = angular.copy(this.dateFrom);
                }
                this.dateTo = dateTo;
            }.bind(this));
            this.$scope.$watch('this.$ctrl.dateFrom', function () {
                _this.isFromDateValid = _this.personalizationsmarteditDateUtils.isDateValidOrEmpty(_this.dateFrom);
                if (_this.personalizationsmarteditDateUtils.isDateStrFormatValid(_this.dateFrom, _this.DATE_CONSTANTS.MOMENT_FORMAT)) {
                    _this.getToDatetimepicker().minDate(_this.getMinToDate(_this.dateFrom));
                }
                else {
                    _this.getToDatetimepicker().minDate(moment$2());
                }
            }, true);
            this.$scope.$watch('this.$ctrl.dateTo', function () {
                var dateToValid = _this.personalizationsmarteditDateUtils.isDateValidOrEmpty(_this.dateTo);
                if (dateToValid) {
                    _this.isToDateValid = true;
                    _this.isEndDateInThePast = _this.personalizationsmarteditDateUtils.isDateInThePast(_this.dateTo);
                }
                else {
                    _this.isToDateValid = false;
                    _this.isEndDateInThePast = false;
                }
                if (_this.personalizationsmarteditDateUtils.isDateStrFormatValid(_this.dateTo, _this.DATE_CONSTANTS.MOMENT_FORMAT)) {
                    _this.getFromDatetimepicker().maxDate(_this.getDateOrDefault(_this.dateTo));
                }
                else if (_this.dateTo === "") {
                    _this.getFromDatetimepicker().maxDate(false);
                }
            }, true);
        }
    };
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getMinToDate = function (date) {
        if (!this.personalizationsmarteditDateUtils.isDateInThePast(date)) {
            return this.getDateOrDefault(date);
        }
        else {
            return moment$2();
        }
    };
    DateTimePickerRangeComponent.prototype.getMinToDate.$inject = ["date"];
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getFromPickerNode = function () {
        return this.$element.querySelectorAll('#date-picker-range-from');
    };
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getFromDatetimepicker = function () {
        return this.getFromPickerNode().datetimepicker().data("DateTimePicker");
    };
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getToPickerNode = function () {
        return this.$element.querySelectorAll('#date-picker-range-to');
    };
    /* @ngInject */ DateTimePickerRangeComponent.prototype.getToDatetimepicker = function () {
        return this.getToPickerNode().datetimepicker().data("DateTimePicker");
    };
    /* @ngInject */ DateTimePickerRangeComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'dateTimePickerRangeTemplate.html',
            inputs: [
                'name: =',
                'dateFrom: =',
                'dateTo: =',
                'isEditable: =',
                'dateFormat: ='
            ]
        }),
        __metadata("design:paramtypes", [Object, PersonalizationsmarteditDateUtils,
            HTMLElement, Object, smarteditcommons.LanguageService])
    ], /* @ngInject */ DateTimePickerRangeComponent);
    return /* @ngInject */ DateTimePickerRangeComponent;
}());

var /* @ngInject */ IsDateValidOrEmptyDirective = /** @class */ (function () {
    IsDateValidOrEmptyDirective.$inject = ["personalizationsmarteditDateUtils"];
    function /* @ngInject */ IsDateValidOrEmptyDirective(personalizationsmarteditDateUtils) {
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
    }
    /* @ngInject */ IsDateValidOrEmptyDirective.prototype.isDateInThePast = function (modelValue) {
        return this.personalizationsmarteditDateUtils.isDateValidOrEmpty(modelValue);
    };
    IsDateValidOrEmptyDirective.prototype.isDateInThePast.$inject = ["modelValue"];
    /* @ngInject */ IsDateValidOrEmptyDirective = __decorate([
        smarteditcommons.SeDirective({
            require: "ngModel",
            selector: '[isdatevalidorempty]'
        }),
        __metadata("design:paramtypes", [PersonalizationsmarteditDateUtils])
    ], /* @ngInject */ IsDateValidOrEmptyDirective);
    return /* @ngInject */ IsDateValidOrEmptyDirective;
}());

var /* @ngInject */ PaginationHelper = /** @class */ (function () {
    PaginationHelper.$inject = ["initialData"];
    function /* @ngInject */ PaginationHelper(initialData) {
        if (initialData === void 0) { initialData = {}; }
        this.count = initialData.count || 0;
        this.page = initialData.page || 0;
        this.totalCount = initialData.totalCount || 0;
        this.totalPages = initialData.totalPages || 0;
    }
    /* @ngInject */ PaginationHelper.prototype.reset = function () {
        this.count = 50;
        this.page = -1;
        this.totalPages = 1;
        this.totalCount = 0;
    };
    /* @ngInject */ PaginationHelper.prototype.getCount = function () {
        return this.count;
    };
    /* @ngInject */ PaginationHelper.prototype.getPage = function () {
        return this.page;
    };
    /* @ngInject */ PaginationHelper.prototype.getTotalCount = function () {
        return this.totalCount;
    };
    /* @ngInject */ PaginationHelper.prototype.getTotalPages = function () {
        return this.totalPages;
    };
    /* @ngInject */ PaginationHelper = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object])
    ], /* @ngInject */ PaginationHelper);
    return /* @ngInject */ PaginationHelper;
}());

var /* @ngInject */ PersonalizationsmarteditScrollZoneComponent = /** @class */ (function () {
    PersonalizationsmarteditScrollZoneComponent.$inject = ["$scope", "$timeout", "$compile", "yjQuery"];
    function /* @ngInject */ PersonalizationsmarteditScrollZoneComponent($scope, $timeout, $compile, yjQuery) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$compile = $compile;
        this.yjQuery = yjQuery;
        this.scrollZoneTop = true;
        this.scrollZoneBottom = true;
        this.start = false;
        this.scrollZoneVisible = false;
        this.isTransparent = false;
        this.elementToScroll = null;
        this.scrollZoneId = "";
    }
    // Methods
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.stopScroll = function () {
        this.start = false;
    };
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.scrollTop = function () {
        var _this = this;
        if (!this.start) {
            return;
        }
        this.elementToScroll = this.elementToScroll || this.getElementToScroll();
        this.scrollZoneTop = this.elementToScroll.scrollTop() <= 2 ? false : true;
        this.scrollZoneBottom = true;
        this.elementToScroll.scrollTop(this.elementToScroll.scrollTop() - 15);
        this.$timeout(function () {
            _this.scrollTop();
        }, 100);
    };
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.scrollBottom = function () {
        var _this = this;
        if (!this.start) {
            return;
        }
        this.elementToScroll = this.elementToScroll || this.getElementToScroll();
        this.scrollZoneTop = true;
        var heightVisibleFromTop = this.elementToScroll.get(0).scrollHeight - this.elementToScroll.scrollTop();
        this.scrollZoneBottom = Math.abs(heightVisibleFromTop - this.elementToScroll.outerHeight()) < 2 ? false : true;
        this.elementToScroll.scrollTop(this.elementToScroll.scrollTop() + 15);
        this.$timeout(function () {
            _this.scrollBottom();
        }, 100);
    };
    // Lifecycle methods
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.$onChanges = function (changes) {
        if (changes.scrollZoneVisible) {
            this.start = changes.scrollZoneVisible.currentValue;
            this.scrollZoneTop = true;
            this.scrollZoneBottom = true;
        }
    };
    PersonalizationsmarteditScrollZoneComponent.prototype.$onChanges.$inject = ["changes"];
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.$onInit = function () {
        var topScrollZone = this.$compile("<div id=\"sliderTopScrollZone" + this.scrollZoneId + "\" data-ng-include=\"'personalizationsmarteditScrollZoneTopTemplate.html'\"></div>")(this.$scope);
        angular.element("body").append(topScrollZone);
        var bottomScrollZone = this.$compile("<div id=\"sliderBottomScrollZone" + this.scrollZoneId + "\" data-ng-include=\"'personalizationsmarteditScrollZoneBottomTemplate.html'\"></div>")(this.$scope);
        angular.element("body").append(bottomScrollZone);
    };
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent.prototype.$onDestroy = function () {
        var _this = this;
        angular.element("#sliderTopScrollZone" + this.scrollZoneId).scope().$destroy();
        angular.element("#sliderTopScrollZone" + this.scrollZoneId).remove();
        angular.element("#sliderBottomScrollZone" + this.scrollZoneId).scope().$destroy();
        angular.element("#sliderBottomScrollZone" + this.scrollZoneId).remove();
        angular.element("body").contents().each(function (val) {
            if (val.nodeType === Node.COMMENT_NODE && val.data.indexOf('personalizationsmarteditScrollZone') > -1) {
                _this.yjQuery(val).remove();
            }
        });
    };
    /* @ngInject */ PersonalizationsmarteditScrollZoneComponent = __decorate([
        smarteditcommons.SeComponent({
            inputs: [
                'scrollZoneVisible',
                'getElementToScroll: &',
                'isTransparent',
                'scrollZoneId'
            ]
        }),
        __metadata("design:paramtypes", [Object, Object, Object, Function])
    ], /* @ngInject */ PersonalizationsmarteditScrollZoneComponent);
    return /* @ngInject */ PersonalizationsmarteditScrollZoneComponent;
}());

var /* @ngInject */ PersonalizationsmarteditMessageHandler = /** @class */ (function () {
    PersonalizationsmarteditMessageHandler.$inject = ["alertService"];
    function /* @ngInject */ PersonalizationsmarteditMessageHandler(alertService) {
        this.alertService = alertService;
    }
    /* @ngInject */ PersonalizationsmarteditMessageHandler.prototype.sendInformation = function (informationMessage) {
        this.alertService.showInfo(informationMessage);
    };
    PersonalizationsmarteditMessageHandler.prototype.sendInformation.$inject = ["informationMessage"];
    /* @ngInject */ PersonalizationsmarteditMessageHandler.prototype.sendError = function (errorMessage) {
        this.alertService.showDanger(errorMessage);
    };
    PersonalizationsmarteditMessageHandler.prototype.sendError.$inject = ["errorMessage"];
    /* @ngInject */ PersonalizationsmarteditMessageHandler.prototype.sendWarning = function (warningMessage) {
        this.alertService.showWarning(warningMessage);
    };
    PersonalizationsmarteditMessageHandler.prototype.sendWarning.$inject = ["warningMessage"];
    /* @ngInject */ PersonalizationsmarteditMessageHandler.prototype.sendSuccess = function (successMessage) {
        this.alertService.showSuccess(successMessage);
    };
    PersonalizationsmarteditMessageHandler.prototype.sendSuccess.$inject = ["successMessage"];
    /* @ngInject */ PersonalizationsmarteditMessageHandler = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object])
    ], /* @ngInject */ PersonalizationsmarteditMessageHandler);
    return /* @ngInject */ PersonalizationsmarteditMessageHandler;
}());

var /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService() {
        this.nonCommerceActionTypes = ['cxCmsActionData'];
        this.types = [];
    }
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.isNonCommerceAction = function (action) {
        return this.nonCommerceActionTypes.some(function (val) {
            return val === action.type;
        });
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.isNonCommerceAction.$inject = ["action"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.isCommerceAction = function (action) {
        return !this.isNonCommerceAction(action);
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.isCommerceAction.$inject = ["action"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.isTypeEnabled = function (type, seConfigurationData) {
        return (seConfigurationData !== undefined && seConfigurationData !== null && seConfigurationData[type.confProperty] === true);
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.isTypeEnabled.$inject = ["type", "seConfigurationData"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.registerType = function (item) {
        var type = item.type;
        var exists = false;
        this.types.forEach(function (val) {
            if (val.type === type) {
                exists = true;
            }
        });
        if (!exists) {
            this.types.push(item);
        }
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.registerType.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.getAvailableTypes = function (seConfigurationData) {
        var _this = this;
        return this.types.filter(function (item) {
            return _this.isTypeEnabled(item, seConfigurationData);
        });
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.getAvailableTypes.$inject = ["seConfigurationData"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.isCommerceCustomizationEnabled = function (seConfigurationData) {
        var at = this.getAvailableTypes(seConfigurationData);
        return at.length > 0;
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.isCommerceCustomizationEnabled.$inject = ["seConfigurationData"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.getNonCommerceActionsCount = function (variation) {
        return (variation.actions || []).filter(this.isNonCommerceAction, this).length;
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.getNonCommerceActionsCount.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.getCommerceActionsCountMap = function (variation) {
        var result = {};
        (variation.actions || [])
            .filter(this.isCommerceAction, this)
            .forEach(function (action) {
            var typeKey = action.type.toLowerCase();
            var count = result[typeKey];
            if (count === undefined) {
                count = 1;
            }
            else {
                count += 1;
            }
            result[typeKey] = count;
        });
        return result;
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.getCommerceActionsCountMap.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService.prototype.getCommerceActionsCount = function (variation) {
        return (variation.actions || [])
            .filter(this.isCommerceAction, this).length;
    };
    PersonalizationsmarteditCommerceCustomizationService.prototype.getCommerceActionsCount.$inject = ["variation"];
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService = __decorate([
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService);
    return /* @ngInject */ PersonalizationsmarteditCommerceCustomizationService;
}());

var /* @ngInject */ PersonalizationCurrentElementDirective = /** @class */ (function () {
    PersonalizationCurrentElementDirective.$inject = ["$scope", "$element", "$attrs"];
    function /* @ngInject */ PersonalizationCurrentElementDirective($scope, $element, $attrs) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
    }
    /* @ngInject */ PersonalizationCurrentElementDirective.prototype.$postLink = function () {
        if (this.$attrs.personalizationCurrentElement) {
            this.$scope.$parent.$eval(this.$attrs.personalizationCurrentElement)(this.$element.parent());
        }
    };
    /* @ngInject */ PersonalizationCurrentElementDirective = __decorate([
        smarteditcommons.SeDirective({
            selector: '[personalization-current-element]'
        }),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], /* @ngInject */ PersonalizationCurrentElementDirective);
    return /* @ngInject */ PersonalizationCurrentElementDirective;
}());

var /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld = /** @class */ (function () {
    PersonalizationInfiniteScrollDirectiveOld.$inject = ["$scope", "$element", "$attrs", "$rootScope", "yjQuery", "$window", "$timeout"];
    function /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld($scope, $element, $attrs, $rootScope, yjQuery, $window, $timeout) {
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$rootScope = $rootScope;
        this.yjQuery = yjQuery;
        this.$window = $window;
        this.$timeout = $timeout;
    }
    /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld.prototype.$postLink = function () {
        var _this = this;
        var checkWhenEnabled;
        var handler;
        var scrollDistance;
        var scrollEnabled;
        this.$window = angular.element(this.$window);
        scrollDistance = 0;
        if (this.$attrs.personalizationInfiniteScrollDistance !== null) {
            this.$scope.$parent.$watch(this.$attrs.personalizationInfiniteScrollDistance, function (value) {
                scrollDistance = parseInt(value, 10);
                return scrollDistance;
            });
        }
        scrollEnabled = true;
        checkWhenEnabled = false;
        if (this.$attrs.personalizationInfiniteScrollDisabled !== null) {
            this.$scope.$parent.$watch(this.$attrs.personalizationInfiniteScrollDisabled, function (value) {
                scrollEnabled = !value;
                if (scrollEnabled && checkWhenEnabled) {
                    checkWhenEnabled = false;
                    return handler();
                }
            });
        }
        this.$rootScope.$on('refreshStart', function () {
            _this.$element.animate({
                scrollTop: "0"
            });
        });
        handler = function () {
            var container;
            var elementBottom;
            var remaining;
            var shouldScroll;
            var containerBottom;
            if (_this.$element.children().length <= 0) {
                return;
            }
            container = _this.yjQuery(_this.$element.children()[0]);
            elementBottom = _this.$element.offset().top + _this.$element.height();
            containerBottom = container.offset().top + container.height();
            remaining = containerBottom - elementBottom;
            shouldScroll = remaining <= _this.$element.height() * scrollDistance;
            if (shouldScroll && scrollEnabled) {
                if (_this.$rootScope.$$phase) {
                    return _this.$scope.$parent.$eval(_this.$attrs.personalizationInfiniteScroll);
                }
                else {
                    return _this.$scope.$parent.$apply(_this.$attrs.personalizationInfiniteScroll);
                }
            }
            else if (shouldScroll) {
                checkWhenEnabled = true;
                return checkWhenEnabled;
            }
        };
        this.$element.on('scroll', handler);
        this.$scope.$parent.$on('$destroy', function () {
            return _this.$window.off('scroll', handler);
        });
        return this.$timeout((function () {
            if (_this.$attrs.personalizationInfiniteScrollImmediateCheck) {
                if (_this.$scope.$parent.$eval(_this.$attrs.personalizationInfiniteScrollImmediateCheck)) {
                    return handler();
                }
            }
            else {
                return handler();
            }
        }), 0);
    };
    /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld = __decorate([
        smarteditcommons.SeDirective({
            selector: '[personalization-infinite-scroll]'
        }),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Function, Object, Object])
    ], /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld);
    return /* @ngInject */ PersonalizationInfiniteScrollDirectiveOld;
}());

var /* @ngInject */ PersonalizationsmarteditCommonsModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCommonsModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCommonsModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationsmarteditCommonTemplates',
                'smarteditServicesModule',
                'yjqueryModule',
                'l10nModule',
                'alertServiceModule'
            ],
            providers: [
                PaginationHelper,
                {
                    provide: 'PaginationHelper',
                    useFactory: function () {
                        return function (initialData) {
                            return new PaginationHelper(initialData);
                        };
                    }
                },
                PersonalizationsmarteditDateUtils,
                PersonalizationsmarteditContextUtils,
                PERSONALIZATION_DATE_FORMATS_PROVIDER,
                PERSONALIZATION_MODEL_STATUS_CODES_PROVIDER,
                PERSONALIZATION_VIEW_STATUS_MAPPING_CODES_PROVIDER,
                PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING_PROVIDER,
                COMBINED_VIEW_TOOLBAR_ITEM_KEY_PROVIDER,
                CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY_PROVIDER,
                PersonalizationsmarteditUtils,
                PersonalizationsmarteditMessageHandler,
                PersonalizationsmarteditCommerceCustomizationService
            ],
            declarations: [
                IsDateValidOrEmptyDirective,
                PersonalizationCurrentElementDirective,
                PersonalizationInfiniteScrollDirectiveOld,
                DateTimePickerRangeComponent,
                PersonalizationsmarteditScrollZoneComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCommonsModule);
    return /* @ngInject */ PersonalizationsmarteditCommonsModule;
}());

window.__smartedit__.addDecoratorPayload("Component", "PersonalizationsmarteditInfiniteScrollingComponent", {
    selector: 'personalization-infinite-scrolling',
    template: "<div [ngClass]=\"dropDownContainerClass\" persoInfiniteScroll (onScrollAction)=\"nextPage()\" [scrollPercent]=\"distance\" *ngIf=\"initiated\"><div [ngClass]=\"dropDownClass\"><ng-content></ng-content></div></div>"
});
var /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent() {
        this.distance = 80;
        this.initiated = false;
    }
    /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype.ngOnInit = function () {
        this.context = this.context || this;
        this.init();
    };
    /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype.ngOnChanges = function () {
        this.init();
    };
    /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype.nextPage = function () {
        this.fetchPage();
    };
    /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype.init = function () {
        var wasInitiated = this.initiated;
        this.initiated = true;
        if (wasInitiated) {
            this.nextPage();
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype, "dropDownContainerClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype, "dropDownClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype, "distance", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype, "context", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent.prototype, "fetchPage", void 0);
    /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'personalization-infinite-scrolling',
            template: "<div [ngClass]=\"dropDownContainerClass\" persoInfiniteScroll (onScrollAction)=\"nextPage()\" [scrollPercent]=\"distance\" *ngIf=\"initiated\"><div [ngClass]=\"dropDownClass\"><ng-content></ng-content></div></div>"
        })
    ], /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent);
    return /* @ngInject */ PersonalizationsmarteditInfiniteScrollingComponent;
}());

var PersonalizationInfiniteScrollDirective = /** @class */ (function () {
    function PersonalizationInfiniteScrollDirective(element) {
        this.element = element;
        this.scrollPercent = 75;
        this.onScrollAction = new core.EventEmitter();
    }
    PersonalizationInfiniteScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollEvent = rxjs.fromEvent(this.element.nativeElement, 'scroll');
        this.subscription = this.scrollEvent.subscribe(function (e) {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > _this.scrollPercent / 100) {
                _this.onScrollAction.emit(null);
            }
        });
    };
    PersonalizationInfiniteScrollDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], PersonalizationInfiniteScrollDirective.prototype, "scrollPercent", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], PersonalizationInfiniteScrollDirective.prototype, "onScrollAction", void 0);
    PersonalizationInfiniteScrollDirective = __decorate([
        core.Directive({
            selector: '[persoInfiniteScroll]'
        }),
        __param(0, core.Inject(core.ElementRef)),
        __metadata("design:paramtypes", [core.ElementRef])
    ], PersonalizationInfiniteScrollDirective);
    return PersonalizationInfiniteScrollDirective;
}());

var PersonalizationPreventParentScrollDirective = /** @class */ (function () {
    function PersonalizationPreventParentScrollDirective(element) {
        var _this = this;
        this.element = element;
        this.mouseWheelEventHandler = function (event) { return _this.onMouseWheel(event); };
    }
    PersonalizationPreventParentScrollDirective.prototype.ngOnInit = function () {
        var element = this.element.nativeElement;
        element.addEventListener("mousewheel", this.mouseWheelEventHandler);
        element.addEventListener("DOMMouseScroll", this.mouseWheelEventHandler);
    };
    PersonalizationPreventParentScrollDirective.prototype.ngOnDestroy = function () {
        var element = this.element.nativeElement;
        element.removeEventListener("mousewheel", this.mouseWheelEventHandler);
        element.removeEventListener("DOMMouseScroll", this.mouseWheelEventHandler);
    };
    PersonalizationPreventParentScrollDirective.prototype.onMouseWheel = function (event) {
        var element = this.element.nativeElement;
        var originalEventCondition = event.originalEvent && (event.originalEvent.wheelDeltaY || event.originalEvent.wheelDelta);
        var IEEventCondition = -(event.deltaY || event.delta) || 0;
        element.parentElement.parentElement.parentElement.scrollTop -= (event.wheelDeltaY || originalEventCondition || event.wheelDelta || IEEventCondition);
        event.stopPropagation();
        event.preventDefault();
        event.returnValue = false;
    };
    PersonalizationPreventParentScrollDirective = __decorate([
        core.Directive({
            selector: "[persoPreventParentScroll]"
        }),
        __param(0, core.Inject(core.ElementRef)),
        __metadata("design:paramtypes", [core.ElementRef])
    ], PersonalizationPreventParentScrollDirective);
    return PersonalizationPreventParentScrollDirective;
}());

window.__smartedit__.addDecoratorPayload("Component", "PersonalizationPreventParentScrollComponent", {
    selector: 'personalization-prevent-parent-scroll',
    template: "<div persoPreventParentScroll><ng-content></ng-content></div>"
});
var /* @ngInject */ PersonalizationPreventParentScrollComponent = /** @class */ (function () {
    function /* @ngInject */ PersonalizationPreventParentScrollComponent() {
    }
    /* @ngInject */ PersonalizationPreventParentScrollComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'personalization-prevent-parent-scroll',
            template: "<div persoPreventParentScroll><ng-content></ng-content></div>"
        })
    ], /* @ngInject */ PersonalizationPreventParentScrollComponent);
    return /* @ngInject */ PersonalizationPreventParentScrollComponent;
}());

/**
 * @ngdoc overview
 * @name PersonalizationsmarteditCommonsComponentsModule
 */
var PersonalizationsmarteditCommonsComponentsModule = /** @class */ (function () {
    function PersonalizationsmarteditCommonsComponentsModule() {
    }
    PersonalizationsmarteditCommonsComponentsModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule
            ],
            declarations: [
                PersonalizationInfiniteScrollDirective,
                PersonalizationPreventParentScrollDirective,
                PersonalizationsmarteditInfiniteScrollingComponent,
                PersonalizationPreventParentScrollComponent
            ],
            entryComponents: [
                PersonalizationsmarteditInfiniteScrollingComponent,
                PersonalizationPreventParentScrollComponent
            ],
            exports: [
                PersonalizationInfiniteScrollDirective,
                PersonalizationPreventParentScrollDirective,
                PersonalizationsmarteditInfiniteScrollingComponent,
                PersonalizationPreventParentScrollComponent
            ]
        })
    ], PersonalizationsmarteditCommonsComponentsModule);
    return PersonalizationsmarteditCommonsComponentsModule;
}());

var /* @ngInject */ BaseSiteHeaderInterceptor = /** @class */ (function () {
    BaseSiteHeaderInterceptor.$inject = ["sharedDataService"];
    function /* @ngInject */ BaseSiteHeaderInterceptor(sharedDataService) {
        this.sharedDataService = sharedDataService;
    }
    /* @ngInject */ BaseSiteHeaderInterceptor_1 = /* @ngInject */ BaseSiteHeaderInterceptor;
    /* @ngInject */ BaseSiteHeaderInterceptor.prototype.intercept = function (request, next) {
        if (/* @ngInject */ BaseSiteHeaderInterceptor_1.PERSONALIZATION_ENDPOINT.test(request.url)) {
            return rxjs.from(this.sharedDataService.get('experience')).pipe(operators.switchMap(function (experience) {
                if (experience.catalogDescriptor.siteId) {
                    var newReq = request.clone({
                        headers: request.headers.set(/* @ngInject */ BaseSiteHeaderInterceptor_1.HEADER_NAME, experience.catalogDescriptor.siteId)
                    });
                    return next.handle(newReq);
                }
                return next.handle(request);
            }));
        }
        else {
            return next.handle(request);
        }
    };
    BaseSiteHeaderInterceptor.prototype.intercept.$inject = ["request", "next"];
    var /* @ngInject */ BaseSiteHeaderInterceptor_1;
    /* @ngInject */ BaseSiteHeaderInterceptor.HEADER_NAME = 'Basesite';
    /* @ngInject */ BaseSiteHeaderInterceptor.PERSONALIZATION_ENDPOINT = /\/personalizationwebservices/;
    /* @ngInject */ BaseSiteHeaderInterceptor = /* @ngInject */ BaseSiteHeaderInterceptor_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.ISharedDataService])
    ], /* @ngInject */ BaseSiteHeaderInterceptor);
    return /* @ngInject */ BaseSiteHeaderInterceptor;
}());

exports.BaseSiteHeaderInterceptor = BaseSiteHeaderInterceptor;
exports.CombinedView = CombinedView;
exports.Customize = Customize;
exports.DateTimePickerRangeComponent = DateTimePickerRangeComponent;
exports.IsDateValidOrEmptyDirective = IsDateValidOrEmptyDirective;
exports.PaginationHelper = PaginationHelper;
exports.Personalization = Personalization;
exports.PersonalizationPreventParentScrollComponent = PersonalizationPreventParentScrollComponent;
exports.PersonalizationsmarteditCommerceCustomizationService = PersonalizationsmarteditCommerceCustomizationService;
exports.PersonalizationsmarteditCommonsComponentsModule = PersonalizationsmarteditCommonsComponentsModule;
exports.PersonalizationsmarteditCommonsModule = PersonalizationsmarteditCommonsModule;
exports.PersonalizationsmarteditContextUtils = PersonalizationsmarteditContextUtils;
exports.PersonalizationsmarteditDateUtils = PersonalizationsmarteditDateUtils;
exports.PersonalizationsmarteditInfiniteScrollingComponent = PersonalizationsmarteditInfiniteScrollingComponent;
exports.PersonalizationsmarteditMessageHandler = PersonalizationsmarteditMessageHandler;
exports.PersonalizationsmarteditScrollZoneComponent = PersonalizationsmarteditScrollZoneComponent;
exports.PersonalizationsmarteditUtils = PersonalizationsmarteditUtils;
exports.SeData = SeData;
