import { useState } from "react";
import useCreateVehiculo from "./useCreateVehiculoHook";
import useCreateCotizacionSingle from "./useCreateCotizacionSingleHook";
import useCreateLineasCotizacion from "./useCreateLineasCotizacionHook";

interface UseCreateCotizacionCompleteResult {
  saveCotizacion: (cotizacionData: Cotizacion, lineasCotizacion: Linea_Cotizacion[]) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateCotizacionComplete = (): UseCreateCotizacionCompleteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Usar los hooks separados
  const { createVehiculo, loading: vehiculoLoading, error: vehiculoError } = useCreateVehiculo();
  const { createCotizacion, loading: cotizacionLoading, error: cotizacionError } = useCreateCotizacionSingle();
  const { createLineasCotizacion, loading: lineasLoading, error: lineasError } = useCreateLineasCotizacion();

  const saveCotizacion = async (cotizacionData: Cotizacion, lineasCotizacion: Linea_Cotizacion[]): Promise<any> => {
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
      const cotizacionCreada = await createCotizacion(cotizacionData, vehiculoId);
      const cotizacionId = cotizacionCreada.id;
      
      if (!cotizacionId) {
        throw new Error("No se pudo obtener el ID de la cotización creada");
      }

      // PASO 3: Crear las líneas de cotización
      console.log("PASO 3: Creando líneas de cotización...");
      const lineasCreadas = await createLineasCotizacion(lineasCotizacion, cotizacionId);

      console.log("=== PROCESO COMPLETO EXITOSO ===");

      setSuccess(true);
      setLoading(false);
      
      // Retornar todos los resultados
      return {
        vehiculo: vehiculoCreado,
        cotizacion: cotizacionCreada,
        lineasCotizacion: lineasCreadas
      };
    } catch (err: any) {
      console.error("Error en el proceso completo:", err);
      
      // Determinar de qué hook viene el error
      const errorSource = vehiculoError || cotizacionError || lineasError || err.message;
      setError(errorSource || "Error en el proceso de guardado");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  // El loading general es true si cualquiera de los hooks está cargando
  const isLoading = loading || vehiculoLoading || cotizacionLoading || lineasLoading;

  return {
    saveCotizacion,
    loading: isLoading,
    error,
    success,
  };
};

export default useCreateCotizacionComplete;