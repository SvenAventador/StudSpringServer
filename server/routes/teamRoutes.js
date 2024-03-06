const Router = require('express')
const routes = new Router()
const TeamController = require('../controllers/teamController')

routes.post('/createTeam/:profileId', TeamController.createTeam)
routes.get('/getAllTeam/:profileId', TeamController.getAllTeam)
routes.delete('/deleteTeam', TeamController.deleteOneTeam)

module.exports = routes
