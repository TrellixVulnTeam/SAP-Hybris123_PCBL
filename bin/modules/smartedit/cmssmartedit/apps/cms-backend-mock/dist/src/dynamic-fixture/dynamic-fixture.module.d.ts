import { DynamicModule } from '@nestjs/common';
import { DynamicFixtureOptions } from './interfaces';
export declare class DynamicFixtureModule {
    static forRoot(config: DynamicFixtureOptions): DynamicModule;
}
