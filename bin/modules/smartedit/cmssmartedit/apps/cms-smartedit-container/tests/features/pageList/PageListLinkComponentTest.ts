/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { PageListLinkComponent } from 'cmssmarteditcontainer/components/pages/pageListLink/PageListLinkComponent';
import { CatalogDetailsItemData } from 'smarteditcommons';

describe('PageListLinkComponent', () => {
    let component: PageListLinkComponent;

    const mockCatalogDetails = {
        catalog: { catalogId: 'catalogId' },
        catalogVersion: { version: 'Online' },
        siteId: 'siteId'
    } as CatalogDetailsItemData;

    beforeEach(() => {
        component = new PageListLinkComponent(mockCatalogDetails);
    });

    it('should return proper link to pages', () => {
        const actual = component.getLink();

        expect(actual).toEqual('#!/ng/pages/siteId/catalogId/Online');
    });
});
