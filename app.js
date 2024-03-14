// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')


const app = express()

const port = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



// Static Files
app.use(express.static('public'))
app.use('./css', express.static(__dirname + 'public/css'))
app.use('./js', express.static(__dirname + 'public/js'))
app.use('./json', express.static(__dirname + 'public/json'))
app.use('./lib', express.static(__dirname + 'public/lib'))
app.use('./img', express.static(__dirname + 'public/img'))


const areas = require('./public/json/areas.json')
const sections = require('./public/json/sections.json')
// Set Templating Engine
app.use(expressLayouts)


app.set('layout', './layouts/main')

app.set('view engine', 'ejs')

// Routes

app.use(require('./router'))




// Listen on Port 
app.listen(port, () => console.info(`App listening on port ${port}`))