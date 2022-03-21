import { IPage } from '../../fixtures/entities/pages';
export declare class PagesController {
    getFallbackPages(): {
        uids: string[];
    };
    getPageContentSlotComponents(): {
        pageContentSlotComponentList: import("../../fixtures/entities/pageContents").IPageContentSlotComponent[];
    };
    getPageContentSlotContainers(): {
        pageContentSlotContainerList: never[];
    };
    getPageContentSlots(versionId: string, slotId: string): {
        pageContentSlotList: import("../../fixtures/entities/pageContents").IPageContentSlot[];
    };
    getPageTemplateData(): {
        templates: {
            frontEndName: string;
            name: string;
            previewIcon: string;
            uid: string;
            uuid: string;
        }[];
    };
    getVariationPages(pageId: string): {
        uids: string[];
    };
    getPageByID(pageId: string): IPage | {
        uids: never[];
    };
    createPage(payload: any): (number | {
        errors: {
            message: string;
            reason: string;
            subject: string;
            subjectType: string;
            type: string;
        }[];
    })[] | {
        uid: string;
    };
    getDefaultPages(typeCode: string): {
        pagination: {
            count: number;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        pages: IPage[];
    } | {
        pages: IPage[];
        pagination?: undefined;
    };
}
