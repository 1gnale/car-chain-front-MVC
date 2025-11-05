import RequestUserPolicy from "../views/pages/RequestUserPolicy";
import useMarcasHookV2 from "./controllerHooks/Fetchs/useMarcasHookV2";
import useModelosHookV2 from "./controllerHooks/Fetchs/useModelosHookV2";
import useTiposDocumentosHook from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import useVersionesHook from "./controllerHooks/Fetchs/useVersionesHook";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useCoberturasHook from "./controllerHooks/Fetchs/useCoberturasHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import useCreatePolizaCompleta from "./controllerHooks/Mutations/useCreatePolizaCompleteHook";
import ErrorPage from "../views/components/GeneralComponents/ErrorPage";
import useListSex from "./controllerHooks/Fetchs/useListSexHook";
import { useState } from "react";
import Modal from "../views/components/GeneralComponents/Modal";
import { useNavigate } from "react-router-dom";

const ControladorSolicitarContratacionDePoliza = () => {
  const {
    savePoliza,
    loading: loadingPoliza,
    error: errorPoliza,
  } = useCreatePolizaCompleta();

  const navigate = useNavigate();
  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  const { isAuthenticated, isLoading, user } = useAuth0();
  // Hook que trae todas las marcas (versión optimizada)
  const { loading, error } = useMarcasHookV2();
  // Hook que trae todas las modelos (versión optimizada)
  const { loading: loadingModelos, error: errorModelos } = useModelosHookV2();
  // Hook que trae todas las versiones
  const { loading: loadingVersiones, error: errorVersiones } =
    useVersionesHook();
  // Hook que trae todos los tipos de documentos
  const { loading: loadingTipoDoc, error: errorTipoDoc } =
    useTiposDocumentosHook();
  // Hook que trae todos los sexos
  const { loading: loadingSexos, error: errorSexos } = useListSex();
  // Hook que trae todos las provincias
  const { loading: loadingProv, error: errorProv } = useProvinciasHook();
  // Hook que trae todas las localidades
  const { loading: loadingLoc, error: errorLoc } = useLocalidadesHook();

  // Hook que trae todas las coberturas
  const { loading: loadingCober, error: errorCober } = useCoberturasHook();
  // Hook que trae todas las coberturasDetalle
  const { loading: loadingCobDet, error: errorCobDet } =
    useCoberturasDetalleHook();
  // Hook que trae todas las Detalles
  const { loading: loadingDet, error: errorDet } = useDetallesHook();

  // Handle confirmacion poliza
  const handleConfirmacionPoliza = async (poliza: Poliza) => {
    if (window.confirm("¿Estas seguro de confirmar la solicitud de poliza?")) {
      if (!poliza) {
        console.error("No hay poliza para guardar");
        return;
      }

      try {
        const cotizacion = poliza.lineaCotizacion?.cotizacion;
        const lineaCotizacion = poliza.lineaCotizacion;
        const lineasCotizacion: Linea_Cotizacion[] = [];
        lineasCotizacion.push(lineaCotizacion!);

        //const resultado = await savePoliza(cotizacion!, lineasCotizacion);

        // 2. CONFIGURACIÓN DEL FETCH
        const baseUrl = import.meta.env.BASE_URL;
        const url = `${baseUrl}/api/poliza/createCompletePoliza`;

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

  if (
    isLoading ||
    loading ||
    loadingModelos ||
    loadingVersiones ||
    loadingTipoDoc ||
    loadingProv ||
    loadingLoc ||
    loadingCober ||
    loadingCobDet ||
    loadingDet ||
    loadingSexos
  ) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (
    error ||
    errorModelos ||
    errorVersiones ||
    errorTipoDoc ||
    errorProv ||
    errorLoc ||
    errorCober ||
    errorCobDet ||
    errorDet ||
    errorPoliza ||
    errorSexos
  ) {
    return <ErrorPage />;
  }

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
      <RequestUserPolicy
        isAuth={isAuthenticated}
        userMail={user?.email || null}
        handleConfirmacionPoliza={handleConfirmacionPoliza}
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

export default ControladorSolicitarContratacionDePoliza;
