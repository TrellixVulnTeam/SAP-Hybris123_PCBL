"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProtractor = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const fg = require('fast-glob');
const path = require('path');
const childProcess = require('child_process');
const configFilePath = require.resolve('../../../lib/protractor/protractor-conf');
const chromeDriverPattern = './node_modules/**/chromedriver*';
const chromeArgs = [
    'lang=en-US',
    'window-size=2500,1000',
    'no-sandbox',
    'disable-gpu',
    'disable-dev-shm-usage',
];
const getAllSpecsInPath = async (testProjectPath) => {
    return await fg('./generated/e2e/**/*Test.js', {
        cwd: testProjectPath,
    });
};
const getSpecsString = (tests) => {
    return tests.reduce((acc, file) => {
        const filePath = path.resolve(file);
        if (acc !== '') {
            acc += ',';
        }
        return acc + filePath;
    });
};
const buildParams = async (config) => {
    const params = [
        configFilePath,
        `--params.tests.storefrontPath=${config.storefrontPath}`,
        `--params.tests.htmlPath=${config.htmlPath}`,
        `--params.tests.reportOutputPath=${config.reportOutputPath}`,
    ];
    if (config.testObjectsPath) {
        params.push(`--params.tests.testObjectsPath=${config.testObjectsPath}`);
    }
    // Note:
    // If we put these options in protractor-config and then pass the headless option through CLI, then the array
    // would be overwritten and just the headless option will remain. That's why these options are added manually.
    chromeArgs.forEach((arg) => {
        params.push(`--capabilities.chromeOptions.args=${arg}`);
    });
    if (config.headless) {
        params.push('--capabilities.chromeOptions.args=headless');
    }
    if (config.shardTestFiles) {
        params.push('--capabilities.shardTestFiles=true');
    }
    if (config.maxInstances) {
        params.push(`--capabilities.maxInstances=${config.maxInstances}`);
    }
    let specs = await getAllSpecsInPath(config.basePath);
    console.log('Specs total:', specs.length);
    const shards = config.shards || 0;
    const shard = config.shard || 0;
    if (shards > 0 && shard >= 0) {
        console.log(`protractor-runner - Sharding... total of shards: ${shards} - current shard #: ${shard}`);
        specs = splitSpecs(specs, shards, shard);
    }
    params.push(`--specs=${getSpecsString(specs)}`);
    return params;
};
const splitSpecs = (allSpecs, shards, shard) => {
    let shardSize = Math.floor(allSpecs.length / shards);
    let from = shardSize * shard;
    let to = shardSize * (shard + 1);
    console.log(`Slicing specs from ${from} to ${to} (shard size: ${shardSize})`);
    const specs = allSpecs.slice(from, to);
    if (specs.length === 0 && shard >= shards) {
        console.log(`-> There are no e2e tests remainder left, executing previous shard`);
        return splitSpecs(allSpecs, shards, shard - 1);
    }
    return specs;
};
const isWebDriverInstalled = async () => {
    const chromeDriverInstances = await fg(chromeDriverPattern);
    return chromeDriverInstances.length;
};
const updateWebDriver = async () => {
    try {
        console.log('Chrome Driver not found - Updating');
        await childProcess.fork('./node_modules/protractor/bin/webdriver-manager', ['update']);
        console.log('Finished Chrome Driver update successfully.');
    }
    catch (err) {
        throw new Error('Error updating webdriver manager ' + err);
    }
};
exports.runProtractor = async (config) => {
    const isDriverInstalled = await isWebDriverInstalled();
    if (isDriverInstalled) {
        console.log('Chrome Driver already present - no need to update.');
    }
    else {
        await updateWebDriver();
    }
    const params = await buildParams(config);
    try {
        await childProcess.fork('./node_modules/protractor/bin/protractor', params);
    }
    catch (err) {
        console.error('Error running protractor. ', err);
    }
};
