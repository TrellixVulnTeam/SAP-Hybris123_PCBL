/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { IPermissionService, PopupOverlayConfig, SeDowngradeComponent } from 'smarteditcommons';

import {
    ManagePageVersionService,
    RollbackPageVersionService,
    PageVersionSelectionService,
    IPageVersion
} from '../../../services';

interface IButtonConfig {
    i18nKey: string;
    permissions?: string[];
    callback?(versionItem?: IPageVersion): void;
}

@SeDowngradeComponent()
@Component({
    selector: 'se-version-item-menu',
    templateUrl: 'VersionItemMenuComponent.html',
    styleUrls: ['./VersionItemMenuComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionItemMenuComponent implements OnInit {
    @Input() item: IPageVersion;

    public menuItems: IButtonConfig[] = [];
    public popupConfig: PopupOverlayConfig = {
        halign: 'left',
        valign: 'bottom'
    };
    public isMenuOpen = false;

    constructor(
        private managePageVersionService: ManagePageVersionService,
        private pageVersionSelectionService: PageVersionSelectionService,
        private rollbackPageVersionService: RollbackPageVersionService,
        private permissionService: IPermissionService,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        this.menuItems = await this.getPermittedButtons(this.getButtonsConfiguration());
        this.cdr.detectChanges();
    }

    public onButtonClick(event: MouseEvent): void {
        event.stopPropagation();

        this.isMenuOpen = !this.isMenuOpen;
    }

    public hideMenu(): void {
        this.isMenuOpen = false;
    }

    public executeItemCallback(menuItem: IButtonConfig): void {
        menuItem.callback(this.item);

        this.hideMenu();
    }

    private async getPermittedButtons(menuItemsConfig: IButtonConfig[]): Promise<IButtonConfig[]> {
        const buttonsPermissions = menuItemsConfig.map((menuItem: IButtonConfig) =>
            this.permissionService.isPermitted([
                {
                    names: menuItem.permissions
                }
            ])
        );

        const permissions = await Promise.all(buttonsPermissions);
        return menuItemsConfig.filter(
            (_menuItem: IButtonConfig, index: number) => permissions[index]
        );
    }

    private getButtonsConfiguration(): IButtonConfig[] {
        return [
            {
                i18nKey: 'se.cms.version.item.menu.view.label',
                callback: (versionItem: IPageVersion): void => this.viewItemCallback(versionItem),
                permissions: ['se.version.page']
            },
            {
                i18nKey: 'se.cms.version.item.menu.edit.label',
                callback: (versionItem: IPageVersion): void => this.editItemCallback(versionItem),
                permissions: ['se.edit.version.page']
            },
            {
                i18nKey: 'se.cms.version.item.menu.rollback.label',
                callback: (versionItem: IPageVersion): void =>
                    this.rollbackItemCallback(versionItem),
                permissions: ['se.rollback.version.page.versions.menu']
            },
            {
                i18nKey: 'se.cms.version.item.menu.delete.label',
                callback: (versionItem: IPageVersion): void => this.deleteItemCallback(versionItem),
                permissions: ['se.delete.version.page']
            }
        ];
    }

    private deleteItemCallback(versionItem: IPageVersion): void {
        this.managePageVersionService.deletePageVersion(versionItem.uid);
    }

    private editItemCallback(versionItem: IPageVersion): void {
        this.managePageVersionService.editPageVersion(versionItem);
    }

    private viewItemCallback(versionItem: IPageVersion): void {
        this.pageVersionSelectionService.selectPageVersion(versionItem);
    }

    private rollbackItemCallback(versionItem: IPageVersion): void {
        this.rollbackPageVersionService.rollbackPageVersion(versionItem);
    }
}
