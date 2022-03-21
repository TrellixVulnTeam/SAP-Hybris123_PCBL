import { SeComponentConstructor } from './types';
/**
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular component to be downgraded
 */
export declare const SeDowngradeComponent: () => <T extends SeComponentConstructor>(componentConstructor: T) => T;
