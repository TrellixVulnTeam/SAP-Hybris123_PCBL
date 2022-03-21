/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    grunt.registerTask(
        'instrumentSeInjectable',
        'Instrument TypeScript code that contains @SeInjectable()/@SeComponent() annotations',
        function() {
            const path = require('path');
            const seInjectableInstrumenter = require(path.resolve(
                global.smartedit.bundlePaths.tools.seInjectableInstrumenter.js
            ));
            seInjectableInstrumenter(
                grunt.file.expand(global.smartedit.bundlePaths.webAppTargetTs),
                [
                    'SeInjectable',
                    'SeDirective',
                    'SeComponent',
                    'SeDecorator',
                    'SeDowngradeService',
                    'SeDowngradeComponent',
                    'SeModule',

                    'Injectable',
                    'Directive',
                    'Component',
                    'NgModule'
                ]
            );
        }
    );
};
