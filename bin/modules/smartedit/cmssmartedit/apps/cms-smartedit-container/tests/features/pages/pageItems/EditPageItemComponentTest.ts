/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { EditPageItemComponent } from 'cmssmarteditcontainer/components/pages/pageItems/editPageItem/EditPageItemComponent';
import { PageInfoMenuService } from 'cmssmarteditcontainer/components/pages/services';
import { IDropdownMenuItemData } from 'smarteditcommons';

describe('EditPageItemComponent', () => {
    let component: EditPageItemComponent;

    let pageInfoMenuService: PageInfoMenuService;
    let dropdownMenuData: IDropdownMenuItemData;

    const mockPageInfo = {
        name: 'MOCKED_PAGE_INFO_UID',
        typeCode: 'pageTypeCode'
    } as ICMSPage;

    beforeEach(() => {
        pageInfoMenuService = jasmine.createSpyObj('pageInfoMenuService', ['openPageEditor']);

        dropdownMenuData = {
            dropdownItem: {},
            selectedItem: mockPageInfo
        };

        component = new EditPageItemComponent(dropdownMenuData, pageInfoMenuService);
    });

    it('WHEN initialized THEN it should set edit page permissions', () => {
        component.ngOnInit();

        expect(component.editPagePermission).toEqual([
            {
                names: ['se.edit.page.type'],
                context: {
                    typeCode: 'pageTypeCode'
                }
            },
            {
                names: ['se.act.on.page.in.workflow'],
                context: {
                    pageInfo: mockPageInfo
                }
            }
        ]);
    });

    it('onClickOnEdit - sends an event when the page edition is resolved', () => {
        component.ngOnInit();
        component.onClickOnEdit();

        expect(pageInfoMenuService.openPageEditor).toHaveBeenCalledWith(component.pageInfo);
    });
});
