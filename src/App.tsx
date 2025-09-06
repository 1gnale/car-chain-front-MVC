import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";
import ControladorVerCotizacion from "./controllers/ControladorVerPoliza.tsx";
import ControladorMarcas from "./controllers/ControladorMarcas.tsx";
import ControladorModelos from "./controllers/ControladorModelos.tsx";
import ControladorVersiones from "./controllers/ControladorVersiones.tsx";
import ModificarMarca from "./views/FuturePages/PageCasoEstudio02ModificarMarca.tsx";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/solicitar-cotizacion"
          element={<ControladorSolicitarCotizacionDePoliza />}
        />
        <Route path="/" element={<ControladorIndex />} />
        <Route
          path="/cotizacion/:id"
          element={
            <ProtectedRoute>
              <ControladorVerCotizacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ControladorPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marcas"
          element={
            <ProtectedRoute>
              <ControladorMarcas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modificar-marca"
          element={
            <ProtectedRoute>
              <ModificarMarca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modelos"
          element={
            <ProtectedRoute>
              <ControladorModelos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/versiones"
          element={
            <ProtectedRoute>
              <ControladorVersiones />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
