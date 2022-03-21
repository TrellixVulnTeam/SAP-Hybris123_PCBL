/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { TemplateRef, Type } from '@angular/core';
import { ModalConfig } from '@fundamental-ngx/core';
import { IFundamentalModalButtonOptions } from '../../interfaces';

export interface IFundamentalModalTemplateConfig {
    buttons?: IFundamentalModalButtonOptions[];
    title?: string;
    titleSuffix?: string;
    isDismissButtonVisible?: boolean;
}

export interface IFundamentalModalConfig<T> {
    component: Type<any> | TemplateRef<any>;
    data?: T;
    templateConfig?: IFundamentalModalTemplateConfig;
    config?: ModalConfig;
}
