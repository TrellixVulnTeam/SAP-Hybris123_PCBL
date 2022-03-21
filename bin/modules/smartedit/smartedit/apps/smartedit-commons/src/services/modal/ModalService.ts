/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './modal.scss';
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import {
    ModalRef as FundamentalModalRef,
    ModalService as FundamentalModalService
} from '@fundamental-ngx/core';
import { ModalService as BaseModalService } from '@smart/utils';
import * as angular from 'angular';
import { SeDowngradeService } from '../../di';
import { IAnimateService } from '../interfaces/IAnimateService';
import { IModalConfig } from './IModalConfig';
import { IUIBootstrapModalService } from './IUIBootstrapModalService';
import { IUIBootstrapModalStackService } from './IUIBootstrapModalStackService';
import { modalControllerClassFactory } from './modalControllerClassFactory';
import { IFundamentalModalConfig } from './';

/**
 * Service responsible for opening the modals after providing configuration
 */
@SeDowngradeService()
@Injectable({ providedIn: 'root' })
export class ModalService extends BaseModalService {
    constructor(
        public fundamentalModalService: FundamentalModalService,
        private upgrade: UpgradeModule
    ) {
        super(fundamentalModalService);
    }

    public hasOpenModals(): boolean {
        return !!this.$uibModalStack.getTop() || this.fundamentalModalService.hasOpenModals();
    }
    /**
     * Dismisses all instances of modals both produced by angular bootstrap ui and Fundamental
     */
    public dismissAll(): void {
        if (this.$uibModalStack.getTop()) {
            this.$uibModalStack.dismissAll();
        }

        if (this.fundamentalModalService.hasOpenModals()) {
            this.fundamentalModalService.dismissAll();
        }
    }

    /**
     * Opens a @fundamental-ngx modal.
     */
    public open<T>(conf: IFundamentalModalConfig<T>): FundamentalModalRef;

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
    public open(conf: IModalConfig): angular.IPromise<any>;
    public open<T = any>(
        conf: IFundamentalModalConfig<T> | IModalConfig
    ): FundamentalModalRef | angular.IPromise<any> {
        return (conf as IFundamentalModalConfig<T>).component
            ? super.open(conf as IFundamentalModalConfig<T>)
            : this.angularJSOpen(conf as IModalConfig);
    }

    private angularJSOpen(conf: IModalConfig): angular.IPromise<any> {
        const configuration = conf || ({} as IModalConfig);

        if (configuration.templateUrl && configuration.templateInline) {
            throw new Error('modalService.configuration.errors.2.templates.provided');
        }

        return this.$uibModal.open({
            templateUrl: 'modalTemplate.html',
            size: configuration.size || 'lg',
            backdrop: 'static',
            keyboard: false,
            controller: modalControllerClassFactory(configuration),
            controllerAs: 'modalController',
            windowClass: configuration.cssClasses || null,
            animation: !conf.animation && this.$animate.enabled()
        }).result;
    }

    private get $uibModalStack(): IUIBootstrapModalStackService {
        return this.upgrade.$injector.get('$uibModalStack');
    }

    private get $uibModal(): IUIBootstrapModalService {
        return this.upgrade.$injector.get('$uibModal');
    }

    private get $animate(): IAnimateService {
        return this.upgrade.$injector.get('$animate');
    }
}
