const Validation = require("../validations/validation");
const ErrorHandler = require("../errors/errorHandler");
const {extname, resolve} = require("path");
const uuid = require("uuid");
const {Team, Participant, ParticipantTeam} = require("../database");
const {Sequelize} = require("sequelize");

class TeamController {
    async createTeam(req, res, next) {
        const { profileId } = req.params;
        const { teamName, 'fio[]': fio } = req.body;
        const { teamAvatar } = req.files || {};
        const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        try {
            console.log(req.body);
            if (!Validation.isString(teamName))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное имя!'));

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
            });

            const names = fio

            const participants = await Promise.all(names.map(async (name) => {
                const participant = await Participant.create({ participantName: name });
                await ParticipantTeam.create({
                    participantId: participant.id,
                    teamId: team.id
                });
                return participant;
            }));

            const responseData = {
                team: {
                    id: team.id,
                    teamName: team.teamName,
                    teamAvatar: team.teamAvatar,
                },
                participants: participants.map(participant => ({
                    id: participant.id,
                    name: participant.participantName
                }))
            };

            res.status(201).json(responseData);

        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }


    async getAllTeam(req, res, next) {
        const {profileId} = req.params

        try {
            const teams = await Team.findAll({
                where: { profileId },
                include: [
                    {
                        model: ParticipantTeam,
                        include: [Participant]
                    }
                ]
            });

            return res.json({teams});
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }

    async deleteOneTeam(req, res, next) {
        const {id} = req.query
        try {
            await Team.findByPk(id).then(async (data) => {
                if (!data)
                    return next(ErrorHandler.notFound('Данной команды не найдено!'))

                await data.destroy()
                return res.status(200).json({message: 'Данная команда успешно удалена'})
            })
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }
}

module.exports = new TeamController()