import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import CheckForm from "../GeneralComponents/CheckForm";
import Input from "../GeneralComponents/Input";
import useFormValidationDetail from "../../../controllers/controllerHooks/Validations/useDetailsValidation";

function ModificarDetalleCobertura({
  detalle,
  handleCurrentView,
}: {
  detalle: Detalle;
  handleCurrentView: (pass: boolean) => void;
}) {
  const { errors, validateField, validateForm } = useFormValidationDetail();

  const [opcionMonto, setOpcionMonto] = useState<"porcentaje" | "fijo">(
    detalle.porcentaje_miles ? "porcentaje" : "fijo"
  );
  const [formDetail, setFormDetail] = useState<Detalle>({
    id: detalle.id,
    nombre: detalle.nombre,
    descripcion: detalle.descripcion,
    porcentaje_miles: detalle.porcentaje_miles,
    monto_fijo: detalle.monto_fijo,
    activo: detalle.activo,
  });

  const handleCancel = (): void => {
    handleCurrentView(true);
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
      <CheckForm
        text="Detalle activo"
        checked={formDetail.activo}
        onChange={() =>
          setFormDetail((prev) => ({
            ...prev,
            ["activo"]: !formDetail.activo,
          }))
        }
      />
      <div className="d-flex justify-content-end gap-3 mt-4">
        <GrayButton text="Cancelar" onClick={handleCancel} />
        <GrayButton text="Confirmar" onClick={() => {}} />
      </div>
    </div>
  );
}

export default ModificarDetalleCobertura;
