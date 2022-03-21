/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { PAGES_CONTENT_SLOT_RESOURCE_URI } from 'cmscommons';
import { uniq, first } from 'lodash';
import {
    CrossFrameEventService,
    EVENTS,
    IPageInfoService,
    IRestService,
    IRestServiceFactory,
    SeDowngradeService
} from 'smarteditcommons';

export interface IPageContentSlot {
    pageId: string;
    position: string;
    slotId: string;
    slotShared?: boolean;
    slotStatus?: string;
}

export interface IPageContentSlotsResponse {
    pageContentSlotList: IPageContentSlot[];
}

/**
 * PageContentSlotsServiceModule provides methods to load and act on the contentSlots for the page loaded in the storefront.
 */
@SeDowngradeService()
export class PageContentSlotsService {
    private readonly resource: IRestService<IPageContentSlotsResponse>;
    private pageContentSlots: IPageContentSlot[];

    constructor(
        restServiceFactory: IRestServiceFactory,
        private crossFrameEventService: CrossFrameEventService,
        private pageInfoService: IPageInfoService
    ) {
        this.resource = restServiceFactory.get(PAGES_CONTENT_SLOT_RESOURCE_URI);

        this.crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, () =>
            this.reloadPageContentSlots()
        );
    }

    /**
     * This function fetches all the slots of the loaded page.
     *
     * @returns promise that resolves to a collection of content slots information for the loaded page.
     */
    public async getPageContentSlots(): Promise<IPageContentSlot[]> {
        if (!this.pageContentSlots) {
            await this.reloadPageContentSlots();
        }
        return this.pageContentSlots;
    }

    /**
     * Retrieves the slot status of the proved slotId. It can be one of TEMPLATE, PAGE and OVERRIDE.
     *
     * @param slotId of the slot
     *
     * @returns promise that resolves to the status of the slot.
     */
    public async getSlotStatus(slotId: string): Promise<string | null> {
        await this.getPageContentSlots();

        const matchedSlotData = first(
            this.pageContentSlots.filter((pageContentSlot) => pageContentSlot.slotId === slotId)
        );
        return matchedSlotData ? matchedSlotData.slotStatus : null;
    }

    /**
     * Checks if the slot is shared and returns true in case slot is shared and returns false if it is not.
     * Based on this service method the slot shared button is shown or hidden for a particular slotId
     *
     * @param slotId of the slot
     *
     * @returns promise that resolves to true if the slot is shared; Otherwise false.
     */
    public async isSlotShared(slotId: string): Promise<boolean> {
        await this.getPageContentSlots();

        const matchedSlotData = first(
            this.pageContentSlots.filter((pageContentSlot) => pageContentSlot.slotId === slotId)
        );
        return matchedSlotData && matchedSlotData.slotShared;
    }

    /**
     * Fetches content slot list from API
     */
    private async reloadPageContentSlots(): Promise<void> {
        const pageId = await this.pageInfoService.getPageUID();
        const pageContent = await this.resource.get({ pageId });
        this.pageContentSlots = uniq(pageContent.pageContentSlotList || []);
    }
}
