// controllers/prediccionController.js
const { Desempeno, Jugador } = require('../models');
const { Op } = require('sequelize');

exports.predecirRendimientos = async (req, res) => {
  try {
    const desempenos = await Desempeno.findAll({
    include: [{ model: Jugador, as: 'jugador' }]
    });


    const resumen = {};

    desempenos.forEach(d => {
      const id = d.jugadorId;
      if (!resumen[id]) {
        resumen[id] = {
          jugador: d.jugador.nombre,
          jugadorId: id,
          goles: 0,
          asistencias: 0,
          calificaciones: [],
          partidos: 0
        };
      }

      resumen[id].goles += d.goles;
      resumen[id].asistencias += d.asistencias;
      resumen[id].calificaciones.push(d.calificacion);
      resumen[id].partidos++;
    });

    const predicciones = Object.values(resumen).map(j => {
      const promedioGoles = j.goles / j.partidos;
      const promedioAsistencias = j.asistencias / j.partidos;
      const promedioCalificacion = j.calificaciones.reduce((a, b) => a + b, 0) / j.calificaciones.length;

      const partidosTotales = 38; // Ajusta si tu temporada tiene otro número de partidos
      const partidosRestantes = partidosTotales - j.partidos;

      return {
        jugador: j.jugador,
        jugadorId: j.jugadorId,
        goles_estimados: Math.round(j.goles + promedioGoles * partidosRestantes),
        asistencias_estimadas: Math.round(j.asistencias + promedioAsistencias * partidosRestantes),
        calificacion_final_estimada: Number(promedioCalificacion.toFixed(2))
      };
    });

    res.json(predicciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la predicción de rendimiento' });
  }
};
exports.obtenerEquipoIdeal = async (req, res) => {
  try {
    // Tu lógica de equipo ideal (ya la tenías implementada antes)
    // Retornar algo como:
    res.json([
      { jugadorId: 1, nombre: "Vinicius Jr", posicion: "Delantero", rendimiento: 89.5 },
      // ...
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener equipo ideal' });
  }
};

