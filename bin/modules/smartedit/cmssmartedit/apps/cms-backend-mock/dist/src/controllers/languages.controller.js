"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguagesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let LanguagesController = (() => {
    let LanguagesController = class LanguagesController {
        getLanguages() {
            return {
                languages: [
                    {
                        nativeName: 'English',
                        isocode: 'en',
                        name: 'English',
                        required: true
                    },
                    {
                        nativeName: 'French',
                        isocode: 'fr',
                        required: false
                    },
                    {
                        nativeName: 'Italian',
                        isocode: 'it'
                    },
                    {
                        nativeName: 'Polish',
                        isocode: 'pl'
                    },
                    {
                        nativeName: 'Hindi',
                        isocode: 'hi'
                    }
                ]
            };
        }
        getI18NLanguages() {
            return {
                languages: [
                    {
                        isoCode: 'en',
                        name: 'English'
                    },
                    {
                        isoCode: 'fr',
                        name: 'French'
                    }
                ]
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteUID/languages'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], LanguagesController.prototype, "getLanguages", null);
    tslib_1.__decorate([
        common_1.Get('smarteditwebservices/v1/i18n/languages'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], LanguagesController.prototype, "getI18NLanguages", null);
    LanguagesController = tslib_1.__decorate([
        common_1.Controller()
    ], LanguagesController);
    return LanguagesController;
})();
exports.LanguagesController = LanguagesController;
//# sourceMappingURL=languages.controller.js.map