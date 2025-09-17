import type IVehiculoRepository from "../Irepositorys/IVehiculoRepository";
import { BaseRepository } from "./BaseRepository";

interface VehicleCreatePayload {
  matricula?: string;
  chasis?: string;
  añoFabricacion?: number;
  numeroMotor?: string;
  gnc?: boolean;
  version_id?: number;
  cliente_id?: number;
}

export class VehiculoRepository extends BaseRepository<Vehiculo> implements IVehiculoRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async createVehicle(vehiculo: VehicleCreatePayload, authToken?: string): Promise<Vehiculo> {
    if (!this.apiUrl) {
      return Promise.reject(new Error("API URL is not defined"));
    }

    const url = `${this.apiUrl}/createVehicle`;
    
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
      body: JSON.stringify(vehiculo),
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