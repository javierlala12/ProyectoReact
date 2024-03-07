// Ejemplo en registroMantenimientoModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class RegistroMantenimientoModel {
    getAllRegistroMantenimiento(callback) {
        const query = 'SELECT * FROM registroMantenimiento';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllRegistroMantenimientoListado(callback) {
        const query = 'SELECT c.*, t.vehiculo, t.descripcion as vehiculo_descripcion FROM registroMantenimiento c JOIN vehiculo t ON c.idvehiculo = t.idvehiculo';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async createRegistroMantenimiento(registroMantenimientoData,callback) {
        // Atencion, idregistroMantenimiento es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO registroMantenimiento (idregistroMantenimiento, nombre, descripcion, precio, idvehiculo) VALUES (?, ?, ?, ?, ?)';
        const values = [null, registroMantenimientoData.nombre, registroMantenimientoData.descripcion, registroMantenimientoData.precio, registroMantenimientoData.idvehiculo];

        const result = db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getRegistroMantenimientoById(registroMantenimientoId, callback) {
        const query = 'SELECT * FROM registroMantenimiento WHERE idregistroMantenimiento = ?';
        db.query(query, [registroMantenimientoId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const registroMantenimiento = result[0];
                callback(null, registroMantenimiento);
            }
        });
    }

    getRegistroMantenimientoByIdRelations(registroMantenimientoId, callback) {
        const query = 'SELECT c.*,t.vehiculo,t.descripcion as vehiculodesc FROM registroMantenimiento as c, vehiculo as t WHERE c.idvehiculo = t.idvehiculo AND idregistroMantenimiento = ?';
        db.query(query, [registroMantenimientoId], (err, result,fields) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const registroMantenimiento = result[0];  // Devuelvo la primera fila { col1: v1 , col2 : v2}
                callback(null, registroMantenimiento);
            }
        });
    }

    getRegistroMantenimientosPorVehiculo(idVehiculo, callback) {
        const query = 'SELECT * FROM registroMantenimiento WHERE idvehiculo = ?';
        db.query(query, [idVehiculo], (err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteRegistroMantenimiento(registroMantenimientoId, callback) {
        const query = 'DELETE FROM registroMantenimiento WHERE idregistroMantenimiento = ?';
        db.query(query, [registroMantenimientoId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    updateRegistroMantenimiento(registroMantenimientoId, registroMantenimientoData, callback) {
        const query = 'UPDATE registroMantenimiento SET nombre = ?, descripcion = ?, precio = ?, idvehiculo = ? WHERE idregistroMantenimiento = ?';
        const values = [registroMantenimientoData.nombre, registroMantenimientoData.descripcion, registroMantenimientoData.precio, registroMantenimientoData.idvehiculo, registroMantenimientoId];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new RegistroMantenimientoModel();

// Estructura de result (mysql)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Número de filas afectadas por la consulta
//   insertId: 1,    // ID generado por la operación de inserción
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0  // Número de filas cambiadas por la consulta
// }

