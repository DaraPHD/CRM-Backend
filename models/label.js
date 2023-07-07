const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Label",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        title: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        color: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
    },
    {
        tableName: "label",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
