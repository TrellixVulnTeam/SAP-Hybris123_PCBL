import { IPerspectiveService } from 'smarteditcommons';
export declare class CMSModesService {
    private perspectiveService;
    static readonly BASIC_PERSPECTIVE_KEY = "se.cms.perspective.basic";
    static readonly ADVANCED_PERSPECTIVE_KEY = "se.cms.perspective.advanced";
    static readonly VERSIONING_PERSPECTIVE_KEY = "se.cms.perspective.versioning";
    constructor(perspectiveService: IPerspectiveService);
    /**
     * Returns a promise that resolves to a boolean which is true if the current perspective loaded is versioning, false otherwise.
     */
    isVersioningPerspectiveActive(): Promise<boolean>;
}
