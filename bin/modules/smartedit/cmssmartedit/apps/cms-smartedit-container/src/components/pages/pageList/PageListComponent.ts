/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cmsitemsUri } from 'cmscommons';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
    SeDowngradeComponent,
    IUrlService,
    ICatalogService,
    SystemEventService,
    IUriContext,
    EVENT_CONTENT_CATALOG_UPDATE,
    Pagination,
    TypedMap,
    DynamicPagedListApi,
    DynamicPagedListConfig
} from 'smarteditcommons';
import { AddPageWizardService } from '../../../services/pages/AddPageWizardService';
import {
    NumberOfRestrictionsWrapperComponent,
    PageStatusWrapperComponent,
    PageNameWrapperComponent,
    PageListDropdownItemsWrapperComponent
} from '../pageListComponentWrappers';
@SeDowngradeComponent()
@Component({
    selector: 'se-page-list',
    templateUrl: './PageListComponent.html',
    styleUrls: ['../pageList.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PageListComponent implements OnInit, OnDestroy {
    public isReady: boolean;
    public count: number;
    public catalogId: string;
    public catalogVersion: string;
    public siteUid: string;
    public query: string;
    public catalogName: TypedMap<string>;
    public dynamicPagedListApi: DynamicPagedListApi;
    public pageUriContext: IUriContext;
    public pageListConfig: DynamicPagedListConfig;
    public uriContext: IUriContext;

    private eventUnsubscribe: () => void;
    private querySubject$: Subject<string>;
    private querySubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private urlService: IUrlService,
        private catalogService: ICatalogService,
        private addPageWizardService: AddPageWizardService,
        private systemEventService: SystemEventService,
        private cdr: ChangeDetectorRef
    ) {
        const {
            snapshot: { params }
        } = this.activatedRoute;

        this.isReady = false;
        this.count = 0;
        this.catalogId = params.catalogId;
        this.catalogVersion = params.catalogVersion;
        this.siteUid = params.siteId;

        this.catalogName = {};

        this.pageUriContext = this.urlService.buildPageUriContext(
            this.siteUid,
            this.catalogId,
            this.catalogVersion
        );
        this.uriContext = this.urlService.buildUriContext(
            this.siteUid,
            this.catalogId,
            this.catalogVersion
        );

        // page list uses cmsitems api along with a set of query params to retrieve the list of active pages. This is passed to the dynamic-paged-list component.
        this.pageListConfig = {
            sortBy: 'name',
            reversed: false,
            itemsPerPage: 10,
            displayCount: true,
            injectedContext: {},
            keys: [],
            queryParams: {
                catalogId: this.catalogId,
                catalogVersion: this.catalogVersion,
                typeCode: 'AbstractPage',
                itemSearchParams: 'pageStatus:active',
                fields: 'PAGE_LIST'
            },
            renderers: {},
            uri: cmsitemsUri
        };

        this.query = '';
        this.querySubject$ = new Subject();
        this.querySubscription = this.querySubject$
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((newValue) => {
                this.query = newValue;
                this.cdr.detectChanges();
            });
    }

    ngOnInit(): Promise<void> {
        return this.initialize();
    }

    ngOnDestroy(): void {
        this.eventUnsubscribe();
        this.querySubscription.unsubscribe();
    }

    public onPageItemsUpdate(pagination: Pagination): void {
        this.count = pagination.totalCount;
    }

    public onContentCatalogUpdate(): void {
        if (this.dynamicPagedListApi) {
            this.dynamicPagedListApi.reloadItems();
        }
    }

    public onQueryChange(value: string): void {
        this.querySubject$.next(value);
    }

    public getApi(api: DynamicPagedListApi): void {
        this.dynamicPagedListApi = api;
    }

    public async openAddPageWizard(): Promise<void> {
        await this.addPageWizardService.openAddPageWizard();
        this.dynamicPagedListApi.reloadItems();
    }

    public reset(): void {
        this.query = '';
    }

    private async retrieveCatalogName(): Promise<void> {
        const catalogs = await this.catalogService.getContentCatalogsForSite(this.siteUid);
        this.catalogName = catalogs.find((catalog) => catalog.catalogId === this.catalogId).name;
    }

    private async initialize(): Promise<void> {
        const isNonActive = await this.catalogService.isContentCatalogVersionNonActive();

        this.pageListConfig.keys = [
            {
                property: 'name',
                i18n: 'se.cms.pagelist.headerpagename',
                sortable: true,
                component: PageNameWrapperComponent
            },
            {
                property: 'uid',
                i18n: 'se.cms.pagelist.headerpageid',
                sortable: true
            },
            {
                property: 'itemtype',
                i18n: 'se.cms.pagelist.headerpagetype',
                sortable: true
            },
            {
                property: 'label',
                i18n: 'se.cms.pagelist.headerpagelable',
                sortable: false
            },
            {
                property: 'masterTemplateId',
                i18n: 'se.cms.pagelist.headerpagetemplate',
                sortable: false
            },
            {
                property: 'numberOfRestrictions',
                i18n: 'se.cms.pagelist.headerrestrictions',
                sortable: false,
                component: NumberOfRestrictionsWrapperComponent
            }
        ];

        if (isNonActive) {
            this.pageListConfig.keys.push({
                property: 'pageStatus',
                i18n: 'se.cms.pagelist.headerpagestatus',
                sortable: false,
                component: PageStatusWrapperComponent
            });
        }

        this.pageListConfig.keys.push({
            property: 'dropdownitems',
            i18n: '',
            sortable: false,
            component: PageListDropdownItemsWrapperComponent
        });

        await this.retrieveCatalogName();

        this.eventUnsubscribe = this.systemEventService.subscribe(
            EVENT_CONTENT_CATALOG_UPDATE,
            () => this.onContentCatalogUpdate()
        );

        this.isReady = true;
        this.cdr.detectChanges();
    }
}
