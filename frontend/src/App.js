import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EquiposPage from './pages/EquiposPage';
import JugadoresPage from './pages/JugadoresPage';
import PartidosPage from './pages/PartidosPage';
import DesempenosPage from './pages/DesempenosPage';
import ReportesPage from './pages/ReportesPage';
import Navbar from './components/Navbar';
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';

function AppRoutes() {
  const location = useLocation();
  const mostrarNavbar = location.pathname !== '/'; // Oculta el Navbar solo en la ruta de login

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
