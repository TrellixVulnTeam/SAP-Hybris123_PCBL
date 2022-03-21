/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IPageService } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IPageService)
@GatewayProxied()
export class PageService extends IPageService {
    constructor() {
        super();
    }
}
