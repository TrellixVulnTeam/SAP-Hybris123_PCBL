export declare class MiscellaneousController {
    getAuthorization(token: string): import("../../fixtures/entities/authorization").IAuthData;
    getComponentType(enumClass: string): {
        enums: {
            code: string;
            label: string;
        }[];
    };
    getPreviewTickerURI(payload: any): {
        ticketId: string;
        resourcePath: any;
        versionId: any;
    };
}
