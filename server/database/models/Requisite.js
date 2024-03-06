const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Application = require("./Application");

const Requisite = sequelize.define('requisite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requisiteName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

Requisite.bulkCreate([
    {
        categoryName: 'name1'
    },
    {
        categoryName: 'name2'
    },
    {
        categoryName: 'name3'
    },
    {
        categoryName: 'name4'
    },
    {
        categoryName: 'name5'
    }
]).then(() => {
    console.log('Данные успешно добавились в таблицу Requisite!')
}).catch((error) => {
    console.error(`При добавлении данных в таблицу Requisite были найдены следующие ошибки: ${error}`)
})

Requisite.hasMany(Application)
Application.belongsTo(Requisite)

module.exports = Requisite