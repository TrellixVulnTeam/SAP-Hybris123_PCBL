/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const group = require('../../compose');
const rule = require('../rule');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.tsLoaderOnly
 * @description
 * A builder for configuring awesome-typescript-loader support for a webpack config.
 *
 * @param {string} tsconfig The typescript configuration.
 *
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = (tsconfig) =>
    group(
        rule({
            test: /\.ts$/,
            sideEffects: true,
            use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: tsconfig
                    }
                }
            ]
        }),
        rule({
            test: /\.(html)$/,
            use: [
                {
                    loader: 'raw-loader'
                }
            ]
        })
    );
