const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require("./User");

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

Role.bulkCreate([
    {
        roleName: 'Участник'
    },
    {
        roleName: 'Организатор'
    }
]).then(() => {
    console.log('Данные успешно добавлены в таблицу Role!')
}).catch((error) => {
    console.error(`При попытке добавить данные в таблицу Role произошли следующие ошибки: ${error}`)
})

Role.hasMany(User)
User.belongsTo(Role)

module.exports = Role