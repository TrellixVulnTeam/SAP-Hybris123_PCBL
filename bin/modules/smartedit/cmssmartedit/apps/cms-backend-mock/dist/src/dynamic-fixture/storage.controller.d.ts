import { AdjustmentPayload } from './interfaces/index';
import { StorageService } from './services/storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    storeModificationFixture(body: AdjustmentPayload): number;
    storeReplacementFixture(body: AdjustmentPayload): number;
    removeFixture(fixtureID: string): void;
    removeAllFixtures(): void;
}
