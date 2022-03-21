import { TypedMap } from 'smarteditcommons';
export declare class BaseContextualMenuComponent {
    active: boolean | string;
    status: {
        isopen: boolean;
    };
    protected remainOpenMap: TypedMap<boolean>;
    isHybrisIcon(icon: string): boolean;
    setRemainOpen(key: string, remainOpen: boolean): void;
    showOverlay(): boolean;
}
