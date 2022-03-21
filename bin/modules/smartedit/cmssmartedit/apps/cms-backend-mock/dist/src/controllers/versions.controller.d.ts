import { IVersion } from '../../fixtures/entities/versions';
import { VersionsService } from '../services';
export declare class VersionsController {
    private readonly versionsService;
    constructor(versionsService: VersionsService);
    setCMSVersionOnItem(versionId: string): void;
    deleteVersion(versionId: string): void;
    replacePageVersion(res: any, siteId: string, itemUUID: string, versionId: string, versionPayload: IVersion): any;
    createCMSVersion(res: any, versionData: IVersion, itemUUID: string): any;
    getCMSVersions(siteId: string, itemUUID: string, mask: string, currentPage: string, pageSize: string): {
        pagination: {
            count: number;
            hasNest: boolean;
            hasPrevious: boolean;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        results: IVersion[];
    };
    refreshFixture(): void;
}
