const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',       // seu usuário MySQL
    password: '',       // sua senha MySQL
    database: 'homework_system'
});

module.exports = connection.promise();