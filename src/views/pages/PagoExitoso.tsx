import { useLocation, useNavigate } from "react-router-dom";

interface ContratoData {
  numero_poliza?: string;
  hash_transaccion?: string;
  direccion_contrato?: string;
  firma_digital?: string;
  fecha_despliegue?: string;
  fecha_vencimiento?: string;
  estado?: string;

  cobertura?: string;
  cliente?: {
    nombre?: string;
    email?: string;
    documento?: string;
  };
  vehiculo?: {
    marca?: string;
    modelo?: string;
    monto?: number;
    patente?: string;
  };
}

export default function PagoExitoso() {
  const navigate = useNavigate();
  const location = useLocation();

  // Los datos pueden venir del state de la navegación o ser hardcodeados para demo
  const contratoData: ContratoData = location.state?.contratoData || {
    numero_poliza: "",
    hash_transaccion: "",
    direccion_contrato: "",
    fecha_despliegue: "",
    fecha_vencimiento: "",
    estado: "",

    cobertura: "-",
    cliente: {
      nombre: "-",
      email: "-",
      documento: "-",
    },
    vehiculo: {
      marca: "-",
      modelo: "-",
      monto: 0,
      patente: "-",
    },
  };

  const handleViewInBlockchain = () => {
    window.open(
      `https://amoy.polygonscan.com/tx/${contratoData.hash_transaccion}`,
      "_blank"
    );
  };

  return (
    <div
      className="container-fluid min-vh-100 py-5"
      style={{ backgroundColor: "#1a2332" }}
    >
      <div className="container">
        {/* Header de éxito */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center">
            <div
              className="card shadow-lg border-0 mb-4"
              style={{ backgroundColor: "#2d3748" }}
            >
              <div className="card-body py-5">
                <div className="mb-4">
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ fontSize: "4rem", color: "#22d3ee" }}
                  ></i>
                </div>
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#22d3ee" }}
                >
                  ¡Contrato Desplegado Exitosamente!
                </h1>
                <p className="lead" style={{ color: "#a0aec0" }}>
                  Su póliza ha sido registrada en la blockchain de forma segura
                  e inmutable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información del contrato */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              {/* Datos principales del contrato */}
              <div className="col-md-6">
                <div
                  className="card shadow border-0 h-100"
                  style={{ backgroundColor: "#2d3748" }}
                >
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#22d3ee" }}
                  >
                    <h5 className="mb-0">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      Datos del Contrato
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>N° Póliza:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#22d3ee" }}
                          >
                            {contratoData.numero_poliza}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>Estado:</span>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "#22d3ee",
                              color: "#1a2332",
                            }}
                          >
                            {contratoData.estado}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>
                            Fecha Despliegue:
                          </span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.fecha_despliegue}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>
                            Fecha Vencimiento:
                          </span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.fecha_vencimiento}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ color: "#a0aec0" }}>Cobertura:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.cobertura}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Blockchain */}
              <div className="col-md-6">
                <div
                  className="card shadow border-0 h-100"
                  style={{ backgroundColor: "#2d3748" }}
                >
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#22d3ee" }}
                  >
                    <h5 className="mb-0">
                      <i className="bi bi-diagram-3 me-2"></i>
                      Información Blockchain
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="small" style={{ color: "#a0aec0" }}>
                          Hash de Transacción:
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm font-monospace"
                            value={contratoData.hash_transaccion}
                            readOnly
                            style={{
                              backgroundColor: "#1a2332",
                              color: "#e2e8f0",
                              borderColor: "#4a5568",
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                contratoData.hash_transaccion || ""
                              )
                            }
                            style={{ borderColor: "#4a5568", color: "#22d3ee" }}
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="small" style={{ color: "#a0aec0" }}>
                          Dirección del Contrato:
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm font-monospace"
                            value={contratoData.direccion_contrato}
                            readOnly
                            style={{
                              backgroundColor: "#1a2332",
                              color: "#e2e8f0",
                              borderColor: "#4a5568",
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                contratoData.direccion_contrato || ""
                              )
                            }
                            style={{ borderColor: "#4a5568", color: "#22d3ee" }}
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                        </div>
                      </div>
                      {contratoData.firma_digital && (
                        <div className="col-12">
                          <label className="small" style={{ color: "#a0aec0" }}>
                            Firma digital:
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control form-control-sm font-monospace"
                              value={contratoData.direccion_contrato}
                              readOnly
                              style={{
                                backgroundColor: "#1a2332",
                                color: "#e2e8f0",
                                borderColor: "#4a5568",
                              }}
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  contratoData.firma_digital || ""
                                )
                              }
                              style={{
                                borderColor: "#4a5568",
                                color: "#22d3ee",
                              }}
                            >
                              <i className="bi bi-clipboard"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="col-12">
                        <button
                          className="btn w-100"
                          onClick={handleViewInBlockchain}
                          style={{
                            backgroundColor: "#22d3ee",
                            color: "#1a2332",
                            fontWeight: "bold",
                          }}
                        >
                          <i className="bi bi-box-arrow-up-right me-2"></i>
                          Ver en Explorador de Blockchain
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Cliente y Vehículo */}
              <div className="col-md-6">
                <div
                  className="card shadow border-0 h-100"
                  style={{ backgroundColor: "#2d3748" }}
                >
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#22d3ee" }}
                  >
                    <h5 className="mb-0">
                      <i className="bi bi-person me-2"></i>
                      Cliente
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>Nombre:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.cliente?.nombre}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>Email:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.cliente?.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ color: "#a0aec0" }}>Documento:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.cliente?.documento}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card shadow border-0 h-100"
                  style={{ backgroundColor: "#2d3748" }}
                >
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#22d3ee", color: "#1a2332" }}
                  >
                    <h5 className="mb-0">
                      <i className="bi bi-car-front me-2"></i>
                      Vehículo Asegurado
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>Vehículo:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.vehiculo?.marca}{" "}
                            {contratoData.vehiculo?.modelo}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center border-bottom pb-2"
                          style={{ borderColor: "#4a5568 !important" }}
                        >
                          <span style={{ color: "#a0aec0" }}>
                            Monto asegurado:
                          </span>
                          <span
                            className="fw-bold"
                            style={{ color: "#22d3ee" }}
                          >
                            $
                            {contratoData.vehiculo?.monto?.toLocaleString(
                              "es-AR"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ color: "#a0aec0" }}>Patente:</span>
                          <span
                            className="fw-bold"
                            style={{ color: "#e2e8f0" }}
                          >
                            {contratoData.vehiculo?.patente}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div
              className="card shadow border-0"
              style={{ backgroundColor: "#2d3748" }}
            >
              <div className="card-body text-center py-4">
                <h5 className="mb-4" style={{ color: "#e2e8f0" }}>
                  ¿Qué desea hacer ahora?
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <button
                      className="btn btn-lg w-100"
                      onClick={() =>
                        navigate(
                          `/administrarPoliza/${contratoData.numero_poliza}`
                        )
                      }
                      style={{
                        backgroundColor: "transparent",
                        border: "2px solid #22d3ee",
                        color: "#22d3ee",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="bi bi-list-ul me-2"></i>
                      Ver Mi Póliza
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn btn-lg w-100"
                      onClick={() => navigate("/")}
                      style={{
                        backgroundColor: "transparent",
                        border: "2px solid #a0aec0",
                        color: "#a0aec0",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="bi bi-house me-2"></i>
                      Ir al Inicio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
