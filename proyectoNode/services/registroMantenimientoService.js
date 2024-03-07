// Ejemplo en dataService.js
const registroMantenimientoModel = require('../models/registroMantenimientoModel');
const { logMensaje } = require('../utils/logger');

class RegistroMantenimientoService {
    getAllRegistroMantenimiento(callback) {
        registroMantenimientoModel.getAllRegistroMantenimiento((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllRegistroMantenimientoListado(callback) {
        registroMantenimientoModel.getAllRegistroMantenimientoListado((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    async createRegistroMantenimiento(registroMantenimientoData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el registroMantenimiento

        registroMantenimientoModel.createRegistroMantenimiento(registroMantenimientoData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getRegistroMantenimientoById(registroMantenimientoId, callback) {

        registroMantenimientoModel.getRegistroMantenimientoById(registroMantenimientoId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getRegistroMantenimientoByIdRelations(registroMantenimientoId, callback) {

        registroMantenimientoModel.getRegistroMantenimientoByIdRelations(registroMantenimientoId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteRegistroMantenimiento(registroMantenimientoId, callback) {
        registroMantenimientoModel.deleteRegistroMantenimiento(registroMantenimientoId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows); // Número de filas afectadas
            }
        });
    }

    updateRegistroMantenimiento(registroMantenimientoId, registroMantenimientoData, callback) {
        registroMantenimientoModel.updateRegistroMantenimiento(registroMantenimientoId, registroMantenimientoData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = new RegistroMantenimientoService();
