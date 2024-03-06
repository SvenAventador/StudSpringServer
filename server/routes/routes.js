const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const personalRoutes = require('./personalRoutes')

router.use('/user', userRoutes)
router.use('/personal', personalRoutes)

module.exports = router