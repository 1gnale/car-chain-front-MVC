import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";
import useModelosHook from "./controllerHooks/Fetchs/useModelosHook";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useVersionesHook from "./controllerHooks/Fetchs/useVersionesHook";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useCoberturasHook from "./controllerHooks/Fetchs/useCoberturasHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import useConfigAntiguedadHook from "./controllerHooks/Fetchs/useConfigsAntiguedadHook";
import useConfigEdadHook from "./controllerHooks/Fetchs/useConfigsEdadHook";
import useConfigLocalidadHook from "./controllerHooks/Fetchs/useConfigsLocalidadesHook";
import { useAuth0 } from "@auth0/auth0-react";

const ControladorSolicitarContratacionDePoliza = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = useMarcasHook();
  // Hook que trae todas las modelos
  const { loading: loadingModelos, error: errorModelos } = useModelosHook();
  // Hook que trae todas las versiones
  const { loading: loadingVersiones, error: errorVersiones } =
    useVersionesHook();
  // Hook que trae todos los tipos de documentos
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Hook que trae todos las provincias
  const { loading: loadingProv, error: errorProv } = useProvinciasHook();
  // Hook que trae todas las localidades
  const { loading: loadingLoc, error: errorLoc } = useLocalidadesHook();

  // Hook que trae todas las coberturas
  const { loading: loadingCober, error: errorCober } = useCoberturasHook();
  // Hook que trae todas las coberturasDetalle
  const { loading: loadingCobDet, error: errorCobDet } =
    useCoberturasDetalleHook();
  // Hook que trae todas las Detalles
  const { loading: loadingDet, error: errorDet } = useDetallesHook();

  // Hook que la configuracion antiguedad
  const { loading: loadingConfAnt, error: errorConfAnt } =
    useConfigAntiguedadHook();
  // Hook que la configuracion edad
  const { loading: loadingConfEdad, error: errorConfEdad } =
    useConfigEdadHook();
  // Hook que la configuracion localidad
  const { loading: loadingConfigLoc, error: errorConfLocalidad } =
    useConfigLocalidadHook();

  if (
    isLoading ||
    loading ||
    loadingModelos ||
    loadingVersiones ||
    loadingTipoDoc ||
    loadingProv ||
    loadingLoc ||
    loadingCober ||
    loadingCobDet ||
    loadingDet ||
    loadingConfAnt ||
    loadingConfEdad ||
    loadingConfigLoc
  ) {
    return <div>Loading...</div>;
  }

  if (
    error ||
    errorModelos ||
    errorVersiones ||
    errorTipoDoc ||
    errorProv ||
    errorLoc ||
    errorCober ||
    errorCobDet ||
    errorDet ||
    errorConfAnt ||
    errorConfEdad ||
    errorConfLocalidad
  ) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return <RequestUserPolicy isAuth={isAuthenticated} />;
};

export default ControladorSolicitarContratacionDePoliza;
