const ErrorHandler = require("../errors/errorHandler");
const {Application, Direction} = require("../database");

class ApplicationController {
    async getAllApplication(req, res, next) {
        try {
            const candidate = await Application.findAll()
            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async getOneApplication(req, res, next) {
        const {id} = req.query

        try {
            const candidate = await Application.findByPk(id, {
                include: {
                    model: Direction,

                },
            })
            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async createApplication(req, res, next) {

    }

    async deleteApplication(req, res, next) {

    }
}

module.exports = new ApplicationController()