const { Partido, Equipo } = require('../models');

exports.crearPartido = async (req, res) => {
  try {
    const nuevo = await Partido.create(req.body);
    res.json(nuevo);
  } catch (error) {
    console.error("Error al crear partido:", error); // 👈 añade esto
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

exports.obtenerPartidos = async (req, res) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        { model: Equipo, as: 'equipoLocal' },
        { model: Equipo, as: 'equipoVisitante' }
      ]
    });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
};

exports.actualizarPartido = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Partido.update(req.body, { where: { id } });
    res.json({ mensaje: 'Partido actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
};

exports.eliminarPartido = async (req, res) => {
  try {
    const { id } = req.params;
    await Partido.destroy({ where: { id } });
    res.json({ mensaje: 'Partido eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
};
