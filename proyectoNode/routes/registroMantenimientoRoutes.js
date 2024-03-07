// registroMantenimientoRoutes.js
const express = require('express');
const router = express.Router();
const registroMantenimientoController = require('../controllers/registroMantenimientoController');

router.get('/', registroMantenimientoController.getAllRegistroMantenimiento);
router.get('/:id', registroMantenimientoController.getRegistroMantenimientoById);
router.post('/', registroMantenimientoController.createRegistroMantenimiento);
router.put('/:id', registroMantenimientoController.updateRegistroMantenimiento);
router.delete('/:id', registroMantenimientoController.deleteRegistroMantenimiento);
module.exports = router;
