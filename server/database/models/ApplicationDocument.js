const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const ApplicationDocument    = sequelize.define('application_document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = ApplicationDocument