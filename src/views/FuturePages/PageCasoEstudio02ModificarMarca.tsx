import GrayButton from "../components/GeneralComponents/Button";
import CheckForm from "../components/GeneralComponents/CheckForm";
import { useState } from "react";
// 1: La informacion que sale en const marca aparezca en cada textarea,select,checkbos, etc
// 2: Agregar un checkbox para saber si la marca esta inactivo o no.

function ModificarMarca({ marca }: { marca: Marca }) {
  const [checkbox, setCheckbox] = useState<boolean>(marca.activo!);
  const [nombre, setNombre] = useState<string>(marca.nombre!);
  const [descripcion, setDescripcion] = useState<string>(marca.descripcion!);
  return (
    <div className="container-fluid w-75">
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Descripción
        </label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <CheckForm
          title="Marca Activa"
          text=""
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
            paddingBottom: "20px",
          }}
        >
          <GrayButton text="Cancelar" onClick={() => {}} />
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

export default ModificarMarca;
