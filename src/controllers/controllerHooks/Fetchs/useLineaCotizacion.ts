import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setLineaCotizacion } from "../../../redux/lineaCotizacionSlice";

const useLineaCotizacionHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/lineas-cotizacion/`;
  
  const { data: lineaCotizacion, loading, error } = useGenericFetch<Linea_Cotizacion>(apiUrl);

  useEffect(() => {
    if (lineaCotizacion.length > 0) {
      dispatch(setLineaCotizacion(lineaCotizacion));
    }
  }, [lineaCotizacion, dispatch]);

  return { loading, error: !!error };
};

export default useLineaCotizacionHook;
