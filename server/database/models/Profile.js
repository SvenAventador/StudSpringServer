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
    },
    birthday: {
        type: DataTypes.DATEONLY,
    },
    gender: {
        type: DataTypes.ENUM('Мужский', 'Женский'),
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    telegramLink: {
        type: DataTypes.STRING,
    },
    avatar: {
        type: DataTypes.TEXT,
        defaultValue: 'empty.jpg'
    }
})

Profile.hasMany(Team)
Team.belongsTo(Profile)

module.exports = Profile