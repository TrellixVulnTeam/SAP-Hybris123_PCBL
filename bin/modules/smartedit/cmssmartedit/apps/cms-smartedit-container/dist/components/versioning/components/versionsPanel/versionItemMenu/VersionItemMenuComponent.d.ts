import { ChangeDetectorRef, OnInit } from '@angular/core';
import { IPermissionService, PopupOverlayConfig } from 'smarteditcommons';
import { ManagePageVersionService, RollbackPageVersionService, PageVersionSelectionService, IPageVersion } from '../../../services';
interface IButtonConfig {
    i18nKey: string;
    permissions?: string[];
    callback?(versionItem?: IPageVersion): void;
}
export declare class VersionItemMenuComponent implements OnInit {
    private managePageVersionService;
    private pageVersionSelectionService;
    private rollbackPageVersionService;
    private permissionService;
    private cdr;
    item: IPageVersion;
    menuItems: IButtonConfig[];
    popupConfig: PopupOverlayConfig;
    isMenuOpen: boolean;
    constructor(managePageVersionService: ManagePageVersionService, pageVersionSelectionService: PageVersionSelectionService, rollbackPageVersionService: RollbackPageVersionService, permissionService: IPermissionService, cdr: ChangeDetectorRef);
    ngOnInit(): Promise<void>;
    onButtonClick(event: MouseEvent): void;
    hideMenu(): void;
    executeItemCallback(menuItem: IButtonConfig): void;
    private getPermittedButtons;
    private getButtonsConfiguration;
    private deleteItemCallback;
    private editItemCallback;
    private viewItemCallback;
    private rollbackItemCallback;
}
export {};
