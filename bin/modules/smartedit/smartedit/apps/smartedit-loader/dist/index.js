'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var platformBrowserDynamic = require('@angular/platform-browser-dynamic');
var smarteditcommons = require('smarteditcommons');
var smarteditcontainer = require('smarteditcontainer');
var http = require('@angular/common/http');
var core = require('@angular/core');
var forms = require('@angular/forms');
var platformBrowser = require('@angular/platform-browser');
var _static = require('@angular/upgrade/static');

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

var /* @ngInject */ Smarteditloader = /** @class */ (function () {
    function /* @ngInject */ Smarteditloader() {
    }
    /* @ngInject */ Smarteditloader = __decorate([
        smarteditcommons.SeModule({
            imports: [
                smarteditcontainer.LegacySmarteditServicesModule,
                smarteditcommons.TemplateCacheDecoratorModule,
                'coretemplates',
                'translationServiceModule'
            ],
            config: ["$logProvider", function ($logProvider) {
                'ngInject';
                $logProvider.debugEnabled(false);
            }],
            providers: [smarteditcontainer.BootstrapService],
            initialize: ["ssoAuthenticationHelper", "loadConfigManagerService", "bootstrapService", function (ssoAuthenticationHelper, loadConfigManagerService, bootstrapService) {
                'ngInject';
                if (ssoAuthenticationHelper.isSSODialog()) {
                    ssoAuthenticationHelper.completeDialog();
                }
                else {
                    loadConfigManagerService.loadAsObject().then(function (configurations) {
                        bootstrapService
                            .bootstrapContainerModules(configurations)
                            .then(function (bootstrapPayload) {
                            var smarteditloaderNode = document.querySelector(smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME);
                            smarteditloaderNode.parentNode.insertBefore(document.createElement(smarteditcommons.SMARTEDITCONTAINER_COMPONENT_NAME), smarteditloaderNode);
                            platformBrowserDynamic.platformBrowserDynamic()
                                .bootstrapModule(smarteditcontainer.SmarteditContainerFactory(bootstrapPayload), {
                                ngZone: smarteditcommons.commonNgZone
                            })
                                .then(function (ref) {
                                //
                            })
                                .catch(function (err) { return console.log(err); });
                        });
                    });
                }
            }]
        })
    ], /* @ngInject */ Smarteditloader);
    return /* @ngInject */ Smarteditloader;
}());

var legacyLoaderTagName = 'legacy-loader';
window.__smartedit__.addDecoratorPayload("Component", "SmarteditloaderComponent", {
    selector: smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME,
    template: "<" + legacyLoaderTagName + "></" + legacyLoaderTagName + ">"
});
var SmarteditloaderComponent = /** @class */ (function () {
    function SmarteditloaderComponent(elementRef, upgrade, injector) {
        this.elementRef = elementRef;
        this.upgrade = upgrade;
    }
    SmarteditloaderComponent.prototype.ngAfterViewInit = function () {
        this.upgrade.bootstrap(this.elementRef.nativeElement.querySelector(legacyLoaderTagName), [Smarteditloader.moduleName], { strictDi: false });
    };
    SmarteditloaderComponent = __decorate([
        core.Component({
            selector: smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME,
            template: "<" + legacyLoaderTagName + "></" + legacyLoaderTagName + ">"
        }),
        __metadata("design:paramtypes", [core.ElementRef, _static.UpgradeModule, core.Injector])
    ], SmarteditloaderComponent);
    return SmarteditloaderComponent;
}());

