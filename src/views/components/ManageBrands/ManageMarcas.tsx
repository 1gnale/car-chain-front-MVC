import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import GrayButton from "../GeneralComponents/Button";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare } from "react-bootstrap-icons";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { MarcaRepository } from "../../../models/repository/Repositorys/marcaRepository";
import Modal from "../GeneralComponents/Modal";
import { updateMarca, updateMarcaState } from "../../../redux/marcaSlice";

const ManageMarcas = ({
  handleCurrentView,
  setCurrentBrand,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentBrand: (marca: Marca) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const marcasRepo = new MarcaRepository(
    `${import.meta.env.VITE_BASEURL}/api/marcas`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const marcas: Marca[] = useAppSelector((state) => state.marcas.marca);

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredMarcas = marcas.filter((marca) => {
    const matchesSearch = marca.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return marca && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return marca.activo && matchesSearch;
  });

  // Botones (Alta baja modificaion)
  const handleCreateBrand = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteMarca(Marca: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar la marca?")) {
      try {
        const response = await marcasRepo.updateStateMarca(Marca.id);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateMarcaState({ id: Marca.id }));
        setShowError(true);
        setModalMessage("Estado de la Marca " + Marca.id + " actualizado");
        setMessageType("info");
        setTitleModalMessage("Marca eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  const handleUpdateBrand = (marca: any): void => {
    setCurrentBrand(marca);
    handleCurrentView(false);
    //(marca);
  };
  // HANDLE TABLA
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateBrand,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteMarca,
        },
      ],

      titles: ["ID", "Nombre", "Descripcion", "Estado"],
      tableBody: filteredMarcas.map((marca) => ({
        key: marca.id,
        value: marca,
        rowContent: [
          String(marca.id) ?? "",
          marca.nombre ?? "",
          marca.descripcion ?? "",

          (() => {
            if (marca.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateBrand} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las marcas"
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
        <Modal
          show={showError}
          onClose={() => setShowError(false)}
          type={messageType}
          title={messageTitle}
          message={errorMessage || "Error inesperado intente mas tarde"}
        />
      </div>
    </>
  );
};

export default ManageMarcas;
