import { useState } from "react";
import { PolizaRepository } from "../../../models/repository/Repositorys/polizaRepository";
import type IPolizaRepository from "../../../models/repository/Irepositorys/IPolizaRepository";
import type { PolizaPayload } from "../../../models/repository/Irepositorys/IPolizaRepository";
import { useAuth0 } from "@auth0/auth0-react";

interface UseCreatePolizaResult {
  createPoliza: (polizaData: PolizaPayload) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreatePoliza = (): UseCreatePolizaResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  // Crear instancia del repository
  const polizaRepo: IPolizaRepository = new PolizaRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  const createPoliza = async (polizaData: PolizaPayload): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Creando póliza:", polizaData);
      
      // Obtener token para autorización
      const token = await getAccessTokenSilently();
      
      const polizaCreada = await polizaRepo.createPoliza(polizaData, token);
      console.log("Póliza creada exitosamente:", polizaCreada);

      setSuccess(true);
      setLoading(false);
      
      return polizaCreada;
    } catch (err: any) {
      console.error("Error al crear la póliza:", err);
      setError(err.message || "Error al crear la póliza");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    createPoliza,
    loading,
    error,
    success,
  };
};

export default useCreatePoliza;