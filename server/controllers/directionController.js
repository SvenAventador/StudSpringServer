const ErrorHandler = require("../errors/errorHandler");
const {Direction, DirectionCategory} = require("../database");

class DirectionController {
    async getAllDirection(req, res, next) {
        try {
            const directions = await Direction.findAll({
                include: DirectionCategory
            })

            return res.json({directions})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))

        }
    }
}

module.exports = new DirectionController()