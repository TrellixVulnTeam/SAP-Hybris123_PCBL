import { TypedMap } from '@smart/utils';
import { SeConstructor, SeDirectiveConstructor, SeDirectiveDefinition } from './types';
/** @internal */
export declare const parseDirectiveBindings: (inputs: string[]) => TypedMap<string>;
/** @internal */
export declare const parseDirectiveName: (selector: string, seContructor: SeConstructor) => {
    name: string;
    restrict: string;
};
/**
 * ** Deprecated since 1905.**
 *
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit web directive from a Depencency injection standpoint.
 * This directive will have an isolated scope and will bind its properties to its controller
 * @deprecated
 */
export declare const SeDirective: (definition: SeDirectiveDefinition) => (directiveConstructor: SeDirectiveConstructor) => SeDirectiveConstructor;
