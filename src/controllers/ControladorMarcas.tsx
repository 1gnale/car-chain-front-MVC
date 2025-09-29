import { useEffect } from "react";
import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import useMarcasHook from "./controllerHooks/Fetchs/useMarcasHook";
import ManageMarcas from "../views/components/ManageBrands/ManageMarcas";
import MarcasPage from "../views/pages/MarcasPage";

const ControladorMarcas = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // Hook que trae todas las marcas
  const { loading, error } = useMarcasHook();
  // Mostrar loading mientras Auth0 inicializa
  if (isLoading || loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }
  return (
    <div>
      <MarcasPage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorMarcas;
