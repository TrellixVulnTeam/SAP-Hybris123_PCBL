/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {
    setupL10nFilter,
    CrossFrameEventService,
    DropdownPopulatorInterface,
    DropdownPopulatorPayload,
    GenericEditorOption,
    IBaseCatalog,
    IBaseCatalogVersion,
    ICatalogService,
    ISite,
    LanguageService,
    SeDowngradeService,
    TypedMap,
    IExperience,
    ISharedDataService,
    EXPERIENCE_STORAGE_KEY
} from 'smarteditcommons';

/**
 * Implementation of DropdownPopulatorInterface for catalog dropdown in
 * experience selector to populate the list of catalogs by making a REST call to retrieve the sites and then the catalogs based on the site.
 */
@SeDowngradeService()
export class PreviewDatapreviewCatalogDropdownPopulator extends DropdownPopulatorInterface {
    private l10nFn: (localizedMap: TypedMap<string> | string) => TypedMap<string> | string;

    constructor(
        private catalogService: ICatalogService,
        private sharedDataService: ISharedDataService,
        languageService: LanguageService,
        crossFrameEventService: CrossFrameEventService
    ) {
        super(lo, languageService);
        this.l10nFn = setupL10nFilter(languageService, crossFrameEventService);
    }

    /**
     *  Returns a promise resolving to a list of site - catalogs to be displayed in the experience selector.
     *
     */
    public fetchAll(payload: DropdownPopulatorPayload): Promise<GenericEditorOption[]> {
        return this.initCatalogVersionDropdownChoices(payload.search);
    }

    /** @internal */
    private async initCatalogVersionDropdownChoices(
        search: string
    ): Promise<GenericEditorOption[]> {
        try {
            const experience: IExperience = (await this.sharedDataService.get(
                EXPERIENCE_STORAGE_KEY
            )) as IExperience;
            const siteDescriptor: ISite = experience.siteDescriptor;
            const dropdownChoices = await this.getDropdownChoices(siteDescriptor, search);

            const ascDropdownChoices = lo
                .flatten(dropdownChoices)
                .sort((e1: GenericEditorOption, e2: GenericEditorOption) =>
                    (e1.label as string).localeCompare(e2.label as string)
                );
            return ascDropdownChoices;
        } catch (e) {
            throw new Error(e);
        }
    }

    /** @internal */
    private async getDropdownChoices(
        siteDescriptor: ISite,
        search: string
    ): Promise<GenericEditorOption[]> {
        const catalogs: IBaseCatalog[] = await this.catalogService.getContentCatalogsForSite(
            siteDescriptor.uid
        );

        const optionsByCatalog = lo.flatten(catalogs).map((catalog) =>
            catalog.versions.map((catalogVersion: IBaseCatalogVersion) => ({
                id: `${siteDescriptor.uid}|${catalog.catalogId}|${catalogVersion.version}`,
                label: `${this.l10nFn(catalog.name)} - ${catalogVersion.version}`
            }))
        );

        return lo
            .flatten(optionsByCatalog)
            .filter((option) =>
                search ? option.label.toUpperCase().includes(search.toUpperCase()) : true
            );
    }
}
