import { useAuth0 } from "@auth0/auth0-react";
import useVersionesHook from "./controllerHooks/Fetchs/useVersionesHook";
import VersionesPage from "../views/pages/VersionesPage";

const ControladorVersiones = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = useVersionesHook();
  const { loading: loadingMarcas , error: errorMarca } = useMarcasHook();
  const { loading: loadingModels, error: errorModelo } = useModelosHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading || loadingMarcas || loadingModels) {
    return <div>Cargando...</div>;
  }
  if (error || errorMarca || errorModelo) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <VersionesPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorVersiones;
