"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stagedCatalogPermissions = void 0;
exports.stagedCatalogPermissions = [
    {
        catalogId: 'some.catalog.id',
        catalogVersion: 'Staged',
        permissions: [
            {
                key: 'read',
                value: 'true'
            },
            {
                key: 'write',
                value: 'true'
            }
        ],
        syncPermissions: [
            {
                canSynchronize: true,
                targetCatalogVersion: 'Online'
            }
        ]
    }
];
//# sourceMappingURL=stagedCatalogPermissions.constant.js.map