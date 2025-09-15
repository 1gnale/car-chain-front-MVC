import Table from "../components/GeneralComponents/Table";
import Input from "../components/GeneralComponents/Input";
import GrayButton from "../components/GeneralComponents/Button";
import LabelNinfo from "../components/GeneralComponents/LabelNinfo";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import CheckForm from "../components/GeneralComponents/CheckForm";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";

const PageCasoEstudio03 = ({
  handleCurrentView,
  setCurrentModel,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentModel: (modelo: Modelo) => void;
}) => {
  const modelos: Modelo[] = useAppSelector((state) => state.modelos.modelo);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredModelos = modelos.filter((modelo) => {
    const matchesSearch = modelo.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return modelo && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return modelo.activo && matchesSearch;
  });
  const handleUpdateModel = (modelo: any): void => {
    setCurrentModel(modelo);
    handleCurrentView(false);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateModel,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: ["ID", "Marca", "Nombre", "Descripcion", "Estado"],
      tableBody: filteredModelos.map((modelo, idx) => ({
        key: idx,
        value: modelo,
        rowContent: [
          String(modelo.id) ?? "",
          modelo.marca.nombre ?? "",
          modelo.nombre ?? "",
          modelo.descripcion ?? "",
          (() => {
            if (modelo.activo) {
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
        <IconButton icon={PlusSquare} />
      </div>
      <CheckForm
        text="Mostrar Todos Los Modelos"
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

export default PageCasoEstudio03;
