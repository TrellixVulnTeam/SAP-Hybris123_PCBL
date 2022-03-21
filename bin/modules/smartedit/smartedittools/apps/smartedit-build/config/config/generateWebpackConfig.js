/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */

const {
    compose,
    webpack: { tsLoader, dev, prod }
} = require('../../builders');

const { resolve } = require('path');

module.exports = function() {
    /**
     * @ngdoc overview
     * @name generateWebpackConfig(C)
     * @description
     * # generateWebpackConfig Configuration
     * The default generateWebpackConfig configuration provides the following targets:
     * - generateProdSmarteditWebpackConfig
     * - generateProdSmarteditContainerWebpackConfig
     * - generateDevSmarteditWebpackConfig
     * - generateDevSmarteditContainerWebpackConfig
     * - generateKarmaSmarteditWebpackConfig
     * - generateKarmaSmarteditContainerWebpackConfig
     *
     * The webpack targets correspond the {@link generateTsConfig(C) tsConfig targets}
     *
     * For the default output file locations, see bundlePaths.external.generated.webpack
     *
     * SASS loader is currently not supported (incompatible with Happypack).
     * Please use 'smartedit-build/builders' instead.
     * For more information on upgrading please consult the smartedit-build/builders/README.md".
     */
    return {
        targets: [
            'generateProdSmarteditWebpackConfig',
            'generateProdSmarteditContainerWebpackConfig',
            'generateDevSmarteditWebpackConfig',
            'generateDevSmarteditContainerWebpackConfig',
            'generateKarmaSmarteditWebpackConfig',
            'generateKarmaSmarteditContainerWebpackConfig'
        ],
        config: function(data, conf) {
            const path = require('path');
            const bundlePaths = global.smartedit.bundlePaths;
            const lodash = require('lodash');
            const webpackConfigTemplates = require('../templates').webpackConfigTemplates;
            const webpackUtil = global.smartedit.taskUtil.webpack;
            const webpackBaseConfig = require('../../config/webpack/shared/webpack.base.config');

            // ======== PROD ========

            // PROD INNER
            conf.generateProdSmarteditWebpackConfig = {
                dest: bundlePaths.external.generated.webpack.prodSmartedit,
                data: compose(
                    prod(),
                    tsLoader(
                        resolve(bundlePaths.external.generated.tsconfig.prodSmartedit),
                        false,
                        false,
                        false
                    )
                )(webpackBaseConfig)
            };

            // PROD OUTER
            conf.generateProdSmarteditContainerWebpackConfig = {
                dest: bundlePaths.external.generated.webpack.prodSmarteditContainer,
                data: compose(
                    prod(),
                    tsLoader(
                        resolve(bundlePaths.external.generated.tsconfig.prodSmarteditContainer),
                        false,
                        false,
                        false
                    )
                )(webpackBaseConfig)
            };

            // ======== DEV ========

            // DEV INNER
            conf.generateDevSmarteditWebpackConfig = {
                dest: bundlePaths.external.generated.webpack.devSmartedit,
                data: compose(
                    dev(),
                    tsLoader(
                        resolve(bundlePaths.external.generated.tsconfig.devSmartedit),
                        false,
                        false,
                        false
                    )
                )(webpackBaseConfig)
            };

            // DEV OUTER
            conf.generateDevSmarteditContainerWebpackConfig = {
                commonsManifestFile: bundlePaths.external.generated.commons.manifest,
                dest: bundlePaths.external.generated.webpack.devSmarteditContainer,
                data: compose(
                    dev(),
                    tsLoader(
                        resolve(bundlePaths.external.generated.tsconfig.devSmarteditContainer),
                        false,
                        false,
                        false
                    )
                )(webpackBaseConfig)
            };

            // ======== KARMA ========
            let testCommons = webpackUtil.buildTestConf(webpackConfigTemplates.devWebpackConfig);

            conf.generateKarmaSmarteditWebpackConfig = {
                tsConfigFile: bundlePaths.external.generated.tsconfig.karmaSmartedit,
                commonsManifestFile: bundlePaths.external.generated.commons.manifest,
                dest: bundlePaths.external.generated.webpack.karmaSmartedit,
                data: lodash.cloneDeep(testCommons)
            };
            conf.generateKarmaSmarteditContainerWebpackConfig = {
                tsConfigFile: bundlePaths.external.generated.tsconfig.karmaSmarteditContainer,
                commonsManifestFile: bundlePaths.external.generated.commons.manifest,
                dest: bundlePaths.external.generated.webpack.karmaSmarteditContainer,
                data: lodash.cloneDeep(testCommons)
            };

            function setSmarteditCommonsForLibrary(conf) {
                conf.resolve.alias = conf.resolve.alias || {};
                conf.resolve.alias = lodash.merge(conf.resolve.alias, {
                    /**
                     * Please do not change, as the library smarteditcommons relies on it due to the fact that it builds
                     * with path aliases containing itself for maintainable purposes. When the library is built, the
                     * typescript compiler does not transform the path aliases to relative paths, but itself they are kept as is. If someone
                     * were to consuming smarteditcommons then they require this alias. For the future, we may use a
                     * plugin to transform the paths. See issue https://github.com/Microsoft/TypeScript/issues/15479
                     * for more information.
                     */
                    smarteditcommons: path.resolve(bundlePaths.external.generated.commons.lib)
                });
            }

            setSmarteditCommonsForLibrary(conf.generateKarmaSmarteditWebpackConfig.data, false);
            setSmarteditCommonsForLibrary(
                conf.generateKarmaSmarteditContainerWebpackConfig.data,
                false
            );

            return conf;
        }
    };
};
