/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const merge = require('webpack-merge');
const commonConfigPromise = require('./webpack.common');

const devConfigPromise = commonConfigPromise.then((commonConfig) => {
    return merge(commonConfig, {
        mode: 'development',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    enforce: 'pre',
                    use: ['source-map-loader']
                }
            ]
        }
    });
});

module.exports = devConfigPromise;
