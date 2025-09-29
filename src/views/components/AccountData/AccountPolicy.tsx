import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import ProfileCard from "../GeneralComponents/ProfileCard.tsx";
import { Shield } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const statesPolizaTooltip: Record<string, string> = {
  PENDIENTE:
    "La poliza se esta revisando, en los proximos dias se aprobara, rechazara o se asignara a revision",
  EN_REVISION:
    "Su poliza esta en revision, en breves enviaremos un tecnico para que verifique el estado",
  RECHAZADA: "Su poliza se considero inadecuada y fue rechazada",
  APROBADA:
    "Su poliza fue aprobada, realice el primer pago para ponerla en vigencia",
  VIGENTE: "Su poliza esta en funcionamietno",
  IMPAGA: "Su poliza requiere que realice el pago para estar en funcionamiento",
  VENCIDA: "Esta poliza esta vencida y ya no es valida",
  CANCELADA: "Esta fue poliza y ya no es valida",
};
const AccountPolicy = () => {
  const navigate = useNavigate();
  const polices_user: Poliza[] = useAppSelector(
    (state) => state.polizas.poliza
  );
  //("poliza");
  //(polices_user);

  console.log("polices_user");
  console.log(polices_user[0]);
  return (
    <div className="card bg-dark border-info">
      <div className="card-header bg-transparent border-info">
        <h5 className="card-title text-info mb-0 d-flex align-items-center">
          <Shield className="me-2" size={20} />
          Mis Pólizas
        </h5>
      </div>
      <div className="card-body">
        {polices_user.map((poliza) => (
          <ProfileCard
            title="Póliza"
            text="Fecha de contratacion"
            number={poliza.numero_poliza!}
            tooltipText={statesPolizaTooltip[poliza.estadoPoliza || ""] || ""}
            fecha={poliza.fechaContratacion || "N/A"}
            secondaryText={poliza.lineaCotizacion?.cobertura?.nombre || "N/A"}
            estado={poliza.estadoPoliza}
            onClick={() =>
              navigate(`/administrarPoliza/${poliza.numero_poliza}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AccountPolicy;
