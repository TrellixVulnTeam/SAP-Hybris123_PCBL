/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const webpack = require('webpack');

const extensionsLoader = require('../smartedit-extensions-loader');
const currentYear = new Date().getFullYear();

const configPromise = new Promise((resolve, reject) => {
    extensionsLoader
        .loadExtensions('inner')
        .then(() => {
            return resolve({
                entry: './src/inner/master_index.ts', // This file is auto-generated.
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
                        'window.$': 'jquery',
                        lodash: 'lodash'
                    }),
                    new webpack.BannerPlugin(
                        `Copyright (c) ${currentYear} SAP SE or an SAP affiliate company. All rights reserved.`
                    )
                ],
                output: {
                    filename: 'smartedit.js',
                    path: path.resolve(__dirname, '../../dist/smartedit'),
                    jsonpFunction: 'smarteditWebpackJsonp'
                },
                optimization: {
                    splitChunks: {
                        cacheGroups: {
                            vendors: {
                                test(module) {
                                    return (
                                        module.resource && module.resource.includes('node_modules')
                                    );
                                },
                                filename: 'vendors.js',
                                chunks: 'all',
                                minSize: 0
                            }
                        }
                    }
                }
            });
        })
        .catch((err) => {
            reject('Cannot retrieve webpack configuration. ', err);
        });
});

module.exports = configPromise;
