import { useAuth0 } from "@auth0/auth0-react";

const AuthUser = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div className="navbar-nav ms-auto">
      <button
        type="button"
        className="btn btn-link px-3 me-2"
        style={{ color: "white" }}
        onClick={() => loginWithRedirect()}
      >
        Iniciar Sesión
      </button>
      <button
        type="button"
        className="btn btn-primary me-3"
        style={{ backgroundColor: "black", borderColor: "white" }}
        onClick={() => logout()}
      >
        Registrarse
      </button>
    </div>
  );
};

export default AuthUser;
