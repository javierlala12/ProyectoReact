// vehiculoRoutes.js
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

router.get('/', vehiculoController.getAllVehiculo);
router.get('/:id', vehiculoController.getVehiculoById);
router.post('/', vehiculoController.createVehiculo);
router.put('/:id', vehiculoController.updateVehiculo);
router.delete('/:id', vehiculoController.deleteVehiculo);
router.get('/:idVehiculo/registroMantenimientos', vehiculoController.getRegistroMantenimientosPorVehiculo);

module.exports = router;
