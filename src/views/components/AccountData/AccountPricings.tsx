import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { type Icon, Eye, Pencil } from "react-bootstrap-icons";
import { redirect, useNavigate } from "react-router-dom";
import ProfileCard from "../GeneralComponents/ProfileCard";
import { Calculator } from "react-bootstrap-icons";

const AccountPricings = ({}) => {
  const navigate = useNavigate();

  const cotizaciones: Linea_Cotizacion[] = useAppSelector(
    (state) => state.lineasCotizacion.lineaCotizacion
  );

  return (
    <div className="card bg-dark border-info">
      <div className="card-header bg-transparent border-info">
        <h5 className="card-title text-info mb-0 d-flex align-items-center">
          <Calculator className="me-2" size={20} />
          Mis Cotizaciones
        </h5>
      </div>
      <div className="card-body">
        {cotizaciones.map((cotizacion) => (
          <ProfileCard
            title="Cotizacion"
            number={cotizacion.id!}
            fecha={cotizacion.fechaCreacion!}
            text="Fecha de creacion"
            estado={cotizacion.activo ? "Vigente" : "Cancelada"}
            onClick={() => navigate(`/cotizacion/${cotizacion.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountPricings;
