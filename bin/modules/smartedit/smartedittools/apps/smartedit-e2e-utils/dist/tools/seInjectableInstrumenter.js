"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seInjectableInstrumenter = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const fs_1 = require("fs");
const ts = require("typescript");
const lodash = require("lodash");
const defaultDecorators = [
    'SeInjectable',
    'SeDirective',
    'SeComponent',
    'SeDecorator',
    'SeDowngradeService',
    'SeDowngradeComponent',
    'SeModule',
    'Injectable',
    'Directive',
    'Component',
    'NgModule'
];
/**
 * @SeInjectabe TypeScript instrumenter
 * This module visit the TypeScript source code to search for DI-specific class decorators like @SeInjectable() and @SeComponent;
 * It will instrument the class to as to be usable by Smartedit DI and, more precisely, by underlying
 * AngularJS 1.6 DI
 *
 */
exports.seInjectableInstrumenter = (fileNames, injectableDecorators) => {
    const IGNORE_DECORATORS = ['SeModule', 'NgModule'];
    const DELEGATING_HINT = '/* @ngInject */';
    const decoratorsToInstrument = injectableDecorators || defaultDecorators;
    const program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS
    });
    const checker = program.getTypeChecker(); // do not remove, it's necessary to have type check
    for (const sourceFile of program.getSourceFiles()) {
        ts.forEachChild(sourceFile, walkNode);
    }
    function walkNode(node) {
        if (!isNodeExported(node)) {
            return;
        }
        if (node.kind === ts.SyntaxKind.ClassDeclaration && ts.isClassDeclaration(node)) {
            const classDeclaration = node;
            if (classDeclaration.decorators && classDeclaration.decorators.length) {
                const classDecorators = classDeclaration.decorators
                    .filter((decorator) => ts.isCallExpression(decorator.expression))
                    .map(serializeDecorator);
                if (lodash.intersection(classDecorators.map((d) => d.name), decoratorsToInstrument).length) {
                    const fileName = node.getSourceFile().fileName;
                    const className = node.name ? node.name.getFullText().trim() : '';
                    const intersectDecorators = classDecorators.filter((c) => decoratorsToInstrument.indexOf(c.name) > -1);
                    const source = getTransformedSource(node, fileName, className, intersectDecorators);
                    const stats = fs_1.statSync(fileName);
                    fs_1.writeFileSync(fileName, source);
                    fs_1.utimesSync(fileName, stats.atime, stats.mtime);
                }
            }
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, walkNode);
        }
    }
    function getTemplaterUrlRegexp() {
        return /templateUrl\s*:\s*['"`](.*)['"`]/gm;
    }
    function getRequiredReadyTemplaterUrlRegexp() {
        // references an absolute URL
        return /templateUrl:[\s\S]*http[s]*:\/\/.+/;
    }
    function serializeDecorator(decorator) {
        const symbol = checker.getSymbolAtLocation(decorator.expression.getFirstToken());
        const name = symbol ? symbol.getName() : '';
        const originalArguments = decorator.expression
            .getFullText()
            .replace(/^[a-zA-Z]+\(/, '')
            .replace(/\)$/, '');
        const shouldReplaceTemplateUrl = name === 'Component' &&
            getTemplaterUrlRegexp().test(decorator.expression.getFullText()) &&
            !getRequiredReadyTemplaterUrlRegexp().test(decorator.expression.getFullText());
        return {
            name,
            originalArguments,
            arguments: shouldReplaceTemplateUrl
                ? originalArguments.replace(getTemplaterUrlRegexp(), "template: require('$1'),")
                : originalArguments,
            shouldReplaceTemplateUrl
        };
    }
    function getTransformedSource(node, fileName, className, classDecorators) {
        let fullText = fs_1.readFileSync(fileName).toString();
        classDecorators.forEach((d) => {
            if (d.arguments && !isDecoratorIgnored(d.name)) {
                const index = fullText.indexOf(node.getFullText());
                fullText =
                    fullText.substr(0, index) +
                        `\r(window as any).__smartedit__.addDecoratorPayload('${d.name}', '${className}', ${d.arguments});` +
                        fullText.substr(index);
            }
            if (d.shouldReplaceTemplateUrl) {
                // replace templateUrl by template + require
                fullText = fullText.replace(d.originalArguments, d.arguments);
            }
        });
        if (classDecorators.find((d) => d.name.startsWith('Se') || d.name === 'Injectable')) {
            return fullText.replace(new RegExp('(export class ' + className + ')', 'g'), `export class ${DELEGATING_HINT} ${className}`);
        }
        else {
            return fullText;
        }
    }
    function isDecoratorIgnored(decoratorName) {
        return IGNORE_DECORATORS.indexOf(decoratorName) > -1;
    }
    function isNodeExported(node) {
        return ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
            (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile));
    }
};
