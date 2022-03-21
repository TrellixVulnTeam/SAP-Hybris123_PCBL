/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { resolve } = require('path');

const {
    compose,
    set,
    webpack: { dev, devtool, external, output, tsLoaderOnly }
} = require('../../builders');

const base = require('./shared/webpack.base.config');

const bundlePaths = require('../../bundlePaths');

const smartedit = compose(
    dev(),
    tsLoaderOnly(resolve(bundlePaths.external.generated.tsconfig.e2eSmartedit)),
    output({
        path: resolve('./'),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    })
)(base);

const smarteditcontainer = compose(
    dev(),
    tsLoaderOnly(resolve(bundlePaths.external.generated.tsconfig.e2eSmarteditContainer)),
    output({
        path: resolve('./'),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    })
)(base);

const scripts = compose(
    devtool('none'),
    set('target', 'node'),
    set('node', {
        __filename: false,
        __dirname: false
    }),
    external('jasmine', 'jasmine'),
    external('angular-mocks', 'angular-mocks'),
    external('protractor', 'protractor'),
    tsLoaderOnly(resolve(bundlePaths.external.generated.tsconfig.e2eScripts)),
    output({
        path: resolve('./test'),
        filename: '[name].js'
    })
)(require('./shared/webpack.bare.config'));

module.exports = {
    smartedit,
    smarteditcontainer,
    scripts
};
