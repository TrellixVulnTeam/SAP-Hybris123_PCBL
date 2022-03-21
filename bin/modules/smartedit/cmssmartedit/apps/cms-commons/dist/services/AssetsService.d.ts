import { TestModeService } from 'smarteditcommons';
/**
 * Determines the root of the production and test assets
 */
export declare class AssetsService {
    private testModeService;
    private readonly TEST_ASSETS_SRC;
    private readonly PROD_ASSETS_SRC;
    constructor(testModeService: TestModeService);
    getAssetsRoot(): string;
}
