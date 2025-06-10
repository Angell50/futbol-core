const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Equipo = require('./Equipo');
const Jugador = require('./Jugador');
const Partido = require('./Partido');
const Desempeno = require('./Desempeno');

// Relaciones

// Equipo ↔ Jugador
Equipo.hasMany(Jugador, { foreignKey: 'equipoId' });
Jugador.belongsTo(Equipo, { foreignKey: 'equipoId' });

// Jugador ↔ Desempeno
Jugador.hasMany(Desempeno, { foreignKey: 'jugadorId' });
Desempeno.belongsTo(Jugador, { foreignKey: 'jugadorId' });

// Partido ↔ Desempeno
Partido.hasMany(Desempeno, { foreignKey: 'partidoId' });
Desempeno.belongsTo(Partido, { foreignKey: 'partidoId' });

// Partido ↔ Equipos (Local y Visitante)
Partido.belongsTo(Equipo, { as: 'equipoLocal', foreignKey: 'equipoLocalId' });
Partido.belongsTo(Equipo, { as: 'equipoVisitante', foreignKey: 'equipoVisitanteId' });

const db = {
  sequelize,
  Usuario,
  Equipo,
  Jugador,
  Partido,
  Desempeno
};

module.exports = db;
