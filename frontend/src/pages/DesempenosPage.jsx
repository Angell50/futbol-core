import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DesempenosPage() {
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [desempenos, setDesempenos] = useState([]);

  const [jugadorId, setJugadorId] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [goles, setGoles] = useState(0);
  const [asistencias, setAsistencias] = useState(0);
  const [pases, setPases] = useState(0);
  const [recuperaciones, setRecuperaciones] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/jugadores')
      .then(res => setJugadores(res.data));
    axios.get('http://localhost:3001/api/partidos')
      .then(res => setPartidos(res.data));
    axios.get('http://localhost:3001/api/desempenos')
      .then(res => setDesempenos(res.data));
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/desempenos', {
      jugadorId,
      partidoId,
      goles,
      asistencias,
      pases,
      recuperaciones
    }).then(() => {
      setJugadorId('');
      setPartidoId('');
      setGoles(0);
      setAsistencias(0);
      setPases(0);
      setRecuperaciones(0);
      axios.get('http://localhost:3001/api/desempenos')
        .then(res => setDesempenos(res.data));
    });
  };

  return (
    <div>
      <h2>📊 Registrar Desempeño</h2>

      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <label>Jugador</label>
          <select className="form-select" value={jugadorId} onChange={e => setJugadorId(e.target.value)} required>
            <option value="">Seleccionar jugador</option>
            {jugadores.map(j => (
              <option key={j.id} value={j.id}>{j.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Partido</label>
          <select className="form-select" value={partidoId} onChange={e => setPartidoId(e.target.value)} required>
            <option value="">Seleccionar partido</option>
            {partidos.map(p => (
              <option key={p.id} value={p.id}>
                {p.equipoLocal?.nombre} vs {p.equipoVisitante?.nombre} – {new Date(p.fecha).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label>Goles</label>
            <input type="number" className="form-control" value={goles} onChange={e => setGoles(e.target.value)} />
          </div>
          <div className="col">
            <label>Asistencias</label>
            <input type="number" className="form-control" value={asistencias} onChange={e => setAsistencias(e.target.value)} />
          </div>
          <div className="col">
            <label>Pases</label>
            <input type="number" className="form-control" value={pases} onChange={e => setPases(e.target.value)} />
          </div>
          <div className="col">
            <label>Recuperaciones</label>
            <input type="number" className="form-control" value={recuperaciones} onChange={e => setRecuperaciones(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3">Registrar desempeño</button>
      </form>

      <h4>📋 Historial</h4>
      <ul className="list-group">
        {desempenos.map(d => (
          <li key={d.id} className="list-group-item">
            {d.Jugador?.nombre} – {d.goles} ⚽, {d.asistencias} 🅰️, {d.pases} 🎯, {d.recuperaciones} 🛡️ – Puntuación: <strong>{d.calificacion_final}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DesempenosPage;
