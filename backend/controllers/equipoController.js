const { Equipo } = require('../models');

exports.crearEquipo = async (req, res) => {
  try {
    const nuevo = await Equipo.create(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear equipo' });
  }
};

exports.obtenerEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.findAll();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
};

exports.actualizarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Equipo.update(req.body, { where: { id } });
    res.json({ mensaje: 'Equipo actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar equipo' });
  }
};

exports.eliminarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    await Equipo.destroy({ where: { id } });
    res.json({ mensaje: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar equipo' });
  }
};
