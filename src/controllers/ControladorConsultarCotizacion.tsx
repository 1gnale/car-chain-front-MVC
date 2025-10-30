import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ConsultarCotizacionPage from "../views/pages/ConsultarCotizacionPage";
import useGetLinePricingByIdCotizacionHook from "./controllerHooks/Fetchs/useGetLinePricingByIdCotizacionHook";
import useCreateDocumentacionNPoliza from "./controllerHooks/Mutations/useCreateDocumentacionNPoliza";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import ErrorPage from "../views/components/GeneralComponents/ErrorPage";
import Modal from "../views/components/GeneralComponents/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ControladorConsultarCotizacion = () => {
  const navigate = useNavigate();
  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, LinePricing } = useGetLinePricingByIdCotizacionHook(
    String(id)
  );
  const {
    savePoliza,
    loading: loadingPoliza,
    error: errorPoliza,
    success: successPoliza,
  } = useCreateDocumentacionNPoliza();
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (error || ErrorLine || ErrorCD) {
    return <ErrorPage />;
  }
  if (!LinePricing) {
    return <ErrorPage />;
  }

  // Handle confirmacion poliza
  const handleConfirmacionPoliza = async (poliza: Poliza) => {
    if (window.confirm("¿Estas seguro de confirmar la solicitud de poliza?")) {
      if (!poliza) {
        console.error("No hay poliza para guardar");
        return;
      }

      try {
        const lineaCotizacion = poliza.lineaCotizacion;

        //const resultado = await savePoliza(cotizacion!, lineasCotizacion);

        // 2. CONFIGURACIÓN DEL FETCH
        const url = "http://localhost:3000/api/poliza/createParcialPoliza"; // <- ¡Confirma que esta sea tu ruta!

        console.log("Enviando payload:", JSON.stringify(poliza, null, 2));

        // Obtener datos de documentación desde localStorage
        const storedDocumentation = localStorage.getItem("Documentation");
        const documentationData = JSON.parse(storedDocumentation || "{}");
        const documentationDataImage = documentationData.imageData || [];
        let documentacionPayload = null;
        if (documentationDataImage && documentationDataImage.fotoFrontal) {
          documentacionPayload = {
            fotoFrontal: documentationDataImage.fotoFrontal,
            fotoTrasera: documentationDataImage.fotoTrasera,
            fotoLateral1: documentationDataImage.fotoLateral1,
            fotoLateral2: documentationDataImage.fotoLateral2,
            fotoTecho: documentationDataImage.fotoTecho,
            cedulaVerde: documentationDataImage.cedulaVerde,
          };
        }

        const body = {
          lineaCotizacion_id: lineaCotizacion?.id,
          poliza: poliza,
          documentacion: documentacionPayload,
        };
        try {
          const respuesta = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // Convertimos el objeto a un string JSON
          });

          // 3. MANEJO DE LA RESPUESTA
          const datosRespuesta = await respuesta.json();

          if (!respuesta.ok) {
            // Si la respuesta no es 2xx (ej. 400, 500)
            console.error("Error desde el backend:", datosRespuesta);
            alert(
              `Error al crear la póliza: ${
                datosRespuesta.message || datosRespuesta.error
              }`
            );
          } else {
            // ¡Éxito!

            setShowError(true);
            setTitleModalMessage("Poliza creada");
            setModalMessage(
              "Poliza solicitada con exito, para consultar su estado revise su perfil."
            );
            setMessageType("success");
            Object.keys(localStorage).forEach((key) => {
              if (!key.startsWith("@@auth0") && !key.includes("auth0")) {
                localStorage.removeItem(key);
              }
            });
          }
        } catch (error) {
          setTitleModalMessage("ERROR");
          setShowError(true);
          setModalMessage(String(error) || "Error desconocido");
          setMessageType("error");
        }
      } catch (error) {
        setTitleModalMessage("ERROR AL PROCESAR LA POLIZA");
        setShowError(true);
        setModalMessage(String(error) || "Error desconocido");
        setMessageType("error");
      }
    }
  };

  if (loadingPoliza) {
    return (
      <Spinner
        title="Confirmando solicitud de poliza..."
        text="Por favor espere"
      />
    );
  }
  if (errorPoliza) {
    return <ErrorPage />;
  }

  return (
    <div>
      <ConsultarCotizacionPage
        lineaCotizacion={LinePricing}
        handleConfirmacionPoliza={handleConfirmacionPoliza}
        isAuth={isAuthenticated}
      />
      <Modal
        show={showError}
        onClose={
          messageType == "success"
            ? () => {
                setShowError(false);
                navigate("/");
              }
            : () => {
                setShowError(false);
                navigate("/");
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
};

export default ControladorConsultarCotizacion;
