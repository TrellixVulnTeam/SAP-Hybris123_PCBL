/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const base = require('../../smartedit-build/config/webpack/shared/webpack.base.config');

const {
    compose,
    webpack: { tsLoader, sassLoader, dev }
} = require('../../smartedit-build/builders');

const bundlePaths = require('../../smartedit-build/bundlePaths');
const { smarteditContainer } = require('./webpack.shared.config');

module.exports = compose(
    dev(),
    smarteditContainer(),
    sassLoader(true, true, true),
    tsLoader(resolve(bundlePaths.external.generated.tsconfig.devSmarteditContainer), false, true)
)(base);
