/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CATALOG_DETAILS_COLUMNS } from 'smarteditcommons';
import { HomePageLinkComponent } from '../components/HomePageLinkComponent';
import { CatalogDetailsService } from './CatalogDetailsService';

describe('catalog details service', () => {
    // Service Under Test
    let catalogDetailsService: CatalogDetailsService;
    const defaultItem = {
        component: HomePageLinkComponent
    };

    // Set-up Service Under Test
    beforeEach(() => {
        catalogDetailsService = new CatalogDetailsService();
    });

    it('Should have an empty lists in the begining(left and right sides) ', () => {
        expect(catalogDetailsService.getItems().left).toEqual([defaultItem]);
        expect(catalogDetailsService.getItems().right).toEqual([]);
    });

    it('Should add items to the list at the left side', () => {
        const theItems = [{ include: 'a' }, { include: 'b' }, { include: 'c' }];
        catalogDetailsService.addItems(theItems, CATALOG_DETAILS_COLUMNS.LEFT);
        expect(catalogDetailsService.getItems().left).toEqual([...theItems, defaultItem]);
    });

    it('Should add items to the list at the right side', () => {
        const theItems = [{ include: 'a' }, { include: 'b' }, { include: 'c' }];
        catalogDetailsService.addItems(theItems, CATALOG_DETAILS_COLUMNS.RIGHT);
        expect(catalogDetailsService.getItems().right).toEqual(theItems);
    });

    it('Should add items to the list by sequences at the left(default) side', () => {
        const items0 = [{ include: 'a' }, { include: 'b' }];
        const items1 = [{ include: 'c' }, { include: 'd' }];
        const items2 = [{ include: 'e' }, { include: 'f' }];

        catalogDetailsService.addItems(items0, CATALOG_DETAILS_COLUMNS.LEFT);
        catalogDetailsService.addItems(items1, CATALOG_DETAILS_COLUMNS.LEFT);
        catalogDetailsService.addItems(items2, CATALOG_DETAILS_COLUMNS.LEFT);

        expect(catalogDetailsService.getItems().left).toEqual([
            ...items0,
            ...items1,
            ...items2,
            defaultItem
        ]);
    });
});
