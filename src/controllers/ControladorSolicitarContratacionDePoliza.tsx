import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useBrandHook from "./controllerHooks/Fetchs/useBrandHook";
import useProvincesHook from "./controllerHooks/Fetchs/useProvincesHook";
import useCoverageAllDataHook from "./controllerHooks/Fetchs/useCoverageAllDataHook";
import useDocumentTypeHook from "./controllerHooks/Fetchs/useDocumentTypeHooks";
import useAllConfigsHook from "./controllerHooks/Fetchs/useAllConfigsHook";

const ControladorSolicitarContratacionDePoliza = () => {
  // Hook que trae todas las marcas
  const { loading, error } = useBrandHook();
  // Hook que trae todos los tipos de documentos
  const { loading: docLoading, error: docError } = useDocumentTypeHook();
  const { loading: provincesLoading, error: provError } = useProvincesHook();
  const { loading: configLoading, error: configError } = useAllConfigsHook();

  const { loading: coveragesDataLoading, error: coveragesError } =
    useCoverageAllDataHook();

  if (
    loading ||
    docLoading ||
    provincesLoading ||
    coveragesDataLoading ||
    configLoading
  ) {
    return <div>Loading...</div>;
  }

  if (error || docError || provError || coveragesError || configError) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return <RequestUserPolicy isAuth={false} />;
};

export default ControladorSolicitarContratacionDePoliza;
