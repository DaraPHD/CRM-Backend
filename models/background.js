const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Background",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        image_code: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
    },
    {
        tableName: "background",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
