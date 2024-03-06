const Router = require('express')
const routes = new Router()
const DirectionController = require('../controllers/directionController')

routes.get('/getAllDirection', DirectionController.getAllDirection)

module.exports = routes
