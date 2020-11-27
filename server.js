const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const { readdirSync } = require('fs')

// create express app
const app = express()

// connect to DB
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: true
}).
then(()=>console.log('DB connected successfully'))
.catch((error) => console.log(`MongoDB connection error ${error}`))


// add middleware
app.use(bodyParser.json({limit: '2mb'}))
app.use(cors())
app.use(morgan('dev'))

// routes middleware
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))
	

// port 
const port = process.env.PORT||8000

app.listen(port, () => console.log('App listening on the port: ' + port))

