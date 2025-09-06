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

import ControladorPruebaPago from "./controllers/ControladorPruebaPago.tsx";
import ControladorProcesandoPago from "./controllers/ControladorProcesandoPago.tsx";
import PagoExitoso from "./views/pages/PagoExitoso.tsx";


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

        <Route path="/cotizacion/:id" element={
          <ProtectedRoute>
            <ControladorVerCotizacion />
          </ProtectedRoute>
        } />
        <Route path="/procesando-pago/:numero_poliza/:pagoId/:idTipoContratacion/:idPeriodoPago" element={
          <ControladorProcesandoPago />
        } />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/prueba-proceso-pago" element={
          <ControladorPruebaPago />
        } />
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
