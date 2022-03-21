import { UpgradeModule } from '@angular/upgrade/static';
import { ILegacyDecoratorToCustomElementConverter, NodeUtils } from 'smarteditcommons';
export declare class LegacyDecoratorToCustomElementConverter implements ILegacyDecoratorToCustomElementConverter {
    private upgrade;
    private nodeUtils;
    private convertedDecorators;
    constructor(upgrade: UpgradeModule, nodeUtils: NodeUtils);
    getScopes(): string[];
    convert(_componentName: string): void;
    convertIfNeeded(componentNames: string[]): void;
}
