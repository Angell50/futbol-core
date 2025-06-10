const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/', equipoController.crearEquipo);
router.get('/', equipoController.obtenerEquipos);
router.put('/:id', equipoController.actualizarEquipo);
router.delete('/:id', equipoController.eliminarEquipo);

module.exports = router;
