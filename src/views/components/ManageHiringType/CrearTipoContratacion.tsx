import GrayButton from "../GeneralComponents/Button";
import { useState } from "react";
import Input from "../GeneralComponents/Input";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { TipoContratacionRepository } from "../../../models/repository/Repositorys/tipoContratacionRepository";
import useFormValidationHiringTypePeriod from "../../../controllers/controllerHooks/Validations/useHiringTypeValidation";
import { createHiringType } from "../../../redux/hiringTypesSlice";

function CrearTipoContratacion({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const tiposContratacionRepo = new TipoContratacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/tipoContratacion`
  );

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationHiringTypePeriod();

  //Dispatch Redux
  const dispatch = useAppDispatch();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formTipoContratacion, setFormTipoContratacion] =
    useState<TipoContratacion>({
      id: 0,
      nombre: "",
      cantidadMeses: 0,
    });

  // handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setFormTipoContratacion((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // botones (crear y cancelar)
  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  async function CrearTipoContratacion() {
    const hiringType = {
      nombre: formTipoContratacion.nombre,
      cantidadMeses: String(formTipoContratacion.cantidadMeses),
    };
    console.log(hiringType);
    if (validateForm(hiringType)) {
      try {
        const response = await tiposContratacionRepo.createHiringType(
          formTipoContratacion
        );

        console.log("✅ Tipo de contratacion creado:", response);

        // Formateamos el usuario para Redux
        const TipoContratacionParaRedux: TipoContratacion = {
          ...response,
          nombre: response.nombre,
          cantidadMeses: response.cantidadMeses,
        };

        // Despachamos al store
        dispatch(createHiringType(TipoContratacionParaRedux));
        console.log(
          "✅ Tipo de contratacion creado en Redux:",
          TipoContratacionParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Tipo de contratacion creado");
        setModalMessage(
          "Tipo de contratacion creado con exito: " + response.nombre
        );
        setMessageType("success");

        setFormTipoContratacion({ id: 0, cantidadMeses: 0 });
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
            <GrayButton text="Confirmar" onClick={CrearTipoContratacion} />
          </div>
        </div>
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

export default CrearTipoContratacion;
