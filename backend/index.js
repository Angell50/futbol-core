const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middlewares generales
app.use(cors());
app.use(express.json());

// Rutas
const rutasEquipos = require('./routes/equipos');
const rutasJugadores = require('./routes/jugadores');
const rutasPartidos = require('./routes/partidos');
const rutasDesempenos = require('./routes/desempenos');
const rutasReportes = require('./routes/reportes');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Prefijos de ruta
app.use('/api/equipos', rutasEquipos);
app.use('/api/jugadores', rutasJugadores);
app.use('/api/partidos', rutasPartidos);
app.use('/api/desempenos', rutasDesempenos);
app.use('/api/reportes', rutasReportes);
app.use('/api', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Conexión a base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => console.error('Error al conectar DB:', err));
