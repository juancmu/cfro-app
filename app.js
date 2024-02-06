// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 4000

const areas = require('./public/json/areas.json')

console.log(areas);


// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Templating Engine
app.use(expressLayouts)


app.set('layout', './layouts/main')

app.set('view engine', 'ejs')

// Routes

app.get('', (req, res) => {
    res.render('index', { title: 'CFRO DASHBOARD', areas: areas, color: 'text-light'})
})


// app.get('/environmental', (req, res) => {
//     res.render('environmental', { title: 'Environmental', areas: areas})
// })

areas.forEach(element => {
    
    app.get(`/${element.area}`, (req, res) => {
        res.render(element.area, { title: element.area, areas: areas, color: element.coloricon})
    })
});


// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))