import { Routes, Route } from "react-router-dom";
import ControladorIndex from "./controllers/ControladorIndex.tsx";
import ControladorSolicitarCotizacionDePoliza from "./controllers/ControladorSolicitarContratacionDePoliza.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/solicitar-cotizacion"
          element={<ControladorSolicitarCotizacionDePoliza />}
        />
        <Route path="/" element={<ControladorIndex />} />
      </Routes>
    </div>
  );
}

export default App;
