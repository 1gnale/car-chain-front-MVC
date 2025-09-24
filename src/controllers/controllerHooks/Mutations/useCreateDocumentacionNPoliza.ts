import { useState } from "react";
import useCreateDocumentacion from "./useCreateDocumentacionHook";
import useCreatePoliza from "./useCreatePolizaHook";
import { useNavigate } from "react-router-dom";

interface UseCreateDocumentacionNPolizaResult {
    savePoliza: (
        poliza: Poliza
    ) => Promise<any>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const useCreateDocumentacionNPoliza = (): UseCreateDocumentacionNPolizaResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

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
        poliza: Poliza
    ): Promise<any> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            console.log("=== INICIANDO PROCESO ===");

            // PASO 1: Crear la documentación
            console.log("PASO 1: Creando documentación...");

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

            // PASO 2: Crear la póliza (solo si se creó documentación)
            let polizaCreada = null;
            if (documentacionCreada) {
                console.log("PASO 2: Creando póliza...");

                // Tomar la primera línea de cotización como referencia
                const polizaPayload = {
                    documentacion_id: documentacionCreada.data.id,
                    lineaCotizacion_id: poliza.lineaCotizacion?.id!,
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
            navigate("/");
            return {
                documentacion: documentacionCreada,
                poliza: polizaCreada,
            };
        } catch (err: any) {
            console.error("Error en el proceso completo:", err);

            // Determinar de qué hook viene el error
            const errorSource =
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
        documentacionLoading ||
        polizaLoading;

    return {
        savePoliza,
        loading: isLoading,
        error,
        success,
    };
};

export default useCreateDocumentacionNPoliza;


