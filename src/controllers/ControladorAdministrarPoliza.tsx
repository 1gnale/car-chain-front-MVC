import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ManagePolicyData from "../views/pages/ManagePolicyData";
import usePoliceByIdHook from "./controllerHooks/Fetchs/usePoliceByIdHook";
import usePeriodoPago from "./controllerHooks/Fetchs/usePeriodoPago";
import useTipoContratacion from "./controllerHooks/Fetchs/useTipoContratacion";


const ControladorAdministrarPoliza = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();
  const { loading, error, policy } = usePoliceByIdHook(String(id));

  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  const { loading: LoadingTipo, error: ErrorTipo } = useTipoContratacion();
  const { loading: LoadingPeriodo, error: ErrorPeriodo } = usePeriodoPago();

  if (isLoading || loading || LoadingLine || LoadingCD || LoadingTipo || LoadingPeriodo) {
    return <div>Loading...</div>;
  }

  if (error || ErrorLine || ErrorCD || ErrorTipo || ErrorPeriodo) {
    return <div>Error loading pricing information.</div>;
  }
  if (!policy) {
    return <div>No pricing data found.</div>;
  }

  return <ManagePolicyData policy={policy} isAuth={isAuthenticated} />;
};

export default ControladorAdministrarPoliza;
