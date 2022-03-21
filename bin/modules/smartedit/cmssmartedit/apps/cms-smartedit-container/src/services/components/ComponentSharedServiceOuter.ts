/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IComponentSharedService } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IComponentSharedService)
@GatewayProxied()
export class ComponentSharedService extends IComponentSharedService {}
