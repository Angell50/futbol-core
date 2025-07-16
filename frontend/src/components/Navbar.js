import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) return null; // No mostrar navbar si no hay usuario

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">🏟️ Fútbol Core</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/reportes">Reportes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/prediccion">Predicción</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/paises">Buscar País</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reportes/goleadores">Reporte Goleadores</Link></li>

            {usuario.rol === 'admin' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/equipos">Equipos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/jugadores">Jugadores</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/partidos">Partidos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/desempenos">Desempeños</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios</Link></li>

              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
