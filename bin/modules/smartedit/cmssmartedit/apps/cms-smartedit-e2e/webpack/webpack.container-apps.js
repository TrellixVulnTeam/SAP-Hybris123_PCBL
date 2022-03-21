/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const webpack = require('webpack');

const { resolveFiles } = require('../scripts/resolve-test-files-script');

const configPromise = new Promise((resolve, reject) => {
    resolveFiles('containerApps')
        .then((filesMap) => {
            return resolve({
                mode: 'development',
                entry: filesMap,
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
                        }
                    ]
                },
                plugins: [
                    new webpack.DllReferencePlugin({
                        name: 'containerApp',
                        manifest: require('../generated/e2e/base/cms-container/base-container-app.json')
                    })
                ],
                externals: {
                    angular: 'angular'
                },
                output: {
                    filename: '[name].js',
                    path: path.resolve('.')
                }
            });
        })
        .catch((err) => {
            reject('Cannot retrieve webpack configuration. ', err);
        });
});

module.exports = configPromise;
