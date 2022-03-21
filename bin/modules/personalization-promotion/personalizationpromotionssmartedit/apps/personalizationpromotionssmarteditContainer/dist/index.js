'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var smarteditcommons = require('smarteditcommons');
var personalizationpromotionssmarteditcommons = require('personalizationpromotionssmarteditcommons');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationpromotionssmarteditContainerTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationpromotionssmarteditContainerTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
         
    $templateCache.put(
        "personalizationpromotionssmarteditPromotionsTemplate.html", 
        "<div><label for=\"promotion-selector-1\" class=\"fd-form__label\" data-translate=\"personalization.modal.commercecustomization.promotion.label\"></label><ui-select data-ng-init=\"$ctrl.initUiSelect($select)\" id=\"promotion-selector-1\" class=\"form-control\" data-ng-model=\"$ctrl.promotion\" on-select=\"$ctrl.promotionSelected($item, $select)\" theme=\"select2\" search-enabled=\"true\"><ui-select-match placeholder=\"{{'personalization.modal.commercecustomization.promotion.search.placeholder' | translate}}\"><span>{{'personalization.modal.commercecustomization.promotion.search.placeholder' | translate}}</span></ui-select-match><ui-select-choices repeat=\"item in $ctrl.availablePromotions | filter: $select.search\" ui-disable-choice=\"$ctrl.isItemInSelectDisabled(item)\" position=\"down\"><div class=\"row ng-scope\"><span class=\"col-md-8 perso-wrap-ellipsis\" data-ng-bind=\"item.code\" title=\"{{item.code}}\"></span> <span class=\"col-md-4\" data-ng-bind=\"item.promotionGroup\" title=\"{{item.promotionGroup}}\"></span></div></ui-select-choices></ui-select></div>"
    );
     
    $templateCache.put(
        "personalizationpromotionssmarteditPromotionsWrapperTemplate.html", 
        "<personalizationpromotionssmartedit-promotions></personalizationpromotionssmartedit-promotions>"
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

var /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent = /** @class */ (function () {
    PersonalizationpromotionssmarteditPromotionsComponent.$inject = ["$q", "$filter", "personalizationpromotionssmarteditRestService", "personalizationsmarteditMessageHandler", "actionsDataFactory", "experienceService"];
    function /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent($q, $filter, personalizationpromotionssmarteditRestService, personalizationsmarteditMessageHandler, actionsDataFactory, experienceService) {
        this.$q = $q;
        this.$filter = $filter;
        this.personalizationpromotionssmarteditRestService = personalizationpromotionssmarteditRestService;
        this.personalizationsmarteditMessageHandler = personalizationsmarteditMessageHandler;
        this.actionsDataFactory = actionsDataFactory;
        this.experienceService = experienceService;
        this.promotion = null;
        this.availablePromotions = [];
    }
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.$onInit = function () {
        this.getAvailablePromotions();
    };
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.getCatalogs = function () {
        var deferred = this.$q.defer();
        this.experienceService.getCurrentExperience().then(function (experience) {
            var catalogs = [];
            catalogs.push({
                catalog: experience.catalogDescriptor.catalogId,
                catalogVersion: experience.catalogDescriptor.catalogVersion
            });
            experience.productCatalogVersions.forEach(function (item) {
                catalogs.push({
                    catalog: item.catalog,
                    catalogVersion: item.catalogVersion
                });
            });
            deferred.resolve(catalogs);
        });
        return deferred.promise;
    };
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.getPromotions = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.getCatalogs().then(function (catalogs) {
            _this.personalizationpromotionssmarteditRestService.getPromotions(catalogs).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
        });
        return deferred.promise;
    };
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.getAvailablePromotions = function () {
        var _this = this;
        this.getPromotions()
            .then(function (response) {
            _this.availablePromotions = response.promotions;
        }, function () {
            _this.personalizationsmarteditMessageHandler.sendError(_this.$filter('translate')('personalization.error.gettingpromotions'));
        });
    };
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.buildAction = function (item) {
        return {
            type: 'cxPromotionActionData',
            promotionId: item.code
        };
    };
    PersonalizationpromotionssmarteditPromotionsComponent.prototype.buildAction.$inject = ["item"];
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.comparer = function (a1, a2) {
        return a1.type === a2.type && a1.promotionId === a2.promotionId;
    };
    PersonalizationpromotionssmarteditPromotionsComponent.prototype.comparer.$inject = ["a1", "a2"];
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.promotionSelected = function (item, uiSelectObject) {
        var action = this.buildAction(item);
        this.actionsDataFactory.addAction(action, this.comparer);
        uiSelectObject.selected = null;
    };
    PersonalizationpromotionssmarteditPromotionsComponent.prototype.promotionSelected.$inject = ["item", "uiSelectObject"];
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.isItemInSelectDisabled = function (item) {
        var action = this.buildAction(item);
        return this.actionsDataFactory.isItemInSelectedActions(action, this.comparer);
    };
    PersonalizationpromotionssmarteditPromotionsComponent.prototype.isItemInSelectDisabled.$inject = ["item"];
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent.prototype.initUiSelect = function (uiSelectController) {
        uiSelectController.isActive = function () {
            return false;
        };
    };
    PersonalizationpromotionssmarteditPromotionsComponent.prototype.initUiSelect.$inject = ["uiSelectController"];
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent = __decorate([
        smarteditcommons.SeComponent({
            templateUrl: 'personalizationpromotionssmarteditPromotionsTemplate.html'
        }),
        __metadata("design:paramtypes", [Function, Function, personalizationpromotionssmarteditcommons.PersonalizationpromotionssmarteditRestService, Object, Object, smarteditcommons.IExperienceService])
    ], /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent);
    return /* @ngInject */ PersonalizationpromotionssmarteditPromotionsComponent;
}());

