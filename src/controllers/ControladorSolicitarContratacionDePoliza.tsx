import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";
import useModelosHook from "./controllerHooks/Fetchs/useModelosHook";
import useVersionesHook from "./controllerHooks/Fetchs/useVersionesHook";

const ControladorSolicitarContratacionDePoliza = () => {
  // Hook que trae todas las marcas
  const { loading, error } = useMarcasHook();
  // Hook que trae todas las modelos
  const { loading: loadingModelos, error: errorModelos } = useModelosHook();
  // Hook que trae todas las versiones
  const { loading: loadingVersiones, error: errorVersiones } =
    useVersionesHook();
  // Hook que trae todos los tipos de documentos

  if (loading || loadingModelos || loadingVersiones) {
    return <div>Loading...</div>;
  }

  if (error || errorModelos || errorVersiones) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return <RequestUserPolicy isAuth={false} />;
};

export default ControladorSolicitarContratacionDePoliza;
