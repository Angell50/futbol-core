const { Desempeno, Jugador, Partido } = require('../models');

exports.registrarDesempeno = async (req, res) => {
  try {
    const { jugadorId, partidoId, goles, asistencias, pases, recuperaciones } = req.body;

    // Calcular calificación
    const calificacion_final = (
      goles * 3 +
      asistencias * 2 +
      pases * 0.5 +
      recuperaciones * 0.5
    ) / 10;

    const nuevo = await Desempeno.create({
      jugadorId,
      partidoId,
      goles,
      asistencias,
      pases,
      recuperaciones,
      calificacion_final
    });

    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar desempeño' });
  }
};

exports.obtenerDesempenos = async (req, res) => {
  try {
    const lista = await Desempeno.findAll({
      include: [
        { model: Jugador },
        { model: Partido }
      ]
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener desempeños' });
  }
};

exports.actualizarDesempeno = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Desempeno.update(req.body, { where: { id } });
    res.json({ mensaje: 'Desempeño actualizado', actualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar desempeño' });
  }
};

exports.eliminarDesempeno = async (req, res) => {
  try {
    const { id } = req.params;
    await Desempeno.destroy({ where: { id } });
    res.json({ mensaje: 'Desempeño eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar desempeño' });
  }
};
