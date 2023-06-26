const shortUuid = require("short-uuid");
const _ = require("lodash");
const logger = require("../utils/logger.js");

const requestIdKey = Symbol("requestIdKey");

module.exports.middleware = (req, res, next) => {
    const created = new Date();
    const requestId = req.header("x-request-id") || shortUuid.generate();
    res.set("x-request-id", requestId);
    req[requestId] = requestId;

    const reqInfo = {
        requestId,
        Headers: _.pick(req.headers, ["accept"]),
    };

    logger.info(`incoming request ${req.method}:${req.originalUrl}`, reqInfo);

    res.on("finish", () => {
        const responseInfo = _.pick(res, [
            "statusCode",
            "statusMessage",
            "_hasBody",
        ]);
        const headers = res.getHeaders();
        responseInfo.headers = _.pick(headers, [
            "x-request-id",
            "content-type",
        ]);
        const reqTime = Date.now() - created;
        logger.info(
            `Request ${req.method}: ${req.originalUrl} finished in ${reqTime}ms`,
            responseInfo
        );
    });
    next();
};

module.exports.getRequestId = (req) => req[requestIdKey];
