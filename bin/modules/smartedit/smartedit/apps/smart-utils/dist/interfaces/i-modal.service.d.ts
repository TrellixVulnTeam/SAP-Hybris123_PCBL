/// <reference types="angular" />
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { ModalRef } from '@fundamental-ngx/core';
import { IFundamentalModalConfig } from '../services/modal';
import { IModalConfig } from './i-modal-config';
export declare abstract class IModalService {
    dismissAll(): void;
    open<T>(conf: IFundamentalModalConfig<T>): ModalRef;
    open(conf: IModalConfig): angular.IPromise<any>;
}
