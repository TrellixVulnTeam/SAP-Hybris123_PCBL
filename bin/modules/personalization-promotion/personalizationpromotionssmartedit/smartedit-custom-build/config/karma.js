module.exports = function(grunt) {

    return {
        targets: ['personalizationpromotionssmartedit', 'personalizationpromotionssmarteditContainer'],
        config: function(data, conf) {
            const {
                coverage
            } = require('../../smartedit-build/builders/karma');
            const paths = require('../../jsTests/paths');

            const config = {
                // just rename the targets to match the source folder names
                personalizationpromotionssmartedit: conf.unitSmartedit,
                personalizationpromotionssmarteditContainer: conf.unitSmarteditContainer,
            };

            if (grunt.option('coverage')) {
                config.personalizationpromotionssmartedit.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.personalizationpromotionssmarteditDirName
                )(config.personalizationpromotionssmartedit.options);

                config.personalizationpromotionssmarteditContainer.options = coverage(
                    paths.coverage.dir,
                    paths.coverage.personalizationpromotionssmarteditContainerDirName
                )(config.personalizationpromotionssmarteditContainer.options);
            }

            return config;
        }
    };
};
