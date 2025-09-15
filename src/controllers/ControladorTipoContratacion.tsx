import { useAuth0 } from "@auth0/auth0-react";
import useTipoContratacionHook from "./controllerHooks/Fetchs/useTipoContratacionHook";
import TipoContratacionPage from "../views/pages/TipoContratacionPage";

const ControladorTipoContratacion = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { loading: loadingHiringType, error: errorHiringType } =
    useTipoContratacionHook();

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loadingHiringType) {
    return <div>Cargando...</div>;
  }
  if (errorHiringType) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <TipoContratacionPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorTipoContratacion;
