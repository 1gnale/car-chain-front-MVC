import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDetalles } from "../../../redux/detallesSlice";
import { useGenericFetch } from "./useGenericFetch";

const useDetallesHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/detalle/`;
  
  const { data: detalles, loading, error, refetch } = useGenericFetch<Detalle>(apiUrl);

  useEffect(() => {
    if (detalles.length > 0) {
      dispatch(setDetalles(detalles));
    }
  }, [detalles, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useDetallesHook;
