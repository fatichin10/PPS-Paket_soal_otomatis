const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pps_newapps',
    multipleStatements: true
})

module.exports = db