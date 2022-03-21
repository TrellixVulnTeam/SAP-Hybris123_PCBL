/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TypedMap } from '@smart/utils';
import { SeFilter } from 'smarteditcommons/di/SeFilter';
import { SWITCH_LANGUAGE_EVENT } from 'smarteditcommons/utils/smarteditconstants';
import { getLocalizedFilterFn, L10nPipeFilterFn } from '../../pipes/l10n/L10nPipe';
import { CrossFrameEventService } from '../crossFrame/CrossFrameEventService';
import { LanguageService } from '../language/LanguageService';

export interface L10nFilterFn extends L10nPipeFilterFn {
    $stateful: boolean;
}

/**
 * @internal
 * @ignore
 */
function getInitialFilterFn(): L10nFilterFn {
    return ((str: TypedMap<string> | string): TypedMap<string> | string => str) as L10nFilterFn;
}

export function setupL10nFilter(
    languageService: LanguageService,
    crossFrameEventService: CrossFrameEventService
): (localizedMap: TypedMap<string> | string) => string {
    let l10n: L10nFilterFn;

    async function prepareFilter(): Promise<void> {
        l10n = getInitialFilterFn();
        l10n.$stateful = false;

        const resolvedLanguage = await languageService.getResolveLocaleIsoCode();
        l10n = getLocalizedFilterFn(resolvedLanguage) as L10nFilterFn;
        l10n.$stateful = false;
    }
    prepareFilter();

    crossFrameEventService.subscribe(SWITCH_LANGUAGE_EVENT, prepareFilter);

    return (localizedMap: TypedMap<string> | string): string => l10n(localizedMap);
}

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
@SeFilter()
export class L10nFilter {
    public static transform(
        languageService: LanguageService,
        crossFrameEventService: CrossFrameEventService
    ): (localizedMap: TypedMap<string> | string) => TypedMap<string> | string {
        'ngInject';

        return setupL10nFilter(languageService, crossFrameEventService);
    }
}
