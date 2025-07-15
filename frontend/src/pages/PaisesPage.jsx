import React, { useState } from 'react';
import axios from 'axios';

const PaisesPage = () => {
  const [pais, setPais] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const buscarPais = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/${pais}`);
      setResultado(res.data[0]);
      setError('');
    } catch (err) {
      setResultado(null);
      setError('País no encontrado o error en la API');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">🌍 Búsqueda de Países</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe el nombre de un país"
          value={pais}
          onChange={e => setPais(e.target.value)}
        />
        <button className="btn btn-primary" onClick={buscarPais}>
          Buscar
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {resultado && (
        <div className="card">
          <img src={resultado.flags.svg} className="card-img-top" alt={`Bandera de ${resultado.name.common}`} />
          <div className="card-body">
            <h5 className="card-title">{resultado.name.official}</h5>
            <p className="card-text">Capital: {resultado.capital?.[0]}</p>
            <p className="card-text">Población: {resultado.population.toLocaleString()}</p>
            <p className="card-text">Región: {resultado.region}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaisesPage;
