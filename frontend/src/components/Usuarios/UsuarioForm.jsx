import React, { useState, useEffect } from 'react';
import ValidacionesUsuario from '../../utils/validacionesUsuario'; 

const UsuarioForm = ({ onSubmit, editando }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('usuario');

  useEffect(() => {
    if (editando) {
      setCorreo(editando.correo);
      setRol(editando.rol);
      setContraseña('');
    } else {
      setCorreo('');
      setRol('usuario');
      setContraseña('');
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí aplicamos la validación usando Strategy
    const error = ValidacionesUsuario.validar({ correo, contraseña, rol });
    if (error) {
      alert(error);
      return;
    }

    onSubmit({ correo, contraseña, rol });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} type="password" required={!editando} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={rol} onChange={e => setRol(e.target.value)}>
            <option value="usuario">usuario</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" type="submit">
            {editando ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UsuarioForm;
