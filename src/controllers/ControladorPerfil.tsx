import Navbar from "../views/components/NavBar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import usePolicesHook from "./controllerHooks/Fetchs/usePolicesHook";
import useLineaCotizacion from "./controllerHooks/Fetchs/useCotizacion";
import PerfilPage from "../views/pages/AccountData";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
const ControladorPerfil = () => {
  const { isAuthenticated, user } = useAuth0();

  const { loading: loadingPolice, error: errorPolice } = usePolicesHook({mail: (user?.email) || ""});

  const { loading: loadingLinePriciring, error: errorLinePriciring } = useLineaCotizacion({mail: (user?.email) || ""});

  // Hook que trae todas las versiones
  if (loadingPolice || loadingLinePriciring) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (errorPolice || errorLinePriciring) {
    return <div>Error: ha ocurrido un error inesperado</div>;
  }

  return (
    <>
      <Navbar isAuth={isAuthenticated} />
      <PerfilPage />
    </>
  );
};

export default ControladorPerfil;
