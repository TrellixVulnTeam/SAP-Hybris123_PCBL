/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const base = require('./webpack.bare.config');

const {
    compose,
    webpack: { ngAnnotatePlugin, dllPlugins }
} = require('../../../builders');

module.exports = compose(
    dllPlugins(),
    ngAnnotatePlugin()
)(base);
