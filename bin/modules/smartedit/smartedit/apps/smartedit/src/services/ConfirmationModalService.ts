/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GatewayProxied, IConfirmationModalService, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IConfirmationModalService)
@GatewayProxied()
export class ConfirmationModalService extends IConfirmationModalService {}
