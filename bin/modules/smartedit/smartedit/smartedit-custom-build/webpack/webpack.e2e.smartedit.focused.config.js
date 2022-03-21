/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    compose,
    webpack: { multiEntry },
    utils
} = require('../../smartedit-build/builders');

const { smartedit } = require('../../smartedit-build/config/webpack/webpack.e2e.shared.config');

const focusedDirs = utils.getFocusedDirs('test/e2e').map((path) => path + '/inner*.ts');

module.exports = compose(multiEntry('jsTarget', focusedDirs))(smartedit);
