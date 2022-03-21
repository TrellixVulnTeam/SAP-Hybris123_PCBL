module.exports = function() {

    return {
        config: function(data, conf) {
            const lodash = require('lodash');

            const personalizationsmarteditPaths = {
                "personalizationcommons": ["web/features/personalizationcommons"],
                "personalizationcommons/*": ["web/features/personalizationcommons/*"],
                "personalizationsmartedit": ["web/features/personalizationsmartedit"],
                "personalizationsmartedit/*": ["web/features/personalizationsmartedit/*"]
            };

            const personalizationsmarteditContainerPaths = {
                "personalizationcommons": ["web/features/personalizationcommons"],
                "personalizationcommons/*": ["web/features/personalizationcommons/*"],
                "personalizationsmarteditcontainer": ["web/features/personalizationsmarteditcontainer"],
                "personalizationsmarteditcontainer/*": ["web/features/personalizationsmarteditcontainer/*"]
            };

            const commonsInclude = ["../../jsTarget/web/features/personalizationcommons/**/*"];
            const smarteditInclude = commonsInclude.concat("../../jsTarget/web/features/personalizationsmartedit/**/*");
            const smarteditContainerInclude = commonsInclude.concat("../../jsTarget/web/features/personalizationsmarteditcontainer/**/*");

            const smarteditCommonsIncludeCompodoc = ['../../compodocs/personalizationcommons/**/*.ts'];
            const smarteditIncludeCompodoc = ['../../compodocs/personalizationsmartedit/**/*.ts'];
            const smarteditContainerIncludeCompodoc = ['../../compodocs/personalizationsmarteditcontainer/**/*.ts'];

            // PROD
            conf.generateProdSmarteditTsConfig.data.include = smarteditInclude;
            conf.generateProdSmarteditContainerTsConfig.data.include = smarteditContainerInclude;

            // DEV
            conf.generateDevSmarteditTsConfig.data.include = smarteditInclude;
            conf.generateDevSmarteditContainerTsConfig.data.include = smarteditContainerInclude;

            // KARMA
            conf.generateKarmaSmarteditTsConfig.data.include = smarteditInclude;
            conf.generateKarmaSmarteditContainerTsConfig.data.include = smarteditContainerInclude;

            // ===== COMPODOC =======
            conf.generateComopodocSmarteditCommonsTsConfig.data.include = smarteditCommonsIncludeCompodoc;
            conf.generateComopodocSmarteditTsConfig.data.include = smarteditIncludeCompodoc;
            conf.generateComopodocSmarteditContainerTsConfig.data.include = smarteditContainerIncludeCompodoc;


            function addPersonalizationSmarteditPaths(conf) {
                lodash.merge(conf.compilerOptions.paths, lodash.cloneDeep(personalizationsmarteditPaths));
            }

            function addPersonalizationSmarteditContainerPaths(conf) {
                lodash.merge(conf.compilerOptions.paths, lodash.cloneDeep(personalizationsmarteditContainerPaths));
            }

            addPersonalizationSmarteditPaths(conf.generateProdSmarteditTsConfig.data);
            addPersonalizationSmarteditContainerPaths(conf.generateProdSmarteditContainerTsConfig.data);
            addPersonalizationSmarteditPaths(conf.generateDevSmarteditTsConfig.data);
            addPersonalizationSmarteditContainerPaths(conf.generateDevSmarteditContainerTsConfig.data);
            addPersonalizationSmarteditPaths(conf.generateKarmaSmarteditTsConfig.data);
            addPersonalizationSmarteditContainerPaths(conf.generateKarmaSmarteditContainerTsConfig.data);
            addPersonalizationSmarteditPaths(conf.generateIDETsConfig.data);
            addPersonalizationSmarteditContainerPaths(conf.generateIDETsConfig.data);

            return conf;
        }
    };
};
