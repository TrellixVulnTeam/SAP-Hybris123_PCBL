module.exports = function(grunt) {

    return {
        targets: ['personalizationsmartedit', 'personalizationsmarteditcontainer'],
        config: function(data, conf) {
            const {
                coverage
            } = require('../../smartedit-build/builders/karma');
            const paths = require('../../jsTests/paths');

            const config = {
                // just rename the targets to match the source folder names
                personalizationsmartedit: conf.unitSmartedit,
                personalizationsmarteditcontainer: conf.unitSmarteditContainer,
            };

            if (grunt.option('coverage')) {
                config.personalizationsmartedit.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.personalizationsmarteditDirName
                )(config.personalizationsmartedit.options);

                config.personalizationsmarteditcontainer.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.personalizationsmarteditcontainerDirName
                )(config.personalizationsmarteditcontainer.options);
            }

            return config;
        }
    };
};
