# ⚽ Core de Fútbol

Sistema web para la gestión de equipos de fútbol, jugadores, partidos y evaluación de desempeño por partido. Incluye reportes como máximo goleador, mejor jugador por equipo y por posición.

---

## 🧠 Tecnologías

- **Frontend**: React + Bootstrap
- **Backend**: Node.js + Express + Sequelize
- **Base de datos**: MySQL
- **ORM**: Sequelize
- **Control de versiones**: Git + GitHub

---

## 🔐 Funcionalidades

- ✅ Login de administrador (pendiente de implementación)
- ✅ CRUD de equipos y jugadores
- ✅ Registro de partidos
- ✅ Registro de desempeño de jugadores: goles, asistencias, pases, recuperaciones
- ✅ Cálculo automático de calificación del jugador sobre 10
- ✅ Reportes:
  - Mejor jugador por equipo
  - Máximo goleador
  - Mejor jugador por posición

## 🚀 Instalación y ejecución local

### 🔧 1. Clona el repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/futbol-core.git
cd futbol-core
\`\`\`

### 🗃️ 2. Configura la base de datos MySQL

1. Abre **MySQL Workbench**.
2. Crea una base de datos:

\`\`\`sql
CREATE DATABASE futbol_db;
\`\`\`

3. Asegúrate de tener tu usuario y contraseña configurados.
4. Luego configura \`backend/config/db.js\` así:

\`\`\`js
const sequelize = new Sequelize('futbol_db', 'TU_USUARIO', 'TU_CONTRASEÑA', {
  host: 'localhost',
  dialect: 'mysql'
});
\`\`\`

---

### 🔙 3. Backend

\`\`\`bash
cd backend
npm install
npx nodemon index.js
\`\`\`

Servidor disponible en: [http://localhost:3001](http://localhost:3001)

---

### 🌐 4. Frontend

\`\`\`bash
cd ../frontend
npm install
npm start
\`\`\`

---

## 📡 API REST disponibles

| Método | Endpoint                             | Descripción                             |
|--------|--------------------------------------|-----------------------------------------|
| GET    | \`/api/equipos\`                       | Listar equipos                           |
| POST   | \`/api/equipos\`                       | Crear equipo                             |
| GET    | \`/api/jugadores\`                     | Listar jugadores                         |
| POST   | \`/api/jugadores\`                     | Crear jugador                            |
| POST   | \`/api/partidos\`                      | Crear partido                            |
| POST   | \`/api/desempenos\`                    | Registrar desempeño                      |
| GET    | \`/api/reportes/goleadores\`           | Ver máximo goleador                      |
| GET    | \`/api/reportes/mejor-jugador/:id\`    | Mejor jugador por equipo                 |
| GET    | \`/api/reportes/mejor-posicion/:pos\`  | Mejor jugador por posición               |

---
## 📌 Notas

Este proyecto está pensado para ejecutarse en entorno local, pero puede ser fácilmente adaptado a producción. El frontend y el backend pueden ser integrados con \`concurrently\` para ejecución conjunta, si se desea.