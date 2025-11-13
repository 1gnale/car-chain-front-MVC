import { useState } from "react";
import { useEffectOnce } from "react-use";
import Spinner from "../GeneralComponents/SpinnerLoader";
import ErrorPage from "../GeneralComponents/ErrorPage";

interface Datos {
  nombre: string;
  documento: string;
  numeroPoliza: string;
  estado: string;
  fechaVencimiento: string;
  matriculaVehiculo: string;
  hashDatos: string;
  hashTransaccion: string;
  firma: string;
}

export default function PolicyBlockchain({
  handleCurrentView,
  policyId,
}: {
  policyId: number;
  handleCurrentView: (pass: ViewName) => void;
}) {
  const [datos, setData] = useState<Datos>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getPolicyData(): Promise<Datos> {
    const baseUrl = import.meta.env.VITE_BASEURL;
    try {
      setLoading(true); // 👈 activa el estado de carga
      const response = await fetch(
        `${baseUrl}/api/pago/getPolizaBlockchainById/${policyId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Datos = await response.json();
      setData(data);
      return data;
    } catch (error) {
      setError(true);
      console.error("Error al obtener los datos:", error);
      throw error;
    } finally {
      setLoading(false); // 👈 desactiva el estado de carga
    }
  }

  useEffectOnce(() => {
    console.log("idPolicy en PolicyBlockchain:", policyId);
    getPolicyData();
  });

  const copiarAlPortapapeles = (texto: string) => {
    navigator.clipboard.writeText(texto);
    alert("Copiado al portapapeles");
  };

  const handleViewInBlockchain = () => {
    if (datos?.hashTransaccion)
      window.open(
        `https://amoy.polygonscan.com/tx/${datos.hashTransaccion}`,
        "_blank"
      );
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#1a2332", color: "#22d3ee" }}
      >
        <Spinner title="Buscando datos en blockchain..."></Spinner>
      </div>
    );
  }
  if (error) {
    return <ErrorPage></ErrorPage>;
  }
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ backgroundColor: "#1a2332" }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Card principal */}
        <div
          className="rounded-3 p-4 shadow-lg"
          style={{ backgroundColor: "#2d3748" }}
        >
          {/* Header */}
          <div
            className="text-center mb-4 pb-3"
            style={{ borderBottom: "2px solid #22d3ee" }}
          >
            <h2
              className="mb-2"
              style={{ color: "#22d3ee", fontWeight: "bold" }}
            >
              Detalle de Póliza
            </h2>
            <p className="mb-0" style={{ color: "#94a3b8" }}>
              Información del contrato blockchain
            </p>
          </div>

          {/* Datos */}
          <div className="row g-4">
            {/* Nombre */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Nombre
              </label>
              <p
                className="mb-0"
                style={{ color: "#ffffff", fontWeight: "500" }}
              >
                {datos?.nombre}
              </p>
            </div>

            {/* Documento */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Documento
              </label>
              <p
                className="mb-0"
                style={{ color: "#ffffff", fontWeight: "500" }}
              >
                {datos?.documento}
              </p>
            </div>

            {/* Número de Póliza */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Número de Póliza
              </label>
              <p
                className="mb-0"
                style={{ color: "#22d3ee", fontWeight: "500" }}
              >
                {datos?.numeroPoliza}
              </p>
            </div>

            {/* Estado */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Estado
              </label>
              <span
                className="badge px-3 py-2"
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                }}
              >
                {datos?.estado}
              </span>
            </div>

            {/* Fecha de Vencimiento */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Fecha de Vencimiento
              </label>
              <p
                className="mb-0"
                style={{ color: "#ffffff", fontWeight: "500" }}
              >
                {datos?.fechaVencimiento}
              </p>
            </div>

            {/* Matrícula del Vehículo */}
            <div className="col-md-6">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Matrícula del Vehículo
              </label>
              <p
                className="mb-0"
                style={{ color: "#ffffff", fontWeight: "500" }}
              >
                {datos?.matriculaVehiculo}
              </p>
            </div>

            {/* Hash de Transacción */}
            <div className="col-12">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Hash de Transacción
              </label>
              <div className="d-flex align-items-center gap-2">
                <code
                  className="flex-grow-1 p-2 rounded"
                  style={{
                    backgroundColor: "#1a2332",
                    color: "#22d3ee",
                    fontSize: "0.875rem",
                    wordBreak: "break-all",
                  }}
                >
                  {datos?.hashTransaccion}
                </code>
                <button
                  onClick={() =>
                    copiarAlPortapapeles(datos?.hashTransaccion || "")
                  }
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#22d3ee",
                    color: "#1a2332",
                    border: "none",
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>

            {/* Datos de la poliza hasheados */}
            <div className="col-12">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Hash Datos
              </label>
              <div className="d-flex align-items-center gap-2">
                <code
                  className="flex-grow-1 p-2 rounded"
                  style={{
                    backgroundColor: "#1a2332",
                    color: "#22d3ee",
                    fontSize: "0.875rem",
                    wordBreak: "break-all",
                  }}
                >
                  {datos?.hashDatos}
                </code>
                <button
                  onClick={() => copiarAlPortapapeles(datos?.hashDatos || "")}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#22d3ee",
                    color: "#1a2332",
                    border: "none",
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>

            {/* Dirección del Contrato */}
            <div className="col-12">
              <label
                className="d-block mb-2"
                style={{ color: "#94a3b8", fontSize: "0.875rem" }}
              >
                Dirección del Contrato
              </label>
              <div className="d-flex align-items-center gap-2">
                <code
                  className="flex-grow-1 p-2 rounded"
                  style={{
                    backgroundColor: "#1a2332",
                    color: "#22d3ee",
                    fontSize: "0.875rem",
                    wordBreak: "break-all",
                  }}
                >
                  {datos?.firma}
                </code>
                <button
                  onClick={() => copiarAlPortapapeles(datos?.firma || "")}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#22d3ee",
                    color: "#1a2332",
                    border: "none",
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn w-100 mb-3 mt-4 py-2"
              onClick={handleViewInBlockchain}
              style={{
                backgroundColor: "#22d3ee",
                color: "#1a2332",
                fontWeight: "bold",
              }}
            >
              <i className="bi bi-box-arrow-up-right me-2"></i>
              Ver Contrato en Explorador de Blockchain
            </button>
          </div>

          {/* Botón de acción */}
          <div
            className="text-center mt-4 pt-3"
            style={{ borderTop: "1px solid #475569" }}
          >
            <div>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                style={{ borderRadius: "10px" }}
                onClick={() => handleCurrentView("PolicyProfile")}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
