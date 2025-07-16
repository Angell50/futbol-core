import React, { useState } from 'react';

import axios from 'axios';

const ReporteGoleadoresPage = () => {
  const [reporte, setReporte] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const fetchReporte = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/reportes/goleadores-por-fecha', {
        params: { fechaInicio, fechaFin }
      });
      
      const datosOrdenados = res.data.sort((a, b) => b.goles - a.goles);
      setReporte(datosOrdenados);
    } catch (err) {
      console.error("Error al cargar el reporte:", err);
      alert("No se pudo cargar el reporte de goleadores por fecha.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">📊 Goleadores por Fecha</h2>

      <div className="mb-3 d-flex gap-2">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="form-control"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary" onClick={fetchReporte}>Filtrar</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Goles</th>
            <th>Asistencias</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {reporte.length > 0 ? (
            reporte.map((item, index) => (
              <tr key={index}>
                <td>{item.jugador}</td>
                <td>{item.goles}</td>
                <td>{item.asistencias}</td>
                <td>{item.puntaje.toFixed(1)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay datos para el rango seleccionado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteGoleadoresPage;
