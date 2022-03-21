/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { cmsitemsUri } from 'cmscommons';
import { diNameUtils, SeModule } from 'smarteditcommons';

/**
 * @ngdoc overview
 * @name cmsSmarteditServicesModule
 *
 * @description
 * Module containing all the services shared within the CmsSmartEdit application.
 */
@SeModule({
    imports: ['yLoDashModule', 'smarteditServicesModule'],
    providers: [diNameUtils.makeValueProvider({ cmsitemsUri })]
})
export class CmsSmarteditServicesModule {}
