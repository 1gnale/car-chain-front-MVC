import { useState } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import ModalSiniestro from "../GeneralComponents/ModalSiniestro";
import ProfileCard from "../GeneralComponents/ProfileCard";
import { ViewList, CardChecklist } from "react-bootstrap-icons";

const statesSiniestroTooltip: Record<string, string> = {
  PENDIENTE:
    "La reporte esta en revision, pronto un tecnico determinara si se aprueba o rechaza",
  RECHAZADA: "Su siniestro se considero inadecuado y fue rechazado",
  APROBADA:
    "Su siniestro fue aprobado, pongase en contacto con nosotros para efectuar la poliza",
};
const statesRevisionTooltip: Record<string, string> = {
  PENDIENTE:
    "La poliza esta en revision, pronto un tecnico determinara si se aprueba o rechaza",
  RECHAZADA: "En la revision su poliza se considero inadecuado y fue rechazado",
  APROBADA: "En la revision se considero su poliza apropiada y fue aprobada",
};

const PolicyHistoryData = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: ViewName) => void;
}) => {
  const history: { siniestros: Siniestro[]; revisiones: Revision[] } =
    useAppSelector((state) => state.historial.historial);

  // States del modal
  const [showModal, setshowModal] = useState<boolean>(false);
  const [selectedSiniestro, setSiniestro] = useState<Siniestro>({ id: 99999 });

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1e1e1eff",
        minHeight: "100vh",
      }}
    >
      {/* Botón volver */}
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary px-4 mb-3"
          style={{ borderRadius: "10px" }}
          onClick={() => handleCurrentView("PolicyProfile")}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>
      <div
        className="card bg-dark border-info h-100"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(13, 202, 240, 0.3)",
        }}
      >
        <div className="card-body p-4">
          <div className="card-header bg-transparent border-info">
            <h3 className="card-title text-info mb-0 d-flex align-items-center">
              <ViewList className="me-2" size={20} />
              Historial de poliza
            </h3>
          </div>
          <div className="card-body">
            <h5 className="card-title text-info mb-2 d-flex align-items-center">
              <CardChecklist className="me-2" size={20} />
              Historial de siniestros
            </h5>
            {history.siniestros.map((siniestro) => (
              <ProfileCard
                title="Siniestro"
                text="Fecha de reporte"
                number={siniestro.id}
                tooltipText={
                  statesSiniestroTooltip[siniestro.estado || ""] || ""
                }
                fecha={siniestro.fechaSiniestro || "N/A"}
                secondaryText={"Tipo: Reporte de siniestro"}
                estado={siniestro.estado}
                onClick={() => {
                  setSiniestro(siniestro);
                  console.log("siniestro");
                  console.log(siniestro);
                  setshowModal(true);
                }}
              />
            ))}
          </div>
          <div className="card-body">
            <h5 className="card-title text-info mb-2 d-flex align-items-center">
              <CardChecklist className="me-2" size={20} />
              Historial de revisiones
            </h5>
            {history.revisiones.map((revision) => (
              <ProfileCard
                title="Revision"
                text="Fecha de reporte"
                number={revision.id}
                tooltipText={statesRevisionTooltip[revision.estado || ""] || ""}
                fecha={revision.fecha || "N/A"}
                secondaryText={"Tipo: Revision"}
                estado={revision.estado}
                onClick={
                  () => {}
                  //  navigate(`/administrarPoliza/${poliza.numero_poliza}`)
                }
              />
            ))}
          </div>
        </div>
      </div>{" "}
      <ModalSiniestro
        show={showModal}
        onClose={() => {
          setshowModal(false);
          console.log(selectedSiniestro);
        }}
        siniestro={selectedSiniestro}
      />
    </div>
  );
};
export default PolicyHistoryData;
