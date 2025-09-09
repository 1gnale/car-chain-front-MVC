import { useState } from "react";
import GrayButton from "../components/GeneralComponents/Button";
import useFormValidationPayementPeriod from "../../controllers/controllerHooks/Validations/usePayementPeriodsValidation";
import Input from "../components/GeneralComponents/Input";

function PageCasoUso15CrearPeriodo({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  const { errors, validateField, validateForm } =
    useFormValidationPayementPeriod();

  const [formPayementPeriod, setFormPayementPeriod] = useState<PeriodoPago>({
    id: 1,
    nombre: "",
    cantidadMeses: 0,
    descuento: 0,
  });

  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormPayementPeriod((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
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
        <GrayButton text="Confirmar" onClick={() => {}} />
      </div>
    </div>
  );
}

export default PageCasoUso15CrearPeriodo;
