import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from '../components/Usuarios/UsuarioForm';
import UsuarioCard from '../components/Usuarios/UsuarioCard';
import { useNavigate } from 'react-router-dom';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
  const headers = {
    'x-user': usuarioActual?.correo || '',
    'x-role': usuarioActual?.rol || ''
  };

 useEffect(() => {
  const usuarioActual = JSON.parse(localStorage.getItem('usuario'));

  if (!usuarioActual || usuarioActual.rol !== 'admin') {
    navigate('/home');
  } else {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/usuarios', {
          headers: {
            'x-user': usuarioActual.correo,
            'x-role': usuarioActual.rol
          }
        });
        setUsuarios(res.data);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
      }
    };

    cargarUsuarios();
  }
}, [navigate]);


  const cargarUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/usuarios', { headers });
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  const guardarUsuario = async (usuario) => {
    try {
      if (editando) {
        await axios.put(`http://localhost:3001/api/usuarios/${editando.id}`, usuario, { headers });
      } else {
        await axios.post('http://localhost:3001/api/usuarios', usuario, { headers });
      }
      setEditando(null);
      cargarUsuarios();
    } catch {
      alert('Error al guardar');
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm('¿Seguro?')) {
      try {
        await axios.delete(`http://localhost:3001/api/usuarios/${id}`, { headers });
        cargarUsuarios();
      } catch {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div>
      <h2>👤 Gestión de Usuarios</h2>
      <UsuarioForm onSubmit={guardarUsuario} editando={editando} />
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <UsuarioCard
              key={u.id}
              usuario={u}
              onEditar={() => setEditando(u)}
              onEliminar={() => eliminarUsuario(u.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosPage;
