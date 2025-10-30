import { useAuth0 } from "@auth0/auth0-react";
import UsuariosPage from "../views/pages/UsuariosPage";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useUsuariosHook from "./controllerHooks/Fetchs/useUsuariosHook";
import useListSex from "./controllerHooks/Fetchs/useListSexHook";
import useTiposUsuarios from "./controllerHooks/Fetchs/useTiposUsuariosHook";
const ControladorUsuarios = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Hook que los usuarios
  const { loading: loadinUsuarios, error: errorUsuarios } = useUsuariosHook();

  // Hook que las  localidades
  const { loading: loadinLocalidades, error: errorLocalidades } =
    useLocalidadesHook();

  // Hook que las provincias
  const { loading: loadingProvincias, error: errorConfProvincias } =
    useProvinciasHook();

  // Hook que los tipos de docs
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();

  // Hook que trae todos los sexos
  const { loading: loadingSexos, error: errorSexos } = useListSex();

  // Hook que los tipos de usuarios
  const { loading: loadingTiposUsuarios, error: errorTiposUsuarios } =
    useTiposUsuarios();

  // Mostrar loading mientras Auth0 inicializa
  if (
    isLoading ||
    loadinLocalidades ||
    loadingProvincias ||
    loadingTipoDoc ||
    loadinUsuarios ||
    loadingSexos ||
    loadingTiposUsuarios
  ) {
    return <div>Cargando...</div>;
  }
  if (
    errorLocalidades ||
    errorConfProvincias ||
    errorTipoDoc ||
    errorUsuarios ||
    errorSexos ||
    errorTiposUsuarios
  ) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <UsuariosPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorUsuarios;
