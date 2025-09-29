import { useAuth0 } from "@auth0/auth0-react";
import ModelosPage from "../views/pages/ModelosPage";
import useModelosHook from "./controllerHooks/Fetchs/useModelosHook";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";
const ControladorModelos = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = useModelosHook();

  // Hook que trae todas las marcas
  const { loading: loadMarca, error: errorMarca } = useMarcasHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading || loadMarca) {
    return <div>Cargando...</div>;
  }
  if (error || errorMarca) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <ModelosPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorModelos;
