import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Fútbol Core</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/equipos">Equipos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jugadores">Jugadores</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/partidos">Partidos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/desempenos">Desempeño</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/reportes">Reportes</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
