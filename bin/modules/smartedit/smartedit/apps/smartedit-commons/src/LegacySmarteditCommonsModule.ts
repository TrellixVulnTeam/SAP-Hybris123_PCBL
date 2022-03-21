/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// eslint-disable-next-line import/order
import { deprecate } from './deprecate';
import './services/forcedImport';

// These modules do not support ES6 modules. Therefore, need special imports.
import 'ui-select/dist/select';

import {
    YEventMessageComponent,
    YInfiniteScrollingComponent,
    YMoreTextComponent
} from 'smarteditcommons/components';
import { SeModule } from 'smarteditcommons/di';
import { CompileHtmlLegacyDirective } from 'smarteditcommons/directives';
import { TranslationServiceModule } from 'smarteditcommons/modules/translations/translationServiceModule';

import { ConfigModule, L10nModule, LanguageServiceGateway } from 'smarteditcommons/services';
import { SmarteditRootModule } from 'smarteditcommons/services/SmarteditRootModule';
import { FunctionsModule } from 'smarteditcommons/utils/functionsModule';
import { LegacyHasOperationPermissionDirective } from './components/authorization/legacyHasOperationPermission';
import { YDropDownMenuComponent } from './components/dropdown/dropdownMenu';
import { LegacyDynamicPagedListComponent } from './components/dynamicPagedList';
import { StartFromFilter } from './components/pagination/startFromFilter';
import { YPaginationComponent } from './components/pagination/yPagination';
import { YSliderPanelComponent } from './components/sliderPanel';
import { YMessageComponent } from './components/yMessage/yMessage';
import { IncludeReplaceDirective } from './directives';
import { RecompileDomDirective } from './directives/recompileDom';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgSanitizeModule = require('angular-sanitize'); // Only supports CommonJS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgInfiniteScrollModule = require('ng-infinite-scroll'); // Only supports CommonJS

deprecate();

/**
 * Module containing all the services shared within the smartedit commons.
 */
@SeModule({
    imports: [
        SmarteditRootModule,
        FunctionsModule,
        NgInfiniteScrollModule,
        L10nModule,
        'resourceLocationsModule',
        'seConstantsModule',
        'yLoDashModule',
        TranslationServiceModule,
        ConfigModule,
        'ui.select',
        NgSanitizeModule
    ],
    providers: [LanguageServiceGateway],
    declarations: [
        CompileHtmlLegacyDirective,
        StartFromFilter,
        LegacyDynamicPagedListComponent,
        YPaginationComponent,
        YSliderPanelComponent,
        YInfiniteScrollingComponent,
        YEventMessageComponent,
        YMoreTextComponent,
        RecompileDomDirective,
        IncludeReplaceDirective,
        YDropDownMenuComponent,
        YMessageComponent,
        LegacyHasOperationPermissionDirective
    ]
})
export class LegacySmarteditCommonsModule {}
