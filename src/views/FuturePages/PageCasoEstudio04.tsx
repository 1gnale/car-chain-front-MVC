import Table from "../components/GeneralComponents/Table";
import Input from "../components/GeneralComponents/Input";
import GrayButton from "../components/GeneralComponents/Button";
import LabelNinfo from "../components/GeneralComponents/LabelNinfo";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import { useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import CheckForm from "../components/GeneralComponents/CheckForm";

function PageCasoEstudio04() {
  const versiones: Version[] = useAppSelector(
    (state) => state.versiones.version
  );
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredVersiones = versiones.filter((version) => {
    const matchesSearch = version.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return version && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return version.activo && matchesSearch;
  });

  const handleTable = (): tableContent => {
    const table: tableContent = {
      showButtom: true,
      customIcons: [Pencil, Trash],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Precio Mercado",
        "Precio De Mercado (GNC)",
        "Modelo",
        "Marca",
        "Estado",
      ],
      tableBody: filteredVersiones.map((version, idx) => ({
        key: idx,
        rowContent: [
          String(version.id) ?? "",
          version.nombre ?? "",
          version.descripcion ?? "",
          String(version.precio_mercado) ?? "",
          String(version.precio_mercado_gnc) ?? "",
          version.modelo.nombre ?? "",
          version.modelo.marca.nombre ?? "",
          (() => {
            if (version.activo) {
              return "Activo";
            } else {
              return "Inactivo";
            }
          })(),
        ],
      })),
    };
    return table;
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
        title="Mostrar Todos Los Modelos"
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
}

export default PageCasoEstudio04;
