import { ISeDropdownSelectedOption, TypedMap } from 'smarteditcommons';
/**
 * @internal
 * @ignore
 */
export interface ISelectedSite extends ISeDropdownSelectedOption {
    uid: string;
    contentCatalogs: string[];
    name: TypedMap<string>;
    previewUrl: string;
}
export declare const SITES_ID = "sites-id";
