const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345876Aabc',
    database: 'vaccenter',
});

module.exports = connection;