var SmarteditLoaderFactory = function (modules) {
    var Smarteditloader = /** @class */ (function () {
        function Smarteditloader() {
        }
        Smarteditloader = __decorate([
            core.NgModule({
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                imports: __spreadArrays([
                    platformBrowser.BrowserModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    http.HttpClientModule,
                    _static.UpgradeModule,
                    smarteditcommons.SmarteditCommonsModule,
                    smarteditcommons.SharedComponentsModule
                ], modules, [
                    smarteditcontainer.AlertServiceModule,
                    smarteditcommons.HttpInterceptorModule.forRoot(smarteditcommons.UnauthorizedErrorInterceptor, smarteditcommons.RetryInterceptor, smarteditcommons.ResourceNotFoundErrorInterceptor),
                    smarteditcommons.SeTranslationModule.forRoot(smarteditcontainer.TranslationsFetchService)
                ]),
                providers: [
                    smarteditcommons.moduleUtils.provideValues({ SSO_CLIENT_ID: smarteditcommons.DEFAULT_AUTHENTICATION_CLIENT_ID }),
                    smarteditcommons.SSOAuthenticationHelper,
                    smarteditcontainer.ConfigurationExtractorService,
                    {
                        provide: core.ErrorHandler,
                        useClass: smarteditcommons.SmarteditErrorHandler
                    },
                    smarteditcontainer.DelegateRestService,
                    smarteditcommons.RestServiceFactory,
                    {
                        provide: smarteditcommons.IAuthenticationService,
                        useClass: smarteditcommons.AuthenticationService
                    },
                    {
                        provide: smarteditcommons.ISessionService,
                        useClass: smarteditcontainer.SessionService
                    },
                    {
                        provide: smarteditcommons.ISharedDataService,
                        useClass: smarteditcontainer.SharedDataService
                    },
                    {
                        provide: smarteditcommons.IStorageService,
                        useClass: smarteditcontainer.StorageService
                    },
                    smarteditcontainer.LoadConfigManagerService,
                    smarteditcommons.moduleUtils.initialize(function () {
                        smarteditcommons.diBridgeUtils.downgradeService('languageService', smarteditcommons.LanguageService);
                        smarteditcommons.diBridgeUtils.downgradeService('httpClient', http.HttpClient);
                        smarteditcommons.diBridgeUtils.downgradeService('restServiceFactory', smarteditcommons.RestServiceFactory);
                        smarteditcommons.diBridgeUtils.downgradeService('ssoAuthenticationHelper', smarteditcommons.SSOAuthenticationHelper);
                        smarteditcommons.diBridgeUtils.downgradeService('authenticationService', smarteditcommons.AuthenticationService, smarteditcommons.IAuthenticationService);
                    })
                ],
                declarations: [SmarteditloaderComponent],
                entryComponents: [SmarteditloaderComponent],
                bootstrap: [SmarteditloaderComponent]
            })
        ], Smarteditloader);
        return Smarteditloader;
    }());
    return Smarteditloader;
};
var setGlobalBasePathURL = function () { return __awaiter(void 0, void 0, void 0, function () {
    var settings, settingsJSON, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, window.fetch(smarteditcommons.SETTINGS_URI)];
            case 1:
                settings = _a.sent();
                return [4 /*yield*/, settings.json()];
            case 2:
                settingsJSON = _a.sent();
                if (settingsJSON['smartedit.globalBasePath']) {
                    smarteditcommons.RestServiceFactory.setGlobalBasePath(String(settingsJSON['smartedit.globalBasePath']));
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log('Failure on loading Settings URL');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, Promise.resolve()];
        }
    });
}); };
window.smarteditJQuery(document).ready(function () {
    if (!smarteditcommons.nodeUtils.hasLegacyAngularJSBootsrap()) {
        if (!document.querySelector(smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME)) {
            document.body.appendChild(document.createElement(smarteditcommons.SMARTEDITLOADER_COMPONENT_NAME));
        }
        var modules_1 = __spreadArrays(window.__smartedit__.pushedModules);
        setGlobalBasePathURL().then(function () {
            platformBrowserDynamic.platformBrowserDynamic()
                .bootstrapModule(SmarteditLoaderFactory(modules_1), { ngZone: smarteditcommons.commonNgZone })
                .catch(function (err) { return console.log(err); });
        });
    }
});

exports.legacy = Smarteditloader;
exports.ng = SmarteditLoaderFactory;
