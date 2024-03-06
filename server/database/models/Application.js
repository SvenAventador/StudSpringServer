const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const ApplicationComment = require("./ApplicationComment");
const ApplicationDocument = require("./ApplicationDocument");

const Application = sequelize.define('application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    applicationTitle: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    applicationDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    applicationTiming: {
        type: DataTypes.TIME,
        allowNull: false
    },
    applicationSupervisor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    applicationContacts: {
        type: DataTypes.STRING,
        allowNull: false
    },
    applicationTechCondition: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Application.hasMany(ApplicationComment)
ApplicationComment.belongsTo(Application)

Application.hasMany(ApplicationDocument)
ApplicationDocument.belongsTo(Application)

module.exports = Application