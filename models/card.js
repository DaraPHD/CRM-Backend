const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Card",
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
        is_archived: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "card",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

Model.associate = (models) => {
    Model.belongsToMany(models.User, {
        through: "user_card",
        foreignKey: "card_hash",
        otherKey: "user_hash",
    });
    Model.hasMany(models.Commentary, {
        foreignKey: "card_hash",
        sourceKey: "hash",
    });
    Model.belongsToMany(models.Label, {
        through: "card_label",
        foreignKey: "card_hash",
        otherKey: "label_hash",
    });
    Model.belongsTo(models.Column, {
        foreignKey: "column_hash",
        targetKey: "hash",
    });
};

module.exports = Model;
