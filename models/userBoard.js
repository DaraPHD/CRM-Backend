const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "UserBoard",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        user_hash: {
            allowNull: false,
            primaryKey: false,
            type: DataTypes.STRING(255),
            references: {
                model: "user",
                key: "hash",
            },
        },
        board_hash: {
            allowNull: false,
            primaryKey: false,
            type: DataTypes.STRING(255),
            references: {
                model: "board",
                key: "hash",
            },
        },
    },
    {
        tableName: "user_board",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
