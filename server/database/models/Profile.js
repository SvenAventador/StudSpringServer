const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Team = require("./Team");

const Profile = sequelize.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profileFio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Мужский', 'Женский'),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telegramLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: null
    }
})

Profile.hasMany(Team)
Team.belongsTo(Profile)

module.exports = Profile