/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef } from '@angular/core';
import {
    PageVersionSelectionService,
    VersionItemMenuComponent,
    RollbackPageVersionService,
    ManagePageVersionService
} from 'cmssmarteditcontainer/components/versioning';
import { IPermissionService } from 'smarteditcommons';

describe('VersionItemMenuComponent', () => {
    let managePageVersionService: jasmine.SpyObj<ManagePageVersionService>;
    let pageVersionSelectionService: jasmine.SpyObj<PageVersionSelectionService>;
    let rollbackPageVersionService: jasmine.SpyObj<RollbackPageVersionService>;
    let permissionService: jasmine.SpyObj<IPermissionService>;

    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('changeDetectorRef', ['detectChanges']);

    let component: VersionItemMenuComponent;
    beforeEach(() => {
        managePageVersionService = jasmine.createSpyObj<ManagePageVersionService>(
            'managePageVersionService',
            ['deletePageVersion', 'editPageVersion']
        );
        pageVersionSelectionService = jasmine.createSpyObj<PageVersionSelectionService>(
            'pageVersionSelectionService',
            ['selectPageVersion']
        );
        rollbackPageVersionService = jasmine.createSpyObj<RollbackPageVersionService>(
            'rollbackPageVersionService',
            ['rollbackPageVersion']
        );
        permissionService = jasmine.createSpyObj<IPermissionService>('permissionService', [
            'isPermitted'
        ]);

        component = new VersionItemMenuComponent(
            managePageVersionService,
            pageVersionSelectionService,
            rollbackPageVersionService,
            permissionService,
            cdr
        );
    });

    it('WHEN component is initialized THEN it sets menu items properly', async () => {
        permissionService.isPermitted.and.returnValues(true, true, true, false);

        await component.ngOnInit();

        expect(component.menuItems.length).toBe(3);
    });

    it('toggles menu properly', () => {
        const mockClickEvent = new MouseEvent('click');
        const stopPropagationSpy = spyOn(mockClickEvent, 'stopPropagation');
        component.isMenuOpen = false;

        component.onButtonClick(mockClickEvent);
        expect(stopPropagationSpy).toHaveBeenCalled();
        expect(component.isMenuOpen).toBe(true);

        component.onButtonClick(mockClickEvent);
        expect(component.isMenuOpen).toBe(false);
    });

    it(`executes given item's callback AND closes the menu`, () => {
        const mockMenuItem = {
            callback: jasmine.createSpy('callback'),
            i18nKey: undefined,
            permissions: undefined
        };

        component.executeItemCallback(mockMenuItem);

        expect(mockMenuItem.callback).toHaveBeenCalled();
        expect(component.isMenuOpen).toBe(false);
    });
});
