import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";
import Modal from "../GeneralComponents/Modal";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import { ConfigEdadRepository } from "../../../models/repository/Repositorys/configEdadRepository";
import { updateConfigEdad } from "../../../redux/configEdadSlice";
function ManageConfigurationAge({
  handleCurrentView,
  setCurrentConfigAge,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentConfigAge: (config: ConfigEdad) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configEdadRepo = new ConfigEdadRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionEdad`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const configsEdad: ConfigEdad[] = useAppSelector(
    (state) => state.configEdades.configEdad
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
  const filteredconfigEdad = configsEdad.filter((configedad) => {
    const matchesSearch = configedad.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return configedad && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return configedad.activo && matchesSearch;
  });

  // Botones (ALTA , BAJA, MODIFICACION)
  const handleUpdateConfigAge = (configEdad: any): void => {
    setCurrentConfigAge(configEdad);
    handleCurrentView(false);
  };

  const handleCreateConfigAge = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteConfigAge(configEdad: any) {
    if (
      window.confirm(
        "¿Estás seguro de que querés eliminar la configuracion de Edad?"
      )
    ) {
      try {
        const response = await configEdadRepo.updateStateConfigEdad(
          configEdad.id
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateConfigEdad({ id: configEdad.id }));
        setShowError(true);
        setModalMessage(
          "Estado de la configuracion edad " + configEdad.id + " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("Configuracion edad eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  // Handles de la tabla
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
          onAction: handleDeleteConfigAge,
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
      tableBody: filteredconfigEdad.map((configsEdad) => ({
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
export default ManageConfigurationAge;
