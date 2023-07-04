// const Sequelize = require("sequelize");
// const pg = require("../db/sequelize.js");
// const { DataTypes } = Sequelize;

const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");
const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "avatar.jpg",
        allowNull: true,
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING(1000), allowNull: false },
    role: {
        type: DataTypes.ENUM,
        values: ["SuperUser", "Admin", "TeamLead", "User"],
        defaultValue: "User",
        allowNull: false,
    },
    activationLink: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.STRING },
});

const Token = sequelize.define("token", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: {
        type: DataTypes.STRING(1000),
        unique: true,
        allowNull: false,
    },
});

const Achievement = sequelize.define("achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
});

const UserAchievement = sequelize.define("user_achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Card = sequelize.define("card", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(1000), allowNull: false },
    is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Column = sequelize.define("column", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Label = sequelize.define("label", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    color: { type: DataTypes.STRING, allowNull: false },
});

const Commentary = sequelize.define("commentary", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT },
    username: { type: DataTypes.STRING },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
});

const Board = sequelize.define("board", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true, unique: true },
});

const Background = sequelize.define("background", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_code: { type: DataTypes.STRING, allowNull: true },
});

const UserCard = sequelize.define("user_card", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CardLabel = sequelize.define("card_label", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Color = sequelize.define("color", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_code: { type: DataTypes.STRING, allowNull: false },
});

const UserBoard = sequelize.define("user_board", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Commentary, { as: "commentary" });
Commentary.belongsTo(User);

Card.hasMany(Commentary, { as: "commentary" });
Commentary.belongsTo(Card);

Commentary.hasMany(Commentary, { as: "replies" });

Column.hasMany(Card, { as: "card" });
Card.belongsTo(Column);

Board.hasMany(Column, { as: "column" });
Column.belongsTo(Board);

Label.belongsToMany(Card, {
    through: CardLabel,
    as: "card",
});

Card.belongsToMany(Label, {
    through: CardLabel,
    as: "label",
});

User.belongsToMany(Board, {
    through: UserBoard,
    as: "participant",
});

Board.belongsToMany(User, {
    through: UserBoard,
    as: "board",
});

UserBoard.hasMany(Background, { as: "background" });
Background.belongsTo(UserBoard);

User.belongsToMany(Card, { through: UserCard, as: "card" });

Card.belongsToMany(User, { through: UserCard, as: "user" });

User.belongsToMany(Achievement, {
    through: UserAchievement,
});

Achievement.belongsToMany(User, {
    through: UserAchievement,
});

// Background.sync();
// Card.sync();
// UserBoard.sync();

module.exports = {
    User,
    UserBoard,
    Card,
    Column,
    Label,
    Commentary,
    Achievement,
    UserAchievement,
    Token,
    Board,
    Background,
    Color,
    UserCard,
    CardLabel,
};
