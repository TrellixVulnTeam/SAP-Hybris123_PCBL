/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ActionableAlertComponent } from './components';
import { CmsitemsRestService, SynchronizationResourceService } from './dao';
import { ComponentVisibilityAlertModule, SynchronizationPanelModule } from './modules';
import { AssetsService } from './services/AssetsService';
import { AttributePermissionsRestService } from './services/AttributePermissionsRestService';
import { CMSTimeService } from './services/CMSTimeService';
import { ComponentService } from './services/ComponentService';
import { CMSModesService } from './services/modes/CMSModesService';
import { SynchronizationService } from './services/synchronizationService';
import { TypePermissionsRestService } from './services/TypePermissionsRestService';

@NgModule({
    imports: [
        TranslateModule.forChild(),
        SynchronizationPanelModule,
        ComponentVisibilityAlertModule
    ],
    providers: [
        AttributePermissionsRestService,
        CmsitemsRestService,
        CMSModesService,
        CMSTimeService,
        SynchronizationService,
        TypePermissionsRestService,
        ComponentService,
        SynchronizationResourceService,
        AssetsService
    ],
    declarations: [ActionableAlertComponent],
    exports: [ActionableAlertComponent, SynchronizationPanelModule, ComponentVisibilityAlertModule]
})
export class CmsCommonsModule {}
