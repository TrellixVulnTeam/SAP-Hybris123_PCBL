module.exports = function(grunt) {

    var phantomJSPattern = 'node_modules/**/phantomjs*';

    var testsRoot = 'jsTests/tests/';
    var testsRootFiles = testsRoot + '*';



    grunt.registerTask("multiKarma", 'Executes unit tests for each project via karma separately.', function() {
        //if npmtestancillary is not present, phantomjs drivers won't be present

        if (grunt.file.expand({
                filter: 'isFile'
            }, phantomJSPattern).length > 0) {

            grunt.file.expand({
                filter: 'isDirectory'
            }, testsRootFiles).forEach(function(dir) {
                var folderName = dir.replace(testsRoot, "");
                grunt.task.run('karma:' + folderName);
            });

        } else {
            grunt.log.warn('multiKarma grunt phase was not run since no phantomjs driver found under ' + phantomJSPattern);
        }
    });

};
