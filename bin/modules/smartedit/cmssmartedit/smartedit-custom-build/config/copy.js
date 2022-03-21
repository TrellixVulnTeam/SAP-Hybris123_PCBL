/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        config: function(data, conf) {
            const paths = require('../../jsTests/paths');
            conf.dev = {
                expand: true,
                flatten: true,
                src: ['jsTarget/*.js', 'jsTarget/*.map'],
                dest: 'web/webroot/cmssmartedit/js'
            };
            conf.e2e = {
                expand: true,
                flatten: false,
                src: paths.tests.allE2eTSMocks,
                dest: 'jsTarget/'
            };
            return conf;
        }
    };
};
