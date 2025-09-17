import type ICotizacionRepository from "../Irepositorys/ICotizacionRepository";
import { BaseRepository } from "./BaseRepository";

interface CotizacionPayload {
  fechaCreacion?: string;
  fechaVencimiento?: string;
  vehiculo_id?: number;
  configuracionLocalidad_id?: number;
  configuracionEdad_id?: number;
  configuracionAntiguedad_id?: number;
}

export class CotizacionRepository extends BaseRepository<Cotizacion> implements ICotizacionRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async createCotizacion(cotizacion: CotizacionPayload, authToken?: string): Promise<Cotizacion> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    const url = `${this.apiUrl}/createCotizacion`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(cotizacion),
    })
      .then(async (response) => {
        if (!response.ok) {
          // Intentar obtener el error detallado del backend
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            console.error("Backend Error Details:", errorData);
          } catch (parseError) {
            console.error("Could not parse error response:", parseError);
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((data) => data.data || data);
  }
}