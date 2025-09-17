import { useState } from "react";
import { CotizacionRepository } from "../../../models/repository/Repositorys/cotizacionRepository";
import type ICotizacionRepository from "../../../models/repository/Irepositorys/ICotizacionRepository";

interface UseCreateCotizacionSingleResult {
  createCotizacion: (cotizacionData: Cotizacion, vehiculoId: number) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateCotizacionSingle = (): UseCreateCotizacionSingleResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Crear instancia del repository
  const cotizacionRepo: ICotizacionRepository = new CotizacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
  );

  const createCotizacion = async (cotizacionData: Cotizacion, vehiculoId: number): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Creando cotización para vehículo ID:", vehiculoId);
      console.log("Datos de cotización:", cotizacionData);

      // Configurar IDs de configuraciones
      let configuracionLocalidad_id = cotizacionData.ConfigLocalidad?.id;
      let configuracionEdad_id = cotizacionData.ConfigEdad?.id;
      let configuracionAntiguedad_id = cotizacionData.configuracionAntiguedad?.id;

      // Si config_localidad es un array vacío o sin ID, usar un valor por defecto basado en la localidad
      if (!configuracionLocalidad_id) {
        const vehiculoLocalidadId = cotizacionData.vehiculo?.cliente?.localidad?.id;
        configuracionLocalidad_id = vehiculoLocalidadId || 1; // Fallback a 1
        console.warn("Usando localidad del vehículo como configuración:", configuracionLocalidad_id);
      }

      // Si no tenemos IDs de configuración, usar valores por defecto
      if (!configuracionEdad_id) {
        configuracionEdad_id = 1; // Usar configuración por defecto
        console.warn("Usando configuración de edad por defecto:", configuracionEdad_id);
      }

      if (!configuracionAntiguedad_id) {
        configuracionAntiguedad_id = 1; // Usar configuración por defecto
        console.warn("Usando configuración de antigüedad por defecto:", configuracionAntiguedad_id);
      }

      const cotizacionPayload = {
        fechaCreacion: cotizacionData.fechaCreacion,
        fechaVencimiento: cotizacionData.fechaVencimiento,
        vehiculo_id: vehiculoId,
        configuracionLocalidad_id,
        configuracionEdad_id,
        configuracionAntiguedad_id,
      };

      console.log("Payload de cotización:", cotizacionPayload);

      // Validar que todos los IDs requeridos estén presentes
      if (!cotizacionPayload.vehiculo_id) {
        throw new Error("ID del vehículo es requerido");
      }
      if (!cotizacionPayload.configuracionLocalidad_id) {
        throw new Error("ID de configuración de localidad es requerido");
      }
      if (!cotizacionPayload.configuracionEdad_id) {
        throw new Error("ID de configuración de edad es requerido");
      }
      if (!cotizacionPayload.configuracionAntiguedad_id) {
        throw new Error("ID de configuración de antigüedad es requerido");
      }

      const cotizacionCreada = await cotizacionRepo.createCotizacion(cotizacionPayload);
      console.log("Cotización creada exitosamente:", cotizacionCreada);

      setSuccess(true);
      setLoading(false);
      
      return cotizacionCreada;
    } catch (err: any) {
      console.error("Error al crear la cotización:", err);
      setError(err.message || "Error al crear la cotización");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    createCotizacion,
    loading,
    error,
    success,
  };
};

export default useCreateCotizacionSingle;