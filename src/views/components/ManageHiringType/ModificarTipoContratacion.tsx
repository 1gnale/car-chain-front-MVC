import GrayButton from "../GeneralComponents/Button";
import CheckForm from "../GeneralComponents/CheckForm";
import { useState } from "react";
import Input from "../GeneralComponents/Input";
import { tiposDocumentoRepository } from "../../../models/repository/Repositorys/tiposDocumentoRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { TipoContratacionRepository } from "../../../models/repository/Repositorys/tipoContratacionRepository";
import useFormValidationHiringTypePeriod from "../../../controllers/controllerHooks/Validations/useHiringTypeValidation";
import { updateTipoContratacion } from "../../../redux/hiringTypesSlice";

function ModificarTipoContratacion({
  tipoContratacion,
  handleCurrentView,
}: {
  tipoContratacion: TipoContratacion;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const tiposContratacionRepo = new TipoContratacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/tipoContratacion`
  );

  //Dispatch Redux
  const dispatch = useAppDispatch();

  // States para la busqueda y filtro
  const [checkbox, setCheckbox] = useState<boolean>(tipoContratacion.activo!);

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationHiringTypePeriod();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formTipoContratacion, setFormTipoContratacion] =
    useState<TipoContratacion>({
      id: tipoContratacion.id,
      nombre: tipoContratacion.nombre,
      cantidadMeses: tipoContratacion.cantidadMeses,
      activo: tipoContratacion.activo,
    });

  // handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setFormTipoContratacion((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // botones (cancelar, modificar)
  const handleCancel = (): void => {
    handleCurrentView(true);
  };
  async function modificarTipoContratacion() {
    const hiringType = {
      nombre: formTipoContratacion.nombre,
      cantidadMeses: String(formTipoContratacion.cantidadMeses),
      activo: formTipoContratacion.activo,
    };
    console.log(hiringType);
    if (validateForm(hiringType)) {
      try {
        const response = await tiposContratacionRepo.updateHiringType(
          formTipoContratacion
        );

        console.log("✅ TipoContratacion creado:", response);

        // Formateamos el usuario para Redux
        const PeriodoPagoParaRedux: TipoContratacion = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          cantidadMeses: response.cantidadMeses,
          activo: response.activo,
        };

        // Despachamos al store
        dispatch(updateTipoContratacion(PeriodoPagoParaRedux));
        console.log(
          "✅ TipoContratacion modificado en Redux:",
          PeriodoPagoParaRedux
        );

        setShowError(true);
        setTitleModalMessage("TipoContratacion modificado");
        setModalMessage(
          "TipoContratacion modificado con exito: " + response.nombre
        );
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

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formTipoContratacion.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() =>
          validateField("nombre", String(formTipoContratacion.nombre!))
        }
      />

      <Input
        title="Cantidad de meses"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={String(formTipoContratacion.cantidadMeses)}
        onChange={(value) => handleInputChange("cantidadMeses", value)}
        error={errors.cantidadMeses}
        onBlur={() =>
          validateField(
            "cantidadMeses",
            String(formTipoContratacion.cantidadMeses!)
          )
        }
      />
      <CheckForm
        text="Tipo de Contratacion Activa"
        checked={formTipoContratacion.activo}
        onChange={() =>
          setFormTipoContratacion((prev) => ({
            ...prev,
            ["activo"]: !formTipoContratacion.activo,
          }))
        }
      />
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          className="d-grid d-md-flex justify-content-md-end"
          style={{ padding: "10px", gap: "2rem" }}
        >
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={modificarTipoContratacion} />
          </div>
        </div>
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

export default ModificarTipoContratacion;
