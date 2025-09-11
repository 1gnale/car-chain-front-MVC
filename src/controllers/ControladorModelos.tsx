import { useAuth0 } from "@auth0/auth0-react";
import ModelosPage from "../views/pages/ModelosPage";
import useModelosHook from "./controllerHooks/Fetchs/useModelosHook";
const ControladorModelos = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = useModelosHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <ModelosPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorModelos;
