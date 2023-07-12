const { Sequelize } = require("sequelize");
const logger = require("../utils/logger.js");
const sequelizeOptions = require("./sequelize-options.js");

const sequelize = new Sequelize(sequelizeOptions.development);
module.exports.sequelize = sequelize;

const models = {
    Achievement: require("../models/achievement.js"),
    Background: require("../models/background.js"),
    Board: require("../models/board.js"),
    Card: require("../models/card.js"),
    CardLabel: require("../models/cardLabel.js"),
    Color: require("../models/color.js"),
    Column: require("../models/column.js"),
    Commentary: require("../models/commentary.js"),
    Label: require("../models/label.js"),
    Token: require("../models/token.js"),
    User: require("../models/user.js"),
    UserAchievement: require("../models/userAchievement.js"),
    UserBoard: require("../models/userBoard.js"),
    UserCard: require("../models/userCard.js"),
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
    Object.keys(models).forEach((modelName) => {
        const model = models[modelName];
        model.associate(models);
    });
};
