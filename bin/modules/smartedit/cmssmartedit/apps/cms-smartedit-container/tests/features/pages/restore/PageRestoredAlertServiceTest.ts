/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import {
    ActionableAlertService,
    PageRestoredAlertService
} from 'cmssmarteditcontainer/services/actionableAlert';
import { ICatalogService, ICatalogVersion, functionsUtils } from 'smarteditcommons';

describe('PageRestoredAlertService', () => {
    let service: PageRestoredAlertService;
    let catalogService: jasmine.SpyObj<ICatalogService>;
    let actionableAlertService: jasmine.SpyObj<ActionableAlertService>;

    const mockPageInfo = {
        catalogVersion: 'catalogVersion',
        homepage: false
    } as ICMSPage;
    const mockCatalogVersion = {
        active: true,
        uuid: 'uuid',
        version: 'version'
    } as ICatalogVersion;

    beforeEach(() => {
        catalogService = jasmine.createSpyObj<ICatalogService>('catalogService', [
            'getCatalogVersionByUuid'
        ]);
        actionableAlertService = jasmine.createSpyObj<ActionableAlertService>(
            'actionableAlertService',
            ['displayActionableAlert']
        );

        catalogService.getCatalogVersionByUuid.and.returnValue(Promise.resolve(mockCatalogVersion));

        service = new PageRestoredAlertService(catalogService, actionableAlertService);
    });

    describe('GIVEN displayActionableAlert is called', () => {
        it('WHEN pageInfo is not provided THEN it should throw an error', async () => {
            try {
                await service.displayPageRestoredSuccessAlert(null);

                functionsUtils.assertFail();
            } catch (e) {
                expect(e.message).toEqual('[pageRestoredAlertService] - page info not provided.');
            }
        });

        it('WHEN pageInfo is provided THEN it should call catalogService to get catalogVersion and actionableAlertService to display alert', async () => {
            await service.displayPageRestoredSuccessAlert(mockPageInfo);

            expect(catalogService.getCatalogVersionByUuid).toHaveBeenCalledWith('catalogVersion');
            expect(actionableAlertService.displayActionableAlert).toHaveBeenCalledWith(
                {
                    component: jasmine.any(Function),
                    data: {
                        catalogVersion: mockCatalogVersion,
                        pageInfo: mockPageInfo
                    }
                },
                'SUCCESS'
            );
        });
    });
});
