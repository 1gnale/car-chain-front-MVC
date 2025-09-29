import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { ConfigAntiguedadRepository } from "../../../models/repository/Repositorys/configAntiguedadRepository";
import useFormValidationConfigAntiguedad from "../../../controllers/controllerHooks/Validations/useConfigAntiquityValidation";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { updateConfigAntiguedad } from "../../../redux/configAntiguedadSlice";

export default function ModificarConfiguracionAntiguedad({
  configAntiguedad,
  handleCurrentView,
}: {
  configAntiguedad: ConfigAntiguedad;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configAntiguedadRepo = new ConfigAntiguedadRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionAntiguedad`
  );

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationConfigAntiguedad();

  //Dispatch Redux
  const dispatch = useAppDispatch();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // state para los checkbox
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >("ganancia");

  // formularios
  const [formConfigAntiquity, setFormConfigAntiquity] =
    useState<ConfigAntiguedad>({
      id: configAntiguedad.id,
      nombre: configAntiguedad.nombre,
      minima: configAntiguedad.minima,
      maxima: configAntiguedad.maxima,
      descuento: configAntiguedad.descuento,
      ganancia: configAntiguedad.ganancia,
      recargo: configAntiguedad.recargo,
      activo: configAntiguedad.activo,
    });

  // Handle de los checkbox
  const handleGananciaCheckBox = (): void => {
    setOpcionConfig("ganancia");
    setFormConfigAntiquity((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigAntiquity((prev) => ({ ...prev, descuento: 0 }));
    //   validateField("porcentaje_miles" as keyof typeof errors, "0");
  };
  const handleDescuentoCheckBox = (): void => {
    setOpcionConfig("descuento");
    setFormConfigAntiquity((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigAntiquity((prev) => ({ ...prev, ganancia: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  const handleRecargoCheckBox = (): void => {
    setOpcionConfig("recargo");
    setFormConfigAntiquity((prev) => ({ ...prev, ganancia: 0 }));
    setFormConfigAntiquity((prev) => ({ ...prev, descuento: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  // handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setFormConfigAntiquity((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // Botones cancelar y modificar
  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  async function ModificarConfigEdad() {
    const ConfigAge = {
      nombre: formConfigAntiquity.nombre,
      minima: String(formConfigAntiquity.minima),
      maxima: String(formConfigAntiquity.maxima),
      descuento: String(formConfigAntiquity.descuento),
      ganancia: String(formConfigAntiquity.ganancia),
      recargo: String(formConfigAntiquity.recargo),
    };
    console.log(ConfigAge);
    if (validateForm(ConfigAge)) {
      try {
        const response = await configAntiguedadRepo.updateConfigAntiquity(
          formConfigAntiquity
        );

        console.log("✅ Configuracion Antiguedad modificado:", response);

        // Formateamos el usuario para Redux
        const ConfigAntiguedadParaRedux: ConfigAntiguedad = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          minima: response.minima,
          maxima: response.maxima,
          descuento: response.descuento,
          ganancia: response.ganancia,
          recargo: response.recargo,
        };

        // Despachamos al store
        dispatch(updateConfigAntiguedad(ConfigAntiguedadParaRedux));
        console.log(
          "✅ Configuracion Antiguedad modificado en Redux:",
          ConfigAntiguedadParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Configuracion Antiguedad modificado");
        setModalMessage(
          "Configuracion Antiguedad modificado con exito: " + response.nombre
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
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formConfigAntiquity.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() =>
          validateField("nombre", String(formConfigAntiquity.nombre!))
        }
      />

      <div className="row h-100">
        {/* Mitad izquierda */}
        <div className="col-6 d-flex flex-column ">
          <Input
            title="Antiguedad minima"
            labelStyle={{ width: "100px" }}
            classNameDiv="d-flex align-items-start mb-3"
            rows={5}
            place=""
            value={String(formConfigAntiquity.minima)}
            onChange={(value) => handleInputChange("minima", value)}
            error={errors.minima}
            onBlur={() =>
              validateField("minima", String(formConfigAntiquity.minima!))
            }
          />
          <Input
            title="Antiguedad maxima"
            labelStyle={{ width: "100px" }}
            classNameDiv="d-flex align-items-start mb-3"
            rows={5}
            place=""
            value={String(formConfigAntiquity.maxima)}
            onChange={(value) => handleInputChange("maxima", value)}
            error={errors.maxima}
            onBlur={() =>
              validateField("maxima", String(formConfigAntiquity.maxima!))
            }
          />
          <CheckForm
            text="ConfigAntiguedad activo"
            checked={formConfigAntiquity.activo}
            onChange={() =>
              setFormConfigAntiquity((prev) => ({
                ...prev,
                ["activo"]: !formConfigAntiquity.activo,
              }))
            }
          />
        </div>

        {/* Mitad derecha */}
        <div className="col-6">
          {/* Ganancia */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioGanancia"
                checked={opcionConfig === "ganancia"}
                onChange={handleGananciaCheckBox}
              />
              <label htmlFor="radioGanancia" className="form-check-label mb-0">
                Ganancia
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigAntiquity.ganancia)}
                disabled={opcionConfig !== "ganancia"}
                onChange={(value) => handleInputChange("ganancia", value)}
                error={errors.ganancia}
                onBlur={() =>
                  validateField(
                    "ganancia",
                    String(formConfigAntiquity.ganancia!)
                  )
                }
              />
            </div>
          </div>

          {/* Descuento */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioDescuento"
                checked={opcionConfig === "descuento"}
                onChange={handleDescuentoCheckBox}
              />
              <label htmlFor="radioDescuento" className="form-check-label mb-0">
                Descuento
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigAntiquity.descuento)}
                disabled={opcionConfig !== "descuento"}
                onChange={(value) => handleInputChange("descuento", value)}
                error={errors.descuento}
                onBlur={() =>
                  validateField(
                    "descuento",
                    String(formConfigAntiquity.descuento!)
                  )
                }
              />
            </div>
          </div>

          {/* Recargo */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioRecargo"
                checked={opcionConfig === "recargo"}
                onChange={handleRecargoCheckBox}
              />
              <label htmlFor="radioRecargo" className="form-check-label mb-0">
                Recargo
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigAntiquity.recargo)}
                disabled={opcionConfig !== "recargo"}
                onChange={(value) => handleInputChange("recargo", value)}
                error={errors.recargo}
                onBlur={() =>
                  validateField("recargo", String(formConfigAntiquity.recargo!))
                }
              />
            </div>
          </div>
          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={ModificarConfigEdad} />
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
