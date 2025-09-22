import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useMarcasHookV2 from "./controllerHooks/Fetchs/useMarcasHookV2";
import useModelosHookV2 from "./controllerHooks/Fetchs/useModelosHookV2";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useVersionesHook from "./controllerHooks/Fetchs/useVersionesHook";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useCoberturasHook from "./controllerHooks/Fetchs/useCoberturasHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import useCreatePolizaCompleta from "./controllerHooks/Mutations/useCreatePolizaCompleteHook";

const ControladorSolicitarContratacionDePoliza = () => {
  const {
    savePoliza,
    loading: loadingPoliza,
    error: errorPoliza,
    success: successPoliza,
  } = useCreatePolizaCompleta();

  const { isAuthenticated, isLoading, user } = useAuth0();
  // Hook que trae todas las marcas (versión optimizada)
  const { loading, error } = useMarcasHookV2();
  // Hook que trae todas las modelos (versión optimizada)
  const { loading: loadingModelos, error: errorModelos } = useModelosHookV2();
  // Hook que trae todas las versiones
  const { loading: loadingVersiones, error: errorVersiones } =
    useVersionesHook();
  // Hook que trae todos los tipos de documentos
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Hook que trae todos las provincias
  const { loading: loadingProv, error: errorProv } = useProvinciasHook();
  // Hook que trae todas las localidades
  const { loading: loadingLoc, error: errorLoc } = useLocalidadesHook();

  // Hook que trae todas las coberturas
  const { loading: loadingCober, error: errorCober } = useCoberturasHook();
  // Hook que trae todas las coberturasDetalle
  const { loading: loadingCobDet, error: errorCobDet } =
    useCoberturasDetalleHook();
  // Hook que trae todas las Detalles
  const { loading: loadingDet, error: errorDet } = useDetallesHook();

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

      const resultado = await savePoliza(cotizacion!, lineasCotizacion);
      console.log("Resultado de guardado de póliza completa:", resultado);
      // Aquí puedes limpiar localStorage, mostrar mensaje, redirigir, etc.
    } catch (error) {
      console.error("Error al procesar la póliza:", error);
    }
    console.log("Póliza confirmada");
  };
  /* const handleSaveCotizacion = async () => {
    try {
      // Tomar la primera cotización (asumiendo que todas comparten la misma cotización base)
      const cotizacionToSave = linea_cotization[0]?.cotizacion;

      if (!cotizacionToSave) {
        console.error("No se encontró una cotización válida para guardar");
        return;
      }

      const result = await saveCotizacion(cotizacionToSave, lineasConMontos);
      console.log(
        "Vehículo, cotización y líneas guardados exitosamente:",
        result
      );

      // Limpiar localStorage después del guardado exitoso
      console.log("Limpiando localStorage...");
      clearAllData();

      // Iniciar cuenta regresiva
      setRedirectCountdown(3);

      // Cuenta regresiva e intervalos
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            navigate("/");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  };*/

  // Mostrar spinner de carga si alguno de los hooks está cargando

  if (
    isLoading ||
    loading ||
    loadingModelos ||
    loadingVersiones ||
    loadingTipoDoc ||
    loadingProv ||
    loadingLoc ||
    loadingCober ||
    loadingCobDet ||
    loadingDet ||
    loadingPoliza
  ) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (
    error ||
    errorModelos ||
    errorVersiones ||
    errorTipoDoc ||
    errorProv ||
    errorLoc ||
    errorCober ||
    errorCobDet ||
    errorDet ||
    errorPoliza
  ) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return (
    <RequestUserPolicy
      isAuth={isAuthenticated}
      userMail={user?.email || null}
      handleConfirmacionPoliza={handleConfirmacionPoliza}
    />
  );
};

export default ControladorSolicitarContratacionDePoliza;
