/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const fs = require('fs');
const path = require('path');

const pageObjectsFolder = '/pageObjects';
const componentObjectsFolder = '/componentObjects';
const pageObjectsFileSuffix = 'PageObject.js';
const componentObjectsFileSuffix = 'ComponentObject.js';

const sharedObjectsPath = path.resolve(__dirname, '../../shared');

const loadFromDirectory = (baseDirectory, filesSuffix) => {
    if (!baseDirectory) {
        return;
    }

    try {
        const resolvedDir = path.resolve(__dirname, baseDirectory);
        if (!fs.existsSync(resolvedDir)) {
            return {};
        }

        return fs.readdirSync(resolvedDir).reduce((acc, fileName) => {
            if (!fileName.endsWith(filesSuffix)) {
                console.warn(`Invalid filename: ${resolvedDir}/${fileName}`);
                return acc;
            }

            const key = fileName.substring(0, fileName.length - filesSuffix.length);
            const filePath = path.join(resolvedDir, fileName);
            acc[key] = require(filePath);
            return acc;
        }, {});
    } catch (e) {
        console.error(e);
        throw new Error(
            `WARNING: objectLoader unable to load test objects from: ${baseDirectory}`,
            e
        );
    }
};

const loadTestObjects = (testsConfig, e2e) => {
    const compObjectsPath = path.join(testsConfig.testObjectsPath, componentObjectsFolder);
    const pageObjectsPath = path.join(testsConfig.testObjectsPath, pageObjectsFolder);
    const sharedCompObjectsPath = path.join(sharedObjectsPath, pageObjectsFolder);
    const sharedPageObjectsPath = path.join(sharedObjectsPath, componentObjectsFolder);

    e2e.componentObjects = loadFromDirectory(compObjectsPath, componentObjectsFileSuffix);
    e2e.pageObjects = loadFromDirectory(pageObjectsPath, pageObjectsFileSuffix);
    e2e.se = {
        componentObjects: loadFromDirectory(sharedPageObjectsPath, componentObjectsFileSuffix),
        pageObjects: loadFromDirectory(sharedCompObjectsPath, pageObjectsFileSuffix)
    };
};

module.exports = {
    loadTestObjects
};
