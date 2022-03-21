import { INavigationEntry } from './navigationEntry.entity';
export interface INavigationNode {
    uid: string;
    name?: string;
    title?: {
        en?: string;
        fr?: string;
        de?: string;
    };
    uuid: string;
    itemtype?: string;
    parent?: string;
    parentUid?: string;
    position?: number;
    hasChildren?: boolean;
    hasEntries?: boolean;
    children?: string[];
    navigationComponent?: string;
    catalogVersion?: string;
    entries?: INavigationEntry[];
}
