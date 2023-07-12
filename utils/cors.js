const HttpStatus = require("http-status-codes");
const cors = require("cors");
const _ = require("lodash");
const config = require("../config/index.js");

const allowedHosts = _.get(config, "BACKEND_ALLOWED_HOSTS", "").split(" ");

module.exports = cors({
    origin: (origin, next) => {
        if (!origin) {
            return next();
        }

        if (allowedHosts.includes(origin)) {
            return next(null, origin);
        }

        const error = new Error("Origin is not allowed");
        error.code = HttpStatus.StatusCodes.BAD_REQUEST;
        return next(error);
    },
});
