const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();
const GeoJSON = require('geojson');
const { Pool } = require('pg'); // call postgres driver
const passport = require('passport');

const {DBFFile} = require('dbffile');
const fs = require('fs');

const qr = require('qrcode')


const areas = require('./public/json/areas.json')
const sections = require('./public/json/sections.json')



require('dotenv').config(); // for to read the .env file


router.get('', (req, res) => {
    res.render('index', { title: 'CFRO DASHBOARD', areas: areas, color: 'text-light', sections: sections})
})


router.get('/GIS', (req, res) => {
    res.render('GIS', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})


// app.get('/environmental', (req, res) => {
//     res.render('environmental', { title: 'Environmental', areas: areas})
// })

areas.forEach(element => {
    
    router.get(`/${element.area}`, (req, res) => {
        res.render(element.area, { title: element.area, areas: areas, color: element.coloricon})
    })
});

module.exports = router;



