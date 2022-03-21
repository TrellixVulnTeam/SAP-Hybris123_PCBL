/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IRemoveComponentService } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';

@GatewayProxied('removeComponent')
@SeDowngradeService(IRemoveComponentService)
export class RemoveComponentService extends IRemoveComponentService {}
