import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useEffect, useState } from "react";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { Eye } from "react-bootstrap-icons";

const AccountPolicy = () => {
  const polices_user: Poliza[] = useAppSelector(
    (state) => state.polizas.poliza
  );
  console.log("poliza");
  console.log(polices_user);

  const handleTablePolices = (): tableContent => {
    const table: tableContent = {
      showButtom: true,
      customIcons: [{ customIcons: Eye }],
      titles: ["N° Poliza", "Fecha Contratacion", "Hora Cotizacion", "Estado"],
      tableBody: polices_user.map((police, idx) => ({
        key: idx,
        rowContent: [
          String(police.numero_poliza),
          String(police.fechaContratacion),
          String(police.horaContratacion),
          String(police.estadoPoliza),
        ],
      })),
    };
    return table;
  };
  const { titles, tableBody, showButtom, customIcons } = handleTablePolices();

  return (
    <div className="col-xl-9">
      <TitleForm title="Polizas" />
      <TableButton
        titles={titles}
        tableBody={tableBody}
        showButtom={showButtom}
        customIcons={customIcons}
      />
    </div>
  );
};

export default AccountPolicy;
