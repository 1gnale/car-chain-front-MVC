import PageRegistrar from "../views/pages/PageRegistrar";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import ErrorPage from "../views/components/GeneralComponents/ErrorPage";
import useListSex from "./controllerHooks/Fetchs/useListSexHook";

const ControladorRegister = () => {
  // Lógica del controlador de registro
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Hook que trae todos las provincias
  const { loading: loadingProv, error: errorProv } = useProvinciasHook();
  // Hook que trae todas las localidades
  const { loading: loadingLoc, error: errorLoc } = useLocalidadesHook();
  useTiposDocumentosHook();
  // Hook que trae todos los sexos
  const { loading: loadingSexos, error: errorSexos } = useListSex();

  if (loadingTipoDoc || loadingProv || loadingLoc || loadingSexos) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (errorTipoDoc || errorProv || errorLoc || errorSexos) {
    return <ErrorPage />;
  }

  return <PageRegistrar />;
};
export default ControladorRegister;
