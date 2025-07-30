import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ControladorBienvenida from "./controllers/ControladorBienvenida.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";
import WelcomeTestControls from "./views/components/WelcomeTestControls.tsx";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <div>
      <Routes>
        <Route path="/bienvenida" element={
          <ProtectedRoute>
            <ControladorBienvenida />
          </ProtectedRoute>
        } />
        <Route
          path="/solicitar-cotizacion" element={<ControladorSolicitarCotizacionDePoliza />} />
        <Route path="/" element={<ControladorIndex />} />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <ControladorPerfil />
          </ProtectedRoute>
        } />
      </Routes>
      
      {/* Controles de testing solo en desarrollo y si está autenticado */}
      {import.meta.env.DEV && isAuthenticated && <WelcomeTestControls />}
    </div>
  );
}

export default App;
