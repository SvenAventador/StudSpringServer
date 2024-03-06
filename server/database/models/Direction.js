const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Application = require("./Application");

const Direction = sequelize.define('direction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    directionName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    directionDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Direction.hasMany(Application)
Application.belongsTo(Direction)

module.exports = Direction