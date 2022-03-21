import { EventEmitter, OnInit, Type } from '@angular/core';
import { CrossFrameEventService, LanguageService } from "smarteditcommons";
import { PersonalizationsmarteditContextService } from "personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter";
import { ComponentMenuService } from 'cmssmarteditcontainer';
export declare class CatalogVersionFilterDropdownComponent implements OnInit {
    private crossFrameEventService;
    private languageService;
    protected componentMenuService: ComponentMenuService;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    initialValue: string;
    onSelectCallback: EventEmitter<string>;
    selectedId: string;
    items: any[];
    itemComponent: Type<any>;
    fetchStrategy: {
        fetchAll: any;
    };
    private l10nFilter;
    constructor(crossFrameEventService: CrossFrameEventService, languageService: LanguageService, componentMenuService: ComponentMenuService, personalizationsmarteditContextService: PersonalizationsmarteditContextService);
    ngOnInit(): void;
    onChange(changes: any): void;
}
