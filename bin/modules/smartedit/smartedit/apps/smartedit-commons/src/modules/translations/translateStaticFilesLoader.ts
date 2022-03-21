/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ITranslationsFetchService, TranslationMap } from '@smart/utils';
import * as angular from 'angular';

/*
 * This custom implementations of $translateStaticFilesLoader needed by 'pascalprecht.translate' package leverages
 * our restServiceFactory as opposed to httpClient in order to proxy the i18n loading to the container.
 * This is required for our cross-origin compliancy
 */
export function $translateStaticFilesLoader(
    $q: angular.IQService,
    translationsFetchService: ITranslationsFetchService
): (option: { key: string }) => angular.IPromise<TranslationMap> {
    'ngInject';
    return (options: { key: string }): angular.IPromise<TranslationMap> =>
        $q.when(translationsFetchService.get(options.key));
}
