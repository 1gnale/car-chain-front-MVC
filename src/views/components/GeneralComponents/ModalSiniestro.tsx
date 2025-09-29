import type React from "react";
import { useEffect, useState } from "react";
import ImgConfirmation from "./ImgDataConfirmation";
import { SiniestroRepository } from "../../../models/repository/Repositorys/SiniestroRepository";

interface ModalSiniestroProps {
  show: boolean;
  siniestro: Siniestro;
  onClose: () => void;
}

const ModalSiniestro: React.FC<ModalSiniestroProps> = ({
  show,
  siniestro,
  onClose,
}) => {
  const [detalle, setDetalle] = useState<Siniestro>({ id: 99999 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && siniestro?.id) {
      setLoading(true);

      const siniestroDB = new SiniestroRepository(
        `${import.meta.env.VITE_BASEURL}/api/poliza`
      );

      siniestroDB
        .getSiniestroById(String(siniestro.id))
        .then((data) => {
          setDetalle(data);
          console.log("data");

          console.log(data);
        })
        .catch(() => setDetalle({ id: 0 }))
        .finally(() => setLoading(false));
    }
  }, [show, siniestro]);

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div
          className="modal-content shadow-lg"
          style={{
            backgroundColor: "#2a2d3a",
            border: "1px solid #00bcd4",
            borderRadius: "12px",
          }}
        >
          {/* Header */}
          <div
            className="modal-header"
            style={{
              backgroundColor: "#1e2028",
              borderBottom: "1px solid #00bcd4",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <h5
              className="modal-title"
              style={{
                color: "#00bcd4",
                fontWeight: "600",
                fontSize: "1.25rem",
              }}
            >
              Información del Siniestro
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{
                filter: "invert(1)",
                opacity: "0.8",
              }}
            />
          </div>

          {/* Body */}
          <div
            className="modal-body"
            style={{
              backgroundColor: "#2a2d3a",
              color: "#ffffff",
            }}
          >
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div
                  className="spinner-border mb-3"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "#00bcd4",
                    borderWidth: "3px",
                  }}
                  role="status"
                >
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p
                  style={{
                    color: "#00bcd4",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  Cargando información...
                </p>
              </div>
            ) : (
              <>
                {/* Información */}
                <h6
                  style={{
                    color: "#00bcd4",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Información
                </h6>
                <div className="row mb-4">
                  <div className="col-md-3">
                    <small
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      N° de Siniestro
                    </small>
                    <p
                      style={{
                        color: "#ffffff",
                        fontWeight: "500",
                        margin: "0.25rem 0 0 0",
                        fontSize: "0.95rem",
                      }}
                    >
                      {detalle.id}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <small
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Fecha
                    </small>
                    <p
                      style={{
                        color: "#ffffff",
                        fontWeight: "500",
                        margin: "0.25rem 0 0 0",
                        fontSize: "0.95rem",
                      }}
                    >
                      {detalle.fechaSiniestro || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <small
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Hora
                    </small>
                    <p
                      style={{
                        color: "#ffffff",
                        fontWeight: "500",
                        margin: "0.25rem 0 0 0",
                        fontSize: "0.95rem",
                      }}
                    >
                      {detalle.horaSiniestro || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <small
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Estado
                    </small>
                    <p
                      style={{
                        color: "#ffffff",
                        fontWeight: "500",
                        margin: "0.25rem 0 0 0",
                        fontSize: "0.95rem",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          backgroundColor:
                            detalle.estado === "PENDIENTE"
                              ? "#f59e0b"
                              : detalle.estado === "APROBADA"
                              ? "#10b981"
                              : detalle.estado === "RECHAZADA"
                              ? "#ef4444"
                              : "#6b7280",
                          color: "#ffffff",
                        }}
                      >
                        {detalle.estado || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Documentación */}
                <h6
                  style={{
                    color: "#00bcd4",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Documentación
                </h6>
                <div className="d-flex gap-3 flex-wrap">
                  <ImgConfirmation
                    src={detalle.fotoDenuncia}
                    alt="Denuncia"
                    text="Denuncia"
                  />
                  <ImgConfirmation
                    src={detalle.fotoVehiculo}
                    alt="Vehiculo"
                    text="Vehiculo"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div
            className="modal-footer"
            style={{
              backgroundColor: "#1e2028",
              borderTop: "1px solid #00bcd4",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <button
              className="btn"
              onClick={onClose}
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                border: "1px solid #4b5563",
                borderRadius: "6px",
                padding: "0.5rem 1.5rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4b5563";
                e.currentTarget.style.borderColor = "#6b7280";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#374151";
                e.currentTarget.style.borderColor = "#4b5563";
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSiniestro;
