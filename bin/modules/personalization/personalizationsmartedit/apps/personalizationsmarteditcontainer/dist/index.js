'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var angular = require('angular');
var smarteditcommons = require('smarteditcommons');
var personalizationcommons = require('personalizationcommons');
var http = require('@angular/common/http');
var core = require('@angular/core');
var core$1 = require('@ngx-translate/core');
var cmscommons = require('cmscommons');
var cmssmarteditcontainer = require('cmssmarteditcontainer');
var platformBrowser = require('@angular/platform-browser');
var _static = require('@angular/upgrade/static');
var common = require('@angular/common');
var core$2 = require('@fundamental-ngx/core');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationsmarteditContainerTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationsmarteditContainerTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "personalizationsmarteditCombinedViewConfigureTemplate.html", 
        "<form class=\"pe-combinedview-config__form\"><div class=\"form-group\"><label for=\"PageFilterDropdownField001\" class=\"fd-form__label\" data-translate=\"personalization.commons.filter.label\"></label><div class=\"pe-combinedview-config__filter-layout\"><page-filter-dropdown id=\"PageFilterDropdownField001\" data-on-select-callback=\"modalController.pageFilterChange(value)\" class=\"fd-has-margin-right-small\"></page-filter-dropdown><has-multicatalog><catalog-filter-dropdown data-on-select-callback=\"modalController.catalogFilterChange(value)\"></catalog-filter-dropdown></has-multicatalog></div><div class=\"pe-combinedview-config__select-group-layout\"><div class=\"pe-combinedview-config__select-group-label-layout\"><label for=\"CombinedViewSearchField1\" class=\"fd-form__label se-control-label required pe-combinedview-config__label\" data-translate=\"personalization.modal.combinedview.search.label\"></label></div><ui-select data-ng-init=\"modalController.initUiSelect($select)\" ng-model=\"selectedElement\" theme=\"select2\" class=\"fd-form__control\" ng-keyup=\"modalController.searchInputKeypress($event, $select.search)\" on-select=\"modalController.selectElement($item)\" data-backspace-reset=\"false\" reset-search-input=\"false\" id=\"CombinedViewSearchField1\"><ui-select-match placeholder=\"{{ 'personalization.modal.combinedview.search.placeholder' | translate}}\"><span>{{'personalization.modal.combinedview.search.placeholder' | translate}}</span></ui-select-match><ui-select-choices repeat=\"item in selectionArray\" position=\"down\" ui-disable-choice=\"modalController.isItemInSelectDisabled(item)\" personalization-infinite-scroll=\"modalController.addMoreItems()\" personalization-infinite-scroll-distance=\"1\"><div class=\"pe-combinedview-config__ui-select-choices-layout\" data-ng-class=\"{'pe-combinedview-config__ui-select-item--selected': modalController.isItemSelected(item)}\"><div class=\"pe-combinedview-config__ui-select-choices-col1\"><div class=\"perso-wrap-ellipsis\" data-ng-bind=\"item.customization.name + ' > ' + item.variation.name\" title=\"{{item.customization.name}} > {{item.variation.name}}\"></div></div><div class=\"pe-combinedview-config__ui-select-choices-col2\"><has-multicatalog><div data-ng-if=\"catalogFilter!=='current'\" data-ng-init=\"modalController.getAndSetCatalogVersionNameL10N(item.variation)\"><div class=\"perso-wrap-ellipsis\" data-ng-if=\"!modalController.isItemFromCurrentCatalog(item.variation)\" data-ng-bind=\"item.variation.catalogVersionNameL10N\" title=\"{{item.variation.catalogVersionNameL10N}}\"></div><div class=\"perso-wrap-ellipsis\" data-ng-if=\"modalController.isItemFromCurrentCatalog(item.variation)\" data-translate=\"personalization.filter.catalog.current\" title=\"{{'personalization.filter.catalog.current' | translate }}\"></div></div></has-multicatalog></div></div></ui-select-choices></ui-select></div></div><div class=\"form-group\"><p data-ng-hide=\"selectedItems.length > 0\" data-translate=\"personalization.toolbar.combinedview.openconfigure.empty\"></p><div id=\"CombinedViewSelectedField1\" class=\"pe-combinedview-config__list-layout\" data-ng-repeat=\"item in selectedItems\" data-ng-class=\"{'pe-combinedview-config__divider': $first}\"><div class=\"pe-combinedview-config__letter-layout\"><div data-ng-class=\"modalController.getClassForElement($index)\" data-ng-bind=\"modalController.getLetterForElement($index)\"></div></div><div class=\"pe-combinedview-config__names-layout\"><div class=\"perso-wrap-ellipsis pe-combinedview-config__cname\" data-ng-bind=\"item.customization.name\" title=\"{{item.customization.name}}\"></div><span>></span><div class=\"perso-wrap-ellipsis pe-combinedview-config__vname\" data-ng-bind=\"item.variation.name\" title=\"{{item.variation.name}}\"></div></div><div class=\"pe-combinedview-config__hyicon-globe\"><span data-ng-if=\"!modalController.isItemFromCurrentCatalog(item.variation)\" class=\"perso__globe-icon sap-icon--globe\" data-uib-tooltip=\"{{item.variation.catalogVersionNameL10N}}\" data-tooltip-placement=\"top-right\"></span></div><div class=\"pe-combinedview-config__hyicon-remove\"><span class=\"sap-icon--decline\" data-ng-click=\"modalController.removeSelectedItem(item)\" title=\"{{'personalization.modal.combinedview.icon.remove.title' | translate}}\"></span></div></div></div></form>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCombinedViewMenuTemplate.html", 
        "<div data-ng-if=\"!$ctrl.isCombinedViewConfigured\"><div class=\"pe-combined-view-panel__wrapper pe-combined-view-panel__wrapper--empty\"><img src=\"static-resources/images/emptyVersions.svg\" alt=\"no Configurationss\" class=\"pe-combined-view-panel--empty-img\"> <span class=\"pe-combined-view-panel--empty-text\" data-translate=\"{{'personalization.toolbar.combinedview.openconfigure.empty' | translate}}\"></span> <a class=\"fd-link pe-combined-view-panel--empty-link\" data-ng-click=\"$ctrl.combinedViewClick()\" data-translate=\"personalization.toolbar.combinedview.openconfigure.link\" title=\"{{'personalization.toolbar.combinedview.openconfigure.link' | translate}}\"></a></div></div><div data-ng-if=\"$ctrl.isCombinedViewConfigured\"><div class=\"pe-combined-view-panel__wrapper\"><div class=\"pe-combined-view-panel__configure-layout\"><button class=\"pe-combined-view-panel__configure-btn fd-button--light perso-wrap-ellipsis\" data-ng-click=\"$ctrl.clearAllCombinedViewClick()\" data-translate=\"personalization.toolbar.combinedview.clearall.button\" title=\"{{'personalization.toolbar.combinedview.clearall.button' | translate}}\"></button> <button class=\"pe-combined-view-panel__configure-btn fd-button perso-wrap-ellipsis\" data-ng-click=\"$ctrl.combinedViewClick()\" data-translate=\"personalization.toolbar.combinedview.openconfigure.button\" title=\"{{'personalization.toolbar.combinedview.openconfigure.button' | translate}}\"></button></div><div data-ng-class=\"$ctrl.combinedView.enabled ? '':'pe-combined-view-panel--disabled'\"><div class=\"pe-combined-view-panel__list-layout\" data-ng-repeat=\"item in $ctrl.selectedItems\" data-ng-click=\"$ctrl.itemClick(item)\" data-ng-class=\"{'pe-combined-view-panel-list__item--highlighted': item.highlighted}\"><div class=\"pe-combined-view-panel-list__letter-layout\"><div data-ng-class=\"$ctrl.getClassForElement($index)\" data-ng-bind=\"$ctrl.getLetterForElement($index)\"></div></div><div class=\"pe-combined-view-panel-list__names-layout\"><div class=\"perso-wrap-ellipsis\" data-ng-bind=\"item.customization.name\" title=\"{{item.customization.name}}\"></div><div class=\"perso-wrap-ellipsis perso-tree__primary-data\" data-ng-bind=\"item.variation.name\" title=\"{{item.variation.name}}\"></div></div><div class=\"pe-combined-view-panel-list__icon\"><span data-ng-if=\"!$ctrl.isItemFromCurrentCatalog(item.variation)\" class=\"perso__globe-icon sap-icon--globe\" data-uib-tooltip=\"{{item.variation.catalogVersionNameL10N}}\" data-tooltip-placement=\"auto top\" data-tooltip-enable=\"$ctrl.combinedView.enabled\"></span></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCombinedViewMenuWrapperTemplate.html", 
        "<div class=\"btn-block pe-toolbar-action--include\"><div class=\"pe-toolbar-menu-content se-toolbar-menu-content--pe-customized se-toolbar-menu-content--pe-combine\" role=\"menu\"><div class=\"se-toolbar-menu-content--pe-customized__headers\"><h2 class=\"se-toolbar-menu-content--pe-customized__headers--h2\" data-translate=\"personalization.toolbar.combinedview.header.title\"></h2><y-help class=\"se-toolbar-menu-content__y-help\" data-template=\"'<span data-translate=personalization.toolbar.combinedview.header.description></span>'\"></y-help></div><div role=\"menuitem\"><personalizationsmartedit-combined-view-menu data-is-menu-open=\"item.isOpen\"/></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCombinedViewToolbarContextWrapperTemplate.html", 
        "<personalizationsmartedit-combined-view-toolbar-context></personalizationsmartedit-combined-view-toolbar-context>"
    );
     
    $templateCache.put(
        "pageFilterDropdownTemplate.html", 
        "<y-select class=\"perso-filter\" data-ng-click=\"$event.stopPropagation();\" data-ng-model=\"$ctrl.selectedId\" data-on-change=\"$ctrl.onChange\" data-fetch-strategy=\"$ctrl.fetchStrategy\" data-item-template=\"::$ctrl.itemTemplate\" data-search-enabled=\"false\"></y-select>"
    );
     
    $templateCache.put(
        "PersonalizationsmarteditContextMenuAddEditActionComponent.html", 
        "<div class=\"perso-customize-component\"><div class=\"perso-customize-component__title-layout\"><div *ngIf=\"letterIndicatorForElement\" class=\"perso-customize-component__title-layout__letter-block\"><span [ngClass]=\"colorIndicatorForElement\">{{letterIndicatorForElement}}</span></div><div class=\"perso-customize-component__title-layout__cust-name perso-wrap-ellipsis\" title=\"{{selectedCustomization.name}}\">{{selectedCustomization.name}}</div><div class=\"perso-customize-component__title-layout__target-group-name perso-wrap-ellipsis\" title=\"{{selectedVariation.name}}\">{{'> '+ selectedVariation.name}}</div></div><dl class=\"perso-customize-component__data-list\"><label class=\"fd-form__label\" [translate]=\"'personalization.modal.addeditaction.selected.mastercomponent.title'\"></label><dd>{{componentType}}</dd></dl><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.actions.title'\"></label><fd-inline-help [inlineHelpIconStyle]=\"{'margin-left': '10px', 'padding-top': '1px'}\" [inlineHelpContentStyle]=\"{'box-shadow': '0 0 4px 0 #d9d9d9', 'border': '1px solid #d9d9d9', 'border-radius': '4px', 'color': '#32363a', 'font-size': '14px', 'max-width': '200px', 'white-space': 'normal'}\" [placement]=\"'top-start'\"><span [translate]=\"'personalization.modal.addeditaction.selected.actions.help.label'\"></span></fd-inline-help><se-select class=\"perso-customize-component__select2-container\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.placeholder'\" [(model)]=\"actionSelected\" [searchEnabled]=\"false\" [showRemoveButton]=\"false\" [fetchStrategy]=\"actionFetchStrategy\"></se-select><div class=\"perso-customize-component__select-group-label-layout\"><div *ngIf=\"actionSelected == 'use'\"><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.component.title'\"></label></div><has-multicatalog *ngIf=\"actionSelected == 'use'\"><div class=\"perso-customize-component__filter-layout\"><label class=\"fd-form__label perso-customize-component__filter-label\" [translate]=\"'personalization.commons.filter.label'\"></label><catalog-version-filter-dropdown class=\"pe-customize-component__catalog-version-filter-dropdown\" (onSelectCallback)=\"catalogVersionFilterChange($event)\"></catalog-version-filter-dropdown></div></has-multicatalog></div><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'use'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componentlist.placeholder'\" [(model)]=\"idComponentSelected\" [onSelect]=\"componentSelectedEvent\" [searchEnabled]=\"true\" [showRemoveButton]=\"false\" [fetchStrategy]=\"componentsFetchStrategy\" [itemComponent]=\"itemComponent\"></se-select><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'create'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componenttype.placeholder'\" [(model)]=\"newComponentSelected\" [onSelect]=\"newComponentTypeSelectedEvent\" [searchEnabled]=\"false\" [fetchStrategy]=\"componentTypesFetchStrategy\"></se-select></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCustomizeToolbarContextWrapperTemplate.html", 
        "<personalizationsmartedit-customize-toolbar-context></personalizationsmartedit-customize-toolbar-context>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCustomizeViewTemplate.html", 
        "<div class=\"btn-block pe-toolbar-action--include\"><div class=\"pe-toolbar-menu-content se-toolbar-menu-content--pe-customized-customizations-panel\" role=\"menu\"><div class=\"se-toolbar-menu-content--pe-customized__headers\"><div class=\"se-toolbar-menu-content--pe-customized__headers--wrapper\"><h2 class=\"se-toolbar-menu-content--pe-customized__headers--h2\"><span data-translate=\"personalization.toolbar.pagecustomizations.header.title\"></span> ({{$ctrl.pagination.totalCount}})</h2><y-help class=\"se-toolbar-menu-content__y-help\" data-template=\"'<span data-translate=personalization.toolbar.pagecustomizations.header.description></span>'\"></y-help></div><div class=\"se-input-group se-component-search\" data-ng-class=\"$ctrl.customizationsList.length == 0 ? '':''\"><div class=\"perso-input-group\"><input type=\"text\" class=\"se-input-group--input se-component-search--input ng-pristine ng-untouched ng-valid\" placeholder=\"{{ 'personalization.toolbar.pagecustomizations.search.placeholder' | translate}}\" data-ng-model=\"$ctrl.nameFilter\" data-ng-keyup=\"$ctrl.nameInputKeypress($event)\"/> <span class=\"sap-icon--search se-component-search--search-icon se-input-group__addon\"></span><div class=\"se-input-group__addon se-input-group__clear-btn\" data-ng-click=\"$ctrl.nameFilter=''; $ctrl.nameInputKeypress($event)\" data-ng-show=\"$ctrl.nameFilter\"><span class=\"sap-icon--decline\"></span></div></div></div></div><div role=\"menuitem\"><div id=\"personalizationsmartedit-right-toolbar-item-template\"><div class=\"pe-customize-panel__filter-label-layout\"><div class=\"pe-customize-panel__filter-layout\"><page-filter-dropdown data-initial-value=\"$ctrl.pageFilter\" data-on-select-callback=\"$ctrl.pageFilterChange(value)\" class=\"perso-filter__wrapper perso-filter__wrapper--page\"></page-filter-dropdown><has-multicatalog class=\"perso-filter__wrapper perso-filter__wrapper--catalog\"><catalog-filter-dropdown data-initial-value=\"$ctrl.catalogFilter\" data-on-select-callback=\"$ctrl.catalogFilterChange(value)\"/></has-multicatalog><status-filter-dropdown data-initial-value=\"$ctrl.statusFilter\" data-on-select-callback=\"$ctrl.statusFilterChange(value)\" class=\"perso-filter__wrapper perso-filter__wrapper--status\"></status-filter-dropdown></div></div><personalization-infinite-scrolling [fetch-page]=\"$ctrl.getPage\" [context]=\"$ctrl\" [drop-down-container-class]=\"'pe-customize-panel__wrapper'\"><customizations-list data-customizations-list=\"$ctrl.customizationsList\" data-request-processing=\"$ctrl.moreCustomizationsRequestProcessing\"/></personalization-infinite-scrolling></div></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCustomizeViewWrapperTemplate.html", 
        "<personalizationsmartedit-customize-view data-is-menu-open=\"item.isOpen\"/>"
    );
     
    $templateCache.put(
        "personalizationsmarteditToolbarContextTemplate.html", 
        "<div data-ng-show=\"$ctrl.visible\" class=\"pe-toolbar-item-context\"><span class=\"sap-icon--slim-arrow-right pe-toolbar-item-context__icon\"></span><div class=\"pe-toolbar-item-context__btn\"><div class=\"pe-toolbar-item-context__btn-txt\"><div title=\"{{$ctrl.title}}\" class=\"perso-wrap-ellipsis pe-toolbar-item-context__btn-title\">{{$ctrl.title}}</div><div title=\"{{$ctrl.subtitle}}\" class=\"perso-wrap-ellipsis pe-toolbar-item-context__btn-subtitle\">{{$ctrl.subtitle}}</div></div></div><div class=\"pe-toolbar-item-context__btn-hyicon\" data-ng-click=\"$ctrl.clear()\"><span class=\"sap-icon--decline\"></span></div></div>"
    );
     
    $templateCache.put(
        "customizationsListTemplate.html", 
        "<div class=\"pe-customize-panel-list\"><div class=\"pe-customize-panel-list__header\"><span class=\"pe-customize-panel-list__header--name\" data-translate=\"personalization.toolbar.pagecustomizations.list.title\"></span> <span class=\"pe-customize-panel-list__header--status\" data-translate=\"personalization.toolbar.pagecustomizations.list.status\"></span></div><div data-ng-class=\"$last && customization.collapsed && $ctrl.isCustomizationFromCurrentCatalog(customization) ? 'pe-customize-panel-list__item-last':''\" data-ng-repeat=\"customization in $ctrl.customizationsList track by $index\" data-ng-init=\"$ctrl.initCustomization(customization)\"><div class=\"pe-customize-panel-list__row-layout\" data-ng-class=\"$ctrl.getSelectedCustomizationClass(customization)\"><div class=\"pe-customize-panel-list__icon-layout pe-customize-panel-list__icon-divider\" data-ng-click=\"$ctrl.customizationRowClick(customization);\"><a class=\"pe-customize-panel-list__btn-link btn btn-link\" title=\"{{customization.collapsed ? 'personalization.commons.icon.title.expand' : 'personalization.commons.icon.title.collapse' | translate}}\"><span data-ng-class=\"customization.collapsed ? 'sap-icon--navigation-right-arrow' : 'sap-icon--navigation-down-arrow'\"></span></a></div><div class=\"pe-customize-panel-list__row\" data-ng-click=\"$ctrl.customizationRowClick(customization,true);\"><div class=\"pe-customize-panel-list__col-lg\"><div class=\"perso-wrap-ellipsis pe-customize-panel-list__parent-layout perso-tree__primary-data\" data-ng-bind=\"customization.name\" title=\"{{customization.name}}\"></div></div><div class=\"pe-customize-panel-list__col-md\"></div><div class=\"pe-customize-panel-list__col-md\"><div class=\"perso-tree__status\" data-ng-class=\"$ctrl.getActivityStateForCustomization(customization)\" data-ng-bind=\"$ctrl.getEnablementTextForCustomization(customization)\"></div><div class=\"perso-tree__dates-layout\" data-ng-if=\"$ctrl.isEnabled(customization)\" data-ng-bind=\"$ctrl.getDatesForCustomization(customization)\"></div></div><div class=\"pe-customize-panel-list__col-sm\"><span data-ng-if=\"!$ctrl.isCustomizationFromCurrentCatalog(customization)\" class=\"perso__globe-icon sap-icon--globe\" data-uib-tooltip=\"{{customization.catalogVersionNameL10N}}\" data-tooltip-placement=\"auto top\"></span></div></div><div class=\"pe-customize-panel-list__col-xs pe-customize-panel-list__dropdown\"><div data-ng-if=\"$ctrl.isCustomizationFromCurrentCatalog(customization)\" class=\"y-dropdown-more-menu dropdown open\" data-ng-init=\"$ctrl.clearAllSubMenu();\"><button type=\"button\" class=\"pe-customize-panel-list__btn-link fd-button--light customization-rank-{{customization.rank}}-dropdown-toggle\" data-ng-click=\"$ctrl.customizationSubMenuAction(customization)\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-ng-if=\"customization.subMenu\" class=\"se-y-dropdown-menu__list fd-menu__list dropdown-menu\" role=\"menu\"><li><a class=\"se-dropdown-item fd-menu__item cutomization-rank-{{customization.rank}}-edit-button\" data-ng-click=\"$ctrl.clearAllSubMenu(); $ctrl.editCustomizationAction(customization);\" data-translate=\"personalization.toolbar.pagecustomizations.customization.options.edit \"></a></li></ul></div></div></div><div data-uib-collapse=\"customization.collapsed\"><div class=\"pe-customize-panel-list__row-layout\" data-ng-repeat=\"variation in customization.variations\" data-ng-if=\"$ctrl.statusNotDeleted(variation)\" data-ng-class=\"$ctrl.getSelectedVariationClass(variation)\" data-ng-click=\"$ctrl.clearAllSubMenu(); $ctrl.variationClick(customization, variation);\"><div class=\"pe-customize-panel-list__icon-layout\"><div class=\"pe-customize-panel-list__btn-link btn btn-link\"></div></div><div class=\"pe-customize-panel-list__row\"><div class=\"pe-customize-panel-list__col-lg\"><div class=\"perso-wrap-ellipsis pe-customize-panel-list__child-layout\" data-ng-bind=\"variation.name\" title=\"{{variation.name}}\"></div></div><div class=\"pe-customize-panel-list__col-md\"><div class=\"pe-customize-panel-list__components-layout\"><div data-ng-show=\"variation.numberOfAffectedComponents >= 0\" class=\"pe-customize-panel-list__number-layout\">{{variation.numberOfAffectedComponents}}</div><div data-ng-hide=\"variation.numberOfAffectedComponents >= 0\" class=\"pe-customize-panel-list__number-layout\">#</div><div class=\"perso-wrap-ellipsis\" data-translate=\"personalization.toolbar.pagecustomizations.variation.numberofaffectedcomponents.label\" title=\"{{'personalization.toolbar.pagecustomizations.variation.numberofaffectedcomponents.label' | translate}}\"></div></div></div><div class=\"pe-customize-panel-list__col-md perso-tree__status\" data-ng-class=\"$ctrl.getActivityStateForVariation(customization, variation)\" data-ng-bind=\"$ctrl.getEnablementTextForVariation(variation)\"></div><div class=\"pe-customize-panel-list__col-sm\"><span class=\"perso__cc-icon sap-icon--tag\" data-ng-class=\"{'perso__cc-icon--hidden': !$ctrl.hasCommerceActions(variation)}\" data-uib-tooltip-html=\"$ctrl.getCommerceCustomizationTooltip(variation)\" data-tooltip-placement=\"auto top\"></span></div></div><div class=\"pe-customize-panel-list__col-xs pe-customize-panel-list__dropdown\"></div></div></div></div><div class=\"pe-spinner--outer\" data-ng-show=\"$ctrl.requestProcessing\"><div class=\"spinner-md spinner-light\"></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditCommerceCustomizationViewTemplate.html", 
        "<div id=\"commerceCustomizationBody-002\" class=\"perso-cc-modal\"><div class=\"perso-cc-modal__title-layout\"><div class=\"perso-wrap-ellipsis perso-cc-modal__title-cname\" data-ng-bind=\"customization.name\" title=\"{{customization.name}}\"></div><div class=\"perso-cc-modal__title-status\" data-ng-class=\"modalController.customizationStatus\" data-ng-bind=\"' (' + modalController.customizationStatusText + ') '\"></div><span>></span><div class=\"perso-wrap-ellipsis perso-cc-modal__title-vname\" data-ng-bind=\"variation.name\" title=\"{{variation.name}}\"></div><div class=\"perso-cc-modal__title-status\" data-ng-class=\"modalController.variationStatus\" data-ng-bind=\"' (' + modalController.variationStatusText + ')'\"></div></div><div class=\"form-group perso-cc-modal__content-layout\"><label for=\"commerce-customization-type-1\" class=\"fd-form__label\" data-translate=\"personalization.modal.commercecustomization.action.type\"></label><ui-select id=\"commerce-customization-type-1\" class=\"fd-form__control\" ng-model=\"modalController.select.type\" data-backspace-reset=\"false\" theme=\"select2\" search-enabled=\"false\"><ui-select-match><span data-ng-bind=\"$select.selected.text | translate\"></span></ui-select-match><ui-select-choices repeat=\"item in modalController.availableTypes\" position=\"down\"><span data-ng-bind=\"item.text | translate\"></span></ui-select-choices></ui-select></div><div class=\"form-group perso-cc-modal__content-layout\"><ng-include src=\"modalController.select.type.template\"></ng-include></div><div class=\"select2-choices\"><div class=\"ui-select-match-item select2-search-choice\" data-ng-repeat=\"action in modalController.getActionsToDisplay()\"><span data-ng-bind=\"modalController.displayAction(action)\"></span> <span class=\"ui-select-match-close select2-search-choice-close sap-icon--decline\" data-ng-click=\"modalController.removeSelectedAction(action)\"></span></div></div></div>"
    );
     
    $templateCache.put(
        "basicInfoTabTemplate.html", 
        "<div class=\"pe-customization-modal\"><form><div class=\"fd-form__item\"><label for=\"customization-name\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.name\" class=\"fd-form__label se-control-label required\"></label> <input type=\"text\" class=\"fd-form__control\" placeholder=\"{{'personalization.modal.customizationvariationmanagement.basicinformationtab.name.placeholder' | translate}}\" name=\"{{$ctrl.customization.name}}_key\" data-ng-model=\"$ctrl.customization.name\" data-ng-required=\"true\" id=\"customization-name\"></div><div class=\"fd-form__item\"><label for=\"customization-description\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details\" class=\"se-control-label fd-form__label\"></label> <textarea rows=\"2\" class=\"fd-form__control pe-customization-modal__textarea\" placeholder=\"{{'personalization.modal.customizationvariationmanagement.basicinformationtab.details.placeholder' | translate}}\" name=\"{{$ctrl.customization.description}}_key\" data-ng-model=\"$ctrl.customization.description\" id=\"customization-description\"></textarea></div><div class=\"fd-form__item fd-has-padding-bottom-tiny\"><label for=\"customization-status\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.status\" class=\"se-control-label fd-form__label\"></label><div class=\"fd-form__item fd-form__item--check\"><label class=\"fd-form__label\" for=\"test-checkbox\" id=\"customization-status\"><span class=\"fd-toggle fd-toggle--s fd-form__control\"><input type=\"checkbox\" name=\"\" value=\"\" id=\"test-checkbox\" data-ng-model=\"$ctrl.customization.statusBoolean\" data-ng-change=\"$ctrl.customizationStatusChange()\"> <span class=\"fd-toggle__switch\" role=\"presentation\"></span></span></label></div></div><div class=\"fd-form__item\"><div><a data-ng-show=\"!$ctrl.datetimeConfigurationEnabled\" class=\"fd-link\" data-ng-click=\"$ctrl.datetimeConfigurationEnabled = !$ctrl.datetimeConfigurationEnabled\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.showdateconfigdata\"></a> <a data-ng-show=\"$ctrl.datetimeConfigurationEnabled\" class=\"fd-link\" data-ng-click=\"$ctrl.datetimeConfigurationEnabled = !$ctrl.datetimeConfigurationEnabled; $ctrl.resetDateTimeConfiguration();\" data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.hidedateconfigdata\"></a></div><div data-translate=\"personalization.modal.customizationvariationmanagement.basicinformationtab.details.statusfortimeframe.description\" class=\"fd-has-padding-top-tiny\"></div></div><div class=\"fd-form__item\"><div data-ng-show=\"$ctrl.datetimeConfigurationEnabled\"><div class=\"row pe-customization-modal__dates-group\"><date-time-picker-range name=\"data-date-time-from-to-key\" data-date-from=\"$ctrl.customization.enabledStartDate\" data-date-to=\"$ctrl.customization.enabledEndDate\" data-is-editable=\"true\" date-format=\"$ctrl.DATE_CONSTANTS.MOMENT_FORMAT\"></date-time-picker-range></div></div></div></form></div>"
    );
     
    $templateCache.put(
        "basicInfoTabWrapperTemplate.html", 
        "<basic-info-tab data-customization=\"$ctrl.customization\"></basic-info-tab>"
    );
     
    $templateCache.put(
        "manageCustomizationViewMenuTemplate.html", 
        "<div class=\"btn-block pe-toolbar-action--include\"><div class=\"se-toolbar-menu-content se-toolbar-menu-content--pe-customized\" role=\"menu\"><div class=\"se-toolbar-menu-content--pe-customized__headers\"><h2 class=\"se-toolbar-menu-content--pe-customized__headers--h2\" data-translate=\"personalization.toolbar.library.header.title\"></h2><y-help class=\"se-toolbar-menu-content__y-help\" data-template=\"'<span data-translate=personalization.toolbar.library.header.description></span>'\"></y-help></div><div class=\"se-toolbar-menu-content--pe-customized__item\"><a class=\"se-toolbar-menu-content--pe-customized__item__link\" id=\"personalizationsmartedit-pagecustomizations-toolbar-customization-anchor\" data-translate=\"personalization.toolbar.library.manager.name\" data-ng-click=\"$ctrl.managerViewClick();item.isOpen=false\"></a></div><div class=\"se-toolbar-menu-content--pe-customized__item se-toolbar-menu-content--pe-customized__item--last\"><a class=\"se-toolbar-menu-content--pe-customized__item__link\" id=\"personalizationsmartedit-pagecustomizations-toolbar-customization-anchor\" data-translate=\"personalization.toolbar.library.customizationvariationmanagement.name\" data-ng-click=\"$ctrl.createCustomizationClick();item.isOpen=false\"></a></div></div></div>"
    );
     
    $templateCache.put(
        "manageCustomizationViewMenuWrapperTemplate.html", 
        "<personalizationsmartedit-manage-customization-view-menu></personalizationsmartedit-manage-customization-view-menu>"
    );
     
    $templateCache.put(
        "manageCustomizationViewTemplate.html", 
        "<div class=\"pe-customization-modal__tabs\"><uib-tabset active=\"$ctrl.activeTabNumber\"><uib-tab ng-repeat=\"tab in $ctrl.tabsArr\" select=\"$ctrl.selectTab(tab)\" disable=\"tab.disabled\" heading=\"{{tab.heading}}\"><form name=\"{{tab.formName}}\" novalidate><div><data-ng-include src=\"tab.template\"></data-ng-include></div></form></uib-tab></uib-tabset></div>"
    );
     
    $templateCache.put(
        "targetGroupTabTemplate.html", 
        "<div class=\"pe-customization-modal\"><div class=\"pe-customization-modal__title\"><div class=\"pe-customization-modal__title-header\"><div class=\"pe-customization-modal__title-header-name perso-wrap-ellipsis\" data-ng-bind=\"$ctrl.customization.name\" title=\"{{$ctrl.customization.name}}\"></div><div><span class=\"pe-customization-modal__title-header-badge badge\" data-ng-class=\"{'perso__status--enabled':'badge-success', 'perso__status--disabled':'', 'perso__status--ignore':''}[$ctrl.getActivityStateForCustomization($ctrl.customization)]\">{{'personalization.modal.customizationvariationmanagement.targetgrouptab.customization.' + $ctrl.customization.status | lowercase | translate}}</span></div></div><div class=\"pe-customization-modal__title-subarea\"><div data-ng-if=\"$ctrl.customization.status === $ctrl.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED\" class=\"pe-customization-modal__title-dates\"><span data-ng-if=\"!$ctrl.customization.enabledStartDate && $ctrl.customization.enabledEndDate\">...</span> <span data-ng-bind=\"$ctrl.customization.enabledStartDate\" data-ng-class=\"{'perso__datetimepicker--error-text':!$ctrl.personalizationsmarteditDateUtils.isDateValidOrEmpty($ctrl.customization.enabledStartDate)}\"></span> <span data-ng-if=\"$ctrl.customization.enabledStartDate || $ctrl.customization.enabledEndDate\">- </span><span data-ng-bind=\"$ctrl.customization.enabledEndDate\" data-ng-class=\"{'perso__datetimepicker--error-text':!$ctrl.personalizationsmarteditDateUtils.isDateValidOrEmpty($ctrl.customization.enabledEndDate)}\"></span> <span data-ng-if=\"$ctrl.personalizationsmarteditDateUtils.isDateInThePast($ctrl.customization.enabledEndDate)\" class=\"section-help help-inline help-inline--section help-inline--tooltip\"><span class=\"pe-datetime__warning-icon\"></span> <span class=\"pe-help-block--inline help-block-inline help-block-inline--text\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.datetooltip\"></span> </span><span data-ng-if=\"$ctrl.customization.enabledStartDate && !$ctrl.customization.enabledEndDate\">...</span></div></div></div><div class=\"pe-customization-modal__y-add-btn\"><button class=\"fd-button\" type=\"button\" data-ng-click=\"$ctrl.addVariationAction()\"><span data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.addtargetgroup.button\"></span></button></div><ul data-ng-show=\"filteredVariations.length > 0\" class=\"pe-customization-modal__list-group\"><li class=\"pe-customization-modal__list-group__item\" data-ng-repeat=\"variation in $ctrl.customization.variations | filter:$ctrl.personalizationsmarteditUtils.isItemVisible as filteredVariations\"><div class=\"pe-customization-modal__list-group__item-col1\"><a class=\"pe-customization-modal__list-group__item-link perso-wrap-ellipsis\" data-ng-bind=\"variation.name\" data-ng-click=\"$ctrl.editVariationAction(variation)\"></a> <span data-ng-class=\"$ctrl.getActivityStateForVariation($ctrl.customization, variation)\" data-ng-bind=\"$ctrl.getEnablementTextForVariation(variation)\"></span><div data-ng-show=\"$ctrl.personalizationsmarteditTriggerService.isDefault(variation.triggers)\"><span class=\"pe-customization-modal__title-label-segments\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.segments.colon\"></span> <span data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.default\"></span></div><div data-ng-show=\"!$ctrl.personalizationsmarteditTriggerService.isDefault(variation.triggers)\"><div><span class=\"pe-customization-modal__title-label-segments\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.segments.colon\"></span><personalizationsmartedit-segment-expression-as-html data-segment-expression=\"variation.triggers\"></personalizationsmartedit-segment-expression-as-html></div></div></div><div data-uib-dropdown class=\"pe-customization-modal__dropdown y-dropdown-more-menu\"><button type=\"button\" data-uib-dropdown-toggle class=\"dropdown-toggle fd-button--light\" id=\"dropdownMenu1\" aria-haspopup=\"true\" aria-expanded=\"true\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-uib-dropdown-menu aria-labelledby=\"dropdownMenu1\" class=\"se-y-dropdown-menu__list fd-menu__list\" role=\"menu\"><li><a data-ng-click=\"$ctrl.editVariationAction(variation)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.edit\"></a></li><li><a data-ng-click=\"$ctrl.toogleVariationActive(variation)\" class=\"se-dropdown-item fd-menu__item\" data-ng-bind=\"$ctrl.getActivityActionTextForVariation(variation)\"></a></li><li data-ng-class=\"$first ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$ctrl.setVariationRank(variation, -1, $event, $first)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.moveup\"></a></li><li data-ng-class=\"$last ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$ctrl.setVariationRank(variation, 1, $event, $last)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.movedown\"></a></li><li><a data-ng-click=\"$ctrl.removeVariationClick(variation)\" class=\"se-dropdown-item fd-menu__item fd-has-color-status-3\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.remove\"></a></li></ul></div></li></ul><se-slider-panel [slider-panel-configuration]=\"$ctrl.sliderPanelConfiguration\" [(slider-panel-hide)]=\"$ctrl.sliderPanelHide\" [(slider-panel-show)]=\"$ctrl.sliderPanelShow\" class=\"pe-customization-modal__sliderpanel\"> <div data-ng-if=\"$ctrl.isVariationLoaded\"><div class=\"pe-customization-modal__sliderpanel__btn-layout\"><button class=\"fd-button--light pe-customization-modal__sliderpanel__btn-link\" data-ng-init=\"$ctrl.isFullscreen=false\" data-ng-click=\"$ctrl.toggleSliderFullscreen(); $ctrl.isFullscreen=!$ctrl.isFullscreen\"><div><div data-ng-if=\"!$ctrl.isFullscreen\"><span data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.fullscreen.open\"></span></div><div data-ng-if=\"$ctrl.isFullscreen\"><span data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.fullscreen.close\"></span></div></div></button></div><form><div class=\"fd-form-item\"><label for=\"targetgroup-name\" class=\"fd-form__label required\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.targetgroupname\"></label> <input type=\"text\" class=\"fd-form__control\" placeholder=\"{{'personalization.modal.customizationvariationmanagement.targetgrouptab.targetgroupname.placeholder' | translate}}\" name=\"variationname_key\" data-ng-model=\"$ctrl.edit.name\" id=\"targetgroup-name\"></div><div class=\"fd-form-item pe-customization-modal--check\"><input type=\"checkbox\" id=\"targetgroup-isDefault-001\" class=\"fd-form__control fd-checkbox\" data-ng-model=\"$ctrl.edit.isDefault\" data-ng-change=\"$ctrl.confirmDefaultTrigger($ctrl.edit.isDefault);\"/> <label for=\"targetgroup-isDefault-001\" class=\"fd-form__control fd-form__label\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.variation.default\"></label></div><div data-ng-show=\"$ctrl.edit.showExpression\"><multiple-triggers></multiple-triggers></div></form> </div></se-slider-panel></div>"
    );
     
    $templateCache.put(
        "targetGroupTabWrapperTemplate.html", 
        "<target-group-tab data-customization=\"$ctrl.customization\" data-variation=\"$ctrl.edit.selectedVariation\"></target-group-tab>"
    );
     
    $templateCache.put(
        "personalizationsmarteditManagerViewGridHeaderTemplate.html", 
        "<div class=\"tree-head hidden-sm hidden-xs\"><div class=\"tree-head__col--lg perso-wrap-ellipsis\" data-translate=\"personalization.modal.manager.grid.header.customization\" title=\"{{'personalization.modal.manager.grid.header.customization' | translate}}\"></div><div class=\"tree-head__col--xs\" data-translate=\"personalization.modal.manager.grid.header.variations\" title=\"{{'personalization.modal.manager.grid.header.variations' | translate}}\"></div><div class=\"tree-head__col--xs perso-wrap-ellipsis\" data-translate=\"personalization.modal.manager.grid.header.components\" title=\"{{'personalization.modal.manager.grid.header.components' | translate}}\"></div><div class=\"tree-head__col--md\" data-translate=\"personalization.modal.manager.grid.header.status\" title=\"{{'personalization.modal.manager.grid.header.status' | translate}}\"></div><div class=\"tree-head__col--sm perso-wrap-ellipsis\" data-translate=\"personalization.modal.manager.grid.header.startdate\" title=\"{{'personalization.modal.manager.grid.header.startdate' | translate}}\"></div><div class=\"tree-head__col--sm perso-wrap-ellipsis\" data-translate=\"personalization.modal.manager.grid.header.enddate\" title=\"{{'personalization.modal.manager.grid.header.enddate' | translate}}\"></div></div><div class=\"row tree-head visible-sm visible-xs\"><div class=\"col-xs-10 text-left\" data-translate=\"personalization.modal.manager.grid.header.customization\"></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditManagerViewNodeTemplate.html", 
        "<div class=\"y-tree-row\" data-ng-init=\"modalController.initCustomization(customization)\" data-ng-class=\"allCustomizationsCollapsed()? 'active-level' : 'inactive-level'\"><div class=\"desktop-layout hidden-sm hidden-xs customization-rank-{{customization.rank}}-row\"><div data-ng-click=\"modalController.customizationCollapseAction(customization)\"><a title=\"{{customization.isCollapsed ? 'personalization.commons.icon.title.expand' : 'personalization.commons.icon.title.collapse' | translate}}\"><span data-ng-class=\"customization.isCollapsed ? 'sap-icon--navigation-right-arrow' : 'sap-icon--navigation-down-arrow'\" class=\"perso__toggle-icon\"></span></a></div><div ui-tree-handle class=\"y-tree-row__angular-ui-tree-handle\"><div class=\"y-tree__col--lg\"><div class=\"perso-wrap-ellipsis perso-tree__primary-data\" title=\"{{customization.name}}\"><span class=\"personalizationsmartedit-customization-code\" data-ng-bind=\"customization.name\"></span></div></div><div class=\"y-tree__col--xs\" data-ng-bind=\"customization.variations.filter(modalController.statusNotDeleted).length || 0\"></div><div class=\"y-tree__col--xs\"></div><div class=\"y-tree__col--md perso-tree__status\" data-ng-class=\"modalController.getActivityStateForCustomization(customization)\"><span data-ng-bind=\"modalController.getEnablementTextForCustomization(customization)\" class=\"perso-library__status-layout\"></span></div><div class=\"y-tree__col--sm\"><div data-ng-show=\"customization.status === modalController.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED\" class=\"perso-tree__dates-layout\"><span data-ng-bind=\"modalController.getFormattedDate(customization.enabledStartDate)\"></span></div></div><div class=\"y-tree__col--sm\"><div data-ng-show=\"customization.status === modalController.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED\" class=\"perso-tree__dates-layout\"><span data-ng-bind=\"modalController.getFormattedDate(customization.enabledEndDate)\"></span></div></div></div><div><div data-uib-dropdown class=\"y-dropdown-more-menu\"><button type=\"button\" data-uib-dropdown-toggle class=\"fd-button--light\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-uib-dropdown-menu class=\"se-y-dropdown-menu__list fd-menu__list\" role=\"menu\"><li><a data-ng-click=\"modalController.editCustomizationAction(customization)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.customization.options.edit\"></a></li><li data-ng-class=\"modalController.isFilterEnabled() || $first ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"(modalController.isFilterEnabled() || $first) ? $event.stopPropagation() : modalController.setCustomizationRank(customization, -1)\" data-translate=\"personalization.modal.manager.customization.options.moveup\"></a></li><li data-ng-class=\"modalController.isFilterEnabled() || $last ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"(modalController.isFilterEnabled() || $last) ? $event.stopPropagation() : modalController.setCustomizationRank(customization, 1)\" data-translate=\"personalization.modal.manager.customization.options.movedown\"></a></li><li><a data-ng-click=\"modalController.deleteCustomizationAction(customization)\" data-translate=\"personalization.modal.manager.customization.options.delete\" class=\"se-dropdown-item--delete\"></a></li></ul></div></div></div><div class=\"mobile-layout hidden-xl hidden-lg hidden-md customization-rank-{{customization.rank}}-row\"><div data-ng-click=\"modalController.customizationCollapseAction(customization)\"><a title=\"{{customization.isCollapsed ? 'personalization.commons.icon.title.expand' : 'personalization.commons.icon.title.collapse' | translate}}\"><span data-ng-class=\"customization.isCollapsed ? 'sap-icon--navigation-right-arrow' : 'sap-icon--navigation-down-arrow'\" class=\"perso__toggle-icon\"></span></a></div><div ui-tree-handle class=\"y-tree-row__angular-ui-tree-handle--mobile\"><p class=\"y-tree__col-xl--mobile perso-tree__primary-data perso-wrap-ellipsis\" title=\"{{customization.name}}\"><span class=\"personalizationsmartedit-customization-code\" data-ng-bind=\"customization.name\"></span></p><div class=\"mobile-data\"><span class=\"perso-library__tree-head--mobile\" data-translate=\"personalization.modal.manager.grid.header.variations\"></span><div class=\"perso-library__number-data--mobile\" data-ng-bind=\"customization.variations.filter(modalController.statusNotDeleted).length || 0\"></div></div><div class=\"mobile-data perso-tree__status\" data-ng-class=\"modalController.getActivityStateForCustomization(customization)\"><span data-ng-bind=\"modalController.getEnablementTextForCustomization(customization)\"></span></div><div data-ng-show=\"customization.status === modalController.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED\"><div class=\"mobile-data\" data-ng-if=\"customization.enabledStartDate || customization.enabledEndDate\"><span data-ng-if=\"customization.enabledStartDate\" class=\"perso-library__tree-head--mobile\" data-translate=\"personalization.modal.manager.grid.header.startdate\"></span><p data-ng-bind=\"modalController.getFormattedDate(customization.enabledStartDate)\"></p><span data-ng-if=\"customization.enabledEndDate\" class=\"perso-library__tree-head--mobile\" data-translate=\"personalization.modal.manager.grid.header.enddate\"></span><p data-ng-bind=\"modalController.getFormattedDate(customization.enabledEndDate)\"></p></div></div></div><div><div data-uib-dropdown class=\"y-dropdown-more-menu mobile-more-menu\"><button type=\"button\" data-uib-dropdown-toggle class=\"fd-button--link\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-uib-dropdown-menu class=\"se-y-dropdown-menu__list fd-menu__list\" role=\"menu\"><li><a data-ng-click=\"modalController.editCustomizationAction(customization)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.customization.options.edit\"></a></li><li data-ng-class=\"modalController.isFilterEnabled() || $first ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"(modalController.isFilterEnabled() || $first) ? $event.stopPropagation() : modalController.setCustomizationRank(customization, -1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.customization.options.moveup\"></a></li><li data-ng-class=\"modalController.isFilterEnabled() || $last ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"(modalController.isFilterEnabled() || $last) ? $event.stopPropagation() : modalController.setCustomizationRank(customization, 1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.customization.options.movedown\"></a></li><li><a data-ng-click=\"modalController.deleteCustomizationAction(customization)\" class=\"se-dropdown-item fd-menu__item fd-has-color-status-3\" data-translate=\"personalization.modal.manager.customization.options.delete\"></a></li></ul></div></div></div></div><div data-uib-collapse=\"customization.isCollapsed\" data-expanding=\"modalController.customizationClickAction(customization)\"><div ui-tree-nodes data-ng-model=\"customization.variations\"><div class=\"y-tree-row child-row active-level\" data-ng-class=\"{'perso-library__angular-ui-tree-drag': variation.isDragging}\" ui-tree-node data-ng-repeat=\"variation in customization.variations | filter:modalController.statusNotDeleted\" data-ng-init=\"variation.isCommerceCustomizationEnabled = modalController.isCommerceCustomizationEnabled()\"><div class=\"desktop-layout variation-rank-{{variation.rank}}-row hidden-sm hidden-xs\" data-ng-class=\"$last ? 'active-level--last':''\"><div><span class=\"perso__cc-icon sap-icon--tag\" data-ng-class=\"{'perso__cc-icon--hidden': !modalController.hasCommerceActions(variation)}\" data-uib-tooltip-html=\"modalController.getCommerceCustomizationTooltip(variation)\" data-tooltip-placement=\"top-left\"></span></div><div ui-tree-handle class=\"y-tree-row__angular-ui-tree-handle\"><div class=\"y-tree__col--xl perso-wrap-ellipsis\" title=\"{{variation.name}}\"><span data-ng-bind=\"variation.name\"></span></div><div class=\"y-tree__col--xs\" data-ng-bind=\"variation.numberOfComponents\"></div><div class=\"y-tree__col--md perso-tree__status\" data-ng-class=\"modalController.getActivityStateForVariation(customization,variation)\"><span data-ng-bind=\"modalController.getEnablementTextForVariation(variation)\" class=\"perso-library__status-layout\"></span></div><div class=\"y-tree__col--lg\"></div></div><div><div data-uib-dropdown class=\"y-dropdown-more-menu\"><button type=\"button\" data-uib-dropdown-toggle class=\"fd-button--light\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-uib-dropdown-menu class=\"se-y-dropdown-menu__list fd-menu__list\" role=\"menu\"><li><a data-ng-click=\"modalController.editVariationAction(customization, variation)\" data-translate=\"personalization.modal.manager.variation.options.edit\"></a></li><li><a data-ng-click=\"modalController.toogleVariationActive(customization,variation)\" class=\"se-dropdown-item fd-menu__item\" data-ng-bind=\"modalController.getEnablementActionTextForVariation(variation)\"></a></li><li data-ng-show=\"variation.isCommerceCustomizationEnabled\"><a data-ng-click=\"modalController.manageCommerceCustomization(customization, variation)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.commercecustomization\"></a></li><li data-ng-class=\"$first ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$first ? $event.stopPropagation() : modalController.setVariationRank(customization, variation, -1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.moveup\"></a></li><li data-ng-class=\"$last ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$last ? $event.stopPropagation() : modalController.setVariationRank(customization, variation, 1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.movedown\"></a></li><li data-ng-class=\"modalController.isDeleteVariationEnabled(customization) ? 'perso-dropdown-menu__item--delete' : 'perso-dropdown-menu__item--disabled disabled' \"><a data-ng-click=\"modalController.deleteVariationAction(customization, variation, $event)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.delete\"></a></li></ul></div></div></div><div class=\"mobile-layout hidden-xl hidden-lg hidden-md variation-rank-{{variation.rank}}-row\" data-ng-class=\"$last ? 'active-level--last':''\"><div><span class=\"perso__cc-icon sap-icon--tag\" data-ng-class=\"{'perso__cc-icon--hidden': !modalController.hasCommerceActions(variation)}\" data-uib-tooltip-html=\"modalController.getCommerceCustomizationTooltip(variation)\" data-tooltip-placement=\"top-left\"></span></div><div ui-tree-handle class=\"y-tree-row__angular-ui-tree-handle--mobile\"><div><p class=\"y-tree__col-xl--mobile perso-wrap-ellipsis\" title=\"{{variation.name}}\"><span data-ng-bind=\"variation.name\"></span></p><div class=\"mobile-data\"><span class=\"perso-library__tree-head--mobile\" data-translate=\"personalization.modal.manager.grid.header.components\"></span><div data-ng-bind=\"variation.numberOfComponents\"></div></div><div class=\"mobile-data perso-tree__status\" data-ng-class=\"modalController.getActivityStateForVariation(customization,variation)\"><span data-ng-bind=\"modalController.getEnablementTextForVariation(variation)\"></span></div></div></div><div><div class=\"y-dropdown-more-menu mobile-more-menu\"><div data-uib-dropdown><button type=\"button\" data-uib-dropdown-toggle class=\"fd-button--light\"><span class=\"perso__more-icon sap-icon--overflow\"></span></button><ul data-uib-dropdown-menu class=\"se-y-dropdown-menu__list fd-menu__list\" role=\"menu\"><li><a data-ng-click=\"modalController.editVariationAction(customization, variation)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.edit\"></a></li><li><a data-ng-click=\"modalController.toogleVariationActive(customization,variation)\" class=\"se-dropdown-item fd-menu__item\" data-ng-bind=\"modalController.getEnablementActionTextForVariation(variation)\"></a></li><li data-ng-show=\"variation.isCommerceCustomizationEnabled\"><a data-ng-click=\"modalController.manageCommerceCustomization(customization, variation)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.commercecustomization\"></a></li><li data-ng-class=\"$first ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$first ? $event.stopPropagation() : modalController.setVariationRank(customization, variation, -1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.moveup\"></a></li><li data-ng-class=\"$last ? 'perso-dropdown-menu__item--disabled disabled' : '' \"><a data-ng-click=\"$last ? $event.stopPropagation() : modalController.setVariationRank(customization, variation, 1)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.movedown\"></a></li><li data-ng-class=\"modalController.isDeleteVariationEnabled(customization) ? 'perso-dropdown-menu__item--delete' : 'perso-dropdown-menu__item--disabled disabled' \"><a data-ng-click=\"modalController.deleteVariationAction(customization, variation, $event)\" class=\"se-dropdown-item fd-menu__item\" data-translate=\"personalization.modal.manager.variation.options.delete\"></a></li></ul></div></div></div></div></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditManagerViewTemplate.html", 
        "<div id=\"editConfigurationsBody-001\" class=\"perso-library\"><personalizationsmartedit-scroll-zone data-ng-if=\"scrollZoneElement != null\" data-is-transparent=\"true\" data-scroll-zone-id=\"'managerview'\" data-scroll-zone-visible=\"scrollZoneVisible\" data-get-element-to-scroll=\"modalController.getElementToScroll()\"></personalizationsmartedit-scroll-zone><personalization-infinite-scrolling [fetch-page]=\"modalController.getPage\" [context]=\"modalController.context\" [drop-down-container-class]=\"'perso-library__scroll-zone perso__scrollbar--hidden'\"><div personalization-current-element=\"modalController.setScrollZoneElement\"><div class=\"perso-library__header\"><div class=\"perso-library__title\"><span data-ng-bind=\"modalController.catalogName\"></span> | {{'personalization.toolbar.pagecustomizations.header.title' | translate}} ({{filteredCustomizationsCount}})</div><div class=\"se-input-group perso-library__search\"><div class=\"perso-input-group\"><input type=\"text\" class=\"se-input-group--input se-component-search--input ng-pristine ng-untouched ng-valid\" placeholder=\"{{ 'personalization.modal.manager.search.placeholder' | translate}}\" ng-model=\"modalController.search.name\" ng-keyup=\"modalController.searchInputKeypress($event)\"><span class=\"sap-icon--search se-component-search--search-icon se-input-group__addon\"></span><div class=\"se-input-group__addon se-input-group__clear-btn\" data-ng-show=\"modalController.search.name\" ng-click=\"modalController.search.name=''; modalController.searchInputKeypress($event)\"><span class=\"sap-icon--decline\"></span></div></div></div><div class=\"perso-library__status\"><ui-select ng-model=\"modalController.search.status\" on-select=\"modalController.refreshGrid()\" data-backspace-reset=\"false\" theme=\"select2\" title=\"\" search-enabled=\"false\"><ui-select-match><span ng-bind=\"$select.selected.text | translate\"></span></ui-select-match><ui-select-choices repeat=\"item in modalController.statuses\" position=\"down\"><span ng-bind=\"item.text | translate\"></span></ui-select-choices></ui-select></div><button class=\"fd-button\" type=\"button\" data-ng-click=\"modalController.openNewModal();\"><span data-translate=\"personalization.modal.manager.add.button\"></span></button></div><div class=\"y-tree perso-library__y-tree\"><div data-ng-show=\"modalController.isSearchGridHeaderHidden()\" class=\"y-tree-header y-tree-header--fixed\"><data-ng-include src=\"'personalizationsmarteditManagerViewGridHeaderTemplate.html'\"></data-ng-include></div><div class=\"y-tree-header\"><data-ng-include src=\"'personalizationsmarteditManagerViewGridHeaderTemplate.html'\"></data-ng-include></div><div ui-tree=\"modalController.treeOptions\" id=\"tree-root\"><div ui-tree-nodes data-ng-model=\"modalController.customizations\"><div data-ng-repeat=\"customization in modalController.customizations\" data-ng-class=\"{'perso-library__angular-ui-tree-drag': customization.isDragging}\" ui-tree-node data-ng-include=\"'personalizationsmarteditManagerViewNodeTemplate.html'\"></div></div></div><div class=\"pe-spinner--outer\" data-ng-show=\"modalController.moreCustomizationsRequestProcessing\"><div class=\"spinner-md spinner-light\"></div></div></div></div></personalization-infinite-scrolling><a class=\"perso-library__back-to-top\" title=\"{{'personalization.commons.button.title.backtotop' | translate}}\" data-ng-show=\"modalController.isReturnToTopButtonVisible()\" data-ng-click=\"modalController.scrollZoneReturnToTop()\"><span class=\"sap-icon--back-to-top\"></span></a></div>"
    );
     
    $templateCache.put(
        "multipleTriggersComponentTemplate.html", 
        "<se-tabs [tabs-list]=\"$ctrl.tabsList\" [num-tabs-displayed]=\"{{$ctrl.tabsList.length}}\"></se-tabs>"
    );
     
    $templateCache.put(
        "personalizationsmarteditSegmentNodeTemplate.html", 
        "<div data-ng-class=\"{'perso-segments-tree__layout': $ctrl.isContainer(node), 'perso-segments-tree__empty-container': $ctrl.isContainerWithDropzone(node), 'perso-segments-tree__collapsed-container': collapsed }\"><div class=\"perso-segments-tree\" data-ng-class=\"{'perso-segments-tree__node': $ctrl.isItem(node), 'perso-segments-tree__container': $ctrl.isContainer(node)}\"><div data-ng-if=\"$ctrl.isContainer(node)\"><div class=\"perso-segments-tree__toggle\" data-ng-click=\"$ctrl.toggle(this)\" title=\"{{collapsed ? 'personalization.commons.icon.title.expand' : 'personalization.commons.icon.title.collapse' | translate}}\" data-ng-class=\"collapsed ? 'sap-icon--navigation-right-arrow' : 'sap-icon--navigation-down-arrow'\"></div><div class=\"perso-segments-tree__dropdown\"><ui-select data-ng-model=\"node.operation\" data-backspace-reset=\"false\" theme=\"select2\" title=\"\" search-enabled=\"false\"><ui-select-match><span data-ng-bind=\"$select.selected.name | translate\"></span></ui-select-match><ui-select-choices repeat=\"item in $ctrl.actions\" position=\"down\"><span data-ng-bind=\"item.name | translate\"></span></ui-select-choices></ui-select></div></div><div data-ng-if=\"$ctrl.isItem(node)\" ui-tree-handle class=\"perso-segments-tree__node-content\" data-ng-bind=\"node.selectedSegment.code\"></div><div data-ng-if=\"$ctrl.isDropzone(node)\" class=\"perso-segments-tree__empty-container-node\"><div class=\"perso-segments-tree__empty-container-node-text\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.segments.dropzone\"></div></div><div data-ng-if=\"$ctrl.isContainer(node)\" ui-tree-handle class=\"perso-segments-tree__angular-ui-tree-handle--empty\"></div><div data-nodrag><span class=\"pull-right\"><a data-ng-if=\"$ctrl.isItem(node)\" class=\"perso-segments-tree__actions perso-segments-tree__node-icon\" data-ng-click=\"$ctrl.duplicateItem(node)\" title=\"{{'personalization.commons.icon.title.duplicate' | translate}}\"><span class=\"sap-icon--duplicate\"></span> </a><a data-ng-if=\"!$ctrl.isTopContainer(this)\" class=\"perso-segments-tree__actions\" data-ng-click=\"$ctrl.removeItem(this)\"><div data-ng-if=\"$ctrl.isContainer(node)\" class=\"btn btn-link perso-segments-tree__container-btn-icon fd-has-margin-left-tiny\" title=\"{{'personalization.commons.icon.title.remove' | translate}}\"><span class=\"sap-icon--decline\"></span></div><div data-ng-if=\"$ctrl.isItem(node)\" class=\"perso-segments-tree__node-icon\" title=\"{{'personalization.commons.icon.title.remove' | translate}}\"><span class=\"sap-icon--decline\"></span></div></a></span><button data-ng-if=\"$ctrl.isContainer(node)\" class=\"fd-button--light perso-segments-tree__btn\" data-ng-click=\"$ctrl.newSubItem(this, 'container')\"><span data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.segments.group.button\"></span></button></div></div><ol data-ng-if=\"$ctrl.isItem(node)\" ui-tree-nodes data-nodrop-enabled=\"true\" data-ng-model=\"node.nodes\" data-ng-class=\"{hidden: collapsed}\"><li data-ng-repeat=\"node in node.nodes\" ui-tree-node data-collapsed=\"true\" data-expand-on-hover=\"500\" data-ng-include=\"'personalizationsmarteditSegmentNodeTemplate.html'\"></li></ol><ol data-ng-if=\"$ctrl.isContainer(node)\" ui-tree-nodes data-ng-model=\"node.nodes\" data-ng-class=\"{hidden: collapsed}\"><li data-ng-repeat=\"node in node.nodes\" ui-tree-node data-collapsed=\"true\" data-expand-on-hover=\"500\" data-ng-include=\"'personalizationsmarteditSegmentNodeTemplate.html'\"></li></ol></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditSegmentViewTemplate.html", 
        "<label class=\"fd-form__label\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.targetgroupexpression\"></label><div><personalizationsmartedit-scroll-zone data-scroll-zone-id=\"'segmentview'\" data-scroll-zone-visible=\"$ctrl.scrollZoneVisible\" data-get-element-to-scroll=\"$ctrl.getElementToScroll()\"></personalizationsmartedit-scroll-zone><div class=\"form-group\"><personalizationsmartedit-segment-expression-as-html data-segment-expression=\"$ctrl.expression[0]\"></personalizationsmartedit-segment-expression-as-html></div><div class=\"form-group\"><label class=\"fd-form__label\" data-translate=\"personalization.modal.customizationvariationmanagement.targetgrouptab.segments\"></label><ui-select class=\"fd-form__control pe-customization-modal__segments-dropdown\" ng-model=\"$ctrl.singleSegment\" data-backspace-reset=\"false\" theme=\"select2\" ng-keyup=\"$ctrl.segmentSearchInputKeypress($event, $select.search)\" on-select=\"$ctrl.segmentSelectedEvent($item, $select.items)\" reset-search-input=\"false\"><ui-select-match placeholder=\"{{ 'personalization.modal.customizationvariationmanagement.targetgrouptab.segments.placeholder' | translate}}\"><span>{{'personalization.modal.customizationvariationmanagement.targetgrouptab.segments.placeholder' | translate}}</span></ui-select-match><ui-select-choices repeat=\"item in $ctrl.segments\" position=\"down\" personalization-infinite-scroll=\"$ctrl.addMoreSegmentItems()\" personalization-infinite-scroll-distance=\"2\"><div ng-bind=\"item.code\" class=\"perso__item-name\"></div><div class=\"perso-wrap-ellipsis perso__wrapper-description\" data-ng-bind=\"item.description\" title=\"{{item.description}}\"></div></ui-select-choices></ui-select></div><div ui-tree=\"$ctrl.treeOptions\" id=\"tree-root\"><div ui-tree-nodes ng-model=\"$ctrl.expression\" data-nodrop-enabled=\"true\"><div ng-repeat=\"node in $ctrl.expression\" data-collapsed=\"false\" ui-tree-node ng-include=\"'personalizationsmarteditSegmentNodeTemplate.html'\"></div></div></div></div>"
    );
     
    $templateCache.put(
        "personalizationsmarteditSegmentViewWrapperTemplate.html", 
        "<personalizationsmartedit-segment-view></personalizationsmartedit-segment-view>"
    );
     
    $templateCache.put(
        "personalizationsmarteditSegmentExpressionAsHtmlTemplate.html", 
        "<span data-ng-repeat=\"word in $ctrl.getExpressionAsArray() track by $index\"><span data-ng-if=\"$ctrl.operators.indexOf(word) > -1\" class=\"pe-customization-modal__expression-text\">{{ $ctrl.getLocalizationKeyForOperator(word) | translate }} </span><span data-ng-if=\"$ctrl.emptyGroup === word\" class=\"pe-customization-modal__expression-alert-icon sap-icon--alert\" data-uib-tooltip=\"{{'personalization.modal.customizationvariationmanagement.targetgrouptab.segments.group.tooltip' | translate}}\" data-tooltip-placement=\"auto top\"></span> <span data-ng-if=\"$ctrl.emptyGroupAndOperators.indexOf(word) === -1\">{{word}}</span></span>"
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

var /* @ngInject */ PersonalizationsmarteditContextServiceProxy = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContextServiceProxy() {
    }
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setPersonalization = function (personalization) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setPersonalization.$inject = ["personalization"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setCustomize = function (customize) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setCustomize.$inject = ["customize"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setCombinedView = function (combinedView) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setCombinedView.$inject = ["combinedView"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy.prototype.setSeData = function (seData) {
        'proxyFunction';
        return undefined;
    };
    PersonalizationsmarteditContextServiceProxy.prototype.setSeData.$inject = ["seData"];
    /* @ngInject */ PersonalizationsmarteditContextServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('setPersonalization', 'setCustomize', 'setCombinedView', 'setSeData'),
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditContextServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditContextServiceProxy;
}());

var /* @ngInject */ PersonalizationsmarteditContextService = /** @class */ (function () {
    PersonalizationsmarteditContextService.$inject = ["$q", "sharedDataService", "loadConfigManagerService", "personalizationsmarteditContextServiceProxy", "personalizationsmarteditContextUtils"];
    function /* @ngInject */ PersonalizationsmarteditContextService($q, sharedDataService, loadConfigManagerService, personalizationsmarteditContextServiceProxy, personalizationsmarteditContextUtils) {
        this.$q = $q;
        this.sharedDataService = sharedDataService;
        this.loadConfigManagerService = loadConfigManagerService;
        this.personalizationsmarteditContextServiceProxy = personalizationsmarteditContextServiceProxy;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        var context = personalizationsmarteditContextUtils.getContextObject();
        this.setPersonalization(context.personalization);
        this.setCustomize(context.customize);
        this.setCombinedView(context.combinedView);
        this.setSeData(context.seData);
        this.customizeFiltersState = {};
    }
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getPersonalization = function () {
        return this.personalization;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setPersonalization = function (personalization) {
        this.personalization = personalization;
        this.personalizationsmarteditContextServiceProxy.setPersonalization(personalization);
    };
    PersonalizationsmarteditContextService.prototype.setPersonalization.$inject = ["personalization"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getCustomize = function () {
        return this.customize;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setCustomize = function (customize) {
        this.customize = customize;
        this.personalizationsmarteditContextServiceProxy.setCustomize(customize);
    };
    PersonalizationsmarteditContextService.prototype.setCustomize.$inject = ["customize"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getCombinedView = function () {
        return this.combinedView;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setCombinedView = function (combinedView) {
        this.combinedView = combinedView;
        this.personalizationsmarteditContextServiceProxy.setCombinedView(combinedView);
    };
    PersonalizationsmarteditContextService.prototype.setCombinedView.$inject = ["combinedView"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getSeData = function () {
        return this.seData;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setSeData = function (seData) {
        this.seData = seData;
        this.personalizationsmarteditContextServiceProxy.setSeData(seData);
    };
    PersonalizationsmarteditContextService.prototype.setSeData.$inject = ["seData"];
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.refreshExperienceData = function () {
        var _this = this;
        return this.sharedDataService.get('experience').then(function (data) {
            var seData = _this.getSeData();
            seData.seExperienceData = data;
            seData.pageId = data.pageId;
            _this.setSeData(seData);
            return _this.$q.when();
        });
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.refreshConfigurationData = function () {
        var _this = this;
        this.loadConfigManagerService.loadAsObject().then(function (configurations) {
            var seData = _this.getSeData();
            seData.seConfigurationData = configurations;
            _this.setSeData(seData);
        });
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.applySynchronization = function () {
        this.personalizationsmarteditContextServiceProxy.setPersonalization(this.personalization);
        this.personalizationsmarteditContextServiceProxy.setCustomize(this.customize);
        this.personalizationsmarteditContextServiceProxy.setCombinedView(this.combinedView);
        this.personalizationsmarteditContextServiceProxy.setSeData(this.seData);
        this.refreshExperienceData();
        this.refreshConfigurationData();
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getContexServiceProxy = function () {
        return this.personalizationsmarteditContextServiceProxy;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.getCustomizeFiltersState = function () {
        return this.customizeFiltersState;
    };
    /* @ngInject */ PersonalizationsmarteditContextService.prototype.setCustomizeFiltersState = function (filters) {
        this.customizeFiltersState = filters;
    };
    PersonalizationsmarteditContextService.prototype.setCustomizeFiltersState.$inject = ["filters"];
    /* @ngInject */ PersonalizationsmarteditContextService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, Object, Object, PersonalizationsmarteditContextServiceProxy,
            personalizationcommons.PersonalizationsmarteditContextUtils])
    ], /* @ngInject */ PersonalizationsmarteditContextService);
    return /* @ngInject */ PersonalizationsmarteditContextService;
}());

var /* @ngInject */ PersonalizationsmarteditRestService = /** @class */ (function () {
    PersonalizationsmarteditRestService.$inject = ["restServiceFactory", "personalizationsmarteditUtils", "httpClient", "$q", "yjQuery", "personalizationsmarteditContextService"];
    function /* @ngInject */ PersonalizationsmarteditRestService(restServiceFactory, personalizationsmarteditUtils, httpClient, $q, yjQuery, personalizationsmarteditContextService) {
        this.restServiceFactory = restServiceFactory;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.httpClient = httpClient;
        this.$q = $q;
        this.yjQuery = yjQuery;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.actionHeaders = new http.HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
    }
    /* @ngInject */ PersonalizationsmarteditRestService_1 = /* @ngInject */ PersonalizationsmarteditRestService;
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
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithCustomizatonCode = function (requestParam, customizatiodCode) {
        var customizationCodeParam = {
            customizationCode: customizatiodCode
        };
        requestParam = angular.extend(requestParam, customizationCodeParam);
        return requestParam;
    };
    PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithCustomizatonCode.$inject = ["requestParam", "customizatiodCode"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithVariationCode = function (requestParam, variationCode) {
        var param = {
            variationCode: variationCode
        };
        requestParam = angular.extend(requestParam, param);
        return requestParam;
    };
    PersonalizationsmarteditRestService.prototype.extendRequestParamObjWithVariationCode.$inject = ["requestParam", "variationCode"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getParamsAction = function (oldComponentId, newComponentId, slotId, containerId, customizationId, variationId) {
        var entries = [];
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "oldComponentId", oldComponentId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "newComponentId", newComponentId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "slotId", slotId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "containerId", containerId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "variationId", variationId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "customizationId", customizationId);
        return {
            params: {
                entry: entries
            }
        };
    };
    PersonalizationsmarteditRestService.prototype.getParamsAction.$inject = ["oldComponentId", "newComponentId", "slotId", "containerId", "customizationId", "variationId"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getPathVariablesObjForModifyingActionURI = function (customizationId, variationId, actionId, filter) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        filter = filter || {};
        return {
            customizationCode: customizationId,
            variationCode: variationId,
            actionId: actionId,
            catalogId: filter.catalog || experienceData.catalogDescriptor.catalogId,
            catalogVersion: filter.catalogVersion || experienceData.catalogDescriptor.catalogVersion
        };
    };
    PersonalizationsmarteditRestService.prototype.getPathVariablesObjForModifyingActionURI.$inject = ["customizationId", "variationId", "actionId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.prepareURI = function (uri, pathVariables) {
        return uri.replace(/((?:\:)(\w*)(?:\/))/g, function (match, p1, p2) {
            return pathVariables[p2] + "/";
        });
    };
    PersonalizationsmarteditRestService.prototype.prepareURI.$inject = ["uri", "pathVariables"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getParamsForCustomizations = function (filter) {
        return {
            code: angular.isDefined(filter.code) ? filter.code : undefined,
            pageId: angular.isDefined(filter.pageId) ? filter.pageId : undefined,
            pageCatalogId: angular.isDefined(filter.pageCatalogId) ? filter.pageCatalogId : undefined,
            name: angular.isDefined(filter.name) ? filter.name : undefined,
            negatePageId: angular.isDefined(filter.negatePageId) ? filter.negatePageId : undefined,
            catalogs: angular.isDefined(filter.catalogs) ? filter.catalogs : undefined,
            statuses: angular.isDefined(filter.statuses) ? filter.statuses.join(',') : undefined
        };
    };
    PersonalizationsmarteditRestService.prototype.getParamsForCustomizations.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getActionsDetails = function (filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS_DETAILS);
        filter = this.extendRequestParamObjWithCatalogAwarePathVariables(filter);
        return restService.get(filter);
    };
    PersonalizationsmarteditRestService.prototype.getActionsDetails.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getCustomizations = function (filter) {
        filter = filter || {};
        var requestParams = {};
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATIONS);
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams, filter);
        requestParams.pageSize = filter.currentSize || 10;
        requestParams.currentPage = filter.currentPage || 0;
        this.yjQuery.extend(requestParams, this.getParamsForCustomizations(filter));
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getCustomizations.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getComponenentsIdsForVariation = function (customizationId, variationId, catalog, catalogVersion) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CXCMSC_ACTIONS_FROM_VARIATIONS);
        var entries = [];
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "customization", customizationId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "variations", variationId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog", catalog || experienceData.catalogDescriptor.catalogId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalogVersion", catalogVersion || experienceData.catalogDescriptor.catalogVersion);
        var requestParams = {
            params: {
                entry: entries
            }
        };
        return restService.save(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getComponenentsIdsForVariation.$inject = ["customizationId", "variationId", "catalog", "catalogVersion"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getCxCmsActionsOnPageForCustomization = function (customization, currentPage) {
        var filter = {
            type: "CXCMSACTION",
            catalogs: "ALL",
            fields: "FULL",
            pageId: this.personalizationsmarteditContextService.getSeData().pageId,
            pageCatalogId: this.personalizationsmarteditContextService.getSeData().seExperienceData.pageContext.catalogId,
            customizationCode: customization.code || "",
            currentPage: currentPage || 0
        };
        return this.getActionsDetails(filter);
    };
    PersonalizationsmarteditRestService.prototype.getCxCmsActionsOnPageForCustomization.$inject = ["customization", "currentPage"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getSegments = function (filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.SEGMENTS);
        return restService.get(filter);
    };
    PersonalizationsmarteditRestService.prototype.getSegments.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getCustomization = function (filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION, "customizationCode");
        var requestParams = this.extendRequestParamObjWithCustomizatonCode({}, filter.code);
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams, filter);
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getCustomization.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.createCustomization = function (customization) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION_PACKAGES);
        return restService.save(this.extendRequestParamObjWithCatalogAwarePathVariables(customization));
    };
    PersonalizationsmarteditRestService.prototype.createCustomization.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.updateCustomization = function (customization) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION, "customizationCode");
        customization.customizationCode = customization.code;
        return restService.update(this.extendRequestParamObjWithCatalogAwarePathVariables(customization));
    };
    PersonalizationsmarteditRestService.prototype.updateCustomization.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.updateCustomizationPackage = function (customization) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION_PACKAGE, "customizationCode");
        customization.customizationCode = customization.code;
        return restService.update(this.extendRequestParamObjWithCatalogAwarePathVariables(customization));
    };
    PersonalizationsmarteditRestService.prototype.updateCustomizationPackage.$inject = ["customization"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.deleteCustomization = function (customizationCode) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION, "customizationCode");
        var requestParams = {
            customizationCode: customizationCode
        };
        return restService.remove(this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams));
    };
    PersonalizationsmarteditRestService.prototype.deleteCustomization.$inject = ["customizationCode"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getVariation = function (customizationCode, variationCode) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.VARIATION, "variationCode");
        var requestParams = this.extendRequestParamObjWithVariationCode({}, variationCode);
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams);
        requestParams = this.extendRequestParamObjWithCustomizatonCode(requestParams, customizationCode);
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getVariation.$inject = ["customizationCode", "variationCode"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.editVariation = function (customizationCode, variation) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.VARIATION, "variationCode");
        variation = this.extendRequestParamObjWithCatalogAwarePathVariables(variation);
        variation = this.extendRequestParamObjWithCustomizatonCode(variation, customizationCode);
        variation.variationCode = variation.code;
        return restService.update(variation);
    };
    PersonalizationsmarteditRestService.prototype.editVariation.$inject = ["customizationCode", "variation"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.deleteVariation = function (customizationCode, variationCode) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.VARIATION, "variationCode");
        var requestParams = this.extendRequestParamObjWithVariationCode({}, variationCode);
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams);
        requestParams = this.extendRequestParamObjWithCustomizatonCode(requestParams, customizationCode);
        return restService.remove(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.deleteVariation.$inject = ["customizationCode", "variationCode"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.createVariationForCustomization = function (customizationCode, variation) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.VARIATIONS);
        variation = this.extendRequestParamObjWithCatalogAwarePathVariables(variation);
        variation = this.extendRequestParamObjWithCustomizatonCode(variation, customizationCode);
        return restService.save(variation);
    };
    PersonalizationsmarteditRestService.prototype.createVariationForCustomization.$inject = ["customizationCode", "variation"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getVariationsForCustomization = function (customizationCode, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.VARIATIONS);
        var requestParams = {};
        var varForCustFilter = filter || {};
        requestParams = this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams, varForCustFilter);
        requestParams = this.extendRequestParamObjWithCustomizatonCode(requestParams, customizationCode);
        requestParams.fields = /* @ngInject */ PersonalizationsmarteditRestService_1.VARIATION_FOR_CUSTOMIZATION_DEFAULT_FIELDS;
        var includeFullFields = typeof varForCustFilter.includeFullFields === "undefined" ? false : varForCustFilter.includeFullFields;
        if (includeFullFields) {
            requestParams.fields = /* @ngInject */ PersonalizationsmarteditRestService_1.FULL_FIELDS;
        }
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getVariationsForCustomization.$inject = ["customizationCode", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.replaceComponentWithContainer = function (componentId, slotId, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ADD_CONTAINER);
        var catalogParams = this.extendRequestParamObjWithCatalogAwarePathVariables({}, filter);
        var requestParams = this.getParamsAction(componentId, null, slotId, null, null, null);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(requestParams.params.entry, "catalog", catalogParams.catalogId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(requestParams.params.entry, "catalogVersion", catalogParams.catalogVersion);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(requestParams.params.entry, "slotCatalog", filter.slotCatalog);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(requestParams.params.entry, "oldComponentCatalog", filter.oldComponentCatalog);
        return restService.save(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.replaceComponentWithContainer.$inject = ["componentId", "slotId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getActions = function (customizationId, variationId, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS);
        var pathVariables = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, undefined, filter);
        var requestParams = {
            fields: /* @ngInject */ PersonalizationsmarteditRestService_1.FULL_FIELDS
        };
        requestParams = angular.extend(requestParams, pathVariables);
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getActions.$inject = ["customizationId", "variationId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.createActions = function (customizationId, variationId, data, filter) {
        var pathVariables = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, undefined, filter);
        var url = this.prepareURI(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS, pathVariables);
        var httpOptions = {
            headers: this.actionHeaders
        };
        return this.httpClient.patch(url, data, httpOptions).toPromise();
    };
    PersonalizationsmarteditRestService.prototype.createActions.$inject = ["customizationId", "variationId", "data", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.addActionToContainer = function (componentId, catalogId, containerId, customizationId, variationId, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS);
        var pathVariables = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, undefined, filter);
        var requestParams = {
            type: "cxCmsActionData",
            containerId: containerId,
            componentId: componentId,
            componentCatalog: catalogId
        };
        requestParams = angular.extend(requestParams, pathVariables);
        return restService.save(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.addActionToContainer.$inject = ["componentId", "catalogId", "containerId", "customizationId", "variationId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.editAction = function (customizationId, variationId, actionId, newComponentId, newComponentCatalog, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTION, "actionId");
        var requestParams = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, actionId, filter);
        return restService.get(requestParams).then(function (actionInfo) {
            actionInfo = angular.extend(actionInfo, requestParams);
            actionInfo.componentId = newComponentId;
            actionInfo.componentCatalog = newComponentCatalog;
            return restService.update(actionInfo);
        });
    };
    PersonalizationsmarteditRestService.prototype.editAction.$inject = ["customizationId", "variationId", "actionId", "newComponentId", "newComponentCatalog", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.deleteAction = function (customizationId, variationId, actionId, filter) {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTION, "actionId");
        var requestParams = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, actionId, filter);
        return restService.remove(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.deleteAction.$inject = ["customizationId", "variationId", "actionId", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.deleteActions = function (customizationId, variationId, actionIds, filter) {
        var pathVariables = this.getPathVariablesObjForModifyingActionURI(customizationId, variationId, undefined, filter);
        var url = this.prepareURI(/* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS, pathVariables);
        var httpOptions = {
            headers: this.actionHeaders,
            body: actionIds
        };
        return this.httpClient.delete(url, httpOptions).toPromise();
    };
    PersonalizationsmarteditRestService.prototype.deleteActions.$inject = ["customizationId", "variationId", "actionIds", "filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getComponents = function (filter) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CATALOGS);
        var requestParams = {
            siteId: experienceData.siteDescriptor.uid
        };
        requestParams = angular.extend(requestParams, filter);
        return restService.get(this.extendRequestParamObjWithCatalogAwarePathVariables(requestParams, filter));
    };
    PersonalizationsmarteditRestService.prototype.getComponents.$inject = ["filter"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getComponent = function (itemUuid) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CATALOG, "itemUuid");
        var requestParams = {
            itemUuid: itemUuid,
            siteId: experienceData.siteDescriptor.uid
        };
        return restService.get(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.getComponent.$inject = ["itemUuid"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.getNewComponentTypes = function () {
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.COMPONENT_TYPES);
        return restService.get();
    };
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.updateCustomizationRank = function (customizationId, icreaseValue) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.UPDATE_CUSTOMIZATION_RANK);
        var entries = [];
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "customization", customizationId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "increaseValue", icreaseValue);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog", experienceData.catalogDescriptor.catalogId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalogVersion", experienceData.catalogDescriptor.catalogVersion);
        var requestParams = {
            params: {
                entry: entries
            }
        };
        return restService.save(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.updateCustomizationRank.$inject = ["customizationId", "icreaseValue"];
    /* @ngInject */ PersonalizationsmarteditRestService.prototype.checkVersionConflict = function (versionId) {
        var experienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationsmarteditRestService_1.CHECK_VERSION);
        var entries = [];
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "versionId", versionId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog", experienceData.catalogDescriptor.catalogId);
        this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalogVersion", experienceData.catalogDescriptor.catalogVersion);
        var requestParams = {
            params: {
                entry: entries
            }
        };
        return restService.save(requestParams);
    };
    PersonalizationsmarteditRestService.prototype.checkVersionConflict.$inject = ["versionId"];
    var /* @ngInject */ PersonalizationsmarteditRestService_1;
    /* @ngInject */ PersonalizationsmarteditRestService.CUSTOMIZATIONS = "/personalizationwebservices/v1/catalogs/:catalogId/catalogVersions/:catalogVersion/customizations";
    /* @ngInject */ PersonalizationsmarteditRestService.CUSTOMIZATION = /* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATIONS + "/:customizationCode";
    /* @ngInject */ PersonalizationsmarteditRestService.CUSTOMIZATION_PACKAGES = "/personalizationwebservices/v1/catalogs/:catalogId/catalogVersions/:catalogVersion/customizationpackages";
    /* @ngInject */ PersonalizationsmarteditRestService.CUSTOMIZATION_PACKAGE = /* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION_PACKAGES + "/:customizationCode";
    /* @ngInject */ PersonalizationsmarteditRestService.ACTIONS_DETAILS = "/personalizationwebservices/v1/catalogs/:catalogId/catalogVersions/:catalogVersion/actions";
    /* @ngInject */ PersonalizationsmarteditRestService.VARIATIONS = /* @ngInject */ PersonalizationsmarteditRestService_1.CUSTOMIZATION + "/variations";
    /* @ngInject */ PersonalizationsmarteditRestService.VARIATION = /* @ngInject */ PersonalizationsmarteditRestService_1.VARIATIONS + "/:variationCode";
    /* @ngInject */ PersonalizationsmarteditRestService.ACTIONS = /* @ngInject */ PersonalizationsmarteditRestService_1.VARIATION + "/actions";
    /* @ngInject */ PersonalizationsmarteditRestService.ACTION = /* @ngInject */ PersonalizationsmarteditRestService_1.ACTIONS + "/:actionId";
    /* @ngInject */ PersonalizationsmarteditRestService.CXCMSC_ACTIONS_FROM_VARIATIONS = "/personalizationwebservices/v1/query/cxcmscomponentsfromvariations";
    /* @ngInject */ PersonalizationsmarteditRestService.SEGMENTS = "/personalizationwebservices/v1/segments";
    /* @ngInject */ PersonalizationsmarteditRestService.CATALOGS = "/cmswebservices/v1/sites/:siteId/cmsitems";
    /* @ngInject */ PersonalizationsmarteditRestService.CATALOG = /* @ngInject */ PersonalizationsmarteditRestService_1.CATALOGS + "/:itemUuid";
    /* @ngInject */ PersonalizationsmarteditRestService.ADD_CONTAINER = "/personalizationwebservices/v1/query/cxReplaceComponentWithContainer";
    /* @ngInject */ PersonalizationsmarteditRestService.COMPONENT_TYPES = '/cmswebservices/v1/types?category=COMPONENT';
    /* @ngInject */ PersonalizationsmarteditRestService.UPDATE_CUSTOMIZATION_RANK = "/personalizationwebservices/v1/query/cxUpdateCustomizationRank";
    /* @ngInject */ PersonalizationsmarteditRestService.CHECK_VERSION = "/personalizationwebservices/v1/query/cxCmsPageVersionCheck";
    /* @ngInject */ PersonalizationsmarteditRestService.VARIATION_FOR_CUSTOMIZATION_DEFAULT_FIELDS = "variations(active,actions,enabled,code,name,rank,status,catalog,catalogVersion)";
    /* @ngInject */ PersonalizationsmarteditRestService.FULL_FIELDS = "FULL";
    /* @ngInject */ PersonalizationsmarteditRestService = /* @ngInject */ PersonalizationsmarteditRestService_1 = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory, Object, http.HttpClient, Object, Object, PersonalizationsmarteditContextService])
    ], /* @ngInject */ PersonalizationsmarteditRestService);
    return /* @ngInject */ PersonalizationsmarteditRestService;
}());

