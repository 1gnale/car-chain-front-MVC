import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";

export default function ModificarConfiguracionEdad({
  configEdad,
  handleCurrentView,
}: {
  configEdad: ConfigEdad;
  handleCurrentView: (pass: boolean) => void;
}) {
  //const { errors, validateField, validateForm } = useFormValidationConfigAntiquity();
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >("ganancia");
  const [formConfigAntiquity, setFormConfigAntiquity] = useState<ConfigEdad>({
    id: configEdad.id,
    nombre: configEdad.nombre,
    minima: configEdad.minima,
    maxima: configEdad.maxima,
    descuento: configEdad.descuento,
    ganancia: configEdad.ganancia,
    recargo: configEdad.recargo,
    activo: configEdad.activo,
  });

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

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

  const handleInputChange = (field: string, value: string) => {
    setFormConfigAntiquity((prev) => ({ ...prev, [field]: value }));
    // validateField(field as keyof typeof errors, value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formConfigAntiquity.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
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
            value={String(formConfigAntiquity.minima)}
            onChange={(value) => handleInputChange("minima", value)}
          />
          <Input
            title="Edad maxima"
            labelStyle={{ width: "100px" }}
            classNameDiv="d-flex align-items-start mb-3"
            rows={5}
            place=""
            value={String(formConfigAntiquity.maxima)}
            onChange={(value) => handleInputChange("maxima", value)}
          />
          <CheckForm
            text="ConfigEdad activo"
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
              />
            </div>
          </div>
          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
