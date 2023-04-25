const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING(1000), allowNull: false },
    role: { type: DataTypes.ENUM, values: ['SuperUser', 'Admin', 'TeamLead', 'User'], defaultValue: 'User', allowNull: false },
    activationLink: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.STRING },
    // status: { type: DataTypes.BOOLEAN, defaultValue: true },
    // is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    // coin: { type: DataTypes.INTEGER, defaultValue: 1000 },
    // achievements: { type: DataTypes.STRING },
});

const Token = sequelize.define("token", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING(1000), unique: true, allowNull: false },
});

const Achievement = sequelize.define("achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
});

const UserAchievement = sequelize.define("user_achievement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Candidate = sequelize.define("candidate", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    client: { type: DataTypes.STRING, allowNull: false },
    is_paid: { type: DataTypes.BOOLEAN, defaultValue: false },
    recruiter_name: { type: DataTypes.STRING(100), allowNull: false}
});

const Column = sequelize.define("column", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Label = sequelize.define("label", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
});

const Commentary = sequelize.define("commentary", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT },
    parent: { type: DataTypes.INTEGER },
});

const Board = sequelize.define("board", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allowNull: true, unique: true},
})

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Commentary, { as: "commentary" });
Commentary.belongsTo(User);

User.hasMany(Candidate, { as: "candidate" });
Candidate.belongsTo(User);

Candidate.hasMany(Label, { as: "label" });
Label.belongsTo(Candidate);

Column.hasMany(Candidate, { as: "candidate" });
Candidate.belongsTo(Column);

Board.hasMany(Column, { as: "column"});
Column.belongsTo(Board);

User.belongsToMany(Achievement, {
    through: UserAchievement,
});

Achievement.belongsToMany(User, {
    through: UserAchievement,
});


// console.log(`!!!!! ${User.getAttributes().role.values} !!!!!`)
// User.sync({alter: true});
// Token.sync({alter: true})
// Candidate.sync({ alter: true });
// Commentary.sync({ alter: true });
// Board.sync({ alter: true});
// Column.sync({ alter: true });
// Label.sync({ alter: true });

module.exports = {
    User,
    Candidate,
    Column,
    Label,
    Commentary,
    Achievement,
    UserAchievement,
    Token,
    Board,
};
