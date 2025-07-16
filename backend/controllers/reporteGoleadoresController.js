const { Desempeno, Jugador, Partido } = require('../models');
const { Op } = require('sequelize');

exports.reporteGoleadoresPorFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    const desempenos = await Desempeno.findAll({
      include: [
        { model: Jugador, as: 'jugador' },
        { model: Partido, as: 'partido' }
      ],
      where: {
        '$partido.fecha$': {
          [Op.between]: [fechaInicio, fechaFin]
        }
      }
    });

    const resumen = {};

    for (const d of desempenos) {
      const nombre = d.jugador?.nombre || 'Desconocido';
      const goles = d.goles || 0;
      const asistencias = d.asistencias || 0;

      if (!resumen[nombre]) {
        resumen[nombre] = { goles: 0, asistencias: 0 };
      }

      resumen[nombre].goles += goles;
      resumen[nombre].asistencias += asistencias;
    }

    const resultado = Object.entries(resumen).map(([jugador, data]) => {
      const puntaje = Number((data.goles * 0.6 + data.asistencias * 0.4).toFixed(2));
      return {
        jugador,
        goles: data.goles,
        asistencias: data.asistencias,
        puntaje
      };
    });

    // Ordenar de mayor a menor puntaje
    resultado.sort((a, b) => b.puntaje - a.puntaje);

    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al generar el reporte de goleadores agrupado:", error);
    res.status(500).json({ error: 'Error al generar el reporte de goleadores por fecha' });
  }
};
