"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscellaneousController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const authorization_1 = require("../../fixtures/constants/authorization");
let MiscellaneousController = (() => {
    let MiscellaneousController = class MiscellaneousController {
        getAuthorization(token) {
            return token === 'bearer ' + authorization_1.adminToken.access_token ? authorization_1.adminData : authorization_1.CMSManagerData;
        }
        getComponentType(enumClass) {
            if (enumClass === 'de.mypackage.Orientation') {
                return {
                    enums: [
                        {
                            code: 'vertical',
                            label: 'Vertical'
                        },
                        {
                            code: 'horizontal',
                            label: 'Horizontal'
                        }
                    ]
                };
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        getPreviewTickerURI(payload) {
            const STOREFRONT_URI = 'http://127.0.0.1:9000/generated/pages/storefront.html';
            const resourcePath = payload.siteId === 'apparel' ? payload.resourcePath : STOREFRONT_URI;
            return {
                ticketId: 'dasdfasdfasdfa',
                resourcePath,
                versionId: payload.versionId
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('*authorizationserver/oauth/whoami'),
        tslib_1.__param(0, common_1.Headers('authorization')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MiscellaneousController.prototype, "getAuthorization", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/enums'),
        tslib_1.__param(0, common_1.Query('enumClass')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MiscellaneousController.prototype, "getComponentType", null);
    tslib_1.__decorate([
        common_1.Post('*thepreviewTicketURI'),
        tslib_1.__param(0, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MiscellaneousController.prototype, "getPreviewTickerURI", null);
    MiscellaneousController = tslib_1.__decorate([
        common_1.Controller()
    ], MiscellaneousController);
    return MiscellaneousController;
})();
exports.MiscellaneousController = MiscellaneousController;
//# sourceMappingURL=miscellaneous.controller.js.map