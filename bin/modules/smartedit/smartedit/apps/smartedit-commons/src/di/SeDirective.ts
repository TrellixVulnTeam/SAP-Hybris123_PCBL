/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { functionsUtils, TypedMap } from '@smart/utils';
import * as angular from 'angular';
import * as lo from 'lodash';
import { diNameUtils } from './DINameUtils';
import { SeConstructor, SeDirectiveConstructor, SeDirectiveDefinition } from './types';

/** @internal */
export const parseDirectiveBindings = function (inputs: string[]): TypedMap<string> {
    let bindings: TypedMap<string>;

    if (inputs && (inputs as any).length) {
        bindings = inputs.reduce((seed: any, element) => {
            const values = element.replace(/\s/g, '').split(':');
            let bindingProperty = values[values.length - 1];
            if (
                !bindingProperty.startsWith('@') &&
                !bindingProperty.startsWith('&') &&
                !bindingProperty.startsWith('=')
            ) {
                bindingProperty = '<' + bindingProperty;
            }
            seed[values[0]] = bindingProperty;
            return seed;
        }, {});
    }
    return bindings;
};

/*
 * Used to determine directive name and restrict value in AngularJS given an Angular directive
 */
/** @internal */
export const parseDirectiveName = function (
    selector: string,
    seContructor: SeConstructor
): { name: string; restrict: string } {
    const attributeDirectiveNamePattern = /^\[([-\w]+)\]$/;
    const elementDirectiveNamePattern = /^([-\w]+)$/;

    if (!selector) {
        return { name: diNameUtils.buildComponentName(seContructor), restrict: 'E' };
    } else if (selector.startsWith('.')) {
        return { name: lo.camelCase(selector.substring(1)), restrict: 'C' };
    } else if (attributeDirectiveNamePattern.test(selector)) {
        return {
            name: lo.camelCase(attributeDirectiveNamePattern.exec(selector)[1]),
            restrict: 'A'
        };
    } else if (elementDirectiveNamePattern.test(selector)) {
        return { name: lo.camelCase(elementDirectiveNamePattern.exec(selector)[1]), restrict: 'E' };
    } else {
        const directiveClassName = functionsUtils.getConstructorName(seContructor);
        throw new Error(`SeDirective ${directiveClassName} declared an unexpected selector (${selector}). 
		Make sure to use an element name or class (.class) or attribute ([attribute])`);
    }
};

/**
 * ** Deprecated since 1905.**
 *
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit web directive from a Depencency injection standpoint.
 * This directive will have an isolated scope and will bind its properties to its controller
 * @deprecated
 */
export const SeDirective = function (definition: SeDirectiveDefinition) {
    return function (directiveConstructor: SeDirectiveConstructor): SeDirectiveConstructor {
        definition = definition;

        const directive: angular.IDirective = {
            controller: directiveConstructor,
            scope: typeof definition.scope === 'undefined' ? {} : definition.scope,
            replace: definition.replace,
            transclude: definition.transclude,
            template: definition.template,
            templateUrl: definition.templateUrl,
            controllerAs: definition.controllerAs,
            bindToController: parseDirectiveBindings(definition.inputs) || true,
            require: definition.require
        };

        const nameSet = parseDirectiveName(definition.selector, directiveConstructor);

        directive.restrict = nameSet.restrict;

        directiveConstructor.directiveName = nameSet.name;
        directiveConstructor.definition = directive;

        // will be browsed by owning @SeModule
        directiveConstructor.providers = definition.providers;

        return directiveConstructor;
    };
};
