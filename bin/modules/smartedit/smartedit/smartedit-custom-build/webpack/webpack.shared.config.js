/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const {
    group,
    set,
    webpack: {
        contextReplacementPlugin,
        tsLoaderOnly,
        entry,
        external,
        alias,
        rule,
        addModule,
        plugin,
        output
    }
} = require('../../smartedit-build/builders');

const customPaths = require('../paths');
const bundlePaths = require('../../smartedit-build/bundlePaths');
const webpack = require('webpack');

module.exports = {
    commons: () =>
        group(
            entry({
                smarteditcommons: [resolve(bundlePaths.external.generated.commons.lib)]
            }),
            output({
                path: resolve(bundlePaths.external.generated.commons.dist),
                filename: '[name].js',
                // sourceMapFilename: '[file].map',
                library: '[name]',
                libraryTarget: 'window'
            }),
            rule({
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            }),
            plugin(
                new webpack.DllPlugin({
                    context: resolve('/'),
                    name: '[name]',
                    path: resolve(bundlePaths.external.generated.commons.manifest)
                })
            )
        ),
    smartedit: () =>
        group(
            entry({
                smartedit: resolve(customPaths.entrypoints.smartedit),
                smarteditbootstrap: resolve(customPaths.entrypoints.smarteditbootstrap)
            }),
            /*
             * from https://github.com/webpack/docs/wiki/configuration
             * The JSONP function used by webpack for async loading of chunks.
             * Use a different identifier so that smartedit won't clash with a webpack built storefront
             */
            set('output.jsonpFunction', 'smarteditWebpackJsonp'),
            set(
                'output.path',
                resolve(customPaths.web.webroot.staticResources.dir + '/dist/smartedit/js')
            ),
            alias('smartedit', resolve(customPaths.smarteditproperties.smartedit)),
            external('zone.js', 'Zone'),
            addModule(resolve(customPaths.smarteditproperties.smartedit))
        ),
    smarteditContainer: () =>
        group(
            entry({
                smarteditcontainer: resolve(customPaths.entrypoints.smarteditcontainer)
            }),

            set(
                'output.path',
                resolve(customPaths.web.webroot.staticResources.dir + '/dist/smarteditcontainer/js')
            ),
            alias(
                'smarteditcontainer',
                resolve(customPaths.smarteditcontainerproperties.smarteditcontainer)
            ),
            addModule(resolve(customPaths.smarteditcontainerproperties.smarteditcontainer)),
            addModule(resolve('./jsTarget/web/app/vendor'))
        ),
    vendor: () =>
        group(
            entry({
                vendor_chunk: [
                    'rxjs',
                    '@angular/platform-browser',
                    '@angular/platform-browser/animations',
                    '@angular/platform-browser-dynamic',
                    '@angular/core',
                    '@angular/common',
                    '@angular/common/http',
                    '@angular/router',
                    '@angular/upgrade/static',
                    '@angular/elements',
                    '@angular/forms',
                    '@angular/cdk',
                    '@ngx-translate/core',
                    '@ngx-translate/http-loader',
                    'zone.js',
                    'lodash',

                    /**
                     *  These polyfills are wrapped into the vendor bundle but aren't executed until they are actually
                     *  consumed by the entry file. To consume the polyfill at runtime, import them in vendors/polyfills.ts
                     */
                    'core-js/es6/symbol',
                    'core-js/es6/object',
                    'core-js/es6/function',
                    'core-js/es6/parse-int',
                    'core-js/es6/parse-float',
                    'core-js/es6/number',
                    'core-js/es6/math',
                    'core-js/es6/string',
                    'core-js/es6/date',
                    'core-js/es6/array',
                    'core-js/es6/regexp',
                    'core-js/es6/map',
                    'core-js/es6/weak-set',
                    'core-js/es6/weak-map',
                    'core-js/es6/set',
                    'core-js/es6/typed',
                    'core-js/es6/promise',
                    'core-js/es7/reflect',
                    'intersection-observer',
                    'resize-observer-polyfill',
                    '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
                    '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js'
                ]
            }),
            set('context', resolve(__dirname, '../..')),
            set('externals', {}),
            output({
                path: resolve(__dirname, '../../smartedit-build/lib/vendors'),
                filename: '[name].js',
                sourceMapFilename: '[file].map',
                library: '[name]'
            }),
            addModule(resolve('web/app/vendor')),
            tsLoaderOnly(resolve(customPaths.tsconfig.vendor)),
            plugin(
                new webpack.DllPlugin({
                    context: resolve('/'),
                    name: '[name]',
                    path: resolve(bundlePaths.external.generated.vendor.manifest)
                })
            ),
            // Workaround for https://github.com/angular/angular/issues/11580 angular/angular#11580
            contextReplacementPlugin(
                /angular(\\|\/)core/, // The (\\|\/) piece accounts for path separators in *nix and Windows
                resolve(__dirname, '../web/app'),
                {}
            )
        )
};
