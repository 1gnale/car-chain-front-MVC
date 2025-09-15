import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";

const ManageHiringType = ({
  handleCurrentView,
  setHiringType,
}: {
  handleCurrentView: (pass: boolean) => void;
  setHiringType: (hiringType: TipoContratacion) => void;
}) => {
  const tiposContratacion: TipoContratacion[] = useAppSelector(
    (state) => state.tiposContratacion.tipoContratacion
  );
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredDetalles = tiposContratacion.filter((tipoContratacion) => {
    const matchesSearch = tipoContratacion.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return tipoContratacion && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return tipoContratacion.activo && matchesSearch;
  });
  const handleUpdateHiringType = (tipoContratacion: any): void => {
    setHiringType(tipoContratacion);
    handleCurrentView(false);
  };
  const handleCreateHiringType = (): void => {
    handleCurrentView(true);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateHiringType,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: ["ID", "Nombre", "Cantidad de meses", "Estado"],
      tableBody: filteredDetalles.map((hiringType) => ({
        key: hiringType.id,
        value: hiringType,
        rowContent: [
          String(hiringType.id) ?? "",
          hiringType.nombre ?? "",
          String(hiringType.cantidadMeses) ?? "",
          (() => {
            if (hiringType.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateHiringType} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todos los tipo contratacion"
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
      </div>{" "}
    </>
  );
};

export default ManageHiringType;
