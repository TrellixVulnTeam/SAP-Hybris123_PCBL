/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
/**
 * @deprecated Deprecated since 1905. This file is no longer in use. Please use webpack templates in 'smartedit-build/config/webpack'.
 */
module.exports = (function() {
    const path = require('path');
    const lodash = require('lodash');

    const webpackUtil = global.smartedit.taskUtil.webpack;
    const bundlePaths = global.smartedit.bundlePaths;

    const { alias, dev, tsLoader } = require('../../builders/webpack');

    // Configuring base webpack template.
    let baseWebpackConfig = lodash.cloneDeep(require('../webpack/shared/webpack.bare.config'));
    baseWebpackConfig = alias(
        'smarteditcommons',
        path.resolve(bundlePaths.external.generated.commons.lib)
    )(baseWebpackConfig);
    baseWebpackConfig.module.rules.push(tsLoader('%tsConfigFile%', true, true)().module.rules[0]);

    // Configuring dev webpack template.
    let devWebpackConfig = lodash.cloneDeep(baseWebpackConfig);
    webpackUtil.addPlugin(devWebpackConfig, webpackUtil.forkTsCheckerPlugin);
    webpackUtil.addPlugin(devWebpackConfig, webpackUtil.happyPackPlugin);
    webpackUtil.addPlugin(devWebpackConfig, {
        apply: (compiler) => {
            return new (require('webpack')).DllReferencePlugin({
                context: require('path').resolve('/'),
                manifest: '%commonsManifestFile%'
            }).apply(compiler);
        }
    });

    // Configuring prod webpack template.
    let prodWebpackConfig = lodash.cloneDeep(devWebpackConfig);

    // Add necessary dev externals to configuration.
    devWebpackConfig = dev()(devWebpackConfig);

    return {
        // if you change this object, please update the webpack.js in the bundle config
        defaultWebpackConfig: lodash.cloneDeep(devWebpackConfig),

        devWebpackConfig,
        prodWebpackConfig
    };
})();
