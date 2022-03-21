/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const {
    compose,
    webpack: { multiEntry }
} = require('../../smartedit-build/builders');

const { scripts } = require('../../smartedit-build/config/webpack/webpack.e2e.shared.config');

module.exports = compose(multiEntry('test', 'e2e/**/*Test.ts'))(scripts);
