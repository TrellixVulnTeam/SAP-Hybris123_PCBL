/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Inject } from '@angular/core';
import { DRAG_AND_DROP_EVENTS } from 'cmscommons';
import {
    DragAndDropService,
    GatewayFactory,
    ID_ATTRIBUTE,
    ISharedDataService,
    MessageGateway,
    Payload,
    SeDowngradeService,
    SystemEventService,
    TYPE_ATTRIBUTE,
    UUID_ATTRIBUTE,
    YJQUERY_TOKEN
} from 'smarteditcommons';

export const ENABLE_CLONE_ON_DROP = 'enableCloneComponentOnDrop';

@SeDowngradeService()
export class CmsDragAndDropService {
    private static readonly CMS_DRAG_AND_DROP_ID = 'se.cms.dragAndDrop';
    private static readonly TARGET_SELECTOR = '';
    private static readonly SOURCE_SELECTOR =
        ".smartEditComponent[data-smartedit-component-type!='ContentSlot']";
    private static readonly COMPONENT_SELECTOR = '.smartEditComponent';

    private gateway: MessageGateway;

    constructor(
        private dragAndDropService: DragAndDropService,
        private gatewayFactory: GatewayFactory,
        private sharedDataService: ISharedDataService,
        private systemEventService: SystemEventService,
        @Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic
    ) {
        this.gateway = this.gatewayFactory.createGateway('cmsDragAndDrop');
    }

    public register(): void {
        this.dragAndDropService.register({
            id: CmsDragAndDropService.CMS_DRAG_AND_DROP_ID,
            sourceSelector: CmsDragAndDropService.SOURCE_SELECTOR,
            targetSelector: CmsDragAndDropService.TARGET_SELECTOR,
            startCallback: (event: DragEvent) => this.onStart(event),
            stopCallback: () => this.onStop(),
            enableScrolling: false
        });
    }

    public unregister(): void {
        this.dragAndDropService.unregister([CmsDragAndDropService.CMS_DRAG_AND_DROP_ID]);
    }

    public apply(): void {
        this.dragAndDropService.apply(null);
    }

    public update(): void {
        this.dragAndDropService.update(CmsDragAndDropService.CMS_DRAG_AND_DROP_ID);
    }

    private async onStart(event: DragEvent): Promise<void> {
        const cloneOnDrop = await this.sharedDataService.get(ENABLE_CLONE_ON_DROP);
        const component = this.getSelector(event.target).closest(
            CmsDragAndDropService.COMPONENT_SELECTOR
        );

        const dragInfo: Payload = {
            componentId: component.attr(ID_ATTRIBUTE),
            componentUuid: component.attr(UUID_ATTRIBUTE),
            componentType: component.attr(TYPE_ATTRIBUTE),
            slotUuid: null,
            slotId: null,
            cloneOnDrop
        };

        this.gateway.publish(DRAG_AND_DROP_EVENTS.DRAG_STARTED, dragInfo);
        this.systemEventService.publishAsync(DRAG_AND_DROP_EVENTS.DRAG_STARTED);
    }

    private onStop(): void {
        this.gateway.publish(DRAG_AND_DROP_EVENTS.DRAG_STOPPED, null);
    }

    private getSelector(selector: EventTarget): JQuery<EventTarget> {
        return this.yjQuery(selector);
    }
}
