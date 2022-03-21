/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    return {
        targets: ['run'],
        config: function(data, conf) {
            conf = conf || {};
            conf.options = {
                standalone: true, //to declare a module as opposed to binding to an existing one
                module: 'coretemplates'
            };
            conf.run = {
                src: ['web/app/**/*.html', '!**/generated/**/*'],
                dest: 'jsTarget/templates.js'
            };
            return conf;
        }
    };
};
