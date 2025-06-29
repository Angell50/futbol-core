import React, { useState } from 'react';

const EquipoForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [escudo, setEscudo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, escudo });
    setNombre('');
    setEscudo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Nombre del equipo</label>
        <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">URL del escudo</label>
        <input type="text" className="form-control" value={escudo} onChange={e => setEscudo(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Registrar equipo</button>
    </form>
  );
};

export default EquipoForm;