import Navbar from "../views/components/NavBar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import usePolicesByMailHook from "./controllerHooks/Fetchs/usePolicesByMailHook";
import useCotizacionHook from "./controllerHooks/Fetchs/useCotizacion";
import PerfilPage from "../views/pages/AccountData";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import useClientByMailHook from "./controllerHooks/Fetchs/useClientByMail";
import useLocalidadesHook from "./controllerHooks/Fetchs/useLocalidadesHook";
import useProvinciasHook from "./controllerHooks/Fetchs/useProvinciasHook";
import useTiposDocumentos from "./controllerHooks/Fetchs/useTiposDocumentosHook";
import ErrorPage from "../views/components/GeneralComponents/errorPage";
const ControladorPerfil = () => {
  const { isAuthenticated, user } = useAuth0();

  const { loading: loadingClient, error: errorClient } = useClientByMailHook(
    user?.email || ""
  );
  const { loading: loadingPolice, error: errorPolice } = usePolicesByMailHook({
    mail: user?.email || "",
  });

  const { loading: loadingLocalities, error: errorLocalities } =
    useLocalidadesHook();

  const { loading: loadingProvinces, error: errorProvinces } =
    useProvinciasHook();

  const { loading: loadingDocumentTypes, error: errorDocumentTypes } =
    useTiposDocumentos();

  const { loading: loadingPriciring, error: errorPriciring } =
    useCotizacionHook({ mail: user?.email || "" });

  // Hook que trae todas las versiones
  if (
    loadingPolice ||
    loadingPriciring ||
    loadingClient ||
    loadingLocalities ||
    loadingProvinces ||
    loadingDocumentTypes
  ) {
    return <Spinner title="Loading..." text="Por favor espere" />;
  }

  if (
    errorPolice ||
    errorPriciring ||
    errorClient ||
    errorLocalities ||
    errorProvinces ||
    errorDocumentTypes
  ) {
    return <ErrorPage />;
  }

  return (
    <>
      <Navbar isAuth={isAuthenticated} />
      <PerfilPage />
    </>
  );
};

export default ControladorPerfil;
