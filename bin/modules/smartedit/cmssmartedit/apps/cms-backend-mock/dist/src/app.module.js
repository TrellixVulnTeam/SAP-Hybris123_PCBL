"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const controllers_1 = require("./controllers");
const dynamic_fixture_module_1 = require("./dynamic-fixture/dynamic-fixture.module");
const services_1 = require("./services");
let AppModule = (() => {
    let AppModule = class AppModule {
    };
    AppModule = tslib_1.__decorate([
        common_1.Module({
            imports: [dynamic_fixture_module_1.DynamicFixtureModule.forRoot({ baseURL: '$$$' })],
            controllers: [
                app_controller_1.AppController,
                controllers_1.PagesAndNavigationsController,
                controllers_1.TypesController,
                controllers_1.LanguagesController,
                controllers_1.PagesController,
                controllers_1.MiscellaneousController,
                controllers_1.RestrictionsController,
                controllers_1.MediaController,
                controllers_1.VersionsController,
                controllers_1.UserGroupsController,
                controllers_1.UsersController,
                controllers_1.ProductsController,
                controllers_1.InboxController,
                controllers_1.PermissionsController,
                controllers_1.WorkflowsController,
                controllers_1.SynchronizationController
            ],
            providers: [services_1.WorkflowsService, services_1.MediaService, services_1.VersionsService, services_1.SynchronizationService]
        })
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map