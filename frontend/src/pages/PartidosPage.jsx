import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PartidosPage() {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [equipoLocalId, setEquipoLocalId] = useState('');
  const [equipoVisitanteId, setEquipoVisitanteId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    obtenerEquipos();
    obtenerPartidos();
  }, []);

  const obtenerEquipos = () => {
    axios.get('http://localhost:3001/api/equipos')
      .then(res => setEquipos(res.data))
      .catch(err => console.error(err));
  };

  const obtenerPartidos = () => {
    axios.get('http://localhost:3001/api/partidos')
      .then(res => setPartidos(res.data))
      .catch(err => console.error(err));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/partidos', { fecha, equipoLocalId, equipoVisitanteId })
      .then(() => {
        setFecha('');
        setEquipoLocalId('');
        setEquipoVisitanteId('');
        obtenerPartidos();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>🏟️ Partidos</h2>

      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo Local</label>
          <select
            className="form-select"
            value={equipoLocalId}
            onChange={e => setEquipoLocalId(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            {equipos.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Equipo Visitante</label>
          <select
            className="form-select"
            value={equipoVisitanteId}
            onChange={e => setEquipoVisitanteId(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            {equipos.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.nombre}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Registrar partido</button>
      </form>

      <ul className="list-group">
        {partidos.map(p => (
          <li key={p.id} className="list-group-item">
            <strong>{p.equipoLocal?.nombre}</strong> 🆚 <strong>{p.equipoVisitante?.nombre}</strong> – {new Date(p.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartidosPage;
