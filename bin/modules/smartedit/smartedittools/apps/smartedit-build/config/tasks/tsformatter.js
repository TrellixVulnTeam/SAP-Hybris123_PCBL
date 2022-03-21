/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /** @ngdoc overview
     * @name tsformatter(T)
     * @description
     * # tsformatter Task
     * The tsformatter task runs the {@link https://github.com/vvakame/typescript-formatter typescript-formatter}
     * with a default configuration, on the files of your choosing.
     *
     * # Configuration
     * ```js
     * {
     *    options: object   // json object properties for typescript-formatter
     *    files: glob[]     // array of glob pattern files to format
     * }
     * ```
     */

    var tsfmt = require('typescript-formatter');

    const taskName = 'tsformatter';

    grunt.registerTask(taskName, 'TypeScript code formatter', function() {
        var done = this.async();
        var gruntConfig = grunt.config.get(taskName);
        var files = grunt.file.expand(gruntConfig.files);
        grunt.log.writeln('tsformatter - processing ' + files.length.toString().cyan + ' files.');
        tsfmt.processFiles(files, gruntConfig.options).then(function() {
            grunt.log.ok();
            done();
        });
    });
};
