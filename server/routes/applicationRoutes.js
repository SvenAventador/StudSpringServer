const Router = require('express')
const routes = new Router()
const ApplicationController = require('../controllers/applicationController')

routes.get('/getAllApplication', ApplicationController.getAllApplication)
routes.get('/getOneApplication', ApplicationController.getOneApplication)
routes.post('/createApplication/:userId', ApplicationController.createApplication)
routes.put('/updateApplication/:userId', ApplicationController.updateApplication)
routes.delete('/deleteApplication', ApplicationController.deleteApplication)

module.exports = routes
