export declare class PersonalizationpromotionssmarteditRestService {
    private restServiceFactory;
    private personalizationsmarteditUtils;
    static AVAILABLE_PROMOTIONS: string;
    constructor(restServiceFactory: any, personalizationsmarteditUtils: any);
    getPromotions(catalogVersions: any): Promise<any>;
}
