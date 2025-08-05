import TitleForm from "../GeneralComponents/TitleForm";
import TableButton from "../GeneralComponents/Table";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { type Icon, Eye, Pencil } from "react-bootstrap-icons";

const AccountPricings = () => {
  const linePricings: Linea_Cotizacion[] = useAppSelector(
    (state) => state.lineasCotizacion.lineaCotizacion
  );

  const handleTablePricings = (): tableContent => {
    const table: tableContent = {
      showButtom: true,
      customIcons: [Eye],
      titles: [
        "Matricula",
        "Fecha de creación",
        "Marca",
        "Modelo",
        "Version",
        "Fecha de Vencimiento",
      ],
      tableBody: linePricings.map((line) => ({
        key: line.id,
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
  const { titles, tableBody, showButtom, customIcons } = handleTablePricings();

  return (
    <div className="col-xl-9">
      <TitleForm title="Cotizaciones" />
      <TableButton
        titles={titles}
        tableBody={tableBody}
        showButtom={showButtom}
        customIcons={customIcons}
      />
    </div>
  );
};

export default AccountPricings;
