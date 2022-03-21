/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { ChangeDetectorRef, OnDestroy, OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { IFundamentalModalButtonOptions } from '../../interfaces';
import { FundamentalModalManagerService } from '../../services/modal/modal-manager.service';
export declare class FundamentalModalTemplateComponent implements OnInit, OnDestroy {
    private modalManager;
    private cdr;
    component$: Observable<Type<any> | undefined>;
    title$: Observable<string>;
    titleSuffix$: Observable<string>;
    isDismissButtonVisible$: Observable<boolean>;
    buttons: IFundamentalModalButtonOptions[];
    private buttons$;
    private buttonsSubscription;
    constructor(modalManager: FundamentalModalManagerService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onButtonClicked(button: IFundamentalModalButtonOptions): void;
    dismiss(): void;
}
