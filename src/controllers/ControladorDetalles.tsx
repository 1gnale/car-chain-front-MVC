import { useAuth0 } from "@auth0/auth0-react";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import DetallesPage from "../views/pages/DetallesPage";

const ControladorDetalles = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las detalles
  const { loading, error } = useDetallesHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <DetallesPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorDetalles;
