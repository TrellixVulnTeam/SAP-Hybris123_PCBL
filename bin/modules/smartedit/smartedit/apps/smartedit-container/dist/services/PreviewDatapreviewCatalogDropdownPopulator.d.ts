import { CrossFrameEventService, DropdownPopulatorInterface, DropdownPopulatorPayload, GenericEditorOption, ICatalogService, LanguageService, ISharedDataService } from 'smarteditcommons';
/**
 * Implementation of DropdownPopulatorInterface for catalog dropdown in
 * experience selector to populate the list of catalogs by making a REST call to retrieve the sites and then the catalogs based on the site.
 */
export declare class PreviewDatapreviewCatalogDropdownPopulator extends DropdownPopulatorInterface {
    private catalogService;
    private sharedDataService;
    private l10nFn;
    constructor(catalogService: ICatalogService, sharedDataService: ISharedDataService, languageService: LanguageService, crossFrameEventService: CrossFrameEventService);
    /**
     *  Returns a promise resolving to a list of site - catalogs to be displayed in the experience selector.
     *
     */
    fetchAll(payload: DropdownPopulatorPayload): Promise<GenericEditorOption[]>;
    /** @internal */
    private initCatalogVersionDropdownChoices;
    /** @internal */
    private getDropdownChoices;
}
