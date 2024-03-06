const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const personalController = require('./userRoutes')

router.use('/user', userRoutes)
router.use('/personal', personalController)

module.exports = router