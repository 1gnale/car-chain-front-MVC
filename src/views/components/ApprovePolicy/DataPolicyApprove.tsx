import { useEffect, useState } from "react";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import Table from "../GeneralComponents/Table";
import GrayButton from "../GeneralComponents/Button";
import ImgConfirmation from "../GeneralComponents/ImgDataConfirmation";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import { useNavigate } from "react-router-dom";
import usePoliceByIdHook from "../../../controllers/controllerHooks/Fetchs/usePoliceByIdHook.ts";
import Spinner from "../GeneralComponents/SpinnerLoader";
import Modal from "../GeneralComponents/Modal";
import { useAppDispatch } from "../../../redux/reduxTypedHooks.ts";
import { updatePolizaState } from "../../../redux/policeSlice.ts";
import { PolizaRepository } from "../../../models/repository/Repositorys/polizaRepository.ts";
import { RevisionRepository } from "../../../models/repository/Repositorys/RevisionRepository.ts";
const DataPolicy = ({
  numberPolicy,
  handleCurrentView,
}: {
  numberPolicy?: number;
  handleCurrentView: (pass: boolean) => void;
}) => {
  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  // Repositorio para los ENDPOINTS
  const polizasRepo = new PolizaRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );
  const revisionRepo = new RevisionRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  const { loading, error, policy } = usePoliceByIdHook(String(numberPolicy));

  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  const Navigate = useNavigate();
  const [documentationPaths, setDocumentationPaths] = useState<any>({});
  const [documentationImages, setDocumentationImages] = useState<any>({});

  const loadImagesFromSession = () => {
    const images: any = {};
    images["fotoFrontal"] = policy?.documentacion?.fotoFrontal;
    images["fotoTrasera"] = policy?.documentacion?.fotoTrasera;
    images["fotoLateral1"] = policy?.documentacion?.fotoLateral1;
    images["fotoLateral2"] = policy?.documentacion?.fotoLateral2;
    images["fotoTecho"] = policy?.documentacion?.fotoTecho;
    images["cedulaVerde"] = policy?.documentacion?.cedulaVerde;

    setDocumentationImages(images);
  };

  useEffect(() => {
    if (policy != undefined) {
      loadImagesFromSession();
    }
    return () => {
      Object.values(documentationImages).forEach((url: any) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [policy]);

  function getFileDisplayName(filePath?: string): string {
    return filePath || "No seleccionado";
  }

  function getImageUrl(imageKey: string): string {
    return documentationImages[imageKey] || "";
  }

  const handleTable = (): tableContent => {
    return {
      showButtom: false,
      titles: ["ID", "Detalle", "Descripcion", "Monto asegurado"],
      tableBody: coverage_details
        .filter(
          (covDetail) =>
            policy?.lineaCotizacion?.cobertura?.id === covDetail.cobertura.id &&
            covDetail.detalle.activo &&
            covDetail.aplica
        )
        .map((coverDetail, idx) => ({
          key: idx,
          value: idx,
          rowContent: [
            String(coverDetail.detalle.id),
            String(coverDetail.detalle.nombre),
            String(coverDetail.detalle.descripcion),
            (() => {
              const version =
                policy?.lineaCotizacion?.cotizacion?.vehiculo?.version;
              if (!version) return "N/A";
              if (coverDetail.detalle.monto_fijo != 0) {
                return String(
                  formato.format(coverDetail.detalle.monto_fijo ?? 0)
                );
              } else if (policy?.lineaCotizacion?.cotizacion?.vehiculo?.gnc) {
                return String(formato.format(version?.precio_mercado_gnc || 0));
              } else {
                return String(formato.format(version?.precio_mercado || 0));
              }
            })(),
          ],
        })),
    };
  };
  const { titles, tableBody, customIcons, showButtom } = handleTable();

  // BOTONES APROBAR RECHAZAR ENVIAR A REVISAR
  async function handleApprovePolicy() {
    if (window.confirm("¿Estás seguro de que querés aprobar la poliza?")) {
      if (
        policy?.estadoPoliza != "PENDIENTE" &&
        policy?.estadoPoliza != "EN_REVISIÓN"
      ) {
        setShowError(true);
        setModalMessage("Error en la petición, la poliza no es modificable");
        setMessageType("error");
        setTitleModalMessage("ERROR");
        return;
      }
      try {
        const response = await polizasRepo.updateStatePoliza(
          numberPolicy!,
          "APROBADA"
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updatePolizaState({ id: numberPolicy!, estado: "APROBADA" }));
        setShowError(true);
        setModalMessage("Estado de la Poliza " + numberPolicy + " actualizado");
        setMessageType("info");
        setTitleModalMessage("POLIZA APROBADA");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  async function handleReviewPolicy() {
    if (
      window.confirm("¿Estás seguro de que querés enviar a revisar la poliza?")
    ) {
      if (
        policy?.estadoPoliza != "PENDIENTE" &&
        policy?.estadoPoliza != "EN_REVISIÓN"
      ) {
        setShowError(true);
        setModalMessage("Error en la petición, la poliza no es modificable");
        setMessageType("error");
        setTitleModalMessage("ERROR");
        return;
      }
      try {
        const revision: Revision = {
          id: 0,
          poliza: policy,
        };
        const response = await revisionRepo.createReview(revision);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(
          updatePolizaState({ id: numberPolicy!, estado: "EN_REVISION" })
        );
        setShowError(true);
        setModalMessage("Estado de la Poliza " + numberPolicy + " actualizado");
        setMessageType("info");
        setTitleModalMessage("POLIZA ENVIADA A REVISION");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  async function handleDeclinePolicy() {
    if (window.confirm("¿Estás seguro de que querés rechazar la poliza?")) {
      if (
        policy?.estadoPoliza != "PENDIENTE" &&
        policy?.estadoPoliza != "EN_REVISIÓN"
      ) {
        setShowError(true);
        setModalMessage("Error en la petición, la poliza no es modificable");
        setMessageType("error");
        setTitleModalMessage("ERROR");
        return;
      }
      try {
        const response = await polizasRepo.updateStatePoliza(
          numberPolicy!,
          "RECHAZADA"
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updatePolizaState({ id: numberPolicy!, estado: "RECHAZADA" }));
        setShowError(true);
        setModalMessage("Estado de la Poliza " + numberPolicy + " actualizado");
        setMessageType("info");
        setTitleModalMessage("POLIZA RECHAZADA");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }
  // FUNCIONES OPCIONALES
  function getFechaHoy(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }

  function getHoraActual(): string {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  }

  return loading ? (
    <Spinner title="Cargando poliza..." text="Por favor espere" />
  ) : error ? (
    <div>Error inesperado </div>
  ) : (
    <div
      className="container-fluid gap-2"
      style={{
        backgroundColor: "#f8f9faff",
        minHeight: "100vh",
        color: "#000000",
        padding: "20px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Información de la Póliza */}
          <div
            className="card bg-light border-dark mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-dark border-bottom">
              <h5 className="card-title text-dark mb-0 d-flex align-items-center">
                <i className="fas fa-file-contract me-2"></i>
                Información De La Póliza
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Número de póliza:"
                    text={String(policy?.numero_poliza)}
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Fecha de contratación:"
                    text={policy?.fechaContratacion || " -"}
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Hora de contratación:"
                    text={policy?.horaContratacion || " -"}
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Estado:"
                    text={policy?.estadoPoliza}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información del Cliente */}
          <div
            className="card bg-light border-dark mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-dark border-bottom">
              <h5 className="card-title text-dark mb-0 d-flex align-items-center">
                <i className="fas fa-user me-2"></i>
                Información del Cliente
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Nombre/s:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.nombres
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Apellido/s:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.apellido
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Sexo:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.sexo
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Fecha de Nacimiento:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.fechaNacimiento
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Tipo de Documento:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.tipoDocumento
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Documento:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.documento
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Teléfono:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.telefono
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Correo:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.correo
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Provincia:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.localidad?.provincia?.descripcion
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Localidad:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.localidad?.descripcion
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Domicilio:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.domicilio
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información del Vehículo */}
          <div
            className="card bg-light border-dark mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-dark border-bottom">
              <h5 className="card-title text-dark mb-0 d-flex align-items-center">
                <i className="fas fa-car me-2"></i>
                Información del Vehículo
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Matrícula:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.matricula
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Chasis:"
                    text={policy?.lineaCotizacion?.cotizacion?.vehiculo?.chasis}
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="N° motor:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.numeroMotor
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="GNC:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.gnc
                        ? "Sí"
                        : "No"
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Marca:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.version
                        ?.modelo?.marca?.nombre || ""
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Modelo:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.version
                        ?.modelo?.nombre || ""
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Versión:"
                    text={
                      policy?.lineaCotizacion?.cotizacion?.vehiculo?.version
                        .nombre
                    }
                  />
                </div>
                <div className="col-md-3">
                  <LabelNinfo
                    dark={true}
                    title="Año:"
                    text={String(
                      policy?.lineaCotizacion?.cotizacion?.vehiculo
                        ?.añoFabricacion
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Documentación */}
          <div
            className="card bg-light border-dark mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-dark border-bottom">
              <h5 className="card-title text-dark mb-0 d-flex align-items-center">
                <i className="fas fa-folder-open me-2"></i>
                Documentación
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoFrontal")}
                    alt="Foto Frontal"
                    text="Foto Frontal"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoFrontal)}
                  </small>
                </div>
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoTrasera")}
                    alt="Foto Trasera"
                    text="Foto Trasera"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoTrasera)}
                  </small>
                </div>
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoLateral1")}
                    alt="Foto Lateral 1"
                    text="Foto Lateral 1"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoLateral1)}
                  </small>
                </div>
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoLateral2")}
                    alt="Foto Lateral 2"
                    text="Foto Lateral 2"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoLateral2)}
                  </small>
                </div>
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoTecho")}
                    alt="Foto Techo"
                    text="Foto Techo"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoTecho)}
                  </small>
                </div>
                <div className="col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("cedulaVerde")}
                    alt="Cédula Verde"
                    text="Cédula Verde"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.cedulaVerde)}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Cobertura Contratada */}
          <div
            className="card bg-light border-dark mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-dark border-bottom">
              <h5 className="card-title text-dark mb-0 d-flex align-items-center">
                <i className="fas fa-shield-alt me-2"></i>
                Cobertura Contratada
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-start">
                <div className="col-md-6">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <LabelNinfo
                        dark={true}
                        title="Nombre:"
                        text={policy?.lineaCotizacion?.cobertura?.nombre}
                      />
                    </div>
                    <div className="col-md-6">
                      <LabelNinfo
                        dark={true}
                        title="Precio:"
                        text={String(
                          formato.format(policy?.lineaCotizacion?.monto!)
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de detalles */}
          <div className="d-flex my-4" style={{ width: "-20px" }}>
            <Table
              titles={titles}
              tableBody={tableBody}
              customIcons={customIcons}
              showButtom={showButtom}
            />
          </div>
          {/* Botones inferiores */}
          <div className="d-flex justify-content-between align-items-center">
            {/* Botón volver */}
            <div>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                style={{ borderRadius: "10px" }}
                onClick={() => handleCurrentView(false)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Volver
              </button>
            </div>

            {/* Botones a la derecha */}
            <div className="d-flex">
              <GrayButton
                text="APROBAR POLIZA"
                style="me-md-2"
                onClick={handleApprovePolicy}
              />
              <GrayButton
                text="RECHAZAR POLIZA"
                style="me-md-2"
                onClick={handleDeclinePolicy}
              />
              {policy?.estadoPoliza !== "EN_REVISIÓN" ? (
                <GrayButton
                  text="ENVIAR A REVISION"
                  style="me-md-2"
                  onClick={handleReviewPolicy}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showError}
        onClose={
          messageType == "info"
            ? () => {
                setShowError(false);
                handleCurrentView(false);
              }
            : () => {
                setShowError(false);
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
};

export default DataPolicy;
