const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Direction = require("./Direction");

const DirectionCategory = sequelize.define('direction_category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

// DirectionCategory.bulkCreate([
//     {
//         categoryName: 'name1'
//     },
//     {
//         categoryName: 'name2'
//     },
//     {
//         categoryName: 'name3'
//     },
//     {
//         categoryName: 'name4'
//     },
//     {
//         categoryName: 'name5'
//     }
// ]).then(() => {
//     console.log('Данные успешно добавились в таблицу DirectionCategory!')
// }).catch((error) => {
//     console.error(`При добавлении данных в таблицу DirectionCategory были найдены следующие ошибки: ${error}`)
// })

DirectionCategory.hasMany(Direction)
Direction.belongsTo(DirectionCategory)

module.exports = DirectionCategory