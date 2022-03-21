/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    diNameUtils,
    CATALOG_VERSION_PERMISSIONS_RESOURCE_URI_CONSTANT,
    DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME,
    LegacySmarteditCommonsModule,
    ModalServiceModule,
    SeModule
} from 'smarteditcommons';

import { YAnnouncementBoardComponent } from '../components/announcements/yAnnouncementBoardComponent';
import { YAnnouncementComponent } from '../components/announcements/yAnnouncementComponent';
import { FilterByFieldFilter } from './filters/FilterByFieldFilter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgCookiesModule = require('angular-cookies'); // Only supports CommonJS

/**
 * Module containing all the services shared within the smartedit container application
 */
@SeModule({
    declarations: [FilterByFieldFilter, YAnnouncementBoardComponent, YAnnouncementComponent],
    imports: [
        'seConstantsModule',
        LegacySmarteditCommonsModule,
        NgCookiesModule,
        'functionsModule',
        'resourceLocationsModule',
        'yLoDashModule',
        ModalServiceModule
    ],
    providers: [
        /**
         * Path to fetch permissions of a given catalog version.
         */
        diNameUtils.makeValueProvider({
            CATALOG_VERSION_PERMISSIONS_RESOURCE_URI: CATALOG_VERSION_PERMISSIONS_RESOURCE_URI_CONSTANT
        }),
        diNameUtils.makeValueProvider({
            DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME
        })
    ]
})
export class LegacySmarteditServicesModule {}
