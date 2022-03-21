/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as rollup from 'rollup';
import { bundleAngularJSTemplates, findJavaScriptFiles, readTemplateFiles } from '../utils';
import { LegacyConfiguration } from '../configuration';

/**
 * This plugin adds legacy javascript and ng templates into the main bundle.
 * Note:
 * - This plugin adds the legacy JS to the main entry point. If more than one entry points are
 * defined this plugin will add it only to the first one.
 *
 * @param options
 */
export const legacy = (options: LegacyConfiguration): rollup.Plugin => {
    const legacyJsEntry = `SE-LEGACY-JAVASCRIPT`;
    let mainEntryPoint = '';
    let isLegacyJSProcessed = false;

    return {
        name: 'legacy',

        // Finds the bundle entry point.
        options(bundleOptions: rollup.InputOptions) {
            if (typeof bundleOptions.input === 'string') {
                mainEntryPoint = bundleOptions.input;
            } else if (Array.isArray(bundleOptions.input)) {
                mainEntryPoint = bundleOptions.input[0];
            }

            return bundleOptions;
        },

        // Adds an import to the bundle entry point to load the legacy JS.
        transform(code: string, id: string) {
            if (!isLegacyJSProcessed && id === mainEntryPoint) {
                isLegacyJSProcessed = true;

                return {
                    code: `import '${legacyJsEntry}' \n` + code,
                    map: null
                };
            }
        },

        // Specifies that the external JS entry point can be handled.
        resolveId(id: string) {
            if (id === legacyJsEntry) {
                return id;
            }
        },

        // Loads legacy javascript and html templates.
        // Notes:
        // - The output will contain an angular module loading the HTML templates + imports for the JS files.
        // - This also adds watches to the legacy files. In watch mode this is used to re-trigger the build
        // if any of these files is updated.
        load(id: string) {
            if (id === legacyJsEntry) {
                return Promise.all([
                    findJavaScriptFiles(options.js),
                    readTemplateFiles(
                        options.ngTemplates.files,
                        options.ngTemplates.includePathInName
                    )
                ]).then(([jsFiles, htmlTemplates]) => {
                    const javaScriptImports: string = jsFiles
                        .map((jsFilePath: string) => {
                            this.addWatchFile(jsFilePath);
                            return `import "${jsFilePath}";`;
                        })
                        .join('\n');

                    htmlTemplates.forEach((template) => {
                        this.addWatchFile(template.filePath);
                    });

                    const moduleName = options.ngTemplates.moduleName;
                    return bundleAngularJSTemplates(moduleName, htmlTemplates) + javaScriptImports;
                });
            }
        }
    };
};
