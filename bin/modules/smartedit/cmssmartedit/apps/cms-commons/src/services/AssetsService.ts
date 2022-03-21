/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDowngradeService, TestModeService } from 'smarteditcommons';

/**
 * Determines the root of the production and test assets
 */
@SeDowngradeService()
export class AssetsService {
    private readonly TEST_ASSETS_SRC = '/web/webroot';
    private readonly PROD_ASSETS_SRC = '/cmssmartedit';

    constructor(private testModeService: TestModeService) {}

    public getAssetsRoot(): string {
        return this.testModeService.isE2EMode() ? this.TEST_ASSETS_SRC : this.PROD_ASSETS_SRC;
    }
}
