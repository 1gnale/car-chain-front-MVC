import GrayButton from "../GeneralComponents/Button";
import { useState } from "react";
import Input from "../GeneralComponents/Input";

function CrearTipoContratacion({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  const [formTipoContratacion, setFormTipoContratacion] =
    useState<TipoContratacion>({
      id: 0,
      nombre: "",
      cantidadMeses: 0,
    });
  const handleCancel = (): void => {
    handleCurrentView(false);
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

export default CrearTipoContratacion;
