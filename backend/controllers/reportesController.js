const { Desempeno, Jugador, Equipo } = require('../models');
const { Sequelize } = require('sequelize');

exports.maximoGoleador = async (req, res) => {
  try {
    const resultado = await Desempeno.findAll({
      attributes: [
        'jugadorId',
        [Sequelize.fn('SUM', Sequelize.col('goles')), 'totalGoles']
      ],
      group: ['jugadorId'],
      order: [[Sequelize.literal('totalGoles'), 'DESC']],
      limit: 1,
      include: [{ model: Jugador }]
    });
    res.json(resultado[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener máximo goleador' });
  }
};

exports.mejorPorEquipo = async (req, res) => {
  try {
    const equipoId = req.params.equipoId;

    const resultado = await Desempeno.findAll({
      include: {
        model: Jugador,
        where: { equipoId }
      },
      attributes: [
        'jugadorId',
        [Sequelize.fn('AVG', Sequelize.col('calificacion_final')), 'promedio']
      ],
      group: ['jugadorId'],
      order: [[Sequelize.literal('promedio'), 'DESC']],
      limit: 1
    });

    res.json(resultado[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mejor jugador del equipo' });
  }
};

exports.mejorPorPosicion = async (req, res) => {
  try {
    const posicion = req.params.posicion;

    const resultado = await Desempeno.findAll({
      include: {
        model: Jugador,
        where: { posicion }
      },
      attributes: [
        'jugadorId',
        [Sequelize.fn('AVG', Sequelize.col('calificacion_final')), 'promedio']
      ],
      group: ['jugadorId'],
      order: [[Sequelize.literal('promedio'), 'DESC']],
      limit: 1
    });

    res.json(resultado[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mejor jugador por posición' });
  }
};
