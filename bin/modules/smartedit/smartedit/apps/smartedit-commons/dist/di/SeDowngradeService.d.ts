import { InjectionToken } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { SeConstructor } from './types';
export declare const servicesToBeDowngraded: TypedMap<SeConstructor>;
/**
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular service to be downgraded
 * This decorator must always be at the top/furthest from the class unless a token is provided
 * @param token `InjectionToken` that identifies a service provided from Angular.
 * Will default to using the constructor itself.
 */
export declare const SeDowngradeService: (token?: any | InjectionToken<any>) => <T extends SeConstructor<any>>(serviceConstructor: T) => T;
