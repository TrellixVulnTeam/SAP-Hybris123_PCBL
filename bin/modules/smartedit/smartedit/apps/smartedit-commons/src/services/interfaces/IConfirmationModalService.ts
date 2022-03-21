/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import { ConfirmationModalConfig, LegacyConfirmationModalConfig } from './IConfirmationModal';

export abstract class IConfirmationModalService {
    confirm(conf: LegacyConfirmationModalConfig): angular.IPromise<any>;
    confirm(conf: ConfirmationModalConfig | LegacyConfirmationModalConfig): Promise<any>;
    confirm(
        conf: LegacyConfirmationModalConfig | ConfirmationModalConfig
    ): angular.IPromise<any> | Promise<any> {
        'proxyFunction';

        return Promise.resolve();
    }
}
