import PageRegistrar from "../views/FuturePages/PageCaso7Registrar";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";

const ControladorRegister = () => {
  // Lógica del controlador de registro
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Hook que trae todos las provincias
  const { loading: loadingProv, error: errorProv } = useProvinciasHook();
  // Hook que trae todas las localidades
  const { loading: loadingLoc, error: errorLoc } = useLocalidadesHook();
  if (loadingTipoDoc || loadingProv || loadingLoc) {
    return <div>Loading...</div>;
  }

  return <PageRegistrar />;
};
export default ControladorRegister;