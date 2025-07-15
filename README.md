
# ⚽ Core de Fútbol

Sistema web para la gestión de equipos de fútbol, jugadores, partidos y evaluación de desempeño por partido. Incluye reportes como máximo goleador, mejor jugador por equipo y por posición, así como predicciones de rendimiento y un equipo ideal basado en estadísticas.

---

## 🧠 Tecnologías

- **Frontend**: React + Bootstrap
- **Backend**: Node.js + Express + Sequelize
- **Base de datos**: MySQL
- **ORM**: Sequelize
- **Control de versiones**: Git + GitHub

---

## 🔐 Funcionalidades

- ✅ Login de administrador
- ✅ Control de rutas según rol (`admin` / `usuario`)
- ✅ CRUD de equipos y jugadores
- ✅ Registro de partidos
- ✅ Registro de desempeño de jugadores: goles, asistencias, pases, recuperaciones
- ✅ Cálculo automático de calificación del jugador sobre 10
- ✅ Reportes:
  - Mejor jugador por equipo
  - Máximo goleador
  - Mejor jugador por posición
- ✅ Módulo de Predicción:
  - Predicción de rendimiento por jugador
  - Generación de equipo ideal

---

## 🚀 Instalación y ejecución local

### 🔧 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/futbol-core.git
cd futbol-core
```

### 🗃️ 2. Configura la base de datos MySQL

1. Abre **MySQL Workbench**.
2. Crea una base de datos:

```sql
CREATE DATABASE futbol_db;
```

3. Asegúrate de tener tu usuario y contraseña configurados.
4. Luego edita `backend/config/db.js`:

```js
const sequelize = new Sequelize('futbol_db', 'TU_USUARIO', 'TU_CONTRASEÑA', {
  host: 'localhost',
  dialect: 'mysql'
});
```

---

### 🔙 3. Backend

```bash
cd backend
npm install
npx nodemon index.js
```

Servidor disponible en: [http://localhost:3001](http://localhost:3001)

---

### 🌐 4. Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 📡 API REST disponibles

| Método | Endpoint                                 | Descripción                             |
|--------|------------------------------------------|-----------------------------------------|
| GET    | `/api/equipos`                           | Listar equipos                           |
| POST   | `/api/equipos`                           | Crear equipo                             |
| GET    | `/api/jugadores`                         | Listar jugadores                         |
| POST   | `/api/jugadores`                         | Crear jugador                            |
| GET    | `/api/partidos`                          | Listar partidos                          |
| POST   | `/api/partidos`                          | Crear partido                            |
| POST   | `/api/desempenos`                        | Registrar desempeño                      |
| GET    | `/api/desempenos`                        | Ver desempeños registrados               |
| GET    | `/api/reportes/goleador`                 | Ver máximo goleador                      |
| GET    | `/api/reportes/mejor-por-equipo/:id`     | Mejor jugador por equipo                 |
| GET    | `/api/reportes/mejor-por-posicion/:pos`  | Mejor jugador por posición               |
| GET    | `/api/prediccion/rendimientos`           | Rendimiento promedio estimado por jugador |
| GET    | `/api/prediccion/equipo-ideal`           | Sugerencia de equipo ideal               |

---

## 🧩 Refactorización usando Principios SOLID y Patrones de Diseño

Durante la implementación inicial del proyecto, se detectaron varios problemas estructurales que afectaban la calidad del código y su mantenibilidad.

### 🔎 Problemas identificados

- **❌ Violación del SRP (Single Responsibility Principle):**
  - Las rutas mezclaban definición, lógica y acceso a datos, dificultando el mantenimiento.
- **❌ Violación del OCP (Open/Closed Principle):**
  - Las validaciones estaban incrustadas en rutas, requiriendo modificar código ya funcional para nuevos cambios.

---

### ✅ Aplicación de Principios SOLID

#### 1. **SRP (Single Responsibility Principle)**
- Separamos el backend en capas: `routes`, `controllers`, `services`, `models`.
- 📌 **Beneficio**: Cada archivo tiene una única responsabilidad clara.

#### 2. **OCP (Open/Closed Principle)**
- Usamos middlewares como `simularAuth` y `esAdmin` para autenticación y autorización.
- 📌 **Beneficio**: Podemos agregar nuevas reglas sin modificar rutas existentes.

---

### 🎯 Aplicación de Patrones de Diseño

#### 1. **Presentational and Container Components (React)**
- División de lógica (`UsuariosPage`) y presentación (`UsuarioForm`, `UsuarioCard`).
- 📌 **Beneficio**: Componentes reutilizables y fáciles de testear.

#### 2. **Strategy Pattern**
- Validaciones encapsuladas en `ValidacionesUsuario.js`.
- 📌 **Beneficio**: Se pueden modificar o extender sin tocar los componentes.

---

## 📌 Notas

Este proyecto está pensado para ejecutarse en entorno local, pero puede ser fácilmente adaptado a producción. Puedes integrar `concurrently` o `Docker` si deseas levantar frontend y backend juntos.

---

## ✍️ Autor

Angel Vela – UDLA 2025
