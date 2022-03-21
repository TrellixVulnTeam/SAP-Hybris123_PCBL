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

describe('SmartEdit Instrumentation', () => {
    const TEST_BASE_PATH = 'instrument-se/fixtures/';
    const SRC_FOLDER = './src';
    const DEFAULT_ENTRY_POINT = 'index.ts';
    const DEFAULT_EXPECTED_FILE = 'expected/index.js';

    const smartEditDecoratorsRequiringAugmentation = ['Injectable', 'Component'];

    const smartEditDecoratorsRequringNgInject = [
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

    const assertDecoratorsAutoAugmented = (output: string, expectedValue: boolean) => {
        smartEditDecoratorsRequiringAugmentation.forEach((decorator: string) => {
            const expectedContent = `window.__smartedit__.addDecoratorPayload("${decorator}", "${decorator}Test", {`;
            expect(output.includes(expectedContent)).toBe(expectedValue);
        });
    };

    const assertDecoratorsAutoAnnotated = (output: string, expectedValue: boolean) => {
        smartEditDecoratorsRequringNgInject.forEach((decorator: string) => {
            const expectedContent = `/* @ngInject */ ${decorator}Test`;
            expect(output.includes(expectedContent)).toBe(expectedValue);
        });
    };

    it('GIVEN instrumentation is disabled WHEN compiled THEN ngInject and metadata are not added', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, '/instrumentation-disabled');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);
        configuration.instrumentation = {
            skipInstrumentation: true
        };

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const output = bundle.output[0].code;
        const expectedOutput = await readTestFile(fixturesPath, DEFAULT_EXPECTED_FILE);
        assertDecoratorsAutoAnnotated(output, false);
        assertDecoratorsAutoAugmented(output, false);
        assertResultIsEqualToExpectedOutput(output, expectedOutput);
    });

    it('GIVEN decorators that require ngInject WHEN compiled THEN ngInject is added', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, 'decorators-ng-inject');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const output = bundle.output[0].code;
        const expectedOutput = await readTestFile(fixturesPath, DEFAULT_EXPECTED_FILE);

        assertDecoratorsAutoAnnotated(output, true);
        assertResultIsEqualToExpectedOutput(output, expectedOutput);
    });

    it('GIVEN decorators that require augmentation WHEN compiled THEN metadata is added for downgrading', async () => {
        // GIVEN
        const fixturesPath = path.join(TEST_BASE_PATH, 'decorators-augmentation');
        const configuration = getConfiguration(fixturesPath, DEFAULT_ENTRY_POINT);

        // WHEN
        const bundle: any = await runBundler(configuration);

        // THEN
        const output = bundle.output[0].code;
        const expectedOutput = await readTestFile(fixturesPath, DEFAULT_EXPECTED_FILE);

        assertDecoratorsAutoAugmented(output, true);
        assertResultIsEqualToExpectedOutput(output, expectedOutput);
    });
});
