import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useBrandHook from "./controllerHooks/useBrandHook";

const ControladorSolicitarContratacionDePoliza = () => {

  const { loading, error } = useBrandHook();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return <RequestUserPolicy isAuth={false} />;
};

export default ControladorSolicitarContratacionDePoliza;
