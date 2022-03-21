/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const { runProtractor } = require('@smartedit/e2e-utils');
const path = require('path');

/**
 * Run Protractor
 *
 * This script is used to configure and run the e2e tests in the current project in Protractor.
 *
 * Parameters:
 * - headless
 *   Optional parameter. If specified, tests will run in headless mode. This means, tests will be executed in the background with no
 *   Chrome window being opened.
 * - multi
 *   Optional parameter. If specified, tests will be split in multiple sharts and executed parallely.
 * - shards
 *   Optional parameter. The total number of shards. This option determines the maximum number of e2e tests on this current execution.
 * - shard
 *   Optional parameter. The e2e test section that will be executed.
 */

const args = process.argv.slice(2);

const hasArgument = (expectedArg) => {
    return args.some((arg) => {
        return arg == expectedArg;
    });
};
const getArgByName = (argName) => {
    const arg = args.find((arg) => arg.indexOf(`--${argName}=`) === 0);
    return arg && arg.substr(arg.indexOf('=') + 1);
};

const testsConfig = {
    basePath: path.resolve('.'),
    storefrontPath:
        'smartedit-e2e/node_modules/@smartedit/storefront-generator/dummystorefront/fakeAngularEmptyPage.html',
    htmlPath: 'generated/pages/smartedit.html',
    testObjectsPath: path.resolve('./tests/utils'),
    reportOutputPath: path.resolve('./generated/junit')
};

if (hasArgument('--headless')) {
    testsConfig.headless = true;
}

if (hasArgument('--multi')) {
    testsConfig.shardTestFiles = true;
}

const shards = Number(getArgByName('shards'));
const shard = Number(getArgByName('shard'));
if (shards > 0 && shard >= 0) {
    console.log(
        `smartedit-e2e - Sharding... total of shards: ${shards} - current shard #: ${shard}`
    );
    testsConfig.shards = shards;
    testsConfig.shard = shard;
}

(async () => {
    try {
        await runProtractor(testsConfig);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
