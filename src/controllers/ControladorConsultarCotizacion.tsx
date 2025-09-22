import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ConsultarCotizacionPage from "../views/pages/ConsultarCotizacionPage";
import useGetLinePricingByIdCotizacionHook from "./controllerHooks/Fetchs/useGetLinePricingByIdCotizacionHook";

const ControladorConsultarCotizacion = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, LinePricing } = useGetLinePricingByIdCotizacionHook(
    String(id)
  );
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD) {
    return <div>Loading...</div>;
  }

  if (error || ErrorLine || ErrorCD) {
    return <div>Error loading pricing information.</div>;
  }
  if (!LinePricing) {
    return <div>No LinePricing data found.</div>;
  }

  // Handle confirmacion poliza
  const handleConfirmacionPoliza = async (poliza: Poliza) => {
    // Lógica para manejar la confirmación de la póliza completa
    if (!poliza) {
      console.error("No hay poliza para guardar");
      return;
    }
    try {
      // Asumiendo que poliza tiene las propiedades necesarias:
      // poliza.cotizacion: Cotizacion
      // poliza.lineasCotizacion: Linea_Cotizacion[]
      const cotizacion = poliza.lineaCotizacion?.cotizacion;
      const lineaCotizacion = poliza.lineaCotizacion;
      const lineasCotizacion: Linea_Cotizacion[] = [];
      lineasCotizacion.push(lineaCotizacion!);

      // const resultado = await savePoliza(cotizacion!, lineasCotizacion);
      console.log("Resultado de guardado de póliza completa:", "resultado");
      // Aquí puedes limpiar localStorage, mostrar mensaje, redirigir, etc.
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
