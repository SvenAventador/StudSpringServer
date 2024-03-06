const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const ParticipantTeam = require("./ParticipantTeam");
const Application = require("./Application");

const Team = sequelize.define('team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   teamName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Team.hasMany(ParticipantTeam)
ParticipantTeam.belongsTo(Team)

Team.hasMany(Application)
Application.belongsTo(Team)

module.exports = Team