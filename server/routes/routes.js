const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const personalRoutes = require('./personalRoutes')
const instituteRoutes = require('./institutesRoutes')
const applicationRoutes = require('./applicationRoutes')
const teamRoutes = require('./teamRoutes')
const directionRoutes = require('./directionRoutes')

router.use('/user', userRoutes)
router.use('/personal', personalRoutes)
router.use('/institutes', instituteRoutes)
router.use('/application', applicationRoutes)
router.use('/team', teamRoutes)
router.use('/direction', directionRoutes)

module.exports = router