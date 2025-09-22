import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setPeriodoPago } from "../../../redux/periodoPagosSlice";

const usePeriodoPago = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/periodoPago/`;

  const { data: periodos, loading, error, refetch } = useGenericFetch<PeriodoPago>(apiUrl);

  useEffect(() => {
    if (periodos.length > 0) {
      dispatch(setPeriodoPago(periodos));
    }
  }, [periodos, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default usePeriodoPago;