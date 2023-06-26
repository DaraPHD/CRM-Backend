// const { Sequelize } = require("sequelize")

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//     }
// )
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
