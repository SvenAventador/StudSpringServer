const Router = require('express')
const routes = new Router()
const PersonalController = require('../controllers/personalController')

routes.post('/create', PersonalController.createAccount)
routes.put('/update', PersonalController.updateAccount)

module.exports = routes
