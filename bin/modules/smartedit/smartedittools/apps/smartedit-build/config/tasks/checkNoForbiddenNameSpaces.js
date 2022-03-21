/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    /**
     * @ngdoc overview
     * @name checkNoForbiddenNameSpaces(T)
     * @description
     * # checkNoForbiddenNameSpaces Task
     * checkNoForbiddenNameSpaces is a task designed to prevent accidentally referencing 3rd party libraries via
     * their default namespace, instead of the angular service wrapper.
     *
     * Current scanned values:
     * - **jquery**: 'jQuery', '$(', '$.', 'window.$'
     * - **lodash**: '_.', 'window._'
     *
     * # Configuration
     * ```js
     * {
     *      pattern: string[]   // array of glob patterns of files to scan
     * }
     * ```
     *
     */

    const lodash = require('lodash');

    const taskName = 'checkNoForbiddenNameSpaces';

    grunt.registerTask(
        taskName,
        'fails the build if the code contains forbidden napespaces',
        function() {
            var GLOBAL_IGNORE_HINT = '/* forbiddenNameSpaces:false */';
            var IGNORE_HINT = '/* forbiddenNameSpaces %namespace:false */';

            var VIOLATION_TEMPLATE =
                "File <%= filePath %> contains forbidden namespace '<%= forbiddenNamespace %>', consider using '<%= allowedNamespace %>'";
            var DEPRECATION_TEMPLATE =
                "File <%= filePath %> contains namespace '<%= forbiddenNamespace %>' that is deprecated since <%= deprecatedSince %>, consider using '<%= allowedNamespace %>'";

            var REGEXP_ROOT = 'REGEXP:';

            var containsKey = function(text, key) {
                var escapedKeyForRegexp = null;
                if (key.indexOf(REGEXP_ROOT) === 0) {
                    escapedKeyForRegexp = key.replace(REGEXP_ROOT, '');
                } else {
                    escapedKeyForRegexp =
                        '[\\s]+' + key.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                }

                return new RegExp(escapedKeyForRegexp, 'g').test(text);
            };

            var defaultMap = {
                patterns: [],
                namespaces: {
                    'jQuery.': 'yjQuery in recipes or window.smarteditJQuery outside angular',
                    'jQuery(': 'yjQuery in recipes or window.smarteditJQuery outside angular',
                    '$(': 'yjQuery in recipes or window.smarteditJQuery outside angular',
                    '$.': 'yjQuery in recipes or window.smarteditJQuery outside angular',
                    'window.$': 'yjQuery in recipes or window.smarteditJQuery outside angular',
                    '_.': 'lodash in recipes or window.smarteditLodash outside angular',
                    'window._(': 'lodash in recipes or window.smarteditLodash outside angular',
                    'window._.': 'lodash in recipes or window.smarteditLodash outside angular',
                    '(window as any)': 'typed window',
                    'window as any': 'typed window',
                    'REGEXP:expect\\((.+)\\.isPresent\\(\\)\\)\\.toBeFalsy\\(\\);':
                        'browser.waitForAbsence(selector | element)',
                    'REGEXP:expect\\((.+)\\.isPresent\\(\\)\\)\\.toBe\\(false':
                        'browser.waitForAbsence(selector | element)'
                }
            };

            var gruntConfig = grunt.config.get(taskName);

            if (!gruntConfig.pattern && !gruntConfig.mappings) {
                grunt.fail.warn('neither pattern nor mappings were provided for task ' + taskName);
            }

            var mergedMap = lodash.cloneDeep(defaultMap);

            let patterns = [];
            let mappings = [];

            //legacy
            if (gruntConfig.pattern) {
                patterns = gruntConfig.pattern;
                mergedMap.patterns = gruntConfig.pattern;
                mappings = [mergedMap];
                //new approach
            } else {
                //aggregate all patterns from all the mappings
                patterns = gruntConfig.mappings.reduce((seed, next) => {
                    seed = seed.concat(
                        next.patterns.filter((pattern) => pattern.indexOf('!') !== 0)
                    );
                    return seed;
                }, []);

                mappings = lodash.cloneDeep(gruntConfig.mappings);
                mappings.forEach((mapping) => {
                    // if a mapping specifies '*' as namespaces, we swap it for the default namespaces
                    if (mapping.namespaces === '*') {
                        mapping.namespaces = mergedMap.namespaces;
                    }
                });
            }

            var violations = [];
            var addViolation = function(namespace, filePath, mapping) {
                violations.push({
                    message: grunt.template.process(
                        mapping.deprecatedSince ? DEPRECATION_TEMPLATE : VIOLATION_TEMPLATE,
                        {
                            data: {
                                filePath: filePath,
                                forbiddenNamespace: namespace.replace(
                                    new RegExp('^' + REGEXP_ROOT),
                                    ''
                                ),
                                allowedNamespace: mapping.namespaces[namespace],
                                deprecatedSince: mapping.deprecatedSince
                            }
                        }
                    ),
                    severity: mapping.level
                        ? mapping.level
                        : mapping.deprecatedSince
                        ? 'INFO'
                        : null
                });
            };
            var getForbiddenNamespaces = function(mapping, fileContent) {
                return Object.keys(mapping.namespaces)
                    .filter(
                        (namespace) =>
                            fileContent.indexOf(GLOBAL_IGNORE_HINT) === -1 &&
                            fileContent.indexOf(IGNORE_HINT.replace('%namespace', namespace)) === -1
                    )
                    .filter((namespace) => containsKey(fileContent, namespace));
            };

            //expanding over all aggregated patterns from all the mappings for performance purposes
            grunt.file
                .expand(
                    {
                        filter: 'isFile'
                    },
                    patterns
                )
                .filter((filePath) => {
                    var fileContent = grunt.file.read(filePath);
                    var fileName = /^.*?([^\/.]*)[^\/]*$/.exec(filePath)[1];

                    if (!/^generated*/.test(fileName)) {
                        //for a given file, only consider the mapping the patterns of which match the file path
                        mappings
                            .filter((mapping) => grunt.file.isMatch(mapping.patterns, filePath))
                            .forEach((mapping) => {
                                getForbiddenNamespaces(mapping, fileContent).forEach(
                                    (namespace) => {
                                        addViolation(namespace, filePath, mapping);
                                    }
                                );
                            });
                    }
                });

            if (violations.length) {
                grunt.log.writeln(
                    'At least one file contains a forbidden or deprecated namespace'.yellow
                );
                violations.forEach(function(violation) {
                    if (violation.severity === 'FATAL') {
                        grunt.log.writeln(('ERROR: ' + violation.message).red);
                    } else if (violation.severity === 'INFO') {
                        grunt.log.writeln(('INFO: ' + violation.message).green);
                    }
                });
                if (violations.filter((violation) => violation.severity === 'FATAL').length) {
                    grunt.fail.warn('Make sure not to commit this!');
                }
            }
        }
    );
};
