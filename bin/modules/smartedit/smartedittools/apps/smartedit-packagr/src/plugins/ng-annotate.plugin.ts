/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as rollup from 'rollup';

const baseNgAnnotate = require('ng-annotate');

/**
 * Adds AngularJS dependency injection annotations to the main bundle.
 *
 * Note: Currently, this uses ng-annotate. This package is being deprecated. At some point it might be necessary to
 * change to babel-plugin-angularjs-annotate.
 */
export const ngAnnotate = (): rollup.Plugin => {
    return {
        name: 'ngAnnotate',
        generateBundle(options: rollup.OutputOptions, bundle: rollup.OutputBundle) {
            Object.keys(bundle).forEach((fileName: string) => {
                const file = bundle[fileName];

                // Note: Assumes that only chunk file types include JS code.
                if (file.type === 'chunk') {
                    file.code = baseNgAnnotate(file.code, {
                        // Add ng annotations where non-existing
                        add: true
                    }).src;
                }
            });
        }
    };
};
