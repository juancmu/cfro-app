const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();
const GeoJSON = require('geojson');
const pool = require('./db.js')
const passport = require('passport');

const {DBFFile} = require('dbffile');
const fs = require('fs');
// const fs = require('fs');
const path = require('path');
const qr = require('qrcode')


const areas = require('./public/json/areas.json')
const sections = require('./public/json/sections.json');
const scatterData = require('./public/json/diagrama.json');
const schedule = require('./public/json/schedule.json');
const typeNetwork = require('./public/json/type_network.json');
const pks1m = require('./public/json/1.json');
// const landsGJson = require('./public/data/landsEFR.geojson');


// const filePathGeo = path.join(__dirname, './public/data/landsEFR.geojson');

const geoJsonPath = path.join(__dirname, './public/data/landsEFR.geojson');
const geoJsonData = fs.readFileSync(geoJsonPath, 'utf8');
const parsedGeoJson = JSON.parse(geoJsonData);

router.get('/geojson', (req, res) => {
    res.json({ geoJson: parsedGeoJson });
  });


const { register } = require('module');



require('dotenv').config(); // for to read the .env file


router.get('', (req, res) => {


        res.render('index', { title: 'CFRO DASHBOARD', areas: areas, color: 'text-light', sections: sections})
        // client.release()    
   
    
    


   
})











router.get('/GIS', (req, res) => {
    res.render('GIS', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})


router.get('/sectionGis', (req, res) => {
    res.render('GIS-FILTER', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})

router.get('/ajax', (req, res) => {
    res.render('ajax', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})

router.get('/diagram', (req, res) => {
    res.render('Diagram', { title: 'SPACE-TIME DIAGRAM', areas: areas, scatterData: scatterData, sections: sections})
})

router.get('/schedule', (req, res) => {
    res.render('Gantt', { title: 'SCHEDULE PROJECT', areas: areas, schedule: schedule, sections: sections})
})



// app.get('/environmental', (req, res) => {
//     res.render('environmental', { title: 'Environmental', areas: areas})
// })

areas.forEach(element => {
    
    router.get(`/${element.area}`, (req, res) => {
        res.render(element.area, { title: element.area, areas: areas, color: element.coloricon, scatterData: scatterData, sections: sections})
    })
});

module.exports = router;



