import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ConsultarCotizacionPage from "../views/pages/ConsultarCotizacionPage";
import useGetLinePricingByIdCotizacionHook from "./controllerHooks/Fetchs/useGetLinePricingByIdCotizacionHook";
import useCreateDocumentacionNPoliza from "./controllerHooks/Mutations/useCreateDocumentacionNPoliza";

const ControladorConsultarCotizacion = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, LinePricing } = useGetLinePricingByIdCotizacionHook(
    String(id)
  );
  const { savePoliza, loading: loadingPoliza, error: errorPoliza, success: successPoliza } = useCreateDocumentacionNPoliza();
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD || loadingPoliza) {
    return <div>Loading...</div>;
  }


  if (error || ErrorLine || ErrorCD || errorPoliza) {
    return <div>Error loading pricing information.</div>;
  }
  if (!LinePricing) {
    return <div>No LinePricing data found.</div>;
  }

  // Handle confirmacion poliza
  const handleConfirmacionPoliza = async (poliza: Poliza) => {
    if (!poliza) {
      console.error("No hay poliza para guardar");
      return;
    }
    try {
      const result = await savePoliza(poliza);
      console.log("Resultado de guardado de póliza completa:", result);
    } catch (error) {
      console.error("Error al procesar la póliza:", error);
    }
    console.log("Póliza confirmada");
  };

  return (
    <ConsultarCotizacionPage
      lineaCotizacion={LinePricing}
      handleConfirmacionPoliza={handleConfirmacionPoliza}
      isAuth={isAuthenticated}
    />
  );
};

export default ControladorConsultarCotizacion;
