const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jugador = sequelize.define('Jugador', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posicion: {
    type: DataTypes.STRING,
    allowNull: false // Ej: 'Delantero', 'Defensa', etc.
  }
});

module.exports = Jugador;
