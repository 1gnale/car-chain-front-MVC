import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ConsultarCotizacionPage from "../views/pages/ConsultarCotizacionPage";
import useGetLinePricingByIdCotizacionHook from "./controllerHooks/Fetchs/useGetLinePricingByIdCotizacionHook";
import useCreateDocumentacionNPoliza from "./controllerHooks/Mutations/useCreateDocumentacionNPoliza";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";

const ControladorConsultarCotizacion = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, LinePricing } = useGetLinePricingByIdCotizacionHook(
    String(id)
  );
  const {
    savePoliza,
    loading: loadingPoliza,
    error: errorPoliza,
    success: successPoliza,
  } = useCreateDocumentacionNPoliza();
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (error || ErrorLine || ErrorCD) {
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
      alert("Poliza solicitada, para verificar su estado vea su perfil");
    } catch (error) {
      console.error("Error al procesar la póliza:", error);
    }
    console.log("Póliza confirmada");
  };

  if (loadingPoliza) {
    return (
      <Spinner
        title="Confirmando solicitud de poliza..."
        text="Por favor espere"
      />
    );
  }
  if (errorPoliza) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return (
    <ConsultarCotizacionPage
      lineaCotizacion={LinePricing}
      handleConfirmacionPoliza={handleConfirmacionPoliza}
      isAuth={isAuthenticated}
    />
  );
};

export default ControladorConsultarCotizacion;
