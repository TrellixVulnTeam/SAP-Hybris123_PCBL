/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import '../styling/less/styling.less';
import '../styling/sass/styles.scss';

import { enableProdMode } from '@angular/core';

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

export { ConfigurationObject } from './services/bootstrap/Configuration';
export {
    AlertServiceModule,
    BootstrapService,
    ConfigurationExtractorService,
    DelegateRestService,
    LegacySmarteditServicesModule,
    LoadConfigManagerService,
    SessionService,
    SharedDataService,
    SmarteditBundle,
    SmarteditBundleJsFile,
    StorageService,
    TranslationsFetchService,
    ToolbarModule,
    CatalogAwareRouteResolverHelper,
    ProductService,
    IProductSearch,
    ProductPage
} from './services';
export { SmarteditContainerFactory } from './smarteditcontainer';
