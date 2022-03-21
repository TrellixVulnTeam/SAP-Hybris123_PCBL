/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { Injectable } from '@angular/core';
import {
    ModalConfig as FundamentalModalConfig,
    ModalRef as FundamentalModalRef,
    ModalService as FundamentalModalService
} from '@fundamental-ngx/core';
import { FundamentalModalTemplateComponent } from '../../components';
import { IFundamentalModalConfig } from './i-modal.service';

@Injectable()
export class ModalService {
    constructor(protected fundamentalModalService: FundamentalModalService) {}

    open<T>(options: IFundamentalModalConfig<T>): FundamentalModalRef {
        const { templateConfig } = options;

        return !!templateConfig
            ? this.openWithTemplate<T>(options)
            : this.openStandalone<T>(options);
    }

    private openStandalone<T>(options: IFundamentalModalConfig<T>): FundamentalModalRef {
        const { config = {}, component, data } = options;

        return this.fundamentalModalService.open(component, { ...config, data });
    }

    private openWithTemplate<T>(options: IFundamentalModalConfig<T>): FundamentalModalRef {
        const { config = {}, templateConfig = {}, component, data } = options;

        const settings: FundamentalModalConfig = {
            ...config,
            data: {
                templateConfig,
                component,
                modalData: data
            }
        };

        return this.fundamentalModalService.open(FundamentalModalTemplateComponent, settings);
    }
}
