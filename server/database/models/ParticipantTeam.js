const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const ParticipantTeam = sequelize.define('participant_team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = ParticipantTeam