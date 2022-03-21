/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ErrorResponse } from 'cmscommons';
import { BackendError, SeDowngradeService, ValidationError } from 'smarteditcommons';

/**
 * Service used to handle standard OCC validation errors received from the backend.
 */
@SeDowngradeService()
export class MediaBackendValidationHandler {
    /**
     * Extracts validation errors from the provided response and appends them to a specified contextual errors list.
     *
     * The expected error response from the backend matches the contract of the following response example:
     *
     * ```
     *      var response = {
     *          data: {
     *              errors: [{
     *                  type: 'ValidationError',
     *                  subject: 'mySubject',
     *                  message: 'Some validation exception occurred'
     *              }, {
     *                  type: 'SomeOtherError',
     *                  subject: 'mySubject'
     *                  message: 'Some other exception occurred'
     *              }]
     *          }
     *      }
     * ```
     *
     * Example of use:
     * ```
     *      const errorsContext = [];
     *      mediaBackendValidationHandler.handleResponse(response, errorsContext);
     * ```
     *
     * The resulting errorsContext would be as follows:
     * ```
     *      [{
     *          subject: 'mySubject',
     *          message: 'Some validation exception occurred'
     *      }]
     * ```
     *
     * @param response A response consisting of a list of errors. For details of the expected format, see the example above.
     * @param errorsContext An array that all validation errors are appended to. It is an output parameter.
     * @returns The error context list originally provided, or a new list, appended with the validation errors.
     */
    public handleResponse(response: ErrorResponse, errorsContext?: any[]): any[] {
        errorsContext = errorsContext || [];
        if (response?.error?.errors) {
            response.error.errors
                .filter((error) => this.isValidationError(error))
                .forEach(({ subject, message }: ValidationError) => {
                    if (subject) {
                        errorsContext.push({
                            subject,
                            message
                        });
                    }
                });
        }
        return errorsContext;
    }

    private isValidationError(error: BackendError): error is ValidationError {
        return error.type === 'ValidationError';
    }
}
