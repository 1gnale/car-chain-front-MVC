import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type ProfileCardProps = {
  title?: string;
  number: number;
  fecha?: string;
  tooltipText?: string;
  text?: string;
  secondaryText?: string;
  estado?: string;
  onClick?: (number: number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  number,
  title,
  fecha,
  secondaryText,
  text,
  tooltipText,
  estado,
  onClick,
}) => {
  const badgeColor =
    estado === "VIGENTE" || estado === "APROBADA"
      ? "bg-success"
      : estado === "PENDIENTE" || estado === "EN REVISION"
      ? "bg-warning"
      : estado === "CANCELADA" || estado === "IMPAGA" || estado === "RECHAZADA"
      ? "bg-danger"
      : "bg-secondary";

  const borderColor =
    estado === "VIGENTE" || estado === "APROBADA"
      ? "border-success"
      : estado === "PENDIENTE" || estado === "EN REVISION"
      ? "border-warning"
      : estado === "CANCELADA" || estado === "IMPAGA" || estado === "RECHAZADA"
      ? "border-danger"
      : "border-secondary";

  return (
    <div
      className={`card bg-transparent mb-3 ${borderColor} cursor-pointer`}
      onClick={() => onClick?.(number)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-title text-light">{title + " #" + number}</h6>
            <p className="card-text text-light">{text + ": " + fecha}</p>
            {secondaryText && (
              <p className="card-text text-light">{secondaryText}</p>
            )}
          </div>

          {/* Tooltip en el badge */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${number}`}>{tooltipText}</Tooltip>}
          >
            <span
              className={`badge ${badgeColor}`}
              style={{ cursor: "pointer" }}
            >
              {estado}
            </span>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
