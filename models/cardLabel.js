const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "CardLabel",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        card_hash: {
            allowNull: false,
            primaryKey: false,
            type: DataTypes.STRING(255),
            references: {
                model: "card",
                key: "hash",
            },
        },
        label_hash: {
            allowNull: false,
            primaryKey: false,
            type: DataTypes.STRING(255),
            references: {
                model: "label",
                key: "hash",
            },
        },
    },
    {
        tableName: "card_label",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

module.exports = Model;
