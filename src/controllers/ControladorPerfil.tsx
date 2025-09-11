import AccountData from "../views/pages/AccountData";
import BreadCrumbNav from "../views/components/GeneralComponents/BreadCrumbNav";
import TitleSection from "../views/components/GeneralComponents/TitleSection";
import Navbar from "../views/components/NavBar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import usePolicesHook from "./controllerHooks/Fetchs/usePolicesHook";
import useLineaCotizacion from "./controllerHooks/Fetchs/useLineaCotizacion";
import ClientProfile from "../views/pages/AccountData2";
import PerfilPage from "../views/pages/AccountData2";
const ControladorPerfil = () => {
  const { isAuthenticated } = useAuth0();

  const { loading: loadingPolice, error: errorPolice } = usePolicesHook();

  const { loading: loadingLinePriciring, error: errorLinePriciring } =
    useLineaCotizacion();

  // Hook que trae todas las versiones
  if (loadingPolice || loadingLinePriciring) {
    return <div>Loading...</div>;
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
