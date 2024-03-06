const ErrorHandler = require("../errors/errorHandler");
const {Application, Direction, Requisite} = require("../database");

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