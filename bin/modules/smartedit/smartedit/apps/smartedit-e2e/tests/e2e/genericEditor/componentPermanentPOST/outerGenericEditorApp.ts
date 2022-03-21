/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import {
    ISharedDataService,
    RestServiceFactory,
    SeDowngradeComponent,
    SeEntryModule,
    SeGenericEditorModule
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'app-root',
    template: `
        <div class="smartedit-testing-overlay">
            <span>ticketId:&nbsp;</span> <span id="ticketId">{{ ticketId }}</span>
            <se-generic-editor
                [smarteditComponentType]="thesmarteditComponentType"
                [structureApi]="structureApi"
                [contentApi]="contentApi"
                [updateCallback]="updateCallback"
            >
            </se-generic-editor>
        </div>
    `
})
export class AppRoot {
    smarteditComponentId: string;
    thesmarteditComponentType = 'thesmarteditComponentType';
    structureApi = 'cmswebservices/v1/types/:smarteditComponentType';
    displaySubmit = true;
    displayCancel = true;
    contentApi = 'previewApi';
    ticketId: string;

    constructor(
        public restServiceFactory: RestServiceFactory,
        sharedDataService: ISharedDataService
    ) {
        restServiceFactory.setDomain('thedomain');
        sharedDataService.set('experience', {
            siteDescriptor: {
                uid: 'someSiteUid'
            },
            catalogDescriptor: {
                catalogId: 'somecatalogId',
                catalogVersion: 'someCatalogVersion'
            }
        });
    }

    updateCallback = (entity: any, response: { ticketId: string }) => {
        delete this.smarteditComponentId;
        // eslint-disable-next-line no-console
        console.info('successful callback on ticket id ', response.ticketId);
        this.ticketId = response.ticketId;
    };
}
@SeEntryModule('GenericEditorApp')
@NgModule({
    imports: [CommonModule, SeGenericEditorModule],
    declarations: [AppRoot],
    entryComponents: [AppRoot]
})
export class GenericEditorApp {}
