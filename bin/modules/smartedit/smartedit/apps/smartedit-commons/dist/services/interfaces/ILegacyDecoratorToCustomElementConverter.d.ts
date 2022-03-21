export declare abstract class ILegacyDecoratorToCustomElementConverter {
    getScopes(): string[];
    convert(_componentName: string): void;
    convertIfNeeded(componentNames: string[]): void;
}
