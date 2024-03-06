require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const routes = require('./routes/routes')
const errorMiddleware = require('./middlewares/errorHandlerMiddleware')

const database = require('./database/db')
require('./database/index')

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))

app.use('/api', routes)

app.use(errorMiddleware)

const start = async () => {
    try {
        await database.authenticate()
        await database.sync()

        await app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.error(`While connecting to the Database, the server found the following errors: ${error}`)
    }
}

start().then(() => {
    console.log(`The server has been successfully started!`)
}).catch((error) => {
    console.error(`The following errors were found during server operation: ${error}`)
})