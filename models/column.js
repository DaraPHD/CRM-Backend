const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");

const { DataTypes } = Sequelize;

const Model = pg.sequelize.define(
    "Column",
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
        tableName: "column",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamp: false,
    }
);

Model.associate = (models) => {
    Model.hasMany(models.Card, {
        foreignKey: "column_hash",
        sourceKey: "hash",
    });
    Model.belongsTo(models.Board, {
        foreignKey: "board_hash",
        targetKey: "hash",
    });
};

module.exports = Model;
