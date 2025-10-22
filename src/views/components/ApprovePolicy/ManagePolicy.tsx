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

const ManagePolizas = ({
  handleCurrentView,
  setCurrentPolicy,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentPolicy: (numberPoliza: number) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const polizasRepo = new PolizaRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const polizas: Poliza[] = useAppSelector((state) => state.polizas.poliza);
  console.log(polizas);
  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredPolizas = polizas.filter((poliza) => {
    const matchesSearch =
      poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.nombres
        ?.toLowerCase()
        .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return poliza && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return poliza.estadoPoliza === "PENDIENTE" && matchesSearch;
  });

  // Botones (Alta baja modificaion)
  const handleCreatePolicysetCurrentPolicy = (): void => {
    handleCurrentView(true);
  };

  const handleUpdateStatePolicy = (poliza: any): void => {
    setCurrentPolicy(poliza.numero_poliza);
    handleCurrentView(true);
  };
  // HANDLE TABLA
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Eye,
          onAction: handleUpdateStatePolicy,
        },
      ],

      titles: [
        "Numero poliza",
        "Cobertura",
        "Titular",
        "Vehiculo",
        "Fecha Contratacion",
        "Estado",
      ],
      tableBody: filteredPolizas.map((poliza) => ({
        key: poliza.numero_poliza || 0,
        value: poliza,
        rowContent: [
          String(poliza.numero_poliza) || "",
          poliza.lineaCotizacion?.cobertura?.nombre ?? "",
          poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.nombres ?? "",
          poliza.lineaCotizacion?.cotizacion?.vehiculo?.version.nombre ?? "",
          poliza.fechaContratacion ?? "",
          poliza.estadoPoliza ?? "",
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
              onClick={handleCreatePolicysetCurrentPolicy}
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

export default ManagePolizas;
