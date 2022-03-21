import { CloneableUtils, InternalFeature, IFeatureService, IToolbarItem, IToolbarServiceFactory } from 'smarteditcommons';
/** @internal */
export declare class FeatureService extends IFeatureService {
    private toolbarServiceFactory;
    private features;
    constructor(toolbarServiceFactory: IToolbarServiceFactory, cloneableUtils: CloneableUtils);
    getFeatureProperty(featureKey: string, propertyName: keyof InternalFeature): Promise<string | string[] | (() => void)>;
    getFeatureKeys(): string[];
    addToolbarItem(configuration: IToolbarItem): Promise<void>;
    protected _registerAliases(configuration: InternalFeature): Promise<void>;
    private _getFeatureByKey;
}
