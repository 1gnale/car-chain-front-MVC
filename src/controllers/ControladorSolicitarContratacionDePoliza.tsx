import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useBrandHook from "./controllerHooks/useBrandHook";
import useDocumentTypeHook from "./controllerHooks/useDocumentTypeHooks";

const ControladorSolicitarContratacionDePoliza = () => {
  // Hook que trae todas las marcas
  const { loading, error } = useBrandHook();
  // Hook que trae todos los tipos de documentos
  const { loading: docLoading, error: docError } = useDocumentTypeHook();

  if (loading || docLoading) {
    return <div>Loading...</div>;
  }

  if (error || docError) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return <RequestUserPolicy isAuth={false} />;
};

export default ControladorSolicitarContratacionDePoliza;
