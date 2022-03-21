/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(grunt) {
    return {
        targets: ['test', 'dummystorefront', 'docs', 'coverage'],
        config: function(data, conf) {
            return {
                test: {
                    options: {
                        hostname: '0.0.0.0',
                        port: 7000,
                        open: grunt.option('open_browser') || false,
                        middleware: function(connect, options, middlewares) {
                            middlewares.unshift(function(req, res, next) {
                                if (/(eot|ttf|otf|woff|woff2)/.test(req.url)) {
                                    req.url = req.url.replace('/smartedit', '/web/webroot');
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                }
                                return next();
                            });
                            return middlewares;
                        }
                    }
                },
                dummystorefront: {
                    options: {
                        hostname: '0.0.0.0',
                        port: 9000, //different domain to run storefront in CROSS origin
                        keepalive: grunt.option('keepalive_dummystorefront') || false // Keep the server alive indefinitely. Note that if this option is enabled, any tasks specified after this task will never run.
                    }
                },
                docs: {
                    options: {
                        hostname: '0.0.0.0',
                        port: 9090,
                        keepalive: true,
                        open: true,
                        base: './jsTarget/docs'
                    }
                },
                coverage: {
                    options: {
                        hostname: '0.0.0.0',
                        port: 9080,
                        keepalive: true,
                        open: true,
                        base: './jsTarget/test/coverage'
                    }
                }
            };
        }
    };
};
