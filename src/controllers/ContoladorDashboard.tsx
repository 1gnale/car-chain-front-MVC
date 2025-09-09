import { useEffect } from "react";
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardAdmin from "../views/pages/DashboardAdmin";

const ContoladorDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <DashboardAdmin />
    </div>
  );
};

export default ContoladorDashboard;
