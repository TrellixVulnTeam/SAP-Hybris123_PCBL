import './modal.scss';
import { UpgradeModule } from '@angular/upgrade/static';
import { ModalRef as FundamentalModalRef, ModalService as FundamentalModalService } from '@fundamental-ngx/core';
import { ModalService as BaseModalService } from '@smart/utils';
import * as angular from 'angular';
import { IModalConfig } from './IModalConfig';
import { IFundamentalModalConfig } from './';
/**
 * Service responsible for opening the modals after providing configuration
 */
export declare class ModalService extends BaseModalService {
    fundamentalModalService: FundamentalModalService;
    private upgrade;
    constructor(fundamentalModalService: FundamentalModalService, upgrade: UpgradeModule);
    hasOpenModals(): boolean;
    /**
     * Dismisses all instances of modals both produced by angular bootstrap ui and Fundamental
     */
    dismissAll(): void;
    /**
     * Opens a @fundamental-ngx modal.
     */
    open<T>(conf: IFundamentalModalConfig<T>): FundamentalModalRef;
    /**
     * Provides a simple way to open modal windows with custom content, that share a common look and feel.
     *
     * The modal window can be closed multiple ways, through Button Actions,
     * by explicitly calling the [close]{@link ModalManager#close} or [dismiss]{@link ModalManager#dismiss} functions, etc...
     *
     * Depending on how you choose to close a modal, either the modal promise's will be resolved or rejected.
     * You can use the callbacks to return data from the modal content to the caller of this function.
     *
     * @returns Promise that will be either resolved or rejected when the modal window is closed.
     */
    open(conf: IModalConfig): angular.IPromise<any>;
    private angularJSOpen;
    private get $uibModalStack();
    private get $uibModal();
    private get $animate();
}
