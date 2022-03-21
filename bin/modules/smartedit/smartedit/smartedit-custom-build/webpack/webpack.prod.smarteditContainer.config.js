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
const { smarteditContainer } = require('./webpack.shared.config');

module.exports = compose(
    smarteditContainer(),
    prod(),
    sassLoader(),
    tsLoader(resolve(bundlePaths.external.generated.tsconfig.prodSmarteditContainer), false)
)(base);
