/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { ActionableAlertService } from 'cmssmarteditcontainer/services';
import { ClonePageAlertService } from 'cmssmarteditcontainer/services/actionableAlert/ClonePageAlertService';
import { ICatalogService, ICatalogVersion } from 'smarteditcommons';
describe('ClonePageAlertService', () => {
    let service: ClonePageAlertService;
    let actionableAlertService: jasmine.SpyObj<ActionableAlertService>;
    let catalogService: jasmine.SpyObj<ICatalogService>;

    const mockPageInfo = {
        catalogVersion: 'Online',
        uid: 'uid'
    } as ICMSPage;

    const mockCatalogVersion = {
        uuid: 'uuidCatalog',
        version: 'Online'
    } as ICatalogVersion;

    beforeEach(() => {
        actionableAlertService = jasmine.createSpyObj<ActionableAlertService>(
            'actionableAlertService',
            ['displayActionableAlert']
        );
        catalogService = jasmine.createSpyObj<ICatalogService>('catalogService', [
            'getCatalogVersionByUuid'
        ]);

        catalogService.getCatalogVersionByUuid.and.returnValue(Promise.resolve(mockCatalogVersion));

        service = new ClonePageAlertService(actionableAlertService, catalogService);
    });

    it('should get catalog version and call displayActionableAlert', async () => {
        await service.displayClonePageAlert(mockPageInfo);

        expect(catalogService.getCatalogVersionByUuid).toHaveBeenCalledWith('Online');

        expect(actionableAlertService.displayActionableAlert).toHaveBeenCalledWith({
            component: jasmine.any(Function),
            mousePersist: true,
            data: {
                catalogVersion: mockCatalogVersion,
                clonedPageInfo: mockPageInfo
            }
        });
    });
});
