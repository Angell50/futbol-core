const { Desempeno, Jugador } = require('../models');

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
          jugador: d.jugador?.nombre || "Desconocido",
          jugadorId: id,
          goles: 0,
          asistencias: 0,
          partidos: 0
        };
      }

      resumen[id].goles += d.goles;
      resumen[id].asistencias += d.asistencias;
      resumen[id].partidos++;
    });

    const predicciones = Object.values(resumen).map(j => {
      const promedioGoles = j.partidos > 0 ? j.goles / j.partidos : 0;
      const promedioAsistencias = j.partidos > 0 ? j.asistencias / j.partidos : 0;

      const partidosTotales = 38;
      const partidosRestantes = partidosTotales - j.partidos;

      const golesEstimados = Math.round(j.goles + promedioGoles * partidosRestantes);
      const asistenciasEstimadas = Math.round(j.asistencias + promedioAsistencias * partidosRestantes);

      //Calificación estimada basada solo en goles y asistencias
      const rendimientoTotal = (golesEstimados * 2 + asistenciasEstimadas * 1); // peso personalizado
      const calificacion_final_estimada = Number((rendimientoTotal / partidosTotales).toFixed(2));

      return {
        jugador: j.jugador,
        jugadorId: j.jugadorId,
        goles_estimados: golesEstimados,
        asistencias_estimadas: asistenciasEstimadas,
        calificacion_final_estimada
      };
    });

    console.log("✅ Predicciones generadas:", predicciones);
    res.json(predicciones);

  } catch (error) {
    console.error("❌ Error en predecirRendimientos:", error);
    res.status(500).json({ error: 'Error en la predicción de rendimiento' });
  }
};

exports.obtenerEquipoIdeal = async (req, res) => {
  try {
    const desempenos = await Desempeno.findAll({
      include: [{ model: Jugador, as: 'jugador' }]
    });

    const resumen = {};

    desempenos.forEach(d => {
      const id = d.jugadorId;
      if (!resumen[id]) {
        resumen[id] = {
          jugadorId: id,
          nombre: d.jugador?.nombre || 'Desconocido',
          posicion: d.jugador?.posicion || 'Desconocida',
          goles: 0,
          asistencias: 0
        };
      }
      resumen[id].goles += d.goles;
      resumen[id].asistencias += d.asistencias;
    });

    const rendimientos = Object.values(resumen).map(j => {
      return {
        ...j,
        rendimiento: j.goles * 2 + j.asistencias
      };
    });

    const maxRendimiento = Math.max(...rendimientos.map(j => j.rendimiento)) || 1;

    const normalizados = rendimientos.map(j => ({
      jugadorId: j.jugadorId,
      nombre: j.nombre,
      posicion: j.posicion,
      rendimiento: Number(((j.rendimiento / maxRendimiento) * 10).toFixed(2))
    }));

    const equipoIdeal = normalizados
      .sort((a, b) => b.rendimiento - a.rendimiento)
      .slice(0, 11);

    res.json(equipoIdeal);
  } catch (error) {
    console.error("❌ Error en obtenerEquipoIdeal:", error);
    res.status(500).json({ error: 'Error al obtener equipo ideal' });
  }
};