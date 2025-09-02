import GrayButton from "../components/GeneralComponents/Button";
function InicioSesion() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="card" style={{ width: "350px" }}>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="mostrarPassword"
            />
            <label className="form-check-label" htmlFor="mostrarPassword">
              Mostrar Contraseña
            </label>
          </div>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-secondary w-50">Iniciar Sesión</button>
            <button className="btn btn-secondary w-50">Google</button>
          </div>
        </div>

        <div className="card-footer text-center">
          ¿No tienes cuenta? <a href="#">Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default InicioSesion;
