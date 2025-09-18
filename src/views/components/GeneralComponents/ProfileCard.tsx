import React from "react";

type ProfileCardProps = {
  title?: string;
  number: number;
  fecha?: string;
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
  estado,
  text,
  onClick,
}) => {
  const badgeColor =
    estado === "VIGENTE"
      ? "bg-success"
      : estado === "PENDIENTE" ||
        estado === "EN REVISION" ||
        estado === "APROBADA"
      ? "bg-warning"
      : estado === "CANCELADA" ||
        estado === "IMPAGA" ||
        estado === "RECHAZADA" ||
        "CANCELADA"
      ? "bg-danger"
      : "bg-secondary";

  const borderColor =
    estado === "VIGENTE"
      ? "border-success"
      : estado === "PENDIENTE" ||
        estado === "EN REVISION" ||
        estado === "APROBADA"
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
          <span className={`badge ${badgeColor}`}>{estado}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
