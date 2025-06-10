import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EquiposPage from './pages/EquiposPage';
import JugadoresPage from './pages/JugadoresPage';
import PartidosPage from './pages/PartidosPage';
import DesempenosPage from './pages/DesempenosPage';
import ReportesPage from './pages/ReportesPage';
import Navbar from './components/Navbar';
import InicioPage from './pages/InicioPage';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <h1>⚽ Plataforma de Fútbol</h1>
        <Routes>
          <Route path="/equipos" element={<EquiposPage />} />
          <Route path="/jugadores" element={<JugadoresPage />} />
          <Route path="/partidos" element={<PartidosPage />} />
          <Route path="/desempenos" element={<DesempenosPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/" element={<InicioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
