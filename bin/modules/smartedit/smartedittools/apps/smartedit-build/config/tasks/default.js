/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name default
     * @description
     * # default Task
     * Shows help when grunt is called with no args
     */
    grunt.registerTask('default', function() {
        var done = this.async();
        grunt.util.spawn(
            {
                cmd: 'grunt',
                args: ['--help']
            },
            function(error, result, code) {
                grunt.log.writeln(result.stdout);
                done(!error);
            }
        );
    });
};
