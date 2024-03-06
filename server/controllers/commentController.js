const ErrorHandler = require("../errors/errorHandler");
const Validation = require("../validations/validation");
const {ApplicationComment} = require("../database");

class CommentController {
    async createComment(req, res, next) {
        const {applicationId} = req.params
        const {comment} = req.body

        try {
            if (!Validation.isString(comment))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный комментарий!'))

            const comments = await ApplicationComment.create({
                comment,
                applicationId
            })

            return res.json({comments})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }
}

module.exports = new CommentController()