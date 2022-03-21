/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GatewayProxied, IStorageService, SeDowngradeService } from 'smarteditcommons';

/** @internal */
@SeDowngradeService(IStorageService)
@GatewayProxied()
export class StorageService extends IStorageService {
    constructor() {
        super();
    }
}
