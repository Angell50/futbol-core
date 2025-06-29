import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipoForm from '../components/Equipos/EquipoForm';
import EquipoCard from '../components/Equipos/EquipoCard';

function EquiposPage() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await axios.get('http://localhost:3001/api/equipos');
    setEquipos(res.data);
  };

  const agregarEquipo = async (nuevo) => {
    await axios.post('http://localhost:3001/api/equipos', nuevo);
    cargar();
  };

  return (
    <div>
      <h2>⚽ Equipos Registrados</h2>
      <EquipoForm onSubmit={agregarEquipo} />
      <ul className="list-group mt-3">
        {equipos.map(e => <EquipoCard key={e.id} equipo={e} />)}
      </ul>
    </div>
  );
}

export default EquiposPage;
