const Router = require('express')
const routes = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

routes.post('/registration', UserController.registration)
routes.post('/login', UserController.login)
routes.get('/auth', authMiddleware, UserController.check)
routes.get('/logout', authMiddleware, UserController.logout)

module.exports = routes
