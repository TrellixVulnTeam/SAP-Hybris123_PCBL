import { ISelectAdapter, ISelectItem } from '@smart/utils';
import { Tab } from './TabsComponent';
export declare class TabsSelectAdapter implements ISelectAdapter {
    static transform(item: Tab, id: number): ISelectItem<Tab>;
}
