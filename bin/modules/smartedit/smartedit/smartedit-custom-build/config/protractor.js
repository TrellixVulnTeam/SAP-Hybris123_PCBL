/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    return {
        targets: [],
        config: function(data, conf) {
            const lodash = require('lodash');
            const paths = require('../paths');

            let optionSpecs = {
                options: {
                    args: {
                        specs: global.smartedit.taskUtil.protractor.getSpecs(paths.tests.allE2e)
                    }
                }
            };

            lodash.defaultsDeep(conf.run, optionSpecs);
            lodash.defaultsDeep(conf.maxrun, optionSpecs);

            return conf;
        }
    };
};
