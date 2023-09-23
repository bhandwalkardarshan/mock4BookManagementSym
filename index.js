const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const cors = require('cors')
const bookRoutes = require('./routes/book.routes')
const app = express()

require("dotenv").config();
app.use(express.json())
app.use(cors())

app.use('/',bookRoutes)

app.listen(process.env.PORT, () => {
    connectDB()
    console.log('Server is running at port '+process.env.PORT)
})

