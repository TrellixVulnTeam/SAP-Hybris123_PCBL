/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /** @ngdoc overview
     * @name npmTasks(T)
     * @description
     * # npm Tasks
     *
     * The following are the 3rd party npm tasks available through node_modules from the npmancillary extension:
     * - grunt-contrib-clean
     * - grunt-contrib-concat
     * - grunt-contrib-connect
     * - grunt-contrib-copy
     * - grunt-contrib-symlink
     * - grunt-contrib-jshint
     * - grunt-contrib-less
     * - grunt-contrib-uglify
     * - grunt-contrib-watch
     * - grunt-file-append
     * - grunt-jsbeautifier
     * - grunt-karma
     * - grunt-ngdocs
     * - grunt-angular-templates
     * - grunt-postcss
     * - grunt-protractor-runner
     * - grunt-tslint
     * - grunt-webpack
     * - grunt-shell
     * - grunt-shell-spawn
     */

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');
};
