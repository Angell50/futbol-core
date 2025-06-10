import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JugadoresPage() {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipoId, setEquipoId] = useState('');

  useEffect(() => {
    obtenerJugadores();
    obtenerEquipos();
  }, []);

  const obtenerJugadores = () => {
    axios.get('http://localhost:3001/api/jugadores')
      .then(res => setJugadores(res.data))
      .catch(err => console.error(err));
  };

  const obtenerEquipos = () => {
    axios.get('http://localhost:3001/api/equipos')
      .then(res => setEquipos(res.data))
      .catch(err => console.error(err));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/jugadores', { nombre, posicion, equipoId })
      .then(() => {
        setNombre('');
        setPosicion('');
        setEquipoId('');
        obtenerJugadores();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>🧍 Jugadores</h2>

      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Posición</label>
          <select
            className="form-select"
            value={posicion}
            onChange={e => setPosicion(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option>Delantero</option>
            <option>Mediocampista</option>
            <option>Defensa</option>
            <option>Portero</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Equipo</label>
          <select
            className="form-select"
            value={equipoId}
            onChange={e => setEquipoId(e.target.value)}
            required
          >
            <option value="">Seleccionar equipo</option>
            {equipos.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Registrar jugador</button>
      </form>

      <ul className="list-group">
        {jugadores.map(j => (
          <li key={j.id} className="list-group-item">
            <strong>{j.nombre}</strong> – {j.posicion} ({j.Equipo?.nombre})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JugadoresPage;
