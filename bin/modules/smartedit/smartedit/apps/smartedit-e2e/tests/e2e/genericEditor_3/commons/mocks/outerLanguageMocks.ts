/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';

@SeEntryModule('LanguageMocks')
@NgModule({
    providers: [
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                httpBackendService.whenGET(/cmswebservices\/v1\/sites\/.*\/languages/).respond({
                    languages: [
                        {
                            nativeName: 'English',
                            isocode: 'en',
                            required: true
                        },
                        {
                            nativeName: 'French',
                            isocode: 'fr',
                            required: true
                        },
                        {
                            nativeName: 'Italian',
                            isocode: 'it'
                        },
                        {
                            nativeName: 'Polish',
                            isocode: 'pl'
                        },
                        {
                            nativeName: 'Hindi',
                            isocode: 'hi'
                        }
                    ]
                });
            },
            [HttpBackendService]
        )
    ]
})
export class LanguageMocks {}
