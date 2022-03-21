import { Dictionary } from 'lodash';
import { PersonalizationsmarteditCustomizeViewHelper } from 'personalizationsmartedit/service/PersonalizationsmarteditCustomizeViewHelper';
export declare class PersonalizationsmarteditCustomizeViewServiceProxy {
    protected personalizationsmarteditCustomizeViewHelper: PersonalizationsmarteditCustomizeViewHelper;
    constructor(personalizationsmarteditCustomizeViewHelper: PersonalizationsmarteditCustomizeViewHelper);
    getSourceContainersInfo(): Dictionary<number>;
}
