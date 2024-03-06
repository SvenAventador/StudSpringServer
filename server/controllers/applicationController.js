const ErrorHandler = require("../errors/errorHandler");
const {Application, Direction, Requisite} = require("../database");
const Validation = require("../validations/validation");

class ApplicationController {
    async getAllApplication(req, res, next) {
        try {
            const candidate = await Application.findAll({
                include: [
                    {
                        model: Direction,
                    },
                    {
                        model: Requisite
                    }
                ]
            })
            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async getOneApplication(req, res, next) {
        const {id} = req.query

        try {
            const candidate = await Application.findByPk(id, {
                include: [
                    {
                        model: Direction,
                    },
                    {
                        model: Requisite
                    }
                ]
            })
            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async createApplication(req, res, next) {
        const {
            applicationTitle,
            applicationDescription,
            applicationTiming,
            applicationSupervisor,
            applicationContacts,
            applicationTechCondition,
            directionId,
            teamId,
            requisiteId
        } = req.body
        const {userId} = req.params

        try {
            if (!Validation.isString(applicationTitle))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное название заявки!'))
            if (!Validation.isString(applicationDescription))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное описание заявки!'))
            if (!Validation.isTime(applicationTiming))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное время!'))
            if (!Validation.isString(applicationSupervisor))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректного куратора!'))
            if (!Validation.isPhone(applicationContacts))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный номер телефона!'))
            if (!Validation.isString(applicationTechCondition))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный'))

            const candidate = await Application.create({
                applicationTitle,
                applicationDescription,
                applicationTiming,
                applicationSupervisor,
                applicationContacts,
                applicationTechCondition,
                directionId,
                teamId,
                requisiteId,
                userId
            })

            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async updateApplication(req, res, next) {
        const {
            applicationTitle,
            applicationDescription,
            applicationTiming,
            applicationSupervisor,
            applicationContacts,
            applicationTechCondition,
            directionId,
            teamId,
            requisiteId,
            applicationId
        } = req.body;
        const { userId } = req.params;

        try {
            if (!Validation.isString(applicationTitle))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное название заявки!'))
            if (!Validation.isString(applicationDescription))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное описание заявки!'))
            if (!Validation.isTime(applicationTiming))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное время!'))
            if (!Validation.isString(applicationSupervisor))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректного куратора!'))
            if (!Validation.isPhone(applicationContacts))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный номер телефона!'))
            if (!Validation.isString(applicationTechCondition))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное техническое состояние!'))

            const [updatedRowsCount] = await Application.update({
                applicationTitle,
                applicationDescription,
                applicationTiming,
                applicationSupervisor,
                applicationContacts,
                applicationTechCondition,
                directionId,
                teamId,
                requisiteId,
                userId
            }, {
                where: { id: applicationId }
            });

            if (updatedRowsCount === 0) {
                return next(ErrorHandler.notFound('Заявка не найдена'));
            }

            const application = await Application.findByPk(applicationId)

            return res.json({ application });
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }


    async deleteApplication(req, res, next) {
        const {id} = req.query
        try {
            await Application.findByPk(id).then(async (data) => {
                if (!data)
                    return next(ErrorHandler.notFound('Данной заявки не найдено!'))

                await data.destroy()
                return res.status(200).json({message: "Заявка успешно удалена"})
            })
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }
}

module.exports = new ApplicationController()