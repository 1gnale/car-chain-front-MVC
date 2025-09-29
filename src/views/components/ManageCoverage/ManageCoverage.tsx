import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import CheckForm from "../GeneralComponents/CheckForm";
import Modal from "../GeneralComponents/Modal";
import { CoberturasRepository } from "../../../models/repository/Repositorys/coberturasRepository";
import { updateCoberturaState } from "../../../redux/coberturaSlice";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";

function ManageCoverage({
  handleCurrentView,
  setCurrentCoverage,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentCoverage: (coverage: Cobertura) => void;
}) {
  // Repositorio para los ENDPOINTS
  const coberturaRepo = new CoberturasRepository(
    `${import.meta.env.VITE_BASEURL}/api/cobertura`
  );
  const dispatch = useAppDispatch();

  // Traer del redux los repositorios para la tabla
  const coberturas: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
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
  const filteredCoberturas = coberturas.filter((cobertura) => {
    const matchesSearch = cobertura.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return cobertura && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return cobertura.activo && matchesSearch;
  });

  // UseEffect que recarga la tabla al actualizar los datos
  useEffect(() => {
    if (coberturas && coberturas.length > 0) {
      setIsTableLoaded(true);
    }
  }, [coberturas]);

  // HANDLES Botones (Alta, baja modificacion)
  const handleCreateCoverage = (): void => {
    handleCurrentView(true);
  };
  async function handleDeleteCoverage(cobertura: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar la cobertura?")) {
      try {
        const response = await coberturaRepo.updateStateCobertura(cobertura.id);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateCoberturaState({ id: cobertura.id }));
        setShowError(true);
        setModalMessage(
          "Estado del cobertura " + cobertura.id + " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("Cobertura eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  const handleUpdateCoverage = (cobertura: any): void => {
    setCurrentCoverage(cobertura);
    handleCurrentView(false);
  };

  // HANDLE TABLA
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateCoverage,
        },
        {
          customIcons: Trash,
          onAction: handleDeleteCoverage,
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Recargo Por Atraso (%)",
        "Estado",
      ],
      tableBody: filteredCoberturas.map((cobertura) => ({
        key: cobertura.id,
        value: cobertura,
        rowContent: [
          String(cobertura.id) ?? "",
          cobertura.nombre ?? "",
          cobertura.descripcion ?? "",
          String(cobertura.recargoPorAtraso) ?? "",
          (() => {
            if (cobertura.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreateCoverage} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las coberturas"
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
}

export default ManageCoverage;
