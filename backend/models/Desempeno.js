// models/Desempeno.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Desempeno = sequelize.define('Desempeno', {
  goles: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  asistencias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pases: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recuperaciones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calificacion_final: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  jugadorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  partidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Desempeno;
