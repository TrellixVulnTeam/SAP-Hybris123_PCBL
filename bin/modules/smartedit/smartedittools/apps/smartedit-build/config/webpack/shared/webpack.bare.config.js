/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

module.exports = {
    entry: null,
    devtool: 'inline-source-map',
    output: {
        path: resolve(process.cwd(), '.temp'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
    externals: {
        angular: 'angular',
        Reflect: 'Reflect',
        moment: 'moment',
        'crypto-js': 'CryptoJS',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    resolveLoader: {
        modules: [
            resolve(__dirname, '../../../builders/webpack/loaders'),
            resolve(__dirname, '../../../node_modules'),
        ],
    },
    performance: {
        hints: false,
    },
    stats: {
        assets: false,
        colors: true,
        modules: false,
        reasons: true,
        errorDetails: true,
    },
    plugins: [
        // The OOTB webpack warningsFilter is not working.
        // Using https://github.com/mattlewis92/webpack-filter-warnings-plugin as workaround for these issues:
        // https://github.com/TypeStrong/ts-loader/issues/751
        // https://github.com/angular/angular/issues/21560
        {
            apply: (compiler) => {
                return new (require('webpack-filter-warnings-plugin'))({
                    exclude: [
                        /export '.*'( \(reexported as '.*'\))? was not found in/,
                        /System.import/,
                        /the request of a dependency is an expression/,
                    ],
                }).apply(compiler);
            },
        },
        {
            apply: (compiler) => {
                return new (require('webpack').DefinePlugin)({
                    // Creates global variables that will be used later to control SmartEdit bootstrapping
                    'window.__smartedit__.smartEditContainerAngularApps': '[]',
                    'window.__smartedit__.smartEditInnerAngularApps': '[]',
                    E2E_ENVIRONMENT: false,
                }).apply(compiler);
            },
        },
    ],
    bail: true,
    mode: 'development',
};
