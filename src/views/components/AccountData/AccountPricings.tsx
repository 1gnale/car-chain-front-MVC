import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { type Icon, Eye, Pencil } from "react-bootstrap-icons";
import { redirect, useNavigate } from "react-router-dom";
import ProfileCard from "../GeneralComponents/ProfileCard";
import { Calculator } from "react-bootstrap-icons";

const AccountPricings = ({}) => {
  const navigate = useNavigate();

  const cotizaciones: Cotizacion[] = [
    {
      id: 1,
      fechaCreacion: "2025-01-15T10:30:00Z",
      activo: true,
    },
    {
      id: 2,
      fechaCreacion: "2025-01-20T14:45:00Z",
      activo: false,
    },
    {
      id: 3,
      fechaCreacion: "2025-02-05T09:15:00Z",
      activo: true,
    },
    {
      id: 4,
      fechaCreacion: "2025-02-10T18:20:00Z",
      activo: true,
    },
    {
      id: 5,
      fechaCreacion: "2025-03-01T12:00:00Z",
      activo: false,
    },
    {
      id: 6,
      fechaCreacion: "2025-03-12T16:40:00Z",
      activo: true,
    },
    {
      id: 7,
      fechaCreacion: "2025-04-03T11:25:00Z",
      activo: false,
    },
    {
      id: 8,
      fechaCreacion: "2025-04-20T08:55:00Z",
      activo: true,
    },
  ];
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
