import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import GrayButton from "../GeneralComponents/Button";
import LabelNinfo from "../GeneralComponents/LabelNinfo";
import IconButton from "../GeneralComponents/IconButton";
import { Eye, PlusSquare } from "react-bootstrap-icons";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { PolizaRepository } from "../../../models/repository/Repositorys/polizaRepository";
import Modal from "../GeneralComponents/Modal";
import { updatePolizaState } from "../../../redux/policeSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import { SiniestroRepository } from "../../../models/repository/Repositorys/SiniestroRepository";
const ManageSiniestro = ({
  handleCurrentView,
  setCurrentPolicy,
  setCurrentSiniestro,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentPolicy: (numberPoliza: number) => void;
  setCurrentSiniestro: (siniestro: Siniestro) => void;
}) => {
  const { logout } = useAuth0();

  // Repositorio para los ENDPOINTS
  const siniestrosRepo = new SiniestroRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const siniestros: Siniestro[] = useAppSelector(
    (state) => state.siniestros.siniestro
  );

  console.log(siniestros);
  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredSiniestros = siniestros.filter((siniestro) => {
    const matchesSearch =
      siniestro.poliza?.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.nombres
        ?.toLowerCase()
        .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return siniestro && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return (
      siniestro.estado === "PENDIENTE" &&
      siniestro.poliza?.estadoPoliza == "VIGENTE" &&
      matchesSearch
    );
  });

  // Botones (Alta baja modificaion)
  const handleCreatePolicysetCurrentPolicy = (): void => {
    handleCurrentView(true);
  };

  const handleUpdateStateSiniestro = (siniestro: Siniestro): void => {
    setCurrentPolicy(siniestro.poliza?.numero_poliza || 0);
    setCurrentSiniestro(siniestro);
    handleCurrentView(true);
  };

  const logOut = () => {
    if (window.confirm("¿Estás seguro de que querés cerrar sesión?")) {
      logout();
    }
  };
  // HANDLE TABLA
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Eye,
          onAction: handleUpdateStateSiniestro,
        },
      ],

      titles: [
        "Numero poliza",
        "Cobertura",
        "Titular",
        "Vehiculo",
        "Estado",
        "Fecha Siniestro",
        "Estado Siniestro",
      ],
      tableBody: filteredSiniestros.map((siniestro) => ({
        key: siniestro.poliza?.numero_poliza || 0,
        value: siniestro,
        rowContent: [
          String(siniestro.poliza?.numero_poliza) || "",
          siniestro.poliza?.lineaCotizacion?.cobertura?.nombre ?? "",
          siniestro.poliza?.lineaCotizacion?.cotizacion?.vehiculo?.cliente
            ?.nombres ?? "",
          siniestro.poliza?.lineaCotizacion?.cotizacion?.vehiculo?.version
            .nombre ?? "",
          siniestro.poliza?.estadoPoliza ?? "",
          siniestro.fechaSiniestro ?? "",
          siniestro.estado ?? "",
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
              placeholder="Buscar por titular..."
              style={{ maxWidth: "75%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las polizas"
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
        <button
          className="btn btn-logout text-start d-flex align-items-center mt-3"
          onClick={logOut}
        >
          <LogOut className="me-2" size={20} />
          Cerrar Sesión
        </button>
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

export default ManageSiniestro;
