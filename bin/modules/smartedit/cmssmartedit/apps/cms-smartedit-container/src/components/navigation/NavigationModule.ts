/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    DropdownMenuModule,
    L10nPipeModule,
    NgTreeModule,
    TooltipModule,
    TranslationModule
} from 'smarteditcommons';

import { ToolbarModule } from 'smarteditcontainer';
import {
    BreadcrumbComponent,
    NavigationNodePickerComponent,
    NavigationNodePickerRenderComponent
} from '../legacyGenericEditor/navigationNode';
import { NavigationNodeSelectorComponent } from '../legacyGenericEditor/navigationNode/components/navigationNodeSelector/NavigationNodeSelectorComponent';
import { NavigationEditorLinkComponent } from './navigationEditor/NavigationEditorLinkComponent';
import { NavigationEditorNodeService } from './navigationEditor/NavigationEditorNodeService';
import { NavigationEditorTreeComponent } from './navigationEditor/NavigationEditorTreeComponent';
import { NavigationNodeComponent } from './navigationEditor/NavigationNodeComponent';
import { NodeAncestryService } from './navigationEditor/NodeAncestryService';
import { NavigationManagementPageComponent } from './NavigationManagementPageComponent';
import { NavigationNodeEditorModalService } from './navigationNodeEditor/NavigationNodeEditorModalService';

@NgModule({
    imports: [
        CommonModule,
        DropdownMenuModule,
        L10nPipeModule,
        TranslationModule.forChild(),
        NgTreeModule,
        TooltipModule,
        ToolbarModule
    ],
    declarations: [
        NavigationEditorTreeComponent,
        NavigationNodeComponent,
        NavigationEditorLinkComponent,
        BreadcrumbComponent,
        NavigationNodePickerComponent,
        NavigationNodePickerRenderComponent,
        NavigationNodeSelectorComponent,
        NavigationManagementPageComponent
    ],
    entryComponents: [
        NavigationEditorTreeComponent,
        NavigationNodeComponent,
        NavigationEditorLinkComponent,
        BreadcrumbComponent,
        NavigationNodePickerComponent,
        NavigationNodePickerRenderComponent,
        NavigationNodeSelectorComponent
    ],
    exports: [NavigationEditorTreeComponent],
    providers: [NodeAncestryService, NavigationEditorNodeService, NavigationNodeEditorModalService]
})
export class NavigationModule {}
