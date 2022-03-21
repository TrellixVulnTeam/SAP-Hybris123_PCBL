/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import 'jasmine';
import { Type } from '@angular/core';
import { ModalRef } from '@fundamental-ngx/core';
import { combineLatest } from 'rxjs';
import { TypedMap } from '../../dtos';
import { IFundamentalModalButtonOptions } from '../../interfaces';
import { FundamentalModalManagerService } from './modal-manager.service';

const buttons: IFundamentalModalButtonOptions[] = [{ id: 'id', label: 'label' }];
const title = 'My Title';
const isDismissButtonVisible = true;
const modalData: TypedMap<string> = { myData: 'myData' };
const component: Type<any> = {} as Type<any>;

function createModalRefMock(): jasmine.SpyObj<ModalRef> {
    return {
        ...jasmine.createSpyObj('modalRef', ['close', 'dismiss']),
        data: {
            component,
            modalData,
            templateConfig: {
                isDismissButtonVisible,
                title,
                buttons
            }
        }
    };
}

describe('Modal Manager', () => {
    let modalManager: FundamentalModalManagerService;
    let modalRef: jasmine.SpyObj<ModalRef>;

    beforeEach(() => {
        modalRef = createModalRefMock();
        modalManager = new FundamentalModalManagerService(modalRef);
    });

    it('initializes with correct data', () => {
        modalManager.init();

        combineLatest(
            modalManager.getButtons(),
            modalManager.getTitle(),
            modalManager.getComponent(),
            modalManager.getModalData(),
            modalManager.getIsDismissButtonVisible()
        ).subscribe(([_buttons, _title, _component, _modalData, _isDismissButtonVisible]) => {
            expect(_buttons).toEqual(buttons);
            expect(_title).toEqual(title);
            expect(_component).toEqual(component);
            expect(_modalData).toEqual(modalData);
            expect(_isDismissButtonVisible).toEqual(isDismissButtonVisible);
        });
    });

    describe('adds button/s correctly', () => {
        it('addButton', () => {
            const newButton: IFundamentalModalButtonOptions = { id: 'newId', label: 'newLabel' };

            modalManager.init();

            modalManager.addButton(newButton);
            modalManager.getButtons().subscribe((_buttons: IFundamentalModalButtonOptions[]) => {
                expect(_buttons).toEqual([...buttons, newButton]);
            });
        });

        it('addButtons', () => {
            const newButtons: IFundamentalModalButtonOptions[] = [
                { id: 'id1', label: 'label1' },
                { id: 'id2', label: 'label2' }
            ];

            modalManager.init();

            modalManager.addButtons(newButtons);
            modalManager.getButtons().subscribe((_buttons: IFundamentalModalButtonOptions[]) => {
                expect(_buttons).toEqual([...buttons, ...newButtons]);
            });
        });
    });

    it('removes button correctly', () => {
        modalManager.init();

        modalManager.removeButton('id');
        modalManager.getButtons().subscribe((_buttons: IFundamentalModalButtonOptions[]) => {
            expect(_buttons).toEqual([]);
        });
    });

    it('removes all buttons correctly', () => {
        modalManager.init();

        modalManager.removeAllButtons();
        modalManager.getButtons().subscribe((_buttons: IFundamentalModalButtonOptions[]) => {
            expect(_buttons).toEqual([]);
        });
    });

    it('sets title correctly', () => {
        const newTitle = 'My New Title';

        modalManager.init();

        modalManager.setTitle(newTitle);
        modalManager.getTitle().subscribe((_title: string) => {
            expect(_title).toEqual(newTitle);
        });
    });

    it('sets dismiss button visibility correctly', () => {
        modalManager.init();

        modalManager.setDismissButtonVisibility(false);
        modalManager.getIsDismissButtonVisible().subscribe((_isDismissButtonVisible: boolean) => {
            expect(_isDismissButtonVisible).toEqual(false);
        });
    });
});
