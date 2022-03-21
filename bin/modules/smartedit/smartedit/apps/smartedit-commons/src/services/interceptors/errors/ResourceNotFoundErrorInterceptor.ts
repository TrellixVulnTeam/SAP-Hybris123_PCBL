/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtils, IHttpErrorInterceptor, StatusText } from '@smart/utils';
import { IAlertService } from 'smarteditcommons/services/interfaces';
import { LANGUAGE_RESOURCE_URI } from '../../../utils';

/**
 * Used for HTTP error code 404 (Not Found) except for an HTML or a language resource. It will display the response.message in an alert message.
 */
@Injectable()
export class ResourceNotFoundErrorInterceptor<T = any> implements IHttpErrorInterceptor<T> {
    constructor(private alertService: IAlertService, private httpUtils: HttpUtils) {}
    predicate(request: HttpRequest<T>, response: HttpErrorResponse): boolean {
        return (
            response.status === 404 &&
            !this.httpUtils.isHTMLRequest(request, response) &&
            !this._isLanguageResourceRequest(request.url)
        );
    }
    responseError(request: HttpRequest<T>, response: HttpErrorResponse): Promise<any> {
        this.alertService.showDanger({
            message:
                response.statusText === StatusText.UNKNOW_ERROR
                    ? 'se.unknown.request.error'
                    : response.message,
            timeout: 10000
        });
        return Promise.reject(response);
    }

    private _isLanguageResourceRequest(url: string): boolean {
        const languageResourceRegex = new RegExp(LANGUAGE_RESOURCE_URI.replace(/\:.*\//g, '.*/'));
        return languageResourceRegex.test(url);
    }
}
