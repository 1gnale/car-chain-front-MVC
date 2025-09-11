import { useEffect } from "react";
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardAdmin from "../views/pages/DashboardAdmin";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";

const ContoladorDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const {loading: loadingMarcas, error: errorMarcas} = useMarcasHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loadingMarcas)  {
    return <div>Cargando...</div>;
  }
  if (errorMarcas) {
    return <div>ERROR: Ocurrio un error inesperado</div>;

  }
  return (
    <div>
      <DashboardAdmin />
    </div>
  );
};

export default ContoladorDashboard;
