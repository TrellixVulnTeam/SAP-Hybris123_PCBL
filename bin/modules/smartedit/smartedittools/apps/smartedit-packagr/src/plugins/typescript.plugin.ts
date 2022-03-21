/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CompilerOptions } from 'typescript';
import { resolvePathOrThrow, smartEditTransformerFactory } from '../utils';
const typescriptPlugin = require('rollup-plugin-typescript2');

/**
 * The TypeScript plugin specifies some default TypeScript configuration that any SmartEdit library must have and then delegates
 * to the rollup-plugin-typescript2 to perform the TypeScript compilation.
 * As part of the configuration process, this plugin also specifies a TypeScript transformer that will add instrumentation code
 * during the compilation process.
 *
 * @param tsconfigPath The path (relative to the library root) pointing to the TypeScript configuration file.
 * @param {boolean} [instrumentation] Boolean flag specifying whether to instrument SmartEdit code or not. Defaults to true.
 */
export const typescript = async (tsconfigPath: string, instrumentation = true) => {
    const tsconfig = await resolvePathOrThrow(tsconfigPath, 'Could not find tsconfig file.');
    return typescriptPlugin({
        tsconfig,
        tsconfigOverride: {
            target: 'es5',
            module: 'es6',
            lib: ['dom', 'esnext']
        },
        abortOnError: false,
        ...(instrumentation ? { transformers: [smartEditTransformerFactory()] } : {})
    });
};