var /* @ngInject */ ManageCustomizationViewComponent = /** @class */ (function () {
    ManageCustomizationViewComponent.$inject = ["DATE_CONSTANTS", "CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS", "PERSONALIZATION_MODEL_STATUS_CODES", "CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS", "PERSONALIZATION_DATE_FORMATS", "MODAL_BUTTON_ACTIONS", "personalizationsmarteditRestService", "personalizationsmarteditDateUtils", "personalizationsmarteditMessageHandler", "personalizationsmarteditCommerceCustomizationService", "personalizationsmarteditUtils", "confirmationModalService", "systemEventService", "$translate", "$log"];
    function /* @ngInject */ ManageCustomizationViewComponent(DATE_CONSTANTS, CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS, PERSONALIZATION_MODEL_STATUS_CODES, CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS, PERSONALIZATION_DATE_FORMATS, MODAL_BUTTON_ACTIONS, personalizationsmarteditRestService, personalizationsmarteditDateUtils, personalizationsmarteditMessageHandler, personalizationsmarteditCommerceCustomizationService, personalizationsmarteditUtils, confirmationModalService, systemEventService, $translate, $log) {
        this.DATE_CONSTANTS = DATE_CONSTANTS;
        this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS = CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS;
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS = CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS;
        this.PERSONALIZATION_DATE_FORMATS = PERSONALIZATION_DATE_FORMATS;
        this.MODAL_BUTTON_ACTIONS = MODAL_BUTTON_ACTIONS;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditCommerceCustomizationService = personalizationsmarteditCommerceCustomizationService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.confirmationModalService = confirmationModalService;
        this.systemEventService = systemEventService;
        this.$translate = $translate;
        this.$log = $log;
        this.initialCustomization = {
            name: '',
            enabledStartDate: '',
            enabledEndDate: '',
            status: 'ENABLED',
            statusBoolean: true,
            variations: []
        };
        this.customization = {};
        this.activeTabNumber = 0;
        this.editMode = false;
        this.doCheckCounter = 0;
    }
    /* @ngInject */ ManageCustomizationViewComponent_1 = /* @ngInject */ ManageCustomizationViewComponent;
    /* @ngInject */ ManageCustomizationViewComponent.prototype.$onInit = function () {
        var _this = this;
        if (this.customizationCode) {
            this.getCustomization();
            this.editMode = true;
        }
        else {
            this.customization = angular.copy(this.initialCustomization);
        }
        this.initTabs();
        this.modalManager.setDismissCallback(function () {
            return _this.onCancel();
        });
        this.modalManager.setButtonHandler(function (buttonId) {
            switch (buttonId) {
                case _this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK:
                    return _this.edit.selectedTab.onConfirm();
                case _this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT:
                    return _this.edit.selectedTab.onConfirm();
                case _this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_CANCEL:
                    return _this.edit.selectedTab.onCancel();
                default:
                    _this.$log.error(_this.$translate.instant('personalization.modal.customizationvariationmanagement.targetgrouptab.invalidbuttonid'), buttonId);
                    break;
            }
        });
        this.edit = {
            code: '',
            name: '',
            selectedTab: this.tabsArr[0]
        };
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.$doCheck = function () {
        this.doCheckCounter += 1;
        if (this.doCheckCounter === /* @ngInject */ ManageCustomizationViewComponent_1.DOCHECK_COUNTER_INTERVAL) {
            this.doCheckCounter = 0;
            var isSelectedTabDirty = this.edit.selectedTab.isDirty();
            var isSelectedTabValid = this.edit.selectedTab.isValid();
            if (isSelectedTabDirty) {
                if (isSelectedTabValid) {
                    this.edit.selectedTab.setEnabled(true);
                }
                else {
                    this.edit.selectedTab.setEnabled(false);
                }
            }
            else if (this.editMode) {
                if (isSelectedTabValid) {
                    this.edit.selectedTab.setEnabled(true);
                }
                else {
                    this.edit.selectedTab.setEnabled(false);
                }
            }
            else {
                this.edit.selectedTab.setEnabled(false);
            }
        }
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.getVariationsForCustomization = function (customizationCode) {
        var filter = {
            includeFullFields: true
        };
        return this.personalizationsmarteditRestService.getVariationsForCustomization(customizationCode, filter);
    };
    ManageCustomizationViewComponent.prototype.getVariationsForCustomization.$inject = ["customizationCode"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.createCommerceCustomizationData = function (variations) {
        var _this = this;
        variations.forEach(function (variation) {
            variation.commerceCustomizations = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCountMap(variation);
            variation.numberOfCommerceActions = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCount(variation);
            delete variation.actions; // no more use for this property and it existence may be harmful
        });
    };
    ManageCustomizationViewComponent.prototype.createCommerceCustomizationData.$inject = ["variations"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.getCustomization = function () {
        var _this = this;
        var filter = {
            code: this.customizationCode
        };
        this.personalizationsmarteditRestService.getCustomization(filter).then(function (responseCustomization) {
            _this.customization = responseCustomization;
            _this.customization.enabledStartDate = _this.personalizationsmarteditDateUtils.formatDate(_this.customization.enabledStartDate, undefined);
            _this.customization.enabledEndDate = _this.personalizationsmarteditDateUtils.formatDate(_this.customization.enabledEndDate, undefined);
            _this.customization.statusBoolean = (_this.customization.status === _this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED);
            _this.getVariationsForCustomization(_this.customizationCode).then(function (response) {
                _this.createCommerceCustomizationData(response.variations);
                _this.customization.variations = response.variations;
                if (angular.isDefined(_this.variationCode)) {
                    var filteredCollection = _this.customization.variations.filter(function (elem) {
                        return elem.code === _this.variationCode;
                    });
                    if (filteredCollection.length > 0) {
                        _this.activeTabNumber = 1;
                        _this.edit.selectedTab = _this.tabsArr[1];
                        var selVariation = filteredCollection[0];
                        _this.edit.selectedVariation = selVariation;
                    }
                    _this.initialCustomization = angular.copy(_this.customization);
                }
                else {
                    _this.edit.selectedTab = _this.tabsArr[0];
                    _this.initialCustomization = angular.copy(_this.customization);
                }
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingsegments'));
            });
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcomponents'));
        });
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.initTabs = function () {
        var _this = this;
        this.tabsArr = [{
                name: this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.BASIC_INFO_TAB_NAME,
                active: true,
                disabled: false,
                heading: this.$translate.instant("personalization.modal.customizationvariationmanagement.basicinformationtab"),
                template: 'basicInfoTabWrapperTemplate.html',
                formName: this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.BASIC_INFO_TAB_FORM_NAME,
                isDirty: function () {
                    return _this.isModalDirty();
                },
                isValid: function () {
                    return _this.isBasicInfoTabValid(_this.customization).length === 0;
                },
                setEnabled: function (enabled) {
                    if (enabled) {
                        _this.tabsArr[1].disabled = false;
                        _this.modalManager.enableButton(_this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT);
                    }
                    else {
                        _this.tabsArr[1].disabled = true;
                        _this.modalManager.disableButton(_this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT);
                    }
                },
                onConfirm: function () {
                    _this.activeTabNumber = 1;
                },
                onCancel: function () {
                    _this.onCancel();
                }
            }, {
                name: this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.TARGET_GROUP_TAB_NAME,
                active: false,
                disabled: true,
                heading: this.$translate.instant("personalization.modal.customizationvariationmanagement.targetgrouptab"),
                template: 'targetGroupTabWrapperTemplate.html',
                formName: this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.TARGET_GROUP_TAB_FORM_NAME,
                isDirty: function () {
                    return _this.isModalDirty();
                },
                isValid: function () {
                    return _this.isTargetGroupTabValid(_this.customization).length === 0;
                },
                setEnabled: function (enabled) {
                    if (enabled) {
                        _this.modalManager.enableButton(_this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK);
                    }
                    else {
                        _this.modalManager.disableButton(_this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK);
                    }
                },
                onConfirm: function () {
                    _this.onSave();
                },
                onCancel: function () {
                    _this.onCancel();
                }
            }];
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.selectTab = function (tab) {
        this.edit.selectedTab = tab;
        this.activeTabNumber = this.tabsArr.indexOf(tab);
        switch (tab.name) {
            case this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.BASIC_INFO_TAB_NAME:
                this.modalManager.removeButton(this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK);
                if (!this.modalManager.getButton(this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT)) {
                    this.modalManager.addButton({
                        id: this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT,
                        label: 'personalization.modal.customizationvariationmanagement.basicinformationtab.button.next'
                    });
                }
                break;
            case this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS.TARGET_GROUP_TAB_NAME:
                this.modalManager.removeButton(this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_NEXT);
                if (!this.modalManager.getButton(this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK)) {
                    this.modalManager.addButton({
                        id: this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_OK,
                        label: 'personalization.modal.customizationvariationmanagement.targetgrouptab.button.submit',
                        action: this.MODAL_BUTTON_ACTIONS.CLOSE
                    });
                }
                if (this.customization.enabledStartDate) {
                    this.customization.enabledStartDate = this.personalizationsmarteditDateUtils.formatDate(this.customization.enabledStartDate, this.DATE_CONSTANTS.MOMENT_FORMAT);
                }
                if (this.customization.enabledEndDate) {
                    this.customization.enabledEndDate = this.personalizationsmarteditDateUtils.formatDate(this.customization.enabledEndDate, this.DATE_CONSTANTS.MOMENT_FORMAT);
                }
                break;
        }
    };
    ManageCustomizationViewComponent.prototype.selectTab.$inject = ["tab"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.onSave = function () {
        var _this = this;
        if (this.customization.enabledStartDate) {
            this.customization.enabledStartDate = this.personalizationsmarteditDateUtils.formatDate(this.customization.enabledStartDate, this.PERSONALIZATION_DATE_FORMATS.MODEL_DATE_FORMAT);
        }
        else {
            this.customization.enabledStartDate = undefined;
        }
        if (this.customization.enabledEndDate) {
            this.customization.enabledEndDate = this.personalizationsmarteditDateUtils.formatDate(this.customization.enabledEndDate, this.PERSONALIZATION_DATE_FORMATS.MODEL_DATE_FORMAT);
        }
        else {
            this.customization.enabledEndDate = undefined;
        }
        this.customization.status = this.customization.statusBoolean ? this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED : this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED;
        if (this.editMode) {
            this.personalizationsmarteditRestService.updateCustomizationPackage(this.customization).then(function () {
                _this.systemEventService.publishAsync('CUSTOMIZATIONS_MODIFIED', {});
                _this.personalizationsmarteditMessageHandler.sendSuccess(_this.$translate.instant('personalization.info.updatingcustomization'));
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.updatingcustomization'));
            });
        }
        else {
            this.personalizationsmarteditRestService.createCustomization(this.customization).then(function () {
                _this.systemEventService.publishAsync('CUSTOMIZATIONS_MODIFIED', {});
                _this.personalizationsmarteditMessageHandler.sendSuccess(_this.$translate.instant('personalization.info.creatingcustomization'));
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.creatingcustomization'));
            });
        }
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.onCancel = function () {
        var _this = this;
        if (this.isModalDirty()) {
            return this.confirmationModalService.confirm({
                description: this.$translate.instant('personalization.modal.customizationvariationmanagement.targetgrouptab.cancelconfirmation')
            }).then(function () {
                _this.modalManager.dismiss();
                return Promise.resolve();
            }, function () {
                return Promise.reject();
            });
        }
        else {
            this.modalManager.dismiss();
            return Promise.resolve();
        }
    };
    /* @ngInject */ ManageCustomizationViewComponent.prototype.isBasicInfoTabValid = function (customizationForm) {
        var errorArray = [];
        if (angular.isUndefined(customizationForm.name) || customizationForm.name === '') {
            errorArray.push("name cant be empty");
        }
        return errorArray;
    };
    ManageCustomizationViewComponent.prototype.isBasicInfoTabValid.$inject = ["customizationForm"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.isTargetGroupTabValid = function (customizationForm) {
        var errorArray = [];
        if (!(angular.isArray(customizationForm.variations) && this.personalizationsmarteditUtils.getVisibleItems(customizationForm.variations).length > 0)) {
            errorArray.push("variations cant be empty");
        }
        return errorArray;
    };
    ManageCustomizationViewComponent.prototype.isTargetGroupTabValid.$inject = ["customizationForm"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.isCustomizationValid = function (customizationForm) {
        var errorArray = [];
        errorArray.push(this.isBasicInfoTabValid(customizationForm));
        errorArray.push(this.isTargetGroupTabValid(customizationForm));
        return errorArray;
    };
    ManageCustomizationViewComponent.prototype.isCustomizationValid.$inject = ["customizationForm"];
    /* @ngInject */ ManageCustomizationViewComponent.prototype.isModalDirty = function () {
        return !angular.equals(this.initialCustomization, this.customization);
    };
    var /* @ngInject */ ManageCustomizationViewComponent_1;
    /* @ngInject */ ManageCustomizationViewComponent.DOCHECK_COUNTER_INTERVAL = 30;
    /* @ngInject */ ManageCustomizationViewComponent = /* @ngInject */ ManageCustomizationViewComponent_1 = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'manageCustomizationViewTemplate.html',
            inputs: [
                'modalManager: =',
                'customizationCode',
                'variationCode'
            ]
        }),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditDateUtils, Object, Object, Object, Object, Object, Function, Object])
    ], /* @ngInject */ ManageCustomizationViewComponent);
    return /* @ngInject */ ManageCustomizationViewComponent;
}());

var /* @ngInject */ BasicInfoTabComponent = /** @class */ (function () {
    BasicInfoTabComponent.$inject = ["PERSONALIZATION_MODEL_STATUS_CODES", "DATE_CONSTANTS"];
    function /* @ngInject */ BasicInfoTabComponent(PERSONALIZATION_MODEL_STATUS_CODES, DATE_CONSTANTS) {
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.DATE_CONSTANTS = DATE_CONSTANTS;
        this.datetimeConfigurationEnabled = false;
    }
    Object.defineProperty(/* @ngInject */ BasicInfoTabComponent.prototype, "customization", {
        get: function () {
            return this._customization;
        },
        set: function (value) {
            this._customization = value;
            this.datetimeConfigurationEnabled = (this.customization.enabledStartDate || this.customization.enabledEndDate);
        },
        enumerable: false,
        configurable: true
    });
    /* @ngInject */ BasicInfoTabComponent.prototype.resetDateTimeConfiguration = function () {
        this.customization.enabledStartDate = undefined;
        this.customization.enabledEndDate = undefined;
    };
    /* @ngInject */ BasicInfoTabComponent.prototype.customizationStatusChange = function () {
        this.customization.status = this.customization.statusBoolean ? this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED : this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED;
    };
    /* @ngInject */ BasicInfoTabComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'basicInfoTabTemplate.html',
            inputs: [
                'customization: =?'
            ]
        }),
        __metadata("design:paramtypes", [Object, Object])
    ], /* @ngInject */ BasicInfoTabComponent);
    return /* @ngInject */ BasicInfoTabComponent;
}());

