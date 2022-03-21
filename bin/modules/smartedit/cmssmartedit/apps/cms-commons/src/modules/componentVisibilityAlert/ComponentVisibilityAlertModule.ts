/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { TranslationModule } from 'smarteditcommons';
import { ComponentVisibilityAlertComponent } from './ComponentVisibilityAlertComponent';

@NgModule({
    imports: [TranslationModule.forChild()],
    declarations: [ComponentVisibilityAlertComponent],
    entryComponents: [ComponentVisibilityAlertComponent]
})
export class ComponentVisibilityAlertModule {}
