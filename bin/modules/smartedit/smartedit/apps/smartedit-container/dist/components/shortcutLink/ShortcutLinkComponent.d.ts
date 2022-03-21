import { Location } from '@angular/common';
import { ComponentFactoryResolver, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IExperienceService, PriorityService, SeRouteShortcutConfig, SystemEventService } from 'smarteditcommons';
import './ShortcutLink.scss';
export interface SeShortcutLinkConfig extends SeRouteShortcutConfig {
    active?: boolean;
}
export declare class ShortcutLinkComponent implements OnInit, OnDestroy {
    private router;
    private location;
    private resolver;
    private experienceService;
    private priorityService;
    private systemEventService;
    containerEntry: ViewContainerRef;
    defaultTemplate: TemplateRef<any>;
    private unregFn;
    constructor(router: Router, location: Location, resolver: ComponentFactoryResolver, experienceService: IExperienceService, priorityService: PriorityService, systemEventService: SystemEventService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    onClick(shortcutLink: SeShortcutLinkConfig): void;
    private _createShortcutLink;
    private _createShortcutLinkDynamicComponents;
    private _getShortcutLinks;
    private _orderByPriority;
}