var TriggerDataState = /** @class */ (function () {
    function TriggerDataState() {
        this.state = {
            code: '',
            name: '',
            expression: [],
            isDefault: false,
            showExpression: true,
            selectedVariation: undefined
        };
    }
    return TriggerDataState;
}());

var /* @ngInject */ TriggerTabService = /** @class */ (function () {
    function /* @ngInject */ TriggerTabService() {
        this.tabsList = [];
        this.triggerDataState = new TriggerDataState();
    }
    /* @ngInject */ TriggerTabService.prototype.getTriggersTabs = function () {
        return this.tabsList;
    };
    /* @ngInject */ TriggerTabService.prototype.addTriggerTab = function (trigger) {
        var itemWithSameId = this.tabsList.filter(function (item) {
            return item.id === trigger.id;
        });
        if (itemWithSameId.length === 0) {
            this.tabsList.push(trigger);
        }
    };
    TriggerTabService.prototype.addTriggerTab.$inject = ["trigger"];
    /* @ngInject */ TriggerTabService.prototype.removeTriggerTab = function (trigger) {
        var itemWithSameId = this.tabsList.filter(function (item) {
            return item.id === trigger.id;
        });
        if (itemWithSameId.length > 0) {
            var index = this.tabsList.indexOf(itemWithSameId[0]);
            this.tabsList.splice(index, 1);
        }
    };
    TriggerTabService.prototype.removeTriggerTab.$inject = ["trigger"];
    /* @ngInject */ TriggerTabService.prototype.getTriggerDataState = function () {
        return this.triggerDataState.state;
    };
    /* @ngInject */ TriggerTabService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ TriggerTabService);
    return /* @ngInject */ TriggerTabService;
}());

