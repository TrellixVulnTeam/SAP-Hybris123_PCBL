module.exports = function() {

    return {
        targets: ['personalizationsmartedit', 'personalizationsmarteditContainer'],
        config: function(data, conf) {
            var paths = require('../../jsTests/paths');

            return {
                options: {
                    dest: 'jsTarget/docs',
                    title: "Personalization API",
                    startPage: '/#/personalizationsmartedit'
                },
                personalizationsmartedit: {
                    api: true,
                    src: [
                        paths.sources.commonsTSFiles,
                        paths.sources.personalizationsmarteditTSFiles
                    ],
                    title: 'Personalization SmartEdit'
                },
                personalizationsmarteditContainer: {
                    api: true,
                    src: [
                        paths.sources.commonsTSFiles,
                        paths.sources.personalizationsmarteditContainerTSFiles
                    ],
                    title: 'Personalization SmartEdit Container'
                }
            };
        }
    };
};
