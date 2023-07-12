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
    },
    {
        tableName: "commentary",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

// parent_hash: {
//     allowNull: true,
//     type: DataTypes.STRING(255),
// },
Model.associate = (models) => {
    Model.belongsTo(models.Commentary, {
        foreignKey: "parent_hash",
        targetKey: "hash",
    });
    Model.hasMany(models.Commentary, {
        foreignKey: "parent_hash",
        targetKey: "hash",
    });
    Model.belongsTo(models.User, {
        foreignKey: "user_hash",
        targetKey: "hash",
    });
    Model.belongsTo(models.Card, {
        foreignKey: "card_hash",
        targetKey: "hash",
    });
};

module.exports = Model;
