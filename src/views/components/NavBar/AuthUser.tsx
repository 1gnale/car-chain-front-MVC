const AuthUser = () => {
    return (
        <div className="navbar-nav ms-auto">
            <button
              type="button"
              className="btn btn-link px-3 me-2"
              style={{ color: "white" }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className="btn btn-primary me-3"
              style={{ backgroundColor: "black", borderColor: "white" }}
            >
              Registrarse
            </button>
          </div>
    )
}

export default AuthUser;