var /* @ngInject */ TargetGroupTabComponent = /** @class */ (function () {
    TargetGroupTabComponent.$inject = ["PERSONALIZATION_MODEL_STATUS_CODES", "CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS", "personalizationsmarteditUtils", "personalizationsmarteditTriggerService", "$translate", "$timeout", "yjQuery", "confirmationModalService", "isBlank", "personalizationsmarteditDateUtils", "triggerTabService"];
    function /* @ngInject */ TargetGroupTabComponent(PERSONALIZATION_MODEL_STATUS_CODES, CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS, personalizationsmarteditUtils, personalizationsmarteditTriggerService, $translate, $timeout, yjQuery, confirmationModalService, isBlank, personalizationsmarteditDateUtils, triggerTabService) {
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS = CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditTriggerService = personalizationsmarteditTriggerService;
        this.$translate = $translate;
        this.$timeout = $timeout;
        this.yjQuery = yjQuery;
        this.confirmationModalService = confirmationModalService;
        this.isBlank = isBlank;
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
        this.triggerTabService = triggerTabService;
    }
    /* @ngInject */ TargetGroupTabComponent.prototype.getActivityActionTextForVariation = function (variation) {
        if (variation.enabled) {
            return this.$translate.instant('personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.disable');
        }
        else {
            return this.$translate.instant('personalization.modal.customizationvariationmanagement.targetgrouptab.variation.options.enable');
        }
    };
    TargetGroupTabComponent.prototype.getActivityActionTextForVariation.$inject = ["variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.getActivityStateForCustomization = function (customization) {
        return this.personalizationsmarteditUtils.getActivityStateForCustomization(customization);
    };
    TargetGroupTabComponent.prototype.getActivityStateForCustomization.$inject = ["customization"];
    /* @ngInject */ TargetGroupTabComponent.prototype.getActivityStateForVariation = function (customization, variation) {
        return this.personalizationsmarteditUtils.getActivityStateForVariation(customization, variation);
    };
    TargetGroupTabComponent.prototype.getActivityStateForVariation.$inject = ["customization", "variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.getEnablementTextForVariation = function (variation) {
        return '(' + this.personalizationsmarteditUtils.getEnablementTextForVariation(variation, 'personalization.modal.customizationvariationmanagement.targetgrouptab') + ')';
    };
    TargetGroupTabComponent.prototype.getEnablementTextForVariation.$inject = ["variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.setSliderConfigForAdd = function () {
        var _this = this;
        this.sliderPanelConfiguration.modal.save.label = "personalization.modal.customizationvariationmanagement.targetgrouptab.addvariation";
        this.sliderPanelConfiguration.modal.save.isDisabledFn = function () {
            return !_this.canSaveVariation();
        };
        this.sliderPanelConfiguration.modal.save.onClick = function () {
            _this.addVariationClick();
        };
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.setSliderConfigForEditing = function () {
        var _this = this;
        this.sliderPanelConfiguration.modal.save.label = "personalization.modal.customizationvariationmanagement.targetgrouptab.savechanges";
        this.sliderPanelConfiguration.modal.save.isDisabledFn = function () {
            return !_this.canSaveVariation();
        };
        this.sliderPanelConfiguration.modal.save.onClick = function () {
            _this.submitChangesClick();
        };
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.toggleSliderFullscreen = function (enableFullscreen) {
        var _this = this;
        var modalObject = angular.element(".sliderPanelParentModal");
        var className = "modal-fullscreen";
        if (modalObject.hasClass(className) || enableFullscreen === false) {
            modalObject.removeClass(className);
        }
        else {
            modalObject.addClass(className);
        }
        this.$timeout((function () {
            _this.yjQuery(window).resize();
        }), 0);
    };
    TargetGroupTabComponent.prototype.toggleSliderFullscreen.$inject = ["enableFullscreen"];
    /* @ngInject */ TargetGroupTabComponent.prototype.confirmDefaultTrigger = function (isDefault) {
        var _this = this;
        if (isDefault && this.personalizationsmarteditTriggerService.isValidExpression(this.edit.expression[0])) {
            this.confirmationModalService.confirm({
                description: 'personalization.modal.manager.targetgrouptab.defaulttrigger.content'
            }).then(function () {
                _this.edit.showExpression = false;
            }, function () {
                _this.edit.isDefault = false;
            });
        }
        else {
            this.edit.showExpression = !isDefault;
        }
    };
    TargetGroupTabComponent.prototype.confirmDefaultTrigger.$inject = ["isDefault"];
    /* @ngInject */ TargetGroupTabComponent.prototype.canSaveVariation = function () {
        var triggerTabs = this.triggerTabService.getTriggersTabs();
        var isValidOrEmpty = triggerTabs.every(function (element) {
            return element.isValidOrEmpty();
        });
        var isTriggerDefined = triggerTabs.some(function (element) {
            return element.isTriggerDefined();
        });
        var canSaveVariation = !this.isBlank(this.edit.name);
        canSaveVariation = canSaveVariation && (this.edit.isDefault || (isTriggerDefined && isValidOrEmpty));
        return canSaveVariation;
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.addVariationClick = function () {
        var _this = this;
        this.customization.variations.push({
            code: this.edit.code,
            name: this.edit.name,
            enabled: true,
            status: this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED,
            triggers: this.personalizationsmarteditTriggerService.buildTriggers(this.edit, this.edit.selectedVariation.triggers || []),
            rank: this.customization.variations.length,
            isNew: true
        });
        this.clearEditedVariationDetails();
        this.toggleSliderFullscreen(false);
        this.$timeout((function () {
            _this.sliderPanelHide();
        }), 0);
        this.isVariationLoaded = false;
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.submitChangesClick = function () {
        var _this = this;
        var triggers = this.personalizationsmarteditTriggerService.buildTriggers(this.edit, this.edit.selectedVariation.triggers || []);
        this.edit.selectedVariation.triggers = triggers;
        this.edit.selectedVariation.name = this.edit.name;
        this.edit.selectedVariation = undefined;
        this.toggleSliderFullscreen(false);
        this.$timeout((function () {
            _this.sliderPanelHide();
        }), 0);
        this.isVariationLoaded = false;
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.cancelChangesClick = function () {
        if (this.isVariationSelected()) {
            this.edit.selectedVariation = undefined;
        }
        else {
            this.clearEditedVariationDetails();
        }
        this.toggleSliderFullscreen(false);
        this.sliderPanelHide();
        this.isVariationLoaded = false;
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.isVariationSelected = function () {
        return angular.isDefined(this.edit.selectedVariation);
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.clearEditedVariationDetails = function () {
        this.edit.code = '';
        this.edit.name = '';
        this.edit.expression = [];
        this.edit.isDefault = false;
        this.edit.showExpression = true;
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.setVariationRank = function (variation, increaseValue, $event, firstOrLast) {
        if (firstOrLast) {
            $event.stopPropagation();
        }
        else {
            var fromIndex = this.customization.variations.indexOf(variation);
            var to = this.personalizationsmarteditUtils.getValidRank(this.customization.variations, variation, increaseValue);
            var variationsArr = this.customization.variations;
            if (to >= 0 && to < variationsArr.length) {
                variationsArr.splice(to, 0, variationsArr.splice(fromIndex, 1)[0]);
                this.recalculateRanksForVariations();
            }
        }
    };
    TargetGroupTabComponent.prototype.setVariationRank.$inject = ["variation", "increaseValue", "$event", "firstOrLast"];
    /* @ngInject */ TargetGroupTabComponent.prototype.recalculateRanksForVariations = function () {
        var _this = this;
        this.customization.variations.forEach(function (part, index) {
            _this.customization.variations[index].rank = index;
        });
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.removeVariationClick = function (variation) {
        var _this = this;
        this.confirmationModalService.confirm({
            description: 'personalization.modal.manager.targetgrouptab.deletevariation.content'
        }).then(function () {
            if (variation.isNew) {
                _this.customization.variations.splice(_this.customization.variations.indexOf(variation), 1);
            }
            else {
                variation.status = "DELETED";
            }
            _this.edit.selectedVariation = undefined;
            _this.recalculateRanksForVariations();
        });
    };
    TargetGroupTabComponent.prototype.removeVariationClick.$inject = ["variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.addVariationAction = function () {
        var _this = this;
        this.clearEditedVariationDetails();
        this.setSliderConfigForAdd();
        this.sliderPanelShow();
        this.edit.selectedVariation = { triggers: [] };
        this.$timeout((function () {
            _this.isVariationLoaded = true;
        }), 0);
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.editVariationAction = function (variation) {
        var _this = this;
        this.setSliderConfigForEditing();
        this.edit.selectedVariation = variation;
        this.edit.code = variation.code;
        this.edit.name = variation.name;
        this.edit.isDefault = this.personalizationsmarteditTriggerService.isDefault(variation.triggers);
        this.edit.showExpression = !this.edit.isDefault;
        this.sliderPanelShow();
        this.$timeout((function () {
            _this.isVariationLoaded = true;
        }), 0);
    };
    TargetGroupTabComponent.prototype.editVariationAction.$inject = ["variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.toogleVariationActive = function (variation) {
        variation.enabled = !variation.enabled;
        variation.status = variation.enabled ? this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED : this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED;
    };
    TargetGroupTabComponent.prototype.toogleVariationActive.$inject = ["variation"];
    /* @ngInject */ TargetGroupTabComponent.prototype.$onInit = function () {
        var _this = this;
        this.isVariationLoaded = false;
        this.edit = this.triggerTabService.getTriggerDataState();
        this.sliderPanelConfiguration = {
            modal: {
                showDismissButton: true,
                title: "personalization.modal.customizationvariationmanagement.targetgrouptab.slidingpanel.title",
                cancel: {
                    label: "personalization.modal.customizationvariationmanagement.targetgrouptab.cancelchanges",
                    onClick: function () {
                        _this.cancelChangesClick();
                    }
                },
                dismiss: {
                    onClick: function () {
                        _this.cancelChangesClick();
                    }
                },
                save: {}
            },
            cssSelector: "#y-modal-dialog"
        };
        var segmentTriggerTab = {
            id: "segmentTrigger",
            title: 'personalization.modal.customizationvariationmanagement.targetgrouptab.segments',
            templateUrl: 'personalizationsmarteditSegmentViewWrapperTemplate.html',
            isTriggerDefined: function () {
                return _this.personalizationsmarteditTriggerService.isValidExpression(_this.edit.expression[0]);
            },
            isValidOrEmpty: function () {
                _this.edit.expression = _this.edit.expression || [{ nodes: [] }];
                return _this.personalizationsmarteditTriggerService.isValidExpression(_this.edit.expression[0])
                    || _this.edit.expression.length === 0
                    || _this.edit.expression[0].nodes.length === 0
                    || _this.personalizationsmarteditTriggerService.isDropzone(_this.edit.expression[0].nodes[0]);
            }
        };
        this.triggerTabService.addTriggerTab(segmentTriggerTab);
    };
    /* @ngInject */ TargetGroupTabComponent.prototype.$onChanges = function (changes) {
        if (changes.variation && changes.variation.currentValue) {
            this.editVariationAction(changes.variation.currentValue);
        }
    };
    TargetGroupTabComponent.prototype.$onChanges.$inject = ["changes"];
    /* @ngInject */ TargetGroupTabComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'targetGroupTabTemplate.html',
            inputs: [
                'customization: =?',
                'variation'
            ]
        }),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Function, Object, Function, Object, Object, personalizationcommons.PersonalizationsmarteditDateUtils,
            TriggerTabService])
    ], /* @ngInject */ TargetGroupTabComponent);
    return /* @ngInject */ TargetGroupTabComponent;
}());

var /* @ngInject */ PersonalizationsmarteditTriggerService = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditTriggerService() {
        this.DEFAULT_TRIGGER = 'defaultTriggerData';
        this.SEGMENT_TRIGGER = 'segmentTriggerData';
        this.EXPRESSION_TRIGGER = 'expressionTriggerData';
        this.supportedTypes = [this.DEFAULT_TRIGGER, this.SEGMENT_TRIGGER, this.EXPRESSION_TRIGGER];
        this.actions = [{
                id: 'AND',
                name: 'personalization.modal.customizationvariationmanagement.targetgrouptab.expression.and'
            }, {
                id: 'OR',
                name: 'personalization.modal.customizationvariationmanagement.targetgrouptab.expression.or'
            }, {
                id: 'NOT',
                name: 'personalization.modal.customizationvariationmanagement.targetgrouptab.expression.not'
            }];
        this.GROUP_EXPRESSION = 'groupExpressionData';
        this.SEGMENT_EXPRESSION = 'segmentExpressionData';
        this.NEGATION_EXPRESSION = 'negationExpressionData';
        this.CONTAINER_TYPE = 'container';
        this.ITEM_TYPE = 'item';
        this.DROPZONE_TYPE = 'dropzone';
    }
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isContainer = function (element) {
        return this.isElementOfType(element, this.CONTAINER_TYPE);
    };
    PersonalizationsmarteditTriggerService.prototype.isContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isEmptyContainer = function (element) {
        return this.isContainer(element) && element.nodes.length === 0;
    };
    PersonalizationsmarteditTriggerService.prototype.isEmptyContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isNotEmptyContainer = function (element) {
        return this.isContainer(element) && element.nodes.length > 0;
    };
    PersonalizationsmarteditTriggerService.prototype.isNotEmptyContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isDropzone = function (element) {
        return this.isElementOfType(element, this.DROPZONE_TYPE);
    };
    PersonalizationsmarteditTriggerService.prototype.isDropzone.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isItem = function (element) {
        return this.isElementOfType(element, this.ITEM_TYPE);
    };
    PersonalizationsmarteditTriggerService.prototype.isItem.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isValidExpression = function (element) {
        var _this = this;
        if (!element) {
            return false;
        }
        if (this.isContainer(element)) {
            return element.nodes && element.nodes.length > 0 &&
                element.nodes.every(function (node) {
                    return _this.isValidExpression(node);
                });
        }
        else {
            return angular.isDefined(element.selectedSegment);
        }
    };
    PersonalizationsmarteditTriggerService.prototype.isValidExpression.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildTriggers = function (form, existingTriggers) {
        var trigger = {};
        form = form || {};
        if (this.isDefaultData(form)) {
            trigger = this.buildDefaultTrigger();
        }
        else if (form.expression && form.expression.length > 0) {
            var element = form.expression[0];
            if (this.isDropzone(element.nodes[0])) {
                trigger = {};
            }
            else if (this.isExpressionData(element)) {
                trigger = this.buildExpressionTrigger(element);
            }
            else {
                trigger = this.buildSegmentTrigger(element);
            }
        }
        return this.mergeTriggers(existingTriggers, trigger);
    };
    PersonalizationsmarteditTriggerService.prototype.buildTriggers.$inject = ["form", "existingTriggers"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildData = function (triggers) {
        var _this = this;
        var trigger = {};
        var data = this.getBaseData();
        if (triggers && triggers.length > 0) {
            trigger = triggers.filter(function (elem) {
                return _this.isSupportedTrigger(elem);
            })[0];
        }
        if (this.isDefaultTrigger(trigger)) ;
        else if (this.isExpressionTrigger(trigger)) {
            data = this.buildExpressionTriggerData(trigger);
        }
        else if (this.isSegmentTrigger(trigger)) {
            data = this.buildSegmentTriggerData(trigger);
        }
        return data;
    };
    PersonalizationsmarteditTriggerService.prototype.buildData.$inject = ["triggers"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isDefault = function (triggers) {
        var _this = this;
        var defaultTrigger = (triggers || []).filter(function (elem) {
            return _this.isDefaultTrigger(elem);
        })[0];
        return (triggers && defaultTrigger) ? true : false;
    };
    PersonalizationsmarteditTriggerService.prototype.isDefault.$inject = ["triggers"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.getExpressionAsString = function (expressionContainer) {
        var _this = this;
        var retStr = "";
        if (expressionContainer === undefined) {
            return retStr;
        }
        var currOperator = this.isNegation(expressionContainer) ? "AND" : expressionContainer.operation.id;
        retStr += this.isNegation(expressionContainer) ? " NOT " : "";
        retStr += "(";
        expressionContainer.nodes.forEach(function (element, index) {
            if (_this.isDropzone(element)) {
                retStr += " [] ";
            }
            else {
                retStr += (index > 0) ? " " + currOperator + " " : "";
                retStr += _this.isItem(element) ? element.selectedSegment.code : _this.getExpressionAsString(element);
            }
        });
        retStr += ")";
        return retStr;
    };
    PersonalizationsmarteditTriggerService.prototype.getExpressionAsString.$inject = ["expressionContainer"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isElementOfType = function (element, myType) {
        return angular.isDefined(element) ? (element.type === myType) : false;
    };
    PersonalizationsmarteditTriggerService.prototype.isElementOfType.$inject = ["element", "myType"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isNegation = function (element) {
        return this.isContainer(element) && element.operation.id === 'NOT';
    };
    PersonalizationsmarteditTriggerService.prototype.isNegation.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isDefaultData = function (form) {
        return form.isDefault;
    };
    PersonalizationsmarteditTriggerService.prototype.isDefaultData.$inject = ["form"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isExpressionData = function (element) {
        var _this = this;
        return element.operation.id === 'NOT' || element.nodes.some(function (item) {
            return !_this.isItem(item);
        });
    };
    PersonalizationsmarteditTriggerService.prototype.isExpressionData.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isSupportedTrigger = function (trigger) {
        return this.supportedTypes.indexOf(trigger.type) >= 0;
    };
    PersonalizationsmarteditTriggerService.prototype.isSupportedTrigger.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isDefaultTrigger = function (trigger) {
        return this.isElementOfType(trigger, this.DEFAULT_TRIGGER);
    };
    PersonalizationsmarteditTriggerService.prototype.isDefaultTrigger.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isSegmentTrigger = function (trigger) {
        return this.isElementOfType(trigger, this.SEGMENT_TRIGGER);
    };
    PersonalizationsmarteditTriggerService.prototype.isSegmentTrigger.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isExpressionTrigger = function (trigger) {
        return this.isElementOfType(trigger, this.EXPRESSION_TRIGGER);
    };
    PersonalizationsmarteditTriggerService.prototype.isExpressionTrigger.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isGroupExpressionData = function (expression) {
        return this.isElementOfType(expression, this.GROUP_EXPRESSION);
    };
    PersonalizationsmarteditTriggerService.prototype.isGroupExpressionData.$inject = ["expression"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isSegmentExpressionData = function (expression) {
        return this.isElementOfType(expression, this.SEGMENT_EXPRESSION);
    };
    PersonalizationsmarteditTriggerService.prototype.isSegmentExpressionData.$inject = ["expression"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.isNegationExpressionData = function (expression) {
        return this.isElementOfType(expression, this.NEGATION_EXPRESSION);
    };
    PersonalizationsmarteditTriggerService.prototype.isNegationExpressionData.$inject = ["expression"];
    // ------------------------ FORM DATA -> TRIGGER ---------------------------
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildSegmentsForTrigger = function (element) {
        var _this = this;
        return element.nodes.filter(function (node) {
            return _this.isItem(node);
        }).map(function (item) {
            return item.selectedSegment;
        });
    };
    PersonalizationsmarteditTriggerService.prototype.buildSegmentsForTrigger.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildExpressionForTrigger = function (element) {
        var _this = this;
        if (this.isNegation(element)) {
            var negationElements_1 = [];
            element.nodes.forEach(function (elem) {
                negationElements_1.push(_this.buildExpressionForTrigger(elem));
            });
            return {
                type: this.NEGATION_EXPRESSION,
                element: {
                    type: this.GROUP_EXPRESSION,
                    operator: 'AND',
                    elements: negationElements_1
                }
            };
        }
        else if (this.isContainer(element)) {
            var groupElements_1 = [];
            element.nodes.forEach(function (elem) {
                groupElements_1.push(_this.buildExpressionForTrigger(elem));
            });
            return {
                type: this.GROUP_EXPRESSION,
                operator: element.operation.id,
                elements: groupElements_1
            };
        }
        else {
            return {
                type: this.SEGMENT_EXPRESSION,
                code: element.selectedSegment.code
            };
        }
    };
    PersonalizationsmarteditTriggerService.prototype.buildExpressionForTrigger.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildDefaultTrigger = function () {
        return {
            type: this.DEFAULT_TRIGGER
        };
    };
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildExpressionTrigger = function (element) {
        return {
            type: this.EXPRESSION_TRIGGER,
            expression: this.buildExpressionForTrigger(element)
        };
    };
    PersonalizationsmarteditTriggerService.prototype.buildExpressionTrigger.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildSegmentTrigger = function (element) {
        return {
            type: this.SEGMENT_TRIGGER,
            groupBy: element.operation.id,
            segments: this.buildSegmentsForTrigger(element)
        };
    };
    PersonalizationsmarteditTriggerService.prototype.buildSegmentTrigger.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.mergeTriggers = function (triggers, trigger) {
        var _this = this;
        if (!angular.isDefined(triggers)) {
            return [trigger];
        }
        var index = triggers.findIndex(function (t) {
            return t.type === trigger.type;
        });
        if (index >= 0) {
            trigger.code = triggers[index].code;
        }
        // remove other instanced of supported types (there can be only one) but maintain unsupported types
        var result = triggers.filter(function (t) {
            return !_this.isSupportedTrigger(t);
        });
        if (!angular.equals(trigger, {})) {
            result.push(trigger);
        }
        return result;
    };
    PersonalizationsmarteditTriggerService.prototype.mergeTriggers.$inject = ["triggers", "trigger"];
    // ------------------------ TRIGGER -> FORM DATA ---------------------------
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildContainer = function (actionId) {
        var action = this.actions.filter(function (a) {
            return a.id === actionId;
        })[0];
        return {
            type: this.CONTAINER_TYPE,
            operation: action,
            nodes: []
        };
    };
    PersonalizationsmarteditTriggerService.prototype.buildContainer.$inject = ["actionId"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildItem = function (value) {
        return {
            type: this.ITEM_TYPE,
            operation: '',
            selectedSegment: {
                code: value
            },
            nodes: []
        };
    };
    PersonalizationsmarteditTriggerService.prototype.buildItem.$inject = ["value"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.getBaseData = function () {
        var data = this.buildContainer('AND');
        return [data];
    };
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildExpressionFromTrigger = function (expression) {
        var _this = this;
        var data;
        if (this.isGroupExpressionData(expression)) {
            data = this.buildContainer(expression.operator);
            data.nodes = expression.elements.map(function (item) {
                return _this.buildExpressionFromTrigger(item);
            });
        }
        else if (this.isNegationExpressionData(expression)) {
            data = this.buildContainer('NOT');
            var element = this.buildExpressionFromTrigger(expression.element);
            if (this.isGroupExpressionData(expression.element) && expression.element.operator === 'AND') {
                data.nodes = element.nodes;
            }
            else {
                data.nodes.push(element);
            }
        }
        else if (this.isSegmentExpressionData(expression)) {
            data = this.buildItem(expression.code);
        }
        return data;
    };
    PersonalizationsmarteditTriggerService.prototype.buildExpressionFromTrigger.$inject = ["expression"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildSegmentTriggerData = function (trigger) {
        var _this = this;
        var data = this.buildContainer(trigger.groupBy);
        trigger.segments.forEach(function (segment) {
            data.nodes.push(_this.buildItem(segment.code));
        });
        return [data];
    };
    PersonalizationsmarteditTriggerService.prototype.buildSegmentTriggerData.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService.prototype.buildExpressionTriggerData = function (trigger) {
        var data = this.buildExpressionFromTrigger(trigger.expression);
        return [data];
    };
    PersonalizationsmarteditTriggerService.prototype.buildExpressionTriggerData.$inject = ["trigger"];
    /* @ngInject */ PersonalizationsmarteditTriggerService = __decorate([
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditTriggerService);
    return /* @ngInject */ PersonalizationsmarteditTriggerService;
}());

var /* @ngInject */ CustomizationDataFactory = /** @class */ (function () {
    CustomizationDataFactory.$inject = ["personalizationsmarteditRestService", "personalizationsmarteditUtils"];
    function /* @ngInject */ CustomizationDataFactory(personalizationsmarteditRestService, personalizationsmarteditUtils) {
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.items = [];
        this.defaultFilter = {};
        this.defaultDataArrayName = "customizations";
    }
    /* @ngInject */ CustomizationDataFactory.prototype.getCustomizations = function (filter) {
        var _this = this;
        this.personalizationsmarteditRestService.getCustomizations(filter).then(function (response) {
            _this.personalizationsmarteditUtils.uniqueArray(_this.items, response[_this.defaultDataArrayName] || []);
            _this.defaultSuccessCallbackFunction(response);
        }, function (response) {
            _this.defaultErrorCallbackFunction(response);
        });
    };
    CustomizationDataFactory.prototype.getCustomizations.$inject = ["filter"];
    /* @ngInject */ CustomizationDataFactory.prototype.updateData = function (params, successCallbackFunction, errorCallbackFunction) {
        params = params || {};
        this.defaultFilter = params.filter || this.defaultFilter;
        this.defaultDataArrayName = params.dataArrayName || this.defaultDataArrayName;
        if (successCallbackFunction && typeof (successCallbackFunction) === "function") {
            this.defaultSuccessCallbackFunction = successCallbackFunction;
        }
        if (errorCallbackFunction && typeof (errorCallbackFunction) === "function") {
            this.defaultErrorCallbackFunction = errorCallbackFunction;
        }
        this.getCustomizations(this.defaultFilter);
    };
    CustomizationDataFactory.prototype.updateData.$inject = ["params", "successCallbackFunction", "errorCallbackFunction"];
    /* @ngInject */ CustomizationDataFactory.prototype.refreshData = function () {
        if (angular.equals({}, this.defaultFilter)) {
            return;
        }
        var tempFilter = {};
        angular.copy(this.defaultFilter, tempFilter);
        tempFilter.currentSize = this.items.length;
        tempFilter.currentPage = 0;
        this.resetData();
        this.getCustomizations(tempFilter);
    };
    /* @ngInject */ CustomizationDataFactory.prototype.resetData = function () {
        this.items.length = 0;
    };
    /* @ngInject */ CustomizationDataFactory = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditRestService, Object])
    ], /* @ngInject */ CustomizationDataFactory);
    return /* @ngInject */ CustomizationDataFactory;
}());

var /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy = /** @class */ (function () {
    PersonalizationsmarteditContextServiceReverseProxy.$inject = ["personalizationsmarteditContextService", "workflowService", "pageInfoService"];
    function /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy(personalizationsmarteditContextService, workflowService, pageInfoService) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.workflowService = workflowService;
        this.pageInfoService = pageInfoService;
    }
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy_1 = /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy;
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy.prototype.applySynchronization = function () {
        this.personalizationsmarteditContextService.applySynchronization();
    };
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy.prototype.isCurrentPageActiveWorkflowRunning = function () {
        var _this = this;
        return this.pageInfoService.getPageUUID().then(function (pageUuid) {
            return _this.workflowService.getActiveWorkflowForPageUuid(pageUuid).then(function (workflow) {
                if (workflow == null) {
                    return false;
                }
                return workflow.status === /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy_1.WORKFLOW_RUNNING_STATUS;
            });
        });
    };
    var /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy_1;
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy.WORKFLOW_RUNNING_STATUS = "RUNNING";
    /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy = /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy_1 = __decorate([
        smarteditcommons.GatewayProxied('applySynchronization', 'isCurrentPageActiveWorkflowRunning'),
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy);
    return /* @ngInject */ PersonalizationsmarteditContextServiceReverseProxy;
}());

var /* @ngInject */ PersonalizationsmarteditPreviewService = /** @class */ (function () {
    PersonalizationsmarteditPreviewService.$inject = ["experienceService"];
    function /* @ngInject */ PersonalizationsmarteditPreviewService(experienceService) {
        this.experienceService = experienceService;
    }
    /* @ngInject */ PersonalizationsmarteditPreviewService.prototype.removePersonalizationDataFromPreview = function () {
        return this.updatePreviewTicketWithVariations([]);
    };
    /* @ngInject */ PersonalizationsmarteditPreviewService.prototype.updatePreviewTicketWithVariations = function (variations) {
        var _this = this;
        return this.experienceService.getCurrentExperience().then(function (experience) {
            if (!experience) {
                return undefined;
            }
            if (JSON.stringify(experience.variations) === JSON.stringify(variations)) {
                return undefined;
            }
            experience.variations = variations;
            return _this.experienceService.setCurrentExperience(experience).then(function () {
                return _this.experienceService.updateExperience();
            });
        });
    };
    PersonalizationsmarteditPreviewService.prototype.updatePreviewTicketWithVariations.$inject = ["variations"];
    /* @ngInject */ PersonalizationsmarteditPreviewService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smarteditcommons.IExperienceService])
    ], /* @ngInject */ PersonalizationsmarteditPreviewService);
    return /* @ngInject */ PersonalizationsmarteditPreviewService;
}());

var /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService = /** @class */ (function () {
    PersonalizationsmarteditRulesAndPermissionsRegistrationService.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditRestService", "permissionService", "catalogVersionPermissionService", "pageService", "$q"];
    function /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService(personalizationsmarteditContextService, personalizationsmarteditRestService, permissionService, catalogVersionPermissionService, pageService, $q) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.permissionService = permissionService;
        this.catalogVersionPermissionService = catalogVersionPermissionService;
        this.pageService = pageService;
        this.$q = $q;
    }
    /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService.prototype.registerRules = function () {
        var _this = this;
        this.permissionService.registerRule({
            names: ['se.access.personalization'],
            verify: function () {
                return _this.catalogVersionPermissionService.hasReadPermissionOnCurrent().then(function () {
                    return _this.personalizationsmarteditContextService.refreshExperienceData().then(function () {
                        return _this.personalizationsmarteditRestService.getCustomizations(_this.getCustomizationFilter()).then(function () {
                            return _this.$q.resolve(true);
                        }, function (errorResp) {
                            if (errorResp.status === 403) {
                                // Forbidden status on GET /customizations - user doesn't have permission to personalization perspective
                                return _this.$q.resolve(false);
                            }
                            else {
                                // other errors will be handled with personalization perspective turned on
                                return _this.$q.resolve(true);
                            }
                        });
                    });
                });
            }
        });
        this.permissionService.registerRule({
            names: ['se.access.personalization.page'],
            verify: function () {
                return _this.pageService.getCurrentPageInfo().then(function (info) {
                    return _this.$q.resolve(info.typeCode !== 'EmailPage');
                });
            }
        });
        // Permissions
        this.permissionService.registerPermission({
            aliases: ['se.personalization.open'],
            rules: ['se.access.personalization']
        });
        this.permissionService.registerPermission({
            aliases: ['se.personalization.page'],
            rules: ['se.access.personalization.page']
        });
    };
    /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService.prototype.getCustomizationFilter = function () {
        return {
            currentPage: 0,
            currentSize: 1
        };
    };
    /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            PersonalizationsmarteditRestService,
            smarteditcommons.IPermissionService, Object, Object, Function])
    ], /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService);
    return /* @ngInject */ PersonalizationsmarteditRulesAndPermissionsRegistrationService;
}());

var /* @ngInject */ PersonalizationsmarteditServicesModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditServicesModule() {
    }
    /* @ngInject */ PersonalizationsmarteditServicesModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'loadConfigModule',
                'smarteditServicesModule',
                'yjqueryModule',
                'permissionServiceModule',
                'catalogVersionPermissionModule',
                personalizationcommons.PersonalizationsmarteditCommonsModule,
            ],
            providers: [
                PersonalizationsmarteditRestService,
                PersonalizationsmarteditContextService,
                PersonalizationsmarteditContextServiceProxy,
                PersonalizationsmarteditContextServiceReverseProxy,
                PersonalizationsmarteditPreviewService,
                PersonalizationsmarteditRulesAndPermissionsRegistrationService
            ],
            initialize: ["personalizationsmarteditRulesAndPermissionsRegistrationService", function (personalizationsmarteditRulesAndPermissionsRegistrationService) {
                'ngInject';
                personalizationsmarteditRulesAndPermissionsRegistrationService.registerRules();
            }]
        })
    ], /* @ngInject */ PersonalizationsmarteditServicesModule);
    return /* @ngInject */ PersonalizationsmarteditServicesModule;
}());

var /* @ngInject */ PersonalizationsmarteditDataFactory = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditDataFactory() {
    }
    /* @ngInject */ PersonalizationsmarteditDataFactory = __decorate([
        smarteditcommons.SeModule({
            imports: [
                PersonalizationsmarteditServicesModule
            ],
            providers: [
                CustomizationDataFactory
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditDataFactory);
    return /* @ngInject */ PersonalizationsmarteditDataFactory;
}());

var CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS_PROVIDER = {
    provide: "CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS",
    useValue: {
        BASIC_INFO_TAB_NAME: 'basicinfotab',
        BASIC_INFO_TAB_FORM_NAME: 'form.basicinfotab',
        TARGET_GROUP_TAB_NAME: 'targetgrptab',
        TARGET_GROUP_TAB_FORM_NAME: 'form.targetgrptab'
    }
};
var CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS_PROVIDER = {
    provide: "CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS",
    useValue: {
        CONFIRM_OK: 'confirmOk',
        CONFIRM_CANCEL: 'confirmCancel',
        CONFIRM_NEXT: 'confirmNext'
    }
};
var CUSTOMIZATION_VARIATION_MANAGEMENT_SEGMENTTRIGGER_GROUPBY_PROVIDER = {
    provide: "CUSTOMIZATION_VARIATION_MANAGEMENT_SEGMENTTRIGGER_GROUPBY",
    useValue: {
        CRITERIA_AND: 'AND',
        CRITERIA_OR: 'OR'
    }
};
var DATE_CONSTANTS_PROVIDER = {
    provide: "DATE_CONSTANTS",
    useValue: {
        ANGULAR_FORMAT: 'short',
        MOMENT_FORMAT: 'M/D/YY h:mm A',
        MOMENT_ISO: 'YYYY-MM-DDTHH:mm:00ZZ',
        ISO: 'yyyy-MM-ddTHH:mm:00Z'
    }
};
var /* @ngInject */ PersonalizationsmarteditManager = /** @class */ (function () {
    PersonalizationsmarteditManager.$inject = ["modalService", "MODAL_BUTTON_STYLES", "CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS"];
    function /* @ngInject */ PersonalizationsmarteditManager(modalService, MODAL_BUTTON_STYLES, CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS) {
        var _this = this;
        this.modalService = modalService;
        this.MODAL_BUTTON_STYLES = MODAL_BUTTON_STYLES;
        this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS = CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS;
        this.openCreateCustomizationModal = function () {
            _this.modalService.open({
                title: 'personalization.modal.customizationvariationmanagement.title',
                templateInline: '<manage-customization-view data-modal-manager="modalController.modalManager"></manage-customization-view>',
                controller: ["modalManager", function ctrl(modalManager) {
                    'ngInject';
                    this.modalManager = modalManager;
                }],
                buttons: [{
                        id: _this.CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS.CONFIRM_CANCEL,
                        label: 'personalization.modal.customizationvariationmanagement.button.cancel',
                        style: _this.MODAL_BUTTON_STYLES.SECONDARY
                    }],
                size: 'lg sliderPanelParentModal'
            });
        };
        this.openEditCustomizationModal = function (customizationCode, variationCode) {
            _this.modalService.open({
                title: 'personalization.modal.customizationvariationmanagement.title',
                templateInline: '<manage-customization-view data-modal-manager="modalController.modalManager" data-customization-code="modalController.customizationCode" data-variation-code="modalController.variationCode"/>',
                controller: ["modalManager", function ctrl(modalManager) {
                    'ngInject';
                    this.modalManager = modalManager;
                    this.customizationCode = customizationCode;
                    this.variationCode = variationCode;
                }],
                buttons: [{
                        id: 'confirmCancel',
                        label: 'personalization.modal.customizationvariationmanagement.button.cancel',
                        style: _this.MODAL_BUTTON_STYLES.SECONDARY
                    }],
                size: 'lg sliderPanelParentModal'
            });
        };
    }
    /* @ngInject */ PersonalizationsmarteditManager = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smarteditcommons.IModalService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditManager);
    return /* @ngInject */ PersonalizationsmarteditManager;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditManageCustomizationViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditManageCustomizationViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditManageCustomizationViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'modalServiceModule',
                'coretemplates',
                'ui.select',
                'confirmationModalServiceModule',
                'functionsModule',
                'sliderPanelModule',
                'seConstantsModule',
                'yjqueryModule',
                PersonalizationsmarteditDataFactory,
                personalizationcommons.PersonalizationsmarteditCommonsModule
            ],
            declarations: [
                ManageCustomizationViewComponent,
                BasicInfoTabComponent,
                TargetGroupTabComponent
            ],
            providers: [
                PersonalizationsmarteditTriggerService,
                PersonalizationsmarteditManager,
                CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS_PROVIDER,
                CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS_PROVIDER,
                CUSTOMIZATION_VARIATION_MANAGEMENT_SEGMENTTRIGGER_GROUPBY_PROVIDER,
                DATE_CONSTANTS_PROVIDER
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditManageCustomizationViewModule);
    return /* @ngInject */ PersonalizationsmarteditManageCustomizationViewModule;
}());

var /* @ngInject */ MultipleTriggersComponent = /** @class */ (function () {
    MultipleTriggersComponent.$inject = ["triggerTabService"];
    function /* @ngInject */ MultipleTriggersComponent(triggerTabService) {
        this.triggerTabService = triggerTabService;
    }
    /* @ngInject */ MultipleTriggersComponent.prototype.$onInit = function () {
        this.tabsList = this.triggerTabService.getTriggersTabs();
    };
    /* @ngInject */ MultipleTriggersComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'multipleTriggersComponentTemplate.html'
        }),
        __metadata("design:paramtypes", [TriggerTabService])
    ], /* @ngInject */ MultipleTriggersComponent);
    return /* @ngInject */ MultipleTriggersComponent;
}());

var /* @ngInject */ PersonalizationsmarteditManagementModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditManagementModule() {
    }
    /* @ngInject */ PersonalizationsmarteditManagementModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'smarteditServicesModule'
            ],
            providers: [
                TriggerTabService
            ],
            declarations: [
                MultipleTriggersComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditManagementModule);
    return /* @ngInject */ PersonalizationsmarteditManagementModule;
}());

var /* @ngInject */ VersionCheckerService = /** @class */ (function () {
    VersionCheckerService.$inject = ["personalizationsmarteditRestService", "pageVersionSelectionService"];
    function /* @ngInject */ VersionCheckerService(personalizationsmarteditRestService, pageVersionSelectionService) {
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.pageVersionSelectionService = pageVersionSelectionService;
    }
    /* @ngInject */ VersionCheckerService.prototype.setVersion = function (version) {
        this.version = version;
    };
    VersionCheckerService.prototype.setVersion.$inject = ["version"];
    /* @ngInject */ VersionCheckerService.prototype.provideTranlationKey = function (key) {
        var TRANSLATE_NS = 'personalization.se.cms.actionitem.page.version.rollback.confirmation';
        this.version = this.version || this.pageVersionSelectionService.getSelectedPageVersion();
        if (!!this.version) {
            return this.personalizationsmarteditRestService.checkVersionConflict(this.version.uid).then(function (response) {
                return response.result ? key : TRANSLATE_NS;
            }, function () {
                return key;
            });
        }
        else {
            return Promise.resolve(key);
        }
    };
    VersionCheckerService.prototype.provideTranlationKey.$inject = ["key"];
    /* @ngInject */ VersionCheckerService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditRestService, Object])
    ], /* @ngInject */ VersionCheckerService);
    return /* @ngInject */ VersionCheckerService;
}());

