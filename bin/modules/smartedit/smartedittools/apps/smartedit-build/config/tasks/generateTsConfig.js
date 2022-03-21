/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name generateTsConfig(T)
     * @description
     * # generateTsConfig Task
     * generateTsConfig is a task that generates tsconfig.json files from a json properties object
     *
     * # Configuration
     * ```js
     * {
     *      <target>: {
     *          dest: string,  // the output path/filename of the generated tsconfig
     *          data: string,  // the json config data
     *      }
     * }
     *
     * ```
     */

    const fs = require('fs-extra');
    const taskName = 'generateTsConfig';

    function validateConfig(config) {
        if (!config.data) {
            grunt.fail.fatal(`${taskName} - invalid config, [data] param is required`);
        }
        if (!config.dest) {
            grunt.fail.fatal(`${taskName} - invalid config, [dest] param is required`);
        }
        // When the webpackConfig is using ts-loader with transpileOnly: true, the "include" (or "files") option in tsConfig must be set, else the Type Checking will not run.
        // The tsConfig MUST comply with this requirement to make sure Type Checking will always be performed.
        if (!config.shared) {
            const hasInclude = config.data.include && config.data.include.length;
            const hasFiles = config.data.files && config.data.files.length;
            if (!hasInclude && !hasFiles) {
                grunt.log.warn(
                    `You must define the "include" or "files" option in ${
                        config.dest
                    }. \nThis is mandatory to have Type Checking enabled in your project.`
                );
            }
        }
    }

    grunt.registerMultiTask(taskName, function() {
        grunt.verbose.writeln(`${taskName} config: ${JSON.stringify(this.data)}`);

        validateConfig(this.data);

        const config = this.data;

        // WRITE
        grunt.log.writeln(`Writing to: ${config.dest}`);
        fs.outputFileSync(config.dest, JSON.stringify(config.data, null, 4));
    });
};
