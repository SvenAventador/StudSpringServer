const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const personalRoutes = require('./personalRoutes')
const instituteRoutes = require('./institutesRoutes')
const applicationRoutes = require('./applicationRoutes')

router.use('/user', userRoutes)
router.use('/personal', personalRoutes)
router.use('/institutes', instituteRoutes)
router.use('/application', applicationRoutes)

module.exports = router