import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import GrayButton from "../GeneralComponents/Button";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";
import Modal from "../GeneralComponents/Modal";
import { ModeloRepository } from "../../../models/repository/Repositorys/modelosRepository";
import { updateModeloState } from "../../../redux/modeloSlice";

const ManageModelos = ({
  handleCurrentView,
  setCurrentModel,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentModel: (modelo: Modelo) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const modelosRepo = new ModeloRepository(
    `${import.meta.env.VITE_BASEURL}/api/modelos`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const modelos: Modelo[] = useAppSelector((state) => state.modelos.modelo);

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredModelos = modelos.filter((modelo) => {
    const matchesSearch = modelo.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return modelo && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return modelo.activo && matchesSearch;
  });

  // Botones (alta, baja modificacion)
  const handleCreateModel = (): void => {
    handleCurrentView(true);
  };

  const handleUpdateModel = (modelo: any): void => {
    setCurrentModel(modelo);
    handleCurrentView(false);
  };

  async function handleDeleteModelo(Modelo: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar la Modelo?")) {
      try {
        const response = await modelosRepo.updateStateModelo(Modelo.id);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateModeloState({ id: Modelo.id }));
        setShowError(true);
        setModalMessage("Estado de la Modelo " + Modelo.id + " actualizado");
        setMessageType("info");
        setTitleModalMessage("Modelo eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  // handle tabla
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateModel,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteModelo,
        },
      ],
      titles: ["ID", "Nombre", "Marca", "Descripcion", "Estado"],
      tableBody: filteredModelos.map((modelo, idx) => ({
        key: idx,
        value: modelo,
        rowContent: [
          String(modelo.id) ?? "",
          modelo.nombre ?? "",
          modelo.marca?.nombre ?? "",
          modelo.descripcion ?? "",
          (() => {
            if (modelo.activo) {
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
            text="Mostrar todos los modelos"
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

export default ManageModelos;
