// 📁 routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const simularAuth = require('../middlewares/simularAuth');
const esAdmin = require('../middlewares/esAdmin');

// 🔐 Todas las rutas requieren autenticación
router.use(simularAuth);

// 📄 Listar usuarios (cualquier autenticado)
router.get('/', usuarioController.listar);

// ➕ Crear usuario (cualquier autenticado)
router.post('/', usuarioController.registrar);

// ✏️ Actualizar usuario (cualquier autenticado)
router.put('/:id', usuarioController.actualizar);

// ❌ Eliminar solo si es admin
router.delete('/:id', esAdmin, usuarioController.eliminar);

module.exports = router;
