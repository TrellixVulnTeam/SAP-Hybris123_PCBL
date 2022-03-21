import { ITranslationsFetchService, TranslationMap } from '@smart/utils';
import * as angular from 'angular';
export declare function $translateStaticFilesLoader($q: angular.IQService, translationsFetchService: ITranslationsFetchService): (option: {
    key: string;
}) => angular.IPromise<TranslationMap>;
