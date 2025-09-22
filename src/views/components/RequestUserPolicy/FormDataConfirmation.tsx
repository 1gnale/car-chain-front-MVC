import { useEffect, useState } from "react";
import Table from "../GeneralComponents/Table.tsx";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import { useAuth0 } from "@auth0/auth0-react";

const FormDataConfirmation = ({
  handleCurrentView,
  handleConfirmacionPoliza,
}: {
  handleCurrentView: (pass: boolean) => void;
  handleConfirmacionPoliza: (poliza: Poliza) => void;
}) => {
  const [policy, setPolicy] = useState<Poliza>({});
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  const { user } = useAuth0();
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  // Estado para almacenar los paths de documentación
  const [documentationPaths, setDocumentationPaths] = useState<any>({});
  // Estado para almacenar las imágenes como URLs Base64
  const [documentationImages, setDocumentationImages] = useState<any>({});

  // Función para cargar imágenes desde localStorage
  const loadImagesFromStorage = () => {
    try {
      const storedDocumentation = localStorage.getItem("Documentation");
      if (storedDocumentation) {
        const documentationData = JSON.parse(storedDocumentation);
        //(" Datos de documentación cargados:", documentationData);

        if (documentationData.imageData) {
          setDocumentationImages(documentationData.imageData);
          //(" Imágenes cargadas para confirmación:", documentationData.imageData);
        }

        if (documentationData.filePaths) {
          setDocumentationPaths(documentationData.filePaths);
          //(" Paths cargados:", documentationData.filePaths);
        }
      } else {
        //(" No se encontraron datos de documentación en localStorage");
      }
    } catch (error) {
      console.error(" Error cargando imágenes desde localStorage:", error);
    }
  };

  useEffect(() => {
    const policyStorage = useLocalStorageItem<Poliza>("PolicyData");

    if (policyStorage != null) {
      setPolicy(policyStorage);
    }

    // Cargar las imágenes y paths desde localStorage
    loadImagesFromStorage();

    // Cleanup function para liberar las URLs de objeto (ya no necesaria con Base64)
    return () => {
      // No necesitamos cleanup con Base64, pero mantenemos la estructura
    };
  }, []);

  // Función auxiliar para mostrar información de archivos cuando solo tenemos paths
  function getFileDisplayName(filePath?: string): string {
    return filePath || "No seleccionado";
  }

  // Función para obtener la URL de la imagen
  function getImageUrl(imageKey: string): string {
    return documentationImages[imageKey] || "";
  }

  const handleTable = (): tableContent => {
    //("policy");
    //(policy);
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

              // Si tiene valor
              if (coverDetail.detalle.monto_fijo != 0) {
                return String(
                  formato.format(coverDetail.detalle.monto_fijo ?? 0)
                );
              }
              // Si tiene GNC, usamos precio_mercado_gnc
              else if (policy.lineaCotizacion?.cotizacion?.vehiculo?.gnc) {
                return String(formato.format(version.precio_mercado_gnc ?? 0));
              } else {
                return String(formato.format(Number(version.precio_mercado)));
              }
            })(),
          ],
        })),
    };
  };
  const { titles, tableBody, customIcons, showButtom } = handleTable();
  //("BODY DE LA TABLA");
  //(tableBody);
  return (
    <div className="min-vh-100" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-xl-11 col-lg-12">
            {/* Header principal */}
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h2 className="text-white mb-1">Confirmación de Datos</h2>
                  <p className="text-info-emphasis mb-0">
                    Revisa toda la información antes de continuar
                  </p>
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
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Nombre/s
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.nombres || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Apellido/s
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.apellido || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Sexo
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.sexo || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Fecha de Nacimiento
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.fechaNacimiento || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Tipo de Documento
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.tipoDocumento || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Documento
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.documento || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Teléfono
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.telefono || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Correo
                      </label>
                      <div className="text-light fw-normal">
                        {user?.email || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Provincia
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.localidad?.provincia?.descripcion ||
                          "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Localidad
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.localidad?.descripcion || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Domicilio
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.cliente
                          ?.domicilio || "No especificado"}
                      </div>
                    </div>
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
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Matrícula
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo
                          ?.matricula || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Chasis
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.chasis ||
                          "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        N° Motor
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo
                          ?.numeroMotor || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        GNC
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.gnc
                          ? "Sí"
                          : "No"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Marca
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                          ?.modelo?.marca?.nombre || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Modelo
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                          ?.modelo?.nombre || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Versión
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo?.version
                          ?.nombre || "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Año
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cotizacion?.vehiculo
                          ?.añoFabricacion || "No especificado"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentación Modernizada */}
            <div
              className="card bg-dark border-warning mb-4"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255, 193, 7, 0.3)",
              }}
            >
              <div className="card-header bg-transparent border-warning border-bottom">
                <h5 className="card-title text-warning mb-0 d-flex align-items-center">
                  <i className="fas fa-images me-2"></i>
                  Documentación del Vehículo
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  {[
                    {
                      key: "fotoFrontal",
                      title: "Foto Frontal",
                      icon: "fas fa-car",
                    },
                    {
                      key: "fotoTrasera",
                      title: "Foto Trasera",
                      icon: "fas fa-car",
                    },
                    {
                      key: "fotoLateral1",
                      title: "Foto Lateral 1",
                      icon: "fas fa-car",
                    },
                    {
                      key: "fotoLateral2",
                      title: "Foto Lateral 2",
                      icon: "fas fa-car",
                    },
                    {
                      key: "fotoTecho",
                      title: "Foto Techo",
                      icon: "fas fa-car",
                    },
                    {
                      key: "cedulaVerde",
                      title: "Cédula Verde",
                      icon: "fas fa-id-card",
                    },
                  ].map((item, index) => (
                    <div key={index} className="col-md-4 col-lg-2">
                      <div className="text-center">
                        <div className="position-relative mb-3">
                          <div
                            className="border rounded-3 overflow-hidden shadow-sm"
                            style={{
                              height: "140px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              border: "2px solid rgba(255, 193, 7, 0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {getImageUrl(item.key) ? (
                              <>
                                <img
                                  src={getImageUrl(item.key)}
                                  alt={item.title}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="position-absolute top-0 end-0 m-1">
                                  <span className="badge bg-success rounded-pill">
                                    <i
                                      className="fas fa-check"
                                      style={{ fontSize: "10px" }}
                                    ></i>
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-center">
                                <i
                                  className={`${item.icon} text-info-emphasis mb-2`}
                                  style={{ fontSize: "24px" }}
                                ></i>
                                <div className="text-info-emphasis small">
                                  No disponible
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Título y nombre del archivo */}
                          <div className="text-center">
                            <div className="text-warning fw-medium small mb-1">
                              {item.title}
                            </div>
                            <div
                              className="text-info-emphasis"
                              style={{ fontSize: "11px" }}
                            >
                              {getFileDisplayName(documentationPaths[item.key])}
                            </div>
                            {getImageUrl(item.key) && (
                              <div className="mt-1">
                                <span
                                  className="badge bg-success text-white"
                                  style={{ fontSize: "10px" }}
                                >
                                  <i className="fas fa-check me-1"></i>
                                  Cargada
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cobertura Contratada */}
            <div
              className="card bg-dark border-success mb-4"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(25, 135, 84, 0.3)",
              }}
            >
              <div className="card-header bg-transparent border-success border-bottom">
                <h5 className="card-title text-success mb-0 d-flex align-items-center">
                  <i className="fas fa-shield-alt me-2"></i>
                  Cobertura Contratada
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold">
                        Nombre de la Cobertura
                      </label>
                      <div className="text-light fw-normal">
                        {policy.lineaCotizacion?.cobertura?.nombre ||
                          "No especificado"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-info fw-bold small">
                        Precio
                      </label>
                      <div className="text-success fw-bold fs-5">
                        {policy.lineaCotizacion?.monto
                          ? formato.format(policy.lineaCotizacion.monto)
                          : "No especificado"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabla de detalles */}
                <div className="mt-4">
                  <div className="table-responsive">
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

            {/* Botones de acción */}
            <div
              className="d-flex justify-content-between align-items-center mt-5 pt-4"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                style={{ borderRadius: "10px" }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Anterior
              </button>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-light px-4"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success px-5"
                  style={{ borderRadius: "10px" }}
                  onClick={() => handleConfirmacionPoliza(policy)}
                >
                  <i className="fas fa-check me-2"></i>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDataConfirmation;
