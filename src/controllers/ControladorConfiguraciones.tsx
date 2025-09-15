import { useAuth0 } from "@auth0/auth0-react";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import DetallesPage from "../views/pages/DetallesPage";
import useConfigAntiguedadHook from "./controllerHooks/Fetchs/useConfigsAntiguedadHook";
import useConfigsEdadHook from "./controllerHooks/Fetchs/useConfigsEdadHook";
import useConfigsLocalidadesHook from "./controllerHooks/Fetchs/useConfigsLocalidadesHook";
import ConfiguracionesPage from "../views/pages/ConfiguracionesPage";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";

const ControladorConfiguraciones = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Hook que la configuracion antiguedad
  const { loading: loadingConfAnt, error: errorConfAnt } =
    useConfigAntiguedadHook();
  // Hook que la configuracion edad
  const { loading: loadingConfEdad, error: errorConfEdad } =
    useConfigsEdadHook();
  // Hook que la configuracion localidad
  const { loading: loadingConfigLoc, error: errorConfLocalidad } =
    useConfigsLocalidadesHook();

  // Hook que la configuracion localidad
  const { loading: loadinLocalidades, error: errorLocalidades } =
    useLocalidadesHook();

  // Hook que la configuracion localidad
  const { loading: loadingProvincias, error: errorConfProvincias } =
    useProvinciasHook();

  // Mostrar loading mientras Auth0 inicializa
  if (
    isLoading ||
    loadingConfAnt ||
    loadingConfEdad ||
    loadingConfigLoc ||
    loadinLocalidades ||
    loadingProvincias
  ) {
    return <div>Cargando...</div>;
  }
  if (
    errorConfEdad ||
    errorConfAnt ||
    errorConfLocalidad ||
    errorLocalidades ||
    errorConfProvincias
  ) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <ConfiguracionesPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorConfiguraciones;
