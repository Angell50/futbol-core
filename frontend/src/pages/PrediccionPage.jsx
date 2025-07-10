import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PrediccionPage = () => {
  const [rendimientos, setRendimientos] = useState([]);
  const [equipoIdeal, setEquipoIdeal] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get('http://localhost:3001/api/prediccion/rendimientos'),
          axios.get('http://localhost:3001/api/prediccion/equipo-ideal')

        ]);
        setRendimientos(res1.data);
        setEquipoIdeal(res2.data);
      } catch (error) {
        console.error('Error al obtener datos de predicción:', error);
      }
    };

    fetchDatos();
  }, []);

  const dataGrafico = {
    labels: rendimientos.map(r => r.jugador),
    datasets: [
      {
        label: 'Rendimiento Estimado',
        data: rendimientos.map(r => r.rendimiento),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Predicción de Rendimiento por Jugador</h2>
      <Bar data={dataGrafico} />

      <h2 className="mt-5 mb-3">🏆 Equipo Ideal</h2>
      <ul className="list-group">
        {equipoIdeal.map(j => (
          <li key={j.jugadorId} className="list-group-item">
            {j.nombre} - {j.posicion} (Rendimiento: {j.rendimiento.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrediccionPage;
