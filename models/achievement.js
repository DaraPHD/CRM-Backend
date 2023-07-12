const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Achievement",
    {
        hash: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        descriptions: {
            allowNull: false,
            type: DataTypes.STRING(1000),
        },
    },
    {
        tableName: "achievement",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

Model.associate = (models) => {
    Model.belongsToMany(models.User, {
        through: "user_achievement",
        foreignKey: "achievement_hash",
        otherKey: "user_hash",
    });
};

module.exports = Model;
