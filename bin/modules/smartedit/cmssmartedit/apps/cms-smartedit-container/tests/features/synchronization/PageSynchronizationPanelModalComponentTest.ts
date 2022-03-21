/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef } from '@angular/core';
import { ISyncStatusItem } from 'cmscommons';
import { PageSynchronizationPanelModalComponent } from 'cmssmarteditcontainer/components/synchronize';
import { PageSynchronizationPanelModalData as ModalData } from 'cmssmarteditcontainer/components/synchronize/types';
import { of } from 'rxjs';
import { FundamentalModalManagerService } from 'smarteditcommons';

describe('PageSynchronizationPanelModalComponent', () => {
    const mockSyncBtnId = 'sync';
    const mockModalData = {
        cmsPage: {},
        uriContext: {}
    } as ModalData;
    let modalManager: jasmine.SpyObj<FundamentalModalManagerService<ModalData>>;

    let component: PageSynchronizationPanelModalComponent;
    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('changeDetectorRef', ['detectChanges']);
    beforeEach(() => {
        modalManager = jasmine.createSpyObj<FundamentalModalManagerService<ModalData>>(
            'pageSynchronizationPanelModalComponent',
            ['addButtons', 'getModalData', 'disableButton', 'enableButton']
        );

        component = new PageSynchronizationPanelModalComponent(modalManager, cdr);
    });

    describe('initialize', () => {
        beforeEach(() => {
            modalManager.getModalData.and.returnValue(of(mockModalData));
        });

        it('should add buttons', () => {
            component.ngOnInit();

            expect(modalManager.addButtons).toHaveBeenCalledWith([
                jasmine.objectContaining({ id: 'cancel' }),
                jasmine.objectContaining({ id: mockSyncBtnId })
            ]);
        });

        it('should get the modal data', () => {
            component.ngOnInit();

            expect(component.data).toBe(mockModalData);
        });
    });

    describe('onSelectedItemsUpdate', () => {
        it('GIVEN no selected items THEN it should disable Sync Button', () => {
            component.onSelectedItemsUpdate([]);

            expect(modalManager.disableButton).toHaveBeenCalledWith(mockSyncBtnId);
        });

        it('GIVEN selected items THEN it should enable Sync Button', () => {
            component.onSelectedItemsUpdate([{} as ISyncStatusItem]);

            expect(modalManager.enableButton).toHaveBeenCalledWith(mockSyncBtnId);
        });
    });
});
