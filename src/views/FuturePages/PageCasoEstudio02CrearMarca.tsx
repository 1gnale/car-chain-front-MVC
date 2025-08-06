import GrayButton from "../components/GeneralComponents/Button";

function CrearMarca() {
  return (
    <div className="container-fluid w-75">
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Nombre
        </label>
        <input type="text" className="form-control" />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Descripción
        </label>
        <textarea className="form-control" rows={4} />
      </div>
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

export default CrearMarca;
