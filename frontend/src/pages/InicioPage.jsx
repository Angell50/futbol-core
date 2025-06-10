import React from 'react';
import { Link } from 'react-router-dom';

function InicioPage() {
  return (
    <div>
      <h2>👋 Bienvenido al Core de Fútbol</h2>
      <p className="lead">
        Esta plataforma te permite registrar equipos, jugadores, partidos y evaluar el desempeño de cada jugador.
        También puedes consultar reportes como el máximo goleador, el mejor jugador por equipo o por posición.
      </p>

      <div className="row mt-4">
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/equipos" className="btn btn-outline-primary w-100">⚽ Gestionar Equipos</Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/jugadores" className="btn btn-outline-success w-100">🧍 Gestionar Jugadores</Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/partidos" className="btn btn-outline-dark w-100">🏟️ Registrar Partidos</Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/desempenos" className="btn btn-outline-warning w-100">📊 Registrar Desempeño</Link>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/reportes" className="btn btn-outline-info w-100">📈 Ver Reportes</Link>
        </div>
      </div>
    </div>
  );
}

export default InicioPage;
