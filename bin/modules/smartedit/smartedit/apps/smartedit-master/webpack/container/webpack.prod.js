/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfigPromise = require('./webpack.common');

const prodConfigPromise = commonConfigPromise.then((commonConfig) => {
    return merge(commonConfig, {
        mode: 'production',
        devtool: 'none',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true,
                        keep_fnames: true,

                        // Note: Compression is disabled for two reasons:
                        // - First, compressing files increase compilation time and do not reduce the bundle size significantly.
                        //   (more information found in this link: https://terser.org/docs/api-reference.html#terser-fast-minify-mode)
                        // - Second, if compression is enabled with all the default values, the compression will mess up some SmartEdit
                        //   features. In particular, the proxied functions (marked with 'proxyFunction') won't work, as compression
                        //   strips all literal strings.
                        compress: false
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    });
});

module.exports = prodConfigPromise;
