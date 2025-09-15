import GrayButton from "../GeneralComponents/Button";
import CheckForm from "../GeneralComponents/CheckForm";
import { useState } from "react";
import Input from "../GeneralComponents/Input";

function ModificarTipoContratacion({
  tipoContratacion,
  handleCurrentView,
}: {
  tipoContratacion: TipoContratacion;
  handleCurrentView: (pass: boolean) => void;
}) {
  const [checkbox, setCheckbox] = useState<boolean>(tipoContratacion.activo!);

  const [formTipoContratacion, setFormTipoContratacion] =
    useState<TipoContratacion>({
      id: tipoContratacion.id,
      nombre: tipoContratacion.nombre,
      cantidadMeses: tipoContratacion.cantidadMeses,
      activo: tipoContratacion.activo,
    });
  const handleCancel = (): void => {
    handleCurrentView(true);
  };
  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formTipoContratacion.nombre}
      />

      <Input
        title="Cantidad de meses"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={String(formTipoContratacion.cantidadMeses)}
      />
      <CheckForm
        text="Tipo de Contratacion Activa"
        checked={checkbox}
        onChange={() => setCheckbox(!checkbox)}
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
            <GrayButton text="Confirmar" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModificarTipoContratacion;
