const Router = require('express')
const routes = new Router()
const PersonalController = require('../controllers/personalController')

routes.get('/getOneAccount/:id', PersonalController.getAccount)
routes.post('/create', PersonalController.createAccount)
routes.put('/update/:userId', PersonalController.updateAccount)

module.exports = routes
