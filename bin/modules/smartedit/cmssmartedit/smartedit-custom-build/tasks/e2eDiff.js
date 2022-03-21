/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const lodash = require('lodash');

module.exports = function(grunt) {
    grunt.registerTask(
        'e2eDiff',
        'runs instrumented code through e2e max then runs a diff analysis on code usage',
        function() {
            var instrument = grunt.option('instrument');
            var compareTo = grunt.option('compareTo');

            if (!lodash.isString(instrument) || !lodash.isString(compareTo)) {
                grunt.fail.fatal(
                    'e2eDiff requires command line arguments --instrument=nextVersion and --compareTo=previousVersion'
                );
            }

            grunt.task.run(['e2e_max']);

            grunt.option('previousVersion', compareTo);
            grunt.option('nextVersion', instrument);

            grunt.task.run('diffAnalysis');
        }
    );
};
