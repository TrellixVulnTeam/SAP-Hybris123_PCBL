/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSPageTypes, PAGE_TEMPLATES_URI } from 'cmscommons';
import {
    IRestService,
    IRestServiceFactory,
    IUriContext,
    SeDowngradeService
} from 'smarteditcommons';
import { PageTemplateType } from './pages/types';

const NON_SUPPORTED_TEMPLATES = [
    'layout/landingLayout1Page',
    'layout/landingLayout3Page',
    'layout/landingLayout4Page',
    'layout/landingLayout5Page',
    'layout/landingLayout6Page',
    'layout/landingLayoutPage',
    'account/accountRegisterPage',
    'checkout/checkoutRegisterPage'
];

export interface PageTemplateResponse {
    templates: PageTemplateType[];
}

@SeDowngradeService()
export class PageTemplateService {
    private pageTemplateRestService: IRestService<PageTemplateResponse>;

    constructor(restServiceFactory: IRestServiceFactory) {
        this.pageTemplateRestService = restServiceFactory.get(PAGE_TEMPLATES_URI);
    }

    public async getPageTemplatesForType(
        uriContext: IUriContext,
        pageType: CMSPageTypes
    ): Promise<PageTemplateResponse> {
        const params = {
            pageTypeCode: pageType,
            active: true,
            ...uriContext
        };

        const pageTemplates = await this.pageTemplateRestService.get(params);
        return {
            templates: pageTemplates.templates.filter(
                (pageTemplate) => !NON_SUPPORTED_TEMPLATES.includes(pageTemplate.frontEndName)
            )
        };
    }
}
