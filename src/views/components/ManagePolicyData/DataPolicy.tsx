"use client";

import { useEffect, useState } from "react";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import Table from "../GeneralComponents/Table";
import GrayButton from "../GeneralComponents/Button";
import ImgConfirmation from "../GeneralComponents/ImgDataConfirmation";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useNavigate } from "react-router-dom";

const PolicyProfile = ({
  policy,
  handleCurrentView,
}: {
  policy: Poliza;
  handleCurrentView: (pass: ViewName) => void;
}) => {
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const Navigate = useNavigate();
  const [documentationPaths, setDocumentationPaths] = useState<any>({});
  const [documentationImages, setDocumentationImages] = useState<any>({});

  const loadImagesFromSession = () => {
    const images: any = {};
    images["fotoFrontal"] = policy.documentacion?.fotoFrontal;
    images["fotoTrasera"] = policy.documentacion?.fotoTrasera;
    images["fotoLateral1"] = policy.documentacion?.fotoLateral1;
    images["fotoLateral2"] = policy.documentacion?.fotoLateral2;
    images["fotoTecho"] = policy.documentacion?.fotoTecho;
    images["cedulaVerde"] = policy.documentacion?.cedulaVerde;

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
            policy.lineaCotizacion?.cobertura?.id === covDetail.cobertura.id &&
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
                policy.lineaCotizacion?.cotizacion?.vehiculo?.version;
              if (!version) return "N/A";
              if (coverDetail.detalle.monto_fijo != 0) {
                return String(
                  formato.format(coverDetail.detalle.monto_fijo ?? 0)
                );
              } else if (policy.lineaCotizacion?.cotizacion?.vehiculo?.gnc) {
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

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#1e1e1eff",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="container-fluid px-3 py-2">
            {/* Fila 1: Botón Volver */}
            <div className="row mb-2">
              <div className="col-12 col-md-auto">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 w-100 w-md-auto"
                  style={{ borderRadius: "10px" }}
                  onClick={() => Navigate(`/perfil`)}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver
                </button>
              </div>
            </div>

            {/* Fila 2: Botones de acciones */}
            <div className="row">
              <div className="col-12 d-flex flex-wrap gap-2 justify-content-start justify-content-md-start">
                <GrayButton
                  text="Cancelar Poliza"
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => {}}
                />
                <GrayButton
                  text="Ver Poliza en Blockchain"
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleCurrentView("PolicyBlockchain")}
                />
                <GrayButton
                  text="Reportar Siniestro"
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleCurrentView("ReportAccident")}
                />
                <GrayButton
                  text="Historial Vehiculo"
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleCurrentView("historialPoliza")}
                />
                <GrayButton
                  text="Historial Pago"
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleCurrentView("historialPago")}
                />
                <GrayButton
                  text={
                    policy.estadoPoliza === "APROBADA"
                      ? "Pagar por primera vez"
                      : policy.estadoPoliza === "IMPAGA"
                      ? "Pagar Poliza"
                      : "No disponible"
                  }
                  style="flex-grow-1 flex-md-grow-0"
                  onClick={() => {
                    if (policy.estadoPoliza === "APROBADA") {
                      handleCurrentView("pagarPolizaPorPrimeraVez");
                    } else if (policy.estadoPoliza === "IMPAGA") {
                      handleCurrentView("pagarPoliza");
                    }
                  }}
                  disabled={
                    policy.estadoPoliza !== "APROBADA" &&
                    policy.estadoPoliza !== "IMPAGA"
                  }
                />
              </div>
            </div>
          </div>

          {/* Información de la Póliza */}
          <div
            className="card bg-dark border-info mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(13, 202, 240, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-info border-bottom">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <i className="fas fa-file-contract me-2"></i>
                Información De La Póliza
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Número de póliza:"
                    text={String(policy.numero_poliza)}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Fecha de contratación:"
                    text={policy.fechaContratacion || " -"}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Hora de contratación:"
                    text={policy.horaContratacion || " -"}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo title="Estado:" text={policy.estadoPoliza} />
                </div>
              </div>
            </div>
          </div>

          {/* Información del Cliente */}
          <div
            className="card bg-dark border-info mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(13, 202, 240, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-info border-bottom">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <i className="fas fa-user me-2"></i>
                Información del Cliente
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Nombre/s:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.nombres
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Apellido/s:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.apellido
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Sexo:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.sexo
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Fecha de Nacimiento:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.fechaNacimiento
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Tipo de Documento:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.tipoDocumento
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Documento:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.documento
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Teléfono:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.telefono
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Correo:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.correo
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Provincia:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.localidad?.provincia?.descripcion
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Localidad:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.localidad?.descripcion
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Domicilio:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                        ?.domicilio
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información del Vehículo */}
          <div
            className="card bg-dark border-info mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(13, 202, 240, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-info border-bottom">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <i className="fas fa-car me-2"></i>
                Información del Vehículo
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Matrícula:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.matricula
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Chasis:"
                    text={policy.lineaCotizacion?.cotizacion?.vehiculo?.chasis}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="N° motor:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.numeroMotor
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="GNC:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.gnc
                        ? "Sí"
                        : "No"
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Marca:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                        ?.modelo?.marca?.nombre || ""
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Modelo:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                        ?.modelo?.nombre || ""
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Versión:"
                    text={
                      policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                        .nombre
                    }
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <LabelNinfo
                    title="Año:"
                    text={String(
                      policy.lineaCotizacion?.cotizacion?.vehiculo
                        ?.añoFabricacion
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Documentación */}
          <div
            className="card bg-dark border-info mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(13, 202, 240, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-info border-bottom">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <i className="fas fa-folder-open me-2"></i>
                Documentación
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 col-sm-4 col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoFrontal")}
                    alt="Foto Frontal"
                    text="Foto Frontal"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoFrontal)}
                  </small>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoTrasera")}
                    alt="Foto Trasera"
                    text="Foto Trasera"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoTrasera)}
                  </small>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoLateral1")}
                    alt="Foto Lateral 1"
                    text="Foto Lateral 1"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoLateral1)}
                  </small>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoLateral2")}
                    alt="Foto Lateral 2"
                    text="Foto Lateral 2"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoLateral2)}
                  </small>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
                  <ImgConfirmation
                    src={getImageUrl("fotoTecho")}
                    alt="Foto Techo"
                    text="Foto Techo"
                  />
                  <small className="text-muted d-block mt-1">
                    {getFileDisplayName(documentationPaths.fotoTecho)}
                  </small>
                </div>
                <div className="col-6 col-sm-4 col-md-2">
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
            className="card bg-dark border-info mb-4"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(13, 202, 240, 0.3)",
            }}
          >
            <div className="card-header bg-transparent border-info border-bottom">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <i className="fas fa-shield-alt me-2"></i>
                Cobertura Contratada
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-start">
                <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <LabelNinfo
                        title="Nombre:"
                        text={policy.lineaCotizacion?.cobertura?.nombre}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <LabelNinfo
                        title="Precio:"
                        text={String(
                          formato.format(policy.lineaCotizacion?.monto!)
                        )}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <LabelNinfo
                        title="Tipo contratación:"
                        text={policy.tipoContratacion?.nombre || " -"}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <LabelNinfo
                        title="Periodo de pago:"
                        text={policy.periodoPago?.nombre || "-"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div
                    className="card text-center"
                    style={{
                      backgroundColor: "#2a3441",
                      border: "1px solid #00bcd4",
                    }}
                  >
                    <div
                      className="card-header fw-bold"
                      style={{
                        backgroundColor: "#00bcd4",
                        color: "#0a0f1a",
                        border: "none",
                      }}
                    >
                      FECHA DE PAGO
                    </div>
                    <div
                      className="card-body p-2"
                      style={{ backgroundColor: "#2a3441", color: "#ffffff" }}
                    >
                      <div className="row g-2">
                        <div className="col-12 col-sm-6">
                          <div className="text-center">
                            <span
                              className="fw-bold"
                              style={{ color: "#00bcd4" }}
                            >
                              {"Inicio: "}
                            </span>
                            <span>{policy.fechaContratacion || " -"}</span>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="text-center">
                            <span
                              className="fw-bold"
                              style={{ color: "#00bcd4" }}
                            >
                              {"Próximo pago: "}
                            </span>
                            <span>{policy.fechaDePago || " -"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex my-4 overflow-auto" style={{ width: "100%" }}>
            <Table
              titles={titles}
              tableBody={tableBody}
              customIcons={customIcons}
              showButtom={showButtom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyProfile;
