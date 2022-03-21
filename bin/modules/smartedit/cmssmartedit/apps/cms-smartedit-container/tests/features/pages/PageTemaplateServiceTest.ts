/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSPageTypes } from 'cmscommons';
import { PageTemplateType } from 'cmssmarteditcontainer/services/pages/types';
import { PageTemplateService } from 'cmssmarteditcontainer/services/PageTemplateService';
import { IRestService, IRestServiceFactory } from 'smarteditcommons'; // CMSX-10265: Same Name but UT passed

describe('PageTemplateService', () => {
    let service: PageTemplateService;
    let restServiceFactory: jasmine.SpyObj<IRestServiceFactory>;
    let restService: jasmine.SpyObj<IRestService<PageTemplateType>>;

    beforeEach(() => {
        restServiceFactory = jasmine.createSpyObj<IRestServiceFactory>('restServiceFactory', [
            'get'
        ]);
        restService = jasmine.createSpyObj<IRestService<PageTemplateType>>('restService', ['get']);

        restServiceFactory.get.and.returnValue(restService);

        service = new PageTemplateService(restServiceFactory);
    });

    describe('getPageTemplatesForType', () => {
        const returnedTemplates: PageTemplateType[] = [
            {
                frontEndName: 'layout/landingLayout2Page',
                name: 'Landing Page 2 Template',
                uid: 'LandingPage2Template',
                uuid: 'uuidLandingPage2'
            },
            {
                frontEndName: 'category/productListPage',
                name: 'Product List Page Template',
                uid: 'ProductListPageTemplate',
                uuid: 'uuidproductListPage'
            },
            {
                frontEndName: 'account/accountRegisterPage',
                name: 'account reigster page',
                uid: 'acountregisterpage',
                uuid: 'uuidacountregisterpage'
            },
            {
                frontEndName: 'checkout/checkoutRegisterPage',
                name: 'checkout register page',
                uid: 'checkoutresiterpage',
                uuid: 'uuidcheckoutresiterpage'
            }
        ];

        it('WHEN called THEN it should return templates without non supported templates', async () => {
            restService.get.and.returnValue({ templates: returnedTemplates });

            const actual = await service.getPageTemplatesForType(
                { context: 'context' },
                CMSPageTypes.ContentPage
            );

            expect(restService.get).toHaveBeenCalledWith({
                pageTypeCode: CMSPageTypes.ContentPage,
                active: true,
                context: 'context'
            });
            expect(actual).toEqual({
                templates: [returnedTemplates[0], returnedTemplates[1]]
            });
        });
    });
});
