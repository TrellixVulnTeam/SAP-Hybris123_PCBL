/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
'use strict';

const { seInjectableInstrumenter } = require('@smartedit/e2e-utils');
const fs = require('fs-extra');
const fg = require('fast-glob');

/**
 * Instrument-Se
 *
 * This script is used to instrument (decorate) test files with SmartEdit specific data that will be needed
 * to compile and execute them.
 *
 * Note:
 * - Non-test files are already instrumented. That process is managed by the smartedit-packagr.
 */

/**
 * Copies the files into the generated folder so that they can be modified and prepared
 * for protractor without affecting the original files.
 */
const createTempTestFiles = async () => {
    await fs.copy('tests/', 'generated/');
};

const instrumentTestFiles = async () => {
    console.log('Creating temporary test files');
    await createTempTestFiles();

    console.log('Instrumenting Test files');
    const filesToMatchPattern = './generated/**/*.ts';
    const matchedFiles = await fg(filesToMatchPattern);

    seInjectableInstrumenter(matchedFiles);
};

(async () => {
    try {
        instrumentTestFiles();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
