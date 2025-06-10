const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

router.get('/goleador', reportesController.maximoGoleador);
router.get('/mejor-por-equipo/:equipoId', reportesController.mejorPorEquipo);
router.get('/mejor-por-posicion/:posicion', reportesController.mejorPorPosicion);

module.exports = router;
