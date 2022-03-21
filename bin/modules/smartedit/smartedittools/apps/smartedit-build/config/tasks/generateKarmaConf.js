/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    /**
     * @api
     * @ngdoc overview
     * @name generateKarmaConf(T)
     * @deprecated Since 1905. Please see SmartEdit Configuration Builders for upgrading.
     * @description
     *
     * # generateKarmaConf Task
     * generateKarmaConf is a multiTask that creates karma.conf files from json karma configuration.
     *
     * # Configuration
     * ```js
     * {
     *     <target>: {
     *          dest: string    // output path and filename
     *          data: string    // json formated string of karma configuration
     *     }
     * }
     * ```
     *
     */

    const fs = require('fs-extra');
    const serialize = require('serialize-javascript');

    const taskName = 'generateKarmaConf';

    function validateConfig(config) {
        if (!config.data) {
            grunt.fail.fatal(`${taskName} - invalid config, [data] param is required`);
        }
        if (!config.dest) {
            grunt.fail.fatal(`${taskName} - invalid config, [dest] param is required`);
        }
    }

    grunt.registerMultiTask(taskName, function() {
        grunt.verbose.writeln(`${taskName} config: ${JSON.stringify(this.data)}`);

        validateConfig(this.data);

        const config = this.data;

        const tpl = `module.exports = function(config) {
            config.set(
                ${serialize(config.data, { space: 4 })}
            );
        };`;

        grunt.log.warn(
            "Deprecated since 1905. Please use 'smartedit-build/builders' instead. For more information on upgrading " +
                'please consult the smartedit-build/builders/README.md'
        );

        // WRITE
        grunt.log.writeln(`Writing to: ${config.dest}`);
        fs.outputFileSync(config.dest, tpl);
    });
};
