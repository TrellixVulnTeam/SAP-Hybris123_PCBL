/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { Type } from '@angular/core';
import { ModalRef } from '@fundamental-ngx/core';
import { Observable } from 'rxjs';
import { IFundamentalModalButtonOptions } from '../../interfaces';
/**
 * Allows to perform operations on a Modal Component such as adding the buttons or getting the modal data.
 * It must be injected into a Custom Modal Component.
 *
 * The Custom Modal Component is rendered by {@link FundamentalModalTemplateComponent}.
 * A Service or a Component that opens the Modal Component must provide
 * [component]{@link IFundamentalModalConfig#component} and [templateConfig]{@link IFundamentalModalConfig#templateConfig}.
 *
 *
 * ### Example of a Service or Component that opens the modal
 *
 *      this.modalService.open({
 *           component: YourCustomModalComponent,
 *               templateConfig: {
 *               title: 'se.cms.synchronization.pagelist.modal.title.prefix',
 *               titleSuffix: 'se.cms.pageeditormodal.editpagetab.title'
 *           },
 *           data: {
 *               propA: 'valA'
 *           }
 *      });
 *
 * ### Example of YourCustomModalComponent
 *
 *      export class YourCustomModalComponent implements OnInit {
 *          constructor(private modalManager: FundamentalModalManagerService) {}
 *
 *          ngOnInit(): void {
 *              this.modalManager.addButtons([]);
 *              this.modalManager.getModalData().pipe(take(1)).subscribe(({propA}) => { console.log(propA) });
 *          }
 *      }
 *
 */
export declare class FundamentalModalManagerService<T = any> {
    private modalRef;
    private title;
    private titleSuffix;
    private modalData;
    private component;
    private isDismissButtonVisible;
    private buttons;
    constructor(modalRef: ModalRef);
    init(): void;
    getComponent(): Observable<Type<any> | undefined>;
    getTitle(): Observable<string>;
    getTitleSuffix(): Observable<string>;
    getButtons(): Observable<IFundamentalModalButtonOptions[]>;
    getModalData(): Observable<T>;
    getIsDismissButtonVisible(): Observable<boolean>;
    setDismissButtonVisibility(isVisible: boolean): void;
    setTitle(title: string): void;
    /**
     * Use this method for adding only one button.
     *
     * NOTE: For multiple buttons use `addButtons`.
     */
    addButton(button: IFundamentalModalButtonOptions): void;
    addButtons(buttons: IFundamentalModalButtonOptions[]): void;
    removeButton(id: string): void;
    removeAllButtons(): void;
    disableButton(id: string): void;
    setDismissCallback(callback: () => Promise<any>): void;
    enableButton(id: string): void;
    onButtonClicked(button: IFundamentalModalButtonOptions): void;
    close(data?: any): void;
    dismiss(data?: any): void;
    private getButtonsValue;
    private dismissCallback;
}
