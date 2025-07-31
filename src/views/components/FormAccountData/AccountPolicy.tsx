import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useEffect, useState } from "react";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks";

interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
}

interface tableBodys {
  key: number;
  rowContent: string[];
}

const AccountPolicy = () => {
  const polices_user: Poliza[] = useAppSelector(
    (state) => state.polizas.poliza
  );
  console.log("poliza");
  console.log(polices_user);

  const handleTablePolices = (): tableContent => {
    const table: tableContent = {
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
  const { titles, tableBody } = handleTablePolices();

  return (
    <div className="col-xl-9">
      <TitleForm title="Polizas" />
      <TableButton titles={titles} tableBody={tableBody} />
    </div>
  );
};

export default AccountPolicy;
