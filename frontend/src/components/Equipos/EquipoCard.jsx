import React from 'react';

const EquipoCard = ({ equipo }) => (
  <li className="list-group-item d-flex align-items-center">
    {equipo.escudo && <img src={equipo.escudo} alt="Escudo" width={30} height={30} className="me-2" />}
    <strong>{equipo.nombre}</strong>
  </li>
);

export default EquipoCard;