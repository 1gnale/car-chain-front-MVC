import { useState } from "react";
import { LineaCotizacionRepository } from "../../../models/repository/Repositorys/lineaCotizacionRepository";
import type ILineaCotizacionRepository from "../../../models/repository/Irepositorys/ILineaCotizacionRepository";
import { useAuth0 } from "@auth0/auth0-react";

interface UseCreateLineasCotizacionResult {
  createLineasCotizacion: (lineasCotizacion: Linea_Cotizacion[], cotizacionId: number) => Promise<any[]>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateLineasCotizacion = (): UseCreateLineasCotizacionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  // Crear instancia del repository
  const lineaCotizacionRepo: ILineaCotizacionRepository = new LineaCotizacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
  );

  const createLineasCotizacion = async (lineasCotizacion: Linea_Cotizacion[], cotizacionId: number): Promise<any[]> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!cotizacionId) {
        throw new Error("ID de cotización es requerido para crear las líneas");
      }

      console.log("Creando líneas de cotización para cotización ID:", cotizacionId);
      console.log("Líneas a crear:", lineasCotizacion);
      
      // Obtener token para autorización
      const token = await getAccessTokenSilently();
      
      const lineasCreadas = [];
      for (const lineaCotizacion of lineasCotizacion) {
        // Validar que tenemos los datos necesarios
        if (!lineaCotizacion.cobertura?.id) {
          console.warn("Línea de cotización sin cobertura válida, saltando:", lineaCotizacion);
          continue;
        }
        
        const lineaPayload = {
          monto: lineaCotizacion.monto || 0,
          cotizacion_id: cotizacionId,
          cobertura_id: lineaCotizacion.cobertura.id
        };
        
        console.log("Creando línea de cotización:", lineaPayload);
        const lineaCreada = await lineaCotizacionRepo.createLineaCotizacion(lineaPayload, token);
        lineasCreadas.push(lineaCreada);
        console.log("Línea de cotización creada:", lineaCreada);
      }

      console.log("Todas las líneas de cotización creadas:", lineasCreadas);

      setSuccess(true);
      setLoading(false);
      
      return lineasCreadas;
    } catch (err: any) {
      console.error("Error al crear las líneas de cotización:", err);
      setError(err.message || "Error al crear las líneas de cotización");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    createLineasCotizacion,
    loading,
    error,
    success,
  };
};

export default useCreateLineasCotizacion;