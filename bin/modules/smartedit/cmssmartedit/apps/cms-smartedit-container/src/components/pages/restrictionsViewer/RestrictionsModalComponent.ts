/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalRef } from '@fundamental-ngx/core';
import { CMSRestriction, CmsitemsRestService } from 'cmscommons';
import { RestrictionCMSItem } from 'cmssmarteditcontainer/components/restrictions/types';

@Component({
    selector: 'se-restrictions-modal',
    templateUrl: './RestrictionsModalComponent.html',
    styleUrls: ['./RestrictionsModalComponent.scss']
})
export class RestrictionsModalComponent implements OnInit {
    public restrictions: CMSRestriction[];

    constructor(
        private modalRef: ModalRef,
        private cmsitemsRestService: CmsitemsRestService,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        const restrictionsData = await this.cmsitemsRestService.getByIdsNoCache<RestrictionCMSItem>(
            this.modalRef.data.modalData,
            'FULL'
        );
        this.restrictions = (restrictionsData.response
            ? restrictionsData.response
            : [restrictionsData]) as CMSRestriction[];
        this.cdr.detectChanges();
    }
}
