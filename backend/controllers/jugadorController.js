const { Jugador, Equipo } = require('../models');

exports.crearJugador = async (req, res) => {
  try {
    const nuevo = await Jugador.create(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jugador' });
  }
};

exports.obtenerJugadores = async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      include: [{ model: Equipo, as: 'equipo' }]  // 🔧 Usa el alias exacto
    });
    res.json(jugadores);
  } catch (error) {
    console.error('Error al obtener jugadores:', error.message);
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
};

exports.actualizarJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Jugador.update(req.body, { where: { id } });
    res.json({ mensaje: 'Jugador actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar jugador' });
  }
};

exports.eliminarJugador = async (req, res) => {
  try {
    const { id } = req.params;
    await Jugador.destroy({ where: { id } });
    res.json({ mensaje: 'Jugador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
};

