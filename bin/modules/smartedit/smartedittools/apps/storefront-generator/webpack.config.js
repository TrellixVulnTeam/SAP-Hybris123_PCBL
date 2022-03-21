/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// /*
//  * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
//  */
const path = require('path');
const webpack = require('webpack');

const getContextRoot = (srcPath) => {
    const projectRoot = path.resolve(__dirname);
    return path.join(projectRoot, srcPath);
};

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // Hide import warnings
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true }
            },
            {
                test: /\.(html)$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        // Workaround for Critical dependency
        // The request of a dependency is an expression in ./node_modules/@angular/core/fesm5/core.js
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            getContextRoot('./src'),
            {}
        )
    ],
    optimization: {
        // If optimization.runtimeChunk is set to true, multiple runtime chunks are created if there is more than one entrypoint. To avoid this, optimization.runtimeChunk has to be set to 'single' instead.
        runtimeChunk: 'single', //using "single" only when using multiple entrypoints in one HTML page. https://github.com/webpack/webpack/issues/2134
        splitChunks: {
            cacheGroups: {
                storefrontvendor: {
                    name: 'storefrontvendor',
                    test: /\/node_modules\/(@angular|core-js|rxjs|zone.js)\//,
                    chunks: 'all',
                    priority: 0,
                    enforce: true
                }
            }
        }
    }
};
