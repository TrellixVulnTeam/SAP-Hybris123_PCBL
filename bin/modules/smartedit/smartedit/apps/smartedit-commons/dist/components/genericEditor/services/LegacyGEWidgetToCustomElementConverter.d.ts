import { UpgradeModule } from '@angular/upgrade/static';
import { WindowUtils } from 'smarteditcommons/utils';
export declare class LegacyGEWidgetToCustomElementConverter {
    private upgrade;
    private windowUtils;
    static readonly TEMPLATE_WIDGET_NAME = "se-template-ge-widget";
    constructor(upgrade: UpgradeModule, windowUtils: WindowUtils);
    convert(): void;
}
