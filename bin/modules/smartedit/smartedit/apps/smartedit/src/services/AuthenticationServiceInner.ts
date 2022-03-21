/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GatewayProxied, IAuthenticationService, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IAuthenticationService)
@GatewayProxied()
export class AuthenticationService extends IAuthenticationService {}
