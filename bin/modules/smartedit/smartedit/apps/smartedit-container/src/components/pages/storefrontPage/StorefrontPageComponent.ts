/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { IExperienceService, SeDowngradeComponent, YJQUERY_TOKEN } from 'smarteditcommons';
import { IframeManagerService } from '../../../services/iframe/IframeManagerService';

/**
 * Component responsible of displaying the SmartEdit storefront page.
 *
 * @internal
 * @ignore
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-storefront-page',
    templateUrl: './StorefrontPageComponent.html'
})
export class StorefrontPageComponent implements OnInit {
    constructor(
        private iframeManagerService: IframeManagerService,
        private experienceService: IExperienceService,
        @Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic
    ) {}

    ngOnInit(): void {
        this.iframeManagerService.applyDefault();
        this.experienceService.initializeExperience();
        this.yjQuery(document.body).addClass('is-storefront');
    }
}
