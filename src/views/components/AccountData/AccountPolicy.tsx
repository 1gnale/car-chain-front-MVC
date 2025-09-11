import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useEffect, useState } from "react";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { Eye } from "react-bootstrap-icons";
import ProfileCard from "../GeneralComponents/ProfileCard.tsx";
import { Shield } from "react-bootstrap-icons";

const AccountPolicy = () => {
  const polices_user: Poliza[] = useAppSelector(
    (state) => state.polizas.poliza
  );
  console.log("poliza");
  console.log(polices_user);

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
            onClick={(num) => console.log("Card clickeada con número:", num)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountPolicy;
