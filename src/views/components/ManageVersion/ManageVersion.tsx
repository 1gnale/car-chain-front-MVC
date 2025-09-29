import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import GrayButton from "../GeneralComponents/Button";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import CheckForm from "../GeneralComponents/CheckForm";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository";
import Modal from "../GeneralComponents/Modal";
import { updateVersionState } from "../../../redux/versionSlice";

const ManageVersion = ({
  handleCurrentView,
  setCurrentVersion,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentVersion: (version: Version) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const versionRepo = new VersionRepository(
    `${import.meta.env.VITE_BASEURL}/api/versiones`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const versiones: Version[] = useAppSelector(
    (state) => state.versiones.version
  );

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

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

  // Botones (alta baja modificacion)
  const handleUpdateVersion = (version: any): void => {
    setCurrentVersion(version);
    handleCurrentView(false);
  };
  const handleCreateModel = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteVersion(Version: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar la Version?")) {
      try {
        const response = await versionRepo.updateStateVersion(Version.id);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateVersionState({ id: Version.id }));
        setShowError(true);
        setModalMessage("Estado de la Version " + Version.id + " actualizado");
        setMessageType("info");
        setTitleModalMessage("Version eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  // Handle tablas
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateVersion,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteVersion,
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
          version.modelo?.marca?.nombre ?? "",
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
            <IconButton icon={PlusSquare} onClick={handleCreateModel} />
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
      <Modal
        show={showError}
        onClose={() => setShowError(false)}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </>
  );
};

export default ManageVersion;
