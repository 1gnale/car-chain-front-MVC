import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import useFormValidationPayementPeriod from "../../../controllers/controllerHooks/Validations/usePayementPeriodsValidation";
import Input from "../GeneralComponents/Input";
import { PeriodosPagoRepository } from "../../../models/repository/Repositorys/periodosPagoRepository";
import Modal from "../GeneralComponents/Modal";
import { createPaymentPeriod } from "../../../redux/periodoPagosSlice";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";

function CrearPeriodoPago({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const periodoPagoRepo = new PeriodosPagoRepository(
    `${import.meta.env.VITE_BASEURL}/api/periodoPago`
  );

  // Dispatch de Redux
  const dispatch = useAppDispatch();

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationPayementPeriod();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formPayementPeriod, setFormPayementPeriod] = useState<PeriodoPago>({
    id: 1,
    nombre: "",
    cantidadMeses: 0,
    descuento: 0,
  });

  // handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setFormPayementPeriod((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // botones (cancelar, crear)
  async function crearPeriodoPago() {
    const paymentPeriod = {
      nombre: formPayementPeriod.nombre,
      cantidadMeses: String(formPayementPeriod.cantidadMeses),
      descuento: String(formPayementPeriod.descuento),
    };
    console.log(paymentPeriod);
    if (validateForm(paymentPeriod)) {
      try {
        const response = await periodoPagoRepo.createPaymentPeriod(
          formPayementPeriod
        );

        console.log("✅ Periodo de pago creado:", response);

        // Formateamos el usuario para Redux
        const PeriodoPagoParaRedux: PeriodoPago = {
          ...response,
          nombre: response.nombre,
          cantidadMeses: response.cantidadMeses,
          descuento: response.descuento,
        };

        // Despachamos al store
        dispatch(createPaymentPeriod(PeriodoPagoParaRedux));
        console.log(
          "✅ Periodo de pago creado en Redux:",
          PeriodoPagoParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Periodo de pago creado");
        setModalMessage("Periodo de pago creado con exito: " + response.nombre);
        setMessageType("success");

        setFormPayementPeriod({ id: 0, cantidadMeses: 0, descuento: 0 });
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
    handleCurrentView(false);
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

      <div className="d-flex justify-content-end gap-3 mt-4">
        <GrayButton text="Cancelar" onClick={handleCancel} />
        <GrayButton text="Confirmar" onClick={crearPeriodoPago} />
      </div>
      <Modal
        show={showError}
        onClose={() => setShowError(false)}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}

export default CrearPeriodoPago;
