import GrayButton from "../components/GeneralComponents/Button";
import CheckForm from "../components/GeneralComponents/CheckForm";
import { useState } from "react";
import Input from "../components/GeneralComponents/Input";
// 1: La informacion que sale en const marca aparezca en cada textarea,select,checkbos, etc
// 2: Agregar un checkbox para saber si la marca esta inactivo o no.

function ModificarMarca({ marca,handleCurrentView }: { marca: Marca; handleCurrentView: (pass: boolean) => void; }) {
  const [checkbox, setCheckbox] = useState<boolean>(marca.activo!);
  const [nombre, setNombre] = useState<string>(marca.nombre!);
  const [descripcion, setDescripcion] = useState<string>(marca.descripcion!);
    const [formMarca, setFormMarca] = useState<Marca>({
    id: marca.id,
    nombre: marca.nombre,
    descripcion: marca.descripcion,
    activo: marca.activo,
  });
    const handleCancel = (): void => {
    handleCurrentView(true);
  };
  return (
    <div className="container-fluid w-75">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formMarca.nombre}
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formMarca.descripcion}
        as = "textarea"
      />
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <CheckForm
          text="Marca Activa"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
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

export default ModificarMarca;
