import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ManagePolicyData from "../views/pages/ManagePolicyData";
import usePoliceByIdHook from "./controllerHooks/Fetchs/usePoliceByIdHook";
import usePeriodoPago from "./controllerHooks/Fetchs/usePeriodoPago";
import useTipoContratacion from "./controllerHooks/Fetchs/useTipoContratacion";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import usePolicyHistoryByIdHook from "./controllerHooks/Fetchs/usePolicyHistory";
import usePagosHook from "./controllerHooks/Fetchs/usePagosHook";

const ControladorAdministrarPoliza = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { id } = useParams<{ id: string }>();

  // Hook para traer poliza
  const { loading, error, policy } = usePoliceByIdHook(String(id));

  // Hook del historial de la poliza
  const { loading: LoadingHist, error: ErrorLineHist } =
    usePolicyHistoryByIdHook(String(id));

  // Hooks para lo demas
  const { loading: LoadingPago, error: ErrorPago } = usePagosHook(String(id));
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  const { loading: LoadingTipo, error: ErrorTipo } = useTipoContratacion();
  const { loading: LoadingPeriodo, error: ErrorPeriodo } = usePeriodoPago();

  if (
    isLoading ||
    loading ||
    LoadingLine ||
    LoadingCD ||
    LoadingTipo ||
    LoadingPeriodo ||
    LoadingHist ||
    LoadingPago
  ) {
    return <Spinner title="Cargando poliza..." text="Por favor espere" />;
  }

  if (
    error ||
    ErrorLine ||
    ErrorCD ||
    ErrorTipo ||
    ErrorPeriodo ||
    ErrorLineHist ||
    ErrorPago
  ) {
    return <div>Error loading pricing information.</div>;
  }
  if (!policy) {
    return <div>No pricing data found.</div>;
  }

  return <ManagePolicyData policy={policy} isAuth={isAuthenticated} />;
};

export default ControladorAdministrarPoliza;
