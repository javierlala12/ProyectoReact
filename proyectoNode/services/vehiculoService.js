// vehiculoService.js
const vehiculoModel = require('../models/vehiculoModel');

class VehiculoService {
    getAllVehiculo(callback) {
        vehiculoModel.getAllVehiculo((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    getRegistroMantenimientosPorVehiculo(idVehiculo, callback) {
        vehiculoModel.getRegistroMantenimientosPorVehiculo(idVehiculo, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

}

module.exports = new VehiculoService();
