import { PersonalizationsmarteditContextUtils } from "personalizationcommons";
import { PersonalizationsmarteditContextServiceReverseProxy } from "personalizationsmartedit/service/PersonalizationsmarteditContextServiceInnerReverseProxy";
import { Personalization } from "personalizationcommons";
import { Customize } from "personalizationcommons";
import { SeData } from "personalizationcommons";
import { CombinedView } from "personalizationcommons";
export declare class PersonalizationsmarteditContextService {
    protected yjQuery: any;
    protected contextualMenuService: any;
    protected personalizationsmarteditContextServiceReverseProxy: PersonalizationsmarteditContextServiceReverseProxy;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected personalization: Personalization;
    protected customize: Customize;
    protected combinedView: CombinedView;
    protected seData: SeData;
    constructor(yjQuery: any, contextualMenuService: any, personalizationsmarteditContextServiceReverseProxy: PersonalizationsmarteditContextServiceReverseProxy, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils);
    getPersonalization(): Personalization;
    setPersonalization(personalization: Personalization): void;
    getCustomize(): Customize;
    setCustomize(customize: Customize): void;
    getCombinedView(): CombinedView;
    setCombinedView(combinedView: CombinedView): void;
    getSeData(): SeData;
    setSeData(seData: SeData): void;
    isCurrentPageActiveWorkflowRunning(): Promise<boolean>;
}
