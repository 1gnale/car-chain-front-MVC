import { useAuth0 } from "@auth0/auth0-react";
import UsuariosPage from "../views/pages/UsuariosPage";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
const ControladorUsuarios = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que las  localidades
  const { loading: loadinLocalidades, error: errorLocalidades } =
    useLocalidadesHook();

  // Hook que las provincias
  const { loading: loadingProvincias, error: errorConfProvincias } =
    useProvinciasHook();

  // Hook que los tipos de docs
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loadinLocalidades || loadingProvincias || loadingTipoDoc) {
    return <div>Cargando...</div>;
  }
  if (errorLocalidades || errorConfProvincias || errorTipoDoc) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <UsuariosPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorUsuarios;
