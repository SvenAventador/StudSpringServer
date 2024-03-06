const Router = require('express')
const routes = new Router()
const TeamController = require('../controllers/teamController')

routes.post('/createTeam/:profileId', TeamController.createTeam)

module.exports = routes
