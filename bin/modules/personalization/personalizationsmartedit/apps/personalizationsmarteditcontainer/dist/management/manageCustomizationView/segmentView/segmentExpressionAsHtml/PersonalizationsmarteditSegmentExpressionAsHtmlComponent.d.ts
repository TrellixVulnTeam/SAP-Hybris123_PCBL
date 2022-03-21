export declare class PersonalizationsmarteditSegmentExpressionAsHtmlComponent {
    private personalizationsmarteditTriggerService;
    private _segmentExpression;
    private _operators;
    private _emptyGroup;
    private _emptyGroupAndOperators;
    constructor(personalizationsmarteditTriggerService: any);
    get segmentExpression(): any;
    set segmentExpression(newVal: any);
    get operators(): any;
    get emptyGroup(): any;
    get emptyGroupAndOperators(): any;
    getExpressionAsArray(): [];
    getLocalizationKeyForOperator(operator: string): string;
}
