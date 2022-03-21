/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { CmsitemsRestService, CMSRestriction } from 'cmscommons';
import {
    GenericEditorWidgetData,
    GENERIC_EDITOR_WIDGET_DATA,
    SeDowngradeComponent
} from 'smarteditcommons';
import { PageInfoForViewing } from '../../pages/services';
import { RestrictionCMSItem } from '../../restrictions/types';

@SeDowngradeComponent()
@Component({
    selector: 'se-restrictions-list',
    templateUrl: './RestrictionsListComponent.html'
})
export class RestrictionsListComponent {
    public pageInfo: PageInfoForViewing;
    public restrictions: RestrictionCMSItem[];

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        public data: GenericEditorWidgetData<PageInfoForViewing>,
        private cmsitemsRestService: CmsitemsRestService,
        private cdr: ChangeDetectorRef
    ) {
        ({ model: this.pageInfo } = data);
        this.restrictions = [];
    }

    async ngOnInit(): Promise<void> {
        const restrictionsData = await this.cmsitemsRestService.getByIdsNoCache<RestrictionCMSItem>(
            this.pageInfo.restrictions,
            'FULL'
        );
        this.restrictions = (restrictionsData.response
            ? restrictionsData.response
            : [restrictionsData]) as RestrictionCMSItem[];

        this.cdr.detectChanges();
    }
}
