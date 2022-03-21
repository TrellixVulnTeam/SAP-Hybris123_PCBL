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
export declare const SeComponent: (definition: SeComponentDefinition) => <T extends SeComponentConstructor>(componentConstructor: T) => T;
