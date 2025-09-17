import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setCotizacion } from "../../../redux/cotizacionSlice";

const useCotizacionHook = ({ mail }: { mail: string }) => {
  const dispatch = useDispatch();
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/vehiculoCotizacion/getCotizacion/${mail}`;

  const {
    data: cotizacion,
    loading,
    error,
  } = useGenericFetch<Cotizacion>(apiUrl);

  useEffect(() => {
    if (cotizacion.length > 0) {
      dispatch(setCotizacion(cotizacion));
    }
  }, [cotizacion, dispatch]);

  return { loading, error: !!error };
};

export default useCotizacionHook;
