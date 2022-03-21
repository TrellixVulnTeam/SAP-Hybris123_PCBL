/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name e2e_report
     * @description
     * # e2e_report Task
     * Converts JUnit XML results into an HTML report. The generated report is then opened by the browser.
     */
    grunt.registerTask(
        'e2e_report',
        'Converts JUnit XML results into an HTML report. The generated report is then opened by the browser.',
        function() {
            const path = require('path');
            const bundlePaths = require('../../bundlePaths');
            const results = path.resolve(bundlePaths.test.e2e.protractor.savePath);
            const output = results + '/index.html';

            // Make sure xunit-viewer is available
            try {
                require('xunit-viewer/cli');
            } catch (e) {
                grunt.fail.fatal(
                    'xunit-viewer package is missing! Please update your package.json'
                );
            }

            // Check if JUnit results exists
            if (!grunt.file.exists(results)) {
                grunt.fail.fatal(
                    results +
                        " does not exist. Run 'grunt verify' or 'grunt verify_max' task first."
                );
            }

            // Generate HTML report from xml JUnit results
            const { spawnSync } = require('child_process');
            var child = spawnSync('xunit-viewer --results=' + results + '  --output=' + output, {
                stdio: 'inherit',
                shell: true
            });

            // Open the generated report in the browser
            child = spawnSync('open ' + output, {
                stdio: 'inherit',
                shell: true
            });
        }
    );
};
