import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { ICatalogService, IUrlService, SystemEventService, SmarteditRoutingService, TypedMap } from 'smarteditcommons';
export declare class TrashLinkComponent implements OnInit, OnDestroy {
    private route;
    private routingsService;
    private managePageService;
    private urlService;
    private catalogService;
    private systemEventService;
    trashedPagesTranslationData: TypedMap<number>;
    isNonActiveCatalog: boolean;
    private siteId;
    private catalogId;
    private catalogVersion;
    private uriContext;
    private unsubscribeContentCatalogUpdateEvent;
    constructor(route: ActivatedRoute, routingsService: SmarteditRoutingService, managePageService: ManagePageService, urlService: IUrlService, catalogService: ICatalogService, systemEventService: SystemEventService);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    updateTrashedPagesCount(): Promise<void>;
    goToTrash(): void;
}
