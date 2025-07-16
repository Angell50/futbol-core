const express = require('express');
const router = express.Router();

const reporteGoleadoresController = require('../controllers/reporteGoleadoresController');

router.get('/goleadores-por-fecha', reporteGoleadoresController.reporteGoleadoresPorFecha);

module.exports = router;
