import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";
import Modal from "../GeneralComponents/Modal";
import { ConfigAntiguedadRepository } from "../../../models/repository/Repositorys/configAntiguedadRepository";
import { updateConfigAntiguedad } from "../../../redux/configAntiguedadSlice";

function ConfigurarAntiguedad({
  handleCurrentView,
  setCurrentConfigAntiquity,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentConfigAntiquity: (config: ConfigAntiguedad) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configAntiguedadRepo = new ConfigAntiguedadRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionAntiguedad`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const configsAntiguedad: ConfigAntiguedad[] = useAppSelector(
    (state) => state.configAntiguedades.configAntiguedad
  );

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Buscador
  const filteredConfigAntiguedad = configsAntiguedad.filter(
    (configantiguedad) => {
      const matchesSearch = configantiguedad.nombre
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // Si checkbox está activado => mostrar solo inactivas
      if (checkbox) {
        return configantiguedad && matchesSearch;
      }

      // Si checkbox no está activado => mostrar solo activas
      return configantiguedad.activo && matchesSearch;
    }
  );

  // Botones (alta baja y modificacion)
  const handleUpdateConfigAntiquity = (configAntiguedad: any): void => {
    setCurrentConfigAntiquity(configAntiguedad);
    handleCurrentView(false);
  };
  const handleCreateConfigAntiquity = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteConfigAntiquity(configAntiguedad: any) {
    if (
      window.confirm(
        "¿Estás seguro de que querés eliminar la configuracion de antiguedad?"
      )
    ) {
      try {
        const response = await configAntiguedadRepo.updateStateConfigAntiguedad(
          configAntiguedad.id
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateConfigAntiguedad({ id: configAntiguedad.id }));
        setShowError(true);
        setModalMessage(
          "Estado del configuracion antiguedad " +
            configAntiguedad.id +
            " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("configuracion antiguedad eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }
  // Handles de tablas
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
          onAction: handleDeleteConfigAntiquity,
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
      tableBody: filteredConfigAntiguedad.map((configsAntiguedad) => ({
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
      <Modal
        show={showError}
        onClose={() => setShowError(false)}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </>
  );
}
export default ConfigurarAntiguedad;
