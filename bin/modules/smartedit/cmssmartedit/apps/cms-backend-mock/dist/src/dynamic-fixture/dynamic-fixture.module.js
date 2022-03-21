"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicFixtureModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const fixture_adjustment_interceptor_1 = require("./interceptors/fixture-adjustment.interceptor");
const config_service_1 = require("./services/config.service");
const storage_service_1 = require("./services/storage.service");
const storage_controller_1 = require("./storage.controller");
let DynamicFixtureModule = (() => {
    var DynamicFixtureModule_1;
    let DynamicFixtureModule = DynamicFixtureModule_1 = class DynamicFixtureModule {
        static forRoot(config) {
            return {
                module: DynamicFixtureModule_1,
                providers: [
                    {
                        provide: constants_1.DYNAMIC_FIXTURE_CONFIG,
                        useValue: config
                    },
                    config_service_1.ConfigService,
                    storage_service_1.StorageService,
                    {
                        provide: core_1.APP_INTERCEPTOR,
                        useClass: fixture_adjustment_interceptor_1.FixtureAdjustmentInterceptor
                    }
                ],
                controllers: [storage_controller_1.StorageController]
            };
        }
    };
    DynamicFixtureModule = DynamicFixtureModule_1 = tslib_1.__decorate([
        common_1.Module({})
    ], DynamicFixtureModule);
    return DynamicFixtureModule;
})();
exports.DynamicFixtureModule = DynamicFixtureModule;
//# sourceMappingURL=dynamic-fixture.module.js.map