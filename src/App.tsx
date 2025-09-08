import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";
import ControladorPerfil from "./controllers/ControladorPerfil.tsx";
import ProtectedRoute from "./controllers/ProtectedRoute.tsx";
import ControladorVerCotizacion from "./controllers/ControladorVerPoliza.tsx";
import ControladorMarcas from "./controllers/ControladorMarcas.tsx";
import ControladorModelos from "./controllers/ControladorModelos.tsx";
import ControladorVersiones from "./controllers/ControladorVersiones.tsx";
import ControladorPruebaPago from "./controllers/ControladorPruebaPago.tsx";
import ControladorProcesandoPrimerPago from "./controllers/ControladorProcesandoPrimerPago.tsx";
import ControladorProcesandoPago from "./controllers/ControladorProcesandoPago.tsx";
import PagoExitoso from "./views/pages/PagoExitoso.tsx";
import ControladorDetalles from "./controllers/ControladorDetalles.tsx";
import ControladorCoberturas from "./controllers/ControladorCobertura.tsx";

function App() {
  return (
    <Routes>
      {/* Inicio */}
      <Route path="/" element={<ControladorIndex />} />

      {/* Caso de uso 02: Gestionar Marcas */}
      <Route
        path="/marcas"
        element={
          <ProtectedRoute>
            <ControladorMarcas />
          </ProtectedRoute>
        }
      />
      {/* Caso de uso 03: Gestionar Modelos */}
      <Route
        path="/modelos"
        element={
          <ProtectedRoute>
            <ControladorModelos />
          </ProtectedRoute>
        }
      />
      {/* Caso de uso 04: Gestionar Versiones */}
      <Route
        path="/versiones"
        element={
          <ProtectedRoute>
            <ControladorVersiones />
          </ProtectedRoute>
        }
      />
      {/* Caso de uso 05: Gestionar Detalles */}
      <Route
        path="/detalles"
        element={
          <ProtectedRoute>
            <ControladorDetalles />
          </ProtectedRoute>
        }
      />
      {/* Caso de uso 06: Gestionar Coberturas */}
      <Route
        path="/coberturas"
        element={
          <ProtectedRoute>
            <ControladorCoberturas />
          </ProtectedRoute>
        }
      />
      {/* Caso de uso 09: Solicitar Contratación de Póliza */}

      <Route
        path="/solicitar-cotizacion"
        element={<ControladorSolicitarCotizacionDePoliza />}
      />
      <Route path="/" element={<ControladorIndex />} />

      {/* CREO Q HAY Q ELIMINARLO */}
      <Route
        path="/cotizacion/:id"
        element={
          <ProtectedRoute>
            <ControladorVerCotizacion />
          </ProtectedRoute>
        }
      />
      {/* Caso de Uso 20: Pagar Póliza */}
      <Route
        path="/procesando-primerPago/:numero_poliza/:pagoId/:idTipoContratacion/:idPeriodoPago"
        element={<ControladorProcesandoPrimerPago />}
      />

      <Route
        path="/procesando-pago/:numero_poliza/:pagoId"
        element={<ControladorProcesandoPago />}
      />

      <Route path="/pago-exitoso" element={<PagoExitoso />} />

      <Route path="/prueba-proceso-pago" element={<ControladorPruebaPago />} />

      {/* ACCESO A TODO EL PERFIL */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ControladorPerfil />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
