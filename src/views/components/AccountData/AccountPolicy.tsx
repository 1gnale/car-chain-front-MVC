import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import ProfileCard from "../GeneralComponents/ProfileCard.tsx";
import { Shield } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const AccountPolicy = () => {
  const navigate = useNavigate();
  const polices_user: Poliza[] = useAppSelector(
    (state) => state.polizas.poliza
  );
  //("poliza");
  //(polices_user);

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
            fecha={poliza.fechaContratacion!}
            estado={poliza.estadoPoliza!}
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
