/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';

import { YSelectModule } from './directives';

/*
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditCommonsModule
 *
 * IMPORTANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* @internal */
export function deprecatedSince1811(): void {
    angular.module('permissionServiceInterfaceModule', ['legacySmarteditCommonsModule']);
    angular.module('FetchDataHandlerInterfaceModule', ['genericEditorServicesModule']);
    angular.module('fetchEnumDataHandlerModule', ['genericEditorServicesModule']);
    angular.module('dateFormatterModule', ['dateTimePickerModule']);
    angular.module('DropdownPopulatorInterface', ['dropdownPopulatorModule']);
    angular.module('optionsDropdownPopulatorModule', ['dropdownPopulatorModule']);
    angular.module('uriDropdownPopulatorModule', ['dropdownPopulatorModule']);
    angular.module('editorFieldMappingServiceModule', ['genericEditorServicesModule']);
    angular.module('genericEditorStackServiceModule', ['genericEditorServicesModule']);
    angular.module('genericEditorTabServiceModule', ['genericEditorServicesModule']);
    angular.module('seValidationMessageParserModule', ['genericEditorServicesModule']);
    angular.module('seGenericEditorFieldMessagesModule', ['genericEditorModule']);
    angular.module('genericEditorTabModule', ['genericEditorModule']);
    angular.module('genericEditorFieldModule', ['genericEditorModule']);
    angular.module('authorizationModule', ['legacySmarteditCommonsModule']);
}

export function deprecatedSince1905(): void {
    angular.module('smarteditCommonsModule', ['legacySmarteditCommonsModule']);
    angular.module('browserServiceModule', ['legacySmarteditCommonsModule']);
    angular.module('loadConfigModule', ['legacySmarteditCommonsModule']);
}

export function deprecatedSince2005(): void {
    angular.module('yDataTableModule', ['legacySmarteditCommonsModule']);
    angular.module('interceptorHelperModule', ['legacySmarteditCommonsModule']);
    angular.module('yjqueryModule', ['legacySmarteditCommonsModule']);
    angular.module('includeReplaceModule', ['legacySmarteditCommonsModule']);
    angular.module('timerModule', ['legacySmarteditCommonsModule']);
    angular.module('sliderPanelModule', ['legacySmarteditCommonsModule']);
    angular.module('toolbarInterfaceModule', ['legacySmarteditCommonsModule']);
    angular.module('yPaginationModule', ['legacySmarteditCommonsModule']);
    angular.module('paginationFilterModule', ['legacySmarteditCommonsModule']);
    angular.module('yActionableSearchItemModule', [YSelectModule.name]);
    angular.module('genericEditorServicesModule', ['legacySmarteditCommonsModule']);
    angular.module('hasOperationPermissionModule', ['legacySmarteditCommonsModule']);
    angular.module('dragAndDropServiceModule', ['legacySmarteditCommonsModule']);
    angular.module('recompileDomModule', ['legacySmarteditCommonsModule']);
    angular.module('yDropDownMenuModule', ['legacySmarteditCommonsModule']);
    angular.module('wizardServiceModule', ['legacySmarteditCommonsModule']);
    angular.module('yMessageModule', ['legacySmarteditCommonsModule']);
    angular.module('dynamicPagedListModule', ['legacySmarteditCommonsModule']);
    angular.module('commonsRestServiceModule', []);
}

export function deprecatedSince2105(): void {
    angular.module('dropdownPopulatorModule', []);
}

export const deprecate = (): void => {
    deprecatedSince1811();
    deprecatedSince1905();
    deprecatedSince2005();
    deprecatedSince2105();
};
