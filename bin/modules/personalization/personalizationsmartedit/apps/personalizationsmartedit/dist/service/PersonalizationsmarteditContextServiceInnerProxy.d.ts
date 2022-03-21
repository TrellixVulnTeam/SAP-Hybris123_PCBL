import { CrossFrameEventService } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from "personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner";
import { Customize } from "personalizationcommons";
import { CombinedView } from "personalizationcommons";
import { SeData } from "personalizationcommons";
import { Personalization } from "personalizationcommons";
export declare class PersonalizationsmarteditContextServiceProxy {
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected crossFrameEventService: CrossFrameEventService;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, crossFrameEventService: CrossFrameEventService);
    setPersonalization(newPersonalization: Personalization): void;
    setCustomize(newCustomize: Customize): void;
    setCombinedView(newCombinedView: CombinedView): void;
    setSeData(newSeData: SeData): void;
}
