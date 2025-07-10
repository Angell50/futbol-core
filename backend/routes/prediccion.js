const express = require('express');
const router = express.Router();
const prediccionController = require('../controllers/prediccionController');

// Asegúrate de usar funciones válidas
router.get('/rendimientos', prediccionController.predecirRendimientos);
// Si aún no tienes esta función, coméntala o agrégala luego
router.get('/equipo-ideal',  prediccionController.obtenerEquipoIdeal);

module.exports = router;
