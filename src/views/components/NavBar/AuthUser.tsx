import { useAuth0 } from "@auth0/auth0-react";

const AuthUser = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div className="navbar-nav ms-auto flex-column flex-lg-row">
      <button
        type="button"
        className="btn btn-link px-3 me-lg-2 mb-2 mb-lg-0"
        style={{ color: "white" }}
        onClick={() => loginWithRedirect()}
      >
        Iniciar Sesión
      </button>
      <button
        type="button"
        className="btn btn-primary me-lg-3 mb-2 mb-lg-0"
        style={{ backgroundColor: "black", borderColor: "white" }}
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup",
            },
          })
        }
      >
        Registrarse
      </button>
    </div>
  );
};

export default AuthUser;
