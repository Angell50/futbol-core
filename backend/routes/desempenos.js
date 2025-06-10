const express = require('express');
const router = express.Router();
const desempenoController = require('../controllers/desempenoController');

router.post('/', desempenoController.registrarDesempeno);
router.get('/', desempenoController.obtenerDesempenos);
router.put('/:id', desempenoController.actualizarDesempeno);
router.delete('/:id', desempenoController.eliminarDesempeno);

module.exports = router;