var /* @ngInject */ VersioningModule = /** @class */ (function () {
    function /* @ngInject */ VersioningModule() {
    }
    /* @ngInject */ VersioningModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'smarteditServicesModule'
            ],
            providers: [
                VersionCheckerService
            ]
        })
    ], /* @ngInject */ VersioningModule);
    return /* @ngInject */ VersioningModule;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent = /** @class */ (function () {
    PersonalizationsmarteditCustomizeViewComponent.$inject = ["$translate", "customizationDataFactory", "personalizationsmarteditContextService", "personalizationsmarteditMessageHandler", "personalizationsmarteditUtils", "PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER"];
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent($translate, customizationDataFactory, personalizationsmarteditContextService, personalizationsmarteditMessageHandler, personalizationsmarteditUtils, PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER) {
        this.$translate = $translate;
        this.customizationDataFactory = customizationDataFactory;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER = PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER;
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.$onInit = function () {
        this.personalizationsmarteditContextService.refreshExperienceData();
        this.moreCustomizationsRequestProcessing = false;
        this.customizationsList = this.customizationDataFactory.items;
        this.customizationDataFactory.resetData();
        this.pagination = new personalizationcommons.PaginationHelper({});
        this.pagination.reset();
        this.filters = this.personalizationsmarteditContextService.getCustomizeFiltersState();
        this.catalogFilter = this.filters.catalogFilter;
        this.pageFilter = this.filters.pageFilter;
        this.statusFilter = this.filters.statusFilter;
        this.nameFilter = this.filters.nameFilter;
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.$onDestroy = function () {
        var filters = this.personalizationsmarteditContextService.getCustomizeFiltersState();
        filters.catalogFilter = this.catalogFilter;
        filters.pageFilter = this.pageFilter;
        filters.statusFilter = this.statusFilter;
        filters.nameFilter = this.nameFilter;
        this.personalizationsmarteditContextService.setCustomizeFiltersState(filters);
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.$onChanges = function (changes) {
        if (changes.isMenuOpen && !changes.isMenuOpen.isFirstChange() && changes.isMenuOpen.currentValue) {
            this.refreshList();
        }
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.$onChanges.$inject = ["changes"];
    // Private methods
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.errorCallback = function () {
        this.personalizationsmarteditMessageHandler.sendError(this.$translate.instant('personalization.error.gettingcustomizations'));
        this.moreCustomizationsRequestProcessing = false;
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.successCallback = function (response) {
        this.pagination = new personalizationcommons.PaginationHelper(response.pagination);
        this.moreCustomizationsRequestProcessing = false;
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.successCallback.$inject = ["response"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.getStatus = function () {
        var _this = this;
        if (this.statusFilter === undefined) {
            return this.personalizationsmarteditUtils.getStatusesMapping()[0]; // all elements
        }
        return this.personalizationsmarteditUtils.getStatusesMapping().filter(function (elem) {
            return elem.code === _this.statusFilter;
        })[0];
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.getCustomizations = function (categoryFilter) {
        var params = {
            filter: categoryFilter,
            dataArrayName: 'customizations'
        };
        this.customizationDataFactory.updateData(params, this.successCallback.bind(this), this.errorCallback.bind(this));
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.getCustomizations.$inject = ["categoryFilter"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.getCustomizationsFilterObject = function () {
        var ret = {
            currentSize: this.pagination.getCount(),
            currentPage: this.pagination.getPage() + 1,
            name: this.nameFilter,
            statuses: this.getStatus().modelStatuses,
            catalogs: this.catalogFilter
        };
        if (this.pageFilter === this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER.ONLY_THIS_PAGE) {
            ret.pageId = this.personalizationsmarteditContextService.getSeData().pageId;
            ret.pageCatalogId = (this.personalizationsmarteditContextService.getSeData().seExperienceData.pageContext || {}).catalogId;
        }
        return ret;
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.refreshList = function () {
        if (this.moreCustomizationsRequestProcessing === false) {
            this.moreCustomizationsRequestProcessing = true;
            this.pagination.reset();
            this.customizationDataFactory.resetData();
            this.getCustomizations(this.getCustomizationsFilterObject());
        }
    };
    // Properties
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.catalogFilterChange = function (itemId) {
        this.catalogFilter = itemId;
        this.refreshList();
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.catalogFilterChange.$inject = ["itemId"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.pageFilterChange = function (itemId) {
        this.pageFilter = itemId;
        this.refreshList();
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.pageFilterChange.$inject = ["itemId"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.statusFilterChange = function (itemId) {
        this.statusFilter = itemId;
        this.refreshList();
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.statusFilterChange.$inject = ["itemId"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.nameInputKeypress = function (keyEvent) {
        if (keyEvent.which === 13 || this.nameFilter.length > 2 || this.nameFilter.length === 0) {
            this.refreshList();
        }
    };
    PersonalizationsmarteditCustomizeViewComponent.prototype.nameInputKeypress.$inject = ["keyEvent"];
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.addMoreCustomizationItems = function () {
        if (this.pagination.getPage() < this.pagination.getTotalPages() - 1 && !this.moreCustomizationsRequestProcessing) {
            this.moreCustomizationsRequestProcessing = true;
            this.getCustomizations(this.getCustomizationsFilterObject());
        }
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent.prototype.getPage = function () {
        this.context.addMoreCustomizationItems();
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditCustomizeViewTemplate.html',
            inputs: [
                'isMenuOpen'
            ]
        }),
        __metadata("design:paramtypes", [Function, CustomizationDataFactory,
            PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            personalizationcommons.PersonalizationsmarteditUtils, Object])
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewComponent;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy() {
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy.prototype.getSourceContainersInfo = function () {
        'proxyFunction';
        return null;
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('getSourceContainersInfo'),
        smarteditcommons.SeInjectable()
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewServiceProxy;
}());

var PERSONALIZATION_CATALOG_FILTER_PROVIDER = {
    provide: "PERSONALIZATION_CATALOG_FILTER",
    useValue: {
        ALL: 'all',
        CURRENT: 'current',
        PARENTS: 'parents'
    }
};
var /* @ngInject */ CatalogFilterDropdownComponent = /** @class */ (function () {
    CatalogFilterDropdownComponent.$inject = ["$q", "PERSONALIZATION_CATALOG_FILTER"];
    function /* @ngInject */ CatalogFilterDropdownComponent($q, PERSONALIZATION_CATALOG_FILTER) {
        var _this = this;
        this.$q = $q;
        this.PERSONALIZATION_CATALOG_FILTER = PERSONALIZATION_CATALOG_FILTER;
        this.fetchStrategy = {
            fetchAll: function () {
                return _this.$q.when(_this.items);
            }
        };
        this.onChange = this.onChange.bind(this);
    }
    /* @ngInject */ CatalogFilterDropdownComponent.prototype.$onInit = function () {
        this.items = [{
                id: this.PERSONALIZATION_CATALOG_FILTER.ALL,
                label: "personalization.filter.catalog.all"
            }, {
                id: this.PERSONALIZATION_CATALOG_FILTER.CURRENT,
                label: "personalization.filter.catalog.current"
            }, {
                id: this.PERSONALIZATION_CATALOG_FILTER.PARENTS,
                label: "personalization.filter.catalog.parents"
            }];
        this.selectedId = this.initialValue || this.items[1].id;
    };
    /* @ngInject */ CatalogFilterDropdownComponent.prototype.onChange = function (changes) {
        this.onSelectCallback({
            value: this.selectedId
        });
    };
    CatalogFilterDropdownComponent.prototype.onChange.$inject = ["changes"];
    /* @ngInject */ CatalogFilterDropdownComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'pageFilterDropdownTemplate.html',
            inputs: [
                'initialValue',
                'onSelectCallback: &'
            ]
        }),
        __metadata("design:paramtypes", [Function, Object])
    ], /* @ngInject */ CatalogFilterDropdownComponent);
    return /* @ngInject */ CatalogFilterDropdownComponent;
}());

var PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER_PROVIDER = {
    provide: "PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER",
    useValue: {
        ALL: 'all',
        ONLY_THIS_PAGE: 'onlythispage'
    }
};
var /* @ngInject */ PageFilterDropdownComponent = /** @class */ (function () {
    PageFilterDropdownComponent.$inject = ["$q", "PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER"];
    function /* @ngInject */ PageFilterDropdownComponent($q, PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER) {
        var _this = this;
        this.$q = $q;
        this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER = PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER;
        this.fetchStrategy = {
            fetchAll: function () {
                return _this.$q.when(_this.items);
            }
        };
        this.onChange = this.onChange.bind(this);
    }
    /* @ngInject */ PageFilterDropdownComponent.prototype.$onInit = function () {
        this.items = [{
                id: this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER.ALL,
                label: "personalization.filter.page.all"
            }, {
                id: this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER.ONLY_THIS_PAGE,
                label: "personalization.filter.page.onlythispage"
            }];
        this.selectedId = this.initialValue || this.items[1].id;
    };
    /* @ngInject */ PageFilterDropdownComponent.prototype.onChange = function (changes) {
        this.onSelectCallback({
            value: this.selectedId
        });
    };
    PageFilterDropdownComponent.prototype.onChange.$inject = ["changes"];
    /* @ngInject */ PageFilterDropdownComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'pageFilterDropdownTemplate.html',
            inputs: [
                'initialValue',
                'onSelectCallback: &'
            ]
        }),
        __metadata("design:paramtypes", [Function, Object])
    ], /* @ngInject */ PageFilterDropdownComponent);
    return /* @ngInject */ PageFilterDropdownComponent;
}());

var /* @ngInject */ StatusFilterDropdownComponent = /** @class */ (function () {
    StatusFilterDropdownComponent.$inject = ["$q", "personalizationsmarteditUtils"];
    function /* @ngInject */ StatusFilterDropdownComponent($q, personalizationsmarteditUtils) {
        var _this = this;
        this.$q = $q;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.fetchStrategy = {
            fetchAll: function () {
                return _this.$q.when(_this.items);
            }
        };
        this.onChange = this.onChange.bind(this);
    }
    /* @ngInject */ StatusFilterDropdownComponent.prototype.$onInit = function () {
        this.items = this.personalizationsmarteditUtils.getStatusesMapping().map(function (elem) {
            return {
                id: elem.code,
                label: elem.text,
                modelStatuses: elem.modelStatuses
            };
        });
        this.selectedId = this.initialValue || this.items[0].id;
    };
    /* @ngInject */ StatusFilterDropdownComponent.prototype.onChange = function (changes) {
        this.onSelectCallback({
            value: this.selectedId
        });
    };
    StatusFilterDropdownComponent.prototype.onChange.$inject = ["changes"];
    /* @ngInject */ StatusFilterDropdownComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'pageFilterDropdownTemplate.html',
            inputs: [
                'initialValue',
                'onSelectCallback: &'
            ]
        }),
        __metadata("design:paramtypes", [Function, personalizationcommons.PersonalizationsmarteditUtils])
    ], /* @ngInject */ StatusFilterDropdownComponent);
    return /* @ngInject */ StatusFilterDropdownComponent;
}());

var /* @ngInject */ PersonalizationsmarteditCommonComponentsModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCommonComponentsModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCommonComponentsModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'ySelectModule',
                'l10nModule',
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule
            ],
            declarations: [
                CatalogFilterDropdownComponent,
                PageFilterDropdownComponent,
                StatusFilterDropdownComponent
            ],
            providers: [
                PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER_PROVIDER,
                PERSONALIZATION_CATALOG_FILTER_PROVIDER
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCommonComponentsModule);
    return /* @ngInject */ PersonalizationsmarteditCommonComponentsModule;
}());

var /* @ngInject */ CustomizationsListComponent = /** @class */ (function () {
    CustomizationsListComponent.$inject = ["$q", "$translate", "personalizationsmarteditContextService", "personalizationsmarteditRestService", "personalizationsmarteditCommerceCustomizationService", "personalizationsmarteditMessageHandler", "personalizationsmarteditUtils", "personalizationsmarteditDateUtils", "personalizationsmarteditContextUtils", "personalizationsmarteditPreviewService", "personalizationsmarteditManager", "personalizationsmarteditCustomizeViewServiceProxy", "systemEventService", "crossFrameEventService", "SHOW_TOOLBAR_ITEM_CONTEXT", "CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY", "lodash"];
    function /* @ngInject */ CustomizationsListComponent($q, $translate, personalizationsmarteditContextService, personalizationsmarteditRestService, personalizationsmarteditCommerceCustomizationService, personalizationsmarteditMessageHandler, personalizationsmarteditUtils, personalizationsmarteditDateUtils, personalizationsmarteditContextUtils, personalizationsmarteditPreviewService, personalizationsmarteditManager, personalizationsmarteditCustomizeViewServiceProxy, systemEventService, crossFrameEventService, SHOW_TOOLBAR_ITEM_CONTEXT, CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY, lodash) {
        this.$q = $q;
        this.$translate = $translate;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditCommerceCustomizationService = personalizationsmarteditCommerceCustomizationService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.personalizationsmarteditPreviewService = personalizationsmarteditPreviewService;
        this.personalizationsmarteditManager = personalizationsmarteditManager;
        this.personalizationsmarteditCustomizeViewServiceProxy = personalizationsmarteditCustomizeViewServiceProxy;
        this.systemEventService = systemEventService;
        this.crossFrameEventService = crossFrameEventService;
        this.SHOW_TOOLBAR_ITEM_CONTEXT = SHOW_TOOLBAR_ITEM_CONTEXT;
        this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY = CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY;
        this.lodash = lodash;
    }
    /* @ngInject */ CustomizationsListComponent.prototype.$onInit = function () {
        var _this = this;
        this.sourceContainersComponentsInfo = {};
        this.systemEventService.subscribe('CUSTOMIZATIONS_MODIFIED', function () {
            _this.refreshCustomizeContext();
            return _this.$q.when();
        });
    };
    /* @ngInject */ CustomizationsListComponent.prototype.initCustomization = function (customization) {
        customization.collapsed = true;
        if ((this.personalizationsmarteditContextService.getCustomize().selectedCustomization || {}).code === customization.code) {
            customization.collapsed = false;
            this.updateCustomizationData(customization);
        }
        this.personalizationsmarteditUtils.getAndSetCatalogVersionNameL10N(customization);
    };
    CustomizationsListComponent.prototype.initCustomization.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.editCustomizationAction = function (customization) {
        this.personalizationsmarteditContextUtils.clearCombinedViewContextAndReloadPreview(this.personalizationsmarteditPreviewService, this.personalizationsmarteditContextService);
        this.personalizationsmarteditManager.openEditCustomizationModal(customization.code);
    };
    CustomizationsListComponent.prototype.editCustomizationAction.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.customizationRowClick = function (customization, select) {
        this.clearAllSubMenu();
        customization.collapsed = !customization.collapsed;
        if (!customization.collapsed) {
            this.updateCustomizationData(customization);
        }
        if (select) {
            this.customizationClick(customization);
        }
        this.customizationsList.filter(function (cust) {
            return customization.code !== cust.code;
        }).forEach(function (cust) {
            cust.collapsed = true;
        });
    };
    CustomizationsListComponent.prototype.customizationRowClick.$inject = ["customization", "select"];
    /* @ngInject */ CustomizationsListComponent.prototype.customizationClick = function (customization) {
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        var currentVariations = this.personalizationsmarteditContextService.getCustomize().selectedVariations;
        var visibleVariations = this.getVisibleVariations(customization);
        var customize = this.personalizationsmarteditContextService.getCustomize();
        customize.selectedCustomization = customization;
        customize.selectedVariations = visibleVariations;
        this.personalizationsmarteditContextService.setCustomize(customize);
        if (visibleVariations.length > 0) {
            var allVariations = this.personalizationsmarteditUtils.getVariationCodes(visibleVariations).join(",");
            this.getAndSetComponentsForVariation(customization.code, allVariations, customization.catalog, customization.catalogVersion);
        }
        if ((this.lodash.isObjectLike(currentVariations) && !this.lodash.isArray(currentVariations)) || combinedView.enabled) {
            this.updatePreviewTicket();
        }
        this.personalizationsmarteditContextUtils.clearCombinedViewContext(this.personalizationsmarteditContextService);
        this.crossFrameEventService.publish(this.SHOW_TOOLBAR_ITEM_CONTEXT, this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
    };
    CustomizationsListComponent.prototype.customizationClick.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getSelectedVariationClass = function (variation) {
        if (this.lodash.isEqual(variation.code, (this.personalizationsmarteditContextService.getCustomize().selectedVariations || {}).code)) {
            return "selectedVariation";
        }
        else {
            return "";
        }
    };
    CustomizationsListComponent.prototype.getSelectedVariationClass.$inject = ["variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.getSelectedCustomizationClass = function (customization) {
        if (this.lodash.isEqual(customization.code, (this.personalizationsmarteditContextService.getCustomize().selectedCustomization || {}).code) &&
            this.lodash.isArray(this.personalizationsmarteditContextService.getCustomize().selectedVariations)) {
            return "selectedCustomization";
        }
        else {
            return "";
        }
    };
    CustomizationsListComponent.prototype.getSelectedCustomizationClass.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.variationClick = function (customization, variation) {
        var customize = this.personalizationsmarteditContextService.getCustomize();
        customize.selectedCustomization = customization;
        customize.selectedVariations = variation;
        this.personalizationsmarteditContextService.setCustomize(customize);
        this.personalizationsmarteditContextUtils.clearCombinedViewContext(this.personalizationsmarteditContextService);
        this.getAndSetComponentsForVariation(customization.code, variation.code, customization.catalog, customization.catalogVersion);
        this.updatePreviewTicket(customization.code, [variation]);
        this.crossFrameEventService.publish(this.SHOW_TOOLBAR_ITEM_CONTEXT, this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
    };
    CustomizationsListComponent.prototype.variationClick.$inject = ["customization", "variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.hasCommerceActions = function (variation) {
        return this.personalizationsmarteditUtils.hasCommerceActions(variation);
    };
    CustomizationsListComponent.prototype.hasCommerceActions.$inject = ["variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.getCommerceCustomizationTooltip = function (variation) {
        return this.personalizationsmarteditUtils.getCommerceCustomizationTooltipHTML(variation);
    };
    CustomizationsListComponent.prototype.getCommerceCustomizationTooltip.$inject = ["variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.getActivityStateForCustomization = function (customization) {
        return this.personalizationsmarteditUtils.getActivityStateForCustomization(customization);
    };
    CustomizationsListComponent.prototype.getActivityStateForCustomization.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getActivityStateForVariation = function (customization, variation) {
        return this.personalizationsmarteditUtils.getActivityStateForVariation(customization, variation);
    };
    CustomizationsListComponent.prototype.getActivityStateForVariation.$inject = ["customization", "variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.clearAllSubMenu = function () {
        for (var _i = 0, _a = this.customizationsList; _i < _a.length; _i++) {
            var customization = _a[_i];
            customization.subMenu = false;
        }
    };
    /* @ngInject */ CustomizationsListComponent.prototype.getEnablementTextForCustomization = function (customization) {
        return this.personalizationsmarteditUtils.getEnablementTextForCustomization(customization, 'personalization.toolbar.pagecustomizations');
    };
    CustomizationsListComponent.prototype.getEnablementTextForCustomization.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getEnablementTextForVariation = function (variation) {
        return this.personalizationsmarteditUtils.getEnablementTextForVariation(variation, 'personalization.toolbar.pagecustomizations');
    };
    CustomizationsListComponent.prototype.getEnablementTextForVariation.$inject = ["variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.isEnabled = function (item) {
        return this.personalizationsmarteditUtils.isPersonalizationItemEnabled(item);
    };
    CustomizationsListComponent.prototype.isEnabled.$inject = ["item"];
    /* @ngInject */ CustomizationsListComponent.prototype.getDatesForCustomization = function (customization) {
        var activityStr = "";
        var startDateStr = "";
        var endDateStr = "";
        if (customization.enabledStartDate || customization.enabledEndDate) {
            startDateStr = this.personalizationsmarteditDateUtils.formatDateWithMessage(customization.enabledStartDate);
            endDateStr = this.personalizationsmarteditDateUtils.formatDateWithMessage(customization.enabledEndDate);
            if (!customization.enabledStartDate) {
                startDateStr = " ...";
            }
            if (!customization.enabledEndDate) {
                endDateStr = "... ";
            }
            activityStr += " (" + startDateStr + " - " + endDateStr + ") ";
        }
        return activityStr;
    };
    CustomizationsListComponent.prototype.getDatesForCustomization.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.customizationSubMenuAction = function (customization) {
        if (!customization.subMenu) {
            this.clearAllSubMenu();
        }
        customization.subMenu = !customization.subMenu;
    };
    CustomizationsListComponent.prototype.customizationSubMenuAction.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.isCustomizationFromCurrentCatalog = function (customization) {
        return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(customization, this.personalizationsmarteditContextService.getSeData());
    };
    CustomizationsListComponent.prototype.isCustomizationFromCurrentCatalog.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.statusNotDeleted = function (variation) {
        return this.personalizationsmarteditUtils.isItemVisible(variation);
    };
    CustomizationsListComponent.prototype.statusNotDeleted.$inject = ["variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.matchActionForVariation = function (action, variation) {
        return ((action.variationCode === variation.code) &&
            (action.actionCatalog === variation.catalog) &&
            (action.actionCatalogVersion === variation.catalogVersion));
    };
    CustomizationsListComponent.prototype.matchActionForVariation.$inject = ["action", "variation"];
    /* @ngInject */ CustomizationsListComponent.prototype.numberOfAffectedComponentsForActions = function (actionsForVariation) {
        var _this = this;
        var result = 0;
        actionsForVariation.forEach(function (action) {
            result += parseInt(_this.sourceContainersComponentsInfo[action.containerId], 10) || 0;
        });
        return result;
    };
    CustomizationsListComponent.prototype.numberOfAffectedComponentsForActions.$inject = ["actionsForVariation"];
    /* @ngInject */ CustomizationsListComponent.prototype.initSourceContainersComponentsInfo = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.personalizationsmarteditCustomizeViewServiceProxy.getSourceContainersInfo().then(function (response) {
            _this.sourceContainersComponentsInfo = response;
            deferred.resolve();
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingnumberofaffectedcomponentsforvariation'));
            deferred.reject();
        });
        return deferred.promise;
    };
    /* @ngInject */ CustomizationsListComponent.prototype.paginatedGetAndSetNumberOfAffectedComponentsForVariations = function (customization, currentPage) {
        var _this = this;
        this.personalizationsmarteditRestService.getCxCmsActionsOnPageForCustomization(customization, currentPage).then(function (response) {
            customization.variations.forEach(function (variation) {
                var actionsForVariation = response.actions.filter(function (action) {
                    return _this.matchActionForVariation(action, variation);
                });
                variation.numberOfAffectedComponents = (currentPage === 0) ? 0 : variation.numberOfAffectedComponents;
                variation.numberOfAffectedComponents += _this.numberOfAffectedComponentsForActions(actionsForVariation);
            });
            var nextPage = currentPage + 1;
            if (nextPage < response.pagination.totalPages) {
                _this.paginatedGetAndSetNumberOfAffectedComponentsForVariations(customization, nextPage);
            }
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingnumberofaffectedcomponentsforvariation'));
        });
    };
    CustomizationsListComponent.prototype.paginatedGetAndSetNumberOfAffectedComponentsForVariations.$inject = ["customization", "currentPage"];
    /* @ngInject */ CustomizationsListComponent.prototype.getAndSetNumberOfAffectedComponentsForVariations = function (customization) {
        var _this = this;
        var customize = this.personalizationsmarteditContextService.getCustomize();
        var isUpToDate = (customize.selectedComponents || []).every(function (componentId) {
            return _this.sourceContainersComponentsInfo[componentId] !== undefined;
        });
        if (!isUpToDate || customize.selectedComponents === null || this.lodash.isEqual(this.sourceContainersComponentsInfo, {})) {
            this.initSourceContainersComponentsInfo().finally(function () {
                _this.paginatedGetAndSetNumberOfAffectedComponentsForVariations(customization, 0);
            });
        }
        else if (isUpToDate) {
            this.paginatedGetAndSetNumberOfAffectedComponentsForVariations(customization, 0);
        }
    };
    CustomizationsListComponent.prototype.getAndSetNumberOfAffectedComponentsForVariations.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getNumberOfAffectedComponentsForCorrespondingVariation = function (variationsArray, variationCode) {
        var foundVariation = variationsArray.filter(function (elem) {
            return elem.code === variationCode;
        });
        return (foundVariation[0] || {}).numberOfAffectedComponents;
    };
    CustomizationsListComponent.prototype.getNumberOfAffectedComponentsForCorrespondingVariation.$inject = ["variationsArray", "variationCode"];
    /* @ngInject */ CustomizationsListComponent.prototype.updateCustomizationData = function (customization) {
        var _this = this;
        this.personalizationsmarteditRestService.getVariationsForCustomization(customization.code, customization).then(function (response) {
            response.variations.forEach(function (variation) {
                variation.numberOfAffectedComponents = _this.getNumberOfAffectedComponentsForCorrespondingVariation(customization.variations, variation.code);
            });
            customization.variations = response.variations || [];
            customization.variations.forEach(function (variation) {
                variation.numberOfCommerceActions = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCount(variation);
                variation.commerceCustomizations = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCountMap(variation);
            });
            _this.getAndSetNumberOfAffectedComponentsForVariations(customization);
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcustomization'));
        });
    };
    CustomizationsListComponent.prototype.updateCustomizationData.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getVisibleVariations = function (customization) {
        return this.personalizationsmarteditUtils.getVisibleItems(customization.variations);
    };
    CustomizationsListComponent.prototype.getVisibleVariations.$inject = ["customization"];
    /* @ngInject */ CustomizationsListComponent.prototype.getAndSetComponentsForVariation = function (customizationId, variationId, catalog, catalogVersion) {
        var _this = this;
        this.personalizationsmarteditRestService.getComponenentsIdsForVariation(customizationId, variationId, catalog, catalogVersion)
            .then(function (response) {
            var customize = _this.personalizationsmarteditContextService.getCustomize();
            customize.selectedComponents = response.components;
            _this.personalizationsmarteditContextService.setCustomize(customize);
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcomponentsforvariation'));
        });
    };
    CustomizationsListComponent.prototype.getAndSetComponentsForVariation.$inject = ["customizationId", "variationId", "catalog", "catalogVersion"];
    /* @ngInject */ CustomizationsListComponent.prototype.updatePreviewTicket = function (customizationId, variationArray) {
        var variationKeys = this.personalizationsmarteditUtils.getVariationKey(customizationId, variationArray);
        this.personalizationsmarteditPreviewService.updatePreviewTicketWithVariations(variationKeys);
    };
    CustomizationsListComponent.prototype.updatePreviewTicket.$inject = ["customizationId", "variationArray"];
    /* @ngInject */ CustomizationsListComponent.prototype.refreshCustomizeContext = function () {
        var _this = this;
        var customize = this.lodash.cloneDeep(this.personalizationsmarteditContextService.getCustomize());
        if (customize.selectedCustomization) {
            this.personalizationsmarteditRestService.getCustomization(customize.selectedCustomization)
                .then(function (response) {
                customize.selectedCustomization = response;
                if (customize.selectedVariations && !_this.lodash.isArray(customize.selectedVariations)) {
                    response.variations.filter(function (item) {
                        return customize.selectedVariations.code === item.code;
                    }).forEach(function (variation) {
                        customize.selectedVariations = variation;
                        if (!_this.personalizationsmarteditUtils.isItemVisible(variation)) {
                            customize.selectedCustomization = null;
                            customize.selectedVariations = null;
                            _this.personalizationsmarteditPreviewService.removePersonalizationDataFromPreview();
                        }
                    });
                }
                _this.personalizationsmarteditContextService.setCustomize(customize);
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcustomization'));
            });
        }
    };
    /* @ngInject */ CustomizationsListComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'customizationsListTemplate.html',
            inputs: [
                'customizationsList',
                'requestProcessing'
            ]
        }),
        __metadata("design:paramtypes", [Object, Function, PersonalizationsmarteditContextService,
            PersonalizationsmarteditRestService, Object, personalizationcommons.PersonalizationsmarteditMessageHandler,
            personalizationcommons.PersonalizationsmarteditUtils,
            personalizationcommons.PersonalizationsmarteditDateUtils,
            personalizationcommons.PersonalizationsmarteditContextUtils,
            PersonalizationsmarteditPreviewService, Object, PersonalizationsmarteditCustomizeViewServiceProxy, Object, smarteditcommons.CrossFrameEventService, Object, Object, Function])
    ], /* @ngInject */ CustomizationsListComponent);
    return /* @ngInject */ CustomizationsListComponent;
}());

var /* @ngInject */ PersonalizationsmarteditCustomizeViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCustomizeViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'seConstantsModule',
                'personalizationsmarteditManageCustomizationViewModule',
                'smarteditCommonsModule',
                PersonalizationsmarteditCommonComponentsModule,
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule
            ],
            providers: [
                PersonalizationsmarteditCustomizeViewServiceProxy,
                CustomizationDataFactory
            ],
            declarations: [
                PersonalizationsmarteditCustomizeViewComponent,
                CustomizationsListComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCustomizeViewModule);
    return /* @ngInject */ PersonalizationsmarteditCustomizeViewModule;
}());

/* @internal */
var ContextMenuDeleteActionControllerFactory = function (config) {
    /* @ngInject */
    var PersonalizationsmarteditContextMenuDeleteActionController = /** @class */ (function () {
        PersonalizationsmarteditContextMenuDeleteActionController.$inject = ["$q", "modalManager", "personalizationsmarteditRestService"];
        function PersonalizationsmarteditContextMenuDeleteActionController($q, modalManager, personalizationsmarteditRestService) {
            var _this = this;
            this.$q = $q;
            this.modalManager = modalManager;
            this.personalizationsmarteditRestService = personalizationsmarteditRestService;
            this.catalog = config.catalog;
            this.catalogVersion = config.catalogVersion;
            this.selectedCustomizationCode = config.selectedCustomizationCode;
            this.selectedVariationCode = config.selectedVariationCode;
            this.actionId = config.actionId;
            this.buttonHandlerFn = function (buttonId) {
                var deferred = _this.$q.defer();
                if (buttonId === 'confirmOk') {
                    var filter = {
                        catalog: _this.catalog,
                        catalogVersion: _this.catalogVersion
                    };
                    return _this.personalizationsmarteditRestService.deleteAction(_this.selectedCustomizationCode, _this.selectedVariationCode, _this.actionId, filter);
                }
                return deferred.reject();
            };
            this.modalManager.setButtonHandler(this.buttonHandlerFn);
        }
        return PersonalizationsmarteditContextMenuDeleteActionController;
    }());
    return PersonalizationsmarteditContextMenuDeleteActionController;
};

