import { useEffect } from "react";
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";
import PageCasoEstudio02 from "../views/FuturePages/PageCasoEstudio02";
import MarcasPage from "../views/pages/MarcasPage";
import ModelosPage from "../views/pages/ModelosPage";
import useModelosHook from "./controllerHooks/Fetchs/useModelosHook";
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
    <VersionesPage isAuth={isAuthenticated}/>
    </div>
  );
};

export default ControladorVersiones;
