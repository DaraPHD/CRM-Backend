const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "User",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        surname: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        position: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING(255),
            defaultValue: "avatar.jpg",
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(255),
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ["Super User", "Admin", "Team Lead", "User"],
            defaultValue: "User",
        },
    },
    {
        tableName: "user",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

Model.associate = (models) => {
    Model.hasOne(models.Token, {
        foreignKey: "user_hash",
        sourceKey: "hash",
    });
    Model.hasMany(models.Commentary, {
        foreignKey: "user_hash",
        sourceKey: "hash",
    });
    Model.belongsToMany(models.Board, {
        through: "user_board",
        foreignKey: "user_hash",
        otherKey: "board_hash",
    });
    Model.belongsToMany(models.Card, {
        through: "user_card",
        foreignKey: "user_hash",
        otherKey: "card_hash",
    });
    Model.belongsToMany(models.Achievement, {
        through: "user_achievement",
        foreignKey: "user_hash",
        otherKey: "achievement_hash",
    });
};

module.exports = Model;
