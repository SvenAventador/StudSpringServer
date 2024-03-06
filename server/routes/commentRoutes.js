const Router = require('express')
const routes = new Router()
const CommentsController = require('../controllers/commentController')

routes.get('/createComment/:applicationId', CommentsController.createComment)

module.exports = routes
