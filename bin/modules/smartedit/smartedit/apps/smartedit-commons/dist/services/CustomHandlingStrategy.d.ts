import { UrlHandlingStrategy, UrlTree } from '@angular/router/router';
/**
 * Any route not starting with 'ng' will be delegated to legacy Angular JS router.
 *
 * @internal
 * @ignore
 */
export declare class CustomHandlingStrategy implements UrlHandlingStrategy {
    static isNgRoute(url: string): boolean;
    shouldProcessUrl(url: UrlTree): boolean;
    extract(url: UrlTree): UrlTree;
    merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree;
}
