/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TranslateService } from '@ngx-translate/core';
import { RestServiceFactory } from '@smart/utils';

import { LanguageService } from '../../../../../../services';
import { GenericEditorOption } from '../../../../types';
import { DropdownPopulatorPayload } from '../types';
import { UriDropdownPopulator } from './UriDropdownPopulator';

describe('UriDropdownPopulator', () => {
    const translateService = jasmine.createSpyObj<TranslateService>('translateService', [
        'instant'
    ]);
    translateService.instant.and.callFake((key: string) => key);

    const restServiceFactory = jasmine.createSpyObj<RestServiceFactory>('restServiceFactory', [
        'get'
    ]);

    const restServiceForOptions = jasmine.createSpyObj<RestServiceFactory>('restServiceFactory', [
        'get'
    ]);

    const languageService = jasmine.createSpyObj<LanguageService>('languageService', [
        'getResolveLocale'
    ]);

    let uriDropdownPopulator: UriDropdownPopulator;

    let mockPayload: DropdownPopulatorPayload;
    let mockOptions: GenericEditorOption[];
    beforeEach(() => {
        languageService.getResolveLocale.and.returnValue(Promise.resolve('en'));

        mockPayload = {
            field: {
                cmsStructureType: 'EditableDropdown',
                qualifier: 'dropdownA',
                i18nKey: 'theKey',
                idAttribute: 'uid',
                labelAttributes: ['label1', 'label2'],
                uri: '/someuri'
            },
            model: {
                dropdown1: '1',
                dropdown2: '2'
            },
            selection: null,
            search: null
        };

        mockOptions = [
            {
                id: '1',
                label: 'opt1-yes',
                dropdown1: '1',
                dropdown2: '1'
            },
            {
                id: '2',
                label: 'opt2-no',
                dropdown1: '1',
                dropdown2: '1'
            },
            {
                id: '3',
                label: 'opt3-yes-no',
                dropdown1: '1',
                dropdown2: '2'
            },
            {
                id: '4',
                label1: 'opt4-yes-no',
                dropdown1: '1',
                dropdown2: '2'
            },
            {
                id: '5',
                label2: 'opt5-yes',
                dropdown1: '1',
                dropdown2: '1'
            },
            {
                uid: '6',
                label: 'opt6-yes-no',
                dropdown1: '1',
                dropdown2: '2'
            }
        ];

        restServiceForOptions.get.and.callFake(
            (params: { dropdown1: string; dropdown2: string }) => {
                const filteredOptions = params
                    ? mockOptions.filter((option: GenericEditorOption) => {
                          return (
                              option.dropdown1 === params.dropdown1 &&
                              option.dropdown2 === params.dropdown2
                          );
                      })
                    : mockOptions;

                return Promise.resolve({
                    options: filteredOptions
                });
            }
        );

        restServiceFactory.get.and.returnValue(restServiceForOptions);

        uriDropdownPopulator = new UriDropdownPopulator(
            restServiceFactory,
            languageService,
            translateService
        );
    });

    it(
        'GIVEN uri populator is called WHEN I call fetchAll method without a dependsOn attribute ' +
            'THEN should return a promise by making a REST call to the uri in the fields attribute and return a list of options',
        async () => {
            const actual = await uriDropdownPopulator.fetchAll(mockPayload);

            expect(restServiceFactory.get).toHaveBeenCalledWith('/someuri');
            expect(restServiceForOptions.get).toHaveBeenCalled();

            expect(actual).toEqual(mockOptions);
        }
    );

    it(
        'GIVEN uri populator is called WHEN I call fetchAll method with a dependsOn attribute ' +
            'THEN should return a promise by making a REST call to the uri in the fields attribute with the right params ' +
            'AND return a list of options',
        async () => {
            mockPayload.field.dependsOn = 'dropdown1,dropdown2';
            const actual = await uriDropdownPopulator.fetchAll(mockPayload);

            expect(restServiceFactory.get).toHaveBeenCalledWith('/someuri');
            expect(restServiceForOptions.get).toHaveBeenCalledWith({
                dropdown1: '1',
                dropdown2: '2'
            });

            expect(actual).toEqual([
                {
                    id: '3',
                    label: 'opt3-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '4',
                    label: 'opt4-yes-no',
                    label1: 'opt4-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '6',
                    uid: '6',
                    label: 'opt6-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                }
            ]);
        }
    );

    it(
        'GIVEN uri populator is called WHEN I call fetchAll method with a search attribute ' +
            'THEN should return a promise by making a REST call to the uri in the fields attribute ' +
            'AND return a list of options filtered based on the search string',
        async () => {
            delete mockPayload.field.dependsOn;
            mockPayload.search = 'yes';
            const actual = await uriDropdownPopulator.fetchAll(mockPayload);

            expect(restServiceFactory.get).toHaveBeenCalledWith('/someuri');
            expect(restServiceForOptions.get).toHaveBeenCalled();

            expect(actual).toEqual([
                {
                    id: '1',
                    label: 'opt1-yes',
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    id: '3',
                    label: 'opt3-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '4',
                    label: 'opt4-yes-no',
                    label1: 'opt4-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '5',
                    label: 'opt5-yes',
                    label2: 'opt5-yes',
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    id: '6',
                    uid: '6',
                    label: 'opt6-yes-no',
                    dropdown1: '1',
                    dropdown2: '2'
                }
            ]);
        }
    );

    it(
        'GIVEN uri populator is called WHEN I call fetchAll method with a search attribute ' +
            'THEN should return a promise by making a REST call to the uri in the fields attribute ' +
            'AND return a list of localized options filtered based on the search string and language',
        async () => {
            mockOptions = [
                {
                    id: '1',
                    label: {
                        en: 'opt1-yes-en',
                        fr: 'opt1-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    id: '2',
                    label: {
                        en: 'opt2-no-en',
                        fr: 'opt2-no-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    id: '3',
                    label: {
                        en: 'opt3-yes-en',
                        fr: 'opt3-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '4',
                    label1: {
                        en: 'opt4-yes-en',
                        fr: 'opt4-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '5',
                    label2: {
                        en: 'opt5-yes-en',
                        fr: 'opt5-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    uid: '6',
                    label: {
                        en: 'opt6-yes-no-en',
                        fr: 'opt6-yes-no-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '2'
                }
            ];

            delete mockPayload.field.dependsOn;
            mockPayload.search = 'yes-en';
            const actual = await uriDropdownPopulator.fetchAll(mockPayload);

            expect(restServiceFactory.get).toHaveBeenCalledWith('/someuri');
            expect(restServiceForOptions.get).toHaveBeenCalled();

            expect(actual).toEqual([
                {
                    id: '1',
                    label: {
                        en: 'opt1-yes-en',
                        fr: 'opt1-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '1'
                },
                {
                    id: '3',
                    label: {
                        en: 'opt3-yes-en',
                        fr: 'opt3-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '2'
                },
                {
                    id: '4',
                    label1: {
                        en: 'opt4-yes-en',
                        fr: 'opt4-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '2',
                    label: {
                        en: 'opt4-yes-en',
                        fr: 'opt4-yes-fr'
                    }
                },
                {
                    id: '5',
                    label2: {
                        en: 'opt5-yes-en',
                        fr: 'opt5-yes-fr'
                    },
                    dropdown1: '1',
                    dropdown2: '1',
                    label: {
                        en: 'opt5-yes-en',
                        fr: 'opt5-yes-fr'
                    }
                }
            ]);
        }
    );
});
