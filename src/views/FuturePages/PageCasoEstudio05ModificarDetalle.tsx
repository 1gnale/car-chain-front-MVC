import GrayButton from "../components/GeneralComponents/Button";

function ModificarDetalleCobertura() {
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
      <div className="d-flex align-items-center gap-2">
        <label className="me-2">Monto Asegurado</label>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="montoRadio"
            id="radioPrecio"
            defaultChecked 
          />
          <label className="form-check-label" htmlFor="radioPrecio">
            Precio del Vehículo
          </label>
        </div>

        <span className="mx-1">|</span>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="montoRadio"
            id="radioFijo"
          />
          <label className="form-check-label" htmlFor="radioFijo">
            Monto Fijo
          </label>
        </div>

        <input
          type="text"
          className="form-control ms-2"
          style={{ width: "170px" }}
        />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "110px" }}>
          Porcentaje En Miles
        </label>
                <input
          type="text"
          value={"%"}
          className="form-control ms-2"
          style={{ width: "200px" }}
        />
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

export default ModificarDetalleCobertura;
