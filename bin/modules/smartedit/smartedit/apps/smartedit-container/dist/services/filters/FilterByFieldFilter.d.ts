import { TypedMap } from 'smarteditcommons';
/**
 * **Deprecated since 2005, use {@link FilterByFieldPipe}**.
 *
 * @deprecated
 */
export declare class FilterByFieldFilter {
    static transform(): (items: TypedMap<string>[], query: string, keys?: string[], callbackFcn?: (filtered: TypedMap<string>[]) => void) => TypedMap<string>[];
}
