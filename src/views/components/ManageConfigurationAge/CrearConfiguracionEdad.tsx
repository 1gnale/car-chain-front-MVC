import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import { ConfigEdadRepository } from "../../../models/repository/Repositorys/configEdadRepository";
import useFormValidationConfigEdad from "../../../controllers/controllerHooks/Validations/useConfigAgeValidation";
import Modal from "../GeneralComponents/Modal";
import { createConfigEdad } from "../../../redux/configEdadSlice";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";

export default function CrearConfiguracionEdad({
  handleCurrentView,
}: {
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

  // state para los checkbox
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >("ganancia");
  const [formConfigAge, setFormConfigAge] = useState<ConfigEdad>({
    id: 0,
    nombre: "",
    minima: 0,
    maxima: 0,
    descuento: 0,
    ganancia: 0,
    recargo: 0,
  });

  // botones  ( cancelar, crear)
  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  async function CrearConfigEdad() {
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
        const response = await configEdadRepo.createConfigAge(formConfigAge);

        console.log("✅ Configuracion Edad creado:", response);

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
        dispatch(createConfigEdad(ConfigEdadParaRedux));
        console.log(
          "✅ Configuracion Edad creado en Redux:",
          ConfigEdadParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Configuracion Edad creado");
        setModalMessage(
          "Configuracion Edad creado con exito: " + response.nombre
        );
        setMessageType("success");

        setFormConfigAge({
          id: 0,
          minima: 0,
          maxima: 0,
          descuento: 0,
          ganancia: 0,
          recargo: 0,
        });
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    } else {
    }
  }

  // Handles de los checkbox
  const handleGananciaCheckBox = (): void => {
    setOpcionConfig("ganancia");
    setFormConfigAge((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigAge((prev) => ({ ...prev, descuento: 0 }));
    //   validateField("porcentaje_miles" as keyof typeof errors, "0");
  };
  const handleDescuentoCheckBox = (): void => {
    setOpcionConfig("descuento");
    setFormConfigAge((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigAge((prev) => ({ ...prev, ganancia: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  const handleRecargoCheckBox = (): void => {
    setOpcionConfig("recargo");
    setFormConfigAge((prev) => ({ ...prev, ganancia: 0 }));
    setFormConfigAge((prev) => ({ ...prev, descuento: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  // HANDLE PARA RELLENAR FORMULARIO
  const handleInputChange = (field: string, value: string) => {
    setFormConfigAge((prev) => ({ ...prev, [field]: value }));
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
            <GrayButton text="Confirmar" onClick={CrearConfigEdad} />
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
