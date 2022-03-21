"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSwagger = void 0;
const swagger_tools_1 = require("swagger-tools");
exports.initializeSwagger = async (app, config) => new Promise((resolve) => {
    swagger_tools_1.initializeMiddleware(config, ({ swaggerMetadata, swaggerValidator }) => {
        app.use(swaggerMetadata());
        app.use(swaggerValidator({
            validateResponse: true
        }));
        resolve({ success: true });
    });
});
//# sourceMappingURL=swagger.js.map