import GrayButton from "../components/GeneralComponents/Button";
import Input from "../components/GeneralComponents/Input";

function CrearMarca() {
  return (
    <div className="container-fluid w-75">
<Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value=""
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value=""
        as = "textarea"
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
          <GrayButton text="Cancelar" />
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default CrearMarca;
