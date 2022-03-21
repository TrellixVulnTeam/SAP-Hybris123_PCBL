/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    /**
     * @ngdoc overview
     * @name generateStorefrontIndexHtml(C)
     * @description
     * # generateStorefrontIndexHtml Configuration
     * The default generateStorefrontIndexHtml configuration is configured with a default simple static layout, no
     * delay on any slots or components, and js rendered strategy.
     *
     * The **dest** property must be provided by the extension.
     *
     */

    return {
        config: function(data, conf) {
            return {
                layoutAlias: 'STATIC_LAYOUT',
                delayAlias: 'DELAY_NONE',
                renderAlias: 'JS_RENDERED',

                // None in default config
                scripts: [],

                // Must be defines by the extension
                dest: ''
            };
        }
    };
};
