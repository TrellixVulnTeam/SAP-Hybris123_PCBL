/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { InjectionToken } from '@angular/core';
import { AlertConfig } from '@fundamental-ngx/core';
import { IAlertServiceType } from '../../interfaces';

export const ALERT_CONFIG_DEFAULTS_TOKEN = new InjectionToken<string>('alertConfigToken');

export const ALERT_CONFIG_DEFAULTS: AlertConfig = {
    data: {},
    type: IAlertServiceType.INFO,
    dismissible: true,
    duration: 3000,
    width: '500px'
};
