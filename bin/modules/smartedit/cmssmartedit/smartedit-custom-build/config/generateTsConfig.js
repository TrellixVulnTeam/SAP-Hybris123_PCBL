/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function() {
    return {
        config: function(data, conf) {
            const lodash = require('lodash');
            const paths = require('../../smartedit-build/bundlePaths');

            const cmsSmarteditPaths = {
                cmscommons: ['web/features/cmscommons'],
                'cmscommons/*': ['web/features/cmscommons/*'],
                cmssmartedit: ['web/features/cmssmartedit'],
                'cmssmartedit/*': ['web/features/cmssmartedit/*']
            };

            const cmsSmarteditContainerPaths = {
                cmscommons: ['web/features/cmscommons'],
                'cmscommons/*': ['web/features/cmscommons/*'],
                cmssmarteditcontainer: ['web/features/cmssmarteditContainer'],
                'cmssmarteditcontainer/*': ['web/features/cmssmarteditContainer/*']
            };

            const smarteditCommonsInclude = ['../../jsTarget/web/features/cmscommons/**/*'];

            const cmsSmarteditInclude = smarteditCommonsInclude.concat([
                '../../jsTarget/web/features/cmssmartedit/**/*'
            ]);
            const cmsSmarteditContainerInclude = smarteditCommonsInclude.concat([
                '../../jsTarget/web/features/cmssmarteditContainer/**/*'
            ]);

            const smarteditCommonsIncludeCompodoc = ['../../compodocs/cmscommons/**/*.ts'];
            const smarteditIncludeCompodoc = ['../../compodocs/cmssmartedit/**/*.ts'];
            const smarteditContainerIncludeCompodoc = [
                '../../compodocs/cmssmarteditContainer/**/*.ts'
            ];

            function addCmsSmarteditPaths(conf) {
                lodash.merge(conf.compilerOptions.paths, lodash.cloneDeep(cmsSmarteditPaths));
            }

            function addCmsSmarteditContainerPaths(conf) {
                lodash.merge(
                    conf.compilerOptions.paths,
                    lodash.cloneDeep(cmsSmarteditContainerPaths)
                );
            }

            /**
             * For Angular support, emitDecoratorMetadata must be enabled
             *
             * @param {object} conf the webpack configuration
             */
            function enableDecoratorMetadata(conf) {
                conf.compilerOptions.emitDecoratorMetadata = true;
            }

            // ======== PROD ========
            addCmsSmarteditPaths(conf.generateProdSmarteditTsConfig.data);
            addCmsSmarteditContainerPaths(conf.generateProdSmarteditContainerTsConfig.data);
            conf.generateProdSmarteditTsConfig.data.include = cmsSmarteditInclude;
            conf.generateProdSmarteditContainerTsConfig.data.include = cmsSmarteditContainerInclude;
            enableDecoratorMetadata(conf.generateProdSmarteditTsConfig.data);
            enableDecoratorMetadata(conf.generateProdSmarteditContainerTsConfig.data);

            // ======== DEV ========
            addCmsSmarteditPaths(conf.generateDevSmarteditTsConfig.data);
            addCmsSmarteditContainerPaths(conf.generateDevSmarteditContainerTsConfig.data);
            conf.generateDevSmarteditTsConfig.data.include = cmsSmarteditInclude;
            conf.generateDevSmarteditContainerTsConfig.data.include = cmsSmarteditContainerInclude;
            enableDecoratorMetadata(conf.generateDevSmarteditTsConfig.data);
            enableDecoratorMetadata(conf.generateDevSmarteditContainerTsConfig.data);

            // ======== KARMA ========
            addCmsSmarteditPaths(conf.generateKarmaSmarteditTsConfig.data);
            addCmsSmarteditContainerPaths(conf.generateKarmaSmarteditContainerTsConfig.data);
            conf.generateKarmaSmarteditTsConfig.data.include = cmsSmarteditInclude.concat([
                '../../jsTests/tests/cmssmartedit/unit/**/*'
            ]);
            conf.generateKarmaSmarteditContainerTsConfig.data.include = cmsSmarteditContainerInclude.concat(
                ['../../jsTests/tests/cmssmarteditContainer/unit/**/*']
            );
            enableDecoratorMetadata(conf.generateKarmaSmarteditTsConfig.data);
            enableDecoratorMetadata(conf.generateKarmaSmarteditContainerTsConfig.data);

            // ======== IDE ========
            addCmsSmarteditContainerPaths(conf.generateIDETsConfig.data);
            addCmsSmarteditPaths(conf.generateIDETsConfig.data);
            conf.generateIDETsConfig.data.include = conf.generateIDETsConfig.data.include.concat([
                '../../jsTests/tests/**/unit/**/*'
            ]);

            // ===== COMPODOC =======

            conf.generateComopodocSmarteditCommonsTsConfig.data.include = smarteditCommonsIncludeCompodoc;

            conf.generateComopodocSmarteditTsConfig.data.include = smarteditIncludeCompodoc;

            conf.generateComopodocSmarteditContainerTsConfig.data.include = smarteditContainerIncludeCompodoc;

            return conf;
        }
    };
};
