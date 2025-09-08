import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasHook from "./controllerHooks/Fetchs/useCoberturasHook";
import CoberturasPage from "../views/pages/CoberturasPage";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";

const ControladorCoberturas = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las coberturas
  const { loading, error } = useCoberturasHook();
  // Hook que trae todas los detalles
  const { loading: loadingDetalle, error: errorDetalle } = useDetallesHook();

  // ESTO NO DEBERIA IR AQUI LO HAGO PARA PODER PROBAR
  const { loading: loadingCoberturaDetalle, error: errorCoberturaDetalle } =
    useCoberturasDetalleHook();

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading || loadingDetalle || loadingCoberturaDetalle) {
    return <div>Cargando...</div>;
  }
  if (error || errorDetalle || errorCoberturaDetalle) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <CoberturasPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorCoberturas;
