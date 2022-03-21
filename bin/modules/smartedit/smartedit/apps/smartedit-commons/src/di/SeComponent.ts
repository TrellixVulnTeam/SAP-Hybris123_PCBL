/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { functionsUtils, TypedMap } from '@smart/utils';
import * as angular from 'angular';
import { parseDirectiveBindings, parseDirectiveName } from './SeDirective';
import { SeComponentConstructor, SeComponentDefinition } from './types';

/**
 * **Deprecated since 1905.**
 *
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit web component from a Depencency injection standpoint.
 * The controller alias will be $ctrl.
 * Inherits properties from {@link SeDirective}.
 *
 * @deprecated
 */
export const SeComponent = function (definition: SeComponentDefinition) {
    return function <T extends SeComponentConstructor>(componentConstructor: T): T {
        definition = definition;

        const nameSet = parseDirectiveName(definition.selector, componentConstructor);

        const component: angular.IComponentOptions = {
            controller: componentConstructor,
            controllerAs: '$ctrl',
            transclude: definition.transclude || true,
            bindings: parseDirectiveBindings(definition.inputs),
            require: definition.require as TypedMap<string>
        };

        if (definition.templateUrl) {
            component.templateUrl = definition.templateUrl;
        } else if (definition.template) {
            component.template = definition.template;
        }

        if (nameSet.restrict !== 'E') {
            const componentName = functionsUtils.getConstructorName(componentConstructor);
            throw new Error(
                `component ${componentName} declared a selector on class or attribute. version 1808 of Smartedit DI limits SeComponents to element selectors`
            );
        }

        componentConstructor.componentName = nameSet.name;
        componentConstructor.definition = component;

        // will be browsed by owning @SeModule
        componentConstructor.entryComponents = definition.entryComponents;
        componentConstructor.providers = definition.providers;

        return componentConstructor;
    };
};
