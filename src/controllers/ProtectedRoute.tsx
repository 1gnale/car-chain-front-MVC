import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Mostrar loading mientras Auth0 verifica la autenticación
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
