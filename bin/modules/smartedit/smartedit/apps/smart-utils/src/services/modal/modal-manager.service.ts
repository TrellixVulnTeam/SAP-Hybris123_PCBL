/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable, Type } from '@angular/core';
import { ModalRef } from '@fundamental-ngx/core';
import { noop } from 'lodash';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FundamentalModalButtonAction, IFundamentalModalButtonOptions } from '../../interfaces';
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
@Injectable()
export class FundamentalModalManagerService<T = any> {
    private title: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private titleSuffix: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private modalData: BehaviorSubject<T> = new BehaviorSubject<T>({} as any);
    private component: BehaviorSubject<Type<any> | undefined> = new BehaviorSubject<
        Type<any> | undefined
    >(undefined);
    private isDismissButtonVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private buttons: BehaviorSubject<IFundamentalModalButtonOptions[]> = new BehaviorSubject<
        IFundamentalModalButtonOptions[]
    >([]);

    constructor(private modalRef: ModalRef) {}

    public init(): void {
        this.modalData.next(this.modalRef.data.modalData);
        this.component.next(this.modalRef.data.component);
        this.buttons.next(this.modalRef.data.templateConfig.buttons || []);
        this.title.next(this.modalRef.data.templateConfig.title || '');
        this.titleSuffix.next(this.modalRef.data.templateConfig.titleSuffix || '');
        this.isDismissButtonVisible.next(this.modalRef.data.templateConfig.isDismissButtonVisible);
    }

    // getters

    public getComponent(): Observable<Type<any> | undefined> {
        return this.component.asObservable();
    }

    public getTitle(): Observable<string> {
        return this.title.asObservable();
    }

    public getTitleSuffix(): Observable<string> {
        return this.titleSuffix.asObservable();
    }

    public getButtons(): Observable<IFundamentalModalButtonOptions[]> {
        return this.buttons.asObservable();
    }

    public getModalData(): Observable<T> {
        return this.modalData.asObservable();
    }

    public getIsDismissButtonVisible(): Observable<boolean> {
        return this.isDismissButtonVisible.asObservable();
    }

    // header dismiss button

    public setDismissButtonVisibility(isVisible: boolean): void {
        this.isDismissButtonVisible.next(isVisible);
    }

    public setTitle(title: string): void {
        this.title.next(title);
    }

    /**
     * Use this method for adding only one button.
     *
     * NOTE: For multiple buttons use `addButtons`.
     */
    public addButton(button: IFundamentalModalButtonOptions): void {
        this.getButtonsValue().subscribe((buttons) => {
            const payload = [...buttons, button];
            this.buttons.next(payload);
        });
    }

    public addButtons(buttons: IFundamentalModalButtonOptions[]): void {
        this.getButtonsValue().subscribe((currentButtons) => {
            const payload = [...currentButtons, ...buttons];
            this.buttons.next(payload);
        });
    }

    public removeButton(id: string): void {
        this.getButtonsValue().subscribe((buttons) => {
            const payload = buttons.filter(
                (button: IFundamentalModalButtonOptions) => button.id !== id
            );
            this.buttons.next(payload);
        });
    }

    public removeAllButtons(): void {
        this.buttons.next([]);
    }

    public disableButton(id: string): void {
        this.getButtonsValue().subscribe((buttons) => {
            const payload = buttons.map((button: IFundamentalModalButtonOptions) =>
                button.id === id ? { ...button, disabled: true } : button
            );
            this.buttons.next(payload);
        });
    }

    public setDismissCallback(callback: () => Promise<any>): void {
        this.dismissCallback = callback;
    }

    public enableButton(id: string): void {
        this.getButtonsValue().subscribe((buttons) => {
            const payload = buttons.map((button: IFundamentalModalButtonOptions) =>
                button.id === id ? { ...button, disabled: false } : button
            );
            this.buttons.next(payload);
        });
    }

    public onButtonClicked(button: IFundamentalModalButtonOptions): void {
        const callbackReturnedObservable: Observable<any> = button.callback
            ? button.callback()
            : of(null);

        if (button.action !== FundamentalModalButtonAction.None) {
            callbackReturnedObservable.subscribe((data: any) =>
                button.action === FundamentalModalButtonAction.Close
                    ? this.close(data)
                    : this.dismiss(data)
            );
        }
    }

    public close(data?: any): void {
        this.modalRef.close(data);
    }

    public dismiss(data?: any): void {
        this.dismissCallback()
            .then(() => this.modalRef.dismiss(data))
            .catch(noop);
    }

    private getButtonsValue(): Observable<IFundamentalModalButtonOptions[]> {
        return this.buttons.pipe(take(1));
    }

    private dismissCallback(): Promise<any> {
        return Promise.resolve();
    }
}
