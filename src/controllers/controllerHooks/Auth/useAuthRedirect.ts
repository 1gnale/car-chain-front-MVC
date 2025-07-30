import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseAuthRedirectOptions {
  redirectTo?: string;
  enableWelcomeRedirect?: boolean;
}

const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const { 
    redirectTo = "/bienvenida", 
    enableWelcomeRedirect = true 
  } = options;
  
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading || !enableWelcomeRedirect) return;

    if (isAuthenticated && user) {
      // Verificar si venimos de una redirección de Auth0
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      
      // Si hay parámetros de Auth0, significa que acabamos de autenticarnos
      if (code && state) {
        const userKey = `user_welcomed_${user.sub}`;
        const hasBeenWelcomed = localStorage.getItem(userKey);
        
        if (!hasBeenWelcomed) {
          // Marcar como bienvenido y redirigir
          localStorage.setItem(userKey, "true");
          
          // Limpiar la URL y redirigir a bienvenida
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate(redirectTo, { replace: true });
        }
      }
    }
  }, [isAuthenticated, isLoading, user, location, navigate, redirectTo, enableWelcomeRedirect]);

  return {
    isReady: !isLoading,
    isAuthenticated,
    user
  };
};

export default useAuthRedirect;
