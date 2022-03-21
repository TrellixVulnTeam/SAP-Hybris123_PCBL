import { ISiteName } from './siteName.entity';
export interface ISite {
    contentCatalogs: string[];
    name: ISiteName;
    previewUrl: string;
    uid: string;
    redirectUrl: string;
}
