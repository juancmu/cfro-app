const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();
const GeoJSON = require('geojson');
const { Pool } = require('pg'); // call postgres driver
const passport = require('passport');

const {DBFFile} = require('dbffile');
const fs = require('fs');

const qr = require('qrcode')





require('dotenv').config(); // for to read the .env file



router.get('/', (req, res) => {
    res.render('index')
})

router.get('/01', (req, res) => {
    res.render('01')
})


module.exports = router;



