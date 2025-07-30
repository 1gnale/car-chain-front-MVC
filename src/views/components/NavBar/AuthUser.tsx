import { useAuth0 } from "@auth0/auth0-react";

const AuthUser = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    // Marcar en localStorage que es un login (no registro)
    localStorage.setItem("auth_action", "login");
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login"
      }
    });
  };

  const handleSignUp = () => {
    // Marcar en localStorage que es un registro
    localStorage.setItem("auth_action", "signup");
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup"
      }
    });
  };

  return (
    <div className="navbar-nav ms-auto">
      <button
        type="button"
        className="btn btn-link px-3 me-2"
        style={{ color: "white" }}
        onClick={handleLogin}
      >
        Iniciar Sesión
      </button>
      <button
        type="button"
        className="btn btn-primary me-3"
        style={{ backgroundColor: "black", borderColor: "white" }}
        onClick={handleSignUp}
      >
        Registrarse
      </button>
    </div>
  );
};

export default AuthUser;
