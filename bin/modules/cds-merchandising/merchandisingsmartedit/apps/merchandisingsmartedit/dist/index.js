'use strict';

var angular = require('angular');
var _static = require('@angular/upgrade/static');
var core = require('@angular/core');
var smarteditcommons = require('smarteditcommons');

(function(){
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('merchandisingsmarteditTemplates');
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('merchandisingsmarteditTemplates', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
        
      }]);
    })();

///
angular.module("merchandisingsmartedit", ["smarteditServicesModule"])
    .run(["contextualMenuService", "sharedDataService", function (contextualMenuService, sharedDataService) {
    "ngInject";
    var setUpContextualMenu = function () {
        contextualMenuService.addItems({
            MerchandisingCarouselComponent: [
                {
                    key: "MerchandisingCarouselComponent",
                    i18nKey: "Edit Strategy",
                    action: {
                        callback: function (configuration, event) {
                            sharedDataService
                                .get("contextDrivenServicesMerchandisingUrl")
                                .then(function (url) {
                                var appUrl = "https://" + url;
                                window.open(appUrl);
                            }.bind(this));
                        }
                    },
                    displayClass: "icon-activate"
                }
            ]
        });
    };
    setUpContextualMenu();
}]);

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

///
var MerchandisingSmartEditModule = /** @class */ (function () {
    function MerchandisingSmartEditModule() {
    }
    MerchandisingSmartEditModule = __decorate([
        smarteditcommons.SeEntryModule("merchandisingsmartedit"),
        core.NgModule({
            imports: [_static.UpgradeModule],
            declarations: [],
            entryComponents: [],
            providers: []
        })
    ], MerchandisingSmartEditModule);
    return MerchandisingSmartEditModule;
}());
