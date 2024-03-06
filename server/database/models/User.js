const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Profile = require("./Profile");
const Application = require("./Application");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userEmail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Application)
Application.belongsTo(User)

module.exports = User