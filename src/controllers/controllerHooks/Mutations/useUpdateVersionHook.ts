import { useState } from "react";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository";
import type IVersionRepository from "../../../models/repository/Irepositorys/IVersionRepository";

interface UseUpdateVersionResult {
  updateVersion: (id: number, version: Partial<Version>) => Promise<Version>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Interfaz para los datos que espera el backend
interface VersionUpdatePayload {
  nombre?: string;
  descripcion?: string;
  precio_mercado?: number;
  precio_mercado_gnc?: number;
  modelo_id?: number;
  activo?: boolean;
}

const useUpdateVersion = (): UseUpdateVersionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const versionRepo: IVersionRepository = new VersionRepository(
    `${import.meta.env.VITE_BASEURL}/api/versiones/update/`
  );

  const updateVersion = async (id: number, version: Partial<Version>): Promise<Version> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validar que el modelo tenga un ID válido
    if (version.modelo && (!version.modelo.id || version.modelo.id <= 0)) {
      const errorMsg = "El modelo seleccionado no tiene un ID válido";
      console.log("❌ Validation Error:", errorMsg);
      setError(errorMsg);
      setLoading(false);
      throw new Error(errorMsg);
    }

    // Transformar los datos para el backend
    const payload: VersionUpdatePayload = {
      nombre: version.nombre,
      descripcion: version.descripcion,
      precio_mercado: version.precio_mercado,
      precio_mercado_gnc: version.precio_mercado_gnc,
      modelo_id: version.modelo?.id, // Extraer solo el ID del modelo
      activo: version.activo,
    };

    console.log("🚀 Attempting to update version:");
    console.log("Original version data:", version);
    console.log("Transformed payload:", payload);
    console.log("modelo_id value:", payload.modelo_id, "type:", typeof payload.modelo_id);

    try {
      const updatedVersion = await versionRepo.updateVersion(id, payload as Partial<Version>);
      console.log("✅ Version updated successfully:", updatedVersion);
      setSuccess(true);
      return updatedVersion;
    } catch (err) {
      console.log("❌ Error updating version:");
      console.log("Error object:", err);
      
      let errorMessage = 'Error updating version';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        console.log("Error message:", err.message);
        console.log("Error stack:", err.stack);
      } else {
        console.log("Unknown error type:", typeof err);
        console.log("Error value:", err);
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateVersion,
    loading,
    error,
    success,
  };
};

export default useUpdateVersion;