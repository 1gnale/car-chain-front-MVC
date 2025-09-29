import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { useEffect, useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import { DetallesRepository } from "../../../models/repository/Repositorys/detallesRepository";
import { updateDetalleState } from "../../../redux/detallesSlice";
import Modal from "../GeneralComponents/Modal";

const ManageDetails = ({
  handleCurrentView,
  setCurrentDetail,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentDetail: (detail: Detalle) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const detalleRepo = new DetallesRepository(
    `${import.meta.env.VITE_BASEURL}/api/detalle`
  );

  // Traer del redux los repositorios para la tabla
  const detalles: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const dispatch = useAppDispatch();

  // States para la busqueda y filtro
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Buscador
  const filteredDetalles = detalles.filter((detalle) => {
    const matchesSearch = detalle.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return detalle && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return detalle.activo && matchesSearch;
  });

  // UseEffect que recarga la tabla al actualizar los datos
  useEffect(() => {
    if (detalles && detalles.length > 0) {
      setIsTableLoaded(true);
    }
  }, [detalles]);

  // Handles (Botones alta baja y modificacion)

  const handleCreateDetail = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteDetail(detalle: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar el detalle?")) {
      try {
        const response = await detalleRepo.updateStateDetalle(detalle.id);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateDetalleState({ id: detalle.id }));
        setShowError(true);
        setModalMessage("Estado del detalle " + detalle.id + " actualizado");
        setMessageType("info");
        setTitleModalMessage("Detalle eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  const handleUpdateDetail = (detalle: any): void => {
    setCurrentDetail(detalle);
    handleCurrentView(false);
  };

  // Handle que carga la tabla
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateDetail,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteDetail,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Porcentaje En Miles",
        "Monto Fijo",
        "Estado",
      ],
      tableBody: filteredDetalles.map((detail) => ({
        key: detail.id,
        value: detail,
        rowContent: [
          String(detail.id) ?? "",
          detail.nombre ?? "",
          detail.descripcion ?? "",
          String(detail.porcentaje_miles) ?? "",
          String(detail.monto_fijo) ?? "",
          (() => {
            if (detail.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateDetail} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todos los detalles"
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

export default ManageDetails;
