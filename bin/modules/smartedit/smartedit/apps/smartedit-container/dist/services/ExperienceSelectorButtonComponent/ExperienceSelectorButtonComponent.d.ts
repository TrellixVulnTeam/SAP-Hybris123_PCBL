import './ExperienceSelectorButtonComponent.scss';
import { OnDestroy, OnInit } from '@angular/core';
import { CrossFrameEventService, IExperience, ISharedDataService, LanguageService, SystemEventService } from 'smarteditcommons';
export declare class ExperienceSelectorButtonComponent implements OnInit, OnDestroy {
    private systemEventService;
    private crossFrameEventService;
    private locale;
    private sharedDataService;
    private languageService;
    resetExperienceSelector: () => void;
    status: {
        isOpen: boolean;
    };
    isCurrentPageFromParent: boolean;
    parentCatalogVersion: string;
    experience: IExperience;
    private l10nFilter;
    private unregFn;
    private unRegNewPageContextEventFn;
    constructor(systemEventService: SystemEventService, crossFrameEventService: CrossFrameEventService, locale: string, sharedDataService: ISharedDataService, languageService: LanguageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateExperience(): Promise<void>;
    buildExperienceText(): string;
    setPageFromParent(data: IExperience): void;
    private _returnProductCatalogVersionTextByUuids;
}
