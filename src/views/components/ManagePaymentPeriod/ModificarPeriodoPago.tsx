import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import useFormValidationPayementPeriod from "../../../controllers/controllerHooks/Validations/usePayementPeriodsValidation";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { PeriodosPagoRepository } from "../../../models/repository/Repositorys/periodosPagoRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import { updatePeriodoPago } from "../../../redux/periodoPagosSlice";
import Modal from "../GeneralComponents/Modal";

function ModificarPeriodoPago({
  handleCurrentView,
  periodoPago,
}: {
  handleCurrentView: (pass: boolean) => void;
  periodoPago: PeriodoPago;
}) {
  // Repositorio para los ENDPOINTS
  const periodoPagoRepo = new PeriodosPagoRepository(
    `${import.meta.env.VITE_BASEURL}/api/periodoPago`
  );

  // Dispatch de Redux
  const dispatch = useAppDispatch();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationPayementPeriod();

  // formulario
  const [formPayementPeriod, setFormPayementPeriod] = useState<PeriodoPago>({
    id: periodoPago.id,
    nombre: periodoPago.nombre,
    cantidadMeses: periodoPago.cantidadMeses,
    descuento: periodoPago.descuento,
    activo: periodoPago.activo,
  });

  // handle para crear formulario
  const handleInputChange = (field: string, value: string) => {
    setFormPayementPeriod((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // botones (cancelar, modificar)
  async function modificarPeriodoPago() {
    const paymentPeriod = {
      nombre: formPayementPeriod.nombre,
      cantidadMeses: String(formPayementPeriod.cantidadMeses),
      descuento: String(formPayementPeriod.descuento),
      activo: formPayementPeriod.activo,
    };
    console.log(paymentPeriod);
    if (validateForm(paymentPeriod)) {
      try {
        const response = await periodoPagoRepo.updatePaymentPeriod(
          formPayementPeriod
        );

        console.log("✅ PeriodoPago creado:", response);

        // Formateamos el usuario para Redux
        const PeriodoPagoParaRedux: PeriodoPago = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          cantidadMeses: response.cantidadMeses,
          descuento: response.descuento,
          activo: response.activo,
        };

        // Despachamos al store
        dispatch(updatePeriodoPago(PeriodoPagoParaRedux));
        console.log(
          "✅ PeriodoPago modificado en Redux:",
          PeriodoPagoParaRedux
        );

        setShowError(true);
        setTitleModalMessage("PeriodoPago modificado");
        setModalMessage("PeriodoPago modificado con exito: " + response.nombre);
        setMessageType("success");
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    } else {
    }
  }

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formPayementPeriod.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", formPayementPeriod.nombre!)}
      />

      <Input
        title="Cantidad de Meses"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={String(formPayementPeriod.cantidadMeses)}
        onChange={(value) => handleInputChange("cantidadMeses", value)}
        error={errors.cantidadMeses}
        onBlur={() =>
          validateField(
            "cantidadMeses",
            String(formPayementPeriod.cantidadMeses!)
          )
        }
      />

      <Input
        title="Descuento"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={String(formPayementPeriod.descuento)}
        onChange={(value) => handleInputChange("descuento", value)}
        error={errors.descuento}
        onBlur={() =>
          validateField("descuento", String(formPayementPeriod.descuento!))
        }
      />
      <CheckForm
        text="Periodo Pago Activo"
        checked={formPayementPeriod.activo}
        onChange={() =>
          setFormPayementPeriod((prev) => ({
            ...prev,
            ["activo"]: !formPayementPeriod.activo,
          }))
        }
      />
      <div className="d-flex justify-content-end gap-3 mt-4">
        <GrayButton text="Cancelar" onClick={handleCancel} />
        <GrayButton text="Confirmar" onClick={modificarPeriodoPago} />
      </div>
      <Modal
        show={showError}
        onClose={
          messageType == "success"
            ? () => {
                setShowError(false);
                handleCurrentView(true);
              }
            : () => {
                setShowError(false);
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}

export default ModificarPeriodoPago;
