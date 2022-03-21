/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as rollup from 'rollup';
import { SeAppConfiguration } from './configuration';
import { resolvePath, resolvePathOrThrow, createStyleProcessor } from './utils';
import { external, legacy, ngAnnotate, styles, angular, typescript } from './plugins';

const progress = require('rollup-plugin-progress');

export const getConfiguredPlugins = async (
    appConfig: SeAppConfiguration
): Promise<rollup.Plugin[]> => {
    const stylesProcessor = await createStyleProcessor(appConfig.style?.global);

    return [
        // Compiles css / sass / global styles
        styles(stylesProcessor, appConfig.style),

        // Resolves inner HTML and styling templates
        angular(stylesProcessor),

        // Compiles TS files into JS  files
        await typescript(
            appConfig.typescript.config,
            !appConfig.instrumentation?.skipInstrumentation
        ),

        // Adds support for legacy Files (javascript and HTML templates for AngularJS)
        appConfig.legacy && legacy(appConfig.legacy),

        // Leaves external dependencies out of the main bundle.
        external(appConfig.dependencies),

        // Adds AngularJS dependency injection annotations
        ngAnnotate(),

        // Shows progress of the create bundle operation
        progress()
    ];
};

export const generateBundle = async (
    appConfig: SeAppConfiguration,
    plugins: rollup.Plugin[],
    writeBundle: boolean = true
) => {
    const input = await resolvePathOrThrow(
        appConfig.typescript.entry,
        'Could not find entry file.'
    );
    const bundle = await rollup.rollup({
        input,
        plugins
    });

    const outputOptions: rollup.OutputOptions = {
        file: resolvePath(appConfig.typescript.dist),
        format: 'cjs',
        sourcemap: false // TODO: switch to true when fixing TypeScript source maps.
    };

    if (writeBundle) {
        return bundle.write(outputOptions);
    } else {
        return bundle.generate(outputOptions);
    }
};
