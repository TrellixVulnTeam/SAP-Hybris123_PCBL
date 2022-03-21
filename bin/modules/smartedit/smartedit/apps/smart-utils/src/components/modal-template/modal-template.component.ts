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
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    Type,
    ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IFundamentalModalButtonOptions } from '../../interfaces';
import { FundamentalModalManagerService } from '../../services/modal/modal-manager.service';

@Component({
    selector: 'fundamental-modal-template',
    encapsulation: ViewEncapsulation.None,
    providers: [FundamentalModalManagerService],
    styles: [
        `
            .fd-modal__title {
                min-height: 20px;
            }
        `
    ],
    template: `
        <fd-modal-header>
            <h1 fd-modal-title id="fd-modal-title-{{ (title$ | async) || '' }}">
                {{ (title$ | async) || '' | translate }}
                {{ (titleSuffix$ | async) || '' | translate }}
            </h1>
            <button
                fd-modal-close-btn
                *ngIf="isDismissButtonVisible$ | async"
                (click)="dismiss()"
            ></button>
        </fd-modal-header>
        <fd-modal-body>
            <ng-container *ngIf="component$ | async as component">
                <ng-container *ngComponentOutlet="component"></ng-container>
            </ng-container>
        </fd-modal-body>
        <fd-modal-footer *ngIf="buttons && buttons.length > 0">
            <button
                *ngFor="let button of buttons"
                [disabled]="button.disabledFn ? button.disabledFn!() : button.disabled"
                [options]="button.style"
                [attr.id]="button.id"
                (click)="onButtonClicked(button)"
                fd-button
            >
                {{ button.label | translate }}
            </button>
        </fd-modal-footer>
    `
})
export class FundamentalModalTemplateComponent implements OnInit, OnDestroy {
    public component$: Observable<Type<any> | undefined> = this.modalManager.getComponent();
    public title$: Observable<string> = this.modalManager.getTitle();
    public titleSuffix$: Observable<string> = this.modalManager.getTitleSuffix();
    public isDismissButtonVisible$: Observable<
        boolean
    > = this.modalManager.getIsDismissButtonVisible();

    public buttons!: IFundamentalModalButtonOptions[];

    private buttons$: Observable<IFundamentalModalButtonOptions[]> = this.modalManager.getButtons();
    private buttonsSubscription: Subscription | undefined;

    constructor(
        private modalManager: FundamentalModalManagerService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.modalManager.init();

        this.buttonsSubscription = this.buttons$.subscribe((value) => {
            this.buttons = value;
            // For some consumere, adding buttons can result in not properly rendered view
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.buttonsSubscription) {
            this.buttonsSubscription.unsubscribe();
        }
    }

    public onButtonClicked(button: IFundamentalModalButtonOptions): void {
        this.modalManager.onButtonClicked(button);
    }

    public dismiss(): void {
        this.modalManager.dismiss();
    }
}
