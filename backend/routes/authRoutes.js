const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.json({ mensaje: 'Login exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Crear usuario (registro)
router.post('/usuarios', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10); // encriptar con 10 rondas
    const usuario = await Usuario.create({ correo, contraseña: hash });
    res.status(201).json({ mensaje: 'Usuario creado', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
});


module.exports = router;
