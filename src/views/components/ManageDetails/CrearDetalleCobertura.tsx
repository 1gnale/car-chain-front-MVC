import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import useFormValidationDetail from "../../../controllers/controllerHooks/Validations/useDetailsValidation";
import Input from "../GeneralComponents/Input";
import { DetallesRepository } from "../../../models/repository/Repositorys/detallesRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { createDetail } from "../../../redux/detallesSlice";
function CrearDetalleCobertura({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const detalleRepo = new DetallesRepository(
    `${import.meta.env.VITE_BASEURL}/api/detalle`
  );
  const dispatch = useAppDispatch();

  // Hook para las validaaciones
  const { errors, validateField, validateForm } = useFormValidationDetail();

  // states de los checkbox
  const [opcionMonto, setOpcionMonto] = useState<"porcentaje" | "fijo">(
    "porcentaje"
  );

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formDetail, setFormDetail] = useState<Detalle>({
    id: 1,
    nombre: "",
    descripcion: "",
    porcentaje_miles: 0,
    monto_fijo: 0,
  });

  //Handle checkboxs
  const handleMontoFijoCheckBox = (): void => {
    setOpcionMonto("fijo");
    setFormDetail((prev) => ({ ...prev, porcentaje_miles: 0 }));
    validateField("porcentaje_miles" as keyof typeof errors, "0");
  };
  const handlePrecioVehiculoCheckBox = (): void => {
    setOpcionMonto("porcentaje");
    setFormDetail((prev) => ({ ...prev, monto_fijo: 0 }));
    validateField("monto_fijo" as keyof typeof errors, "0");
  };

  // Handle para rellenar formulario
  const handleInputChange = (field: string, value: string) => {
    setFormDetail((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // Handle botones (Crear y cancelar)
  async function crearDetalle() {
    const detail = {
      nombre: formDetail.nombre,
      descripcion: formDetail.descripcion,
      monto_fijo: String(formDetail.monto_fijo),
      porcentaje_miles: String(formDetail.porcentaje_miles),
    };
    console.log(detail);
    if (validateForm(detail)) {
      try {
        const response = await detalleRepo.createDetail(formDetail);

        console.log("✅ Detalle creado:", response);

        // Formateamos el usuario para Redux
        const detalleParaRedux: Detalle = {
          ...response,
          nombre: response.nombre,
          descripcion: response.descripcion,
          monto_fijo: response.monto_fijo,
          porcentaje_miles: response.porcentaje_miles,
        };

        // Despachamos al store
        dispatch(createDetail(detalleParaRedux));
        console.log("✅ Detalle creado en Redux:", detalleParaRedux);
        setShowError(true);
        setTitleModalMessage("Detalle creado");
        setModalMessage("Detalle creado con exito: " + response.nombre);
        setMessageType("success");

        setFormDetail({ id: 0, porcentaje_miles: 0, monto_fijo: 0 });
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
        value={formDetail.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", formDetail.nombre!)}
      />

      <Input
        title="Descripcion"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        as="textarea"
        rows={5}
        place=""
        value={formDetail.descripcion}
        onChange={(value) => handleInputChange("descripcion", value)}
        error={errors.descripcion}
        onBlur={() => validateField("descripcion", formDetail.descripcion!)}
      />
      <div className="d-flex align-items-center gap-2">
        <label className="me-2">Monto Asegurado</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="montoRadio"
            id="radioPrecio"
            checked={opcionMonto === "porcentaje"}
            onChange={handlePrecioVehiculoCheckBox}
          />
          <label className="form-check-label" htmlFor="radioPrecio">
            Precio del Vehículo
          </label>
        </div>

        <span className="mx-1">|</span>

        <div className="form-check form-check-inline d-flex align-items-center gap-2">
          <input
            className="form-check-input"
            type="radio"
            name="montoRadio"
            id="radioFijo"
            checked={opcionMonto === "fijo"}
            onChange={handleMontoFijoCheckBox}
          />

          <label htmlFor="radioFijo" className="form-check-label me-2">
            Monto Fijo
          </label>

          <Input
            title=""
            place=""
            asLabel="none"
            classNameDiv="mb-0"
            inputStyle={{ width: "170px" }}
            value={String(formDetail.monto_fijo)}
            disabled={opcionMonto === "porcentaje"}
            onChange={(value) => handleInputChange("monto_fijo", value)}
            error={errors.monto_fijo}
            onBlur={() =>
              validateField("monto_fijo", String(formDetail.monto_fijo!))
            }
          />
        </div>
      </div>

      <Input
        title="Porcentaje En Miles"
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        inputStyle={{ width: "110px" }}
        value={String(formDetail.porcentaje_miles)}
        disabled={opcionMonto === "fijo"}
        onChange={(value) => handleInputChange("porcentaje_miles", value)}
        error={errors.porcentaje_miles}
        onBlur={() =>
          validateField(
            "porcentaje_miles",
            String(formDetail.porcentaje_miles!)
          )
        }
      />

      <div className="d-flex justify-content-end gap-3 mt-4">
        <GrayButton text="Cancelar" onClick={handleCancel} />
        <GrayButton text="Confirmar" onClick={crearDetalle} />
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

export default CrearDetalleCobertura;
