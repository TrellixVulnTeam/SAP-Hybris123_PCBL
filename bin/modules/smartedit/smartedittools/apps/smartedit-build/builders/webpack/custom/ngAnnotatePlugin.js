/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
const plugin = require('../plugin');

/**
 * @ngdoc service
 * @name ConfigurationBuilder.service:webpack.ngAnnotatePlugin
 * @description
 * Override of ngAnnotate plugin not to run it on excluded chunks.
 * Adds the NgAnnotatePlugin to a webpack configuration.
 *
 * @returns {function(config)} A builder for a webpack configuration object.
 */
module.exports = () =>
    plugin({
        apply: (compiler) => {
            // ngannotate options - see https://github.com/olov/ng-annotate/blob/master/ng-annotate.js
            this.options = {
                add: true,
                sourceMap: true,
                excludeChunks: ['vendor_chunk']
            };
            this.excludeChunk = (chunkId) => {
                if (Array.isArray(this.options.excludeChunks)) {
                    return this.options.excludeChunks.includes(chunkId);
                }
                return false;
            };
            compiler.hooks.compilation.tap('SeAnnotatePlugin', (compilation) => {
                const SourceMapSource = require('webpack-core/lib/SourceMapSource');
                // https://webpack.js.org/api/compilation-hooks/#optimizechunkassets
                compilation.hooks.optimizeChunkAssets.tapPromise('SeAnnotatePlugin', (chunks) => {
                    chunks
                        .reduce((acc, chunk) => {
                            if (this.excludeChunk(chunk.id)) {
                                console.debug(
                                    `\rSeAnnotatePlugin - Skipping excluded chunk: ${chunk.id}`
                                );
                                return acc;
                            }
                            console.debug(`\rSeAnnotatePlugin - Annotating chunk: ${chunk.id}`);
                            return acc.concat(chunk.files);
                        }, [])
                        // https://webpack.js.org/api/compilation-hooks/#additionalchunkassets
                        .concat(compilation.additionalChunkAssets)
                        .forEach((file) => {
                            if (this.options.sourceMap) {
                                this.options.map = {
                                    inFile: file,
                                    sourceRoot: ''
                                };
                            }
                            const value = require('ng-annotate')(
                                compilation.assets[file].source(),
                                this.options
                            );
                            const asset = compilation.assets[file];
                            let map = null;
                            let input = null;
                            if (this.options.sourceMap && asset.sourceAndMap) {
                                const sourceAndMap = asset.sourceAndMap();
                                map = sourceAndMap.map;
                                input = sourceAndMap.source;
                            } else {
                                map = asset.map();
                            }
                            if (!value.errors) {
                                if (this.options.sourceMap && asset.sourceAndMap) {
                                    compilation.assets[file] = new SourceMapSource(
                                        value.src,
                                        file,
                                        JSON.parse(value.map),
                                        input,
                                        map
                                    );
                                } else {
                                    compilation.assets[file] = new SourceMapSource(
                                        value.src,
                                        file,
                                        map
                                    );
                                }
                            }
                        });

                    return Promise.resolve();
                });
            });
        }
    });
