import { CatalogDetailsItemData, IExperienceService } from 'smarteditcommons';
export declare class HomePageLinkComponent {
    private experienceService;
    private data;
    constructor(experienceService: IExperienceService, data: CatalogDetailsItemData);
    onClick(): void;
}
