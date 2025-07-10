const sequelize = require('../config/database');

// Importar modelos
const Usuario = require('./Usuario');
const Equipo = require('./Equipo');
const Jugador = require('./Jugador');
const Partido = require('./Partido');
const Desempeno = require('./Desempeno');

// 🔗 Equipo ↔ Jugador
Equipo.hasMany(Jugador, { foreignKey: 'equipoId', as: 'jugadores' });
Jugador.belongsTo(Equipo, { foreignKey: 'equipoId', as: 'equipo' });

// 🔗 Jugador ↔ Desempeno
Jugador.hasMany(Desempeno, { foreignKey: 'jugadorId', as: 'desempenos' });
Desempeno.belongsTo(Jugador, { foreignKey: 'jugadorId', as: 'jugador' }); // ✅ Alias "jugador"

// 🔗 Partido ↔ Desempeño
Partido.hasMany(Desempeno, { foreignKey: 'partidoId', as: 'desempenos' });
Desempeno.belongsTo(Partido, { foreignKey: 'partidoId', as: 'partido' }); // ✅ Alias "partido"

// 🔗 Partido ↔ Equipos (Local y Visitante)
Partido.belongsTo(Equipo, { as: 'equipoLocal', foreignKey: 'equipoLocalId' });
Partido.belongsTo(Equipo, { as: 'equipoVisitante', foreignKey: 'equipoVisitanteId' });

// ✅ Exporta los modelos para usarlos en controladores
module.exports = {
  sequelize,
  Usuario,
  Equipo,
  Jugador,
  Partido,
  Desempeno
};
