import { ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { FundamentalModalManagerService } from '@smart/utils';
import { CompileHtmlNgController } from '../../../directives/CompileHtml';
import { DefaultWizardActionStrategy } from '../services/DefaultWizardActionStrategy';
import { WizardAction, WizardActions } from '../services/WizardActions';
import { WizardService, WizardStep } from '../services/WizardService';
export declare class ModalWizardTemplateComponent {
    private modalManager;
    private wizardActions;
    private defaultWizardActionStrategy;
    private upgrade;
    private componentFactoryResolver;
    private injector;
    executeAction: (action: WizardAction) => void;
    legacyController: CompileHtmlNgController;
    _wizardContext: {
        _steps: WizardStep[];
        templateUrl?: string;
        component?: Type<any>;
        navActions?: WizardAction[];
        templateOverride?: string;
    };
    wizardService: WizardService;
    wizardInjector: Injector;
    private getWizardConfig;
    constructor(modalManager: FundamentalModalManagerService, wizardActions: WizardActions, defaultWizardActionStrategy: DefaultWizardActionStrategy, upgrade: UpgradeModule, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    ngOnInit(): void;
    private setupNavBar;
    private setupModal;
    private convertActionToButtonConf;
    private assignExternalController;
    private assignLegacyController;
    private assignAngularController;
    private get $controller();
}
