/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { readFile } from './readFile';
import { resolveBasePath, resolvePath } from './path';
import { minifyHtml } from './html';

const fg = require('fast-glob');
const path = require('path');

export interface HtmlTemplate {
    name: string;
    filePath: string;
    content: string;
}

const escapeQuotes = (html: string) => {
    return html.replace(/"/g, '\\"').replace(/\n/g, '');
};

const compileTemplateFile = async (
    filePath: string,
    includePathInName: boolean
): Promise<HtmlTemplate> => {
    const rawHtml = await readFile(filePath);
    const html = escapeQuotes(minifyHtml(rawHtml));

    const templateName = includePathInName ? filePath : path.basename(filePath);

    const content = `
    $templateCache.put(
        "${templateName}", 
        "${html}"
    );
    `;

    return {
        name: templateName,
        filePath,
        content,
    };
};

/**
 *
 * @param patterns
 */
export const findJavaScriptFiles = (patterns: string | string[]): Promise<string[]> => {
    return fg(patterns, {
        cwd: resolveBasePath(),
    });
};

/**
 *
 * @param patterns
 */
export const readTemplateFiles = async (
    patterns: string | string[],
    includePathInName: boolean
): Promise<HtmlTemplate[]> => {
    const matchedFiles: string[] = await fg(patterns, {
        cwd: resolveBasePath(),
    });

    return Promise.all(
        matchedFiles.map((filePath: string) => compileTemplateFile(filePath, includePathInName))
    );
};

/**
 *
 * @param moduleName The name of the module to use in angularJS for the concatenated templates
 * @param templates An array containing
 */
export const bundleAngularJSTemplates = (moduleName: string, templates: HtmlTemplate[]): string => {
    const concatenatedTemplates = templates.reduce((acc: string, currentValue: HtmlTemplate) => {
        return acc + ' ' + currentValue.content;
    }, '');

    return `
    (function(){
      "use strict";
      var angular = angular || window.angular;
      var SE_NG_TEMPLATE_MODULE = null;
      
      try {
        SE_NG_TEMPLATE_MODULE = angular.module('${moduleName}')
      } catch (err) {}
      SE_NG_TEMPLATE_MODULE = SE_NG_TEMPLATE_MODULE || angular.module('${moduleName}', []);
      SE_NG_TEMPLATE_MODULE.run(['$templateCache', function($templateCache) {
        'use strict';
        ${concatenatedTemplates}
      }]);
    })();
    `;
};
