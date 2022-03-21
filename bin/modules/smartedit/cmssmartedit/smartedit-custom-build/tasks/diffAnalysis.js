/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const instrumentFunctionsAnalyzer = require('../test/diffAnalysis/instrumentFunctionsAnalyzer');
const instrumentBindVariablesAnalyzer = require('../test/diffAnalysis/instrumentBindVariablesAnalyzer');

module.exports = function(grunt) {
    grunt.registerTask('diffAnalysis', function() {
        const previousVersion = grunt.option('previousVersion');
        const nextVersion = grunt.option('nextVersion');

        if (nextVersion && previousVersion) {
            instrumentBindVariablesAnalyzer.execute(previousVersion, nextVersion);
            instrumentFunctionsAnalyzer.execute(previousVersion, nextVersion);
        } else {
            grunt.fail.fatal(
                'diffAnalysis not activated, specify the next version with --nextVersion=nextVersion and previous version with --previousVersion=previousVersion'
            );
        }
    });
};
