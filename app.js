// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 4000

const areas = require('./public/json/areas.json')
const sections = require('./public/json/sections.json')


// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Templating Engine
app.use(expressLayouts)


app.set('layout', './layouts/main')

app.set('view engine', 'ejs')

// Routes

app.use(require('./router'))




// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))