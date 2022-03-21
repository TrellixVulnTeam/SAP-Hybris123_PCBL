import { SeModuleConstructor, SeModuleDefinition } from './types';
/**
 * **Deprecated since 1905.**
 *
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit module from a Dependency injection standpoint.
 *
 * To create a configurable module, create a static method returning an SeModuleWithProvider object. The module
 * can then be imported by a parent module returning the SeModuleWithProvider object from the static method.
 * @deprecated
 */
export declare const SeModule: (definition: SeModuleDefinition) => <T extends SeModuleConstructor>(moduleConstructor: T) => T;
