/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { RESTRICTION_TYPES_URI } from 'cmscommons';
import { IRestService, RestServiceFactory, SeDowngradeService, TypedMap } from 'smarteditcommons';

export interface IRestrictionType {
    id?: number;
    code: string;
    name: TypedMap<string>;
}
export interface IRestrictionTypeList {
    restrictionTypes: IRestrictionType[];
}
@SeDowngradeService()
export class RestrictionTypesRestService {
    private readonly restrictionTypesRestService: IRestService<IRestrictionTypeList>;

    constructor(private restServiceFactory: RestServiceFactory) {
        this.restrictionTypesRestService = this.restServiceFactory.get(RESTRICTION_TYPES_URI);
    }

    getRestrictionTypes(): Promise<IRestrictionTypeList> {
        return this.restrictionTypesRestService.get();
    }
}
