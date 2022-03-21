"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
let MediaController = (() => {
    let MediaController = class MediaController {
        constructor(mediaService) {
            this.mediaService = mediaService;
        }
        createMediaItem() {
            const mediaCount = this.mediaService.getMediaCount();
            const media = {
                id: mediaCount + '',
                uuid: 'more_bckg.png',
                code: 'more_bckg.png',
                description: 'more_bckg.png',
                altText: 'more_bckg.png',
                realFileName: 'more_bckg.png',
                url: '/apps/cms-smartedit-e2e/generated/images/more_bckg.png'
            };
            this.mediaService.addMedia(media);
            return media;
        }
        getMediaItemByUUID(uuid) {
            const resultMedia = this.mediaService.getMediaByCode(uuid);
            if (resultMedia) {
                return resultMedia;
            }
            return this.mediaService.getFirstMedia();
        }
        getMediaItemByNamedQuery(query) {
            let resultMedia = [];
            if (query.currentPage === '0') {
                const search = new Map();
                query.params.split(',').forEach((param) => {
                    const paramSplit = param.split(':');
                    search.set(paramSplit[0], paramSplit.length === 2 ? paramSplit[1] : '');
                });
                resultMedia = this.mediaService.filterMediaByInput(search.get('code'));
            }
            return { media: resultMedia };
        }
    };
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/media*'),
        common_1.HttpCode(200),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], MediaController.prototype, "createMediaItem", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/media/:uuid'),
        tslib_1.__param(0, common_1.Param('uuid')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MediaController.prototype, "getMediaItemByUUID", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/media*'),
        tslib_1.__param(0, common_1.Query()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MediaController.prototype, "getMediaItemByNamedQuery", null);
    MediaController = tslib_1.__decorate([
        common_1.Controller(),
        tslib_1.__metadata("design:paramtypes", [services_1.MediaService])
    ], MediaController);
    return MediaController;
})();
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map