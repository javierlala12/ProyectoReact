// config/dbConfig.js
const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'nodejs',
};

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;
