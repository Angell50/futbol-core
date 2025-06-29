import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">🏟️ Fútbol Core</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/equipos">Equipos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/jugadores">Jugadores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/partidos">Partidos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/desempenos">Desempeños</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reportes">Reportes</Link></li>

            {usuario?.rol === 'admin' && (
              <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
