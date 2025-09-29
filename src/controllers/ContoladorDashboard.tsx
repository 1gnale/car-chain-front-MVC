import { useAuth0 } from "@auth0/auth0-react";
import DashboardAdmin from "../views/pages/DashboardAdmin";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import useDashboardCountsHook from "./controllerHooks/Fetchs/useDashboardCountHook";
import useDashboardStatusHook from "./controllerHooks/Fetchs/useDashboardStatus";

const ContoladorDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { loading, counts, error } = useDashboardCountsHook();

  const {
    loading: loadingStatus,
    status,
    error: errorStatus,
  } = useDashboardStatusHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading || loadingStatus) {
    return <Spinner title="Cargando..." text="Por favor espere" />;
  }
  if (error || errorStatus) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <DashboardAdmin count={counts} status={status} />
    </div>
  );
};

export default ContoladorDashboard;
