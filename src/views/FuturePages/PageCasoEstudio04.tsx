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

const PageCasoEstudio04 = ({handleCurrentView, setCurrentVersion}: {
    handleCurrentView: (pass: boolean) => void,
  setCurrentVersion: (version: Version ) => void,
}) => {
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
  const handleUpdateVersion = (version: any): void => {
    setCurrentVersion(version)
    handleCurrentView(false)
  }
  const handleTable = (): tableContent => {

    return {
      showButtom: true,
            customIcons: [
        {
          customIcons: Pencil,  onAction: handleUpdateVersion
        },
        {
          customIcons: Trash,
        },
      ],
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
        value: version,
        rowContent: [
          String(version.id) ?? "",
          version.nombre ?? "",
          version.descripcion ?? "",
          String(version.precio_mercado) ?? "",
          String(version.precio_mercado_gnc) ?? "",
          version.modelo?.nombre ?? "",
          version.modelo?.marca.nombre ?? "",
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
  };

  const { titles, tableBody, customIcons, showButtom } = handleTable();
  return (
     <>
      <style>{`  .controls {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
         `}</style>
      <div className="container-fluid">
        <div className="controls">
          <div className="d-flex align-items-center gap-2 w-100">
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

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las versiones"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </div>

      <div className="d-flex  my-4" style={{ width: "-20px" }}>
        <Table
          titles={titles}
          tableBody={tableBody}
          customIcons={customIcons}
          showButtom={showButtom}
        />
      </div>
    </div>
    </>
  );
}

export default PageCasoEstudio04;
