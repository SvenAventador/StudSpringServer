const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const ApplicationComment = sequelize.define('application_comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = ApplicationComment