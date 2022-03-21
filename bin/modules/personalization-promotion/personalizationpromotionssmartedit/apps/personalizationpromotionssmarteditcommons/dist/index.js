'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var smarteditcommons = require('smarteditcommons');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('personalizationpromotionssmarteditCommonTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('personalizationpromotionssmarteditCommonTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
        
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

var /* @ngInject */ PersonalizationpromotionssmarteditRestService = /** @class */ (function () {
    PersonalizationpromotionssmarteditRestService.$inject = ["restServiceFactory", "personalizationsmarteditUtils"];
    function /* @ngInject */ PersonalizationpromotionssmarteditRestService(restServiceFactory, personalizationsmarteditUtils) {
        this.restServiceFactory = restServiceFactory;
        this.personalizationsmarteditUtils = personalizationsmarteditUtils;
    }
    /* @ngInject */ PersonalizationpromotionssmarteditRestService_1 = /* @ngInject */ PersonalizationpromotionssmarteditRestService;
    /* @ngInject */ PersonalizationpromotionssmarteditRestService.prototype.getPromotions = function (catalogVersions) {
        var _this = this;
        var restService = this.restServiceFactory.get(/* @ngInject */ PersonalizationpromotionssmarteditRestService_1.AVAILABLE_PROMOTIONS);
        var entries = [];
        catalogVersions = catalogVersions || [];
        catalogVersions.forEach(function (element, i) {
            _this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "catalog" + i, element.catalog);
            _this.personalizationsmarteditUtils.pushToArrayIfValueExists(entries, "version" + i, element.catalogVersion);
        });
        var requestParams = {
            params: {
                entry: entries
            }
        };
        return restService.save(requestParams);
    };
    PersonalizationpromotionssmarteditRestService.prototype.getPromotions.$inject = ["catalogVersions"];
    var /* @ngInject */ PersonalizationpromotionssmarteditRestService_1;
    /* @ngInject */ PersonalizationpromotionssmarteditRestService.AVAILABLE_PROMOTIONS = "/personalizationwebservices/v1/query/cxpromotionsforcatalog";
    /* @ngInject */ PersonalizationpromotionssmarteditRestService = /* @ngInject */ PersonalizationpromotionssmarteditRestService_1 = __decorate([
        smarteditcommons.SeInjectable(),
        __metadata("design:paramtypes", [Object, Object])
    ], /* @ngInject */ PersonalizationpromotionssmarteditRestService);
    return /* @ngInject */ PersonalizationpromotionssmarteditRestService;
}());

var /* @ngInject */ PersonalizationpromotionssmarteditServiceModule = /** @class */ (function () {
    function /* @ngInject */ PersonalizationpromotionssmarteditServiceModule() {
    }
    /* @ngInject */ PersonalizationpromotionssmarteditServiceModule = __decorate([
        smarteditcommons.SeModule({
            imports: [
                'smarteditServicesModule',
                'personalizationsmarteditCommonsModule'
            ],
            providers: [
                PersonalizationpromotionssmarteditRestService
            ]
        })
    ], /* @ngInject */ PersonalizationpromotionssmarteditServiceModule);
    return /* @ngInject */ PersonalizationpromotionssmarteditServiceModule;
}());

exports.PersonalizationpromotionssmarteditRestService = PersonalizationpromotionssmarteditRestService;
exports.PersonalizationpromotionssmarteditServiceModule = PersonalizationpromotionssmarteditServiceModule;
