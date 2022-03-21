/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt, taskName, taskDescription) {
    if (!grunt) {
        throw new Error(__filename + ' - Missing grunt');
    }

    var startIntro = '-->> Starting grunt task: ';
    var endIntro = '<<-- Finished grunt task: ';
    var line = '='.repeat(startIntro.length + taskName.length);

    return {
        startTask: function() {
            grunt.log.writeln('');
            grunt.log.writeln(line['green']);
            grunt.log.write(startIntro);
            grunt.log.writeln(taskName['cyan']);
            grunt.verbose.writeln('\nDescription:\n' + taskDescription);
        },

        endTask: function() {
            grunt.log.writeln('');
            grunt.log.write(endIntro);
            grunt.log.writeln(taskName['cyan']);
            grunt.log.writeln('');
        },

        phase: function(phaseName) {
            grunt.log.writeln('');
            grunt.log.writeln('> ' + phaseName['cyan']);
        },

        newLine: function() {
            grunt.log.writeln('');
        },

        info: function(str) {
            grunt.log.writeln(str);
        },

        error: function(str) {
            grunt.log.error(str);
        },

        verbose: {
            newLine: function() {
                grunt.verbose.writeln('');
            },

            detail: function(str) {
                grunt.verbose.writeln(str);
            }
        }
    };
};
