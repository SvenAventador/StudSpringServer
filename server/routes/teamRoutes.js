const Router = require('express')
const routes = new Router()
const TeamController = require('../controllers/teamController')

routes.post('/createTeam/:profileId', TeamController.createTeam)
routes.get('/getAllTeam/:profileId', TeamController.getAllTeam)

module.exports = routes
