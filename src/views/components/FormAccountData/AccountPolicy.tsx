import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";

const AccountPolicy = () => {
  const table = {
    titles: [
      "N° poliza",
      "Fecha contratacion",
      "Hora contratacion",
      "Estado",
      "Opciones",
    ],
    tableBody: [
      {
        key: 1,
        rowContent: ["1", "1/1/2020", "19:20", "Vigente", "Opciones"],
      },
      {
        key: 1,
        rowContent: ["1", "1/1/2020", "19:20", "Vigente", "Opciones"],
      },
    ],
  };
  return (
    <div className="col-xl-9">
      <TitleForm title="Polizas" />
      <TableButton titles={table.titles} tableBody={table.tableBody} />
    </div>
  );
};

export default AccountPolicy;
