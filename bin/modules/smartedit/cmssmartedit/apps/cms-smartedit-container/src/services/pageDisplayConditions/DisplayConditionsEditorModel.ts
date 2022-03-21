/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDowngradeService } from 'smarteditcommons';

import {
    DisplayConditionsFacade,
    IDisplayConditionsPageVariation,
    IDisplayConditionsPrimaryPage
} from '../../facades/DisplayConditionsFacade';

/**
 * Initializes a Page data such as type, name for Primary or Variation Page.
 * Used as a local instance of DisplayConditionsEditor.
 */
@SeDowngradeService()
export class DisplayConditionsEditorModel {
    public variations: IDisplayConditionsPageVariation[];
    public associatedPrimaryPage: Partial<IDisplayConditionsPrimaryPage>;
    public originalPrimaryPage: Partial<IDisplayConditionsPrimaryPage>;
    public isAssociatedPrimaryReadOnly: boolean;
    public pageType: string;
    public pageUid: string;
    public pageName: string;
    public isPrimary: boolean;

    constructor(private displayConditionsFacade: DisplayConditionsFacade) {
        this.variations = [];
    }

    public async initModel(pageUid: string): Promise<void> {
        this.pageUid = pageUid;

        const page = await this.displayConditionsFacade.getPageInfoForPageUid(pageUid);

        ({ pageName: this.pageName, pageType: this.pageType, isPrimary: this.isPrimary } = page);

        if (this.isPrimary) {
            return this.initModelForPrimary(pageUid);
        }
        return this.initModelForVariation(pageUid);
    }

    private async initModelForPrimary(pageUid: string): Promise<void> {
        this.variations = await this.displayConditionsFacade.getVariationsForPageUid(pageUid);
    }

    private async initModelForVariation(pageUid: string): Promise<void> {
        this.isAssociatedPrimaryReadOnly = this.pageType !== 'ContentPage';

        const associatedPrimaryPage = await this.displayConditionsFacade.getPrimaryPageForVariationPage(
            pageUid
        );

        this.associatedPrimaryPage = associatedPrimaryPage;
        this.originalPrimaryPage = associatedPrimaryPage;
    }
}
