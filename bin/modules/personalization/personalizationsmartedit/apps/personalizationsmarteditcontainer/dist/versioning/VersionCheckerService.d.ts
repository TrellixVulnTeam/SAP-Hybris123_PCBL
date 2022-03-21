import { PersonalizationsmarteditRestService } from "personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService";
interface IPageVersion {
    uid: string;
    itemUUID: string;
    creationtime: Date;
    label: string;
    description?: string;
}
export declare class VersionCheckerService {
    private personalizationsmarteditRestService;
    private pageVersionSelectionService;
    private version;
    constructor(personalizationsmarteditRestService: PersonalizationsmarteditRestService, pageVersionSelectionService: any);
    setVersion(version: IPageVersion): void;
    provideTranlationKey(key: string): Promise<string>;
}
export {};