window.__smartedit__.addDecoratorPayload("Component", "ComponentDropdownItemPrinterComponent", {
    selector: 'component-item-printer',
    template: "\n        <div class=\"pe-customize-component__se-select-choices-layout\">\n            <div class=\"pe-customize-component__se-select-choices-col1\">\n                <div class=\"perso-wrap-ellipsis\" title=\"{{ data.item.name }}\">{{ data.item.name }}</div>\n            </div>\n            <div class=\"pe-customize-component__se-select-choices-col2\">\n                <div class=\"perso-wrap-ellipsis\" title=\"{{ data.item.typeCode }}\">{{ data.item.typeCode }}</div>\n            </div>\n        </div>\n    "
});
var ComponentDropdownItemPrinterComponent = /** @class */ (function () {
    function ComponentDropdownItemPrinterComponent(data) {
        this.data = data;
    }
    ComponentDropdownItemPrinterComponent = __decorate([
        core.Component({
            selector: 'component-item-printer',
            template: "\n        <div class=\"pe-customize-component__se-select-choices-layout\">\n            <div class=\"pe-customize-component__se-select-choices-col1\">\n                <div class=\"perso-wrap-ellipsis\" title=\"{{ data.item.name }}\">{{ data.item.name }}</div>\n            </div>\n            <div class=\"pe-customize-component__se-select-choices-col2\">\n                <div class=\"perso-wrap-ellipsis\" title=\"{{ data.item.typeCode }}\">{{ data.item.typeCode }}</div>\n            </div>\n        </div>\n    "
        }),
        __param(0, core.Inject(smarteditcommons.ITEM_COMPONENT_DATA_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], ComponentDropdownItemPrinterComponent);
    return ComponentDropdownItemPrinterComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "PersonalizationsmarteditContextMenuAddEditActionComponent", {
    template: "<div class=\"perso-customize-component\"><div class=\"perso-customize-component__title-layout\"><div *ngIf=\"letterIndicatorForElement\" class=\"perso-customize-component__title-layout__letter-block\"><span [ngClass]=\"colorIndicatorForElement\">{{letterIndicatorForElement}}</span></div><div class=\"perso-customize-component__title-layout__cust-name perso-wrap-ellipsis\" title=\"{{selectedCustomization.name}}\">{{selectedCustomization.name}}</div><div class=\"perso-customize-component__title-layout__target-group-name perso-wrap-ellipsis\" title=\"{{selectedVariation.name}}\">{{'> '+ selectedVariation.name}}</div></div><dl class=\"perso-customize-component__data-list\"><label class=\"fd-form__label\" [translate]=\"'personalization.modal.addeditaction.selected.mastercomponent.title'\"></label><dd>{{componentType}}</dd></dl><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.actions.title'\"></label><fd-inline-help [inlineHelpIconStyle]=\"{'margin-left': '10px', 'padding-top': '1px'}\" [inlineHelpContentStyle]=\"{'box-shadow': '0 0 4px 0 #d9d9d9', 'border': '1px solid #d9d9d9', 'border-radius': '4px', 'color': '#32363a', 'font-size': '14px', 'max-width': '200px', 'white-space': 'normal'}\" [placement]=\"'top-start'\"><span [translate]=\"'personalization.modal.addeditaction.selected.actions.help.label'\"></span></fd-inline-help><se-select class=\"perso-customize-component__select2-container\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.placeholder'\" [(model)]=\"actionSelected\" [searchEnabled]=\"false\" [showRemoveButton]=\"false\" [fetchStrategy]=\"actionFetchStrategy\"></se-select><div class=\"perso-customize-component__select-group-label-layout\"><div *ngIf=\"actionSelected == 'use'\"><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.component.title'\"></label></div><has-multicatalog *ngIf=\"actionSelected == 'use'\"><div class=\"perso-customize-component__filter-layout\"><label class=\"fd-form__label perso-customize-component__filter-label\" [translate]=\"'personalization.commons.filter.label'\"></label><catalog-version-filter-dropdown class=\"pe-customize-component__catalog-version-filter-dropdown\" (onSelectCallback)=\"catalogVersionFilterChange($event)\"></catalog-version-filter-dropdown></div></has-multicatalog></div><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'use'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componentlist.placeholder'\" [(model)]=\"idComponentSelected\" [onSelect]=\"componentSelectedEvent\" [searchEnabled]=\"true\" [showRemoveButton]=\"false\" [fetchStrategy]=\"componentsFetchStrategy\" [itemComponent]=\"itemComponent\"></se-select><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'create'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componenttype.placeholder'\" [(model)]=\"newComponentSelected\" [onSelect]=\"newComponentTypeSelectedEvent\" [searchEnabled]=\"false\" [fetchStrategy]=\"componentTypesFetchStrategy\"></se-select></div>"
});
var PersonalizationsmarteditContextMenuAddEditActionComponent = /** @class */ (function () {
    function PersonalizationsmarteditContextMenuAddEditActionComponent(modalManager, translateService, personalizationsmarteditRestService, personalizationsmarteditMessageHandler, personalizationsmarteditContextService, PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING, MODAL_BUTTON_ACTIONS, MODAL_BUTTON_STYLES, slotRestrictionsService, editorModalService) {
        var _this = this;
        this.modalManager = modalManager;
        this.translateService = translateService;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING = PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING;
        this.MODAL_BUTTON_ACTIONS = MODAL_BUTTON_ACTIONS;
        this.MODAL_BUTTON_STYLES = MODAL_BUTTON_STYLES;
        this.slotRestrictionsService = slotRestrictionsService;
        this.editorModalService = editorModalService;
        this.actionSelected = "";
        this.idComponentSelected = "";
        this.selectedCustomization = {};
        this.selectedVariation = {};
        this.newComponentSelected = "";
        this.componentSelected = {};
        this.actionCreated = new core.EventEmitter();
        this.itemComponent = ComponentDropdownItemPrinterComponent;
        this.modalButtons = [{
                id: 'cancel',
                label: "personalization.modal.addeditaction.button.cancel",
                style: this.MODAL_BUTTON_STYLES.SECONDARY,
                action: this.MODAL_BUTTON_ACTIONS.DISMISS
            }, {
                id: 'submit',
                label: "personalization.modal.addeditaction.button.submit",
                action: this.MODAL_BUTTON_ACTIONS.CLOSE,
                disabledFn: function () {
                    return !Boolean(_this.idComponentSelected) || (Boolean(_this.componentUuid) && _this.componentUuid === _this.idComponentSelected);
                },
                callback: function () {
                    _this.idComponentSelected = undefined;
                    var componentCatalogId = _this.componentSelected.catalogVersion.substring(0, _this.componentSelected.catalogVersion.indexOf('\/'));
                    var filter = {
                        catalog: _this.selectedCustomization.catalog,
                        catalogVersion: _this.selectedCustomization.catalogVersion
                    };
                    var extraCatalogFilter = {
                        slotCatalog: _this.slotCatalog,
                        oldComponentCatalog: _this.componentCatalog
                    };
                    Object.assign(extraCatalogFilter, filter);
                    if (_this.editEnabled) {
                        _this.editAction(_this.selectedCustomization.code, _this.selectedVariation.code, _this.actionId, _this.componentSelected.uid, componentCatalogId, filter);
                    }
                    else {
                        _this.personalizationsmarteditRestService.replaceComponentWithContainer(_this.defaultComponentId, _this.slotId, extraCatalogFilter).then(function (result) {
                            _this.addActionToContainer(_this.componentSelected.uid, componentCatalogId, result.sourceId, _this.selectedCustomization.code, _this.selectedVariation.code, filter);
                        }, function () {
                            _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.replacingcomponent'));
                        });
                    }
                    return _this.actionCreated;
                }
            }];
        this.initNewComponentTypes = function () {
            return _this.slotRestrictionsService.getSlotRestrictions(_this.slotId).then(function (restrictions) {
                return _this.personalizationsmarteditRestService.getNewComponentTypes().then(function (resp) {
                    _this.newComponentTypes = resp.componentTypes.filter(function (elem) {
                        return restrictions.indexOf(elem.code) > -1;
                    }).map(function (elem) {
                        elem.id = elem.code;
                        return elem;
                    });
                    return _this.newComponentTypes;
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.gettingcomponentstypes'));
                });
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.gettingslotrestrictions'));
            });
        };
        this.getAndSetComponentById = function (componentUuid) {
            _this.personalizationsmarteditRestService.getComponent(componentUuid).then(function (resp) {
                _this.idComponentSelected = resp.uuid;
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.gettingcomponents'));
            });
        };
        this.getAndSetColorAndLetter = function () {
            var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
            if (combinedView.enabled) {
                (combinedView.selectedItems || []).forEach(function (element, index) {
                    var state = _this.selectedCustomizationCode === element.customization.code;
                    state = state && _this.selectedVariationCode === element.variation.code;
                    var wrappedIndex = index % Object.keys(_this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING).length;
                    if (state) {
                        _this.letterIndicatorForElement = String.fromCharCode('a'.charCodeAt(0) + wrappedIndex).toUpperCase();
                        _this.colorIndicatorForElement = _this.PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING[wrappedIndex].listClass;
                    }
                });
            }
        };
        this.componentSelectedEvent = function (item) {
            if (!item) {
                return;
            }
            _this.componentSelected = item;
            _this.idComponentSelected = item.uuid;
        };
        this.newComponentTypeSelectedEvent = function (item) {
            if (!item) {
                return;
            }
            var componentAttributes = {
                smarteditComponentType: item.code,
                catalogVersionUuid: _this.personalizationsmarteditContextService.getSeData().seExperienceData.pageContext.catalogVersionUuid
            };
            _this.editorModalService.open(componentAttributes).then(function (response) {
                _this.actionSelected = _this.actions.filter(function (action) { return action.id === "use"; })[0].id;
                _this.idComponentSelected = response.uuid;
                _this.componentSelected = response;
            }, function () {
                _this.newComponentSelected = "";
            });
        };
        this.editAction = function (customizationId, variationId, actionId, componentId, componentCatalog, filter) {
            _this.personalizationsmarteditRestService.editAction(customizationId, variationId, actionId, componentId, componentCatalog, filter).then(function () {
                _this.personalizationsmarteditMessageHandler.sendSuccess(_this.translateService.instant('personalization.info.updatingaction'));
                _this.actionCreated.emit();
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.updatingaction'));
                _this.actionCreated.emit();
            });
        };
        this.addActionToContainer = function (componentId, catalogId, containerSourceId, customizationId, variationId, filter) {
            _this.personalizationsmarteditRestService.addActionToContainer(componentId, catalogId, containerSourceId, customizationId, variationId, filter).then(function () {
                _this.personalizationsmarteditMessageHandler.sendSuccess(_this.translateService.instant('personalization.info.creatingaction'));
                _this.actionCreated.emit(containerSourceId);
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.creatingaction'));
                _this.actionCreated.emit();
            });
        };
        this.catalogVersionFilterChange = function (value) {
            if (!value) {
                return;
            }
            var arr = value.split("\/");
            _this.catalogFilter = arr[0];
            _this.catalogVersionFilter = arr[1];
        };
        this.components = [];
        this.modalManager.addButton(this.modalButtons[0]);
        this.modalManager.addButton(this.modalButtons[1]);
        this.actionFetchStrategy = {
            fetchAll: function () {
                return Promise.resolve(_this.actions);
            }
        };
        this.componentsFetchStrategy = {
            fetchPage: function (mask, pageSize, currentPage) {
                return _this.componentTypesFetchStrategy.fetchAll().then(function (componentTypes) {
                    var typeCodes = componentTypes.map(function (elem) {
                        return elem.code;
                    }).join(",");
                    var filter = {
                        currentPage: currentPage,
                        mask: mask,
                        pageSize: 30,
                        sort: 'name',
                        catalog: _this.catalogFilter,
                        catalogVersion: _this.catalogVersionFilter,
                        typeCodes: typeCodes
                    };
                    return _this.personalizationsmarteditRestService.getComponents(filter).then(function (resp) {
                        var filteredComponents = resp.response.filter(function (elem) {
                            return !elem.restricted;
                        });
                        return Promise.resolve({
                            results: filteredComponents,
                            pagination: resp.pagination
                        });
                    }, function () {
                        _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.gettingcomponents'));
                        return Promise.reject();
                    });
                });
            },
            fetchEntity: function (uuid) {
                return _this.personalizationsmarteditRestService.getComponent(uuid).then(function (resp) {
                    return Promise.resolve({
                        id: resp.uuid,
                        name: resp.name,
                        typeCode: resp.typeCode
                    });
                });
            }
        };
        this.componentTypesFetchStrategy = {
            fetchAll: function () {
                if (_this.newComponentTypes) {
                    return Promise.resolve(_this.newComponentTypes);
                }
                else {
                    return _this.initNewComponentTypes();
                }
            }
        };
    }
    Object.defineProperty(PersonalizationsmarteditContextMenuAddEditActionComponent.prototype, "modalData", {
        get: function () {
            return this.modalManager.getModalData();
        },
        enumerable: false,
        configurable: true
    });
    PersonalizationsmarteditContextMenuAddEditActionComponent.prototype.ngOnInit = function () {
        this.init();
    };
    PersonalizationsmarteditContextMenuAddEditActionComponent.prototype.init = function () {
        var _this = this;
        this.actions = [{
                id: "create",
                name: this.translateService.instant("personalization.modal.addeditaction.createnewcomponent")
            }, {
                id: "use",
                name: this.translateService.instant("personalization.modal.addeditaction.usecomponent")
            }];
        this.modalData.subscribe(function (config) {
            _this.colorIndicatorForElement = config.colorIndicatorForElement;
            _this.slotId = config.slotId;
            _this.actionId = config.actionId;
            _this.componentUuid = config.componentUuid;
            _this.defaultComponentId = config.componentId;
            _this.editEnabled = config.editEnabled;
            _this.slotCatalog = config.slotCatalog;
            _this.componentCatalog = config.componentCatalog;
            _this.selectedCustomizationCode = config.selectedCustomizationCode;
            _this.selectedVariationCode = config.selectedVariationCode;
            _this.componentType = config.componentType;
            _this.personalizationsmarteditRestService.getCustomization({
                code: _this.selectedCustomizationCode
            })
                .then(function (response) {
                _this.selectedCustomization = response;
                _this.selectedVariation = response.variations.filter(function (elem) {
                    return elem.code === _this.selectedVariationCode;
                })[0];
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.translateService.instant('personalization.error.gettingcustomization'));
            });
            if (_this.editEnabled) {
                _this.getAndSetComponentById(_this.componentUuid);
                _this.actionSelected = _this.actions.filter(function (item) { return item.id === "use"; })[0].id;
            }
            else {
                _this.actionSelected = "";
            }
        });
        this.initNewComponentTypes();
        this.getAndSetColorAndLetter();
    };
    PersonalizationsmarteditContextMenuAddEditActionComponent = __decorate([
        core.Component({
            template: "<div class=\"perso-customize-component\"><div class=\"perso-customize-component__title-layout\"><div *ngIf=\"letterIndicatorForElement\" class=\"perso-customize-component__title-layout__letter-block\"><span [ngClass]=\"colorIndicatorForElement\">{{letterIndicatorForElement}}</span></div><div class=\"perso-customize-component__title-layout__cust-name perso-wrap-ellipsis\" title=\"{{selectedCustomization.name}}\">{{selectedCustomization.name}}</div><div class=\"perso-customize-component__title-layout__target-group-name perso-wrap-ellipsis\" title=\"{{selectedVariation.name}}\">{{'> '+ selectedVariation.name}}</div></div><dl class=\"perso-customize-component__data-list\"><label class=\"fd-form__label\" [translate]=\"'personalization.modal.addeditaction.selected.mastercomponent.title'\"></label><dd>{{componentType}}</dd></dl><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.actions.title'\"></label><fd-inline-help [inlineHelpIconStyle]=\"{'margin-left': '10px', 'padding-top': '1px'}\" [inlineHelpContentStyle]=\"{'box-shadow': '0 0 4px 0 #d9d9d9', 'border': '1px solid #d9d9d9', 'border-radius': '4px', 'color': '#32363a', 'font-size': '14px', 'max-width': '200px', 'white-space': 'normal'}\" [placement]=\"'top-start'\"><span [translate]=\"'personalization.modal.addeditaction.selected.actions.help.label'\"></span></fd-inline-help><se-select class=\"perso-customize-component__select2-container\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.placeholder'\" [(model)]=\"actionSelected\" [searchEnabled]=\"false\" [showRemoveButton]=\"false\" [fetchStrategy]=\"actionFetchStrategy\"></se-select><div class=\"perso-customize-component__select-group-label-layout\"><div *ngIf=\"actionSelected == 'use'\"><label class=\"fd-form__label se-control-label required\" [translate]=\"'personalization.modal.addeditaction.selected.component.title'\"></label></div><has-multicatalog *ngIf=\"actionSelected == 'use'\"><div class=\"perso-customize-component__filter-layout\"><label class=\"fd-form__label perso-customize-component__filter-label\" [translate]=\"'personalization.commons.filter.label'\"></label><catalog-version-filter-dropdown class=\"pe-customize-component__catalog-version-filter-dropdown\" (onSelectCallback)=\"catalogVersionFilterChange($event)\"></catalog-version-filter-dropdown></div></has-multicatalog></div><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'use'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componentlist.placeholder'\" [(model)]=\"idComponentSelected\" [onSelect]=\"componentSelectedEvent\" [searchEnabled]=\"true\" [showRemoveButton]=\"false\" [fetchStrategy]=\"componentsFetchStrategy\" [itemComponent]=\"itemComponent\"></se-select><se-select class=\"perso-customize-component__select2-container\" *ngIf=\"actionSelected == 'create'\" [placeholder]=\"'personalization.modal.addeditaction.dropdown.componenttype.placeholder'\" [(model)]=\"newComponentSelected\" [onSelect]=\"newComponentTypeSelectedEvent\" [searchEnabled]=\"false\" [fetchStrategy]=\"componentTypesFetchStrategy\"></se-select></div>"
        }),
        __param(0, core.Inject(smarteditcommons.FundamentalModalManagerService)),
        __param(1, core.Inject(core$1.TranslateService)),
        __param(2, core.Inject(PersonalizationsmarteditRestService)),
        __param(3, core.Inject(personalizationcommons.PersonalizationsmarteditMessageHandler)),
        __param(4, core.Inject(PersonalizationsmarteditContextService)),
        __param(5, core.Inject('PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING')),
        __param(6, core.Inject('MODAL_BUTTON_ACTIONS')),
        __param(7, core.Inject('MODAL_BUTTON_STYLES')),
        __param(8, core.Inject(cmscommons.ISlotRestrictionsService)),
        __param(9, core.Inject('editorModalService')),
        __metadata("design:paramtypes", [smarteditcommons.FundamentalModalManagerService,
            core$1.TranslateService,
            PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            PersonalizationsmarteditContextService, Object, Object, Object, cmscommons.ISlotRestrictionsService, Object])
    ], PersonalizationsmarteditContextMenuAddEditActionComponent);
    return PersonalizationsmarteditContextMenuAddEditActionComponent;
}());

var /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy = /** @class */ (function () {
    PersonalizationsmarteditContextMenuServiceProxy.$inject = ["modalService", "renderService", "editorModalService", "personalizationsmarteditContextService", "personalizationsmarteditRestService", "personalizationsmarteditMessageHandler", "lodash", "$translate", "MODAL_BUTTON_ACTIONS", "MODAL_BUTTON_STYLES"];
    function /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy(modalService, renderService, editorModalService, personalizationsmarteditContextService, personalizationsmarteditRestService, personalizationsmarteditMessageHandler, lodash, $translate, MODAL_BUTTON_ACTIONS, MODAL_BUTTON_STYLES) {
        this.modalService = modalService;
        this.renderService = renderService;
        this.editorModalService = editorModalService;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.lodash = lodash;
        this.$translate = $translate;
        this.MODAL_BUTTON_ACTIONS = MODAL_BUTTON_ACTIONS;
        this.MODAL_BUTTON_STYLES = MODAL_BUTTON_STYLES;
        this.confirmModalButtons = [{
                id: 'confirmCancel',
                label: 'personalization.modal.deleteaction.button.cancel',
                style: this.MODAL_BUTTON_STYLES.SECONDARY,
                action: this.MODAL_BUTTON_ACTIONS.DISMISS
            }, {
                id: 'confirmOk',
                label: 'personalization.modal.deleteaction.button.ok',
                action: this.MODAL_BUTTON_ACTIONS.CLOSE
            }];
    }
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openDeleteAction = function (config) {
        var _this = this;
        this.modalService.open({
            size: 'md',
            title: 'personalization.modal.deleteaction.title',
            templateInline: '<div id="confirmationModalDescription">{{ "' + "personalization.modal.deleteaction.content" + '" | translate }}</div>',
            controller: ContextMenuDeleteActionControllerFactory(config),
            cssClasses: 'yFrontModal',
            buttons: this.confirmModalButtons
        }).then(function () {
            if (_this.personalizationsmarteditContextService.getCombinedView().enabled) {
                _this.personalizationsmarteditRestService.getActions(config.selectedCustomizationCode, config.selectedVariationCode, config)
                    .then(function (response) {
                    var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
                    if (combinedView.customize.selectedComponents) {
                        combinedView.customize.selectedComponents.splice(combinedView.customize.selectedComponents.indexOf(config.containerSourceId), 1);
                    }
                    _this.lodash.forEach(combinedView.selectedItems, function (value) {
                        if (value.customization.code === config.selectedCustomizationCode && value.variation.code === config.selectedVariationCode) {
                            value.variation.actions = response.actions;
                        }
                    });
                    _this.personalizationsmarteditContextService.setCombinedView(combinedView);
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingactions'));
                });
            }
            else {
                var customize = _this.personalizationsmarteditContextService.getCustomize();
                customize.selectedComponents.splice(customize.selectedComponents.indexOf(config.containerSourceId), 1);
                _this.personalizationsmarteditContextService.setCustomize(customize);
            }
            _this.renderService.renderSlots(config.slotsToRefresh);
        });
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openDeleteAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openAddAction = function (config) {
        var _this = this;
        this.modalService.open({
            component: PersonalizationsmarteditContextMenuAddEditActionComponent,
            data: config,
            templateConfig: {
                // buttons: this.modalButtons,
                title: 'personalization.modal.addaction.title',
                isDismissButtonVisible: true
            },
            config: {
                focusTrapped: false,
                modalPanelClass: 'yPersonalizationContextModal'
            }
        }).afterClosed.subscribe(function (resultContainer) {
            if (_this.personalizationsmarteditContextService.getCombinedView().enabled) {
                var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
                combinedView.customize.selectedComponents.push(resultContainer);
                _this.personalizationsmarteditContextService.setCombinedView(combinedView);
            }
            else {
                var customize = _this.personalizationsmarteditContextService.getCustomize();
                customize.selectedComponents.push(resultContainer);
                _this.personalizationsmarteditContextService.setCustomize(customize);
            }
            _this.renderService.renderSlots(config.slotsToRefresh);
        });
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openAddAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditAction = function (config) {
        var _this = this;
        config.editEnabled = true;
        this.modalService.open({
            component: PersonalizationsmarteditContextMenuAddEditActionComponent,
            data: config,
            templateConfig: {
                title: 'personalization.modal.editaction.title',
                isDismissButtonVisible: true
            },
            config: {
                focusTrapped: false,
                modalPanelClass: 'yPersonalizationContextModal'
            }
        }).afterClosed.subscribe(function (resultContainer) {
            _this.renderService.renderSlots(config.slotsToRefresh);
        });
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditComponentAction = function (config) {
        this.editorModalService.open(config);
    };
    PersonalizationsmarteditContextMenuServiceProxy.prototype.openEditComponentAction.$inject = ["config"];
    /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy = __decorate([
        smarteditcommons.GatewayProxied('openDeleteAction', 'openAddAction', 'openEditAction', 'openEditComponentAction'),
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, Object, Object, PersonalizationsmarteditContextService,
            PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditMessageHandler, Function, Function, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy);
    return /* @ngInject */ PersonalizationsmarteditContextMenuServiceProxy;
}());

var /* @ngInject */ LegacyPersonalizationsmarteditContextMenuModule = /** @class */ (function () {
    function /* @ngInject */ LegacyPersonalizationsmarteditContextMenuModule() {
    }
    /* @ngInject */ LegacyPersonalizationsmarteditContextMenuModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                PersonalizationsmarteditServicesModule,
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditCommonComponentsModule,
                'ui.select',
                'genericEditorModule',
                'cmsSmarteditServicesModule',
                'smarteditRootModule',
                'renderServiceModule',
                'modalServiceModule',
            ],
            providers: [
                PersonalizationsmarteditContextMenuServiceProxy
            ],
        })
    ], /* @ngInject */ LegacyPersonalizationsmarteditContextMenuModule);
    return /* @ngInject */ LegacyPersonalizationsmarteditContextMenuModule;
}());

var /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController = /** @class */ (function () {
    PersonalizationsmarteditCombinedViewConfigureController.$inject = ["$translate", "customizationDataFactory", "personalizationsmarteditContextService", "personalizationsmarteditMessageHandler", "personalizationsmarteditUtils", "componentMenuService", "PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER", "PERSONALIZATION_VIEW_STATUS_MAPPING_CODES", "$scope", "$q", "lodash", "modalManager"];
    function /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController($translate, customizationDataFactory, personalizationsmarteditContextService, personalizationsmarteditMessageHandler, personalizationsmarteditUtils, componentMenuService, PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER, PERSONALIZATION_VIEW_STATUS_MAPPING_CODES, $scope, $q, lodash, modalManager) {
        var _this = this;
        this.$translate = $translate;
        this.customizationDataFactory = customizationDataFactory;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.componentMenuService = componentMenuService;
        this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER = PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER;
        this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES = PERSONALIZATION_VIEW_STATUS_MAPPING_CODES;
        this.$scope = $scope;
        this.$q = $q;
        this.lodash = lodash;
        this.modalManager = modalManager;
        this.getCustomizations = function (categoryFilter) {
            var params = {
                filter: categoryFilter,
                dataArrayName: 'customizations'
            };
            _this.customizationDataFactory.updateData(params, _this.successCallback, _this.errorCallback);
        };
        this.addMoreItems = function () {
            if (_this.pagination.getPage() < _this.pagination.getTotalPages() - 1 && !_this.moreCustomizationsRequestProcessing) {
                _this.moreCustomizationsRequestProcessing = true;
                _this.getCustomizations(_this.getCustomizationsFilterObject());
            }
        };
        this.selectElement = function (item) {
            if (!item) {
                return;
            }
            _this.$scope.selectedItems.push(item);
            _this.componentMenuService.getValidContentCatalogVersions().then(function (catalogVersions) {
                var catalogsUuids = catalogVersions.map(function (elem) {
                    return elem.id;
                });
                _this.$scope.selectedItems.sort(function (a, b) {
                    var aCatalogUuid = a.customization.catalog + "/" + a.customization.catalogVersion;
                    var bCatalogUuid = b.customization.catalog + "/" + b.customization.catalogVersion;
                    if (aCatalogUuid === bCatalogUuid) {
                        return a.customization.rank - b.customization.rank;
                    }
                    return catalogsUuids.indexOf(bCatalogUuid) - catalogsUuids.indexOf(aCatalogUuid);
                });
            });
            _this.$scope.selectedElement = null;
            _this.searchInputKeypress(null, '');
        };
        this.initUiSelect = function (uiSelectController) {
            uiSelectController.isActive = function () {
                return false;
            };
        };
        this.removeSelectedItem = function (item) {
            _this.$scope.selectedItems.splice(_this.$scope.selectedItems.indexOf(item), 1);
            _this.$scope.selectedElement = null;
            _this.searchInputKeypress(null, '');
        };
        this.getClassForElement = function (index) {
            return _this.personalizationsmarteditUtils.getClassForElement(index);
        };
        this.getLetterForElement = function (index) {
            return _this.personalizationsmarteditUtils.getLetterForElement(index);
        };
        this.isItemInSelectDisabled = function (item) {
            return _this.$scope.selectedItems.find(function (currentItem) {
                return currentItem.customization.code === item.customization.code;
            });
        };
        this.isItemSelected = function (item) {
            return _this.$scope.selectedItems.find(function (currentItem) {
                return currentItem.customization.code === item.customization.code && currentItem.variation.code === item.variation.code;
            });
        };
        this.searchInputKeypress = function (keyEvent, searchObj) {
            if (keyEvent && ([37, 38, 39, 40].indexOf(keyEvent.which) > -1)) { // keyleft, keyup, keyright, keydown
                return;
            }
            _this.pagination.reset();
            _this.customizationFilter.name = searchObj;
            _this.customizationDataFactory.resetData();
            _this.addMoreItems();
        };
        this.buttonHandlerFn = function (buttonId) {
            var deferred = _this.$q.defer();
            if (buttonId === 'confirmOk') {
                var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
                combinedView.selectedItems = _this.$scope.selectedItems;
                if (combinedView.enabled && combinedView.customize.selectedVariations !== null && _this.isCombinedViewContextPersRemoved(combinedView)) {
                    combinedView.customize.selectedCustomization = null;
                    combinedView.customize.selectedVariations = null;
                    combinedView.customize.selectedComponents = null;
                }
                _this.personalizationsmarteditContextService.setCombinedView(combinedView);
                return deferred.resolve();
            }
            return deferred.reject();
        };
        this.pageFilterChange = function (itemId) {
            _this.customizationPageFilter = itemId;
            _this.pagination.reset();
            _this.customizationDataFactory.resetData();
            _this.addMoreItems();
        };
        this.catalogFilterChange = function (itemId) {
            _this.$scope.catalogFilter = itemId;
            _this.pagination.reset();
            _this.customizationDataFactory.resetData();
            _this.addMoreItems();
        };
        this.isItemFromCurrentCatalog = function (item) {
            return _this.personalizationsmarteditUtils.isItemFromCurrentCatalog(item, _this.personalizationsmarteditContextService.getSeData());
        };
        this.getAndSetCatalogVersionNameL10N = function (customization) {
            return _this.personalizationsmarteditUtils.getAndSetCatalogVersionNameL10N(customization);
        };
        this.successCallback = function (response) {
            _this.pagination = new personalizationcommons.PaginationHelper(response.pagination);
            _this.$scope.selectionArray.length = 0;
            _this.customizationDataFactory.items.forEach(function (customization) {
                customization.variations.filter(function (variation) {
                    return _this.personalizationsmarteditUtils.isItemVisible(variation);
                }).forEach(function (variation) {
                    _this.$scope.selectionArray.push({
                        customization: {
                            code: customization.code,
                            name: customization.name,
                            rank: customization.rank,
                            catalog: customization.catalog,
                            catalogVersion: customization.catalogVersion
                        },
                        variation: {
                            code: variation.code,
                            name: variation.name,
                            catalog: variation.catalog,
                            catalogVersion: variation.catalogVersion
                        }
                    });
                });
            });
            _this.moreCustomizationsRequestProcessing = false;
        };
        this.errorCallback = function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcustomizations'));
            _this.moreCustomizationsRequestProcessing = false;
        };
        this.init = function () {
            _this.$scope.selectionArray = [];
            _this.customizationDataFactory.resetData();
            _this.pagination = new personalizationcommons.PaginationHelper({});
            _this.pagination.reset();
            _this.combinedView = _this.personalizationsmarteditContextService.getCombinedView();
            _this.$scope.selectedItems = [];
            _this.$scope.selectedItems = _this.lodash.cloneDeep(_this.combinedView.selectedItems || []);
            _this.$scope.selectedElement = {};
            _this.moreCustomizationsRequestProcessing = false;
            _this.customizationFilter = {
                name: ''
            };
            _this.modalManager.setButtonHandler(_this.buttonHandlerFn);
            _this.$scope.$watch('selectedItems', function (newValue, oldValue) {
                _this.modalManager.disableButton("confirmOk");
                if (newValue !== oldValue) {
                    var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
                    var arrayEquals = (combinedView.selectedItems || []).length === 0 && _this.$scope.selectedItems.length === 0;
                    arrayEquals = arrayEquals || _this.lodash.isEqual(combinedView.selectedItems, _this.$scope.selectedItems);
                    if (!arrayEquals) {
                        _this.modalManager.enableButton("confirmOk");
                    }
                }
            }, true);
        };
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController.prototype.getDefaultStatus = function () {
        var _this = this;
        return this.personalizationsmarteditUtils.getStatusesMapping().filter(function (elem) {
            return elem.code === _this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES.ALL;
        })[0];
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController.prototype.getCustomizationsFilterObject = function () {
        var ret = {
            currentSize: this.pagination.getCount(),
            currentPage: this.pagination.getPage() + 1,
            name: this.customizationFilter.name,
            statuses: this.getDefaultStatus().modelStatuses,
            catalogs: this.$scope.catalogFilter
        };
        if (this.customizationPageFilter === this.PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER.ONLY_THIS_PAGE) {
            ret.pageId = this.personalizationsmarteditContextService.getSeData().pageId;
            ret.pageCatalogId = this.personalizationsmarteditContextService.getSeData().seExperienceData.pageContext.catalogId;
        }
        return ret;
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController.prototype.isCombinedViewContextPersRemoved = function (combinedView) {
        return combinedView.selectedItems.filter(function (item) {
            return item.customization.code === combinedView.customize.selectedCustomization.code && item.variation.code === combinedView.customize.selectedVariations.code;
        }).length === 0;
    };
    PersonalizationsmarteditCombinedViewConfigureController.prototype.isCombinedViewContextPersRemoved.$inject = ["combinedView"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Function, CustomizationDataFactory,
            PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            personalizationcommons.PersonalizationsmarteditUtils,
            cmssmarteditcontainer.ComponentMenuService, Object, Object, Object, Function, Function, Object])
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewConfigureController;
}());

var /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService = /** @class */ (function () {
    PersonalizationsmarteditCombinedViewCommonsService.$inject = ["$q", "personalizationsmarteditContextUtils", "personalizationsmarteditContextService", "personalizationsmarteditPreviewService", "personalizationsmarteditUtils", "personalizationsmarteditRestService", "modalService", "MODAL_BUTTON_ACTIONS", "MODAL_BUTTON_STYLES"];
    function /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService($q, personalizationsmarteditContextUtils, personalizationsmarteditContextService, personalizationsmarteditPreviewService, personalizationsmarteditUtils, personalizationsmarteditRestService, modalService, MODAL_BUTTON_ACTIONS, MODAL_BUTTON_STYLES) {
        var _this = this;
        this.$q = $q;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditPreviewService = personalizationsmarteditPreviewService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.modalService = modalService;
        this.MODAL_BUTTON_ACTIONS = MODAL_BUTTON_ACTIONS;
        this.MODAL_BUTTON_STYLES = MODAL_BUTTON_STYLES;
        this.openManagerAction = function () {
            _this.modalService.open({
                title: "personalization.modal.combinedview.title",
                templateUrl: 'personalizationsmarteditCombinedViewConfigureTemplate.html',
                controller: PersonalizationsmarteditCombinedViewConfigureController,
                buttons: [{
                        id: 'confirmCancel',
                        label: 'personalization.modal.combinedview.button.cancel',
                        style: _this.MODAL_BUTTON_STYLES.SECONDARY,
                        action: _this.MODAL_BUTTON_ACTIONS.DISMISS
                    }, {
                        id: 'confirmOk',
                        label: 'personalization.modal.combinedview.button.ok',
                        action: _this.MODAL_BUTTON_ACTIONS.CLOSE
                    }]
            }).then(function () {
                _this.personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(_this.personalizationsmarteditContextService);
                var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
                combinedView.enabled = (combinedView.selectedItems && combinedView.selectedItems.length > 0);
                _this.personalizationsmarteditContextService.setCombinedView(combinedView);
                _this.updatePreview(_this.getVariationsForPreviewTicket());
            }, function () {
                // error
            });
        };
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService.prototype.updatePreview = function (previewTicketVariations) {
        this.personalizationsmarteditPreviewService.updatePreviewTicketWithVariations(previewTicketVariations);
        this.updateActionsOnSelectedVariations();
    };
    PersonalizationsmarteditCombinedViewCommonsService.prototype.updatePreview.$inject = ["previewTicketVariations"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService.prototype.getVariationsForPreviewTicket = function () {
        var previewTicketVariations = [];
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        (combinedView.selectedItems || []).forEach(function (item) {
            previewTicketVariations.push({
                customizationCode: item.customization.code,
                variationCode: item.variation.code,
                catalog: item.variation.catalog,
                catalogVersion: item.variation.catalogVersion
            });
        });
        return previewTicketVariations;
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService.prototype.combinedViewEnabledEvent = function (isEnabled) {
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        combinedView.enabled = isEnabled;
        this.personalizationsmarteditContextService.setCombinedView(combinedView);
        var customize = this.personalizationsmarteditContextService.getCustomize();
        customize.selectedCustomization = null;
        customize.selectedVariations = null;
        customize.selectedComponents = null;
        this.personalizationsmarteditContextService.setCustomize(customize);
        if (isEnabled) {
            this.updatePreview(this.getVariationsForPreviewTicket());
        }
        else {
            this.updatePreview([]);
        }
    };
    PersonalizationsmarteditCombinedViewCommonsService.prototype.combinedViewEnabledEvent.$inject = ["isEnabled"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService.prototype.isItemFromCurrentCatalog = function (item) {
        return this.personalizationsmarteditUtils.isItemFromCurrentCatalog(item, this.personalizationsmarteditContextService.getSeData());
    };
    PersonalizationsmarteditCombinedViewCommonsService.prototype.isItemFromCurrentCatalog.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService.prototype.updateActionsOnSelectedVariations = function () {
        var _this = this;
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        var promissesArray = [];
        (combinedView.selectedItems || []).forEach(function (item) {
            promissesArray.push(_this.personalizationsmarteditRestService.getActions(item.customization.code, item.variation.code, item.variation)
                .then(function (response) {
                item.variation.actions = response.actions;
            }));
        });
        this.$q.all(promissesArray).then(function () {
            _this.personalizationsmarteditContextService.setCombinedView(combinedView);
        });
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Function, personalizationcommons.PersonalizationsmarteditContextUtils,
            PersonalizationsmarteditContextService,
            PersonalizationsmarteditPreviewService,
            personalizationcommons.PersonalizationsmarteditUtils,
            PersonalizationsmarteditRestService,
            smarteditcommons.IModalService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewCommonsService;
}());

var /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent = /** @class */ (function () {
    PersonalizationsmarteditCombinedViewMenuComponent.$inject = ["$translate", "personalizationsmarteditContextService", "personalizationsmarteditMessageHandler", "personalizationsmarteditRestService", "personalizationsmarteditContextUtils", "personalizationsmarteditUtils", "personalizationsmarteditPreviewService", "personalizationsmarteditCombinedViewCommonsService", "crossFrameEventService", "permissionService", "SHOW_TOOLBAR_ITEM_CONTEXT", "COMBINED_VIEW_TOOLBAR_ITEM_KEY"];
    function /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent($translate, personalizationsmarteditContextService, personalizationsmarteditMessageHandler, personalizationsmarteditRestService, personalizationsmarteditContextUtils, personalizationsmarteditUtils, personalizationsmarteditPreviewService, personalizationsmarteditCombinedViewCommonsService, crossFrameEventService, permissionService, SHOW_TOOLBAR_ITEM_CONTEXT, COMBINED_VIEW_TOOLBAR_ITEM_KEY) {
        this.$translate = $translate;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditPreviewService = personalizationsmarteditPreviewService;
        this.personalizationsmarteditCombinedViewCommonsService = personalizationsmarteditCombinedViewCommonsService;
        this.crossFrameEventService = crossFrameEventService;
        this.permissionService = permissionService;
        this.SHOW_TOOLBAR_ITEM_CONTEXT = SHOW_TOOLBAR_ITEM_CONTEXT;
        this.COMBINED_VIEW_TOOLBAR_ITEM_KEY = COMBINED_VIEW_TOOLBAR_ITEM_KEY;
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.$onInit = function () {
        this.combinedView = this.personalizationsmarteditContextService.getCombinedView();
        this.selectedItems = this.combinedView.selectedItems || [];
        this.isCombinedViewConfigured = this.selectedItems.length !== 0;
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.combinedViewClick = function () {
        this.personalizationsmarteditContextUtils.clearCustomizeContextAndReloadPreview(this.personalizationsmarteditPreviewService, this.personalizationsmarteditContextService);
        this.personalizationsmarteditCombinedViewCommonsService.openManagerAction();
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.getAndSetComponentsForElement = function (customizationId, variationId, catalog, catalogVersion) {
        var _this = this;
        this.personalizationsmarteditRestService.getComponenentsIdsForVariation(customizationId, variationId, catalog, catalogVersion)
            .then(function (response) {
            var combinedView = _this.personalizationsmarteditContextService.getCombinedView();
            combinedView.customize.selectedComponents = response.components;
            _this.personalizationsmarteditContextService.setCombinedView(combinedView);
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcomponentsforvariation'));
        });
    };
    PersonalizationsmarteditCombinedViewMenuComponent.prototype.getAndSetComponentsForElement.$inject = ["customizationId", "variationId", "catalog", "catalogVersion"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.itemClick = function (item) {
        var _this = this;
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        if (!combinedView.enabled) {
            return;
        }
        this.selectedItems.forEach(function (elem) {
            elem.highlighted = false;
        });
        item.highlighted = true;
        combinedView.customize.selectedCustomization = item.customization;
        combinedView.customize.selectedVariations = item.variation;
        this.personalizationsmarteditContextService.setCombinedView(combinedView);
        this.permissionService.isPermitted([{
                names: ['se.edit.page']
            }]).then(function (roleGranted) {
            if (roleGranted) {
                _this.getAndSetComponentsForElement(item.customization.code, item.variation.code, item.customization.catalog, item.customization.catalogVersion);
            }
        });
        this.personalizationsmarteditCombinedViewCommonsService.updatePreview(this.personalizationsmarteditUtils.getVariationKey(item.customization.code, [item.variation]));
        this.crossFrameEventService.publish(this.SHOW_TOOLBAR_ITEM_CONTEXT, this.COMBINED_VIEW_TOOLBAR_ITEM_KEY);
    };
    PersonalizationsmarteditCombinedViewMenuComponent.prototype.itemClick.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.getClassForElement = function (index) {
        return this.personalizationsmarteditUtils.getClassForElement(index);
    };
    PersonalizationsmarteditCombinedViewMenuComponent.prototype.getClassForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.getLetterForElement = function (index) {
        return this.personalizationsmarteditUtils.getLetterForElement(index);
    };
    PersonalizationsmarteditCombinedViewMenuComponent.prototype.getLetterForElement.$inject = ["index"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.isItemFromCurrentCatalog = function (item) {
        return this.personalizationsmarteditCombinedViewCommonsService.isItemFromCurrentCatalog(item);
    };
    PersonalizationsmarteditCombinedViewMenuComponent.prototype.isItemFromCurrentCatalog.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent.prototype.clearAllCombinedViewClick = function () {
        this.selectedItems = [];
        this.combinedView.selectedItems = [];
        this.combinedView.enabled = false;
        this.personalizationsmarteditContextService.setCombinedView(this.combinedView);
        this.personalizationsmarteditCombinedViewCommonsService.combinedViewEnabledEvent(this.combinedView.enabled);
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditCombinedViewMenuTemplate.html',
            inputs: [
                'isMenuOpen'
            ]
        }),
        __metadata("design:paramtypes", [Function, PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditContextUtils,
            personalizationcommons.PersonalizationsmarteditUtils,
            PersonalizationsmarteditPreviewService,
            PersonalizationsmarteditCombinedViewCommonsService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.IPermissionService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewMenuComponent;
}());

var /* @ngInject */ PersonalizationsmarteditCombinedViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCombinedViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'seConstantsModule',
                'personalizationsmarteditManageCustomizationViewModule',
                'smarteditCommonsModule',
                'modalServiceModule',
                PersonalizationsmarteditCommonComponentsModule,
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule,
                PersonalizationsmarteditCustomizeViewModule
            ],
            providers: [
                PersonalizationsmarteditCombinedViewCommonsService
            ],
            declarations: [
                PersonalizationsmarteditCombinedViewMenuComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewModule);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewModule;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent = /** @class */ (function () {
    PersonalizationsmarteditCustomizeToolbarContextComponent.$inject = ["$scope", "personalizationsmarteditContextService", "personalizationsmarteditContextUtils", "personalizationsmarteditPreviewService", "crossFrameEventService", "SHOW_TOOLBAR_ITEM_CONTEXT", "HIDE_TOOLBAR_ITEM_CONTEXT", "CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY"];
    function /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent($scope, personalizationsmarteditContextService, personalizationsmarteditContextUtils, personalizationsmarteditPreviewService, crossFrameEventService, SHOW_TOOLBAR_ITEM_CONTEXT, HIDE_TOOLBAR_ITEM_CONTEXT, CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY) {
        this.$scope = $scope;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.personalizationsmarteditPreviewService = personalizationsmarteditPreviewService;
        this.crossFrameEventService = crossFrameEventService;
        this.SHOW_TOOLBAR_ITEM_CONTEXT = SHOW_TOOLBAR_ITEM_CONTEXT;
        this.HIDE_TOOLBAR_ITEM_CONTEXT = HIDE_TOOLBAR_ITEM_CONTEXT;
        this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY = CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY;
    }
    /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent.prototype.$onInit = function () {
        var _this = this;
        this.selectedCustomization = angular.copy(this.personalizationsmarteditContextService.getCustomize().selectedCustomization);
        this.selectedVariations = angular.copy(this.personalizationsmarteditContextService.getCustomize().selectedVariations);
        this.visible = false;
        if (this.selectedCustomization) {
            this.title = this.personalizationsmarteditContextService.getCustomize().selectedCustomization.name;
            this.visible = true;
            if (!angular.isArray(this.selectedVariations)) {
                this.subtitle = this.selectedVariations.name;
            }
        }
        this.$scope.$watch(function () {
            return _this.personalizationsmarteditContextService.getCustomize().selectedCustomization;
        }, function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                _this.title = newVal.name;
                _this.visible = true;
                _this.crossFrameEventService.publish(_this.SHOW_TOOLBAR_ITEM_CONTEXT, _this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
            }
            else if (!newVal) {
                _this.visible = false;
                _this.crossFrameEventService.publish(_this.HIDE_TOOLBAR_ITEM_CONTEXT, _this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
            }
        });
        this.$scope.$watch(function () {
            return _this.personalizationsmarteditContextService.getCustomize().selectedVariations;
        }, function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                _this.subtitle = newVal.name;
            }
        });
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent.prototype.clear = function () {
        this.personalizationsmarteditContextUtils.clearCustomizeContextAndReloadPreview(this.personalizationsmarteditPreviewService, this.personalizationsmarteditContextService);
        this.crossFrameEventService.publish(this.HIDE_TOOLBAR_ITEM_CONTEXT, this.CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
    };
    /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditToolbarContextTemplate.html'
        }),
        __metadata("design:paramtypes", [Object, PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditContextUtils,
            PersonalizationsmarteditPreviewService, Object, Object, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent);
    return /* @ngInject */ PersonalizationsmarteditCustomizeToolbarContextComponent;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent = /** @class */ (function () {
    PersonalizationsmarteditCombinedViewToolbarContextComponent.$inject = ["$scope", "personalizationsmarteditCombinedViewCommonsService", "personalizationsmarteditContextService", "personalizationsmarteditContextUtils", "crossFrameEventService", "SHOW_TOOLBAR_ITEM_CONTEXT", "HIDE_TOOLBAR_ITEM_CONTEXT", "COMBINED_VIEW_TOOLBAR_ITEM_KEY"];
    function /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent($scope, personalizationsmarteditCombinedViewCommonsService, personalizationsmarteditContextService, personalizationsmarteditContextUtils, crossFrameEventService, SHOW_TOOLBAR_ITEM_CONTEXT, HIDE_TOOLBAR_ITEM_CONTEXT, COMBINED_VIEW_TOOLBAR_ITEM_KEY) {
        this.$scope = $scope;
        this.personalizationsmarteditCombinedViewCommonsService = personalizationsmarteditCombinedViewCommonsService;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.crossFrameEventService = crossFrameEventService;
        this.SHOW_TOOLBAR_ITEM_CONTEXT = SHOW_TOOLBAR_ITEM_CONTEXT;
        this.HIDE_TOOLBAR_ITEM_CONTEXT = HIDE_TOOLBAR_ITEM_CONTEXT;
        this.COMBINED_VIEW_TOOLBAR_ITEM_KEY = COMBINED_VIEW_TOOLBAR_ITEM_KEY;
    }
    /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent.prototype.$onInit = function () {
        var _this = this;
        this.selectedCustomization = angular.copy(this.personalizationsmarteditContextService.getCombinedView().customize.selectedCustomization);
        this.visible = false;
        if (this.selectedCustomization) {
            this.title = this.personalizationsmarteditContextService.getCombinedView().customize.selectedCustomization.name;
            this.subtitle = this.personalizationsmarteditContextService.getCombinedView().customize.selectedVariations.name;
            this.visible = true;
        }
        this.$scope.$watch(function () {
            return _this.personalizationsmarteditContextService.getCombinedView().customize.selectedCustomization;
        }, function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                _this.title = newVal.name;
                _this.subtitle = _this.personalizationsmarteditContextService.getCombinedView().customize.selectedVariations.name;
                _this.visible = true;
                _this.crossFrameEventService.publish(_this.SHOW_TOOLBAR_ITEM_CONTEXT, _this.COMBINED_VIEW_TOOLBAR_ITEM_KEY);
            }
            else if (!newVal) {
                _this.visible = false;
                _this.crossFrameEventService.publish(_this.HIDE_TOOLBAR_ITEM_CONTEXT, _this.COMBINED_VIEW_TOOLBAR_ITEM_KEY);
            }
        });
        this.$scope.$watch(function () {
            return _this.personalizationsmarteditContextService.getCombinedView().enabled;
        }, function (newVal, oldVal) {
            if (newVal === false && newVal !== oldVal) {
                _this.personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(_this.personalizationsmarteditContextService);
            }
        });
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent.prototype.clear = function () {
        this.personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(this.personalizationsmarteditContextService);
        var combinedView = this.personalizationsmarteditContextService.getCombinedView();
        var variations = [];
        (combinedView.selectedItems || []).forEach(function (item) {
            variations.push({
                customizationCode: item.customization.code,
                variationCode: item.variation.code,
                catalog: item.variation.catalog,
                catalogVersion: item.variation.catalogVersion
            });
        });
        this.personalizationsmarteditCombinedViewCommonsService.updatePreview(variations);
        this.crossFrameEventService.publish(this.HIDE_TOOLBAR_ITEM_CONTEXT, this.COMBINED_VIEW_TOOLBAR_ITEM_KEY);
    };
    /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditToolbarContextTemplate.html'
        }),
        __metadata("design:paramtypes", [Object, PersonalizationsmarteditCombinedViewCommonsService,
            PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditContextUtils, Object, Object, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent);
    return /* @ngInject */ PersonalizationsmarteditCombinedViewToolbarContextComponent;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent = /** @class */ (function () {
    PersonalizationsmarteditManageCustomizationViewMenuComponent.$inject = ["personalizationsmarteditContextService", "personalizationsmarteditContextUtils", "personalizationsmarteditPreviewService", "personalizationsmarteditManager", "personalizationsmarteditManagerView"];
    function /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent(personalizationsmarteditContextService, personalizationsmarteditContextUtils, personalizationsmarteditPreviewService, personalizationsmarteditManager, personalizationsmarteditManagerView) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditContextUtils = personalizationsmarteditContextUtils;
        this.personalizationsmarteditPreviewService = personalizationsmarteditPreviewService;
        this.personalizationsmarteditManager = personalizationsmarteditManager;
        this.personalizationsmarteditManagerView = personalizationsmarteditManagerView;
    }
    /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent.prototype.createCustomizationClick = function () {
        this.personalizationsmarteditManager.openCreateCustomizationModal();
    };
    /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent.prototype.managerViewClick = function () {
        this.personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(this.personalizationsmarteditContextService);
        this.personalizationsmarteditContextUtils.clearCustomizeContextAndReloadPreview(this.personalizationsmarteditPreviewService, this.personalizationsmarteditContextService);
        this.personalizationsmarteditContextUtils.clearCombinedViewContextAndReloadPreview(this.personalizationsmarteditPreviewService, this.personalizationsmarteditContextService);
        this.personalizationsmarteditManagerView.openManagerAction();
    };
    /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'manageCustomizationViewMenuTemplate.html'
        }),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditContextUtils,
            PersonalizationsmarteditPreviewService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent);
    return /* @ngInject */ PersonalizationsmarteditManageCustomizationViewMenuComponent;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditToolbarContextModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditToolbarContextModule() {
    }
    /* @ngInject */ PersonalizationsmarteditToolbarContextModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                personalizationcommons.PersonalizationsmarteditCommonsModule
            ],
            declarations: [
                PersonalizationsmarteditCustomizeToolbarContextComponent,
                PersonalizationsmarteditCombinedViewToolbarContextComponent,
                PersonalizationsmarteditManageCustomizationViewMenuComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditToolbarContextModule);
    return /* @ngInject */ PersonalizationsmarteditToolbarContextModule;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent = /** @class */ (function () {
    PersonalizationsmarteditSegmentExpressionAsHtmlComponent.$inject = ["personalizationsmarteditTriggerService"];
    function /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent(personalizationsmarteditTriggerService) {
        this.personalizationsmarteditTriggerService = personalizationsmarteditTriggerService;
        this._segmentExpression = {};
        this._operators = ['AND', 'OR', 'NOT'];
        this._emptyGroup = '[]';
        this._emptyGroupAndOperators = this.operators.concat(this.emptyGroup);
    }
    Object.defineProperty(/* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype, "segmentExpression", {
        get: function () {
            return this._segmentExpression;
        },
        set: function (newVal) {
            this._segmentExpression = newVal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(/* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype, "operators", {
        get: function () {
            return this._operators;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(/* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype, "emptyGroup", {
        get: function () {
            return this._emptyGroup;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(/* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype, "emptyGroupAndOperators", {
        get: function () {
            return this._emptyGroupAndOperators;
        },
        enumerable: false,
        configurable: true
    });
    // Methods
    // A segmentExpression parameter can be 'variation.triggers' object or 'segmentExpression' object
    // If variations.triggers is passed it will converted to segmentExpression
    /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype.getExpressionAsArray = function () {
        if (angular.isDefined(this.segmentExpression) && !angular.isDefined(this.segmentExpression.operation)) {
            this.segmentExpression = this.personalizationsmarteditTriggerService.buildData(this.segmentExpression)[0];
        }
        return this.personalizationsmarteditTriggerService.getExpressionAsString(this.segmentExpression).split(" ");
    };
    /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype.getLocalizationKeyForOperator = function (operator) {
        return 'personalization.modal.customizationvariationmanagement.targetgrouptab.expression.' + operator.toLowerCase();
    };
    PersonalizationsmarteditSegmentExpressionAsHtmlComponent.prototype.getLocalizationKeyForOperator.$inject = ["operator"];
    /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditSegmentExpressionAsHtmlTemplate.html',
            inputs: [
                'segmentExpression'
            ]
        }),
        __metadata("design:paramtypes", [Object])
    ], /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent);
    return /* @ngInject */ PersonalizationsmarteditSegmentExpressionAsHtmlComponent;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditSegmentViewComponent = /** @class */ (function () {
    PersonalizationsmarteditSegmentViewComponent.$inject = ["personalizationsmarteditRestService", "personalizationsmarteditMessageHandler", "personalizationsmarteditTriggerService", "personalizationsmarteditUtils", "$timeout", "$translate", "confirmationModalService", "triggerTabService"];
    function /* @ngInject */ PersonalizationsmarteditSegmentViewComponent(personalizationsmarteditRestService, personalizationsmarteditMessageHandler, personalizationsmarteditTriggerService, personalizationsmarteditUtils, $timeout, $translate, confirmationModalService, triggerTabService) {
        var _this = this;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditTriggerService = personalizationsmarteditTriggerService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.$timeout = $timeout;
        this.$translate = $translate;
        this.confirmationModalService = confirmationModalService;
        this.triggerTabService = triggerTabService;
        this.actions = this.personalizationsmarteditTriggerService.actions;
        this.segments = [];
        this.segmentPagination = new personalizationcommons.PaginationHelper({});
        this.treeOptions = {
            dragStart: function () {
                _this.scrollZoneVisible = _this.isScrollZoneVisible();
            },
            dropped: function (e) {
                _this.scrollZoneVisible = false;
                _this.removeDropzoneItem(e.dest.nodesScope.$modelValue);
                _this.$timeout(function () {
                    _this.fixEmptyContainer(_this.expression);
                }, 0);
            },
            dragMove: function (e) {
                _this.highlightedContainer = e.dest.nodesScope.$nodeScope.$modelValue.$$hashKey;
                if (_this.isScrollZoneVisible() !== _this.scrollZoneVisible) {
                    _this.scrollZoneVisible = _this.isScrollZoneVisible();
                }
                else if (Math.abs(_this.elementToScrollHeight - _this.elementToScroll.get(0).scrollHeight) > 10) {
                    _this.elementToScrollHeight = _this.elementToScroll.get(0).scrollHeight;
                    _this.scrollZoneVisible = false;
                }
            }
        };
        this.moreSegmentRequestProcessing = false;
        this.dropzoneItem = {
            type: 'dropzone'
        };
        this.initExpression = [{
                type: 'container',
                operation: this.actions[0],
                nodes: [this.dropzoneItem]
            }];
        this.segmentFilter = {
            code: ''
        };
        this.elementToDuplicate = null;
        this._elementToScrollHeight = 0;
        this.segmentPagination.reset();
    }
    Object.defineProperty(/* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype, "elementToScrollHeight", {
        get: function () {
            return this._elementToScrollHeight;
        },
        set: function (newVal) {
            this._elementToScrollHeight = newVal;
        },
        enumerable: false,
        configurable: true
    });
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.$onInit = function () {
        var triggerDataState = this.triggerTabService.getTriggerDataState();
        this.triggers = this.triggers || (triggerDataState.selectedVariation || {}).triggers;
        this.expression = this.expression || triggerDataState.expression;
        if (this.triggers && this.triggers.length > 0) {
            this.expression = this.personalizationsmarteditTriggerService.buildData(this.triggers);
        }
        else {
            this.expression = angular.copy(this.initExpression);
        }
        this.fixEmptyContainer(this.expression);
        triggerDataState.expression = this.expression;
        this.elementToScroll = angular.element(".se-slider-panel__body");
    };
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.getElementToScroll = function () {
        return this.elementToScroll;
    };
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.removeItem = function (scope) {
        var _this = this;
        if (this.personalizationsmarteditTriggerService.isNotEmptyContainer(scope.$modelValue) && !this.isContainerWithDropzone(scope.$modelValue)) {
            this.confirmationModalService.confirm({
                description: this.$translate.instant('personalization.modal.customizationvariationmanagement.targetgrouptab.segments.removecontainerconfirmation')
            }).then(function () {
                scope.remove();
                _this.$timeout(function () {
                    _this.fixEmptyContainer(_this.expression);
                }, 0);
            });
        }
        else {
            scope.remove();
            this.$timeout(function () {
                _this.fixEmptyContainer(_this.expression);
            }, 0);
        }
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.removeItem.$inject = ["scope"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.duplicateItem = function (elementToDuplicate) {
        this.elementToDuplicate = elementToDuplicate;
        this.expression[0].nodes.some(this.findElementAndDuplicate, this);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.duplicateItem.$inject = ["elementToDuplicate"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.toggle = function (scope) {
        scope.toggle();
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.toggle.$inject = ["scope"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.newSubItem = function (scope, type) {
        var nodeData = scope.$modelValue;
        this.removeDropzoneItem(nodeData.nodes);
        nodeData.nodes.unshift({
            type: type,
            operation: (type === 'item' ? '' : this.actions[0]),
            nodes: [this.dropzoneItem]
        });
        scope.expand();
        this.$timeout(function () {
            var childArray = scope.childNodes();
            childArray[0].expand();
        }, 0);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.newSubItem.$inject = ["scope", "type"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.segmentSearchInputKeypress = function (keyEvent, searchObj) {
        if (keyEvent && ([37, 38, 39, 40].indexOf(keyEvent.which) > -1)) { // keyleft, keyup, keyright, keydown
            return;
        }
        this.segmentPagination.reset();
        this.segmentFilter.code = searchObj;
        this.segments.length = 0;
        this.addMoreSegmentItems();
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.segmentSearchInputKeypress.$inject = ["keyEvent", "searchObj"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.segmentSelectedEvent = function (item) {
        if (!item) {
            return;
        }
        this.expression[0].nodes.unshift({
            type: 'item',
            operation: '',
            selectedSegment: item,
            nodes: []
        });
        this.singleSegment = null;
        this.highlightedContainer = this.expression[0].$$hashKey;
        this.removeDropzoneItem(this.expression[0].nodes);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.segmentSelectedEvent.$inject = ["item"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.addMoreSegmentItems = function () {
        var _this = this;
        if (this.segmentPagination.getPage() < this.segmentPagination.getTotalPages() - 1 && !this.moreSegmentRequestProcessing) {
            this.moreSegmentRequestProcessing = true;
            this.personalizationsmarteditRestService.getSegments(this.getSegmentsFilterObject()).then(function (response) {
                _this.personalizationsmarteditUtils.uniqueArray(_this.segments, response.segments || []);
                _this.segmentPagination = new personalizationcommons.PaginationHelper(response.pagination);
                _this.moreSegmentRequestProcessing = false;
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingsegments'));
                _this.moreSegmentRequestProcessing = false;
            });
        }
    };
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isTopContainer = function (element) {
        return angular.equals(this.expression[0], element.node);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isTopContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isContainerWithDropzone = function (element) {
        return this.isContainer(element) && element.nodes.length === 1 && this.isDropzone(element.nodes[0]);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isContainerWithDropzone.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isItem = function (element) {
        return this.personalizationsmarteditTriggerService.isItem(element);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isItem.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isDropzone = function (element) {
        return this.personalizationsmarteditTriggerService.isDropzone(element);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isDropzone.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isContainer = function (element) {
        return this.personalizationsmarteditTriggerService.isContainer(element);
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.getSegmentsFilterObject = function () {
        return {
            code: this.segmentFilter.code,
            pageSize: this.segmentPagination.getCount(),
            currentPage: this.segmentPagination.getPage() + 1
        };
    };
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.findElementAndDuplicate = function (element, index, array) {
        // 'this' is additional argument passed to function so in this case it is the component's 'this'
        if (this.elementToDuplicate === element) {
            array.splice(index, 0, angular.copy(this.elementToDuplicate));
            return true;
        }
        if (this.isContainer(element)) {
            element.nodes.some(this.findElementAndDuplicate, this); // recursive call to check all sub containers
        }
        return false;
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.findElementAndDuplicate.$inject = ["element", "index", "array"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.removeDropzoneItem = function (nodes) {
        var _this = this;
        nodes.forEach(function (element, index, array) {
            if (_this.isDropzone(element)) {
                array.splice(index, 1);
            }
        });
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.removeDropzoneItem.$inject = ["nodes"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.fixEmptyContainer = function (nodes) {
        var _this = this;
        nodes.forEach(function (element) {
            if (_this.isEmptyContainer(element)) {
                element.nodes.push(_this.dropzoneItem);
            }
            if (_this.isContainer(element)) {
                _this.fixEmptyContainer(element.nodes);
            }
        });
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.fixEmptyContainer.$inject = ["nodes"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isScrollZoneVisible = function () {
        return this.elementToScroll.get(0).scrollHeight > this.elementToScroll.get(0).clientHeight;
    };
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent.prototype.isEmptyContainer = function (element) {
        return this.isContainer(element) && element.nodes.length === 0;
    };
    PersonalizationsmarteditSegmentViewComponent.prototype.isEmptyContainer.$inject = ["element"];
    /* @ngInject */ PersonalizationsmarteditSegmentViewComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationsmarteditSegmentViewTemplate.html',
            inputs: [
                'triggers',
                'expression'
            ]
        }),
        __metadata("design:paramtypes", [PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditMessageHandler, Object, personalizationcommons.PersonalizationsmarteditUtils, Object, Function, Object, TriggerTabService])
    ], /* @ngInject */ PersonalizationsmarteditSegmentViewComponent);
    return /* @ngInject */ PersonalizationsmarteditSegmentViewComponent;
}());

/* @internal */
var PersonalizationsmarteditCommerceCustomizationViewControllerFactory = function (customization, variation) {
    /* @ngInject */
    var PersonalizationsmarteditCommerceCustomizationViewController = /** @class */ (function () {
        PersonalizationsmarteditCommerceCustomizationViewController.$inject = ["$scope", "$translate", "$q", "actionsDataFactory", "personalizationsmarteditRestService", "personalizationsmarteditMessageHandler", "systemEventService", "personalizationsmarteditCommerceCustomizationService", "personalizationsmarteditContextService", "personalizationsmarteditUtils", "confirmationModalService", "PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES", "modalManager", "$log"];
        function PersonalizationsmarteditCommerceCustomizationViewController($scope, $translate, $q, actionsDataFactory, personalizationsmarteditRestService, personalizationsmarteditMessageHandler, systemEventService, personalizationsmarteditCommerceCustomizationService, personalizationsmarteditContextService, personalizationsmarteditUtils, confirmationModalService, PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES, modalManager, $log) {
            var _this = this;
            this.$scope = $scope;
            this.$translate = $translate;
            this.$q = $q;
            this.actionsDataFactory = actionsDataFactory;
            this.personalizationsmarteditRestService = personalizationsmarteditRestService;
            this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
            this.systemEventService = systemEventService;
            this.personalizationsmarteditCommerceCustomizationService = personalizationsmarteditCommerceCustomizationService;
            this.personalizationsmarteditContextService = personalizationsmarteditContextService;
            this.personalizationsmarteditUtils = personalizationsmarteditUtils;
            this.confirmationModalService = confirmationModalService;
            this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES = PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES;
            this.modalManager = modalManager;
            this.$log = $log;
            this.availableTypes = [];
            this.select = {};
            this.isItemInSelectedActions = function (action, comparer) {
                return _this.actionsDataFactory.isItemInSelectedActions(action, comparer);
            };
            this.removeSelectedAction = function (actionWrapper) {
                var index = _this.$scope.actions.indexOf(actionWrapper);
                if (index < 0) {
                    return;
                }
                var removed = _this.$scope.actions.splice(index, 1);
                // only old item should be added to delete queue
                // new items are just deleted
                if (removed[0].status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.OLD ||
                    removed[0].status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.UPDATE) {
                    removed[0].status = _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.DELETE;
                    _this.removedActions.push(removed[0]);
                }
            };
            // This function requires two parameters
            // action to be added
            // and comparer = function(action,action) for defining if two actions are identical
            // comparer is used
            this.addAction = function (action, comparer) {
                _this.actionsDataFactory.addAction(action, comparer);
            };
            this.displayAction = function (actionWrapper) {
                var action = actionWrapper.action;
                var type = _this.getType(action.type);
                if (type.getName) {
                    return type.getName(action);
                }
                else {
                    return action.code;
                }
            };
            this.getActionsToDisplay = function () {
                return _this.actionsDataFactory.getActions();
            };
            this.populateActions = function () {
                _this.personalizationsmarteditRestService.getActions(_this.$scope.customization.code, _this.$scope.variation.code, {})
                    .then(function (response) {
                    var actions = response.actions.filter(function (elem) {
                        return elem.type !== 'cxCmsActionData';
                    }).map(function (item) {
                        return {
                            code: item.code,
                            action: item,
                            status: _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.OLD
                        };
                    });
                    _this.actionsDataFactory.resetActions();
                    _this.personalizationsmarteditUtils.uniqueArray(_this.actionsDataFactory.actions, actions || []);
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingactions'));
                });
            };
            this.getType = function (type) {
                for (var _i = 0, _a = _this.availableTypes; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.type === type) {
                        return item;
                    }
                }
                return {};
            };
            this.sendRefreshEvent = function () {
                _this.systemEventService.publishAsync('CUSTOMIZATIONS_MODIFIED', {});
            };
            this.dismissModalCallback = function () {
                if (_this.isDirty()) {
                    return _this.confirmationModalService.confirm({
                        description: 'personalization.modal.commercecustomization.cancelconfirmation'
                    }).then(function () {
                        return _this.$q.resolve();
                    }, function () {
                        return _this.$q.reject();
                    });
                }
                else {
                    return _this.$q.resolve();
                }
            };
            this.isDirty = function () {
                var dirty = false;
                // dirty if at least one new
                _this.$scope.actions.forEach(function (wrapper) {
                    dirty = dirty || wrapper.status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.NEW ||
                        wrapper.status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.UPDATE;
                });
                // or one deleted
                dirty = dirty || _this.removedActions.length > 0;
                return dirty;
            };
            // modal buttons
            this.onSave = function () {
                var createData = {
                    actions: _this.$scope.actions.filter(function (item) {
                        return item.status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.NEW;
                    }).map(function (item) {
                        return item.action;
                    })
                };
                var deleteData = _this.removedActions.filter(function (item) {
                    return item.status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.DELETE;
                }).map(function (item) {
                    return item.action.code;
                });
                var updateData = {
                    actions: _this.$scope.actions.filter(function (item) {
                        return item.status === _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.UPDATE;
                    }).map(function (item) {
                        return item.action;
                    })
                };
                var shouldCreate = createData.actions.length > 0;
                var shouldDelete = deleteData.length > 0;
                var shouldUpdate = updateData.actions.length > 0;
                (function () {
                    if (shouldCreate) {
                        return _this.createActions(_this.$scope.customization.code, _this.$scope.variation.code, createData);
                    }
                    else {
                        return _this.$q.resolve();
                    }
                })().then(function (respCreate) {
                    (function () {
                        if (shouldDelete) {
                            return _this.deleteActions(_this.$scope.customization.code, _this.$scope.variation.code, deleteData);
                        }
                        else {
                            return _this.$q.resolve();
                        }
                    })().then(function (respDelete) {
                        if (shouldUpdate) {
                            _this.updateActions(_this.$scope.customization.code, _this.$scope.variation.code, updateData, respCreate, respDelete);
                        }
                    });
                });
            };
            // customization and variation status helper functions
            this.getActionTypesForActions = function (actions) {
                return actions.map(function (a) {
                    return a.type;
                }).filter(function (item, index, arr) {
                    // removes duplicates from mapped array
                    return arr.indexOf(item) === index;
                }).map(function (typeCode) {
                    return _this.availableTypes.filter(function (availableType) {
                        return availableType.type === typeCode;
                    })[0];
                });
            };
            this.createActions = function (customizationCode, variationCode, createData) {
                var deferred = _this.$q.defer();
                _this.personalizationsmarteditRestService.createActions(customizationCode, variationCode, createData, {})
                    .then(function (response) {
                    _this.personalizationsmarteditMessageHandler.sendSuccess(_this.$translate.instant('personalization.info.creatingaction'));
                    _this.sendRefreshEvent();
                    deferred.resolve(response);
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.creatingaction'));
                    deferred.reject();
                });
                return deferred.promise;
            };
            this.deleteActions = function (customizationCode, variationCode, deleteData) {
                var deferred = _this.$q.defer();
                _this.personalizationsmarteditRestService.deleteActions(customizationCode, variationCode, deleteData, {})
                    .then(function (response) {
                    _this.personalizationsmarteditMessageHandler.sendSuccess(_this.$translate.instant('personalization.info.removingaction'));
                    _this.sendRefreshEvent();
                    deferred.resolve(response);
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.removingaction'));
                    deferred.resolve();
                });
                return deferred.promise;
            };
            this.updateActions = function (customizationCode, variationCode, updateData, respCreate, respDelete) {
                var updateTypes = _this.getActionTypesForActions(updateData.actions);
                updateTypes.forEach(function (type) {
                    if (type.updateActions) {
                        var actionsForType = updateData.actions.filter(function (a) {
                            return _this.getType(a.type) === type;
                        });
                        type.updateActions(customizationCode, variationCode, actionsForType, respCreate, respDelete)
                            .then(function () {
                            _this.personalizationsmarteditMessageHandler.sendSuccess(_this.$translate.instant('personalization.info.updatingactions'));
                            _this.sendRefreshEvent();
                        }, function () {
                            _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.updatingactions'));
                        });
                    }
                    else {
                        _this.$log.debug(_this.$translate.instant('personalization.error.noupdatingactions'));
                    }
                });
            };
            this.availableTypes = this.personalizationsmarteditCommerceCustomizationService.getAvailableTypes(this.personalizationsmarteditContextService.getSeData().seConfigurationData);
            this.select = {
                type: this.availableTypes[0]
            };
            this.$scope.customization = customization;
            this.$scope.variation = variation;
            this.actionsDataFactory.resetActions();
            this.actionsDataFactory.resetRemovedActions();
            this.$scope.actions = this.actionsDataFactory.getActions();
            this.removedActions = this.actionsDataFactory.getRemovedActions();
            this.customizationStatusText = this.personalizationsmarteditUtils.getEnablementTextForCustomization(this.$scope.customization, 'personalization.modal.commercecustomization');
            this.variationStatusText = this.personalizationsmarteditUtils.getEnablementTextForVariation(this.$scope.variation, 'personalization.modal.commercecustomization');
            this.customizationStatus = this.personalizationsmarteditUtils.getActivityStateForCustomization(this.$scope.customization);
            this.variationStatus = this.personalizationsmarteditUtils.getActivityStateForVariation(this.$scope.customization, this.$scope.variation);
            this.init = function () {
                _this.$scope.isItemInSelectedActions = _this.isItemInSelectedActions;
                _this.$scope.removeSelectedAction = _this.removeSelectedAction;
                _this.$scope.addAction = _this.addAction;
                _this.populateActions();
                _this.$scope.$watch('actions', function () {
                    if (_this.isDirty()) {
                        _this.modalManager.enableButton("confirmSave");
                    }
                    else {
                        _this.modalManager.disableButton("confirmSave");
                    }
                }, true);
                _this.modalManager.setButtonHandler(function (buttonId) {
                    if (buttonId === 'confirmSave') {
                        _this.onSave();
                    }
                    else if (buttonId === 'confirmCancel') {
                        return _this.dismissModalCallback();
                    }
                });
                _this.modalManager.setDismissCallback(function () {
                    return _this.dismissModalCallback();
                });
            };
        }
        return PersonalizationsmarteditCommerceCustomizationViewController;
    }());
    return PersonalizationsmarteditCommerceCustomizationViewController;
};

var /* @ngInject */ PersonalizationsmarteditCommerceCustomizationView = /** @class */ (function () {
    PersonalizationsmarteditCommerceCustomizationView.$inject = ["modalService", "MODAL_BUTTON_ACTIONS", "MODAL_BUTTON_STYLES"];
    function /* @ngInject */ PersonalizationsmarteditCommerceCustomizationView(modalService, MODAL_BUTTON_ACTIONS, MODAL_BUTTON_STYLES) {
        var _this = this;
        this.modalService = modalService;
        this.MODAL_BUTTON_ACTIONS = MODAL_BUTTON_ACTIONS;
        this.MODAL_BUTTON_STYLES = MODAL_BUTTON_STYLES;
        this.openCommerceCustomizationAction = function (customization, variation) {
            _this.modalService.open({
                title: "personalization.modal.commercecustomization.title",
                templateUrl: 'personalizationsmarteditCommerceCustomizationViewTemplate.html',
                controller: PersonalizationsmarteditCommerceCustomizationViewControllerFactory(customization, variation),
                buttons: [{
                        id: 'confirmCancel',
                        label: 'personalization.modal.commercecustomization.button.cancel',
                        style: _this.MODAL_BUTTON_STYLES.SECONDARY,
                        action: _this.MODAL_BUTTON_ACTIONS.CLOSE
                    }, {
                        id: 'confirmSave',
                        label: 'personalization.modal.commercecustomization.button.submit',
                        action: _this.MODAL_BUTTON_ACTIONS.CLOSE
                    }]
            }).then(function () {
                // success
            }, function () {
                // error
            });
        };
    }
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationView = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smarteditcommons.IModalService, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditCommerceCustomizationView);
    return /* @ngInject */ PersonalizationsmarteditCommerceCustomizationView;
}());

var PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES_PROVIDER = {
    provide: "PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES",
    useValue: {
        OLD: 'old',
        NEW: 'new',
        DELETE: 'delete',
        UPDATE: 'update'
    }
};
var /* @ngInject */ ActionsDataFactory = /** @class */ (function () {
    ActionsDataFactory.$inject = ["PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES"];
    function /* @ngInject */ ActionsDataFactory(PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES) {
        var _this = this;
        this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES = PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES;
        this.actions = [];
        this.removedActions = [];
        this.getActions = function () {
            return _this.actions;
        };
        this.getRemovedActions = function () {
            return _this.removedActions;
        };
        this.resetActions = function () {
            _this.actions.length = 0;
        };
        this.resetRemovedActions = function () {
            _this.removedActions.length = 0;
        };
        // This function requires two parameters
        // action to be added
        // and comparer = function(action,action) for defining if two actions are identical
        // comparer is used
        this.addAction = function (action, comparer) {
            var exist = false;
            _this.actions.forEach(function (wrapper) {
                exist = exist || comparer(action, wrapper.action);
            });
            if (!exist) {
                var status_1 = _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.NEW;
                var removedIndex_1 = -1;
                _this.removedActions.forEach(function (wrapper, index) {
                    if (comparer(action, wrapper.action)) {
                        removedIndex_1 = index;
                    }
                });
                if (removedIndex_1 >= 0) { // we found or action in delete queue
                    status_1 = _this.PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES.OLD;
                    _this.removedActions.splice(removedIndex_1, 1);
                }
                _this.actions.push({
                    action: action,
                    status: status_1
                });
            }
        };
        this.isItemInSelectedActions = function (action, comparer) {
            return _this.actions.find(function (wrapper) {
                return comparer(action, wrapper.action);
            });
        };
    }
    /* @ngInject */ ActionsDataFactory = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object])
    ], /* @ngInject */ ActionsDataFactory);
    return /* @ngInject */ ActionsDataFactory;
}());

var /* @ngInject */ PersonalizationsmarteditCommerceCustomizationModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditCommerceCustomizationModule() {
    }
    /* @ngInject */ PersonalizationsmarteditCommerceCustomizationModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'modalServiceModule',
                'smarteditCommonsModule',
                'confirmationModalServiceModule',
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule,
            ],
            providers: [
                PersonalizationsmarteditCommerceCustomizationView,
                ActionsDataFactory,
                PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES_PROVIDER
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditCommerceCustomizationModule);
    return /* @ngInject */ PersonalizationsmarteditCommerceCustomizationModule;
}());

/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var /* @ngInject */ PersonalizationsmarteditSegmentViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditSegmentViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditSegmentViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'modalServiceModule',
                'confirmationModalServiceModule',
                'ui.tree',
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule,
                PersonalizationsmarteditManagementModule,
                PersonalizationsmarteditCommerceCustomizationModule,
                PersonalizationsmarteditManageCustomizationViewModule
            ],
            declarations: [
                PersonalizationsmarteditSegmentViewComponent,
                PersonalizationsmarteditSegmentExpressionAsHtmlComponent
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditSegmentViewModule);
    return /* @ngInject */ PersonalizationsmarteditSegmentViewModule;
}());

