const { Sequelize } = require("sequelize");
const logger = require("../utils/logger.js");
const sequelizeOptions = require("./sequelize-options.js");

const sequelize = new Sequelize(sequelizeOptions.development);
module.exports.sequelize = sequelize;

const models = {
    // AreaExperience: require("../models/area_experience.js"),
    // AreaKeyword: require("../models/area_keyword.js"),
    // Area: require("../models/area.js"),
    // Education: require("../models/education.js"),
    // Experience: require("../models/experience.js"),
    // KeywordExperience: require("../models/keyword_experience.js"),
    // Keyword: require("../models/keyword.js"),
    // Person: require("../models/person.js"),
};

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
};
