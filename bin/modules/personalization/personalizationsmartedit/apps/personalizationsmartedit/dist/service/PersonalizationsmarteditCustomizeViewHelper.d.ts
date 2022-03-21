import { Dictionary, LoDashStatic } from 'lodash';
import { PersonalizationsmarteditComponentHandlerService } from "personalizationsmartedit/service/PersonalizationsmarteditComponentHandlerService";
export declare class PersonalizationsmarteditCustomizeViewHelper {
    private personalizationsmarteditComponentHandlerService;
    private lodash;
    constructor(personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService, lodash: LoDashStatic);
    getSourceContainersInfo(): Dictionary<number>;
}
