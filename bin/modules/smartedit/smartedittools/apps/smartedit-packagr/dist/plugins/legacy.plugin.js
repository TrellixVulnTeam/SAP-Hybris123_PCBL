"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacy = void 0;
const utils_1 = require("../utils");
/**
 * This plugin adds legacy javascript and ng templates into the main bundle.
 * Note:
 * - This plugin adds the legacy JS to the main entry point. If more than one entry points are
 * defined this plugin will add it only to the first one.
 *
 * @param options
 */
exports.legacy = (options) => {
    const legacyJsEntry = `SE-LEGACY-JAVASCRIPT`;
    let mainEntryPoint = '';
    let isLegacyJSProcessed = false;
    return {
        name: 'legacy',
        // Finds the bundle entry point.
        options(bundleOptions) {
            if (typeof bundleOptions.input === 'string') {
                mainEntryPoint = bundleOptions.input;
            }
            else if (Array.isArray(bundleOptions.input)) {
                mainEntryPoint = bundleOptions.input[0];
            }
            return bundleOptions;
        },
        // Adds an import to the bundle entry point to load the legacy JS.
        transform(code, id) {
            if (!isLegacyJSProcessed && id === mainEntryPoint) {
                isLegacyJSProcessed = true;
                return {
                    code: `import '${legacyJsEntry}' \n` + code,
                    map: null
                };
            }
        },
        // Specifies that the external JS entry point can be handled.
        resolveId(id) {
            if (id === legacyJsEntry) {
                return id;
            }
        },
        // Loads legacy javascript and html templates.
        // Notes:
        // - The output will contain an angular module loading the HTML templates + imports for the JS files.
        // - This also adds watches to the legacy files. In watch mode this is used to re-trigger the build
        // if any of these files is updated.
        load(id) {
            if (id === legacyJsEntry) {
                return Promise.all([
                    utils_1.findJavaScriptFiles(options.js),
                    utils_1.readTemplateFiles(options.ngTemplates.files, options.ngTemplates.includePathInName)
                ]).then(([jsFiles, htmlTemplates]) => {
                    const javaScriptImports = jsFiles
                        .map((jsFilePath) => {
                        this.addWatchFile(jsFilePath);
                        return `import "${jsFilePath}";`;
                    })
                        .join('\n');
                    htmlTemplates.forEach((template) => {
                        this.addWatchFile(template.filePath);
                    });
                    const moduleName = options.ngTemplates.moduleName;
                    return utils_1.bundleAngularJSTemplates(moduleName, htmlTemplates) + javaScriptImports;
                });
            }
        }
    };
};
