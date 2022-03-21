import { DynamicFixtureOptions } from '../interfaces';
export declare class ConfigService {
    private readonly baseURL;
    constructor(config: DynamicFixtureOptions);
    getBaseURL(): string;
}
