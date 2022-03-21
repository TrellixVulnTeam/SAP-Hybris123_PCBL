/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const cwd = process.cwd();

const path = require('path');
const { legacy: options } = require(path.join(cwd, 'smartedit.json'));
const fs = require('fs').promises;

const { readTemplateFiles, bundleAngularJSTemplates } = require('@smartedit/packagr');

module.exports = async () => {
    if (!options || !options.ngTemplates) {
        return;
    }

    const htmlTemplates = await readTemplateFiles(
        options.ngTemplates.files,
        options.ngTemplates.includePathInName
    );
    const ngTemplates = bundleAngularJSTemplates(options.ngTemplates.moduleName, htmlTemplates);

    await fs.mkdir(path.join(cwd, '.temp'), { recursive: true });
    await fs.writeFile(path.join(cwd, '.temp/templates.js'), ngTemplates, 'utf8');
};
