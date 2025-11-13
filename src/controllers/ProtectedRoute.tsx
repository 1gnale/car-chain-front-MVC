import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import ErrorPage from "../views/components/GeneralComponents/ErrorPage";
import useGetUserType from "./controllerHooks/Fetchs/useGetUserTypeHook";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";

type Role =
  | "ADMINISTRADOR"
  | "VENDEDOR"
  | "PERITO"
  | "GESTOR_DE_SINIESTROS"
  | "CLIENTE";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const email = user?.email ?? "";

  // No ejecutar el fetch hasta que Auth0 esté listo y haya email
  const shouldFetch = !authLoading && !!email;

  const { tipoUsuario, loading, error } = useGetUserType(
    shouldFetch ? email : ""
  );

  console.log({
    authLoading,
    isAuthenticated,
    email,
    shouldFetch,
    tipoUsuario,
  });

  // Esperar a que Auth0 esté listo y tengamos email
  if (authLoading || !shouldFetch) {
    return <Spinner />;
  }

  // Esperar a que termine el fetch
  if (loading) {
    return <Spinner />;
  }

  // Si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si hay error real del fetch
  if (error) {
    console.error("Error obteniendo tipoUsuario:", error);
    return <ErrorPage />;
  }

  // Si hay restricción de roles
  if (allowedRoles && allowedRoles.length > 0) {
    if (tipoUsuario && !allowedRoles.includes(tipoUsuario as Role)) {
      console.warn(
        `Acceso denegado. Rol: ${tipoUsuario}. Se requiere: ${allowedRoles.join(
          ", "
        )}`
      );

      if (tipoUsuario === "CLIENTE") {
        return <Navigate to="/" replace />;
      }
      return <Navigate to={`/${tipoUsuario.toLowerCase()}`} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
