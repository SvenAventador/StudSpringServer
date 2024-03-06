const {EducationOrganisation} = require("../database");
const ErrorHandler = require("../errors/errorHandler");

class InstitutesController {
    async getAllInstitutes(req, res, next) {
        try {
            const candidate = await EducationOrganisation.findAll()
            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }
}

module.exports = new InstitutesController()