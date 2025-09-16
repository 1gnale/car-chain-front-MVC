import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPeriodoPago } from "../../../redux/periodoPagosSlice";
import { useGenericFetch } from "./useGenericFetch";

const usePeriodosPagoHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/periodoPago/`;
  
  const { data: periodosPago, loading, error, refetch } = useGenericFetch<PeriodoPago>(apiUrl);

  useEffect(() => {
    if (periodosPago.length > 0) {
      dispatch(setPeriodoPago(periodosPago));
    }
  }, [periodosPago, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default usePeriodosPagoHook;