var /* @ngInject */ PersonalizationpromotionssmarteditPromotionsModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationpromotionssmarteditPromotionsModule() {
    }
    /* @ngInject */ PersonalizationpromotionssmarteditPromotionsModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationsmarteditCommonsModule',
                'personalizationsmarteditCommerceCustomizationModule',
                personalizationpromotionssmarteditcommons.PersonalizationpromotionssmarteditServiceModule,
                'smarteditServicesModule'
            ],
            config: ["$logProvider", function ($logProvider) {
                'ngInject';
                $logProvider.debugEnabled(false);
            }],
            declarations: [PersonalizationpromotionssmarteditPromotionsComponent],
            initialize: ["personalizationsmarteditCommerceCustomizationService", "$filter", function (personalizationsmarteditCommerceCustomizationService, $filter) {
                'ngInject';
                personalizationsmarteditCommerceCustomizationService.registerType({
                    type: 'cxPromotionActionData',
                    text: 'personalization.modal.commercecustomization.action.type.promotion',
                    template: 'personalizationpromotionssmarteditPromotionsWrapperTemplate.html',
                    confProperty: 'personalizationsmartedit.commercecustomization.promotions.enabled',
                    getName: function (action) {
                        return $filter('translate')('personalization.modal.commercecustomization.promotion.display.name') + " - " + action.promotionId;
                    }
                });
            }]
        })
    ], /* @ngInject */ PersonalizationpromotionssmarteditPromotionsModule);
    return /* @ngInject */ PersonalizationpromotionssmarteditPromotionsModule;
}());

var /* @ngInject */ PersonalizationpromotionssmarteditContainer = /** @class */ (function () {
    function /* @ngInject */ PersonalizationpromotionssmarteditContainer() {
    }
    /* @ngInject */ PersonalizationpromotionssmarteditContainer = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'personalizationpromotionssmarteditContainerTemplates',
                'yjqueryModule',
                PersonalizationpromotionssmarteditPromotionsModule
            ],
            config: ["$logProvider", function ($logProvider) {
                'ngInject';
                $logProvider.debugEnabled(false);
            }],
            initialize: ["yjQuery", "domain", function (yjQuery, domain) {
                'ngInject';
                // const loadCSS = (href: string) => {
                // 	const cssLink = yjQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
                // 	yjQuery("head").append(cssLink);
                // };
                // loadCSS(domain + "/personalizationpromotionssmartedit/css/style.css");
            }]
        })
    ], /* @ngInject */ PersonalizationpromotionssmarteditContainer);
    return /* @ngInject */ PersonalizationpromotionssmarteditContainer;
}());

exports.PersonalizationpromotionssmarteditContainer = PersonalizationpromotionssmarteditContainer;
