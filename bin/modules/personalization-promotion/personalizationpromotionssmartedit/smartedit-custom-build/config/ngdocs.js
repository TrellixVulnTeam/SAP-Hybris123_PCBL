module.exports = function() {

    return {
        targets: ['personalizationpromotionssmartedit', 'personalizationpromotionssmarteditContainer'],
        config: function(data, conf) {
            var paths = require('../../jsTests/paths');

            return {
                options: {
                    dest: 'jsTarget/docs',
                    title: "Personalization Promotions API",
                    startPage: '/#/personalizationpromotionssmartedit'
                },
                personalizationpromotionssmartedit: {
                    api: true,
                    src: [
                        paths.sources.commonsTSFiles,
                        paths.sources.personalizationpromotionssmarteditTSFiles
                    ],
                    title: 'Personalization Promotions SmartEdit'
                },
                personalizationpromotionssmarteditContainer: {
                    api: true,
                    src: [
                        paths.sources.commonsTSFiles,
                        paths.sources.personalizationpromotionssmarteditContainerTSFiles
                    ],
                    title: 'Personalization Promotions SmartEdit Container'
                }
            };
        }
    };
};
