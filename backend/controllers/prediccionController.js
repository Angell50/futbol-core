const { Desempeno, Jugador } = require('../models');

// 🔢 Función para calcular el rendimiento personalizado
function calcularRendimiento(d) {
  return (
    d.goles * 4 +
    d.asistencias * 3 +
    d.recuperaciones * 2 +
    d.pases * 0.1 +
    d.calificacion_final * 5
  );
}

// 📈 GET /api/prediccion/rendimientos
exports.obtenerRendimientos = async (req, res) => {
  try {
    const desempenos = await Desempeno.findAll({
      include: [{ model: Jugador, as: 'jugador' }] // 👈 Usa el alias correcto
    });

    const rendimientos = desempenos.map(d => ({
      jugador: d.jugador.nombre,        // 👈 Accede con 'jugador' (minúscula)
      jugadorId: d.jugadorId,
      rendimiento: calcularRendimiento(d)
    }));

    res.json(rendimientos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al calcular rendimientos' });
  }
};

// 🧠 GET /api/prediccion/equipo-ideal
exports.equipoIdeal = async (req, res) => {
  try {
    const desempenos = await Desempeno.findAll({
      include: [{ model: Jugador, as: 'jugador' }] // 👈 Usa el alias correcto
    });

    const rendimientos = desempenos.map(d => ({
      jugadorId: d.jugadorId,
      nombre: d.jugador.nombre,         // 👈 Accede con 'jugador'
      posicion: d.jugador.posicion,
      rendimiento: calcularRendimiento(d)
    }));

    // Agrupar por jugadorId
    const agrupado = {};
    rendimientos.forEach(r => {
      if (!agrupado[r.jugadorId]) {
        agrupado[r.jugadorId] = { ...r, conteo: 1 };
      } else {
        agrupado[r.jugadorId].rendimiento += r.rendimiento;
        agrupado[r.jugadorId].conteo += 1;
      }
    });

    const promedio = Object.values(agrupado).map(j => ({
      ...j,
      rendimiento: j.rendimiento / j.conteo
    }));

    // Ordenar y devolver top 11
    const top11 = promedio.sort((a, b) => b.rendimiento - a.rendimiento).slice(0, 11);

    res.json(top11);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener equipo ideal' });
  }
};
