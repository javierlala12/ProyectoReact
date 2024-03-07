// Ejemplo en vehiculoModel.js
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class VehiculoModel {
    getAllVehiculo(callback) {
        const query = 'SELECT * FROM vehiculo';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getVehiculoById(idVehiculo, callback) {
        const query = 'SELECT * FROM vehiculo WHERE idvehiculo = ?';
        db.query(query, [idVehiculo], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result[0]);
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
}

module.exports = new VehiculoModel();
