/// <reference types="angular" />
/// <reference types="jquery" />
import { DragAndDropService, GatewayFactory, ISharedDataService, SystemEventService } from 'smarteditcommons';
export declare const ENABLE_CLONE_ON_DROP = "enableCloneComponentOnDrop";
export declare class CmsDragAndDropService {
    private dragAndDropService;
    private gatewayFactory;
    private sharedDataService;
    private systemEventService;
    private yjQuery;
    private static readonly CMS_DRAG_AND_DROP_ID;
    private static readonly TARGET_SELECTOR;
    private static readonly SOURCE_SELECTOR;
    private static readonly COMPONENT_SELECTOR;
    private gateway;
    constructor(dragAndDropService: DragAndDropService, gatewayFactory: GatewayFactory, sharedDataService: ISharedDataService, systemEventService: SystemEventService, yjQuery: JQueryStatic);
    register(): void;
    unregister(): void;
    apply(): void;
    update(): void;
    private onStart;
    private onStop;
    private getSelector;
}
