/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { ClonePageWizardService } from 'cmssmarteditcontainer/components/pages/clonePageWizard';
import { ClonePageItemComponent } from 'cmssmarteditcontainer/components/pages/pageItems/clonePageItem/ClonePageItemComponent';
import { IDropdownMenuItemData } from 'smarteditcommons';

describe('ClonePageItemComponent', () => {
    let component: ClonePageItemComponent;
    let clonePageWizardService: ClonePageWizardService;
    let dropdownMenuData: IDropdownMenuItemData;

    const mockPageInfo = {
        name: 'MOCKED_PAGE',
        typeCode: 'typeCode'
    } as ICMSPage;

    beforeEach(() => {
        clonePageWizardService = jasmine.createSpyObj('clonePageWizardService', [
            'openClonePageWizard'
        ]);

        dropdownMenuData = {
            dropdownItem: {},
            selectedItem: mockPageInfo
        };

        component = new ClonePageItemComponent(dropdownMenuData, clonePageWizardService);
    });

    it('WHEN initialized THEN it should set clone permissions', () => {
        component.ngOnInit();

        expect(component.clonePagePermission).toEqual([
            {
                names: ['se.clone.page.type'],
                context: {
                    typeCode: 'typeCode'
                }
            }
        ]);
    });

    it("GIVEN component is initialized THEN it calls clonePageWizardService to display a 'clone page' wizard", () => {
        component.ngOnInit();
        component.onClickOnClone();

        expect(clonePageWizardService.openClonePageWizard).toHaveBeenCalledWith(mockPageInfo);
    });
});
