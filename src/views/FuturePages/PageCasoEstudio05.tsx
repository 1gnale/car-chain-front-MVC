import Table from "../components/GeneralComponents/Table";
import Input from "../components/GeneralComponents/Input";
import GrayButton from "../components/GeneralComponents/Button";
import LabelNinfo from "../components/GeneralComponents/LabelNinfo";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../components/GeneralComponents/CheckForm";

const PageCasoEstudio05 = ({
  handleCurrentView,
  setCurrentDetail,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentDetail: (detail: Detalle) => void;
}) => {
  const detalles: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredDetalles = detalles.filter((detalle) => {
    const matchesSearch = detalle.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return detalle && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return detalle.activo && matchesSearch;
  });
  const handleUpdateDetail = (detalle: any): void => {
    setCurrentDetail(detalle);
    handleCurrentView(false);
  };
  const handleCreateDetail = (): void => {
    handleCurrentView(true);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateDetail,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Porcentaje En Miles",
        "Monto Fijo",
        "Estado",
      ],
      tableBody: filteredDetalles.map((detail) => ({
        key: detail.id,
        value: detail,
        rowContent: [
          String(detail.id) ?? "",
          detail.nombre ?? "",
          detail.descripcion ?? "",
          String(detail.porcentaje_miles) ?? "",
          String(detail.monto_fijo) ?? "",
          (() => {
            if (detail.activo) {
              return "Activo";
            } else {
              return "Inactivo";
            }
          })(),
        ],
      })),
    };
  };

  const { titles, tableBody, customIcons, showButtom } = handleTable();

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center w-100 gap-2 p-3">
        <span className="form-label mb-0">Búsqueda:</span>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          style={{ maxWidth: "75%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton icon={PlusSquare} onClick={handleCreateDetail} />
      </div>
      {/* Checkbox controlado */}
      <CheckForm
        title="Mostrar Todos los detalles"
        text=""
        checked={checkbox}
        onChange={() => setCheckbox(!checkbox)}
      />
      <div className="d-flex  my-4" style={{ width: "-20px" }}>
        <Table
          titles={titles}
          tableBody={tableBody}
          customIcons={customIcons}
          showButtom={showButtom}
        />
      </div>
    </div>
  );
};

export default PageCasoEstudio05;
