import { SeFilterConstructor } from './types';
/**
 * **Deprecated since 2005.**
 *
 * Decorator used to compose alter original filter constuctor that will later be added to angularJS module filters.
 * @deprecated
 */
export declare const SeFilter: () => (filterConstructor: SeFilterConstructor) => SeFilterConstructor;
