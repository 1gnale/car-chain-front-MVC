import { useState } from "react";
import { VehiculoRepository } from "../../../models/repository/Repositorys/vehiculoRepository";
import type IVehiculoRepository from "../../../models/repository/Irepositorys/IVehiculoRepository";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorageItem from "../LocalStorage/getFromLocalStorageHook";

interface UseCreateVehiculoResult {
  createVehiculo: (vehiculoData?: Vehiculo) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateVehiculo = (): UseCreateVehiculoResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { user } = useAuth0();

  // Crear instancia del repository
  const vehiculoRepo: IVehiculoRepository = new VehiculoRepository(
    `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
  );

  const createVehiculo = async (vehiculoData?: Vehiculo): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Obtener datos del localStorage si no se proporcionan
      const vehicleLocalStorage = vehiculoData || useLocalStorageItem<Vehiculo>("VehicleData");
      
      if (!vehicleLocalStorage) {
        throw new Error("No se encontraron datos del vehículo para crear");
      }

      console.log("Creando vehículo:", vehicleLocalStorage);

      // Preparar payload para crear vehículo
      const vehiculoPayload = {
        mail: user?.email,
        matricula: vehicleLocalStorage.matricula,
        chasis: vehicleLocalStorage.chasis,
        añoFabricacion: vehicleLocalStorage.añoFabricacion,
        numeroMotor: vehicleLocalStorage.numeroMotor,
        gnc: vehicleLocalStorage.gnc,
        version_id: vehicleLocalStorage.version.id,
      };

      console.log("Payload del vehículo:", vehiculoPayload);

      const vehiculoCreado = await vehiculoRepo.createVehicle(vehiculoPayload);
      console.log("Vehículo creado exitosamente:", vehiculoCreado);

      setSuccess(true);
      setLoading(false);
      
      return vehiculoCreado;
    } catch (err: any) {
      console.error("Error al crear el vehículo:", err);
      setError(err.message || "Error al crear el vehículo");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    createVehiculo,
    loading,
    error,
    success,
  };
};

export default useCreateVehiculo;