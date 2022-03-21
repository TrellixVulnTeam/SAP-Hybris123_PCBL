"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureAdjustmentInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const operators_1 = require("rxjs/operators");
const storage_service_1 = require("../services/storage.service");
let FixtureAdjustmentInterceptor = (() => {
    let FixtureAdjustmentInterceptor = class FixtureAdjustmentInterceptor {
        constructor(storageService) {
            this.storageService = storageService;
        }
        intercept(context, next) {
            return next.handle().pipe(operators_1.map((body) => {
                const request = context.switchToHttp().getRequest();
                const replacementBody = this.storageService.replaceFixture(request.originalUrl);
                if (replacementBody) {
                    return replacementBody;
                }
                const cloneBody = lodash_1.cloneDeep(body);
                this.storageService.modifyFixture(request.originalUrl, cloneBody);
                return cloneBody;
            }));
        }
    };
    FixtureAdjustmentInterceptor = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [storage_service_1.StorageService])
    ], FixtureAdjustmentInterceptor);
    return FixtureAdjustmentInterceptor;
})();
exports.FixtureAdjustmentInterceptor = FixtureAdjustmentInterceptor;
//# sourceMappingURL=fixture-adjustment.interceptor.js.map