const { Sequelize } = require("sequelize");
const logger = require("./utils/logger.js");
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        sync: true,
        logging: (...args) => logger.info(...args),
        benchmark: true,
    }
);
