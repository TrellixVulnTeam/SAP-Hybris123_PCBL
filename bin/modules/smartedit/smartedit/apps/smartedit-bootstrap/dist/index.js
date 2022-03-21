'use strict';

var angular = require('angular');
var platformBrowserDynamic = require('@angular/platform-browser-dynamic');
var smarteditcommons = require('smarteditcommons');

var BootstrapService = /** @class */ (function () {
    function BootstrapService() {
    }
    BootstrapService.prototype.bootstrap = function () {
        var _a;
        var smarteditNamespace = window.smartedit;
        // for legacy requires.push
        var modules = (smarteditNamespace.applications || [])
            .map(function (application) {
            smarteditcommons.moduleUtils.addModuleToAngularJSApp('legacySmartedit', application);
            return {
                application: application,
                module: smarteditcommons.moduleUtils.getNgModule(application)
            };
        })
            .filter(function (data) {
            if (!data.module) {
                console.log("WARNING: Unable to find @NgModule for application " + data.application);
                console.log('Here is the list of registered @NgModule:');
                console.log(window.__smartedit__.modules);
            }
            return !!data.module;
        })
            .map(function (data) { return data.module; });
        /* forbiddenNameSpaces angular.module:false */
        angular.module('legacySmartedit')
            .constant(smarteditcommons.DOMAIN_TOKEN, smarteditNamespace.domain)
            .constant('smarteditroot', smarteditNamespace.smarteditroot);
        var constants = (_a = {},
            _a[smarteditcommons.DOMAIN_TOKEN] = smarteditNamespace.domain,
            _a.smarteditroot = smarteditNamespace.smarteditroot,
            _a);
        /*
         * Bootstrap needs a reference ot the module hence cannot be achieved
         * in smarteditbootstrap.js that would then pull dependencies since it is an entry point.
         * We would then duplicate code AND kill overriding capabilities of "plugins"
         */
        document.body.appendChild(document.createElement(smarteditcommons.SMARTEDIT_COMPONENT_NAME));
        /* forbiddenNameSpaces window._:false */
        platformBrowserDynamic.platformBrowserDynamic()
            .bootstrapModule(window.__smartedit__.SmarteditFactory({ modules: modules, constants: constants }))
            .then(function () {
            delete window.__smartedit__.SmarteditFactory;
        })
            .catch(function (err) { return console.log(err); });
    };
    return BootstrapService;
}());
/** @internal */
var bootstrapService = new BootstrapService();

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
angular.element(document).ready(function () {
    bootstrapService.bootstrap();
});
