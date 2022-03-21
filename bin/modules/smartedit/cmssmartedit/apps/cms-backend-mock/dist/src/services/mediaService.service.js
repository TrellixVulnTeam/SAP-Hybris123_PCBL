"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const media_1 = require("../../fixtures/constants/media");
let MediaService = (() => {
    let MediaService = class MediaService {
        constructor() {
            this.currentMedia = [...media_1.media];
        }
        getMedia() {
            return this.currentMedia;
        }
        getMediaByCode(code) {
            return this.currentMedia.find((m) => m.code === code);
        }
        getFirstMedia() {
            return this.currentMedia[0];
        }
        filterMediaByInput(input) {
            return input
                ? this.currentMedia.filter((mediaItem) => Object.values(mediaItem).find((propertyValue) => propertyValue.includes(input)) !== undefined)
                : this.currentMedia;
        }
        addMedia(m) {
            this.currentMedia.push(m);
        }
        getMediaCount() {
            return this.currentMedia.length;
        }
    };
    MediaService = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], MediaService);
    return MediaService;
})();
exports.MediaService = MediaService;
//# sourceMappingURL=mediaService.service.js.map