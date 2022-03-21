/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
// Doc: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
module.exports = function(grunt) {
    const taskName = 'compileTs';
    const taskDescription = 'Compile TypeScript to JavaScript';

    grunt.registerMultiTask(taskName, taskDescription, function() {
        const ts = require('typescript');
        const path = require('path');
        const fs = require('fs-extra');

        const gruntConfig = this.data;
        if (!gruntConfig.dest) {
            grunt.fail.fatal(`${taskName} - No destination specified in config.`);
        }

        const compilerOptions = {
            module: gruntConfig.module >= 0 ? gruntConfig.module : ts.ModuleKind.CommonJS
        };

        grunt.file.expand(gruntConfig.src).forEach((entry) => {
            if (fs.existsSync(entry)) {
                const sourceFile = ts.createSourceFile(
                    entry,
                    fs.readFileSync(entry).toString(),
                    gruntConfig.target >= 0 ? gruntConfig.target : ts.ScriptTarget.ES2015,
                    true
                );
                const transpileOutput = ts.transpileModule(sourceFile.getFullText(), {
                    compilerOptions
                });
                const jsFilePath = path.join(
                    gruntConfig.dest,
                    path.basename(entry).replace(/.ts/g, '.js')
                );
                fs.outputFileSync(jsFilePath, transpileOutput.outputText, 'utf8');
            } else {
                grunt.fail.warn(`${taskName} - invalid path: ${entry}`);
            }
        });
        grunt.log.ok();
    });
};
