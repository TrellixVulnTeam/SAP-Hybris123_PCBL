"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let ConfigService = (() => {
    let ConfigService = class ConfigService {
        constructor(config) {
            this.baseURL = config.baseURL;
        }
        getBaseURL() {
            return this.baseURL;
        }
    };
    ConfigService = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__param(0, common_1.Inject(constants_1.DYNAMIC_FIXTURE_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ConfigService);
    return ConfigService;
})();
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map