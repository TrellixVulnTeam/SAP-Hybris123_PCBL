/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from 'smarteditcommons';
import { GenericEditorWidgetsModule } from './legacyGenericEditor';
import { CategorySelectorComponent, ProductSelectorComponent } from './legacyGenericEditor/catalog';
import { LegacyNavigationModule } from './navigation/legacyNavigationModule';

// Note: This should be moved to the restriction component once it is moved to TypeScript.
import './restrictions/restrictions.scss';

/**
 * @ngdoc overview
 * @name cmsSmarteditComponentsModule
 *
 * @description
 * Module containing all the components defined within the CmsSmartEdit container.
 */
@SeModule({
    imports: [GenericEditorWidgetsModule, LegacyNavigationModule, 'catalogAwareSelectorModule'],
    declarations: [ProductSelectorComponent, CategorySelectorComponent]
})
export class CmsSmarteditComponentsModule {}
