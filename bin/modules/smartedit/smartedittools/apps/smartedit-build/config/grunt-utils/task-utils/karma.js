/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
/**
 * @deprecated Deprecated since 1905. Please use karma configuration builders from smartedit-build/builders/karma.
 */
module.exports = function(grunt) {
    /**
     * karma base coverage config - using 'istanbul' by default.
     * https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
     */
    const { headless, coverage } = require('../../../builders/karma');

    return {
        /**
         * @deprecated Deprecated since 1905. Please use the builder 'headless' from smartedit-build/builders/karma.
         */
        runHeadFull(conf) {
            Object.assign(conf, headless(grunt.option('browser'))(conf));
        },

        /**
         * @deprecated Deprecated since 1905. Please use the builder 'coverage' from smartedit-build/builders/karma.
         */
        coverageConfig: {
            config: (dir, subdir) => {
                return coverage(dir, subdir)({}).coverageIstanbulReporter;
            }
        }
    };
};
