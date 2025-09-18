import { useState } from "react";
import { DocumentacionRepository } from "../../../models/repository/Repositorys/documentacionRepository";
import type IDocumentacionRepository from "../../../models/repository/Irepositorys/IDocumentacionRepository";
import type { DocumentacionPayload } from "../../../models/repository/Irepositorys/IDocumentacionRepository";
import { useAuth0 } from "@auth0/auth0-react";

interface UseCreateDocumentacionResult {
  createDocumentacion: (documentacionData: DocumentacionPayload) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateDocumentacion = (): UseCreateDocumentacionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  // Crear instancia del repository
  const documentacionRepo: IDocumentacionRepository = new DocumentacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  const createDocumentacion = async (documentacionData: DocumentacionPayload): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Creando documentación:", documentacionData);
      
      // Obtener token para autorización
      const token = await getAccessTokenSilently();
      
      const documentacionCreada = await documentacionRepo.createDocumentacion(documentacionData, token);
      console.log("Documentación creada exitosamente:", documentacionCreada);

      setSuccess(true);
      setLoading(false);
      
      return documentacionCreada;
    } catch (err: any) {
      console.error("Error al crear la documentación:", err);
      setError(err.message || "Error al crear la documentación");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    createDocumentacion,
    loading,
    error,
    success,
  };
};

export default useCreateDocumentacion;