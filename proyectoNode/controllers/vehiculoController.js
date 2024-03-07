// vehiculoController.js
const vehiculoService = require('../services/vehiculoService');
const Respuesta = require('../utils/respuesta');

class VehiculoController {

  async getAllVehiculo(req, res) {
    // Implementa la lógica para obtener todos los datos 
    vehiculoService.getAllVehiculo((err, data) => {
      if (err) {
        res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
      } else {
        res.json(Respuesta.exito(data, 'Datos de vehiculos recuperados'));
      }
    });
  };


  async getVehiculoById(req, res) {
    // Implementa la lógica para obtener un dato por ID
    const { id } = req.params;
  vehiculoService.getVehiculoById(id, (err, data) => {
    if (err) {
      res.status(500).json(Respuesta.error(null, 'Error al recuperar el vehiculo: ' + err.message));
    } else if (data) {
      res.json(Respuesta.exito(data, 'Vehiculo recuperado con éxito'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Vehiculo no encontrado'));
    }
  });
  };

  async getRegistroMantenimientosPorVehiculo(req, res) {
    const { idVehiculo } = req.params; // Asegúrate de que el nombre del parámetro coincida con el definido en tus rutas.
    
    vehiculoService.getRegistroMantenimientosPorVehiculo(idVehiculo, (err, data) => {
        if (err) {
            // Maneja el error enviando una respuesta de error al cliente.
            res.status(500).json(Respuesta.error(null, `Error al recuperar registroMantenimientos por vehiculo ${idVehiculo}: ${err.message}`));
        } else if (data && data.length > 0) {
            // Si se encontraron datos, envía una respuesta exitosa al cliente.
            res.json(Respuesta.exito(data, `RegistroMantenimientos por vehiculo ${idVehiculo} recuperados con éxito`));
        } else {
            // Si no se encontraron datos (data es un arreglo vacío), considera enviar un 404.
            res.status(404).json(Respuesta.error(null, `No se encontraron registroMantenimientos para el vehiculo ${idVehiculo}`));
        }
    });
}
  

  async createVehiculo(req, res) {
    // Implementa la lógica para crear un nuevo dato
  };

  async updateVehiculo(req, res) {
    // Implementa la lógica para actualizar un dato por ID
  };

  async deleteVehiculo(req, res) {
    // Implementa la lógica para eliminar un dato por ID
  };
}

module.exports = new VehiculoController();
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
