/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, conf) {
            return {
                prefix: {
                    ignored: [
                        'page.displaycondition.', // keys provided by back-end
                        'se.', // keys provided by smartedit-locales_en.properties
                        'type.' // keys provided by back-end
                    ],
                    expected: ['se.cms.']
                },

                paths: {
                    files: ['web/features/**/*Template.html', 'web/features/**/*.js'],
                    properties: [
                        'resources/localization/cmssmartedit-locales_en.properties',
                        'smartedit-build/localization/smartedit-locales_en.properties'
                    ]
                }
            };
        }
    };
};
