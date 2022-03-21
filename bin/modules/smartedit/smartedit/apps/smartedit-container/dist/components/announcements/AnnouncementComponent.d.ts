import { Injector, OnChanges } from '@angular/core';
import { CompileHtmlNgController, IAnnouncementService } from 'smarteditcommons';
import { IAnnouncement } from 'smarteditcontainer/services/announcement/AnnouncementServiceOuter';
import './AnnouncementComponent.scss';
export declare class AnnouncementComponent implements OnChanges {
    private announcementService;
    private injector;
    announcement: IAnnouncement;
    get fadeAnimation(): boolean;
    isLegacyAngularJS: boolean;
    legacyCompileHtmlNgController: CompileHtmlNgController;
    announcementInjector: Injector;
    constructor(announcementService: IAnnouncementService, injector: Injector);
    ngOnChanges(): void;
    hasTemplate(): boolean;
    hasTemplateUrl(): boolean;
    hasComponent(): boolean;
    hasMessage(): boolean;
    hasMessageTitle(): boolean;
    isCloseable(): boolean;
    closeAnnouncement(): void;
    private hasController;
    private createAnnouncementInjector;
}
