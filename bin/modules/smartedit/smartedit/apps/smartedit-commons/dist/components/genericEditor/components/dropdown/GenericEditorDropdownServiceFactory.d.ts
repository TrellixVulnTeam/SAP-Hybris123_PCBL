import { AngularJSLazyDependenciesService, LogService } from '../../../../services';
import { SystemEventService } from '../../../../services/SystemEventService';
import { DropdownPopulatorInterface, OptionsDropdownPopulator, UriDropdownPopulator } from './populators';
/**
 * The SEDropdownService handles the initialization and the rendering of the {@link SeDropdownComponent}.
 *
 * Resolves Custom Dropdown Populators in two ways:
 * - Angular - `CustomDropdownPopulatorsToken` Injection Token
 * - AngularJS - `$injector`
 */
export declare const GenericEditorDropdownServiceFactory: (lazyDependenciesService: AngularJSLazyDependenciesService, logService: LogService, LINKED_DROPDOWN: string, CLICK_DROPDOWN: string, DROPDOWN_IMPLEMENTATION_SUFFIX: string, systemEventService: SystemEventService, optionsDropdownPopulator: OptionsDropdownPopulator, uriDropdownPopulator: UriDropdownPopulator, customDropdownPopulators?: DropdownPopulatorInterface[]) => any;
