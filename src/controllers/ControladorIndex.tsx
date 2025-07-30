import { useEffect } from "react";
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";

const ControladorIndex = () => {
  const { isAuthenticated, isLoading } = useAuth0();

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