var /* @ngInject */ PersonalizationsmarteditManagerViewUtilsService = /** @class */ (function () {
    PersonalizationsmarteditManagerViewUtilsService.$inject = ["personalizationsmarteditRestService", "personalizationsmarteditMessageHandler", "personalizationsmarteditCommerceCustomizationService", "PERSONALIZATION_MODEL_STATUS_CODES", "waitDialogService", "confirmationModalService", "$translate"];
    function /* @ngInject */ PersonalizationsmarteditManagerViewUtilsService(personalizationsmarteditRestService, personalizationsmarteditMessageHandler, personalizationsmarteditCommerceCustomizationService, PERSONALIZATION_MODEL_STATUS_CODES, waitDialogService, confirmationModalService, $translate) {
        var _this = this;
        this.personalizationsmarteditRestService = personalizationsmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditCommerceCustomizationService = personalizationsmarteditCommerceCustomizationService;
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.waitDialogService = waitDialogService;
        this.confirmationModalService = confirmationModalService;
        this.$translate = $translate;
        this.deleteCustomizationAction = function (customization, customizations) {
            _this.confirmationModalService.confirm({
                description: 'personalization.modal.manager.deletecustomization.content'
            }).then(function () {
                _this.personalizationsmarteditRestService.getCustomization(customization)
                    .then(function (responseCustomization) {
                    responseCustomization.status = "DELETED";
                    _this.personalizationsmarteditRestService.updateCustomization(responseCustomization)
                        .then(function () {
                        customizations.splice(customizations.indexOf(customization), 1);
                    }, function () {
                        _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.deletingcustomization'));
                    });
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.deletingcustomization'));
                });
            });
        };
        this.deleteVariationAction = function (customization, variation) {
            _this.confirmationModalService.confirm({
                description: 'personalization.modal.manager.deletevariation.content'
            }).then(function () {
                _this.personalizationsmarteditRestService.getVariation(customization.code, variation.code)
                    .then(function (responseVariation) {
                    responseVariation.status = "DELETED";
                    _this.personalizationsmarteditRestService.editVariation(customization.code, responseVariation)
                        .then(function (response) {
                        variation.status = response.status;
                    }, function () {
                        _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.deletingvariation'));
                    });
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.deletingvariation'));
                });
            });
        };
        this.toogleVariationActive = function (customization, variation) {
            _this.personalizationsmarteditRestService.getVariation(customization.code, variation.code)
                .then(function (responseVariation) {
                responseVariation.enabled = !responseVariation.enabled;
                responseVariation.status = responseVariation.enabled ? _this.PERSONALIZATION_MODEL_STATUS_CODES.ENABLED : _this.PERSONALIZATION_MODEL_STATUS_CODES.DISABLED;
                _this.personalizationsmarteditRestService.editVariation(customization.code, responseVariation)
                    .then(function (response) {
                    variation.enabled = response.enabled;
                    variation.status = response.status;
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.editingvariation'));
                });
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingvariation'));
            });
        };
        this.customizationClickAction = function (customization) {
            return _this.personalizationsmarteditRestService.getVariationsForCustomization(customization.code, customization).then(function (response) {
                customization.variations.forEach(function (variation) {
                    variation.actions = _this.getActionsForVariation(variation.code, response.variations);
                    variation.numberOfComponents = _this.personalizationsmarteditCommerceCustomizationService.getNonCommerceActionsCount(variation);
                    variation.commerceCustomizations = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCountMap(variation);
                    variation.numberOfCommerceActions = _this.personalizationsmarteditCommerceCustomizationService.getCommerceActionsCount(variation);
                });
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcustomization'));
            });
        };
        this.getCustomizations = function (filter) {
            return _this.personalizationsmarteditRestService.getCustomizations(filter);
        };
        this.updateCustomizationRank = function (customizationCode, increaseValue) {
            return _this.personalizationsmarteditRestService.updateCustomizationRank(customizationCode, increaseValue)
                .then(function () {
                // 
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.updatingcustomization'));
            });
        };
        this.updateVariationRank = function (customization, variationCode, increaseValue) {
            return _this.personalizationsmarteditRestService.getVariation(customization.code, variationCode)
                .then(function (responseVariation) {
                responseVariation.rank = responseVariation.rank + increaseValue;
                return _this.personalizationsmarteditRestService.editVariation(customization.code, responseVariation)
                    .then(function () {
                    // 
                }, function () {
                    _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.editingvariation'));
                });
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingvariation'));
            });
        };
        this.setCustomizationRank = function (customization, increaseValue, customizations) {
            var nextItem = customizations[customizations.indexOf(customization) + increaseValue];
            _this.waitDialogService.showWaitModal();
            _this.updateCustomizationRank(customization.code, nextItem.rank - customization.rank)
                .then(function () {
                customization.rank += increaseValue;
                nextItem.rank -= increaseValue;
                var index = customizations.indexOf(customization);
                var tempItem = customizations.splice(index, 1);
                customizations.splice(index + increaseValue, 0, tempItem[0]);
                _this.waitDialogService.hideWaitModal();
            }).catch(function () {
                _this.waitDialogService.hideWaitModal();
            });
        };
        this.setVariationRank = function (customization, variation, increaseValue) {
            var nextItem = customization.variations[customization.variations.indexOf(variation) + increaseValue];
            _this.waitDialogService.showWaitModal();
            _this.updateVariationRank(customization, variation.code, increaseValue)
                .then(function () {
                variation.rank += increaseValue;
                nextItem.rank -= increaseValue;
                var index = customization.variations.indexOf(variation);
                var tempItem = customization.variations.splice(index, 1);
                customization.variations.splice(index + increaseValue, 0, tempItem[0]);
            }).finally(function () {
                _this.waitDialogService.hideWaitModal();
            });
        };
        this.getActionsForVariation = function (variationCode, variationsArray) {
            variationsArray = variationsArray || [];
            var variation = variationsArray.filter(function (elem) {
                return variationCode === elem.code;
            })[0];
            return variation ? variation.actions : [];
        };
    }
    /* @ngInject */ PersonalizationsmarteditManagerViewUtilsService = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [PersonalizationsmarteditRestService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            personalizationcommons.PersonalizationsmarteditCommerceCustomizationService, Object, Object, Object, Function])
    ], /* @ngInject */ PersonalizationsmarteditManagerViewUtilsService);
    return /* @ngInject */ PersonalizationsmarteditManagerViewUtilsService;
}());

