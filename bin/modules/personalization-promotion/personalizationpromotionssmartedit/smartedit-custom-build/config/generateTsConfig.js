module.exports = function() {

    return {
        config: function(data, conf) {
            const lodash = require('lodash');

            const personalizationpromotionssmarteditPaths = {
                "personalizationpromotionssmarteditcommons": ["web/features/personalizationpromotionssmarteditcommons"],
                "personalizationpromotionssmarteditcommons/*": ["web/features/personalizationpromotionssmarteditcommons/*"],
                "personalizationpromotionssmartedit": ["web/features/personalizationpromotionssmartedit"],
                "personalizationpromotionssmartedit/*": ["web/features/personalizationpromotionssmartedit/*"]
            };

            const personalizationpromotionssmarteditContainerPaths = {
                "personalizationpromotionssmarteditcommons": ["web/features/personalizationpromotionssmarteditcommons"],
                "personalizationpromotionssmarteditcommons/*": ["web/features/personalizationpromotionssmarteditcommons/*"],
                "personalizationpromotionssmarteditContainer": ["web/features/personalizationpromotionssmarteditContainer"],
                "personalizationpromotionssmarteditContainer/*": ["web/features/personalizationpromotionssmarteditContainer/*"]
            };
            const commonsInclude = ["../../jsTarget/web/features/personalizationpromotionssmarteditcommons/**/*"];
            const smarteditInclude = commonsInclude.concat("../../jsTarget/web/features/personalizationpromotionssmartedit/**/*");
            const smarteditContainerInclude = commonsInclude.concat("../../jsTarget/web/features/personalizationpromotionssmarteditContainer/**/*");

            const smarteditCommonsIncludeCompodoc = ['../../compodocs/personalizationpromotionssmarteditcommons/**/*.ts'];
            const smarteditIncludeCompodoc = ['../../compodocs/personalizationpromotionssmartedit/**/*.ts'];
            const smarteditContainerIncludeCompodoc = ['../../compodocs/personalizationpromotionssmarteditContainer/**/*.ts'];

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

            function addPersonalizationPromotionsSmarteditPaths(conf) {
                lodash.merge(conf.compilerOptions.paths, lodash.cloneDeep(personalizationpromotionssmarteditPaths));
            }

            function addPersonalizationPromotionsSmarteditContainerPaths(conf) {
                lodash.merge(conf.compilerOptions.paths, lodash.cloneDeep(personalizationpromotionssmarteditContainerPaths));
            }

            addPersonalizationPromotionsSmarteditPaths(conf.generateProdSmarteditTsConfig.data);
            addPersonalizationPromotionsSmarteditContainerPaths(conf.generateProdSmarteditContainerTsConfig.data);
            addPersonalizationPromotionsSmarteditPaths(conf.generateDevSmarteditTsConfig.data);
            addPersonalizationPromotionsSmarteditContainerPaths(conf.generateDevSmarteditContainerTsConfig.data);
            addPersonalizationPromotionsSmarteditPaths(conf.generateKarmaSmarteditTsConfig.data);
            addPersonalizationPromotionsSmarteditContainerPaths(conf.generateKarmaSmarteditContainerTsConfig.data);
            addPersonalizationPromotionsSmarteditContainerPaths(conf.generateIDETsConfig.data);
            addPersonalizationPromotionsSmarteditPaths(conf.generateIDETsConfig.data);

            return conf;
        }
    };
};
