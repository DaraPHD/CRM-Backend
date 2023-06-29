const logger = require("../utils/logger.js");
const config = require("../config/index.js");

const options = {
    dialect: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    sync: true,
    logging: (...args) => logger.info(...args),
    benchmark: true,
};

module.exports = {
    development: options,
    production: options,
    test: options,
};
