/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './LandingPageComponent.scss';
import { Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {
    GenericEditorField,
    IAlertService,
    IBaseCatalog,
    ICatalogService,
    ISeDropdownSelectedOptionEventData,
    ISite,
    IStorageService,
    LINKED_DROPDOWN,
    NG_ROUTE_PREFIX,
    SeDowngradeComponent,
    SystemEventService,
    YJQUERY_TOKEN
} from 'smarteditcommons';

import { SiteService } from '../../../services';

import { ISelectedSite, SITES_ID } from './types';

/**
 * Component responsible of displaying the SmartEdit landing page.
 *
 * @internal
 * @ignore
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-landing-page',
    templateUrl: './LandingPageComponent.html'
})
export class LandingPageComponent implements OnInit, OnDestroy {
    public readonly sitesId = SITES_ID;
    public readonly qualifier = 'site';
    public catalogs: IBaseCatalog[] = [];
    public field: Partial<GenericEditorField>;
    public model: {
        site: string;
    };
    private unregisterSitesDropdownEventHandler: () => void;
    private readonly SELECTED_SITE_COOKIE_NAME = 'seselectedsite';

    constructor(
        private siteService: SiteService,
        private catalogService: ICatalogService,
        private systemEventService: SystemEventService,
        private storageService: IStorageService,
        private alertService: IAlertService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.getCurrentSiteId(params.get('siteId')).then((siteId) => {
                this.setModel(siteId);
            });
        });
        this.siteService.getAccessibleSites().then((sites: ISite[]) => {
            this.field = {
                idAttribute: 'uid',
                labelAttributes: ['name'],
                editable: true,
                paged: false,
                options: sites
            };
        });

        this.removeStorefrontCssClass();

        this.unregisterSitesDropdownEventHandler = this.systemEventService.subscribe(
            this.sitesId + LINKED_DROPDOWN,
            this.selectedSiteDropdownEventHandler.bind(this)
        );
    }

    ngOnDestroy(): void {
        this.unregisterSitesDropdownEventHandler();
    }

    private getCurrentSiteId(siteIdFromUrl: string): Promise<string> {
        return this.storageService
            .getValueFromLocalStorage(this.SELECTED_SITE_COOKIE_NAME, false)
            .then((siteIdFromCookie: string) =>
                this.siteService.getAccessibleSites().then((sites: ISite[]) => {
                    const isSiteAvailableFromUrl = sites.some(
                        (site: ISite) => site.uid === siteIdFromUrl
                    );
                    if (isSiteAvailableFromUrl) {
                        this.setSelectedSite(siteIdFromUrl);
                        this.updateRouteToRemoveSite();
                        return siteIdFromUrl;
                    } else {
                        if (siteIdFromUrl) {
                            this.alertService.showInfo('se.landingpage.site.url.error');
                            this.updateRouteToRemoveSite();
                        }

                        const isSelectedSiteAvailableFromCookie = sites.some(
                            (site: ISite) => site.uid === siteIdFromCookie
                        );
                        if (!isSelectedSiteAvailableFromCookie) {
                            const firstSiteId = sites.length > 0 ? sites[0].uid : null;
                            return firstSiteId;
                        } else {
                            return siteIdFromCookie;
                        }
                    }
                })
            );
    }

    private updateRouteToRemoveSite(): void {
        this.location.replaceState(NG_ROUTE_PREFIX);
    }

    private removeStorefrontCssClass(): void {
        const bodyTag = this.yjQuery(document.querySelector('body'));

        if (bodyTag.hasClass('is-storefront')) {
            bodyTag.removeClass('is-storefront');
        }
    }

    private selectedSiteDropdownEventHandler(
        _eventId: string,
        data: ISeDropdownSelectedOptionEventData<ISelectedSite>
    ): void {
        if (data.optionObject) {
            const siteId = data.optionObject.id;
            this.setSelectedSite(siteId);
            this.loadCatalogsBySite(siteId);
            this.setModel(siteId);
        } else {
            this.catalogs = [];
        }
    }

    private setSelectedSite(siteId: string): void {
        this.storageService.setValueInLocalStorage(this.SELECTED_SITE_COOKIE_NAME, siteId, false);
    }

    private loadCatalogsBySite(siteId: string): void {
        this.catalogService
            .getContentCatalogsForSite(siteId)
            .then((catalogs: IBaseCatalog[]) => (this.catalogs = catalogs));
    }

    private setModel(siteId: string): void {
        if (this.model) {
            this.model[this.qualifier] = siteId;
        } else {
            this.model = {
                [this.qualifier]: siteId
            };
        }
    }
}
