import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import useFormValidationConfigEdad from "../../../controllers/controllerHooks/Validations/useConfigAgeValidation";
import { ConfigEdadRepository } from "../../../models/repository/Repositorys/configEdadRepository";
import { updateConfigEdad } from "../../../redux/configEdadSlice";
import Modal from "../GeneralComponents/Modal";

export default function ModificarConfiguracionEdad({
  configEdad,
  handleCurrentView,
}: {
  configEdad: ConfigEdad;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configEdadRepo = new ConfigEdadRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionEdad`
  );

  // validacion
  const { errors, validateField, validateForm } = useFormValidationConfigEdad();

  //Dispatch Redux
  const dispatch = useAppDispatch();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  //const { errors, validateField, validateForm } = useFormValidationConfig();
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >("ganancia");

  // formulario
  const [formConfigAge, setformConfigAge] = useState<ConfigEdad>({
    id: configEdad.id,
    nombre: configEdad.nombre,
    minima: configEdad.minima,
    maxima: configEdad.maxima,
    descuento: configEdad.descuento,
    ganancia: configEdad.ganancia,
    recargo: configEdad.recargo,
    activo: configEdad.activo,
  });

  // botones cancelar y modificar
  const handleCancel = (): void => {
    handleCurrentView(true);
  };
  async function ModificarConfigEdad() {
    const ConfigAge = {
      nombre: formConfigAge.nombre,
      minima: String(formConfigAge.minima),
      maxima: String(formConfigAge.maxima),
      descuento: String(formConfigAge.descuento),
      ganancia: String(formConfigAge.ganancia),
      recargo: String(formConfigAge.recargo),
    };
    console.log(ConfigAge);
    if (validateForm(ConfigAge)) {
      try {
        const response = await configEdadRepo.updateConfigAge(formConfigAge);

        console.log("✅ Configuracion Edad modificado:", response);

        // Formateamos el usuario para Redux
        const ConfigEdadParaRedux: ConfigEdad = {
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
        dispatch(updateConfigEdad(ConfigEdadParaRedux));
        console.log(
          "✅ Configuracion Edad modificado en Redux:",
          ConfigEdadParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Configuracion Edad modificado");
        setModalMessage(
          "Configuracion Edad modificado con exito: " + response.nombre
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

  // handles de los checkbox
  const handleGananciaCheckBox = (): void => {
    setOpcionConfig("ganancia");
    setformConfigAge((prev) => ({ ...prev, recargo: 0 }));
    setformConfigAge((prev) => ({ ...prev, descuento: 0 }));
    //   validateField("porcentaje_miles" as keyof typeof errors, "0");
  };
  const handleDescuentoCheckBox = (): void => {
    setOpcionConfig("descuento");
    setformConfigAge((prev) => ({ ...prev, recargo: 0 }));
    setformConfigAge((prev) => ({ ...prev, ganancia: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  const handleRecargoCheckBox = (): void => {
    setOpcionConfig("recargo");
    setformConfigAge((prev) => ({ ...prev, ganancia: 0 }));
    setformConfigAge((prev) => ({ ...prev, descuento: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  //handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setformConfigAge((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formConfigAge.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", String(formConfigAge.nombre!))}
      />

      <div className="row h-100">
        {/* Mitad izquierda */}
        <div className="col-6 d-flex flex-column ">
          <Input
            title="Edad minima"
            labelStyle={{ width: "100px" }}
            classNameDiv="d-flex align-items-start mb-3"
            rows={5}
            place=""
            value={String(formConfigAge.minima)}
            onChange={(value) => handleInputChange("minima", value)}
            error={errors.minima}
            onBlur={() =>
              validateField("minima", String(formConfigAge.minima!))
            }
          />
          <Input
            title="Edad maxima"
            labelStyle={{ width: "100px" }}
            classNameDiv="d-flex align-items-start mb-3"
            rows={5}
            place=""
            value={String(formConfigAge.maxima)}
            onChange={(value) => handleInputChange("maxima", value)}
            error={errors.maxima}
            onBlur={() =>
              validateField("maxima", String(formConfigAge.maxima!))
            }
          />
          <CheckForm
            text="ConfigEdad activo"
            checked={formConfigAge.activo}
            onChange={() =>
              setformConfigAge((prev) => ({
                ...prev,
                ["activo"]: !formConfigAge.activo,
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
                value={String(formConfigAge.ganancia)}
                disabled={opcionConfig !== "ganancia"}
                onChange={(value) => handleInputChange("ganancia", value)}
                error={errors.ganancia}
                onBlur={() =>
                  validateField("ganancia", String(formConfigAge.ganancia!))
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
                value={String(formConfigAge.descuento)}
                disabled={opcionConfig !== "descuento"}
                onChange={(value) => handleInputChange("descuento", value)}
                error={errors.descuento}
                onBlur={() =>
                  validateField("descuento", String(formConfigAge.descuento!))
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
                value={String(formConfigAge.recargo)}
                disabled={opcionConfig !== "recargo"}
                onChange={(value) => handleInputChange("recargo", value)}
                error={errors.recargo}
                onBlur={() =>
                  validateField("recargo", String(formConfigAge.recargo!))
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
