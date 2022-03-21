/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { LogService } from '@smart/utils';
import { SeDowngradeService } from '../../di';

export interface InterceptorHelperConfig {
    url: string;
    config?: InterceptorHelperConfig;
}

@SeDowngradeService()
export class InterceptorHelper {
    constructor(private logService: LogService) {}

    public handleRequest(
        config: InterceptorHelperConfig,
        callback: () => Promise<any>
    ): InterceptorHelperConfig | Promise<any> {
        return this._handle(config, config, callback, false);
    }

    public handleResponse(
        response: InterceptorHelperConfig,
        callback: () => Promise<any>
    ): InterceptorHelperConfig | Promise<any> {
        return this._handle(response, response.config, callback, false);
    }

    public handleResponseError(
        response: InterceptorHelperConfig,
        callback: () => Promise<any>
    ): InterceptorHelperConfig | Promise<any> {
        return this._handle(response, response.config, callback, true);
    }

    private _isEligibleForInterceptors(config: InterceptorHelperConfig): boolean {
        return config && config.url && !/.+\.html$/.test(config.url);
    }

    private _handle(
        chain: InterceptorHelperConfig,
        config: InterceptorHelperConfig,
        callback: () => Promise<any>,
        isError: boolean
    ): InterceptorHelperConfig | Promise<any> {
        try {
            if (this._isEligibleForInterceptors(config)) {
                return callback();
            } else {
                if (isError) {
                    return Promise.reject(chain);
                } else {
                    return chain;
                }
            }
        } catch (e) {
            this.logService.error('caught error in one of the interceptors', e);

            if (isError) {
                return Promise.reject(chain);
            } else {
                return chain;
            }
        }
    }
}
