/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { AssetsService } from 'cmscommons';
import { TestModeService } from 'smarteditcommons';

describe('AssetsService', () => {
    let testModeService: jasmine.SpyObj<TestModeService>;

    let service: AssetsService;
    beforeEach(() => {
        testModeService = jasmine.createSpyObj<TestModeService>('testModeService', ['isE2EMode']);

        service = new AssetsService(testModeService);
    });

    it('GIVEN e2e mode THEN it returns test assets', () => {
        testModeService.isE2EMode.and.returnValue(true);

        expect(service.getAssetsRoot()).toBe('/web/webroot');
    });

    it('GIVEN non e2e mode (prod) THEN it returns prod assets', () => {
        testModeService.isE2EMode.and.returnValue(false);

        expect(service.getAssetsRoot()).toBe('/cmssmartedit');
    });
});
