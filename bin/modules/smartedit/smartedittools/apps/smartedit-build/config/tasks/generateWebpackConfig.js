/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name generateWebpackConfig(T)
     * @deprecated Since 1905. Please see SmartEdit Configuration Builders for upgrading.
     * @description
     * # generateWebpackConfig Task
     * generateWebpackConfig is a task that generates webpack.config.json files from a json properties object
     *
     * # Configuration
     * ```js
     * {
     *      <target>: {
     *          dest: string,  // the output path/filename of the generated webpack file
     *          data: string,  // the json config data
     *          tsConfigFile: string     // location of tsConfig file for ts-loader
     *      }
     * }
     * ```
     */

    const fs = require('fs-extra');
    const path = require('path');
    const ts = require('typescript');
    const serialize = require('serialize-javascript');
    const taskName = 'generateWebpackConfig';

    grunt.registerMultiTask(taskName, function() {
        const config = this.data;
        grunt.verbose.writeln(`${taskName} config: ${JSON.stringify(config)}`);

        validateConfig(config);

        const webpackConfig = serialize(config.data, {
            space: 4
        })
            .replace(/%tsConfigFile%/g, config.tsConfigFile || null)
            .replace(
                /%commonsManifestFile%/,
                config.commonsManifestFile ? config.commonsManifestFile : null
            );

        grunt.log.warn(
            "Deprecated since 1905. Please use 'smartedit-build/builders' instead. For more information on upgrading " +
                'please consult the smartedit-build/builders/README.md'
        );

        grunt.log.writeln(`Writing to: ${config.dest}`);
        fs.outputFileSync(config.dest, `module.exports = ${webpackConfig};`);
    });

    function validateConfig(webpackConfig) {
        if (!webpackConfig.data) {
            grunt.fail.fatal(`${taskName} - invalid webpackConfig, [data] parameter is required.`);
        }
        if (!webpackConfig.dest) {
            grunt.fail.fatal(`${taskName} - invalid webpackConfig, [dest] parameter is required.`);
        }

        // Validate that the ts config file exist and has no errors.
        if (
            webpackConfig.tsConfigFile &&
            !webpackConfig.tsConfigShared &&
            fs.existsSync(webpackConfig.tsConfigShared)
        ) {
            grunt.log.writeln(`Validating tsconfig file: ${webpackConfig.tsConfigFile}`);
            const configFilePath = path.resolve(webpackConfig.tsConfigFile);
            const { config, error } = ts.readConfigFile(configFilePath, (path) =>
                fs.readFileSync(path, 'utf-8')
            );
            if (error) {
                grunt.fail.fatal(`Error while validating tsconfig: ${error.messageText}`);
            }
        }
    }
};
