import GrayButton from "../components/GeneralComponents/Button";

export default function CrearConfiguracionEdad() {
  return (
<div className="container mt-4">
  {/* Formulario */}
  <form className="border rounded p-4 shadow-sm" style={{ backgroundColor: "#f4f6f9" }}>
    
    <div className="row mb-3">
      <label className="col-sm-2 col-form-label">Nombre</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" />
      </div>
    </div>

    <div className="row mb-3">
      <label className="col-sm-2 col-form-label">Edad Máxima</label>
      <div className="col-sm-4">
        <input type="number" className="form-control" />
      </div>

      <div className="col-sm-2 d-flex align-items-center">
        <input
          type="radio"
          name="tipo"
          id="ganancia"
          className="form-check-input me-2"
        />
        <label htmlFor="ganancia" className="form-check-label">
          Ganancia
        </label>
      </div>

      <div className="col-sm-4">
        <input type="number" className="form-control" />
      </div>
    </div>

    <div className="row mb-3">
      <label className="col-sm-2 col-form-label">Edad Mínima</label>
      <div className="col-sm-4">
        <input type="number" className="form-control" />
      </div>

      <div className="col-sm-2 d-flex align-items-center">
        <input
          type="radio"
          name="tipo"
          id="descuento"
          className="form-check-input me-2"
        />
        <label htmlFor="descuento" className="form-check-label">
          Descuento
        </label>
      </div>

      <div className="col-sm-4">
        <input type="number" className="form-control" />
      </div>
    </div>

    {/* Recargo en su propia fila */}
    <div className="row mb-5">
      <label className="col-sm-6 col-form-label"></label>
      <div className="col-sm-2 d-flex align-items-center">
        <input
          type="radio"
          name="tipo"
          id="recargo"
          className="form-check-input me-2"
        />
        <label htmlFor="recargo" className="form-check-label">
          Recargo
        </label>
      </div>
      <div className="col-sm-4">
        <input type="number" className="form-control" />
      </div>
    </div>

    {/* Botones */}
    <div className="d-flex justify-content-end gap-2">
      <GrayButton text="Cancelar" />
      <GrayButton text="Confirmar" />
    </div>
  </form>
</div>


  );
}

