const Router = require('express')
const routes = new Router()
const InstitutesController = require('../controllers/institutesController')

routes.get('/getAllOrganisation', InstitutesController.getAllInstitutes)

module.exports = routes
