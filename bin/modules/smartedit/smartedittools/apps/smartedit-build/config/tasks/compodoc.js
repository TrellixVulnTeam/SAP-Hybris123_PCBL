/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */

const { spawnSync, exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const configPaths = require(path.resolve('smartedit-custom-build/paths'));

// for regexp: https://stackoverflow.com/questions/37528373/how-to-remove-all-text-between-the-outer-parentheses-in-a-string
const UNSUPPORTED_DECORATOR_REGEXP = [
    { re: /@SeDowngradeComponent\((?:[^)(]|\([^)(]*\))*\)/, replace: '' },
    { re: /@SeDowngradeService\((?:[^)(]|\([^)(]*\))*\)/, replace: '@Injectable()' },
    { re: /@GatewayProxied\((?:[^)(]|\([^)(]*\))*\)/, replace: '' },
    { re: /@SeEntryModule\((?:[^)(]|\([^)(]*\))*\)/, replace: '' }
];

module.exports = function(grunt) {
    function includeTsFile(path) {
        return path.endsWith('.ts');
    }

    function includeByRegexp(config) {
        return (path) => {
            const content = fs.readFileSync(path, { encoding: 'UTF-8' });

            return config.some((obj) => obj.re.test(content));
        };
    }

    function replaceAndWriteByRegexp(config) {
        return (path) => {
            let content = fs.readFileSync(path, { encoding: 'UTF-8' });

            config.forEach((obj) => {
                content = content.replace(obj.re, obj.replace);
            });

            fs.writeFileSync(path, content);
        };
    }
    function getFilesRecursively(dir) {
        return fs.readdirSync(dir).reduce((acc, file) => {
            const fullPath = path.join(dir, file);

            if (fs.lstatSync(fullPath).isDirectory()) {
                return [...acc, ...getFilesRecursively(fullPath)];
            } else {
                return [...acc, fullPath];
            }
        }, []);
    }

    function removeTemporaryDirectory() {
        if (fs.existsSync(configPaths.compodoc.temp)) {
            removeDirectoryOrFile(configPaths.compodoc.temp);
        }
    }

    function removeDirectoryOrFile(entityPath) {
        const fullPath = path.resolve(entityPath);
        fs.removeSync(fullPath);
    }

    function createTemporaryDirectory() {
        removeTemporaryDirectory();

        const tempDirPath = configPaths.compodoc.temp;
        if (!fs.existsSync(tempDirPath)) {
            fs.mkdirSync(tempDirPath);
        }
        fs.copySync(configPaths.compodoc.source, tempDirPath);
    }

    // Compodoc has issues with custom decorators usage with Angular build-it ones.
    // We need to use a walkaround to remove these decorators before compodoc evaluation.
    // For this purpose we create a temporary directory on which compodoc will base.
    // After the compodoc has finished building the files, we remove the temporary directory

    function removeUnsupportedDecorators() {
        getFilesRecursively(configPaths.compodoc.temp)
            .filter(includeTsFile)
            .filter(includeByRegexp(UNSUPPORTED_DECORATOR_REGEXP))
            .forEach(replaceAndWriteByRegexp(UNSUPPORTED_DECORATOR_REGEXP));
    }

    function createOutputDir(dir) {
        if (!fs.existsSync(configPaths.compodoc.output.general)) {
            fs.mkdirSync(configPaths.compodoc.output.general);
        }

        if (fs.existsSync(dir)) {
            removeDirectoryOrFile(dir);
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    function generateCompodoc(input, output, title, async) {
        createTemporaryDirectory();
        createOutputDir(output);
        removeUnsupportedDecorators();
        runCompodoc(input, output, title, async);
    }

    function runCompodoc(input, output, name, done) {
        const compodocBinPath = path.resolve('./node_modules/@compodoc/compodoc/bin/index-cli.js');

        const params = [
            '-p',
            path.resolve(input),
            '-d',
            path.resolve(output),
            '--name',
            '"' + name + ' Docs"',
            '--customLogo',
            configPaths.compodoc.customLogo,
            '--hideGenerator',
            '--silent'
        ];
        executeNodeCommand(compodocBinPath, params, done);
    }

    function serveCompodoc(done) {
        const compodocBinPath = path.resolve('./node_modules/@compodoc/compodoc/bin/index-cli.js');
        const params = ['-s', '-d', path.resolve(configPaths.compodoc.output.general)];
        executeNodeCommand(compodocBinPath, params, done);
    }

    function executeNodeCommand(command, params, done) {
        exec('node ' + command + ' ' + params.join(' '), { maxBuffer: 1024 * 2000 }, function(
            err,
            stdout,
            stderr
        ) {
            removeTemporaryDirectory();
            if (err) {
                grunt.log.errorlns(err.toString());
                done();
                return;
            }

            grunt.log.writeln(stdout);
            grunt.log.writeln(stderr);
            done();
        });
    }

    // SMARTEDIT

    grunt.registerTask('compodoc:smarteditcommons', 'Generate Angular Documentation', function() {
        generateCompodoc(
            configPaths.tsconfig.compodocSmarteditCommons,
            configPaths.compodoc.output.smarteditCommons,
            'Smartedit Commons',
            this.async()
        );
    });

    grunt.registerTask('compodoc:smartedit', 'Generate Angular Documentation', function() {
        generateCompodoc(
            configPaths.tsconfig.compodocSmartedit,
            configPaths.compodoc.output.smartedit,
            'Smartedit',
            this.async()
        );
    });

    grunt.registerTask('compodoc:smarteditcontainer', 'Generate Angular Documentation', function() {
        generateCompodoc(
            configPaths.tsconfig.compodocSmarteditContainer,
            configPaths.compodoc.output.smarteditContainer,
            'Smartedit Container',
            this.async()
        );
    });

    // CMSSMARTEDIT

    grunt.registerTask('compodoc:cmscommons', 'Generate Cms Commons Documentation', function() {
        generateCompodoc(
            configPaths.tsconfig.compodocSmarteditCommons,
            configPaths.compodoc.output.smarteditCommons,
            'Cms Smartedit Commons',
            this.async()
        );
    });

    grunt.registerTask('compodoc:cmssmartedit', 'Generate Cms Smartedit Documentation', function() {
        generateCompodoc(
            configPaths.tsconfig.compodocSmartedit,
            configPaths.compodoc.output.smartedit,
            'Cms Smartedit',
            this.async()
        );
    });

    grunt.registerTask(
        'compodoc:cmssmarteditcontainer',
        'Generate Cms Smarteditcontainer Documentation',
        function() {
            generateCompodoc(
                configPaths.tsconfig.compodocSmarteditContainer,
                configPaths.compodoc.output.smarteditContainer,
                'Cms Smartedit Container',
                this.async()
            );
        }
    );

    grunt.registerTask('compodoc_smartedit', [
        'generateTsConfig',
        'compodoc:smarteditcommons',
        'compodoc:smartedit',
        'compodoc:smarteditcontainer'
    ]);

    grunt.registerTask('compodoc_cmssmartedit', [
        'generateTsConfig',
        'compodoc:cmscommons',
        'compodoc:cmssmartedit',
        'compodoc:cmssmarteditcontainer'
    ]);

    grunt.registerTask('compodoc:serve_smartedit', 'Serve Smartedit Documentation', function() {
        serveCompodoc(this.async());
    });

    grunt.registerTask(
        'compodoc:serve_cmssmartedit',
        'Serve Cmssmartedit Documentation',
        function() {
            serveCompodoc(this.async());
        }
    );
};
