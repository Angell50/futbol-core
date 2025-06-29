// 📁 services/usuarioService.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(correo, contraseña) {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      const error = new Error('Contraseña incorrecta');
      error.status = 401;
      throw error;
    }

    return {
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol
      }
    };
  },

  async registrar(correo, contraseña, rol = 'user') {
    const hash = await bcrypt.hash(contraseña, 10);
    return Usuario.create({ correo, contraseña: hash, rol });
  },

  async listar() {
    return Usuario.findAll();
  },

  async actualizar(id, correo, contraseña, rol) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('No encontrado');

    usuario.correo = correo || usuario.correo;
    usuario.rol = rol || usuario.rol;
    if (contraseña) usuario.contraseña = await bcrypt.hash(contraseña, 10);

    await usuario.save();
    return usuario;
  },

  async eliminar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('No encontrado');
    await usuario.destroy();
  }
};
