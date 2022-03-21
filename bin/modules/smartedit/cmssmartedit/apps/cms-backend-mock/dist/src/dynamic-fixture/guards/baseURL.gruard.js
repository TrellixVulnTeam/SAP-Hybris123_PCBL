"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseURLGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("../services/config.service");
let BaseURLGuard = (() => {
    let BaseURLGuard = class BaseURLGuard {
        constructor(configService) {
            this.configService = configService;
        }
        canActivate(context) {
            const baseURL = this.configService.getBaseURL();
            const currentBaseURL = context.switchToHttp().getRequest().path.split('/')[1];
            return baseURL === currentBaseURL;
        }
    };
    BaseURLGuard = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [config_service_1.ConfigService])
    ], BaseURLGuard);
    return BaseURLGuard;
})();
exports.BaseURLGuard = BaseURLGuard;
//# sourceMappingURL=baseURL.gruard.js.map