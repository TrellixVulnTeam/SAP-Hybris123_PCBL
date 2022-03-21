/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
/**
 * @deprecated Deprecated since 1905. Please use webpack configuration builders from smartedit-build/builders/webpack.
 */
module.exports = function(grunt) {
    const lodash = require('lodash');

    const {
        compose,
        webpack: { plugin: addPlugin, rule, addModule, alias, devtool, coverageLoader }
    } = require('../../../builders');
    const bundlePaths = require('../../../bundlePaths');

    const webpackUtil = {
        /**
         * @deprecated Deprecated since 1905. Please use the builder 'plugin' from smartedit-build/builders.
         */
        addPlugin: (conf, plugin) => {
            Object.assign(conf, addPlugin(plugin)(conf));
        },

        /**
         * @deprecated Deprecated since 1905. Please use the builder 'rule' from smartedit-build/builders.
         */
        addLoader: (conf, loader) => {
            Object.assign(conf, rule(loader)(conf));
        },

        /**
         * @deprecated Deprecated since 1905. Please use the builder 'minify' from smartedit-build/builders/webpack.
         */
        addMinimizer: (conf, mimimizer) => {
            conf.mode = 'production';
            conf.optimization = conf.optimization || {};
            conf.optimization.minimizer = conf.optimization.minimizer || [];
            conf.optimization.minimizer.push(mimimizer);
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders or prebuilt webpack configuration from
         * smartedit-build/wepback.
         */
        buildTestConf: (templateConf) => {
            templateConf = compose(
                addModule(bundlePaths.test.unit.root),
                alias('testhelpers', bundlePaths.test.unit.root),
                devtool('inline-source-map'),
                coverageLoader(grunt.option('coverage')),
                addPlugin(webpackUtil.karmaErrorsPlugin)
            )(templateConf);
            return lodash.cloneDeep(templateConf);
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders/webpack
         * @description
         * There is a limitation when ts-loader has "transpileOnly: true" in combination with fork-ts-checker-plugin:
         * the d.ts files are not produced, see https://github.com/Realytics/fork-ts-checker-webpack-plugin/issues/49
         * To have d.ts files emitted, "transpileOnly" and "happyPackMode" values must be set to 'false'.
         */
        disableTsLoaderTranspileOnly: (webpackConfig) => {
            const tsLoaderName = 'ts-loader';
            if (webpackConfig.module && webpackConfig.module.rules) {
                const typeScriptRule = webpackConfig.module.rules.find((rule) => {
                    return rule.use
                        ? rule.use.find((loaderConfig) => loaderConfig.loader === tsLoaderName)
                        : false;
                });
                const tsLoader = typeScriptRule.use.find(
                    (loaderConfig) => loaderConfig.loader === tsLoaderName
                );
                tsLoader.options = Object.assign(tsLoader.options, {
                    transpileOnly: false,
                    happyPackMode: false // WARNING: setting happyPackMode: true implicitly sets *transpileOnly* to true
                });
                // remove fork-ts-checker-webpack-plugin from the plugins list
                webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
                    return plugin.id !== 'fork-ts-checker-webpack-plugin';
                });
            }
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders/webpack
         */
        ngAnnotatePlugin: {
            options: {
                add: true,
                sourceMap: true
            },
            apply: function(compiler) {
                const { ngAnnotatePlugin } = require('../../smartedit-build/builders/webpack');
                return ngAnnotatePlugin()().plugins[0].apply(compiler);
            }
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders/webpack
         */
        uglifyJsPlugin: {
            apply: (complier) => {
                const { minify } = require('../../smartedit-build/builders/webpack');
                return minify()().optimization.minimizer[0].apply(complier);
            }
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders/webpack
         * @description
         * This plugin propagate compilation errors, it is necessary to fail the build when there is compilation errors in spec files.
         * Webpack does not include modules which have errors, which causes Karma to run all the tests without the failed spec.
         */
        karmaErrorsPlugin: {
            apply: (compiler) => {
                const { karmaErrorsPlugin } = require('../../smartedit-build/builders/webpack');
                return karmaErrorsPlugin()().plugins[0].apply(compiler);
            }
        },

        /**
         * @deprecated Deprecated since 1905. Please use builders from smartedit-build/builders/webpack
         * @description
         * https://github.com/webpack-contrib/istanbul-instrumenter-loader
         */
        istanbulInstrumenterLoader: coverageLoader(true)().module.rules[0],

        /**
         * @description
         * https://github.com/Realytics/fork-ts-checker-webpack-plugin
         * Webpack plugin that runs typescript type checker on a separate process.
         */
        forkTsCheckerPlugin: {
            id: 'fork-ts-checker-webpack-plugin',
            apply: (compiler) => {
                const { tsLoader } = require('../../smartedit-build/builders/webpack');
                return tsLoader('%tsConfigFile%', true, true)().plugins[1].apply(compiler);
            }
        },

        /**
         * @deprecated Deprecated since 1905. Please use the 'happyPackPlugin' builder from smartedit-build/builders/webpack
         * @description
         * https://github.com/amireh/happypack
         * HappyPack makes initial webpack builds faster by transforming files in parallel.
         */
        happyPackPlugin: {
            apply: (compiler) => {
                const { tsLoader } = require('../../smartedit-build/builders/webpack');
                return tsLoader('%tsConfigFile%', true, true)().plugins[0].apply(compiler);
            }
        }
    };

    return webpackUtil;
};
