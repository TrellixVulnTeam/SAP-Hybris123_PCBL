/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GatewayProxied, IWaitDialogService, SeDowngradeService } from 'smarteditcommons';

/** @internal */
@SeDowngradeService(IWaitDialogService)
@GatewayProxied()
export class WaitDialogService extends IWaitDialogService {}
