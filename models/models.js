const Sequelize = require("sequelize");
const pg = require("../db/sequelize.js");
const { DataTypes } = Sequelize;

const User = pg.sequelize.define("user", {
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

const Token = pg.sequelize.define("token", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: {
        type: DataTypes.STRING(1000),
        unique: true,
        allowNull: false,
    },
});

const Achievement = pg.sequelize.define("achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
});

const UserAchievement = pg.sequelize.define("user_achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Card = pg.sequelize.define("card", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(1000), allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: true },
    client: { type: DataTypes.STRING, allowNull: true },
    is_paid: { type: DataTypes.BOOLEAN, defaultValue: false },
    recruiter_name: { type: DataTypes.STRING(100), allowNull: true },
});

const Column = pg.sequelize.define("column", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Label = pg.sequelize.define("label", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    color: { type: DataTypes.STRING, allowNull: false },
});

const Commentary = pg.sequelize.define("commentary", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT },
    username: { type: DataTypes.STRING },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
});

const Board = pg.sequelize.define("board", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true, unique: true },
});

const UserCard = pg.sequelize.define("user_card", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CardLabel = pg.sequelize.define("card_label", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Color = pg.sequelize.define("color", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_code: { type: DataTypes.STRING, allowNull: false },
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

User.belongsToMany(Card, { through: UserCard, as: "card" });

Card.belongsToMany(User, { through: UserCard, as: "user" });

User.belongsToMany(Achievement, {
    through: UserAchievement,
});

Achievement.belongsToMany(User, {
    through: UserAchievement,
});

// Color.sync({force: true})
// console.log(`!!!!! ${User.getAttributes().role.values} !!!!!`)
// User.sync({ alter: true })
// Token.sync({alter: true})
// Card.sync({ alter: true });
// UserCard.sync()
// Commentary.sync({ alter: true })
// Board.sync({ alter: true});
// Column.sync({ alter: true });
// Label.sync({ alter: true })

module.exports = {
    User,
    Card,
    Column,
    Label,
    Commentary,
    Achievement,
    UserAchievement,
    Token,
    Board,
    Color,
    UserCard,
    CardLabel,
};
