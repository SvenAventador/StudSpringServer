const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const ApplicationDocument = require("./ApplicationDocument");

const Document = sequelize.define('document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    documentName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

Document.hasMany(ApplicationDocument)
ApplicationDocument.belongsTo(Document)

module.exports = Document