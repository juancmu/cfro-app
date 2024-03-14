const {Pool} = require('pg')

const pool = new Pool ({
    user: 'postgres',
    password: 'Cfro2027',
    host: 'localhost',
    port: 5432,
    database: 'cfro'

})


module.exports = pool