/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';

import {
    EditorFieldMappingService,
    GenericEditorTabService,
    ISharedDataService,
    RestServiceFactory,
    SeDowngradeComponent,
    SeEntryModule,
    SeGenericEditorModule
} from 'smarteditcommons';

@Injectable()
export class Commons {
    public thesmarteditComponentType: string;
    public thesmarteditComponentId: string;
    public structureApi: string;
    public CONTEXT_CATALOG: string;
    public CONTEXT_CATALOG_VERSION: string;
    public structureForBasic: any;
    public structureForVisibility: any;
    public structureForAdmin: any;
    public contentApi: string;

    constructor(
        restServiceFactory: RestServiceFactory,
        sharedDataService: ISharedDataService,
        private editorFieldMappingService: EditorFieldMappingService,
        private genericEditorTabService: GenericEditorTabService
    ) {
        restServiceFactory.setDomain('thedomain');
        sharedDataService.set('experience', {
            siteDescriptor: {
                uid: 'someSiteUid'
            },
            catalogDescriptor: {
                catalogId: 'electronics',
                catalogVersion: 'staged'
            }
        });

        this.thesmarteditComponentType = 'thesmarteditComponentType';
        this.thesmarteditComponentId = 'thesmarteditComponentId';
        this.structureApi = 'cmswebservices/v1/types/:smarteditComponentType';
        this.CONTEXT_CATALOG = 'CURRENT_CONTEXT_CATALOG';
        this.CONTEXT_CATALOG_VERSION = 'CURRENT_CONTEXT_CATALOG_VERSION';

        this.structureForBasic = [
            {
                cmsStructureType: 'ShortString',
                qualifier: 'name',
                i18nKey: 'type.Item.name.name'
            },
            {
                cmsStructureType: 'DateTime',
                qualifier: 'creationtime',
                i18nKey: 'type.AbstractItem.creationtime.name',
                editable: false
            },
            {
                cmsStructureType: 'DateTime',
                qualifier: 'modifiedtime',
                i18nKey: 'type.AbstractItem.modifiedtime.name',
                editable: false
            }
        ];

        this.structureForVisibility = [
            {
                cmsStructureType: 'Boolean',
                qualifier: 'visible',
                i18nKey: 'type.AbstractCMSComponent.visible.name'
            }
        ];

        this.structureForAdmin = [
            {
                cmsStructureType: 'ShortString',
                qualifier: 'uid',
                i18nKey: 'type.Item.uid.name'
            },
            {
                cmsStructureType: 'ShortString',
                qualifier: 'pk',
                i18nKey: 'type.AbstractItem.pk.name',
                editable: false
            }
        ];

        this.contentApi =
            '/cmswebservices/v1/catalogs/' +
            this.CONTEXT_CATALOG +
            '/versions/' +
            this.CONTEXT_CATALOG_VERSION +
            '/items';

        const isMultiTabPredicate = (
            structureType: string,
            field: string,
            componentStructure: { category: string }
        ) => {
            return componentStructure.category === 'MULTITAB';
        };

        this.editorFieldMappingService.addFieldTabMapping(null, null, 'visible', 'visibility');
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            isMultiTabPredicate,
            'id',
            'administration'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            null,
            isMultiTabPredicate,
            'modifiedtime',
            'administration'
        );
        this.editorFieldMappingService.addFieldTabMapping(
            'DateTime',
            isMultiTabPredicate,
            'creationtime',
            'administration'
        );

        this.genericEditorTabService.configureTab('default', {
            priority: 5
        });
        this.genericEditorTabService.configureTab('administration', {
            priority: 4
        });
    }
}

@SeDowngradeComponent()
@Component({
    selector: 'common-app-root',
    template: `
        <div
            style="position: absolute;z-index: 1000;top: 150px;left: 0;height: 100vh;width: 100vw;background-color: #fff;"
        >
            <se-generic-editor
                [contentApi]="commons.contentApi"
                [smarteditComponentType]="commons.thesmarteditComponentType"
                [smarteditComponentId]="commons.thesmarteditComponentId"
                [structureApi]="commons.structureApi"
            ></se-generic-editor>
        </div>
    `
})
export class CommonAppRoot {
    constructor(public commons: Commons) {}
}
@SeEntryModule('GenericEditorApp')
@NgModule({
    imports: [CommonModule, SeGenericEditorModule],
    declarations: [CommonAppRoot],
    entryComponents: [CommonAppRoot],
    providers: [Commons]
})
export class GenericEditorApp {}
