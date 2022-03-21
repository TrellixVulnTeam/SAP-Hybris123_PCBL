/// <reference types="angular-translate" />
import * as angular from "angular";
import { LoDashStatic } from 'lodash';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditRestService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService';
import { PersonalizationsmarteditMessageHandler } from 'personalizationcommons';
export declare class PersonalizationsmarteditContextMenuServiceProxy {
    private modalService;
    private renderService;
    private editorModalService;
    private personalizationsmarteditContextService;
    private personalizationsmarteditRestService;
    protected personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler;
    private lodash;
    protected $translate: angular.translate.ITranslateService;
    private MODAL_BUTTON_ACTIONS;
    private MODAL_BUTTON_STYLES;
    private confirmModalButtons;
    constructor(modalService: any, renderService: any, editorModalService: any, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler, lodash: LoDashStatic, $translate: angular.translate.ITranslateService, MODAL_BUTTON_ACTIONS: any, MODAL_BUTTON_STYLES: any);
    openDeleteAction(config: any): void;
    openAddAction(config: any): void;
    openEditAction(config: any): void;
    openEditComponentAction(config: any): void;
}
