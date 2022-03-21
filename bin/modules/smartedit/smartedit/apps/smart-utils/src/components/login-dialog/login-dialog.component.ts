/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, HostBinding, Inject, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalRef } from '@fundamental-ngx/core';

import { DEFAULT_AUTHENTICATION_ENTRY_POINT } from '../../constants';
import {
    IAuthToken,
    ILoginData,
    ILoginModalFeedback,
    ISessionService,
    IStorageService
} from '../../interfaces';
import { SSOAuthenticationHelper } from '../../services/authentication/sso-authentication.helper';
import { LogService } from '../../services/log.service';
import { UrlUtils } from '../../utils';
import { LoginDialogResource, LoginDialogResourceProvider } from './login-dialog-resource-provider';

interface IRequestPayload {
    username: string;
    password: string;
    grant_type: string;
}

@Component({
    selector: 'su-login-dialog',
    styleUrls: ['./login-dialog.component.scss'],
    templateUrl: './login-dialog.component.html'
})
export class LoginDialogComponent implements OnInit {
    @HostBinding('class.su-login-dialog') hostClass = true;

    public data: ILoginData = (null as unknown) as ILoginData;
    public authURIKey = '';
    public authURI = '';
    public isFullScreen = false;
    public ssoEnabled = false;
    public form: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(
        private modalRef: ModalRef,
        private logService: LogService,
        private httpClient: HttpClient,
        private sessionService: ISessionService,
        private storageService: IStorageService,
        private urlUtils: UrlUtils,
        private ssoAuthenticationHelper: SSOAuthenticationHelper,
        @Optional() @Inject(LoginDialogResourceProvider) public resource: LoginDialogResource
    ) {}

    ngOnInit(): void {
        this.data = this.modalRef.data || {};

        this.authURI = this.data.authURI;

        this.isFullScreen = this.data.isFullScreen;
        this.ssoEnabled = this.data.ssoEnabled && this.isMainEndPoint();

        this.storageService.removeAuthToken(this.authURI);

        this.authURIKey = btoa(this.authURI).replace(/=/g, '');

        if (this.ssoAuthenticationHelper.isAutoSSOMain()) {
            this.signinWithSSO();
        }
    }

    public signinWithSSO = (): Promise<ILoginModalFeedback> => {
        this.form.setErrors(null);

        return this.ssoAuthenticationHelper
            .launchSSODialog()
            .then(
                (data: IAuthToken) => this.storeAccessToken(data),
                (error: HttpErrorResponse) => this.APIAuthenticationFailureReportFactory(error)
            )
            .then((userHasChanged: boolean) => this.acceptUser(userHasChanged));
    };

    public signinWithCredentials(): Promise<ILoginModalFeedback> {
        this.form.setErrors(null);

        if (this.hasRequiredCredentialsError()) {
            this.form.setErrors({
                credentialsRequiredError: 'se.logindialogform.username.and.password.required'
            });

            return Promise.reject();
        }

        const payload = {
            ...(this.data.clientCredentials || {}),
            username: (this.form.get('username') as FormControl).value,
            password: (this.form.get('password') as FormControl).value,
            grant_type: 'password'
        } as IRequestPayload;

        return this.sendCredentials(payload)
            .then(
                (response: HttpResponse<IAuthToken> | IAuthToken) =>
                    this.storeAccessToken(response),
                (error) => this.APIAuthenticationFailureReportFactory(error)
            )
            .then((hasUserChanged: boolean) => this.acceptUser(hasUserChanged));
    }

    private isMainEndPoint(): boolean {
        return DEFAULT_AUTHENTICATION_ENTRY_POINT === this.authURI;
    }

    private storeAccessToken(
        response: HttpResponse<IAuthToken> | IAuthToken
    ): PromiseLike<boolean> {
        const token = response instanceof HttpResponse ? response.body : response;
        this.storageService.storeAuthToken(this.authURI, token);
        this.logService.debug(`API Authentication Success: ${this.authURI}`);
        return this.isMainEndPoint()
            ? this.sessionService.hasUserChanged()
            : Promise.resolve(false);
    }

    private sendCredentials = (payload: IRequestPayload): Promise<HttpResponse<IAuthToken>> =>
        this.httpClient
            .request<IAuthToken>('POST', this.authURI, {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
                body: this.urlUtils.getQueryString(payload).replace('?', ''),
                observe: 'response'
            })
            .toPromise();

    private APIAuthenticationFailureReportFactory(error: HttpErrorResponse): Promise<never> {
        this.logService.debug(
            `API Authentication Failure: ${this.authURI} status: ${error.status}`
        );

        this.form.setErrors({
            asyncValidationError:
                (error.error && error.error.error_description) ||
                'se.logindialogform.oauth.error.default'
        });

        return Promise.reject(error);
    }

    private acceptUser(userHasChanged: boolean): Promise<ILoginModalFeedback> {
        this.modalRef.close({
            userHasChanged
        });
        if (this.isMainEndPoint()) {
            this.sessionService.setCurrentUsername();
        }
        return Promise.resolve({ userHasChanged });
    }

    private hasRequiredCredentialsError(): boolean {
        const username: AbstractControl = this.form.get('username');
        const password: AbstractControl = this.form.get('password');

        return (
            (username.errors && username.errors.required) ||
            (password.errors && password.errors.required)
        );
    }
}