var /* @ngInject */ PersonalizationsmarteditManagerViewController = /** @class */ (function () {
    PersonalizationsmarteditManagerViewController.$inject = ["$scope", "$translate", "$q", "lodash", "personalizationsmarteditManagerViewUtilsService", "personalizationsmarteditMessageHandler", "personalizationsmarteditContextService", "personalizationsmarteditUtils", "personalizationsmarteditManager", "personalizationsmarteditCommerceCustomizationService", "personalizationsmarteditCommerceCustomizationView", "personalizationsmarteditDateUtils", "PERSONALIZATION_VIEW_STATUS_MAPPING_CODES", "PERSONALIZATION_MODEL_STATUS_CODES", "waitDialogService", "$timeout", "systemEventService"];
    function /* @ngInject */ PersonalizationsmarteditManagerViewController($scope, $translate, $q, lodash, personalizationsmarteditManagerViewUtilsService, personalizationsmarteditMessageHandler, personalizationsmarteditContextService, personalizationsmarteditUtils, personalizationsmarteditManager, personalizationsmarteditCommerceCustomizationService, personalizationsmarteditCommerceCustomizationView, personalizationsmarteditDateUtils, PERSONALIZATION_VIEW_STATUS_MAPPING_CODES, PERSONALIZATION_MODEL_STATUS_CODES, waitDialogService, $timeout, systemEventService) {
        var _this = this;
        this.$scope = $scope;
        this.$translate = $translate;
        this.$q = $q;
        this.lodash = lodash;
        this.personalizationsmarteditManagerViewUtilsService = personalizationsmarteditManagerViewUtilsService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
        this.personalizationsmarteditManager = personalizationsmarteditManager;
        this.personalizationsmarteditCommerceCustomizationService = personalizationsmarteditCommerceCustomizationService;
        this.personalizationsmarteditCommerceCustomizationView = personalizationsmarteditCommerceCustomizationView;
        this.personalizationsmarteditDateUtils = personalizationsmarteditDateUtils;
        this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES = PERSONALIZATION_VIEW_STATUS_MAPPING_CODES;
        this.PERSONALIZATION_MODEL_STATUS_CODES = PERSONALIZATION_MODEL_STATUS_CODES;
        this.waitDialogService = waitDialogService;
        this.$timeout = $timeout;
        this.systemEventService = systemEventService;
        this.state = {
            uncollapsedCustomizations: []
        };
        this.searchInputKeypress = function (keyEvent) {
            if (keyEvent.which === 13 || _this.search.name.length > 2 || _this.search.name.length === 0) {
                _this.refreshGrid();
            }
        };
        this.addMoreItems = function () {
            if (_this.pagination.getPage() < _this.pagination.getTotalPages() - 1 && !_this.moreCustomizationsRequestProcessing) {
                _this.moreCustomizationsRequestProcessing = true;
                _this.getCustomizations(_this.getCustomizationsFilterObject());
            }
        };
        this.getElementToScroll = function () {
            return _this.$scope.scrollZoneElement.children();
        };
        this.setScrollZoneElement = function (element) {
            _this.$scope.scrollZoneElement = element;
        };
        this.openNewModal = function () {
            _this.personalizationsmarteditManager.openCreateCustomizationModal();
        };
        this.isSearchGridHeaderHidden = function () {
            return _this.$scope.scrollZoneElement.children().scrollTop() >= 120;
        };
        this.scrollZoneReturnToTop = function () {
            _this.$scope.scrollZoneElement.children().animate({
                scrollTop: 0
            }, 500);
        };
        this.isReturnToTopButtonVisible = function () {
            return _this.$scope.scrollZoneElement.children().scrollTop() > 50;
        };
        this.isFilterEnabled = function () {
            return _this.search.name !== '' || _this.search.status !== _this.getDefaultStatus();
        };
        this.setCustomizationRank = function (customization, increaseValue) {
            _this.personalizationsmarteditManagerViewUtilsService.setCustomizationRank(customization, increaseValue, _this.customizations);
        };
        this.setVariationRank = function (customization, variation, increaseValue) {
            _this.personalizationsmarteditManagerViewUtilsService.setVariationRank(customization, variation, increaseValue);
        };
        this.refreshGrid = function () {
            _this.pagination.reset();
            _this.customizations.length = 0;
            _this.addMoreItems();
        };
        this.editCustomizationAction = function (customization) {
            _this.personalizationsmarteditManager.openEditCustomizationModal(customization.code, null);
        };
        this.editVariationAction = function (customization, variation) {
            _this.personalizationsmarteditManager.openEditCustomizationModal(customization.code, variation.code);
        };
        this.deleteCustomizationAction = function (customization) {
            _this.personalizationsmarteditManagerViewUtilsService.deleteCustomizationAction(customization, _this.customizations);
        };
        this.isCommerceCustomizationEnabled = function () {
            return _this.personalizationsmarteditCommerceCustomizationService.isCommerceCustomizationEnabled(_this.personalizationsmarteditContextService.getSeData().seConfigurationData);
        };
        this.manageCommerceCustomization = function (customization, variation) {
            _this.personalizationsmarteditCommerceCustomizationView.openCommerceCustomizationAction(customization, variation);
        };
        this.isDeleteVariationEnabled = function (customization) {
            return _this.personalizationsmarteditUtils.getVisibleItems(customization.variations).length > 1;
        };
        this.deleteVariationAction = function (customization, variation, $event) {
            if (_this.isDeleteVariationEnabled(customization)) {
                _this.personalizationsmarteditManagerViewUtilsService.deleteVariationAction(customization, variation);
            }
            else {
                $event.stopPropagation();
            }
        };
        this.toogleVariationActive = function (customization, variation) {
            _this.personalizationsmarteditManagerViewUtilsService.toogleVariationActive(customization, variation);
        };
        this.customizationClickAction = function (customization) {
            _this.personalizationsmarteditManagerViewUtilsService.customizationClickAction(customization);
        };
        this.hasCommerceActions = function (variation) {
            return _this.personalizationsmarteditUtils.hasCommerceActions(variation);
        };
        this.getCommerceCustomizationTooltip = function (variation) {
            return _this.personalizationsmarteditUtils.getCommerceCustomizationTooltipHTML(variation);
        };
        this.getFormattedDate = function (myDate) {
            if (myDate) {
                return _this.personalizationsmarteditDateUtils.formatDate(myDate, null);
            }
            else {
                return "";
            }
        };
        this.getEnablementTextForCustomization = function (customization) {
            return _this.personalizationsmarteditUtils.getEnablementTextForCustomization(customization, 'personalization.modal.manager');
        };
        this.getEnablementTextForVariation = function (variation) {
            return _this.personalizationsmarteditUtils.getEnablementTextForVariation(variation, 'personalization.modal.manager');
        };
        this.getEnablementActionTextForVariation = function (variation) {
            return _this.personalizationsmarteditUtils.getEnablementActionTextForVariation(variation, 'personalization.modal.manager');
        };
        this.getActivityStateForCustomization = function (customization) {
            return _this.personalizationsmarteditUtils.getActivityStateForCustomization(customization);
        };
        this.getActivityStateForVariation = function (customization, variation) {
            return _this.personalizationsmarteditUtils.getActivityStateForVariation(customization, variation);
        };
        this.allCustomizationsCollapsed = function () {
            return _this.customizations.map(function (elem) {
                return elem.isCollapsed;
            }).reduce(function (previousValue, currentValue) {
                return previousValue && currentValue;
            }, true);
        };
        this.statusNotDeleted = function (variation) {
            return _this.personalizationsmarteditUtils.isItemVisible(variation);
        };
        this.initCustomization = function (customization) {
            if (_this.state.uncollapsedCustomizations.includes(customization.code)) {
                customization.isCollapsed = false;
                _this.customizationClickAction(customization);
            }
            else {
                customization.isCollapsed = true;
            }
        };
        this.customizationCollapseAction = function (customization) {
            customization.isCollapsed = !customization.isCollapsed;
            if (customization.isCollapsed === false) {
                _this.state.uncollapsedCustomizations.push(customization.code);
            }
            else {
                _this.state.uncollapsedCustomizations.splice(_this.state.uncollapsedCustomizations.indexOf(customization.code), 1);
            }
        };
        this.getPage = function () {
            _this.addMoreItems();
        };
        this.isScrollZoneVisible = function () {
            return _this.$scope.scrollZoneElement.children().get(0).scrollHeight > _this.$scope.scrollZoneElement.children().get(0).clientHeight;
        };
        this.getCustomizations = function (filter) {
            _this.personalizationsmarteditManagerViewUtilsService.getCustomizations(filter)
                .then(function (response) {
                _this.personalizationsmarteditUtils.uniqueArray(_this.customizations, response.customizations || []);
                _this.$scope.filteredCustomizationsCount = response.pagination.totalCount;
                _this.pagination = new personalizationcommons.PaginationHelper(response.pagination);
                _this.moreCustomizationsRequestProcessing = false;
            }, function () {
                _this.personalizationsmarteditMessageHandler.sendError(_this.$translate.instant('personalization.error.gettingcustomizations'));
                _this.moreCustomizationsRequestProcessing = false;
            });
        };
        this.getCustomizationsFilterObject = function () {
            return {
                active: "all",
                name: _this.search.name,
                currentSize: _this.pagination.getCount(),
                currentPage: _this.pagination.getPage() + 1,
                statuses: _this.search.status.modelStatuses
            };
        };
        this.getDefaultStatus = function () {
            return _this.statuses.filter(function (elem) {
                return elem.code === _this.PERSONALIZATION_VIEW_STATUS_MAPPING_CODES.ALL;
            })[0];
        };
        this.updateCustomizationRank = function (customizationCode, increaseValue) {
            return _this.personalizationsmarteditManagerViewUtilsService.updateCustomizationRank(customizationCode, increaseValue);
        };
        this.updateVariationRank = function (customization, variationCode, increaseValue) {
            return _this.personalizationsmarteditManagerViewUtilsService.updateVariationRank(customization, variationCode, increaseValue);
        };
        this.updateRanks = function (item, nextItem, itemsArray, event, increaseValue) {
            var startIndex = (increaseValue > 0) ? event.source.index : event.dest.index;
            var endIndex = (increaseValue > 0) ? event.dest.index : event.source.index;
            itemsArray[event.dest.index].rank = nextItem.rank;
            for (var i = startIndex; i <= endIndex; i++) {
                if (i !== event.dest.index) {
                    itemsArray[i].rank += (increaseValue > 0) ? (-1) : 1;
                }
            }
        };
        this.valideRanks = function (itemsArray) {
            for (var j = 0; j < itemsArray.length - 1; j++) {
                if (itemsArray[j].rank > itemsArray[j + 1].rank) {
                    _this.refreshGrid();
                    break;
                }
            }
        };
        this.droppedCustomization = function (item, e) {
            var nextItem = _this.customizations[e.dest.index];
            var increaseValue = nextItem.rank - item.rank;
            if (increaseValue !== 0) {
                _this.waitDialogService.showWaitModal();
                _this.updateCustomizationRank(item.code, increaseValue)
                    .then(function () {
                    _this.updateRanks(item, nextItem, _this.customizations, e, increaseValue);
                    _this.$timeout(function () {
                        _this.valideRanks(_this.customizations);
                    }, 100);
                    _this.waitDialogService.hideWaitModal();
                }).catch(function () {
                    _this.waitDialogService.hideWaitModal();
                });
            }
        };
        this.droppedTargetGroup = function (item, e) {
            var variationsArray = e.source.nodesScope.$modelValue;
            var nextItem = variationsArray[e.dest.index];
            var increaseValue = nextItem.rank - item.rank;
            var customization = e.source.nodesScope.$parent.$modelValue;
            if (increaseValue !== 0) {
                _this.waitDialogService.showWaitModal();
                _this.updateVariationRank(customization, item.code, increaseValue)
                    .then(function () {
                    _this.updateRanks(item, nextItem, customization.variations, e, increaseValue);
                    _this.$timeout(function () {
                        _this.valideRanks(customization.variations);
                    }, 100);
                }).finally(function () {
                    _this.waitDialogService.hideWaitModal();
                });
            }
        };
        var seExperienceData = this.personalizationsmarteditContextService.getSeData().seExperienceData;
        var currentLanguageIsocode = seExperienceData.languageDescriptor.isocode;
        this.$scope.scrollZoneVisible = false;
        this.catalogName = seExperienceData.catalogDescriptor.name[currentLanguageIsocode];
        this.catalogName += " - " + seExperienceData.catalogDescriptor.catalogVersion;
        this.statuses = this.personalizationsmarteditUtils.getStatusesMapping();
        this.customizations = [];
        this.$scope.filteredCustomizationsCount = 0;
        this.search = {
            name: '',
            status: this.getDefaultStatus()
        };
        this.moreCustomizationsRequestProcessing = false;
        this.pagination = new personalizationcommons.PaginationHelper();
        this.pagination.reset();
        this.treeOptions = {
            dragStart: function (e) {
                _this.$scope.scrollZoneVisible = _this.isScrollZoneVisible();
                e.source.nodeScope.$modelValue.isDragging = true;
            },
            dragStop: function (e) {
                e.source.nodeScope.$modelValue.isDragging = undefined;
            },
            dropped: function (e) {
                _this.$scope.scrollZoneVisible = false;
                var item = e.source.nodeScope.$modelValue;
                if (e.source.index === e.dest.index) {
                    return; // Element didn't change position
                }
                else if (item.variations) { // Customization
                    _this.droppedCustomization(item, e);
                }
                else { // Target group
                    _this.droppedTargetGroup(item, e);
                }
            },
            accept: function (sourceNodeScope, destNodesScope) {
                if (_this.lodash.isArray(destNodesScope.$modelValue) && destNodesScope.$modelValue.indexOf(sourceNodeScope.$modelValue) > -1) {
                    return true;
                }
                return false;
            }
        };
        this.init = function () {
            _this.systemEventService.subscribe('CUSTOMIZATIONS_MODIFIED', function () {
                _this.refreshGrid();
                return _this.$q.when();
            });
        };
        this.state.uncollapsedCustomizations = [];
    }
    /* @ngInject */ PersonalizationsmarteditManagerViewController = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, Function, Function, Function, PersonalizationsmarteditManagerViewUtilsService,
            personalizationcommons.PersonalizationsmarteditMessageHandler,
            PersonalizationsmarteditContextService,
            personalizationcommons.PersonalizationsmarteditUtils,
            PersonalizationsmarteditManager,
            personalizationcommons.PersonalizationsmarteditCommerceCustomizationService,
            PersonalizationsmarteditCommerceCustomizationView,
            personalizationcommons.PersonalizationsmarteditDateUtils, Object, Object, Object, Object, Object])
    ], /* @ngInject */ PersonalizationsmarteditManagerViewController);
    return /* @ngInject */ PersonalizationsmarteditManagerViewController;
}());

var /* @ngInject */ PersonalizationsmarteditManagerView = /** @class */ (function () {
    PersonalizationsmarteditManagerView.$inject = ["modalService"];
    function /* @ngInject */ PersonalizationsmarteditManagerView(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.openManagerAction = function (customization, variation) {
            _this.modalService.open({
                title: "personalization.modal.manager.title",
                templateUrl: 'personalizationsmarteditManagerViewTemplate.html',
                controller: PersonalizationsmarteditManagerViewController,
                size: 'fullscreen',
                cssClasses: 'perso-library'
            }).then(function () {
                // success
            }, function () {
                // error
            });
        };
    }
    /* @ngInject */ PersonalizationsmarteditManagerView = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [smarteditcommons.IModalService])
    ], /* @ngInject */ PersonalizationsmarteditManagerView);
    return /* @ngInject */ PersonalizationsmarteditManagerView;
}());

var /* @ngInject */ PersonalizationsmarteditManagerViewModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditManagerViewModule() {
    }
    /* @ngInject */ PersonalizationsmarteditManagerViewModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'modalServiceModule',
                'confirmationModalServiceModule',
                'smarteditCommonsModule',
                'ui.tree',
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditServicesModule,
                PersonalizationsmarteditManageCustomizationViewModule,
                PersonalizationsmarteditCommerceCustomizationModule,
                PersonalizationsmarteditDataFactory
            ],
            providers: [
                PersonalizationsmarteditManagerView,
                PersonalizationsmarteditManagerViewUtilsService
            ]
        })
    ], /* @ngInject */ PersonalizationsmarteditManagerViewModule);
    return /* @ngInject */ PersonalizationsmarteditManagerViewModule;
}());

var /* @ngInject */ PersonalizationsmarteditContainer = /** @class */ (function () {
    function /* @ngInject */ PersonalizationsmarteditContainer() {
    }
    /* @ngInject */ PersonalizationsmarteditContainer = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationsmarteditContainerTemplates',
                'ui.bootstrap',
                'functionsModule',
                'seConstantsModule',
                'yjqueryModule',
                'smarteditCommonsModule',
                'smarteditRootModule',
                'smarteditServicesModule',
                PersonalizationsmarteditCombinedViewModule,
                PersonalizationsmarteditCustomizeViewModule,
                PersonalizationsmarteditToolbarContextModule,
                LegacyPersonalizationsmarteditContextMenuModule,
                PersonalizationsmarteditManageCustomizationViewModule,
                personalizationcommons.PersonalizationsmarteditCommonsModule,
                PersonalizationsmarteditManagementModule,
                PersonalizationsmarteditServicesModule,
                VersioningModule,
                PersonalizationsmarteditDataFactory,
                PersonalizationsmarteditCommonComponentsModule,
                PersonalizationsmarteditSegmentViewModule,
                PersonalizationsmarteditManagerViewModule
            ],
            config: ["$provide", function ($provide) {
                'ngInject';
                $provide.decorator('rollbackPageVersionService', ["$delegate", "$log", "versionCheckerService", function ($delegate, $log, versionCheckerService) {
                    var rollbackCallback = $delegate.rollbackPageVersion;
                    function rollbackWrapper() {
                        versionCheckerService.setVersion(arguments[0]);
                        return rollbackCallback.apply($delegate, arguments);
                    }
                    $delegate.rollbackPageVersion = rollbackWrapper;
                    var modalCallback = $delegate.showConfirmationModal;
                    function modalWrapper() {
                        var targetArguments = arguments;
                        return versionCheckerService.provideTranlationKey(targetArguments[1]).then(function (text) {
                            targetArguments[1] = text;
                            return modalCallback.apply($delegate, targetArguments);
                        });
                    }
                    $delegate.showConfirmationModal = modalWrapper;
                    return $delegate;
                }]);
            }],
            initialize: ["$log", "yjQuery", "domain", "$q", "personalizationsmarteditContextServiceReverseProxy", "personalizationsmarteditContextService", "personalizationsmarteditContextMenuServiceProxy", "personalizationsmarteditContextUtils", "personalizationsmarteditPreviewService", "personalizationsmarteditMessageHandler", "personalizationsmarteditRestService", "personalizationsmarteditUtils", "EVENTS", "SWITCH_LANGUAGE_EVENT", "EVENT_PERSPECTIVE_UNLOADING", "EVENT_PERSPECTIVE_ADDED", "SHOW_TOOLBAR_ITEM_CONTEXT", "crossFrameEventService", "featureService", "perspectiveService", "smarteditBootstrapGateway", "systemEventService", "experienceService", "httpBackendService", "personalizationsmarteditDateUtils", "CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY", "COMBINED_VIEW_TOOLBAR_ITEM_KEY", function ($log, yjQuery, domain, $q, personalizationsmarteditContextServiceReverseProxy, personalizationsmarteditContextService, // dont remove
            personalizationsmarteditContextMenuServiceProxy, personalizationsmarteditContextUtils, personalizationsmarteditPreviewService, personalizationsmarteditMessageHandler, personalizationsmarteditRestService, personalizationsmarteditUtils, EVENTS, SWITCH_LANGUAGE_EVENT, EVENT_PERSPECTIVE_UNLOADING, EVENT_PERSPECTIVE_ADDED, SHOW_TOOLBAR_ITEM_CONTEXT, crossFrameEventService, featureService, perspectiveService, smarteditBootstrapGateway, systemEventService, experienceService, httpBackendService, personalizationsmarteditDateUtils, CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY, COMBINED_VIEW_TOOLBAR_ITEM_KEY) {
                'ngInject';
                if (!httpBackendService.backends.PATCH) {
                    httpBackendService.backends.PATCH = [];
                }
                var PERSONALIZATION_PERSPECTIVE_KEY = 'personalizationsmartedit.perspective';
                // const loadCSS = (href: string) => {
                // 	const cssLink = yjQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
                // 	yjQuery("head").append(cssLink);
                // };
                // loadCSS(domain + "/personalizationsmartedit/css/style.css");
                featureService.addToolbarItem({
                    toolbarId: 'smartEditPerspectiveToolbar',
                    key: CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY,
                    type: 'HYBRID_ACTION',
                    nameI18nKey: 'personalization.toolbar.pagecustomizations',
                    priority: 4,
                    section: 'left',
                    include: 'personalizationsmarteditCustomizeViewWrapperTemplate.html',
                    contextTemplateUrl: 'personalizationsmarteditCustomizeToolbarContextWrapperTemplate.html',
                    keepAliveOnClose: false,
                    iconClassName: 'sap-icon--palette se-toolbar-menu-ddlb--button__icon',
                    permissions: ['se.edit.page', 'se.personalization.page']
                });
                featureService.addToolbarItem({
                    toolbarId: 'smartEditPerspectiveToolbar',
                    key: COMBINED_VIEW_TOOLBAR_ITEM_KEY,
                    type: 'HYBRID_ACTION',
                    nameI18nKey: 'personalization.toolbar.combinedview.name',
                    priority: 6,
                    section: 'left',
                    include: 'personalizationsmarteditCombinedViewMenuWrapperTemplate.html',
                    contextTemplateUrl: 'personalizationsmarteditCombinedViewToolbarContextWrapperTemplate.html',
                    keepAliveOnClose: false,
                    iconClassName: 'sap-icon--switch-views se-toolbar-menu-ddlb--button__icon',
                    permissions: ['se.read.page', 'se.personalization.page']
                });
                featureService.addToolbarItem({
                    toolbarId: 'smartEditPerspectiveToolbar',
                    key: 'personalizationsmartedit.container.manager.toolbar',
                    type: 'HYBRID_ACTION',
                    nameI18nKey: 'personalization.toolbar.library.name',
                    priority: 8,
                    section: 'left',
                    include: 'manageCustomizationViewMenuWrapperTemplate.html',
                    keepAliveOnClose: false,
                    iconClassName: 'sap-icon--bbyd-active-sales se-toolbar-menu-ddlb--button__icon',
                    permissions: ['se.edit.page']
                });
                featureService.register({
                    key: 'personalizationsmartedit.context.service',
                    nameI18nKey: 'personalization.context.service.name',
                    descriptionI18nKey: 'personalization.context.service.description',
                    enablingCallback: function () {
                        var personalization = personalizationsmarteditContextService.getPersonalization();
                        personalization.enabled = true;
                        personalizationsmarteditContextService.setPersonalization(personalization);
                    },
                    disablingCallback: function () {
                        var personalization = personalizationsmarteditContextService.getPersonalization();
                        personalization.enabled = false;
                        personalizationsmarteditContextService.setPersonalization(personalization);
                    },
                    permissions: ['se.edit.page']
                });
                perspectiveService.register({
                    key: PERSONALIZATION_PERSPECTIVE_KEY,
                    nameI18nKey: 'personalization.perspective.name',
                    features: ['personalizationsmartedit.context.service',
                        CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY,
                        'personalizationsmartedit.container.manager.toolbar',
                        COMBINED_VIEW_TOOLBAR_ITEM_KEY,
                        'personalizationsmarteditSharedSlot',
                        'personalizationsmarteditComponentLightUp',
                        'personalizationsmarteditCombinedViewComponentLightUp',
                        'personalizationsmartedit.context.add.action',
                        'personalizationsmartedit.context.edit.action',
                        'personalizationsmartedit.context.delete.action',
                        'personalizationsmartedit.context.info.action',
                        'personalizationsmartedit.context.component.edit.action',
                        'personalizationsmartedit.context.show.action.list',
                        'externalcomponentbutton',
                        'personalizationsmarteditExternalComponentDecorator',
                        'se.contextualMenu',
                        'se.emptySlotFix',
                        'se.cms.pageDisplayStatus'
                    ],
                    perspectives: [],
                    permissions: ['se.personalization.open']
                });
                var clearAllContextsAndReloadPreview = function () {
                    personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(personalizationsmarteditContextService);
                    personalizationsmarteditContextUtils.clearCustomizeContextAndReloadPreview(personalizationsmarteditPreviewService, personalizationsmarteditContextService);
                    personalizationsmarteditContextUtils.clearCombinedViewContextAndReloadPreview(personalizationsmarteditPreviewService, personalizationsmarteditContextService);
                };
                crossFrameEventService.subscribe(EVENT_PERSPECTIVE_UNLOADING, function (eventId, unloadingPerspective) {
                    if (unloadingPerspective === PERSONALIZATION_PERSPECTIVE_KEY) {
                        clearAllContextsAndReloadPreview();
                    }
                });
                var clearAllContexts = function () {
                    personalizationsmarteditContextUtils.clearCombinedViewCustomizeContext(personalizationsmarteditContextService);
                    personalizationsmarteditContextUtils.clearCustomizeContext(personalizationsmarteditContextService);
                    personalizationsmarteditContextUtils.clearCombinedViewContext(personalizationsmarteditContextService);
                };
                systemEventService.subscribe(EVENTS.EXPERIENCE_UPDATE, function () {
                    clearAllContexts();
                    personalizationsmarteditContextService.setCustomizeFiltersState({});
                    return $q.when();
                });
                systemEventService.subscribe(EVENT_PERSPECTIVE_ADDED, function () {
                    personalizationsmarteditPreviewService.removePersonalizationDataFromPreview();
                    return $q.when();
                });
                systemEventService.subscribe(SWITCH_LANGUAGE_EVENT, function () {
                    var combinedView = personalizationsmarteditContextService.getCombinedView();
                    angular.forEach(combinedView.selectedItems, function (item) {
                        personalizationsmarteditUtils.getAndSetCatalogVersionNameL10N(item.variation);
                    });
                    personalizationsmarteditContextService.setCombinedView(combinedView);
                    return $q.when();
                });
                smarteditBootstrapGateway.subscribe("smartEditReady", function (eventId, data) {
                    crossFrameEventService.publish(SHOW_TOOLBAR_ITEM_CONTEXT, CUSTOMIZE_VIEW_TOOLBAR_ITEM_KEY);
                    crossFrameEventService.publish(SHOW_TOOLBAR_ITEM_CONTEXT, COMBINED_VIEW_TOOLBAR_ITEM_KEY);
                    var customize = personalizationsmarteditContextService.getCustomize().selectedCustomization;
                    var combinedView = personalizationsmarteditContextService.getCombinedView().customize.selectedCustomization;
                    var combinedViewCustomize = personalizationsmarteditContextService.getCombinedView().selectedItems;
                    experienceService.getCurrentExperience().then(function (experience) {
                        if (!experience.variations && (customize || combinedView || combinedViewCustomize)) {
                            clearAllContexts();
                        }
                    });
                    personalizationsmarteditContextService.refreshExperienceData().then(function () {
                        var experience = personalizationsmarteditContextService.getSeData().seExperienceData;
                        var activePerspective = perspectiveService.getActivePerspective() || {};
                        if (activePerspective.key === PERSONALIZATION_PERSPECTIVE_KEY && experience.pageContext.catalogVersionUuid !== experience.catalogDescriptor.catalogVersionUuid) {
                            var warningConf = {
                                message: 'personalization.warning.pagefromparent',
                                timeout: -1
                            };
                            personalizationsmarteditMessageHandler.sendWarning(warningConf);
                        }
                    }).finally(function () {
                        personalizationsmarteditContextService.applySynchronization();
                    });
                });
            }]
        })
    ], /* @ngInject */ PersonalizationsmarteditContainer);
    return /* @ngInject */ PersonalizationsmarteditContainer;
}());

window.__smartedit__.addDecoratorPayload("Component", "HasMulticatalogComponent", {
    selector: 'has-multicatalog',
    template: "\n        <div *ngIf=\"hasMulticatalog\">\n            <ng-content></ng-content>\n        </div>\n    "
});
var /* @ngInject */ HasMulticatalogComponent = /** @class */ (function () {
    HasMulticatalogComponent.$inject = ["personalizationsmarteditContextService"];
    function /* @ngInject */ HasMulticatalogComponent(personalizationsmarteditContextService) {
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
    }
    /* @ngInject */ HasMulticatalogComponent.prototype.ngOnInit = function () {
        this.hasMulticatalog = this.getSeExperienceData().siteDescriptor.contentCatalogs.length > 1;
    };
    /* @ngInject */ HasMulticatalogComponent.prototype.getSeExperienceData = function () {
        return this.personalizationsmarteditContextService.getSeData().seExperienceData;
    };
    /* @ngInject */ HasMulticatalogComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'has-multicatalog',
            template: "\n        <div *ngIf=\"hasMulticatalog\">\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        __param(0, core.Inject(PersonalizationsmarteditContextService)),
        __metadata("design:paramtypes", [PersonalizationsmarteditContextService])
    ], /* @ngInject */ HasMulticatalogComponent);
    return /* @ngInject */ HasMulticatalogComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogVersionFilterItemPrinterComponent", {
    selector: 'catalog-version-filter-item-printer',
    template: "\n        <div>\n            <span class=\"perso__globe-icon sap-icon--globe\"\n                  *ngIf=\"data.item.isCurrentCatalog === false\">\n            </span>\n            <span *ngIf=\"data.item.isCurrentCatalog === false\">\n                {{data.item.catalogName}} - {{data.item.catalogVersionId}}\n            </span>\n            <span *ngIf=\"data.item.isCurrentCatalog === true\" [translate]=\"'personalization.filter.catalog.current'\"></span>\n        </div>\n    "
});
var CatalogVersionFilterItemPrinterComponent = /** @class */ (function () {
    function CatalogVersionFilterItemPrinterComponent(data) {
        this.data = data;
    }
    CatalogVersionFilterItemPrinterComponent = __decorate([
        core.Component({
            selector: 'catalog-version-filter-item-printer',
            template: "\n        <div>\n            <span class=\"perso__globe-icon sap-icon--globe\"\n                  *ngIf=\"data.item.isCurrentCatalog === false\">\n            </span>\n            <span *ngIf=\"data.item.isCurrentCatalog === false\">\n                {{data.item.catalogName}} - {{data.item.catalogVersionId}}\n            </span>\n            <span *ngIf=\"data.item.isCurrentCatalog === true\" [translate]=\"'personalization.filter.catalog.current'\"></span>\n        </div>\n    "
        }),
        __param(0, core.Inject(smarteditcommons.ITEM_COMPONENT_DATA_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], CatalogVersionFilterItemPrinterComponent);
    return CatalogVersionFilterItemPrinterComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogVersionFilterDropdownComponent", {
    selector: 'catalog-version-filter-dropdown',
    template: "        \n        <se-select class=\"perso-filter\"\n                   (click)=\"$event.stopPropagation()\"\n                   [(model)]=\"selectedId\"\n                   [onChange]=\"onChange\"\n                   [fetchStrategy]=\"fetchStrategy\"\n                   [itemComponent]=\"itemComponent\"\n                   [searchEnabled]=\"false\"\n        ></se-select>\n    "
});
var /* @ngInject */ CatalogVersionFilterDropdownComponent = /** @class */ (function () {
    CatalogVersionFilterDropdownComponent.$inject = ["crossFrameEventService", "languageService", "componentMenuService", "personalizationsmarteditContextService"];
    function /* @ngInject */ CatalogVersionFilterDropdownComponent(crossFrameEventService, languageService, componentMenuService, personalizationsmarteditContextService) {
        var _this = this;
        this.crossFrameEventService = crossFrameEventService;
        this.languageService = languageService;
        this.componentMenuService = componentMenuService;
        this.personalizationsmarteditContextService = personalizationsmarteditContextService;
        this.onSelectCallback = new core.EventEmitter();
        this.itemComponent = CatalogVersionFilterItemPrinterComponent;
        this.l10nFilter = smarteditcommons.setupL10nFilter(this.languageService, this.crossFrameEventService);
        this.onChange = this.onChange.bind(this);
        this.fetchStrategy = {
            fetchAll: function () {
                return Promise.resolve(_this.items);
            }
        };
    }
    /* @ngInject */ CatalogVersionFilterDropdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentMenuService.getValidContentCatalogVersions().then(function (catalogVersions) {
            _this.items = catalogVersions;
            var experience = _this.personalizationsmarteditContextService.getSeData().seExperienceData;
            _this.items.forEach(function (item) {
                item.isCurrentCatalog = item.id === experience.catalogDescriptor.catalogVersionUuid;
                item.catalogName = _this.l10nFilter(item.catalogName);
            });
            _this.componentMenuService.getInitialCatalogVersion(_this.items).then(function (selectedCatalogVersion) {
                _this.selectedId = _this.initialValue || selectedCatalogVersion.id;
            });
        });
    };
    /* @ngInject */ CatalogVersionFilterDropdownComponent.prototype.onChange = function (changes) {
        this.onSelectCallback.emit(this.selectedId);
    };
    CatalogVersionFilterDropdownComponent.prototype.onChange.$inject = ["changes"];
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ CatalogVersionFilterDropdownComponent.prototype, "initialValue", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], /* @ngInject */ CatalogVersionFilterDropdownComponent.prototype, "onSelectCallback", void 0);
    /* @ngInject */ CatalogVersionFilterDropdownComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'catalog-version-filter-dropdown',
            template: "        \n        <se-select class=\"perso-filter\"\n                   (click)=\"$event.stopPropagation()\"\n                   [(model)]=\"selectedId\"\n                   [onChange]=\"onChange\"\n                   [fetchStrategy]=\"fetchStrategy\"\n                   [itemComponent]=\"itemComponent\"\n                   [searchEnabled]=\"false\"\n        ></se-select>\n    "
        }),
        __param(0, core.Inject(smarteditcommons.EVENT_SERVICE)),
        __param(1, core.Inject('languageService')),
        __param(2, core.Inject('componentMenuService')),
        __param(3, core.Inject(PersonalizationsmarteditContextService)),
        __metadata("design:paramtypes", [smarteditcommons.CrossFrameEventService,
            smarteditcommons.LanguageService,
            cmssmarteditcontainer.ComponentMenuService,
            PersonalizationsmarteditContextService])
    ], /* @ngInject */ CatalogVersionFilterDropdownComponent);
    return /* @ngInject */ CatalogVersionFilterDropdownComponent;
}());

/**
 * @ngdoc overview
 * @name PersonalizationsmarteditSharedComponentsModule
 */
var PersonalizationsmarteditSharedComponentsModule = /** @class */ (function () {
    function PersonalizationsmarteditSharedComponentsModule() {
    }
    PersonalizationsmarteditSharedComponentsModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                core$1.TranslateModule,
                smarteditcommons.SelectModule
            ],
            declarations: [
                HasMulticatalogComponent,
                CatalogVersionFilterDropdownComponent,
                CatalogVersionFilterItemPrinterComponent
            ],
            entryComponents: [
                HasMulticatalogComponent,
                CatalogVersionFilterDropdownComponent,
                CatalogVersionFilterItemPrinterComponent
            ],
            exports: [
                HasMulticatalogComponent,
                CatalogVersionFilterDropdownComponent,
                CatalogVersionFilterItemPrinterComponent
            ]
        })
    ], PersonalizationsmarteditSharedComponentsModule);
    return PersonalizationsmarteditSharedComponentsModule;
}());

/**
 * @ngdoc overview
 * @name PersonalizationsmarteditContextMenuModule
 */
var PersonalizationsmarteditContextMenuModule = /** @class */ (function () {
    function PersonalizationsmarteditContextMenuModule() {
    }
    PersonalizationsmarteditContextMenuModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                core$1.TranslateModule,
                smarteditcommons.SharedComponentsModule,
                core$2.InlineHelpModule,
                smarteditcommons.SelectModule,
                smarteditcommons.TooltipModule,
                PersonalizationsmarteditSharedComponentsModule
            ],
            declarations: [
                PersonalizationsmarteditContextMenuAddEditActionComponent,
                ComponentDropdownItemPrinterComponent
            ],
            entryComponents: [
                PersonalizationsmarteditContextMenuAddEditActionComponent,
                ComponentDropdownItemPrinterComponent
            ],
            exports: [
                PersonalizationsmarteditContextMenuAddEditActionComponent,
                ComponentDropdownItemPrinterComponent
            ]
        })
    ], PersonalizationsmarteditContextMenuModule);
    return PersonalizationsmarteditContextMenuModule;
}());

/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
var PersonalizationsmarteditContainerModule = /** @class */ (function () {
    function PersonalizationsmarteditContainerModule() {
    }
    PersonalizationsmarteditContainerModule = __decorate([
        smarteditcommons.SeEntryModule('personalizationsmarteditcontainer'),
        core.NgModule({
            imports: [
                platformBrowser.BrowserModule,
                _static.UpgradeModule,
                personalizationcommons.PersonalizationsmarteditCommonsComponentsModule,
                PersonalizationsmarteditContextMenuModule,
                PersonalizationsmarteditSharedComponentsModule
            ],
            providers: [
                {
                    provide: http.HTTP_INTERCEPTORS,
                    useClass: personalizationcommons.BaseSiteHeaderInterceptor,
                    multi: true,
                    deps: [smarteditcommons.ISharedDataService]
                },
                smarteditcommons.diBridgeUtils.upgradeProvider('personalizationsmarteditRestService', PersonalizationsmarteditRestService),
                smarteditcommons.diBridgeUtils.upgradeProvider('personalizationsmarteditMessageHandler', personalizationcommons.PersonalizationsmarteditMessageHandler),
                smarteditcommons.diBridgeUtils.upgradeProvider('personalizationsmarteditContextService', PersonalizationsmarteditContextService),
                smarteditcommons.diBridgeUtils.upgradeProvider('PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING'),
                smarteditcommons.diBridgeUtils.upgradeProvider('MODAL_BUTTON_ACTIONS'),
                smarteditcommons.diBridgeUtils.upgradeProvider('MODAL_BUTTON_STYLES'),
                smarteditcommons.diBridgeUtils.upgradeProvider('slotRestrictionsService'),
                smarteditcommons.diBridgeUtils.upgradeProvider('editorModalService'),
                smarteditcommons.diBridgeUtils.upgradeProvider('componentMenuService'),
                smarteditcommons.diBridgeUtils.upgradeProvider('languageService')
            ]
        })
    ], PersonalizationsmarteditContainerModule);
    return PersonalizationsmarteditContainerModule;
}());

exports.PersonalizationsmarteditContainer = PersonalizationsmarteditContainer;
exports.PersonalizationsmarteditContainerModule = PersonalizationsmarteditContainerModule;
