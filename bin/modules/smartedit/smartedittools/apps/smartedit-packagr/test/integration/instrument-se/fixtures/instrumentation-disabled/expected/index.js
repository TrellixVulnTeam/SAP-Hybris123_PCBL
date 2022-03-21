/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var decoratorsToTest = [
    'Injectable',
    'Component',
    'SeInjectable',
    'SeDirective',
    'SeComponent',
    'SeDecorator',
    'SeDowngradeService',
    'SeDowngradeComponent',
    'SeModule',
    'Injectable'
];
var _a = decoratorsToTest.reduce(function (acc, current) {
    acc[current] = function (providedConstructor) {
        return providedConstructor;
    };
}, {}), SeInjectable = _a.SeInjectable, SeDirective = _a.SeDirective, SeComponent = _a.SeComponent, SeDecorator = _a.SeDecorator, SeDowngradeService = _a.SeDowngradeService, SeDowngradeComponent = _a.SeDowngradeComponent, SeModule = _a.SeModule, Injectable = _a.Injectable, Component = _a.Component;
var InjectableTest = /** @class */ (function () {
    function InjectableTest($log) {
    }
    InjectableTest = __decorate([
        Injectable({
            data: 'some data'
        })
    ], InjectableTest);
    return InjectableTest;
}());
var ComponentTest = /** @class */ (function () {
    function ComponentTest($log) {
    }
    ComponentTest = __decorate([
        Component({
            data: 'other data'
        })
    ], ComponentTest);
    return ComponentTest;
}());
var SeInjectableTest = /** @class */ (function () {
    function SeInjectableTest($log) {
    }
    SeInjectableTest = __decorate([
        SeInjectable()
    ], SeInjectableTest);
    return SeInjectableTest;
}());
var SeDirectiveTest = /** @class */ (function () {
    function SeDirectiveTest($log) {
    }
    SeDirectiveTest = __decorate([
        SeDirective()
    ], SeDirectiveTest);
    return SeDirectiveTest;
}());
var SeComponentTest = /** @class */ (function () {
    function SeComponentTest($log) {
    }
    SeComponentTest = __decorate([
        SeComponent()
    ], SeComponentTest);
    return SeComponentTest;
}());
var SeDecoratorTest = /** @class */ (function () {
    function SeDecoratorTest($log) {
    }
    SeDecoratorTest = __decorate([
        SeDecorator()
    ], SeDecoratorTest);
    return SeDecoratorTest;
}());
var SeDowngradeServiceTest = /** @class */ (function () {
    function SeDowngradeServiceTest($log) {
    }
    SeDowngradeServiceTest = __decorate([
        SeDowngradeService()
    ], SeDowngradeServiceTest);
    return SeDowngradeServiceTest;
}());
var SeDowngradeComponentTest = /** @class */ (function () {
    function SeDowngradeComponentTest($log) {
    }
    SeDowngradeComponentTest = __decorate([
        SeDowngradeComponent()
    ], SeDowngradeComponentTest);
    return SeDowngradeComponentTest;
}());
var SeModuleTest = /** @class */ (function () {
    function SeModuleTest($log) {
    }
    SeModuleTest = __decorate([
        SeModule()
    ], SeModuleTest);
    return SeModuleTest;
}());

exports.ComponentTest = ComponentTest;
exports.InjectableTest = InjectableTest;
exports.SeComponentTest = SeComponentTest;
exports.SeDecoratorTest = SeDecoratorTest;
exports.SeDirectiveTest = SeDirectiveTest;
exports.SeDowngradeComponentTest = SeDowngradeComponentTest;
exports.SeDowngradeServiceTest = SeDowngradeServiceTest;
exports.SeInjectableTest = SeInjectableTest;
exports.SeModuleTest = SeModuleTest;
