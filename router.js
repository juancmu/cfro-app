const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();
const GeoJSON = require('geojson');
const pool = require('./db.js')
const passport = require('passport');

const {DBFFile} = require('dbffile');
const fs = require('fs');

const qr = require('qrcode')


const areas = require('./public/json/areas.json')
const sections = require('./public/json/sections.json');
const scatterData = require('./public/json/diagrama.json');
const schedule = require('./public/json/schedule.json');
const typeNetwork = require('./public/json/type_network.json');

const { register } = require('module');



require('dotenv').config(); // for to read the .env file


router.get('', (req, res) => {
    res.render('index', { title: 'CFRO DASHBOARD', areas: areas, color: 'text-light', sections: sections})
})
router.get('/react', (req, res) => {
    res.render('react', { title: 'CFRO DASHBOARD', areas: areas, color: 'text-light', sections: sections})
})

router.get('/section/:section', async (req, res) => {
    var sectionParam = req.params.section;
    // var section = 'utilities';

    // console.log(sectionParam);

    const sectionSelected = sections.find(({ section }) => section === parseInt(sectionParam));

    // console.log(sectionSelected.pk_ini  + '-' + sectionSelected.pk_end);
    try {
        client = await pool.connect();

    const result = await client.query(`SELECT * FROM cfro 
                                    WHERE ((pk_ini > '${sectionSelected.pk_ini}' AND pk_ini < '${sectionSelected.pk_end}')
                                    OR (pk_end > '${sectionSelected.pk_ini}' AND pk_end < '${sectionSelected.pk_end}'))
                                    `)


    res.render('tablaSalida', { data: result.rows, title: 'TABLE EXAMPLE', areas: areas, color: 'text-light', sections: sections, sectionParam: sectionParam, typeNetwork: typeNetwork})
    client.release()    
} catch (err) {

    res.status(500).send('An error occurred while fetching data from the database.');
        

    }    
})





router.get('/GIS', (req, res) => {
    res.render('GIS', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})

router.get('/ajax', (req, res) => {
    res.render('ajax', { title: 'GEOGRAPHIC INFORMATION SYSTEM', areas: areas, color: 'text-light', sections: sections})
})
router.get('/getmovies', (req, res) => {
    
    const file = fs.readFileSync('./public/json/peliculas.json', 'UTF-8')
    res.setHeader('Content-type','text/json')
    res.send(file)
})

router.get('/diagram', (req, res) => {
    res.render('Diagram', { title: 'SPACE-TIME DIAGRAM', areas: areas, scatterData: scatterData, sections: sections})
})

router.get('/schedule', (req, res) => {
    res.render('Gantt', { title: 'SCHEDULE PROJECT', areas: areas, schedule: schedule, sections: sections})
})



router.get('/section/:idp', (req, res) => {


    var ficha_p = req.params.idp;
    // const sql = "SELECT * FROM prediospb p JOIN municipios d ON p.cod_mun = d.cod_mun where p.ficha_p = '" + ficha_p + "'"; //SELECT ALL PREDIOS
    res.render('tablaSalida', {
        title: 'Table Template', areas: areas, sectionId: ficha_p
    });

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



