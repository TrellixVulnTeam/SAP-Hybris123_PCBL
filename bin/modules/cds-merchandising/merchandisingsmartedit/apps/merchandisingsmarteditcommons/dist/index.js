'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@angular/core');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var smarteditcommons = require('smarteditcommons');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('merchandisingsmarteditCommonTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('merchandisingsmarteditCommonTemplates', []);
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

///
var /* @ngInject */ MerchandisingExperienceInterceptor = /** @class */ (function () {
    MerchandisingExperienceInterceptor.$inject = ["sharedDataService"];
    function /* @ngInject */ MerchandisingExperienceInterceptor(sharedDataService) {
        this.sharedDataService = sharedDataService;
    }
    /* @ngInject */ MerchandisingExperienceInterceptor_1 = /* @ngInject */ MerchandisingExperienceInterceptor;
    /* @ngInject */ MerchandisingExperienceInterceptor.prototype.intercept = function (request, next) {
        if (/* @ngInject */ MerchandisingExperienceInterceptor_1.MERCHCMSWEBSERVICES_PATH.test(request.url)) {
            return rxjs.from(this.sharedDataService.get("experience")).pipe(operators.switchMap(function (experience) {
                if (experience) {
                    if (request.url.indexOf(smarteditcommons.CONTEXT_SITE_ID) > -1) {
                        var params = request.params;
                        if (params) {
                            params = params
                                .delete("catalogId")
                                .delete("catalogVersion")
                                .delete("mask");
                        }
                        var updatedUrlRequest = request.clone({
                            url: request.url.replace(smarteditcommons.CONTEXT_SITE_ID, experience.catalogDescriptor.siteId),
                            params: params
                        });
                        return next.handle(updatedUrlRequest);
                    }
                }
                return next.handle(request);
            }));
        }
        else {
            return next.handle(request);
        }
    };
    MerchandisingExperienceInterceptor.prototype.intercept.$inject = ["request", "next"];
    var /* @ngInject */ MerchandisingExperienceInterceptor_1;
    /* @ngInject */ MerchandisingExperienceInterceptor.MERCHCMSWEBSERVICES_PATH = /\/merchandisingcmswebservices/;
    /* @ngInject */ MerchandisingExperienceInterceptor = /* @ngInject */ MerchandisingExperienceInterceptor_1 = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [smarteditcommons.ISharedDataService])
    ], /* @ngInject */ MerchandisingExperienceInterceptor);
    return /* @ngInject */ MerchandisingExperienceInterceptor;
}());

exports.MerchandisingExperienceInterceptor = MerchandisingExperienceInterceptor;
