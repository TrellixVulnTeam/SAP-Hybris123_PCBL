/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISlotRestrictionsService } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(ISlotRestrictionsService)
@GatewayProxied('getAllComponentTypesSupportedOnPage', 'getSlotRestrictions')
export class SlotRestrictionsService extends ISlotRestrictionsService {}
