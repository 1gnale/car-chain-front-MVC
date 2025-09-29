import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";
import { tiposDocumentoRepository } from "../../../models/repository/Repositorys/tiposDocumentoRepository";
import Modal from "../GeneralComponents/Modal";
import { TipoContratacionRepository } from "../../../models/repository/Repositorys/tipoContratacionRepository";
import { updateTipoContratacion } from "../../../redux/hiringTypesSlice";

const ManageHiringType = ({
  handleCurrentView,
  setHiringType,
}: {
  handleCurrentView: (pass: boolean) => void;
  setHiringType: (hiringType: TipoContratacion) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const tiposContratacionRepo = new TipoContratacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/tipoContratacion`
  );

  // Redux datos y dispatch
  const tiposContratacion: TipoContratacion[] = useAppSelector(
    (state) => state.tiposContratacion.tipoContratacion
  );
  const dispatch = useAppDispatch();

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

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

  // Botones (alta, baja, modificacion)
  const handleUpdateHiringType = (tipoContratacion: any): void => {
    setHiringType(tipoContratacion);
    handleCurrentView(false);
  };
  const handleCreateHiringType = (): void => {
    handleCurrentView(true);
  };

  // Handle para Tablas
  async function handleDeleteHiringType(tipoContratacion: any) {
    if (
      window.confirm(
        "¿Estás seguro de que querés eliminar el tipo de contratacion?"
      )
    ) {
      try {
        const response =
          await tiposContratacionRepo.updateStateTipoContratacion(
            tipoContratacion.id
          );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateTipoContratacion({ id: tipoContratacion.id }));
        setShowError(true);
        setModalMessage(
          "Estado del tipo de contratacion " +
            tipoContratacion.id +
            " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("tipo de contratacion eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

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
          onAction: handleDeleteHiringType,
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
        <Modal
          show={showError}
          onClose={() => setShowError(false)}
          type={messageType}
          title={messageTitle}
          message={errorMessage || "Error inesperado intente mas tarde"}
        />
      </div>{" "}
    </>
  );
};

export default ManageHiringType;
