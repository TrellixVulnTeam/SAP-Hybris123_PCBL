/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint esversion: 6 */
module.exports = (function() {
    const lodash = require('lodash');

    const baseConfig = {
        compilerOptions: {
            target: 'es5',
            module: 'es2015',
            moduleResolution: 'node',
            lib: ['dom', 'es5', 'scripthost', 'es2015', 'es2015.iterable'],
            allowJs: false,
            checkJs: false,
            noImplicitAny: true,
            noImplicitReturns: true,
            noUnusedLocals: true,
            noUnusedParameters: false,
            strictNullChecks: false,
            forceConsistentCasingInFileNames: true,
            noEmitOnError: true,
            baseUrl: '../../jsTarget/',
            typeRoots: ['../../node_modules/@types'],
            traceResolution: false,
            listEmittedFiles: false,
            skipLibCheck: true,
            pretty: true,
            declaration: false,
            experimentalDecorators: true,
            emitDecoratorMetadata: false,
            paths: {},
            importHelpers: true,
            sourceMap: true
        }
    };

    // ====== Prod =====
    const prodSmartedit = lodash.cloneDeep(baseConfig);
    prodSmartedit.compilerOptions.sourceMap = false;
    const prodSmarteditContainer = lodash.cloneDeep(prodSmartedit);

    // ====== Dev =====
    const devSmartedit = lodash.cloneDeep(baseConfig);
    const devSmarteditContainer = lodash.cloneDeep(baseConfig);

    // ====== Karma =====
    const karmaSmartedit = lodash.cloneDeep(baseConfig);
    const karmaSmarteditcommons = lodash.cloneDeep(baseConfig);
    const karmaSmarteditContainer = lodash.cloneDeep(baseConfig);

    // ====== IDE =====
    const ide = lodash.cloneDeep(baseConfig);

    return {
        baseConfig, // include base for partners/customers
        prodSmartedit,
        prodSmarteditContainer,
        devSmartedit,
        devSmarteditContainer,
        karmaSmartedit,
        karmaSmarteditcommons,
        karmaSmarteditContainer,
        ide
    };
})();
