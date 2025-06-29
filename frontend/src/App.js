import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EquiposPage from './pages/EquiposPage';
import JugadoresPage from './pages/JugadoresPage';
import PartidosPage from './pages/PartidosPage';
import DesempenosPage from './pages/DesempenosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function AppRoutes() {
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const mostrarNavbar = location.pathname !== '/';

  return (
    <>
      {mostrarNavbar && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<InicioPage />} />
          <Route path="/equipos" element={<EquiposPage />} />
          <Route path="/jugadores" element={<JugadoresPage />} />
          <Route path="/partidos" element={<PartidosPage />} />
          <Route path="/desempenos" element={<DesempenosPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          {usuario?.rol === 'admin' && (
            <Route path="/usuarios" element={<UsuariosPage />} />
          )}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
