/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
    mode: 'development',
    entry: ['./generated/e2e/base/cms-smartedit/base-inner-app.ts'],
    devtool: 'none',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // This assumes that in the container there's no conflict between libraries.
            // This same approach cannot be used in the inner frame.
            $: 'jquery',
            jquery: 'jquery',
            'window.$': 'jquery',
            lodash: 'lodash'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false // Enable to remove warnings about conflicting order
        }),
        new webpack.DllPlugin({
            name: 'base-inner-app',
            path: './generated/e2e/base/cms-smartedit/base-inner-app.json'
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                'vendor.js': [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular/angular.js'
                    // 'node_modules/angular-animate/angular-animate.js',
                    // 'node_modules/angular-route/angular-route.js',
                    // 'node_modules/angular-cookies/angular-cookies.js',
                    // 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    // 'node_modules/angular-translate/dist/angular-translate.js',
                    // 'node_modules/angular-sanitize/angular-sanitize.js',
                    // 'node_modules/ui-select/dist/select.js',
                ]
            }
        })
    ],
    externals: {
        angular: 'angular'
    },
    stats: {
        assets: false,
        colors: true,
        modules: false,
        reasons: true,
        errorDetails: true
    },
    output: {
        path: path.resolve('./generated/e2e/base/cms-smartedit'),
        filename: 'base-inner-app.js',
        // sourceMapFilename: '[file].map',
        library: 'innerApp'
    }
};
