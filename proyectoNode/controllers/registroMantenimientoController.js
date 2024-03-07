// registroMantenimientoController.js
const registroMantenimientoService = require('../services/registroMantenimientoService');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class RegistroMantenimientoController {

  async getAllRegistroMantenimiento(req, res) {

    // Recuperar información de los parámetros de la petición
    const { listado } = req.query; // query puede ser { listado : true }

    // Si se trata de un listado (existe el parámetro listado), invoco otro servicio
    if (listado) {
      registroMantenimientoService.getAllRegistroMantenimientoListado((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Listado de registroMantenimientos recuperado'));
        }
      });
    } else { // No se trata de un listado
      // Implementa la lógica para obtener todos los datos 
      registroMantenimientoService.getAllRegistroMantenimiento((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Datos de registroMantenimientos recuperados'));
        }
      });
    }
  };

  async getRegistroMantenimientoById(req, res) {
    // Implementa la lógica para obtener un dato por ID
    // Recuperar información de la query string (?p1=v1&p2=v2)
    const { relations } = req.query;
    // Recuperar información que vienen en la ruta '/:id'
    const registroMantenimientoId = req.params.id;

    // Si hay que recuperar los datos relacionados (relations), invoco otro servicio
    if (relations) {

      registroMantenimientoService.getRegistroMantenimientoByIdRelations(registroMantenimientoId, (err, registroMantenimiento) => {
        if (err) {
          res.status(500).json(Respuesta.error(registroMantenimiento, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (registroMantenimiento == null) {
          logMensaje("Respuesta es:" + JSON.stringify(Respuesta.error(registroMantenimiento, 'RegistroMantenimiento no encontrado' + req.originalUrl)))
          res.status(404).json(Respuesta.error(registroMantenimiento, 'RegistroMantenimiento no encontrado: ' + registroMantenimientoId));
        } else {
          res.json(Respuesta.exito(registroMantenimiento, 'RegistroMantenimiento recuperado'));
        }
      });
    } else { // No necesito recuperar datos relacionados

      // Implementa la lógica para obtener el registroMantenimiento
      registroMantenimientoService.getRegistroMantenimientoById(registroMantenimientoId, (err, registroMantenimiento) => {
        if (err) {
          res.status(500).json(Respuesta.error(registroMantenimiento, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (registroMantenimiento == null) {
          res.status(404).json(Respuesta.error(registroMantenimiento, 'RegistroMantenimiento no encontrado: ' + registroMantenimientoId));
        } else {
          res.json(Respuesta.exito(registroMantenimiento, 'RegistroMantenimiento recuperado'));
        }
      });
    }
  };

  async createRegistroMantenimiento(req, res) {
    // Implementa la lógica para crear un nuevo dato

    // Recuperar objeto con el registroMantenimiento a dar de alta
    const registroMantenimientoData = req.body;

    registroMantenimientoService.createRegistroMantenimiento(registroMantenimientoData, (err, result) => {
      if (err) {
        res.status(500).json(Respuesta.error(result, 'Error al insertar el registroMantenimiento:' + req.originalUrl));
      } else {
        // 201: Created
        res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'RegistroMantenimiento dado de alta'));
      }
    });


  };

  async updateRegistroMantenimiento(req, res) {
    const registroMantenimientoId = req.params.id;
    const registroMantenimientoData = req.body;
    registroMantenimientoService.updateRegistroMantenimiento(registroMantenimientoId, registroMantenimientoData, (err, result) => {
        if (err) {
            res.status(500).json(Respuesta.error(null, 'Error al actualizar el registroMantenimiento: ' + err.message));
        } else if (result.affectedRows === 0) {
            // Ninguna fila afectada significa que el registroMantenimiento no existe
            res.status(404).json(Respuesta.error(null, 'RegistroMantenimiento no encontrado con ID: ' + registroMantenimientoId));
        } else {
            res.json(Respuesta.exito({ affectedRows: result.affectedRows }, 'RegistroMantenimiento actualizado correctamente'));
        }
    });
};


  async deleteRegistroMantenimiento(req, res) {
    // Implementa la lógica para eliminar un dato por ID
    // Recuperar información que vienen en la ruta '/:id'
    const registroMantenimientoId = req.params.id;
    // Implementa la lógica para eliminar el registroMantenimiento
    registroMantenimientoService.deleteRegistroMantenimiento(registroMantenimientoId, (err, result) => {
      if (err) {
          console.error('Error al eliminar registroMantenimiento:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      // } else if (result === 0) {
      //     res.status(404).json({ error: 'RegistroMantenimiento no encontrado' });
      } else {
          res.status(204).end(); // 204: No Content
      }
  });

  };



}

module.exports = new RegistroMantenimientoController();
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
