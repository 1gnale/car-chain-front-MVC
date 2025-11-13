import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import useGetUserType from "./controllerHooks/Fetchs/useGetUserTypeHook";

const RedirectByRole = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth0();
  const email = user?.email ?? "";
  const shouldFetch = !authLoading && !!email;

  const { tipoUsuario, loading, error } = useGetUserType(
    shouldFetch ? email : "mailfalso@gmail.com"
  );

  if (authLoading || (shouldFetch && loading)) {
    return <Spinner />;
  }

  if (error) {
    console.error("Error obteniendo tipoUsuario:", error);
    return children; // si hay error, mostramos el home igual
  }

  // Si no está logueado, mostrar el contenido normal (home)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Si es CLIENTE, quedarse en el home "/"
  if (tipoUsuario === "CLIENTE") {
    return <>{children}</>;
  }

  // Si tiene otro rol, redirigir al dashboard correspondiente
  if (tipoUsuario) {
    return <Navigate to={`/${tipoUsuario.toLowerCase()}`} replace />;
  }

  // fallback mientras carga
  return <Spinner />;
};

export default RedirectByRole;
