import { CMSModesService } from 'cmscommons';
import { IPerspectiveService } from 'smarteditcommons';
import { PageVersionSelectionService, IPageVersion } from '../../../services';
export declare class VersionItemComponent {
    private pageVersionSelectionService;
    private perspectiveService;
    private cMSModesService;
    pageVersion: IPageVersion;
    private VERSIONING_MODE_KEY;
    constructor(pageVersionSelectionService: PageVersionSelectionService, perspectiveService: IPerspectiveService, cMSModesService: CMSModesService);
    selectVersion(): Promise<void>;
    isSelectedVersion(): boolean;
    isVersionMenuEnabled(): boolean;
}
