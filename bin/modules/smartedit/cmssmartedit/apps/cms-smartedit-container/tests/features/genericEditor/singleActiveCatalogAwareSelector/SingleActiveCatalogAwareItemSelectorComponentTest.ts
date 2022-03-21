/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SingleActiveCatalogAwareItemSelectorComponent } from 'cmssmarteditcontainer/components/legacyGenericEditor/singleActiveCatalogAwareSelector/SingleActiveCatalogAwareItemSelectorComponent';
import { CMSLinkItem } from 'cmssmarteditcontainer/components/legacyGenericEditor/singleActiveCatalogAwareSelector/types';
import { cloneDeep } from 'lodash';
import {
    GenericEditorWidgetData,
    ICatalogService,
    GenericEditorField,
    IBaseCatalog
} from 'smarteditcommons';

describe('SingleActiveCatalogAwareItemSelectorComponent', () => {
    let component: SingleActiveCatalogAwareItemSelectorComponent;
    let injectedData: GenericEditorWidgetData<CMSLinkItem>;
    let catalogService: jasmine.SpyObj<ICatalogService>;

    const mockInjectedData = {
        field: {
            i18nKey: 'i18nkey',
            paged: false,
            editable: false,
            idAttribute: '',
            labelAttributes: [],
            dependsOn: '',
            propertyType: '',
            cmsStructureType: 'SingleOnlineProductSelector'
        },
        model: {
            productCatalog: ''
        },
        qualifier: '',
        editor: {
            form: {
                pristine: {
                    productCatalog: ''
                }
            }
        }
    } as GenericEditorWidgetData<CMSLinkItem>;

    const mockCatalogs = ([
        { catalogId: 'catalogId1', name: { en: 'catalog 1' } },
        { catalogId: 'catalogId2', name: { en: 'catalog 2' } },
        { catalogId: 'catalogId3', name: { en: 'catalog 3' } }
    ] as unknown) as IBaseCatalog[];

    beforeEach(() => {
        injectedData = cloneDeep(mockInjectedData);

        catalogService = jasmine.createSpyObj<ICatalogService>('catalogService', [
            'getProductCatalogsBySiteKey'
        ]);
        catalogService.getProductCatalogsBySiteKey.and.returnValue(Promise.resolve(mockCatalogs));

        component = new SingleActiveCatalogAwareItemSelectorComponent(injectedData, catalogService);
    });

    it('WHEN initialized THEN it should set dropdown attributes', async () => {
        await component.ngOnInit();

        expect(component.propertyType).toEqual('product');
        expect(component.productCatalogField).toEqual({
            idAttribute: 'catalogId',
            labelAttributes: ['name'],
            editable: true,
            propertyType: 'productCatalog'
        } as GenericEditorField);
        expect(component.mainDropDownI18nKey).toEqual('i18nkey');

        expect(component.field).toEqual({
            paged: true,
            editable: true,
            idAttribute: 'uid',
            labelAttributes: ['name'],
            dependsOn: 'productCatalog',
            propertyType: 'product',
            cmsStructureType: 'SingleOnlineProductSelector'
        } as GenericEditorField);
    });

    it('WHEN initialized and there is only one catalog found THEN it should set catalogs, model - product catalog and catalog name', async () => {
        catalogService.getProductCatalogsBySiteKey.and.returnValue(
            Promise.resolve(mockCatalogs.slice(0, 1))
        );
        await component.ngOnInit();

        expect(component.catalogs).toEqual([mockCatalogs[0]]);
        expect(component.model.productCatalog).toEqual('catalogId1');
        expect(component.editor.form.pristine.productCatalog).toEqual('catalogId1');
        expect(component.catalogName).toEqual({ en: 'catalog 1' });
    });

    it('WHEN initialized and there is more than one catalog found THEN it should set catalogs', async () => {
        await component.ngOnInit();

        expect(component.catalogs).toEqual(mockCatalogs);
        expect(component.model.productCatalog).toEqual('');
        expect(component.editor.form.pristine.productCatalog).toEqual('');
        expect(component.catalogName).toEqual({});
    });
});
