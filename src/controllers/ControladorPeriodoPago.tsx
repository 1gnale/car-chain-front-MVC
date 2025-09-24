import { useAuth0 } from "@auth0/auth0-react";
import usePeriodosPagoHook from "./controllerHooks/Fetchs/usePeriodoPagoHook";
import PeriodoPagoPage from "../views/pages/PeriodoPagoPage";

const ControladorPeriodoPago = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = usePeriodosPagoHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <PeriodoPagoPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorPeriodoPago;
