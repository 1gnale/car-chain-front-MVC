import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ControladorIndex = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;

    // Verificar si acabamos de autenticarnos (hay parámetros en la URL)
    const urlParams = new URLSearchParams(location.search);
    const hasAuthParams = urlParams.has('code') && urlParams.has('state');
    
    if (hasAuthParams) {
      // Limpiar la URL primero
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Verificar qué acción realizó el usuario
      const authAction = localStorage.getItem("auth_action");
      const userKey = `user_welcomed_${user.sub}`;
      const hasBeenWelcomed = localStorage.getItem(userKey);
      
      // Si es signup o es la primera vez de este usuario, ir a bienvenida
      if (authAction === "signup" || !hasBeenWelcomed) {
        localStorage.setItem(userKey, "true");
        localStorage.removeItem("auth_action"); // Limpiar la acción
        
        // Redirigir a bienvenida
        setTimeout(() => {
          navigate("/bienvenida", { replace: true });
        }, 100);
      } else {
        // Es login de usuario existente, limpiar la acción
        localStorage.removeItem("auth_action");
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, location]);

  // Mostrar loading mientras Auth0 inicializa
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <HomePage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorIndex;
