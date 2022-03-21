/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

/**
 * Generate Test List
 *
 * This script is used to find all e2e tests in the current project, gathers information about them, and writes it
 * in a file called tests-list.json. This file is later used by the list.html page to display an entry point to each of the
 * tests in the system. This can be helpful while debugging tests.
 */

const basePath = './generated/e2e';
const destinationFile = './generated/pages/tests-list.json';

const compileTestInformation = async (configFile) => {
    const parentDir = path.dirname(configFile);
    const filesInDir = await fs.promises.readdir(path.resolve(basePath, parentDir));
    const testFile = filesInDir.find((file) => {
        return file.endsWith('Test.js') || file.endsWith('Test.ts');
    });

    if (testFile) {
        const fileContent = await fs.promises.readFile(path.resolve(basePath, configFile));
        const testName = testFile.replace(/(.js|.ts)/g, '');
        try {
            return {
                key: path.join(parentDir, testName),
                data: JSON.parse(fileContent)
            };
        } catch (e) {
            throw `Invalid config.json for ${testFile}`;
        }
    } else {
        throw `Error: no *Test.js file in ${parentDir}`;
    }
};

const getE2EConfigs = async () => {
    const testsPath = path.resolve(basePath);
    const configFiles = await fg('**/config.json', {
        cwd: testsPath
    });

    return Promise.all(configFiles.map(compileTestInformation));
};

const writeJsonFile = async (items) => {
    const data = JSON.stringify({
        items
    });

    return fs.promises.writeFile(destinationFile, data);
};

(async () => {
    try {
        const items = await getE2EConfigs();
        await writeJsonFile(items);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
