
const pool = require('../db.js')

const getTable = async (req, res) => {
    const result = await pool.query('SELECT * FROM cfro')

    res.render('tablaSalida', { data: result.rows, title: 'TABLE EXAMPLE'})
}


module.exports ={
     getTable
}