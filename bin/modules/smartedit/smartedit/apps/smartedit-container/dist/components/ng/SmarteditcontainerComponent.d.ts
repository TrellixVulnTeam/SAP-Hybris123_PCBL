import { ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { TranslateService } from '@ngx-translate/core';
import { AngularJSBootstrapIndicatorService } from 'smarteditcommons';
export declare class SmarteditcontainerComponent {
    private translateService;
    upgrade: UpgradeModule;
    private elementRef;
    private bootstrapIndicator;
    legacyAppName: string;
    constructor(translateService: TranslateService, injector: Injector, upgrade: UpgradeModule, elementRef: ElementRef, bootstrapIndicator: AngularJSBootstrapIndicatorService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private setApplicationTitle;
    private get legacyAppNode();
    private isAppComponent;
    private isSmarteditLoader;
}
