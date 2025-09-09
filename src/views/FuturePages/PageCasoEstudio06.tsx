import Table from "../components/GeneralComponents/Table";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import CheckForm from "../components/GeneralComponents/CheckForm";

function PageCasoEstudio06({
  handleCurrentView,
  setCurrentCoverage,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentCoverage: (coverage: Cobertura) => void;
}) {
  const coberturas: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const filteredCoberturas = coberturas.filter((cobertura) => {
    const matchesSearch = cobertura.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return cobertura && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return cobertura.activo && matchesSearch;
  });

  const handleUpdateCoverage = (cobertura: any): void => {
    setCurrentCoverage(cobertura);
    handleCurrentView(false);
  };

  const handleCreateCoverage = (): void => {
    handleCurrentView(true);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateCoverage,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Recargo Por Atraso (%)",
        "Estado",
      ],
      tableBody: filteredCoberturas.map((cobertura) => ({
        key: cobertura.id,
        value: cobertura,
        rowContent: [
          String(cobertura.id) ?? "",
          cobertura.nombre ?? "",
          cobertura.descripcion ?? "",
          String(cobertura.recargoPorAtraso) ?? "",
          (() => {
            if (cobertura.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateCoverage} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las coberturas"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </div>
        <div className="d-flex my-4" style={{ width: "-20px" }}>
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

export default PageCasoEstudio06;
