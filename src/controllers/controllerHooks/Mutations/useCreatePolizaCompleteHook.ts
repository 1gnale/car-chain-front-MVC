import { useState } from "react";
import useCreateVehiculo from "./useCreateVehiculoHook";
import useCreateCotizacionSingle from "./useCreateCotizacionSingleHook";
import useCreateLineasCotizacion from "./useCreateLineasCotizacionHook";
import useCreateDocumentacion from "./useCreateDocumentacionHook";
import useCreatePoliza from "./useCreatePolizaHook";
import useLocalStorageItem from "../LocalStorage/getFromLocalStorageHook";

interface UseCreatePolizaCompleteResult {
  savePoliza: (
    cotizacionData: Cotizacion,
    lineasCotizacion: Linea_Cotizacion[]
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreatePolizaComplete = (): UseCreatePolizaCompleteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Usar los hooks separados
  const {
    createVehiculo,
    loading: vehiculoLoading,
    error: vehiculoError,
  } = useCreateVehiculo();
  const {
    createCotizacion,
    loading: cotizacionLoading,
    error: cotizacionError,
  } = useCreateCotizacionSingle();
  const {
    createLineasCotizacion,
    loading: lineasLoading,
    error: lineasError,
  } = useCreateLineasCotizacion();
  const {
    createDocumentacion,
    loading: documentacionLoading,
    error: documentacionError,
  } = useCreateDocumentacion();
  const {
    createPoliza,
    loading: polizaLoading,
    error: polizaError,
  } = useCreatePoliza();

  const savePoliza = async (
    cotizacionData: Cotizacion,
    lineasCotizacion: Linea_Cotizacion[]
  ): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("=== INICIANDO PROCESO COMPLETO ===");

      // PASO 1: Crear el vehículo
      console.log("PASO 1: Creando vehículo...");
      const vehiculoCreado = await createVehiculo(cotizacionData.vehiculo);
      const vehiculoId = vehiculoCreado.id;

      if (!vehiculoId) {
        throw new Error("No se pudo obtener el ID del vehículo creado");
      }

      // PASO 2: Crear la cotización con el ID del vehículo
      console.log("PASO 2: Creando cotización...");
      const cotizacionCreada = await createCotizacion(
        cotizacionData,
        vehiculoId
      );
      const cotizacionId = cotizacionCreada.id;

      if (!cotizacionId) {
        throw new Error("No se pudo obtener el ID de la cotización creada");
      }

      // PASO 3: Crear las líneas de cotización
      console.log("PASO 3: Creando líneas de cotización...");
      const lineasCreadas = await createLineasCotizacion(
        lineasCotizacion,
        cotizacionId
      );

      // PASO 4: Crear la documentación
      console.log("PASO 4: Creando documentación...");

      // Obtener datos de documentación desde localStorage
      const storedDocumentation = localStorage.getItem("Documentation");
      const documentationData = JSON.parse(storedDocumentation || "{}");
      const documentationDataImage = documentationData.imageData || [];
      let documentacionCreada = null;
      if (documentationDataImage && documentationDataImage.fotoFrontal) {
        const documentacionPayload = {
          fotoFrontal: documentationDataImage.fotoFrontal,
          fotoTrasera: documentationDataImage.fotoTrasera,
          fotoLateral1: documentationDataImage.fotoLateral1,
          fotoLateral2: documentationDataImage.fotoLateral2,
          fotoTecho: documentationDataImage.fotoTecho,
          cedulaVerde: documentationDataImage.cedulaVerde,
        };

        documentacionCreada = await createDocumentacion(documentacionPayload);
        console.log("Documentación creada exitosamente:", documentacionCreada);
      } else {
        console.log(
          "No se encontraron datos de documentación en localStorage, saltando paso 4"
        );
      }

      // PASO 5: Crear la póliza (solo si se creó documentación)
      let polizaCreada = null;
      if (documentacionCreada && lineasCreadas.length > 0) {
        console.log("PASO 5: Creando póliza...");

        // Tomar la primera línea de cotización como referencia
        const primeraLinea = lineasCreadas[0];
        const polizaPayload = {
          documentacion_id: documentacionCreada.data.id,
          lineaCotizacion_id: primeraLinea.data.id,
        };

        polizaCreada = await createPoliza(polizaPayload);
        console.log("Póliza creada exitosamente:", polizaCreada);
      } else {
        console.log(
          "No se puede crear póliza - falta documentación o líneas de cotización"
        );
      }

      console.log("=== PROCESO COMPLETO EXITOSO ===");

      setSuccess(true);
      setLoading(false);

      // Retornar todos los resultados
      return {
        vehiculo: vehiculoCreado,
        cotizacion: cotizacionCreada,
        lineasCotizacion: lineasCreadas,
        documentacion: documentacionCreada,
        poliza: polizaCreada,
      };
    } catch (err: any) {
      console.error("Error en el proceso completo:", err);

      // Determinar de qué hook viene el error
      const errorSource =
        vehiculoError ||
        cotizacionError ||
        lineasError ||
        documentacionError ||
        polizaError ||
        err.message;
      setError(errorSource || "Error en el proceso de guardado");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  // El loading general es true si cualquiera de los hooks está cargando
  const isLoading =
    loading ||
    vehiculoLoading ||
    cotizacionLoading ||
    lineasLoading ||
    documentacionLoading ||
    polizaLoading;

  return {
    savePoliza,
    loading: isLoading,
    error,
    success,
  };
};

export default useCreatePolizaComplete;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // devuelve "data:image/png;base64,...."
  });
}
