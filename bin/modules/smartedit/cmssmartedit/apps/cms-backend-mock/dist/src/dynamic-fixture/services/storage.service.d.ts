import { AdjustmentPayload } from './../interfaces';
export declare class StorageService {
    private modificationFixtures;
    private replacementFixtures;
    storeModificationFixture(payload: AdjustmentPayload): number;
    storeReplacementFixture(payload: AdjustmentPayload): number;
    replaceFixture(requestURL: string): any;
    modifyFixture(requestURL: string, body: any): void;
    removeFixture(fixtureID: string): void;
    removeAllFixtures(): void;
    private updateProperties;
    private generateKey;
}
