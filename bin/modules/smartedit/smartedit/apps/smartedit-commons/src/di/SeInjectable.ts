/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * **Deprecated since 1905.**
 *
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit injectable service from a Dependency injection standpoint.
 * When multiple class annotations are used, [\@SeInjectable\(\)]{@link SeInjectable} must be closest to the class declaration.
 *
 * @deprecated
 */
export const SeInjectable = function () {
    return function (providerConstructor: any): any {
        return providerConstructor;
    };
};
