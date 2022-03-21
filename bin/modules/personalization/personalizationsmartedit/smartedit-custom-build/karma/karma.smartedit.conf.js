/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
const base = require('../../smartedit-build/config/karma/karma.ext.smartedit.conf');
const customPaths = require('../../jsTests/paths');

const {
    compose,
    merge,
    add
} = require('../../smartedit-build/builders');

const karma = compose(
    merge({
        singleRun: true,
        junitReporter: {
            outputDir: 'jsTarget/test/personalizationsmartedit/junit/', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'testReport.xml' // if included, results will be saved as $outputDir/$browserName/$outputFile
        },

        files: customPaths.getPersonalizationsmarteditKarmaConfFiles(),

        proxies: {
            '/personalizationsmartedit/images/': '/base/images/'
        },

        webpack: require('../webpack/webpack.karma.smartedit.config'),
    }),
    add('exclude', [
        '**/PersonalizationsmarteditApp.ts',
        '*.d.ts'
    ], true)
)(base);

module.exports = function(config) {
    config.set(karma);
};
