/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
'use strict';

const { connectToServer } = require('@smartedit/test-server');
const path = require('path');

/**
 * Connect-Server
 *
 * This script is used to start and connect test servers.
 * In practice, it is used to start two servers used in e2e tests: the test server and the dummy storefront.
 * - Test server:
 *   It is the server that will serve SmartEdit files. It is akin to the Tomcat server that serves the smartedit
 *   extensions in the commerce suite.
 * - Dummy storefront
 *   Server that will serve a sample storefront to be used in e2e tests.
 *
 * Parameters:
 * - target:
 *   Specifies which server to start. Can be either 'dummystorefront' or 'testapp'
 */

const args = process.argv.slice(2);

const getArgument = (argumentToFind) => {
    const argument = args.find((arg) => {
        return arg.includes(argumentToFind);
    });

    if (argument) {
        const value = argument.split('=')[1];
        return value ? value.trim() : value;
    }

    return null;
};

const target = getArgument('target');
if (!target || (target !== 'dummystorefront' && target !== 'testapp')) {
    throw new Error(
        "Cannot connect to server. Missing target - must be either 'dummystorefront' or 'testapp'"
    );
}

let options = {};

if (target === 'dummystorefront') {
    const storefrontPath = path.resolve('.');
    options = {
        base: storefrontPath,
        port: 9000,
        keepalive: false,
        debug: false,
        open: false
    };
} else {
    const testServerPath = path.resolve('../../');
    options = {
        base: testServerPath,
        port: 7000,
        keepalive: false,
        debug: false,
        open: true,
        middleware: (connect, options, middlewares) => {
            middlewares.unshift(function(req, res, next) {
                if (/(eot|ttf|otf|woff|woff2)/.test(req.url)) {
                    req.url = req.url.replace('/smartedit', '/web/webroot');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                }
                return next();
            });
            return middlewares;
        }
    };
}

connectToServer(options);
