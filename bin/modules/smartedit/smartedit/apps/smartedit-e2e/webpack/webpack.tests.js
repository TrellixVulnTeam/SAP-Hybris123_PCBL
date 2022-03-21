/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const { resolveFiles } = require('../scripts/resolve-test-files-script');

const configPromise = new Promise((resolve, reject) => {
    resolveFiles('tests')
        .then((filesMap) => {
            return resolve({
                mode: 'development',
                entry: filesMap,
                target: 'node',
                node: {
                    __filename: false,
                    __dirname: false
                },
                resolve: {
                    extensions: ['.ts', '.js'],
                    modules: ['node_modules']
                },
                externals: {
                    protractor: 'protractor'
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
                stats: {
                    assets: false,
                    colors: true,
                    modules: false,
                    reasons: true,
                    errorDetails: true
                },
                output: {
                    path: path.resolve('./'),
                    filename: '[name].js',
                    sourceMapFilename: '[file].map'
                }
            });
        })
        .catch((err) => {
            reject('Cannot retrieve webpack configuration. ', err);
        });
});

module.exports = configPromise;
