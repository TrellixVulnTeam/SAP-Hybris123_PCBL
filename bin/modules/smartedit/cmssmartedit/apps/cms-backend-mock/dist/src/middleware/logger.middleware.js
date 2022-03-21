"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };
    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        if (res.statusCode !== 304) {
            console.log(`${req.method} ${req.originalUrl}`);
            console.log(`${res.statusCode}`);
        }
        oldEnd.apply(res, restArgs);
    };
    next();
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map