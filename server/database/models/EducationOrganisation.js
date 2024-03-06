const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Profile = require("./Profile");

const EducationOrganisation = sequelize.define('education_organisation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullNameOrganisation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})

EducationOrganisation.bulkCreate([
    {
        fullNameOrganisation: 'КНИТУ-КАИ',
        address: 'Город Казань, улица Большая Красная 55'
    },
    {
        fullNameOrganisation: 'КНИТУ-КХТИ',
        address: 'Город Казань, улица Большая Красная 55'
    },
    {
        fullNameOrganisation: 'МГУ',
        address: 'Город Казань, улица Большая Красная 55'
    }
]).then(() => {
    console.log('Данные успешно добавлены в таблицу Role!')
}).catch((error) => {
    console.error(`При попытке добавить данные в таблицу Role произошли следующие ошибки: ${error}`)
})

EducationOrganisation.hasMany(Profile)
Profile.belongsTo(EducationOrganisation)

module.exports = EducationOrganisation