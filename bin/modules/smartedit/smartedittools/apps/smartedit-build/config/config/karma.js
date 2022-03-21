/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name karma(C)
     * @description
     * # karma Configuration
     *
     * The default karma configuration has 2 targets that point grunt-karma to the generated karma conf.
     * **unitSmartedit** and **unitSmarteditContainer**.
     *
     * See bundlePaths.external.generated.karma
     */

    return {
        targets: ['unitSmartedit', 'unitSmarteditContainer'],
        config: function(data, conf) {
            const fs = require('fs');
            const path = require('path');
            const bundlePaths = require('../../bundlePaths');

            const config = {
                unitSmartedit: {
                    options: {
                        configFile: bundlePaths.external.karma.smartedit
                    }
                },
                unitSmarteditContainer: {
                    options: {
                        configFile: bundlePaths.external.karma.smarteditContainer
                    }
                }
            };

            const fallback = {
                unitSmartedit: bundlePaths.external.generated.karma.smartedit,
                unitSmarteditContainer: bundlePaths.external.generated.karma.smarteditContainer
            };

            Object.keys(config).forEach((key) => {
                const file = config[key].options.configFile;
                if (!fs.existsSync(path.resolve(file))) {
                    grunt.log.warn(`Deprecated Karma Configuration: ${
                        fallback[key]
                    }.\n For more information on upgrading, 
                    please consult the smartedit-build/builders/README.md`);

                    config[key].options.configFile = fallback[key];
                }
            });

            return config;
        }
    };
};
