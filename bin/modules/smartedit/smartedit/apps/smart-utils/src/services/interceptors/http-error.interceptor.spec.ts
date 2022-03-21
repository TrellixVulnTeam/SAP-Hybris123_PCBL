/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import * as lodash from 'lodash';
import { promiseUtils } from '../../utils';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { IHttpErrorInterceptor } from './i-http-error.interceptor';

describe('http error interceptor service', () => {
    let injector: Injector;
    let customErrorInterceptor: IHttpErrorInterceptor;
    let httpErrorInterceptorService: HttpErrorInterceptorService;
    let ERROR_COUNTER = 0;
    let defaultRequest: HttpRequest<any>;

    beforeEach(() => {
        injector = jasmine.createSpyObj<Injector>('injector', ['get']);

        customErrorInterceptor = {
            predicate: () => true,
            responseError(request, response) {
                return Promise.resolve(response);
            }
        } as IHttpErrorInterceptor;

        ERROR_COUNTER = 0;

        httpErrorInterceptorService = new HttpErrorInterceptorService(injector, promiseUtils);

        defaultRequest = new HttpRequest('GET', '/any_url');
    });

    function getErrorInterceptorMock(rejectPromise: boolean) {
        return {
            predicate(request: HttpRequest<any>, response: HttpErrorResponse) {
                return response.status === 400;
            },
            responseError(request: HttpRequest<any>, response: HttpErrorResponse) {
                // mutating the response error
                response.error.errors.push(++ERROR_COUNTER);
                if (rejectPromise) {
                    return Promise.reject(response);
                } else {
                    return Promise.resolve(response);
                }
            }
        };
    }

    it('should call httpErrorInterceptorService.responseError when an error is intercepted', (done) => {
        const responseErrorSpy = spyOn(
            httpErrorInterceptorService,
            'responseError'
        ).and.callThrough();

        // GIVEN
        const request = new HttpRequest('GET', '/any_url');
        const RESPONSE_MOCK = ({
            url: '/any_url',
            status: 400
        } as any) as HttpErrorResponse;

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            request,
            RESPONSE_MOCK
        );

        // THEN
        responseErrorObservable.subscribe(
            () => {
                fail('observable should have been in error');
            },
            (error: any) => {
                // THEN
                expect(error).toEqual(RESPONSE_MOCK);
                done();
            }
        );
        expect(responseErrorSpy).toHaveBeenCalledWith(request, RESPONSE_MOCK);
    });

    it('should be able to register interceptors', () => {
        // WHEN
        const errorInterceptorMock1 = getErrorInterceptorMock(true);
        const errorInterceptorMock2 = getErrorInterceptorMock(true);

        httpErrorInterceptorService.addInterceptor(errorInterceptorMock1);
        httpErrorInterceptorService.addInterceptor(errorInterceptorMock2);

        // THEN
        expect((httpErrorInterceptorService as any)._errorInterceptors.length).toEqual(2);
        expect((httpErrorInterceptorService as any)._errorInterceptors).toEqual([
            errorInterceptorMock2,
            errorInterceptorMock1
        ]);
    });

    it('should be able to register an interceptor with angular recipe', () => {
        httpErrorInterceptorService.addInterceptor(customErrorInterceptor);

        // THEN
        expect((httpErrorInterceptorService as any)._errorInterceptors.length).toEqual(1);
        expect((httpErrorInterceptorService as any)._errorInterceptors[0]).toEqual(
            customErrorInterceptor
        );
    });

    // it('should throw an error if trying to register an interceptor which does not expose a predicate function', () => {
    //     // GIVEN
    //     const expectedErrorFunction = () => {
    //         httpErrorInterceptorService.addInterceptor({
    //             predicate: null,
    //             responseError(request: HttpRequest<any>, response: HttpErrorResponse) {
    //                 return Promise.reject({});
    //             }
    //         });
    //     };

    //     // THEN
    //     expect(expectedErrorFunction).toThrowError(
    //         'httpErrorInterceptorService.addInterceptor.error.interceptor.has.no.predicate'
    //     );
    // });

    // it('should throw an error if trying to register an interceptor which does not expose a responseError function', () => {
    //     // GIVEN
    //     const expectedErrorFunction = () => {
    //         httpErrorInterceptorService.addInterceptor({
    //             predicate(request: HttpRequest<any>, response: HttpErrorResponse): boolean {
    //                 return true;
    //             },
    //             responseError: null
    //         });
    //     };

    //     // THEN
    //     expect(expectedErrorFunction).toThrowError(
    //         'httpErrorInterceptorService.addInterceptor.error.interceptor.has.no.responseError'
    //     );
    // });

    it('should be able to unregister an interceptor', () => {
        // GIVEN
        const interceptor1 = getErrorInterceptorMock(true);

        const interceptor2 = getErrorInterceptorMock(true);

        const unregisterErrorInterceptor1 = httpErrorInterceptorService.addInterceptor(
            interceptor1
        );
        httpErrorInterceptorService.addInterceptor(interceptor2);

        // WHEN
        unregisterErrorInterceptor1();

        // THEN
        expect((httpErrorInterceptorService as any)._errorInterceptors).toEqual([interceptor2]);
    });

    it('should return a failing observable when there is no interceptors available', (done) => {
        // GIVEN
        const RESPONSE_MOCK = {
            status: 400,
            error: {
                errors: []
            }
        } as HttpErrorResponse;

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            defaultRequest,
            RESPONSE_MOCK
        );

        responseErrorObservable.subscribe(
            () => {
                fail('observable should have been in error');
            },
            (error: any) => {
                // THEN
                expect(error).toEqual(RESPONSE_MOCK);
                done();
            }
        );
    });

    it('should reject the responseError promise when no predicate matches the response', (done) => {
        // GIVEN
        const RESPONSE_STATUS_500_MOCK = {
            status: 500,
            error: {
                errors: []
            }
        } as HttpErrorResponse;
        // The Interceptor listen only on response.status '400'
        const errorStatus400InterceptorMock = getErrorInterceptorMock(true);
        httpErrorInterceptorService.addInterceptor(errorStatus400InterceptorMock);

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            defaultRequest,
            RESPONSE_STATUS_500_MOCK
        );

        // THEN
        responseErrorObservable.subscribe(
            () => {
                fail('observable should have been in error');
            },
            (error: any) => {
                // THEN
                expect(error).toEqual(RESPONSE_STATUS_500_MOCK);
                done();
            }
        );
    });

    it('should reject the responseError promise with expected data if all interceptors reject the response', (done) => {
        // GIVEN
        const RESPONSE_MOCK = {
            status: 400,
            error: {
                errors: []
            }
        } as HttpErrorResponse;

        // getErrorInterceptorMock function mutate the response error array
        const expectedResponse = lodash.cloneDeep(RESPONSE_MOCK);
        expectedResponse.error.errors = [1, 2];

        const interceptorMock1 = getErrorInterceptorMock(true);
        const interceptorMock2 = getErrorInterceptorMock(true);

        httpErrorInterceptorService.addInterceptor(interceptorMock1);
        httpErrorInterceptorService.addInterceptor(interceptorMock2);

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            defaultRequest,
            RESPONSE_MOCK
        );

        // THEN
        responseErrorObservable.subscribe(
            () => {
                fail('observable should have been in error');
            },
            (error: any) => {
                // THEN
                expect(error).toEqual(expectedResponse);
                done();
            }
        );
    });

    it('should resolve the responseError promise with expected data if one interceptor resolve the response and should not call subsequent interceptors', (done) => {
        // GIVEN
        const interceptorMock1 = getErrorInterceptorMock(true);
        const interceptorMock2 = getErrorInterceptorMock(false);
        const interceptorMock3 = getErrorInterceptorMock(true);

        httpErrorInterceptorService.addInterceptor(interceptorMock1);
        httpErrorInterceptorService.addInterceptor(interceptorMock2);
        httpErrorInterceptorService.addInterceptor(interceptorMock3);

        // last interceptor to be called is the first added
        const lastInterceptorResponseErrorSpy = spyOn(interceptorMock1, 'responseError');

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(defaultRequest, {
            status: 400,
            error: {
                errors: []
            }
        } as HttpErrorResponse);

        // THEN

        // THEN
        responseErrorObservable.subscribe(
            (response: any) => {
                expect(response).toEqual({
                    status: 400,
                    error: {
                        errors: [1, 2] // getErrorInterceptorMock function mutate the response error array
                    }
                });
                expect(lastInterceptorResponseErrorSpy).not.toHaveBeenCalled();
                done();
            },
            (error: any) => {
                // THEN
                fail('observable should have been successful');
            }
        );
    });

    it('should resolve the responseError promise if one interceptor resolve the response', (done) => {
        // GIVEN
        const request = new HttpRequest('GET', '/any_url');

        const RESPONSE_MOCK = {
            url: '/any_url',
            status: 400,
            error: {
                errors: []
            }
        } as HttpErrorResponse;
        // getErrorInterceptorMock function mutate the response error array
        const expectedResponse = lodash.cloneDeep(RESPONSE_MOCK);
        expectedResponse.error.errors = [1];

        const errorInterceptorMock = getErrorInterceptorMock(false);
        httpErrorInterceptorService.addInterceptor(errorInterceptorMock);

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            request,
            RESPONSE_MOCK
        );

        // THEN
        responseErrorObservable.subscribe(
            (response: any) => {
                expect(response).toEqual(expectedResponse);
                done();
            },
            (error: any) => {
                // THEN
                fail('observable should have been successful');
            }
        );
    });

    it('should resolve the responseError promise if adding a interceptor with angular recipe resolve the response', (done) => {
        // GIVEN

        const request = new HttpRequest('GET', '/any_url');

        const RESPONSE_MOCK = {
            url: '/any_url',
            status: 400,
            error: {
                errors: []
            }
        } as HttpErrorResponse;
        httpErrorInterceptorService.addInterceptor(customErrorInterceptor);

        // WHEN
        const responseErrorObservable = httpErrorInterceptorService.responseError(
            request,
            RESPONSE_MOCK
        );

        // THEN
        responseErrorObservable.subscribe(
            (response: any) => {
                expect(response).toEqual(RESPONSE_MOCK);
                done();
            },
            (error: any) => {
                // THEN
                fail('observable should have been successful');
            }
        );
    });
});
