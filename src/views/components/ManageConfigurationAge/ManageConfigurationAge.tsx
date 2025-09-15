import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";

function ManageConfigurationAge({
  handleCurrentView,
  setCurrentConfigAge,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentConfigAge: (config: ConfigEdad) => void;
}) {
  /// CAMBIAR LUEGO
  const ConfigurarEdad: ConfigEdad = useAppSelector(
    (state) => state.configEdades.configEdad
  );
  const configsEdad: ConfigEdad[] = Array(3).fill(ConfigurarEdad);
  console.log(ConfigurarEdad);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const filteredTipoContratacion = configsEdad.filter((configEdad) => {
    const matchesSearch = configEdad.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return configEdad && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return configEdad.activo && matchesSearch;
  });

  const handleUpdateConfigAge = (configEdad: any): void => {
    setCurrentConfigAge(configEdad);
    handleCurrentView(false);
  };

  const handleCreateConfigAge = (): void => {
    handleCurrentView(true);
  };
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateConfigAge,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Edad minima",
        "Edad maxima",
        "Descuento",
        "Ganancia",
        "Recargo",
        "Estado",
      ],
      tableBody: filteredTipoContratacion.map((configsEdad) => ({
        key: configsEdad.id || 0,
        value: configsEdad,
        rowContent: [
          String(configsEdad.id) ?? "",
          configsEdad.nombre ?? "",
          String(configsEdad.minima) ?? "",
          String(configsEdad.maxima) ?? "",
          String(configsEdad.descuento) ?? "",
          String(configsEdad.ganancia) ?? "",
          String(configsEdad.recargo) ?? "",
          (() => {
            if (configsEdad.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateConfigAge} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las configuraciones edad"
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
export default ManageConfigurationAge;
