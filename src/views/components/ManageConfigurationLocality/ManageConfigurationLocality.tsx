import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import CheckForm from "../GeneralComponents/CheckForm";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { ConfigLocalidadesRepository } from "../../../models/repository/Repositorys/configLocalidadRepository";
import { updateConfigLocalidad } from "../../../redux/configLocalidadSlice";
import Modal from "../GeneralComponents/Modal";

function ConfigurarLocalidad({
  handleCurrentView,
  setCurrentConfigLocality,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentConfigLocality: (config: ConfigLocalidad) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configLocalidadRepo = new ConfigLocalidadesRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionLocalidad`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const configsEdad: ConfigLocalidad[] = useAppSelector(
    (state) => state.configLocalidades.configLocalidad
  );

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // buscador
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

  // botones (alta, baja modificacion)
  const handleUpdateConfigLocality = (configEdad: any): void => {
    setCurrentConfigLocality(configEdad);
    handleCurrentView(false);
  };

  const handleCreateConfigLocality = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteConfigLocalidad(configLocalidad: any) {
    if (
      window.confirm(
        "¿Estás seguro de que querés eliminar la configuracion de localidad?"
      )
    ) {
      try {
        const response = await configLocalidadRepo.updateStateConfigLocalidad(
          configLocalidad.id
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateConfigLocalidad({ id: configLocalidad.id }));
        setShowError(true);
        setModalMessage(
          "Estado del configuracion antiguedad " +
            configLocalidad.id +
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

  // handle para la tabla
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateConfigLocality,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteConfigLocalidad,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Provincia",
        "Localidad",
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
          String(configsEdad.localidad?.provincia?.descripcion) ?? "",
          String(configsEdad.localidad?.descripcion) ?? "",
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
            <IconButton
              icon={PlusSquare}
              onClick={handleCreateConfigLocality}
            />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las configuraciones de localidad"
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
export default ConfigurarLocalidad;
