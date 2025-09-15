import { useParams } from "react-router-dom";
import useGetPricing from "./controllerHooks/Fetchs/useGetPricingHook";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ConsultarCotizacionPage from "../views/pages/ConsultarCotizacionPage";

const ControladorConsultarCotizacion = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, pricing } = useGetPricing(String(id));
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD) {
    return <div>Loading...</div>;
  }

  if (error || ErrorLine || ErrorCD) {
    return <div>Error loading pricing information.</div>;
  }
  if (!pricing) {
    return <div>No pricing data found.</div>;
  }
  return (
    <ConsultarCotizacionPage
      lineaCotizacion={pricing}
      isAuth={isAuthenticated}
    />
  );
};

export default ControladorConsultarCotizacion;
