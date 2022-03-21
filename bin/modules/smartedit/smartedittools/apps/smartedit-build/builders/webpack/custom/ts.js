/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const group = require('../../compose');
const rule = require('../rule');
const plugin = require('../plugin');
const happyPack = require('./happyPackPlugin');
const cacheLoader = require('../common/cache-loader');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.tsLoader
 * @description
 * A preset group of builders for configuring typescript support for a webpack config.
 *
 * @param {string} tsconfig The typescript configuration.
 * @param {boolean} transpileOnly To check for typescript syntax.
 * There is a limitation when ts-loader has "transpileOnly: true" in combination with fork-ts-checker-plugin:
 * the d.ts files are not produced, see https://github.com/Realytics/fork-ts-checker-webpack-plugin/issues/49
 * To have d.ts files emitted, transpileOnly must be set to 'false'.
 * @param {boolean} enableHappyPack To enable Happy Pack loader (must be false when using generateWebpack since serialize-javascript not compatible).
 *
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = (
    tsconfig,
    transpileOnly = true,
    cache = false,
    enableHappyPack = true,
    instrument = false
) =>
    group(
        rule({
            test: /\.ts$/,
            sideEffects: true,
            use: [
                {
                    loader: 'ts-loader',
                    /**
                     * ts-loader: https://github.com/TypeStrong/ts-loader
                     * Using ts-loader in combination with fork-ts-checker-webpack-plugin and HappyPack plugins.
                     * To have a fast build, ts-loader is only transpiling TypeScript by using `transpileOnly: true` option.
                     * Type checking is performed by fork-ts-checker-webpack-plugin on a separate process.
                     * HappyPack speeds the build by parallelising work.
                     *
                     * *** Note about emit of declaration files (d.ts): ***
                     * To have d.ts files emitted, "transpileOnly" and "happyPackMode" values must be set to 'false' due to an
                     * issue in fork-ts-checker-plugin: https://github.com/Realytics/fork-ts-checker-webpack-plugin/issues/49
                     *
                     * If you need declatation file emit, you can use `webpackUtil.disableTsLoaderTranspileOnly(conf)`.
                     *
                     * Another way to produce d.ts files is to just run `tsc -p path/to/tsconfig.json` on command line.
                     */
                    options: {
                        transpileOnly: transpileOnly,
                        happyPackMode: transpileOnly,
                        configFile: tsconfig
                    }
                },
                ...(instrument
                    ? [
                          {
                              loader: 'instrument-se-loader'
                          }
                      ]
                    : [])
            ]
        }),
        rule({
            test: /\.(html)$/,
            use: [
                {
                    loader: 'raw-loader'
                }
            ]
        }),
        rule({
            // https://github.com/angular/angular/issues/21560
            // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
            // Removing this will cause deprecation warnings to appear.
            test: /\/node_modules\/(@angular|core-js|rxjs|zone.js)\//,
            // test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
            parser: {
                system: true
            } // enable SystemJS
        }),
        enableHappyPack &&
            happyPack('ts', 2, [
                ...(cache ? [cacheLoader] : []),
                {
                    path: 'ts-loader',
                    query: {
                        happyPackMode: true,
                        configFile: tsconfig
                    }
                }
            ]),
        transpileOnly &&
            plugin(
                new ForkTsCheckerWebpackPlugin({
                    async: false, // async: false block webpack's emit to wait for type checker/linter and to add errors to the webpack's compilation.
                    checkSyntacticErrors: true,
                    tsconfig
                })
            )
    );
