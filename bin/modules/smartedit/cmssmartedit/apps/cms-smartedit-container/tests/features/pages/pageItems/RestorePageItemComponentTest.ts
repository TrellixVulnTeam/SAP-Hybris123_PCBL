/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { RestorePageItemComponent } from 'cmssmarteditcontainer/components/pages/pageItems';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { IDropdownMenuItemData } from 'smarteditcommons';

describe('RestorePageItemComponent', () => {
    let component: RestorePageItemComponent;
    let managePageService: jasmine.SpyObj<ManagePageService>;
    let dropdownMenuData: IDropdownMenuItemData;

    const mockSelectedItem = { uid: 'some_uid', typeCode: 'typeCode' } as ICMSPage;

    beforeEach(() => {
        managePageService = jasmine.createSpyObj<ManagePageService>('managePageService', [
            'restorePage'
        ]);
        dropdownMenuData = {
            dropdownItem: {},
            selectedItem: mockSelectedItem
        };

        component = new RestorePageItemComponent(managePageService, dropdownMenuData);
    });

    describe('GIVEN component is initialized', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('THEN it should have page information and restore permissions', () => {
            expect(component.pageInfo).toEqual(mockSelectedItem);
            expect(component.restorePagePermission).toEqual([
                {
                    names: ['se.restore.page.type'],
                    context: {
                        typeCode: mockSelectedItem.typeCode
                    }
                }
            ]);
        });

        it('WHEN restore button is clicked THEN should restore page', () => {
            component.restorePage();

            expect(managePageService.restorePage).toHaveBeenCalledWith(mockSelectedItem);
        });
    });
});
