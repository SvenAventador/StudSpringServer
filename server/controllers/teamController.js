const Validation = require("../validations/validation");
const ErrorHandler = require("../errors/errorHandler");
const {extname, resolve} = require("path");
const uuid = require("uuid");
const {Team, Participant, ParticipantTeam} = require("../database");

class TeamController {
    async createTeam(req, res, next) {
        const {
            profileId
        } = req.params
        const {
            teamName,
            fio
        } = req.body
        const {teamAvatar} = req.files || {}
        const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        try {
            if (!Validation.isString(teamName))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное имя!'))
            let fileName = null;
            if (teamAvatar !== undefined) {
                const fileExtension = extname(teamAvatar.name).toLowerCase();
                if (!allowedImageExtensions.includes(fileExtension))
                    return next(ErrorHandler.badRequest('Пожалуйста, загрузите файл в формате изображения: jpg, jpeg, png или gif!'));

                fileName = uuid.v4() + ".jpg";
                await teamAvatar.mv(resolve(__dirname, '..', 'static', fileName));
            }

            const team = await Team.create({
                teamName,
                teamAvatar: fileName,
                profileId
            })

            const participants = await Promise.all(fio.map(async (name) => {
                const participant = await Participant.create({ name });
                return participant.id;
            }));

            await Promise.all(participants.map(async (participantId) => {
                await ParticipantTeam.create({
                    ParticipantId: participantId,
                    TeamId: team.id
                });
            }));

            const responseData = {
                team: {
                    id: team.id,
                    teamName: team.teamName,
                    teamAvatar: team.teamAvatar,
                },
                participants: participants.map(participant => ({
                    id: participant.id,
                    name: participant.name
                }))
            };

            return res.json({responseData})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }
}

module.exports = new TeamController()