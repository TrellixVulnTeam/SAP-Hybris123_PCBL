/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { noop } from 'lodash';

import {
    AngularJSLazyDependenciesService,
    GenericEditorDropdownConfiguration,
    GenericEditorDropdownServiceFactory,
    GenericEditorField,
    IDropdownPopulator,
    IGenericEditorDropdownService,
    LogService,
    SystemEventService
} from 'smarteditcommons';

import { dataHelper } from 'testhelpers';
import {
    DropdownPopulatorFetchPageResponse,
    DropdownPopulatorInterface,
    DropdownPopulatorPagePayload,
    OptionsDropdownPopulator,
    UriDropdownPopulator
} from './populators';

describe('GenericEditorDropdownServiceFactory', () => {
    interface MockFetchPageResponse {
        someArray: any[];
    }

    class MockOptionsDropdownPopulator extends OptionsDropdownPopulator {
        constructor() {
            super(null, null);
        }
    }
    const optionsDropdownPopulator = new MockOptionsDropdownPopulator();

    class MockUriDropdownPopulator extends UriDropdownPopulator {
        constructor() {
            super(null, null, null);
        }
    }
    const uriDropdownPopulator = new MockUriDropdownPopulator();

    class CustomPropertyTypeAngularJsDropdownPopulator extends DropdownPopulatorInterface {}
    class CustomPropertyTypeDropdownPopulator extends DropdownPopulatorInterface {}
    const customPropertyTypeDropdownPopulator = new CustomPropertyTypeDropdownPopulator(null, null);

    class CMSItemDropdownDropdownPopulator extends DropdownPopulatorInterface {}
    const cMSItemDropdownDropdownPopulator = new CMSItemDropdownDropdownPopulator(null, null);

    class CmpTypecategoryDropdownPopulator extends DropdownPopulatorInterface {}
    const cmpTypecategoryDropdownPopulator = new CmpTypecategoryDropdownPopulator(null, null);

    class CmpTypeDropdownPopulator extends DropdownPopulatorInterface {}
    const cmpTypeDropdownPopulator = new CmpTypeDropdownPopulator(null, null);

    const mockOptions = [
        {
            id: 'id1',
            label: 'label1 - sample'
        },
        {
            id: 'id2',
            label: 'label2 - sample option'
        },
        {
            id: 'id3',
            label: 'label3 - option'
        }
    ];

    const mockSitesPage1 = [
        {
            id: 'site1',
            label: 'Site1'
        },
        {
            id: 'site2',
            label: 'Site2'
        },
        {
            id: 'site3',
            label: 'Site3'
        },
        {
            id: 'site4',
            label: 'Site4'
        },
        {
            id: 'site5',
            label: 'Site5'
        },
        {
            id: 'site6',
            label: 'Site6'
        },
        {
            id: 'site7',
            label: 'Site7'
        },
        {
            id: 'site8',
            label: 'Site8'
        },
        {
            id: 'site9',
            label: 'Site9'
        },
        {
            id: 'site10',
            label: 'Site10'
        }
    ];
    const mockSitesPage2 = [
        {
            id: 'site11',
            label: 'Site11'
        },
        {
            id: 'site12',
            label: 'Site12'
        },
        {
            id: 'site13',
            label: 'Site13'
        },
        {
            id: 'site14',
            label: 'Site14'
        },
        {
            id: 'site15',
            label: 'Site15'
        },
        {
            id: 'site16',
            label: 'Site16'
        },
        {
            id: 'site17',
            label: 'Site17'
        },
        {
            id: 'site18',
            label: 'Site18'
        },
        {
            id: 'site19',
            label: 'Site19'
        },
        {
            id: 'site20',
            label: 'Site20'
        }
    ];
    const mockSites = [...mockSitesPage1, ...mockSitesPage2];

    // options
    const fieldWithOptions: GenericEditorField = {
        cmsStructureType: 'EditableDropdown',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.dropdownA.name',
        options: [],
        smarteditComponentType: 'componentX'
    };

    // uri
    const fieldWithUri: GenericEditorField = {
        cmsStructureType: 'EditableDropdown',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.dropdownA.name',
        uri: '/someuri',
        smarteditComponentType: 'componentX'
    };

    const fieldWithDependsOn: GenericEditorField = {
        cmsStructureType: 'EditableDropdown',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.dropdownA.name',
        uri: '/someuri',
        dependsOn: 'dropdown1,dropdown2',
        smarteditComponentType: 'componentX'
    };

    // no populator
    const fieldWithNoneNoPopulator: GenericEditorField = {
        cmsStructureType: 'EditableDropdown',
        qualifier: 'dropdownX',
        i18nKey: 'type.thesmarteditComponentType.dropdownA.name',
        smarteditComponentType: 'componentY'
    };

    // uri & options
    const fieldWithBoth: GenericEditorField = {
        cmsStructureType: 'EditableDropdown',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.dropdownA.name',
        uri: '/someuri',
        options: [],
        smarteditComponentType: 'componentX'
    };

    // propertyType
    const fieldWithPropertyTypeAngularJs: GenericEditorField = {
        cmsStructureType: 'SingleProductSelector',
        propertyType: 'customPropertyTypeAngularJs',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.product.name',
        required: true
    };
    const fieldWithPropertyType: GenericEditorField = {
        cmsStructureType: 'SingleProductSelector',
        propertyType: 'customPropertyType',
        qualifier: 'dropdownA',
        i18nKey: 'type.thesmarteditComponentType.product.name',
        required: true
    };

    // structureType
    const fieldWithStructureTypeAngularJs: GenericEditorField = {
        cmsStructureType: 'CMSItemDropdownAngularJs',
        qualifier: 'cmsItemDropdown'
    };
    const fieldWithStructureType: GenericEditorField = {
        cmsStructureType: 'CMSItemDropdown',
        qualifier: 'cmsItemDropdown'
    };

    // smarteditComponentType + qualifier
    const fieldWithSmarteditComponentTypeAndQualifierAngularJs: GenericEditorField = {
        cmsStructureType: null,
        smarteditComponentType: 'CmpTypeAngularJs',
        qualifier: 'category'
    };
    const fieldWithSmareditComponentTypeDowngradedService: GenericEditorField = {
        cmsStructureType: null,
        smarteditComponentType: 'CmpTypeDowngraded',
        qualifier: 'category'
    };
    const fieldWithSmarteditComponentTypeAndQualifier: GenericEditorField = {
        cmsStructureType: null,
        smarteditComponentType: 'CmpType',
        qualifier: 'category'
    };

    // smarteditComponentType
    const fieldWithSmarteditComponentTypeAngularJs: GenericEditorField = {
        cmsStructureType: null,
        smarteditComponentType: 'CmpTypeAngularJs',
        qualifier: null
    };
    const fieldWithSmarteditComponentType: GenericEditorField = {
        cmsStructureType: null,
        smarteditComponentType: 'CmpType',
        qualifier: null
    };

    const conf: GenericEditorDropdownConfiguration = {
        field: null,
        model: {
            dropdown1: '1',
            dropdown2: '2',
            dropdownA: 'id1'
        },
        qualifier: 'dropdownA',
        id: new Date().valueOf().toString(10)
    };

    let mockProviders: {
        uriDropdownPopulator: typeof uriDropdownPopulator;
        optionsDropdownPopulator: typeof optionsDropdownPopulator;
        customPropertyTypeAngularJsDropdownPopulator: typeof customPropertyTypeAngularJsDropdownPopulator;
        CMSItemDropdownAngularJsDropdownPopulator: typeof structureTypeDropdownPopulator;
        CmpTypeAngularJscategoryDropdownPopulator: typeof smarteditComponentTypeWithQualifierDropdownPopulator;
        cmpTypeDowngradedcategoryDropdownPopulator: typeof smarteditComponentTypeDowngradedServiceDropdownPopulator;
        CmpTypeAngularJsDropdownPopulator: typeof smarteditComponentTypeDropdownPopulator;
        componentYdropdownADropdownPopulator: typeof componentYdropdownADropdownPopulator;
        componentXDropdownPopulator: typeof componentXDropdownPopulator;
    };
    type MockProvidersKeys = keyof typeof mockProviders;

    const mockCustomDropdownPopulators: DropdownPopulatorInterface[] = [
        customPropertyTypeDropdownPopulator,
        cMSItemDropdownDropdownPopulator,
        cmpTypecategoryDropdownPopulator,
        cmpTypeDropdownPopulator
    ];

    let $injector: jasmine.SpyObj<angular.auto.IInjectorService>;
    let GenericEditorDropdownService: new (
        conf: GenericEditorDropdownConfiguration
    ) => IGenericEditorDropdownService;

    let customPropertyTypeAngularJsDropdownPopulator: jasmine.SpyObj<CustomPropertyTypeAngularJsDropdownPopulator>;
    let structureTypeDropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;
    let smarteditComponentTypeWithQualifierDropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;
    let smarteditComponentTypeDowngradedServiceDropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;
    let smarteditComponentTypeDropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;

    let componentXDropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;
    let componentYdropdownADropdownPopulator: jasmine.SpyObj<IDropdownPopulator>;
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let lazyDependenciesService: jasmine.SpyObj<AngularJSLazyDependenciesService>;
    beforeEach(() => {
        // Mocks
        spyOn(uriDropdownPopulator, 'fetchAll').and.returnValue(Promise.resolve(mockOptions));
        spyOn(uriDropdownPopulator, 'fetchPage').and.callFake(
            (payload: DropdownPopulatorPagePayload) => {
                const { currentPage, pageSize } = payload;

                const results = dataHelper.getFetchPageResults(mockSites, currentPage, pageSize);
                const response: MockFetchPageResponse = {
                    someArray: results
                };
                return Promise.resolve(response);
            }
        );

        // AngularJs Mocks
        customPropertyTypeAngularJsDropdownPopulator = jasmine.createSpyObj(
            'customPropertyTypeAngularJsDropdownPopulator',
            ['fetchAll']
        );

        structureTypeDropdownPopulator = jasmine.createSpyObj('structureTypeDropdownPopulator', [
            'fetchAll'
        ]);

        smarteditComponentTypeWithQualifierDropdownPopulator = jasmine.createSpyObj(
            'smarteditComponentTypeWithQualifierDropdownPopulator',
            ['fetchAll']
        );

        smarteditComponentTypeDowngradedServiceDropdownPopulator = jasmine.createSpyObj(
            'smarteditComponentTypeDowngradedServiceDropdownPopulator',
            ['fetchAll']
        );

        smarteditComponentTypeDropdownPopulator = jasmine.createSpyObj(
            'smarteditComponentTypeDropdownPopulator',
            ['fetchAll']
        );

        componentYdropdownADropdownPopulator = jasmine.createSpyObj(
            'componentYdropdownADropdownPopulator',
            ['fetchAll']
        );
        componentYdropdownADropdownPopulator.fetchAll.and.returnValue(mockOptions);

        componentXDropdownPopulator = jasmine.createSpyObj('componentXDropdownPopulator', [
            'fetchAll'
        ]);

        componentXDropdownPopulator.fetchAll.and.returnValue(mockOptions);

        mockProviders = {
            uriDropdownPopulator,
            optionsDropdownPopulator,
            customPropertyTypeAngularJsDropdownPopulator,
            CMSItemDropdownAngularJsDropdownPopulator: structureTypeDropdownPopulator,
            CmpTypeAngularJscategoryDropdownPopulator: smarteditComponentTypeWithQualifierDropdownPopulator,
            CmpTypeAngularJsDropdownPopulator: smarteditComponentTypeDropdownPopulator,
            cmpTypeDowngradedcategoryDropdownPopulator: smarteditComponentTypeDowngradedServiceDropdownPopulator,
            componentYdropdownADropdownPopulator,
            componentXDropdownPopulator
        };

        // $injector
        const getProvider = (provider: MockProvidersKeys) => mockProviders[provider];
        const hasProvider = (provider: MockProvidersKeys) =>
            [
                'customPropertyTypeAngularJsDropdownPopulator',
                'CMSItemDropdownAngularJsDropdownPopulator',
                'CmpTypeAngularJscategoryDropdownPopulator',
                'cmpTypeDowngradedcategoryDropdownPopulator',
                'CmpTypeAngularJsDropdownPopulator',
                'componentYdropdownADropdownPopulator',
                'componentXDropdownPopulator'
            ].includes(provider);
        $injector = jasmine.createSpyObj('$injector', ['get', 'has']);
        $injector.get.and.callFake(getProvider);
        $injector.has.and.callFake(hasProvider);

        lazyDependenciesService = jasmine.createSpyObj('lazyDependenciesService', ['$injector']);
        lazyDependenciesService.$injector.and.returnValue($injector);

        systemEventService = jasmine.createSpyObj('systemEventService', [
            'subscribe',
            'publishAsync'
        ]);

        GenericEditorDropdownService = GenericEditorDropdownServiceFactory(
            lazyDependenciesService,
            new LogService(),
            'LinkedDropdown',
            'ClickDropdown',
            'DropdownPopulator',
            systemEventService,
            optionsDropdownPopulator,
            uriDropdownPopulator,
            mockCustomDropdownPopulators
        );
    });

    it('DropdownService initializes fine', () => {
        const dropdownService = new GenericEditorDropdownService({
            ...conf,
            field: fieldWithNoneNoPopulator
        });

        expect(dropdownService.field).toEqual(fieldWithNoneNoPopulator);
        expect(dropdownService.model).toEqual(conf.model);
        expect(dropdownService.qualifier).toEqual(conf.qualifier);
    });

    describe('init', () => {
        it(
            'GIVEN DropdownService is initialized WHEN the field object has both options and uri attributes ' +
                'THEN it throws an error',
            () => {
                const dropdownService = new GenericEditorDropdownService({
                    ...conf,
                    field: fieldWithBoth
                });

                expect(() => {
                    return dropdownService.init();
                }).toThrow(new Error('se.dropdown.contains.both.uri.and.options'));
            }
        );

        it(
            'GIVEN DropdownService is initialized WHEN the field object has "dependsOn" attribute ' +
                'THEN init method must register an event',
            () => {
                const dropdownService = new GenericEditorDropdownService({
                    ...conf,
                    field: fieldWithDependsOn
                });

                spyOn(dropdownService as any, '_respondToChange').and.returnValue(undefined);

                dropdownService.init();

                expect(systemEventService.subscribe).toHaveBeenCalledWith(
                    conf.id + 'LinkedDropdown',
                    jasmine.any(Function)
                );
                const respondToChangeCallback = systemEventService.subscribe.calls.argsFor(0)[1];
                respondToChangeCallback();
                expect((dropdownService as any)._respondToChange).toHaveBeenCalled();
            }
        );
    });

    it(
        'GIVEN DropdownService is initialized WHEN fetchAll is called THEN ' +
            'the respective populator is called with the correct payload',
        async () => {
            // GIVEN
            const searchKey = 'sample';
            const selection = {
                a: 'b'
            };

            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithUri
            });

            const searchResult = mockOptions.filter((option) =>
                option.label.toUpperCase().includes(searchKey.toUpperCase())
            );
            uriDropdownPopulator.fetchAll = jasmine
                .createSpy()
                .and.returnValue(Promise.resolve(searchResult));
            dropdownService.init();
            dropdownService.selection = selection;

            // WHEN
            await dropdownService.fetchAll(searchKey);

            // THEN
            expect(uriDropdownPopulator.fetchAll).toHaveBeenCalledWith({
                field: fieldWithUri,
                model: conf.model,
                search: searchKey,
                selection
            });
            expect(dropdownService.items).toEqual([
                {
                    id: 'id1',
                    label: 'label1 - sample'
                },
                {
                    id: 'id2',
                    label: 'label2 - sample option'
                }
            ]);
        }
    );

    it(
        'GIVEN DropdownService is initialized WHEN triggerAction is called THEN ' +
            'publishAsync method is called with correct attributes',
        async () => {
            // GIVEN
            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithUri
            });

            dropdownService.init();

            // WHEN
            await dropdownService.fetchAll();
            dropdownService.triggerAction();

            // THEN
            const eventId = conf.id + 'LinkedDropdown';
            expect(systemEventService.publishAsync).toHaveBeenCalledWith(eventId, {
                qualifier: conf.qualifier,
                optionObject: {
                    id: 'id1',
                    label: 'label1 - sample'
                }
            });
        }
    );

    it(
        'GIVEN DropdownService is initialized WHEN _respondToChange is called AND if the fields dependsOn does not match the input qualifier ' +
            'THEN then reset should not be called (nothing happens)',
        () => {
            // GIVEN
            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithUri
            });
            dropdownService.reset = noop;
            spyOn(dropdownService, 'reset');
            dropdownService.init();

            // WHEN
            const changeObject = {
                id: 'id1',
                label: 'label1 - sample'
            };
            (dropdownService as any)._respondToChange(conf.qualifier, changeObject);

            // THEN
            expect(dropdownService.reset).not.toHaveBeenCalled();
        }
    );

    it(
        'GIVEN DropdownService is initialized WHEN _respondToChange is called AND if the fields dependsOn matches the input qualifier ' +
            'THEN then reset is called on the child component and a selection is made ready for the next refresh',
        () => {
            // GIVEN
            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithDependsOn
            });

            dropdownService.reset = noop;
            spyOn(dropdownService, 'reset');
            dropdownService.init();

            // WHEN
            const changeObject = {
                qualifier: 'dropdown1',
                optionObject: {}
            };
            (dropdownService as any)._respondToChange('SomeKey', changeObject);

            // THEN
            expect(dropdownService.reset).toHaveBeenCalled();
            expect((dropdownService as any).selection).toBe(changeObject.optionObject);
        }
    );

    describe('GIVEN DropdownService is initialized with a field object THEN it should set respective Populator', () => {
        it(
            'GIVEN a field object that has the "options" attribute ' +
                'THEN the OptionsDropdownPopulator populator will be set',
            () => {
                // GIVEN
                const dropdownService = new GenericEditorDropdownService({
                    field: fieldWithOptions,
                    qualifier: undefined,
                    model: undefined,
                    id: undefined
                });

                // WHEN
                dropdownService.init();

                // THEN
                expect(dropdownService.populator).toEqual(optionsDropdownPopulator);
                expect(dropdownService.isPaged).toBe(false);
            }
        );

        it(
            'GIVEN a field object that has the "uri" attribute ' +
                'THEN the UriDropdownPopulator populator will be set',
            () => {
                // GIVEN
                const dropdownService = new GenericEditorDropdownService({
                    field: fieldWithUri,
                    qualifier: undefined,
                    model: undefined,
                    id: undefined
                });
                const isFieldPagedSpy = spyOn<any>(dropdownService, '_isFieldPaged');

                // WHEN
                dropdownService.init();

                // THEN
                expect(dropdownService.populator).toEqual(uriDropdownPopulator);
                expect(isFieldPagedSpy).toHaveBeenCalled();
            }
        );

        describe(
            'GIVEN a field object that has a "propertyType" attribute ' +
                'THEN the respective populator will be set',
            () => {
                it('AngularJS', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithPropertyTypeAngularJs,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(
                        mockProviders.customPropertyTypeAngularJsDropdownPopulator
                    );
                });

                it('Angular', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithPropertyType,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });
                    const isPopulatorPagedSpy = spyOn<any>(dropdownService, 'isPopulatorPaged');

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(customPropertyTypeDropdownPopulator);
                    expect(isPopulatorPagedSpy).toHaveBeenCalled();
                });
            }
        );

        describe(
            'GIVEN a field object that has "cmsStructureType" attribute ' +
                'THEN the respective populator will be set',
            () => {
                it('AngularJS', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithStructureTypeAngularJs,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(
                        mockProviders.CMSItemDropdownAngularJsDropdownPopulator
                    );
                });

                it('Angular', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithStructureType,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });
                    const isFieldPagedSpy = spyOn<any>(dropdownService, '_isFieldPaged');

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(cMSItemDropdownDropdownPopulator);
                    expect(isFieldPagedSpy).toHaveBeenCalled();
                });
            }
        );

        describe(
            'GIVEN a field object that has "smarteditComponentType" and "qualifier" attribute ' +
                'THEN the respective populator will be set',
            () => {
                it('AngularJS', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithSmarteditComponentTypeAndQualifierAngularJs,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(
                        mockProviders.CmpTypeAngularJscategoryDropdownPopulator
                    );
                });

                it('AngularJS for Downgraded Service', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithSmareditComponentTypeDowngradedService,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(
                        mockProviders.cmpTypeDowngradedcategoryDropdownPopulator
                    );
                });

                it('Angular', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithSmarteditComponentTypeAndQualifier,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });
                    const isPopulatorPagedSpy = spyOn<any>(dropdownService, 'isPopulatorPaged');

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(cmpTypecategoryDropdownPopulator);
                    expect(isPopulatorPagedSpy).toHaveBeenCalled();
                });
            }
        );

        describe(
            'GIVEN a field object that has "smarteditComponentType" and has no "qualifier" attribute ' +
                'THEN the respective populator will be set',
            () => {
                it('AngularJS', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithSmarteditComponentTypeAngularJs,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(
                        mockProviders.CmpTypeAngularJsDropdownPopulator
                    );
                });

                it('Angular', () => {
                    // GIVEN
                    const dropdownService = new GenericEditorDropdownService({
                        field: fieldWithSmarteditComponentType,
                        qualifier: undefined,
                        model: undefined,
                        id: undefined
                    });
                    const isPopulatorPagedSpy = spyOn<any>(dropdownService, 'isPopulatorPaged');

                    // WHEN
                    dropdownService.init();

                    // THEN
                    expect(dropdownService.populator).toEqual(cmpTypeDropdownPopulator);
                    expect(isPopulatorPagedSpy).toHaveBeenCalled();
                });
            }
        );
    });

    describe('fetchPage', () => {
        it('GIVEN DropdownService is initialized WHEN fetchPage is called THEN it retrieves and returns the result with the right format', async () => {
            // GIVEN
            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithUri
            });
            dropdownService.init();

            // WHEN
            const page1 = await dropdownService.fetchPage('', 10, 0);

            // THEN
            const firstItem = (page1 as DropdownPopulatorFetchPageResponse).results[0];
            expect(firstItem.id).toEqual('site1');
        });

        it('GIVEN DropdownService is initialized WHEN fetchPage is called THEN it should add the result items to the items array', async () => {
            // GIVEN
            const dropdownService = new GenericEditorDropdownService({
                ...conf,
                field: fieldWithUri
            });
            dropdownService.init();

            // WHEN
            const pageSize = 10;
            const page1 = (await dropdownService.fetchPage(
                '',
                pageSize,
                0
            )) as DropdownPopulatorFetchPageResponse;
            const firstItem = page1.results[0];

            // THEN
            expect(firstItem.id).toEqual('site1');
            expect(page1.results.length).toEqual(10);

            // WHEN
            const page2 = (await dropdownService.fetchPage(
                '',
                pageSize,
                1
            )) as DropdownPopulatorFetchPageResponse;
            const page2FirstItem = page2.results[0];

            // THEN
            expect(page2FirstItem.id).toEqual('site11');
            expect(page2.results.length).toEqual(10);

            expect((dropdownService as any).items.length).toEqual(20);
        });
    });
});
