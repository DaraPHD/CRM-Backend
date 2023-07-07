const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Commentary",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        content: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        parent_id: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
    },
    {
        tableName: "commentary",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
