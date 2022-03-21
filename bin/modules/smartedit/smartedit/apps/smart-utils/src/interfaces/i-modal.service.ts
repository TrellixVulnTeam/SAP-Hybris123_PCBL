/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { ModalRef } from '@fundamental-ngx/core';
import { IFundamentalModalConfig } from '../services/modal';
import { IModalConfig } from './i-modal-config';

export abstract class IModalService {
    public dismissAll(): void {
        'proxyFunction';
    }

    public open<T>(conf: IFundamentalModalConfig<T>): ModalRef;
    public open(conf: IModalConfig): angular.IPromise<any>;
    public open<T = any>(
        conf: IFundamentalModalConfig<T> | IModalConfig
    ): ModalRef | angular.IPromise<any> {
        'proxyFunction';
        return {} as ModalRef;
    }
}
