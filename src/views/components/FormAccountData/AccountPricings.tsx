import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useAppSelector } from "../../../redux/reduxTypedHooks";

interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
}

interface tableBodys {
  key: number;
  rowContent: string[];
}

const AccountPricings = () => {
  const linePricings: Linea_Cotizacion[] = useAppSelector(
    (state) => state.lineasCotizacion.lineaCotizacion
  );
  console.log("linePricings");
  console.log(linePricings);

  const handleTablePricings = (): tableContent => {
    const table: tableContent = {
      titles: [
        "Matricula",
        "Fecha de creación",
        "Marca",
        "Modelo",
        "Version",
        "Fecha de Vencimiento",
      ],
      tableBody: linePricings.map((line, idx) => ({
        key: idx,
        rowContent: [
          String(line.cotizacion?.vehiculo?.matricula),
          String(line.cotizacion?.fechaCreacion),
          String(line.cotizacion?.vehiculo?.version.modelo.marca.nombre),
          String(line.cotizacion?.vehiculo?.version.modelo.nombre),
          String(line.cotizacion?.vehiculo?.version.nombre),
          String(line.cotizacion?.fechaVencimiento),
        ],
      })),
    };
    return table;
  };
  const { titles, tableBody } = handleTablePricings();

  return (
    <div className="col-xl-9">
      <TitleForm title="Cotizaciones" />
      <TableButton titles={titles} tableBody={tableBody} />
    </div>
  );
};

export default AccountPricings;
