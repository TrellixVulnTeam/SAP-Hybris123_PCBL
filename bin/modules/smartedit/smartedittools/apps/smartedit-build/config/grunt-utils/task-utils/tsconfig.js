/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = {
    addTestPaths(conf) {
        const bundlePaths = require('../../../bundlePaths');
        const lodash = require('lodash');

        conf.compilerOptions.typeRoots = lodash.union(conf.compilerOptions.typeRoots, [
            bundlePaths.bundleRoot + '/test/@types'
        ]);

        conf.compilerOptions.paths = lodash.merge(conf.compilerOptions.paths, {
            testhelpers: [bundlePaths.test.unit.root],
            'testhelpers/*': [bundlePaths.test.unit.root + '/*']
        });
    }
};
