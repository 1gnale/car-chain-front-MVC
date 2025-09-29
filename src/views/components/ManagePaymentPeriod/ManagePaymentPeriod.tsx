import Table from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import CheckForm from "../GeneralComponents/CheckForm";
import { PeriodosPagoRepository } from "../../../models/repository/Repositorys/periodosPagoRepository";
import Modal from "../GeneralComponents/Modal";
import { updatePeriodoPago } from "../../../redux/periodoPagosSlice";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";

function ManagePaymentPeriod({
  handleCurrentView,
  setCurrentPeriodoPago,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentPeriodoPago: (periodoPago: PeriodoPago) => void;
}) {
  // Repositorio para los ENDPOINTS
  const periodoPagoRepo = new PeriodosPagoRepository(
    `${import.meta.env.VITE_BASEURL}/api/periodoPago`
  );

  // Traer del redux los repositorios para la tabla
  const periodosPago: PeriodoPago[] = useAppSelector(
    (state) => state.periodosPago.periodopago
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

  // buscador
  const filteredPeriodosPago = periodosPago.filter((periodoPago) => {
    const matchesSearch = periodoPago.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return periodoPago && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return periodoPago.activo && matchesSearch;
  });

  // Botones (alta baja modificacion)
  const handleUpdatePaymentPeriod = (periodoPago: any): void => {
    setCurrentPeriodoPago(periodoPago);
    handleCurrentView(false);
  };

  const handleCreatePaymentPeriod = (): void => {
    handleCurrentView(true);
  };

  async function handleDeletePaymentPeriod(periodoPago: any) {
    if (
      window.confirm("¿Estás seguro de que querés eliminar el periodo de pago?")
    ) {
      try {
        const response = await periodoPagoRepo.updateStatePeriodoPago(
          periodoPago.id
        );

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updatePeriodoPago({ id: periodoPago.id }));
        setShowError(true);
        setModalMessage(
          "Estado del periodo de pago " + periodoPago.id + " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("Periodo de pago eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  // Handles de la Tabla
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdatePaymentPeriod,
        },
        {
          customIcons: Trash,
          onAction: handleDeletePaymentPeriod,
        },
      ],
      titles: ["ID", "Nombre", "Cantidad de meses", "Descuento (%)", "Estado"],
      tableBody: filteredPeriodosPago.map((periodoPago) => ({
        key: periodoPago.id,
        value: periodoPago,
        rowContent: [
          String(periodoPago.id) ?? "",
          periodoPago.nombre ?? "",
          String(periodoPago.cantidadMeses) ?? "",
          String(periodoPago.descuento) ?? "",
          (() => {
            if (periodoPago.activo) {
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
            <IconButton icon={PlusSquare} onClick={handleCreatePaymentPeriod} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todos los periodos de pago"
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
export default ManagePaymentPeriod;
