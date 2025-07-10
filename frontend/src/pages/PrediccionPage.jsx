import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PrediccionPage = () => {
  const [predicciones, setPredicciones] = useState([]);
  const [equipoIdeal, setEquipoIdeal] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get('http://localhost:3001/api/prediccion/rendimientos'),
          axios.get('http://localhost:3001/api/prediccion/equipo-ideal')
        ]);
        setPredicciones(res1.data);
        setEquipoIdeal(res2.data);
      } catch (error) {
        console.error('Error al obtener datos de predicción:', error);
      }
    };

    fetchDatos();
  }, []);

  const dataGrafico = {
    labels: predicciones.map(p => p.jugador),
    datasets: [
      {
        label: '🎯 Goles Estimados',
        data: predicciones.map(p => p.goles_estimados),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '🎯 Asistencias Estimadas',
        data: predicciones.map(p => p.asistencias_estimadas),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: '📊 Calificación Final Estimada',
        data: predicciones.map(p => p.calificacion_final_estimada),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📈 Predicción Final por Jugador (Fin de Año)</h2>
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
