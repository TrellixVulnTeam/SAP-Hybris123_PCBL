"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppController = (() => {
    let AppController = class AppController {
        ok() {
            return 'HEALTH:OK';
        }
    };
    tslib_1.__decorate([
        common_1.Get('/'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], AppController.prototype, "ok", null);
    AppController = tslib_1.__decorate([
        common_1.Controller()
    ], AppController);
    return AppController;
})();
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map