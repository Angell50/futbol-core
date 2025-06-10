const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.post('/', partidoController.crearPartido);
router.get('/', partidoController.obtenerPartidos);
router.put('/:id', partidoController.actualizarPartido);
router.delete('/:id', partidoController.eliminarPartido);

module.exports = router;
