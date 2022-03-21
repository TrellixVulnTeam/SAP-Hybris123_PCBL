"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAnnotate = void 0;
const baseNgAnnotate = require('ng-annotate');
/**
 * Adds AngularJS dependency injection annotations to the main bundle.
 *
 * Note: Currently, this uses ng-annotate. This package is being deprecated. At some point it might be necessary to
 * change to babel-plugin-angularjs-annotate.
 */
exports.ngAnnotate = () => {
    return {
        name: 'ngAnnotate',
        generateBundle(options, bundle) {
            Object.keys(bundle).forEach((fileName) => {
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
