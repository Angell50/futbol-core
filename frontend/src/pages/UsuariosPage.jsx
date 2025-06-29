import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('usuario');
  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioActual || usuarioActual.rol !== 'admin') {
      navigate('/home'); // si no es admin, redirige
    } else {
      cargarUsuarios();
    }
  }, [navigate]);

  const cargarUsuarios = async () => {
    const res = await axios.get('http://localhost:3001/api/usuarios');
    setUsuarios(res.data);
  };

  const crearOActualizar = async (e) => {
    e.preventDefault();

    const payload = { correo, contraseña, rol };

    try {
      if (editando) {
        await axios.put(`http://localhost:3001/api/usuarios/${editando.id}`, payload);
      } else {
        await axios.post('http://localhost:3001/api/usuarios', payload);
      }

      setCorreo('');
      setContraseña('');
      setRol('usuario');
      setEditando(null);
      cargarUsuarios();
    } catch (error) {
      alert('Error al guardar usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
      cargarUsuarios();
    }
  };

  const editar = (usuario) => {
    setCorreo(usuario.correo);
    setRol(usuario.rol);
    setContraseña('');
    setEditando(usuario);
  };

  return (
    <div>
      <h2>👤 Gestión de Usuarios (Solo admin)</h2>

      <form onSubmit={crearOActualizar} className="mb-4">
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

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(u)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosPage;
