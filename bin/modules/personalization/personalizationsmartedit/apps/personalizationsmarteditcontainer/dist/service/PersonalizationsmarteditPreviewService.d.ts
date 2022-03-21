import { IExperienceService } from 'smarteditcommons';
export declare class PersonalizationsmarteditPreviewService {
    protected experienceService: IExperienceService;
    constructor(experienceService: IExperienceService);
    removePersonalizationDataFromPreview(): Promise<import("smarteditcommons").IExperience>;
    updatePreviewTicketWithVariations(variations: any): Promise<import("smarteditcommons").IExperience>;
}
