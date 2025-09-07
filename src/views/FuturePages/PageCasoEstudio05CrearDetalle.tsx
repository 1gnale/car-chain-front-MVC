import { useState } from "react";
import GrayButton from "../components/GeneralComponents/Button";
import useFormValidationDetail from "../../controllers/controllerHooks/Validations/useDetailsValidation";
import Input from "../components/GeneralComponents/Input";

function CrearDetalleCobertura({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  const [opcionMonto, setOpcionMonto] = useState<"porcentaje" | "fijo">(
    "porcentaje"
  );
  const { errors, validateField, validateForm } = useFormValidationDetail();

  const [formDetail, setFormDetail] = useState<Detalle>({
    id: 1,
    nombre: "",
    descripcion: "",
    porcentaje_miles: 0,
    monto_fijo: 0,
  });

  const handleCancel = (): void => {
    handleCurrentView(false);
  };
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
  const handleInputChange = (field: string, value: string) => {
    setFormDetail((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };
  return (
    <div className="container-fluid w-75">
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

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
            paddingBottom: "20px",
          }}
        >
          <GrayButton text="Cancelar" onClick={handleCancel} />
        </div>
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
          }}
        >
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default CrearDetalleCobertura;
