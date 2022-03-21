'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@angular/core');
var http = require('@angular/common/http');
var angular = require('angular');
var lo = require('lodash');
var smarteditcommons = require('smarteditcommons');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var common = require('@angular/common');
var router = require('@angular/router');
var core$1 = require('@ngx-translate/core');
var core$2 = require('@fundamental-ngx/core');
var platformBrowser = require('@angular/platform-browser');
var forms = require('@angular/forms');
var moment = _interopDefault(require('moment'));
var animations = require('@angular/platform-browser/animations');
var _static = require('@angular/upgrade/static');
var animations$1 = require('@angular/animations');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('coretemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('coretemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "AnnouncementBoardComponent.html", 
        "<ng-container *ngIf=\"(announcements$ | async) as announcements\"><div class=\"se-announcement-board\"><se-announcement *ngFor=\"                let announcement of (announcements | seReverse);                trackBy: annnouncementTrackBy;                let i = index            \" id=\"se-announcement-{{ i }}\" [announcement]=\"announcement\"></se-announcement></div></ng-container>"
    );
     
    $templateCache.put(
        "AnnouncementComponent.html", 
        "<div class=\"se-announcement-content\"><span *ngIf=\"isCloseable()\" class=\"sap-icon--decline se-announcement-close\" (click)=\"closeAnnouncement()\"></span><ng-container *ngIf=\"!isLegacyAngularJS; else legacyAngularJS\"><div *ngIf=\"hasMessage()\"><h4 *ngIf=\"hasMessageTitle()\">{{ announcement.messageTitle | translate }}</h4><span>{{ announcement.message | translate }}</span></div><ng-container *ngIf=\"hasComponent()\"><ng-container *ngComponentOutlet=\"announcement.component; injector: announcementInjector\"></ng-container></ng-container></ng-container><ng-template #legacyAngularJS><div *ngIf=\"hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div></div><div *ngIf=\"!hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\"></div></div></ng-template></div>"
    );
     
    $templateCache.put(
        "yAnnouncementBoardComponentTemplate.html", 
        "<se-announcement-board></se-announcement-board>"
    );
     
    $templateCache.put(
        "yAnnouncementComponentTemplate.html", 
        "<se-announcement [announcement]=\"$ctrl.announcement\"></se-announcement>"
    );
     
    $templateCache.put(
        "ExperienceSelectorComponent.html", 
        "<se-generic-editor *ngIf=\"isReady\" [smarteditComponentType]=\"smarteditComponentType\" [smarteditComponentId]=\"smarteditComponentId\" [structureApi]=\"structureApi\" [content]=\"content\" [contentApi]=\"contentApi\" (getApi)=\"getApi($event)\"></se-generic-editor>"
    );
     
    $templateCache.put(
        "ConfigurationModalComponent.html", 
        "<div id=\"editConfigurationsBody\" class=\"se-config\"><form #form=\"ngForm\" novalidate><div class=\"se-config__sub-header\"><span class=\"se-config__sub-title\">{{'se.configurationform.label.keyvalue' | translate}}</span> <button class=\"se-config__add-entry-btn fd-button--compact\" type=\"button\" (click)=\"editor.addEntry()\">{{ \"se.general.configuration.add.button\" | translate }}</button></div><div class=\"se-config__entry\" *ngFor=\"let entry of editor.filterConfiguration(); let $index = index\"><div class=\"se-config__entry-data\"><div class=\"se-config__entry-key\"><input type=\"text\" [ngClass]=\"{                            'is-invalid': entry.errors &&  entry.errors.keys && entry.errors.keys.length > 0,                            'se-config__entry-key--disabled': !entry.isNew }\" name=\"{{entry.key}}_{{entry.uuid}}_key\" placeholder=\"{{'se.configurationform.header.key.name' | translate}}\" [(ngModel)]=\"entry.key\" [required]=\"true\" [disabled]=\"!entry.isNew\" class=\"se-config__entry-key-input fd-form__control\" [title]=\"entry.key\"/><ng-container *ngIf=\"entry.errors && entry.errors.keys\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.keys; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div><div class=\"se-config__entry-value\"><textarea [ngClass]=\"{'is-invalid': entry.errors && entry.errors.values && entry.errors.values.length>0}\" name=\"{{entry.key}}_{{entry.uuid}}_value\" placeholder=\"{{'se.configurationform.header.value.name' | translate}}\" [(ngModel)]=\"entry.value\" [required]=\"true\" class=\"se-config__entry-text-area fd-form__control\" (change)=\"editor.validateUserInput(entry)\"></textarea><div *ngIf=\"entry.requiresUserCheck\"><input id=\"{{entry.key}}_absoluteUrl_check_{{$index}}\" type=\"checkbox\" name=\"{{entry.key}}_{{entry.uuid}}_isCheckedByUser\" [(ngModel)]=\"entry.isCheckedByUser\"/> <span id=\"{{entry.key}}_absoluteUrl_msg_{{$index}}\" [ngClass]=\"{                                'warning-check-msg': true,                                'not-checked': entry.hasErrors && !entry.isCheckedByUser                            }\">{{'se.configurationform.absoluteurl.check' | translate}}</span></div><ng-container *ngIf=\"entry.errors && entry.errors.values && entry.errors.values\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.values; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div></div><button type=\"button\" id=\"{{entry.key}}_removeButton_{{$index}}\" class=\"se-config__entry-remove-btn fd-button--light sap-icon--delete\" (click)=\"editor.removeEntry(entry, form);\"></button></div></form></div>"
    );
     
    $templateCache.put(
        "HeartBeatAlertComponent.html", 
        "<div><span>{{ 'se.heartbeat.failure1' | translate }}</span> <span><a (click)=\"switchToPreviewMode()\">{{ 'se.heartbeat.failure2' | translate }}</a></span></div>"
    );
     
    $templateCache.put(
        "HotkeyNotificationComponentTemplate.html", 
        "<div class=\"se-notification__hotkey\"><div *ngFor=\"let key of hotkeyNames; let last = last\"><div class=\"se-notification__hotkey--key\"><span>{{ key }}</span></div><span *ngIf=\"!last\" class=\"se-notification__hotkey__icon--add\">+</span></div><div class=\"se-notification__hotkey--text\"><div class=\"se-notification__hotkey--title\">{{ title }}</div><div class=\"se-notification__hotkey--message\">{{ message }}</div></div></div>"
    );
     
    $templateCache.put(
        "NotificationComponentTemplate.html", 
        "<div class=\"se-notification\" id=\"{{ id }}\" *ngIf=\"notification\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"notification.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"notification.templateUrl\"></div><div *ngIf=\"hasComponent()\" [seCustomComponentOutlet]=\"notification.componentName\"></div></div>"
    );
     
    $templateCache.put(
        "NotificationPanelComponentTemplate.html", 
        "<ng-container *ngIf=\"(notifications$ | async) as notifications\"><div class=\"se-notification-panel\" *ngIf=\"notifications.length > 0\" [ngClass]=\"{'is-mouseover': isMouseOver}\" (mouseenter)=\"onMouseEnter()\"><div><se-notification *ngFor=\"let notification of (notifications | seReverse)\" [notification]=\"notification\"></se-notification></div></div></ng-container>"
    );
     
    $templateCache.put(
        "ShortcutLinkTemplate.html", 
        "<ng-container #container><ng-template #defaultTemplate let-shortcutLink><div class=\"se-shortcut-link\"><a class=\"se-shortcut-link__item\" [ngClass]=\"{'se-shortcut-link__item--active': shortcutLink.active}\" (click)=\"onClick(shortcutLink)\">{{shortcutLink.titleI18nKey | translate}}</a></div></ng-template></ng-container>"
    );
     
    $templateCache.put(
        "ShortcutLinkWrapperTemplate.html", 
        "<shortcut-link></shortcut-link>"
    );
     
    $templateCache.put(
        "sitesLinkTemplate.html", 
        "<div (click)=\"goToSites()\" class=\"se-sites-link {{cssClass}}\"><a class=\"se-sites-link__text\">{{'se.toolbar.sites' | translate}}</a> <span class=\"icon-navigation-right-arrow se-sites-link__arrow {{iconCssClass}}\"></span></div>"
    );
     
    $templateCache.put(
        "sitesLinkWrapperTemplate.html", 
        "<sites-link/>"
    );
     
    $templateCache.put(
        "UserAccountComponent.html", 
        "<div class=\"se-user-account-dropdown\"><div class=\"se-user-account-dropdown__role\">{{ 'se.toolbar.useraccount.role' | translate }}</div><div class=\"user-account-dropdown__name\">{{username}}</div><div class=\"divider\"></div><a class=\"se-sign-out__link fd-menu__item\" (click)=\"signOut()\">{{'se.toolbar.useraccount.signout' | translate}}</a></div>"
    );
     
    $templateCache.put(
        "ExperienceSelectorButtonComponent.html", 
        "<fd-popover class=\"se-experience-selector\" [(isOpen)]=\"status.isOpen\" (isOpenChange)=\"resetExperienceSelector()\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" [placement]=\"'bottom-end'\"><fd-popover-control><div class=\"se-experience-selector__control\"><se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isCurrentPageFromParent\" class=\"se-experience-selector__tooltip\"><span se-tooltip-trigger class=\"se-experience-selector__btn--globe\"><span class=\"hyicon hyicon-globe se-experience-selector__btn--globe--icon\"></span></span><div se-tooltip-body>{{ parentCatalogVersion }}</div></se-tooltip><button class=\"se-experience-selector__btn\" id=\"experience-selector-btn\"><span [attr.title]=\"buildExperienceText()\" class=\"se-experience-selector__btn-text se-nowrap-ellipsis\">{{ buildExperienceText() }} </span><span class=\"se-experience-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><div class=\"se-experience-selector__dropdown fd-modal fd-modal__content\" role=\"menu\"><se-experience-selector [experience]=\"experience\" [dropdownStatus]=\"status\" [(resetExperienceSelector)]=\"resetExperienceSelector\"></se-experience-selector></div></fd-popover-body></fd-popover>"
    );
     
    $templateCache.put(
        "inflectionPointSelectorWidgetComponentTemplate.html", 
        "<div class=\"se-inflection-point dropdown\" [class.open]=\"isOpen\" id=\"inflectionPtDropdown\"><button type=\"button\" class=\"se-inflection-point__toggle\" (click)=\"toggleDropdown($event)\" aria-pressed=\"false\" [attr.aria-expanded]=\"isOpen\"><span [ngClass]=\"getIconClass()\" class=\"se-inflection-point___selected\"></span></button><div class=\"se-inflection-point-dropdown\"><nav class=\"fd-menu\"><ul class=\"fd-menu__list\" role=\"menu\"><li *ngFor=\"let choice of points\" class=\"fd-menu__item inflection-point__device\" [ngClass]=\"{selected: isSelected(choice)}\" id=\"se-device-{{choice.type}}\" (click)=\"selectPoint(choice)\"><span [ngClass]=\"getIconClass(choice)\"></span></li></ul></nav></div></div>"
    );
     
    $templateCache.put(
        "PerspectiveSelectorComponent.html", 
        "<fd-popover [(isOpen)]=\"isOpen\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" *ngIf=\"hasActivePerspective()\" class=\"se-perspective-selector\" [placement]=\"'bottom-end'\" [disabled]=\"isDisabled\" [options]=\"popperOptions\"><fd-popover-control><div class=\"se-perspective-selector__trigger\"><se-tooltip [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isTooltipVisible()\"><span se-tooltip-trigger id=\"perspectiveTooltip\" class=\"hyicon hyicon-info se-perspective-selector__hotkey-tooltip--icon\"></span><div se-tooltip-body>{{ activePerspective.descriptionI18nKey | translate }}</div></se-tooltip><button class=\"se-perspective-selector__btn\" [disabled]=\"isDisabled\">{{getActivePerspectiveName() | translate}} <span class=\"se-perspective-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><ul class=\"se-perspective__list fd-list-group\" [ngClass]=\"{'se-perspective__list--tooltip': isTooltipVisible()}\" role=\"menu\"><li *ngFor=\"let choice of getDisplayedPerspectives()\" class=\"fd-list-group__item se-perspective__list-item fd-has-padding-none\"><a class=\"item se-perspective__list-item-text\" (click)=\"selectPerspective($event, choice.key);\">{{choice.nameI18nKey | translate}}</a></li></ul></fd-popover-body></fd-popover>"
    );
     
    $templateCache.put(
        "PerspectiveSelectorHotkeyNotificationComponentTemplate.html", 
        "<se-hotkey-notification [hotkeyNames]=\"['esc']\" [title]=\"'se.application.status.hotkey.title' | translate\" [message]=\"'se.application.status.hotkey.message' | translate\"></se-hotkey-notification>"
    );
     
    $templateCache.put(
        "LandingPageComponent.html", 
        "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar></div><div class=\"se-landing-page\"><div class=\"se-landing-page-actions\"><div class=\"se-landing-page-container\"><h1 class=\"se-landing-page-title\">{{ 'se.landingpage.title' | translate }}</h1><div class=\"se-landing-page-site-selection\" *ngIf=\"model\"><se-generic-editor-dropdown [field]=\"field\" [qualifier]=\"qualifier\" [model]=\"model\" [id]=\"sitesId\"></se-generic-editor-dropdown></div><p class=\"se-landing-page-label\">{{ 'se.landingpage.label' | translate }}</p></div></div><p class=\"se-landing-page-container se-landing-page-sub-header\">Content Catalogs</p><div class=\"se-landing-page-container se-landing-page-catalogs\"><div class=\"se-landing-page-catalog\" *ngFor=\"let catalog of catalogs; let isLast = last\"><se-catalog-details [catalog]=\"catalog\" [siteId]=\"model.site\" [isCatalogForCurrentSite]=\"isLast\"></se-catalog-details></div></div><img src=\"static-resources/images/best-run-sap-logo.svg\" class=\"se-landing-page-footer-logo\"/></div>"
    );
     
    $templateCache.put(
        "StorefrontPageComponent.html", 
        "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--experience\" imageRoot=\"imageRoot\" toolbarName=\"smartEditExperienceToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--perspective\" imageRoot=\"imageRoot\" toolbarName=\"smartEditPerspectiveToolbar\"></se-toolbar></div><div id=\"js_iFrameWrapper\" class=\"iframeWrapper\"><iframe id=\"ySmartEditFrame\" src=\"\"></iframe><div id=\"ySmartEditFrameDragArea\"></div></div>"
    );
     
    $templateCache.put(
        "MultiProductCatalogVersionConfigurationComponent.html", 
        "<div class=\"form-group se-multi-product-catalog-version-selector__label\">{{'se.product.catalogs.multiple.list.header' | translate}}</div><div class=\"se-multi-product-catalog-version-selector__catalog form-group\" *ngFor=\"let productCatalog of productCatalogs\"><label class=\"se-control-label se-multi-product-catalog-version-selector__catalog-name\" id=\"{{ productCatalog.catalogId }}-label\">{{ productCatalog.name | seL10n | async }}</label><div class=\"se-multi-product-catalog-version-selector__catalog-version\"><se-select [id]=\"productCatalog.catalogId\" [(model)]=\"productCatalog.selectedItem\" [onChange]=\"updateModel()\" [fetchStrategy]=\"productCatalog.fetchStrategy\"></se-select></div></div>"
    );
     
    $templateCache.put(
        "MultiProductCatalogVersionSelectorComponent.html", 
        "<se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" [isChevronVisible]=\"true\" class=\"se-products-catalog-select-multiple__tooltip\"><div id=\"multi-product-catalog-versions-selector\" se-tooltip-trigger (click)=\"onClickSelector()\" class=\"se-products-catalog-select-multiple\"><input type=\"text\" [value]=\"multiProductCatalogVersionsSelectedOptions$ | async\" class=\"form-control se-products-catalog-select-multiple__catalogs se-nowrap-ellipsis\" [name]=\"'productCatalogVersions'\" readonly=\"readonly\"/> <span class=\"hyicon hyicon-optionssm se-products-catalog-select-multiple__icon\"></span></div><div class=\"se-product-catalogs-tooltip\" se-tooltip-body><div class=\"se-product-catalogs-tooltip__h\">{{ ('se.product.catalogs.selector.headline.tooltip' || '') | translate }}</div><div class=\"se-product-catalog-info\" *ngFor=\"let productCatalog of productCatalogs\">{{ getCatalogNameCatalogVersionLabel(productCatalog.catalogId) | async }}</div></div></se-tooltip>"
    );
     
    $templateCache.put(
        "ProductCatalogVersionsSelectorComponent.html", 
        "<ng-container *ngIf=\"isReady\"><se-select *ngIf=\"isSingleVersionSelector\" [id]=\"geData.qualifier\" [(model)]=\"geData.model.productCatalogVersions[0]\" [(reset)]=\"reset\" [fetchStrategy]=\"fetchStrategy\"></se-select><se-multi-product-catalog-version-selector *ngIf=\"isMultiVersionSelector\" [productCatalogs]=\"productCatalogs\" [(selectedProductCatalogVersions)]=\"geData.model[geData.qualifier]\"></se-multi-product-catalog-version-selector></ng-container>"
    );
     
    $templateCache.put(
        "ToolbarActionComponent.html", 
        "<div *ngIf=\"item.isPermissionGranted\"><div *ngIf=\"item.type == type.ACTION\" class=\"toolbar-action\"><button type=\"button\" [ngClass]=\"{                'toolbar-action--button--compact': isCompact,                'toolbar-action--button': !isCompact            }\" class=\"btn\" (click)=\"toolbar.triggerAction(item, $event)\" [attr.aria-pressed]=\"false\" [attr.aria-haspopup]=\"true\" [attr.aria-expanded]=\"false\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn\"><span *ngIf=\"item.iconClassName\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_iconclass\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_lbl\">{{item.name | translate}}</span></button></div><fd-popover class=\"se-toolbar-action__wrapper toolbar-action toolbar-action--hybrid\" *ngIf=\"item.type === type.HYBRID_ACTION\" [attr.data-item-key]=\"item.key\" [triggers]=\"['click']\" [noArrow]=\"false\" [isOpen]=\"item.isOpen\" (isOpenChange)=\"onOpenChange()\" [placement]=\"placement\" seClickOutside (clickOutside)=\"onOutsideClicked()\"><fd-popover-control><button *ngIf=\"item.iconClassName || item.icons\" type=\"button\" class=\"btn\" [ngClass]=\"{                    'toolbar-action--button--compact': isCompact,                    'toolbar-action--button': !isCompact                }\" [disabled]=\"disabled\" [attr.aria-pressed]=\"false \" (click)=\"toolbar.triggerAction(item, $event)\"><span *ngIf=\"item.iconClassName\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\">{{item.name | translate}}</span></button></fd-popover-control><fd-popover-body class=\"se-toolbar-action__body\" [ngClass]=\"{                'toolbar-action--include--compact': isCompact,                'toolbar-action--include': !isCompact                          }\"><se-prevent-vertical-overflow><div *ngIf=\"toolbar.getItemVisibility(item) && item.include\" [ngInclude]=\"item.include\" [scope]=\"{ item: item }\" [compileHtmlNgController]=\"legacyController\"></div><ng-container *ngIf=\"toolbar.getItemVisibility(item) && item.component\"><ng-container *ngComponentOutlet=\"item.component; injector: actionInjector\"></ng-container></ng-container></se-prevent-vertical-overflow></fd-popover-body></fd-popover></div>"
    );
     
    $templateCache.put(
        "ToolbarComponent.html", 
        "<div class=\"se-toolbar\" [ngClass]=\"cssClass\"><div class=\"se-toolbar__left\"><div *ngFor=\"let item of aliases | seProperty:{section:'left'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__left {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__middle\"><div *ngFor=\"let item of aliases | seProperty:{section:'middle'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__middle {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__right\"><div *ngFor=\"let item of aliases | seProperty:{section:'right'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__right {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div></div>"
    );
     
    $templateCache.put(
        "LegacyClientPagedListComponentTemplate.html", 
        "<div class=\"fluid-container ySEPageListResult\"><p class=\"se-page-list__page-count\" ng-if=\"$ctrl.displayCount\"><span>({{ $ctrl.totalItems }} {{ 'se.pagelist.countsearchresult' | translate }})</span></p><table class=\"se-paged-list-table table table-striped table-hover techne-table\"><thead><tr><th data-ng-repeat=\"key in $ctrl.keys\" data-ng-click=\"$ctrl.orderByColumn(key.property)\" data-ng-style=\"{ 'width': $ctrl.columnWidth + '%' }\" class=\"se-paged-list__header\" data-ng-class=\"'se-paged-list__header-' + key.property\" ng-if=\"key.i18n\">{{ key.i18n | translate }} <span class=\"header-icon\" ng-show=\"$ctrl.visibleSortingHeader === key.property\" ng-class=\"{ 'down': $ctrl.headersSortingState[key.property] === true, 'up': $ctrl.headersSortingState[key.property] === false }\"></span></th><th class=\"se-paged-list__header\"></th><th class=\"se-paged-list__header\" data-ng-if=\"$ctrl.dropdownItems !== undefined\"></th></tr></thead><tbody class=\"se-paged-list__table-body\"><tr data-ng-repeat=\"item in $ctrl.items | filterByField: $ctrl.query : $ctrl.getFilterKeys() : $ctrl.filterCallback | startFrom:($ctrl.currentPage - 1) * $ctrl.itemsPerPage | limitTo: $ctrl.itemsPerPage\" class=\"techne-table-xs-right techne-table-xs-left se-paged-list-item\"><td ng-repeat=\"key in $ctrl.keys\" ng-class=\"'se-paged-list-item-' + key.property\"><div data-ng-if=\"$ctrl.renderers[key.property]\" compile-html=\"$ctrl.renderers[key.property](item, key)\"></div><span data-ng-if=\"!$ctrl.renderers[key.property]\">{{ item[key.property] }}</span></td><td><img data-ng-src=\"{{ item.visibilityIconSrc }}\" tooltip-placement=\"bottom\" tooltip=\"{{                            'se.icon.tooltip.visibility' | translate: item.translationData                        }}\"/></td><td data-ng-if=\"$ctrl.dropdownItems !== undefined\" has-operation-permission=\"'se.edit.page'\" class=\"paged-list-table__body__td paged-list-table__body__td-menu\"><se-dropdown-menu [dropdown-items]=\"$ctrl.dropdownItems\" [selected-item]=\"item\" class=\"pull-right\"></se-dropdown-menu></td></tr></tbody></table><div class=\"pagination-container\"><ul data-uib-pagination boundary-links=\"true \" total-items=\"$ctrl.totalItems \" items-per-page=\"$ctrl.itemsPerPage \" ng-model=\"$ctrl.currentPage \" class=\"pagination-lg\" previous-text=\"&lsaquo; \" next-text=\"&rsaquo; \" first-text=\"&laquo; \" last-text=\"&raquo; \"></ul></div></div>"
    );
     
    $templateCache.put(
        "CatalogDetailsComponent.html", 
        "<div class=\"se-catalog-details\" [attr.data-catalog]=\"catalog.name | seL10n | async\"><div class=\"se-catalog-header\"><div class=\"se-catalog-header-flex\"><div class=\"se-catalog-details__header\">{{ catalog.name | seL10n | async }}</div><div *ngIf=\"catalog.parents?.length\"><a href=\"javascript:void(0)\" (click)=\"onOpenCatalogHierarchy()\">{{ 'se.landingpage.catalog.hierarchy' | translate }}</a></div></div></div><div class=\"se-catalog-details__content\"><se-catalog-version-details *ngFor=\"let catalogVersion of sortedCatalogVersions\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\" [siteId]=\"siteId\"></se-catalog-version-details></div></div>"
    );
     
    $templateCache.put(
        "CatalogHierarchyModalComponent.html", 
        "<div class=\"se-catalog-hierarchy-header\"><span>{{ 'se.catalog.hierarchy.modal.tree.header' | translate }}</span></div><div *ngIf=\"this.catalogs$ | async as catalogs\" class=\"se-catalog-hierarchy-body\"><se-catalog-hierarchy-node *ngFor=\"let catalog of catalogs; let i = index\" [catalog]=\"catalog\" [index]=\"i\" [isLast]=\"i === catalogs.length - 1\" [siteId]=\"siteId\" (siteSelect)=\"onSiteSelected()\"></se-catalog-hierarchy-node></div>"
    );
     
    $templateCache.put(
        "CatalogHierarchyNodeComponent.html", 
        "<div class=\"se-cth-node-name\" [style.padding-left.px]=\"15 * index\" [style.padding-right.px]=\"15 * index\" [class.se-cth-node-name__last]=\"isLast\"><fd-icon glyph=\"navigation-down-arrow\"></fd-icon>{{ (isLast ? catalog.name : catalog.catalogName) | seL10n | async }}&nbsp; <span *ngIf=\"isLast\">({{ 'se.catalog.hierarchy.modal.tree.this.catalog' | translate}})</span></div><div class=\"se-cth-node-sites\"><ng-container><ng-container *ngIf=\"hasOneSite; else hasManySites\"><a class=\"se-cth-node-anchor\" href=\"\" (click)=\"onNavigateToSite(catalog.sites[0].uid)\">{{ catalog.sites[0].name | seL10n | async }}<fd-icon glyph=\"navigation-right-arrow\"></fd-icon></a></ng-container><ng-template #hasManySites><se-dropdown-menu [dropdownItems]=\"dropdownItems\" useProjectedAnchor=\"1\" (click)=\"onSiteSelect($event)\"><span class=\"se-cth-node-anchor\">{{ this.catalog.sites.length }} Sites<fd-icon glyph=\"navigation-down-arrow\"></fd-icon></span></se-dropdown-menu></ng-template></ng-container></div>"
    );
     
    $templateCache.put(
        "CatalogVersionDetailsComponent.html", 
        "<div class=\"se-catalog-version-container\" [attr.data-catalog-version]=\"catalogVersion.version\"><div class=\"se-catalog-version-container__left\"><se-catalog-versions-thumbnail-carousel [catalogVersion]=\"catalogVersion\" [catalog]=\"catalog\" [siteId]=\"siteId\"></se-catalog-versions-thumbnail-carousel><div><div class=\"se-catalog-version-container__name\">{{catalogVersion.version}}</div><div class=\"se-catalog-version-container__left__templates\"><div class=\"se-catalog-version-container__left__template\" *ngFor=\"let item of leftItems; let isLast = last\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer><div class=\"se-catalog-version-container__divider\" *ngIf=\"!isLast\"></div></div></div></div></div><div class=\"se-catalog-version-container__right\"><div class=\"se-catalog-version-container__right__template\" *ngFor=\"let item of rightItems\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer></div></div></div>"
    );
     
    $templateCache.put(
        "CatalogVersionsThumbnailCarouselComponent.html", 
        "<div class=\"se-active-catalog-thumbnail\"><div class=\"se-active-catalog-version-container__thumbnail\" (click)=\"onClick()\"><div class=\"se-active-catalog-version-container__thumbnail__default-img\"><div class=\"se-active-catalog-version-container__thumbnail__img\" [ngStyle]=\"{'background-image': 'url(' + catalogVersion.thumbnailUrl + ')'}\"></div></div></div></div>"
    );
     
    $templateCache.put(
        "HomePageLinkComponent.html", 
        "<div class=\"home-link-container\"><a href=\"javascript:void(0)\" class=\"home-link-item__link se-catalog-version__link\" (click)=\"onClick()\">{{ 'se.landingpage.homepage' | translate }}</a></div>"
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

var ApplicationLayer;
(function (ApplicationLayer) {
    ApplicationLayer[ApplicationLayer["SMARTEDITCONTAINER"] = 0] = "SMARTEDITCONTAINER";
    ApplicationLayer[ApplicationLayer["SMARTEDIT"] = 1] = "SMARTEDIT";
})(ApplicationLayer || (ApplicationLayer = {}));
/** @internal */
var /* @ngInject */ ConfigurationExtractorService = /** @class */ (function () {
    ConfigurationExtractorService.$inject = ["logService"];
    function /* @ngInject */ ConfigurationExtractorService(logService) {
        this.logService = logService;
    }
    /* @ngInject */ ConfigurationExtractorService.prototype.extractSEContainerModules = function (configurations) {
        return this._getAppsAndLocations(configurations, ApplicationLayer.SMARTEDITCONTAINER);
    };
    ConfigurationExtractorService.prototype.extractSEContainerModules.$inject = ["configurations"];
    /* @ngInject */ ConfigurationExtractorService.prototype.extractSEModules = function (configurations) {
        return this._getAppsAndLocations(configurations, ApplicationLayer.SMARTEDIT);
    };
    ConfigurationExtractorService.prototype.extractSEModules.$inject = ["configurations"];
    /* @ngInject */ ConfigurationExtractorService.prototype.orderApplications = function (applications) {
        var _this = this;
        var simpleApps = applications.filter(function (item) { return !item.extends; });
        var extendingApps = applications
            .filter(function (item) { return !!item.extends; })
            /*
             * filer out extendingApps thata do extend an unknown app
             * other recursive _addExtendingAppsInOrder will never end
             */
            .filter(function (extendingApp) {
            var index = applications.findIndex(function (item) { return item.name === extendingApp.extends; });
            if (index === -1) {
                _this.logService.error("Application " + extendingApp.name + " located at " + extendingApp.location + " is ignored because it extends an unknown application '" + extendingApp.extends + "'; SmartEdit functionality may be compromised.");
            }
            return index > -1;
        });
        return this._addExtendingAppsInOrder(simpleApps, extendingApps);
    };
    ConfigurationExtractorService.prototype.orderApplications.$inject = ["applications"];
    /* @ngInject */ ConfigurationExtractorService.prototype._addExtendingAppsInOrder = function (simpleApps, extendingApps, pass) {
        pass = pass || 1;
        var remainingApps = [];
        extendingApps.forEach(function (extendingApp) {
            var index = simpleApps.findIndex(function (item) { return item.name === extendingApp.extends; });
            if (index > -1) {
                console.debug("pass " + pass + ", " + extendingApp.name + " requiring " + extendingApp.extends + " found it at index " + index + " (" + simpleApps.map(function (app) { return app.name; }) + ")");
                simpleApps.splice(index + 1, 0, extendingApp);
            }
            else {
                console.debug("pass " + pass + ", " + extendingApp.name + " requiring " + extendingApp.extends + " did not find it  (" + simpleApps.map(function (app) { return app.name; }) + ")");
                remainingApps.push(extendingApp);
            }
        });
        if (remainingApps.length) {
            return this._addExtendingAppsInOrder(simpleApps, remainingApps, ++pass);
        }
        else {
            return simpleApps;
        }
    };
    ConfigurationExtractorService.prototype._addExtendingAppsInOrder.$inject = ["simpleApps", "extendingApps", "pass"];
    /* @ngInject */ ConfigurationExtractorService.prototype._getAppsAndLocations = function (configurations, applicationLayer) {
        var locationName;
        switch (applicationLayer) {
            case ApplicationLayer.SMARTEDITCONTAINER:
                locationName = 'smartEditContainerLocation';
                break;
            case ApplicationLayer.SMARTEDIT:
                locationName = 'smartEditLocation';
                break;
        }
        var appsAndLocations = lo.map(configurations, function (value, prop) { return ({ key: prop, value: value }); })
            .reduce(function (holder, current) {
            if (current.key.indexOf('applications') === 0 &&
                typeof current.value[locationName] === 'string') {
                var app = {};
                app.name = current.key.split('.')[1];
                var location_1 = current.value[locationName];
                if (/^https?\:\/\//.test(location_1)) {
                    app.location = location_1;
                }
                else {
                    app.location = configurations.domain + location_1;
                }
                var _extends = current.value.extends;
                if (_extends) {
                    app.extends = _extends;
                }
                holder.applications.push(app);
                // authenticationMaps from smartedit modules
                holder.authenticationMap = lo.merge(holder.authenticationMap, current.value.authenticationMap);
            }
            else if (current.key === 'authenticationMap') {
                // authenticationMap from smartedit
                holder.authenticationMap = lo.merge(holder.authenticationMap, current.value);
            }
            return holder;
        }, {
            applications: [],
            authenticationMap: {}
        });
        return appsAndLocations;
    };
    ConfigurationExtractorService.prototype._getAppsAndLocations.$inject = ["configurations", "applicationLayer"];
    /* @ngInject */ ConfigurationExtractorService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.LogService])
    ], /* @ngInject */ ConfigurationExtractorService);
    return /* @ngInject */ ConfigurationExtractorService;
}());

var /* @ngInject */ BootstrapService = /** @class */ (function () {
    BootstrapService.$inject = ["configurationExtractorService", "sharedDataService", "logService", "httpClient", "promiseUtils", "smarteditBootstrapGateway", "moduleUtils", "SMARTEDIT_INNER_FILES", "SMARTEDIT_INNER_FILES_POST"];
    function /* @ngInject */ BootstrapService(configurationExtractorService, sharedDataService, logService, httpClient, promiseUtils, smarteditBootstrapGateway, moduleUtils, SMARTEDIT_INNER_FILES, SMARTEDIT_INNER_FILES_POST) {
        this.configurationExtractorService = configurationExtractorService;
        this.sharedDataService = sharedDataService;
        this.logService = logService;
        this.httpClient = httpClient;
        this.promiseUtils = promiseUtils;
        this.smarteditBootstrapGateway = smarteditBootstrapGateway;
        this.moduleUtils = moduleUtils;
        this.SMARTEDIT_INNER_FILES = SMARTEDIT_INNER_FILES;
        this.SMARTEDIT_INNER_FILES_POST = SMARTEDIT_INNER_FILES_POST;
    }
    /* @ngInject */ BootstrapService.prototype.bootstrapContainerModules = function (configurations) {
        var _this = this;
        var deferred = this.promiseUtils.defer();
        var seContainerModules = this.configurationExtractorService.extractSEContainerModules(configurations);
        var orderedApplications = this.configurationExtractorService.orderApplications(seContainerModules.applications);
        this.logService.debug('outerAppLocations are:', orderedApplications);
        this.sharedDataService.set('authenticationMap', seContainerModules.authenticationMap);
        this.sharedDataService.set('credentialsMap', configurations['authentication.credentials']);
        var constants = this._getConstants(configurations);
        Object.keys(constants).forEach(function (key) {
            _this._getLegacyContainerModule().constant(key, constants[key]);
        });
        this._getValidApplications(orderedApplications).then(function (validApplications) {
            smarteditcommons.scriptUtils.injectJS().execute({
                srcs: validApplications.map(function (app) { return app.location; }),
                callback: function () {
                    var modules = __spreadArrays(window.__smartedit__.pushedModules);
                    // The original validApplications contains the list of modules that must be loaded dynamically as determined by
                    // the SmartEdit Configuration service; this is the legacy way of loading extensions.
                    // However, now extensions can also be loaded at compilation time. The code of those extensions is not required to be
                    // loaded dynamically, but it's still necessary to load their Angular top-level module. Those modules are defined in
                    // the smartEditContainerAngularApps global variable.
                    window.__smartedit__.smartEditContainerAngularApps.forEach(function (appName) {
                        validApplications.push({
                            name: appName,
                            location: ''
                        });
                    });
                    validApplications.forEach(function (app) {
                        _this.moduleUtils.addModuleToAngularJSApp('smarteditcontainer', app.name);
                        var esModule = _this.moduleUtils.getNgModule(app.name);
                        if (esModule) {
                            modules.push(esModule);
                        }
                    });
                    deferred.resolve({
                        modules: modules,
                        constants: constants
                    });
                }
            });
        });
        return deferred.promise;
    };
    BootstrapService.prototype.bootstrapContainerModules.$inject = ["configurations"];
    /**
     * Retrieve SmartEdit inner application configuration and dispatch 'bundle' event with list of resources.
     * @param configurations
     */
    /* @ngInject */ BootstrapService.prototype.bootstrapSEApp = function (configurations) {
        var _this = this;
        var seModules = this.configurationExtractorService.extractSEModules(configurations);
        var orderedApplications = this.configurationExtractorService.orderApplications(seModules.applications);
        this.sharedDataService.set('authenticationMap', seModules.authenticationMap);
        this.sharedDataService.set('credentialsMap', configurations['authentication.credentials']);
        var resources = {
            properties: this._getConstants(configurations),
            js: [
                {
                    src: configurations.smarteditroot +
                        '/static-resources/thirdparties/blockumd/blockumd.js'
                },
                {
                    src: configurations.smarteditroot +
                        '/static-resources/dist/smartedit-new/vendors.js'
                },
                {
                    src: configurations.smarteditroot +
                        '/static-resources/thirdparties/ckeditor/ckeditor.js'
                },
                {
                    src: configurations.smarteditroot +
                        '/static-resources/dist/smartedit-new/smartedit.js'
                }
            ]
        };
        return this._getValidApplications(orderedApplications).then(function (validApplications) {
            // The original validApplications contains the list of modules that must be loaded dynamically as determined by
            // the SmartEdit Configuration service; this is the legacy way of loading extensions.
            // However, now extensions can also be loaded at compilation time. The code of those extensions is not required to be
            // loaded dynamically, but it's still necessary to load their Angular top-level module. Those modules are defined in
            // the smartEditInnerAngularApps global variable.
            window.__smartedit__.smartEditInnerAngularApps.forEach(function (appName) {
                validApplications.push({
                    name: appName,
                    location: ''
                });
            });
            if (E2E_ENVIRONMENT && _this.SMARTEDIT_INNER_FILES) {
                // Note: This is only enabled on e2e tests. In production, this is removed by webpack.
                resources.js = _this.SMARTEDIT_INNER_FILES.map(function (filePath) { return ({
                    src: configurations.domain + filePath
                }); });
            }
            resources.js = resources.js.concat(validApplications.map(function (app) {
                var source = { src: app.location };
                return source;
            }));
            if (E2E_ENVIRONMENT && _this.SMARTEDIT_INNER_FILES_POST) {
                // Note: This is only enabled on e2e tests. In production, this is removed by webpack.
                resources.js = resources.js.concat(_this.SMARTEDIT_INNER_FILES_POST.map(function (filePath) { return ({
                    src: configurations.domain + filePath
                }); }));
            }
            resources.properties.applications = validApplications.map(function (app) { return app.name; });
            _this.smarteditBootstrapGateway
                .getInstance()
                .publish('bundle', { resources: resources });
        });
    };
    BootstrapService.prototype.bootstrapSEApp.$inject = ["configurations"];
    /* @ngInject */ BootstrapService.prototype._getLegacyContainerModule = function () {
        /* forbiddenNameSpaces angular.module:false */
        return angular.module('smarteditcontainer');
    };
    /* @ngInject */ BootstrapService.prototype._getConstants = function (configurations) {
        return {
            domain: configurations.domain,
            smarteditroot: configurations.smarteditroot
        };
    };
    BootstrapService.prototype._getConstants.$inject = ["configurations"];
    /**
     * Applications are considered valid if they can be retrieved over the wire
     */
    /* @ngInject */ BootstrapService.prototype._getValidApplications = function (applications) {
        var _this = this;
        return Promise.all(applications.map(function (application) {
            var deferred = _this.promiseUtils.defer();
            _this.httpClient.get(application.location, { responseType: 'text' }).subscribe(function () {
                deferred.resolve(application);
            }, function (e) {
                _this.logService.error("Failed to load application '" + application.name + "' from location " + application.location + "; SmartEdit functionality may be compromised.");
                deferred.resolve();
            });
            return deferred.promise;
        })).then(function (validApplications) { return lo.merge(lo.compact(validApplications)); });
    };
    BootstrapService.prototype._getValidApplications.$inject = ["applications"];
    /* @ngInject */ BootstrapService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(7, core.Inject('SMARTEDIT_INNER_FILES')),
        __param(8, core.Inject('SMARTEDIT_INNER_FILES_POST')),
        __metadata("design:paramtypes", [ConfigurationExtractorService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.LogService,
            http.HttpClient,
            smarteditcommons.PromiseUtils,
            smarteditcommons.SmarteditBootstrapGateway,
            smarteditcommons.ModuleUtils, Array, Array])
    ], /* @ngInject */ BootstrapService);
    return /* @ngInject */ BootstrapService;
}());

/**
 * LoadConfigManagerService is used to retrieve configurations stored in configuration API.
 */
var /* @ngInject */ LoadConfigManagerService = /** @class */ (function () {
    LoadConfigManagerService.$inject = ["restServicefactory", "sharedDataService", "logService", "promiseUtils", "SMARTEDIT_RESOURCE_URI_REGEXP", "SMARTEDIT_ROOT"];
    function /* @ngInject */ LoadConfigManagerService(restServicefactory, sharedDataService, logService, promiseUtils, SMARTEDIT_RESOURCE_URI_REGEXP, SMARTEDIT_ROOT) {
        this.sharedDataService = sharedDataService;
        this.logService = logService;
        this.promiseUtils = promiseUtils;
        this.SMARTEDIT_RESOURCE_URI_REGEXP = SMARTEDIT_RESOURCE_URI_REGEXP;
        this.SMARTEDIT_ROOT = SMARTEDIT_ROOT;
        this.restService = restServicefactory.get(smarteditcommons.CONFIGURATION_URI);
    }
    /**
     * Retrieves configuration from an API and returns as an array of mapped key/value pairs.
     *
     * ### Example:
     *
     *      loadConfigManagerService.loadAsArray().then(
     *          (response: ConfigurationItem[]) => {
     *              this._prettify(response);
     *          }));
     *
     *
     *
     * @returns  a promise of configuration values as an array of mapped configuration key/value pairs
     */
    /* @ngInject */ LoadConfigManagerService.prototype.loadAsArray = function () {
        var _this = this;
        var deferred = this.promiseUtils.defer();
        this.restService.query().then(function (response) {
            deferred.resolve(_this._parse(response));
        }, function (error) {
            _this.logService.log('Fail to load the configurations.', error);
            deferred.reject();
        });
        return deferred.promise;
    };
    /**
     * Retrieves a configuration from the API and converts it to an object.
     *
     * ### Example:
     *
     *
     *      loadConfigManagerService.loadAsObject().then((conf: ConfigurationObject) => {
     *          sharedDataService.set('defaultToolingLanguage', conf.defaultToolingLanguage);
     *      });
     *
     * @returns a promise of configuration values as an object of mapped configuration key/value pairs
     */
    /* @ngInject */ LoadConfigManagerService.prototype.loadAsObject = function () {
        var _this = this;
        var deferred = this.promiseUtils.defer();
        this.loadAsArray().then(function (response) {
            try {
                var conf = _this._convertToObject(response);
                _this.sharedDataService.set('configuration', conf);
                deferred.resolve(conf);
            }
            catch (e) {
                _this.logService.error('LoadConfigManager.loadAsObject - _convertToObject failed to load configuration:', response);
                _this.logService.error(e);
                deferred.reject();
            }
        });
        return deferred.promise;
    };
    /* @ngInject */ LoadConfigManagerService.prototype._convertToObject = function (configuration) {
        var _this = this;
        var configurations = configuration.reduce(function (previous, current) {
            try {
                if (typeof previous[current.key] !== 'undefined') {
                    _this.logService.error('LoadConfigManager._convertToObject() - duplicate configuration keys found: ' +
                        current.key);
                }
                previous[current.key] = JSON.parse(current.value);
            }
            catch (parseError) {
                _this.logService.error('item _key_ from configuration contains unparsable JSON data _value_ and was ignored'
                    .replace('_key_', current.key)
                    .replace('_value_', current.value));
            }
            return previous;
        }, {});
        try {
            configurations.domain = this.SMARTEDIT_RESOURCE_URI_REGEXP.exec(this._getLocation())[1];
        }
        catch (e) {
            throw new Error("location " + this._getLocation() + " doesn't match the expected pattern " + this.SMARTEDIT_RESOURCE_URI_REGEXP);
        }
        configurations.smarteditroot = configurations.domain + '/' + this.SMARTEDIT_ROOT;
        return configurations;
    };
    LoadConfigManagerService.prototype._convertToObject.$inject = ["configuration"];
    /* @ngInject */ LoadConfigManagerService.prototype._getLocation = function () {
        return document.location.href;
    };
    // FIXME: weird on an array and useless
    /* @ngInject */ LoadConfigManagerService.prototype._parse = function (configuration) {
        var conf = lo.cloneDeep(configuration);
        Object.keys(conf).forEach(function (key) {
            try {
                conf[key] = JSON.parse(conf[key]);
            }
            catch (e) {
                //
            }
        });
        return conf;
    };
    LoadConfigManagerService.prototype._parse.$inject = ["configuration"];
    /* @ngInject */ LoadConfigManagerService = __decorate([
        smarteditcommons.SeDowngradeService(),
        smarteditcommons.OperationContextRegistered(smarteditcommons.CONFIGURATION_URI, 'TOOLING'),
        core.Injectable(),
        __param(4, core.Inject('SMARTEDIT_RESOURCE_URI_REGEXP')),
        __param(5, core.Inject('SMARTEDIT_ROOT')),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory,
            smarteditcommons.ISharedDataService,
            smarteditcommons.LogService,
            smarteditcommons.PromiseUtils,
            RegExp, String])
    ], /* @ngInject */ LoadConfigManagerService);
    return /* @ngInject */ LoadConfigManagerService;
}());

var ANNOUNCEMENT_DEFAULTS = {
    timeout: 5000,
    closeable: true
};
var /* @ngInject */ AnnouncementService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AnnouncementService, _super);
    AnnouncementService.$inject = ["logService"];
    function /* @ngInject */ AnnouncementService(logService) {
        var _this = _super.call(this) || this;
        _this.logService = logService;
        _this.announcements$ = new rxjs.BehaviorSubject([]);
        return _this;
    }
    /* @ngInject */ AnnouncementService.prototype.showAnnouncement = function (announcementConfig) {
        var _this = this;
        this.validateAnnouncementConfig(announcementConfig);
        var announcement = lo.clone(announcementConfig);
        announcement.id = smarteditcommons.stringUtils.encode(announcementConfig);
        announcement.timeout =
            !!announcement.timeout && announcement.timeout > 0
                ? announcement.timeout
                : ANNOUNCEMENT_DEFAULTS.timeout;
        if (announcement.timeout > 0) {
            announcement.timer = setTimeout(function () {
                _this._closeAnnouncement(announcement);
            }, announcement.timeout);
        }
        this.announcements$.next(__spreadArrays(this.announcements$.getValue(), [announcement]));
        return Promise.resolve(announcement.id);
    };
    AnnouncementService.prototype.showAnnouncement.$inject = ["announcementConfig"];
    /* @ngInject */ AnnouncementService.prototype.getAnnouncements = function () {
        return this.announcements$.asObservable();
    };
    /* @ngInject */ AnnouncementService.prototype.closeAnnouncement = function (announcementId) {
        var announcement = this.announcements$
            .getValue()
            .find(function (announcementObj) { return announcementObj.id === announcementId; });
        if (announcement) {
            this._closeAnnouncement(announcement);
        }
        return Promise.resolve();
    };
    AnnouncementService.prototype.closeAnnouncement.$inject = ["announcementId"];
    /* @ngInject */ AnnouncementService.prototype._closeAnnouncement = function (announcement) {
        if (announcement.timer) {
            clearTimeout(announcement.timer);
        }
        var announcements = this.announcements$.getValue();
        var newAnnouncements = announcements.filter(function (announcementObj) { return announcementObj.id !== announcement.id; });
        this.announcements$.next(newAnnouncements);
    };
    AnnouncementService.prototype._closeAnnouncement.$inject = ["announcement"];
    /**
     * Validates a given announcement data.
     * An announcement must contain only one of either message, template, or templateUrl property.
     */
    /* @ngInject */ AnnouncementService.prototype.validateAnnouncementConfig = function (announcementConfig) {
        var message = announcementConfig.message, template = announcementConfig.template, templateUrl = announcementConfig.templateUrl, component = announcementConfig.component;
        if (!message && !template && !templateUrl && !component) {
            this.logService.warn('AnnouncementService._validateAnnouncementConfig - announcement must contain at least a message, template, templateUrl or component property', announcementConfig);
        }
        if ((message && (template || templateUrl || component)) ||
            (template && (message || templateUrl || component)) ||
            (templateUrl && (message || template || component)) ||
            (component && (message || template || templateUrl))) {
            throw new Error('AnnouncementService._validateAnnouncementConfig - only one template type is allowed for an announcement: message, template, templateUrl or component');
        }
    };
    AnnouncementService.prototype.validateAnnouncementConfig.$inject = ["announcementConfig"];
    /* @ngInject */ AnnouncementService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IAnnouncementService),
        smarteditcommons.GatewayProxied('showAnnouncement', 'closeAnnouncement'),
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.LogService])
    ], /* @ngInject */ AnnouncementService);
    return /* @ngInject */ AnnouncementService;
}(smarteditcommons.IAnnouncementService));

/**
 * The notification service is used to display visual cues to inform the user of the state of the application.
 */
/** @internal */
var /* @ngInject */ NotificationService = /** @class */ (function () {
    NotificationService.$inject = ["systemEventService", "logService"];
    function /* @ngInject */ NotificationService(systemEventService, logService) {
        this.systemEventService = systemEventService;
        this.logService = logService;
        this.notificationsChangeAction = new rxjs.BehaviorSubject(undefined);
        this.notifications = new rxjs.BehaviorSubject([]);
        this.initNotificationsChangeAction();
    }
    /* @ngInject */ NotificationService.prototype.ngOnDestroy = function () {
        this.notifications.unsubscribe();
        this.notificationsChangeAction.unsubscribe();
    };
    /* @ngInject */ NotificationService.prototype.pushNotification = function (configuration) {
        this._validate(configuration);
        var action = {
            type: "PUSH" /* PUSH */,
            payload: configuration
        };
        this.notificationsChangeAction.next(action);
        return Promise.resolve();
    };
    NotificationService.prototype.pushNotification.$inject = ["configuration"];
    /* @ngInject */ NotificationService.prototype.removeNotification = function (notificationId) {
        var action = {
            type: "REMOVE" /* REMOVE */,
            payload: {
                id: notificationId
            }
        };
        this.notificationsChangeAction.next(action);
        return Promise.resolve();
    };
    NotificationService.prototype.removeNotification.$inject = ["notificationId"];
    /* @ngInject */ NotificationService.prototype.removeAllNotifications = function () {
        var action = {
            type: "REMOVE_ALL" /* REMOVE_ALL */
        };
        this.notificationsChangeAction.next(action);
        return Promise.resolve();
    };
    /* @ngInject */ NotificationService.prototype.isNotificationDisplayed = function (notificationId) {
        return !!this.getNotification(notificationId);
    };
    NotificationService.prototype.isNotificationDisplayed.$inject = ["notificationId"];
    /* @ngInject */ NotificationService.prototype.getNotification = function (notificationId) {
        return this.notifications
            .getValue()
            .find(function (notification) { return notification.id === notificationId; });
    };
    NotificationService.prototype.getNotification.$inject = ["notificationId"];
    /* @ngInject */ NotificationService.prototype.getNotifications = function () {
        return this.notifications.asObservable();
    };
    /* @ngInject */ NotificationService.prototype.initNotificationsChangeAction = function () {
        var _this = this;
        this.notificationsChangeAction
            .pipe(operators.distinctUntilChanged(function (_, action) { return _this.emitWhenActionIsAvailable(action); }), 
        // Skip first emission with "undefined" value.
        // First "undefined" is needed for invoking distinctUntilChanged (which requires at least 2 values emited) when first notification is added.
        operators.skip(1), operators.map(function (action) { return _this.resolveNotifications(action); }))
            .subscribe(function (notifications) {
            _this.notifications.next(notifications);
            _this.systemEventService.publishAsync(smarteditcommons.EVENT_NOTIFICATION_CHANGED);
        });
    };
    /**
     * Meant for case when a user has quickly pressed ESC key multiple times.
     * There might be some delay when adding / removing a notification because these methods are called in async context.
     * This may lead to the situation where notification has not yet been removed, but ESC key has called the pushNotification.
     *
     * @returns false (emit), true (do not emit)
     */
    /* @ngInject */ NotificationService.prototype.emitWhenActionIsAvailable = function (action) {
        var newNotification = action.payload;
        var notification = (action.type === "PUSH" /* PUSH */ ||
            action.type === "REMOVE" /* REMOVE */) &&
            this.getNotification(newNotification.id);
        switch (action.type) {
            case "PUSH" /* PUSH */:
                if (notification) {
                    this.logService.debug("Notification already exists for id:\"" + newNotification.id + "\"");
                    return true;
                }
                return false;
            case "REMOVE" /* REMOVE */:
                if (!notification) {
                    this.logService.debug("Attempt to remove a non existing notification for id:\"" + newNotification.id + "\"");
                    return true;
                }
                return false;
            case "REMOVE_ALL" /* REMOVE_ALL */:
                return false;
        }
    };
    NotificationService.prototype.emitWhenActionIsAvailable.$inject = ["action"];
    /* @ngInject */ NotificationService.prototype.resolveNotifications = function (action) {
        var newNotification = action.payload;
        switch (action.type) {
            case "PUSH" /* PUSH */:
                return __spreadArrays(this.notifications.getValue(), [newNotification]);
            case "REMOVE" /* REMOVE */:
                return this.notifications
                    .getValue()
                    .filter(function (notification) { return notification.id !== newNotification.id; });
            case "REMOVE_ALL" /* REMOVE_ALL */:
                return [];
        }
    };
    NotificationService.prototype.resolveNotifications.$inject = ["action"];
    /* @ngInject */ NotificationService.prototype._validate = function (configuration) {
        var _a = configuration || {}, id = _a.id, template = _a.template, templateUrl = _a.templateUrl, componentName = _a.componentName;
        if (!configuration) {
            throw new Error('notificationService.pushNotification: Configuration is required');
        }
        if (!id) {
            throw new Error('notificationService.pushNotification: Notification ID cannot be undefined or null or empty');
        }
        if (!template && !templateUrl && !componentName) {
            throw new Error('notificationService.pushNotification: Configuration must contain a componentName, template, templateUrl');
        }
        if ((template && (templateUrl || componentName)) ||
            (templateUrl && (template || componentName)) ||
            (componentName && (template || templateUrl))) {
            throw new Error('notificationService.pushNotification: Only one template type is allowed for Configuration: componentName, template, templateUrl');
        }
    };
    NotificationService.prototype._validate.$inject = ["configuration"];
    /* @ngInject */ NotificationService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.INotificationService),
        smarteditcommons.GatewayProxied('pushNotification', 'removeNotification', 'removeAllNotifications'),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService, smarteditcommons.LogService])
    ], /* @ngInject */ NotificationService);
    return /* @ngInject */ NotificationService;
}());

/**
 * This service makes it possible to track the mouse position to detect when it leaves the notification panel.
 * It is solely meant to be used with the notificationService.
 */
/** @internal */
var /* @ngInject */ NotificationMouseLeaveDetectionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ NotificationMouseLeaveDetectionService, _super);
    NotificationMouseLeaveDetectionService.$inject = ["document", "windowUtils"];
    function /* @ngInject */ NotificationMouseLeaveDetectionService(document, windowUtils) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.windowUtils = windowUtils;
        _this.notificationPanelBounds = null;
        _this.mouseLeaveCallback = null;
        /*
         * We need to bind the function in order for it to execute within the service's
         * scope and store it to be able to un-register the listener.
         */
        _this._onMouseMove = _this._onMouseMove.bind(_this);
        return _this;
    }
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype.startDetection = function (outerBounds, innerBounds, callback) {
        this.validateBounds(outerBounds);
        if (!callback) {
            throw new Error('Callback function is required');
        }
        this.notificationPanelBounds = outerBounds;
        this.mouseLeaveCallback = callback;
        this.document.addEventListener('mousemove', this._onMouseMove);
        if (innerBounds) {
            this.validateBounds(innerBounds);
            this._remoteStartDetection(innerBounds);
        }
        return Promise.resolve();
    };
    NotificationMouseLeaveDetectionService.prototype.startDetection.$inject = ["outerBounds", "innerBounds", "callback"];
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype.stopDetection = function () {
        this.document.removeEventListener('mousemove', this._onMouseMove);
        this.notificationPanelBounds = null;
        this.mouseLeaveCallback = null;
        if (this.windowUtils.getGatewayTargetFrame()) {
            this._remoteStopDetection();
        }
        return Promise.resolve();
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._callCallback = function () {
        this._getCallback().then(function (callback) {
            if (callback) {
                callback();
            }
        });
        return Promise.resolve();
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._getBounds = function () {
        return Promise.resolve(this.notificationPanelBounds);
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype._getCallback = function () {
        return Promise.resolve(this.mouseLeaveCallback);
    };
    /* @ngInject */ NotificationMouseLeaveDetectionService.prototype.validateBounds = function (bounds) {
        if (!bounds) {
            throw new Error('Bounds are required for mouse leave detection');
        }
        if (!bounds.hasOwnProperty('x')) {
            throw new Error('Bounds must contain the x coordinate');
        }
        if (!bounds.hasOwnProperty('y')) {
            throw new Error('Bounds must contain the y coordinate');
        }
        if (!bounds.hasOwnProperty('width')) {
            throw new Error('Bounds must contain the width dimension');
        }
        if (!bounds.hasOwnProperty('height')) {
            throw new Error('Bounds must contain the height dimension');
        }
    };
    NotificationMouseLeaveDetectionService.prototype.validateBounds.$inject = ["bounds"];
    /* @ngInject */ NotificationMouseLeaveDetectionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.INotificationMouseLeaveDetectionService),
        smarteditcommons.GatewayProxied('stopDetection', '_remoteStartDetection', '_remoteStopDetection', '_callCallback'),
        core.Injectable(),
        __param(0, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [Document, smarteditcommons.WindowUtils])
    ], /* @ngInject */ NotificationMouseLeaveDetectionService);
    return /* @ngInject */ NotificationMouseLeaveDetectionService;
}(smarteditcommons.INotificationMouseLeaveDetectionService));

/*
 * internal service to proxy calls from inner RESTService to the outer restServiceFactory and the 'real' IRestService
 */
/** @internal */
var /* @ngInject */ DelegateRestService = /** @class */ (function () {
    DelegateRestService.$inject = ["restServiceFactory"];
    function /* @ngInject */ DelegateRestService(restServiceFactory) {
        this.restServiceFactory = restServiceFactory;
    }
    /* @ngInject */ DelegateRestService.prototype.delegateForSingleInstance = function (methodName, params, uri, identifier, metadataActivated, options) {
        var restService = this.restServiceFactory.get(uri, identifier);
        if (metadataActivated) {
            restService.activateMetadata();
        }
        return restService.getMethodForSingleInstance(methodName)(params, options);
    };
    DelegateRestService.prototype.delegateForSingleInstance.$inject = ["methodName", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForArray = function (methodName, params, uri, identifier, metadataActivated, options) {
        var restService = this.restServiceFactory.get(uri, identifier);
        if (metadataActivated) {
            restService.activateMetadata();
        }
        return restService.getMethodForArray(methodName)(params, options);
    };
    DelegateRestService.prototype.delegateForArray.$inject = ["methodName", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForPage = function (pageable, uri, identifier, metadataActivated, options) {
        var restService = this.restServiceFactory.get(uri, identifier);
        if (metadataActivated) {
            restService.activateMetadata();
        }
        return restService.page(pageable, options);
    };
    DelegateRestService.prototype.delegateForPage.$inject = ["pageable", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService.prototype.delegateForQueryByPost = function (payload, params, uri, identifier, metadataActivated, options) {
        var restService = this.restServiceFactory.get(uri, identifier);
        if (metadataActivated) {
            restService.activateMetadata();
        }
        return restService.queryByPost(payload, params, options);
    };
    DelegateRestService.prototype.delegateForQueryByPost.$inject = ["payload", "params", "uri", "identifier", "metadataActivated", "options"];
    /* @ngInject */ DelegateRestService = __decorate([
        smarteditcommons.GatewayProxied(),
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory])
    ], /* @ngInject */ DelegateRestService);
    return /* @ngInject */ DelegateRestService;
}());

/** @internal */
var DEVICE_ORIENTATIONS = [
    {
        orientation: 'vertical',
        key: 'se.deviceorientation.vertical.label',
        default: true
    },
    {
        orientation: 'horizontal',
        key: 'se.deviceorientation.horizontal.label'
    }
];

/** @internal */
var DEVICE_SUPPORTS = [
    {
        iconClass: 'sap-icon--iphone',
        type: 'phone',
        width: 480
    },
    {
        iconClass: 'sap-icon--iphone-2',
        type: 'wide-phone',
        width: 600
    },
    {
        iconClass: 'sap-icon--ipad',
        type: 'tablet',
        width: 700
    },
    {
        iconClass: 'sap-icon--ipad-2',
        type: 'wide-tablet',
        width: 1024
    },
    {
        iconClass: 'sap-icon--sys-monitor',
        type: 'desktop',
        width: 1200
    },
    {
        iconClass: 'hyicon hyicon-wide-screen',
        type: 'wide-desktop',
        width: '100%',
        default: true
    }
];

/**
 * The iFrame Manager service provides methods to load the storefront into an iframe. The preview of the storefront can be loaded for a specified input homepage and a specified preview ticket. The iframe src attribute is updated with that information in order to display the storefront in SmartEdit.
 */
var /* @ngInject */ IframeManagerService = /** @class */ (function () {
    IframeManagerService.$inject = ["logService", "httpClient", "yjQuery", "windowUtils", "sharedDataService"];
    function /* @ngInject */ IframeManagerService(logService, httpClient, yjQuery, windowUtils, sharedDataService) {
        this.logService = logService;
        this.httpClient = httpClient;
        this.yjQuery = yjQuery;
        this.windowUtils = windowUtils;
        this.sharedDataService = sharedDataService;
    }
    /* @ngInject */ IframeManagerService_1 = /* @ngInject */ IframeManagerService;
    /**
     * This method sets the current page location and stores it in the service. The storefront will be loaded with this location.
     *
     * @param URL Location to be stored
     */
    /* @ngInject */ IframeManagerService.prototype.setCurrentLocation = function (location) {
        this.currentLocation = location;
    };
    IframeManagerService.prototype.setCurrentLocation.$inject = ["location"];
    /* @ngInject */ IframeManagerService.prototype.getIframe = function () {
        return this.yjQuery(this.windowUtils.getSmarteditIframe());
    };
    /* @ngInject */ IframeManagerService.prototype.isCrossOrigin = function () {
        return this.windowUtils.isCrossOrigin(this.currentLocation);
    };
    /**
     * This method loads the storefront within an iframe by setting the src attribute to the specified input URL.
     * If this method is called within the context of a new or updated experience, prior to the loading, it will check if the page exists.
     * If the pages does not exist (the server returns a 404 and a content-type:text/html), the user will be redirected to the homepage of the storefront. Otherwise,
     * the user will be redirected to the requested page for the experience.
     *
     * @param URL The URL of the storefront.
     * @param checkIfFailingHTML Boolean indicating if we need to check if the page call returns a 404
     * @param homepageInPreviewMode URL of the storefront homepage in preview mode if it's a new experience
     *
     */
    /* @ngInject */ IframeManagerService.prototype.load = function (url, checkIfFailingHTML, pageInPreviewMode) {
        var _this = this;
        if (checkIfFailingHTML) {
            return this._getPageAsync(url).then(function () {
                _this.getIframe().attr('src', url);
            }, function (error) {
                if (error.status === 404) {
                    _this.getIframe().attr('src', pageInPreviewMode);
                    return;
                }
                _this.logService.error("IFrameManagerService.load - _getPageAsync failed with error " + error);
            });
        }
        else {
            this.logService.debug('iframeManagerService::load - loading storefront url:', url);
            this.getIframe().attr('src', url);
            return Promise.resolve();
        }
    };
    IframeManagerService.prototype.load.$inject = ["url", "checkIfFailingHTML", "pageInPreviewMode"];
    /**
     * This method loads the preview of the storefront for a specified input homepage URL or a page from the page list, and for a specified preview ticket.
     * This method will add '/cx-preview' as specified in configuration.storefrontPreviewRoute to the URI and append the preview ticket in the query string.
     * <br/>If it is an initial load, [load]{@link IframeManagerService#load} will be called with this modified homepage or page from page list.
     * <br/>If it is a subsequent call, the modified homepage will be called through Ajax to initialize the preview (storefront constraint) and then
     * [load]{@link IframeManagerService#load} will be called with the current location.
     *
     * @param homePageOrPageFromPageList The URL of the storefront homepage or a page from the page list for a given experience context.
     * @param  previewTicket The preview ticket.
     */
    /* @ngInject */ IframeManagerService.prototype.loadPreview = function (homePageOrPageFromPageList, previewTicket) {
        var _this = this;
        this.windowUtils.setTrustedIframeDomain(homePageOrPageFromPageList);
        this.logService.debug('loading storefront iframe with preview ticket:', previewTicket);
        var promiseToResolve;
        if (!/.+\.html/.test(homePageOrPageFromPageList)) {
            // for testing purposes
            promiseToResolve = this._appendURISuffix(homePageOrPageFromPageList);
        }
        else {
            promiseToResolve = Promise.resolve(homePageOrPageFromPageList);
        }
        return promiseToResolve.then(function (previewURL) {
            var pageInPreviewMode = previewURL +
                (previewURL.indexOf('?') === -1 ? '?' : '&') +
                'cmsTicketId=' +
                previewTicket;
            // If we don't have a current location, or the current location is the homePage or a page from page list, or the current location has a cmsTicketID
            if (_this._mustLoadAsSuch(homePageOrPageFromPageList)) {
                return _this.load(pageInPreviewMode);
            }
            else {
                var isCrossOrigin_1 = _this.isCrossOrigin();
                /*
                 * check failing HTML only if same origin to prevent CORS errors.
                 * if location to reload in new experience context is different from homepage, one will have to
                 * first load the home page in preview mode and then access the location without preview mode
                 */
                return (isCrossOrigin_1
                    ? Promise.resolve({})
                    : _this._getPageAsync(pageInPreviewMode)).then(function () {
                    // FIXME: use gatewayProxy to load url from the inner
                    return _this.load(_this.currentLocation, !isCrossOrigin_1, pageInPreviewMode);
                }, function (error) { return _this.logService.error('failed to load preview', error); });
            }
        });
    };
    IframeManagerService.prototype.loadPreview.$inject = ["homePageOrPageFromPageList", "previewTicket"];
    /* @ngInject */ IframeManagerService.prototype.apply = function (deviceSupport, deviceOrientation) {
        var width;
        var height;
        var isVertical = true;
        if (deviceOrientation && deviceOrientation.orientation) {
            isVertical = deviceOrientation.orientation === 'vertical';
        }
        if (deviceSupport) {
            width = isVertical ? deviceSupport.width : deviceSupport.height;
            height = isVertical ? deviceSupport.height : deviceSupport.width;
            // hardcoded the name to default to remove the device skin
            this.getIframe()
                .removeClass()
                .addClass('device-' + (isVertical ? 'vertical' : 'horizontal') + ' device-default');
        }
        else {
            this.getIframe().removeClass();
        }
        this.getIframe().css({
            width: width || '100%',
            height: height || '100%',
            display: 'block',
            margin: 'auto'
        });
    };
    IframeManagerService.prototype.apply.$inject = ["deviceSupport", "deviceOrientation"];
    /* @ngInject */ IframeManagerService.prototype.applyDefault = function () {
        var defaultDeviceSupport = DEVICE_SUPPORTS.find(function (deviceSupport) { return deviceSupport.default; });
        var defaultDeviceOrientation = DEVICE_ORIENTATIONS.find(function (deviceOrientation) { return deviceOrientation.default; });
        this.apply(defaultDeviceSupport, defaultDeviceOrientation);
    };
    /*
     * if currentLocation is not set yet, it means that this is a first loading and we are trying to load the homepage,
     * or if the page has a ticket ID but is not the homepage, it means that we try to load a page from the page list.
     * For those scenarios, we want to load the page as such in preview mode.
     */
    /* @ngInject */ IframeManagerService.prototype._mustLoadAsSuch = function (homePageOrPageFromPageList) {
        return (!this.currentLocation ||
            smarteditcommons.urlUtils.getURI(homePageOrPageFromPageList) === smarteditcommons.urlUtils.getURI(this.currentLocation) ||
            'cmsTicketId' in smarteditcommons.urlUtils.parseQuery(this.currentLocation));
    };
    IframeManagerService.prototype._mustLoadAsSuch.$inject = ["homePageOrPageFromPageList"];
    /* @ngInject */ IframeManagerService.prototype._getPageAsync = function (url) {
        return this.httpClient.get(url, { observe: 'body', responseType: 'text' }).toPromise();
    };
    IframeManagerService.prototype._getPageAsync.$inject = ["url"];
    /* @ngInject */ IframeManagerService.prototype._appendURISuffix = function (url) {
        var _this = this;
        var pair = url.split('?');
        return this.sharedDataService
            .get('configuration')
            .then(function (configuration) {
            if (!configuration || !configuration.storefrontPreviewRoute) {
                _this.logService.debug("SmartEdit configuration for 'storefrontPreviewRoute' is not found. Fallback to default value: '" +
                    /* @ngInject */ IframeManagerService_1.DEFAULT_PREVIEW_ROUTE +
                    "'");
                return /* @ngInject */ IframeManagerService_1.DEFAULT_PREVIEW_ROUTE;
            }
            return configuration.storefrontPreviewRoute;
        })
            .then(function (previewRoute) {
            return pair[0]
                .replace(/(.+)([^\/])$/g, '$1$2/' + previewRoute)
                .replace(/(.+)\/$/g, '$1/' + previewRoute) +
                (pair.length === 2 ? '?' + pair[1] : '');
        });
    };
    IframeManagerService.prototype._appendURISuffix.$inject = ["url"];
    var /* @ngInject */ IframeManagerService_1;
    /* @ngInject */ IframeManagerService.DEFAULT_PREVIEW_ROUTE = 'cx-preview';
    /* @ngInject */ IframeManagerService = /* @ngInject */ IframeManagerService_1 = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(2, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            http.HttpClient, Function, smarteditcommons.WindowUtils,
            smarteditcommons.ISharedDataService])
    ], /* @ngInject */ IframeManagerService);
    return /* @ngInject */ IframeManagerService;
}());

/**
 * Polyfill for HTML5 Drag and Drop in a cross-origin setup.
 * Most browsers (except Firefox) do not allow on-page drag-and-drop from non-same-origin frames.
 * This service is a polyfill to allow it, by listening the 'dragover' event over a sibling <div> of the iframe and sending the mouse position to the inner frame.
 * The inner frame 'DragAndDropCrossOriginInner' will use document.elementFromPoint (or isPointOverElement helper function for IE only) to determine the current hovered element and then dispatch drag events onto elligible droppable elements.
 *
 * More information about security restrictions:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=251718
 * https://bugs.chromium.org/p/chromium/issues/detail?id=59081
 * https://www.infosecurity-magazine.com/news/new-google-chrome-clickjacking-vulnerability/
 * https://bugzilla.mozilla.org/show_bug.cgi?id=605991
 */
/** @internal */
var /* @ngInject */ DragAndDropCrossOrigin = /** @class */ (function (_super) {
    __extends(/* @ngInject */ DragAndDropCrossOrigin, _super);
    DragAndDropCrossOrigin.$inject = ["yjQuery", "crossFrameEventService", "iframeManagerService"];
    function /* @ngInject */ DragAndDropCrossOrigin(yjQuery, crossFrameEventService, iframeManagerService) {
        var _this = _super.call(this) || this;
        _this.yjQuery = yjQuery;
        _this.crossFrameEventService = crossFrameEventService;
        _this.iframeManagerService = iframeManagerService;
        _this.onDragStart = function () {
            if (!_this.isEnabled()) {
                return;
            }
            _this.crossFrameEventService.publish(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_CROSS_ORIGIN_START);
            _this.syncIframeDragArea()
                .show()
                .off('dragover') // `off()` is necessary since dragEnd event is not always fired.
                .on('dragover', function (e) {
                e.preventDefault(); // `preventDefault()` is necessary for the 'drop' event callback to be fired.
                var mousePosition = _this.getPositionRelativeToIframe(e.pageX, e.pageY);
                _this.throttledSendMousePosition(mousePosition);
                return false;
            })
                .off('drop')
                .on('drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var mousePosition = _this.getPositionRelativeToIframe(e.pageX, e.pageY);
                _this.crossFrameEventService.publish(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DROP_ELEMENT, mousePosition);
                return false;
            });
        };
        _this.onDragEnd = function () {
            if (!_this.isEnabled()) {
                return;
            }
            _this.getIframeDragArea().off('dragover').off('drop').hide();
        };
        _this.sendMousePosition = function (mousePosition) {
            _this.crossFrameEventService.publish(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.TRACK_MOUSE_POSITION, mousePosition);
        };
        return _this;
    }
    /* @ngInject */ DragAndDropCrossOrigin.prototype.initialize = function () {
        var _this = this;
        this.throttledSendMousePosition = lo.throttle(this.sendMousePosition, smarteditcommons.SEND_MOUSE_POSITION_THROTTLE);
        this.crossFrameEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_START, this.onDragStart);
        this.crossFrameEventService.subscribe(smarteditcommons.SMARTEDIT_DRAG_AND_DROP_EVENTS.DRAG_DROP_END, this.onDragEnd);
        this.crossFrameEventService.subscribe(smarteditcommons.DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME.START, function () {
            if (_this.isEnabled()) {
                _this.iframeManagerService.getIframe().css('pointer-events', 'none');
            }
        });
        this.crossFrameEventService.subscribe(smarteditcommons.DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME.END, function () {
            if (_this.isEnabled()) {
                _this.iframeManagerService.getIframe().css('pointer-events', 'auto');
            }
        });
    };
    /* @ngInject */ DragAndDropCrossOrigin.prototype.isEnabled = function () {
        return this.iframeManagerService.isCrossOrigin();
    };
    /* @ngInject */ DragAndDropCrossOrigin.prototype.getIframeDragArea = function () {
        return this.yjQuery('#' + smarteditcommons.SMARTEDIT_IFRAME_DRAG_AREA);
    };
    /* @ngInject */ DragAndDropCrossOrigin.prototype.getPositionRelativeToIframe = function (posX, posY) {
        var iframeOffset = this.getIframeDragArea().offset();
        return {
            x: posX - iframeOffset.left,
            y: posY - iframeOffset.top
        };
    };
    DragAndDropCrossOrigin.prototype.getPositionRelativeToIframe.$inject = ["posX", "posY"];
    /* @ngInject */ DragAndDropCrossOrigin.prototype.syncIframeDragArea = function () {
        this.getIframeDragArea().width(this.iframeManagerService.getIframe().width());
        this.getIframeDragArea().height(this.iframeManagerService.getIframe().height());
        var iframeOffset = this.iframeManagerService.getIframe().offset();
        this.getIframeDragArea().css({
            top: iframeOffset.top,
            left: iframeOffset.left
        });
        return this.getIframeDragArea();
    };
    /* @ngInject */ DragAndDropCrossOrigin = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IDragAndDropCrossOrigin),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function, smarteditcommons.CrossFrameEventService,
            IframeManagerService])
    ], /* @ngInject */ DragAndDropCrossOrigin);
    return /* @ngInject */ DragAndDropCrossOrigin;
}(smarteditcommons.IDragAndDropCrossOrigin));

/**
 * The Site Service fetches all sites configured on the hybris platform using REST calls to the cmswebservices sites API.
 */
var /* @ngInject */ SiteService = /** @class */ (function () {
    SiteService.$inject = ["restServiceFactory"];
    function /* @ngInject */ SiteService(restServiceFactory) {
        this.SITES_FOR_CATALOGS_URI = '/cmswebservices/v1/sites/catalogs';
        this.cache = null;
        this.siteRestService = restServiceFactory.get(smarteditcommons.SITES_RESOURCE_URI);
        this.sitesForCatalogsRestService = restServiceFactory.get(this.SITES_FOR_CATALOGS_URI);
    }
    /**
     * Fetches a list of sites for which user has at-least read access to one of the non-active catalog versions.
     *
     * @returns A promise of [ISite]{@link ISite} array.
     */
    /* @ngInject */ SiteService.prototype.getAccessibleSites = function () {
        return this.siteRestService.get({}).then(function (sitesDTO) { return sitesDTO.sites; });
    };
    /**
     * Fetches a list of sites configured for accessible sites. The list of sites fetched using REST calls through
     * the cmswebservices sites API.
     *
     * @returns A promise of [ISite]{@link ISite} array.
     */
    /* @ngInject */ SiteService.prototype.getSites = function () {
        var _this = this;
        //  Uses two REST API calls because of multicountry. The first call gives all the sites for which the user has permissions to.
        return this.getAccessibleSites().then(function (sites) {
            var catalogIds = sites.reduce(function (catalogs, site) { return __spreadArrays((catalogs || []), site.contentCatalogs); }, []);
            // The call with catalogIds gives all the corresponding sites in the hierarchy.
            return _this.sitesForCatalogsRestService
                .save({
                catalogIds: catalogIds
            })
                .then(function (allSites) {
                _this.cache = allSites.sites;
                return _this.cache;
            });
        });
    };
    /**
     * Fetches a site, configured on the hybris platform, by its uid. The sites fetched using REST calls through
     * cmswebservices sites API.
     *
     * @param uid unique site ID
     * @returns A promise of [ISite]{@link ISite}.
     */
    /* @ngInject */ SiteService.prototype.getSiteById = function (uid) {
        return this.getSites().then(function (sites) { return sites.find(function (site) { return site.uid === uid; }); });
    };
    SiteService.prototype.getSiteById.$inject = ["uid"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.authorizationEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ SiteService.prototype, "getAccessibleSites", null);
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.authorizationEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ SiteService.prototype, "getSites", null);
    /* @ngInject */ SiteService = __decorate([
        smarteditcommons.SeDowngradeService(),
        smarteditcommons.OperationContextRegistered('SITES_RESOURCE_URI', 'CMS'),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory])
    ], /* @ngInject */ SiteService);
    return /* @ngInject */ SiteService;
}());

/** @internal */
var /* @ngInject */ ExperienceService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ ExperienceService, _super);
    ExperienceService.$inject = ["seStorageManager", "storagePropertiesService", "logService", "crossFrameEventService", "siteService", "previewService", "catalogService", "languageService", "sharedDataService", "iframeManagerService", "routingService"];
    function /* @ngInject */ ExperienceService(seStorageManager, storagePropertiesService, logService, crossFrameEventService, siteService, previewService, catalogService, languageService, sharedDataService, iframeManagerService, routingService) {
        var _this = _super.call(this) || this;
        _this.seStorageManager = seStorageManager;
        _this.storagePropertiesService = storagePropertiesService;
        _this.logService = logService;
        _this.crossFrameEventService = crossFrameEventService;
        _this.siteService = siteService;
        _this.previewService = previewService;
        _this.catalogService = catalogService;
        _this.languageService = languageService;
        _this.sharedDataService = sharedDataService;
        _this.iframeManagerService = iframeManagerService;
        _this.routingService = routingService;
        _this.storageLoaded$ = new rxjs.BehaviorSubject(false);
        seStorageManager
            .getStorage({
            storageId: smarteditcommons.EXPERIENCE_STORAGE_KEY,
            storageType: storagePropertiesService.getProperty('STORAGE_TYPE_SESSION_STORAGE')
        })
            .then(function (_storage) {
            _this.experienceStorage = _storage;
            _this.storageLoaded$.next(true);
        });
        return _this;
    }
    /**
     * Given an object containing a siteId, catalogId, catalogVersion and catalogVersions (array of product catalog version uuid's), will return a reconstructed experience
     *
     */
    /* @ngInject */ ExperienceService.prototype.buildAndSetExperience = function (params) {
        var _this = this;
        var siteId = params.siteId;
        var catalogId = params.catalogId;
        var catalogVersion = params.catalogVersion;
        var productCatalogVersions = params.productCatalogVersions;
        return Promise.all([
            this.siteService.getSiteById(siteId),
            this.catalogService.getContentCatalogsForSite(siteId),
            this.catalogService.getProductCatalogsForSite(siteId),
            this.languageService.getLanguagesForSite(siteId)
        ]).then(function (_a) {
            var siteDescriptor = _a[0], catalogs = _a[1], productCatalogs = _a[2], languages = _a[3];
            var currentCatalog = catalogs.find(function (catalog) { return catalog.catalogId === catalogId; });
            var currentCatalogVersion = currentCatalog
                ? currentCatalog.versions.find(function (result) { return result.version === catalogVersion; })
                : null;
            if (!currentCatalogVersion) {
                return Promise.reject("no catalogVersionDescriptor found for " + catalogId + " catalogId and " + catalogVersion + " catalogVersion");
            }
            var currentExperienceProductCatalogVersions = [];
            productCatalogs.forEach(function (productCatalog) {
                // for each product catalog either choose the version already present in the params or choose the active version.
                var currentProductCatalogVersion = productCatalog.versions.find(function (version) {
                    return productCatalogVersions
                        ? productCatalogVersions.indexOf(version.uuid) > -1
                        : version.active === true;
                });
                currentExperienceProductCatalogVersions.push({
                    catalog: productCatalog.catalogId,
                    catalogName: productCatalog.name,
                    catalogVersion: currentProductCatalogVersion.version,
                    active: currentProductCatalogVersion.active,
                    uuid: currentProductCatalogVersion.uuid
                });
            });
            var languageDescriptor = params.language
                ? languages.find(function (lang) { return lang.isocode === params.language; })
                : languages[0];
            var defaultExperience = lo.cloneDeep(params);
            delete defaultExperience.siteId;
            delete defaultExperience.catalogId;
            delete defaultExperience.catalogVersion;
            defaultExperience.siteDescriptor = siteDescriptor;
            defaultExperience.catalogDescriptor = {
                catalogId: catalogId,
                catalogVersion: currentCatalogVersion.version,
                catalogVersionUuid: currentCatalogVersion.uuid,
                name: currentCatalog.name,
                siteId: siteId,
                active: currentCatalogVersion.active
            };
            defaultExperience.languageDescriptor = languageDescriptor;
            defaultExperience.time = defaultExperience.time || null;
            defaultExperience.productCatalogVersions = currentExperienceProductCatalogVersions;
            return _this.setCurrentExperience(defaultExperience);
        });
    };
    ExperienceService.prototype.buildAndSetExperience.$inject = ["params"];
    /**
     * Used to update the page ID stored in the current experience and reloads the page to make the changes visible.
     *
     * @param newPageID the ID of the page that must be stored in the current experience.
     *
     */
    /* @ngInject */ ExperienceService.prototype.updateExperiencePageId = function (newPageID) {
        var _this = this;
        return this.getCurrentExperience().then(function (currentExperience) {
            if (!currentExperience) {
                // Experience haven't been set. Thus, the experience hasn't been loaded.
                // No need to update the experience then.
                return null;
            }
            currentExperience.pageId = newPageID;
            _this.setCurrentExperience(currentExperience);
            _this.reloadPage();
        });
    };
    ExperienceService.prototype.updateExperiencePageId.$inject = ["newPageID"];
    /**
     * Used to update the experience with the parameters provided and reloads the page to make the changes visible.
     *
     * @param params The object containing the paratements for the experience to be loaded.
     * @param params.siteId the ID of the site that must be stored in the current experience.
     * @param params.catalogId the ID of the catalog that must be stored in the current experience.
     * @param params.catalogVersion the version of the catalog that must be stored in the current experience.
     * @param params.pageId the ID of the page that must be stored in the current experience.
     *
     */
    /* @ngInject */ ExperienceService.prototype.loadExperience = function (params) {
        var _this = this;
        return this.buildAndSetExperience(params).then(function () { return _this.reloadPage(); });
    };
    ExperienceService.prototype.loadExperience.$inject = ["params"];
    /* @ngInject */ ExperienceService.prototype.reloadPage = function () {
        this.routingService.reload("" + smarteditcommons.NG_ROUTE_PREFIX + smarteditcommons.STORE_FRONT_CONTEXT);
    };
    /* @ngInject */ ExperienceService.prototype.updateExperiencePageContext = function (pageCatalogVersionUuid, pageId) {
        var _this = this;
        return this.getCurrentExperience()
            .then(function (currentExperience) {
            return _this.catalogService
                .getContentCatalogsForSite(currentExperience.catalogDescriptor.siteId)
                .then(function (catalogs) {
                if (!currentExperience) {
                    // Experience haven't been set. Thus, the experience hasn't been loaded. No need to update the
                    // experience then.
                    return null;
                }
                var allCatalogs = catalogs.reduce(function (acc, catalog) {
                    if (catalog.parents && catalog.parents.length) {
                        catalog.parents.forEach(function (parent) {
                            acc.push(parent);
                        });
                    }
                    return acc;
                }, __spreadArrays(catalogs));
                var pageCatalogVersion = lo.flatten(allCatalogs.map(function (catalog) {
                    return catalog.versions.map(function (version) {
                        version.catalogName =
                            catalog.name ||
                                catalog.catalogName;
                        version.catalogId = catalog.catalogId;
                        return version;
                    });
                }))
                    .find(function (version) {
                    return version.uuid === pageCatalogVersionUuid;
                });
                return _this.catalogService.getCurrentSiteID().then(function (siteID) {
                    currentExperience.pageId = pageId;
                    currentExperience.pageContext = {
                        catalogId: pageCatalogVersion.catalogId,
                        catalogName: pageCatalogVersion.catalogName,
                        catalogVersion: pageCatalogVersion.version,
                        catalogVersionUuid: pageCatalogVersion.uuid,
                        siteId: siteID,
                        active: pageCatalogVersion.active
                    };
                    return _this.setCurrentExperience(currentExperience);
                });
            });
        })
            .then(function (experience) {
            _this.crossFrameEventService.publish(smarteditcommons.EVENTS.PAGE_CHANGE, experience);
            return experience;
        });
    };
    ExperienceService.prototype.updateExperiencePageContext.$inject = ["pageCatalogVersionUuid", "pageId"];
    /* @ngInject */ ExperienceService.prototype.getCurrentExperience = function () {
        // After Angular porting of StorageModule the experienceStorage load promise seems to be resolved after execution of getCurrentExperience.
        // To avoid errors the method is triggered once experienceStorage is present.
        var _this = this;
        return this.storageLoaded$
            .pipe(operators.filter(function (value) { return value; }), operators.take(1), operators.mergeMap(function () { return _this.experienceStorage.get(smarteditcommons.EXPERIENCE_STORAGE_KEY); }))
            .toPromise();
    };
    /* @ngInject */ ExperienceService.prototype.setCurrentExperience = function (experience) {
        var _this = this;
        return this.getCurrentExperience().then(function (previousExperience) {
            _this.previousExperience = previousExperience;
            return _this.experienceStorage.put(experience, smarteditcommons.EXPERIENCE_STORAGE_KEY).then(function () {
                _this.sharedDataService.set(smarteditcommons.EXPERIENCE_STORAGE_KEY, experience);
                return Promise.resolve(experience);
            });
        });
    };
    ExperienceService.prototype.setCurrentExperience.$inject = ["experience"];
    /* @ngInject */ ExperienceService.prototype.hasCatalogVersionChanged = function () {
        var _this = this;
        return this.getCurrentExperience().then(function (currentExperience) {
            return _this.previousExperience === undefined ||
                currentExperience.catalogDescriptor.catalogId !==
                    _this.previousExperience.catalogDescriptor.catalogId ||
                currentExperience.catalogDescriptor.catalogVersion !==
                    _this.previousExperience.catalogDescriptor.catalogVersion;
        });
    };
    /* @ngInject */ ExperienceService.prototype.initializeExperience = function () {
        var _this = this;
        this.iframeManagerService.setCurrentLocation(null);
        return this.getCurrentExperience().then(function (experience) {
            if (!experience) {
                _this.routingService.go(smarteditcommons.NG_ROUTE_PREFIX);
                return null;
            }
            return _this.updateExperience();
        }, function (err) {
            _this.logService.error('ExperienceService.initializeExperience() - failed to retrieve experience');
            return Promise.reject(err);
        });
    };
    /* @ngInject */ ExperienceService.prototype.updateExperience = function (newExperience) {
        var _this = this;
        return this.getCurrentExperience().then(function (experience) {
            // create a deep copy of the current experience
            experience = lo.cloneDeep(experience);
            // merge the new experience into the copy of the current experience
            lo.merge(experience, newExperience);
            _this.previewService
                .getResourcePathFromPreviewUrl(experience.siteDescriptor.previewUrl)
                .then(function (resourcePath) {
                var previewData = _this._convertExperienceToPreviewData(experience, resourcePath);
                return _this.previewService.createPreview(previewData).then(function (previewResponse) {
                    /* forbiddenNameSpaces window._:false */
                    window.__smartedit__.smartEditBootstrapped = {};
                    _this.iframeManagerService.loadPreview(previewResponse.resourcePath, previewResponse.ticketId);
                    return _this.setCurrentExperience(experience);
                }, function (err) {
                    _this.logService.error('iframeManagerService.updateExperience() - failed to update experience');
                    return Promise.reject(err);
                });
            }, function (err) {
                _this.logService.error('ExperienceService.updateExperience() - failed to retrieve resource path');
                return Promise.reject(err);
            });
        }, function (err) {
            _this.logService.error('ExperienceService.updateExperience() - failed to retrieve current experience');
            return Promise.reject(err);
        });
    };
    ExperienceService.prototype.updateExperience.$inject = ["newExperience"];
    /* @ngInject */ ExperienceService.prototype.compareWithCurrentExperience = function (experience) {
        if (!experience) {
            return Promise.resolve(false);
        }
        return this.getCurrentExperience().then(function (currentExperience) {
            if (!currentExperience) {
                return Promise.resolve(false);
            }
            if (currentExperience.pageId === experience.pageId &&
                currentExperience.siteDescriptor.uid === experience.siteId &&
                currentExperience.catalogDescriptor.catalogId === experience.catalogId &&
                currentExperience.catalogDescriptor.catalogVersion === experience.catalogVersion) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        });
    };
    ExperienceService.prototype.compareWithCurrentExperience.$inject = ["experience"];
    /* @ngInject */ ExperienceService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IExperienceService),
        smarteditcommons.GatewayProxied('loadExperience', 'updateExperiencePageContext', 'getCurrentExperience', 'hasCatalogVersionChanged', 'buildRefreshedPreviewUrl', 'compareWithCurrentExperience'),
        __param(3, core.Inject(smarteditcommons.EVENT_SERVICE)),
        __metadata("design:paramtypes", [smarteditcommons.IStorageManager,
            smarteditcommons.IStoragePropertiesService,
            smarteditcommons.LogService,
            smarteditcommons.CrossFrameEventService,
            SiteService,
            smarteditcommons.IPreviewService,
            smarteditcommons.ICatalogService,
            smarteditcommons.LanguageService,
            smarteditcommons.ISharedDataService,
            IframeManagerService,
            smarteditcommons.SmarteditRoutingService])
    ], /* @ngInject */ ExperienceService);
    return /* @ngInject */ ExperienceService;
}(smarteditcommons.IExperienceService));

/** @internal */
var /* @ngInject */ FeatureService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ FeatureService, _super);
    FeatureService.$inject = ["toolbarServiceFactory", "cloneableUtils"];
    function /* @ngInject */ FeatureService(toolbarServiceFactory, cloneableUtils) {
        var _this = _super.call(this, cloneableUtils) || this;
        _this.toolbarServiceFactory = toolbarServiceFactory;
        _this.features = [];
        return _this;
    }
    /* @ngInject */ FeatureService.prototype.getFeatureProperty = function (featureKey, propertyName) {
        var feature = this._getFeatureByKey(featureKey);
        return Promise.resolve(feature ? feature[propertyName] : null);
    };
    FeatureService.prototype.getFeatureProperty.$inject = ["featureKey", "propertyName"];
    /* @ngInject */ FeatureService.prototype.getFeatureKeys = function () {
        return this.features.map(function (feature) { return feature.key; });
    };
    /* @ngInject */ FeatureService.prototype.addToolbarItem = function (configuration) {
        var toolbar = this.toolbarServiceFactory.getToolbarService(configuration.toolbarId);
        configuration.enablingCallback = function () {
            this.addItems([configuration]);
        }.bind(toolbar);
        configuration.disablingCallback = function () {
            this.removeItemByKey(configuration.key);
        }.bind(toolbar);
        return this.register(configuration);
    };
    FeatureService.prototype.addToolbarItem.$inject = ["configuration"];
    /* @ngInject */ FeatureService.prototype._registerAliases = function (configuration) {
        var feature = this._getFeatureByKey(configuration.key);
        if (!feature) {
            configuration.id = btoa(configuration.key);
            this.features.push(configuration);
        }
        return Promise.resolve();
    };
    FeatureService.prototype._registerAliases.$inject = ["configuration"];
    /* @ngInject */ FeatureService.prototype._getFeatureByKey = function (key) {
        return this.features.find(function (feature) { return feature.key === key; });
    };
    FeatureService.prototype._getFeatureByKey.$inject = ["key"];
    /* @ngInject */ FeatureService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IFeatureService),
        smarteditcommons.GatewayProxied('_registerAliases', 'addToolbarItem', 'register', 'enable', 'disable', '_remoteEnablingFromInner', '_remoteDisablingFromInner', 'addDecorator', 'getFeatureProperty', 'addContextualMenuButton'),
        __metadata("design:paramtypes", [smarteditcommons.IToolbarServiceFactory,
            smarteditcommons.CloneableUtils])
    ], /* @ngInject */ FeatureService);
    return /* @ngInject */ FeatureService;
}(smarteditcommons.IFeatureService));

/** @internal */
var /* @ngInject */ PageInfoService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PageInfoService, _super);
    function /* @ngInject */ PageInfoService() {
        return _super.call(this) || this;
    }
    /* @ngInject */ PageInfoService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPageInfoService),
        smarteditcommons.GatewayProxied('getPageUID', 'getPageUUID', 'getCatalogVersionUUIDFromPage'),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ PageInfoService);
    return /* @ngInject */ PageInfoService;
}(smarteditcommons.IPageInfoService));

/** @internal */
var /* @ngInject */ PreviewService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PreviewService, _super);
    PreviewService.$inject = ["log", "loadConfigManagerService", "restServiceFactory", "urlUtils"];
    function /* @ngInject */ PreviewService(log, loadConfigManagerService, restServiceFactory, urlUtils) {
        var _this = _super.call(this, urlUtils) || this;
        _this.log = log;
        _this.loadConfigManagerService = loadConfigManagerService;
        _this.restServiceFactory = restServiceFactory;
        _this.ticketIdIdentifier = 'ticketId';
        return _this;
    }
    /* @ngInject */ PreviewService.prototype.createPreview = function (previewData) {
        return __awaiter(this, void 0, void 0, function () {
            var requiredFields, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requiredFields = ['catalogVersions', 'resourcePath'];
                        this.validatePreviewDataAttributes(previewData, requiredFields);
                        return [4 /*yield*/, this.prepareRestService()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.previewRestService.save(previewData)];
                    case 3:
                        response = _a.sent();
                        /**
                         * The response object being stringified, when using copy method, has a method named toJSON()
                         * because it is originally of type angular.resource.IResource<IPreviewData> and
                         * that IResource.toJSON() method is responsible to remove $promise, $resolved properties from the response object.
                         */
                        return [2 /*return*/, smarteditcommons.objectUtils.copy(response)];
                    case 4:
                        err_1 = _a.sent();
                        this.log.error('PreviewService.createPreview() - Error creating preview');
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PreviewService.prototype.createPreview.$inject = ["previewData"];
    /* @ngInject */ PreviewService.prototype.updatePreview = function (previewData) {
        return __awaiter(this, void 0, void 0, function () {
            var requiredFields, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requiredFields = ['catalogVersions', 'resourcePath', 'ticketId'];
                        this.validatePreviewDataAttributes(previewData, requiredFields);
                        return [4 /*yield*/, this.prepareRestService()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.previewByticketRestService.update(previewData)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_2 = _a.sent();
                        this.log.error('PreviewService.updatePreview() - Error updating preview');
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PreviewService.prototype.updatePreview.$inject = ["previewData"];
    /* @ngInject */ PreviewService.prototype.getResourcePathFromPreviewUrl = function (previewUrl) {
        var _this = this;
        return this.prepareRestService().then(function () {
            return _this.urlUtils.getAbsoluteURL(_this.domain, previewUrl);
        });
    };
    PreviewService.prototype.getResourcePathFromPreviewUrl.$inject = ["previewUrl"];
    /* @ngInject */ PreviewService.prototype.prepareRestService = function () {
        var _this = this;
        if (!this.previewRestService || !this.previewByticketRestService) {
            return this.loadConfigManagerService.loadAsObject().then(function (configurations) {
                var RESOURCE_URI = (configurations.previewTicketURI ||
                    smarteditcommons.PREVIEW_RESOURCE_URI);
                _this.previewRestService = _this.restServiceFactory.get(RESOURCE_URI);
                _this.previewByticketRestService = _this.restServiceFactory.get(RESOURCE_URI, _this.ticketIdIdentifier);
                _this.domain = configurations.domain;
            }, function (err) {
                _this.log.error('PreviewService.getRestService() - Error loading configuration');
                return Promise.reject(err);
            });
        }
        return Promise.resolve();
    };
    /* @ngInject */ PreviewService.prototype.validatePreviewDataAttributes = function (previewData, requiredFields) {
        if (requiredFields) {
            requiredFields.forEach(function (elem) {
                if (lo.isEmpty(previewData[elem])) {
                    throw new Error("ValidatePreviewDataAttributes - " + elem + " is empty");
                }
            });
        }
    };
    PreviewService.prototype.validatePreviewDataAttributes.$inject = ["previewData", "requiredFields"];
    /* @ngInject */ PreviewService = __decorate([
        smarteditcommons.GatewayProxied(),
        smarteditcommons.SeDowngradeService(smarteditcommons.IPreviewService),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            LoadConfigManagerService,
            smarteditcommons.RestServiceFactory,
            smarteditcommons.UrlUtils])
    ], /* @ngInject */ PreviewService);
    return /* @ngInject */ PreviewService;
}(smarteditcommons.IPreviewService));

/** @internal */
var /* @ngInject */ PerspectiveService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PerspectiveService, _super);
    PerspectiveService.$inject = ["routingService", "logService", "systemEventService", "featureService", "waitDialogService", "storageService", "crossFrameEventService", "permissionService"];
    function /* @ngInject */ PerspectiveService(routingService, logService, systemEventService, featureService, waitDialogService, storageService, crossFrameEventService, permissionService) {
        var _this = _super.call(this) || this;
        _this.routingService = routingService;
        _this.logService = logService;
        _this.systemEventService = systemEventService;
        _this.featureService = featureService;
        _this.waitDialogService = waitDialogService;
        _this.storageService = storageService;
        _this.crossFrameEventService = crossFrameEventService;
        _this.permissionService = permissionService;
        _this.PERSPECTIVE_COOKIE_NAME = 'smartedit-perspectives';
        _this.INITIAL_SWITCHTO_ARG = 'INITIAL_SWITCHTO_ARG';
        _this.data = {
            activePerspective: undefined,
            previousPerspective: undefined,
            previousSwitchToArg: _this.INITIAL_SWITCHTO_ARG
        };
        _this.immutablePerspectives = []; // once a perspective is registered it will always exists in this variable
        _this.perspectives = [];
        _this._addDefaultPerspectives();
        _this._registerEventHandlers();
        _this.NON_PERSPECTIVE_OBJECT = { key: smarteditcommons.NONE_PERSPECTIVE, nameI18nKey: '', features: [] };
        return _this;
    }
    /* @ngInject */ PerspectiveService.prototype.register = function (configuration) {
        this._validate(configuration);
        var perspective = this._findByKey(configuration.key);
        if (!perspective) {
            this._addPerspectiveSelectorWidget(configuration);
            perspective = configuration;
            perspective.isHotkeyDisabled = !!configuration.isHotkeyDisabled;
            this.immutablePerspectives.push(perspective);
            this.perspectives.push(perspective);
            this.systemEventService.publishAsync(smarteditcommons.EVENT_PERSPECTIVE_ADDED);
        }
        else {
            perspective.features = smarteditcommons.objectUtils.uniqueArray(perspective.features || [], configuration.features || []);
            perspective.perspectives = smarteditcommons.objectUtils.uniqueArray(perspective.perspectives || [], configuration.perspectives || []);
            perspective.permissions = smarteditcommons.objectUtils.uniqueArray(perspective.permissions || [], configuration.permissions || []);
            this.systemEventService.publishAsync(smarteditcommons.EVENT_PERSPECTIVE_UPDATED);
        }
        return Promise.resolve();
    };
    PerspectiveService.prototype.register.$inject = ["configuration"];
    // Filters immutablePerspectives to determine which perspectives are available, taking into account security
    /* @ngInject */ PerspectiveService.prototype.getPerspectives = function () {
        var _this = this;
        var promises = [];
        this.immutablePerspectives.forEach(function (perspective) {
            var promise;
            if (perspective.permissions && perspective.permissions.length > 0) {
                promise = _this.permissionService.isPermitted([
                    {
                        names: perspective.permissions
                    }
                ]);
            }
            else {
                promise = Promise.resolve(true);
            }
            promises.push(promise);
        });
        return Promise.all(promises).then(function (results) {
            return _this.immutablePerspectives.filter(function (perspective, index) { return results[index]; });
        });
    };
    /* @ngInject */ PerspectiveService.prototype.hasActivePerspective = function () {
        return Promise.resolve(Boolean(this.data.activePerspective));
    };
    /* @ngInject */ PerspectiveService.prototype.getActivePerspective = function () {
        return this.data.activePerspective
            ? __assign({}, this._findByKey(this.data.activePerspective.key)) : null;
    };
    /* @ngInject */ PerspectiveService.prototype.isEmptyPerspectiveActive = function () {
        return Promise.resolve(!!this.data.activePerspective && this.data.activePerspective.key === smarteditcommons.NONE_PERSPECTIVE);
    };
    /* @ngInject */ PerspectiveService.prototype.switchTo = function (key) {
        var _this = this;
        if (!this._changeActivePerspective(key)) {
            this.waitDialogService.hideWaitModal();
            return Promise.resolve();
        }
        this._handleUnloadEvent(key);
        this.waitDialogService.showWaitModal();
        var featuresFromPreviousPerspective = [];
        if (this.data.previousPerspective) {
            this._fetchAllFeatures(this.data.previousPerspective, featuresFromPreviousPerspective);
        }
        var featuresFromNewPerspective = [];
        this._fetchAllFeatures(this.data.activePerspective, featuresFromNewPerspective);
        // deactivating any active feature not belonging to either the perspective or one of its nested perspectives
        featuresFromPreviousPerspective
            .filter(function (featureKey) {
            return !featuresFromNewPerspective.some(function (f) { return featureKey === f; });
        })
            .forEach(function (featureKey) {
            _this.featureService.disable(featureKey);
        });
        // activating any feature belonging to either the perspective or one of its nested perspectives
        var permissionPromises = [];
        featuresFromNewPerspective
            .filter(function (feature) {
            return !featuresFromPreviousPerspective.some(function (f) { return feature === f; });
        })
            .forEach(function (featureKey) {
            permissionPromises.push(_this._enableOrDisableFeature(featureKey));
        });
        return Promise.all(permissionPromises).then(function () {
            if (_this.data.activePerspective.key === smarteditcommons.NONE_PERSPECTIVE) {
                _this.waitDialogService.hideWaitModal();
            }
            _this.crossFrameEventService.publish(smarteditcommons.EVENT_PERSPECTIVE_CHANGED, _this.data.activePerspective.key !== smarteditcommons.NONE_PERSPECTIVE);
        });
    };
    PerspectiveService.prototype.switchTo.$inject = ["key"];
    /* @ngInject */ PerspectiveService.prototype.selectDefault = function () {
        var _this = this;
        return this.getPerspectives().then(function (perspectives) {
            return _this.storageService
                .getValueFromLocalStorage(_this.PERSPECTIVE_COOKIE_NAME, true)
                .then(function (cookieValue) {
                //  restricted by permission
                var perspectiveAvailable = perspectives.find(function (p) { return p.key === cookieValue; });
                var defaultPerspective;
                var perspective;
                if (!perspectiveAvailable) {
                    _this.logService.warn('Cannot select mode "' +
                        cookieValue +
                        '" It might not exist or is restricted.');
                    // from full list of perspectives, regardless of permissions
                    var perspectiveFromCookie = _this._findByKey(cookieValue);
                    if (!!perspectiveFromCookie) {
                        _this._disableAllFeaturesForPerspective(perspectiveFromCookie);
                    }
                    defaultPerspective = _this.NON_PERSPECTIVE_OBJECT;
                    perspective = _this.NON_PERSPECTIVE_OBJECT;
                }
                else {
                    var perspectiveFromCookie = _this._findByKey(cookieValue);
                    defaultPerspective = perspectiveFromCookie
                        ? perspectiveFromCookie
                        : _this.NON_PERSPECTIVE_OBJECT;
                    perspective = _this.data.previousPerspective
                        ? _this.data.previousPerspective
                        : defaultPerspective;
                }
                if (defaultPerspective.key !== _this.NON_PERSPECTIVE_OBJECT.key) {
                    _this._disableAllFeaturesForPerspective(defaultPerspective);
                }
                return _this.switchTo(perspective.key);
            });
        });
    };
    /* @ngInject */ PerspectiveService.prototype.refreshPerspective = function () {
        var _this = this;
        return this.getPerspectives().then(function (result) {
            var activePerspective = _this.getActivePerspective();
            if (!activePerspective) {
                return _this.selectDefault();
            }
            else {
                _this.perspectives = result;
                if (!_this._findByKey(activePerspective.key)) {
                    return _this.switchTo(smarteditcommons.NONE_PERSPECTIVE);
                }
                else {
                    var features = [];
                    var permissionPromises_1 = [];
                    _this._fetchAllFeatures(activePerspective, features);
                    features.forEach(function (featureKey) {
                        permissionPromises_1.push(_this._enableOrDisableFeature(featureKey));
                    });
                    return Promise.all(permissionPromises_1).then(function () {
                        _this.waitDialogService.hideWaitModal();
                        _this.crossFrameEventService.publish(smarteditcommons.EVENT_PERSPECTIVE_REFRESHED, activePerspective.key !== smarteditcommons.NONE_PERSPECTIVE);
                    });
                }
            }
        });
    };
    /* @ngInject */ PerspectiveService.prototype.getActivePerspectiveKey = function () {
        var activePerspective = this.getActivePerspective();
        return Promise.resolve(activePerspective ? activePerspective.key : null);
    };
    /* @ngInject */ PerspectiveService.prototype.isHotkeyEnabledForActivePerspective = function () {
        var activePerspective = this.getActivePerspective();
        return Promise.resolve(activePerspective && !activePerspective.isHotkeyDisabled);
    };
    /* @ngInject */ PerspectiveService.prototype._addPerspectiveSelectorWidget = function (configuration) {
        configuration.features = configuration.features || [];
        if (configuration.features.indexOf(smarteditcommons.PERSPECTIVE_SELECTOR_WIDGET_KEY) === -1) {
            configuration.features.unshift(smarteditcommons.PERSPECTIVE_SELECTOR_WIDGET_KEY);
        }
    };
    PerspectiveService.prototype._addPerspectiveSelectorWidget.$inject = ["configuration"];
    /* @ngInject */ PerspectiveService.prototype._addDefaultPerspectives = function () {
        this.register({
            key: smarteditcommons.NONE_PERSPECTIVE,
            nameI18nKey: 'se.perspective.none.name',
            isHotkeyDisabled: true,
            descriptionI18nKey: 'se.perspective.none.description.disabled'
        });
        this.register({
            key: smarteditcommons.ALL_PERSPECTIVE,
            nameI18nKey: 'se.perspective.all.name',
            descriptionI18nKey: 'se.perspective.all.description'
        });
    };
    /* @ngInject */ PerspectiveService.prototype._registerEventHandlers = function () {
        var _this = this;
        this.systemEventService.subscribe(smarteditcommons.EVENTS.LOGOUT, this._clearPerspectiveFeatures.bind(this));
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.USER_HAS_CHANGED, this._clearPerspectiveFeatures.bind(this));
        // clear the features when navigating to another page than the storefront. this is preventing a flickering of toolbar icons when going back to storefront on another page.
        this.routingService.routeChangeSuccess().subscribe(function (event) {
            var url = _this.routingService.getCurrentUrlFromEvent(event);
            if ((url || '').includes(smarteditcommons.STORE_FRONT_CONTEXT)) {
                _this._clearPerspectiveFeatures();
            }
        });
    };
    /* @ngInject */ PerspectiveService.prototype._validate = function (configuration) {
        if (smarteditcommons.stringUtils.isBlank(configuration.key)) {
            throw new Error('perspectiveService.configuration.key.error.required');
        }
        if (smarteditcommons.stringUtils.isBlank(configuration.nameI18nKey)) {
            throw new Error('perspectiveService.configuration.nameI18nKey.error.required');
        }
        if ([smarteditcommons.NONE_PERSPECTIVE, smarteditcommons.ALL_PERSPECTIVE].indexOf(configuration.key) === -1 &&
            (smarteditcommons.stringUtils.isBlank(configuration.features) || configuration.features.length === 0)) {
            throw new Error('perspectiveService.configuration.features.error.required');
        }
    };
    PerspectiveService.prototype._validate.$inject = ["configuration"];
    /* @ngInject */ PerspectiveService.prototype._findByKey = function (key) {
        return this.perspectives.find(function (perspective) { return perspective.key === key; });
    };
    PerspectiveService.prototype._findByKey.$inject = ["key"];
    /* @ngInject */ PerspectiveService.prototype._fetchAllFeatures = function (perspective, holder) {
        var _this = this;
        if (!holder) {
            holder = [];
        }
        if (perspective.key === smarteditcommons.ALL_PERSPECTIVE) {
            smarteditcommons.objectUtils.uniqueArray(holder, this.featureService.getFeatureKeys() || []);
        }
        else {
            smarteditcommons.objectUtils.uniqueArray(holder, perspective.features || []);
            (perspective.perspectives || []).forEach(function (perspectiveKey) {
                var nestedPerspective = _this._findByKey(perspectiveKey);
                if (nestedPerspective) {
                    _this._fetchAllFeatures(nestedPerspective, holder);
                }
                else {
                    _this.logService.debug('nested perspective ' + perspectiveKey + ' was not found in the registry');
                }
            });
        }
    };
    PerspectiveService.prototype._fetchAllFeatures.$inject = ["perspective", "holder"];
    /* @ngInject */ PerspectiveService.prototype._enableOrDisableFeature = function (featureKey) {
        var _this = this;
        return this.featureService
            .getFeatureProperty(featureKey, 'permissions')
            .then(function (permissionNames) {
            if (!Array.isArray(permissionNames)) {
                permissionNames = [];
            }
            return _this.permissionService
                .isPermitted([
                {
                    names: permissionNames
                }
            ])
                .then(function (allowCallback) {
                if (allowCallback) {
                    _this.featureService.enable(featureKey);
                }
                else {
                    _this.featureService.disable(featureKey);
                }
            });
        });
    };
    PerspectiveService.prototype._enableOrDisableFeature.$inject = ["featureKey"];
    /**
     * Takes care of sending EVENT_PERSPECTIVE_UNLOADING when perspectives change.
     *
     * This function tracks the "key" argument in calls to switchTo(..) function in order to detect when a
     * perspective is being switched.
     */
    /* @ngInject */ PerspectiveService.prototype._handleUnloadEvent = function (nextPerspectiveKey) {
        if (nextPerspectiveKey !== this.data.previousSwitchToArg &&
            this.data.previousSwitchToArg !== this.INITIAL_SWITCHTO_ARG) {
            this.crossFrameEventService.publish(smarteditcommons.EVENT_PERSPECTIVE_UNLOADING, this.data.previousSwitchToArg);
        }
        this.data.previousSwitchToArg = nextPerspectiveKey;
    };
    PerspectiveService.prototype._handleUnloadEvent.$inject = ["nextPerspectiveKey"];
    /* @ngInject */ PerspectiveService.prototype._retrievePerspective = function (key) {
        // Validation
        // Change the perspective only if it makes sense.
        if (this.data.activePerspective && this.data.activePerspective.key === key) {
            return null;
        }
        var newPerspective = this._findByKey(key);
        if (!newPerspective) {
            throw new Error("switchTo() - Couldn't find perspective with key " + key);
        }
        return newPerspective;
    };
    PerspectiveService.prototype._retrievePerspective.$inject = ["key"];
    /* @ngInject */ PerspectiveService.prototype._changeActivePerspective = function (newPerspectiveKey) {
        var newPerspective = this._retrievePerspective(newPerspectiveKey);
        if (newPerspective) {
            this.data.previousPerspective = this.data.activePerspective;
            this.data.activePerspective = newPerspective;
            this.storageService.setValueInLocalStorage(this.PERSPECTIVE_COOKIE_NAME, newPerspective.key, true);
        }
        return newPerspective;
    };
    PerspectiveService.prototype._changeActivePerspective.$inject = ["newPerspectiveKey"];
    /* @ngInject */ PerspectiveService.prototype._disableAllFeaturesForPerspective = function (perspective) {
        var _this = this;
        var features = [];
        this._fetchAllFeatures(perspective, features);
        features.forEach(function (featureKey) {
            _this.featureService.disable(featureKey);
        });
    };
    PerspectiveService.prototype._disableAllFeaturesForPerspective.$inject = ["perspective"];
    /* @ngInject */ PerspectiveService.prototype._clearPerspectiveFeatures = function () {
        var _this = this;
        // De-activates all current perspective's features (Still leaves the cookie in the system).
        var perspectiveFeatures = [];
        if (this.data && this.data.activePerspective) {
            this._fetchAllFeatures(this.data.activePerspective, perspectiveFeatures);
        }
        perspectiveFeatures.forEach(function (feature) {
            _this.featureService.disable(feature);
        });
        return Promise.resolve();
    };
    /* @ngInject */ PerspectiveService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPerspectiveService),
        smarteditcommons.GatewayProxied('register', 'switchTo', 'hasActivePerspective', 'isEmptyPerspectiveActive', 'selectDefault', 'refreshPerspective', 'getActivePerspectiveKey', 'isHotkeyEnabledForActivePerspective'),
        __metadata("design:paramtypes", [smarteditcommons.SmarteditRoutingService,
            smarteditcommons.LogService,
            smarteditcommons.SystemEventService,
            smarteditcommons.IFeatureService,
            smarteditcommons.IWaitDialogService,
            smarteditcommons.IStorageService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.IPermissionService])
    ], /* @ngInject */ PerspectiveService);
    return /* @ngInject */ PerspectiveService;
}(smarteditcommons.IPerspectiveService));

/** @internal */
var /* @ngInject */ SessionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SessionService, _super);
    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    SessionService.$inject = ["$log", "restServiceFactory", "storageService", "cryptographicUtils"];
    function /* @ngInject */ SessionService($log, restServiceFactory, storageService, cryptographicUtils) {
        var _this = _super.call(this) || this;
        _this.$log = $log;
        _this.storageService = storageService;
        _this.cryptographicUtils = cryptographicUtils;
        // ------------------------------------------------------------------------
        // Constants
        // ------------------------------------------------------------------------
        _this.USER_DATA_URI = '/cmswebservices/v1/users/:userUid';
        _this.whoAmIService = restServiceFactory.get(smarteditcommons.WHO_AM_I_RESOURCE_URI);
        _this.userRestService = restServiceFactory.get(_this.USER_DATA_URI);
        return _this;
    }
    // ------------------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------------------
    /* @ngInject */ SessionService.prototype.getCurrentUserDisplayName = function () {
        return this.getCurrentUserData().then(function (currentUserData) { return currentUserData.displayName; });
    };
    /* @ngInject */ SessionService.prototype.getCurrentUsername = function () {
        return this.getCurrentUserData().then(function (currentUserData) { return currentUserData.uid; });
    };
    /* @ngInject */ SessionService.prototype.getCurrentUser = function () {
        return this.getCurrentUserData();
    };
    /* @ngInject */ SessionService.prototype.hasUserChanged = function () {
        var _this = this;
        var prevHashPromise = Promise.resolve(this.cachedUserHash
            ? this.cachedUserHash
            : this.storageService.getItem(smarteditcommons.PREVIOUS_USERNAME_HASH));
        return prevHashPromise.then(function (prevHash) {
            return _this.whoAmIService
                .get({})
                .then(function (currentUserData) {
                return !!prevHash &&
                    prevHash !== _this.cryptographicUtils.sha1Hash(currentUserData.uid);
            });
        });
    };
    /* @ngInject */ SessionService.prototype.setCurrentUsername = function () {
        var _this = this;
        return this.whoAmIService.get({}).then(function (currentUserData) {
            // NOTE: For most of SmartEdit operation, it is enough to store the previous user hash in the cache.
            // However, if the page is refreshed the cache is cleaned. Therefore, it's necessary to also store it in
            // a cookie through the storageService.
            _this.cachedUserHash = _this.cryptographicUtils.sha1Hash(currentUserData.uid);
            _this.storageService.setItem(smarteditcommons.PREVIOUS_USERNAME_HASH, _this.cachedUserHash);
        });
    };
    // ------------------------------------------------------------------------
    // Helper Methods
    // ------------------------------------------------------------------------
    /* @ngInject */ SessionService.prototype.getCurrentUserData = function () {
        var _this = this;
        return this.whoAmIService
            .get({})
            .then(function (whoAmIData) {
            return _this.userRestService
                .get({
                userUid: whoAmIData.uid
            })
                .then(function (userData) { return ({
                uid: userData.uid,
                displayName: whoAmIData.displayName,
                readableLanguages: userData.readableLanguages,
                writeableLanguages: userData.writeableLanguages
            }); });
        })
            .catch(function (reason) {
            _this.$log.warn("[SessionService]: Can't load session information", reason);
            return null;
        });
    };
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ SessionService.prototype, "getCurrentUserData", null);
    /* @ngInject */ SessionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ISessionService),
        smarteditcommons.GatewayProxied('getCurrentUsername', 'getCurrentUserDisplayName', 'hasUserChanged', 'setCurrentUsername', 'getCurrentUser'),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.RestServiceFactory,
            smarteditcommons.IStorageService,
            smarteditcommons.CryptographicUtils])
    ], /* @ngInject */ SessionService);
    return /* @ngInject */ SessionService;
}(smarteditcommons.ISessionService));

/** @internal */
var /* @ngInject */ SharedDataService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ SharedDataService, _super);
    function /* @ngInject */ SharedDataService() {
        var _this = _super.call(this) || this;
        _this.storage = {};
        return _this;
    }
    /* @ngInject */ SharedDataService.prototype.get = function (key) {
        return Promise.resolve(this.storage[key]);
    };
    SharedDataService.prototype.get.$inject = ["key"];
    /* @ngInject */ SharedDataService.prototype.set = function (key, value) {
        this.storage[key] = value;
        return Promise.resolve();
    };
    SharedDataService.prototype.set.$inject = ["key", "value"];
    /* @ngInject */ SharedDataService.prototype.update = function (key, modifyingCallback) {
        var _this = this;
        return this.get(key).then(function (oldValue) {
            return modifyingCallback(oldValue).then(function (newValue) { return _this.set(key, newValue); });
        });
    };
    SharedDataService.prototype.update.$inject = ["key", "modifyingCallback"];
    /* @ngInject */ SharedDataService.prototype.remove = function (key) {
        var value = this.storage[key];
        delete this.storage[key];
        return Promise.resolve(value);
    };
    SharedDataService.prototype.remove.$inject = ["key"];
    /* @ngInject */ SharedDataService.prototype.containsKey = function (key) {
        return Promise.resolve(lo.has(this.storage, key));
    };
    SharedDataService.prototype.containsKey.$inject = ["key"];
    /* @ngInject */ SharedDataService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ISharedDataService),
        smarteditcommons.GatewayProxied(),
        core.Injectable(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ SharedDataService);
    return /* @ngInject */ SharedDataService;
}(smarteditcommons.ISharedDataService));

/** @internal */
var /* @ngInject */ StorageService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ StorageService, _super);
    StorageService.$inject = ["logService", "windowUtils", "cryptographicUtils", "fingerPrintingService"];
    function /* @ngInject */ StorageService(logService, windowUtils, cryptographicUtils, fingerPrintingService) {
        var _this = _super.call(this) || this;
        _this.logService = logService;
        _this.windowUtils = windowUtils;
        _this.cryptographicUtils = cryptographicUtils;
        _this.fingerPrintingService = fingerPrintingService;
        _this.SMARTEDIT_SESSIONS = 'smartedit-sessions';
        _this.CUSTOM_PROPERTIES = 'custom_properties';
        return _this;
    }
    /* @ngInject */ StorageService.prototype.isInitialized = function () {
        var sessions = this.getAuthTokens();
        return Promise.resolve(lo.values(lo.omit(sessions, [this.CUSTOM_PROPERTIES])).length > 0);
    };
    /* @ngInject */ StorageService.prototype.storeAuthToken = function (authURI, auth) {
        var sessions = this.getAuthTokens();
        sessions[authURI] = auth;
        this._setSmarteditSessions(sessions);
        return Promise.resolve();
    };
    StorageService.prototype.storeAuthToken.$inject = ["authURI", "auth"];
    /* @ngInject */ StorageService.prototype.getAuthToken = function (authURI) {
        var sessions = this.getAuthTokens();
        return Promise.resolve(sessions[authURI]);
    };
    StorageService.prototype.getAuthToken.$inject = ["authURI"];
    /* @ngInject */ StorageService.prototype.removeAuthToken = function (authURI) {
        var sessions = this.getAuthTokens();
        delete sessions[authURI];
        this._setSmarteditSessions(sessions);
        return Promise.resolve();
    };
    StorageService.prototype.removeAuthToken.$inject = ["authURI"];
    /* @ngInject */ StorageService.prototype.removeAllAuthTokens = function () {
        this._removeAllAuthTokens();
        return Promise.resolve();
    };
    /* @ngInject */ StorageService.prototype.getValueFromCookie = function (cookieName, isEncoded) {
        throw new Error('getValueFromCookie deprecated since 1905, use getValueFromLocalStorage');
    };
    StorageService.prototype.getValueFromCookie.$inject = ["cookieName", "isEncoded"];
    /* @ngInject */ StorageService.prototype.getValueFromLocalStorage = function (cookieName, isEncoded) {
        return Promise.resolve(this._getValueFromLocalStorage(cookieName, isEncoded));
    };
    StorageService.prototype.getValueFromLocalStorage.$inject = ["cookieName", "isEncoded"];
    /* @ngInject */ StorageService.prototype.getAuthTokens = function () {
        var smarteditSessions = this.windowUtils
            .getWindow()
            .localStorage.getItem(this.SMARTEDIT_SESSIONS);
        var authTokens;
        if (smarteditSessions) {
            try {
                var decrypted = this.cryptographicUtils.aesDecrypt(smarteditSessions, this.fingerPrintingService.getFingerprint());
                authTokens = JSON.parse(decodeURIComponent(escape(decrypted)));
            }
            catch (_a) {
                // failed to decrypt token. may occur if fingerprint changed.
                this.logService.info('Failed to read authentication token. Forcing a re-authentication.');
            }
        }
        return authTokens || {};
    };
    /* @ngInject */ StorageService.prototype.putValueInCookie = function (cookieName, value, encode) {
        throw new Error('putValueInCookie deprecated since 1905, use setValueInLocalStorage');
    };
    StorageService.prototype.putValueInCookie.$inject = ["cookieName", "value", "encode"];
    /* @ngInject */ StorageService.prototype.setValueInLocalStorage = function (cookieName, value, encode) {
        return Promise.resolve(this._setValueInLocalStorage(cookieName, value, encode));
    };
    StorageService.prototype.setValueInLocalStorage.$inject = ["cookieName", "value", "encode"];
    /* @ngInject */ StorageService.prototype.setItem = function (key, value) {
        var sessions = this.getAuthTokens();
        sessions[this.CUSTOM_PROPERTIES] = sessions[this.CUSTOM_PROPERTIES] || {};
        sessions[this.CUSTOM_PROPERTIES][key] = value;
        this._setSmarteditSessions(sessions);
        return Promise.resolve();
    };
    StorageService.prototype.setItem.$inject = ["key", "value"];
    /* @ngInject */ StorageService.prototype.getItem = function (key) {
        var sessions = this.getAuthTokens();
        sessions[this.CUSTOM_PROPERTIES] = sessions[this.CUSTOM_PROPERTIES] || {};
        return Promise.resolve(sessions[this.CUSTOM_PROPERTIES][key]);
    };
    StorageService.prototype.getItem.$inject = ["key"];
    /* @ngInject */ StorageService.prototype._removeAllAuthTokens = function () {
        var sessions = this.getAuthTokens();
        var newSessions = lo.pick(sessions, [this.CUSTOM_PROPERTIES]);
        this._setSmarteditSessions(newSessions);
    };
    /* @ngInject */ StorageService.prototype._getValueFromLocalStorage = function (cookieName, isEncoded) {
        var rawValue = this.windowUtils.getWindow().localStorage.getItem(cookieName);
        var value = null;
        if (rawValue) {
            try {
                value = JSON.parse(isEncoded ? decodeURIComponent(escape(window.atob(rawValue))) : rawValue);
            }
            catch (e) {
                // protecting against deserialization issue
                this.logService.error('Failed during deserialization ', e);
            }
        }
        return value;
    };
    StorageService.prototype._getValueFromLocalStorage.$inject = ["cookieName", "isEncoded"];
    /* @ngInject */ StorageService.prototype._setSmarteditSessions = function (sessions) {
        var sessionsJSONString = btoa(unescape(encodeURIComponent(JSON.stringify(sessions))));
        var sessionsEncrypted = this.cryptographicUtils.aesBase64Encrypt(sessionsJSONString, this.fingerPrintingService.getFingerprint());
        this.windowUtils
            .getWindow()
            .localStorage.setItem(this.SMARTEDIT_SESSIONS, sessionsEncrypted);
    };
    StorageService.prototype._setSmarteditSessions.$inject = ["sessions"];
    /* @ngInject */ StorageService.prototype._setValueInLocalStorage = function (cookieName, value, encode) {
        var processedValue = JSON.stringify(value);
        processedValue = encode
            ? btoa(unescape(encodeURIComponent(processedValue)))
            : processedValue;
        this.windowUtils.getWindow().localStorage.setItem(cookieName, processedValue);
    };
    StorageService.prototype._setValueInLocalStorage.$inject = ["cookieName", "value", "encode"];
    /* @ngInject */ StorageService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageService),
        smarteditcommons.GatewayProxied('isInitialized', 'storeAuthToken', 'getAuthToken', 'removeAuthToken', 'removeAllAuthTokens', 'storePrincipalIdentifier', 'getPrincipalIdentifier', 'removePrincipalIdentifier', 'getValueFromCookie', 'getValueFromLocalStorage'),
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.WindowUtils,
            smarteditcommons.CryptographicUtils,
            smarteditcommons.FingerPrintingService])
    ], /* @ngInject */ StorageService);
    return /* @ngInject */ StorageService;
}(smarteditcommons.IStorageService));

/** @internal */
var /* @ngInject */ PermissionsRegistrationService = /** @class */ (function () {
    PermissionsRegistrationService.$inject = ["permissionService", "sharedDataService"];
    function /* @ngInject */ PermissionsRegistrationService(permissionService, sharedDataService) {
        this.permissionService = permissionService;
        this.sharedDataService = sharedDataService;
    }
    /**
     * Method containing registrations of rules and permissions to be used in smartedit workspace
     */
    /* @ngInject */ PermissionsRegistrationService.prototype.registerRulesAndPermissions = function () {
        var _this = this;
        // Rules
        this.permissionService.registerRule({
            names: ['se.slot.belongs.to.page'],
            verify: function (permissionObjects) {
                return _this.sharedDataService
                    .get(smarteditcommons.EXPERIENCE_STORAGE_KEY)
                    .then(function (experience) {
                    return experience.pageContext &&
                        experience.pageContext.catalogVersionUuid ===
                            permissionObjects[0].context.slotCatalogVersionUuid;
                });
            }
        });
        // Permissions
        this.permissionService.registerPermission({
            aliases: ['se.slot.not.external'],
            rules: ['se.slot.belongs.to.page']
        });
    };
    /* @ngInject */ PermissionsRegistrationService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IPermissionService,
            smarteditcommons.ISharedDataService])
    ], /* @ngInject */ PermissionsRegistrationService);
    return /* @ngInject */ PermissionsRegistrationService;
}());

/** @internal */
var /* @ngInject */ CatalogService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ CatalogService, _super);
    CatalogService.$inject = ["logService", "sharedDataService", "siteService", "urlService", "contentCatalogRestService", "productCatalogRestService", "storageService"];
    function /* @ngInject */ CatalogService(logService, sharedDataService, siteService, urlService, contentCatalogRestService, productCatalogRestService, storageService) {
        var _this = _super.call(this) || this;
        _this.logService = logService;
        _this.sharedDataService = sharedDataService;
        _this.siteService = siteService;
        _this.urlService = urlService;
        _this.contentCatalogRestService = contentCatalogRestService;
        _this.productCatalogRestService = productCatalogRestService;
        _this.storageService = storageService;
        _this.SELECTED_SITE_COOKIE_NAME = 'seselectedsite';
        return _this;
    }
    /* @ngInject */ CatalogService.prototype.getContentCatalogsForSite = function (siteUID) {
        return this.contentCatalogRestService
            .get({
            siteUID: siteUID
        })
            .then(function (catalogs) { return catalogs.catalogs; });
    };
    CatalogService.prototype.getContentCatalogsForSite.$inject = ["siteUID"];
    /* @ngInject */ CatalogService.prototype.getCatalogByVersion = function (siteUID, catalogVersionName) {
        return this.getContentCatalogsForSite(siteUID).then(function (catalogs) {
            return catalogs.filter(function (catalog) {
                return catalog.versions.some(function (currentCatalogVersion) {
                    return currentCatalogVersion.version === catalogVersionName;
                });
            });
        });
    };
    CatalogService.prototype.getCatalogByVersion.$inject = ["siteUID", "catalogVersionName"];
    /* @ngInject */ CatalogService.prototype.isContentCatalogVersionNonActive = function (_uriContext) {
        var _this = this;
        return this._getContext(_uriContext).then(function (uriContext) {
            return _this.getContentCatalogsForSite(uriContext[smarteditcommons.CONTEXT_SITE_ID]).then(function (catalogs) {
                var currentCatalog = catalogs.find(function (catalog) { return catalog.catalogId === uriContext[smarteditcommons.CONTEXT_CATALOG]; });
                var currentCatalogVersion = currentCatalog
                    ? currentCatalog.versions.find(function (catalogVersion) {
                        return catalogVersion.version === uriContext[smarteditcommons.CONTEXT_CATALOG_VERSION];
                    })
                    : null;
                if (!currentCatalogVersion) {
                    throw new Error("Invalid uriContext " + uriContext + ", cannot find catalog version.");
                }
                return !currentCatalogVersion.active;
            });
        });
    };
    CatalogService.prototype.isContentCatalogVersionNonActive.$inject = ["_uriContext"];
    /* @ngInject */ CatalogService.prototype.getContentCatalogActiveVersion = function (_uriContext) {
        var _this = this;
        return this._getContext(_uriContext).then(function (uriContext) {
            return _this.getContentCatalogsForSite(uriContext[smarteditcommons.CONTEXT_SITE_ID]).then(function (catalogs) {
                var currentCatalog = catalogs.find(function (catalog) { return catalog.catalogId === uriContext[smarteditcommons.CONTEXT_CATALOG]; });
                var activeCatalogVersion = currentCatalog
                    ? currentCatalog.versions.find(function (catalogVersion) { return catalogVersion.active; })
                    : null;
                if (!activeCatalogVersion) {
                    throw new Error("Invalid uriContext " + uriContext + ", cannot find catalog version.");
                }
                return activeCatalogVersion.version;
            });
        });
    };
    CatalogService.prototype.getContentCatalogActiveVersion.$inject = ["_uriContext"];
    /* @ngInject */ CatalogService.prototype.getActiveContentCatalogVersionByCatalogId = function (contentCatalogId) {
        var _this = this;
        return this._getContext().then(function (uriContext) {
            return _this.getContentCatalogsForSite(uriContext[smarteditcommons.CONTEXT_SITE_ID]).then(function (catalogs) {
                var currentCatalog = catalogs.find(function (catalog) { return catalog.catalogId === contentCatalogId; });
                var currentCatalogVersion = currentCatalog
                    ? currentCatalog.versions.find(function (catalogVersion) { return catalogVersion.active; })
                    : null;
                if (!currentCatalogVersion) {
                    throw new Error("Invalid content catalog " + contentCatalogId + ", cannot find any active catalog version.");
                }
                return currentCatalogVersion.version;
            });
        });
    };
    CatalogService.prototype.getActiveContentCatalogVersionByCatalogId.$inject = ["contentCatalogId"];
    /* @ngInject */ CatalogService.prototype.getContentCatalogVersion = function (_uriContext) {
        var _this = this;
        return this._getContext(_uriContext).then(function (uriContext) {
            return _this.getContentCatalogsForSite(uriContext[smarteditcommons.CONTEXT_SITE_ID]).then(function (catalogs) {
                var catalog = catalogs.find(function (c) { return c.catalogId === uriContext[smarteditcommons.CONTEXT_CATALOG]; });
                if (!catalog) {
                    throw new Error('no catalog ' +
                        uriContext[smarteditcommons.CONTEXT_CATALOG] +
                        ' found for site ' +
                        uriContext[smarteditcommons.CONTEXT_SITE_ID]);
                }
                var catalogVersion = catalog.versions.find(function (version) { return version.version === uriContext[smarteditcommons.CONTEXT_CATALOG_VERSION]; });
                if (!catalogVersion) {
                    throw new Error("no catalogVersion " + uriContext[smarteditcommons.CONTEXT_CATALOG_VERSION] + " for catalog " + uriContext[smarteditcommons.CONTEXT_CATALOG] + " and site " + uriContext[smarteditcommons.CONTEXT_SITE_ID]);
                }
                catalogVersion.catalogName = catalog.name;
                catalogVersion.catalogId = catalog.catalogId;
                return catalogVersion;
            });
        });
    };
    CatalogService.prototype.getContentCatalogVersion.$inject = ["_uriContext"];
    /* @ngInject */ CatalogService.prototype.getCurrentSiteID = function () {
        return this.storageService.getValueFromLocalStorage(this.SELECTED_SITE_COOKIE_NAME, false);
    };
    /**
     * Finds the ID of the default site configured for the provided content catalog.
     * @param contentCatalogId The UID of content catalog for which to retrieve its default site ID.
     * @returns The ID of the default site found.
     */
    /* @ngInject */ CatalogService.prototype.getDefaultSiteForContentCatalog = function (contentCatalogId) {
        var _this = this;
        return this.siteService.getSites().then(function (sites) {
            var defaultSitesForCatalog = sites.filter(function (site) {
                // ContentCatalogs in the site object are sorted. The last one is considered
                // the default one for a given site.
                var siteDefaultContentCatalog = lo.last(site.contentCatalogs);
                return siteDefaultContentCatalog && siteDefaultContentCatalog === contentCatalogId;
            });
            if (defaultSitesForCatalog.length === 0) {
                _this.logService.warn("[catalogService] - No default site found for content catalog " + contentCatalogId);
            }
            else if (defaultSitesForCatalog.length > 1) {
                _this.logService.warn("[catalogService] - Many default sites found for content catalog " + contentCatalogId);
            }
            return defaultSitesForCatalog[0];
        });
    };
    CatalogService.prototype.getDefaultSiteForContentCatalog.$inject = ["contentCatalogId"];
    /* @ngInject */ CatalogService.prototype.getCatalogVersionByUuid = function (catalogVersionUuid, siteId) {
        var _this = this;
        return this.getAllContentCatalogsGroupedById().then(function (contentCatalogsGrouped) {
            var catalogs = lo.reduce(contentCatalogsGrouped, function (allCatalogs, siteCatalogs) { return allCatalogs.concat(siteCatalogs); }, []);
            var catalogVersionFound = lo.flatten(catalogs.map(function (catalog) {
                return lo.cloneDeep(catalog.versions).map(function (version) {
                    version.catalogName = catalog.name;
                    version.catalogId = catalog.catalogId;
                    return version;
                });
            }))
                .filter(function (version) {
                return catalogVersionUuid === version.uuid &&
                    (!siteId || siteId === version.siteDescriptor.uid);
            })[0];
            if (!catalogVersionFound) {
                var errorMessage = 'Cannot find catalog version with UUID ' +
                    catalogVersionUuid +
                    (siteId ? ' in site ' + siteId : '');
                throw new Error(errorMessage);
            }
            return _this.getCurrentSiteID().then(function (defaultSiteID) {
                catalogVersionFound.siteId = defaultSiteID;
                return catalogVersionFound;
            });
        });
    };
    CatalogService.prototype.getCatalogVersionByUuid.$inject = ["catalogVersionUuid", "siteId"];
    /* @ngInject */ CatalogService.prototype.getAllContentCatalogsGroupedById = function () {
        var _this = this;
        return this.siteService.getSites().then(function (sites) {
            var promisesToResolve = sites.map(function (site) {
                return _this.getContentCatalogsForSite(site.uid).then(function (catalogs) {
                    catalogs.forEach(function (catalog) {
                        catalog.versions = catalog.versions.map(function (catalogVersion) {
                            catalogVersion.siteDescriptor = site;
                            return catalogVersion;
                        });
                    });
                    return catalogs;
                });
            });
            return Promise.all(promisesToResolve);
        });
    };
    /* @ngInject */ CatalogService.prototype.getProductCatalogsBySiteKey = function (siteUIDKey) {
        var _this = this;
        return this._getContext().then(function (uriContext) {
            return _this.getProductCatalogsForSite(uriContext[siteUIDKey]);
        });
    };
    CatalogService.prototype.getProductCatalogsBySiteKey.$inject = ["siteUIDKey"];
    /* =====================================================================================================================
      * `getProductCatalogsBySite` is to get product catalogs by site value
      * `siteUIDValue` - is the site value rather than site key
      * if you want to get product catalogs by site key, please refer to function `getProductCatalogsBySiteKey`
       =====================================================================================================================
    */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    /* @ngInject */ CatalogService.prototype.getProductCatalogsForSite = function (siteUIDValue) {
        return this.productCatalogRestService
            .get({
            siteUID: siteUIDValue
        })
            .then(function (catalogs) { return catalogs.catalogs; });
    };
    CatalogService.prototype.getProductCatalogsForSite.$inject = ["siteUIDValue"];
    /* @ngInject */ CatalogService.prototype.getActiveProductCatalogVersionByCatalogId = function (productCatalogId) {
        return this.getProductCatalogsBySiteKey(smarteditcommons.CONTEXT_SITE_ID).then(function (catalogs) {
            var currentCatalog = catalogs.find(function (catalog) { return catalog.catalogId === productCatalogId; });
            var currentCatalogVersion = currentCatalog
                ? currentCatalog.versions.find(function (catalogVersion) { return catalogVersion.active; })
                : null;
            if (!currentCatalogVersion) {
                throw new Error("Invalid product catalog " + productCatalogId + ", cannot find any active catalog version.");
            }
            return currentCatalogVersion.version;
        });
    };
    CatalogService.prototype.getActiveProductCatalogVersionByCatalogId.$inject = ["productCatalogId"];
    // =====================================================================================================================
    //  Helper Methods
    // =====================================================================================================================
    /* @ngInject */ CatalogService.prototype.getCatalogVersionUUid = function (_uriContext) {
        return this.getContentCatalogVersion(_uriContext).then(function (catalogVersion) { return catalogVersion.uuid; });
    };
    CatalogService.prototype.getCatalogVersionUUid.$inject = ["_uriContext"];
    /* @ngInject */ CatalogService.prototype.retrieveUriContext = function (_uriContext) {
        return this._getContext(_uriContext);
    };
    CatalogService.prototype.retrieveUriContext.$inject = ["_uriContext"];
    /* @ngInject */ CatalogService.prototype.returnActiveCatalogVersionUIDs = function (catalogs) {
        return catalogs.reduce(function (accumulator, catalog) {
            accumulator.push(catalog.versions.find(function (version) { return version.active; }).uuid);
            return accumulator;
        }, []);
    };
    CatalogService.prototype.returnActiveCatalogVersionUIDs.$inject = ["catalogs"];
    // eslint-disable-next-line @typescript-eslint/member-ordering
    /* @ngInject */ CatalogService.prototype.isCurrentCatalogMultiCountry = function () {
        var _this = this;
        return this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY).then(function (experience) {
            if (experience && experience.siteDescriptor && experience.catalogDescriptor) {
                var siteId = experience.siteDescriptor.uid;
                var catalogId_1 = experience.catalogDescriptor.catalogId;
                return _this.getContentCatalogsForSite(siteId).then(function (catalogs) {
                    var catalog = catalogs.find(function (obj) { return obj.catalogId === catalogId_1; });
                    return Promise.resolve(catalog && catalog.parents && catalog.parents.length ? true : false);
                });
            }
            return false;
        });
    };
    /* @ngInject */ CatalogService.prototype._getContext = function (_uriContext) {
        var _this = this;
        // TODO: once refactored by Nick, use definition of experience
        return _uriContext
            ? Promise.resolve(_uriContext)
            : this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY).then(function (experience) {
                if (!experience) {
                    throw new Error('catalogService was not provided with a uriContext and could not retrive an experience from sharedDataService');
                }
                return _this.urlService.buildUriContext(experience.siteDescriptor.uid, experience.catalogDescriptor.catalogId, experience.catalogDescriptor.catalogVersion);
            });
    };
    CatalogService.prototype._getContext.$inject = ["_uriContext"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.catalogEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CatalogService.prototype, "getProductCatalogsForSite", null);
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.pageChangeEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CatalogService.prototype, "isCurrentCatalogMultiCountry", null);
    /* @ngInject */ CatalogService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ICatalogService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.ISharedDataService,
            SiteService,
            smarteditcommons.IUrlService,
            smarteditcommons.ContentCatalogRestService,
            smarteditcommons.ProductCatalogRestService,
            smarteditcommons.IStorageService])
    ], /* @ngInject */ CatalogService);
    return /* @ngInject */ CatalogService;
}(smarteditcommons.ICatalogService));

/** @internal */
var /* @ngInject */ UrlService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ UrlService, _super);
    UrlService.$inject = ["router", "location", "windowUtils"];
    function /* @ngInject */ UrlService(router, location, windowUtils) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.location = location;
        _this.windowUtils = windowUtils;
        return _this;
    }
    /* @ngInject */ UrlService.prototype.openUrlInPopup = function (url) {
        var win = this.windowUtils
            .getWindow()
            .open(url, '_blank', 'toolbar=no, scrollbars=yes, resizable=yes');
        win.focus();
    };
    UrlService.prototype.openUrlInPopup.$inject = ["url"];
    /* @ngInject */ UrlService.prototype.path = function (url) {
        /**
         * Route registered in angularjs application does not work
         * if the angular route has been used to navigate to currently previewed page.
         * Same happening if we first navigate to angularjs page and angular routing stops working.
         * The possible solution: use location and router service at the same time.
         */
        this.location.go(url);
        this.router.navigateByUrl(url);
    };
    UrlService.prototype.path.$inject = ["url"];
    /* @ngInject */ UrlService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IUrlService),
        smarteditcommons.GatewayProxied('openUrlInPopup', 'path'),
        core.Injectable(),
        __metadata("design:paramtypes", [router.Router,
            common.Location,
            smarteditcommons.WindowUtils])
    ], /* @ngInject */ UrlService);
    return /* @ngInject */ UrlService;
}(smarteditcommons.IUrlService));

/** @internal */
var /* @ngInject */ WaitDialogService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ WaitDialogService, _super);
    WaitDialogService.$inject = ["modalService"];
    function /* @ngInject */ WaitDialogService(modalService) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        _this.modalRef = null;
        return _this;
    }
    /* @ngInject */ WaitDialogService.prototype.showWaitModal = function (customLoadingMessageLocalizedKey) {
        var config = {
            component: smarteditcommons.WaitDialogComponent,
            data: { customLoadingMessageLocalizedKey: customLoadingMessageLocalizedKey },
            config: {
                backdropClickCloseable: false,
                modalPanelClass: 'se-wait-spinner-dialog',
                focusTrapped: false
            }
        };
        if (this.modalRef === null) {
            this.modalRef = this.modalService.open(config);
        }
    };
    WaitDialogService.prototype.showWaitModal.$inject = ["customLoadingMessageLocalizedKey"];
    /* @ngInject */ WaitDialogService.prototype.hideWaitModal = function () {
        if (this.modalRef != null) {
            this.modalRef.close();
            this.modalRef = null;
        }
    };
    /* @ngInject */ WaitDialogService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IWaitDialogService),
        smarteditcommons.GatewayProxied(),
        __metadata("design:paramtypes", [smarteditcommons.ModalService])
    ], /* @ngInject */ WaitDialogService);
    return /* @ngInject */ WaitDialogService;
}(smarteditcommons.IWaitDialogService));

/**
 * Validates if user has permission on current catalog.
 *
 * Implemented by Route Guards.
 */
var /* @ngInject */ CatalogAwareRouteResolverHelper = /** @class */ (function () {
    CatalogAwareRouteResolverHelper.$inject = ["logService", "route", "systemEventService", "experienceService", "sharedDataService", "catalogVersionPermissionService"];
    function /* @ngInject */ CatalogAwareRouteResolverHelper(logService, route, systemEventService, experienceService, sharedDataService, catalogVersionPermissionService) {
        this.logService = logService;
        this.route = route;
        this.systemEventService = systemEventService;
        this.experienceService = experienceService;
        this.sharedDataService = sharedDataService;
        this.catalogVersionPermissionService = catalogVersionPermissionService;
    }
    /* @ngInject */ CatalogAwareRouteResolverHelper_1 = /* @ngInject */ CatalogAwareRouteResolverHelper;
    /**
     * @internal
     * @ignore
     *
     * Convert to instance method after 2105 deprecation period has been exceeded.
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions = function (catalogVersionPermissionService, logService, experienceService, systemEventService, operation) {
        return operation().then(function () {
            return catalogVersionPermissionService.hasReadPermissionOnCurrent().then(function (hasReadPermission) {
                if (!hasReadPermission) {
                    logService.info('no permission to access the storefront view with this experience');
                    return Promise.reject();
                }
                return experienceService
                    .hasCatalogVersionChanged()
                    .then(function (hasCatalogVersionChanged) {
                    if (hasCatalogVersionChanged) {
                        systemEventService.publishAsync(smarteditcommons.EVENTS.EXPERIENCE_UPDATE);
                    }
                    return true;
                });
            }, function () {
                logService.info('failed to evaluate permissions to access the storefront view with this experience');
                return Promise.reject();
            });
        }, function (error) {
            logService.error('could not retrieve experience from storage or route params', error);
            throw new Error(error);
        });
    };
    CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions.$inject = ["catalogVersionPermissionService", "logService", "experienceService", "systemEventService", "operation"];
    /**
     * @internal
     * @ignore
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.checkExperienceIsSet = function (experienceService, sharedDataService) {
        return new Promise(function (resolve, reject) {
            experienceService.getCurrentExperience().then(function (experience) {
                if (!experience) {
                    return reject();
                }
                // next line to preserve in-memory features throughout the app
                sharedDataService.set(smarteditcommons.EXPERIENCE_STORAGE_KEY, experience);
                return resolve(experience);
            });
        });
    };
    CatalogAwareRouteResolverHelper.checkExperienceIsSet.$inject = ["experienceService", "sharedDataService"];
    /**
     * @internal
     * @ignore
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.buildExperienceFromRoute = function (experienceService, params) {
        return experienceService.buildAndSetExperience(params).then(function (experience) {
            if (!experience) {
                return Promise.reject();
            }
            return experience;
        });
    };
    CatalogAwareRouteResolverHelper.buildExperienceFromRoute.$inject = ["experienceService", "params"];
    /**
     * Checks presence of a stored experience.
     *
     * It will reject if the user doesn't have a read permission to the current catalog version.
     * Consumer can redirect current user to the Landing Page by handling the rejection.
     *
     * If the user has read permission for the catalog version then EVENTS.EXPERIENCE_UPDATE is sent, but only when the experience has been changed.
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.prototype.storefrontResolve = function () {
        var _this = this;
        return this.executeAndCheckCatalogPermissions(function () { return _this.checkExperienceIsSet(); });
    };
    /**
     * Initializes new experience based on route params.
     *
     * It will reject if the user doesn't have a read permission to the current catalog version.
     * Consumer can redirect current user to the Landing Page by handling the rejection.
     *
     * If the user has read permission for the catalog version then EVENTS.EXPERIENCE_UPDATE is sent, but only when the experience has been changed.
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.prototype.experienceFromPathResolve = function (params) {
        var _this = this;
        return this.executeAndCheckCatalogPermissions(function () { return _this.buildExperienceFromRoute(params); });
    };
    CatalogAwareRouteResolverHelper.prototype.experienceFromPathResolve.$inject = ["params"];
    /**
     * Runs operation that sets the experience and then resolves to true if the user has read permissions on current catalog.
     *
     * @internal
     * @ignore
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.prototype.executeAndCheckCatalogPermissions = function (operation) {
        return /* @ngInject */ CatalogAwareRouteResolverHelper_1.executeAndCheckCatalogPermissions(this.catalogVersionPermissionService, this.logService, this.experienceService, this.systemEventService, operation);
    };
    CatalogAwareRouteResolverHelper.prototype.executeAndCheckCatalogPermissions.$inject = ["operation"];
    /**
     * Resolves with the existing experience if it is set, otherwise rejects.
     *
     * @internal
     * @ignore
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.prototype.checkExperienceIsSet = function () {
        return /* @ngInject */ CatalogAwareRouteResolverHelper_1.checkExperienceIsSet(this.experienceService, this.sharedDataService);
    };
    /**
     * Creates and sets an experience based on active route params.
     *
     * @internal
     * @ignore
     */
    /* @ngInject */ CatalogAwareRouteResolverHelper.prototype.buildExperienceFromRoute = function (params) {
        return /* @ngInject */ CatalogAwareRouteResolverHelper_1.buildExperienceFromRoute(this.experienceService, params || this.route.snapshot.params);
    };
    CatalogAwareRouteResolverHelper.prototype.buildExperienceFromRoute.$inject = ["params"];
    var /* @ngInject */ CatalogAwareRouteResolverHelper_1;
    /* @ngInject */ CatalogAwareRouteResolverHelper = /* @ngInject */ CatalogAwareRouteResolverHelper_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            router.ActivatedRoute,
            smarteditcommons.SystemEventService,
            smarteditcommons.IExperienceService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.ICatalogVersionPermissionService])
    ], /* @ngInject */ CatalogAwareRouteResolverHelper);
    return /* @ngInject */ CatalogAwareRouteResolverHelper;
}());

var CatalogAwareRouteResolverFunctions = /** @class */ (function () {
    function CatalogAwareRouteResolverFunctions() {
    }
    CatalogAwareRouteResolverFunctions.storefrontResolve = ["$log", "$location", "experienceService", "sharedDataService", "systemEventService", "catalogVersionPermissionService", function ($log, $location, experienceService, sharedDataService, systemEventService, catalogVersionPermissionService) {
        'ngInject';
        return CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions(catalogVersionPermissionService, $log, experienceService, systemEventService, function () {
            return CatalogAwareRouteResolverHelper.checkExperienceIsSet(experienceService, sharedDataService);
        }).catch(function () {
            $location.url(smarteditcommons.LANDING_PAGE_PATH);
        });
    }];
    CatalogAwareRouteResolverFunctions.experienceFromPathResolve = ["$route", "$log", "$location", "experienceService", "systemEventService", "catalogVersionPermissionService", function ($route, $log, $location, experienceService, systemEventService, catalogVersionPermissionService) {
        'ngInject';
        return CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions(catalogVersionPermissionService, $log, experienceService, systemEventService, function () {
            return CatalogAwareRouteResolverHelper.buildExperienceFromRoute(experienceService, $route.current.params);
        }).catch(function () {
            $location.url(smarteditcommons.LANDING_PAGE_PATH);
        });
    }];
    return CatalogAwareRouteResolverFunctions;
}());
var /* @ngInject */ CatalogAwareRouteResolverModule = /** @class */ (function () {
    function /* @ngInject */ CatalogAwareRouteResolverModule() {
    }
    /* @ngInject */ CatalogAwareRouteResolverModule = __decorate([
        smarteditcommons.SeModule({
            providers: [
                {
                    provide: 'catalogAwareRouteResolverFunctions',
                    useValue: CatalogAwareRouteResolverFunctions
                }
            ]
        })
    ], /* @ngInject */ CatalogAwareRouteResolverModule);
    return /* @ngInject */ CatalogAwareRouteResolverModule;
}());

/** @internal */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
        this.data = {};
    }
    MemoryStorage.prototype.clear = function () {
        this.data = {};
        return Promise.resolve(true);
    };
    MemoryStorage.prototype.dispose = function () {
        return Promise.resolve(true);
    };
    MemoryStorage.prototype.find = function (queryObject) {
        return this.get(queryObject).then(function (result) { return [result]; });
    };
    MemoryStorage.prototype.get = function (queryObject) {
        return Promise.resolve(this.data[this.getKey(queryObject)]);
    };
    MemoryStorage.prototype.getLength = function () {
        return Promise.resolve(Object.keys(this.data).length);
    };
    MemoryStorage.prototype.put = function (obj, queryObject) {
        this.data[this.getKey(queryObject)] = obj;
        return Promise.resolve(true);
    };
    MemoryStorage.prototype.remove = function (queryObject) {
        var originalData = this.data[this.getKey(queryObject)];
        delete this.data[this.getKey(queryObject)];
        return Promise.resolve(originalData);
    };
    MemoryStorage.prototype.entries = function () {
        var _this = this;
        var entries = [];
        Object.keys(this.data).forEach(function (key) {
            entries.push([JSON.parse(key), _this.data[key]]);
        });
        return Promise.resolve(entries);
    };
    MemoryStorage.prototype.getKey = function (queryObject) {
        return JSON.stringify(queryObject);
    };
    return MemoryStorage;
}());

/** @internal */
var MemoryStorageController = /** @class */ (function () {
    function MemoryStorageController(storagePropertiesService) {
        this.storages = {};
        this.storageType = storagePropertiesService.getProperty('STORAGE_TYPE_IN_MEMORY');
    }
    MemoryStorageController.prototype.getStorage = function (options) {
        var storage = this.storages[options.storageId];
        if (!storage) {
            storage = new MemoryStorage();
        }
        this.storages[options.storageId] = storage;
        return Promise.resolve(storage);
    };
    MemoryStorageController.prototype.deleteStorage = function (storageId) {
        delete this.storages[storageId];
        return Promise.resolve(true);
    };
    MemoryStorageController.prototype.getStorageIds = function () {
        return Promise.resolve(Object.keys(this.storages));
    };
    return MemoryStorageController;
}());

/** @internal */
var WebStorage = /** @class */ (function () {
    function WebStorage(controller, storageConfiguration) {
        this.controller = controller;
        this.storageConfiguration = storageConfiguration;
    }
    WebStorage.ERR_INVALID_QUERY_OBJECT = function (queryObjec, storageId) {
        return new Error("WebStorage exception for storage [" + storageId + "]. Invalid key [" + queryObjec + "]");
    };
    WebStorage.prototype.clear = function () {
        this.controller.saveStorageData({});
        return Promise.resolve(true);
    };
    WebStorage.prototype.find = function (queryObject) {
        if (queryObject === undefined) {
            throw WebStorage.ERR_INVALID_QUERY_OBJECT(queryObject, this.storageConfiguration.storageId);
        }
        return this.get(queryObject).then(function (result) { return [result]; });
    };
    WebStorage.prototype.get = function (queryObject) {
        var _this = this;
        return this.controller.getStorageData().then(function (data) {
            var key = _this.getKeyFromQueryObj(queryObject);
            return Promise.resolve(data[key]);
        });
    };
    WebStorage.prototype.put = function (obj, queryObject) {
        var _this = this;
        return this.controller.getStorageData().then(function (data) {
            data[_this.getKeyFromQueryObj(queryObject)] = obj;
            _this.controller.saveStorageData(data);
            return Promise.resolve(true);
        });
    };
    WebStorage.prototype.remove = function (queryObject) {
        var _this = this;
        if (queryObject === undefined) {
            throw WebStorage.ERR_INVALID_QUERY_OBJECT(queryObject, this.storageConfiguration.storageId);
        }
        var getPromise = this.get(queryObject);
        return this.controller.getStorageData().then(function (data) {
            delete data[_this.getKeyFromQueryObj(queryObject)];
            _this.controller.saveStorageData(data);
            return getPromise;
        });
    };
    WebStorage.prototype.getLength = function () {
        return this.controller
            .getStorageData()
            .then(function (data) { return Promise.resolve(Object.keys(data).length); });
    };
    WebStorage.prototype.dispose = function () {
        return Promise.resolve(true);
    };
    WebStorage.prototype.entries = function () {
        var _this = this;
        var entries = [];
        return new Promise(function (resolve) {
            _this.controller.getStorageData().then(function (data) {
                Object.keys(data).forEach(function (key) {
                    entries.push([JSON.parse(key), data[key]]);
                });
                resolve(entries);
            });
        });
    };
    WebStorage.prototype.getKeyFromQueryObj = function (queryObj) {
        return JSON.stringify(queryObj);
    };
    return WebStorage;
}());

/** @internal */
var WebStorageBridge = /** @class */ (function () {
    function WebStorageBridge(controller, configuration) {
        this.controller = controller;
        this.configuration = configuration;
    }
    WebStorageBridge.prototype.saveStorageData = function (data) {
        return this.controller.saveStorageData(this.configuration.storageId, data);
    };
    WebStorageBridge.prototype.getStorageData = function () {
        return this.controller.getStorageData(this.configuration.storageId);
    };
    return WebStorageBridge;
}());

/** @internal */
var AbstractWebStorageController = /** @class */ (function () {
    function AbstractWebStorageController() {
    }
    AbstractWebStorageController.prototype.getStorage = function (configuration) {
        var _this = this;
        var bridge = new WebStorageBridge(this, configuration);
        var store = new WebStorage(bridge, configuration);
        var oldDispose = store.dispose;
        store.dispose = function () {
            return _this.deleteStorage(configuration.storageId).then(function () { return oldDispose(); });
        };
        return Promise.resolve(store);
    };
    AbstractWebStorageController.prototype.deleteStorage = function (storageId) {
        var container = this.getWebStorageContainer();
        delete container[storageId];
        this.setWebStorageContainer(container);
        return Promise.resolve(true);
    };
    AbstractWebStorageController.prototype.getStorageIds = function () {
        var keys = Object.keys(this.getWebStorageContainer());
        return Promise.resolve(keys);
    };
    AbstractWebStorageController.prototype.saveStorageData = function (storageId, data) {
        var root = this.getWebStorageContainer();
        root[storageId] = data;
        this.setWebStorageContainer(root);
        return Promise.resolve(true);
    };
    AbstractWebStorageController.prototype.getStorageData = function (storageId) {
        var root = this.getWebStorageContainer();
        if (root[storageId]) {
            return Promise.resolve(root[storageId]);
        }
        return Promise.resolve({});
    };
    AbstractWebStorageController.prototype.setWebStorageContainer = function (data) {
        this.getStorageApi().setItem(this.getStorageRootKey(), JSON.stringify(data));
    };
    AbstractWebStorageController.prototype.getWebStorageContainer = function () {
        var container = this.getStorageApi().getItem(this.getStorageRootKey());
        if (!container) {
            return {};
        }
        return JSON.parse(container);
    };
    return AbstractWebStorageController;
}());

/** @internal */
var LocalStorageController = /** @class */ (function (_super) {
    __extends(LocalStorageController, _super);
    function LocalStorageController(storagePropertiesService) {
        var _this = _super.call(this) || this;
        _this.storagePropertiesService = storagePropertiesService;
        _this.storageType = _this.storagePropertiesService.getProperty('STORAGE_TYPE_LOCAL_STORAGE');
        return _this;
    }
    LocalStorageController.prototype.getStorageApi = function () {
        return window.localStorage;
    };
    LocalStorageController.prototype.getStorageRootKey = function () {
        return this.storagePropertiesService.getProperty('LOCAL_STORAGE_ROOT_KEY');
    };
    return LocalStorageController;
}(AbstractWebStorageController));

/** @internal */
var SessionStorageController = /** @class */ (function (_super) {
    __extends(SessionStorageController, _super);
    function SessionStorageController(storagePropertiesService) {
        var _this = _super.call(this) || this;
        _this.storagePropertiesService = storagePropertiesService;
        _this.storageType = _this.storagePropertiesService.getProperty('STORAGE_TYPE_SESSION_STORAGE');
        return _this;
    }
    SessionStorageController.prototype.getStorageApi = function () {
        return window.sessionStorage;
    };
    SessionStorageController.prototype.getStorageRootKey = function () {
        return this.storagePropertiesService.getProperty('SESSION_STORAGE_ROOT_KEY');
    };
    return SessionStorageController;
}(AbstractWebStorageController));

/** @internal */
var /* @ngInject */ StorageManagerGateway = /** @class */ (function () {
    StorageManagerGateway.$inject = ["storageManager"];
    function /* @ngInject */ StorageManagerGateway(storageManager) {
        this.storageManager = storageManager;
    }
    /* @ngInject */ StorageManagerGateway.prototype.getStorageSanitityCheck = function (storageConfiguration) {
        return this.storageManager.getStorage(storageConfiguration).then(function () { return true; }, function () { return false; });
    };
    StorageManagerGateway.prototype.getStorageSanitityCheck.$inject = ["storageConfiguration"];
    /* @ngInject */ StorageManagerGateway.prototype.deleteExpiredStorages = function (force) {
        return this.storageManager.deleteExpiredStorages(force);
    };
    StorageManagerGateway.prototype.deleteExpiredStorages.$inject = ["force"];
    /* @ngInject */ StorageManagerGateway.prototype.deleteStorage = function (storageId, force) {
        return this.storageManager.deleteStorage(storageId, force);
    };
    StorageManagerGateway.prototype.deleteStorage.$inject = ["storageId", "force"];
    /* @ngInject */ StorageManagerGateway.prototype.hasStorage = function (storageId) {
        return this.storageManager.hasStorage(storageId);
    };
    StorageManagerGateway.prototype.hasStorage.$inject = ["storageId"];
    /* @ngInject */ StorageManagerGateway.prototype.getStorage = function (storageConfiguration) {
        throw new Error("getStorage() is not supported from the StorageManagerGateway, please use the storage manager directly");
    };
    StorageManagerGateway.prototype.getStorage.$inject = ["storageConfiguration"];
    /* @ngInject */ StorageManagerGateway.prototype.registerStorageController = function (controller) {
        throw new Error("registerStorageController() is not supported from the StorageManagerGateway, please use the storage manager directly");
    };
    StorageManagerGateway.prototype.registerStorageController.$inject = ["controller"];
    /* @ngInject */ StorageManagerGateway = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageManagerGateway),
        smarteditcommons.GatewayProxied('getStorageSanitityCheck', 'deleteExpiredStorages', 'deleteStorage', 'hasStorage'),
        __param(0, core.Inject(smarteditcommons.DO_NOT_USE_STORAGE_MANAGER_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.IStorageManager])
    ], /* @ngInject */ StorageManagerGateway);
    return /* @ngInject */ StorageManagerGateway;
}());

/** @internal */
var /* @ngInject */ StorageGateway = /** @class */ (function () {
    StorageGateway.$inject = ["storageManager"];
    function /* @ngInject */ StorageGateway(storageManager) {
        this.storageManager = storageManager;
    }
    /* @ngInject */ StorageGateway.prototype.handleStorageRequest = function (storageConfiguration, method, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storageManager.getStorage(storageConfiguration).then(function (storage) { return resolve(storage[method].apply(storage, args)); }, function (reason) { return reject(reason); });
        });
    };
    StorageGateway.prototype.handleStorageRequest.$inject = ["storageConfiguration", "method", "args"];
    /* @ngInject */ StorageGateway = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStorageGateway),
        smarteditcommons.GatewayProxied(),
        __param(0, core.Inject(smarteditcommons.DO_NOT_USE_STORAGE_MANAGER_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.IStorageManager])
    ], /* @ngInject */ StorageGateway);
    return /* @ngInject */ StorageGateway;
}());

/** @internal */
var MetaDataMapStorage = /** @class */ (function () {
    function MetaDataMapStorage(storageKey) {
        this.storageKey = storageKey;
    }
    MetaDataMapStorage.prototype.getAll = function () {
        var allMetaData = [];
        var data = this.getDataFromStore();
        Object.keys(data).forEach(function (key) {
            allMetaData.push(data[key]);
        });
        return allMetaData;
    };
    MetaDataMapStorage.prototype.get = function (storageId) {
        return this.getDataFromStore()[storageId];
    };
    MetaDataMapStorage.prototype.put = function (storageId, value) {
        var data = this.getDataFromStore();
        data[storageId] = value;
        this.setDataInStore(data);
    };
    MetaDataMapStorage.prototype.remove = function (storageId) {
        var data = this.getDataFromStore();
        delete data[storageId];
        this.setDataInStore(data);
    };
    MetaDataMapStorage.prototype.removeAll = function () {
        window.localStorage.removeItem(this.storageKey);
    };
    MetaDataMapStorage.prototype.getDataFromStore = function () {
        try {
            var store = window.localStorage.getItem(this.storageKey);
            if (store === null) {
                return {};
            }
            return JSON.parse(store);
        }
        catch (e) {
            return {};
        }
    };
    MetaDataMapStorage.prototype.setDataInStore = function (data) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(data));
    };
    return MetaDataMapStorage;
}());

/** @internal */
var /* @ngInject */ StorageManager = /** @class */ (function () {
    StorageManager.$inject = ["logService", "storagePropertiesService"];
    function /* @ngInject */ StorageManager(logService, storagePropertiesService) {
        this.logService = logService;
        this.storagePropertiesService = storagePropertiesService;
        this.storageControllers = {};
        this.storages = {};
        this.storageMetaDataMap = new MetaDataMapStorage(this.storagePropertiesService.getProperty('LOCAL_STORAGE_KEY_STORAGE_MANAGER_METADATA'));
    }
    /* @ngInject */ StorageManager_1 = /* @ngInject */ StorageManager;
    /* @ngInject */ StorageManager.ERR_NO_STORAGE_TYPE_CONTROLLER = function (storageType) {
        return new Error("StorageManager Error: Cannot create storage. No Controller available to handle type [" + storageType + "]");
    };
    StorageManager.ERR_NO_STORAGE_TYPE_CONTROLLER.$inject = ["storageType"];
    /* @ngInject */ StorageManager.prototype.registerStorageController = function (controller) {
        this.storageControllers[controller.storageType] = controller;
    };
    StorageManager.prototype.registerStorageController.$inject = ["controller"];
    /* @ngInject */ StorageManager.prototype.getStorage = function (storageConfiguration) {
        var _this = this;
        this.setDefaultStorageOptions(storageConfiguration);
        var loadExistingStorage = this.hasStorage(storageConfiguration.storageId);
        var pendingValidation = Promise.resolve(true);
        if (loadExistingStorage) {
            var metadata = this.storageMetaDataMap.get(storageConfiguration.storageId);
            pendingValidation = this.verifyMetaData(metadata, storageConfiguration);
        }
        return new Promise(function (resolve, reject) {
            pendingValidation
                .then(function () {
                if (_this.storages[storageConfiguration.storageId]) {
                    _this.updateStorageMetaData(storageConfiguration);
                    resolve(_this.storages[storageConfiguration.storageId]);
                }
                else {
                    _this.getStorageController(storageConfiguration.storageType)
                        .getStorage(storageConfiguration)
                        .then(function (newStorage) {
                        _this.applyDisposeDecorator(storageConfiguration.storageId, newStorage);
                        _this.updateStorageMetaData(storageConfiguration);
                        _this.storages[storageConfiguration.storageId] = newStorage;
                        resolve(newStorage);
                    });
                }
            })
                .catch(function (e) { return reject(e); });
        });
    };
    StorageManager.prototype.getStorage.$inject = ["storageConfiguration"];
    /* @ngInject */ StorageManager.prototype.hasStorage = function (storageId) {
        // true if we have metadata for it
        return !!this.storageMetaDataMap.get(storageId);
    };
    StorageManager.prototype.hasStorage.$inject = ["storageId"];
    /* @ngInject */ StorageManager.prototype.deleteStorage = function (storageId, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        delete this.storages[storageId];
        if (!this.hasStorage(storageId)) {
            return Promise.resolve(true);
        }
        var metaData = this.storageMetaDataMap.get(storageId);
        if (metaData) {
            var ctrl = void 0;
            try {
                ctrl = this.getStorageController(metaData.storageType);
            }
            catch (e) {
                // silently fail on no storage type handler
                if (force) {
                    this.storageMetaDataMap.remove(storageId);
                }
                return Promise.resolve(true);
            }
            return ctrl.deleteStorage(storageId).then(function () {
                _this.storageMetaDataMap.remove(storageId);
                return Promise.resolve(true);
            });
        }
        else {
            return Promise.resolve(true);
        }
    };
    StorageManager.prototype.deleteStorage.$inject = ["storageId", "force"];
    /* @ngInject */ StorageManager.prototype.deleteExpiredStorages = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var deletePromises = [];
        var storageMetaDatas = this.storageMetaDataMap.getAll();
        storageMetaDatas.forEach(function (metaData) {
            if (_this.isStorageExpired(metaData)) {
                deletePromises.push(_this.deleteStorage(metaData.storageId, force));
            }
        });
        return Promise.all(deletePromises).then(function () { return true; }, function () { return false; });
    };
    StorageManager.prototype.deleteExpiredStorages.$inject = ["force"];
    /* @ngInject */ StorageManager.prototype.updateStorageMetaData = function (storageConfiguration) {
        this.storageMetaDataMap.put(storageConfiguration.storageId, {
            storageId: storageConfiguration.storageId,
            storageType: storageConfiguration.storageType,
            storageVersion: storageConfiguration.storageVersion,
            lastAccess: Date.now()
        });
    };
    StorageManager.prototype.updateStorageMetaData.$inject = ["storageConfiguration"];
    /* @ngInject */ StorageManager.prototype.isStorageExpired = function (metaData) {
        var timeSinceLastAccess = Date.now() - metaData.lastAccess;
        var idleExpiryTime = metaData.expiresAfterIdle;
        if (idleExpiryTime === undefined) {
            idleExpiryTime = this.storagePropertiesService.getProperty('STORAGE_IDLE_EXPIRY');
        }
        return timeSinceLastAccess >= idleExpiryTime;
    };
    StorageManager.prototype.isStorageExpired.$inject = ["metaData"];
    /* @ngInject */ StorageManager.prototype.applyDisposeDecorator = function (storageId, storage) {
        var _this = this;
        var originalDispose = storage.dispose;
        storage.dispose = function () {
            return _this.deleteStorage(storageId).then(function () { return originalDispose(); });
        };
    };
    StorageManager.prototype.applyDisposeDecorator.$inject = ["storageId", "storage"];
    /* @ngInject */ StorageManager.prototype.getStorageController = function (storageType) {
        var controller = this.storageControllers[storageType];
        if (!controller) {
            throw /* @ngInject */ StorageManager_1.ERR_NO_STORAGE_TYPE_CONTROLLER(storageType);
        }
        return controller;
    };
    StorageManager.prototype.getStorageController.$inject = ["storageType"];
    /* @ngInject */ StorageManager.prototype.verifyMetaData = function (metadata, configuration) {
        if (metadata.storageVersion !== configuration.storageVersion) {
            this.logService.warn("StorageManager - Removing old storage version for storage " + metadata.storageId);
            return this.deleteStorage(metadata.storageId);
        }
        if (metadata.storageType !== configuration.storageType) {
            this.logService.warn("StorageManager - Detected a change in storage type for existing storage. Removing old storage with id " + configuration.storageId);
            return this.deleteStorage(metadata.storageId);
        }
        return Promise.resolve(true);
    };
    StorageManager.prototype.verifyMetaData.$inject = ["metadata", "configuration"];
    /* @ngInject */ StorageManager.prototype.setDefaultStorageOptions = function (options) {
        if (!options.storageVersion || options.storageVersion.length <= 0) {
            options.storageVersion = '0';
        }
    };
    StorageManager.prototype.setDefaultStorageOptions.$inject = ["options"];
    var /* @ngInject */ StorageManager_1;
    /* @ngInject */ StorageManager = /* @ngInject */ StorageManager_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.IStoragePropertiesService])
    ], /* @ngInject */ StorageManager);
    return /* @ngInject */ StorageManager;
}());

/**
 *
 * defaultStorageProperties are the default [IStorageProperties]{@link IStorageProperties} of the
 * storage system. These values should not be reference directly at build/compile time, but rather through the
 * angularJs provider that exposes them. See [IStoragePropertiesService]{@link IStoragePropertiesService}
 * for more details.
 *
 * ```
 * {
 *     STORAGE_IDLE_EXPIRY: 1000 * 60 * 60 * 24 * 30, // 30 days
 *     STORAGE_TYPE_LOCAL_STORAGE: "se.storage.type.localstorage",
 *     STORAGE_TYPE_SESSION_STORAGE: "se.storage.type.sessionstorage",
 *     STORAGE_TYPE_IN_MEMORY: "se.storage.type.inmemory",
 *     LOCAL_STORAGE_KEY_STORAGE_MANAGER_METADATA: "se.storage.storagemanager.metadata",
 *     LOCAL_STORAGE_ROOT_KEY: "se.storage.root",
 *     SESSION_STORAGE_ROOT_KEY: "se.storage.root"
 * }
 * ```
 */
/** @internal */
var defaultStorageProperties = {
    STORAGE_IDLE_EXPIRY: 1000 * 60 * 60 * 24 * 30,
    // STORAGE TYPES
    STORAGE_TYPE_LOCAL_STORAGE: 'se.storage.type.localstorage',
    STORAGE_TYPE_SESSION_STORAGE: 'se.storage.type.sessionstorage',
    STORAGE_TYPE_IN_MEMORY: 'se.storage.type.inmemory',
    // LOCAL STORAGE KEYS
    LOCAL_STORAGE_KEY_STORAGE_MANAGER_METADATA: 'se.storage.storagemanager.metadata',
    LOCAL_STORAGE_ROOT_KEY: 'se.storage.root',
    SESSION_STORAGE_ROOT_KEY: 'se.storage.root'
};

/**
 * The storagePropertiesService is a provider that implements the IStoragePropertiesService
 * interface and exposes the default storage properties. These properties are used to bootstrap various
 * pieces of the storage system.
 * By Means of StorageModule.configure() you would might change the default localStorage key names, or storage types.
 */
/** @internal */
var /* @ngInject */ StoragePropertiesService = /** @class */ (function () {
    StoragePropertiesService.$inject = ["storageProperties"];
    function /* @ngInject */ StoragePropertiesService(storageProperties) {
        var _this = this;
        this.properties = lo.cloneDeep(defaultStorageProperties);
        storageProperties.forEach(function (properties) {
            lo.merge(_this.properties, properties);
        });
    }
    /* @ngInject */ StoragePropertiesService.prototype.getProperty = function (propertyName) {
        return this.properties[propertyName];
    };
    StoragePropertiesService.prototype.getProperty.$inject = ["propertyName"];
    /* @ngInject */ StoragePropertiesService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IStoragePropertiesService),
        __param(0, core.Inject(smarteditcommons.STORAGE_PROPERTIES_TOKEN)),
        __metadata("design:paramtypes", [Array])
    ], /* @ngInject */ StoragePropertiesService);
    return /* @ngInject */ StoragePropertiesService;
}());

var StorageModule = /** @class */ (function () {
    function StorageModule() {
    }
    StorageModule_1 = StorageModule;
    StorageModule.forRoot = function (properties) {
        if (properties === void 0) { properties = {}; }
        return {
            ngModule: StorageModule_1,
            providers: [
                {
                    provide: smarteditcommons.STORAGE_PROPERTIES_TOKEN,
                    multi: true,
                    useValue: properties
                }
            ]
        };
    };
    var StorageModule_1;
    StorageModule = StorageModule_1 = __decorate([
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
                {
                    provide: smarteditcommons.IStoragePropertiesService,
                    useClass: StoragePropertiesService
                },
                {
                    provide: smarteditcommons.DO_NOT_USE_STORAGE_MANAGER_TOKEN,
                    useClass: StorageManager
                },
                {
                    provide: smarteditcommons.IStorageGateway,
                    useClass: StorageGateway
                },
                {
                    provide: smarteditcommons.IStorageManagerGateway,
                    useClass: StorageManagerGateway
                },
                {
                    provide: smarteditcommons.IStorageManagerFactory,
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (logService, doNotUseStorageManager) {
                        return new smarteditcommons.StorageManagerFactory(doNotUseStorageManager);
                    },
                    deps: [smarteditcommons.LogService, smarteditcommons.DO_NOT_USE_STORAGE_MANAGER_TOKEN]
                },
                {
                    provide: smarteditcommons.IStorageManager,
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    useFactory: function (storageManagerFactory) {
                        return storageManagerFactory.getStorageManager('se.nsp');
                    },
                    deps: [smarteditcommons.IStorageManagerFactory]
                },
                smarteditcommons.moduleUtils.initialize(function (storagePropertiesService, seStorageManager) {
                    seStorageManager.registerStorageController(new LocalStorageController(storagePropertiesService));
                    seStorageManager.registerStorageController(new SessionStorageController(storagePropertiesService));
                    seStorageManager.registerStorageController(new MemoryStorageController(storagePropertiesService));
                    smarteditcommons.diBridgeUtils.downgradeService('storageManagerFactory', smarteditcommons.IStorageManagerFactory);
                    smarteditcommons.diBridgeUtils.downgradeService('seStorageManager', smarteditcommons.IStorageManager);
                }, [smarteditcommons.IStoragePropertiesService, smarteditcommons.IStorageManager])
            ]
        })
    ], StorageModule);
    return StorageModule;
}());

/**
 * The name used to register the default rule.
 */
var DEFAULT_DEFAULT_RULE_NAME = 'se.permission.service.default.rule';
var /* @ngInject */ PermissionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PermissionService, _super);
    PermissionService.$inject = ["logService", "systemEventService", "crossFrameEventService"];
    function /* @ngInject */ PermissionService(logService, systemEventService, crossFrameEventService) {
        var _this = _super.call(this) || this;
        _this.logService = logService;
        _this.systemEventService = systemEventService;
        _this.crossFrameEventService = crossFrameEventService;
        _this._registerEventHandlers();
        return _this;
    }
    /* @ngInject */ PermissionService_1 = /* @ngInject */ PermissionService;
    /* @ngInject */ PermissionService.resetForTests = function () {
        /* @ngInject */ PermissionService_1.rules = [];
        /* @ngInject */ PermissionService_1.permissionsRegistry = [];
        /* @ngInject */ PermissionService_1.cachedResults = {};
    };
    /* @ngInject */ PermissionService.hasCacheRegion = function (ruleName) {
        return /* @ngInject */ PermissionService_1.cachedResults.hasOwnProperty(ruleName);
    };
    PermissionService.hasCacheRegion.$inject = ["ruleName"];
    /* @ngInject */ PermissionService.getCacheRegion = function (ruleName) {
        return /* @ngInject */ PermissionService_1.cachedResults[ruleName];
    };
    PermissionService.getCacheRegion.$inject = ["ruleName"];
    /* @ngInject */ PermissionService.prototype.getPermission = function (permissionName) {
        return /* @ngInject */ PermissionService_1.permissionsRegistry.find(function (permission) { return permission.aliases.indexOf(permissionName) > -1; });
    };
    PermissionService.prototype.getPermission.$inject = ["permissionName"];
    /* @ngInject */ PermissionService.prototype.unregisterDefaultRule = function () {
        var defaultRule = this._getRule(DEFAULT_DEFAULT_RULE_NAME);
        if (defaultRule) {
            /* @ngInject */ PermissionService_1.rules.splice(/* @ngInject */ PermissionService_1.rules.indexOf(defaultRule), 1);
        }
    };
    /* @ngInject */ PermissionService.prototype.registerPermission = function (permission) {
        this._validatePermission(permission);
        /* @ngInject */ PermissionService_1.permissionsRegistry.push({
            aliases: permission.aliases,
            rules: permission.rules
        });
    };
    PermissionService.prototype.registerPermission.$inject = ["permission"];
    /* @ngInject */ PermissionService.prototype.hasCachedResult = function (ruleName, key) {
        return (/* @ngInject */ PermissionService_1.hasCacheRegion(ruleName) &&
            /* @ngInject */ PermissionService_1.getCacheRegion(ruleName).hasOwnProperty(key));
    };
    PermissionService.prototype.hasCachedResult.$inject = ["ruleName", "key"];
    /* @ngInject */ PermissionService.prototype.clearCache = function () {
        /* @ngInject */ PermissionService_1.cachedResults = {};
        this.crossFrameEventService.publish(smarteditcommons.EVENTS.PERMISSION_CACHE_CLEANED);
    };
    /* @ngInject */ PermissionService.prototype.isPermitted = function (permissions) {
        var _this = this;
        var rulePermissionNames = this._mapRuleNameToPermissionNames(permissions);
        var rulePromises = this._getRulePromises(rulePermissionNames);
        var names = Object.keys(rulePromises);
        var promises = names.map(function (key) { return rulePromises[key]; });
        var onSuccess = function (permissionResults) {
            var result = names.reduce(function (acc, name, index) {
                acc[name] = permissionResults[index];
                return acc;
            }, {});
            _this._updateCache(rulePermissionNames, result);
            return true;
        };
        var onError = function (result) {
            if (result === false) {
                return result;
            }
            _this.logService.error(result);
            return result === undefined ? false : result;
        };
        return Promise.all(promises).then(onSuccess, onError);
    };
    PermissionService.prototype.isPermitted.$inject = ["permissions"];
    /**
     * This method adds a promise obtained by calling the pre-configured rule.verify function to the rulePromises
     * map if the result does not exist in the rule's cache. Otherwise, a promise that contains the cached result
     * is added.
     *
     * The promise obtained from the rule.verify function is chained to allow short-circuiting the permission
     * verification process. If a rule resolves with a false result or with an error, the chained promise is
     * rejected to stop the verification process without waiting for all other rules to resolve.
     *
     * @param rulePromises An object that maps rule names to promises.
     * @param rulePermissionNames An object that maps rule names to permission name arrays.
     * @param ruleName The name of the rule to verify.
     */
    /* @ngInject */ PermissionService.prototype._addRulePromise = function (rulePromises, rulePermissionNames, ruleName) {
        var rule = this._getRule(ruleName);
        var permissionNameObjs = rulePermissionNames[ruleName];
        var cacheKey = this._generateCacheKey(permissionNameObjs);
        var rulePromise;
        if (this.hasCachedResult(ruleName, cacheKey)) {
            rulePromise = Promise.resolve(this._getCachedResult(ruleName, cacheKey));
        }
        else {
            rulePromise = this._callRuleVerify(rule.names.join('-'), permissionNameObjs).then(function (isPermitted) {
                return isPermitted ? Promise.resolve(true) : Promise.reject(false);
            });
        }
        rulePromises[ruleName] = rulePromise;
    };
    PermissionService.prototype._addRulePromise.$inject = ["rulePromises", "rulePermissionNames", "ruleName"];
    /**
     * This method validates a permission name. Permission names need to be prefixed by at least one
     * namespace followed by a "." character to be valid.
     *
     * Example: se.mynamespace is valid.
     * Example: mynamespace is not valid.
     */
    /* @ngInject */ PermissionService.prototype._isPermissionNameValid = function (permissionName) {
        var checkNameSpace = /^[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-\.]+/;
        return checkNameSpace.test(permissionName);
    };
    PermissionService.prototype._isPermissionNameValid.$inject = ["permissionName"];
    /**
     * This method returns an object that maps rule names to promises.
     */
    /* @ngInject */ PermissionService.prototype._getRulePromises = function (rulePermissionNames) {
        var _this = this;
        var rulePromises = {};
        Object.keys(rulePermissionNames).forEach(function (ruleName) {
            _this._addRulePromise.call(_this, rulePromises, rulePermissionNames, ruleName);
        });
        return rulePromises;
    };
    PermissionService.prototype._getRulePromises.$inject = ["rulePermissionNames"];
    /**
     * This method returns true if a default rule is already registered.
     *
     * @returns true if the default rule has been registered, false otherwise.
     */
    /* @ngInject */ PermissionService.prototype._hasDefaultRule = function () {
        return !!this._getRule(DEFAULT_DEFAULT_RULE_NAME);
    };
    /**
     * This method returns the rule's cached result for the given key.
     *
     * @param ruleName The name of the rule for which to lookup the cached result.
     * @param key The cached key to lookup..
     *
     * @returns The cached result, if it exists, null otherwise.
     */
    /* @ngInject */ PermissionService.prototype._getCachedResult = function (ruleName, key) {
        return /* @ngInject */ PermissionService_1.hasCacheRegion(ruleName)
            ? /* @ngInject */ PermissionService_1.getCacheRegion(ruleName)[key]
            : null;
    };
    PermissionService.prototype._getCachedResult.$inject = ["ruleName", "key"];
    /**
     * This method generates a key to store a rule's result for a given combination of
     * permissions in its cache. It is done by sorting the list of permissions by name
     * and serializing it.
     *
     * @param permissions A list of permissions with a name and context.
     *
     * [{
     *     name: "permission.name"
     *     context: {
     *         key: "value"
     *     }
     * }]
     *
     * @returns The serialized sorted list of permissions.
     */
    /* @ngInject */ PermissionService.prototype._generateCacheKey = function (permissions) {
        return JSON.stringify(permissions.sort(function (permissionA, permissionB) {
            var nameA = permissionA.name;
            var nameB = permissionB.name;
            return nameA === nameB ? 0 : nameA < nameB ? -1 : 1;
        }));
    };
    PermissionService.prototype._generateCacheKey.$inject = ["permissions"];
    /**
     * This method goes through the permission name arrays associated to rule names to remove any duplicate
     * permission names.
     *
     * If one or more permission names with the same context are found in a rule name's permission name array,
     * only one entry is kept.
     */
    /* @ngInject */ PermissionService.prototype._removeDuplicatePermissionNames = function (rulePermissionNames) {
        Object.keys(rulePermissionNames).forEach(function (ruleName) {
            rulePermissionNames[ruleName] = rulePermissionNames[ruleName].filter(function (currentPermission) {
                var existingPermission = rulePermissionNames[ruleName].find(function (permission) { return permission.name === currentPermission.name; });
                if (existingPermission === currentPermission) {
                    return true;
                }
                else {
                    var existingPermissionContext = existingPermission.context;
                    var currentPermissionContext = currentPermission.context;
                    return (JSON.stringify(existingPermissionContext) !==
                        JSON.stringify(currentPermissionContext));
                }
            });
        });
    };
    PermissionService.prototype._removeDuplicatePermissionNames.$inject = ["rulePermissionNames"];
    /**
     * This method returns an object mapping rule name to permission name arrays.
     *
     * It will iterate through the given permission name object array to extract the permission names and contexts,
     * populate the map and clean it up by removing duplicate permission name and context pairs.
     */
    /* @ngInject */ PermissionService.prototype._mapRuleNameToPermissionNames = function (permissions) {
        var _this = this;
        var rulePermissionNames = {};
        permissions.forEach(function (permission) {
            if (!permission.names) {
                throw Error('Requested Permission requires at least one name');
            }
            var permissionNames = permission.names;
            var permissionContext = permission.context;
            permissionNames.forEach(function (permissionName) {
                _this._populateRulePermissionNames(rulePermissionNames, permissionName, permissionContext);
            });
        });
        this._removeDuplicatePermissionNames(rulePermissionNames);
        return rulePermissionNames;
    };
    PermissionService.prototype._mapRuleNameToPermissionNames.$inject = ["permissions"];
    /**
     * This method will populate rulePermissionNames with the rules associated to the permission with the given
     * permissionName.
     *
     * If no permission is registered with the given permissionName and a default rule is registered, the default
     * rule is added to rulePermissionNames.
     *
     * If no permission is registered with the given permissionName and no default rule is registered, an error
     * is thrown.
     */
    /* @ngInject */ PermissionService.prototype._populateRulePermissionNames = function (rulePermissionNames, permissionName, permissionContext) {
        var _this = this;
        var permission = this.getPermission(permissionName);
        var permissionHasRules = !!permission && !!permission.rules && permission.rules.length > 0;
        if (permissionHasRules) {
            permission.rules.forEach(function (ruleName) {
                _this._addPermissionName(rulePermissionNames, ruleName, permissionName, permissionContext);
            });
        }
        else if (this._hasDefaultRule()) {
            this._addPermissionName(rulePermissionNames, DEFAULT_DEFAULT_RULE_NAME, permissionName, permissionContext);
        }
        else {
            throw Error('Permission has no rules');
        }
    };
    PermissionService.prototype._populateRulePermissionNames.$inject = ["rulePermissionNames", "permissionName", "permissionContext"];
    /**
     * This method will add an object with the permissionName and permissionContext to rulePermissionNames.
     *
     * Since rules can have multiple names, the map will use the first name in the rule's name list as its key.
     * This way, each rule will be called only once for every permission name and context.
     *
     * If the rule associated to a given rule name is already in rulePermissionNames, the permission will be
     * appended to the associated array. Otherwise, the rule name is added to the map and its permission name array
     * is created.
     */
    /* @ngInject */ PermissionService.prototype._addPermissionName = function (rulePermissionNames, ruleName, permissionName, permissionContext) {
        var rule = this._getRule(ruleName);
        if (!rule) {
            throw Error('Permission found but no rule found named: ' + ruleName);
        }
        ruleName = rule.names[0];
        if (!rulePermissionNames.hasOwnProperty(ruleName)) {
            rulePermissionNames[ruleName] = [];
        }
        rulePermissionNames[ruleName].push({
            name: permissionName,
            context: permissionContext
        });
    };
    PermissionService.prototype._addPermissionName.$inject = ["rulePermissionNames", "ruleName", "permissionName", "permissionContext"];
    /**
     * This method returns the rule registered with the given name.
     *
     * @param ruleName The name of the rule to lookup.
     *
     * @returns rule The rule with the given name, undefined otherwise.
     */
    /* @ngInject */ PermissionService.prototype._getRule = function (ruleName) {
        return /* @ngInject */ PermissionService_1.rules.find(function (rule) { return rule.names.indexOf(ruleName) > -1; });
    };
    PermissionService.prototype._getRule.$inject = ["ruleName"];
    /* @ngInject */ PermissionService.prototype._validationRule = function (ruleConfiguration) {
        var _this = this;
        ruleConfiguration.names.forEach(function (ruleName) {
            if (_this._getRule(ruleName)) {
                throw Error('Rule already exists: ' + ruleName);
            }
        });
    };
    PermissionService.prototype._validationRule.$inject = ["ruleConfiguration"];
    /* @ngInject */ PermissionService.prototype._validatePermission = function (permissionConfiguration) {
        var _this = this;
        if (!(permissionConfiguration.aliases instanceof Array)) {
            throw Error('Permission aliases must be an array');
        }
        if (permissionConfiguration.aliases.length < 1) {
            throw Error('Permission requires at least one alias');
        }
        if (!(permissionConfiguration.rules instanceof Array)) {
            throw Error('Permission rules must be an array');
        }
        if (permissionConfiguration.rules.length < 1) {
            throw Error('Permission requires at least one rule');
        }
        permissionConfiguration.aliases.forEach(function (permissionName) {
            if (_this.getPermission(permissionName)) {
                throw Error('Permission already exists: ' + permissionName);
            }
            if (!_this._isPermissionNameValid(permissionName)) {
                throw Error('Permission aliases must be prefixed with namespace and a full stop');
            }
        });
        permissionConfiguration.rules.forEach(function (ruleName) {
            if (!_this._getRule(ruleName)) {
                throw Error('Permission found but no rule found named: ' + ruleName);
            }
        });
    };
    PermissionService.prototype._validatePermission.$inject = ["permissionConfiguration"];
    /* @ngInject */ PermissionService.prototype._updateCache = function (rulePermissionNames, permissionResults) {
        var _this = this;
        Object.keys(permissionResults).forEach(function (ruleName) {
            var cacheKey = _this._generateCacheKey(rulePermissionNames[ruleName]);
            var cacheValue = permissionResults[ruleName];
            _this._addCachedResult(ruleName, cacheKey, cacheValue);
        });
    };
    PermissionService.prototype._updateCache.$inject = ["rulePermissionNames", "permissionResults"];
    /* @ngInject */ PermissionService.prototype._addCachedResult = function (ruleName, key, result) {
        if (!/* @ngInject */ PermissionService_1.hasCacheRegion(ruleName)) {
            /* @ngInject */ PermissionService_1.cachedResults[ruleName] = {};
        }
        /* @ngInject */ PermissionService_1.cachedResults[ruleName][key] = result;
    };
    PermissionService.prototype._addCachedResult.$inject = ["ruleName", "key", "result"];
    /* @ngInject */ PermissionService.prototype._registerRule = function (ruleConfiguration) {
        this._validationRule(ruleConfiguration);
        if (ruleConfiguration.names &&
            ruleConfiguration.names.length &&
            ruleConfiguration.names.indexOf(DEFAULT_DEFAULT_RULE_NAME) > -1) {
            throw Error('Register default rule using permissionService.registerDefaultRule()');
        }
        /* @ngInject */ PermissionService_1.rules.push({
            names: ruleConfiguration.names
        });
    };
    PermissionService.prototype._registerRule.$inject = ["ruleConfiguration"];
    /* @ngInject */ PermissionService.prototype._registerDefaultRule = function (ruleConfiguration) {
        this._validationRule(ruleConfiguration);
        if (ruleConfiguration.names &&
            ruleConfiguration.names.length &&
            ruleConfiguration.names.indexOf(DEFAULT_DEFAULT_RULE_NAME) === -1) {
            throw Error('Default rule name must be DEFAULT_RULE_NAME');
        }
        /* @ngInject */ PermissionService_1.rules.push({
            names: ruleConfiguration.names
        });
    };
    PermissionService.prototype._registerDefaultRule.$inject = ["ruleConfiguration"];
    /* @ngInject */ PermissionService.prototype._callRuleVerify = function (ruleKey, permissionNameObjs) {
        if (this.ruleVerifyFunctions && this.ruleVerifyFunctions[ruleKey]) {
            return this.ruleVerifyFunctions[ruleKey].verify(permissionNameObjs);
        }
        // ask inner application for verify function.
        return this._remoteCallRuleVerify(ruleKey, permissionNameObjs);
    };
    PermissionService.prototype._callRuleVerify.$inject = ["ruleKey", "permissionNameObjs"];
    /* @ngInject */ PermissionService.prototype._registerEventHandlers = function () {
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.USER_HAS_CHANGED, this.clearCache.bind(this));
        this.systemEventService.subscribe(smarteditcommons.EVENTS.EXPERIENCE_UPDATE, this.clearCache.bind(this));
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, this.clearCache.bind(this));
        this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_CHANGED, this.clearCache.bind(this));
    };
    /* @ngInject */ PermissionService.prototype._remoteCallRuleVerify = function (name, permissionNameObjs) {
        'proxyFunction';
        return null;
    };
    PermissionService.prototype._remoteCallRuleVerify.$inject = ["name", "permissionNameObjs"];
    var /* @ngInject */ PermissionService_1;
    /* @ngInject */ PermissionService.rules = [];
    /* @ngInject */ PermissionService.permissionsRegistry = [];
    /* @ngInject */ PermissionService.cachedResults = {};
    /* @ngInject */ PermissionService = /* @ngInject */ PermissionService_1 = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IPermissionService),
        smarteditcommons.GatewayProxied('isPermitted', 'clearCache', 'registerPermission', 'unregisterDefaultRule', 'registerDefaultRule', 'registerRule', '_registerRule', '_remoteCallRuleVerify', '_registerDefaultRule'),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            smarteditcommons.SystemEventService,
            smarteditcommons.CrossFrameEventService])
    ], /* @ngInject */ PermissionService);
    return /* @ngInject */ PermissionService;
}(smarteditcommons.IPermissionService));

/**
 * The catalog version permission service is used to check if the current user has been granted certain permissions
 * on a given catalog ID and catalog Version.
 */
var /* @ngInject */ CatalogVersionPermissionRestService = /** @class */ (function () {
    CatalogVersionPermissionRestService.$inject = ["restServiceFactory", "sessionService"];
    function /* @ngInject */ CatalogVersionPermissionRestService(restServiceFactory, sessionService) {
        this.restServiceFactory = restServiceFactory;
        this.sessionService = sessionService;
        this.URI = '/permissionswebservices/v1/permissions/catalogs/search';
    }
    /**
     * This method returns permissions from the Catalog Version Permissions Service API.
     *
     * Sample Request:
     * POST /permissionswebservices/v1/permissions/catalogs/search?catalogId=apparel-deContentCatalog&catalogVersion=Online
     *
     * Sample Response from API:
     * {
     * "permissionsList": [
     *     {
     *       "catalogId": "apparel-deContentCatalog",
     *       "catalogVersion": "Online",
     *       "permissions": [
     *         {
     *           "key": "read",
     *           "value": "true"
     *         },
     *         {
     *           "key": "write",
     *           "value": "false"
     *         }
     *       ],
     *      "syncPermissions": [
     *        {
     *          "canSynchronize": "true",
     *          "targetCatalogVersion": "Online"
     *        }
     *     }
     *    ]
     * }
     *
     * Sample Response returned by the service:
     * {
     *   "catalogId": "apparel-deContentCatalog",
     *   "catalogVersion": "Online",
     *   "permissions": [
     *      {
     *        "key": "read",
     *        "value": "true"
     *      },
     *      {
     *        "key": "write",
     *        "value": "false"
     *      }
     *     ],
     *    "syncPermissions": [
     *      {
     *        "canSynchronize": "true",
     *        "targetCatalogVersion": "Online"
     *      }
     *    ]
     *  }
     *
     * @param catalogId The Catalog ID
     * @param catalogVersion The Catalog Version name
     *
     * @returns A Promise which returns an object exposing a permissions array containing the catalog version permissions
     */
    /* @ngInject */ CatalogVersionPermissionRestService.prototype.getCatalogVersionPermissions = function (catalogId, catalogVersion) {
        var _this = this;
        this.validateParams(catalogId, catalogVersion);
        return this.sessionService.getCurrentUsername().then(function (principal) {
            var restService = _this.restServiceFactory.get(_this.URI);
            return restService
                .queryByPost({ principalUid: principal }, { catalogId: catalogId, catalogVersion: catalogVersion })
                .then(function (_a) {
                var permissionsList = _a.permissionsList;
                return permissionsList[0] || {};
            });
        });
    };
    CatalogVersionPermissionRestService.prototype.getCatalogVersionPermissions.$inject = ["catalogId", "catalogVersion"];
    // TODO: When everything has been migrated to typescript it is sufficient enough to remove this validation.
    /* @ngInject */ CatalogVersionPermissionRestService.prototype.validateParams = function (catalogId, catalogVersion) {
        if (!catalogId) {
            throw new Error('catalog.version.permission.service.catalogid.is.required');
        }
        if (!catalogVersion) {
            throw new Error('catalog.version.permission.service.catalogversion.is.required');
        }
    };
    CatalogVersionPermissionRestService.prototype.validateParams.$inject = ["catalogId", "catalogVersion"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ CatalogVersionPermissionRestService.prototype, "getCatalogVersionPermissions", null);
    /* @ngInject */ CatalogVersionPermissionRestService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory,
            smarteditcommons.ISessionService])
    ], /* @ngInject */ CatalogVersionPermissionRestService);
    return /* @ngInject */ CatalogVersionPermissionRestService;
}());

window.__smartedit__.addDecoratorPayload("Component", "HeartBeatAlertComponent", {
    selector: 'se-heartbeat-alert',
    template: "<div><span>{{ 'se.heartbeat.failure1' | translate }}</span> <span><a (click)=\"switchToPreviewMode()\">{{ 'se.heartbeat.failure2' | translate }}</a></span></div>"
});
var HeartBeatAlertComponent = /** @class */ (function () {
    function HeartBeatAlertComponent(alertRef, perspectiveService, crossFrameEventService) {
        this.alertRef = alertRef;
        this.perspectiveService = perspectiveService;
        this.crossFrameEventService = crossFrameEventService;
    }
    HeartBeatAlertComponent.prototype.switchToPreviewMode = function () {
        this.alertRef.dismiss();
        this.perspectiveService.switchTo(smarteditcommons.NONE_PERSPECTIVE);
        this.crossFrameEventService.publish(smarteditcommons.EVENT_STRICT_PREVIEW_MODE_REQUESTED, true);
    };
    HeartBeatAlertComponent = __decorate([
        core.Component({
            selector: 'se-heartbeat-alert',
            template: "<div><span>{{ 'se.heartbeat.failure1' | translate }}</span> <span><a (click)=\"switchToPreviewMode()\">{{ 'se.heartbeat.failure2' | translate }}</a></span></div>"
        }),
        __param(2, core.Inject(smarteditcommons.EVENT_SERVICE)),
        __metadata("design:paramtypes", [core$2.AlertRef,
            smarteditcommons.IPerspectiveService,
            smarteditcommons.CrossFrameEventService])
    ], HeartBeatAlertComponent);
    return HeartBeatAlertComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "AlertTemplateComponent", {
    selector: 'fundamental-alert-template',
    template: "\n        <div\n            *ngIf=\"data.templateUrl\"\n            [ngInclude]=\"data.templateUrl\"\n            [compileHtmlNgController]=\"data.controller\"\n            [scope]=\"data\"\n        ></div>\n        <div\n            *ngIf=\"data.template\"\n            [seCompileHtml]=\"data.template\"\n            [compileHtmlNgController]=\"data.controller\"\n            [scope]=\"data\"\n        ></div>\n    "
});
var AlertTemplateComponent = /** @class */ (function () {
    function AlertTemplateComponent(ref) {
        this.data = ref.data;
    }
    AlertTemplateComponent = __decorate([
        core.Component({
            selector: 'fundamental-alert-template',
            template: "\n        <div\n            *ngIf=\"data.templateUrl\"\n            [ngInclude]=\"data.templateUrl\"\n            [compileHtmlNgController]=\"data.controller\"\n            [scope]=\"data\"\n        ></div>\n        <div\n            *ngIf=\"data.template\"\n            [seCompileHtml]=\"data.template\"\n            [compileHtmlNgController]=\"data.controller\"\n            [scope]=\"data\"\n        ></div>\n    "
        }),
        __metadata("design:paramtypes", [core$2.AlertRef])
    ], AlertTemplateComponent);
    return AlertTemplateComponent;
}());

var /* @ngInject */ AlertFactory = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AlertFactory, _super);
    AlertFactory.$inject = ["logService", "domSanitizer", "fundamentalAlertService", "translateService", "ALERT_CONFIG_DEFAULTS"];
    function /* @ngInject */ AlertFactory(logService, domSanitizer, fundamentalAlertService, translateService, ALERT_CONFIG_DEFAULTS) {
        var _this = _super.call(this, fundamentalAlertService, translateService, ALERT_CONFIG_DEFAULTS) || this;
        _this.logService = logService;
        _this.domSanitizer = domSanitizer;
        return _this;
    }
    /* @ngInject */ AlertFactory.prototype.createAlert = function (alertConf) {
        alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
        return _super.prototype.createAlert.call(this, alertConf);
    };
    AlertFactory.prototype.createAlert.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.createInfo = function (alertConf) {
        alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
        alertConf.type = smarteditcommons.IAlertServiceType.INFO;
        return _super.prototype.createInfo.call(this, alertConf);
    };
    AlertFactory.prototype.createInfo.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.createDanger = function (alertConf) {
        alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
        alertConf.type = smarteditcommons.IAlertServiceType.DANGER;
        return _super.prototype.createDanger.call(this, alertConf);
    };
    AlertFactory.prototype.createDanger.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.createWarning = function (alertConf) {
        alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
        alertConf.type = smarteditcommons.IAlertServiceType.WARNING;
        return _super.prototype.createWarning.call(this, alertConf);
    };
    AlertFactory.prototype.createWarning.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.createSuccess = function (alertConf) {
        alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
        alertConf.type = smarteditcommons.IAlertServiceType.SUCCESS;
        return _super.prototype.createSuccess.call(this, alertConf);
    };
    AlertFactory.prototype.createSuccess.$inject = ["alertConf"];
    /**
     * Accepts message string or config object
     * Will convert a str param to { message: str }
     */
    /* @ngInject */ AlertFactory.prototype.getAlertConfigFromStringOrConfig = function (strOrConf) {
        if (typeof strOrConf === 'string') {
            return {
                message: strOrConf
            };
        }
        var config = strOrConf;
        if (this.isFundamentalAlertConfig(config)) {
            return __assign({}, config);
        }
        return this.validateAndGetAlertConfigFromLegacyConfig(config);
    };
    AlertFactory.prototype.getAlertConfigFromStringOrConfig.$inject = ["strOrConf"];
    /* @ngInject */ AlertFactory.prototype.isFundamentalAlertConfig = function (config) {
        var legacyConfig = {
            template: undefined,
            templateUrl: undefined,
            closeable: undefined,
            timeout: undefined,
            successful: undefined
        };
        var hasInvalidKey = Object.keys(config).some(function (key) {
            return legacyConfig.hasOwnProperty(key);
        });
        return !hasInvalidKey;
    };
    AlertFactory.prototype.isFundamentalAlertConfig.$inject = ["config"];
    /* @ngInject */ AlertFactory.prototype.validateAndGetAlertConfigFromLegacyConfig = function (alertConf) {
        this.validateLegacyAlertConfig(alertConf);
        this.sanitizeTemplates(alertConf);
        return this.getAlertConfigFromLegacyConfig(alertConf);
    };
    AlertFactory.prototype.validateAndGetAlertConfigFromLegacyConfig.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.getAlertConfigFromLegacyConfig = function (alertConf) {
        var config = {
            message: alertConf.message,
            messagePlaceholders: alertConf.messagePlaceholders,
            dismissible: alertConf.closeable,
            type: alertConf.type,
            id: alertConf.id,
            duration: alertConf.timeout
        };
        if (alertConf.template || alertConf.templateUrl) {
            config.component = AlertTemplateComponent;
            config.data = {
                template: alertConf.template,
                templateUrl: alertConf.templateUrl
            };
            if (alertConf.controller) {
                config.data.controller = {
                    alias: '$alertInjectedCtrl',
                    value: alertConf.controller
                };
            }
        }
        return config;
    };
    AlertFactory.prototype.getAlertConfigFromLegacyConfig.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.validateLegacyAlertConfig = function (alertConf) {
        this.fixLegacyAlert(alertConf);
        if (!alertConf.message && !alertConf.template && !alertConf.templateUrl) {
            this.logService.warn('alertService._validateAlertConfig - alert must contain at least a message, template, or templateUrl property', alertConf);
        }
        if (alertConf.messagePlaceholders && !lo.isObject(alertConf.messagePlaceholders)) {
            throw new Error('alertService._validateAlertConfig - property messagePlaceholders should be an object');
        }
        if ((alertConf.message && (alertConf.template || alertConf.templateUrl)) ||
            (alertConf.template && (alertConf.message || alertConf.templateUrl)) ||
            (alertConf.templateUrl && (alertConf.message || alertConf.template))) {
            throw new Error('alertService._validateAlertConfig - only one template type is allowed for the alert: message, template, or templateUrl');
        }
    };
    AlertFactory.prototype.validateLegacyAlertConfig.$inject = ["alertConf"];
    /* @ngInject */ AlertFactory.prototype.sanitizeTemplates = function (alertConf) {
        if (alertConf.message) {
            alertConf.message = this.domSanitizer.sanitize(core.SecurityContext.HTML, alertConf.message);
        }
    };
    AlertFactory.prototype.sanitizeTemplates.$inject = ["alertConf"];
    /**
     * @deprecated
     * Deprecated since 1905
     */
    /* @ngInject */ AlertFactory.prototype.fixLegacyAlert = function (legacyAlertConf) {
        if (legacyAlertConf.successful) {
            if (legacyAlertConf.type) {
                this.logService.warn('alertService validation warning: alert contains both legacy successful ' +
                    'property and an alert type for alert: ', legacyAlertConf);
            }
            else {
                if (typeof legacyAlertConf.successful !== 'boolean') {
                    this.logService.warn('alertService validation warning: legacyAlertConf.successful not a boolean value for alert: ', legacyAlertConf);
                }
                legacyAlertConf.type = legacyAlertConf.successful
                    ? smarteditcommons.IAlertServiceType.SUCCESS
                    : smarteditcommons.IAlertServiceType.DANGER;
            }
            delete legacyAlertConf.successful;
        }
    };
    AlertFactory.prototype.fixLegacyAlert.$inject = ["legacyAlertConf"];
    /* @ngInject */ AlertFactory = __decorate([
        smarteditcommons.SeDowngradeService(),
        core.Injectable(),
        __param(2, core.Inject(smarteditcommons.ALERT_SERVICE_TOKEN)),
        __param(4, core.Inject(smarteditcommons.ALERT_CONFIG_DEFAULTS_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            platformBrowser.DomSanitizer,
            core$2.AlertService,
            core$1.TranslateService,
            core$2.AlertConfig])
    ], /* @ngInject */ AlertFactory);
    return /* @ngInject */ AlertFactory;
}(smarteditcommons.BaseAlertFactory));

var /* @ngInject */ AlertService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ AlertService, _super);
    AlertService.$inject = ["_alertFactory"];
    function /* @ngInject */ AlertService(_alertFactory) {
        var _this = _super.call(this, _alertFactory) || this;
        _this._alertFactory = _alertFactory;
        return _this;
    }
    /* @ngInject */ AlertService.prototype.showAlert = function (alertConf) {
        alertConf = this._alertFactory.getAlertConfigFromStringOrConfig(alertConf);
        _super.prototype.showAlert.call(this, alertConf);
    };
    AlertService.prototype.showAlert.$inject = ["alertConf"];
    /* @ngInject */ AlertService.prototype.showInfo = function (alertConf) {
        alertConf = this._alertFactory.getAlertConfigFromStringOrConfig(alertConf);
        _super.prototype.showInfo.call(this, alertConf);
    };
    AlertService.prototype.showInfo.$inject = ["alertConf"];
    /* @ngInject */ AlertService.prototype.showDanger = function (alertConf) {
        alertConf = this._alertFactory.getAlertConfigFromStringOrConfig(alertConf);
        _super.prototype.showDanger.call(this, alertConf);
    };
    AlertService.prototype.showDanger.$inject = ["alertConf"];
    /* @ngInject */ AlertService.prototype.showWarning = function (alertConf) {
        alertConf = this._alertFactory.getAlertConfigFromStringOrConfig(alertConf);
        _super.prototype.showWarning.call(this, alertConf);
    };
    AlertService.prototype.showWarning.$inject = ["alertConf"];
    /* @ngInject */ AlertService.prototype.showSuccess = function (alertConf) {
        alertConf = this._alertFactory.getAlertConfigFromStringOrConfig(alertConf);
        _super.prototype.showSuccess.call(this, alertConf);
    };
    AlertService.prototype.showSuccess.$inject = ["alertConf"];
    /* @ngInject */ AlertService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IAlertService),
        smarteditcommons.GatewayProxied(),
        core.Injectable(),
        __metadata("design:paramtypes", [AlertFactory])
    ], /* @ngInject */ AlertService);
    return /* @ngInject */ AlertService;
}(smarteditcommons.BaseAlertService));

var AlertServiceModule = /** @class */ (function () {
    function AlertServiceModule() {
    }
    AlertServiceModule = __decorate([
        core.NgModule({
            imports: [
                core$2.AlertModule,
                common.CommonModule,
                smarteditcommons.CompileHtmlModule,
                smarteditcommons.SharedComponentsModule,
                smarteditcommons.AlertServiceProvidersModule.forRoot(smarteditcommons.IAlertService, AlertService),
                /**
                 * FIXME: TEMPORARY WORKAROUND. Remove it after it is fixed in @fundamental-ngx
                 *
                 * In @fundamental-ngx: 1.12.0, AlertModule is missing "DynamicComponentService" provider
                 * which is a dependency of AlertService.
                 * Import ModalModule because it provides the "DynamicComponentService".
                 */
                core$2.ModalModule
            ],
            declarations: [AlertTemplateComponent],
            entryComponents: [AlertTemplateComponent],
            providers: [
                AlertFactory,
                {
                    provide: smarteditcommons.ALERT_SERVICE_TOKEN,
                    useClass: core$2.AlertService
                },
                {
                    provide: smarteditcommons.ALERT_CONFIG_DEFAULTS_TOKEN,
                    useValue: smarteditcommons.ALERT_CONFIG_DEFAULTS
                }
            ]
        })
    ], AlertServiceModule);
    return AlertServiceModule;
}());

/* @internal */
var /* @ngInject */ HeartBeatService = /** @class */ (function () {
    HeartBeatService.$inject = ["HEART_BEAT_TIMEOUT_THRESHOLD_MS", "translate", "routingService", "windowUtils", "alertFactory", "crossFrameEventService", "gatewayFactory", "sharedDataService"];
    function /* @ngInject */ HeartBeatService(HEART_BEAT_TIMEOUT_THRESHOLD_MS, translate, routingService, windowUtils, alertFactory, crossFrameEventService, gatewayFactory, sharedDataService) {
        var _this = this;
        this.HEART_BEAT_TIMEOUT_THRESHOLD_MS = HEART_BEAT_TIMEOUT_THRESHOLD_MS;
        this.routingService = routingService;
        this.windowUtils = windowUtils;
        this.crossFrameEventService = crossFrameEventService;
        this.sharedDataService = sharedDataService;
        this.reconnectingInProgress = false;
        /**
         * @internal
         * Hide all alerts and cancel all pending actions and timers.
         */
        this.resetAndStop = function () {
            _this.reconnectingInProgress = false;
            if (_this.cancellableTimeoutTimer) {
                clearTimeout(_this.cancellableTimeoutTimer);
                _this.cancellableTimeoutTimer = null;
            }
            _this.reconnectingAlert.hide();
            _this.reconnectedAlert.hide();
        };
        /**
         * Connection to iframe has been lost, show reconnected alert to user
         */
        this.connectionLost = function () {
            _this.resetAndStop();
            if (!!_this.windowUtils.getGatewayTargetFrame()) {
                _this.reconnectingAlert.show();
            }
            _this.reconnectingInProgress = true;
        };
        this.reconnectingAlert = alertFactory.createInfo({
            component: HeartBeatAlertComponent,
            duration: -1,
            dismissible: false
        });
        this.reconnectedAlert = alertFactory.createInfo({
            message: translate.instant('se.heartbeat.reconnection'),
            timeout: 3000
        });
        var heartBeatGateway = gatewayFactory.createGateway(/* @ngInject */ HeartBeatService_1.HEART_BEAT_GATEWAY_ID);
        heartBeatGateway.subscribe(/* @ngInject */ HeartBeatService_1.HEART_BEAT_MSG_ID, function () {
            return _this.heartBeatReceived();
        });
        this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function () {
            _this.resetAndStop();
            // assume every page is smarteditable ¯\_(ツ)_/¯
            return _this.heartBeatReceived();
        });
        this.routingService.routeChangeSuccess().subscribe(function (event) {
            var url = _this.routingService.getCurrentUrlFromEvent(event);
            if (url === "/" + smarteditcommons.NG_ROUTE_PREFIX + smarteditcommons.STORE_FRONT_CONTEXT) {
                return _this.heartBeatReceived();
            }
            return Promise.resolve();
        });
        this.routingService.routeChangeStart().subscribe(function () {
            _this.resetAndStop();
        });
    }
    /* @ngInject */ HeartBeatService_1 = /* @ngInject */ HeartBeatService;
    /**
     * @internal
     * Heartbeat received from iframe, show reconnected if connection was previously
     * lost, and restart the timer to wait for iframe heartbeat
     */
    /* @ngInject */ HeartBeatService.prototype.heartBeatReceived = function () {
        var _this = this;
        var reconnecting = this.reconnectingInProgress;
        this.resetAndStop();
        if (reconnecting) {
            if (!!this.windowUtils.getGatewayTargetFrame()) {
                this.reconnectedAlert.show();
            }
            this.reconnectingInProgress = false;
            // Publish an event to enable the perspective selector in case if it is disabled
            this.crossFrameEventService.publish(smarteditcommons.EVENT_STRICT_PREVIEW_MODE_REQUESTED, false);
        }
        return this.sharedDataService
            .get('configuration')
            .then(function (_a) {
            var heartBeatTimeoutThreshold = _a.heartBeatTimeoutThreshold;
            if (!heartBeatTimeoutThreshold) {
                heartBeatTimeoutThreshold = _this.HEART_BEAT_TIMEOUT_THRESHOLD_MS;
            }
            _this.cancellableTimeoutTimer = _this.windowUtils.runTimeoutOutsideAngular(_this.connectionLost, +heartBeatTimeoutThreshold);
        });
    };
    var /* @ngInject */ HeartBeatService_1;
    /* @ngInject */ HeartBeatService.HEART_BEAT_GATEWAY_ID = 'heartBeatGateway';
    /* @ngInject */ HeartBeatService.HEART_BEAT_MSG_ID = 'heartBeat';
    /* @ngInject */ HeartBeatService = /* @ngInject */ HeartBeatService_1 = __decorate([
        smarteditcommons.SeDowngradeService(),
        __param(0, core.Inject(smarteditcommons.HEART_BEAT_TIMEOUT_THRESHOLD_MS_TOKEN)),
        __metadata("design:paramtypes", [Number, core$1.TranslateService,
            smarteditcommons.SmarteditRoutingService,
            smarteditcommons.WindowUtils,
            AlertFactory,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.GatewayFactory,
            smarteditcommons.ISharedDataService])
    ], /* @ngInject */ HeartBeatService);
    return /* @ngInject */ HeartBeatService;
}());

/** @internal */
var /* @ngInject */ ConfigurationService = /** @class */ (function () {
    ConfigurationService.$inject = ["logService", "loadConfigManagerService", "restServiceFactory"];
    function /* @ngInject */ ConfigurationService(logService, loadConfigManagerService, restServiceFactory) {
        this.logService = logService;
        this.loadConfigManagerService = loadConfigManagerService;
        this.restServiceFactory = restServiceFactory;
        // Constants
        this.ABSOLUTE_URI_NOT_APPROVED = 'URI_EXCEPTION';
        this.ABSOLUTE_URI_REGEX = /(\"[A-Za-z]+:\/|\/\/)/;
        this.configuration = [];
        this.editorCRUDService = this.restServiceFactory.get(smarteditcommons.CONFIGURATION_URI, 'key');
    }
    /*
     * The Add Entry method adds an entry to the list of configurations.
     *
     */
    /* @ngInject */ ConfigurationService.prototype.addEntry = function () {
        var item = { key: '', value: '', isNew: true, uuid: lo.uniqueId() };
        this.configuration = __spreadArrays([item], (this.configuration || []));
    };
    /*
     * The Remove Entry method deletes the specified entry from the list of configurations. The method does not delete the actual configuration, but just removes it from the array of configurations.
     * The entry will be deleted when a user clicks the Submit button but if the entry is new we can are removing it from the configuration
     *
     * @param {Object} entry The object to be deleted
     * @param {Object} configurationForm The form object which is an instance of {@link https://docs.angularjs.org/api/ng/type/form.FormController FormController}
     * that provides methods to monitor and control the state of the form.
     */
    /* @ngInject */ ConfigurationService.prototype.removeEntry = function (entry, configurationForm) {
        if (entry.isNew) {
            this.configuration = this.configuration.filter(function (confEntry) { return !confEntry.isNew || confEntry.key !== entry.key; });
        }
        else {
            configurationForm.form.markAsDirty();
            entry.toDelete = true;
        }
    };
    ConfigurationService.prototype.removeEntry.$inject = ["entry", "configurationForm"];
    /*
     * Method that returns a list of configurations by filtering out only those configurations whose 'toDelete' parameter is set to false.
     *
     * @returns {Object} A list of filtered configurations.
     */
    /* @ngInject */ ConfigurationService.prototype.filterConfiguration = function () {
        return (this.configuration || []).filter(function (instance) { return !instance.toDelete; });
    };
    /* @ngInject */ ConfigurationService.prototype.validateUserInput = function (entry) {
        if (!entry.value) {
            return;
        }
        entry.requiresUserCheck = !!entry.value.match(this.ABSOLUTE_URI_REGEX);
    };
    ConfigurationService.prototype.validateUserInput.$inject = ["entry"];
    /*
     * The Submit method saves the list of available configurations by making a REST call to a web service.
     * The method is called when a user clicks the Submit button in the configuration editor.
     *
     * @param {Object} configurationForm The form object that is an instance of {@link https://docs.angularjs.org/api/ng/type/form.FormController FormController}.
     * It provides methods to monitor and control the state of the form.
     */
    /* @ngInject */ ConfigurationService.prototype.submit = function (configurationForm) {
        var _this = this;
        if (!configurationForm.dirty || !this.isValid(configurationForm)) {
            return Promise.reject([]);
        }
        configurationForm.form.markAsPristine();
        return Promise.all(this.configuration.map(function (entry, i) {
            try {
                var payload = smarteditcommons.objectUtils.copy(entry);
                delete payload.toDelete;
                delete payload.errors;
                delete payload.uuid;
                var method = entry.toDelete === true
                    ? 'remove'
                    : payload.isNew === true
                        ? 'save'
                        : 'update';
                payload.secured = false; // needed for yaas configuration service
                delete payload.isNew;
                switch (method) {
                    case 'save':
                        payload.value = _this.validate(payload);
                        break;
                    case 'update':
                        payload.value = _this.validate(payload);
                        break;
                    case 'remove':
                        break;
                }
                entry.hasErrors = false;
                return _this.editorCRUDService[method](payload).then(function (entity, index, meth) {
                    switch (meth) {
                        case 'save':
                            delete entity.isNew;
                            break;
                        case 'remove':
                            this.configuration.splice(index, 1);
                            break;
                    }
                }.bind(_this, entry, i, method), function () {
                    _this.addValueError(entry, 'configurationform.save.error');
                    return Promise.reject({});
                });
            }
            catch (error) {
                entry.hasErrors = true;
                if (error instanceof smarteditcommons.Errors.ParseError) {
                    _this.addValueError(entry, 'se.configurationform.json.parse.error');
                    return Promise.reject({});
                }
            }
        }));
    };
    ConfigurationService.prototype.submit.$inject = ["configurationForm"];
    /*
     * The init method initializes the configuration editor and loads all the configurations so they can be edited.
     *
     * @param {Function} loadCallback The callback to be executed after loading the configurations.
     */
    /* @ngInject */ ConfigurationService.prototype.init = function (_loadCallback) {
        this.loadCallback = _loadCallback || lo.noop;
        return this.loadAndPresent();
    };
    ConfigurationService.prototype.init.$inject = ["_loadCallback"];
    /* @ngInject */ ConfigurationService.prototype.reset = function (configurationForm) {
        this.configuration = smarteditcommons.objectUtils.copy(this.pristine);
        if (configurationForm) {
            configurationForm.form.markAsPristine();
        }
        if (this.loadCallback) {
            this.loadCallback();
        }
    };
    ConfigurationService.prototype.reset.$inject = ["configurationForm"];
    /* @ngInject */ ConfigurationService.prototype.addError = function (entry, type, message) {
        entry.errors = entry.errors || {};
        entry.errors[type] = entry.errors[type] || [];
        entry.errors[type].push({
            message: message
        });
    };
    ConfigurationService.prototype.addError.$inject = ["entry", "type", "message"];
    /* @ngInject */ ConfigurationService.prototype.addKeyError = function (entry, message) {
        this.addError(entry, 'keys', message);
    };
    ConfigurationService.prototype.addKeyError.$inject = ["entry", "message"];
    /* @ngInject */ ConfigurationService.prototype.addValueError = function (entry, message) {
        this.addError(entry, 'values', message);
    };
    ConfigurationService.prototype.addValueError.$inject = ["entry", "message"];
    /* @ngInject */ ConfigurationService.prototype.prettify = function (array) {
        var _this = this;
        var configuration = smarteditcommons.objectUtils.copy(array);
        configuration.forEach(function (entry) {
            try {
                entry.value = JSON.stringify(JSON.parse(entry.value), null, 2);
            }
            catch (parseError) {
                _this.addValueError(entry, 'se.configurationform.json.parse.error');
            }
        });
        return configuration;
    };
    ConfigurationService.prototype.prettify.$inject = ["array"];
    /**
     * for editing purposes
     */
    /* @ngInject */ ConfigurationService.prototype.loadAndPresent = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.loadConfigManagerService.loadAsArray().then(function (response) {
                _this.pristine = _this.prettify(response.map(function (item) { return (__assign(__assign({}, item), { uuid: lo.uniqueId() })); }));
                _this.reset();
                resolve();
            }, function () {
                _this.logService.log('load failed');
                reject();
            });
        });
    };
    /* @ngInject */ ConfigurationService.prototype.isValid = function (configurationForm) {
        var _this = this;
        this.configuration.forEach(function (entry) {
            delete entry.errors;
        });
        if (configurationForm.invalid) {
            this.configuration.forEach(function (entry) {
                if (smarteditcommons.stringUtils.isBlank(entry.key)) {
                    _this.addKeyError(entry, 'se.configurationform.required.entry.error');
                    entry.hasErrors = true;
                }
                if (smarteditcommons.stringUtils.isBlank(entry.value)) {
                    _this.addValueError(entry, 'se.configurationform.required.entry.error');
                    entry.hasErrors = true;
                }
            });
        }
        return (configurationForm.valid &&
            !this.configuration.reduce(function (confHolder, nextConfiguration) {
                if (confHolder.keys.indexOf(nextConfiguration.key) > -1) {
                    _this.addKeyError(nextConfiguration, 'se.configurationform.duplicate.entry.error');
                    confHolder.errors = true;
                }
                else {
                    confHolder.keys.push(nextConfiguration.key);
                }
                return confHolder;
            }, {
                keys: [],
                errors: false
            }).errors);
    };
    ConfigurationService.prototype.isValid.$inject = ["configurationForm"];
    /* @ngInject */ ConfigurationService.prototype.validate = function (entry) {
        try {
            if (entry.requiresUserCheck && !entry.isCheckedByUser) {
                throw new Error(this.ABSOLUTE_URI_NOT_APPROVED);
            }
            return JSON.stringify(JSON.parse(entry.value));
        }
        catch (parseError) {
            throw new smarteditcommons.Errors.ParseError(entry.value);
        }
    };
    ConfigurationService.prototype.validate.$inject = ["entry"];
    /* @ngInject */ ConfigurationService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.LogService,
            LoadConfigManagerService,
            smarteditcommons.RestServiceFactory])
    ], /* @ngInject */ ConfigurationService);
    return /* @ngInject */ ConfigurationService;
}());

var /* @ngInject */ IframeClickDetectionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ IframeClickDetectionService, _super);
    function /* @ngInject */ IframeClickDetectionService() {
        var _this = _super.call(this) || this;
        _this.callbacks = {};
        return _this;
    }
    /* @ngInject */ IframeClickDetectionService.prototype.registerCallback = function (id, callback) {
        this.callbacks[id] = callback;
        return this.removeCallback.bind(this, id);
    };
    IframeClickDetectionService.prototype.registerCallback.$inject = ["id", "callback"];
    /* @ngInject */ IframeClickDetectionService.prototype.removeCallback = function (id) {
        if (this.callbacks[id]) {
            delete this.callbacks[id];
            return true;
        }
        return false;
    };
    IframeClickDetectionService.prototype.removeCallback.$inject = ["id"];
    /**
     * Triggers all callbacks currently registered to the service. This function is registered as a listener through
     * the GatewayProxy
     */
    /* @ngInject */ IframeClickDetectionService.prototype.onIframeClick = function () {
        for (var ref in this.callbacks) {
            if (this.callbacks.hasOwnProperty(ref)) {
                this.callbacks[ref]();
            }
        }
    };
    /* @ngInject */ IframeClickDetectionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IIframeClickDetectionService),
        smarteditcommons.GatewayProxied('onIframeClick'),
        core.Injectable(),
        __metadata("design:paramtypes", [])
    ], /* @ngInject */ IframeClickDetectionService);
    return /* @ngInject */ IframeClickDetectionService;
}(smarteditcommons.IIframeClickDetectionService));

/** @internal */
var /* @ngInject */ RenderService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ RenderService, _super);
    RenderService.$inject = ["yjQuery", "crossFrameEventService", "systemEventService", "notificationService", "pageInfoService", "perspectiveService", "windowUtils", "modalService"];
    function /* @ngInject */ RenderService(yjQuery, crossFrameEventService, systemEventService, notificationService, pageInfoService, perspectiveService, windowUtils, modalService) {
        var _this = _super.call(this, yjQuery, systemEventService, notificationService, pageInfoService, perspectiveService, crossFrameEventService, windowUtils, modalService) || this;
        _this.yjQuery = yjQuery;
        _this.crossFrameEventService = crossFrameEventService;
        _this.systemEventService = systemEventService;
        return _this;
    }
    /* @ngInject */ RenderService.prototype.blockRendering = function (block) {
        this.renderingBlocked = block;
    };
    RenderService.prototype.blockRendering.$inject = ["block"];
    /* @ngInject */ RenderService.prototype.isRenderingBlocked = function () {
        return Promise.resolve(this.renderingBlocked || false);
    };
    /* @ngInject */ RenderService = __decorate([
        smarteditcommons.GatewayProxied('blockRendering', 'isRenderingBlocked', 'renderSlots', 'renderComponent', 'renderRemoval', 'toggleOverlay', 'refreshOverlayDimensions', 'renderPage'),
        smarteditcommons.SeDowngradeService(smarteditcommons.IRenderService),
        __param(0, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [Function, smarteditcommons.CrossFrameEventService,
            smarteditcommons.SystemEventService,
            smarteditcommons.INotificationService,
            smarteditcommons.IPageInfoService,
            smarteditcommons.IPerspectiveService,
            smarteditcommons.WindowUtils,
            smarteditcommons.ModalService])
    ], /* @ngInject */ RenderService);
    return /* @ngInject */ RenderService;
}(smarteditcommons.IRenderService));

window.__smartedit__.addDecoratorPayload("Injectable", "TranslationsFetchService", { providedIn: 'root' });
var /* @ngInject */ TranslationsFetchService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ TranslationsFetchService, _super);
    TranslationsFetchService.$inject = ["httpClient", "promiseUtils"];
    function /* @ngInject */ TranslationsFetchService(httpClient, promiseUtils) {
        var _this = _super.call(this) || this;
        _this.httpClient = httpClient;
        _this.promiseUtils = promiseUtils;
        _this.ready = false;
        return _this;
    }
    /* @ngInject */ TranslationsFetchService.prototype.get = function (lang) {
        var _this = this;
        return this.httpClient
            .get("" + smarteditcommons.RestServiceFactory.getGlobalBasePath() + smarteditcommons.I18N_RESOURCE_URI + "/" + lang, {
            responseType: 'json'
        })
            .pipe(operators.map(function (result) {
            return result.value
                ? result.value
                : result;
        }))
            .toPromise()
            .then(function (result) {
            _this.ready = true;
            return result;
        });
    };
    TranslationsFetchService.prototype.get.$inject = ["lang"];
    /* @ngInject */ TranslationsFetchService.prototype.isReady = function () {
        return Promise.resolve(this.ready);
    };
    /* @ngInject */ TranslationsFetchService.prototype.waitToBeReady = function () {
        var _this = this;
        return this.promiseUtils.resolveToCallbackWhenCondition(function () { return _this.ready; }, function () {
            //
        });
    };
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ TranslationsFetchService.prototype, "get", null);
    /* @ngInject */ TranslationsFetchService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ITranslationsFetchService),
        smarteditcommons.GatewayProxied()
        /*
         * this service, provider in SeTranslationModule, needs be accessible to root
         * so that when downgrading it to legacy usage it will be found in DI
         */
        ,
        core.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http.HttpClient, smarteditcommons.PromiseUtils])
    ], /* @ngInject */ TranslationsFetchService);
    return /* @ngInject */ TranslationsFetchService;
}(smarteditcommons.ITranslationsFetchService));

var PERMISSION_TYPES;
(function (PERMISSION_TYPES) {
    PERMISSION_TYPES["READ"] = "read";
    PERMISSION_TYPES["WRITE"] = "write";
})(PERMISSION_TYPES || (PERMISSION_TYPES = {}));
var /* @ngInject */ CatalogVersionPermissionService = /** @class */ (function (_super) {
    __extends(/* @ngInject */ CatalogVersionPermissionService, _super);
    CatalogVersionPermissionService.$inject = ["catalogVersionPermissionRestService", "catalogService"];
    function /* @ngInject */ CatalogVersionPermissionService(catalogVersionPermissionRestService, catalogService) {
        var _this = _super.call(this) || this;
        _this.catalogVersionPermissionRestService = catalogVersionPermissionRestService;
        _this.catalogService = catalogService;
        return _this;
    }
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasPermission = function (accessType, catalogId, catalogVersion, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, shouldOverride, response, targetPermission, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.shouldIgnoreCatalogPermissions(accessType, catalogId, catalogVersion, siteId),
                            this.catalogVersionPermissionRestService.getCatalogVersionPermissions(catalogId, catalogVersion)
                        ])];
                    case 1:
                        _a = _b.sent(), shouldOverride = _a[0], response = _a[1];
                        if (this.isCatalogVersionPermissionResponse(response)) {
                            targetPermission = response.permissions.find(function (permission) { return permission.key === accessType; });
                            value = targetPermission ? targetPermission.value : 'false';
                            return [2 /*return*/, value === 'true' || shouldOverride];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    CatalogVersionPermissionService.prototype.hasPermission.$inject = ["accessType", "catalogId", "catalogVersion", "siteId"];
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasSyncPermissionFromCurrentToActiveCatalogVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogService.retrieveUriContext()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.hasSyncPermissionToActiveCatalogVersion(data[smarteditcommons.CONTEXT_CATALOG], data[smarteditcommons.CONTEXT_CATALOG_VERSION])];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasSyncPermissionToActiveCatalogVersion = function (catalogId, catalogVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var targetCatalogVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogService.getActiveContentCatalogVersionByCatalogId(catalogId)];
                    case 1:
                        targetCatalogVersion = _a.sent();
                        return [4 /*yield*/, this.hasSyncPermission(catalogId, catalogVersion, targetCatalogVersion)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CatalogVersionPermissionService.prototype.hasSyncPermissionToActiveCatalogVersion.$inject = ["catalogId", "catalogVersion"];
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasSyncPermission = function (catalogId, sourceCatalogVersion, targetCatalogVersion) {
        return __awaiter(this, void 0, void 0, function () {
            var response, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogVersionPermissionRestService.getCatalogVersionPermissions(catalogId, sourceCatalogVersion)];
                    case 1:
                        response = _a.sent();
                        if (this.isCatalogVersionPermissionResponse(response) &&
                            response.syncPermissions &&
                            response.syncPermissions.length > 0) {
                            permission = response.syncPermissions.some(function (syncPermission) {
                                return syncPermission
                                    ? syncPermission.canSynchronize === true &&
                                        syncPermission.targetCatalogVersion === targetCatalogVersion
                                    : false;
                            });
                            return [2 /*return*/, permission];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    CatalogVersionPermissionService.prototype.hasSyncPermission.$inject = ["catalogId", "sourceCatalogVersion", "targetCatalogVersion"];
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasWritePermissionOnCurrent = function () {
        return this.hasCurrentCatalogPermission(PERMISSION_TYPES.WRITE);
    };
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasReadPermissionOnCurrent = function () {
        return this.hasCurrentCatalogPermission(PERMISSION_TYPES.READ);
    };
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasWritePermission = function (catalogId, catalogVersion) {
        return this.hasPermission(PERMISSION_TYPES.WRITE, catalogId, catalogVersion);
    };
    CatalogVersionPermissionService.prototype.hasWritePermission.$inject = ["catalogId", "catalogVersion"];
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasReadPermission = function (catalogId, catalogVersion) {
        return this.hasPermission(PERMISSION_TYPES.READ, catalogId, catalogVersion);
    };
    CatalogVersionPermissionService.prototype.hasReadPermission.$inject = ["catalogId", "catalogVersion"];
    /**
     * if in the context of an experience AND the catalogVersion is the active one, then permissions should be ignored in read mode
     */
    /* @ngInject */ CatalogVersionPermissionService.prototype.shouldIgnoreCatalogPermissions = function (accessType, catalogId, catalogVersion, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            var promise, versionCheckedAgainst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = siteId && accessType === PERMISSION_TYPES.READ
                            ? this.catalogService.getActiveContentCatalogVersionByCatalogId(catalogId)
                            : Promise.resolve();
                        return [4 /*yield*/, promise];
                    case 1:
                        versionCheckedAgainst = _a.sent();
                        return [2 /*return*/, versionCheckedAgainst === catalogVersion];
                }
            });
        });
    };
    CatalogVersionPermissionService.prototype.shouldIgnoreCatalogPermissions.$inject = ["accessType", "catalogId", "catalogVersion", "siteId"];
    /**
     * Verifies whether current user has write or read permission for current catalog version.
     * @param {String} accessType
     */
    /* @ngInject */ CatalogVersionPermissionService.prototype.hasCurrentCatalogPermission = function (accessType) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogService.retrieveUriContext()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.hasPermission(accessType, data[smarteditcommons.CONTEXT_CATALOG], data[smarteditcommons.CONTEXT_CATALOG_VERSION], data[smarteditcommons.CONTEXT_SITE_ID])];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CatalogVersionPermissionService.prototype.hasCurrentCatalogPermission.$inject = ["accessType"];
    /* @ngInject */ CatalogVersionPermissionService.prototype.isCatalogVersionPermissionResponse = function (response) {
        return !lo.isEmpty(response);
    };
    CatalogVersionPermissionService.prototype.isCatalogVersionPermissionResponse.$inject = ["response"];
    /* @ngInject */ CatalogVersionPermissionService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ICatalogVersionPermissionService),
        smarteditcommons.GatewayProxied('hasWritePermission', 'hasReadPermission', 'hasWritePermissionOnCurrent', 'hasReadPermissionOnCurrent'),
        __metadata("design:paramtypes", [CatalogVersionPermissionRestService,
            smarteditcommons.ICatalogService])
    ], /* @ngInject */ CatalogVersionPermissionService);
    return /* @ngInject */ CatalogVersionPermissionService;
}(smarteditcommons.ICatalogVersionPermissionService));

/**
 * Implementation of smarteditcommons' DropdownPopulatorInterface for language dropdown in
 * experience selector to populate the list of languages by making a REST call to retrieve the list of langauges for a given site.
 *
 */
var /* @ngInject */ PreviewDatalanguageDropdownPopulator = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PreviewDatalanguageDropdownPopulator, _super);
    PreviewDatalanguageDropdownPopulator.$inject = ["languageService"];
    function /* @ngInject */ PreviewDatalanguageDropdownPopulator(languageService) {
        return _super.call(this, lo, languageService) || this;
    }
    /**
     * Returns a promise resolving to a list of languages for a given Site ID (based on the selected catalog). The site Id is generated from the
     * selected catalog in the 'catalog' dropdown.
     */
    /* @ngInject */ PreviewDatalanguageDropdownPopulator.prototype.fetchAll = function (payload) {
        if (payload.model[payload.field.dependsOn]) {
            var siteUid = payload.model[payload.field.dependsOn].split('|')[0];
            return this.getLanguageDropdownChoices(siteUid, payload.search);
        }
        return Promise.resolve([]);
    };
    PreviewDatalanguageDropdownPopulator.prototype.fetchAll.$inject = ["payload"];
    /** @internal */
    /* @ngInject */ PreviewDatalanguageDropdownPopulator.prototype.getLanguageDropdownChoices = function (siteUid, search) {
        return __awaiter(this, void 0, void 0, function () {
            var languages, languagesDropdownChoices, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.languageService.getLanguagesForSite(siteUid)];
                    case 1:
                        languages = _a.sent();
                        languagesDropdownChoices = languages.map(function (_a) {
                            var isocode = _a.isocode, nativeName = _a.nativeName;
                            var dropdownChoices = {};
                            dropdownChoices.id = isocode;
                            dropdownChoices.label = nativeName;
                            return dropdownChoices;
                        });
                        if (search) {
                            languagesDropdownChoices = languagesDropdownChoices.filter(function (language) {
                                return language.label.toUpperCase().indexOf(search.toUpperCase()) > -1;
                            });
                        }
                        return [2 /*return*/, languagesDropdownChoices];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreviewDatalanguageDropdownPopulator.prototype.getLanguageDropdownChoices.$inject = ["siteUid", "search"];
    /* @ngInject */ PreviewDatalanguageDropdownPopulator = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.LanguageService])
    ], /* @ngInject */ PreviewDatalanguageDropdownPopulator);
    return /* @ngInject */ PreviewDatalanguageDropdownPopulator;
}(smarteditcommons.DropdownPopulatorInterface));

/**
 * Implementation of DropdownPopulatorInterface for catalog dropdown in
 * experience selector to populate the list of catalogs by making a REST call to retrieve the sites and then the catalogs based on the site.
 */
var /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator = /** @class */ (function (_super) {
    __extends(/* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator, _super);
    PreviewDatapreviewCatalogDropdownPopulator.$inject = ["catalogService", "sharedDataService", "languageService", "crossFrameEventService"];
    function /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator(catalogService, sharedDataService, languageService, crossFrameEventService) {
        var _this = _super.call(this, lo, languageService) || this;
        _this.catalogService = catalogService;
        _this.sharedDataService = sharedDataService;
        _this.l10nFn = smarteditcommons.setupL10nFilter(languageService, crossFrameEventService);
        return _this;
    }
    /**
     *  Returns a promise resolving to a list of site - catalogs to be displayed in the experience selector.
     *
     */
    /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator.prototype.fetchAll = function (payload) {
        return this.initCatalogVersionDropdownChoices(payload.search);
    };
    PreviewDatapreviewCatalogDropdownPopulator.prototype.fetchAll.$inject = ["payload"];
    /** @internal */
    /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator.prototype.initCatalogVersionDropdownChoices = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var experience, siteDescriptor, dropdownChoices, ascDropdownChoices, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)];
                    case 1:
                        experience = (_a.sent());
                        siteDescriptor = experience.siteDescriptor;
                        return [4 /*yield*/, this.getDropdownChoices(siteDescriptor, search)];
                    case 2:
                        dropdownChoices = _a.sent();
                        ascDropdownChoices = lo.flatten(dropdownChoices)
                            .sort(function (e1, e2) {
                            return e1.label.localeCompare(e2.label);
                        });
                        return [2 /*return*/, ascDropdownChoices];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreviewDatapreviewCatalogDropdownPopulator.prototype.initCatalogVersionDropdownChoices.$inject = ["search"];
    /** @internal */
    /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator.prototype.getDropdownChoices = function (siteDescriptor, search) {
        return __awaiter(this, void 0, void 0, function () {
            var catalogs, optionsByCatalog;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogService.getContentCatalogsForSite(siteDescriptor.uid)];
                    case 1:
                        catalogs = _a.sent();
                        optionsByCatalog = lo.flatten(catalogs).map(function (catalog) {
                            return catalog.versions.map(function (catalogVersion) { return ({
                                id: siteDescriptor.uid + "|" + catalog.catalogId + "|" + catalogVersion.version,
                                label: _this.l10nFn(catalog.name) + " - " + catalogVersion.version
                            }); });
                        });
                        return [2 /*return*/, lo.flatten(optionsByCatalog)
                                .filter(function (option) {
                                return search ? option.label.toUpperCase().includes(search.toUpperCase()) : true;
                            })];
                }
            });
        });
    };
    PreviewDatapreviewCatalogDropdownPopulator.prototype.getDropdownChoices.$inject = ["siteDescriptor", "search"];
    /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.ICatalogService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.LanguageService,
            smarteditcommons.CrossFrameEventService])
    ], /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator);
    return /* @ngInject */ PreviewDatapreviewCatalogDropdownPopulator;
}(smarteditcommons.DropdownPopulatorInterface));

/**
 * Guard that prevents unauthorized user from navigating to Storefront Page.
 *
 * @internal
 * @ignore
 */
var /* @ngInject */ StorefrontPageGuard = /** @class */ (function () {
    StorefrontPageGuard.$inject = ["catalogAwareResolverHelper", "routing"];
    function /* @ngInject */ StorefrontPageGuard(catalogAwareResolverHelper, routing) {
        this.catalogAwareResolverHelper = catalogAwareResolverHelper;
        this.routing = routing;
    }
    /**
     * It will redirect current user to the Landing Page if the user doesn't have a read permission to the current catalog version.
     */
    /* @ngInject */ StorefrontPageGuard.prototype.canActivate = function () {
        var _this = this;
        return this.catalogAwareResolverHelper.storefrontResolve().catch(function () {
            _this.routing.go(smarteditcommons.NG_ROUTE_PREFIX);
            return false;
        });
    };
    /* @ngInject */ StorefrontPageGuard = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [CatalogAwareRouteResolverHelper,
            smarteditcommons.SmarteditRoutingService])
    ], /* @ngInject */ StorefrontPageGuard);
    return /* @ngInject */ StorefrontPageGuard;
}());

/**
 * The ProductService provides is used to access products from the product catalog
 */
var /* @ngInject */ ProductService = /** @class */ (function () {
    ProductService.$inject = ["restServiceFactory", "languageService"];
    function /* @ngInject */ ProductService(restServiceFactory, languageService) {
        this.restServiceFactory = restServiceFactory;
        this.languageService = languageService;
        this.productService = this.restServiceFactory.get(smarteditcommons.PRODUCT_RESOURCE_API);
        this.productListService = this.restServiceFactory.get(smarteditcommons.PRODUCT_LIST_RESOURCE_API);
    }
    /**
     * Returns a list of Products from the catalog that match the given mask
     */
    /* @ngInject */ ProductService.prototype.findProducts = function (productSearch, pageable) {
        return __awaiter(this, void 0, void 0, function () {
            var langIsoCode, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._validateProductCatalogInfo(productSearch);
                        return [4 /*yield*/, this.languageService.getResolveLocale()];
                    case 1:
                        langIsoCode = _a.sent();
                        return [4 /*yield*/, this.productListService.get({
                                catalogId: productSearch.catalogId,
                                catalogVersion: productSearch.catalogVersion,
                                text: pageable.mask,
                                pageSize: pageable.pageSize,
                                currentPage: pageable.currentPage,
                                langIsoCode: langIsoCode
                            })];
                    case 2:
                        list = _a.sent();
                        return [2 /*return*/, list];
                }
            });
        });
    };
    ProductService.prototype.findProducts.$inject = ["productSearch", "pageable"];
    /**
     * Returns a Product that matches the given siteUID and productUID
     */
    /* @ngInject */ ProductService.prototype.getProductById = function (siteUID, productUID) {
        return this.productService.get({
            siteUID: siteUID,
            productUID: productUID
        });
    };
    ProductService.prototype.getProductById.$inject = ["siteUID", "productUID"];
    /* @ngInject */ ProductService.prototype._validateProductCatalogInfo = function (productSearch) {
        if (!productSearch.catalogId) {
            throw new Error('[productService] - catalog ID missing.');
        }
        if (!productSearch.catalogVersion) {
            throw new Error('[productService] - catalog version missing.');
        }
    };
    ProductService.prototype._validateProductCatalogInfo.$inject = ["productSearch"];
    __decorate([
        smarteditcommons.Cached({ actions: [smarteditcommons.rarelyChangingContent], tags: [smarteditcommons.userEvictionTag] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], /* @ngInject */ ProductService.prototype, "findProducts", null);
    /* @ngInject */ ProductService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.RestServiceFactory,
            smarteditcommons.LanguageService])
    ], /* @ngInject */ ProductService);
    return /* @ngInject */ ProductService;
}());

/**
 * @deprecated since 2005, use AnnouncementBoardComponent
 */
var /* @ngInject */ YAnnouncementBoardComponent = /** @class */ (function () {
    function /* @ngInject */ YAnnouncementBoardComponent() {
    }
    /* @ngInject */ YAnnouncementBoardComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'yAnnouncementBoardComponentTemplate.html',
            inputs: []
        })
    ], /* @ngInject */ YAnnouncementBoardComponent);
    return /* @ngInject */ YAnnouncementBoardComponent;
}());

/**
 * @deprecated since 2005, use AnnouncementComponent
 */
var /* @ngInject */ YAnnouncementComponent = /** @class */ (function () {
    function /* @ngInject */ YAnnouncementComponent() {
    }
    /* @ngInject */ YAnnouncementComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'yAnnouncementComponentTemplate.html',
            inputs: ['announcement']
        })
    ], /* @ngInject */ YAnnouncementComponent);
    return /* @ngInject */ YAnnouncementComponent;
}());

/**
 * **Deprecated since 2005, use {@link FilterByFieldPipe}**.
 *
 * @deprecated
 */
var FilterByFieldFilter = /** @class */ (function () {
    function FilterByFieldFilter() {
    }
    FilterByFieldFilter.transform = function () {
        return function (items, query, keys, callbackFcn) { return smarteditcommons.FilterByFieldPipe.transform(items, query, keys, callbackFcn); };
    };
    FilterByFieldFilter = __decorate([
        smarteditcommons.SeFilter()
    ], FilterByFieldFilter);
    return FilterByFieldFilter;
}());

// eslint-disable-next-line @typescript-eslint/no-var-requires
var NgCookiesModule = require('angular-cookies'); // Only supports CommonJS
/**
 * Module containing all the services shared within the smartedit container application
 */
var /* @ngInject */ LegacySmarteditServicesModule = /** @class */ (function () {
    function /* @ngInject */ LegacySmarteditServicesModule() {
    }
    /* @ngInject */ LegacySmarteditServicesModule = __decorate([
        smarteditcommons.SeModule({
            declarations: [FilterByFieldFilter, YAnnouncementBoardComponent, YAnnouncementComponent],
            imports: [
                'seConstantsModule',
                smarteditcommons.LegacySmarteditCommonsModule,
                NgCookiesModule,
                'functionsModule',
                'resourceLocationsModule',
                'yLoDashModule',
                smarteditcommons.ModalServiceModule
            ],
            providers: [
                /**
                 * Path to fetch permissions of a given catalog version.
                 */
                smarteditcommons.diNameUtils.makeValueProvider({
                    CATALOG_VERSION_PERMISSIONS_RESOURCE_URI: smarteditcommons.CATALOG_VERSION_PERMISSIONS_RESOURCE_URI_CONSTANT
                }),
                smarteditcommons.diNameUtils.makeValueProvider({
                    DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME: smarteditcommons.DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME
                })
            ]
        })
    ], /* @ngInject */ LegacySmarteditServicesModule);
    return /* @ngInject */ LegacySmarteditServicesModule;
}());

window.__smartedit__.addDecoratorPayload("Component", "ConfigurationModalComponent", {
    selector: 'se-configuration-modal',
    template: "<div id=\"editConfigurationsBody\" class=\"se-config\"><form #form=\"ngForm\" novalidate><div class=\"se-config__sub-header\"><span class=\"se-config__sub-title\">{{'se.configurationform.label.keyvalue' | translate}}</span> <button class=\"se-config__add-entry-btn fd-button--compact\" type=\"button\" (click)=\"editor.addEntry()\">{{ \"se.general.configuration.add.button\" | translate }}</button></div><div class=\"se-config__entry\" *ngFor=\"let entry of editor.filterConfiguration(); let $index = index\"><div class=\"se-config__entry-data\"><div class=\"se-config__entry-key\"><input type=\"text\" [ngClass]=\"{\n                            'is-invalid': entry.errors &&  entry.errors.keys && entry.errors.keys.length > 0,\n                            'se-config__entry-key--disabled': !entry.isNew }\" name=\"{{entry.key}}_{{entry.uuid}}_key\" placeholder=\"{{'se.configurationform.header.key.name' | translate}}\" [(ngModel)]=\"entry.key\" [required]=\"true\" [disabled]=\"!entry.isNew\" class=\"se-config__entry-key-input fd-form__control\" [title]=\"entry.key\"/><ng-container *ngIf=\"entry.errors && entry.errors.keys\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.keys; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div><div class=\"se-config__entry-value\"><textarea [ngClass]=\"{'is-invalid': entry.errors && entry.errors.values && entry.errors.values.length>0}\" name=\"{{entry.key}}_{{entry.uuid}}_value\" placeholder=\"{{'se.configurationform.header.value.name' | translate}}\" [(ngModel)]=\"entry.value\" [required]=\"true\" class=\"se-config__entry-text-area fd-form__control\" (change)=\"editor.validateUserInput(entry)\"></textarea><div *ngIf=\"entry.requiresUserCheck\"><input id=\"{{entry.key}}_absoluteUrl_check_{{$index}}\" type=\"checkbox\" name=\"{{entry.key}}_{{entry.uuid}}_isCheckedByUser\" [(ngModel)]=\"entry.isCheckedByUser\"/> <span id=\"{{entry.key}}_absoluteUrl_msg_{{$index}}\" [ngClass]=\"{\n                                'warning-check-msg': true,\n                                'not-checked': entry.hasErrors && !entry.isCheckedByUser\n                            }\">{{'se.configurationform.absoluteurl.check' | translate}}</span></div><ng-container *ngIf=\"entry.errors && entry.errors.values && entry.errors.values\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.values; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div></div><button type=\"button\" id=\"{{entry.key}}_removeButton_{{$index}}\" class=\"se-config__entry-remove-btn fd-button--light sap-icon--delete\" (click)=\"editor.removeEntry(entry, form);\"></button></div></form></div>"
});
var ConfigurationModalComponent = /** @class */ (function () {
    function ConfigurationModalComponent(editor, modalManager, confirmationModalService) {
        this.editor = editor;
        this.modalManager = modalManager;
        this.confirmationModalService = confirmationModalService;
    }
    ConfigurationModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editor.init();
        this.form.statusChanges.subscribe(function () {
            if (_this.form.valid && _this.form.dirty) {
                _this.modalManager.enableButton('save');
            }
            if (_this.form.invalid || !_this.form.dirty) {
                _this.modalManager.disableButton('save');
            }
        });
        this.modalManager.addButtons([
            {
                id: 'cancel',
                label: 'se.cms.component.confirmation.modal.cancel',
                style: smarteditcommons.FundamentalModalButtonStyle.Default,
                action: smarteditcommons.FundamentalModalButtonAction.Dismiss,
                callback: function () { return rxjs.from(_this.onCancel()); }
            },
            {
                id: 'save',
                style: smarteditcommons.FundamentalModalButtonStyle.Primary,
                label: 'se.cms.component.confirmation.modal.save',
                callback: function () { return rxjs.from(_this.onSave()); },
                disabled: true
            }
        ]);
    };
    ConfigurationModalComponent.prototype.trackByFn = function (_, item) {
        return item.uuid;
    };
    ConfigurationModalComponent.prototype.onCancel = function () {
        var _this = this;
        var dirty = this.form.dirty;
        var confirmationData = {
            description: 'se.editor.cancel.confirm'
        };
        if (!dirty) {
            return Promise.resolve();
        }
        return this.confirmationModalService
            .confirm(confirmationData)
            .then(function () { return _this.modalManager.close(null); });
    };
    ConfigurationModalComponent.prototype.onSave = function () {
        var _this = this;
        return this.editor.submit(this.form).then(function () {
            _this.modalManager.close(null);
        });
    };
    __decorate([
        core.ViewChild('form', { static: true }),
        __metadata("design:type", forms.NgForm)
    ], ConfigurationModalComponent.prototype, "form", void 0);
    ConfigurationModalComponent = __decorate([
        core.Component({
            selector: 'se-configuration-modal',
            template: "<div id=\"editConfigurationsBody\" class=\"se-config\"><form #form=\"ngForm\" novalidate><div class=\"se-config__sub-header\"><span class=\"se-config__sub-title\">{{'se.configurationform.label.keyvalue' | translate}}</span> <button class=\"se-config__add-entry-btn fd-button--compact\" type=\"button\" (click)=\"editor.addEntry()\">{{ \"se.general.configuration.add.button\" | translate }}</button></div><div class=\"se-config__entry\" *ngFor=\"let entry of editor.filterConfiguration(); let $index = index\"><div class=\"se-config__entry-data\"><div class=\"se-config__entry-key\"><input type=\"text\" [ngClass]=\"{\n                            'is-invalid': entry.errors &&  entry.errors.keys && entry.errors.keys.length > 0,\n                            'se-config__entry-key--disabled': !entry.isNew }\" name=\"{{entry.key}}_{{entry.uuid}}_key\" placeholder=\"{{'se.configurationform.header.key.name' | translate}}\" [(ngModel)]=\"entry.key\" [required]=\"true\" [disabled]=\"!entry.isNew\" class=\"se-config__entry-key-input fd-form__control\" [title]=\"entry.key\"/><ng-container *ngIf=\"entry.errors && entry.errors.keys\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.keys; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div><div class=\"se-config__entry-value\"><textarea [ngClass]=\"{'is-invalid': entry.errors && entry.errors.values && entry.errors.values.length>0}\" name=\"{{entry.key}}_{{entry.uuid}}_value\" placeholder=\"{{'se.configurationform.header.value.name' | translate}}\" [(ngModel)]=\"entry.value\" [required]=\"true\" class=\"se-config__entry-text-area fd-form__control\" (change)=\"editor.validateUserInput(entry)\"></textarea><div *ngIf=\"entry.requiresUserCheck\"><input id=\"{{entry.key}}_absoluteUrl_check_{{$index}}\" type=\"checkbox\" name=\"{{entry.key}}_{{entry.uuid}}_isCheckedByUser\" [(ngModel)]=\"entry.isCheckedByUser\"/> <span id=\"{{entry.key}}_absoluteUrl_msg_{{$index}}\" [ngClass]=\"{\n                                'warning-check-msg': true,\n                                'not-checked': entry.hasErrors && !entry.isCheckedByUser\n                            }\">{{'se.configurationform.absoluteurl.check' | translate}}</span></div><ng-container *ngIf=\"entry.errors && entry.errors.values && entry.errors.values\"><span id=\"{{entry.key}}_error_{{$index}}\" *ngFor=\"let error of entry.errors.values; let $index = index\" class=\"error-input help-block\">{{error.message|translate}}</span></ng-container></div></div><button type=\"button\" id=\"{{entry.key}}_removeButton_{{$index}}\" class=\"se-config__entry-remove-btn fd-button--light sap-icon--delete\" (click)=\"editor.removeEntry(entry, form);\"></button></div></form></div>"
        }),
        __metadata("design:paramtypes", [ConfigurationService,
            smarteditcommons.FundamentalModalManagerService,
            smarteditcommons.IConfirmationModalService])
    ], ConfigurationModalComponent);
    return ConfigurationModalComponent;
}());

var /* @ngInject */ ConfigurationModalService = /** @class */ (function () {
    ConfigurationModalService.$inject = ["modalService"];
    function /* @ngInject */ ConfigurationModalService(modalService) {
        this.modalService = modalService;
    }
    /*
     *The edit configuration method opens the modal for the configurations.
     */
    /* @ngInject */ ConfigurationModalService.prototype.editConfiguration = function () {
        this.modalService.open({
            templateConfig: {
                title: 'se.modal.administration.configuration.edit.title'
            },
            component: ConfigurationModalComponent,
            config: {
                focusTrapped: false,
                backdropClickCloseable: false
            }
        });
    };
    /* @ngInject */ ConfigurationModalService = __decorate([
        smarteditcommons.SeDowngradeService(),
        __metadata("design:paramtypes", [smarteditcommons.IModalService])
    ], /* @ngInject */ ConfigurationModalService);
    return /* @ngInject */ ConfigurationModalService;
}());

var SmarteditServicesModule = /** @class */ (function () {
    function SmarteditServicesModule() {
    }
    SmarteditServicesModule = __decorate([
        core.NgModule({
            imports: [smarteditcommons.DragAndDropServiceModule, smarteditcommons.SmarteditCommonsModule],
            providers: [
                HeartBeatService,
                BootstrapService,
                ConfigurationExtractorService,
                DelegateRestService,
                smarteditcommons.RestServiceFactory,
                ConfigurationService,
                ConfigurationModalService,
                PreviewDatalanguageDropdownPopulator,
                PreviewDatapreviewCatalogDropdownPopulator,
                CatalogVersionPermissionRestService,
                CatalogVersionPermissionService,
                CatalogAwareRouteResolverHelper,
                StorefrontPageGuard,
                smarteditcommons.SmarteditRoutingService,
                {
                    provide: smarteditcommons.ICatalogVersionPermissionService,
                    useClass: CatalogVersionPermissionService
                },
                { provide: smarteditcommons.IPermissionService, useClass: PermissionService },
                { provide: smarteditcommons.IPageInfoService, useClass: PageInfoService },
                {
                    provide: smarteditcommons.IRestServiceFactory,
                    useClass: smarteditcommons.RestServiceFactory
                },
                {
                    provide: smarteditcommons.IRenderService,
                    useClass: RenderService
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
                PermissionsRegistrationService,
                {
                    provide: smarteditcommons.INotificationService,
                    useClass: NotificationService
                },
                ProductService,
                smarteditcommons.moduleUtils.initialize(function (previewService) {
                    //
                }, [smarteditcommons.IPreviewService])
            ]
        })
    ], SmarteditServicesModule);
    return SmarteditServicesModule;
}());

/**
 * Service used to open a confirmation modal in which an end-user can confirm or cancel an action. A confirmation modal
 * consists of a title, content, and an OK and cancel button. This modal may be used in any context in which a
 * confirmation is required.
 */
var /* @ngInject */ ConfirmationModalService = /** @class */ (function () {
    ConfirmationModalService.$inject = ["modalService"];
    function /* @ngInject */ ConfirmationModalService(modalService) {
        this.modalService = modalService;
    }
    /* @ngInject */ ConfirmationModalService.prototype.confirm = function (configuration) {
        var validationMessage = this._validateConfirmationParameters(configuration.description, configuration.template, configuration.templateUrl);
        if (validationMessage) {
            return Promise.reject(validationMessage);
        }
        return this.isLegacyConfirm(configuration)
            ? this.angularJsConfirm(configuration)
            : this.angularConfirm(configuration);
    };
    ConfirmationModalService.prototype.confirm.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype.angularConfirm = function (configuration) {
        var ref = this.modalService.open({
            component: smarteditcommons.ConfirmDialogComponent,
            data: {
                description: configuration.description,
                descriptionPlaceholders: configuration.descriptionPlaceholders
            },
            config: {
                focusTrapped: false,
                modalPanelClass: 'se-confirmation-dialog',
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                container: document.querySelector('[uib-modal-window]') || 'body'
            },
            templateConfig: {
                title: configuration.title || 'se.confirmation.modal.title',
                buttons: this.getButtons(configuration),
                isDismissButtonVisible: true
            }
        });
        return new Promise(function (resolve, reject) {
            ref.afterClosed.subscribe(resolve, reject);
        });
    };
    ConfirmationModalService.prototype.angularConfirm.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype.angularJsConfirm = function (configuration) {
        return this.modalService.open({
            size: 'md',
            title: configuration.title || 'se.confirmation.modal.title',
            templateInline: configuration.template,
            templateUrl: configuration.templateUrl,
            controller: this._initializeControllerObjectWithScope(configuration),
            cssClasses: 'yFrontModal',
            buttons: this.getLegacyButtons(configuration)
        });
    };
    ConfirmationModalService.prototype.angularJsConfirm.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype.isLegacyConfirm = function (configuration) {
        var config = configuration;
        return !!config.template || !!config.templateUrl || !!config.scope;
    };
    ConfirmationModalService.prototype.isLegacyConfirm.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype.getLegacyButtons = function (configuration) {
        return [
            !configuration.showOkButtonOnly && {
                id: 'confirmCancel',
                label: 'se.confirmation.modal.cancel',
                style: smarteditcommons.ModalButtonStyles.Default,
                action: smarteditcommons.ModalButtonActions.Dismiss
            },
            {
                id: 'confirmOk',
                label: 'se.confirmation.modal.ok',
                action: smarteditcommons.ModalButtonActions.Close
            }
        ].filter(function (x) { return !!x; });
    };
    ConfirmationModalService.prototype.getLegacyButtons.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype.getButtons = function (configuration) {
        return [
            !configuration.showOkButtonOnly && {
                id: 'confirmCancel',
                label: 'se.confirmation.modal.cancel',
                style: smarteditcommons.FundamentalModalButtonStyle.Default,
                action: smarteditcommons.FundamentalModalButtonAction.Dismiss
            },
            {
                id: 'confirmOk',
                label: 'se.confirmation.modal.ok',
                style: smarteditcommons.FundamentalModalButtonStyle.Primary,
                action: smarteditcommons.FundamentalModalButtonAction.Close
            }
        ].filter(function (x) { return !!x; });
    };
    ConfirmationModalService.prototype.getButtons.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService.prototype._validateConfirmationParameters = function (description, template, templateUrl) {
        var checkMoreThanOnePropertySet = [description, template, templateUrl];
        var numOfProperties = checkMoreThanOnePropertySet.filter(function (property) { return property !== undefined; }).length;
        if (numOfProperties === 0) {
            return 'You must have one of the following configuration properties configured: description, template, or templateUrl';
        }
        else if (numOfProperties > 1) {
            return 'You have more than one of the following configuration properties configured: description, template, or templateUrl';
        }
        return undefined;
    };
    ConfirmationModalService.prototype._validateConfirmationParameters.$inject = ["description", "template", "templateUrl"];
    /* @ngInject */ ConfirmationModalService.prototype._initializeControllerObjectWithScope = function (configuration) {
        var config = configuration;
        return config.scope
            ? function () {
                for (var key in config.scope) {
                    if (config.scope.hasOwnProperty(key)) {
                        this[key] = config.scope[key];
                    }
                }
            }
            : undefined;
    };
    ConfirmationModalService.prototype._initializeControllerObjectWithScope.$inject = ["configuration"];
    /* @ngInject */ ConfirmationModalService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.IConfirmationModalService),
        smarteditcommons.GatewayProxied('confirm'),
        __metadata("design:paramtypes", [smarteditcommons.IModalService])
    ], /* @ngInject */ ConfirmationModalService);
    return /* @ngInject */ ConfirmationModalService;
}());

var ToolbarService = /** @class */ (function (_super) {
    __extends(ToolbarService, _super);
    function ToolbarService(gatewayId, gatewayProxy, logService, $templateCache, permissionService) {
        var _this = _super.call(this, logService, $templateCache, permissionService) || this;
        _this.gatewayId = gatewayId;
        _this.onAliasesChange = null;
        gatewayProxy.initForService(_this, [
            'addAliases',
            'removeItemByKey',
            'removeAliasByKey',
            '_removeItemOnInner',
            'triggerActionOnInner'
        ]);
        return _this;
    }
    ToolbarService.prototype.addAliases = function (aliases) {
        var _this = this;
        this.aliases = this.aliases.map(function (alias) { return _this.get(aliases, alias) || alias; });
        this.aliases = __spreadArrays((this.aliases || []), (aliases || []).filter(function (alias) { return !_this.get(_this.aliases, alias); }));
        this.aliases = this.sortAliases(this.aliases);
        if (this.onAliasesChange) {
            this.onAliasesChange(this.aliases);
        }
    };
    /**
     * This method removes the action and the aliases of the toolbar item identified by
     * the provided key.
     *
     * @param itemKey - Identifier of the toolbar item to remove.
     */
    ToolbarService.prototype.removeItemByKey = function (itemKey) {
        if (itemKey in this.actions) {
            delete this.actions[itemKey];
        }
        else {
            this._removeItemOnInner(itemKey);
        }
        this.removeAliasByKey(itemKey);
    };
    ToolbarService.prototype.removeAliasByKey = function (itemKey) {
        var aliasIndex = 0;
        for (; aliasIndex < this.aliases.length; aliasIndex++) {
            if (this.aliases[aliasIndex].key === itemKey) {
                break;
            }
        }
        if (aliasIndex < this.aliases.length) {
            this.aliases.splice(aliasIndex, 1);
        }
        if (this.onAliasesChange) {
            this.onAliasesChange(this.aliases);
        }
    };
    ToolbarService.prototype.setOnAliasesChange = function (onAliasesChange) {
        this.onAliasesChange = onAliasesChange;
    };
    ToolbarService.prototype.triggerAction = function (action) {
        if (action && this.actions[action.key]) {
            this.actions[action.key].call(action);
            return;
        }
        this.triggerActionOnInner(action);
    };
    ToolbarService.prototype.get = function (aliases, alias) {
        return aliases.find(function (_a) {
            var key = _a.key;
            return key === alias.key;
        });
    };
    ToolbarService.prototype.sortAliases = function (aliases) {
        var samePriority = false;
        var warning = 'In ' + this.gatewayId + ' the items ';
        var _section = null;
        var result = __spreadArrays((aliases || [])).sort(function (a, b) {
            if (a.priority === b.priority && a.section === b.section) {
                _section = a.section;
                warning += a.key + ' and ' + b.key + ' ';
                samePriority = true;
                return a.key > b.key ? 1 : -1; // or the opposite ?
            }
            return a.priority - b.priority;
        });
        if (samePriority) {
            this.logService.warn('WARNING: ' + warning + 'have the same priority withing section:' + _section);
        }
        return result;
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

window.__smartedit__.addDecoratorPayload("Component", "ToolbarComponent", {
    selector: 'se-toolbar',
    template: "<div class=\"se-toolbar\" [ngClass]=\"cssClass\"><div class=\"se-toolbar__left\"><div *ngFor=\"let item of aliases | seProperty:{section:'left'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__left {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__middle\"><div *ngFor=\"let item of aliases | seProperty:{section:'middle'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__middle {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__right\"><div *ngFor=\"let item of aliases | seProperty:{section:'right'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__right {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div></div>"
});
var /* @ngInject */ ToolbarComponent = /** @class */ (function () {
    ToolbarComponent.$inject = ["toolbarServiceFactory", "iframeClickDetectionService", "systemEventService", "injector", "cdr", "routingService"];
    function /* @ngInject */ ToolbarComponent(toolbarServiceFactory, iframeClickDetectionService, systemEventService, injector, cdr, routingService) {
        this.toolbarServiceFactory = toolbarServiceFactory;
        this.iframeClickDetectionService = iframeClickDetectionService;
        this.systemEventService = systemEventService;
        this.injector = injector;
        this.cdr = cdr;
        this.routingService = routingService;
        this.imageRoot = '';
        this.aliases = [];
        this.unregCloseActions = null;
        this.unregCloseAll = null;
        this.unregRecalcPermissions = null;
    }
    /* @ngInject */ ToolbarComponent_1 = /* @ngInject */ ToolbarComponent;
    /* @ngInject */ ToolbarComponent.prototype.ngOnInit = function () {
        this.setup();
    };
    /* @ngInject */ ToolbarComponent.prototype.ngOnDestroy = function () {
        this.unregCloseActions();
        this.unregCloseAll();
        this.unregRecalcPermissions();
    };
    /* @ngInject */ ToolbarComponent.prototype.triggerAction = function (action, $event) {
        $event.preventDefault();
        this.toolbarService.triggerAction(action);
    };
    ToolbarComponent.prototype.triggerAction.$inject = ["action", "$event"];
    /* @ngInject */ ToolbarComponent.prototype.getItemVisibility = function (item) {
        return (item.include || item.component) && (item.isOpen || item.keepAliveOnClose);
    };
    ToolbarComponent.prototype.getItemVisibility.$inject = ["item"];
    /* @ngInject */ ToolbarComponent.prototype.isOnStorefront = function () {
        return this.routingService.absUrl().includes(smarteditcommons.STORE_FRONT_CONTEXT);
    };
    /* @ngInject */ ToolbarComponent.prototype.createLegacyController = function () {
        var _this = this;
        return {
            alias: '$ctrl',
            value: function () { return _this; }
        };
    };
    /* @ngInject */ ToolbarComponent.prototype.createInjector = function (item) {
        return core.Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: smarteditcommons.TOOLBAR_ITEM,
                    useValue: item
                }
            ]
        });
    };
    ToolbarComponent.prototype.createInjector.$inject = ["item"];
    /* @ngInject */ ToolbarComponent.prototype.trackByFn = function (_, item) {
        return item.key;
    };
    ToolbarComponent.prototype.trackByFn.$inject = ["_", "item"];
    /* @ngInject */ ToolbarComponent.prototype.closeAllActionItems = function () {
        this.aliases.forEach(function (alias) {
            alias.isOpen = false;
        });
    };
    /* @ngInject */ ToolbarComponent.prototype.populatePermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = this.aliases.map(function (alias) {
                            return _this.toolbarService._populateIsPermissionGranted(alias);
                        });
                        _a = this;
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.aliases = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ ToolbarComponent.prototype.setup = function () {
        this.buildAliases();
        this.populatePermissions();
        this.registerCallbacks();
    };
    /* @ngInject */ ToolbarComponent.prototype.buildAliases = function () {
        var _this = this;
        this.toolbarService = this.toolbarServiceFactory.getToolbarService(this.toolbarName);
        this.toolbarService.setOnAliasesChange(function (aliases) {
            _this.aliases = aliases;
            if (!_this.cdr.destroyed) {
                _this.cdr.detectChanges();
            }
        });
        this.aliases = this.toolbarService.getAliases();
    };
    /* @ngInject */ ToolbarComponent.prototype.registerCallbacks = function () {
        var _this = this;
        this.unregCloseActions = this.iframeClickDetectionService.registerCallback(/* @ngInject */ ToolbarComponent_1.CLOSE_ALL_ACTION_ITEMS + this.toolbarName, function () { return _this.closeAllActionItems(); });
        this.unregCloseAll = this.systemEventService.subscribe(smarteditcommons.EVENTS.PAGE_SELECTED, function () {
            return _this.closeAllActionItems();
        });
        this.unregRecalcPermissions = this.systemEventService.subscribe(smarteditcommons.EVENTS.PERMISSION_CACHE_CLEANED, function () { return _this.populatePermissions(); });
    };
    var /* @ngInject */ ToolbarComponent_1;
    /* @ngInject */ ToolbarComponent.CLOSE_ALL_ACTION_ITEMS = 'closeAllActionItems';
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ ToolbarComponent.prototype, "cssClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ ToolbarComponent.prototype, "toolbarName", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ToolbarComponent.prototype, "imageRoot", void 0);
    /* @ngInject */ ToolbarComponent = /* @ngInject */ ToolbarComponent_1 = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-toolbar',
            template: "<div class=\"se-toolbar\" [ngClass]=\"cssClass\"><div class=\"se-toolbar__left\"><div *ngFor=\"let item of aliases | seProperty:{section:'left'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__left {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__middle\"><div *ngFor=\"let item of aliases | seProperty:{section:'middle'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__middle {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div><div class=\"se-toolbar__right\"><div *ngFor=\"let item of aliases | seProperty:{section:'right'}; trackBy: trackByFn\" class=\"se-template-toolbar se-template-toolbar__right {{item.className}}\"><se-toolbar-section-item [item]=\"item\"></se-toolbar-section-item></div></div></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.IToolbarServiceFactory,
            smarteditcommons.IIframeClickDetectionService,
            smarteditcommons.SystemEventService,
            core.Injector,
            core.ChangeDetectorRef,
            smarteditcommons.SmarteditRoutingService])
    ], /* @ngInject */ ToolbarComponent);
    return /* @ngInject */ ToolbarComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ToolbarActionComponent", {
    selector: 'se-toolbar-action',
    template: "<div *ngIf=\"item.isPermissionGranted\"><div *ngIf=\"item.type == type.ACTION\" class=\"toolbar-action\"><button type=\"button\" [ngClass]=\"{\n                'toolbar-action--button--compact': isCompact,\n                'toolbar-action--button': !isCompact\n            }\" class=\"btn\" (click)=\"toolbar.triggerAction(item, $event)\" [attr.aria-pressed]=\"false\" [attr.aria-haspopup]=\"true\" [attr.aria-expanded]=\"false\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn\"><span *ngIf=\"item.iconClassName\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_iconclass\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_lbl\">{{item.name | translate}}</span></button></div><fd-popover class=\"se-toolbar-action__wrapper toolbar-action toolbar-action--hybrid\" *ngIf=\"item.type === type.HYBRID_ACTION\" [attr.data-item-key]=\"item.key\" [triggers]=\"['click']\" [noArrow]=\"false\" [isOpen]=\"item.isOpen\" (isOpenChange)=\"onOpenChange()\" [placement]=\"placement\" seClickOutside (clickOutside)=\"onOutsideClicked()\"><fd-popover-control><button *ngIf=\"item.iconClassName || item.icons\" type=\"button\" class=\"btn\" [ngClass]=\"{\n                    'toolbar-action--button--compact': isCompact,\n                    'toolbar-action--button': !isCompact\n                }\" [disabled]=\"disabled\" [attr.aria-pressed]=\"false \" (click)=\"toolbar.triggerAction(item, $event)\"><span *ngIf=\"item.iconClassName\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\">{{item.name | translate}}</span></button></fd-popover-control><fd-popover-body class=\"se-toolbar-action__body\" [ngClass]=\"{\n                'toolbar-action--include--compact': isCompact,\n                'toolbar-action--include': !isCompact\n              \n            }\"><se-prevent-vertical-overflow><div *ngIf=\"toolbar.getItemVisibility(item) && item.include\" [ngInclude]=\"item.include\" [scope]=\"{ item: item }\" [compileHtmlNgController]=\"legacyController\"></div><ng-container *ngIf=\"toolbar.getItemVisibility(item) && item.component\"><ng-container *ngComponentOutlet=\"item.component; injector: actionInjector\"></ng-container></ng-container></se-prevent-vertical-overflow></fd-popover-body></fd-popover></div>"
});
var ToolbarActionComponent = /** @class */ (function () {
    function ToolbarActionComponent(toolbar) {
        this.toolbar = toolbar;
        this.type = smarteditcommons.ToolbarItemType;
    }
    ToolbarActionComponent.prototype.ngOnInit = function () {
        this.setup();
    };
    ToolbarActionComponent.prototype.ngOnChanges = function (changes) {
        if (changes.item) {
            this.setup();
        }
    };
    Object.defineProperty(ToolbarActionComponent.prototype, "isCompact", {
        get: function () {
            return this.item.actionButtonFormat === 'compact';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarActionComponent.prototype, "placement", {
        get: function () {
            if (this.item.section === smarteditcommons.ToolbarSection.left ||
                this.item.section === smarteditcommons.ToolbarSection.middle) {
                return 'bottom-start';
            }
            else if (this.item.section === smarteditcommons.ToolbarSection.right) {
                return 'bottom-end';
            }
            switch (this.item.dropdownPosition) {
                case smarteditcommons.ToolbarDropDownPosition.left:
                    return 'bottom-start';
                case smarteditcommons.ToolbarDropDownPosition.right:
                    return 'bottom-end';
                default:
                    return 'bottom';
            }
        },
        enumerable: false,
        configurable: true
    });
    ToolbarActionComponent.prototype.onOutsideClicked = function () {
        this.item.isOpen = false;
    };
    ToolbarActionComponent.prototype.onOpenChange = function () {
        this.item.isOpen = !this.item.isOpen;
    };
    ToolbarActionComponent.prototype.setup = function () {
        this.legacyController = this.toolbar.createLegacyController();
        this.actionInjector = this.toolbar.createInjector(this.item);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], ToolbarActionComponent.prototype, "item", void 0);
    ToolbarActionComponent = __decorate([
        core.Component({
            selector: 'se-toolbar-action',
            template: "<div *ngIf=\"item.isPermissionGranted\"><div *ngIf=\"item.type == type.ACTION\" class=\"toolbar-action\"><button type=\"button\" [ngClass]=\"{\n                'toolbar-action--button--compact': isCompact,\n                'toolbar-action--button': !isCompact\n            }\" class=\"btn\" (click)=\"toolbar.triggerAction(item, $event)\" [attr.aria-pressed]=\"false\" [attr.aria-haspopup]=\"true\" [attr.aria-expanded]=\"false\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn\"><span *ngIf=\"item.iconClassName\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_iconclass\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}_btn_lbl\">{{item.name | translate}}</span></button></div><fd-popover class=\"se-toolbar-action__wrapper toolbar-action toolbar-action--hybrid\" *ngIf=\"item.type === type.HYBRID_ACTION\" [attr.data-item-key]=\"item.key\" [triggers]=\"['click']\" [noArrow]=\"false\" [isOpen]=\"item.isOpen\" (isOpenChange)=\"onOpenChange()\" [placement]=\"placement\" seClickOutside (clickOutside)=\"onOutsideClicked()\"><fd-popover-control><button *ngIf=\"item.iconClassName || item.icons\" type=\"button\" class=\"btn\" [ngClass]=\"{\n                    'toolbar-action--button--compact': isCompact,\n                    'toolbar-action--button': !isCompact\n                }\" [disabled]=\"disabled\" [attr.aria-pressed]=\"false \" (click)=\"toolbar.triggerAction(item, $event)\"><span *ngIf=\"item.iconClassName\" class=\"{{item.iconClassName}}\" [ngClass]=\"{ 'se-toolbar-actions__icon': isCompact }\"></span> <img *ngIf=\"!item.iconClassName && item.icons\" id=\"{{toolbar.toolbarName}}_option_{{item.key}}\" src=\"{{toolbar.imageRoot}}{{item.icons[0]}}\" class=\"file\" title=\"{{item.name | translate}}\" alt=\"{{item.name | translate}}\"/> <span *ngIf=\"!isCompact\" class=\"toolbar-action-button__txt\">{{item.name | translate}}</span></button></fd-popover-control><fd-popover-body class=\"se-toolbar-action__body\" [ngClass]=\"{\n                'toolbar-action--include--compact': isCompact,\n                'toolbar-action--include': !isCompact\n              \n            }\"><se-prevent-vertical-overflow><div *ngIf=\"toolbar.getItemVisibility(item) && item.include\" [ngInclude]=\"item.include\" [scope]=\"{ item: item }\" [compileHtmlNgController]=\"legacyController\"></div><ng-container *ngIf=\"toolbar.getItemVisibility(item) && item.component\"><ng-container *ngComponentOutlet=\"item.component; injector: actionInjector\"></ng-container></ng-container></se-prevent-vertical-overflow></fd-popover-body></fd-popover></div>"
        }),
        __param(0, core.Inject(core.forwardRef(function () { return ToolbarComponent; }))),
        __metadata("design:paramtypes", [ToolbarComponent])
    ], ToolbarActionComponent);
    return ToolbarActionComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ToolbarActionOutletComponent", {
    selector: 'se-toolbar-action-outlet',
    template: "\n        <div\n            class=\"se-template-toolbar__action-template\"\n            [ngClass]=\"{\n                'se-toolbar-action': isSectionRight,\n                'se-toolbar-action--active': isSectionRight && isPermitionGranted\n            }\"\n        >\n            <!-- AngularJS TEMPLATE type-->\n\n            <div\n                *ngIf=\"item.include && item.type === type.TEMPLATE\"\n                [ngInclude]=\"item.include\"\n                [compileHtmlNgController]=\"legacyController\"\n                [scope]=\"{ item: item }\"\n            ></div>\n\n            <!-- Angular TEMPLATE type-->\n\n            <ng-container *ngIf=\"item.component && item.type === type.TEMPLATE\">\n                <ng-container\n                    *ngComponentOutlet=\"item.component; injector: actionInjector\"\n                ></ng-container>\n            </ng-container>\n\n            <!--ACTION and HYBRID_ACTION types-->\n\n            <div *ngIf=\"!item.include || item.type !== type.TEMPLATE\">\n                <se-toolbar-action [item]=\"item\"></se-toolbar-action>\n            </div>\n        </div>\n    "
});
/** @internal  */
var ToolbarActionOutletComponent = /** @class */ (function () {
    function ToolbarActionOutletComponent(toolbar) {
        this.toolbar = toolbar;
        this.type = smarteditcommons.ToolbarItemType;
    }
    ToolbarActionOutletComponent.prototype.ngOnInit = function () {
        this.setup();
    };
    ToolbarActionOutletComponent.prototype.ngOnChanges = function (changes) {
        if (changes.item) {
            this.setup();
        }
    };
    Object.defineProperty(ToolbarActionOutletComponent.prototype, "isSectionRight", {
        get: function () {
            return this.item.section === smarteditcommons.ToolbarSection.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToolbarActionOutletComponent.prototype, "isPermitionGranted", {
        get: function () {
            return this.item.isPermissionGranted;
        },
        enumerable: false,
        configurable: true
    });
    ToolbarActionOutletComponent.prototype.setup = function () {
        this.legacyController = this.toolbar.createLegacyController();
        this.actionInjector = this.toolbar.createInjector(this.item);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], ToolbarActionOutletComponent.prototype, "item", void 0);
    ToolbarActionOutletComponent = __decorate([
        core.Component({
            selector: 'se-toolbar-action-outlet',
            template: "\n        <div\n            class=\"se-template-toolbar__action-template\"\n            [ngClass]=\"{\n                'se-toolbar-action': isSectionRight,\n                'se-toolbar-action--active': isSectionRight && isPermitionGranted\n            }\"\n        >\n            <!-- AngularJS TEMPLATE type-->\n\n            <div\n                *ngIf=\"item.include && item.type === type.TEMPLATE\"\n                [ngInclude]=\"item.include\"\n                [compileHtmlNgController]=\"legacyController\"\n                [scope]=\"{ item: item }\"\n            ></div>\n\n            <!-- Angular TEMPLATE type-->\n\n            <ng-container *ngIf=\"item.component && item.type === type.TEMPLATE\">\n                <ng-container\n                    *ngComponentOutlet=\"item.component; injector: actionInjector\"\n                ></ng-container>\n            </ng-container>\n\n            <!--ACTION and HYBRID_ACTION types-->\n\n            <div *ngIf=\"!item.include || item.type !== type.TEMPLATE\">\n                <se-toolbar-action [item]=\"item\"></se-toolbar-action>\n            </div>\n        </div>\n    "
        }),
        __param(0, core.Inject(core.forwardRef(function () { return ToolbarComponent; }))),
        __metadata("design:paramtypes", [ToolbarComponent])
    ], ToolbarActionOutletComponent);
    return ToolbarActionOutletComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ToolbarItemContextComponent", {
    selector: 'se-toolbar-item-context',
    template: "\n        <div\n            *ngIf=\"displayContext\"\n            id=\"toolbar_item_context_{{ itemKey }}_btn\"\n            class=\"se-toolbar-actionable-item-context\"\n            [ngClass]=\"{ 'se-toolbar-actionable-item-context--open': isOpen }\"\n        >\n            <!-- AngularJS -->\n\n            <div\n                *ngIf=\"contextTemplateUrl\"\n                class=\"se-toolbar-actionable-context__btn\"\n                [ngInclude]=\"contextTemplateUrl\"\n            ></div>\n\n            <!-- Angular -->\n\n            <div *ngIf=\"contextComponent\" class=\"se-toolbar-actionable-context__btn\">\n                <ng-container *ngComponentOutlet=\"contextComponent\"></ng-container>\n            </div>\n        </div>\n    "
});
/** @internal  */
var ToolbarItemContextComponent = /** @class */ (function () {
    function ToolbarItemContextComponent(crossFrameEventService) {
        this.crossFrameEventService = crossFrameEventService;
        this.displayContext = false;
    }
    ToolbarItemContextComponent.prototype.ngOnInit = function () {
        this.registerCallbacks();
    };
    ToolbarItemContextComponent.prototype.ngOnDestroy = function () {
        this.unregShowContext();
        this.unregHideContext();
    };
    ToolbarItemContextComponent.prototype.showContext = function (show) {
        this.displayContext = show;
    };
    ToolbarItemContextComponent.prototype.registerCallbacks = function () {
        var _this = this;
        this.unregShowContext = this.crossFrameEventService.subscribe(smarteditcommons.SHOW_TOOLBAR_ITEM_CONTEXT, function (eventId, itemKey) {
            if (itemKey === _this.itemKey) {
                _this.showContext(true);
            }
        });
        this.unregHideContext = this.crossFrameEventService.subscribe(smarteditcommons.HIDE_TOOLBAR_ITEM_CONTEXT, function (eventId, itemKey) {
            if (itemKey === _this.itemKey) {
                _this.showContext(false);
            }
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], ToolbarItemContextComponent.prototype, "itemKey", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], ToolbarItemContextComponent.prototype, "isOpen", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], ToolbarItemContextComponent.prototype, "contextTemplateUrl", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", core.Type)
    ], ToolbarItemContextComponent.prototype, "contextComponent", void 0);
    ToolbarItemContextComponent = __decorate([
        core.Component({
            selector: 'se-toolbar-item-context',
            template: "\n        <div\n            *ngIf=\"displayContext\"\n            id=\"toolbar_item_context_{{ itemKey }}_btn\"\n            class=\"se-toolbar-actionable-item-context\"\n            [ngClass]=\"{ 'se-toolbar-actionable-item-context--open': isOpen }\"\n        >\n            <!-- AngularJS -->\n\n            <div\n                *ngIf=\"contextTemplateUrl\"\n                class=\"se-toolbar-actionable-context__btn\"\n                [ngInclude]=\"contextTemplateUrl\"\n            ></div>\n\n            <!-- Angular -->\n\n            <div *ngIf=\"contextComponent\" class=\"se-toolbar-actionable-context__btn\">\n                <ng-container *ngComponentOutlet=\"contextComponent\"></ng-container>\n            </div>\n        </div>\n    "
        }),
        __param(0, core.Inject(smarteditcommons.EVENT_SERVICE)),
        __metadata("design:paramtypes", [smarteditcommons.CrossFrameEventService])
    ], ToolbarItemContextComponent);
    return ToolbarItemContextComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ToolbarSectionItemComponent", {
    selector: 'se-toolbar-section-item',
    host: {
        class: 'se-toolbar-section-item'
    },
    template: "\n        <se-toolbar-action-outlet [item]=\"item\"></se-toolbar-action-outlet>\n        <se-toolbar-item-context\n            *ngIf=\"item.contextTemplateUrl || item.contextComponent\"\n            class=\"se-template-toolbar__context-template\"\n            [attr.data-item-key]=\"item.key\"\n            [itemKey]=\"item.key\"\n            [isOpen]=\"item.isOpen\"\n            [contextTemplateUrl]=\"item.contextTemplateUrl\"\n            [contextComponent]=\"item.contextComponent\"\n        ></se-toolbar-item-context>\n    "
});
/** @internal  */
var ToolbarSectionItemComponent = /** @class */ (function () {
    function ToolbarSectionItemComponent() {
    }
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], ToolbarSectionItemComponent.prototype, "item", void 0);
    ToolbarSectionItemComponent = __decorate([
        core.Component({
            selector: 'se-toolbar-section-item',
            host: {
                class: 'se-toolbar-section-item'
            },
            template: "\n        <se-toolbar-action-outlet [item]=\"item\"></se-toolbar-action-outlet>\n        <se-toolbar-item-context\n            *ngIf=\"item.contextTemplateUrl || item.contextComponent\"\n            class=\"se-template-toolbar__context-template\"\n            [attr.data-item-key]=\"item.key\"\n            [itemKey]=\"item.key\"\n            [isOpen]=\"item.isOpen\"\n            [contextTemplateUrl]=\"item.contextTemplateUrl\"\n            [contextComponent]=\"item.contextComponent\"\n        ></se-toolbar-item-context>\n    "
        })
    ], ToolbarSectionItemComponent);
    return ToolbarSectionItemComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "DeviceSupportWrapperComponent", {
    selector: 'se-device-support-wrapper',
    template: "\n        <inflection-point-selector\n            *ngIf=\"toolbar.isOnStorefront()\"\n            class=\"toolbar-action\"\n        ></inflection-point-selector>\n    "
});
var DeviceSupportWrapperComponent = /** @class */ (function () {
    function DeviceSupportWrapperComponent(toolbar) {
        this.toolbar = toolbar;
    }
    DeviceSupportWrapperComponent = __decorate([
        core.Component({
            selector: 'se-device-support-wrapper',
            template: "\n        <inflection-point-selector\n            *ngIf=\"toolbar.isOnStorefront()\"\n            class=\"toolbar-action\"\n        ></inflection-point-selector>\n    "
        }),
        __param(0, core.Inject(core.forwardRef(function () { return ToolbarComponent; }))),
        __metadata("design:paramtypes", [ToolbarComponent])
    ], DeviceSupportWrapperComponent);
    return DeviceSupportWrapperComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ExperienceSelectorButtonComponent", {
    selector: 'se-experience-selector-button',
    template: "<fd-popover class=\"se-experience-selector\" [(isOpen)]=\"status.isOpen\" (isOpenChange)=\"resetExperienceSelector()\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" [placement]=\"'bottom-end'\"><fd-popover-control><div class=\"se-experience-selector__control\"><se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isCurrentPageFromParent\" class=\"se-experience-selector__tooltip\"><span se-tooltip-trigger class=\"se-experience-selector__btn--globe\"><span class=\"hyicon hyicon-globe se-experience-selector__btn--globe--icon\"></span></span><div se-tooltip-body>{{ parentCatalogVersion }}</div></se-tooltip><button class=\"se-experience-selector__btn\" id=\"experience-selector-btn\"><span [attr.title]=\"buildExperienceText()\" class=\"se-experience-selector__btn-text se-nowrap-ellipsis\">{{ buildExperienceText() }} </span><span class=\"se-experience-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><div class=\"se-experience-selector__dropdown fd-modal fd-modal__content\" role=\"menu\"><se-experience-selector [experience]=\"experience\" [dropdownStatus]=\"status\" [(resetExperienceSelector)]=\"resetExperienceSelector\"></se-experience-selector></div></fd-popover-body></fd-popover>"
});
var /* @ngInject */ ExperienceSelectorButtonComponent = /** @class */ (function () {
    ExperienceSelectorButtonComponent.$inject = ["systemEventService", "crossFrameEventService", "locale", "sharedDataService", "languageService"];
    function /* @ngInject */ ExperienceSelectorButtonComponent(systemEventService, crossFrameEventService, locale, sharedDataService, languageService) {
        this.systemEventService = systemEventService;
        this.crossFrameEventService = crossFrameEventService;
        this.locale = locale;
        this.sharedDataService = sharedDataService;
        this.languageService = languageService;
        this.status = { isOpen: false };
        this.isCurrentPageFromParent = false;
        this.l10nFilter = smarteditcommons.setupL10nFilter(this.languageService, crossFrameEventService);
    }
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateExperience();
        this.unregFn = this.systemEventService.subscribe(smarteditcommons.EVENTS.EXPERIENCE_UPDATE, function () {
            return _this.updateExperience();
        });
        this.unRegNewPageContextEventFn = this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.PAGE_CHANGE, function (eventId, data) { return _this.setPageFromParent(data); });
    };
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype.ngOnDestroy = function () {
        this.unregFn();
        this.unRegNewPageContextEventFn();
    };
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype.updateExperience = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)];
                    case 1:
                        _a.experience = (_b.sent());
                        return [2 /*return*/];
                }
            });
        });
    };
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype.buildExperienceText = function () {
        if (!this.experience) {
            return '';
        }
        var _a = this.experience, _b = _a.catalogDescriptor, name = _b.name, catalogVersion = _b.catalogVersion, nativeName = _a.languageDescriptor.nativeName, time = _a.time;
        var pipe = new common.DatePipe(this.locale);
        var transformedTime = time
            ? "  |  " + pipe.transform(moment(time).isValid() ? time : moment.now(), smarteditcommons.DATE_CONSTANTS.ANGULAR_SHORT)
            : '';
        return this.l10nFilter(name) + " - " + catalogVersion + "  |  " + nativeName + transformedTime + this._returnProductCatalogVersionTextByUuids();
    };
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype.setPageFromParent = function (data) {
        var _a = data.pageContext, catalogName = _a.catalogName, catalogVersion = _a.catalogVersion, pageContextCatalogVersionUuid = _a.catalogVersionUuid, catalogDescriptorCatalogVersionUuid = data.catalogDescriptor.catalogVersionUuid;
        this.parentCatalogVersion = this.l10nFilter(catalogName) + " (" + catalogVersion + ")";
        this.isCurrentPageFromParent =
            catalogDescriptorCatalogVersionUuid !== pageContextCatalogVersionUuid;
    };
    ExperienceSelectorButtonComponent.prototype.setPageFromParent.$inject = ["data"];
    /* @ngInject */ ExperienceSelectorButtonComponent.prototype._returnProductCatalogVersionTextByUuids = function () {
        var _this = this;
        var productCatalogVersions = this.experience.productCatalogVersions;
        return productCatalogVersions.reduce(function (acc, _a) {
            var catalogName = _a.catalogName, catalogVersion = _a.catalogVersion;
            return acc + " | " + _this.l10nFilter(catalogName) + " (" + catalogVersion + ")";
        }, '');
    };
    /* @ngInject */ ExperienceSelectorButtonComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-experience-selector-button',
            template: "<fd-popover class=\"se-experience-selector\" [(isOpen)]=\"status.isOpen\" (isOpenChange)=\"resetExperienceSelector()\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" [placement]=\"'bottom-end'\"><fd-popover-control><div class=\"se-experience-selector__control\"><se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isCurrentPageFromParent\" class=\"se-experience-selector__tooltip\"><span se-tooltip-trigger class=\"se-experience-selector__btn--globe\"><span class=\"hyicon hyicon-globe se-experience-selector__btn--globe--icon\"></span></span><div se-tooltip-body>{{ parentCatalogVersion }}</div></se-tooltip><button class=\"se-experience-selector__btn\" id=\"experience-selector-btn\"><span [attr.title]=\"buildExperienceText()\" class=\"se-experience-selector__btn-text se-nowrap-ellipsis\">{{ buildExperienceText() }} </span><span class=\"se-experience-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><div class=\"se-experience-selector__dropdown fd-modal fd-modal__content\" role=\"menu\"><se-experience-selector [experience]=\"experience\" [dropdownStatus]=\"status\" [(resetExperienceSelector)]=\"resetExperienceSelector\"></se-experience-selector></div></fd-popover-body></fd-popover>"
        }),
        __param(2, core.Inject(core.LOCALE_ID)),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService,
            smarteditcommons.CrossFrameEventService, String, smarteditcommons.ISharedDataService,
            smarteditcommons.LanguageService])
    ], /* @ngInject */ ExperienceSelectorButtonComponent);
    return /* @ngInject */ ExperienceSelectorButtonComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "InflectionPointSelectorComponent", {
    selector: 'inflection-point-selector',
    template: "<div class=\"se-inflection-point dropdown\" [class.open]=\"isOpen\" id=\"inflectionPtDropdown\"><button type=\"button\" class=\"se-inflection-point__toggle\" (click)=\"toggleDropdown($event)\" aria-pressed=\"false\" [attr.aria-expanded]=\"isOpen\"><span [ngClass]=\"getIconClass()\" class=\"se-inflection-point___selected\"></span></button><div class=\"se-inflection-point-dropdown\"><nav class=\"fd-menu\"><ul class=\"fd-menu__list\" role=\"menu\"><li *ngFor=\"let choice of points\" class=\"fd-menu__item inflection-point__device\" [ngClass]=\"{selected: isSelected(choice)}\" id=\"se-device-{{choice.type}}\" (click)=\"selectPoint(choice)\"><span [ngClass]=\"getIconClass(choice)\"></span></li></ul></nav></div></div>"
});
var /* @ngInject */ InflectionPointSelectorComponent = /** @class */ (function () {
    InflectionPointSelectorComponent.$inject = ["systemEventService", "iframeManagerService", "iframeClickDetectionService", "yjQuery"];
    function /* @ngInject */ InflectionPointSelectorComponent(systemEventService, iframeManagerService, iframeClickDetectionService, yjQuery) {
        this.systemEventService = systemEventService;
        this.iframeManagerService = iframeManagerService;
        this.iframeClickDetectionService = iframeClickDetectionService;
        this.yjQuery = yjQuery;
        this.currentPointSelected = DEVICE_SUPPORTS.find(function (deviceSupport) { return deviceSupport.default; });
        this.points = DEVICE_SUPPORTS;
        this.isOpen = false;
    }
    /* @ngInject */ InflectionPointSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iframeClickDetectionService.registerCallback('inflectionPointClose', function () { return (_this.isOpen = false); });
        var window = smarteditcommons.windowUtils.getWindow();
        this.documentClick$ = rxjs.fromEvent(window.document, 'click')
            .pipe(operators.filter(function (event) {
            return _this.yjQuery(event.target).parents('inflection-point-selector').length <=
                0 && _this.isOpen;
        }))
            .subscribe(function (event) { return (_this.isOpen = false); });
        this.unRegFn = this.systemEventService.subscribe(smarteditcommons.OVERLAY_DISABLED_EVENT, function () { return (_this.isOpen = false); });
    };
    /* @ngInject */ InflectionPointSelectorComponent.prototype.ngOnDestroy = function () {
        this.unRegFn();
        this.documentClick$.unsubscribe();
    };
    /* @ngInject */ InflectionPointSelectorComponent.prototype.selectPoint = function (choice) {
        this.currentPointSelected = choice;
        this.isOpen = !this.isOpen;
        if (choice !== undefined) {
            this.iframeManagerService.apply(choice);
        }
    };
    InflectionPointSelectorComponent.prototype.selectPoint.$inject = ["choice"];
    /* @ngInject */ InflectionPointSelectorComponent.prototype.toggleDropdown = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    };
    InflectionPointSelectorComponent.prototype.toggleDropdown.$inject = ["event"];
    /* @ngInject */ InflectionPointSelectorComponent.prototype.getIconClass = function (choice) {
        if (choice !== undefined) {
            return choice.iconClass;
        }
        else {
            return this.currentPointSelected.iconClass;
        }
    };
    InflectionPointSelectorComponent.prototype.getIconClass.$inject = ["choice"];
    /* @ngInject */ InflectionPointSelectorComponent.prototype.isSelected = function (choice) {
        if (choice !== undefined) {
            return choice.type === this.currentPointSelected.type;
        }
        return false;
    };
    InflectionPointSelectorComponent.prototype.isSelected.$inject = ["choice"];
    /* @ngInject */ InflectionPointSelectorComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'inflection-point-selector',
            template: "<div class=\"se-inflection-point dropdown\" [class.open]=\"isOpen\" id=\"inflectionPtDropdown\"><button type=\"button\" class=\"se-inflection-point__toggle\" (click)=\"toggleDropdown($event)\" aria-pressed=\"false\" [attr.aria-expanded]=\"isOpen\"><span [ngClass]=\"getIconClass()\" class=\"se-inflection-point___selected\"></span></button><div class=\"se-inflection-point-dropdown\"><nav class=\"fd-menu\"><ul class=\"fd-menu__list\" role=\"menu\"><li *ngFor=\"let choice of points\" class=\"fd-menu__item inflection-point__device\" [ngClass]=\"{selected: isSelected(choice)}\" id=\"se-device-{{choice.type}}\" (click)=\"selectPoint(choice)\"><span [ngClass]=\"getIconClass(choice)\"></span></li></ul></nav></div></div>"
        }),
        __param(2, core.Inject(smarteditcommons.IIframeClickDetectionService)),
        __param(3, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService,
            IframeManagerService,
            IframeClickDetectionService, Function])
    ], /* @ngInject */ InflectionPointSelectorComponent);
    return /* @ngInject */ InflectionPointSelectorComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ExperienceSelectorComponent", {
    selector: 'se-experience-selector',
    template: "<se-generic-editor *ngIf=\"isReady\" [smarteditComponentType]=\"smarteditComponentType\" [smarteditComponentId]=\"smarteditComponentId\" [structureApi]=\"structureApi\" [content]=\"content\" [contentApi]=\"contentApi\" (getApi)=\"getApi($event)\"></se-generic-editor>",
    providers: [smarteditcommons.L10nPipe]
});
var /* @ngInject */ ExperienceSelectorComponent = /** @class */ (function () {
    ExperienceSelectorComponent.$inject = ["systemEventService", "siteService", "sharedDataService", "iframeClickDetectionService", "iframeManagerService", "experienceService", "catalogService", "l10nPipe"];
    function /* @ngInject */ ExperienceSelectorComponent(systemEventService, siteService, sharedDataService, iframeClickDetectionService, iframeManagerService, experienceService, catalogService, l10nPipe) {
        this.systemEventService = systemEventService;
        this.siteService = siteService;
        this.sharedDataService = sharedDataService;
        this.iframeClickDetectionService = iframeClickDetectionService;
        this.iframeManagerService = iframeManagerService;
        this.experienceService = experienceService;
        this.catalogService = catalogService;
        this.l10nPipe = l10nPipe;
        this.resetExperienceSelectorChange = new core.EventEmitter();
        this.modalHeaderTitle = 'se.experience.selector.header';
        this.siteCatalogs = {};
    }
    /* @ngInject */ ExperienceSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.resetExperienceSelectorChange.emit(function () { return _this.resetExperienceSelectorFn(); });
        });
        this.unRegCloseExperienceFn = this.iframeClickDetectionService.registerCallback('closeExperienceSelector', function () {
            if (_this.dropdownStatus && _this.dropdownStatus.isOpen) {
                _this.dropdownStatus.isOpen = false;
            }
        });
        this.unRegFn = this.systemEventService.subscribe('OVERLAY_DISABLED', function () {
            if (_this.dropdownStatus && _this.dropdownStatus.isOpen) {
                _this.dropdownStatus.isOpen = false;
            }
        });
    };
    /* @ngInject */ ExperienceSelectorComponent.prototype.ngOnDestroy = function () {
        if (this.unRegFn) {
            this.unRegFn();
        }
        if (this.unRegCloseExperienceFn) {
            this.unRegCloseExperienceFn();
        }
    };
    /* @ngInject */ ExperienceSelectorComponent.prototype.preparePayload = function (experienceContent) {
        return __awaiter(this, void 0, void 0, function () {
            var productCatalogs, domain, _a, previewUrl, siteId, language, time, pageId, productCatalogVersions;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = experienceContent.previewCatalog.split('|'), this.siteCatalogs.siteId = _b[0], this.siteCatalogs.catalogId = _b[1], this.siteCatalogs.catalogVersion = _b[2];
                        return [4 /*yield*/, this.catalogService.getProductCatalogsForSite(this.siteCatalogs.siteId)];
                    case 1:
                        productCatalogs = _c.sent();
                        return [4 /*yield*/, this.sharedDataService.get('configuration')];
                    case 2:
                        domain = (_c.sent()).domain;
                        return [4 /*yield*/, this.siteService.getSiteById(this.siteCatalogs.siteId)];
                    case 3:
                        _a = _c.sent(), previewUrl = _a.previewUrl, siteId = _a.uid;
                        language = experienceContent.language, time = experienceContent.time, pageId = experienceContent.pageId, productCatalogVersions = experienceContent.productCatalogVersions;
                        this.siteCatalogs.productCatalogs = productCatalogs;
                        this.siteCatalogs.productCatalogVersions = productCatalogVersions;
                        return [2 /*return*/, __assign(__assign({}, experienceContent), { resourcePath: smarteditcommons.urlUtils.getAbsoluteURL(domain, previewUrl), catalogVersions: __spreadArrays(this._getProductCatalogsByUuids(productCatalogVersions), [
                                    {
                                        catalog: this.siteCatalogs.catalogId,
                                        catalogVersion: this.siteCatalogs.catalogVersion
                                    }
                                ]), siteId: siteId,
                                language: language,
                                time: time,
                                pageId: pageId })];
                }
            });
        });
    };
    ExperienceSelectorComponent.prototype.preparePayload.$inject = ["experienceContent"];
    /* @ngInject */ ExperienceSelectorComponent.prototype.updateCallback = function (payload, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, siteId, catalogId, catalogVersion, productCatalogVersions, time, pageId, language, ticketId, experienceParams, experience;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.siteCatalogs, siteId = _a.siteId, catalogId = _a.catalogId, catalogVersion = _a.catalogVersion, productCatalogVersions = _a.productCatalogVersions;
                        time = payload.time;
                        pageId = response.pageId, language = response.language, ticketId = response.ticketId;
                        this.smarteditComponentId = null;
                        this.dropdownStatus.isOpen = false;
                        experienceParams = __assign(__assign({}, response), { siteId: siteId,
                            catalogId: catalogId,
                            catalogVersion: catalogVersion,
                            productCatalogVersions: productCatalogVersions, time: smarteditcommons.dateUtils.formatDateAsUtc(time), pageId: pageId,
                            language: language });
                        return [4 /*yield*/, this.experienceService.buildAndSetExperience(experienceParams)];
                    case 1:
                        experience = _b.sent();
                        return [4 /*yield*/, this.sharedDataService.set(smarteditcommons.EXPERIENCE_STORAGE_KEY, experience)];
                    case 2:
                        _b.sent();
                        this.systemEventService.publishAsync(smarteditcommons.EVENTS.EXPERIENCE_UPDATE);
                        this.iframeManagerService.loadPreview(experience.siteDescriptor.previewUrl, ticketId);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExperienceSelectorComponent.prototype.updateCallback.$inject = ["payload", "response"];
    /* @ngInject */ ExperienceSelectorComponent.prototype.getApi = function ($api) {
        var _this = this;
        $api.setPreparePayload(this.preparePayload.bind(this));
        $api.setUpdateCallback(this.updateCallback.bind(this));
        $api.setAlwaysShowSubmit(true);
        $api.setAlwaysShowReset(true);
        $api.setSubmitButtonText('se.componentform.actions.apply');
        $api.setCancelButtonText('se.componentform.actions.cancel');
        $api.setOnReset(function () {
            _this.dropdownStatus.isOpen = false;
            return _this.dropdownStatus.isOpen;
        });
    };
    ExperienceSelectorComponent.prototype.getApi.$inject = ["$api"];
    /* @ngInject */ ExperienceSelectorComponent.prototype._getProductCatalogsByUuids = function (versionUuids) {
        return this.siteCatalogs.productCatalogs.map(function (_a) {
            var versions = _a.versions, catalogId = _a.catalogId;
            return ({
                catalogVersion: versions.find(function (_a) {
                    var uuid = _a.uuid;
                    return versionUuids.indexOf(uuid) > -1;
                }).version,
                catalog: catalogId
            });
        });
    };
    ExperienceSelectorComponent.prototype._getProductCatalogsByUuids.$inject = ["versionUuids"];
    /* @ngInject */ ExperienceSelectorComponent.prototype.resetExperienceSelectorFn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var experience, configuration, activeSiteTranslated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedDataService.get(smarteditcommons.EXPERIENCE_STORAGE_KEY)];
                    case 1:
                        experience = (_a.sent());
                        return [4 /*yield*/, this.sharedDataService.get('configuration')];
                    case 2:
                        configuration = (_a.sent());
                        this.smarteditComponentType = 'PreviewData';
                        this.smarteditComponentId = null;
                        this.structureApi = smarteditcommons.TYPES_RESOURCE_URI + '?code=:smarteditComponentType&mode=DEFAULT';
                        this.contentApi = (configuration && configuration.previewTicketURI) || smarteditcommons.PREVIEW_RESOURCE_URI;
                        return [4 /*yield*/, this.l10nPipe
                                .transform(experience.siteDescriptor.name)
                                .pipe(operators.take(1))
                                .toPromise()];
                    case 3:
                        activeSiteTranslated = _a.sent();
                        this.content = __assign(__assign({}, experience), { activeSite: activeSiteTranslated, time: experience.time, pageId: experience.pageId, productCatalogVersions: experience.productCatalogVersions.map(function (productCatalogVersion) { return productCatalogVersion.uuid; }), language: experience.languageDescriptor.isocode, previewCatalog: experience.siteDescriptor.uid + "|" + experience.catalogDescriptor.catalogId + "|" + experience.catalogDescriptor.catalogVersion });
                        if (!this.isReady) {
                            this.isReady = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ExperienceSelectorComponent.prototype, "experience", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ ExperienceSelectorComponent.prototype, "dropdownStatus", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], /* @ngInject */ ExperienceSelectorComponent.prototype, "resetExperienceSelector", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], /* @ngInject */ ExperienceSelectorComponent.prototype, "resetExperienceSelectorChange", void 0);
    /* @ngInject */ ExperienceSelectorComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-experience-selector',
            template: "<se-generic-editor *ngIf=\"isReady\" [smarteditComponentType]=\"smarteditComponentType\" [smarteditComponentId]=\"smarteditComponentId\" [structureApi]=\"structureApi\" [content]=\"content\" [contentApi]=\"contentApi\" (getApi)=\"getApi($event)\"></se-generic-editor>",
            providers: [smarteditcommons.L10nPipe]
        }),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService,
            SiteService,
            smarteditcommons.ISharedDataService,
            smarteditcommons.IIframeClickDetectionService,
            IframeManagerService,
            smarteditcommons.IExperienceService,
            smarteditcommons.ICatalogService,
            smarteditcommons.L10nPipe])
    ], /* @ngInject */ ExperienceSelectorComponent);
    return /* @ngInject */ ExperienceSelectorComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ShortcutLinkComponent", {
    selector: 'shortcut-link',
    template: "<ng-container #container><ng-template #defaultTemplate let-shortcutLink><div class=\"se-shortcut-link\"><a class=\"se-shortcut-link__item\" [ngClass]=\"{'se-shortcut-link__item--active': shortcutLink.active}\" (click)=\"onClick(shortcutLink)\">{{shortcutLink.titleI18nKey | translate}}</a></div></ng-template></ng-container>"
});
var /* @ngInject */ ShortcutLinkComponent = /** @class */ (function () {
    ShortcutLinkComponent.$inject = ["router", "location", "resolver", "experienceService", "priorityService", "systemEventService"];
    function /* @ngInject */ ShortcutLinkComponent(router, location, resolver, experienceService, priorityService, systemEventService) {
        this.router = router;
        this.location = location;
        this.resolver = resolver;
        this.experienceService = experienceService;
        this.priorityService = priorityService;
        this.systemEventService = systemEventService;
    }
    /* @ngInject */ ShortcutLinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unregFn = this.systemEventService.subscribe(smarteditcommons.EVENTS.EXPERIENCE_UPDATE, function () {
            return _this._createShortcutLink();
        });
    };
    /* @ngInject */ ShortcutLinkComponent.prototype.ngOnDestroy = function () {
        this.unregFn();
    };
    /* @ngInject */ ShortcutLinkComponent.prototype.ngAfterViewInit = function () {
        this._createShortcutLink();
    };
    /* @ngInject */ ShortcutLinkComponent.prototype.onClick = function (shortcutLink) {
        this.location.go(shortcutLink.fullPath);
        this.router.navigateByUrl(shortcutLink.fullPath);
    };
    ShortcutLinkComponent.prototype.onClick.$inject = ["shortcutLink"];
    /* @ngInject */ ShortcutLinkComponent.prototype._createShortcutLink = function () {
        var _this = this;
        var currentExperience = this.experienceService.getCurrentExperience();
        currentExperience.then(function (experience) {
            var shortcutLinks = _this._getShortcutLinks(experience);
            var orderedShortcutLinks = _this._orderByPriority(shortcutLinks);
            _this._createShortcutLinkDynamicComponents(orderedShortcutLinks);
        });
    };
    /* @ngInject */ ShortcutLinkComponent.prototype._createShortcutLinkDynamicComponents = function (shortcutLinks) {
        var _this = this;
        this.containerEntry.clear();
        shortcutLinks.forEach(function (shortcutLink) {
            if (shortcutLink && shortcutLink.titleI18nKey) {
                _this.containerEntry.createEmbeddedView(_this.defaultTemplate, {
                    $implicit: shortcutLink
                });
            }
            else if (shortcutLink && shortcutLink.shortcutComponent) {
                var factory = _this.resolver.resolveComponentFactory(shortcutLink.shortcutComponent);
                var component = _this.containerEntry.createComponent(factory);
                component.instance.shortcutLink = shortcutLink;
            }
        });
    };
    ShortcutLinkComponent.prototype._createShortcutLinkDynamicComponents.$inject = ["shortcutLinks"];
    /* @ngInject */ ShortcutLinkComponent.prototype._getShortcutLinks = function (experience) {
        var url = this.location.path();
        return smarteditcommons.SeRouteService.routeShortcutConfigs.map(function (routeShortcut) {
            var active;
            var path = routeShortcut.fullPath
                .replace(':siteId', experience.catalogDescriptor.siteId)
                .replace(':catalogId', experience.catalogDescriptor.catalogId)
                .replace(':catalogVersion', experience.catalogDescriptor.catalogVersion);
            if (path.startsWith('/')) {
                active = path === url;
            }
            else {
                active = "/" + path === url;
            }
            var shortcutLink = __assign({}, routeShortcut);
            shortcutLink.fullPath = path;
            shortcutLink.active = active;
            return shortcutLink;
        });
    };
    ShortcutLinkComponent.prototype._getShortcutLinks.$inject = ["experience"];
    /* @ngInject */ ShortcutLinkComponent.prototype._orderByPriority = function (shortcutLinks) {
        shortcutLinks.forEach(function (shortcutLink) { return (shortcutLink.priority = shortcutLink.priority || 500); });
        return this.priorityService.sort(shortcutLinks);
    };
    ShortcutLinkComponent.prototype._orderByPriority.$inject = ["shortcutLinks"];
    __decorate([
        core.ViewChild('container', { read: core.ViewContainerRef, static: false }),
        __metadata("design:type", core.ViewContainerRef)
    ], /* @ngInject */ ShortcutLinkComponent.prototype, "containerEntry", void 0);
    __decorate([
        core.ViewChild('defaultTemplate', { read: core.TemplateRef, static: false }),
        __metadata("design:type", core.TemplateRef)
    ], /* @ngInject */ ShortcutLinkComponent.prototype, "defaultTemplate", void 0);
    /* @ngInject */ ShortcutLinkComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'shortcut-link',
            template: "<ng-container #container><ng-template #defaultTemplate let-shortcutLink><div class=\"se-shortcut-link\"><a class=\"se-shortcut-link__item\" [ngClass]=\"{'se-shortcut-link__item--active': shortcutLink.active}\" (click)=\"onClick(shortcutLink)\">{{shortcutLink.titleI18nKey | translate}}</a></div></ng-template></ng-container>"
        }),
        __metadata("design:paramtypes", [router.Router,
            common.Location,
            core.ComponentFactoryResolver,
            smarteditcommons.IExperienceService,
            smarteditcommons.PriorityService,
            smarteditcommons.SystemEventService])
    ], /* @ngInject */ ShortcutLinkComponent);
    return /* @ngInject */ ShortcutLinkComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "UserAccountComponent", {
    selector: 'se-user-account',
    template: "<div class=\"se-user-account-dropdown\"><div class=\"se-user-account-dropdown__role\">{{ 'se.toolbar.useraccount.role' | translate }}</div><div class=\"user-account-dropdown__name\">{{username}}</div><div class=\"divider\"></div><a class=\"se-sign-out__link fd-menu__item\" (click)=\"signOut()\">{{'se.toolbar.useraccount.signout' | translate}}</a></div>"
});
var /* @ngInject */ UserAccountComponent = /** @class */ (function () {
    UserAccountComponent.$inject = ["authenticationService", "iframeManagerService", "crossFrameEventService", "sessionService"];
    function /* @ngInject */ UserAccountComponent(authenticationService, iframeManagerService, crossFrameEventService, sessionService) {
        this.authenticationService = authenticationService;
        this.iframeManagerService = iframeManagerService;
        this.crossFrameEventService = crossFrameEventService;
        this.sessionService = sessionService;
    }
    /* @ngInject */ UserAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unregUserChanged = this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.USER_HAS_CHANGED, function () {
            return _this.getUsername();
        });
        this.getUsername();
    };
    /* @ngInject */ UserAccountComponent.prototype.ngOnDestroy = function () {
        this.unregUserChanged();
    };
    /* @ngInject */ UserAccountComponent.prototype.signOut = function () {
        this.authenticationService.logout();
        this.iframeManagerService.setCurrentLocation(null);
    };
    /* @ngInject */ UserAccountComponent.prototype.getUsername = function () {
        var _this = this;
        this.sessionService.getCurrentUserDisplayName().then(function (displayName) {
            _this.username = displayName;
        });
    };
    /* @ngInject */ UserAccountComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-user-account',
            template: "<div class=\"se-user-account-dropdown\"><div class=\"se-user-account-dropdown__role\">{{ 'se.toolbar.useraccount.role' | translate }}</div><div class=\"user-account-dropdown__name\">{{username}}</div><div class=\"divider\"></div><a class=\"se-sign-out__link fd-menu__item\" (click)=\"signOut()\">{{'se.toolbar.useraccount.signout' | translate}}</a></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.IAuthenticationService,
            IframeManagerService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.ISessionService])
    ], /* @ngInject */ UserAccountComponent);
    return /* @ngInject */ UserAccountComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ExperienceSelectorWrapperComponent", {
    selector: 'se-experience-selector-wrapper',
    template: "\n        <se-experience-selector-button\n            *ngIf=\"toolbar.isOnStorefront()\"\n        ></se-experience-selector-button>\n    "
});
var ExperienceSelectorWrapperComponent = /** @class */ (function () {
    function ExperienceSelectorWrapperComponent(toolbar) {
        this.toolbar = toolbar;
    }
    ExperienceSelectorWrapperComponent = __decorate([
        core.Component({
            selector: 'se-experience-selector-wrapper',
            template: "\n        <se-experience-selector-button\n            *ngIf=\"toolbar.isOnStorefront()\"\n        ></se-experience-selector-button>\n    "
        }),
        __param(0, core.Inject(core.forwardRef(function () { return ToolbarComponent; }))),
        __metadata("design:paramtypes", [ToolbarComponent])
    ], ExperienceSelectorWrapperComponent);
    return ExperienceSelectorWrapperComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "LogoComponent", {
    selector: 'se-logo',
    template: "\n        <div class=\"se-app-logo\">\n            <img src=\"static-resources/images/SAP_scrn_R.png\" class=\"se-logo-image\" />\n            <div class=\"se-logo-text\">{{ 'se.application.name' | translate }}</div>\n        </div>\n    "
});
var LogoComponent = /** @class */ (function () {
    function LogoComponent() {
    }
    LogoComponent = __decorate([
        core.Component({
            selector: 'se-logo',
            template: "\n        <div class=\"se-app-logo\">\n            <img src=\"static-resources/images/SAP_scrn_R.png\" class=\"se-logo-image\" />\n            <div class=\"se-logo-text\">{{ 'se.application.name' | translate }}</div>\n        </div>\n    "
        })
    ], LogoComponent);
    return LogoComponent;
}());

var TopToolbarsModule = /** @class */ (function () {
    function TopToolbarsModule() {
    }
    TopToolbarsModule = __decorate([
        core.NgModule({
            schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                core$2.PopoverModule,
                common.CommonModule,
                smarteditcommons.SeGenericEditorModule,
                core$1.TranslateModule.forChild(),
                smarteditcommons.TooltipModule
            ],
            declarations: [
                smarteditcommons.HeaderLanguageDropdownComponent,
                ShortcutLinkComponent,
                UserAccountComponent,
                InflectionPointSelectorComponent,
                ExperienceSelectorButtonComponent,
                ExperienceSelectorComponent,
                DeviceSupportWrapperComponent,
                ExperienceSelectorWrapperComponent,
                LogoComponent
            ],
            entryComponents: [
                smarteditcommons.HeaderLanguageDropdownComponent,
                UserAccountComponent,
                ShortcutLinkComponent,
                InflectionPointSelectorComponent,
                ExperienceSelectorButtonComponent,
                ExperienceSelectorComponent,
                DeviceSupportWrapperComponent,
                ExperienceSelectorWrapperComponent,
                LogoComponent
            ],
            exports: [
                smarteditcommons.HeaderLanguageDropdownComponent,
                UserAccountComponent,
                ShortcutLinkComponent,
                InflectionPointSelectorComponent,
                ExperienceSelectorButtonComponent,
                ExperienceSelectorComponent,
                DeviceSupportWrapperComponent,
                ExperienceSelectorWrapperComponent,
                LogoComponent
            ]
        })
    ], TopToolbarsModule);
    return TopToolbarsModule;
}());

var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule = __decorate([
        core.NgModule({
            imports: [
                TopToolbarsModule,
                common.CommonModule,
                core$1.TranslateModule.forChild(),
                smarteditcommons.CompileHtmlModule,
                smarteditcommons.PropertyPipeModule,
                smarteditcommons.ResizeObserverModule,
                core$2.PopoverModule,
                smarteditcommons.ClickOutsideModule,
                smarteditcommons.PreventVerticalOverflowModule
            ],
            providers: [
                {
                    provide: smarteditcommons.IToolbarServiceFactory,
                    useClass: ToolbarServiceFactory
                }
            ],
            declarations: [
                ToolbarActionComponent,
                ToolbarActionOutletComponent,
                ToolbarComponent,
                ToolbarItemContextComponent,
                ToolbarSectionItemComponent
            ],
            entryComponents: [
                ToolbarActionComponent,
                ToolbarActionOutletComponent,
                ToolbarComponent,
                ToolbarItemContextComponent,
                ToolbarSectionItemComponent
            ],
            exports: [
                ToolbarActionComponent,
                ToolbarActionOutletComponent,
                ToolbarComponent,
                ToolbarItemContextComponent,
                ToolbarSectionItemComponent
            ]
        })
    ], ToolbarModule);
    return ToolbarModule;
}());

window.__smartedit__.addDecoratorPayload("Component", "AnnouncementBoardComponent", {
    selector: 'se-announcement-board',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    template: "<ng-container *ngIf=\"(announcements$ | async) as announcements\"><div class=\"se-announcement-board\"><se-announcement *ngFor=\"\n                let announcement of (announcements | seReverse);\n                trackBy: annnouncementTrackBy;\n                let i = index\n            \" id=\"se-announcement-{{ i }}\" [announcement]=\"announcement\"></se-announcement></div></ng-container>"
});
var AnnouncementBoardComponent = /** @class */ (function () {
    function AnnouncementBoardComponent(announcementService) {
        this.announcementService = announcementService;
    }
    AnnouncementBoardComponent.prototype.ngOnInit = function () {
        this.announcements$ = this.announcementService.getAnnouncements();
    };
    AnnouncementBoardComponent.prototype.annnouncementTrackBy = function (index, item) {
        return item.id;
    };
    AnnouncementBoardComponent = __decorate([
        core.Component({
            selector: 'se-announcement-board',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "<ng-container *ngIf=\"(announcements$ | async) as announcements\"><div class=\"se-announcement-board\"><se-announcement *ngFor=\"\n                let announcement of (announcements | seReverse);\n                trackBy: annnouncementTrackBy;\n                let i = index\n            \" id=\"se-announcement-{{ i }}\" [announcement]=\"announcement\"></se-announcement></div></ng-container>"
        }),
        __param(0, core.Inject(smarteditcommons.IAnnouncementService)),
        __metadata("design:paramtypes", [AnnouncementService])
    ], AnnouncementBoardComponent);
    return AnnouncementBoardComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "AnnouncementComponent", {
    selector: 'se-announcement',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    animations: [
        animations$1.trigger('fadeAnimation', [
            animations$1.transition(':enter', [
                animations$1.style({
                    opacity: 0,
                    transform: 'rotateY(90deg)'
                }),
                animations$1.animate('0.5s'),
                animations$1.style({
                    opacity: 1,
                    transform: 'translateX(0px)'
                })
            ]),
            animations$1.transition(':leave', [
                animations$1.animate('0.25s'),
                animations$1.style({
                    opacity: '0',
                    transform: 'translateX(100%)'
                })
            ])
        ])
    ],
    template: "<div class=\"se-announcement-content\"><span *ngIf=\"isCloseable()\" class=\"sap-icon--decline se-announcement-close\" (click)=\"closeAnnouncement()\"></span><ng-container *ngIf=\"!isLegacyAngularJS; else legacyAngularJS\"><div *ngIf=\"hasMessage()\"><h4 *ngIf=\"hasMessageTitle()\">{{ announcement.messageTitle | translate }}</h4><span>{{ announcement.message | translate }}</span></div><ng-container *ngIf=\"hasComponent()\"><ng-container *ngComponentOutlet=\"announcement.component; injector: announcementInjector\"></ng-container></ng-container></ng-container><ng-template #legacyAngularJS><div *ngIf=\"hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div></div><div *ngIf=\"!hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\"></div></div></ng-template></div>"
});
var AnnouncementComponent = /** @class */ (function () {
    function AnnouncementComponent(announcementService, injector) {
        this.announcementService = announcementService;
        this.injector = injector;
    }
    Object.defineProperty(AnnouncementComponent.prototype, "fadeAnimation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    AnnouncementComponent.prototype.ngOnChanges = function () {
        this.isLegacyAngularJS =
            typeof this.announcement.template !== 'undefined' ||
                typeof this.announcement.templateUrl !== 'undefined';
        this.legacyCompileHtmlNgController = this.hasController()
            ? { alias: '$announcementCtrl', value: this.announcement.controller }
            : undefined;
        if (!this.isLegacyAngularJS) {
            this.createAnnouncementInjector();
        }
    };
    AnnouncementComponent.prototype.hasTemplate = function () {
        return this.announcement.hasOwnProperty('template');
    };
    AnnouncementComponent.prototype.hasTemplateUrl = function () {
        return this.announcement.hasOwnProperty('templateUrl');
    };
    AnnouncementComponent.prototype.hasComponent = function () {
        return this.announcement.hasOwnProperty('component');
    };
    AnnouncementComponent.prototype.hasMessage = function () {
        return this.announcement.hasOwnProperty('message');
    };
    AnnouncementComponent.prototype.hasMessageTitle = function () {
        return this.announcement.hasOwnProperty('messageTitle');
    };
    AnnouncementComponent.prototype.isCloseable = function () {
        return this.announcement.hasOwnProperty('closeable')
            ? this.announcement.closeable
            : ANNOUNCEMENT_DEFAULTS.closeable;
    };
    AnnouncementComponent.prototype.closeAnnouncement = function () {
        this.announcementService.closeAnnouncement(this.announcement.id);
    };
    AnnouncementComponent.prototype.hasController = function () {
        return this.announcement.hasOwnProperty('controller');
    };
    AnnouncementComponent.prototype.createAnnouncementInjector = function () {
        this.announcementInjector = core.Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: smarteditcommons.ANNOUNCEMENT_DATA,
                    useValue: __assign({ id: this.announcement.id }, this.announcement.data)
                }
            ]
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], AnnouncementComponent.prototype, "announcement", void 0);
    __decorate([
        core.HostBinding('@fadeAnimation'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], AnnouncementComponent.prototype, "fadeAnimation", null);
    AnnouncementComponent = __decorate([
        core.Component({
            selector: 'se-announcement',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            animations: [
                animations$1.trigger('fadeAnimation', [
                    animations$1.transition(':enter', [
                        animations$1.style({
                            opacity: 0,
                            transform: 'rotateY(90deg)'
                        }),
                        animations$1.animate('0.5s'),
                        animations$1.style({
                            opacity: 1,
                            transform: 'translateX(0px)'
                        })
                    ]),
                    animations$1.transition(':leave', [
                        animations$1.animate('0.25s'),
                        animations$1.style({
                            opacity: '0',
                            transform: 'translateX(100%)'
                        })
                    ])
                ])
            ],
            template: "<div class=\"se-announcement-content\"><span *ngIf=\"isCloseable()\" class=\"sap-icon--decline se-announcement-close\" (click)=\"closeAnnouncement()\"></span><ng-container *ngIf=\"!isLegacyAngularJS; else legacyAngularJS\"><div *ngIf=\"hasMessage()\"><h4 *ngIf=\"hasMessageTitle()\">{{ announcement.messageTitle | translate }}</h4><span>{{ announcement.message | translate }}</span></div><ng-container *ngIf=\"hasComponent()\"><ng-container *ngComponentOutlet=\"announcement.component; injector: announcementInjector\"></ng-container></ng-container></ng-container><ng-template #legacyAngularJS><div *ngIf=\"hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\" [compileHtmlNgController]=\"legacyCompileHtmlNgController\"></div></div><div *ngIf=\"!hasController()\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"announcement.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"announcement.templateUrl\"></div></div></ng-template></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.IAnnouncementService, core.Injector])
    ], AnnouncementComponent);
    return AnnouncementComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "HotkeyNotificationComponent", {
    selector: 'se-hotkey-notification',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    template: "<div class=\"se-notification__hotkey\"><div *ngFor=\"let key of hotkeyNames; let last = last\"><div class=\"se-notification__hotkey--key\"><span>{{ key }}</span></div><span *ngIf=\"!last\" class=\"se-notification__hotkey__icon--add\">+</span></div><div class=\"se-notification__hotkey--text\"><div class=\"se-notification__hotkey--title\">{{ title }}</div><div class=\"se-notification__hotkey--message\">{{ message }}</div></div></div>"
});
var HotkeyNotificationComponent = /** @class */ (function () {
    function HotkeyNotificationComponent() {
    }
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], HotkeyNotificationComponent.prototype, "hotkeyNames", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], HotkeyNotificationComponent.prototype, "title", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], HotkeyNotificationComponent.prototype, "message", void 0);
    HotkeyNotificationComponent = __decorate([
        core.Component({
            selector: 'se-hotkey-notification',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "<div class=\"se-notification__hotkey\"><div *ngFor=\"let key of hotkeyNames; let last = last\"><div class=\"se-notification__hotkey--key\"><span>{{ key }}</span></div><span *ngIf=\"!last\" class=\"se-notification__hotkey__icon--add\">+</span></div><div class=\"se-notification__hotkey--text\"><div class=\"se-notification__hotkey--title\">{{ title }}</div><div class=\"se-notification__hotkey--message\">{{ message }}</div></div></div>"
        })
    ], HotkeyNotificationComponent);
    return HotkeyNotificationComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "PerspectiveSelectorHotkeyNotificationComponent", {
    selector: 'se-perspective-selector-hotkey-notification',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    template: "<se-hotkey-notification [hotkeyNames]=\"['esc']\" [title]=\"'se.application.status.hotkey.title' | translate\" [message]=\"'se.application.status.hotkey.message' | translate\"></se-hotkey-notification>"
});
var PerspectiveSelectorHotkeyNotificationComponent = /** @class */ (function () {
    function PerspectiveSelectorHotkeyNotificationComponent() {
    }
    PerspectiveSelectorHotkeyNotificationComponent = __decorate([
        smarteditcommons.SeCustomComponent(),
        core.Component({
            selector: 'se-perspective-selector-hotkey-notification',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "<se-hotkey-notification [hotkeyNames]=\"['esc']\" [title]=\"'se.application.status.hotkey.title' | translate\" [message]=\"'se.application.status.hotkey.message' | translate\"></se-hotkey-notification>"
        })
    ], PerspectiveSelectorHotkeyNotificationComponent);
    return PerspectiveSelectorHotkeyNotificationComponent;
}());

/** @internal */
var HotkeyNotificationModule = /** @class */ (function () {
    function HotkeyNotificationModule() {
    }
    HotkeyNotificationModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, smarteditcommons.TranslationModule.forChild()],
            declarations: [HotkeyNotificationComponent, PerspectiveSelectorHotkeyNotificationComponent],
            entryComponents: [HotkeyNotificationComponent, PerspectiveSelectorHotkeyNotificationComponent]
        })
    ], HotkeyNotificationModule);
    return HotkeyNotificationModule;
}());

window.__smartedit__.addDecoratorPayload("Component", "InvalidRouteComponent", { selector: 'empty', template: "<div>This page doesn't exist</div>" });
/**
 * Component that is displayed when Angular route has not been found
 */
var InvalidRouteComponent = /** @class */ (function () {
    function InvalidRouteComponent() {
    }
    InvalidRouteComponent = __decorate([
        core.Component({ selector: 'empty', template: "<div>This page doesn't exist</div>" })
    ], InvalidRouteComponent);
    return InvalidRouteComponent;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditServicesModule
 *
 * IMPORTANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* @internal */
function deprecatedSince1811() {
    angular.module('permissionServiceModule', ['legacySmarteditServicesModule']);
    angular.module('iFrameManagerModule', ['legacySmarteditServicesModule'])
        .service('iFrameManager', ["iframeManagerService", "waitDialogService", function (iframeManagerService, waitDialogService) {
        iframeManagerService.showWaitModal = function (key) {
            waitDialogService.showWaitModal(key);
        };
        iframeManagerService.hideWaitModal = function () {
            waitDialogService.hideWaitModal();
        };
        return iframeManagerService;
    }]);
    angular.module('catalogVersionPermissionRestServiceModule', ['legacySmarteditServicesModule']);
    angular.module('catalogVersionDetailsModule', ['catalogDetailsModule']);
    angular.module('catalogVersionsThumbnailCarouselModule', ['catalogDetailsModule']);
    angular.module('homePageLinkModule', ['catalogDetailsModule']);
}
function deprecatedSince1905() {
    angular.module('heartBeatServiceModule', ['legacySmarteditServicesModule']);
    angular.module('alertCollectionModule', ['legacySmarteditCommonsModule']);
    angular.module('alertCollectionFacadesModule', ['legacySmarteditCommonsModule']);
    angular.module('alertFactoryModule', ['legacySmarteditCommonsModule']);
    angular.module('renderServiceModule', ['legacySmarteditServicesModule']);
    angular.module('alertServiceModule', ['legacySmarteditCommonsModule']);
}
function deprecatedSince1911() {
    angular.module('perspectiveSelectorModule', ['smarteditServicesModule']);
}
function deprecatedSince2005() {
    angular.module('confirmationModalServiceModule', ['legacySmarteditServicesModule']);
    angular.module('smarteditServicesModule', ['legacySmarteditServicesModule']);
    angular.module('pageSensitiveDirectiveModule', ['legacySmarteditcontainer']);
    angular.module('yCollapsibleContainerModule', ['legacySmarteditcontainer']);
    angular.module('inflectionPointSelectorModule', ['legacySmarteditcontainer']);
    angular.module('toolbarModule', ['legacySmarteditServicesModule']);
    angular.module('filterByFieldFilterModule', ['legacySmarteditServicesModule']);
    angular.module('resizeComponentServiceModule', ['legacySmartedit']);
    angular.module('systemAlertsModule', ['legacySmarteditcontainer']);
    angular.module('alertsBoxModule', []);
    angular.module('catalogVersionPermissionModule', ['legacySmarteditServicesModule']);
    angular.module('previewDataDropdownPopulatorModule', ['legacySmarteditServicesModule']);
    angular.module('catalogDetailsModule', ['legacyCatalogDetailsModule']);
}
var deprecate = function () {
    deprecatedSince1811();
    deprecatedSince1905();
    deprecatedSince1911();
    deprecatedSince2005();
};

/**
 * # Module
 *
 * **Deprecated since 2005, use {@link CatalogDetailsModule}.**
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link CatalogDetailsComponent}.**
 *
 * ### Parameters
 *
 * `catalog` See [catalog]{@link CatalogDetailsComponent#catalog}.
 *
 * `isCatalogForCurrentSite` See [isCatalogForCurrentSite]{@link CatalogDetailsComponent#isCatalogForCurrentSite}.
 *
 * @deprecated
 */
var /* @ngInject */ LegacyCatalogDetailsComponent = /** @class */ (function () {
    function /* @ngInject */ LegacyCatalogDetailsComponent() {
    }
    /* @ngInject */ LegacyCatalogDetailsComponent = __decorate([
        smarteditcommons.SeComponent({
            selector: 'catalog-details',
            template: "\n        <se-catalog-details [catalog]=\"$ctrl.catalog\" [is-catalog-for-current-site]=\"$ctrl.isCatalogForCurrentSite\"></se-catalog-details>\n    ",
            inputs: ['catalog', 'isCatalogForCurrentSite']
        })
    ], /* @ngInject */ LegacyCatalogDetailsComponent);
    return /* @ngInject */ LegacyCatalogDetailsComponent;
}());

/**
 * **Deprecated since 2005, use {@link CatalogVersionDetailsComponent}**.
 *
 * ### Parameters
 *
 * `catalog` See [catalog]{@link CatalogVersionDetailsComponent#catalog}.
 *
 * `catalogVersion` See [catalogVersion]{@link CatalogVersionDetailsComponent#catalogVersion}.
 *
 * `activeCatalogVersion` See [activeCatalogVersion]{@link CatalogVersionDetailsComponent#activeCatalogVersion}.
 *
 * `siteId` See [siteId]{@link CatalogVersionDetailsComponent#siteId}.
 *
 * @deprecated
 */
var /* @ngInject */ LegacyCatalogVersionDetailsComponent = /** @class */ (function () {
    function /* @ngInject */ LegacyCatalogVersionDetailsComponent() {
    }
    /* @ngInject */ LegacyCatalogVersionDetailsComponent = __decorate([
        smarteditcommons.SeComponent({
            selector: 'catalog-version-details',
            template: "\n        <se-catalog-version-details \n            [catalog]=\"$ctrl.catalog\" \n            [site-id]=\"$ctrl.siteId\" \n            [catalog-version]=\"$ctrl.catalogVersion\" \n            [active-catalog-version]=\"$ctrl.activeCatalogVersion\">\n        </se-catalog-version-details>\n    ",
            inputs: ['catalog', 'catalogVersion', 'activeCatalogVersion', 'siteId']
        })
    ], /* @ngInject */ LegacyCatalogVersionDetailsComponent);
    return /* @ngInject */ LegacyCatalogVersionDetailsComponent;
}());

/**
 * **Deprecated since 2005, use {@link HomePageLinkComponent}**.
 *
 * ### Properties
 *
 * `siteId` See [siteId]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#siteId}.
 *
 * `catalog` See [catalog]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#catalog}.
 *
 * `catalogVersion` See [catalogVersion]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#catalogVersion}.
 *
 * @deprecated
 */
var /* @ngInject */ LegacyHomePageLinkComponent = /** @class */ (function () {
    function /* @ngInject */ LegacyHomePageLinkComponent() {
    }
    /* @ngInject */ LegacyHomePageLinkComponent = __decorate([
        smarteditcommons.SeComponent({
            selector: 'home-page-link',
            template: "\n        <se-home-page-link \n            [catalog]=\"$ctrl.catalog\" \n            [catalog-version]=\"$ctrl.catalogVersion\" \n            [site-id]=\"$ctrl.siteId\"> \n        </se-home-page-link>\n    ",
            inputs: ['catalog', 'catalogVersion', 'siteId']
        })
    ], /* @ngInject */ LegacyHomePageLinkComponent);
    return /* @ngInject */ LegacyHomePageLinkComponent;
}());

var /* @ngInject */ LegacyCatalogDetailsModule = /** @class */ (function () {
    function /* @ngInject */ LegacyCatalogDetailsModule() {
    }
    /* @ngInject */ LegacyCatalogDetailsModule = __decorate([
        smarteditcommons.SeModule({
            declarations: [
                LegacyCatalogDetailsComponent,
                LegacyHomePageLinkComponent,
                LegacyCatalogVersionDetailsComponent
            ]
        })
    ], /* @ngInject */ LegacyCatalogDetailsModule);
    return /* @ngInject */ LegacyCatalogDetailsModule;
}());

/**
 * **Deprecated since 2005, use [ClientPagedListComponent]{@link /smarteditcommons/components/ClientPagedListComponent.html}**.
 *
 *
 * Component responsible for displaying a client-side paginated list of items with custom renderers. It allows the user to search and sort the list.
 *
 * ### Parameters
 *
 * `items` An array of item descriptors.
 *
 * `keys` An array of object(s) with a property and an i18n key.
 *  The properties must match one at least one of the descriptors' keys and will be used as the columns of the table. The related i18n keys are used for the column headers' title.
 *
 * `renderers` An object that contains HTML renderers for specific keys property. A renderer is a function that returns a HTML string. This function accepts two arguments: "item" and "key".
 *
 * `injectedContext` An object that exposes values or functions to the component. It can be used by the custom HTML renderers to bind a function to a click event for example.
 *
 * `reversed` If set to true, the list will be sorted descending.
 *
 * `itemsPerPage` The number of items to display per page.
 *
 * `query` The ngModel query object used to filter the list.
 *
 * `displayCount` If set to true the size of the filtered collection will be displayed.
 *
 * `itemFilterKeys` (OPTIONAL) An array of object keys that will determine which fields the "LegacyFilterByFieldFilter"
 * will use to filter through the items.
 *
 *      <client-paged-list items="pageListCtl.pages"
 *                  keys="[{
 *                          property:'title',
 *                          i18n:'pagelist.headerpagetitle'
 *                          },{
 *                          property:'uid',
 *                          i18n:'pagelist.headerpageid'
 *                          },{
 *                          property:'typeCode',
 *                          i18n:'pagelist.headerpagetype'
 *                          },{
 *                          property:'template',
 *                          i18n:'pagelist.headerpagetemplate'
 *                          }]"
 *                  renderers="pageListCtl.renderers"
 *                  injectedContext="pageListCtl.injectedContext"
 *                  sort-by="'title'"
 *                  reversed="true"
 *                  items-per-page="10"
 *                  query="pageListCtl.query.value"
 *                  display-count="true"
 *      ></client-paged-list>
 *
 * ### Example of a <strong>renderers</strong> object
 *
 *      renderers = {
 *          name: function(item, key) {
 *              return "<a data-ng-click=\"injectedContext.onLink( item.path )\">{{ item[key.property] }}</a>";
 *          }
 *      };
 *
 * ### Example of an <strong>injectedContext</strong> object
 *
 *      injectedContext = {
 *          onLink: function(link) {
 *              if (link) {
 *                  var experiencePath = this._buildExperiencePath();
 *                  iframeManagerService.setCurrentLocation(link);
 *                  $location.path(experiencePath);
 *              }
 *          }.bind(this)
 *      };
 *
 * @deprecated
 */
var /* @ngInject */ LegacyClientPagedListComponent = /** @class */ (function () {
    LegacyClientPagedListComponent.$inject = ["$scope", "$filter"];
    function /* @ngInject */ LegacyClientPagedListComponent($scope, $filter) {
        var _this = this;
        this.$scope = $scope;
        this.$filter = $filter;
        this.currentPage = 1;
        this.filterCallback = function (filteredList) {
            _this.totalItems = filteredList.length;
        };
        this.getFilterKeys = function () { return _this.itemFilterKeys || []; };
        this.orderByColumn = function (columnKey) {
            _this.columnToggleReversed = !_this.columnToggleReversed;
            _this.headersSortingState[columnKey] = _this.columnToggleReversed;
            _this.visibleSortingHeader = columnKey;
            _this.items = _this.$filter('orderBy')(_this.items, columnKey, _this.columnToggleReversed);
        };
    }
    /* @ngInject */ LegacyClientPagedListComponent.prototype.$onInit = function () {
        var _a;
        var _this = this;
        this.totalItems = 0;
        this.columnWidth = 100 / (this.keys.length || 1);
        this.columnToggleReversed = this.reversed;
        this.headersSortingState = (_a = {},
            _a[this.sortBy] = this.reversed,
            _a);
        this.visibleSortingHeader = this.sortBy;
        var orderByUnwatch = this.$scope.$watch('sortBy', function () {
            _this.items = _this.$filter('orderBy')(_this.items, _this.sortBy, _this.columnToggleReversed);
            if (_this.sortBy) {
                orderByUnwatch();
            }
        });
        this.$scope.$watch('items', function () {
            _this.totalItems = _this.items.length;
        });
    };
    /* @ngInject */ LegacyClientPagedListComponent = __decorate([
        smarteditcommons.SeComponent({
            selector: 'client-paged-list',
            templateUrl: 'LegacyClientPagedListComponentTemplate.html',
            inputs: [
                'items:=',
                'itemsPerPage:=',
                'totalItems:=?',
                'keys:=',
                'renderers:=',
                'injectedContext:=',
                'identifier:=',
                'sortBy:=',
                'reversed:=',
                'query:=',
                'displayCount:=',
                'dropdownItems:=',
                'selectedItem:=',
                'itemFilterKeys:?'
            ]
        }),
        __metadata("design:paramtypes", [Object, Function])
    ], /* @ngInject */ LegacyClientPagedListComponent);
    return /* @ngInject */ LegacyClientPagedListComponent;
}());

/**
 * **Deprecated sine 2005, use {@link smarteditcommons/modules/ClientPagedListModule.html}.**
 *
 * @deprecated
 */
var /* @ngInject */ ClientPagedListModule = /** @class */ (function () {
    function /* @ngInject */ ClientPagedListModule() {
    }
    /* @ngInject */ ClientPagedListModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'pascalprecht.translate',
                'ui.bootstrap',
                smarteditcommons.LegacySmarteditCommonsModule,
                LegacySmarteditServicesModule
            ],
            declarations: [LegacyClientPagedListComponent]
        })
    ], /* @ngInject */ ClientPagedListModule);
    return /* @ngInject */ ClientPagedListModule;
}());

deprecate();
// eslint-disable-next-line @typescript-eslint/no-var-requires
var NgRouteModule = require('angular-route'); // Only supports CommonJS
// eslint-disable-next-line @typescript-eslint/no-var-requires
var NgUiBootstrapModule = require('angular-ui-bootstrap'); // Only supports CommonJS
var TOP_LEVEL_MODULE_NAME = 'smarteditcontainer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
var /* @ngInject */ Smarteditcontainer = /** @class */ (function () {
    /** @internal */
    function /* @ngInject */ Smarteditcontainer() {
    }
    /* @ngInject */ Smarteditcontainer = __decorate([
        smarteditcommons.SeModule({
            declarations: [smarteditcommons.PageSensitiveDirective, smarteditcommons.YCollapsibleContainerComponent],
            imports: [
                LegacySmarteditServicesModule,
                LegacyCatalogDetailsModule,
                smarteditcommons.TemplateCacheDecoratorModule,
                NgRouteModule,
                NgUiBootstrapModule,
                'coretemplates',
                'modalServiceModule',
                ClientPagedListModule,
                'paginationFilterModule',
                'resourceLocationsModule',
                smarteditcommons.TreeModule,
                'ySelectModule',
                smarteditcommons.YHelpModule,
                CatalogAwareRouteResolverModule,
                'seConstantsModule',
                smarteditcommons.GenericEditorModule,
                'recompileDomModule',
                'ngHrefDirectiveModule'
            ],
            providers: [],
            config: ["$provide", "readObjectStructureFactory", "LANDING_PAGE_PATH", "STORE_FRONT_CONTEXT", "$routeProvider", "$logProvider", function ($provide, readObjectStructureFactory, LANDING_PAGE_PATH, STORE_FRONT_CONTEXT, $routeProvider, $logProvider) {
                'ngInject';
                // Replace AngularJS ngHref Directive with the custom overridden directive, registered in 'ngHrefDirectiveModule'.
                // $delegate is any array of ng-href directives. In this case the first one is AngularJS built-in ng-href.
                // We remove it so that `ngHrefDirective` will be used instead.
                // See the 'ngHrefDirective' for more details.
                $provide.decorator('ngHrefDirective', [
                    '$delegate',
                    function ($delegate) {
                        $delegate.shift();
                        return $delegate;
                    }
                ]);
                smarteditcommons.instrument($provide, readObjectStructureFactory(), TOP_LEVEL_MODULE_NAME);
                // Due to not working Angular <-> AngularJS navigation (issues with $locationShim),
                // it is not possible to register unified routes that will handle the navigation properly.
                // Routes must be registered as an Angular routes at once, when each route component has been migrated to Angular.
                // Until then, each route must register downgraded component.
                smarteditcommons.SeRouteService.init($routeProvider);
                smarteditcommons.SeRouteService.provideLegacyRoute({
                    path: LANDING_PAGE_PATH,
                    route: {
                        redirectTo: smarteditcommons.NG_ROUTE_PREFIX
                    }
                });
                smarteditcommons.SeRouteService.provideLegacyRoute({
                    path: LANDING_PAGE_PATH + "sites/:siteId",
                    route: {
                        redirectTo: smarteditcommons.NG_ROUTE_PREFIX + "/sites/:siteId"
                    }
                });
                smarteditcommons.SeRouteService.provideLegacyRoute({
                    path: STORE_FRONT_CONTEXT,
                    route: {
                        redirectTo: "" + smarteditcommons.NG_ROUTE_PREFIX + STORE_FRONT_CONTEXT
                    }
                });
                $logProvider.debugEnabled(false);
            }]
        })
        /** @internal */
    ], /* @ngInject */ Smarteditcontainer);
    return /* @ngInject */ Smarteditcontainer;
}());

var LEGACY_APP_NAME = 'legacyApp';
window.__smartedit__.addDecoratorPayload("Component", "SmarteditcontainerComponent", {
    selector: smarteditcommons.SMARTEDITCONTAINER_COMPONENT_NAME,
    template: "\n        <router-outlet></router-outlet>\n        <div ng-attr-id=\"" + LEGACY_APP_NAME + "\">\n            <se-announcement-board></se-announcement-board>\n            <se-notification-panel></se-notification-panel>\n            <div ng-view></div>\n        </div>\n    "
});
var SmarteditcontainerComponent = /** @class */ (function () {
    function SmarteditcontainerComponent(translateService, injector, upgrade, elementRef, bootstrapIndicator) {
        this.translateService = translateService;
        this.upgrade = upgrade;
        this.elementRef = elementRef;
        this.bootstrapIndicator = bootstrapIndicator;
        this.legacyAppName = LEGACY_APP_NAME;
        this.legacyAppName = LEGACY_APP_NAME;
        this.setApplicationTitle();
        smarteditcommons.registerCustomComponents(injector);
    }
    SmarteditcontainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*
         * for e2e purposes:
         * in e2e, we sometimes add some test code in the parent frame to be added to the runtime
         * since we only bootstrap within smarteditcontainer-component node,
         * this code will be ignored unless added into the component before legacy AnguylarJS bootstrapping
         */
        Array.prototype.slice
            .call(document.body.childNodes)
            .filter(function (childNode) {
            return !_this.isAppComponent(childNode) && !_this.isSmarteditLoader(childNode);
        })
            .forEach(function (childNode) {
            _this.legacyAppNode.appendChild(childNode);
        });
    };
    SmarteditcontainerComponent.prototype.ngAfterViewInit = function () {
        this.upgrade.bootstrap(this.legacyAppNode, [Smarteditcontainer.moduleName], { strictDi: false });
        this.bootstrapIndicator.setSmarteditContainerReady();
    };
    SmarteditcontainerComponent.prototype.setApplicationTitle = function () {
        this.translateService.get('se.application.name').subscribe(function (pageTitle) {
            document.title = pageTitle;
        });
    };
    Object.defineProperty(SmarteditcontainerComponent.prototype, "legacyAppNode", {
        get: function () {
            // return this.elementRef.nativeElement.querySelector(`#${this.legacyAppName}`);
            return this.elementRef.nativeElement.querySelector("div[ng-attr-id=\"" + this.legacyAppName + "\"]");
        },
        enumerable: false,
        configurable: true
    });
    SmarteditcontainerComponent.prototype.isAppComponent = function (childNode) {
        return (childNode.nodeType === Node.ELEMENT_NODE &&
            childNode.tagName === smarteditcommons.SMARTEDITCONTAINER_COMPONENT_NAME.toUpperCase());
    };
    SmarteditcontainerComponent.prototype.isSmarteditLoader = function (childNode) {
        return (childNode.nodeType === Node.ELEMENT_NODE &&
            (childNode.id === 'smarteditloader' ||
                childNode.tagName === smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME.toUpperCase()));
    };
    SmarteditcontainerComponent = __decorate([
        core.Component({
            selector: smarteditcommons.SMARTEDITCONTAINER_COMPONENT_NAME,
            template: "\n        <router-outlet></router-outlet>\n        <div ng-attr-id=\"" + LEGACY_APP_NAME + "\">\n            <se-announcement-board></se-announcement-board>\n            <se-notification-panel></se-notification-panel>\n            <div ng-view></div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core$1.TranslateService,
            core.Injector,
            _static.UpgradeModule,
            core.ElementRef,
            smarteditcommons.AngularJSBootstrapIndicatorService])
    ], SmarteditcontainerComponent);
    return SmarteditcontainerComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "NotificationComponent", {
    selector: 'se-notification',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    template: "<div class=\"se-notification\" id=\"{{ id }}\" *ngIf=\"notification\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"notification.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"notification.templateUrl\"></div><div *ngIf=\"hasComponent()\" [seCustomComponentOutlet]=\"notification.componentName\"></div></div>"
});
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () {
        this.id =
            this.notification && this.notification.id
                ? 'se-notification-' + this.notification.id
                : '';
    };
    NotificationComponent.prototype.hasTemplate = function () {
        return this.notification.hasOwnProperty('template');
    };
    NotificationComponent.prototype.hasTemplateUrl = function () {
        return this.notification.hasOwnProperty('templateUrl');
    };
    NotificationComponent.prototype.hasComponent = function () {
        return !!this.notification.componentName;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "notification", void 0);
    NotificationComponent = __decorate([
        core.Component({
            selector: 'se-notification',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "<div class=\"se-notification\" id=\"{{ id }}\" *ngIf=\"notification\"><div *ngIf=\"hasTemplate()\" [seCompileHtml]=\"notification.template\"></div><div *ngIf=\"hasTemplateUrl()\" [ngInclude]=\"notification.templateUrl\"></div><div *ngIf=\"hasComponent()\" [seCustomComponentOutlet]=\"notification.componentName\"></div></div>"
        })
    ], NotificationComponent);
    return NotificationComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "NotificationPanelComponent", {
    selector: 'se-notification-panel',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    template: "<ng-container *ngIf=\"(notifications$ | async) as notifications\"><div class=\"se-notification-panel\" *ngIf=\"notifications.length > 0\" [ngClass]=\"{'is-mouseover': isMouseOver}\" (mouseenter)=\"onMouseEnter()\"><div><se-notification *ngFor=\"let notification of (notifications | seReverse)\" [notification]=\"notification\"></se-notification></div></div></ng-container>"
});
var NotificationPanelComponent = /** @class */ (function () {
    function NotificationPanelComponent(notificationService, notificationMouseLeaveDetectionService, systemEventService, iframeManagerService, windowUtils, element, yjQuery, cd) {
        this.notificationService = notificationService;
        this.notificationMouseLeaveDetectionService = notificationMouseLeaveDetectionService;
        this.systemEventService = systemEventService;
        this.iframeManagerService = iframeManagerService;
        this.windowUtils = windowUtils;
        this.element = element;
        this.yjQuery = yjQuery;
        this.cd = cd;
        this.notificationPanelBounds = null;
        this.iFrameNotificationPanelBounds = null;
        this.addMouseMoveEventListenerTimeout = null;
    }
    NotificationPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notifications$ = this.notificationService.getNotifications();
        this.isMouseOver = false;
        this.windowUtils.getWindow().addEventListener('resize', function () { return _this.onResize(); });
        this.unRegisterNotificationChangedEventHandler = this.systemEventService.subscribe(smarteditcommons.EVENT_NOTIFICATION_CHANGED, function () { return _this.onNotificationChanged(); });
    };
    NotificationPanelComponent.prototype.ngAfterViewInit = function () {
        this.$element = this.yjQuery(this.element.nativeElement);
    };
    NotificationPanelComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.windowUtils.getWindow().removeEventListener('resize', function () { return _this.onResize(); });
        this.notificationMouseLeaveDetectionService.stopDetection();
        this.unRegisterNotificationChangedEventHandler();
    };
    NotificationPanelComponent.prototype.onMouseEnter = function () {
        var _this = this;
        this.isMouseOver = true;
        this.cd.detectChanges();
        if (!this.hasBounds()) {
            this.calculateBounds();
        }
        this.addMouseMoveEventListenerTimeout =
            this.addMouseMoveEventListenerTimeout ||
                setTimeout(function () { return _this.addMouseMoveEventListener(); }, 10);
    };
    NotificationPanelComponent.prototype.onMouseLeave = function () {
        this.isMouseOver = false;
        this.cd.detectChanges();
    };
    NotificationPanelComponent.prototype.getIFrame = function () {
        return this.iframeManagerService.getIframe()[0];
    };
    NotificationPanelComponent.prototype.getNotificationPanel = function () {
        return this.$element.find('.se-notification-panel');
    };
    NotificationPanelComponent.prototype.calculateNotificationPanelBounds = function () {
        var notificationPanel = this.getNotificationPanel();
        var notificationPanelPosition = notificationPanel.position();
        this.notificationPanelBounds = {
            x: Math.floor(notificationPanelPosition.left),
            y: Math.floor(notificationPanelPosition.top),
            width: Math.floor(notificationPanel.width()),
            height: Math.floor(notificationPanel.height())
        };
    };
    NotificationPanelComponent.prototype.calculateIFrameNotificationPanelBounds = function () {
        var iFrame = this.getIFrame();
        if (iFrame) {
            this.iFrameNotificationPanelBounds = {
                x: this.notificationPanelBounds.x - iFrame.offsetLeft,
                y: this.notificationPanelBounds.y - iFrame.offsetTop,
                width: this.notificationPanelBounds.width,
                height: this.notificationPanelBounds.height
            };
        }
    };
    NotificationPanelComponent.prototype.calculateBounds = function () {
        this.calculateNotificationPanelBounds();
        this.calculateIFrameNotificationPanelBounds();
    };
    NotificationPanelComponent.prototype.invalidateBounds = function () {
        this.notificationPanelBounds = null;
        this.iFrameNotificationPanelBounds = null;
    };
    NotificationPanelComponent.prototype.hasBounds = function () {
        var hasNotificationPanelBounds = !!this.notificationPanelBounds;
        var hasIFrameBounds = this.getIFrame()
            ? !!this.iFrameNotificationPanelBounds
            : true;
        return hasNotificationPanelBounds && hasIFrameBounds;
    };
    NotificationPanelComponent.prototype.cancelDetection = function () {
        this.invalidateBounds();
        this.notificationMouseLeaveDetectionService.stopDetection();
        if (this.isMouseOver) {
            this.onMouseLeave();
        }
    };
    NotificationPanelComponent.prototype.onResize = function () {
        this.cancelDetection();
    };
    NotificationPanelComponent.prototype.onNotificationChanged = function () {
        if (!this.isMouseOver) {
            this.cancelDetection();
        }
    };
    NotificationPanelComponent.prototype.addMouseMoveEventListener = function () {
        var _this = this;
        this.addMouseMoveEventListenerTimeout = null;
        this.notificationMouseLeaveDetectionService.startDetection(this.notificationPanelBounds, this.iFrameNotificationPanelBounds, function () { return _this.onMouseLeave(); });
    };
    NotificationPanelComponent = __decorate([
        core.Component({
            selector: 'se-notification-panel',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "<ng-container *ngIf=\"(notifications$ | async) as notifications\"><div class=\"se-notification-panel\" *ngIf=\"notifications.length > 0\" [ngClass]=\"{'is-mouseover': isMouseOver}\" (mouseenter)=\"onMouseEnter()\"><div><se-notification *ngFor=\"let notification of (notifications | seReverse)\" [notification]=\"notification\"></se-notification></div></div></ng-container>"
        }),
        __param(0, core.Inject(smarteditcommons.INotificationService)),
        __param(1, core.Inject(smarteditcommons.INotificationMouseLeaveDetectionService)),
        __param(6, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [NotificationService,
            NotificationMouseLeaveDetectionService,
            smarteditcommons.SystemEventService,
            IframeManagerService,
            smarteditcommons.WindowUtils,
            core.ElementRef, Function, core.ChangeDetectorRef])
    ], NotificationPanelComponent);
    return NotificationPanelComponent;
}());

var NotificationPanelModule = /** @class */ (function () {
    function NotificationPanelModule() {
    }
    NotificationPanelModule = __decorate([
        core.NgModule({
            imports: [
                SmarteditServicesModule,
                smarteditcommons.SharedComponentsModule,
                common.CommonModule,
                smarteditcommons.CustomComponentOutletDirectiveModule
            ],
            declarations: [NotificationPanelComponent, NotificationComponent],
            exports: [NotificationPanelComponent]
        })
    ], NotificationPanelModule);
    return NotificationPanelModule;
}());

var SITES_ID = 'sites-id';

window.__smartedit__.addDecoratorPayload("Component", "LandingPageComponent", {
    selector: 'se-landing-page',
    template: "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar></div><div class=\"se-landing-page\"><div class=\"se-landing-page-actions\"><div class=\"se-landing-page-container\"><h1 class=\"se-landing-page-title\">{{ 'se.landingpage.title' | translate }}</h1><div class=\"se-landing-page-site-selection\" *ngIf=\"model\"><se-generic-editor-dropdown [field]=\"field\" [qualifier]=\"qualifier\" [model]=\"model\" [id]=\"sitesId\"></se-generic-editor-dropdown></div><p class=\"se-landing-page-label\">{{ 'se.landingpage.label' | translate }}</p></div></div><p class=\"se-landing-page-container se-landing-page-sub-header\">Content Catalogs</p><div class=\"se-landing-page-container se-landing-page-catalogs\"><div class=\"se-landing-page-catalog\" *ngFor=\"let catalog of catalogs; let isLast = last\"><se-catalog-details [catalog]=\"catalog\" [siteId]=\"model.site\" [isCatalogForCurrentSite]=\"isLast\"></se-catalog-details></div></div><img src=\"static-resources/images/best-run-sap-logo.svg\" class=\"se-landing-page-footer-logo\"/></div>"
});
var /* @ngInject */ LandingPageComponent = /** @class */ (function () {
    LandingPageComponent.$inject = ["siteService", "catalogService", "systemEventService", "storageService", "alertService", "route", "location", "yjQuery"];
    function /* @ngInject */ LandingPageComponent(siteService, catalogService, systemEventService, storageService, alertService, route, location, yjQuery) {
        this.siteService = siteService;
        this.catalogService = catalogService;
        this.systemEventService = systemEventService;
        this.storageService = storageService;
        this.alertService = alertService;
        this.route = route;
        this.location = location;
        this.yjQuery = yjQuery;
        this.sitesId = SITES_ID;
        this.qualifier = 'site';
        this.catalogs = [];
        this.SELECTED_SITE_COOKIE_NAME = 'seselectedsite';
    }
    /* @ngInject */ LandingPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.getCurrentSiteId(params.get('siteId')).then(function (siteId) {
                _this.setModel(siteId);
            });
        });
        this.siteService.getAccessibleSites().then(function (sites) {
            _this.field = {
                idAttribute: 'uid',
                labelAttributes: ['name'],
                editable: true,
                paged: false,
                options: sites
            };
        });
        this.removeStorefrontCssClass();
        this.unregisterSitesDropdownEventHandler = this.systemEventService.subscribe(this.sitesId + smarteditcommons.LINKED_DROPDOWN, this.selectedSiteDropdownEventHandler.bind(this));
    };
    /* @ngInject */ LandingPageComponent.prototype.ngOnDestroy = function () {
        this.unregisterSitesDropdownEventHandler();
    };
    /* @ngInject */ LandingPageComponent.prototype.getCurrentSiteId = function (siteIdFromUrl) {
        var _this = this;
        return this.storageService
            .getValueFromLocalStorage(this.SELECTED_SITE_COOKIE_NAME, false)
            .then(function (siteIdFromCookie) {
            return _this.siteService.getAccessibleSites().then(function (sites) {
                var isSiteAvailableFromUrl = sites.some(function (site) { return site.uid === siteIdFromUrl; });
                if (isSiteAvailableFromUrl) {
                    _this.setSelectedSite(siteIdFromUrl);
                    _this.updateRouteToRemoveSite();
                    return siteIdFromUrl;
                }
                else {
                    if (siteIdFromUrl) {
                        _this.alertService.showInfo('se.landingpage.site.url.error');
                        _this.updateRouteToRemoveSite();
                    }
                    var isSelectedSiteAvailableFromCookie = sites.some(function (site) { return site.uid === siteIdFromCookie; });
                    if (!isSelectedSiteAvailableFromCookie) {
                        var firstSiteId = sites.length > 0 ? sites[0].uid : null;
                        return firstSiteId;
                    }
                    else {
                        return siteIdFromCookie;
                    }
                }
            });
        });
    };
    LandingPageComponent.prototype.getCurrentSiteId.$inject = ["siteIdFromUrl"];
    /* @ngInject */ LandingPageComponent.prototype.updateRouteToRemoveSite = function () {
        this.location.replaceState(smarteditcommons.NG_ROUTE_PREFIX);
    };
    /* @ngInject */ LandingPageComponent.prototype.removeStorefrontCssClass = function () {
        var bodyTag = this.yjQuery(document.querySelector('body'));
        if (bodyTag.hasClass('is-storefront')) {
            bodyTag.removeClass('is-storefront');
        }
    };
    /* @ngInject */ LandingPageComponent.prototype.selectedSiteDropdownEventHandler = function (_eventId, data) {
        if (data.optionObject) {
            var siteId = data.optionObject.id;
            this.setSelectedSite(siteId);
            this.loadCatalogsBySite(siteId);
            this.setModel(siteId);
        }
        else {
            this.catalogs = [];
        }
    };
    LandingPageComponent.prototype.selectedSiteDropdownEventHandler.$inject = ["_eventId", "data"];
    /* @ngInject */ LandingPageComponent.prototype.setSelectedSite = function (siteId) {
        this.storageService.setValueInLocalStorage(this.SELECTED_SITE_COOKIE_NAME, siteId, false);
    };
    LandingPageComponent.prototype.setSelectedSite.$inject = ["siteId"];
    /* @ngInject */ LandingPageComponent.prototype.loadCatalogsBySite = function (siteId) {
        var _this = this;
        this.catalogService
            .getContentCatalogsForSite(siteId)
            .then(function (catalogs) { return (_this.catalogs = catalogs); });
    };
    LandingPageComponent.prototype.loadCatalogsBySite.$inject = ["siteId"];
    /* @ngInject */ LandingPageComponent.prototype.setModel = function (siteId) {
        var _a;
        if (this.model) {
            this.model[this.qualifier] = siteId;
        }
        else {
            this.model = (_a = {},
                _a[this.qualifier] = siteId,
                _a);
        }
    };
    LandingPageComponent.prototype.setModel.$inject = ["siteId"];
    /* @ngInject */ LandingPageComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-landing-page',
            template: "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar></div><div class=\"se-landing-page\"><div class=\"se-landing-page-actions\"><div class=\"se-landing-page-container\"><h1 class=\"se-landing-page-title\">{{ 'se.landingpage.title' | translate }}</h1><div class=\"se-landing-page-site-selection\" *ngIf=\"model\"><se-generic-editor-dropdown [field]=\"field\" [qualifier]=\"qualifier\" [model]=\"model\" [id]=\"sitesId\"></se-generic-editor-dropdown></div><p class=\"se-landing-page-label\">{{ 'se.landingpage.label' | translate }}</p></div></div><p class=\"se-landing-page-container se-landing-page-sub-header\">Content Catalogs</p><div class=\"se-landing-page-container se-landing-page-catalogs\"><div class=\"se-landing-page-catalog\" *ngFor=\"let catalog of catalogs; let isLast = last\"><se-catalog-details [catalog]=\"catalog\" [siteId]=\"model.site\" [isCatalogForCurrentSite]=\"isLast\"></se-catalog-details></div></div><img src=\"static-resources/images/best-run-sap-logo.svg\" class=\"se-landing-page-footer-logo\"/></div>"
        }),
        __param(7, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [SiteService,
            smarteditcommons.ICatalogService,
            smarteditcommons.SystemEventService,
            smarteditcommons.IStorageService,
            smarteditcommons.IAlertService,
            router.ActivatedRoute,
            common.Location, Function])
    ], /* @ngInject */ LandingPageComponent);
    return /* @ngInject */ LandingPageComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "StorefrontPageComponent", {
    selector: 'se-storefront-page',
    template: "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--experience\" imageRoot=\"imageRoot\" toolbarName=\"smartEditExperienceToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--perspective\" imageRoot=\"imageRoot\" toolbarName=\"smartEditPerspectiveToolbar\"></se-toolbar></div><div id=\"js_iFrameWrapper\" class=\"iframeWrapper\"><iframe id=\"ySmartEditFrame\" src=\"\"></iframe><div id=\"ySmartEditFrameDragArea\"></div></div>"
});
var /* @ngInject */ StorefrontPageComponent = /** @class */ (function () {
    StorefrontPageComponent.$inject = ["iframeManagerService", "experienceService", "yjQuery"];
    function /* @ngInject */ StorefrontPageComponent(iframeManagerService, experienceService, yjQuery) {
        this.iframeManagerService = iframeManagerService;
        this.experienceService = experienceService;
        this.yjQuery = yjQuery;
    }
    /* @ngInject */ StorefrontPageComponent.prototype.ngOnInit = function () {
        this.iframeManagerService.applyDefault();
        this.experienceService.initializeExperience();
        this.yjQuery(document.body).addClass('is-storefront');
    };
    /* @ngInject */ StorefrontPageComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-storefront-page',
            template: "<div class=\"se-toolbar-group\"><se-toolbar cssClass=\"se-toolbar--shell\" imageRoot=\"imageRoot\" toolbarName=\"smartEditHeaderToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--experience\" imageRoot=\"imageRoot\" toolbarName=\"smartEditExperienceToolbar\"></se-toolbar><se-toolbar cssClass=\"se-toolbar--perspective\" imageRoot=\"imageRoot\" toolbarName=\"smartEditPerspectiveToolbar\"></se-toolbar></div><div id=\"js_iFrameWrapper\" class=\"iframeWrapper\"><iframe id=\"ySmartEditFrame\" src=\"\"></iframe><div id=\"ySmartEditFrameDragArea\"></div></div>"
        }),
        __param(2, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __metadata("design:paramtypes", [IframeManagerService,
            smarteditcommons.IExperienceService, Function])
    ], /* @ngInject */ StorefrontPageComponent);
    return /* @ngInject */ StorefrontPageComponent;
}());

var MULTI_PRODUCT_CATALOGS_UPDATED = 'MULTI_PRODUCT_CATALOGS_UPDATED';

window.__smartedit__.addDecoratorPayload("Component", "MultiProductCatalogVersionConfigurationComponent", {
    selector: 'se-multi-product-catalog-version-configuration',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    host: {
        '[class.se-multi-product-catalog-version-configuration]': 'true'
    },
    template: "<div class=\"form-group se-multi-product-catalog-version-selector__label\">{{'se.product.catalogs.multiple.list.header' | translate}}</div><div class=\"se-multi-product-catalog-version-selector__catalog form-group\" *ngFor=\"let productCatalog of productCatalogs\"><label class=\"se-control-label se-multi-product-catalog-version-selector__catalog-name\" id=\"{{ productCatalog.catalogId }}-label\">{{ productCatalog.name | seL10n | async }}</label><div class=\"se-multi-product-catalog-version-selector__catalog-version\"><se-select [id]=\"productCatalog.catalogId\" [(model)]=\"productCatalog.selectedItem\" [onChange]=\"updateModel()\" [fetchStrategy]=\"productCatalog.fetchStrategy\"></se-select></div></div>"
});
var MultiProductCatalogVersionConfigurationComponent = /** @class */ (function () {
    function MultiProductCatalogVersionConfigurationComponent(modalManager, systemEventService) {
        this.modalManager = modalManager;
        this.systemEventService = systemEventService;
        this.doneButtonId = 'done';
    }
    MultiProductCatalogVersionConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalManager
            .getModalData()
            .pipe(operators.take(1))
            .subscribe(function (data) {
            _this.selectedCatalogVersions = data.selectedCatalogVersions;
            _this.productCatalogs = data.productCatalogs.map(function (productCatalog) {
                var versions = productCatalog.versions.map(function (version) { return (__assign(__assign({}, version), { id: version.uuid, label: version.version })); });
                return __assign(__assign({}, productCatalog), { versions: versions, fetchStrategy: {
                        fetchAll: function () {
                            return Promise.resolve(versions);
                        }
                    }, selectedItem: productCatalog.versions.find(function (version) {
                        return _this.selectedCatalogVersions.includes(version.uuid);
                    }).uuid });
            });
        });
        this.modalManager.setDismissCallback(function () { return _this.onCancel(); });
        this.modalManager.addButtons([
            {
                id: 'cancel',
                label: 'se.confirmation.modal.cancel',
                style: smarteditcommons.FundamentalModalButtonStyle.Default,
                action: smarteditcommons.FundamentalModalButtonAction.Dismiss,
                callback: function () { return rxjs.from(_this.onCancel()); }
            },
            {
                id: this.doneButtonId,
                label: 'se.confirmation.modal.done',
                style: smarteditcommons.FundamentalModalButtonStyle.Primary,
                action: smarteditcommons.FundamentalModalButtonAction.None,
                disabled: true,
                callback: function () { return rxjs.from(_this.onSave()); }
            }
        ]);
    };
    MultiProductCatalogVersionConfigurationComponent.prototype.updateModel = function () {
        var _this = this;
        return function () {
            var selectedVersions = _this.productCatalogs.map(function (productCatalog) { return productCatalog.selectedItem; });
            _this.updateSelection(selectedVersions);
        };
    };
    MultiProductCatalogVersionConfigurationComponent.prototype.updateSelection = function (updatedSelectedVersions) {
        if (!lo.isEqual(updatedSelectedVersions, this.selectedCatalogVersions)) {
            this.updatedCatalogVersions = updatedSelectedVersions;
            this.modalManager.enableButton(this.doneButtonId);
        }
        else {
            this.modalManager.disableButton(this.doneButtonId);
        }
    };
    MultiProductCatalogVersionConfigurationComponent.prototype.onCancel = function () {
        this.modalManager.close(null);
        return Promise.resolve();
    };
    MultiProductCatalogVersionConfigurationComponent.prototype.onSave = function () {
        this.systemEventService.publishAsync(MULTI_PRODUCT_CATALOGS_UPDATED, this.updatedCatalogVersions);
        this.modalManager.close(null);
        return Promise.resolve();
    };
    MultiProductCatalogVersionConfigurationComponent = __decorate([
        core.Component({
            selector: 'se-multi-product-catalog-version-configuration',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '[class.se-multi-product-catalog-version-configuration]': 'true'
            },
            template: "<div class=\"form-group se-multi-product-catalog-version-selector__label\">{{'se.product.catalogs.multiple.list.header' | translate}}</div><div class=\"se-multi-product-catalog-version-selector__catalog form-group\" *ngFor=\"let productCatalog of productCatalogs\"><label class=\"se-control-label se-multi-product-catalog-version-selector__catalog-name\" id=\"{{ productCatalog.catalogId }}-label\">{{ productCatalog.name | seL10n | async }}</label><div class=\"se-multi-product-catalog-version-selector__catalog-version\"><se-select [id]=\"productCatalog.catalogId\" [(model)]=\"productCatalog.selectedItem\" [onChange]=\"updateModel()\" [fetchStrategy]=\"productCatalog.fetchStrategy\"></se-select></div></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.FundamentalModalManagerService,
            smarteditcommons.SystemEventService])
    ], MultiProductCatalogVersionConfigurationComponent);
    return MultiProductCatalogVersionConfigurationComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "MultiProductCatalogVersionSelectorComponent", {
    selector: 'se-multi-product-catalog-version-selector',
    providers: [smarteditcommons.L10nPipe],
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    host: {
        '[class.se-multi-product-catalog-version-selector]': 'true'
    },
    template: "<se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" [isChevronVisible]=\"true\" class=\"se-products-catalog-select-multiple__tooltip\"><div id=\"multi-product-catalog-versions-selector\" se-tooltip-trigger (click)=\"onClickSelector()\" class=\"se-products-catalog-select-multiple\"><input type=\"text\" [value]=\"multiProductCatalogVersionsSelectedOptions$ | async\" class=\"form-control se-products-catalog-select-multiple__catalogs se-nowrap-ellipsis\" [name]=\"'productCatalogVersions'\" readonly=\"readonly\"/> <span class=\"hyicon hyicon-optionssm se-products-catalog-select-multiple__icon\"></span></div><div class=\"se-product-catalogs-tooltip\" se-tooltip-body><div class=\"se-product-catalogs-tooltip__h\">{{ ('se.product.catalogs.selector.headline.tooltip' || '') | translate }}</div><div class=\"se-product-catalog-info\" *ngFor=\"let productCatalog of productCatalogs\">{{ getCatalogNameCatalogVersionLabel(productCatalog.catalogId) | async }}</div></div></se-tooltip>"
});
var MultiProductCatalogVersionSelectorComponent = /** @class */ (function () {
    function MultiProductCatalogVersionSelectorComponent(l10nPipe, modalService, systemEventService) {
        this.l10nPipe = l10nPipe;
        this.modalService = modalService;
        this.systemEventService = systemEventService;
        this.selectedProductCatalogVersionsChange = new core.EventEmitter();
        this.multiProductCatalogVersionsSelectedOptions$ = new rxjs.BehaviorSubject('');
    }
    MultiProductCatalogVersionSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$unRegEventForMultiProducts = this.systemEventService.subscribe(MULTI_PRODUCT_CATALOGS_UPDATED, function (eventId, catalogVersions) {
            return _this.updateProductCatalogVersionsModel(eventId, catalogVersions);
        });
    };
    MultiProductCatalogVersionSelectorComponent.prototype.ngOnDestroy = function () {
        if (this.$unRegEventForMultiProducts) {
            this.$unRegEventForMultiProducts();
        }
    };
    MultiProductCatalogVersionSelectorComponent.prototype.ngOnChanges = function () {
        this.setMultiVersionSelectorTexts(this.productCatalogs);
    };
    MultiProductCatalogVersionSelectorComponent.prototype.onClickSelector = function () {
        this.modalService.open({
            component: MultiProductCatalogVersionConfigurationComponent,
            data: {
                productCatalogs: this.productCatalogs,
                selectedCatalogVersions: this.selectedProductCatalogVersions
            },
            templateConfig: {
                title: 'se.modal.product.catalog.configuration'
            },
            config: {
                modalPanelClass: 'modal-md modal-stretched'
            }
        });
    };
    MultiProductCatalogVersionSelectorComponent.prototype.getCatalogNameCatalogVersionLabel = function (catalogId) {
        var catalogNameCatalogVersionLabel = this.catalogNameCatalogVersionLabelMap.get(catalogId);
        return this.l10nPipe
            .transform(catalogNameCatalogVersionLabel.name)
            .pipe(operators.map(function (name) { return name + " (" + catalogNameCatalogVersionLabel.version + ")"; }));
    };
    MultiProductCatalogVersionSelectorComponent.prototype.setMultiVersionSelectorTexts = function (productCatalogs) {
        this.catalogNameCatalogVersionLabelMap = this.buildCatalogNameCatalogVersionLabelMap(productCatalogs, this.selectedProductCatalogVersions);
        this.setMultiProductCatalogVersionsSelectedOptions(productCatalogs);
    };
    MultiProductCatalogVersionSelectorComponent.prototype.buildCatalogNameCatalogVersionLabelMap = function (productCatalogs, versionsFromModel) {
        var catalogsMap = new Map();
        productCatalogs.forEach(function (productCatalog) {
            var productCatalogVersion = productCatalog.versions.find(function (version) {
                return versionsFromModel && versionsFromModel.includes(version.uuid);
            });
            if (productCatalogVersion) {
                catalogsMap.set(productCatalog.catalogId, {
                    name: productCatalog.name,
                    version: productCatalogVersion.version
                });
            }
        });
        return catalogsMap;
    };
    MultiProductCatalogVersionSelectorComponent.prototype.setMultiProductCatalogVersionsSelectedOptions = function (productCatalogs) {
        var _this = this;
        if (productCatalogs) {
            var labels$ = Array.from(this.catalogNameCatalogVersionLabelMap).map(function (key) {
                return _this.getCatalogNameCatalogVersionLabel(key[0]);
            });
            rxjs.combineLatest(labels$)
                .pipe(operators.take(1), operators.map(function (results) { return results.join(', '); }))
                .subscribe(function (selectedOptions) {
                return _this.multiProductCatalogVersionsSelectedOptions$.next(selectedOptions);
            });
        }
        else {
            this.multiProductCatalogVersionsSelectedOptions$.next('');
        }
    };
    MultiProductCatalogVersionSelectorComponent.prototype.updateProductCatalogVersionsModel = function (_eventId, catalogVersions) {
        this.selectedProductCatalogVersionsChange.emit(catalogVersions);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], MultiProductCatalogVersionSelectorComponent.prototype, "productCatalogs", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], MultiProductCatalogVersionSelectorComponent.prototype, "selectedProductCatalogVersions", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], MultiProductCatalogVersionSelectorComponent.prototype, "selectedProductCatalogVersionsChange", void 0);
    MultiProductCatalogVersionSelectorComponent = __decorate([
        core.Component({
            selector: 'se-multi-product-catalog-version-selector',
            providers: [smarteditcommons.L10nPipe],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '[class.se-multi-product-catalog-version-selector]': 'true'
            },
            template: "<se-tooltip [placement]=\"'bottom'\" [triggers]=\"['mouseenter', 'mouseleave']\" [isChevronVisible]=\"true\" class=\"se-products-catalog-select-multiple__tooltip\"><div id=\"multi-product-catalog-versions-selector\" se-tooltip-trigger (click)=\"onClickSelector()\" class=\"se-products-catalog-select-multiple\"><input type=\"text\" [value]=\"multiProductCatalogVersionsSelectedOptions$ | async\" class=\"form-control se-products-catalog-select-multiple__catalogs se-nowrap-ellipsis\" [name]=\"'productCatalogVersions'\" readonly=\"readonly\"/> <span class=\"hyicon hyicon-optionssm se-products-catalog-select-multiple__icon\"></span></div><div class=\"se-product-catalogs-tooltip\" se-tooltip-body><div class=\"se-product-catalogs-tooltip__h\">{{ ('se.product.catalogs.selector.headline.tooltip' || '') | translate }}</div><div class=\"se-product-catalog-info\" *ngFor=\"let productCatalog of productCatalogs\">{{ getCatalogNameCatalogVersionLabel(productCatalog.catalogId) | async }}</div></div></se-tooltip>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.L10nPipe,
            smarteditcommons.IModalService,
            smarteditcommons.SystemEventService])
    ], MultiProductCatalogVersionSelectorComponent);
    return MultiProductCatalogVersionSelectorComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "ProductCatalogVersionsSelectorComponent", {
    selector: 'se-product-catalog-versions-selector',
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    host: {
        '[class.se-product-catalog-versions-selector]': 'true'
    },
    template: "<ng-container *ngIf=\"isReady\"><se-select *ngIf=\"isSingleVersionSelector\" [id]=\"geData.qualifier\" [(model)]=\"geData.model.productCatalogVersions[0]\" [(reset)]=\"reset\" [fetchStrategy]=\"fetchStrategy\"></se-select><se-multi-product-catalog-version-selector *ngIf=\"isMultiVersionSelector\" [productCatalogs]=\"productCatalogs\" [(selectedProductCatalogVersions)]=\"geData.model[geData.qualifier]\"></se-multi-product-catalog-version-selector></ng-container>"
});
var ProductCatalogVersionsSelectorComponent = /** @class */ (function () {
    function ProductCatalogVersionsSelectorComponent(geData, catalogService, systemEventService, cdr) {
        this.geData = geData;
        this.catalogService = catalogService;
        this.systemEventService = systemEventService;
        this.cdr = cdr;
    }
    ProductCatalogVersionsSelectorComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eventId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.contentCatalogVersionId = lo.cloneDeep(this.geData.model.previewCatalog);
                        if (!this.contentCatalogVersionId) return [3 /*break*/, 2];
                        this.isReady = false;
                        this.isSingleVersionSelector = false;
                        this.isMultiVersionSelector = false;
                        eventId = (this.geData.id || '') + smarteditcommons.LINKED_DROPDOWN;
                        this.$unRegSiteChangeEvent = this.systemEventService.subscribe(eventId, function (id, data) { return _this.resetSelector(id, data); });
                        return [4 /*yield*/, this.setContent()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    ProductCatalogVersionsSelectorComponent.prototype.ngOnDestroy = function () {
        if (this.$unRegSiteChangeEvent) {
            this.$unRegSiteChangeEvent();
        }
    };
    ProductCatalogVersionsSelectorComponent.prototype.resetSelector = function (_eventId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var siteUID, productCatalogs, activeProductCatalogVersions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data.qualifier === 'previewCatalog' &&
                            data.optionObject &&
                            this.contentCatalogVersionId !== data.optionObject.id)) return [3 /*break*/, 3];
                        this.contentCatalogVersionId = data.optionObject.id;
                        siteUID = this.getSiteUIDFromContentCatalogVersionId(this.contentCatalogVersionId);
                        return [4 /*yield*/, this.catalogService.getProductCatalogsForSite(siteUID)];
                    case 1:
                        productCatalogs = _a.sent();
                        return [4 /*yield*/, this.catalogService.returnActiveCatalogVersionUIDs(productCatalogs)];
                    case 2:
                        activeProductCatalogVersions = _a.sent();
                        this.geData.model[this.geData.qualifier] = activeProductCatalogVersions;
                        if (this.isSingleVersionSelector) {
                            this.reset();
                        }
                        this.setContent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductCatalogVersionsSelectorComponent.prototype.setContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var setContent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setContent = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this;
                                        return [4 /*yield*/, this.catalogService.getProductCatalogsForSite(this.getSiteUIDFromContentCatalogVersionId(this.contentCatalogVersionId))];
                                    case 1:
                                        _a.productCatalogs = _b.sent();
                                        if (this.productCatalogs.length === 0) {
                                            return [2 /*return*/];
                                        }
                                        if (this.productCatalogs.length === 1) {
                                            this.fetchStrategy = {
                                                fetchAll: function () {
                                                    var parsedVersions = _this.parseSingleCatalogVersion(_this.productCatalogs[0].versions);
                                                    return Promise.resolve(parsedVersions);
                                                }
                                            };
                                            this.isSingleVersionSelector = true;
                                            this.isMultiVersionSelector = false;
                                            this.isReady = true;
                                            return [2 /*return*/];
                                        }
                                        this.isSingleVersionSelector = false;
                                        this.isMultiVersionSelector = true;
                                        this.isReady = true;
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, setContent()];
                    case 1:
                        _a.sent();
                        this.cdr.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductCatalogVersionsSelectorComponent.prototype.getSiteUIDFromContentCatalogVersionId = function (id) {
        return id.split('|')[0];
    };
    ProductCatalogVersionsSelectorComponent.prototype.parseSingleCatalogVersion = function (versions) {
        return versions.map(function (version) { return ({
            id: version.uuid,
            label: version.version
        }); });
    };
    ProductCatalogVersionsSelectorComponent = __decorate([
        core.Component({
            selector: 'se-product-catalog-versions-selector',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '[class.se-product-catalog-versions-selector]': 'true'
            },
            template: "<ng-container *ngIf=\"isReady\"><se-select *ngIf=\"isSingleVersionSelector\" [id]=\"geData.qualifier\" [(model)]=\"geData.model.productCatalogVersions[0]\" [(reset)]=\"reset\" [fetchStrategy]=\"fetchStrategy\"></se-select><se-multi-product-catalog-version-selector *ngIf=\"isMultiVersionSelector\" [productCatalogs]=\"productCatalogs\" [(selectedProductCatalogVersions)]=\"geData.model[geData.qualifier]\"></se-multi-product-catalog-version-selector></ng-container>"
        }),
        __param(0, core.Inject(smarteditcommons.GENERIC_EDITOR_WIDGET_DATA)),
        __metadata("design:paramtypes", [Object, smarteditcommons.ICatalogService,
            smarteditcommons.SystemEventService,
            core.ChangeDetectorRef])
    ], ProductCatalogVersionsSelectorComponent);
    return ProductCatalogVersionsSelectorComponent;
}());

var ProductCatalogVersionModule = /** @class */ (function () {
    function ProductCatalogVersionModule() {
    }
    ProductCatalogVersionModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                forms.FormsModule,
                smarteditcommons.L10nPipeModule,
                smarteditcommons.TranslationModule.forChild(),
                smarteditcommons.SelectModule,
                smarteditcommons.TooltipModule
            ],
            declarations: [
                ProductCatalogVersionsSelectorComponent,
                MultiProductCatalogVersionConfigurationComponent,
                MultiProductCatalogVersionSelectorComponent
            ],
            entryComponents: [
                ProductCatalogVersionsSelectorComponent,
                MultiProductCatalogVersionConfigurationComponent,
                MultiProductCatalogVersionSelectorComponent
            ],
            providers: [
                smarteditcommons.moduleUtils.initialize(function (editorFieldMappingService) {
                    editorFieldMappingService.addFieldMapping('ProductCatalogVersionsSelector', null, null, {
                        component: ProductCatalogVersionsSelectorComponent
                    });
                }, [smarteditcommons.EditorFieldMappingService])
            ]
        })
    ], ProductCatalogVersionModule);
    return ProductCatalogVersionModule;
}());

window.__smartedit__.addDecoratorPayload("Component", "SitesLinkComponent", {
    selector: 'sites-link',
    template: "<div (click)=\"goToSites()\" class=\"se-sites-link {{cssClass}}\"><a class=\"se-sites-link__text\">{{'se.toolbar.sites' | translate}}</a> <span class=\"icon-navigation-right-arrow se-sites-link__arrow {{iconCssClass}}\"></span></div>"
});
var SitesLinkComponent = /** @class */ (function () {
    function SitesLinkComponent(routingService, iframeManagerService) {
        this.routingService = routingService;
        this.iframeManagerService = iframeManagerService;
        this.iconCssClass = 'sap-icon--navigation-right-arrow';
    }
    SitesLinkComponent.prototype.goToSites = function () {
        this.iframeManagerService.setCurrentLocation(null);
        this.routingService.go(smarteditcommons.NG_ROUTE_PREFIX);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], SitesLinkComponent.prototype, "cssClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SitesLinkComponent.prototype, "iconCssClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], SitesLinkComponent.prototype, "shortcutLink", void 0);
    SitesLinkComponent = __decorate([
        core.Component({
            selector: 'sites-link',
            template: "<div (click)=\"goToSites()\" class=\"se-sites-link {{cssClass}}\"><a class=\"se-sites-link__text\">{{'se.toolbar.sites' | translate}}</a> <span class=\"icon-navigation-right-arrow se-sites-link__arrow {{iconCssClass}}\"></span></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.SmarteditRoutingService,
            IframeManagerService])
    ], SitesLinkComponent);
    return SitesLinkComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "PerspectiveSelectorComponent", {
    selector: 'se-perspective-selector',
    template: "<fd-popover [(isOpen)]=\"isOpen\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" *ngIf=\"hasActivePerspective()\" class=\"se-perspective-selector\" [placement]=\"'bottom-end'\" [disabled]=\"isDisabled\" [options]=\"popperOptions\"><fd-popover-control><div class=\"se-perspective-selector__trigger\"><se-tooltip [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isTooltipVisible()\"><span se-tooltip-trigger id=\"perspectiveTooltip\" class=\"hyicon hyicon-info se-perspective-selector__hotkey-tooltip--icon\"></span><div se-tooltip-body>{{ activePerspective.descriptionI18nKey | translate }}</div></se-tooltip><button class=\"se-perspective-selector__btn\" [disabled]=\"isDisabled\">{{getActivePerspectiveName() | translate}} <span class=\"se-perspective-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><ul class=\"se-perspective__list fd-list-group\" [ngClass]=\"{'se-perspective__list--tooltip': isTooltipVisible()}\" role=\"menu\"><li *ngFor=\"let choice of getDisplayedPerspectives()\" class=\"fd-list-group__item se-perspective__list-item fd-has-padding-none\"><a class=\"item se-perspective__list-item-text\" (click)=\"selectPerspective($event, choice.key);\">{{choice.nameI18nKey | translate}}</a></li></ul></fd-popover-body></fd-popover>"
});
var /* @ngInject */ PerspectiveSelectorComponent = /** @class */ (function () {
    PerspectiveSelectorComponent.$inject = ["logService", "yjQuery", "perspectiveService", "iframeClickDetectionService", "systemEventService", "crossFrameEventService", "testModeService"];
    function /* @ngInject */ PerspectiveSelectorComponent(logService, yjQuery, perspectiveService, iframeClickDetectionService, systemEventService, crossFrameEventService, testModeService) {
        this.logService = logService;
        this.yjQuery = yjQuery;
        this.perspectiveService = perspectiveService;
        this.iframeClickDetectionService = iframeClickDetectionService;
        this.systemEventService = systemEventService;
        this.crossFrameEventService = crossFrameEventService;
        this.testModeService = testModeService;
        this.isOpen = false;
        this.popperOptions = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'viewport'
                },
                applyStyle: {
                    gpuAcceleration: false
                }
            }
        };
        this.isDisabled = false;
        this.perspectives = [];
        this.displayedPerspectives = [];
        this.activePerspective = null;
    }
    /* @ngInject */ PerspectiveSelectorComponent.prototype.onDocumentClick = function (event) {
        this.onClickHandler(event);
    };
    PerspectiveSelectorComponent.prototype.onDocumentClick.$inject = ["event"];
    /* @ngInject */ PerspectiveSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activePerspective = null;
        this.iframeClickDetectionService.registerCallback('perspectiveSelectorClose', function () {
            return _this.closeDropdown();
        });
        this.unRegOverlayDisabledFn = this.systemEventService.subscribe('OVERLAY_DISABLED', function () {
            return _this.closeDropdown();
        });
        this.unRegPerspectiveAddedFn = this.systemEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_ADDED, function () { return _this.onPerspectiveAdded(); });
        this.unRegPerspectiveChgFn = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_CHANGED, function () { return _this.refreshPerspectives(); });
        this.unRegPerspectiveRefreshFn = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_PERSPECTIVE_REFRESHED, function () { return _this.refreshPerspectives(); });
        this.unRegUserHasChanged = this.crossFrameEventService.subscribe(smarteditcommons.EVENTS.USER_HAS_CHANGED, function () { return _this.onPerspectiveAdded(); });
        this.unRegStrictPreviewModeToggleFn = this.crossFrameEventService.subscribe(smarteditcommons.EVENT_STRICT_PREVIEW_MODE_REQUESTED, function (eventId, isDisabled) { return _this.togglePerspectiveSelector(isDisabled); });
        this.onPerspectiveAdded();
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.ngOnDestroy = function () {
        this.unRegOverlayDisabledFn();
        this.unRegPerspectiveAddedFn();
        this.unRegPerspectiveChgFn();
        this.unRegPerspectiveRefreshFn();
        this.unRegUserHasChanged();
        this.unRegStrictPreviewModeToggleFn();
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.selectPerspective = function (event, choice) {
        event.preventDefault();
        try {
            this.perspectiveService.switchTo(choice);
            this.closeDropdown();
        }
        catch (e) {
            this.logService.error('selectPerspective() - Cannot select perspective.', e);
        }
    };
    PerspectiveSelectorComponent.prototype.selectPerspective.$inject = ["event", "choice"];
    /* @ngInject */ PerspectiveSelectorComponent.prototype.getDisplayedPerspectives = function () {
        return this.displayedPerspectives;
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.getActivePerspectiveName = function () {
        return this.activePerspective ? this.activePerspective.nameI18nKey : '';
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.hasActivePerspective = function () {
        return this.activePerspective !== null;
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.isTooltipVisible = function () {
        return (!!this.activePerspective &&
            !!this.activePerspective.descriptionI18nKey &&
            this.checkTooltipVisibilityCondition());
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.checkTooltipVisibilityCondition = function () {
        if (this.activePerspective.key !== smarteditcommons.NONE_PERSPECTIVE ||
            (this.activePerspective.key === smarteditcommons.NONE_PERSPECTIVE && this.isDisabled)) {
            return true;
        }
        return false;
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.filterPerspectives = function (perspectives) {
        var _this = this;
        return perspectives.filter(function (perspective) {
            var isActivePerspective = _this.activePerspective && perspective.key === _this.activePerspective.key;
            var isAllPerspective = perspective.key === smarteditcommons.ALL_PERSPECTIVE;
            return !isActivePerspective && (!isAllPerspective || _this.testModeService.isE2EMode());
        });
    };
    PerspectiveSelectorComponent.prototype.filterPerspectives.$inject = ["perspectives"];
    /* @ngInject */ PerspectiveSelectorComponent.prototype.closeDropdown = function () {
        this.isOpen = false;
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.onPerspectiveAdded = function () {
        var _this = this;
        this.perspectiveService.getPerspectives().then(function (result) {
            _this.perspectives = result;
            _this.displayedPerspectives = _this.filterPerspectives(_this.perspectives);
        });
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.refreshPerspectives = function () {
        var _this = this;
        this.perspectiveService.getPerspectives().then(function (result) {
            _this.perspectives = result;
            _this._refreshActivePerspective();
            _this.displayedPerspectives = _this.filterPerspectives(_this.perspectives);
        });
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype._refreshActivePerspective = function () {
        this.activePerspective = this.perspectiveService.getActivePerspective();
    };
    /* @ngInject */ PerspectiveSelectorComponent.prototype.onClickHandler = function (event) {
        if (this.yjQuery(event.target).parents('.se-perspective-selector').length <= 0 &&
            this.isOpen) {
            this.closeDropdown();
        }
    };
    PerspectiveSelectorComponent.prototype.onClickHandler.$inject = ["event"];
    /* @ngInject */ PerspectiveSelectorComponent.prototype.togglePerspectiveSelector = function (value) {
        this.isDisabled = value;
    };
    PerspectiveSelectorComponent.prototype.togglePerspectiveSelector.$inject = ["value"];
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ PerspectiveSelectorComponent.prototype, "isOpen", void 0);
    __decorate([
        core.HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], /* @ngInject */ PerspectiveSelectorComponent.prototype, "onDocumentClick", null);
    /* @ngInject */ PerspectiveSelectorComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-perspective-selector',
            template: "<fd-popover [(isOpen)]=\"isOpen\" [closeOnOutsideClick]=\"false\" [triggers]=\"['click']\" *ngIf=\"hasActivePerspective()\" class=\"se-perspective-selector\" [placement]=\"'bottom-end'\" [disabled]=\"isDisabled\" [options]=\"popperOptions\"><fd-popover-control><div class=\"se-perspective-selector__trigger\"><se-tooltip [isChevronVisible]=\"true\" [triggers]=\"['mouseenter', 'mouseleave']\" *ngIf=\"isTooltipVisible()\"><span se-tooltip-trigger id=\"perspectiveTooltip\" class=\"hyicon hyicon-info se-perspective-selector__hotkey-tooltip--icon\"></span><div se-tooltip-body>{{ activePerspective.descriptionI18nKey | translate }}</div></se-tooltip><button class=\"se-perspective-selector__btn\" [disabled]=\"isDisabled\">{{getActivePerspectiveName() | translate}} <span class=\"se-perspective-selector__btn-arrow icon-navigation-down-arrow\"></span></button></div></fd-popover-control><fd-popover-body><ul class=\"se-perspective__list fd-list-group\" [ngClass]=\"{'se-perspective__list--tooltip': isTooltipVisible()}\" role=\"menu\"><li *ngFor=\"let choice of getDisplayedPerspectives()\" class=\"fd-list-group__item se-perspective__list-item fd-has-padding-none\"><a class=\"item se-perspective__list-item-text\" (click)=\"selectPerspective($event, choice.key);\">{{choice.nameI18nKey | translate}}</a></li></ul></fd-popover-body></fd-popover>"
        }),
        __param(1, core.Inject(smarteditcommons.YJQUERY_TOKEN)),
        __param(5, core.Inject(smarteditcommons.EVENT_SERVICE)),
        __metadata("design:paramtypes", [smarteditcommons.LogService, Function, smarteditcommons.IPerspectiveService,
            smarteditcommons.IIframeClickDetectionService,
            smarteditcommons.SystemEventService,
            smarteditcommons.CrossFrameEventService,
            smarteditcommons.TestModeService])
    ], /* @ngInject */ PerspectiveSelectorComponent);
    return /* @ngInject */ PerspectiveSelectorComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogHierarchyModalComponent", {
    selector: 'se-catalog-hierarchy-modal',
    template: "<div class=\"se-catalog-hierarchy-header\"><span>{{ 'se.catalog.hierarchy.modal.tree.header' | translate }}</span></div><div *ngIf=\"this.catalogs$ | async as catalogs\" class=\"se-catalog-hierarchy-body\"><se-catalog-hierarchy-node *ngFor=\"let catalog of catalogs; let i = index\" [catalog]=\"catalog\" [index]=\"i\" [isLast]=\"i === catalogs.length - 1\" [siteId]=\"siteId\" (siteSelect)=\"onSiteSelected()\"></se-catalog-hierarchy-node></div>"
});
var CatalogHierarchyModalComponent = /** @class */ (function () {
    function CatalogHierarchyModalComponent(modalService) {
        this.modalService = modalService;
    }
    CatalogHierarchyModalComponent.prototype.ngOnInit = function () {
        this.catalogs$ = this.modalService
            .getModalData()
            .pipe(operators.take(1))
            .toPromise()
            .then(function (_a) {
            var catalog = _a.catalog;
            return __spreadArrays(catalog.parents, [catalog]);
        });
    };
    CatalogHierarchyModalComponent.prototype.onSiteSelected = function () {
        this.modalService.close();
    };
    CatalogHierarchyModalComponent = __decorate([
        core.Component({
            selector: 'se-catalog-hierarchy-modal',
            template: "<div class=\"se-catalog-hierarchy-header\"><span>{{ 'se.catalog.hierarchy.modal.tree.header' | translate }}</span></div><div *ngIf=\"this.catalogs$ | async as catalogs\" class=\"se-catalog-hierarchy-body\"><se-catalog-hierarchy-node *ngFor=\"let catalog of catalogs; let i = index\" [catalog]=\"catalog\" [index]=\"i\" [isLast]=\"i === catalogs.length - 1\" [siteId]=\"siteId\" (siteSelect)=\"onSiteSelected()\"></se-catalog-hierarchy-node></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.FundamentalModalManagerService])
    ], CatalogHierarchyModalComponent);
    return CatalogHierarchyModalComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogDetailsComponent", {
    selector: 'se-catalog-details',
    template: "<div class=\"se-catalog-details\" [attr.data-catalog]=\"catalog.name | seL10n | async\"><div class=\"se-catalog-header\"><div class=\"se-catalog-header-flex\"><div class=\"se-catalog-details__header\">{{ catalog.name | seL10n | async }}</div><div *ngIf=\"catalog.parents?.length\"><a href=\"javascript:void(0)\" (click)=\"onOpenCatalogHierarchy()\">{{ 'se.landingpage.catalog.hierarchy' | translate }}</a></div></div></div><div class=\"se-catalog-details__content\"><se-catalog-version-details *ngFor=\"let catalogVersion of sortedCatalogVersions\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\" [siteId]=\"siteId\"></se-catalog-version-details></div></div>"
});
var /* @ngInject */ CatalogDetailsComponent = /** @class */ (function () {
    CatalogDetailsComponent.$inject = ["modalService"];
    function /* @ngInject */ CatalogDetailsComponent(modalService) {
        this.modalService = modalService;
        this.catalogDividerImage = 'static-resources/images/icon_catalog_arrow.png';
    }
    /* @ngInject */ CatalogDetailsComponent.prototype.ngOnInit = function () {
        this.activeCatalogVersion = this.catalog.versions.find(function (catalogVersion) { return catalogVersion.active; });
        this.sortedCatalogVersions = this.getSortedCatalogVersions();
        this.collapsibleConfiguration = {
            expandedByDefault: this.isCatalogForCurrentSite
        };
    };
    /* @ngInject */ CatalogDetailsComponent.prototype.onOpenCatalogHierarchy = function () {
        this.modalService.open({
            component: CatalogHierarchyModalComponent,
            data: {
                catalog: this.catalog
            },
            templateConfig: {
                title: 'se.catalog.hierarchy.modal.title',
                isDismissButtonVisible: true
            }
        });
    };
    /* @ngInject */ CatalogDetailsComponent.prototype.getSortedCatalogVersions = function () {
        return __spreadArrays([
            this.activeCatalogVersion
        ], this.catalog.versions.filter(function (catalogVersion) { return !catalogVersion.active; }));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogDetailsComponent.prototype, "catalog", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], /* @ngInject */ CatalogDetailsComponent.prototype, "isCatalogForCurrentSite", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ CatalogDetailsComponent.prototype, "siteId", void 0);
    /* @ngInject */ CatalogDetailsComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-catalog-details',
            template: "<div class=\"se-catalog-details\" [attr.data-catalog]=\"catalog.name | seL10n | async\"><div class=\"se-catalog-header\"><div class=\"se-catalog-header-flex\"><div class=\"se-catalog-details__header\">{{ catalog.name | seL10n | async }}</div><div *ngIf=\"catalog.parents?.length\"><a href=\"javascript:void(0)\" (click)=\"onOpenCatalogHierarchy()\">{{ 'se.landingpage.catalog.hierarchy' | translate }}</a></div></div></div><div class=\"se-catalog-details__content\"><se-catalog-version-details *ngFor=\"let catalogVersion of sortedCatalogVersions\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\" [siteId]=\"siteId\"></se-catalog-version-details></div></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.ModalService])
    ], /* @ngInject */ CatalogDetailsComponent);
    return /* @ngInject */ CatalogDetailsComponent;
}());

/**
 * @ignore
 * @internal
 *
 * Navigates to a site with the given site id.
 */
var /* @ngInject */ CatalogNavigateToSite = /** @class */ (function () {
    CatalogNavigateToSite.$inject = ["systemEvent"];
    function /* @ngInject */ CatalogNavigateToSite(systemEvent) {
        this.systemEvent = systemEvent;
    }
    /* @ngInject */ CatalogNavigateToSite.prototype.navigate = function (siteId) {
        this.systemEvent.publishAsync(SITES_ID + smarteditcommons.LINKED_DROPDOWN, {
            qualifier: 'site',
            optionObject: {
                contentCatalogs: [],
                uid: siteId,
                id: siteId,
                label: {},
                name: {},
                previewUrl: ''
            }
        });
    };
    CatalogNavigateToSite.prototype.navigate.$inject = ["siteId"];
    /* @ngInject */ CatalogNavigateToSite = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.SystemEventService])
    ], /* @ngInject */ CatalogNavigateToSite);
    return /* @ngInject */ CatalogNavigateToSite;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogHierarchyNodeMenuItemComponent", {
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    selector: 'se-catalog-hierarchy-node-menu-item',
    template: "\n        <a class=\"se-dropdown-item fd-menu__item\" (click)=\"onSiteSelect()\">\n            {{ name | seL10n | async }}\n        </a>\n    "
});
var CatalogHierarchyNodeMenuItemComponent = /** @class */ (function () {
    function CatalogHierarchyNodeMenuItemComponent(activateSite, data) {
        this.activateSite = activateSite;
        var _a = data.dropdownItem, name = _a.name, uid = _a.uid;
        this.name = name;
        this.uid = uid;
    }
    CatalogHierarchyNodeMenuItemComponent.prototype.onSiteSelect = function () {
        this.activateSite.navigate(this.uid);
    };
    CatalogHierarchyNodeMenuItemComponent = __decorate([
        core.Component({
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            selector: 'se-catalog-hierarchy-node-menu-item',
            template: "\n        <a class=\"se-dropdown-item fd-menu__item\" (click)=\"onSiteSelect()\">\n            {{ name | seL10n | async }}\n        </a>\n    "
        }),
        __param(1, core.Inject(smarteditcommons.DROPDOWN_MENU_ITEM_DATA)),
        __metadata("design:paramtypes", [CatalogNavigateToSite, Object])
    ], CatalogHierarchyNodeMenuItemComponent);
    return CatalogHierarchyNodeMenuItemComponent;
}());

var CATALOG_DROPDOWN_ANCHOR_CLASS = 'se-cth-node-anchor';
window.__smartedit__.addDecoratorPayload("Component", "CatalogHierarchyNodeComponent", {
    changeDetection: core.ChangeDetectionStrategy.OnPush,
    selector: 'se-catalog-hierarchy-node',
    template: "<div class=\"se-cth-node-name\" [style.padding-left.px]=\"15 * index\" [style.padding-right.px]=\"15 * index\" [class.se-cth-node-name__last]=\"isLast\"><fd-icon glyph=\"navigation-down-arrow\"></fd-icon>{{ (isLast ? catalog.name : catalog.catalogName) | seL10n | async }}&nbsp; <span *ngIf=\"isLast\">({{ 'se.catalog.hierarchy.modal.tree.this.catalog' | translate}})</span></div><div class=\"se-cth-node-sites\"><ng-container><ng-container *ngIf=\"hasOneSite; else hasManySites\"><a class=\"se-cth-node-anchor\" href=\"\" (click)=\"onNavigateToSite(catalog.sites[0].uid)\">{{ catalog.sites[0].name | seL10n | async }}<fd-icon glyph=\"navigation-right-arrow\"></fd-icon></a></ng-container><ng-template #hasManySites><se-dropdown-menu [dropdownItems]=\"dropdownItems\" useProjectedAnchor=\"1\" (click)=\"onSiteSelect($event)\"><span class=\"se-cth-node-anchor\">{{ this.catalog.sites.length }} Sites<fd-icon glyph=\"navigation-down-arrow\"></fd-icon></span></se-dropdown-menu></ng-template></ng-container></div>"
});
var CatalogHierarchyNodeComponent = /** @class */ (function () {
    function CatalogHierarchyNodeComponent(navigateToSite) {
        this.navigateToSite = navigateToSite;
        this.siteSelect = new core.EventEmitter();
    }
    CatalogHierarchyNodeComponent.prototype.ngOnChanges = function () {
        this.dropdownItems = this.getDropdownItems();
    };
    CatalogHierarchyNodeComponent.prototype.onNavigateToSite = function (siteUid) {
        this.navigateToSite.navigate(siteUid);
        this.siteSelect.emit();
    };
    CatalogHierarchyNodeComponent.prototype.onSiteSelect = function ($event) {
        var target = $event.target;
        if (!target.classList.contains(CATALOG_DROPDOWN_ANCHOR_CLASS) &&
            !target.closest("." + CATALOG_DROPDOWN_ANCHOR_CLASS)) {
            this.siteSelect.emit();
        }
    };
    Object.defineProperty(CatalogHierarchyNodeComponent.prototype, "hasOneSite", {
        get: function () {
            return this.catalog.sites.length === 1;
        },
        enumerable: false,
        configurable: true
    });
    CatalogHierarchyNodeComponent.prototype.getDropdownItems = function () {
        return this.catalog.sites.map(function (site) {
            return (__assign(__assign({}, site), { component: CatalogHierarchyNodeMenuItemComponent }));
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], CatalogHierarchyNodeComponent.prototype, "index", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], CatalogHierarchyNodeComponent.prototype, "catalog", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], CatalogHierarchyNodeComponent.prototype, "siteId", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], CatalogHierarchyNodeComponent.prototype, "isLast", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], CatalogHierarchyNodeComponent.prototype, "siteSelect", void 0);
    CatalogHierarchyNodeComponent = __decorate([
        core.Component({
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            selector: 'se-catalog-hierarchy-node',
            template: "<div class=\"se-cth-node-name\" [style.padding-left.px]=\"15 * index\" [style.padding-right.px]=\"15 * index\" [class.se-cth-node-name__last]=\"isLast\"><fd-icon glyph=\"navigation-down-arrow\"></fd-icon>{{ (isLast ? catalog.name : catalog.catalogName) | seL10n | async }}&nbsp; <span *ngIf=\"isLast\">({{ 'se.catalog.hierarchy.modal.tree.this.catalog' | translate}})</span></div><div class=\"se-cth-node-sites\"><ng-container><ng-container *ngIf=\"hasOneSite; else hasManySites\"><a class=\"se-cth-node-anchor\" href=\"\" (click)=\"onNavigateToSite(catalog.sites[0].uid)\">{{ catalog.sites[0].name | seL10n | async }}<fd-icon glyph=\"navigation-right-arrow\"></fd-icon></a></ng-container><ng-template #hasManySites><se-dropdown-menu [dropdownItems]=\"dropdownItems\" useProjectedAnchor=\"1\" (click)=\"onSiteSelect($event)\"><span class=\"se-cth-node-anchor\">{{ this.catalog.sites.length }} Sites<fd-icon glyph=\"navigation-down-arrow\"></fd-icon></span></se-dropdown-menu></ng-template></ng-container></div>"
        }),
        __metadata("design:paramtypes", [CatalogNavigateToSite])
    ], CatalogHierarchyNodeComponent);
    return CatalogHierarchyNodeComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogVersionDetailsComponent", {
    selector: 'se-catalog-version-details',
    template: "<div class=\"se-catalog-version-container\" [attr.data-catalog-version]=\"catalogVersion.version\"><div class=\"se-catalog-version-container__left\"><se-catalog-versions-thumbnail-carousel [catalogVersion]=\"catalogVersion\" [catalog]=\"catalog\" [siteId]=\"siteId\"></se-catalog-versions-thumbnail-carousel><div><div class=\"se-catalog-version-container__name\">{{catalogVersion.version}}</div><div class=\"se-catalog-version-container__left__templates\"><div class=\"se-catalog-version-container__left__template\" *ngFor=\"let item of leftItems; let isLast = last\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer><div class=\"se-catalog-version-container__divider\" *ngIf=\"!isLast\"></div></div></div></div></div><div class=\"se-catalog-version-container__right\"><div class=\"se-catalog-version-container__right__template\" *ngFor=\"let item of rightItems\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer></div></div></div>"
});
var /* @ngInject */ CatalogVersionDetailsComponent = /** @class */ (function () {
    CatalogVersionDetailsComponent.$inject = ["catalogDetailsService"];
    function /* @ngInject */ CatalogVersionDetailsComponent(catalogDetailsService) {
        this.catalogDetailsService = catalogDetailsService;
    }
    /* @ngInject */ CatalogVersionDetailsComponent.prototype.ngOnInit = function () {
        var _a = this.catalogDetailsService.getItems(), left = _a.left, right = _a.right;
        this.leftItems = left;
        this.rightItems = right;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionDetailsComponent.prototype, "catalog", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionDetailsComponent.prototype, "catalogVersion", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionDetailsComponent.prototype, "activeCatalogVersion", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ CatalogVersionDetailsComponent.prototype, "siteId", void 0);
    /* @ngInject */ CatalogVersionDetailsComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-catalog-version-details',
            template: "<div class=\"se-catalog-version-container\" [attr.data-catalog-version]=\"catalogVersion.version\"><div class=\"se-catalog-version-container__left\"><se-catalog-versions-thumbnail-carousel [catalogVersion]=\"catalogVersion\" [catalog]=\"catalog\" [siteId]=\"siteId\"></se-catalog-versions-thumbnail-carousel><div><div class=\"se-catalog-version-container__name\">{{catalogVersion.version}}</div><div class=\"se-catalog-version-container__left__templates\"><div class=\"se-catalog-version-container__left__template\" *ngFor=\"let item of leftItems; let isLast = last\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer><div class=\"se-catalog-version-container__divider\" *ngIf=\"!isLast\"></div></div></div></div></div><div class=\"se-catalog-version-container__right\"><div class=\"se-catalog-version-container__right__template\" *ngFor=\"let item of rightItems\"><se-catalog-version-item-renderer [item]=\"item\" [siteId]=\"siteId\" [catalog]=\"catalog\" [catalogVersion]=\"catalogVersion\" [activeCatalogVersion]=\"activeCatalogVersion\"></se-catalog-version-item-renderer></div></div></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.ICatalogDetailsService])
    ], /* @ngInject */ CatalogVersionDetailsComponent);
    return /* @ngInject */ CatalogVersionDetailsComponent;
}());

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
window.__smartedit__.addDecoratorPayload("Component", "CatalogVersionItemRendererComponent", {
    selector: 'se-catalog-version-item-renderer',
    template: "\n        <ng-container>\n            <div *ngIf=\"item.component\">\n                <ng-container\n                    *ngComponentOutlet=\"item.component; injector: itemInjector\"\n                ></ng-container>\n            </div>\n\n            <!--  AngularJS Support-->\n\n            <div\n                *ngIf=\"item.include\"\n                [ngInclude]=\"item.include\"\n                [compileHtmlNgController]=\"legacyController\"\n            ></div>\n        </ng-container>\n    "
});
var /* @ngInject */ CatalogVersionItemRendererComponent = /** @class */ (function () {
    CatalogVersionItemRendererComponent.$inject = ["injector"];
    function /* @ngInject */ CatalogVersionItemRendererComponent(injector) {
        this.injector = injector;
    }
    /* @ngInject */ CatalogVersionItemRendererComponent.prototype.ngOnInit = function () {
        this.createLegacyController();
        this.createInjector();
    };
    /* @ngInject */ CatalogVersionItemRendererComponent.prototype.ngOnChanges = function () {
        this.createLegacyController();
        this.createInjector();
    };
    /* @ngInject */ CatalogVersionItemRendererComponent.prototype.createLegacyController = function () {
        var _this = this;
        if (!this.item.include) {
            return;
        }
        this.legacyController = {
            alias: '$ctrl',
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            value: function () { return _this; }
        };
    };
    /* @ngInject */ CatalogVersionItemRendererComponent.prototype.createInjector = function () {
        if (!this.item.component) {
            return;
        }
        this.itemInjector = core.Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: smarteditcommons.CATALOG_DETAILS_ITEM_DATA,
                    useValue: {
                        siteId: this.siteId,
                        catalog: this.catalog,
                        catalogVersion: this.catalogVersion,
                        activeCatalogVersion: this.activeCatalogVersion
                    }
                }
            ]
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionItemRendererComponent.prototype, "item", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionItemRendererComponent.prototype, "catalog", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionItemRendererComponent.prototype, "catalogVersion", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionItemRendererComponent.prototype, "activeCatalogVersion", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ CatalogVersionItemRendererComponent.prototype, "siteId", void 0);
    /* @ngInject */ CatalogVersionItemRendererComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-catalog-version-item-renderer',
            template: "\n        <ng-container>\n            <div *ngIf=\"item.component\">\n                <ng-container\n                    *ngComponentOutlet=\"item.component; injector: itemInjector\"\n                ></ng-container>\n            </div>\n\n            <!--  AngularJS Support-->\n\n            <div\n                *ngIf=\"item.include\"\n                [ngInclude]=\"item.include\"\n                [compileHtmlNgController]=\"legacyController\"\n            ></div>\n        </ng-container>\n    "
        }),
        __metadata("design:paramtypes", [core.Injector])
    ], /* @ngInject */ CatalogVersionItemRendererComponent);
    return /* @ngInject */ CatalogVersionItemRendererComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "CatalogVersionsThumbnailCarouselComponent", {
    selector: 'se-catalog-versions-thumbnail-carousel',
    template: "<div class=\"se-active-catalog-thumbnail\"><div class=\"se-active-catalog-version-container__thumbnail\" (click)=\"onClick()\"><div class=\"se-active-catalog-version-container__thumbnail__default-img\"><div class=\"se-active-catalog-version-container__thumbnail__img\" [ngStyle]=\"{'background-image': 'url(' + catalogVersion.thumbnailUrl + ')'}\"></div></div></div></div>"
});
var /* @ngInject */ CatalogVersionsThumbnailCarouselComponent = /** @class */ (function () {
    CatalogVersionsThumbnailCarouselComponent.$inject = ["experienceService"];
    function /* @ngInject */ CatalogVersionsThumbnailCarouselComponent(experienceService) {
        this.experienceService = experienceService;
    }
    /* @ngInject */ CatalogVersionsThumbnailCarouselComponent.prototype.onClick = function () {
        this.experienceService.loadExperience({
            siteId: this.siteId,
            catalogId: this.catalog.catalogId,
            catalogVersion: this.catalogVersion.version
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionsThumbnailCarouselComponent.prototype, "catalog", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], /* @ngInject */ CatalogVersionsThumbnailCarouselComponent.prototype, "catalogVersion", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], /* @ngInject */ CatalogVersionsThumbnailCarouselComponent.prototype, "siteId", void 0);
    /* @ngInject */ CatalogVersionsThumbnailCarouselComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-catalog-versions-thumbnail-carousel',
            template: "<div class=\"se-active-catalog-thumbnail\"><div class=\"se-active-catalog-version-container__thumbnail\" (click)=\"onClick()\"><div class=\"se-active-catalog-version-container__thumbnail__default-img\"><div class=\"se-active-catalog-version-container__thumbnail__img\" [ngStyle]=\"{'background-image': 'url(' + catalogVersion.thumbnailUrl + ')'}\"></div></div></div></div>"
        }),
        __metadata("design:paramtypes", [smarteditcommons.IExperienceService])
    ], /* @ngInject */ CatalogVersionsThumbnailCarouselComponent);
    return /* @ngInject */ CatalogVersionsThumbnailCarouselComponent;
}());

window.__smartedit__.addDecoratorPayload("Component", "HomePageLinkComponent", {
    selector: 'se-home-page-link',
    template: "<div class=\"home-link-container\"><a href=\"javascript:void(0)\" class=\"home-link-item__link se-catalog-version__link\" (click)=\"onClick()\">{{ 'se.landingpage.homepage' | translate }}</a></div>"
});
var /* @ngInject */ HomePageLinkComponent = /** @class */ (function () {
    HomePageLinkComponent.$inject = ["experienceService", "data"];
    function /* @ngInject */ HomePageLinkComponent(experienceService, data) {
        this.experienceService = experienceService;
        this.data = data;
    }
    /* @ngInject */ HomePageLinkComponent.prototype.onClick = function () {
        var _a = this.data, siteId = _a.siteId, catalogId = _a.catalog.catalogId, catalogVersion = _a.catalogVersion.version;
        this.experienceService.loadExperience({
            siteId: siteId,
            catalogId: catalogId,
            catalogVersion: catalogVersion
        });
    };
    /* @ngInject */ HomePageLinkComponent = __decorate([
        smarteditcommons.SeDowngradeComponent(),
        core.Component({
            selector: 'se-home-page-link',
            template: "<div class=\"home-link-container\"><a href=\"javascript:void(0)\" class=\"home-link-item__link se-catalog-version__link\" (click)=\"onClick()\">{{ 'se.landingpage.homepage' | translate }}</a></div>"
        }),
        __param(1, core.Inject(smarteditcommons.CATALOG_DETAILS_ITEM_DATA)),
        __metadata("design:paramtypes", [smarteditcommons.IExperienceService, Object])
    ], /* @ngInject */ HomePageLinkComponent);
    return /* @ngInject */ HomePageLinkComponent;
}());

/**
 * The catalog details Service makes it possible to add items in form of directive
 * to the catalog details directive
 *
 */
var /* @ngInject */ CatalogDetailsService = /** @class */ (function () {
    function /* @ngInject */ CatalogDetailsService() {
        this._customItems = {
            left: [
                {
                    component: HomePageLinkComponent
                }
            ],
            right: []
        };
    }
    /**
     * This method allows to add a new item/items to the template array.
     *
     * @param  items An array that hold a list of items.
     * @param  column The place where the template will be added to. If this value is empty
     * the template will be added to the left side by default. The available places are defined in the
     * constant CATALOG_DETAILS_COLUMNS
     */
    /* @ngInject */ CatalogDetailsService.prototype.addItems = function (items, column) {
        var _a;
        if (column === smarteditcommons.CATALOG_DETAILS_COLUMNS.RIGHT) {
            this._customItems.right = this._customItems.right.concat(items);
        }
        else {
            this._customItems.left = this._customItems.left.splice(0);
            (_a = this._customItems.left).splice.apply(_a, __spreadArrays([this._customItems.left.length - 1, 0], items));
        }
    };
    CatalogDetailsService.prototype.addItems.$inject = ["items", "column"];
    /**
     * This retrieves the list of items currently extending catalog version details components.
     */
    /* @ngInject */ CatalogDetailsService.prototype.getItems = function () {
        return this._customItems;
    };
    /* @ngInject */ CatalogDetailsService = __decorate([
        smarteditcommons.SeDowngradeService(smarteditcommons.ICatalogDetailsService)
    ], /* @ngInject */ CatalogDetailsService);
    return /* @ngInject */ CatalogDetailsService;
}());

/**
 * This module contains the {@link CatalogDetailsModule.component:catalogVersionDetails} component.
 */
var CatalogDetailsModule = /** @class */ (function () {
    function CatalogDetailsModule() {
    }
    CatalogDetailsModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                smarteditcommons.CollapsibleContainerModule,
                smarteditcommons.CompileHtmlModule,
                smarteditcommons.L10nPipeModule,
                smarteditcommons.SharedComponentsModule,
                core$2.IconModule,
                core$1.TranslateModule.forChild()
            ],
            providers: [
                { provide: smarteditcommons.ICatalogDetailsService, useClass: CatalogDetailsService },
                CatalogNavigateToSite
            ],
            declarations: [
                HomePageLinkComponent,
                CatalogDetailsComponent,
                CatalogVersionDetailsComponent,
                CatalogVersionsThumbnailCarouselComponent,
                CatalogVersionItemRendererComponent,
                CatalogHierarchyModalComponent,
                CatalogHierarchyNodeComponent,
                CatalogHierarchyNodeMenuItemComponent
            ],
            entryComponents: [
                CatalogVersionsThumbnailCarouselComponent,
                CatalogVersionDetailsComponent,
                HomePageLinkComponent,
                CatalogDetailsComponent,
                CatalogVersionItemRendererComponent,
                CatalogHierarchyModalComponent,
                CatalogHierarchyNodeComponent,
                CatalogHierarchyNodeMenuItemComponent
            ],
            exports: [CatalogDetailsComponent]
        })
    ], CatalogDetailsModule);
    return CatalogDetailsModule;
}());

// https://stackoverflow.com/questions/38888008/how-can-i-use-create-dynamic-template-to-compile-dynamic-component-with-angular
var SmarteditContainerFactory = function (bootstrapPayload) {
    var Smarteditcontainer = /** @class */ (function () {
        function Smarteditcontainer() {
        }
        Smarteditcontainer = __decorate([
            core.NgModule({
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                imports: __spreadArrays([
                    platformBrowser.BrowserModule,
                    animations.BrowserAnimationsModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    _static.UpgradeModule,
                    http.HttpClientModule,
                    AlertServiceModule,
                    smarteditcommons.FundamentalsModule,
                    smarteditcommons.SeGenericEditorModule,
                    smarteditcommons.SharedComponentsModule,
                    smarteditcommons.ClientPagedListModule,
                    smarteditcommons.FilterByFieldPipeModule,
                    NotificationPanelModule,
                    StorageModule.forRoot(),
                    ToolbarModule,
                    CatalogDetailsModule,
                    smarteditcommons.SelectModule,
                    HotkeyNotificationModule,
                    ProductCatalogVersionModule,
                    smarteditcommons.HttpInterceptorModule.forRoot(smarteditcommons.UnauthorizedErrorInterceptor, smarteditcommons.ResourceNotFoundErrorInterceptor, smarteditcommons.RetryInterceptor, smarteditcommons.NonValidationErrorInterceptor, smarteditcommons.PreviewErrorInterceptor, smarteditcommons.PermissionErrorInterceptor),
                    smarteditcommons.SeTranslationModule.forRoot(TranslationsFetchService),
                    SmarteditServicesModule
                ], bootstrapPayload.modules, [
                    // AngularJS router is left with '/' path for Landing Page
                    // Routes are "flat" because there are routes registered also in cmssmarteditcontainer.ts
                    // And they conflict each (overriding themselves)
                    smarteditcommons.SeRouteService.provideNgRoute([
                        {
                            path: smarteditcommons.NG_ROUTE_PREFIX,
                            shortcutComponent: SitesLinkComponent,
                            component: LandingPageComponent
                        },
                        {
                            path: smarteditcommons.NG_ROUTE_PREFIX + "/sites/:siteId",
                            component: LandingPageComponent
                        },
                        {
                            path: smarteditcommons.NG_ROUTE_PREFIX + "/storefront",
                            canActivate: [StorefrontPageGuard],
                            priority: 30,
                            titleI18nKey: 'se.route.storefront.title',
                            component: StorefrontPageComponent
                        },
                        {
                            path: smarteditcommons.NG_ROUTE_WILDCARD,
                            component: InvalidRouteComponent
                        }
                    ], { useHash: true, initialNavigation: true, onSameUrlNavigation: 'reload' })
                ]),
                declarations: [
                    SmarteditcontainerComponent,
                    InvalidRouteComponent,
                    SitesLinkComponent,
                    smarteditcommons.ConfirmDialogComponent,
                    AnnouncementComponent,
                    AnnouncementBoardComponent,
                    ConfigurationModalComponent,
                    PerspectiveSelectorComponent,
                    HeartBeatAlertComponent,
                    LandingPageComponent,
                    StorefrontPageComponent
                ],
                entryComponents: [
                    SmarteditcontainerComponent,
                    SitesLinkComponent,
                    smarteditcommons.ConfirmDialogComponent,
                    AnnouncementComponent,
                    ConfigurationModalComponent,
                    PerspectiveSelectorComponent,
                    HeartBeatAlertComponent,
                    LandingPageComponent,
                    StorefrontPageComponent
                ],
                providers: [
                    {
                        provide: core.ErrorHandler,
                        useClass: smarteditcommons.SmarteditErrorHandler
                    },
                    SiteService,
                    smarteditcommons.SSOAuthenticationHelper,
                    smarteditcommons.moduleUtils.provideValues(bootstrapPayload.constants),
                    { provide: router.UrlHandlingStrategy, useClass: smarteditcommons.CustomHandlingStrategy },
                    // APP_BASE_HREF = "!" to be matching legacy angular JS setup
                    { provide: common.APP_BASE_HREF, useValue: '!' },
                    smarteditcommons.LegacyGEWidgetToCustomElementConverter,
                    IframeManagerService,
                    {
                        provide: smarteditcommons.IAuthenticationManagerService,
                        useClass: smarteditcommons.AuthenticationManager
                    },
                    {
                        provide: smarteditcommons.IAuthenticationService,
                        useClass: smarteditcommons.AuthenticationService
                    },
                    {
                        provide: smarteditcommons.IConfirmationModalService,
                        useClass: ConfirmationModalService
                    },
                    {
                        provide: smarteditcommons.ISharedDataService,
                        useClass: SharedDataService
                    },
                    smarteditcommons.SeRouteService,
                    {
                        provide: smarteditcommons.ISessionService,
                        useClass: SessionService
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
                    smarteditcommons.ContentCatalogRestService,
                    smarteditcommons.ProductCatalogRestService,
                    LoadConfigManagerService,
                    smarteditcommons.moduleUtils.bootstrap(function (auth, gatewayProxy, bootstrapIndicator, featureService, configurationModalService, toolbarServiceFactory, loadConfigManagerService, gatewayFactory, smarteditBootstrapGateway, yjQuery, iframeManagerService, waitDialogService, promiseUtils, bootstrapService, sharedDataService, modalService, renderService, heartBeatService, routingService) {
                        gatewayProxy.initForService(auth, [
                            'filterEntryPoints',
                            'isAuthEntryPoint',
                            'authenticate',
                            'logout',
                            'isReAuthInProgress',
                            'setReAuthInProgress',
                            'isAuthenticated'
                        ], smarteditcommons.diNameUtils.buildServiceName(smarteditcommons.AuthenticationService));
                        gatewayFactory.initListener();
                        bootstrapIndicator.onSmarteditContainerReady().subscribe(function () {
                            routingService.init();
                            routingService.routeChangeSuccess().subscribe(function (event) {
                                modalService.dismissAll();
                            });
                            loadConfigManagerService.loadAsObject().then(function (configurations) {
                                sharedDataService.set('defaultToolingLanguage', configurations.defaultToolingLanguage);
                                if (!!configurations.typeAheadDebounce) {
                                    sharedDataService.set('typeAheadDebounce', configurations.typeAheadDebounce);
                                }
                                if (!!configurations.typeAheadMiniSearchTermLength) {
                                    sharedDataService.set('typeAheadMiniSearchTermLength', configurations.typeAheadMiniSearchTermLength);
                                }
                            });
                            featureService.addToolbarItem({
                                toolbarId: 'smartEditPerspectiveToolbar',
                                key: smarteditcommons.PERSPECTIVE_SELECTOR_WIDGET_KEY,
                                nameI18nKey: 'se.perspective.selector.widget',
                                type: 'TEMPLATE',
                                priority: 1,
                                section: 'left',
                                component: PerspectiveSelectorComponent
                            });
                            var smartEditHeaderToolbarService = toolbarServiceFactory.getToolbarService('smartEditHeaderToolbar');
                            smartEditHeaderToolbarService.addItems([
                                {
                                    key: 'headerToolbar.logoTemplate',
                                    type: smarteditcommons.ToolbarItemType.TEMPLATE,
                                    component: LogoComponent,
                                    priority: 1,
                                    section: smarteditcommons.ToolbarSection.left
                                },
                                {
                                    key: 'headerToolbar.userAccountTemplate',
                                    type: smarteditcommons.ToolbarItemType.HYBRID_ACTION,
                                    iconClassName: 'sap-icon--customer',
                                    component: UserAccountComponent,
                                    priority: 1,
                                    actionButtonFormat: 'compact',
                                    section: smarteditcommons.ToolbarSection.right,
                                    dropdownPosition: smarteditcommons.ToolbarDropDownPosition.right
                                },
                                {
                                    key: 'headerToolbar.languageSelectorTemplate',
                                    type: smarteditcommons.ToolbarItemType.HYBRID_ACTION,
                                    iconClassName: 'sap-icon--world',
                                    component: smarteditcommons.HeaderLanguageDropdownComponent,
                                    priority: 2,
                                    actionButtonFormat: 'compact',
                                    section: smarteditcommons.ToolbarSection.right,
                                    dropdownPosition: smarteditcommons.ToolbarDropDownPosition.center
                                },
                                {
                                    key: 'headerToolbar.configurationTemplate',
                                    type: smarteditcommons.ToolbarItemType.ACTION,
                                    actionButtonFormat: 'compact',
                                    iconClassName: 'icon-action-settings',
                                    callback: function () {
                                        configurationModalService.editConfiguration();
                                    },
                                    priority: 3,
                                    section: smarteditcommons.ToolbarSection.right,
                                    permissions: ['smartedit.configurationcenter.read']
                                }
                            ]);
                            var smartEditExperienceToolbarService = toolbarServiceFactory.getToolbarService('smartEditExperienceToolbar');
                            smartEditExperienceToolbarService.addItems([
                                {
                                    key: 'se.cms.shortcut',
                                    type: smarteditcommons.ToolbarItemType.TEMPLATE,
                                    component: ShortcutLinkComponent,
                                    priority: 1,
                                    section: smarteditcommons.ToolbarSection.left
                                },
                                {
                                    key: 'experienceToolbar.deviceSupportTemplate',
                                    type: smarteditcommons.ToolbarItemType.TEMPLATE,
                                    component: DeviceSupportWrapperComponent,
                                    priority: 1,
                                    section: smarteditcommons.ToolbarSection.right
                                },
                                {
                                    type: smarteditcommons.ToolbarItemType.TEMPLATE,
                                    key: 'experienceToolbar.experienceSelectorTemplate',
                                    // className: 'se-experience-selector',
                                    component: ExperienceSelectorWrapperComponent,
                                    priority: 1,
                                    section: smarteditcommons.ToolbarSection.middle
                                }
                            ]);
                            function offSetStorefront() {
                                // Set the storefront offset
                                yjQuery(smarteditcommons.SMARTEDIT_IFRAME_WRAPPER_ID).css('padding-top', yjQuery('.se-toolbar-group').height() + 'px');
                            }
                            // storefront actually loads twice all the JS files, including webApplicationInjector.js, smartEdit must be protected against receiving twice a smartEditBootstrap event
                            function getBootstrapNamespace() {
                                /* forbiddenNameSpaces window._:false */
                                if (window.__smartedit__.smartEditBootstrapped) {
                                    window.__smartedit__.smartEditBootstrapped = {};
                                }
                                return window.__smartedit__.smartEditBootstrapped;
                            }
                            smarteditBootstrapGateway
                                .getInstance()
                                .subscribe('loading', function (eventId, data) {
                                var deferred = promiseUtils.defer();
                                iframeManagerService.setCurrentLocation(data.location);
                                waitDialogService.showWaitModal();
                                var smartEditBootstrapped = getBootstrapNamespace();
                                delete smartEditBootstrapped[data.location];
                                return deferred.promise;
                            });
                            smarteditBootstrapGateway
                                .getInstance()
                                .subscribe('unloading', function (eventId, data) {
                                var deferred = promiseUtils.defer();
                                waitDialogService.showWaitModal();
                                return deferred.promise;
                            });
                            smarteditBootstrapGateway
                                .getInstance()
                                .subscribe('bootstrapSmartEdit', function (eventId, data) {
                                offSetStorefront();
                                var deferred = promiseUtils.defer();
                                var smartEditBootstrapped = getBootstrapNamespace();
                                if (!smartEditBootstrapped[data.location]) {
                                    smartEditBootstrapped[data.location] = true;
                                    loadConfigManagerService
                                        .loadAsObject()
                                        .then(function (configurations) {
                                        bootstrapService.bootstrapSEApp(configurations);
                                        deferred.resolve();
                                    });
                                }
                                else {
                                    deferred.resolve();
                                }
                                return deferred.promise;
                            });
                            smarteditBootstrapGateway
                                .getInstance()
                                .subscribe('smartEditReady', function () {
                                var deferred = promiseUtils.defer();
                                deferred.resolve();
                                waitDialogService.hideWaitModal();
                                return deferred.promise;
                            });
                        });
                    }, [
                        smarteditcommons.IAuthenticationService,
                        smarteditcommons.GatewayProxy,
                        smarteditcommons.AngularJSBootstrapIndicatorService,
                        smarteditcommons.IFeatureService,
                        ConfigurationModalService,
                        smarteditcommons.IToolbarServiceFactory,
                        LoadConfigManagerService,
                        smarteditcommons.GatewayFactory,
                        smarteditcommons.SmarteditBootstrapGateway,
                        smarteditcommons.YJQUERY_TOKEN,
                        IframeManagerService,
                        smarteditcommons.IWaitDialogService,
                        smarteditcommons.PromiseUtils,
                        BootstrapService,
                        smarteditcommons.ISharedDataService,
                        smarteditcommons.IModalService,
                        smarteditcommons.IRenderService,
                        HeartBeatService,
                        smarteditcommons.SmarteditRoutingService
                    ]),
                    smarteditcommons.moduleUtils.initialize(function (legacyGEWidgetToCustomElementConverter, delegateRestService, httpClient, restServiceFactory, permissionsRegistrationService, permissionService, authorizationService, l10nService) {
                        smarteditcommons.diBridgeUtils.downgradeService('httpClient', http.HttpClient);
                        smarteditcommons.diBridgeUtils.downgradeService('restServiceFactory', smarteditcommons.RestServiceFactory);
                        smarteditcommons.diBridgeUtils.downgradeService('authenticationService', smarteditcommons.AuthenticationService, smarteditcommons.IAuthenticationService);
                        permissionService.registerDefaultRule({
                            names: [DEFAULT_DEFAULT_RULE_NAME],
                            verify: function (permissionNameObjs) {
                                var permissionNames = permissionNameObjs.map(function (permissionName) { return permissionName.name; });
                                return authorizationService.hasGlobalPermissions(permissionNames);
                            }
                        });
                        legacyGEWidgetToCustomElementConverter.convert();
                        permissionsRegistrationService.registerRulesAndPermissions();
                        return l10nService.resolveLanguage();
                    }, [
                        smarteditcommons.LegacyGEWidgetToCustomElementConverter,
                        DelegateRestService,
                        http.HttpClient,
                        smarteditcommons.RestServiceFactory,
                        PermissionsRegistrationService,
                        smarteditcommons.IPermissionService,
                        smarteditcommons.AuthorizationService,
                        smarteditcommons.L10nService
                    ])
                ],
                bootstrap: [SmarteditcontainerComponent]
            })
        ], Smarteditcontainer);
        return Smarteditcontainer;
    }());
    return Smarteditcontainer;
};

if (process.env.NODE_ENV === 'production') {
    core.enableProdMode();
}

exports.AlertServiceModule = AlertServiceModule;
exports.BootstrapService = BootstrapService;
exports.CatalogAwareRouteResolverHelper = CatalogAwareRouteResolverHelper;
exports.ConfigurationExtractorService = ConfigurationExtractorService;
exports.DelegateRestService = DelegateRestService;
exports.LegacySmarteditServicesModule = LegacySmarteditServicesModule;
exports.LoadConfigManagerService = LoadConfigManagerService;
exports.ProductService = ProductService;
exports.SessionService = SessionService;
exports.SharedDataService = SharedDataService;
exports.SmarteditContainerFactory = SmarteditContainerFactory;
exports.StorageService = StorageService;
exports.ToolbarModule = ToolbarModule;
exports.TranslationsFetchService = TranslationsFetchService;
