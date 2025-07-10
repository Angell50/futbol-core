const express = require('express');
const router = express.Router();
const prediccionController = require('../controllers/prediccionController');

router.get('/rendimientos', prediccionController.obtenerRendimientos);
router.get('/equipo-ideal', prediccionController.equipoIdeal);

module.exports = router;
