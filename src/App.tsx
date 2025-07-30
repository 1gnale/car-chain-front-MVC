import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/solicitar-cotizacion" element={<ControladorSolicitarCotizacionDePoliza />} />
        <Route path="/" element={<ControladorIndex />} />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <ControladorPerfil />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
