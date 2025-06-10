import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportesPage() {
  const [goleador, setGoleador] = useState(null);
  const [mejorPorEquipo, setMejorPorEquipo] = useState(null);
  const [mejorPorPosicion, setMejorPorPosicion] = useState(null);

  const [equipoId, setEquipoId] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/equipos')
      .then(res => setEquipos(res.data));

    axios.get('http://localhost:3001/api/reportes/goleador')
      .then(res => setGoleador(res.data));
  }, []);

  const buscarMejorPorEquipo = () => {
    axios.get(`http://localhost:3001/api/reportes/mejor-por-equipo/${equipoId}`)
      .then(res => setMejorPorEquipo(res.data));
  };

  const buscarMejorPorPosicion = () => {
    axios.get(`http://localhost:3001/api/reportes/mejor-por-posicion/${posicion}`)
      .then(res => setMejorPorPosicion(res.data));
  };

  return (
    <div>
      <h2>📈 Reportes</h2>

      <div className="mb-4">
        <h5>⚽ Máximo goleador:</h5>
        {goleador ? (
          <p>{goleador.Jugador?.nombre} con {goleador.totalGoles} goles</p>
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>

      <div className="mb-4">
        <h5>🏆 Mejor jugador por equipo</h5>
        <select className="form-select mb-2" value={equipoId} onChange={e => setEquipoId(e.target.value)}>
          <option value="">Seleccionar equipo</option>
          {equipos.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={buscarMejorPorEquipo}>Buscar</button>
        {mejorPorEquipo && (
          <p className="mt-2">
            {mejorPorEquipo.Jugador?.nombre} con promedio {parseFloat(mejorPorEquipo.promedio).toFixed(2)}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h5>🎯 Mejor jugador por posición</h5>
        <select className="form-select mb-2" value={posicion} onChange={e => setPosicion(e.target.value)}>
          <option value="">Seleccionar posición</option>
          <option>Delantero</option>
          <option>Mediocampista</option>
          <option>Defensa</option>
          <option>Portero</option>
        </select>
        <button className="btn btn-success" onClick={buscarMejorPorPosicion}>Buscar</button>
        {mejorPorPosicion && (
          <p className="mt-2">
            {mejorPorPosicion.Jugador?.nombre} con promedio {parseFloat(mejorPorPosicion.promedio).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReportesPage;
