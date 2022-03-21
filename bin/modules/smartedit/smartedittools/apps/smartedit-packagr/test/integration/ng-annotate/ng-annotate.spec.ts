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

describe('NgAnnotate', () => {
    const TEST_BASE_PATH = 'ng-annotate/fixtures/';
    const SRC_FOLDER = './src';
    const DEFAULT_ENTRY_POINT = 'index.ts';
    const DEFAULT_EXPECTED_FILE = 'expected/index.js';

    const smartEditDecorators = [
        'SeInjectable',
        'SeDirective',
        'SeComponent',
        'SeDecorator',
        'SeDowngradeService',
        'SeDowngradeComponent',
        'SeModule',
        'Injectable'
    ];

    const getConfiguration = (fixturesPath: string, entryPoint: string) => {
        const configuration: SeAppConfiguration = getDefaultConfigurationForTest(fixturesPath);
        configuration.typescript.entry = path.join(SRC_FOLDER, entryPoint);

        return configuration;
    };

    const runGenericTest = async (
        fixtureName: string,
        expectedEntryPoint: string = DEFAULT_ENTRY_POINT,
        expectedFile: string = DEFAULT_EXPECTED_FILE
    ) => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, fixtureName);
        const configuration = getConfiguration(fixturesPath, expectedEntryPoint);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const expectedOutput = await readTestFile(fixturesPath, expectedFile);
        assertResultIsEqualToExpectedOutput(bundle.output[0].code, expectedOutput);
    };

    const assertDecoratorsAutoAnnotated = (output: string) => {
        smartEditDecorators.forEach((decorator: string) => {
            const expectedContent = `${decorator}Test.$inject = ["$log"];`;
            expect(output.includes(expectedContent)).toBe(true);
        });
    };

    it('GIVEN function is not marked with ngInject WHEN compiled THEN it is not annotated', async () => {
        await runGenericTest('/not-marked');
    });

    it('GIVEN function is marked with ngInject WHEN compiled THEN it is annotated', async () => {
        await runGenericTest('/marked-with-string');
    });

    it('GIVEN function is marked with @ngInject WHEN compiled THEN it is annotated', async () => {
        await runGenericTest('/marked-with-comment');
    });

    it('GIVEN angularJS method in JS is marked with ngInject WHEN compiled THEN it is annotated', async () => {
        await runGenericTest('/ng-js-marked', 'index.js');
    });

    it('GIVEN angularJS method in TS is marked ngInject WHEN compiled THEN it is annotated', async () => {
        await runGenericTest('/ng-ts-marked');
    });

    it('GIVEN code uses SmartEdit decorators WHEN compiled THEN they are automatically annotated', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/auto-marked');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const output = bundle.output[0].code;
        const expectedOutput = await readTestFile(fixturesPath, DEFAULT_EXPECTED_FILE);

        assertDecoratorsAutoAnnotated(output);
        assertResultIsEqualToExpectedOutput(output, expectedOutput);
    });
});
