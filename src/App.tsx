import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza";
import ControladorPerfil from "./controllers/ControladorPerfil";
import ProtectedRoute from "./controllers/ProtectedRoute";
import ControladorVerCotizacion from "./controllers/ControladorConsultarCotizacion";
import ControladorMarcas from "./controllers/ControladorMarcas";
import ControladorModelos from "./controllers/ControladorModelos";
import ControladorVersiones from "./controllers/ControladorVersiones";
import ControladorPruebaPago from "./controllers/ControladorPruebaPago";
import ControladorProcesandoPrimerPago from "./controllers/ControladorProcesandoPrimerPago";
import ControladorProcesandoPago from "./controllers/ControladorProcesandoPago";
import PagoExitoso from "./views/pages/PagoExitoso";
import ControladorDetalles from "./controllers/ControladorDetalles";
import ControladorCoberturas from "./controllers/ControladorCobertura";
import ContoladorDashboard from "./controllers/ContoladorDashboard";
import ControladorRegister from "./controllers/ControladorRegister";
import ControladorAdministrarPoliza from "./controllers/ControladorAdministrarPoliza";
import ContoladorAprobarPoliza from "./controllers/ContoladorAprobarPoliza";
import QuienesSomos from "./views/pages/quienesSomosPage";
import ContactanosPage from "./views/pages/contactanosPage";
import AyudaPage from "./views/pages/ayudaPage";
import ContoladorAprobarRevision from "./controllers/ControladorAprobarRevision";
import RedirectByRole from "./controllers/RedirectedByRole";
import ContoladorValidarSiniestro from "./controllers/ControladorValidarSiniestro";


function App() {
  return (
    <Routes>
      {/* Inicio */}
      <Route
        path="/"
        element={
          <RedirectByRole>
            <ControladorIndex />
          </RedirectByRole>
        }
      />

      {/* Centro de mando de admin. */}
      <Route
        path="/administrador"
        element={
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <ContoladorDashboard />
          </ProtectedRoute>
        }
      />

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
      {/* Caso de uso 07: Registrar Cliente */}
      <Route path="/registrar" element={<ControladorRegister />} />

      {/* Caso de uso 09: Solicitar Contratación de Póliza */}
      <Route
        path="/solicitar-cotizacion"
        element={<ControladorSolicitarCotizacionDePoliza />}
      />
      <Route path="/" element={<ControladorIndex />} />

      {/* Caso de uso 10: Consultar Cotizacion */}
      <Route
        path="/cotizacion/:id"
        element={
          <ProtectedRoute>
            <ControladorVerCotizacion />
          </ProtectedRoute>
        }
      />

      {/* Caso de uso 11: Aprobar poliza */}
      <Route
        path="/vendedor"
        element={
          <ProtectedRoute allowedRoles={["VENDEDOR"]}>
            <ContoladorAprobarPoliza />
          </ProtectedRoute>
        }
      />

      {/* Caso de uso 12: Aprobar revision */}
      <Route
        path="/perito"
        element={
          <ProtectedRoute allowedRoles={["PERITO"]}>
            <ContoladorAprobarRevision />
          </ProtectedRoute>
        }
      />

      {/* Caso de uso 18: Administrar Poliza */}
      <Route
        path="/administrarPoliza/:id"
        element={
          <ProtectedRoute>
            <ControladorAdministrarPoliza />
          </ProtectedRoute>
        }
      />

      {/* Caso de uso 19: Validar reporte siniestro */}
      <Route
        path="/gestor_de_siniestros"
        element={
          <ProtectedRoute allowedRoles={["GESTOR_DE_SINIESTROS"]}>
            <ContoladorValidarSiniestro />
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

      <Route path="/pago-fallido/:pagoId" element={<ControladorFalloPago />} />

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

      {/* Ver una poliza en particular */}
      <Route
        path="/administrarPoliza/:idPoliza"
        element={
          <ProtectedRoute>
            <ControladorAdministrarPoliza />
          </ProtectedRoute>
        }
      />

      {/* Links del Navbar */}
      <Route path="/quienesSomos" element={<QuienesSomos />} />
      <Route path="/contactanos" element={<ContactanosPage />} />
      <Route path="/ayuda" element={<AyudaPage />} />
    </Routes>
  );
}

export default App;
