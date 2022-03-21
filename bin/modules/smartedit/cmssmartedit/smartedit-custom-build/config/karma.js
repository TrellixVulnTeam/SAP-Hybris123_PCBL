/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    return {
        targets: ['cmssmartedit', 'cmssmarteditContainer'],
        config: function(data, conf) {
            const { coverage } = require('../../smartedit-build/builders/karma');
            const paths = require('../../jsTests/paths');

            const config = {
                // just rename the targets to match the source folder names
                cmssmartedit: conf.unitSmartedit,
                cmssmarteditContainer: conf.unitSmarteditContainer
            };

            if (grunt.option('coverage')) {
                config.cmssmartedit.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.cmssmarteditDirName
                )(config.cmssmartedit.options);

                config.cmssmarteditContainer.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.cmssmarteditcontainerDirName
                )(config.cmssmarteditContainer.options);
            }

            return config;
        }
    };
};
