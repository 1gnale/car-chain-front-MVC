import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";

function ConfigurarAntiguedad({
  handleCurrentView,
  setCurrentConfigAntiquity,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentConfigAntiquity: (config: ConfigAntiguedad) => void;
}) {
  /// CAMBIAR LUEGO
  const configurarAntiguedad: ConfigAntiguedad = useAppSelector(
    (state) => state.configAntiguedades.configAntiguedad
  );
  const configsAntiguedad: ConfigAntiguedad[] =
    Array(3).fill(configurarAntiguedad);

  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const filteredTipoContratacion = configsAntiguedad.filter(
    (configAntiguedad) => {
      const matchesSearch = configAntiguedad.nombre
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // Si checkbox está activado => mostrar solo inactivas
      if (checkbox) {
        return configAntiguedad && matchesSearch;
      }

      // Si checkbox no está activado => mostrar solo activas
      return configAntiguedad.activo && matchesSearch;
    }
  );

  const handleUpdateConfigAntiquity = (configAntiguedad: any): void => {
    setCurrentConfigAntiquity(configAntiguedad);
    handleCurrentView(false);
  };

  const handleCreateConfigAntiquity = (): void => {
    handleCurrentView(true);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateConfigAntiquity,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Antiguedad minima",
        "Antiguedad maxima",
        "Descuento",
        "Ganancia",
        "Recargo",
        "Estado",
      ],
      tableBody: filteredTipoContratacion.map((configsAntiguedad) => ({
        key: configsAntiguedad.id || 0,
        value: configsAntiguedad,
        rowContent: [
          String(configsAntiguedad.id) ?? "",
          configsAntiguedad.nombre ?? "",
          String(configsAntiguedad.minima) ?? "",
          String(configsAntiguedad.maxima) ?? "",
          String(configsAntiguedad.descuento) ?? "",
          String(configsAntiguedad.ganancia) ?? "",
          String(configsAntiguedad.recargo) ?? "",
          (() => {
            if (configsAntiguedad.activo) {
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
            <IconButton
              icon={PlusSquare}
              onClick={handleCreateConfigAntiquity}
            />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las configuraciones antiguedad"
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
export default ConfigurarAntiguedad;
