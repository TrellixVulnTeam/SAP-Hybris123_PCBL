/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { UrlHandlingStrategy, UrlTree } from '@angular/router/router';
import { NG_ROUTE_PREFIX } from '../utils';

/**
 * Any route not starting with 'ng' will be delegated to legacy Angular JS router.
 *
 * @internal
 * @ignore
 */
export class CustomHandlingStrategy implements UrlHandlingStrategy {
    public static isNgRoute(url: string): boolean {
        return url.startsWith(`/${NG_ROUTE_PREFIX}`);
    }
    shouldProcessUrl(url: UrlTree): boolean {
        return CustomHandlingStrategy.isNgRoute(url.toString());
    }
    extract(url: UrlTree): UrlTree {
        return url;
    }
    merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
        return newUrlPart;
    }
}
