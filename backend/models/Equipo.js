const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipo = sequelize.define('Equipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  escudo: {
    type: DataTypes.STRING
  }
});

module.exports = Equipo;
