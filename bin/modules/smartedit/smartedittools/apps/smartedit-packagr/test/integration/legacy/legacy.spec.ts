/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';

import { SeAppConfiguration } from '../../../src/configuration';
import {
    assertResultIsEqualToExpectedOutput,
    getDefaultConfigurationForTest,
    readTestFile,
    runBundler
} from '../utils';

const path = require('path');

describe('Legacy ', () => {
    const TEST_BASE_PATH = 'legacy/fixtures/';
    const SRC_FOLDER = './src';
    const DEFAULT_ENTRY_POINT = 'js/index.js';
    const TEMPLATES_MODULE_NAME = 'myTemplates';

    const getConfiguration = (fixturesPath: string, entryPoint: string) => {
        const configuration: SeAppConfiguration = getDefaultConfigurationForTest(fixturesPath);
        configuration.typescript.entry = path.join(SRC_FOLDER, entryPoint);

        configuration.legacy = {
            js: ['src/js/*.js'],
            ngTemplates: {
                moduleName: TEMPLATES_MODULE_NAME,
                includePathInName: false,
                files: ['src/js/*.html']
            }
        };

        return configuration;
    };

    it('GIVEN javascript files WHEN compiled THEN they are concatenated', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/js-no-templates');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const expectedOutput = await readTestFile(fixturesPath, 'expected/index.js');
        assertResultIsEqualToExpectedOutput(bundle.output[0].code, expectedOutput);
    });

    it('GIVEN angularJS templates WHEN compiled THEN they are concatenated and minified', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/js-and-templates');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const expectedOutput = await readTestFile(fixturesPath, 'expected/index.js');
        assertResultIsEqualToExpectedOutput(bundle.output[0].code, expectedOutput);
    });

    it('GIVEN legacy and angularJS WHEN compiled THEN both are concatenated and minified', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/legacy-and-angular');
        const configuration = getConfiguration(fixturesPath, 'index.ts');

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const actualOutput = bundle.output[0].code;
        const expectedOutput = await readTestFile(fixturesPath, 'expected/index.js');
        assertResultIsEqualToExpectedOutput(actualOutput, expectedOutput);
    });

    it('GIVEN legacy plugin is not enabled WHEN compiled THEN no template bundle is created', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/no-legacy');
        const configuration = getConfiguration(fixturesPath, 'index.ts');
        delete configuration.legacy;

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const expectedOutput = await readTestFile(fixturesPath, 'expected/index.js');
        assertResultIsEqualToExpectedOutput(bundle.output[0].code, expectedOutput);
    });
});
