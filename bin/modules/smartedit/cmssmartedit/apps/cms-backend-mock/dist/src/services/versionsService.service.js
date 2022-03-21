"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const pages_1 = require("../../fixtures/constants/pages");
let VersionsService = (() => {
    let VersionsService = class VersionsService {
        constructor() {
            this.pageMockVersions = lodash_1.cloneDeep(pages_1.pageMocks);
        }
        filterVersionsByMask(siteId, pageUUID, mask) {
            const pageMock = this.getPageMock(siteId, pageUUID);
            if (pageMock) {
                return pageMock.versions.filter((version) => !!mask ? version.label.toUpperCase().indexOf(mask.toUpperCase()) > -1 : true);
            }
            return [];
        }
        updatePageMockVersion(siteId, pageUUID, versionId, newVersion) {
            const pageMock = this.getPageMock(siteId, pageUUID);
            if (pageMock) {
                pageMock.versions = pageMock.versions.map((version) => {
                    const tempVersion = Object.assign({}, version);
                    if (tempVersion.uid === versionId) {
                        tempVersion.description = newVersion.description;
                        tempVersion.label = newVersion.label;
                    }
                    return tempVersion;
                });
            }
        }
        getPageMock(siteId, pageUUID) {
            return this.pageMockVersions.find((pageMock) => pageMock.siteId === siteId && pageMock.pageUUID === pageUUID);
        }
        deletePageVersionByID(versionID) {
            this.pageMockVersions[0].versions = this.pageMockVersions[0].versions.filter((version) => version.uid !== versionID);
        }
        getPageVersions() {
            return this.pageMockVersions;
        }
        sliceVersions(currentPage, pageSize, versions) {
            if (!Number.isNaN(currentPage) && !Number.isNaN(pageSize)) {
                return versions.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
            }
            return versions;
        }
        refreshPageMockVersions() {
            this.pageMockVersions = lodash_1.cloneDeep(pages_1.pageMocks);
        }
    };
    VersionsService = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], VersionsService);
    return VersionsService;
})();
exports.VersionsService = VersionsService;
//# sourceMappingURL=versionsService.service.js.map