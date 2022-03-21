import './UserAccount.scss';
import { OnDestroy, OnInit } from '@angular/core';
import { CrossFrameEventService, IAuthenticationService, ISessionService } from 'smarteditcommons';
import { IframeManagerService } from '../../services/iframe/IframeManagerService';
export declare class UserAccountComponent implements OnInit, OnDestroy {
    private authenticationService;
    private iframeManagerService;
    private crossFrameEventService;
    private sessionService;
    username: string;
    private unregUserChanged;
    constructor(authenticationService: IAuthenticationService, iframeManagerService: IframeManagerService, crossFrameEventService: CrossFrameEventService, sessionService: ISessionService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    signOut(): void;
    getUsername(): void;
}
