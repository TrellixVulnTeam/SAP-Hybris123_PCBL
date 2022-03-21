/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const HappyPack = require('happypack');

const plugin = require('../plugin');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.happyPackPlugin
 * @description
 * Adds a {@link https://github.com/amireh/happypack happy-pack} plugin to a webpack configuration for parallel
 * processing.
 *
 * @param  {string} id Id of the rule.
 * @param {number} threads The number of threads it will use to process the loaders.
 * @param {object} loaders The loaders for parallelize.
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = (id, threads, loaders) =>
    plugin(
        new HappyPack({
            id,
            threads,
            loaders
        })
    );
