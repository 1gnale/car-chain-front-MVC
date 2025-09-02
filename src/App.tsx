import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";
import ControladorVerCotizacion from "./controllers/ControladorVerPoliza.tsx";
import ControladorPruebaPago from "./controllers/ControladorPruebaPago.tsx";
import ControladorProcesandoPago from "./controllers/ControladorProcesandoPago.tsx";
import PagoExitoso from "./views/pages/PagoExitoso.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/solicitar-cotizacion" element={<ControladorSolicitarCotizacionDePoliza />} />
        <Route path="/" element={<ControladorIndex />} />
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
