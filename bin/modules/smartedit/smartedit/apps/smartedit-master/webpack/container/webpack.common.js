/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extensionsLoader = require('../smartedit-extensions-loader');
const currentYear = new Date().getFullYear();

const configPromise = new Promise((resolve, reject) => {
    extensionsLoader
        .loadExtensions('container')
        .then((extensionsInfo) => {
            return resolve({
                entry: './src/container/master_index.ts', // This file is auto-generated.
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
                                    loader: MiniCssExtractPlugin.loader
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
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        // Creates global variables that will be used later to control SmartEdit bootstrapping
                        'window.__smartedit__.smartEditContainerAngularApps': JSON.stringify(
                            extensionsInfo.containerAngularAppsToLoad
                        ),
                        'window.__smartedit__.smartEditInnerAngularApps': JSON.stringify(
                            extensionsInfo.innerAngularAppsToLoad
                        ),
                        E2E_ENVIRONMENT: false
                    }),
                    new webpack.ProvidePlugin({
                        // This assumes that in the container there's no conflict between libraries.
                        // This same approach cannot be used in the inner frame.
                        $: 'jquery',
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
                    new webpack.BannerPlugin(
                        `Copyright (c) ${currentYear} SAP SE or an SAP affiliate company. All rights reserved.`
                    )
                ],
                output: {
                    filename: 'smarteditcontainer.js',
                    path: path.resolve(__dirname, '../../dist/smartedit-container')
                },
                optimization: {
                    splitChunks: {
                        chunks: 'all',
                        minSize: 0,
                        cacheGroups: {
                            vendors: {
                                test(module) {
                                    return (
                                        module.resource && module.resource.includes('node_modules')
                                    );
                                },
                                filename: 'vendors.js'
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
