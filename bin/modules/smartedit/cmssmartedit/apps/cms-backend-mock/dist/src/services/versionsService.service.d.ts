import { IPageMock } from '../../fixtures/entities/pages';
import { IVersion } from '../../fixtures/entities/versions';
export declare class VersionsService {
    private pageMockVersions;
    constructor();
    filterVersionsByMask(siteId: string, pageUUID: string, mask: string): IVersion[];
    updatePageMockVersion(siteId: string, pageUUID: string, versionId: string, newVersion: IVersion): void;
    getPageMock(siteId: string, pageUUID: string): IPageMock | undefined;
    deletePageVersionByID(versionID: string): void;
    getPageVersions(): IPageMock[];
    sliceVersions(currentPage: number, pageSize: number, versions: IVersion[]): IVersion[];
    refreshPageMockVersions(): void;
}
