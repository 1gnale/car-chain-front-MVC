import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useBrandHook from "./controllerHooks/Fetchs/useBrandHook";
import useProvincesHook from "./controllerHooks/Fetchs/useProvincesHook";
import useDocumentTypeHook from "./controllerHooks/Fetchs/useDocumentTypeHooks";

const ControladorSolicitarContratacionDePoliza = () => {
  // Hook que trae todas las marcas
  const { loading, error } = useBrandHook();
  // Hook que trae todos los tipos de documentos
  const { loading: docLoading, error: docError } = useDocumentTypeHook();
  const { loading: provincesLoading, error: provError } = useProvincesHook();

  if (loading || docLoading || provincesLoading) {
    return <div>Loading...</div>;
  }

  if (error || docError || provError) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return <RequestUserPolicy isAuth={false} />;
};

export default ControladorSolicitarContratacionDePoliza;
