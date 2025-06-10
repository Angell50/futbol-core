import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquiposPage() {
  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [escudo, setEscudo] = useState('');

  // Cargar equipos al inicio
  useEffect(() => {
    obtenerEquipos();
  }, []);

  const obtenerEquipos = () => {
    axios.get('http://localhost:3001/api/equipos')
      .then(res => setEquipos(res.data))
      .catch(err => console.error(err));
  };

  // Registrar nuevo equipo
  const manejarEnvio = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/equipos', { nombre, escudo })
      .then(() => {
        setNombre('');
        setEscudo('');
        obtenerEquipos(); // Refrescar lista
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>⚽ Equipos Registrados</h2>

      <form onSubmit={manejarEnvio} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre del equipo</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL del escudo</label>
          <input
            type="text"
            className="form-control"
            value={escudo}
            onChange={e => setEscudo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar equipo</button>
      </form>

      <ul className="list-group">
        {equipos.map(equipo => (
          <li key={equipo.id} className="list-group-item d-flex align-items-center">
            {equipo.escudo && (
              <img src={equipo.escudo} alt="Escudo" width={30} height={30} className="me-2" />
            )}
            <strong>{equipo.nombre}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquiposPage;
