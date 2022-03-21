import { IVersion } from '../versions';
export interface IPageMock {
    siteId: string;
    pageUUID: string;
    versions: IVersion[];
}
