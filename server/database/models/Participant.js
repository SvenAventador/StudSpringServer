const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const ParticipantTeam = require("./ParticipantTeam");

const Participant = sequelize.define('participant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    participantName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Participant.hasMany(ParticipantTeam)
ParticipantTeam.belongsTo(Participant)

module.exports = Participant