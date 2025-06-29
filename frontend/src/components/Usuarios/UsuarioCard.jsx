import React from 'react';

const UsuarioCard = ({ usuario, onEditar, onEliminar }) => (
  <tr>
    <td>{usuario.id}</td>
    <td>{usuario.correo}</td>
    <td>{usuario.rol}</td>
    <td>
      <button className="btn btn-warning btn-sm me-2" onClick={onEditar}>Editar</button>
      <button className="btn btn-danger btn-sm" onClick={onEliminar}>Eliminar</button>
    </td>
  </tr>
);

export default UsuarioCard;