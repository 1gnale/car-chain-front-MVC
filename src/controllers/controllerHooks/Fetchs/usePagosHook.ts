import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setpagos } from "../../../redux/pagoSlice";

const usePago = (idPoliza: string) => {
  const dispatch = useDispatch();
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/poliza/getAllPagosPoliza/${idPoliza}`;

  const {
    data: pagos,
    loading,
    error,
    refetch,
  } = useGenericFetch<Pago>(apiUrl);

  useEffect(() => {
    if (pagos.length > 0) {
      dispatch(setpagos(pagos));
    }
  }, [pagos, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default usePago;
