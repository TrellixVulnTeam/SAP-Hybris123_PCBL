/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');
const fg = require('fast-glob');

/**
 * Resolve Test Files
 *
 * This script is executed to identify the test files needed to execute e2e tests.
 *
 */

const filesPatterns = {
    containerApps: ['generated/e2e/**/outer*.ts'],
    innerApps: ['generated/e2e/**/inner*.ts'],
    tests: ['generated/**/*Test.ts']
};

/**
 * This method is used to find and resolve the files needed to execute e2e tests.
 *
 * @param {*} target a string representing the type of files to retrieve. There are three possible values:
 * - containerApps:
 *      Files in TypeScript that contain Angular or AngularJS modules targeting the SmartEdit Container frame.
 *      They might be needed by one or more tests to prepare SmartEdit.
 *      They are identified by starting their name with outer*.ts. For example, outer-app.ts.
 * - innerApps:
 *      Files in TypeScript that contain Angular or AngularJS modules targeting the SmartEdit inner frame.
 *      They might be needed by one or more tests to prepare SmartEdit.
 *      They are identified by starting their name with inner*.ts. For example, inner-app.ts.
 * - tests:
 *      The actual tests written in TypeScript (tests written in JavaScript don't need to be compiled).
 */
const resolveFiles = async (target) => {
    if (!target || (target !== 'containerApps' && target !== 'innerApps' && target !== 'tests')) {
        throw new Error(
            "Must provide the files target. It can be 'containerApps', 'innerApps' or 'tests'"
        );
    }

    const filesMap = {};
    const patterns = filesPatterns[target];
    const filesFound = await fg(patterns);

    filesFound.forEach((file) => {
        const filePath = path.resolve('./', file);
        const entryName = file.replace(/\.ts$/, '');

        filesMap[entryName] = filePath;
    });

    return filesMap;
};

module.exports = {
    resolveFiles
};
