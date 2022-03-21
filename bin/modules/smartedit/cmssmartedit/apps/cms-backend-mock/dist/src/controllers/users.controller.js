"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let UsersController = (() => {
    let UsersController = class UsersController {
        getUserById(uid) {
            return {
                uid,
                readableLanguages: ['en', 'it', 'fr', 'pl', 'hi', 'de'],
                writeableLanguages: ['en', 'it', 'fr', 'pl', 'hi', 'de']
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/users/:userId'),
        tslib_1.__param(0, common_1.Param('userId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UsersController.prototype, "getUserById", null);
    UsersController = tslib_1.__decorate([
        common_1.Controller()
    ], UsersController);
    return UsersController;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map