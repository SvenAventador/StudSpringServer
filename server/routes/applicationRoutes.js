const Router = require('express')
const routes = new Router()
const ApplicationController = require('../controllers/applicationController')

routes.get('/getAllApplication', ApplicationController.getAllApplication)
routes.get('/getOneApplication', ApplicationController.getOneApplication)
routes.post('/createApplication', ApplicationController.createApplication)
routes.delete('/deleteApplication', ApplicationController.deleteApplication)

module.exports = routes
