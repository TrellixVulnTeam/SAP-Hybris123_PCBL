/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const base = require('../../smartedit-build/config/webpack/shared/webpack.base.config');

const {
    compose,
    webpack: { prod, tsLoader, sassLoader }
} = require('../../smartedit-build/builders');

const bundlePaths = require('../../smartedit-build/bundlePaths');
const { smartedit } = require('./webpack.shared.config');

module.exports = compose(
    smartedit(),
    prod(),
    sassLoader(),
    tsLoader(resolve(bundlePaths.external.generated.tsconfig.prodSmartedit), false)
)(base);
