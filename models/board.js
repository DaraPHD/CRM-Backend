const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Board",
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
    },
    {
        tableName: "board",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

Model.associate = (models) => {
    Model.belongsToMany(models.User, {
        through: "user_board",
        foreignKey: "board_hash",
        otherKey: "user_hash",
    });
    Model.hasMany(models.Column, {
        foreignKey: "board_hash",
        sourceKey: "hash",
    });
};

module.exports = Model;
