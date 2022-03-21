/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendError, IHttpErrorInterceptor } from '@smart/utils';
import { GenericEditorStackService } from '../../../components/genericEditor/services/GenericEditorStackService';
import { IAlertService } from '../../interfaces/IAlertService';

/**
 * Used for HTTP error code 400. It removes all errors of type 'ValidationError' and displays alert messages for non-validation errors.
 */
@Injectable()
export class NonValidationErrorInterceptor<T = any> implements IHttpErrorInterceptor<T> {
    constructor(
        private alertService: IAlertService,
        private genericEditorStackService: GenericEditorStackService
    ) {}

    predicate(request: HttpRequest<T>, response: HttpErrorResponse): boolean {
        return response.status === 400;
    }

    responseError(request: HttpRequest<T>, response: HttpErrorResponse): Promise<never> {
        if (response.error && response.error.errors) {
            response.error.errors
                .filter((error: BackendError) => {
                    const isValidationError = error.type === 'ValidationError';
                    return (
                        !isValidationError ||
                        (isValidationError &&
                            !this.genericEditorStackService.isAnyGenericEditorOpened())
                    );
                })
                .forEach((error: BackendError) => {
                    this.alertService.showDanger({
                        message: error.message || 'se.unknown.request.error',
                        timeout: 10000
                    });
                });
        }
        return Promise.reject(response);
    }
}
