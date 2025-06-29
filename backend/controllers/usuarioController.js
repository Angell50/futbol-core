// 📁 controllers/usuarioController.js
const usuarioService = require('../services/usuarioService');

module.exports = {
  async login(req, res) {
    const { correo, contraseña } = req.body;
    try {
      const resultado = await usuarioService.login(correo, contraseña);
      res.json(resultado);
    } catch (error) {
      res.status(error.status || 500).json({ mensaje: error.message });
    }
  },

  async registrar(req, res) {
    const { correo, contraseña, rol } = req.body;
    try {
      const nuevoUsuario = await usuarioService.registrar(correo, contraseña, rol);
      res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await usuarioService.listar();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  },

  async actualizar(req, res) {
    const { correo, contraseña, rol } = req.body;
    const id = req.params.id;
    try {
      const usuarioActualizado = await usuarioService.actualizar(id, correo, contraseña, rol);
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
  },

  async eliminar(req, res) {
    const id = req.params.id;
    try {
      await usuarioService.eliminar(id);
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
  }
};
