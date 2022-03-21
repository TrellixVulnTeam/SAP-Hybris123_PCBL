import { TypedMap } from '@smart/utils';
import { L10nPipeFilterFn } from '../../pipes/l10n/L10nPipe';
import { CrossFrameEventService } from '../crossFrame/CrossFrameEventService';
import { LanguageService } from '../language/LanguageService';
export interface L10nFilterFn extends L10nPipeFilterFn {
    $stateful: boolean;
}
export declare function setupL10nFilter(languageService: LanguageService, crossFrameEventService: CrossFrameEventService): (localizedMap: TypedMap<string> | string) => string;
/**
 * **Deprecated since 2005, use {@link L10nPipe}.**
 *
 * Filter that accepts a localized map as input and returns the value corresponding to the resolvedLocale of {@link SmarteditCommonsModule} and defaults to the first entry.
 *
 * This class serves as an interface and should be extended, not instantiated.
 *
 * ### Parameters
 *
 * `l10n` - localizedMap the map of language isocodes / values
 *
 * @deprecated
 */
export declare class L10nFilter {
    static transform(languageService: LanguageService, crossFrameEventService: CrossFrameEventService): (localizedMap: TypedMap<string> | string) => TypedMap<string> | string;
}
