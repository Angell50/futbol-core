const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Desempeno = sequelize.define('Desempeno', {
  goles: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  asistencias: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pases: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recuperaciones: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  calificacion_final: {
    type: DataTypes.FLOAT
    // Este se calculará automáticamente
  }
});

module.exports = Desempeno;
