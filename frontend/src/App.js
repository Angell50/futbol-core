import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EquiposPage from './pages/EquiposPage';
import JugadoresPage from './pages/JugadoresPage';
import PartidosPage from './pages/PartidosPage';
import DesempenosPage from './pages/DesempenosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import PrediccionPage from './pages/PrediccionPage';
import PaisesPage from './pages/PaisesPage';

function AppRoutes() {
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const mostrarNavbar = location.pathname !== '/';

  const esAdmin = usuario?.rol === 'admin';

  return (
    <>
      {mostrarNavbar && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={usuario ? <InicioPage /> : <Navigate to="/" />} />
          <Route path="/reportes" element={usuario ? <ReportesPage /> : <Navigate to="/" />} />
          <Route path="/prediccion" element={usuario ? <PrediccionPage /> : <Navigate to="/" />} />
          <Route path="/paises" element={usuario ? <PaisesPage />: <Navigate to="/" />} />

          <Route path="/usuarios" element={esAdmin ? <UsuariosPage /> : <Navigate to="/home" />} />
          <Route path="/equipos" element={esAdmin ? <EquiposPage /> : <Navigate to="/home" />} />
          <Route path="/jugadores" element={esAdmin ? <JugadoresPage /> : <Navigate to="/home" />} />
          <Route path="/partidos" element={esAdmin ? <PartidosPage /> : <Navigate to="/home" />} />
          <Route path="/desempenos" element={esAdmin ? <DesempenosPage /> : <Navigate to="/home" />} />
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
