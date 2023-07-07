const { Sequelize } = require("sequelize");
const logger = require("../utils/logger.js");
const sequelizeOptions = require("./sequelize-options.js");

const sequelize = new Sequelize(sequelizeOptions.development);
module.exports.sequelize = sequelize;

const models = {};

let initialized = false;
module.exports.init = async function init() {
    if (initialized) {
        return;
    }
    initialized = true;
    logger.info("Checking database connection...");
    await sequelize.authenticate().catch((e) => {
        logger.error("Failed while checking connection", e);
        throw new Error("Cannot connect database");
    });

    logger.info("Initializing models...");
    Object.keys(models).forEach((modelName) => {
        const model = models[modelName];
        model.associate(models);
    });
};
