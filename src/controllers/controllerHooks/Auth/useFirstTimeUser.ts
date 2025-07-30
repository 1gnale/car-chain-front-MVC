import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FirstTimeUserOptions {
  redirectTo?: string;
  enabled?: boolean;
}

const useFirstTimeUser = (options: FirstTimeUserOptions = {}) => {
  const { 
    redirectTo = "/bienvenida", 
    enabled = true 
  } = options;
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (!enabled || isLoading || !isAuthenticated || !user) {
      return;
    }

    const checkFirstTimeUser = async () => {
      // Clave única para el localStorage basada en el sub del usuario
      const userKey = `user_visited_${user.sub}`;
      const hasVisited = localStorage.getItem(userKey);

      if (!hasVisited) {
        // Es la primera vez que este usuario visita la aplicación
        setIsFirstTimeUser(true);
        
        // Marcar como visitado
        localStorage.setItem(userKey, "true");
        
        // Opcional: También podemos usar la fecha de creación de Auth0
        // La propiedad 'updated_at' vs 'created_at' puede indicar si es nuevo
        const createdAt = new Date(user.updated_at || '');
        const now = new Date();
        const timeDiff = now.getTime() - createdAt.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        // Si la cuenta fue creada hace menos de 5 minutos, probablemente es nueva
        const isRecentlyCreated = minutesDiff < 5;
        
        if (isRecentlyCreated) {
          // Redirigir después de un pequeño delay para asegurar que el estado se estabilice
          setTimeout(() => {
            navigate(redirectTo, { replace: true });
          }, 500);
        }
      } else {
        setIsFirstTimeUser(false);
      }
    };

    checkFirstTimeUser();
  }, [user, isAuthenticated, isLoading, enabled, redirectTo, navigate]);

  return {
    isFirstTimeUser,
    markAsReturningUser: () => {
      if (user?.sub) {
        localStorage.setItem(`user_visited_${user.sub}`, "true");
        setIsFirstTimeUser(false);
      }
    }
  };
};

export default useFirstTimeUser;
