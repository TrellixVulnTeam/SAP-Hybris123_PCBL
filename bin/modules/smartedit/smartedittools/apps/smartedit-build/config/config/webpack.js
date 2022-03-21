/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    return {
        targets: [
            'prodSmartedit',
            'prodSmarteditContainer',
            'devSmartedit',
            'devSmarteditContainer'
        ],
        config: function() {
            const bundlePaths = require('../../bundlePaths');
            const fs = require('fs');
            const { resolve } = require('path');

            const config = {
                prodSmartedit: bundlePaths.external.webpack.prodSmartedit,
                prodSmarteditContainer: bundlePaths.external.webpack.prodSmarteditContainer,
                devSmartedit: bundlePaths.external.webpack.devSmartedit,
                devSmarteditContainer: bundlePaths.external.webpack.devSmarteditContainer,
                e2eSmartedit: bundlePaths.external.webpack.e2eSmartedit,
                e2eSmarteditContainer: bundlePaths.external.webpack.e2eSmarteditContainer,
                e2eScripts: bundlePaths.external.webpack.e2eScripts,
                e2eSmarteditFocused: bundlePaths.external.webpack.e2eSmarteditFocused,
                e2eSmarteditContainerFocused:
                    bundlePaths.external.webpack.e2eSmarteditContainerFocused
            };

            // Fallback to old generated webpack configurations.
            Object.keys(config).forEach((key) => {
                const resolved = resolve(config[key]);
                if (!fs.existsSync(resolved)) {
                    if (bundlePaths.external.generated.webpack[key]) {
                        const fallback = resolve(bundlePaths.external.generated.webpack[key]);

                        grunt.log
                            .warn(`Deprecated Webpack Configuration: ${fallback}.\n For more information on upgrading, 
                        please consult the smartedit-build/builders/README.md`);

                        config[key] = () => require(fallback);
                    } else {
                        grunt.log.warn(`Configuration file not found for webpack:${key}.`);
                        delete config[key];
                    }
                } else {
                    config[key] = () => require(resolved);
                }
            });

            return config;
        }
    };
};
