/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function() {
    /**
     * @ngdoc overview
     * @name generateTsConfig(C)
     * @description
     * # generateTsConfig Configuration
     * The default generateTsConfig configuration provides the following targets:
     * - generateProdSmarteditTsConfig
     * - generateProdSmarteditContainerTsConfig
     * - generateDevSmarteditTsConfig
     * - generateDevSmarteditContainerTsConfig
     * - generateKarmaSmarteditTsConfig
     * - generateKarmaSmarteditContainerTsConfig
     * - generateIDETsConfig
     *
     * The dev types are a super set of the prod types, and include typing such as jasmine, or other test related types.
     * The smartedit and smarteditContainer also have isolated types, but share the common types.
     * The IDE target has all the types.
     *
     * For the default output file locations, see bundlePaths.external.generated.tsconfig
     *
     */

    return {
        targets: [
            'generateProdSmarteditTsConfig',
            'generateProdSmarteditContainerTsConfig',
            'generateDevSmarteditTsConfig',
            'generateDevSmarteditContainerTsConfig',
            'generateKarmaSmarteditTsConfig',
            'generateKarmaSmarteditContainerTsConfig',
            'generateIDETsConfig',
            'generateComopodocSmarteditCommonsTsConfig',
            'generateComopodocSmarteditTsConfig',
            'generateComopodocSmarteditContainerTsConfig'
        ],
        config: function(data, conf) {
            const bundlePaths = global.smartedit.bundlePaths;
            const paths = require('../../../smartedit-custom-build/paths');
            const path = require('path');
            const lodash = require('lodash');
            const tsConfigTemplates = require('../templates').tsConfigTemplates;
            const tsconfigUtil = global.smartedit.taskUtil.tsconfig;

            const smarteditCommonsLibPaths = {
                smarteditcommons: [path.resolve(bundlePaths.external.generated.commons.lib)]
            };

            const smarteditPaths = {
                smartedit: [bundlePaths.bundleRoot + '/@types/smartedit']
            };

            const smarteditContainerPaths = {
                smarteditcontainer: [bundlePaths.bundleRoot + '/@types/smarteditcontainer']
            };

            function addSmartEditPaths(conf) {
                conf.compilerOptions.paths = lodash.cloneDeep({
                    ...smarteditPaths,
                    ...smarteditCommonsLibPaths
                });
                conf.compilerOptions.typeRoots = lodash.union(conf.compilerOptions.typeRoots, [
                    bundlePaths.bundleRoot + '/@types',
                    '!' + bundlePaths.bundleRoot + '/@types/smarteditcontainer'
                ]);
            }

            function addSmartEditContainerPaths(conf) {
                conf.compilerOptions.paths = lodash.cloneDeep({
                    ...smarteditContainerPaths,
                    ...smarteditCommonsLibPaths
                });
                conf.compilerOptions.typeRoots = lodash.union(conf.compilerOptions.typeRoots, [
                    bundlePaths.bundleRoot + '/@types',
                    '!' + bundlePaths.bundleRoot + '/@types/smartedit'
                ]);
            }

            function addAllPaths(conf) {
                conf.compilerOptions.paths = lodash.merge(
                    lodash.cloneDeep(smarteditPaths),
                    lodash.cloneDeep(smarteditContainerPaths)
                );

                conf.compilerOptions.typeRoots = lodash.union(conf.compilerOptions.typeRoots, [
                    bundlePaths.bundleRoot + '/@types'
                ]);

                tsconfigUtil.addTestPaths(conf);
                conf.compilerOptions.paths = lodash.merge(
                    conf.compilerOptions.paths,
                    smarteditCommonsLibPaths
                );
            }

            function getIDETsConfig() {
                var conf = {
                    dest: bundlePaths.external.generated.tsconfig.ide,
                    data: lodash.cloneDeep(tsConfigTemplates.ide)
                };

                conf.data.compilerOptions.baseUrl = '../../';
                conf.data.compilerOptions.typeRoots = ['../../node_modules/@types'];

                conf.data.include = ['../../web/**/*'];

                addAllPaths(conf.data);

                return conf;
            }

            // ====== PROD ======
            conf.generateProdSmarteditTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.prodSmartedit,
                data: lodash.cloneDeep(tsConfigTemplates.prodSmartedit)
            };

            conf.generateProdSmarteditContainerTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.prodSmarteditContainer,
                data: lodash.cloneDeep(tsConfigTemplates.prodSmarteditContainer)
            };

            // ====== DEV ======
            conf.generateDevSmarteditTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.devSmartedit,
                data: lodash.cloneDeep(tsConfigTemplates.devSmartedit)
            };
            conf.generateDevSmarteditContainerTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.devSmarteditContainer,
                data: lodash.cloneDeep(tsConfigTemplates.devSmarteditContainer)
            };

            // ====== Karma ======
            conf.generateKarmaSmarteditTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.karmaSmartedit,
                data: lodash.cloneDeep(tsConfigTemplates.karmaSmartedit)
            };

            conf.generateKarmaSmarteditContainerTsConfig = {
                dest: bundlePaths.external.generated.tsconfig.karmaSmarteditContainer,
                data: lodash.cloneDeep(tsConfigTemplates.karmaSmarteditContainer)
            };

            // ====== IDE ======
            conf.generateIDETsConfig = getIDETsConfig();

            // se
            addSmartEditPaths(conf.generateProdSmarteditTsConfig.data);
            addSmartEditContainerPaths(conf.generateProdSmarteditContainerTsConfig.data);

            addSmartEditPaths(conf.generateDevSmarteditTsConfig.data);
            addSmartEditContainerPaths(conf.generateDevSmarteditContainerTsConfig.data);

            // karma
            addSmartEditContainerPaths(conf.generateKarmaSmarteditContainerTsConfig.data);
            tsconfigUtil.addTestPaths(conf.generateKarmaSmarteditContainerTsConfig.data);

            addSmartEditPaths(conf.generateKarmaSmarteditTsConfig.data);
            tsconfigUtil.addTestPaths(conf.generateKarmaSmarteditTsConfig.data);

            // ===== COMPODOC =======

            function getCompodocConfig(tsConfigDest) {
                var config = {
                    dest: tsConfigDest,
                    data: lodash.cloneDeep(tsConfigTemplates.baseConfig)
                };
                return config;
            }

            conf.generateComopodocSmarteditCommonsTsConfig = getCompodocConfig(
                paths.tsconfig.compodocSmarteditCommons
            );
            conf.generateComopodocSmarteditTsConfig = getCompodocConfig(
                paths.tsconfig.compodocSmartedit
            );
            conf.generateComopodocSmarteditContainerTsConfig = getCompodocConfig(
                paths.tsconfig.compodocSmarteditContainer
            );

            return conf;
        }
    };
};
