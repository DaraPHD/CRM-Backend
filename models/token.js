const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Token",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        refresh_token: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(1000),
        },
    },
    {
        tableName: "token",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
