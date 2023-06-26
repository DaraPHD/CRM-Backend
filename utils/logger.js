const winston = require("winston");
const { MESSAGE } = require("triple-beam");
const jsonStringify = require("fast-safe-stringify");

process.env.TZ = "Europe/Moscow";

const customFormat = winston.format((info) => {
    const stringifiedRest = jsonStringify({
        ...info,
        level: undefined,
        message: undefined,
        splat: undefined,
        timestamp: undefined,
        stack: undefined,
    });
    let msg = `${info.timestamp} ${info.level}: ${info.message}`;
    if (stringifiedRest !== "{}") {
        msg = `${msg} ${stringifiedRest}`;
    }
    if (info.stack) {
        msg = `${msg}\n${info.stack}`;
    }
    info[MESSAGE] = msg;
    return info;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                customFormat()
            ),
            level: "info",
        }),
    ],
});

module.exports = logger;
