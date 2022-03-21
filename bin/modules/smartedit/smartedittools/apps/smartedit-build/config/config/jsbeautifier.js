/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {
    /**
     * @ngdoc overview
     * @name jsbeautifier(C)
     * @description
     * # jsbeautifier Configuration
     *
     * https://github.com/beautify-web/js-beautify
     *
     * The default jsbeautifier configuration needs to be extended with a **files** glob array in each extension.
     *
     */

    return {
        config: function(data, conf) {
            return {
                options: {
                    html: {
                        braceStyle: 'collapse',
                        indentChar: ' ',
                        indentScripts: 'keep',
                        indentSize: 4,
                        maxPreserveNewlines: 10,
                        preserveNewlines: true,
                        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
                        wrapLineLength: 0,
                        wrapAttributes: 'force'
                    },
                    css: {
                        indentChar: ' ',
                        indentSize: 4
                    },
                    js: {
                        braceStyle: 'collapse',
                        breakChainedMethods: false,
                        e4x: false,
                        evalCode: false,
                        indentChar: ' ',
                        indentLevel: 0,
                        indentSize: 4,
                        indentWithTabs: false,
                        jslintHappy: false,
                        keepArrayIndentation: false,
                        keepFunctionIndentation: false,
                        maxPreserveNewlines: 10,
                        preserveNewlines: true,
                        spaceBeforeConditional: true,
                        spaceInParen: false,
                        unescapeStrings: false,
                        wrapLineLength: 0,
                        endWithNewline: true
                    }
                }
            };
        }
    };
};
