"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let StorageService = (() => {
    let StorageService = class StorageService {
        constructor() {
            this.modificationFixtures = new Map();
            this.replacementFixtures = new Map();
        }
        storeModificationFixture(payload) {
            const id = this.generateKey(payload);
            const regExpArray = payload.url.map((url) => new RegExp(url));
            payload.url = regExpArray;
            this.modificationFixtures.set(id, payload);
            return id;
        }
        storeReplacementFixture(payload) {
            const id = this.generateKey(payload);
            const regExpArray = payload.url.map((url) => new RegExp(url));
            payload.url = regExpArray;
            this.replacementFixtures.set(id, payload);
            return id;
        }
        replaceFixture(requestURL) {
            for (const value of this.replacementFixtures.values()) {
                for (const url of value.url) {
                    if (url.test(requestURL)) {
                        return value.replace;
                    }
                }
            }
            return undefined;
        }
        modifyFixture(requestURL, body) {
            for (const value of this.modificationFixtures.values()) {
                for (const url of value.url) {
                    if (url.test(requestURL)) {
                        this.updateProperties(body, value.replace);
                    }
                }
            }
        }
        removeFixture(fixtureID) {
            const id = parseInt(fixtureID, 10);
            this.modificationFixtures.delete(id) || this.replacementFixtures.delete(id);
        }
        removeAllFixtures() {
            this.modificationFixtures.clear();
            this.replacementFixtures.clear();
        }
        updateProperties(fixture, newProperties) {
            Object.keys(newProperties).forEach((key) => {
                let currObject = fixture;
                const subProperties = key.split('.');
                const len = subProperties.length;
                for (let i = 0; i < len - 1; i++) {
                    if (!currObject.hasOwnProperty(subProperties[i])) {
                        return;
                    }
                    currObject = currObject[subProperties[i]];
                }
                currObject[subProperties[len - 1]] = newProperties[key];
            });
        }
        generateKey(payload) {
            const s = JSON.stringify(payload);
            let res = 0;
            for (let i = 0; i < s.length; i++) {
                res = (Math.imul(31, res) + s.charCodeAt(i)) | 0;
            }
            return res;
        }
    };
    StorageService = tslib_1.__decorate([
        common_1.Injectable()
    ], StorageService);
    return StorageService;
})();
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map