import { useAuth0 } from "@auth0/auth0-react";
import DashboardAdmin from "../views/pages/DashboardAdmin";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";

const ContoladorDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading) {
    return <Spinner title="Cargando..." text="Por favor espere" />;
  }

  return (
    <div>
      <DashboardAdmin />
    </div>
  );
};

export default ContoladorDashboard;
