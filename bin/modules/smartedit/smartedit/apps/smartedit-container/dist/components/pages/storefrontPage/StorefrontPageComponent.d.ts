/// <reference types="angular" />
/// <reference types="jquery" />
import { OnInit } from '@angular/core';
import { IExperienceService } from 'smarteditcommons';
import { IframeManagerService } from '../../../services/iframe/IframeManagerService';
export declare class StorefrontPageComponent implements OnInit {
    private iframeManagerService;
    private experienceService;
    private yjQuery;
    constructor(iframeManagerService: IframeManagerService, experienceService: IExperienceService, yjQuery: JQueryStatic);
    ngOnInit(): void;
}
